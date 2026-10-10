/**
 * Automated Verification Test Suite for Vaidyalens
 * Proves the 5 mandatory rules:
 * 1. Gibberish name like "hajajakabsb" returns "no confident match"
 * 2. Misspelled real brand name returns the correct candidate as an UNCONFIRMED SUGGESTION (LIKELY), not confirmed fact
 * 3. Impossible strength (e.g., Paracetamol 5000mg) is rejected
 * 4. Legitimate name with OCR consensus agreement returns VERIFIED
 * 5. Unknown/unloaded drug never invents data and returns "no confident match"
 */

import { verifyMedicineCandidate } from '../server/drugVerification';
import { MEDICINES_DB, LAB_TESTS_DB, initializeDrugDatabase } from '../server/drugDatabase';

async function runVerificationTests() {
  console.log('===================================================================');
  console.log('🧪 VAIDYALENS DRUG VERIFICATION DATABASE TEST SUITE');
  console.log('===================================================================\n');

  const stats = initializeDrugDatabase();
  console.log(`📊 Loaded Database Records: ${stats.rowCount} medicines, ${LAB_TESTS_DB.length} lab tests.`);
  console.log(`   Duplicates Merged Across Sources: ${stats.duplicateCount}\n`);

  let passedTests = 0;
  let totalTests = 0;

  function assert(testName: string, condition: boolean, details?: string) {
    totalTests++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      if (details) console.log(`   ↳ ${details}`);
      passedTests++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      if (details) console.error(`   ↳ ${details}`);
    }
  }

  // -----------------------------------------------------------------
  // TEST 1: Gibberish Name Rejection
  // -----------------------------------------------------------------
  console.log('\n--- 1. Gibberish Rejection Tests ---');
  const gibberishResult = verifyMedicineCandidate('hajajakabsb');
  assert(
    'Gibberish "hajajakabsb" returns "no confident match"',
    gibberishResult.status === 'NO_MATCH' && gibberishResult.message === 'no confident match',
    `Status: ${gibberishResult.status}, Top Matches: ${gibberishResult.top_matches.length}, Message: "${gibberishResult.message}"`
  );

  const randomNoiseResult = verifyMedicineCandidate('xyzqwerty999');
  assert(
    'Random noise "xyzqwerty999" returns "no confident match"',
    randomNoiseResult.status === 'NO_MATCH' && randomNoiseResult.message === 'no confident match',
    `Status: ${randomNoiseResult.status}, Message: "${randomNoiseResult.message}"`
  );

  // -----------------------------------------------------------------
  // TEST 2: Misspelled Brand Name as Suggestion (Not Confirmed Fact)
  // -----------------------------------------------------------------
  console.log('\n--- 2. Misspelling & Suggestion Tests ---');
  const misspelledDolo = verifyMedicineCandidate('Doloo', '650mg', 1); // Only 1 engine, not consensus
  assert(
    'Misspelled "Doloo" returns candidate "Dolo 650" as suggestion (LIKELY, not VERIFIED)',
    misspelledDolo.status === 'LIKELY' && 
    misspelledDolo.best_match !== null &&
    misspelledDolo.best_match.brand_name.includes('Dolo') &&
    misspelledDolo.best_match.verdict === 'LIKELY',
    `Matched: ${misspelledDolo.best_match?.brand_name} with score ${(misspelledDolo.best_match?.composite_score || 0) * 100}%. Status: ${misspelledDolo.status}`
  );

  const misspelledAugmentin = verifyMedicineCandidate('Augmentnn 625', undefined, 1);
  assert(
    'Misspelled "Augmentnn 625" returns candidate "Augmentin 625 Duo" as unconfirmed suggestion',
    misspelledAugmentin.status === 'LIKELY' &&
    misspelledAugmentin.best_match !== null &&
    misspelledAugmentin.best_match.brand_name.includes('Augmentin'),
    `Matched: ${misspelledAugmentin.best_match?.brand_name}, Composite Score: ${misspelledAugmentin.best_match?.composite_score}`
  );

  // -----------------------------------------------------------------
  // TEST 3: Impossible Strength Rejection
  // -----------------------------------------------------------------
  console.log('\n--- 3. Clinical Strength Validation Tests ---');
  const impossibleStrength = verifyMedicineCandidate('Paracetamol', '5000mg', 2);
  assert(
    'Impossible strength "Paracetamol 5000mg" is rejected',
    impossibleStrength.status === 'STRENGTH_REJECTED' && impossibleStrength.clinical_strength_valid === false,
    `Status: ${impossibleStrength.status}, Reason: "${impossibleStrength.message}"`
  );

  const impossibleAzithral = verifyMedicineCandidate('Azithral', '2500mg', 2);
  assert(
    'Impossible strength "Azithral 2500mg" is rejected',
    impossibleAzithral.status === 'STRENGTH_REJECTED' && impossibleAzithral.clinical_strength_valid === false,
    `Status: ${impossibleAzithral.status}, Reason: "${impossibleAzithral.message}"`
  );

  const validStrength = verifyMedicineCandidate('Paracetamol', '650mg', 2);
  assert(
    'Valid strength "Paracetamol 650mg" is accepted',
    validStrength.clinical_strength_valid === true && validStrength.status === 'VERIFIED',
    `Status: ${validStrength.status}, Matched: ${validStrength.best_match?.brand_name}`
  );

  // -----------------------------------------------------------------
  // TEST 4: Full Multi-Engine Agreement = VERIFIED
  // -----------------------------------------------------------------
  console.log('\n--- 4. Multi-Engine Agreement Tests ---');
  const verifiedMatch = verifyMedicineCandidate('Dolo 650', '650mg', 2);
  assert(
    'High score AND multi-engine OCR consensus returns VERIFIED (green)',
    verifiedMatch.status === 'VERIFIED' && 
    verifiedMatch.ocr_engines_agreed === true &&
    verifiedMatch.best_match?.verdict === 'VERIFIED',
    `Status: ${verifiedMatch.status}, Composite Score: ${verifiedMatch.best_match?.composite_score}`
  );

  // -----------------------------------------------------------------
  // TEST 5: Never Invent Data (Non-existent Drug)
  // -----------------------------------------------------------------
  console.log('\n--- 5. Drug Data Invention Prevention Tests ---');
  const nonExistentDrug = verifyMedicineCandidate('Novasupercillin 900');
  assert(
    'Fictitious drug "Novasupercillin 900" is never invented and returns "no confident match"',
    nonExistentDrug.status === 'NO_MATCH' && nonExistentDrug.message === 'no confident match',
    `Status: ${nonExistentDrug.status}, Matches returned: ${nonExistentDrug.top_matches.length}`
  );

  console.log('\n===================================================================');
  console.log(`📈 TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('===================================================================\n');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runVerificationTests().catch((err) => {
  console.error('Fatal error running verification tests:', err);
  process.exit(1);
});
