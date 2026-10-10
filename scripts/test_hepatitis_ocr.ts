import { parseDocumentContent, buildTranslations } from '../server/ocrParser';

const hepatitisDoc = `
Diagnostic Pathology Laboratory
Patient: John Smith Age: 42 Sex: M
Clinical Notes: Viral Hepatitis Evaluation
Tests:
HBsAg: Non-Reactive
Anti-HCV: Non-Reactive
SGPT / ALT: 42 U/L (Reference: 7-56)
SGOT / AST: 36 U/L (Reference: 10-40)
Total Bilirubin: 0.9 mg/dL (Reference: 0.2-1.2)
Doctor Notes: Review with hepatologist.
`;

const parsed = parseDocumentContent(hepatitisDoc, 'Hepatitis_JohnSmith.pdf');
console.log('Classification:', parsed.classification);
console.log('Category Label:', parsed.detectedCategoryLabel);
console.log('Structured Meds (Length):', parsed.structuredMeds.length);
console.log('Lab Results Count:', parsed.labResults.length);
console.log('Lab Results:', parsed.labResults.map(l => l.testName + ': ' + l.result));
console.log('Spoken Script (EN):', parsed.spokenScriptEn);

const translations = buildTranslations(parsed);
console.log('Telugu Spoken:', translations.te.spokenScript);
console.log('Hindi Spoken:', translations.hi.spokenScript);
console.log('Contains dolo in EN?', parsed.spokenScriptEn.toLowerCase().includes('dolo'));
console.log('Contains dolo in WhatToWatch?', parsed.whatToWatchEn.toLowerCase().includes('dolo'));
console.log('Contains dolo in Telugu?', translations.te.spokenScript.toLowerCase().includes('dolo'));
console.log('Contains dolo in Hindi?', translations.hi.spokenScript.toLowerCase().includes('dolo'));
