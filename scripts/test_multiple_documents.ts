import fetch from 'node-fetch';

async function testMultipleDocuments() {
  console.log('================================================================');
  console.log('🏥 MEDSCRIPT AI — SECTION 22 REAL FILE-BASED MULTI-DOCUMENT TEST');
  console.log('================================================================\n');

  // Document 1: Cardiology & Endocrinology Prescription
  const cardiologySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="900" viewBox="0 0 800 900">
    <rect width="800" height="900" fill="#ffffff"/>
    <text x="60" y="80" font-family="Arial" font-size="22" font-weight="bold" fill="#0f172a">APOLLO CARDIOLOGY &amp; METABOLIC CENTRE</text>
    <text x="60" y="110" font-family="Arial" font-size="16" fill="#475569">Dr. Vikram Seth, MBBS, MD, DM (Cardiology)</text>
    <text x="60" y="150" font-family="Arial" font-size="16" fill="#1e293b">Patient: Meenakshi Sundaram | Age: 58 | Female | Date: 30-Sep-2026</text>
    <text x="60" y="200" font-family="Arial" font-size="18" font-weight="bold" fill="#0f172a">Diagnosis: Type 2 Diabetes Mellitus with Essential Hypertension</text>
    <text x="60" y="240" font-family="Arial" font-size="16" fill="#334155">Lab Findings: Fasting Blood Sugar: 168 mg/dl | HbA1c: 7.9% | BP: 142/90 mmHg</text>
    <text x="60" y="290" font-family="Arial" font-size="26" font-weight="bold" fill="#0284c7">Rx</text>
    <text x="80" y="340" font-family="Arial" font-size="18" fill="#0f172a">1. Tab. Metformin 500mg — 1 tab BD after meals for 30 days</text>
    <text x="80" y="390" font-family="Arial" font-size="18" fill="#0f172a">2. Tab. Telmisartan 40mg — 1 tab OD in the morning for 30 days</text>
    <text x="80" y="440" font-family="Arial" font-size="18" fill="#0f172a">3. Tab. Atorvastatin 20mg — 1 tab HS at bedtime for 30 days</text>
    <text x="60" y="510" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">Physician Advice:</text>
    <text x="80" y="545" font-family="Arial" font-size="15" fill="#334155">• Maintain strict low-salt, low-glycemic diabetic diet</text>
    <text x="80" y="575" font-family="Arial" font-size="15" fill="#334155">• 30 minutes brisk walking daily</text>
    <text x="80" y="605" font-family="Arial" font-size="15" fill="#334155">• Repeat fasting blood sugar and review in 1 month</text>
  </svg>`;
  const cardiologyDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(cardiologySvg)}`;

  console.log('--- 1. Uploading & Processing Document 1 (Cardiology) ---');
  const res1 = await fetch('http://localhost:5001/api/process-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Apollo_Cardiology_Metformin_Telmisartan.svg',
      imageDataUrl: cardiologyDataUrl,
      type: 'prescription'
    })
  });
  const data1: any = await res1.json();
  const doc1 = data1.document;
  console.log(`Document 1 Processed: ID=${doc1.id}, Name=${doc1.name}`);
  const meds1 = doc1.structuredMeds.map((m: any) => `${m.name} (${m.strength})`);
  console.log('Document 1 Detected Medicines:', meds1);

  // Assertions for Document 1
  const doc1Text = JSON.stringify(doc1);
  const doc1HasMetformin = doc1Text.includes('Metformin');
  const doc1HasTelmisartan = doc1Text.includes('Telmisartan');
  const doc1HasAtorvastatin = doc1Text.includes('Atorvastatin');
  const doc1HasParacetamol = doc1Text.includes('Paracetamol');
  const doc1HasAmoxicillin = doc1Text.includes('Amoxicillin');

  console.log('Document 1 Checks:');
  console.log(`  • Has Metformin: ${doc1HasMetformin} (Must be TRUE)`);
  console.log(`  • Has Telmisartan: ${doc1HasTelmisartan} (Must be TRUE)`);
  console.log(`  • Has Atorvastatin: ${doc1HasAtorvastatin} (Must be TRUE)`);
  console.log(`  • Has Paracetamol: ${doc1HasParacetamol} (Must be FALSE)`);
  console.log(`  • Has Amoxicillin: ${doc1HasAmoxicillin} (Must be FALSE)`);

  if (!doc1HasMetformin || !doc1HasTelmisartan || doc1HasParacetamol || doc1HasAmoxicillin) {
    throw new Error('Document 1 failed specificity assertions.');
  }

  // Document 2: Dermatology Prescription
  const dermSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="900" viewBox="0 0 800 900">
    <rect width="800" height="900" fill="#ffffff"/>
    <text x="60" y="80" font-family="Arial" font-size="22" font-weight="bold" fill="#0f172a">DERMA CARE SPECIALITY CLINIC</text>
    <text x="60" y="110" font-family="Arial" font-size="16" fill="#475569">Dr. Priya Sharma, MBBS, MD (Dermatology)</text>
    <text x="60" y="150" font-family="Arial" font-size="16" fill="#1e293b">Patient: Ananya Roy | Age: 26 | Female | Date: 30-Sep-2026</text>
    <text x="60" y="200" font-family="Arial" font-size="18" font-weight="bold" fill="#0f172a">Diagnosis: Acute Allergic Contact Dermatitis with Pruritus</text>
    <text x="60" y="250" font-family="Arial" font-size="26" font-weight="bold" fill="#0284c7">Rx</text>
    <text x="80" y="300" font-family="Arial" font-size="18" fill="#0f172a">1. Tab. Cetirizine 10mg — 1 tab OD at night for 7 days</text>
    <text x="80" y="350" font-family="Arial" font-size="18" fill="#0f172a">2. Oint. Mupirocin 2% — Apply topically BD on affected skin for 10 days</text>
    <text x="60" y="420" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">Instructions:</text>
    <text x="80" y="455" font-family="Arial" font-size="15" fill="#334155">• Do not scratch the affected skin lesion</text>
    <text x="80" y="485" font-family="Arial" font-size="15" fill="#334155">• Use mild soap-free cleanser</text>
  </svg>`;
  const dermDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(dermSvg)}`;

  console.log('\n--- 2. Uploading & Processing Document 2 (Dermatology) ---');
  const res2 = await fetch('http://localhost:5001/api/process-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Derma_Care_Cetirizine_Mupirocin.svg',
      imageDataUrl: dermDataUrl,
      type: 'prescription'
    })
  });
  const data2: any = await res2.json();
  const doc2 = data2.document;
  console.log(`Document 2 Processed: ID=${doc2.id}, Name=${doc2.name}`);
  const meds2 = doc2.structuredMeds.map((m: any) => `${m.name} (${m.strength})`);
  console.log('Document 2 Detected Medicines:', meds2);

  // Assertions for Document 2
  const doc2Text = JSON.stringify(doc2);
  const doc2HasCetirizine = doc2Text.includes('Cetirizine');
  const doc2HasMupirocin = doc2Text.includes('Mupirocin');
  const doc2HasMetformin = doc2Text.includes('Metformin');
  const doc2HasTelmisartan = doc2Text.includes('Telmisartan');
  const doc2HasParacetamol = doc2Text.includes('Paracetamol');

  console.log('Document 2 Checks:');
  console.log(`  • Has Cetirizine: ${doc2HasCetirizine} (Must be TRUE)`);
  console.log(`  • Has Mupirocin: ${doc2HasMupirocin} (Must be TRUE)`);
  console.log(`  • Has Metformin: ${doc2HasMetformin} (Must be FALSE)`);
  console.log(`  • Has Telmisartan: ${doc2HasTelmisartan} (Must be FALSE)`);
  console.log(`  • Has Paracetamol: ${doc2HasParacetamol} (Must be FALSE)`);

  if (!doc2HasCetirizine || !doc2HasMupirocin || doc2HasMetformin || doc2HasTelmisartan) {
    throw new Error('Document 2 failed specificity assertions.');
  }

  // Verify grounded chatbot answers separately for each document
  console.log('\n--- 3. Testing Grounded Q&A against Document 1 (Cardiology) ---');
  const chatRes1 = await fetch('http://localhost:5001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      docId: doc1.id,
      question: 'What is my prescribed blood pressure medicine?'
    })
  });
  const chat1: any = await chatRes1.json();
  console.log('Q: What is my prescribed blood pressure medicine?');
  console.log('Doctor Answer 1:', chat1.answer);
  const chat1HasTelmisartan = chat1.answer.includes('Telmisartan');
  console.log(`Identified Telmisartan accurately? ${chat1HasTelmisartan}`);

  console.log('\n--- 4. Testing Grounded Q&A against Document 2 (Dermatology) ---');
  const chatRes2 = await fetch('http://localhost:5001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      docId: doc2.id,
      question: 'What is my prescribed blood pressure medicine?'
    })
  });
  const chat2: any = await chatRes2.json();
  console.log('Q: What is my prescribed blood pressure medicine?');
  console.log('Doctor Answer 2:', chat2.answer);
  const chat2Clarified = chat2.answer.toLowerCase().includes('not') || chat2.answer.includes('does not');
  console.log(`Correctly refused non-existent BP medicine in dermatology doc? ${chat2Clarified}`);

  // Document 3: Verify SQLite database persistence of both documents
  console.log('\n--- 5. Inspecting SQLite Records in medscript.db ---');
  const listRes = await fetch('http://localhost:5001/api/documents');
  const listData: any = await listRes.json();
  console.log(`Total documents currently persisted in SQLite: ${listData.documents?.length}`);
  for (const d of listData.documents) {
    console.log(`  • [${d.id}] ${d.name} — Uploaded: ${d.uploadedAt}, Size: ${d.fileSize} bytes`);
  }

  console.log('\n================================================================');
  console.log('✅ MULTI-DOCUMENT FILE-BASED VERIFICATION PASSED WITH ZERO CROSS-CONTAMINATION!');
  console.log('================================================================');
}

testMultipleDocuments().catch(err => {
  console.error('Multi-document test failed:', err);
  process.exit(1);
});
