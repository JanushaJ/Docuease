import Tesseract from 'tesseract.js';
import fs from 'fs';
import path from 'path';

async function test() {
  const imgPath = 'C:/Users/admin/.gemini/antigravity-ide/brain/26059ff0-28c6-459e-bc9b-7894f1941b99/.user_uploaded/media_1790779102842.png';
  if (!fs.existsSync(imgPath)) {
    console.error('File does not exist:', imgPath);
    return;
  }
  const buffer = fs.readFileSync(imgPath);
  console.log('Running Tesseract on image size:', buffer.length);
  const result = await Tesseract.recognize(buffer, 'eng');
  console.log('--- RAW TESSERACT TEXT ---');
  console.log(result.data.text);
  console.log('--------------------------');
}

test().catch(console.error);
