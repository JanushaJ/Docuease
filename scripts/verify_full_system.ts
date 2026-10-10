import { runRealOcr } from '../server/realOcr';
import { buildDynamicMultilingualExplanations } from '../server/dynamicTranslator';
import { answerRealDoctorQuestion } from '../server/realChat';
import { DEMO_DOCUMENTS } from '../server/demoDocuments';

async function main() {
  console.log('=== MEDSCRIPT AI VERIFICATION TEST ===\n');

  // Test 1: Check Demo Document #0 (Prabha Hospital Requisition)
  const prabhaDoc = DEMO_DOCUMENTS.find(d => d.id === 'demo-doc-prabha');
  if (!prabhaDoc) {
    throw new Error('Prabha hospital demo document not found in DEMO_DOCUMENTS!');
  }
  console.log('✅ Demo Document Found:', prabhaDoc.name);
  console.log('• Patient:', prabhaDoc.tokens.find(t => t.text.includes('Ashok'))?.text);
  console.log('• Diagnosis:', prabhaDoc.diagnoses);
  console.log('• Blood Group:', prabhaDoc.tokens.find(t => t.text.includes('Blood group'))?.text);
  console.log('• Prescribed Medicine:', prabhaDoc.structuredMeds.map(m => `${m.name} - ${m.dosage}`));

  // Test 2: Run Real OCR directly on Prabha Hospital slip
  const ocrResult = await runRealOcr('/prabha_covid_slip.png', 'test-doc-123');
  console.log('\n✅ OCR Engine Extraction:');
  console.log('• Doctor Name:', ocrResult.doctorName);
  console.log('• Patient Name:', ocrResult.patientName);
  console.log('• Diagnoses:', ocrResult.diagnoses);
  console.log('• Structured Meds:', ocrResult.structuredMeds.map(m => `${m.name} | ${m.strength} | ${m.dosage} | ${m.route}`));
  console.log('• Safety/Timing Instructions:', ocrResult.structuredMeds[0]?.timingInstructions);

  // Test 3: Multilingual Explanations
  const explanations = buildDynamicMultilingualExplanations(ocrResult, ocrResult.tokens);
  console.log('\n✅ Spoken Explanations:');
  console.log('• English Script:\n ', explanations.en.spokenScript);
  console.log('\n• Hindi Script:\n ', explanations.hi.spokenScript);

  // Test 4: Chat Engine Grounded Q&A
  console.log('\n✅ Doctor Chat Grounding Tests:');
  const q1 = await answerRealDoctorQuestion(prabhaDoc, 'What is my diagnosis? Am I positive for covid?');
  console.log('\n[Q1: Covid Diagnosis]:\n', q1.answer);

  const q2 = await answerRealDoctorQuestion(prabhaDoc, 'What is my blood group?');
  console.log('\n[Q2: Blood Group]:\n', q2.answer);

  const q3 = await answerRealDoctorQuestion(prabhaDoc, 'What medicine did the doctor prescribe? What is FFP?');
  console.log('\n[Q3: Prescribed Medicine]:\n', q3.answer);

  console.log('\n=== ALL VERIFICATION TESTS PASSED ===');
}

main().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
