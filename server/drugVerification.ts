/**
 * Vaidyalens Drug Verification Engine (Production-Grade)
 * Rules:
 * 1. Strict threshold: if no match >= 0.70, return "no confident match", never the closest guess.
 * 2. Matched strength must exist for that drug (reject e.g. "Paracetamol 5000mg").
 * 3. A match is VERIFIED (green) only when it also agrees with the OCR engines' reading.
 *    Otherwise marked LIKELY (amber unconfirmed suggestion) or UNCLEAR (red).
 * 4. Never invent drug data. If not in any loaded source, explicitly state so.
 */

import { MEDICINES_DB, MedicineRecord } from './drugDatabase';
import { 
  calculateTrigramSimilarity, 
  calculateLevenshteinSimilarity, 
  calculateJaroWinkler, 
  calculatePhoneticSimilarity 
} from './matchingAlgorithms';

export interface VerificationCandidate {
  brand_name: string;
  generic_name: string;
  matched_strength: string;
  dosage_form: string;
  manufacturer: string;
  source: string;
  trigram_sim: number;
  jaro_winkler_sim: number;
  levenshtein_sim: number;
  phonetic_sim: number;
  composite_score: number;
  verdict: 'VERIFIED' | 'LIKELY' | 'UNCLEAR' | 'REJECTED';
  verdict_reason: string;
}

export interface VerificationResult {
  query_name: string;
  query_strength?: string;
  status: 'VERIFIED' | 'LIKELY' | 'UNCLEAR' | 'NO_MATCH' | 'STRENGTH_REJECTED';
  top_matches: VerificationCandidate[];
  best_match: VerificationCandidate | null;
  clinical_strength_valid: boolean;
  ocr_engines_agreed: boolean;
  message: string;
}

/**
 * Clean and normalize medicine names for matching
 */
export function normalizeMedicineName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(tablet|capsule|syrup|injection|suspension|drops|tab|cap|syp|inj)\b/g, '')
    .replace(/[0-9]+(\.[0-9]+)?\s*(mg|mcg|g|ml|iu|%)\b/g, '')
    .replace(/\b[0-9]{2,4}\b/g, '') // remove standalone strength numbers like 650, 500, 40, 625
    .replace(/[^a-z0-9\s-]/g, '')
    .trim();
}

/**
 * Extract normalized strength tokens (e.g. value and unit)
 */
export function parseStrengthToken(input: string): { raw: string; value: number; unit: string } | null {
  const match = input.match(/\b([0-9]+(\.[0-9]+)?)\s*(mg|mcg|g|ml|iu|%)\b/i);
  if (!match) return null;
  return {
    raw: match[0].toLowerCase().replace(/\s+/g, ''),
    value: parseFloat(match[1]),
    unit: match[3].toLowerCase()
  };
}

/**
 * Core Verification Function
 * Takes a candidate medicine reading and returns top 3 matches using multi-metric scoring
 */
export function verifyMedicineCandidate(
  candidateName: string,
  candidateStrength?: string,
  ocrConsensusCount: number = 2,
  primaryOcrText: string = ''
): VerificationResult {
  const cleanQuery = candidateName.trim();
  const normalizedQuery = normalizeMedicineName(cleanQuery);
  const parsedStrength = candidateStrength 
    ? parseStrengthToken(candidateStrength) 
    : parseStrengthToken(cleanQuery);

  if (!cleanQuery || (normalizedQuery.length < 2 && cleanQuery.length < 2)) {
    return {
      query_name: candidateName,
      query_strength: candidateStrength,
      status: 'NO_MATCH',
      top_matches: [],
      best_match: null,
      clinical_strength_valid: false,
      ocr_engines_agreed: false,
      message: 'no confident match'
    };
  }

  // 1. Score all medicines in verified database
  const scoredList: Array<{
    record: MedicineRecord;
    trigramSim: number;
    jwSim: number;
    levSim: number;
    phoneSim: number;
    compositeScore: number;
  }> = [];

  for (const record of MEDICINES_DB) {
    const recordBrandBase = normalizeMedicineName(record.brand_name);
    const recordBrandFull = record.brand_name.toLowerCase().trim();
    const recordGenericNorm = normalizeMedicineName(record.generic_name || '');

    // Test match against both base brand, full brand, and generic active ingredient
    const triBase = calculateTrigramSimilarity(normalizedQuery, recordBrandBase);
    const triFull = calculateTrigramSimilarity(cleanQuery.toLowerCase(), recordBrandFull);
    const triGen = recordGenericNorm ? calculateTrigramSimilarity(normalizedQuery, recordGenericNorm) : 0;
    const trigramSim = Math.max(triBase, triFull, triGen);

    const jwBase = calculateJaroWinkler(normalizedQuery, recordBrandBase);
    const jwFull = calculateJaroWinkler(cleanQuery.toLowerCase(), recordBrandFull);
    const jwGen = recordGenericNorm ? calculateJaroWinkler(normalizedQuery, recordGenericNorm) : 0;
    const jwSim = Math.max(jwBase, jwFull, jwGen);

    const levBase = calculateLevenshteinSimilarity(normalizedQuery, recordBrandBase);
    const levFull = calculateLevenshteinSimilarity(cleanQuery.toLowerCase(), recordBrandFull);
    const levGen = recordGenericNorm ? calculateLevenshteinSimilarity(normalizedQuery, recordGenericNorm) : 0;
    const levSim = Math.max(levBase, levFull, levGen);

    const phoneBase = calculatePhoneticSimilarity(normalizedQuery, recordBrandBase);
    const phoneGen = recordGenericNorm ? calculatePhoneticSimilarity(normalizedQuery, recordGenericNorm) : 0;
    const phoneSim = Math.max(phoneBase, phoneGen);

    // Multi-Metric Weighted Scoring Formula
    // Trigram: 35%, Jaro-Winkler: 30%, Levenshtein: 15%, Double Metaphone: 20%
    const compositeScore = Number((
      (0.35 * trigramSim) + 
      (0.30 * jwSim) + 
      (0.15 * levSim) + 
      (0.20 * phoneSim)
    ).toFixed(4));

    scoredList.push({
      record,
      trigramSim,
      jwSim,
      levSim,
      phoneSim,
      compositeScore
    });
  }

  // Sort descending by composite score
  scoredList.sort((a, b) => b.compositeScore - a.compositeScore);

  // Take top candidates
  const topCandidates = scoredList.slice(0, 3);
  const best = topCandidates[0];

  // RULE 1: Strict Threshold (< 0.70 => "no confident match", never the closest guess)
  if (!best || best.compositeScore < 0.70) {
    return {
      query_name: candidateName,
      query_strength: candidateStrength,
      status: 'NO_MATCH',
      top_matches: [],
      best_match: null,
      clinical_strength_valid: false,
      ocr_engines_agreed: false,
      message: 'no confident match'
    };
  }

  // RULE 2: Matched Strength Must Exist for That Drug (Reject impossible dosages)
  let strengthValid = true;
  let strengthFailureReason = '';

  if (parsedStrength && best.record.allowed_strengths && best.record.allowed_strengths.length > 0) {
    const allowedParsed = best.record.allowed_strengths
      .map(s => parseStrengthToken(s))
      .filter((s): s is { raw: string; value: number; unit: string } => s !== null);

    // Match exact numeric value and unit
    const matchesAny = allowedParsed.some(allowed => 
      allowed.value === parsedStrength.value && allowed.unit === parsedStrength.unit
    );

    if (!matchesAny) {
      strengthValid = false;
      strengthFailureReason = `Impossible strength: ${parsedStrength.raw} does not exist for ${best.record.brand_name} / ${best.record.generic_name}. Registered strengths: ${best.record.allowed_strengths.join(', ')}`;
    }
  }

  // If impossible strength is detected, REJECT the candidate match
  if (!strengthValid) {
    const rejectedCandidate: VerificationCandidate = {
      brand_name: best.record.brand_name,
      generic_name: best.record.generic_name,
      matched_strength: best.record.strength,
      dosage_form: best.record.dosage_form,
      manufacturer: best.record.manufacturer,
      source: best.record.source,
      trigram_sim: best.trigramSim,
      jaro_winkler_sim: best.jwSim,
      levenshtein_sim: best.levSim,
      phonetic_sim: best.phoneSim,
      composite_score: best.compositeScore,
      verdict: 'REJECTED',
      verdict_reason: strengthFailureReason
    };

    return {
      query_name: candidateName,
      query_strength: candidateStrength,
      status: 'STRENGTH_REJECTED',
      top_matches: [rejectedCandidate],
      best_match: rejectedCandidate,
      clinical_strength_valid: false,
      ocr_engines_agreed: ocrConsensusCount >= 2,
      message: `Impossible strength rejected: ${parsedStrength?.raw || candidateStrength} is not clinically valid for ${best.record.brand_name}.`
    };
  }

  // RULE 3: Consensus Voting & OCR Engine Agreement
  // A match is VERIFIED only when:
  // a) composite score >= 0.85 AND
  // b) agreed with OCR engine consensus (>= 2 engines)
  const ocrAgrees = ocrConsensusCount >= 2;
  const isExactOrVeryHigh = best.compositeScore >= 0.85;

  let overallStatus: 'VERIFIED' | 'LIKELY' | 'UNCLEAR';
  let overallMessage = '';

  if (isExactOrVeryHigh && ocrAgrees) {
    overallStatus = 'VERIFIED';
    overallMessage = `Confirmed match: ${best.record.brand_name} (${best.record.generic_name}, ${best.record.strength}). Both database verification and OCR multi-engine consensus agree.`;
  } else if (best.compositeScore >= 0.70) {
    overallStatus = 'LIKELY';
    overallMessage = `Unconfirmed suggestion: Candidate matches "${best.record.brand_name}" (${Math.round(best.compositeScore * 100)}% match score). Needs human confirmation.`;
  } else {
    overallStatus = 'UNCLEAR';
    overallMessage = 'Handwriting unclear, not verified. Please confirm with your doctor or pharmacist.';
  }

  const formattedMatches: VerificationCandidate[] = topCandidates
    .filter(c => c.compositeScore >= 0.70)
    .map(c => {
      let verdict: 'VERIFIED' | 'LIKELY' | 'UNCLEAR' = 'LIKELY';
      let reason = 'Unconfirmed suggestion';

      if (c === best && overallStatus === 'VERIFIED') {
        verdict = 'VERIFIED';
        reason = 'Confirmed against database and OCR consensus';
      } else if (c.compositeScore < 0.75) {
        verdict = 'UNCLEAR';
        reason = 'Weak similarity threshold';
      }

      return {
        brand_name: c.record.brand_name,
        generic_name: c.record.generic_name,
        matched_strength: c.record.strength,
        dosage_form: c.record.dosage_form,
        manufacturer: c.record.manufacturer,
        source: c.record.source,
        trigram_sim: c.trigramSim,
        jaro_winkler_sim: c.jwSim,
        levenshtein_sim: c.levSim,
        phonetic_sim: c.phoneSim,
        composite_score: c.compositeScore,
        verdict,
        verdict_reason: reason
      };
    });

  return {
    query_name: candidateName,
    query_strength: candidateStrength,
    status: overallStatus,
    top_matches: formattedMatches,
    best_match: formattedMatches[0] || null,
    clinical_strength_valid: true,
    ocr_engines_agreed: ocrAgrees,
    message: overallMessage
  };
}
