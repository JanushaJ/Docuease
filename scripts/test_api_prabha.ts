async function testApi() {
  const res = await fetch('http://localhost:5001/api/documents/demo-doc-prabha');
  console.log('HTTP Status:', res.status);
  const data = await res.json();
  const doc = data.document;
  console.log('Document ID:', doc.id);
  console.log('Document Name:', doc.name);
  console.log('Diagnoses:', doc.diagnoses);
  console.log('Blood Group:', doc.tokens.find((t: any) => t.text.includes('Blood group'))?.text);
  console.log('Medicines:', doc.structuredMeds.map((m: any) => `${m.name} - ${m.dosage}`));
  console.log('Spoken Intro (EN):', doc.translations.en.sentenceTimings[0].sentence);
  console.log('Spoken Diag (EN):', doc.translations.en.sentenceTimings[2].sentence);
  console.log('Spoken Blood (EN):', doc.translations.en.sentenceTimings[3].sentence);
  console.log('Spoken Meds (EN):', doc.translations.en.sentenceTimings[4].sentence);
  console.log('Spoken Safety (EN):', doc.translations.en.sentenceTimings[6].sentence);
}

testApi().catch(console.error);
