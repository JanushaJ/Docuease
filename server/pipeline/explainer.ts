/**
 * Vaidyalens Explanation Generator
 * Generates three-section explanations from VERIFIED data only.
 * Section 1: DOCUMENT SAYS (facts from the document)
 * Section 2: WHAT THIS GENERALLY MEANS (from database sources, with citations)
 * Section 3: CANNOT BE DETERMINED FROM THE DOCUMENT
 *
 * NEVER tells user their personal dose or schedule.
 * NEVER diagnoses. Shows source of each general statement.
 */

import { GoogleGenAI } from '@google/genai';
import { getSetting } from '../db';
import type {
  DocumentExplanation,
  SupportedLanguage,
  MedicalTerm,
  DocumentClassification,
  MedicineStripData,
  LabResultEntry,
  StructuredMedication,
  VerifiedField,
  SentenceTiming,
} from '../../src/types/vaidyalens';
import { SUPPORTED_LANGUAGES } from '../../src/types/vaidyalens';

/**
 * Build the "unverified" fallback speech for when nothing was verified
 */
export function buildUnverifiedExplanation(lang: SupportedLanguage): DocumentExplanation {
  const messages: Record<SupportedLanguage, string> = {
    en: 'I could not reliably read any verified information from this document.',
    te: 'ఈ పత్రం నుండి ధృవీకరించబడిన ఎలాంటి సమాచారాన్ని నేను ఖచ్చితంగా చదవలేకపోయాను.',
    hi: 'मैं इस दस्तावेज़ से किसी भी सत्यापित जानकारी को विश्वसनीय रूप से पढ़ने में असमर्थ रहा।',
    ta: 'இந்த ஆவணத்தில் இருந்து சரிபார்க்கப்பட்ட எந்த தகவலையும் என்னால் நம்பகத்தன்மையுடன் படிக்க முடியவில்லை.',
    kn: 'ಈ ದಾಖಲೆಯಿಂದ ಯಾವುದೇ ಪರಿಶೀಲಿಸಿದ ಮಾಹಿತಿಯನ್ನು ವಿಶ್ವಾಸಾರ್ಹವಾಗಿ ಓದಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
    ml: 'ഈ രേഖയിൽ നിന്ന് പരിശോധിച്ചുറപ്പിച്ച വിവരങ്ങളൊന്നും വിശ്വസനീയമായി വായിക്കാൻ എനിക്ക് കഴിഞ്ഞില്ല.',
    bn: 'এই নথি থেকে যাচাইকৃত কোনো তথ্য নির্ভরযোগ্যভাবে পড়তে পারা যায়নি।',
    mr: 'या दस्तऐवजातून कोणतीही पडताळलेली माहिती विश्वासार्हपणे वाचता आली नाही.',
  };

  const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || 'English';

  return {
    language: lang,
    languageName: langName,
    documentSays: [],
    whatThisGenerallyMeans: [],
    generalMeaningSources: [],
    cannotBeDetermined: ['The document content could not be verified. Please consult your healthcare provider with the original document.'],
    simpleSummary: messages[lang],
    explainLikeIm10: messages[lang],
    whatMedicalTermsMean: [],
    whatToAskDoctor: ['Please consult your physician directly with the original physical document.'],
    spokenScript: messages[lang],
    sentenceTimings: [{ sentence: messages[lang], durationSec: 4, topic: 'unverified' }],
  };
}

/**
 * Generate explanation for a MEDICINE STRIP/BOX from verified data
 */
export function buildMedicineStripExplanation(
  data: MedicineStripData,
  lang: SupportedLanguage
): DocumentExplanation {
  const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || 'English';
  const documentSays: string[] = [];
  const generalMeans: string[] = [];
  const sources: Array<{ statement: string; source: string; sourceUrl?: string }> = [];
  const cannotDetermine: string[] = [];
  const askDoctor: string[] = [];

  // Section 1: DOCUMENT SAYS
  const addField = (label: string, field: VerifiedField<string>) => {
    if (field.value && (field.verdict === 'VERIFIED' || field.userConfirmed)) {
      documentSays.push(`${label}: ${field.value}`);
    } else if (field.rawReading && field.verdict === 'LIKELY') {
      documentSays.push(`${label}: ${field.rawReading} (unconfirmed reading)`);
    }
  };

  addField('Medicine Name', data.brandName);
  addField('Composition', data.genericComposition);
  addField('Strength', data.strengthPerUnit);
  addField('Form', data.dosageForm);
  addField('Manufacturer', data.manufacturer);
  addField('Batch Number', data.batchNumber);
  addField('Manufacture Date', data.manufactureDate);
  addField('Expiry Date', data.expiryDate);
  addField('MRP', data.mrp);
  addField('Storage', data.storageText);
  addField('Usage Directions', data.printedUsageDirections);

  // Expiry warning
  if (data.isExpired) {
    documentSays.push('⚠️ WARNING: This medicine is EXPIRED. Do not use expired medicines.');
  }

  // Section 2: WHAT THIS GENERALLY MEANS (from database sources)
  if (data.brandName.databaseMatch) {
    const match = data.brandName.databaseMatch;
    generalMeans.push(`${data.brandName.value || data.brandName.rawReading} is a known medicine found in verified databases.`);
    sources.push({
      statement: `Medicine verified against database`,
      source: match.source,
      sourceUrl: match.sourceUrl,
    });
  }

  if (data.genericComposition.value) {
    generalMeans.push(`The active ingredient/salt is: ${data.genericComposition.value}.`);
  }

  // NEVER give personal dosing
  generalMeans.push('Follow the dose your doctor or pharmacist told you.');

  // Section 3: CANNOT BE DETERMINED
  cannotDetermine.push('This scan cannot determine if this medicine is right for you or your condition.');
  cannotDetermine.push('Vaidyalens cannot confirm the authenticity of the packaging.');
  cannotDetermine.push('Only your doctor can advise the correct dosage and schedule for your specific situation.');

  askDoctor.push('Is this the right medicine and strength for my condition?');
  askDoctor.push('Are there any interactions with my other medicines?');
  if (data.isExpired) {
    askDoctor.push('This medicine appears to be expired. What should I do?');
  }

  // Build spoken script
  const spokenParts: string[] = [];
  if (documentSays.length > 0) {
    spokenParts.push('Here is what I read from your medicine packaging.');
    spokenParts.push(...documentSays.filter(s => !s.startsWith('⚠️')));
  }
  if (data.isExpired) {
    spokenParts.push('Important warning: This medicine appears to be expired. Please do not use expired medicines.');
  }
  spokenParts.push('Follow the dose your doctor or pharmacist told you.');
  spokenParts.push('Please consult your doctor or pharmacist for any questions about this medicine.');

  const spokenScript = spokenParts.join(' ');
  const sentenceTimings: SentenceTiming[] = spokenParts.map(s => ({
    sentence: s,
    durationSec: Math.max(2, s.split(/\s+/).length * 0.35),
    topic: 'medicine_info',
  }));

  return {
    language: lang,
    languageName: langName,
    documentSays,
    whatThisGenerallyMeans: generalMeans,
    generalMeaningSources: sources,
    cannotBeDetermined: cannotDetermine,
    simpleSummary: documentSays.join('. ') || 'No verified information found.',
    explainLikeIm10: buildSimpleMedicineExplanation(data),
    whatMedicalTermsMean: [],
    whatToAskDoctor: askDoctor,
    spokenScript,
    sentenceTimings,
  };
}

function buildSimpleMedicineExplanation(data: MedicineStripData): string {
  const parts: string[] = [];
  if (data.brandName.value) {
    parts.push(`This is a medicine called ${data.brandName.value}.`);
  }
  if (data.genericComposition.value) {
    parts.push(`It contains ${data.genericComposition.value}.`);
  }
  if (data.strengthPerUnit.value) {
    parts.push(`Each ${data.dosageForm.value || 'unit'} has ${data.strengthPerUnit.value} of the medicine in it.`);
  }
  if (data.isExpired) {
    parts.push('This medicine is past its use-by date. You should not take it. Ask a grown-up to get a new one from the pharmacy.');
  }
  parts.push('Always take this medicine only when your doctor says so, and in the amount they tell you.');
  return parts.join(' ') || 'I could not read enough from this medicine packaging to explain it simply.';
}

/**
 * Generate explanation for a LAB REPORT from verified data
 * Compares results ONLY against the report's OWN printed ranges
 */
export function buildLabReportExplanation(
  labResults: LabResultEntry[],
  lang: SupportedLanguage
): DocumentExplanation {
  const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || 'English';
  const documentSays: string[] = [];
  const generalMeans: string[] = [];
  const sources: Array<{ statement: string; source: string; sourceUrl?: string }> = [];
  const cannotDetermine: string[] = [];
  const askDoctor: string[] = [];

  const verifiedResults = labResults.filter(r => r.isVerified || r.userConfirmed);

  if (verifiedResults.length === 0) {
    return buildUnverifiedExplanation(lang);
  }

  for (const result of verifiedResults) {
    // Section 1: DOCUMENT SAYS
    let resultLine = `${result.testName}: ${result.result}`;
    if (result.unit) resultLine += ` ${result.unit}`;
    if (result.referenceRange) resultLine += ` (Reference: ${result.referenceRange})`;
    if (result.cutoff) resultLine += ` (Cutoff: ${result.cutoff})`;
    if (result.printedInterpretation) resultLine += ` — ${result.printedInterpretation}`;
    documentSays.push(resultLine);

    // Section 2: WHAT THIS GENERALLY MEANS (using the report's OWN ranges)
    if (result.printedInterpretation) {
      generalMeans.push(`The report states the ${result.testName} result is: ${result.printedInterpretation}.`);
    }

    if (result.referenceRange && result.result) {
      generalMeans.push(`The result ${result.result} is compared against the report's printed reference range of ${result.referenceRange}.`);
    }

    // Check for inconsistencies
    if (result.isInconsistent) {
      generalMeans.push(`⚠️ ${result.inconsistencyNote || 'There appears to be an inconsistency in the printed values for this test. Please ask the laboratory or your doctor to clarify.'}`);
    }

    if (result.loincCode) {
      sources.push({
        statement: `${result.testName} mapped to LOINC code ${result.loincCode}`,
        source: 'LOINC (Regenstrief Institute)',
        sourceUrl: 'https://loinc.org',
      });
    }
  }

  // Section 3: CANNOT BE DETERMINED
  cannotDetermine.push('Only your doctor can interpret these results in the context of your clinical history.');
  cannotDetermine.push('A single lab result does not constitute a diagnosis.');
  cannotDetermine.push('Reference ranges may vary between laboratories.');

  askDoctor.push('What do these results mean for my health?');
  askDoctor.push('Do I need any follow-up tests?');
  askDoctor.push('Should I make any changes to my treatment?');

  // Build spoken script
  const spokenParts: string[] = [];
  spokenParts.push('Here are the lab test results I read from your report.');
  for (const result of verifiedResults) {
    let spoken = `${result.testName}: ${result.result}`;
    if (result.unit) spoken += ` ${result.unit}`;
    if (result.printedInterpretation) spoken += `. The report says: ${result.printedInterpretation}`;
    spokenParts.push(spoken);
  }
  spokenParts.push('Only your doctor can interpret these results with your complete medical history. Please discuss with your doctor.');

  const spokenScript = spokenParts.join('. ');
  const sentenceTimings: SentenceTiming[] = spokenParts.map(s => ({
    sentence: s,
    durationSec: Math.max(2, s.split(/\s+/).length * 0.35),
    topic: 'lab_results',
  }));

  return {
    language: lang,
    languageName: langName,
    documentSays,
    whatThisGenerallyMeans: generalMeans,
    generalMeaningSources: sources,
    cannotBeDetermined: cannotDetermine,
    simpleSummary: documentSays.join('. '),
    explainLikeIm10: buildSimpleLabExplanation(verifiedResults),
    whatMedicalTermsMean: [],
    whatToAskDoctor: askDoctor,
    spokenScript,
    sentenceTimings,
  };
}

function buildSimpleLabExplanation(results: LabResultEntry[]): string {
  if (results.length === 0) return 'No test results could be verified from this report.';
  const parts: string[] = ['Your lab report has some test results. Here is what they say:'];
  for (const r of results) {
    let line = `The ${r.testName} test shows a value of ${r.result}`;
    if (r.printedInterpretation) line += `. The lab says this is: ${r.printedInterpretation}`;
    parts.push(line + '.');
  }
  parts.push('Only your doctor can tell you what these numbers mean for your health.');
  return parts.join(' ');
}

/**
 * Translate explanation to a target language using Gemini
 */
export async function translateExplanation(
  explanation: DocumentExplanation,
  targetLang: SupportedLanguage
): Promise<DocumentExplanation> {
  if (targetLang === 'en') return explanation;

  const key = process.env.GEMINI_API_KEY || getSetting('GEMINI_API_KEY');
  if (!key) {
    // Fallback: return English version with language label
    return { ...explanation, language: targetLang, languageName: SUPPORTED_LANGUAGES.find(l => l.code === targetLang)?.name || targetLang };
  }

  const client = new GoogleGenAI({ apiKey: key });
  const langName = SUPPORTED_LANGUAGES.find(l => l.code === targetLang)?.name || 'English';

  const prompt = `Translate the following medical document explanation from English to ${langName}.

CRITICAL RULES:
- Medicine names, drug names, test names must stay EXACTLY as they are (do not translate them)
- Numbers, doses, units (mg, ml, etc.), and test values must stay EXACTLY unchanged
- Translate the explanatory text naturally into ${langName}
- Keep the same structure (documentSays, whatThisGenerallyMeans, cannotBeDetermined sections)
- Return valid JSON

Input JSON:
${JSON.stringify({
  documentSays: explanation.documentSays,
  whatThisGenerallyMeans: explanation.whatThisGenerallyMeans,
  cannotBeDetermined: explanation.cannotBeDetermined,
  simpleSummary: explanation.simpleSummary,
  explainLikeIm10: explanation.explainLikeIm10,
  whatToAskDoctor: explanation.whatToAskDoctor,
}, null, 2)}

Return the translated JSON with the same keys. Also add a "spokenScript" field that is a natural spoken version of the key information in ${langName}.`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const text = response?.text || '';
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in translation response');

    const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);

    return {
      ...explanation,
      language: targetLang,
      languageName: langName,
      documentSays: parsed.documentSays || explanation.documentSays,
      whatThisGenerallyMeans: parsed.whatThisGenerallyMeans || explanation.whatThisGenerallyMeans,
      cannotBeDetermined: parsed.cannotBeDetermined || explanation.cannotBeDetermined,
      simpleSummary: parsed.simpleSummary || explanation.simpleSummary,
      explainLikeIm10: parsed.explainLikeIm10 || explanation.explainLikeIm10,
      whatToAskDoctor: parsed.whatToAskDoctor || explanation.whatToAskDoctor,
      spokenScript: parsed.spokenScript || explanation.spokenScript,
      sentenceTimings: (parsed.spokenScript || explanation.spokenScript)
        .split(/[.!?]+/)
        .filter((s: string) => s.trim())
        .map((s: string) => ({
          sentence: s.trim(),
          durationSec: Math.max(2, s.trim().split(/\s+/).length * 0.4),
          topic: 'translated',
        })),
    };
  } catch (err) {
    console.error('Translation failed:', err);
    return { ...explanation, language: targetLang, languageName: langName };
  }
}
