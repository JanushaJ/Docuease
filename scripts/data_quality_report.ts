/**
 * Data Quality Check Script for Vaidyalens
 * Reports:
 * 1. Total row count
 * 2. Cross-source duplicate rate
 * 3. Count and percentage of rows with missing strength or generic name
 * 4. 20 stratified random rows for manual review
 * 5. Known limits of datasets
 */

import { MEDICINES_DB, LAB_TESTS_DB, initializeDrugDatabase, MedicineRecord } from '../server/drugDatabase';

function generateDataQualityReport() {
  const stats = initializeDrugDatabase();

  console.log('===================================================================');
  console.log('📋 VAIDYALENS DRUG VERIFICATION DATABASE: DATA QUALITY REPORT');
  console.log('===================================================================\n');

  const totalMedicines = MEDICINES_DB.length;
  const duplicateRate = totalMedicines > 0 ? ((stats.duplicateCount / (totalMedicines + stats.duplicateCount)) * 100).toFixed(2) : '0';
  const missingStrengthPct = totalMedicines > 0 ? ((stats.missingStrengthCount / totalMedicines) * 100).toFixed(2) : '0';
  const missingGenericPct = totalMedicines > 0 ? ((stats.missingGenericCount / totalMedicines) * 100).toFixed(2) : '0';

  console.log('📊 1. METRICS OVERVIEW:');
  console.log(`   • Total Loaded Medicines: ${totalMedicines}`);
  console.log(`   • Total Standard Lab Tests (LOINC): ${LAB_TESTS_DB.length}`);
  console.log(`   • Duplicates Merged Across Sources: ${stats.duplicateCount} (${duplicateRate}%)`);
  console.log(`   • Rows with Missing Strength: ${stats.missingStrengthCount} (${missingStrengthPct}%)`);
  console.log(`   • Rows with Missing Generic/Salt Name: ${stats.missingGenericCount} (${missingGenericPct}%)\n`);

  console.log('🔍 2. RANDOM SAMPLE FOR MANUAL REVIEW (20 Records):');
  console.log('-----------------------------------------------------------------------------------------------------------------------------------');
  console.log(
    '#'.padEnd(4) + 
    'Brand Name'.padEnd(24) + 
    'Generic Salt Composition'.padEnd(36) + 
    'Strength'.padEnd(18) + 
    'Form'.padEnd(12) + 
    'Primary Source'
  );
  console.log('-----------------------------------------------------------------------------------------------------------------------------------');

  // Shuffle sample
  const shuffled = [...MEDICINES_DB].sort(() => 0.5 - Math.random());
  const sample = shuffled.slice(0, 20);

  sample.forEach((m, idx) => {
    console.log(
      `${idx + 1}`.padEnd(4) +
      m.brand_name.padEnd(24).substring(0, 23) + ' ' +
      (m.generic_name || 'MISSING').padEnd(36).substring(0, 35) + ' ' +
      (m.strength || 'MISSING').padEnd(18).substring(0, 17) + ' ' +
      (m.dosage_form || 'N/A').padEnd(12).substring(0, 11) + ' ' +
      m.source.substring(0, 38)
    );
  });
  console.log('-----------------------------------------------------------------------------------------------------------------------------------\n');

  console.log('⚠️  3. KNOWN DATASET LIMITATIONS & SAFEGUARDS:');
  console.log('   1. Scraped Commercial Catalog Variations: Scraped Indian pharmacy datasets can contain vendor-specific packaging tokens (e.g. "strip of 10") in place of clinical strengths. Vaidyalens normalizes these out before fuzzy matching.');
  console.log('   2. Liquid and Topical Formulation Strengths: Syrups, drops, and ointments often have composite strength representations (e.g., "125mg/5ml", "1% w/w") that require dedicated ratio parsers.');
  console.log('   3. Discontinued Formulations: Commercial availability changes rapidly in India; records flagged discontinued must still match past prescriptions but warn the user if discontinued.');
  console.log('   4. Regulatory Variance: State vs Central CDSCO approval timelines can cause delays in newly launched FDCs appearing in federal lists.');
  console.log('   5. Non-Assumption Principle: Scraped datasets can have errors. NEVER treat any single source as 100% correct. All unconfirmed matches require human verification.');
  console.log('===================================================================\n');
}

generateDataQualityReport();
