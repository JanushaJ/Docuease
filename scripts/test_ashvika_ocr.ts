import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';

async function testAshvika() {
  const filePath = 'C:/Users/admin/.gemini/antigravity-ide/brain/26059ff0-28c6-459e-bc9b-7894f1941b99/.user_uploaded/media_1790782924709.png';
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    return;
  }
  const imgBuffer = fs.readFileSync(filePath);
  console.log('Image buffer size:', imgBuffer.length);

  console.log('Running Tesseract on image...');
  const result = await Tesseract.recognize(imgBuffer, 'eng');
  console.log('--- RAW TESSERACT TEXT ---');
  console.log(result.data.text);
  console.log('--- END RAW TEXT ---');
}

testAshvika().catch(console.error);
