import fs from 'fs';
import path from 'path';

const doctorSrc = 'C:/Users/admin/.gemini/antigravity-ide/brain/26059ff0-28c6-459e-bc9b-7894f1941b99/cartoon_doctor_friendly_1790783166160.jpg';
const doctorDest = path.resolve('public/doctor_cartoon.jpg');
const doctorDest2 = path.resolve('public/doctor_cartoon_friendly.jpg');

if (fs.existsSync(doctorSrc)) {
  fs.copyFileSync(doctorSrc, doctorDest);
  fs.copyFileSync(doctorSrc, doctorDest2);
  console.log('Successfully updated public/doctor_cartoon.jpg');
} else {
  console.error('Doctor source does not exist:', doctorSrc);
}

const slipSrc = 'C:/Users/admin/.gemini/antigravity-ide/brain/26059ff0-28c6-459e-bc9b-7894f1941b99/.user_uploaded/media_1790782924709.png';
const slipDest = path.resolve('public/ashvika_pediatric_prescription.png');

if (fs.existsSync(slipSrc)) {
  fs.copyFileSync(slipSrc, slipDest);
  console.log('Successfully saved public/ashvika_pediatric_prescription.png');
} else {
  console.error('Slip source does not exist:', slipSrc);
}
