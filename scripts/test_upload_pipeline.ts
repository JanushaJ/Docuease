import fs from 'fs';
import { runRealOcr } from '../server/realOcr';

async function testUploadPipeline() {
  const filePath = 'public/prabha_covid_slip.png';
  const buffer = fs.readFileSync(filePath);
  const base64 = `data:image/png;base64,${buffer.toString('base64')}`;
  
  console.log('Testing upload of Prabha slip (size:', buffer.length, 'bytes)...');
  const res = await runRealOcr(base64, 'test-upload-doc-999');
  
  console.log('Extracted Doctor:', res.doctorName);
  console.log('Extracted Patient:', res.patientName);
  console.log('Extracted Diagnoses:', res.diagnoses);
  console.log('Extracted Lab Values:', res.labValues);
  console.log('Extracted Meds:', res.structuredMeds.map(m => `${m.name} | ${m.dosage}`));
  console.log('3-Way Separation Sections:');
  console.log('• Document Says:', res.separatedContent.documentSays.length, 'items');
  console.log('• Term Meanings:', res.separatedContent.termMeanings.length, 'items');
  console.log('• Not Determined:', res.separatedContent.notDetermined.length, 'items');
}

testUploadPipeline().catch(console.error);
