import fs from 'fs';
import path from 'path';

const src = 'C:/Users/admin/.gemini/antigravity-ide/brain/26059ff0-28c6-459e-bc9b-7894f1941b99/.user_uploaded/media_1790779102842.png';
const dst = path.resolve('public/prabha_covid_slip.png');

try {
  fs.copyFileSync(src, dst);
  console.log('Successfully copied to:', dst, 'Size:', fs.statSync(dst).size);
} catch (err) {
  console.error('Error copying file:', err);
}
