import { parseDocumentContent, buildTranslations } from '../server/ocrParser';

const rxDoc = `
Medical Centre
Patient: John Smith
Date: 12/04/2026
Rx:
Betaloc 100mg - 14:5 BID
Dorzolamidum 10mg
Cimetidine 50mg
Dr. Robert Vance, MD
`;

const parsed = parseDocumentContent(rxDoc, 'JohnSmith_Rx.png');
console.log('Rx Classification:', parsed.classification);
console.log('Meds count:', parsed.structuredMeds.length);
console.log('Meds:', parsed.structuredMeds.map(m => m.name));
console.log('Spoken:', parsed.spokenScriptEn);
const translations = buildTranslations(parsed);
console.log('Telugu Spoken:', translations.te.spokenScript);
console.log('Contains dolo?', parsed.spokenScriptEn.toLowerCase().includes('dolo'));
