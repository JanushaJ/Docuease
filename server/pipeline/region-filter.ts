/**
 * Vaidyalens Region Filter & Garbage Text Filter
 * Detect and exclude: logos, barcodes, QR codes, letterheads, stamps, watermarks.
 * Barcode or logo text must NEVER become a medicine or test candidate.
 * High share of non-dictionary tokens → UNREADABLE → blocked from everything.
 */

export interface FilteredRegion {
  text: string;
  type: 'content' | 'logo' | 'barcode' | 'qr_code' | 'watermark' | 'header' | 'footer' | 'stamp' | 'letterhead';
  isExcluded: boolean;
  exclusionReason?: string;
}

export interface GarbageCheckResult {
  isGarbage: boolean;
  reason?: string;
}

/**
 * Check if text is garbage (non-dictionary tokens, random symbols, barcode artifacts)
 */
export function isGarbageText(text: string): GarbageCheckResult {
  if (!text || text.trim().length === 0) {
    return { isGarbage: true, reason: 'Empty string' };
  }
  const trimmed = text.trim();

  // Remove standard spacing and medical/punctuation characters
  const nonPunctuation = trimmed.replace(/[\s.,\-\/:()%\+<>=&"']/g, '');
  if (nonPunctuation.length === 0) {
    return { isGarbage: true, reason: 'No alphanumeric content' };
  }

  // Calculate symbol noise ratio
  const alphanumericCount = (trimmed.match(/[a-zA-Z0-9]/g) || []).length;
  const standardPunctCount = (trimmed.match(/[\s.,\-\/:()%\+<>=&"']/g) || []).length;
  const symbolNoiseCount = trimmed.length - (alphanumericCount + standardPunctCount);

  if (symbolNoiseCount > 0 && symbolNoiseCount / trimmed.length > 0.15 && alphanumericCount < 8) {
    return { isGarbage: true, reason: 'High symbol noise density' };
  }

  // Detect barcode scanning noise artifacts
  if (/(\\||\/|\\\\|\[|\]|\{|\}|«|»|©|™){2,}/.test(trimmed) || /\|.*\|.*\|/.test(trimmed)) {
    if (/[A-Z0-9]{7,}/.test(trimmed) && !/\b(COVID|HBSAG|SARS-COV|PARACETAMOL|AUGMENTIN|CEFTRIAXONE|REACTIVE|HEPATITIS)\b/i.test(trimmed)) {
      return { isGarbage: true, reason: 'Barcode / OCR scanning artifact pattern' };
    }
  }

  // Check words for gibberish (bizarre vowel/consonant distribution)
  const words = trimmed.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 0);
  let gibberishWordCount = 0;
  for (const word of words) {
    if (word.length < 3) continue;
    const vowels = (word.match(/[aeiouAEIOU]/g) || []).length;
    const consonants = (word.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
    const digits = (word.match(/[0-9]/g) || []).length;

    // If the word is mostly digits, skip (could be a batch number)
    if (digits > word.length * 0.6) continue;

    // Check for implausible vowel-to-consonant ratio
    if (consonants > 0 && vowels === 0 && word.length > 4) {
      gibberishWordCount++;
    } else if (vowels > 0 && consonants / vowels > 6 && word.length > 5) {
      gibberishWordCount++;
    }
  }

  const meaningfulWords = words.filter(w => w.length >= 3);
  if (meaningfulWords.length > 0 && gibberishWordCount / meaningfulWords.length > 0.5) {
    return { isGarbage: true, reason: 'High ratio of non-dictionary tokens' };
  }

  return { isGarbage: false };
}

/**
 * Filter regions: separate content from non-content (logos, barcodes, etc.)
 * Returns only content text suitable for extraction.
 */
export function filterRegions(regions: Array<{ text: string; type: string }>): {
  contentText: string;
  filteredRegions: FilteredRegion[];
  excludedCount: number;
} {
  const nonContentTypes = new Set(['logo', 'barcode', 'qr_code', 'watermark', 'stamp', 'letterhead']);
  const filteredRegions: FilteredRegion[] = [];
  const contentTexts: string[] = [];
  let excludedCount = 0;

  for (const region of regions) {
    const type = region.type as FilteredRegion['type'];
    const isNonContent = nonContentTypes.has(type);
    const garbageCheck = isGarbageText(region.text);

    if (isNonContent) {
      filteredRegions.push({
        text: region.text,
        type,
        isExcluded: true,
        exclusionReason: `Non-content region: ${type}`,
      });
      excludedCount++;
    } else if (garbageCheck.isGarbage) {
      filteredRegions.push({
        text: region.text,
        type,
        isExcluded: true,
        exclusionReason: `Garbage text: ${garbageCheck.reason}`,
      });
      excludedCount++;
    } else {
      filteredRegions.push({
        text: region.text,
        type,
        isExcluded: false,
      });
      contentTexts.push(region.text);
    }
  }

  return {
    contentText: contentTexts.join('\n'),
    filteredRegions,
    excludedCount,
  };
}

/**
 * Check if a candidate text looks like a barcode number, serial, or logo text
 */
export function isLikelyNonMedicalText(text: string): boolean {
  // Pure numbers (batch codes, barcodes)
  if (/^\d{6,}$/.test(text.trim())) return true;
  // Barcode patterns
  if (/^[0-9\-\s]{10,}$/.test(text.trim())) return true;
  // URL patterns
  if (/^(https?:\/\/|www\.)/.test(text.trim())) return true;
  // Email patterns
  if (/@[a-z]+\.[a-z]+/i.test(text.trim())) return true;
  // All-caps single short word that's likely a logo
  if (/^[A-Z]{1,3}$/.test(text.trim())) return true;
  return false;
}
