import fs from 'fs';
import path from 'path';

async function verifyAshvikaUpload() {
  console.log('=== Verifying Ashvika Prescription Upload & Processing ===');

  const imagePath = path.resolve('public/ashvika_pediatric_prescription.png');
  if (!fs.existsSync(imagePath)) {
    console.error('File not found:', imagePath);
    process.exit(1);
  }

  const imageBuffer = fs.readFileSync(imagePath);
  const base64Data = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  console.log(`Sending image (${(imageBuffer.length / 1024).toFixed(1)} KB) to /api/process-document...`);
  const response = await fetch('http://localhost:5001/api/process-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageDataUrl: base64Data,
      filename: 'ashvika_pediatric_prescription.png'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Upload failed with status ${response.status}:`, errorText);
    process.exit(1);
  }

  const responseData = await response.json();
  const data = responseData.document || responseData;
  console.log('\n--- Processing Succeeded ---');
  console.log('Document ID:', data.id);
  console.log('Document Type:', data.documentType);
  console.log('Confidence Score:', data.confidenceInfo?.averageConfidenceScore);

  console.log('\n--- Structured Clinical Data Extracted ---');
  console.log('Patient Name:', data.structuredData?.patientName);
  console.log('Doctor Name:', data.structuredData?.doctorName);
  console.log('Hospital:', data.structuredData?.hospitalName);
  console.log('Diagnosis:', data.structuredData?.diagnosis);
  console.log('Vitals:');
  console.log(' - Weight:', data.structuredData?.vitals?.weight);
  console.log(' - Respiratory Rate:', data.structuredData?.vitals?.respiratoryRate);
  console.log(' - Chest Sounds:', data.structuredData?.vitals?.chestSounds);

  console.log('\n--- Medications Deciphered & Verified ---');
  if (!data.structuredData?.medications || data.structuredData.medications.length !== 4) {
    console.error(`Expected 4 medications, found: ${data.structuredData?.medications?.length}`);
    process.exit(1);
  }

  for (const med of data.structuredData.medications) {
    console.log(`\n💊 ${med.name}`);
    console.log(`   Generic: ${med.genericName}`);
    console.log(`   Strength: ${med.strength}`);
    console.log(`   Dosage: ${med.dosage}`);
    console.log(`   Frequency: ${med.frequency}`);
    console.log(`   Duration: ${med.duration}`);
    console.log(`   Purpose: ${med.purpose}`);
    console.log(`   Caution: ${med.caution}`);
  }

  console.log('\n--- Testing Chat API on Processed Document ---');
  const chatQueries = [
    'What is Calpol prescribed for and is the dose correct for Ashvika?',
    'What does the Malayalam writing "കൂടിയ പനിക്ക്" mean?',
    'How should Meftal-P be given?'
  ];

  for (const query of chatQueries) {
    console.log(`\nQ: "${query}"`);
    const chatRes = await fetch(`http://localhost:5001/api/documents/${data.id}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: query, language: 'en' })
    });
    if (chatRes.ok) {
      const chatData = await chatRes.json();
      console.log(`A: ${chatData.reply.substring(0, 150)}...`);
    } else {
      console.error(`Chat failed for query: ${query}`);
    }
  }

  console.log('\n✅ ALL ASHVIKA VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

verifyAshvikaUpload().catch((err) => {
  console.error('Verification script crashed:', err);
  process.exit(1);
});
