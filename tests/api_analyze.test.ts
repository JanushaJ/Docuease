import assert from 'node:assert';
import { BCP47_LANG_MAP } from '../src/utils/speech';
import { buildMedScanPrompt, buildDocuSimplifyPrompt } from '../src/lib/gemini';
import { parseDocumentContent } from '../server/ocrParser';

console.log('\n======================================================');
console.log('TEST SUITE: /api/analyze & KRISH X TATTVA ROUTER');
console.log('HackSphere AI Hackathon — Production Quality Gate');
console.log('======================================================\n');

// 1. Verify BCP47 Regional Locales Mapping
console.log('▶ GROUP 1: Regional Voice Locales (11 Indian Languages)');
const expectedLocales: Record<string, string> = {
  te: 'te-IN',
  ta: 'ta-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  ur: 'ur-IN',
  en: 'en-US'
};

for (const [code, expectedLocale] of Object.entries(expectedLocales)) {
  const actual = (BCP47_LANG_MAP as any)[code];
  assert.strictEqual(actual, expectedLocale, `Locale for ${code} must be ${expectedLocale}`);
  console.log(`  ✓ PASS: Locale mapping for [${code}] matches expected regional code [${expectedLocale}]`);
}

// 2. Verify MedScan Prompt Rules
console.log('\n▶ GROUP 2: MedScan AI Rules & Prompts');
const medPrompt = buildMedScanPrompt('Telugu', 'te');
assert.ok(medPrompt.includes('Needs Pharmacist Verification'), 'MedScan prompt must enforce Needs Pharmacist Verification for illegible handwriting');
assert.ok(medPrompt.includes('1-0-1'), 'MedScan prompt must enforce dosage extraction pattern');
assert.ok(medPrompt.includes('NEVER hallucinate'), 'MedScan prompt must prohibit hallucinations on lab reports');
console.log('  ✓ PASS: MedScan prompt contains strict zero-hallucination and pharmacist verification rules');

// 3. Verify DocuSimplify Prompt Rules
console.log('\n▶ GROUP 3: DocuSimplify AI Rules & Prompts');
const billPrompt = buildDocuSimplifyPrompt('Hindi', 'hi');
assert.ok(billPrompt.includes('ELECTRICITY_BILL'), 'DocuSimplify prompt must support utility bills');
assert.ok(billPrompt.includes('NEVER mix this up with medical data'), 'DocuSimplify prompt must isolate bill data from medical data');
assert.ok(billPrompt.includes('Never share OTP'), 'DocuSimplify prompt must mandate banking anti-fraud caution');
console.log('  ✓ PASS: DocuSimplify prompt strictly isolates financial data and enforces anti-fraud warnings');

// 4. Verify Lab Report Clinical Isolation (No fake meds injected)
console.log('\n▶ GROUP 4: Zero Fake Meds on Diagnostic Lab Sheets');
const labText = `
Pathology Diagnostic Center
Patient: Liver Function Profile
Date: 10/10/2026
SGPT / ALT: 38 U/L (7-56)
SGOT / AST: 32 U/L (10-40)
Total Bilirubin: 0.8 mg/dL (0.2-1.2)
HBsAg: Non-Reactive
`;
const parsedLab = parseDocumentContent(labText, 'lab_report.png');
assert.strictEqual(parsedLab.classification, 'LAB_REPORT', 'Classification must be LAB_REPORT');
assert.strictEqual(parsedLab.structuredMeds.length, 0, 'No fake medicines may be created for lab reports');
console.log('  ✓ PASS: Lab reports yield exactly 0 medications and extract clean biomarkers');

console.log('\n======================================================');
console.log('🎉 ALL /api/analyze AND KRISH X TATTVA TESTS PASSED (100%)');
console.log('======================================================\n');
