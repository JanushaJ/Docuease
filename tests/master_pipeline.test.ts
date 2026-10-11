import assert from 'node:assert';
import { parseDocumentContent, buildTranslations, extractFoodInstruction } from '../server/ocrParser';
import { BCP47_LANG_MAP } from '../src/utils/speech';

console.log('\n================================================================');
console.log('MASTER ENGINEERING TEST SUITE: PRIORITY 8 REAL DOCUMENT PIPELINE');
console.log('DocuEase / MedScrip AI — Production Verification & Zero Hallucination');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// CASE 1: Prescription containing explicit before-food instructions (AC)
// -----------------------------------------------------------------------------
console.log('▶ CASE 1: Prescription with explicit before-food instructions (AC)');
{
  const text = `
    Apex Gastro Clinic
    Dr. Rajesh Sharma, MD
    Patient: Ramesh Kumar
    Rx:
    Pantoprazole 40mg
    Sig: 1 tablet daily before food (AC) in the morning
    Duration: 14 days
  `;

  const foodInstr = extractFoodInstruction(text);
  assert.ok(foodInstr, 'Must identify food instruction when explicitly written');
  assert.strictEqual(foodInstr?.timing, 'before_food', 'Must be classified as before_food');

  const parsed = parseDocumentContent(text, 'prescription_ac.jpg');
  assert.strictEqual(parsed.classification, 'PRESCRIPTION');
  assert.ok(parsed.structuredMeds.length >= 1, 'Must extract Pantoprazole');
  
  const panto = parsed.structuredMeds[0];
  assert.ok(panto.timingInstructions?.toLowerCase().includes('before food'), 'Timing must explicitly reflect before food');
  assert.ok(parsed.simpleSummaryEn.toLowerCase().includes('before food') || panto.timingInstructions?.toLowerCase().includes('before food'), 'Explanation must mention before food because it is in the source');
  console.log('  ✓ PASS: Before-food instruction preserved truthfully from source document');
}

// -----------------------------------------------------------------------------
// CASE 2: Prescription containing explicit after-food instructions (PC)
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 2: Prescription with explicit after-food instructions (PC)');
{
  const text = `
    Care Clinic
    Dr. Anita Roy, MBBS
    Patient: Sunita Patel
    Rx:
    Amoxyclav 625mg
    Sig: 1 tab twice daily after food (PC)
    Duration: 5 days
  `;

  const foodInstr = extractFoodInstruction(text);
  assert.ok(foodInstr, 'Must identify food instruction');
  assert.strictEqual(foodInstr?.timing, 'after_food', 'Must be classified as after_food');

  const parsed = parseDocumentContent(text, 'prescription_pc.jpg');
  const amox = parsed.structuredMeds[0];
  assert.ok(amox, 'Must extract Amoxyclav');
  assert.ok(amox.timingInstructions?.toLowerCase().includes('after food'), 'Timing must state after food');
  
  // Strict negative assertion: Must NEVER convert to "before food"
  assert.strictEqual(
    amox.timingInstructions?.toLowerCase().includes('before food'),
    false,
    'System must NOT change after-food to before-food'
  );
  console.log('  ✓ PASS: After-food instruction preserved and never inverted');
}

// -----------------------------------------------------------------------------
// CASE 3: Prescription without any food instructions
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 3: Prescription WITHOUT any food instructions');
{
  const text = `
    City Allergy Center
    Dr. S. Nair
    Rx:
    Cetirizine 10mg
    Sig: 1 tab at bedtime (HS)
    Duration: 7 days
  `;

  const foodInstr = extractFoodInstruction(text);
  assert.strictEqual(foodInstr.timing, undefined, 'Must return undefined timing when no food instructions are present');
  assert.strictEqual(foodInstr.foodInstructions, undefined, 'Must return undefined foodInstructions when no food instructions are present');

  const parsed = parseDocumentContent(text, 'prescription_no_food.png');
  const cet = parsed.structuredMeds[0];
  assert.ok(cet, 'Must extract Cetirizine');

  // Must NOT invent or fabricate food instructions
  const timingHasBefore = cet.timingInstructions?.toLowerCase().includes('before food');
  const timingHasAfter = cet.timingInstructions?.toLowerCase().includes('after food');
  assert.strictEqual(timingHasBefore, false, 'Must NOT invent before-food instruction');
  assert.strictEqual(timingHasAfter, false, 'Must NOT invent after-food instruction');

  // English summary check
  assert.strictEqual(
    parsed.simpleSummaryEn.toLowerCase().includes('before food'),
    false,
    'Summary must NOT fabricate before-food instruction'
  );
  console.log('  ✓ PASS: Zero food instructions fabricated when absent in source document');
}

// -----------------------------------------------------------------------------
// CASE 4: Handwriting containing ambiguous medicine name or dosage
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 4: Ambiguous / unclear handwriting');
{
  const text = `
    General Clinic
    Doctor: Dr. V. Rao
    Rx:
    [Illegible cursive scribble ~~~ 25mg ?]
    Dosage: ? once daily
    Duration: ??
  `;

  const parsed = parseDocumentContent(text, 'unclear_rx.jpg');
  assert.strictEqual(parsed.classification, 'PRESCRIPTION');
  
  // Must flag uncertainty rather than hallucinating a confident medicine
  assert.ok(
    parsed.hasIllegibleText === true || parsed.structuredMeds.some(m => m.needsPharmacistVerification),
    'Must flag illegible text and require pharmacist verification'
  );

  const verificationMentioned = 
    parsed.whatToDoEn.toLowerCase().includes('pharmacist') || 
    parsed.simpleSummaryEn.toLowerCase().includes('pharmacist') ||
    parsed.structuredMeds.some(m => m.needsPharmacistVerification);

  assert.ok(verificationMentioned, 'Must explicitly advise user to confirm with pharmacist or clinician');
  console.log('  ✓ PASS: Flagged ambiguous handwriting and recommended professional verification');
}

// -----------------------------------------------------------------------------
// CASE 5: Multi-page laboratory report
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 5: Multi-page laboratory report');
{
  const multiPageText = `
    === PAGE 1 ===
    Metro Diagnostics Laboratory - Page 1 of 2
    Complete Blood Count (CBC)
    Hemoglobin: 13.8 g/dL (Reference: 13.0 - 17.0)
    RBC Count: 4.8 mill/uL (Reference: 4.5 - 5.5)
    Total Leucocyte Count (WBC): 6800 /uL (Reference: 4000 - 11000)
    Platelet Count: 240000 /uL (Reference: 150000 - 450000)

    === PAGE 2 ===
    Metro Diagnostics Laboratory - Page 2 of 2
    Renal & Liver Profile
    Serum Creatinine: 0.9 mg/dL (Reference: 0.7 - 1.3)
    Blood Urea Nitrogen: 16 mg/dL (Reference: 7 - 20)
    Bilirubin Total: 0.7 mg/dL (Reference: 0.2 - 1.2)
    SGPT / ALT: 28 U/L (Reference: 10 - 45)
  `;

  const parsed = parseDocumentContent(multiPageText, 'metro_multipg_lab.pdf');
  assert.strictEqual(parsed.classification, 'LAB_REPORT');
  
  // Verify tests from Page 1 were extracted
  const hb = parsed.labResults.find(l => l.testName.toLowerCase().includes('hemoglobin'));
  assert.ok(hb, 'Must extract Hemoglobin from Page 1');
  assert.strictEqual(hb.result, '13.8', 'Hemoglobin result must be 13.8');

  // Verify tests from Page 2 were extracted
  const creat = parsed.labResults.find(l => l.testName.toLowerCase().includes('creatinine'));
  assert.ok(creat, 'Must extract Serum Creatinine from Page 2');
  assert.strictEqual(creat.result, '0.9', 'Creatinine result must be 0.9');

  const alt = parsed.labResults.find(l => l.testName.toLowerCase().includes('sgpt') || l.testName.toLowerCase().includes('alt'));
  assert.ok(alt, 'Must extract SGPT from Page 2');

  console.log('  ✓ PASS: Multi-page report successfully parsed across all pages');
}

// -----------------------------------------------------------------------------
// CASE 6: Medical report containing actual test values, units, reference ranges
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 6: Medical report with exact test values, units & reference ranges');
{
  const text = `
    Thyrocare Diagnostics
    Investigation: Thyroid Profile
    TSH: 2.45 uIU/mL (Reference: 0.40 - 4.50)
    Free T4: 1.15 ng/dL (Reference: 0.80 - 1.80)
    Free T3: 3.10 pg/mL (Reference: 2.30 - 4.20)
  `;

  const parsed = parseDocumentContent(text, 'thyroid_panel.pdf');
  assert.strictEqual(parsed.classification, 'LAB_REPORT');
  assert.strictEqual(parsed.structuredMeds.length, 0, 'Lab reports must contain ZERO medications');

  const tsh = parsed.labResults.find(l => l.testName.toLowerCase().includes('tsh'));
  assert.ok(tsh, 'Must extract TSH');
  assert.strictEqual(tsh.result, '2.45');
  assert.ok(tsh.unit?.includes('uIU/mL'), 'Must preserve unit uIU/mL');
  assert.ok(tsh.referenceRange?.includes('0.40') && tsh.referenceRange?.includes('4.50'), 'Must preserve reference range');

  console.log('  ✓ PASS: Exact test values, units, and reference ranges preserved without hallucination');
}

// -----------------------------------------------------------------------------
// CASE 7: Non-medical document (Utility Bill)
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 7: Non-medical document (Electricity Utility Bill)');
{
  const text = `
    Southern Power Distribution Company
    Electricity Bill & Notice
    Consumer Number: 994821034
    Billing Period: September 2026
    Units Consumed: 215 kWh
    Total Amount Due: ₹1,120.50
    Due Date: 28 Sep 2026
    Notice: Surcharge payable after due date.
  `;

  const parsed = parseDocumentContent(text, 'electricity_bill.pdf');
  assert.strictEqual(parsed.classification, 'ELECTRICITY_BILL');
  assert.strictEqual(parsed.structuredMeds.length, 0, 'Non-medical document must NEVER have medications');

  assert.ok(parsed.billDetails, 'Must extract billDetails');
  assert.ok(parsed.billDetails?.amountDue?.includes('1,120.50') || parsed.billDetails?.amountDue?.includes('1120'), 'Must extract exact amount ₹1,120.50');
  assert.ok(parsed.billDetails?.consumerNumber?.includes('994821034'), 'Must extract consumer number 994821034');
  assert.ok(parsed.billDetails?.dueDate?.includes('28 Sep 2026') || parsed.billDetails?.dueDate?.includes('28'), 'Must extract due date');

  // Verify non-medical content does not mention prescriptions or medicines
  assert.strictEqual(parsed.simpleSummaryEn.toLowerCase().includes('prescription'), false);
  assert.strictEqual(parsed.simpleSummaryEn.toLowerCase().includes('medicine'), false);
  console.log('  ✓ PASS: Non-medical document cleanly classified and extracted without medical fields');
}

// -----------------------------------------------------------------------------
// CASE 8: Telugu selection (Text translation & Speech voice matching)
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 8: Telugu language selection & speech voice configuration');
{
  const text = `
    Apex Gastro Clinic
    Rx: Pantoprazole 40mg
    Sig: 1 tablet daily before food (AC)
    Duration: 14 days
  `;

  const parsed = parseDocumentContent(text, 'rx.jpg');
  const translations = buildTranslations(parsed);

  const telugu = translations['te'];
  assert.ok(telugu, 'Telugu translation must exist');
  assert.ok(telugu.simpleSummary, 'Telugu simpleSummary must not be empty');
  
  // Verify authentic Telugu Unicode characters (0x0C00 - 0x0C7F)
  const hasTeluguChars = /[\u0C00-\u0C7F]/.test(telugu.simpleSummary);
  assert.ok(hasTeluguChars, 'Explanation must be in authentic Telugu script, not English');

  // Voice mapping check
  const teluguVoiceLocale = BCP47_LANG_MAP['te'];
  assert.strictEqual(teluguVoiceLocale, 'te-IN', 'Telugu voice locale must map to te-IN for correct speech synthesis');
  console.log('  ✓ PASS: Telugu explanation rendered in authentic Telugu script and mapped to te-IN voice');
}

// -----------------------------------------------------------------------------
// CASE 9: Tamil selection (Text translation & Speech voice matching)
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 9: Tamil language selection & speech voice configuration');
{
  const text = `
    Care Clinic
    Rx: Amoxyclav 625mg
    Sig: 1 tab twice daily after food (PC)
    Duration: 5 days
  `;

  const parsed = parseDocumentContent(text, 'rx.jpg');
  const translations = buildTranslations(parsed);

  const tamil = translations['ta'];
  assert.ok(tamil, 'Tamil translation must exist');
  assert.ok(tamil.simpleSummary, 'Tamil simpleSummary must not be empty');

  // Verify authentic Tamil Unicode characters (0x0B80 - 0x0BFF)
  const hasTamilChars = /[\u0B80-\u0BFF]/.test(tamil.simpleSummary);
  assert.ok(hasTamilChars, 'Explanation must be in authentic Tamil script, not English');

  // Voice mapping check
  const tamilVoiceLocale = BCP47_LANG_MAP['ta'];
  assert.strictEqual(tamilVoiceLocale, 'ta-IN', 'Tamil voice locale must map to ta-IN for correct speech synthesis');
  console.log('  ✓ PASS: Tamil explanation rendered in authentic Tamil script and mapped to ta-IN voice');
}

// -----------------------------------------------------------------------------
// CASE 10: Provider / OCR unreadable handling
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 10: Unreadable or corrupted input handling');
{
  const emptyText = '   ';
  const parsed = parseDocumentContent(emptyText, 'unreadable_scan.png');
  
  // Must NOT fabricate a default prescription with Dolo or ₹742 bill
  assert.strictEqual(parsed.structuredMeds.length, 0, 'Must not inject medications on unreadable input');
  assert.strictEqual(parsed.hasIllegibleText, true, 'Must flag that text is illegible or unreadable');
  console.log('  ✓ PASS: Unreadable upload flagged honestly without generating fabricated clinical data');
}

// -----------------------------------------------------------------------------
// CASE 11: Corrupted or oversized payload rejection
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 11: Safety checks for non-existent text');
{
  const parsed = parseDocumentContent('', 'blank.jpg');
  assert.strictEqual(parsed.rawOcrText, '', 'Raw text must remain empty');
  assert.strictEqual(parsed.structuredMeds.length, 0, 'Medications must be empty');
  console.log('  ✓ PASS: Empty payload safely handled without crashing or fallback fabrication');
}

// -----------------------------------------------------------------------------
// CASE 12: Consecutive different document uploads (No state bleed / cache leak)
// -----------------------------------------------------------------------------
console.log('\n▶ CASE 12: Consecutive different uploads (Prescription -> Utility -> Lab)');
{
  // Upload 1: Prescription
  const rxText = `City Clinic\nRx: Metformin 500mg\nSig: 1 tab daily with meals`;
  const rxResult = parseDocumentContent(rxText, 'rx_upload.jpg');
  assert.strictEqual(rxResult.classification, 'PRESCRIPTION');
  assert.ok(rxResult.structuredMeds.some(m => m.name.toLowerCase().includes('metformin')));

  // Upload 2: Utility Bill
  const billText = `Gas Utility Corp\nAccount: 778899\nAmount Due: ₹450.00\nDue: 20 Oct 2026`;
  const billResult = parseDocumentContent(billText, 'gas_bill.jpg');
  assert.ok(billResult.classification === 'GAS_BILL' || billResult.classification === 'UTILITY_OR_NOTICE' || billResult.classification === 'ELECTRICITY_BILL', 'Must classify as utility or gas document');
  assert.strictEqual(billResult.structuredMeds.length, 0, 'Upload 2 must NOT inherit Metformin from Upload 1');

  // Upload 3: Lab Report
  const labText = `Diagnostic Lab\nLipid Profile\nTotal Cholesterol: 195 mg/dL (Reference: < 200)`;
  const labResult = parseDocumentContent(labText, 'lipid_lab.pdf');
  assert.strictEqual(labResult.classification, 'LAB_REPORT');
  assert.strictEqual(labResult.structuredMeds.length, 0, 'Upload 3 must NOT inherit medications');
  assert.strictEqual(labResult.billDetails, undefined, 'Upload 3 must NOT inherit bill amounts from Upload 2');

  console.log('  ✓ PASS: Complete isolation across consecutive uploads — zero state or cache bleed');
}

// -----------------------------------------------------------------------------
// REGRESSION CHECK: Kill the specific canned bug
// -----------------------------------------------------------------------------
console.log('\n▶ REGRESSION AUDIT: Confirm complete eradication of canned response bug');
{
  const hepatitisSample = `Pathology Lab\nHBsAg: Non-Reactive\nSGPT: 34 U/L`;
  const parsed = parseDocumentContent(hepatitisSample, 'hep_scan.png');

  // Assert against canned identities
  assert.strictEqual(parsed.structuredMeds.some(m => m.name.toLowerCase().includes('dolo')), false);
  assert.strictEqual(parsed.structuredMeds.some(m => m.name.toLowerCase().includes('combiflam')), false);
  assert.strictEqual(parsed.simpleSummaryEn.includes('Rajeev Verma'), false);
  assert.strictEqual(parsed.simpleSummaryEn.includes('₹742.00'), false);
  console.log('  ✓ PASS: Confirmed zero canned responses or fake fallback identities in extraction path');
}

console.log('\n================================================================');
console.log('🎉 ALL 12 PRIORITY 8 TEST CASES PASSED WITH 100% SUCCESS!');
console.log('================================================================\n');
