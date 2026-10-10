/**
 * Vaidyalens Drug Verification Matching Algorithms
 * Implements:
 * 1. Trigram (pg_trgm style) Similarity
 * 2. Levenshtein Distance & Normalized Ratio
 * 3. Jaro-Winkler Distance
 * 4. Double Metaphone Phonetic Encoding
 */

// 1. Trigram Similarity (pg_trgm compatible)
export function calculateTrigramSimilarity(str1: string, str2: string): number {
  const s1 = `  ${str1.toLowerCase().trim()} `;
  const s2 = `  ${str2.toLowerCase().trim()} `;

  if (s1 === s2) return 1.0;
  if (s1.length < 3 || s2.length < 3) return 0.0;

  const getTrigrams = (s: string): Map<string, number> => {
    const counts = new Map<string, number>();
    for (let i = 0; i < s.length - 2; i++) {
      const tri = s.substring(i, i + 3);
      counts.set(tri, (counts.get(tri) || 0) + 1);
    }
    return counts;
  };

  const tri1 = getTrigrams(s1);
  const tri2 = getTrigrams(s2);

  let intersection = 0;
  for (const [tri, count1] of tri1.entries()) {
    const count2 = tri2.get(tri);
    if (count2) {
      intersection += Math.min(count1, count2);
    }
  }

  let total1 = 0;
  for (const count of tri1.values()) total1 += count;
  let total2 = 0;
  for (const count of tri2.values()) total2 += count;

  const union = total1 + total2 - intersection;
  return union === 0 ? 0.0 : intersection / union;
}

// 2. Levenshtein Distance & Similarity Ratio
export function calculateLevenshteinDistance(a: string, b: string): number {
  const s1 = a.toLowerCase().trim();
  const s2 = b.toLowerCase().trim();
  if (s1 === s2) return 0;
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;

  const row = new Array(s2.length + 1);
  for (let i = 0; i <= s2.length; i++) row[i] = i;

  for (let i = 1; i <= s1.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= s2.length; j++) {
      const cur = row[j];
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = cur;
    }
  }
  return row[s2.length];
}

export function calculateLevenshteinSimilarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1.0;
  const dist = calculateLevenshteinDistance(a, b);
  return Math.max(0, 1.0 - dist / maxLen);
}

// 3. Jaro-Winkler Similarity
export function calculateJaroWinkler(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1.0;
  if (!s1.length || !s2.length) return 0.0;

  const matchWindow = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
  const s1Matches = new Array(s1.length).fill(false);
  const s2Matches = new Array(s2.length).fill(false);

  let matches = 0;
  let transpositions = 0;

  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, s2.length);

    for (let j = start; j < end; j++) {
      if (s2Matches[j]) continue;
      if (s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let k = 0;
  for (let i = 0; i < s1.length; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }

  const jaro =
    (matches / s1.length +
      matches / s2.length +
      (matches - transpositions / 2) / matches) /
    3.0;

  // Prefix bonus (Winkler modification)
  let prefix = 0;
  const maxPrefix = Math.min(4, Math.min(s1.length, s2.length));
  for (let i = 0; i < maxPrefix; i++) {
    if (s1[i] === s2[i]) prefix++;
    else break;
  }

  return jaro + prefix * 0.1 * (1.0 - jaro);
}

// 4. Double Metaphone Phonetic Encoder
export function doubleMetaphone(input: string): [string, string] {
  const str = input.toUpperCase().replace(/[^A-Z]/g, '');
  if (!str) return ['', ''];

  let primary = '';
  let secondary = '';
  let current = 0;
  const length = str.length;

  const isVowel = (c: string) => ['A', 'E', 'I', 'O', 'U', 'Y'].includes(c);

  // Initial check
  if (['GN', 'KN', 'PN', 'WR', 'PS'].some((p) => str.startsWith(p))) {
    current += 1;
  } else if (str.startsWith('X')) {
    primary += 'S';
    secondary += 'S';
    current += 1;
  }

  while (current < length && (primary.length < 8 || secondary.length < 8)) {
    const ch = str[current];

    switch (ch) {
      case 'A':
      case 'E':
      case 'I':
      case 'O':
      case 'U':
      case 'Y':
        if (current === 0) {
          primary += 'A';
          secondary += 'A';
        }
        current += 1;
        break;

      case 'B':
        primary += 'P';
        secondary += 'P';
        current += str[current + 1] === 'B' ? 2 : 1;
        break;

      case 'C':
        if (current > 1 && !isVowel(str[current - 2]) && str.substring(current - 1, current + 2) === 'ACH' &&
            str[current + 2] !== 'I' && (str[current + 2] !== 'E' || ['BACHER', 'MACHER'].some(m => str.includes(m)))) {
          primary += 'K';
          secondary += 'K';
          current += 2;
        } else if (current === 0 && str.substring(current, current + 6) === 'CAESAR') {
          primary += 'S';
          secondary += 'S';
          current += 2;
        } else if (str.substring(current, current + 2) === 'CH') {
          primary += 'X';
          secondary += 'K';
          current += 2;
        } else if (str.substring(current, current + 2) === 'CZ') {
          primary += 'S';
          secondary += 'X';
          current += 2;
        } else if (['CI', 'CE', 'CY'].some(s => str.substring(current, current + 2) === s)) {
          primary += 'S';
          secondary += 'S';
          current += 2;
        } else {
          primary += 'K';
          secondary += 'K';
          current += ['CK', 'CG', 'CQ'].some(s => str.substring(current, current + 2) === s) ? 2 : 1;
        }
        break;

      case 'D':
        if (str.substring(current, current + 2) === 'DG') {
          if (['E', 'I', 'Y'].includes(str[current + 2])) {
            primary += 'J';
            secondary += 'J';
            current += 3;
          } else {
            primary += 'TK';
            secondary += 'TK';
            current += 2;
          }
        } else if (['DT', 'DD'].includes(str.substring(current, current + 2))) {
          primary += 'T';
          secondary += 'T';
          current += 2;
        } else {
          primary += 'T';
          secondary += 'T';
          current += 1;
        }
        break;

      case 'F':
        primary += 'F';
        secondary += 'F';
        current += str[current + 1] === 'F' ? 2 : 1;
        break;

      case 'G':
        if (str[current + 1] === 'H') {
          if (current > 0 && !isVowel(str[current - 1])) {
            primary += 'K';
            secondary += 'K';
            current += 2;
          } else if (current === 0) {
            if (str[current + 2] === 'I') {
              primary += 'J';
              secondary += 'J';
            } else {
              primary += 'K';
              secondary += 'K';
            }
            current += 2;
          } else {
            current += 2;
          }
        } else if (str[current + 1] === 'N') {
          primary += 'N';
          secondary += 'KN';
          current += 2;
        } else if (['GE', 'GI', 'GY'].includes(str.substring(current, current + 2))) {
          primary += 'K';
          secondary += 'J';
          current += 2;
        } else {
          primary += 'K';
          secondary += 'K';
          current += str[current + 1] === 'G' ? 2 : 1;
        }
        break;

      case 'H':
        if ((current === 0 || isVowel(str[current - 1])) && isVowel(str[current + 1])) {
          primary += 'H';
          secondary += 'H';
          current += 2;
        } else {
          current += 1;
        }
        break;

      case 'J':
        primary += 'J';
        secondary += 'A';
        current += str[current + 1] === 'J' ? 2 : 1;
        break;

      case 'K':
        primary += 'K';
        secondary += 'K';
        current += str[current + 1] === 'K' ? 2 : 1;
        break;

      case 'L':
        primary += 'L';
        secondary += 'L';
        current += str[current + 1] === 'L' ? 2 : 1;
        break;

      case 'M':
        primary += 'M';
        secondary += 'M';
        current += str[current + 1] === 'M' ? 2 : 1;
        break;

      case 'N':
        primary += 'N';
        secondary += 'N';
        current += str[current + 1] === 'N' ? 2 : 1;
        break;

      case 'P':
        if (str[current + 1] === 'H') {
          primary += 'F';
          secondary += 'F';
          current += 2;
        } else {
          primary += 'P';
          secondary += 'P';
          current += ['P', 'B'].includes(str[current + 1]) ? 2 : 1;
        }
        break;

      case 'Q':
        primary += 'K';
        secondary += 'K';
        current += str[current + 1] === 'Q' ? 2 : 1;
        break;

      case 'R':
        primary += 'R';
        secondary += 'R';
        current += str[current + 1] === 'R' ? 2 : 1;
        break;

      case 'S':
        if (str.substring(current, current + 2) === 'SH') {
          primary += 'X';
          secondary += 'X';
          current += 2;
        } else if (['SI', 'SE', 'SY'].some(s => str.substring(current, current + 2) === s)) {
          primary += 'S';
          secondary += 'X';
          current += 2;
        } else {
          primary += 'S';
          secondary += 'S';
          current += ['S', 'Z'].includes(str[current + 1]) ? 2 : 1;
        }
        break;

      case 'T':
        if (str.substring(current, current + 2) === 'TH') {
          primary += '0'; // Theta sound
          secondary += 'T';
          current += 2;
        } else if (['TIA', 'TIO'].includes(str.substring(current, current + 3))) {
          primary += 'X';
          secondary += 'X';
          current += 3;
        } else {
          primary += 'T';
          secondary += 'T';
          current += ['T', 'D'].includes(str[current + 1]) ? 2 : 1;
        }
        break;

      case 'V':
        primary += 'F';
        secondary += 'F';
        current += str[current + 1] === 'V' ? 2 : 1;
        break;

      case 'W':
      case 'X':
        if (ch === 'X') {
          primary += 'KS';
          secondary += 'KS';
          current += 1;
        } else {
          if (isVowel(str[current + 1])) {
            primary += 'A';
            secondary += 'F';
          }
          current += 1;
        }
        break;

      case 'Z':
        primary += 'S';
        secondary += 'S';
        current += str[current + 1] === 'Z' ? 2 : 1;
        break;

      default:
        current += 1;
        break;
    }
  }

  return [primary.padEnd(4, ' ').substring(0, 4).trim(), secondary.padEnd(4, ' ').substring(0, 4).trim()];
}

/**
 * Phonetic similarity between two Double Metaphone representations
 */
export function calculatePhoneticSimilarity(term1: string, term2: string): number {
  const [p1, s1] = doubleMetaphone(term1);
  const [p2, s2] = doubleMetaphone(term2);

  if (!p1 || !p2) return 0.0;
  if (p1 === p2) return 1.0;
  if (p1 === s2 || s1 === p2) return 0.9;
  if (s1 && s2 && s1 === s2) return 0.8;

  // Partial metaphone prefix match
  const minLen = Math.min(p1.length, p2.length);
  if (minLen >= 2 && p1.substring(0, minLen) === p2.substring(0, minLen)) {
    return 0.7;
  }
  return 0.0;
}
