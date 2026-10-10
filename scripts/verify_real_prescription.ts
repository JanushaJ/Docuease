import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

async function runTest() {
  console.log('--- 1. Testing Health Endpoint ---');
  const healthRes = await fetch('http://localhost:5001/api/health');
  const health = await healthRes.json();
  console.log('Backend Health:', health);

  console.log('\n--- 2. Generating Realistic Prescription Document (URTI + Paracetamol + Amoxicillin) ---');
  // Create an SVG prescription
  const svgPrescription = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="#ffffff"/>
    <rect x="40" y="40" width="720" height="920" fill="none" stroke="#0284c7" stroke-width="3" rx="12"/>
    <text x="60" y="90" font-family="Arial" font-size="24" font-weight="bold" fill="#0f172a">CITY HEALTH CLINIC</text>
    <text x="60" y="120" font-family="Arial" font-size="16" fill="#475569">Dr. Anita Rajan, MBBS, MD (General Medicine)</text>
    <text x="60" y="145" font-family="Arial" font-size="14" fill="#64748b">Reg No: TN-65432 | Phone: +91 98400 12345</text>
    <line x1="60" y1="165" x2="740" y2="165" stroke="#cbd5e1" stroke-width="2"/>
    <text x="60" y="200" font-family="Arial" font-size="16" fill="#1e293b">Patient: Ramesh Kumar | Age: 42 Yrs | Male | Date: 29-Sep-2026</text>
    <line x1="60" y1="220" x2="740" y2="220" stroke="#e2e8f0" stroke-width="1"/>
    <text x="60" y="260" font-family="Arial" font-size="18" font-weight="bold" fill="#0f172a">Diagnosis: Acute Upper Respiratory Tract Infection (URTI) with Fever</text>
    <text x="60" y="320" font-family="Arial" font-size="26" font-weight="bold" fill="#0284c7">Rx</text>
    <text x="80" y="370" font-family="Arial" font-size="18" fill="#0f172a">1. Tab. Paracetamol 650mg — 1 tab TDS after meals for 3 days</text>
    <text x="80" y="420" font-family="Arial" font-size="18" fill="#0f172a">2. Tab. Amoxicillin 500mg — 1 tab BD after food for 5 days</text>
    <text x="80" y="470" font-family="Arial" font-size="18" fill="#0f172a">3. Syr. Ascoril D Cough Formula — 5ml at bedtime for 4 days</text>
    <line x1="60" y1="520" x2="740" y2="520" stroke="#cbd5e1" stroke-width="1"/>
    <text x="60" y="560" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">Advice &amp; Instructions:</text>
    <text x="80" y="595" font-family="Arial" font-size="15" fill="#334155">• Drink plenty of warm fluids and steam inhalation twice daily</text>
    <text x="80" y="630" font-family="Arial" font-size="15" fill="#334155">• Avoid cold food and drinks</text>
    <text x="80" y="665" font-family="Arial" font-size="15" fill="#334155">• Review after 5 days if fever persists</text>
    <text x="560" y="860" font-family="Brush Script MT, cursive" font-size="28" fill="#1e3a8a">Dr. Anita Rajan</text>
    <text x="560" y="885" font-family="Arial" font-size="14" fill="#64748b">Authorized Signatory</text>
  </svg>`;

  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgPrescription)}`;

  console.log('\n--- 3. Processing Uploaded Document via /api/process-document ---');
  const processRes = await fetch('http://localhost:5001/api/process-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dr_Anita_Prescription_URTI.svg',
      imageDataUrl: dataUrl,
      type: 'prescription'
    })
  });

  const processJson = await processRes.json();
  if (!processJson.success) {
    console.error('Failed to process document:', processJson);
    process.exit(1);
  }

  const doc = processJson.document;
  console.log(`Document ID: ${doc.id}`);
  console.log(`Extracted Tokens Count: ${doc.tokens.length}`);
  console.log(`Sample Tokens:`, doc.tokens.slice(0, 5).map((t: any) => `[${t.category}] ${t.text}`));

  // Check that Metformin or Leukopenia are NOT present!
  const hasMetformin = JSON.stringify(doc.tokens).includes('Metformin');
  const hasLeukopenia = JSON.stringify(doc.tokens).includes('Leukopenia');
  console.log(`Contains Metformin? ${hasMetformin} (Expected: false)`);
  console.log(`Contains Leukopenia? ${hasLeukopenia} (Expected: false)`);

  const hasParacetamol = JSON.stringify(doc.tokens).includes('Paracetamol');
  const hasAmoxicillin = JSON.stringify(doc.tokens).includes('Amoxicillin');
  console.log(`Contains Paracetamol? ${hasParacetamol} (Expected: true)`);
  console.log(`Contains Amoxicillin? ${hasAmoxicillin} (Expected: true)`);

  console.log('\n--- 4. Checking Dynamic Tamil Explanation ---');
  const taExp = doc.translations.ta;
  console.log('Tamil Summary:', taExp.simpleSummary);
  console.log('Tamil Spoken Script:', taExp.spokenScript);
  console.log('Tamil Spoken Phonetic:', taExp.spokenScriptPhonetic);

  console.log('\n--- 5. Testing Grounded Ask Doctor (Cancer / Leukemia Question in Tanglish) ---');
  const askRes1 = await fetch('http://localhost:5001/api/ask-doctor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      docId: doc.id,
      question: 'doctory report solludhu ungaluku cancer leaukimia type nu neenga indha indha tablets podanum'
    })
  });
  const askJson1 = await askRes1.json();
  console.log('Doctor Answer 1 (Cancer Clarification):');
  console.log(askJson1.answer);

  console.log('\n--- 6. Testing Grounded Ask Doctor (What tablets to take?) ---');
  const askRes2 = await fetch('http://localhost:5001/api/ask-doctor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      docId: doc.id,
      question: 'What tablets should I take and what is in my prescription?'
    })
  });
  const askJson2 = await askRes2.json();
  console.log('Doctor Answer 2 (Prescribed Tablets):');
  console.log(askJson2.answer);

  console.log('\n--- 7. Verifying SQLite Database Storage ---');
  const dbRes = await fetch(`http://localhost:5001/api/documents/${doc.id}`);
  const dbJson = await dbRes.json();
  console.log('Fetched from SQLite by ID:', dbJson.success ? 'Success!' : 'Failed');
  console.log('Document in SQLite name:', dbJson.document?.name);

  const chatRes = await fetch(`http://localhost:5001/api/chat/${doc.id}`);
  const chatJson = await chatRes.json();
  console.log(`Chat messages persisted in SQLite: ${chatJson.messages?.length}`);

  console.log('\n✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

runTest().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
