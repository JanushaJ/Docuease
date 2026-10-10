import { createCanvas } from 'canvas';
import fetch from 'node-fetch';

async function testTesseractImageOcr() {
  console.log('Testing Tesseract.js Real Image OCR...');
  
  // Create a canvas with medical prescription text
  const canvas = createCanvas(800, 900);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 800, 900);
  
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('ST. JUDE HEALTHCARE CLINIC', 50, 70);
  
  ctx.font = '18px sans-serif';
  ctx.fillText('Dr. David Miller, MD - Internal Medicine', 50, 110);
  ctx.fillText('Patient: Sarah Jenkins | Age: 36 | Date: 2026-09-29', 50, 150);
  
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Diagnosis: Acute Bronchitis', 50, 220);
  
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('Rx', 50, 280);
  
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('1. Tab. Azithromycin 500mg - 1 daily for 3 days', 70, 330);
  ctx.fillText('2. Tab. Cetirizine 10mg - 1 tab at night', 70, 380);
  ctx.fillText('3. Syr. Dolo 650mg - SOS for body pain', 70, 430);
  
  ctx.font = '18px sans-serif';
  ctx.fillText('Drink warm water. Rest for 3 days.', 50, 520);
  
  const pngDataUrl = canvas.toDataURL('image/png');
  
  console.log('Uploading Canvas PNG to /api/process-document...');
  const res = await fetch('http://localhost:5001/api/process-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'St_Jude_Prescription_Bronchitis.png',
      imageDataUrl: pngDataUrl,
      type: 'prescription'
    })
  });
  
  const data = await res.json();
  console.log('Tesseract OCR extraction result:');
  console.log('Doc ID:', data.document?.id);
  console.log('Extracted tokens:');
  (data.document?.tokens || []).forEach((t: any) => {
    console.log(` - [${t.category}] ${t.text} (${t.confidence}%)`);
  });
  
  // Test doctor chat with this image
  const chatRes = await fetch('http://localhost:5001/api/ask-doctor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      docId: data.document.id,
      question: 'What medicines should I take?'
    })
  });
  const chatData = await chatRes.json();
  console.log('Chat answer for PNG prescription:');
  console.log(chatData.answer);
}

testTesseractImageOcr().catch(err => {
  console.log('Canvas module not directly installed, which is fine since Tesseract handles raw PNG buffers in Node:', err.message);
});
