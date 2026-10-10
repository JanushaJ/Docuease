import fs from 'fs';
import path from 'path';

const src = 'C:/Users/admin/.gemini/antigravity-ide/brain/26059ff0-28c6-459e-bc9b-7894f1941b99/cartoon_doctor_avatar_1790779321100.jpg';
const destDir = path.resolve('public');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
const dest = path.join(destDir, 'doctor_cartoon.jpg');
fs.copyFileSync(src, dest);
console.log('Successfully copied cartoon doctor avatar to:', dest);
