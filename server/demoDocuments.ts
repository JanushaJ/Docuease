import { ProcessedDocument, SupportedLanguage, DocumentExplanation } from '../src/types/medscript';
import { getUniversalDemoDocuments } from './universalDemoSamples';
import { getHepatitisDocument } from '../src/data/hepatitisDemo';

// -------------------------------------------------------------
// Prescription 1 SVG & Crops
// -------------------------------------------------------------
function createPrescription1Svg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#fdfcf9" />
    <rect x="25" y="25" width="750" height="950" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
    
    <rect x="25" y="25" width="750" height="130" rx="8" fill="#f8fafc" />
    <line x1="25" y1="155" x2="775" y2="155" stroke="#0284c7" stroke-width="3" />
    
    <rect x="50" y="45" width="46" height="46" rx="10" fill="#0284c7" />
    <path d="M73 54 v28 M59 68 h28" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
    
    <text x="110" y="65" font-family="'Georgia', serif" font-size="22" font-weight="bold" fill="#0f172a">METRO CARDIOLOGY &amp; INTERNAL MEDICINE</text>
    <text x="110" y="88" font-family="'Arial', sans-serif" font-size="13" fill="#475569">Dr. Suresh K. Mehta, MD, DM (Cardiology), FACC</text>
    <text x="110" y="108" font-family="'Arial', sans-serif" font-size="13" fill="#475569">Reg. No: MMC-2004-89312 | Clinic: 104, Sunrise Towers, MG Road</text>
    <text x="110" y="126" font-family="'Arial', sans-serif" font-size="13" fill="#475569">Phone: +91 22 4920 1100 | Consultation: 10:00 AM - 2:00 PM</text>

    <rect x="230" y="165" width="340" height="26" rx="4" fill="#fef2f2" stroke="#fecaca" />
    <text x="245" y="182" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#dc2626">FICTIONAL DEMO — NOT A REAL MEDICAL RECORD</text>

    <rect x="50" y="200" width="700" height="70" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="70" y="225" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">Patient Name:</text>
    <text x="170" y="225" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">Rajesh Sharma</text>
    <text x="440" y="225" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">Age / Gender:</text>
    <text x="545" y="225" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">52 Yrs / Male</text>
    
    <text x="70" y="255" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">Date:</text>
    <text x="170" y="255" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">14-Oct-2024</text>
    <text x="440" y="255" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">BP / Vitals:</text>
    <text x="545" y="255" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">138/88 mmHg | Wt: 74 kg</text>

    <text x="50" y="305" font-family="Arial" font-size="14" font-weight="bold" fill="#0369a1">CLINICAL OBSERVATION &amp; DIAGNOSIS:</text>
    <text x="70" y="340" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" fill="#1e3a8a">Known Type 2 Diabetes Mellitus x 4 yrs &amp; Essential Hypertension.</text>
    <text x="70" y="375" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" fill="#1e3a8a">Recent HbA1c: 7.2% (suboptimal glycemic control).</text>
    
    <line x1="50" y1="400" x2="750" y2="400" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4 4" />

    <text x="50" y="445" font-family="'Times New Roman', serif" font-size="34" font-weight="bold" fill="#0284c7">℞</text>
    
    <g transform="translate(0, 10)">
      <circle cx="65" cy="480" r="4" fill="#0284c7" />
      <text x="80" y="485" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" fill="#1e3a8a">Tab. Metformin 500 mg — 1 tab PO BD (after meals)</text>
      
      <circle cx="65" cy="535" r="4" fill="#0284c7" />
      <text x="80" y="540" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" fill="#1e3a8a">Tab. Telmisartan 40 mg — 1 tab PO OD (morning)</text>

      <circle cx="65" cy="590" r="4" fill="#0284c7" />
      <text x="80" y="595" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" fill="#1e3a8a">Tab. Atorvastatin 20 mg — 1 tab PO HS (at bedtime)</text>
      
      <circle cx="65" cy="650" r="4" fill="#f59e0b" />
      <text x="80" y="655" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" fill="#1e3a8a">Routine CBC showed mild </text>
      
      <rect x="360" y="628" width="165" height="38" rx="4" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="368" y="655" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" font-weight="bold" fill="#172554">Leukopenia</text>
      <text x="535" y="655" font-family="'Caveat', 'Segoe Script', cursive" font-size="26" fill="#1e3a8a">(mild WBC drop).</text>
      
      <text x="80" y="705" font-family="'Caveat', 'Segoe Script', cursive" font-size="25" fill="#1e3a8a">Recheck Complete Blood Count &amp; Fasting Sugars in 2 weeks.</text>
      <text x="80" y="745" font-family="'Caveat', 'Segoe Script', cursive" font-size="25" fill="#1e3a8a">Maintain low sodium, low carbohydrate diabetic diet.</text>
    </g>

    <g transform="translate(480, 810)">
      <path d="M 30 50 Q 60 10 90 40 T 150 25 T 220 50" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" />
      <text x="40" y="75" font-family="Arial" font-size="12" font-weight="bold" fill="#334155">Dr. Suresh K. Mehta, MD</text>
      <text x="40" y="92" font-family="Arial" font-size="11" fill="#64748b">Senior Consultant Physician</text>
      <circle cx="210" cy="55" r="42" fill="none" stroke="#2563eb" stroke-width="2" stroke-opacity="0.65" stroke-dasharray="8 3" />
      <text x="178" y="52" font-family="Arial" font-size="9" font-weight="bold" fill="#2563eb" fill-opacity="0.8">METRO CLINIC</text>
      <text x="178" y="66" font-family="Arial" font-size="8" fill="#2563eb" fill-opacity="0.8">VERIFIED</text>
    </g>

    <rect x="25" y="940" width="750" height="35" rx="4" fill="#f8fafc" />
    <text x="40" y="962" font-family="Arial" font-size="11" fill="#64748b">
      Notice: This document is a simulated prescription used exclusively for demonstration and verification testing in MedScript AI.
    </text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function createLeukopeniaCropSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 90" width="260" height="90">
    <rect width="260" height="90" fill="#fefce8" stroke="#f59e0b" stroke-width="2" rx="6" />
    <line x1="10" y1="62" x2="250" y2="62" stroke="#e2e8f0" stroke-width="1" />
    <text x="15" y="24" font-family="Arial" font-size="11" font-weight="bold" fill="#b45309">ORIGINAL HANDWRITING CROP</text>
    <text x="30" y="56" font-family="'Caveat', cursive, sans-serif" font-size="34" fill="#172554">Leukopenia</text>
    <rect x="180" y="8" width="70" height="18" rx="3" fill="#fef3c7" stroke="#f59e0b" />
    <text x="188" y="21" font-family="Arial" font-size="10" font-weight="bold" fill="#b45309">Conf: 62%</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// -------------------------------------------------------------
// Prescription 2 SVG & Crop (Pediatric ENT)
// -------------------------------------------------------------
function createPrescription2Svg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#fcfdfd" />
    <rect x="25" y="25" width="750" height="950" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
    
    <!-- Clinic Header -->
    <rect x="25" y="25" width="750" height="130" rx="8" fill="#f0fdfa" />
    <line x1="25" y1="155" x2="775" y2="155" stroke="#0d9488" stroke-width="3" />
    
    <rect x="50" y="45" width="46" height="46" rx="10" fill="#0d9488" />
    <path d="M60 68 a13 13 0 0 1 26 0 a13 13 0 0 1 -26 0" fill="#ffffff" />
    <circle cx="73" cy="56" r="6" fill="#ffffff" />
    
    <text x="110" y="65" font-family="'Georgia', serif" font-size="22" font-weight="bold" fill="#134e4a">CHILD CARE &amp; PEDIATRIC SPECIALTY</text>
    <text x="110" y="88" font-family="'Arial', sans-serif" font-size="13" fill="#0f766e">Dr. Priya Nair, MD (Pediatrics), DNB, FIAP</text>
    <text x="110" y="108" font-family="'Arial', sans-serif" font-size="13" fill="#0f766e">Reg. No: KMC-2011-45120 | Little Care Clinic, Indiranagar</text>
    <text x="110" y="126" font-family="'Arial', sans-serif" font-size="13" fill="#0f766e">Emergency Contact: +91 80 4122 9988</text>

    <!-- Fictional Demo Banner -->
    <rect x="230" y="165" width="340" height="26" rx="4" fill="#fef2f2" stroke="#fecaca" />
    <text x="245" y="182" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#dc2626">FICTIONAL DEMO — NOT A REAL MEDICAL RECORD</text>

    <!-- Patient Metadata Row -->
    <rect x="50" y="200" width="700" height="70" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="70" y="225" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">Child Name:</text>
    <text x="165" y="225" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">Aarav Patel</text>
    <text x="440" y="225" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">Age / Weight:</text>
    <text x="545" y="225" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">9 Yrs / 27.5 kg</text>
    
    <text x="70" y="255" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">Date:</text>
    <text x="165" y="255" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">22-Oct-2024</text>
    <text x="440" y="255" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#334155">Temp / Ear:</text>
    <text x="545" y="255" font-family="'Courier New', monospace" font-size="14" fill="#1e293b">101.4°F | Acute Otitis Media</text>

    <text x="50" y="305" font-family="Arial" font-size="14" font-weight="bold" fill="#0f766e">DIAGNOSIS &amp; CLINICAL FINDINGS:</text>
    <text x="70" y="340" font-family="'Caveat', cursive" font-size="26" fill="#134e4a">Acute Otitis Media (right ear congestion) + Upper Respiratory Tract Infection.</text>
    <text x="70" y="375" font-family="'Caveat', cursive" font-size="26" fill="#134e4a">Fever x 3 days with rhinorrhea. Throat: mild pharyngeal injection.</text>
    
    <line x1="50" y1="400" x2="750" y2="400" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4 4" />

    <text x="50" y="445" font-family="'Times New Roman', serif" font-size="34" font-weight="bold" fill="#0d9488">℞</text>
    
    <g transform="translate(0, 10)">
      <!-- Line 1: Amoxicillin -->
      <circle cx="65" cy="480" r="4" fill="#0d9488" />
      <text x="80" y="485" font-family="'Caveat', cursive" font-size="26" fill="#134e4a">Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 ml PO BD x </text>
      
      <!-- Highlighted Unclear Word "5 days" vs "7 days" -->
      <rect x="580" y="458" width="110" height="38" rx="4" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="590" y="485" font-family="'Caveat', cursive" font-size="26" font-weight="bold" fill="#b45309">5 days</text>
      
      <!-- Line 2: Paracetamol -->
      <circle cx="65" cy="535" r="4" fill="#0d9488" />
      <text x="80" y="540" font-family="'Caveat', cursive" font-size="26" fill="#134e4a">Syp. Paracetamol 250 mg/5 ml — 5 ml SOS (only if fever &gt; 100°F)</text>

      <!-- Line 3: Saline Drops -->
      <circle cx="65" cy="590" r="4" fill="#0d9488" />
      <text x="80" y="595" font-family="'Caveat', cursive" font-size="26" fill="#134e4a">Saline Nasal Drops — 2 drops each nostril TDS (before feeds)</text>
      
      <!-- Line 4: General instructions -->
      <circle cx="65" cy="650" r="4" fill="#0d9488" />
      <text x="80" y="655" font-family="'Caveat', cursive" font-size="26" fill="#134e4a">Adequate hydration, warm water gargle if cooperative.</text>
      <text x="80" y="705" font-family="'Caveat', cursive" font-size="26" fill="#134e4a">Review if ear discharge occurs or fever persists after 48 hrs.</text>
    </g>

    <!-- Clinic Stamp and Signature Footer -->
    <g transform="translate(480, 810)">
      <path d="M 20 45 Q 70 5 110 35 T 180 20 T 230 45" fill="none" stroke="#0f766e" stroke-width="2.5" stroke-linecap="round" />
      <text x="40" y="75" font-family="Arial" font-size="12" font-weight="bold" fill="#334155">Dr. Priya Nair, MD</text>
      <text x="40" y="92" font-family="Arial" font-size="11" fill="#64748b">Senior Pediatrician</text>
      <circle cx="210" cy="55" r="42" fill="none" stroke="#0d9488" stroke-width="2" stroke-opacity="0.65" stroke-dasharray="8 3" />
      <text x="178" y="52" font-family="Arial" font-size="9" font-weight="bold" fill="#0d9488" fill-opacity="0.8">CHILD CARE</text>
      <text x="178" y="66" font-family="Arial" font-size="8" fill="#0d9488" fill-opacity="0.8">VERIFIED</text>
    </g>

    <rect x="25" y="940" width="750" height="35" rx="4" fill="#f8fafc" />
    <text x="40" y="962" font-family="Arial" font-size="11" fill="#64748b">
      Notice: This document is a simulated prescription used exclusively for demonstration and verification testing in MedScript AI.
    </text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function create5DaysCropSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 85" width="240" height="85">
    <rect width="240" height="85" fill="#fefce8" stroke="#f59e0b" stroke-width="2" rx="6" />
    <text x="12" y="22" font-family="Arial" font-size="11" font-weight="bold" fill="#b45309">HANDWRITING CROP (DURATION)</text>
    <text x="25" y="60" font-family="'Caveat', cursive, sans-serif" font-size="34" fill="#134e4a">5 days</text>
    <rect x="160" y="8" width="70" height="18" rx="3" fill="#fef3c7" stroke="#f59e0b" />
    <text x="168" y="21" font-family="Arial" font-size="10" font-weight="bold" fill="#b45309">Conf: 68%</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// -------------------------------------------------------------
// Document 3 SVG: Diagnostic Lab Report
// -------------------------------------------------------------
function createLabReportSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#ffffff" />
    <rect x="25" y="25" width="750" height="950" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
    
    <!-- Lab Header -->
    <rect x="25" y="25" width="750" height="110" rx="8" fill="#f8fafc" />
    <line x1="25" y1="135" x2="775" y2="135" stroke="#0284c7" stroke-width="2" />
    
    <text x="50" y="65" font-family="'Arial Black', sans-serif" font-size="22" fill="#0369a1">METROPATH DIAGNOSTIC LABORATORIES</text>
    <text x="50" y="88" font-family="'Arial', sans-serif" font-size="12" fill="#475569">NABL ACCREDITED LAB | ISO 15189:2012 Certified</text>
    <text x="50" y="106" font-family="'Arial', sans-serif" font-size="12" fill="#475569">Central Diagnostic Center, Plot 45, Healthcare Zone | Helpline: 1800-425-9999</text>

    <!-- Fictional Demo Banner -->
    <rect x="230" y="145" width="340" height="24" rx="4" fill="#fef2f2" stroke="#fecaca" />
    <text x="245" y="161" font-family="'Arial', sans-serif" font-size="12" font-weight="bold" fill="#dc2626">FICTIONAL DEMO — NOT A REAL MEDICAL RECORD</text>

    <!-- Patient Metadata Box -->
    <rect x="50" y="180" width="700" height="85" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="70" y="205" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Patient Name:</text>
    <text x="170" y="205" font-family="Arial" font-size="13" font-weight="bold" fill="#0f172a">Sunita Verma</text>
    <text x="440" y="205" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Age / Gender:</text>
    <text x="540" y="205" font-family="Arial" font-size="13" fill="#0f172a">48 Y / Female</text>
    
    <text x="70" y="230" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Referred By:</text>
    <text x="170" y="230" font-family="Arial" font-size="13" fill="#0f172a">Dr. A. K. Banerjee, MD</text>
    <text x="440" y="230" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Sample Date:</text>
    <text x="540" y="230" font-family="Arial" font-size="13" fill="#0f172a">18-Oct-2024 (Fasting)</text>

    <text x="70" y="255" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Test Panel:</text>
    <text x="170" y="255" font-family="Arial" font-size="13" fill="#0369a1" font-weight="bold">Comprehensive Metabolic &amp; Glycemic Panel</text>

    <!-- Table Header -->
    <rect x="50" y="285" width="700" height="35" rx="4" fill="#0284c7" />
    <text x="70" y="308" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff">INVESTIGATION</text>
    <text x="280" y="308" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff">OBSERVED VALUE</text>
    <text x="440" y="308" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff">REFERENCE RANGE</text>
    <text x="610" y="308" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff">STATUS</text>

    <!-- Row 1: Fasting Blood Glucose -->
    <rect x="50" y="330" width="700" height="42" fill="#fff7ed" stroke="#fed7aa" />
    <text x="70" y="356" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">Fasting Blood Glucose</text>
    <text x="280" y="356" font-family="Arial" font-size="14" font-weight="bold" fill="#c2410c">142 mg/dL</text>
    <text x="440" y="356" font-family="Arial" font-size="12" fill="#64748b">70 - 99 mg/dL</text>
    <rect x="610" y="340" width="65" height="22" rx="4" fill="#ea580c" />
    <text x="625" y="355" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff">HIGH</text>

    <!-- Row 2: HbA1c -->
    <rect x="50" y="380" width="700" height="42" fill="#fff7ed" stroke="#fed7aa" />
    <text x="70" y="406" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">Glycated Hemoglobin (HbA1c)</text>
    <text x="280" y="406" font-family="Arial" font-size="14" font-weight="bold" fill="#c2410c">7.4 %</text>
    <text x="440" y="406" font-family="Arial" font-size="12" fill="#64748b">&lt; 5.7 % (Normal)</text>
    <rect x="610" y="390" width="75" height="22" rx="4" fill="#ea580c" />
    <text x="618" y="405" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff">ELEVATED</text>

    <!-- Row 3: Total Cholesterol -->
    <rect x="50" y="430" width="700" height="42" fill="#fefce8" stroke="#fef08a" />
    <text x="70" y="456" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">Total Serum Cholesterol</text>
    <text x="280" y="456" font-family="Arial" font-size="14" font-weight="bold" fill="#b45309">218 mg/dL</text>
    <text x="440" y="456" font-family="Arial" font-size="12" fill="#64748b">&lt; 200 mg/dL</text>
    <rect x="610" y="440" width="85" height="22" rx="4" fill="#d97706" />
    <text x="616" y="455" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff">BORDERLINE</text>

    <!-- Row 4: Serum Creatinine -->
    <rect x="50" y="480" width="700" height="42" fill="#ffffff" stroke="#e2e8f0" />
    <text x="70" y="506" font-family="Arial" font-size="13" fill="#1e293b">Serum Creatinine</text>
    <text x="280" y="506" font-family="Arial" font-size="14" font-weight="bold" fill="#047857">0.8 mg/dL</text>
    <text x="440" y="506" font-family="Arial" font-size="12" fill="#64748b">0.5 - 1.1 mg/dL</text>
    <rect x="610" y="490" width="70" height="22" rx="4" fill="#10b981" />
    <text x="622" y="505" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff">NORMAL</text>

    <!-- Row 5: Total WBC Count -->
    <rect x="50" y="530" width="700" height="42" fill="#ffffff" stroke="#e2e8f0" />
    <text x="70" y="556" font-family="Arial" font-size="13" fill="#1e293b">Total Leukocyte Count (TLC / WBC)</text>
    <text x="280" y="556" font-family="Arial" font-size="14" font-weight="bold" fill="#047857">6,400 /mcL</text>
    <text x="440" y="556" font-family="Arial" font-size="12" fill="#64748b">4,000 - 10,500 /mcL</text>
    <rect x="610" y="540" width="70" height="22" rx="4" fill="#10b981" />
    <text x="622" y="555" font-family="Arial" font-size="11" font-weight="bold" fill="#ffffff">NORMAL</text>

    <!-- Pathologist Handwritten Notes -->
    <rect x="50" y="600" width="700" height="120" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="70" y="625" font-family="Arial" font-size="12" font-weight="bold" fill="#0284c7">PATHOLOGIST CLINICAL CORRELATION NOTE:</text>
    <text x="70" y="660" font-family="'Caveat', cursive" font-size="24" fill="#1e3a8a">Impaired Fasting Glucose and suboptimal HbA1c indicative of diabetic range glycemic status.</text>
    <text x="70" y="695" font-family="'Caveat', cursive" font-size="24" fill="#1e3a8a">Kidney function (serum creatinine) is normal. Recommend consultation with treating physician.</text>

    <!-- Footer with QR and Signatures -->
    <g transform="translate(50, 770)">
      <rect x="0" y="0" width="60" height="60" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="12" y="35" font-family="Arial" font-size="10" fill="#64748b">QR CODE</text>
      <text x="80" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="#334155">Report Authenticated Digitally</text>
      <text x="80" y="45" font-family="Arial" font-size="11" fill="#64748b">Dr. Rita Saxena, MD (Pathology) | Chief Pathologist</text>
    </g>

    </text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function createPrabhaCovidDocument(): ProcessedDocument {
  const fullTranscript = `PRABHA HOSPITAL & TRAUMA CENTRE
A Unit of M.L.P. Advance Healthcare Systems Pvt. Ltd.
Bypass Road, Geeta Mandir, (Old Kamayani Hospital), NH-2, Sikandra, Agra
Contact: +91 9012514000, +91 9012516000
Dr. B.K. Singh

Ref. No.                       Date: 27/11/2020
Pt Name: Ashok Kumar Agrawal
Age: 67 Y / M
D.O.A: 19/11/2020
I.P.D: 6447

Covid-19 Positive
Blood group - "A" positive

To Blood Bank Officer.
Sir kindly issue Two unit of FFP for Pt Ashok Kumar Agrawal.
After proper cross matching and grouping
Blood group "A" Positive
Thanking you
Dr. B.K. Singh`;

  const tokens = [
    {
      id: 'tok-prabha-1',
      text: 'PRABHA HOSPITAL & TRAUMA CENTRE (Dr. B.K. Singh)',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 28, y: 3, width: 68, height: 7 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-prabha-2',
      text: 'Date: 27/11/2020',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 74, y: 13, width: 22, height: 4 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-prabha-3',
      text: 'Pt Name: Ashok Kumar Agrawal',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 28, y: 17, width: 55, height: 4 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-prabha-4',
      text: 'Age: 67 Y / M (Male)',
      confidence: 97,
      confidenceDisplay: '97% (MedScript Optical Stroke Verification)',
      bbox: { x: 36, y: 22, width: 26, height: 4 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-prabha-5',
      text: 'D.O.A (Date of Admission): 19/11/2020',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 33, y: 26, width: 34, height: 4 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-prabha-6',
      text: 'I.P.D (In-Patient Registration): 6447',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 33, y: 30, width: 26, height: 4 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-prabha-7',
      text: 'Diagnosis: Covid-19 Positive',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 28, y: 35, width: 46, height: 5 },
      category: 'diagnosis' as const,
      isUncertain: false,
      medicalMeaning: 'Confirmed acute SARS-CoV-2 coronavirus infection with inpatient hospitalization at Prabha Hospital.'
    },
    {
      id: 'tok-prabha-8',
      text: 'Blood group - "A" positive',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 32, y: 40, width: 46, height: 4 },
      category: 'lab_value' as const,
      isUncertain: false,
      medicalMeaning: 'Blood Group A RhD Positive (A+). Compatible with Group A or Group AB plasma components.'
    },
    {
      id: 'tok-prabha-9',
      text: 'To Blood Bank Officer',
      confidence: 97,
      confidenceDisplay: '97% (MedScript Optical Stroke Verification)',
      bbox: { x: 6, y: 43, width: 55, height: 4 },
      category: 'instruction' as const,
      isUncertain: false
    },
    {
      id: 'tok-prabha-10',
      text: 'Sir kindly issue Two unit of FFP for Pt Ashok Kumar Agrawal',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 12, y: 48, width: 84, height: 9 },
      category: 'medication' as const,
      isUncertain: false,
      medicalMeaning: 'Fresh Frozen Plasma (FFP) — Two Units (~400-500 mL) ordered for inpatient COVID-19 supportive therapy.'
    },
    {
      id: 'tok-prabha-11',
      text: 'After proper cross matching and grouping',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 9, y: 62, width: 80, height: 9 },
      category: 'instruction' as const,
      isUncertain: false,
      medicalMeaning: 'Mandatory pre-transfusion ABO and Rh serological compatibility cross-match to prevent hemolytic transfusion reaction.'
    },
    {
      id: 'tok-prabha-12',
      text: 'Blood group "A" Positive',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 7, y: 76, width: 36, height: 8 },
      category: 'lab_value' as const,
      isUncertain: false,
      medicalMeaning: 'Re-verified patient recipient blood group: A Positive.'
    },
    {
      id: 'tok-prabha-13',
      text: 'Thanking you - Dr. B.K. Singh',
      confidence: 97,
      confidenceDisplay: '97% (MedScript Optical Stroke Verification)',
      bbox: { x: 42, y: 75, width: 52, height: 8 },
      category: 'instruction' as const,
      isUncertain: false
    }
  ];

  const structuredMeds = [
    {
      id: 'med-prabha-1',
      name: 'Fresh Frozen Plasma (FFP)',
      strength: 'Two Units (~400–500 mL Total)',
      dosage: 'Two Units',
      frequency: 'Single Inpatient Transfusion Session',
      duration: 'Immediate Transfusion (within 24h post-thaw)',
      route: 'Intravenous (IV) Infusion via Blood Transfusion Filter',
      timingInstructions: 'Administer only after mandatory ABO grouping and cross-matching',
      foodInstructions: 'Administer in ICU/Inpatient ward under continuous vital signs and reaction monitoring',
      isVerified: true,
      confidence: 98,
      rawLine: 'Sir kindly issue Two unit of FFP for Pt Ashok Kumar Agrawal. After proper cross matching and grouping',
      medicalMeaning: 'Fresh Frozen Plasma (FFP) — Human blood component frozen within 8 hours of collection. Supplies physiological coagulation factors (Factor VIII, Factor V, fibrinogen, prothrombin) and immunoglobulins. Prescribed during COVID-19 hospitalization for severe coagulopathy or passive antibody support. For Blood Group A Positive recipients, FFP must be ABO-compatible (Group A or Group AB plasma only) to avoid acute hemolytic transfusion reactions.'
    }
  ];

  const enWhatWasWritten = [
    '1. [PATIENT_INFO]: PRABHA HOSPITAL & TRAUMA CENTRE (Dr. B.K. Singh)',
    '2. [PATIENT_INFO]: Date: 27/11/2020',
    '3. [PATIENT_INFO]: Pt Name: Ashok Kumar Agrawal, Age: 67 Y / M, D.O.A: 19/11/2020, I.P.D: 6447',
    '4. [DIAGNOSIS]: Covid-19 Positive',
    '5. [LAB_VALUE]: Blood group - "A" positive',
    '6. [MEDICATION]: Sir kindly issue Two unit of FFP for Pt Ashok Kumar Agrawal.',
    '7. [INSTRUCTION]: After proper cross matching and grouping',
    '8. [LAB_VALUE]: Blood group "A" Positive',
    '9. [INSTRUCTION]: Thanking you - Dr. B.K. Singh'
  ];

  const termsMean = [
    {
      id: 'term-ffp',
      term: 'Fresh Frozen Plasma (FFP)',
      simpleMeaning: 'Human biologic blood component frozen within 8 hours of collection. Contains physiological levels of all clotting factors (Factor VIII, V, fibrinogen, prothrombin) and immunoglobulins. Prescribed during COVID-19 hospitalization for coagulopathy management or antibody support.',
      documentContext: 'Sir kindly issue Two unit of FFP for Pt Ashok Kumar Agrawal. After proper cross matching and grouping',
      whatItDoesNotMean: 'FFP is not an over-the-counter pill; it is a hospital-administered IV infusion requiring strict cold-chain and blood bank release protocols.',
      category: 'medication' as const
    },
    {
      id: 'term-covid',
      term: 'Covid-19 Positive',
      simpleMeaning: 'Confirmed acute respiratory infection caused by the SARS-CoV-2 coronavirus. Documented for inpatient care and monitoring at Prabha Hospital.',
      documentContext: 'Covid-19 Positive',
      whatItDoesNotMean: 'This documents an acute viral infection during admission, not a permanent or pre-existing chronic condition.',
      category: 'diagnosis' as const
    },
    {
      id: 'term-bloodgroup',
      term: 'Blood Group "A" Positive',
      simpleMeaning: 'Recipient is ABO group A and RhD positive. For plasma transfusions, patient can safely receive Group A or Group AB plasma (universal plasma donor). Must not receive Group O or Group B plasma.',
      documentContext: 'Blood group - "A" positive',
      whatItDoesNotMean: 'Does not restrict red cell transfusions in the same way as plasma; plasma compatibility follows reverse ABO rules.',
      category: 'lab_value' as const
    },
    {
      id: 'term-crossmatch',
      term: 'Cross Matching and Grouping',
      simpleMeaning: 'Mandatory pre-transfusion laboratory testing verifying compatibility between donor plasma and patient recipient to prevent acute hemolytic transfusion reactions.',
      documentContext: 'After proper cross matching and grouping',
      whatItDoesNotMean: 'Does not imply an error was made; cross-matching is a mandatory international patient safety standard.',
      category: 'instruction' as const
    }
  ];

  return {
    id: 'demo-doc-prabha',
    name: 'Prabha_Hospital_COVID19_Requisition.png',
    type: 'prescription',
    imageDataUrl: '/prabha_covid_slip.png',
    uploadedAt: new Date(Date.now() - 7200000).toISOString(),
    fileSize: 264258,
    isDemo: true,
    quality: {
      status: 'pass',
      overallScore: 98,
      blurScore: 97,
      darknessScore: 96,
      glareScore: 98,
      resolutionScore: 99,
      rotationAngle: 0,
      handwritingVisibilityScore: 98,
      issues: [],
      suggestions: [
        'Prabha Hospital requisition slip deciphered with 98% clinical stroke clarity.',
        'Physician handwritten clinical notes, COVID-19 diagnosis, Blood Group A Positive, and FFP units verified.'
      ]
    },
    tokens,
    rawOcrText: fullTranscript,
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        { id: 'chk-prabha-1', name: 'Anti-Hallucination Guard', passed: true, details: 'Strictly grounded in extracted handwriting from Prabha Hospital.' },
        { id: 'chk-prabha-2', name: 'Transfusion Safety Cross-Match', passed: true, details: 'Mandatory ABO grouping and cross-matching required for Blood Group A Positive.' },
        { id: 'chk-prabha-3', name: 'Biologic Product Verification', passed: true, details: 'Fresh Frozen Plasma (FFP) Two Units verified against pharmacopoeia standards.' },
        { id: 'chk-prabha-4', name: 'Non-Diagnostic Boundary', passed: true, details: 'Physician diagnosis (Covid-19 Positive) preserved without artificial alterations.' }
      ]
    },
    translations: {
      en: {
        language: 'en',
        languageName: 'English',
        simpleSummary: "Hospital Requisition from Prabha Hospital & Trauma Centre. Diagnosis: Covid-19 Positive. Blood Group: 'A' Positive (A+). Patient: Ashok Kumar Agrawal (67 Y / Male, IPD 6447, Admitted 19/11/2020). Prescribed Therapy: Two Units of Fresh Frozen Plasma (FFP) with mandatory ABO grouping and cross-matching. Prescribing Doctor: Dr. B.K. Singh.",
        explainLikeIm10: "You were admitted to Prabha Hospital and diagnosed with COVID-19. Your blood group is A Positive. To support your blood clotting and provide defense proteins, Dr. B.K. Singh ordered Two Units of Fresh Frozen Plasma (FFP) from the blood bank. The hospital will cross-match it with your blood to guarantee it is 100% safe before transfusing.",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: [
          'Patient Ashok Kumar Agrawal (67 Y / Male) admitted on 19/11/2020 under IPD No. 6447.',
          'Diagnosis documented: Covid-19 Positive.',
          'Blood group confirmed: "A" Positive.',
          'Dr. B.K. Singh requisitioned Two Units of Fresh Frozen Plasma (FFP) from the blood bank on 27/11/2020.',
          'Explicit directive: Must only be issued after proper blood grouping and cross-matching.'
        ],
        whatIsUnclear: ['All handwriting strokes and clinical fields from the Prabha Hospital requisition have been verified with 98% accuracy.'],
        whatToAskDoctor: [
          'What is the scheduled time for the Fresh Frozen Plasma transfusion session?',
          'Will baseline coagulation parameters (PT/INR, D-dimer, platelets) and oxygen saturation be checked post-transfusion?',
          'What specific symptoms should bedside attendants notify the nursing team about during infusion?'
        ],
        spokenScript: "Hello, I am Dr. Ben Carter, your MedScript AI medical explainer. I have thoroughly analyzed your hospital document from Prabha Hospital and Trauma Centre. You have been diagnosed with COVID-19 Positive. Your blood group is recorded as 'A' Positive. Dr. B.K. Singh has ordered Two Units of Fresh Frozen Plasma, or FFP, for patient Ashok Kumar Agrawal. Fresh Frozen Plasma is a human blood component containing essential clotting factors and antibodies for hospitalized COVID-19 support. The order strictly requires proper blood grouping and cross-matching before transfusion to ensure 100% compatibility. Please follow the inpatient medical team's directives.",
        sentenceTimings: [
          { sentence: "Hello, I am Dr. Ben Carter, your MedScript AI medical explainer.", durationSec: 3.8, topic: 'intro' },
          { sentence: "I have thoroughly analyzed your hospital document from Prabha Hospital and Trauma Centre.", durationSec: 4.2, topic: 'review' },
          { sentence: "You have been diagnosed with COVID-19 Positive.", durationSec: 3.2, topic: 'diag' },
          { sentence: "Your blood group is recorded as 'A' Positive.", durationSec: 3.0, topic: 'blood' },
          { sentence: "Dr. B.K. Singh has ordered Two Units of Fresh Frozen Plasma, or FFP, for patient Ashok Kumar Agrawal.", durationSec: 5.5, topic: 'meds' },
          { sentence: "Fresh Frozen Plasma is a human blood component containing essential clotting factors and antibodies for hospitalized COVID-19 support.", durationSec: 6.5, topic: 'education' },
          { sentence: "The order strictly requires proper blood grouping and cross-matching before transfusion to ensure 100% compatibility.", durationSec: 6.0, topic: 'safety' },
          { sentence: "Please follow the inpatient medical team's directives.", durationSec: 3.5, topic: 'cta' }
        ]
      },
      hi: {
        language: 'hi',
        languageName: 'Hindi',
        simpleSummary: "प्रभा हॉस्पिटल एंड ट्रॉमा सेंटर पर्ची। निदान: कोविड-19 पॉजिटिव। ब्लड ग्रुप: 'ए' पॉजिटिव (A+)। मरीज़: अशोक कुमार अग्रवाल (67 वर्ष / पुरुष, IPD 6447, भर्ती: 19/11/2020)। निर्देश: पूर्ण क्रॉस-मैचिंग और ग्रुपिंग के बाद 2 यूनिट फ्रेश फ्रोज़न प्लाज़्मा (FFP)। डॉक्टर: डॉ. बी.के. सिंह।",
        explainLikeIm10: "प्रभा हॉस्पिटल में जांच के बाद आपको कोविड-19 पॉजिटिव पाया गया है। आपका ब्लड ग्रुप 'ए' पॉजिटिव है। आपके शरीर में क्लॉटिंग फैक्टर्स और रोग प्रतिरोधक क्षमता को सहारा देने के लिए डॉक्टर ने ब्लड बैंक से दो यूनिट एफ.एफ.पी. (फ्रेश फ्रोज़न प्लाज़्मा) मंगवाया है। इसे देने से पहले ब्लड ग्रुपिंग और क्रॉस-मैचिंग की जाएगी।",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: [
          'मरीज़ अशोक कुमार अग्रवाल (67 वर्ष, पुरुष) दिनांक 19/11/2020 से प्रभा हॉस्पिटल में IPD 6447 के तहत भर्ती हैं।',
          'निदान: कोविड-19 पॉजिटिव।',
          'ब्लड ग्रुप: "ए" पॉजिटिव (A+)।',
          'डॉ. बी.के. सिंह ने ब्लड बैंक से 2 यूनिट एफ.एफ.पी. (Fresh Frozen Plasma) मंगवाने की पर्ची लिखी है।',
          'निर्देश: उचित ब्लड ग्रुपिंग और क्रॉस-मैचिंग के बाद ही प्लाज़्मा जारी किया जाए।'
        ],
        whatIsUnclear: ['प्रभा हॉस्पिटल की पर्ची के सभी हस्तलिखित विवरण 98% सटीकता के साथ सत्यापित हैं।'],
        whatToAskDoctor: [
          'प्लाज़्मा (FFP) चढ़ाने का समय कब निर्धारित है?',
          'क्या ट्रांसफ्यूज़न के बाद डी-डाइमर और ऑक्सीजन लेवल की दोबारा जांच होगी?',
          'प्लाज़्मा चढ़ते समय किन बातों का ध्यान रखना है?'
        ],
        spokenScript: "नमस्ते! मैं डॉक्टर बेन कार्टर, आपका मेडस्क्रिप्ट एआई मेडिकल सहायक हूँ। मैंने प्रभा हॉस्पिटल एंड ट्रॉमा सेंटर से आपकी पर्ची का पूर्ण विश्लेषण किया है। आपको कोविड-19 पॉजिटिव डायग्नोज़ किया गया है। आपका ब्लड ग्रुप 'ए' पॉजिटिव दर्ज है। डॉ. बी.के. सिंह ने मरीज़ अशोक कुमार अग्रवाल के लिए दो यूनिट फ्रेश फ्रोज़न प्लाज़्मा यानी एफ.एफ.पी. मंगवाने का निर्देश दिया है। यह एक ह्यूमन ब्लड कंपोनेंट है जो क्लॉटिंग फैक्टर्स और एंटीबॉडीज़ प्रदान करता है। इसे चढ़ाने से पहले पूर्ण ब्लड ग्रुपिंग और क्रॉस-मैचिंग अनिवार्य है ताकि यह आपके लिए पूरी तरह सुरक्षित हो।",
        spokenScriptPhonetic: "Namaste! Main Dr. Ben Carter, aapka MedScript AI medical sahayak hoon. Prabha Hospital se aapki slip ka jaanch kiya gaya hai. Aapko COVID-19 positive diagnose kiya gaya hai. Aapka blood group 'A' positive darj hai. Dr. B.K. Singh ne Ashok Kumar Agrawal ke liye Two Units of FFP order kiya hai. Ise proper cross matching aur grouping ke baad hi chadhaya jayega.",
        sentenceTimings: [
          { sentence: "नमस्ते! मैं डॉक्टर बेन कार्टर, आपका मेडस्क्रिप्ट एआई मेडिकल सहायक हूँ।", phoneticSentence: "Namaste! Main Dr. Ben Carter, aapka MedScript AI sahayak hoon.", durationSec: 3.8, topic: 'intro' },
          { sentence: "मैंने प्रभा हॉस्पिटल एंड ट्रॉमा सेंटर से आपकी पर्ची का पूर्ण विश्लेषण किया है।", phoneticSentence: "Prabha Hospital se aapki slip ka jaanch kiya gaya hai.", durationSec: 4.2, topic: 'review' },
          { sentence: "आपको कोविड-19 पॉजिटिव डायग्नोज़ किया गया है।", phoneticSentence: "Aapko COVID-19 positive diagnose kiya gaya hai.", durationSec: 3.2, topic: 'diag' },
          { sentence: "आपका ब्लड ग्रुप 'ए' पॉजिटिव दर्ज है।", phoneticSentence: "Aapka blood group 'A' positive darj hai.", durationSec: 3.0, topic: 'blood' },
          { sentence: "डॉ. बी.के. सिंह ने मरीज़ अशोक कुमार अग्रवाल के लिए दो यूनिट फ्रेश फ्रोज़न प्लाज़्मा यानी एफ.एफ.पी. मंगवाने का निर्देश दिया है।", phoneticSentence: "Dr. B.K. Singh ne Two Units of FFP order kiya hai.", durationSec: 6.0, topic: 'meds' },
          { sentence: "यह एक ह्यूमन ब्लड कंपोनेंट है जो क्लॉटिंग फैक्टर्स और एंटीबॉडीज़ प्रदान करता है।", phoneticSentence: "Yeh blood component clotting factors aur antibodies deta hai.", durationSec: 5.5, topic: 'education' },
          { sentence: "इसे चढ़ाने से पहले पूर्ण ब्लड ग्रुपिंग और क्रॉस-मैचिंग अनिवार्य है ताकि यह आपके लिए पूरी तरह सुरक्षित हो।", phoneticSentence: "Ise cross matching ke baad hi chadhaya jayega.", durationSec: 5.8, topic: 'safety' }
        ]
      },
      ta: {
        language: 'ta',
        languageName: 'Tamil',
        simpleSummary: "பிரபா மருத்துவமனை அறிக்கை: பாதிப்பு: கோவிட்-19 பாசிட்டிவ் (Covid-19 Positive). இரத்த வகை: 'A' பாசிட்டிவ். நோயாளி: அசோக் குமார் அகர்வால் (67 வயது, ஆண்). சிகிச்சை: 2 யூனிட் ஃப்ரெஷ் ஃப்ரோஸன் பிளாஸ்மா (FFP) - இரத்த வகை மற்றும் கிராஸ் மேட்சிங் செய்த பின் வழங்கப்பட வேண்டும்.",
        explainLikeIm10: "பிரபா மருத்துவமனையில் உங்களுக்கு கோவிட்-19 உறுதிப்படுத்தப்பட்டுள்ளது. உங்கள் இரத்த வகை A பாசிட்டிவ். நோயெதிர்ப்பு மற்றும் இரத்த உறைதல் புரதங்களுக்காக டாக்டர் 2 யூனிட் FFP பிளாஸ்மா ஆர்டர் செய்துள்ளார். இரத்த பரிசோதனைக்கு பின்னரே இது செலுத்தப்படும்.",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: [
          'நோயாளி அசோக் குமார் அகர்வால் (வயது 67, ஆண்) 19/11/2020 முதல் பிரபா மருத்துவமனையில் அனுமதிக்கப்பட்டுள்ளார்.',
          'பாதிப்பு: கோவிட்-19 பாசிட்டிவ்.',
          'இரத்த வகை: "A" Positive.',
          'டாக்டர் பி.கே. சிங் இரத்த வங்கியில் இருந்து 2 யூனிட் FFP பிளாஸ்மா பெற உத்தரவிட்டுள்ளார்.'
        ],
        whatIsUnclear: ['அனைத்து தகவல்களும் துல்லியமாக சரிபார்க்கப்பட்டுள்ளன.'],
        whatToAskDoctor: [
          'பிளாஸ்மா (FFP) செலுத்தும் நேரம் என்ன?',
          'செலுத்திய பிறகு ஆக்ஸிஜன் அளவு கண்காணிக்கப்படுமா?'
        ],
        spokenScript: "வணக்கம்! நான் டாக்டர் பென் கார்ட்டர், உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். பிரபா மருத்துவமனையில் இருந்து நீங்கள் பதிவேற்றிய ஆவணத்தை ஆய்வு செய்துவிட்டேன். இதில் நீங்கள் கோவிட்-19 பாசிட்டிவ் (COVID-19 Positive) என உறுதிப்படுத்தப்பட்டுள்ளீர்கள். உங்கள் இரத்த வகை 'A' பாசிட்டிவ் (A Positive) ஆகும். டாக்டர் பி.கே. சிங் நோயாளி அசோக் குமார் அகர்வாலுக்கு இரண்டு யூனிட் ஃப்ரெஷ் ஃப்ரோஸன் பிளாஸ்மா (FFP) வழங்க உத்தரவிட்டுள்ளார். இது இரத்த உறைதல் புரதங்கள் மற்றும் ஆன்டிபாடிகளை வழங்குகிறது. இரத்த வங்கி முழுமையான இரத்த வகை சரிபார்ப்பு மற்றும் கிராஸ்-மேட்சிங் செய்த பின்னரே இதை வழங்க வேண்டும்.",
        sentenceTimings: [
          { sentence: "வணக்கம்! நான் டாக்டர் பென் கார்ட்டர், உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர்.", durationSec: 3.8, topic: 'intro' },
          { sentence: "இதில் நீங்கள் கோவிட்-19 பாசிட்டிவ் (COVID-19 Positive) என உறுதிப்படுத்தப்பட்டுள்ளீர்கள்.", durationSec: 4.5, topic: 'diag' },
          { sentence: "உங்கள் இரத்த வகை 'A' பாசிட்டிவ் (A Positive) ஆகும்.", durationSec: 3.2, topic: 'blood' },
          { sentence: "டாக்டர் பி.கே. சிங் நோயாளி அசோக் குமார் அகர்வாலுக்கு இரண்டு யூனிட் ஃப்ரெஷ் ஃப்ரோஸன் பிளாஸ்மா (FFP) வழங்க உத்தரவிட்டுள்ளார்.", durationSec: 6.2, topic: 'meds' },
          { sentence: "இரத்த வங்கி முழுமையான இரத்த வகை சரிபார்ப்பு மற்றும் கிராஸ்-மேட்சிங் செய்த பின்னரே இதை வழங்க வேண்டும்.", durationSec: 6.0, topic: 'safety' }
        ]
      },
      te: {
        language: 'te',
        languageName: 'Telugu',
        simpleSummary: "ప్రభా హాస్పిటల్ స్లిప్: రోగ నిర్ధారణ: కోవిడ్-19 పాజిటివ్. బ్లడ్ గ్రూప్: 'A' పాజిటివ్. రోగి: అశోక్ కుమార్ అగర్వాల్ (67 సం, పురుషుడు). ఆర్డర్: సరైన క్రాస్ మ్యాచింగ్ మరియు గ్రూపింగ్ తర్వాత 2 యూనిట్ల ఫ్రెష్ ఫ్రోజెన్ ప్లాస్మా (FFP). డాక్టర్: డా. బి.కె. సింగ్.",
        explainLikeIm10: "ప్రభా ఆసుపత్రిలో మీకు కోవిడ్-19 ఉన్నట్లు నిర్ధారించబడింది. మీ బ్లడ్ గ్రూప్ A పాజిటివ్. మీ రక్తం రక్షణ కోసం డాక్టర్ రెండు యూనిట్ల ఫ్రెష్ ఫ్రోజెన్ ప్లాస్మా (FFP) ఆర్డర్ చేశారు. తగిన పరీక్షల తర్వాతే ఇది ఎక్కిస్తారు.",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: [
          'రోగి అశోక్ కుమార్ అగర్వాల్ 19/11/2020 నుండి ప్రభా ఆసుపత్రిలో అడ్మిట్ అయ్యారు.',
          'రోగ నిర్ధారణ: కోవిడ్-19 పాజిటివ్.',
          'రక్త గ్రూప్: "A" పాజిటివ్.',
          'డాక్టర్ బి.కె. సింగ్ బ్లడ్ బ్యాంక్ నుండి 2 యూనిట్ల FFP ఆర్డర్ చేశారు.'
        ],
        whatIsUnclear: ['అన్ని వివరాలు ఖచ్చితంగా ధృవీకరించబడ్డాయి.'],
        whatToAskDoctor: ['ప్లాస్మా ఎక్కించే సమయం ఎప్పుడు?'],
        spokenScript: "నమస్కారం! నేను డాక్టర్ బెన్ కార్టర్, మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని. ప్రభా హాస్పిటల్ నుండి మీ మెడికల్ స్లిప్‌ను విశ్లేషించాను. మీకు కోవిడ్-19 పాజిటివ్ నిర్ధారణ అయింది. మీ బ్లడ్ గ్రూప్ 'A' పాజిటివ్ అని నమోదైంది. డాక్టర్ బి.కె. సింగ్ గారు రోగి అశోక్ కుమార్ అగర్వాల్ కోసం రెండు యూనిట్ల ఫ్రెష్ ఫ్రోజెన్ ప్లాస్మా (FFP) ఆర్డర్ చేశారు. సరైన బ్లడ్ గ్రూపింగ్ మరియు క్రాస్ మ్యాచింగ్ చేసిన తర్వాతే దీనిని అందించాలని స్పష్టంగా సూచించారు.",
        sentenceTimings: [
          { sentence: "నమస్కారం! నేను డాక్టర్ బెన్ కార్టర్, మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని.", durationSec: 3.8, topic: 'intro' },
          { sentence: "మీకు కోవిడ్-19 పాజిటివ్ నిర్ధారణ అయింది. మీ బ్లడ్ గ్రూప్ 'A' పాజిటివ్.", durationSec: 4.8, topic: 'diag' },
          { sentence: "డాక్టర్ బి.కె. సింగ్ గారు రెండు యూనిట్ల ఫ్రెష్ ఫ్రోజెన్ ప్లాస్మా ఆర్డర్ చేశారు.", durationSec: 5.5, topic: 'meds' },
          { sentence: "సరైన బ్లడ్ గ్రూపింగ్ మరియు క్రాస్ మ్యాచింగ్ చేసిన తర్వాతే దీనిని అందించాలి.", durationSec: 5.5, topic: 'safety' }
        ]
      },
      kn: {
        language: 'kn',
        languageName: 'Kannada',
        simpleSummary: "ಪ್ರಭಾ ಆಸ್ಪತ್ರೆ ಸ್ಲಿಪ್: ಕೋವಿಡ್-19 ಪಾಸಿಟಿವ್. ರಕ್ತದ ಗುಂಪು: 'A' ಪಾಸಿಟಿವ್. ರೋಗಿ: ಅಶೋಕ್ ಕುಮಾರ್ ಅಗರ್ವಾಲ್ (67 ವರ್ಷ). ಆದೇಶ: ಕ್ರಾಸ್ ಮ್ಯಾಚಿಂಗ್ ನಂತರ 2 ಯೂನಿಟ್ ತಾಜಾ ಹೆಪ್ಪುಗಟ್ಟಿದ ಪ್ಲಾಸ್ಮಾ (FFP).",
        explainLikeIm10: "ನಿಮಗೆ ಕೋವಿಡ್-19 ಇರುವುದು ದೃಢಪಟ್ಟಿದೆ. ನಿಮ್ಮ ರಕ್ತದ ಗುಂಪು A ಪಾಸಿಟಿವ್. ವೈದ್ಯರು 2 ಯೂನಿಟ್ ಎಫ್‌ಎಫ್‌ಪಿ ಪ್ಲಾಸ್ಮಾವನ್ನು ಸೂಚಿಸಿದ್ದಾರೆ.",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['ಕೋವಿಡ್-19 ಪಾಸಿಟಿವ್ ರೋಗಿಗೆ ಎಫ್‌ಎಫ್‌ಪಿ ಪ್ಲಾಸ್ಮಾ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.'],
        whatIsUnclear: ['ಎಲ್ಲಾ ಅಂಶಗಳು ಸ್ಪಷ್ಟವಾಗಿವೆ.'],
        whatToAskDoctor: ['ಪ್ಲಾಸ್ಮಾ ಯಾವಾಗ ನೀಡಲಾಗುತ್ತದೆ?'],
        spokenScript: "ನಮಸ್ಕಾರ! ನಾನು ಡಾ. ಬೆನ್ ಕಾರ್ಟರ್, ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ಸಹಾಯಕ. ಪ್ರಭಾ ಆಸ್ಪತ್ರೆಯ ಸ್ಲಿಪ್ ಪ್ರಕಾರ ನಿಮಗೆ ಕೋವಿಡ್-19 ಪಾಸಿಟಿವ್ ದೃಢಪಟ್ಟಿದೆ. ನಿಮ್ಮ ರಕ್ತದ ಗುಂಪು 'A' ಪಾಸಿಟಿವ್. ಡಾ. ಬಿ.ಕೆ. ಸಿಂಗ್ 2 ಯೂನಿಟ್ FFP ಪ್ಲಾಸ್ಮಾವನ್ನು ಕ್ರಾಸ್ ಮ್ಯಾಚಿಂಗ್ ನಂತರ ನೀಡಲು ಸೂಚಿಸಿದ್ದಾರೆ.",
        sentenceTimings: [
          { sentence: "ನಮಸ್ಕಾರ! ನಾನು ಡಾ. ಬೆನ್ ಕಾರ್ಟರ್, ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ಸಹಾಯಕ.", durationSec: 3.5, topic: 'intro' },
          { sentence: "ನಿಮಗೆ ಕೋವಿಡ್-19 ಪಾಸಿಟಿವ್ ದೃಢಪಟ್ಟಿದೆ. ರಕ್ತದ ಗುಂಪು 'A' ಪಾಸಿಟಿವ್.", durationSec: 4.5, topic: 'diag' },
          { sentence: "ಡಾ. ಬಿ.ಕೆ. ಸಿಂಗ್ 2 ಯೂನಿಟ್ FFP ಪ್ಲಾಸ್ಮಾವನ್ನು ಸೂಚಿಸಿದ್ದಾರೆ.", durationSec: 5.0, topic: 'meds' }
        ]
      },
      ml: {
        language: 'ml',
        languageName: 'Malayalam',
        simpleSummary: "പ്രഭാ ഹോസ്പിറ്റൽ സ്ലിപ്പ്: കോവിഡ്-19 പോസിറ്റീവ്. ബ്ലഡ് ഗ്രൂപ്പ്: 'A' പോസിറ്റീവ്. രോഗി: അശോക് കുമാർ അഗർവാൾ. നിർദ്ദേശം: ക്രോസ് മാച്ചിംഗിന് ശേഷം 2 യൂണിറ്റ് എഫ്.എഫ്.പി. പ്ലാസ്മ.",
        explainLikeIm10: "നിങ്ങൾക്ക് കോവിഡ്-19 സ്ഥിരീകരിച്ചിരിക്കുന്നു. ബ്ലഡ് ഗ്രൂപ്പ് A പോസിറ്റീവ് ആണ്. ഡോക്ടർ 2 യൂണിറ്റ് പ്ലാസ്മ നൽകാൻ നിർദ്ദേശിച്ചു.",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['കോവിഡ് ബാധിതനായ രോഗിക്ക് എഫ്.എഫ്.പി നൽകാൻ ആവശ്യപ്പെട്ടിരിക്കുന്നു.'],
        whatIsUnclear: ['എല്ലാ വിവരങ്ങളും പരിശോധിച്ചു.'],
        whatToAskDoctor: ['പ്ലാസ്മ നൽകുന്ന സമയം എപ്പോഴാണ്?'],
        spokenScript: "നമസ്കാരം! ഞാൻ ഡോ. ബെൻ കാർട്ടർ. പ്രഭാ ഹോസ്പിറ്റലിൽ നിന്നുള്ള സ്ലിപ്പ് പരിശോധിച്ചു. നിങ്ങൾക്ക് കോവിഡ്-19 പോസിറ്റീവ് സ്ഥിരീകരിച്ചു. ബ്ലഡ് ഗ്രൂപ്പ് 'A' പോസിറ്റീവ് ആണ്. ഡോ. ബി.കെ. സിംഗ് 2 യൂണിറ്റ് എഫ്.എഫ്.പി പ്ലാസ്മ നൽകാൻ നിർദ്ദേശിച്ചിട്ടുണ്ട്.",
        sentenceTimings: [
          { sentence: "നമസ്കാരം! ഞാൻ ഡോ. ബെൻ കാർട്ടർ.", durationSec: 3.2, topic: 'intro' },
          { sentence: "നിങ്ങൾക്ക് കോവിഡ്-19 പോസിറ്റീവ് സ്ഥിരീകരിച്ചു. ബ്ലഡ് ഗ്രൂപ്പ് 'A' പോസിറ്റീവ് ആണ്.", durationSec: 4.5, topic: 'diag' },
          { sentence: "ഡോ. ബി.കെ. സിംഗ് 2 യൂണിറ്റ് എഫ്.എഫ്.പി പ്ലാസ്മ നൽകാൻ നിർദ്ദേശിച്ചിട്ടുണ്ട്.", durationSec: 5.0, topic: 'meds' }
        ]
      },
      bn: {
        language: 'bn',
        languageName: 'Bengali',
        simpleSummary: "প্রভা হাসপাতাল স্লিপ: কোভিড-১৯ পজিটিভ। রক্তের গ্রুপ: 'A' পজিটিভ। রোগী: অশোক কুমার আগরওয়াল (৬৭ বছর)। আদেশ: সঠিক ক্রস ম্যাচিংয়ের পর ২ ইউনিট ফ্রেশ ফ্রোজেন প্লাজমা (FFP)।",
        explainLikeIm10: "আপনাকে কোভিড-১৯ পজিটিভ শনাক্ত করা হয়েছে। রক্তের গ্রুপ A পজিটিভ। ডাক্তার ২ ইউনিট এফএফপি প্লাজমা দেওয়ার নির্দেশ দিয়েছেন।",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['কোভিড-১৯ আক্রান্ত রোগীকে প্লাজমা দেওয়ার আদেশ করা হয়েছে।'],
        whatIsUnclear: ['সকল তথ্য যাচাই করা হয়েছে।'],
        whatToAskDoctor: ['কখন প্লাজমা দেওয়া হবে?'],
        spokenScript: "নমস্কার! আমি ডঃ বেন কার্টার, আপনার মেডস্ক্রিপ্ট এআই সহকারী। প্রভা হাসপাতালের প্রেসক্রিপশন অনুযায়ী আপনার কোভিড-১৯ পজিটিভ ধরা পড়েছে। আপনার রক্তের গ্রুপ 'A' পজিটিভ। ডাঃ বি.কে. সিং ক্রস ম্যাচিংয়ের পর ২ ইউনিট ফ্রেশ ফ্রোজেন প্লাজমা (FFP) দেওয়ার নির্দেশ দিয়েছেন।",
        sentenceTimings: [
          { sentence: "নমস্কার! আমি ডঃ বেন কার্টার, আপনার মেডস্ক্রিপ্ট এআই সহকারী।", durationSec: 3.5, topic: 'intro' },
          { sentence: "আপনার কোভিড-১৯ পজিটিভ ধরা পড়েছে। রক্তের গ্রুপ 'A' পজিটিভ।", durationSec: 4.5, topic: 'diag' },
          { sentence: "ডাঃ বি.কে. সিং ২ ইউনিট ফ্রেশ ফ্রোজেন প্লাজমা দেওয়ার নির্দেশ দিয়েছেন।", durationSec: 5.2, topic: 'meds' }
        ]
      },
      mr: {
        language: 'mr',
        languageName: 'Marathi',
        simpleSummary: "प्रभा हॉस्पिटल स्लिप: कोविड-१९ पॉझिटिव्ह. रक्तगट: 'A' पॉझिटिव्ह. रुग्ण: अशोक कुमार अग्रवाल (६७ वर्षे). निर्देश: क्रॉस मॅचिंगनंतर २ युनिट फ्रेश फ्रोझन प्लाझ्मा (FFP).",
        explainLikeIm10: "तुम्हाला कोविड-१९ पॉझिटिव्ह असल्याचे निदान झाले आहे. रक्तगट A पॉझिटिव्ह आहे. डॉक्टरांनी २ युनिट एफएफपी प्लाझ्मा देण्याचे निर्देश दिले आहेत.",
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['कोविड रुग्णासाठी २ युनिट एफएफपी प्लाझ्मा देण्याची शिफारस करण्यात आली आहे.'],
        whatIsUnclear: ['सर्व नोंदी स्पष्ट आहेत.'],
        whatToAskDoctor: ['प्लाझ्मा कधी दिला जाईल?'],
        spokenScript: "नमस्कार! मी डॉ. बेन कार्टर, तुमचा मेडस्क्रिप्ट एआई सहाय्यक. प्रभा हॉस्पिटलच्या स्लिप तपासणीनुसार तुम्हाला कोविड-१९ पॉझिटिव्ह निदान झाले आहे. तुमचा रक्तगट 'A' पॉझिटिव्ह आहे. डॉ. बी.के. सिंग यांनी योग्य क्रॉस मॅचिंगनंतर २ युनिट फ्रेश फ्रोझन प्लाझ्मा (FFP) देण्याचे निर्देश दिले आहेत.",
        sentenceTimings: [
          { sentence: "नमस्कार! मी डॉ. बेन कार्टर, तुमचा मेडस्क्रिप्ट एआई सहाय्यक.", durationSec: 3.5, topic: 'intro' },
          { sentence: "तुम्हाला कोविड-१९ पॉझिटिव्ह निदान झाले आहे. रक्तगट 'A' पॉझिटिव्ह आहे.", durationSec: 4.5, topic: 'diag' },
          { sentence: "डॉ. बी.के. सिंग यांनी २ युनिट फ्रेश फ्रोझन प्लाझ्मा देण्याचे निर्देश दिले आहेत.", durationSec: 5.2, topic: 'meds' }
        ]
      }
    },
    structuredMeds,
    diagnoses: ['Covid-19 Positive (SARS-CoV-2 Confirmed Inpatient)'],
    instructions: [
      'Requisition To Blood Bank Officer: Sir kindly issue Two unit of FFP for Pt Ashok Kumar Agrawal.',
      'Mandatory transfusion safety directive: Release and transfuse only after proper cross matching and grouping.',
      'Verify recipient Blood Group A Positive against donor plasma units prior to administration.'
    ],
    labFindings: [
      'Blood Group: "A" Positive (A+)',
      'Date of Admission (D.O.A): 19/11/2020',
      'I.P.D Registration Number: 6447',
      'Patient Age / Gender: 67 Yrs / Male'
    ],
    symptoms: [
      'Hospitalized with acute COVID-19 infection (admitted 19/11/2020, day 8 of hospitalization)'
    ],
    separatedContent: {
      documentSays: [
        { category: 'Diagnosis', field: 'Confirmed Status', value: 'Covid-19 Positive' },
        { category: 'Lab Reading', field: 'Recipient Blood Group', value: 'Blood Group "A" Positive (A+)' },
        { category: 'Patient Info', field: 'Patient Demographics', value: 'Ashok Kumar Agrawal, 67 Y / Male, IPD: 6447, D.O.A: 19/11/2020' },
        { category: 'Prescribed Biologic', field: 'Medical Order', value: 'Two Units of Fresh Frozen Plasma (FFP)' },
        { category: 'Safety Directive', field: 'Transfusion Condition', value: 'After proper cross matching and grouping' },
        { category: 'Hospital & Prescriber', field: 'Facility & Doctor', value: 'Prabha Hospital & Trauma Centre, Sikandra, Agra — Dr. B.K. Singh' }
      ],
      termMeanings: [
        { term: 'Covid-19 Positive', meaning: 'Acute SARS-CoV-2 viral respiratory disease requiring inpatient medical care and vital monitoring.', caution: 'Physician diagnosis recorded at time of requisition.' },
        { term: 'Blood Group "A" Positive', meaning: 'ABO group A with RhD positive antigen. Patient can receive Group A or Group AB plasma.', caution: 'Recipient must NOT receive Group O or Group B plasma.' },
        { term: 'Fresh Frozen Plasma (FFP)', meaning: 'Human plasma frozen within 8 hours. Supplies coagulation factors, fibrinogen, and antibodies for COVID coagulopathy.', caution: 'Hospital infusion requiring cold-chain handling.' },
        { term: 'Cross Matching and Grouping', meaning: 'Serological test ensuring donor plasma antibodies do not destroy recipient red blood cells.', caution: 'Mandatory before any blood component transfusion.' }
      ],
      notDetermined: [
        { topic: 'Baseline Oxygen Saturation (SpO2)', explanation: 'Room air or oxygen-supplemented SpO2 reading is not specified on this requisition slip.' },
        { topic: 'D-Dimer and Ferritin Lab Values', explanation: 'Specific quantitative inflammatory and thrombotic marker levels are not listed on this single sheet.' },
        { topic: 'Pre-existing Medical Allergies', explanation: 'Allergy history is not documented on this requisition form.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'MedScript Clinical Handwriting Verification Engine',
      hasNumericalConfidence: true,
      averageConfidenceScore: 98,
      providerNotice: 'Multi-pass optical stroke and clinical lexicon verification completed with 98% average confidence.'
    },
    serviceConfigured: true,
    get explanation(): DocumentExplanation {
      return (this.translations[this.selectedLanguage] || this.translations.en)!;
    }
  };
}

function createAshvikaPediatricDocument(): ProcessedDocument {
  const fullTranscript = `ഡോ. നിതിൻ നാരായണൻ (Dr. Nithin Narayanan)
MBBS (Govt. Medical College, Thrissur)
M.D. Paediatrics (JIPMER)
ശിശുരോഗവിദഗ്ദ്ധൻ (Paediatrician)
CHC, Nemmara
രാവിലെ: 7.00 to 8.45 | വൈകിട്ട്: 3.30 to 7.30
Reg. No.: 52547 | Ph: 8086993168

Date: 20-9-2022
Name: ASHVIKA
Weight: 13.25 kg
Age, Gender: 4 yr / F

Clinical Description:
URTI (Upper Respiratory Tract Infection)
RR - 22/min (Respiratory Rate: 22 breaths per minute)
RS - BIL AEE (Respiratory System: Bilateral Air Entry Equal)

Advice:
1. SYP CALPOL (250/5) 4 mL Q6H x 3 d
2. SYP DELCON 3 mL TDS x 5 d
3. SYP LEVOLIN 3 mL TDS x 5 d
4. SYP MEFTAL-P (100/5) 3 mL SOS (കൂടിയ പനിക്ക്)
ചൂടുവെള്ളം കുടിക്കുക (Drink warm/boiled water)`;

  const tokens = [
    {
      id: 'tok-ashvika-1',
      text: 'Dr. Nithin Narayanan, MBBS, M.D. Paediatrics (JIPMER), CHC Nemmara',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 10, y: 1, width: 45, height: 13 },
      category: 'patient_info' as const,
      isUncertain: false,
      medicalMeaning: 'Consultant Paediatrician at Community Health Centre (CHC) Nemmara, Palakkad. Reg No: 52547.'
    },
    {
      id: 'tok-ashvika-2',
      text: 'Reg. No.: 52547 | Ph: 8086993168 | Timings: 7.00-8.45 AM & 3.30-7.30 PM',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 58, y: 1, width: 40, height: 13 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-ashvika-3',
      text: 'Date: 20-9-2022',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 57, y: 16, width: 26, height: 3 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-ashvika-4',
      text: 'Name: ASHVIKA',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 11, y: 22, width: 28, height: 3 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-ashvika-5',
      text: 'Weight: 13.25 kg',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 64, y: 22, width: 22, height: 7 },
      category: 'lab_value' as const,
      isUncertain: false,
      medicalMeaning: 'Paediatric weight: 13.25 kg. Used to calculate precise milligram-per-kilogram doses for all prescribed syrups.'
    },
    {
      id: 'tok-ashvika-6',
      text: 'Age, Gender: 4 yr / F (Female, 4 Years)',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 11, y: 27, width: 30, height: 3 },
      category: 'patient_info' as const,
      isUncertain: false
    },
    {
      id: 'tok-ashvika-7',
      text: 'Clinical Description: URTI (Upper Respiratory Tract Infection)',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 11, y: 35, width: 40, height: 10 },
      category: 'diagnosis' as const,
      isUncertain: false,
      medicalMeaning: 'Upper Respiratory Tract Infection (URTI) involving the nasal passage, pharynx, and upper airways.'
    },
    {
      id: 'tok-ashvika-8',
      text: 'RR - 22/min (Respiratory Rate: 22 Breaths per Minute)',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 36, y: 42, width: 24, height: 3 },
      category: 'lab_value' as const,
      isUncertain: false,
      medicalMeaning: 'Normal physiological respiratory rate for a 4-year-old child (standard pediatric reference: 20-30 breaths/min).'
    },
    {
      id: 'tok-ashvika-9',
      text: 'RS - BIL AEE (Respiratory System: Bilateral Air Entry Equal)',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 36, y: 47, width: 24, height: 3 },
      category: 'lab_value' as const,
      isUncertain: false,
      medicalMeaning: 'Bilateral symmetrical lung aeration with no focal consolidation or wheezing on stethoscope examination.'
    },
    {
      id: 'tok-ashvika-10',
      text: 'SYP CALPOL (250/5) 4 mL Q6H x 3 d',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 15, y: 61, width: 66, height: 4 },
      category: 'medication' as const,
      isUncertain: false,
      medicalMeaning: 'Syrup Calpol 250 (Paracetamol 250mg/5mL). 4 mL every 6 hours for 3 days for fever and pain (200 mg dose = 15.1 mg/kg).'
    },
    {
      id: 'tok-ashvika-11',
      text: 'SYP DELCON 3 mL TDS x 5 d',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 15, y: 69, width: 56, height: 4 },
      category: 'medication' as const,
      isUncertain: false,
      medicalMeaning: 'Syrup Delcon (Chlorpheniramine Maleate + Phenylephrine HCl). 3 mL three times daily (TDS) for 5 days for runny nose and cold congestion.'
    },
    {
      id: 'tok-ashvika-12',
      text: 'SYP LEVOLIN 3 mL TDS x 5 d',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 15, y: 77, width: 58, height: 4 },
      category: 'medication' as const,
      isUncertain: false,
      medicalMeaning: 'Syrup Levolin (Levosalbutamol 0.31mg/5mL). 3 mL three times daily (TDS) for 5 days to ease cough and open bronchial airways.'
    },
    {
      id: 'tok-ashvika-13',
      text: 'SYP MEFTAL-P (100/5) 3 mL SOS',
      confidence: 99,
      confidenceDisplay: '99% (MedScript Optical Stroke Verification)',
      bbox: { x: 15, y: 85, width: 62, height: 4 },
      category: 'medication' as const,
      isUncertain: false,
      medicalMeaning: 'Syrup Meftal-P (Mefenamic Acid 100mg/5mL). 3 mL SOS (rescue dose only) with food for high fever spikes.'
    },
    {
      id: 'tok-ashvika-14',
      text: '(കൂടിയ പനിക്ക്) - Malayalam Doctor Note: For High Fever',
      confidence: 98,
      confidenceDisplay: '98% (MedScript Optical Stroke Verification)',
      bbox: { x: 43, y: 91, width: 30, height: 4 },
      category: 'instruction' as const,
      isUncertain: false,
      medicalMeaning: 'Malayalam note translates to: "For High Fever". Reserve Meftal-P strictly as rescue antipyretic if temperature remains high despite Calpol.'
    },
    {
      id: 'tok-ashvika-15',
      text: 'ചൂടുവെള്ളം കുടിക്കുക (Drink warm/boiled water and maintain hydration)',
      confidence: 97,
      confidenceDisplay: '97% (MedScript Optical Stroke Verification)',
      bbox: { x: 23, y: 96, width: 48, height: 3 },
      category: 'instruction' as const,
      isUncertain: false
    }
  ];

  const structuredMeds = [
    {
      id: 'med-ashvika-1',
      name: 'SYP CALPOL (250/5) [Paracetamol Paediatric Oral Suspension IP]',
      strength: '250 mg / 5 mL (50 mg/mL)',
      dosage: '4 mL (200 mg Paracetamol, calculated at 15.1 mg/kg for 13.25 kg)',
      frequency: 'Q6H (Every 6 hours / up to 4 times a day)',
      duration: '3 days (x 3 d)',
      route: 'Oral (by mouth)',
      timingInstructions: 'Administer every 6 hours as needed for fever and discomfort',
      foodInstructions: 'May be taken before or after meals',
      isVerified: true,
      confidence: 99,
      rawLine: 'SYP CALPOL (250/5) 4 mL Q6H x 3 d',
      medicalMeaning: 'Paracetamol paediatric oral suspension. First-line antipyretic and analgesic used to bring down fever and relieve aches during URTI.'
    },
    {
      id: 'med-ashvika-2',
      name: 'SYP DELCON [Chlorpheniramine Maleate + Phenylephrine HCl Paediatric Syrup]',
      strength: 'Chlorpheniramine Maleate 2 mg + Phenylephrine HCl 5 mg per 5 mL',
      dosage: '3 mL',
      frequency: 'TDS (Three times a day: Morning, Afternoon, Night)',
      duration: '5 days (x 5 d)',
      route: 'Oral (by mouth)',
      timingInstructions: 'Administer 3 times a day at evenly spaced intervals',
      foodInstructions: 'Preferably taken after meals with a sip of water',
      isVerified: true,
      confidence: 98,
      rawLine: 'SYP DELCON 3 mL TDS x 5 d',
      medicalMeaning: 'Paediatric decongestant and antihistamine syrup. Relieves runny nose, sneezing, watery eyes, and blocked nasal passages in upper respiratory tract cold.'
    },
    {
      id: 'med-ashvika-3',
      name: 'SYP LEVOLIN [Levosalbutamol / Levalbuterol Paediatric Bronchodilator Syrup]',
      strength: '0.31 mg / 5 mL (Levosalbutamol Sulphate IP)',
      dosage: '3 mL',
      frequency: 'TDS (Three times a day)',
      duration: '5 days (x 5 d)',
      route: 'Oral (by mouth)',
      timingInstructions: 'Administer three times daily (morning, midday, night)',
      foodInstructions: 'Can be taken with or without food',
      isVerified: true,
      confidence: 98,
      rawLine: 'SYP LEVOLIN 3 mL TDS x 5 d',
      medicalMeaning: 'Selective beta-2 adrenergic agonist bronchodilator. Relaxes bronchial airway muscles, prevents airway bronchospasm, eases breathing, and relieves wheezing or persistent cough.'
    },
    {
      id: 'med-ashvika-4',
      name: 'SYP MEFTAL-P (100/5) [Mefenamic Acid Paediatric Oral Suspension IP]',
      strength: '100 mg / 5 mL (20 mg/mL)',
      dosage: '3 mL (60 mg Mefenamic Acid)',
      frequency: 'SOS (Si Opus Sit: Only as needed when high fever occurs)',
      duration: 'Only during high fever spikes (കൂടിയ പനിക്ക്)',
      route: 'Oral (by mouth)',
      timingInstructions: 'Rescue antipyretic: only if fever exceeds 101°F (38.3°C) and does not come down with Calpol',
      foodInstructions: 'Strictly give with food, milk, or immediately after feeding to prevent gastrointestinal upset',
      isVerified: true,
      confidence: 98,
      rawLine: 'SYP MEFTAL-P (100/5) 3 mL SOS (കൂടിയ പനിക്ക്)',
      medicalMeaning: 'Potent NSAID antipyretic. Dr. Nithin Narayanan explicitly annotated this in Malayalam as \'(കൂടിയ പനിക്ക്)\' (for high fever). Used strictly as a rescue antipyretic for refractory high fever spikes.'
    }
  ];

  const enWhatWasWritten = [
    '1. Dr. Nithin Narayanan, MBBS (Govt Medical College Thrissur), M.D. Paediatrics (JIPMER), CHC Nemmara (Reg No: 52547)',
    '2. Date: 20-9-2022 | Patient: ASHVIKA | Age/Gender: 4 yr / F | Weight: 13.25 kg',
    '3. Clinical Description: URTI (Upper Respiratory Tract Infection) | RR - 22/min | RS - BIL AEE',
    '4. SYP CALPOL (250/5) 4 mL Q6H x 3 d (Paracetamol 250mg/5mL)',
    '5. SYP DELCON 3 mL TDS x 5 d (Chlorpheniramine + Phenylephrine)',
    '6. SYP LEVOLIN 3 mL TDS x 5 d (Levosalbutamol 0.31mg/5mL)',
    '7. SYP MEFTAL-P (100/5) 3 mL SOS (കൂടിയ പനിക്ക്) (Mefenamic Acid 100mg/5mL for high fever)',
    '8. ചൂടുവെള്ളം കുടിക്കുക (Drink warm/boiled water)'
  ];

  const termsMean = [
    {
      id: 'term-calpol',
      term: 'SYP CALPOL (250/5)',
      simpleMeaning: 'Syrup Calpol 250 (Paracetamol 250mg/5mL) paediatric oral suspension. Gives 200 mg paracetamol per 4 mL dose (exactly 15.1 mg/kg for 13.25 kg weight) to control fever and discomfort in URTI.',
      documentContext: 'SYP CALPOL (250/5) 4 mL Q6H x 3 d',
      whatItDoesNotMean: 'Do not exceed 4 doses in 24 hours. Wait at least 4 to 6 hours between doses.',
      category: 'medication' as const
    },
    {
      id: 'term-delcon',
      term: 'SYP DELCON',
      simpleMeaning: 'Syrup Delcon (Chlorpheniramine Maleate + Phenylephrine HCl) paediatric syrup. First-line decongestant and antihistamine relieving runny nose, nasal congestion, and sneezing in upper respiratory cold.',
      documentContext: 'SYP DELCON 3 mL TDS x 5 d',
      whatItDoesNotMean: 'May cause mild drowsiness; ensure the child is comfortable and well hydrated.',
      category: 'medication' as const
    },
    {
      id: 'term-levolin',
      term: 'SYP LEVOLIN',
      simpleMeaning: 'Syrup Levolin (Levosalbutamol 0.31mg/5mL) paediatric bronchodilator. Relaxes bronchial smooth muscle to relieve coughing, tight chest, or airway spasm in respiratory infections.',
      documentContext: 'SYP LEVOLIN 3 mL TDS x 5 d',
      whatItDoesNotMean: 'This is an oral syrup, not an inhaler or nebulizer. Give orally with measuring spoon or cup.',
      category: 'medication' as const
    },
    {
      id: 'term-meftalp',
      term: 'SYP MEFTAL-P (100/5) (കൂടിയ പനിക്ക്)',
      simpleMeaning: 'Syrup Meftal-P (Mefenamic Acid 100mg/5mL) paediatric NSAID suspension. Specifically annotated by the doctor as "കൂടിയ പനിക്ക്" (Malayalam: for high fever). Used strictly as a rescue medicine if temperature spikes high despite Calpol.',
      documentContext: 'SYP MEFTAL-P (100/5) 3 mL SOS (കൂടിയ പനിക്ക്)',
      whatItDoesNotMean: 'Do not give on an empty stomach. Must be administered with food or milk.',
      category: 'medication' as const
    },
    {
      id: 'term-urti',
      term: 'URTI',
      simpleMeaning: 'Upper Respiratory Tract Infection — Common acute viral infection of the nose and throat causing rhinitis, cough, and mild fever.',
      documentContext: 'Clinical Description: URTI RR - 22/min RS-BIL AEE',
      whatItDoesNotMean: 'This is an upper airway condition; chest examination confirmed lungs are clear (bilateral air entry equal).',
      category: 'diagnosis' as const
    }
  ];

  return {
    id: 'demo-doc-ashvika',
    name: 'Ashvika_Paediatric_Prescription_Nemmara.png',
    type: 'prescription',
    imageDataUrl: '/ashvika_pediatric_prescription.png',
    uploadedAt: new Date(Date.now() - 3600000).toISOString(),
    fileSize: 244011,
    isDemo: true,
    quality: {
      status: 'pass',
      overallScore: 99,
      blurScore: 98,
      darknessScore: 97,
      glareScore: 99,
      resolutionScore: 99,
      rotationAngle: 0,
      handwritingVisibilityScore: 99,
      issues: [],
      suggestions: [
        'Dr. Nithin Narayanan paediatric prescription deciphered with 99% optical stroke clarity.',
        'Patient Ashvika (4 yr / F, 13.25 kg), URTI clinical notes, and all 4 paediatric syrups verified.'
      ]
    },
    tokens,
    rawOcrText: fullTranscript,
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        { id: 'chk-ashvika-1', name: 'Optical Stroke Grounding', passed: true, details: 'Strictly grounded in extracted handwriting from CHC Nemmara prescription.' },
        { id: 'chk-ashvika-2', name: 'Weight-Based Dose Verification', passed: true, details: 'Verified Calpol dose (200 mg / 4 mL) matches textbook 15.1 mg/kg for 13.25 kg body weight.' },
        { id: 'chk-ashvika-3', name: 'Dual-Antipyretic Safety Separation', passed: true, details: 'Separated routine Calpol (Q6H) from rescue Meftal-P (SOS for high fever only with food).' },
        { id: 'chk-ashvika-4', name: 'Vernacular Translation Grounding', passed: true, details: 'Deciphered Malayalam note (കൂടിയ പനിക്ക്) accurately as "For High Fever".' }
      ]
    },
    translations: {
      en: {
        language: 'en',
        languageName: 'English',
        simpleSummary: 'Paediatric Prescription from CHC Nemmara (Dr. Nithin Narayanan, MD Paediatrics JIPMER). Patient: ASHVIKA, 4 yr / Female, Weight: 13.25 kg. Date: 20-9-2022. Clinical Diagnosis: URTI (Upper Respiratory Tract Infection). Respiratory Rate: 22/min (Normal), Bilateral Air Entry Equal (RS - BIL AEE). Prescribed 4 medications: Syrup Calpol 250 (4 mL Q6H x 3d), Syrup Delcon (3 mL TDS x 5d), Syrup Levolin (3 mL TDS x 5d), and Syrup Meftal-P (3 mL SOS with food strictly for high fever - "കൂടിയ പനിക്ക്"). Drink warm water and maintain hydration.',
        explainLikeIm10: 'Dr. Nithin Narayanan examined 4-year-old Ashvika and found a cold and throat infection called URTI. Her chest is clear and breathing normally at 22 breaths per minute. He gave Calpol syrup for fever and body ache, Delcon syrup to stop the runny nose and sneezes, Levolin syrup to open the airways and calm the cough, and Meftal-P syrup only if she gets a high fever spike. Make sure she drinks plenty of warm water and rests.',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: [
          'Patient Ashvika (4-year-old female, 13.25 kg) examined by Dr. Nithin Narayanan on 20-9-2022.',
          'Diagnosed with Upper Respiratory Tract Infection (URTI) with normal breathing rate (22 breaths/min) and clear lung sounds.',
          'Prescribed 4 targeted paediatric syrups: Calpol (fever), Delcon (cold/congestion), Levolin (cough/airways), and Meftal-P (rescue for high fever).'
        ],
        whatIsUnclear: ['All doctor handwriting tokens, medical terms, and dosages have been 100% deciphered and verified.'],
        whatToAskDoctor: [
          'If fever resolves before 3 days, should I stop Calpol or continue full course?',
          'How many hours should I wait between Calpol and Meftal-P if the child has a high fever spike?',
          'When should I bring Ashvika back for a follow-up review if cough persists?'
        ],
        spokenScript: "Hello, I am Dr. Ben Carter, your verified MedScript medical explainer. I have thoroughly reviewed this paediatric prescription for 4-year-old Ashvika, weighing 13.25 kg, issued by Consultant Paediatrician Dr. Nithin Narayanan at CHC Nemmara. The clinical diagnosis is Upper Respiratory Tract Infection, commonly known as URTI, with a normal respiratory rate of 22 breaths per minute and clear bilateral chest sounds. Four specific paediatric syrups are prescribed. First, Syrup Calpol 250, paracetamol 4 ml every 6 hours for 3 days to control fever and body discomfort. Second, Syrup Delcon, 3 ml three times daily for 5 days to relieve runny nose, sneezing, and nasal congestion. Third, Syrup Levolin, a paediatric bronchodilator, 3 ml three times daily for 5 days to open the airways and ease coughing. Fourth, Syrup Meftal-P, 3 ml SOS, which the doctor specifically noted in Malayalam as 'കൂടിയ പനിക്ക്', meaning it is strictly a rescue medicine to be given with food only if high fever occurs. Ensure the child drinks warm water and stays well hydrated.",
        sentenceTimings: [
          { sentence: "Hello, I am Dr. Ben Carter, your verified MedScript medical explainer.", durationSec: 4.0, topic: 'intro' },
          { sentence: "I have thoroughly reviewed this paediatric prescription for 4-year-old Ashvika, weighing 13.25 kg, issued by Dr. Nithin Narayanan at CHC Nemmara.", durationSec: 7.0, topic: 'patient' },
          { sentence: "The diagnosis is Upper Respiratory Tract Infection, with a normal respiratory rate of 22 breaths per minute and clear chest sounds.", durationSec: 6.5, topic: 'diag' },
          { sentence: "Syrup Calpol 250 is prescribed, 4 ml every 6 hours for 3 days for fever control.", durationSec: 5.5, topic: 'meds' },
          { sentence: "Syrup Delcon, 3 ml three times daily for 5 days relieves runny nose and congestion.", durationSec: 5.5, topic: 'meds' },
          { sentence: "Syrup Levolin, 3 ml three times daily for 5 days opens the airways and eases cough.", durationSec: 5.5, topic: 'meds' },
          { sentence: "Syrup Meftal-P, 3 ml SOS is marked in Malayalam as 'കൂടിയ പനിക്ക്', for high fever only with food.", durationSec: 6.5, topic: 'meds' },
          { sentence: "Please give warm boiled water and ensure the child remains well rested and hydrated.", durationSec: 5.0, topic: 'advice' }
        ]
      },
      ml: {
        language: 'ml',
        languageName: 'Malayalam',
        simpleSummary: 'സി.എച്ച്.സി നെന്മാറ കുറിപ്പടി (ഡോ. നിതിൻ നാരായണൻ, MD Paediatrics JIPMER). രോഗി: അശ്വിക (4 വയസ്സ്, പെൺകുട്ടി, തൂക്കം: 13.25 kg). രോഗനിർണയം: അപ്പർ റെസ്പിറേറ്ററി ട്രാക്റ്റ് ഇൻഫെക്ഷൻ (URTI). ശ്വാസോച്ഛ്വാസം സാധാരണ നിലയിൽ (RR: 22/min). നാല് സിറപ്പുകൾ: കാൽപോൾ 250 (4 mL Q6H x 3d), ഡെൽക്കോൺ (3 mL TDS x 5d), ലെവോലിൻ (3 mL TDS x 5d), മെഫ്താൽ-പി (3 mL SOS കൂടിയ പനിക്ക് മാത്രം ആഹാരത്തിന് ശേഷം). ചൂടുവെള്ളം കുടിക്കുക.',
        explainLikeIm10: 'ഡോക്ടർ നിതിൻ നാരായണൻ 4 വയസ്സുള്ള അശ്വികയെ പരിശോധിച്ച് ജലദോഷവും തൊണ്ടവേദനയുമാണ് (URTI) എന്ന് കണ്ടെത്തി. പനിക്കും ശരീരവേദനയ്ക്കും കാൽപോൾ സിറപ്പും, മൂക്കൊലിപ്പിന് ഡെൽക്കോൺ സിറപ്പും, ചുമ കുറയ്ക്കാൻ ലെവോലിൻ സിറപ്പും കുറിച്ചിട്ടുണ്ട്. പനി വളരെ കൂടിയാൽ മാത്രം നൽകാൻ മെഫ്താൽ-പി സിറപ്പ് "കൂടിയ പനിക്ക്" എന്ന് പ്രത്യേകം കുറിച്ചിട്ടുണ്ട്. കുട്ടിക്ക് ധാരാളം ചൂടുവെള്ളം നൽകുക.',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: [
          'രോഗി അശ്വിക (4 വയസ്സ്, 13.25 കിലോഗ്രാം) നെന്മാറ സി.എച്ച്.സിയിലെ ഡോ. നിതിൻ നാരായണൻ പരിശോധിച്ചു.',
          'അപ്പർ റെസ്പിറേറ്ററി ട്രാക്റ്റ് ഇൻഫെക്ഷൻ (URTI) സ്ഥിരീകരിച്ചു; ശ്വാസകോശം ശാന്തമാണ് (BIL AEE, RR 22/min).',
          'നാല് പീഡിയാട്രിക് സിറപ്പുകൾ കുറിച്ചു: കാൽപോൾ (പനി), ഡെൽക്കോൺ (ജലദോഷം), ലെവോലിൻ (ചുമ/ശ്വാസം), മെഫ്താൽ-പി (കൂടിയ പനിക്ക്).'
        ],
        whatIsUnclear: ['എല്ലാ വാക്കുകളും മരുന്നുകളുടെ അളവും 100% വ്യക്തമായി സ്ഥിരീകരിച്ചു.'],
        whatToAskDoctor: [
          '3 ദിവസത്തിന് മുൻപ് പനി മാറിയാൽ കാൽപോൾ നിർത്താമോ?',
          'പനി കൂടിയാൽ കാൽപോളും മെഫ്താൽ-പിയും തമ്മിൽ എത്ര സമയം ഇടവേള വേണം?',
          'ചുമ മാറിയില്ലെങ്കിൽ വീണ്ടും എപ്പോഴാണ് ഡോക്ടറെ കാണിക്കേണ്ടത്?'
        ],
        spokenScript: "നമസ്കാരം, ഞാൻ ഡോക്ടർ ബെൻ കാർട്ടർ, നിങ്ങളുടെ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായി. സി.എച്ച്.സി നെന്മാറയിലെ ഡോക്ടർ നിതിൻ നാരായണൻ 4 വയസ്സുള്ള അശ്വികയ്ക്ക് നൽകിയ കുറിപ്പടി ഞാൻ പരിശോധിച്ചു. കുട്ടിക്ക് അപ്പർ റെസ്പിറേറ്ററി ട്രാക്റ്റ് ഇൻഫെക്ഷൻ അഥവാ ജലദോഷവും തൊണ്ടവേദനയുമാണ് ഉള്ളത്. നാല് മരുന്നുകളാണ് കുറിച്ചിട്ടുള്ളത്. ഒന്ന്: സിറപ്പ് കാൽപോൾ 250, പനിക്കും ശരീരവേദനയ്ക്കും 4 മില്ലി വീതം 6 മണിക്കൂർ ഇടവിട്ട് 3 ദിവസം നൽകുക. രണ്ട്: സിറപ്പ് ഡെൽക്കോൺ, മൂക്കൊലിപ്പിനും തുമ്മലിനും 3 മില്ലി വീതം ദിവസവും 3 നേരം 5 ദിവസം നൽകുക. മൂന്ന്: സിറപ്പ് ലെവോലിൻ, ചുമ കുറയ്ക്കാനും ശ്വാസമെടുപ്പ് സുഗമമാക്കാനും 3 മില്ലി വീതം ദിവസവും 3 നേരം 5 ദിവസം നൽകുക. നാല്: സിറപ്പ് മെഫ്താൽ-പി, കുറിപ്പടിയിൽ മലയാളത്തിൽ 'കൂടിയ പനിക്ക്' എന്ന് പ്രത്യേകം എഴുതിയിട്ടുണ്ട്. പനി വളരെ കൂടുതലാണെങ്കിൽ മാത്രം ആഹാരത്തിന് ശേഷം 3 മില്ലി നൽകുക. കുട്ടിക്ക് ചൂടുവെള്ളം ധാരാളമായി കുടിക്കാൻ നൽകുക.",
        sentenceTimings: [
          { sentence: "നമസ്കാരം, ഞാൻ ഡോക്ടർ ബെൻ കാർട്ടർ, നിങ്ങളുടെ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായി.", durationSec: 4.5, topic: 'intro' },
          { sentence: "സി.എച്ച്.സി നെന്മാറയിലെ ഡോക്ടർ നിതിൻ നാരായണൻ 4 വയസ്സുള്ള അശ്വികയ്ക്ക് നൽകിയ കുറിപ്പടി പരിശോധിച്ചു.", durationSec: 6.0, topic: 'patient' },
          { sentence: "കുട്ടിക്ക് അപ്പർ റെസ്പിറേറ്ററി ട്രാക്റ്റ് ഇൻഫെക്ഷൻ അഥവാ ജലദോഷവും തൊണ്ടവേദനയുമാണ് ഉള്ളത്.", durationSec: 5.5, topic: 'diag' },
          { sentence: "സിറപ്പ് കാൽപോൾ 250, പനിക്കും ശരീരവേദനയ്ക്കും 4 മില്ലി വീതം 6 മണിക്കൂർ ഇടവിട്ട് 3 ദിവസം നൽകുക.", durationSec: 6.0, topic: 'meds' },
          { sentence: "സിറപ്പ് ഡെൽക്കോൺ, മൂക്കൊലിപ്പിനും തുമ്മലിനും 3 മില്ലി വീതം ദിവസവും 3 നേരം 5 ദിവസം നൽകുക.", durationSec: 5.5, topic: 'meds' },
          { sentence: "സിറപ്പ് ലെവോലിൻ, ചുമ കുറയ്ക്കാനും ശ്വാസമെടുപ്പ് സുഗമമാക്കാനും 3 മില്ലി വീതം 5 ദിവസം നൽകുക.", durationSec: 5.5, topic: 'meds' },
          { sentence: "സിറപ്പ് മെഫ്താൽ-പി, കുറിപ്പടിയിൽ എഴുതിയതുപോലെ 'കൂടിയ പനിക്ക്' മാത്രം ആഹാരത്തിന് ശേഷം നൽകുക.", durationSec: 6.5, topic: 'meds' },
          { sentence: "കുട്ടിക്ക് ചൂടുവെള്ളം ധാരാളമായി കുടിക്കാൻ നൽകുക.", durationSec: 4.0, topic: 'advice' }
        ]
      },
      hi: {
        language: 'hi',
        languageName: 'Hindi',
        simpleSummary: 'सीएचसी नेम्मारा से बाल रोग पर्चा (डॉ. नितिन नारायणन, एमडी पीडियाट्रिक्स JIPMER)। मरीज: अश्विक़ा (4 वर्ष, बालिका, वजन: 13.25 किलो)। निदान: अपर रेस्पिरेटरी ट्रैक्ट इन्फेक्शन (URTI)। श्वसन दर: 22/मिनट (सामान्य)। 4 सिरप: कालपोल 250 (4 मिली हर 6 घंटे में 3 दिन), डेलकॉन (3 मिली दिन में 3 बार 5 दिन), लेवोलिन (3 मिली दिन में 3 बार 5 दिन), मेफ्टाल-पी (3 मिली आपातकालीन तेज बुखार के लिए खाने के साथ)। गुनगुना पानी पिलाएं।',
        explainLikeIm10: 'डॉ. नितिन नारायणन ने 4 साल की अश्विक़ा की जांच की और उन्हें सर्दी-जुकाम और गले का संक्रमण (URTI) पाया। छाती साफ है और सांस सामान्य 22/मिनट है। बुखार के लिए कालपोल सिरप, बहती नाक के लिए डेलकॉन सिरप, खांसी शांत करने के लिए लेवोलिन सिरप, और यदि तेज बुखार आए तो केवल तब देने के लिए मेफ्टाल-पी सिरप दिया है। बच्ची को गुनगुना पानी पिलाएं।',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: [
          'मरीज अश्विक़ा (4 वर्ष, 13.25 किग्रा) की डॉ. नितिन नारायणन द्वारा जांच की गई।',
          'अपर रेस्पिरेटरी ट्रैक्ट इन्फेक्शन (URTI) का निदान हुआ; छाती में हवा का प्रवाह सामान्य है।',
          '4 बाल रोग सिरप निर्धारित किए गए: कालपोल, डेलकॉन, लेवोलिन, और मेफ्टाल-पी।'
        ],
        whatIsUnclear: ['सभी दवाएं और खुराक 100% सत्यापित हैं।'],
        whatToAskDoctor: [
          '3 दिन बाद भी बुखार रहने पर क्या करें?',
          'कालपोल और मेफ्टाल-पी के बीच कितना अंतर रखें?'
        ],
        spokenScript: "नमस्ते, मैं डॉक्टर बेन कार्टर हूँ, आपका मेडस्क्रिप्ट एआई मेडिकल सहायक। मैंने 4 वर्षीय बच्ची अश्विक़ा का बाल रोग पर्चा जाँचा है, जिनका वजन 13.25 किलोग्राम है और यह सीएचसी नेम्मारा के बाल रोग विशेषज्ञ डॉ. नितिन नारायणन द्वारा लिखा गया है। बच्ची को अपर रेस्पिरेटरी ट्रैक्ट इन्फेक्शन (URTI) यानी ऊपरी श्वसन नली का संक्रमण है। चार सिरप लिखे गए हैं: पहला, सिरप कालपोल 250, बुखार और दर्द के लिए 4 मिली हर 6 घंटे में 3 दिनों तक। दूसरा, सिरप डेलकॉन, बहती नाक और सर्दी के लिए 3 मिली दिन में 3 बार 5 दिनों तक। तीसरा, सिरप लेवोलिन, खांसी और सांस की नली खोलने के लिए 3 मिली दिन में 3 बार 5 दिनों तक। चौथा, सिरप मेफ्टाल-पी, जिसे डॉक्टर ने 'കൂടിയ പനിക്ക്' यानी केवल तेज़ बुखार होने पर खाने के साथ 3 मिली आपातकालीन रूप से देने के लिए लिखा है। बच्ची को गुनगुना पानी पिलाएं।",
        sentenceTimings: [
          { sentence: "नमस्ते, मैं डॉक्टर बेन कार्टर हूँ, आपका मेडस्क्रिप्ट एआई मेडिकल सहायक।", durationSec: 4.0, topic: 'intro' },
          { sentence: "मैंने 4 वर्षीय बच्ची अश्विक़ा का बाल रोग पर्चा जाँचा है, जिनका वजन 13.25 किलोग्राम है।", durationSec: 5.5, topic: 'patient' },
          { sentence: "बच्ची को अपर रेस्पिरेटरी ट्रैक्ट इन्फेक्शन (URTI) यानी ऊपरी श्वसन नली का संक्रमण है।", durationSec: 5.5, topic: 'diag' },
          { sentence: "पहला, सिरप कालपोल 250, बुखार और दर्द के लिए 4 मिली हर 6 घंटे में 3 दिनों तक।", durationSec: 5.5, topic: 'meds' },
          { sentence: "दूसरा, सिरप डेलकॉन, बहती नाक और सर्दी के लिए 3 मिली दिन में 3 बार 5 दिनों तक।", durationSec: 5.5, topic: 'meds' },
          { sentence: "तीसरा, सिरप लेवोलिन, खांसी और सांस की नली खोलने के लिए 3 मिली दिन में 3 बार 5 दिनों तक।", durationSec: 5.5, topic: 'meds' },
          { sentence: "चौथा, सिरप मेफ्टाल-पी केवल तेज़ बुखार होने पर खाने के साथ 3 मिली देने के लिए लिखा है।", durationSec: 6.0, topic: 'meds' },
          { sentence: "बच्ची को गुनगुना पानी पिलाएं और आराम करने दें।", durationSec: 3.5, topic: 'advice' }
        ]
      },
      ta: {
        language: 'ta',
        languageName: 'Tamil',
        simpleSummary: 'சி.எச்.சி நெம்மாரா குழந்தைகள் மருந்துச் சீட்டு (டாக்டர் நிதின் நாராயணன்). நோயாளி: அஷ்விகா (வயது 4 / பெண், எடை: 13.25 kg). பாதிப்பு: URTI (மேல் சுவாசப் பாதை தொற்று, RR: 22/min). 4 சிரப்கள்: கால்போல் 250 (4 mL Q6H x 3d), டெல்கான் (3 mL TDS x 5d), லெவோலின் (3 mL TDS x 5d), மெஃப்டால்-பி (3 mL SOS கடுமையான காய்ச்சலுக்கு மட்டும்). வெந்நீர் குடிக்கவும்.',
        explainLikeIm10: 'டாக்டர் நிதின் நாராயணன் 4 வயது அஷ்விகாவை பரிசோதித்து சளி மற்றும் தொண்டை தொற்று (URTI) என்று கண்டறிந்துள்ளார். காய்ச்சலுக்கு கால்போல், மூக்கொழுகலுக்கு டெல்கான், இருமலுக்கு லெவோலின், மிக அதிக காய்ச்சல் வந்தால் மட்டுமே கொடுக்க மெஃப்டால்-பி சிரப் பரிந்துரைக்கப்பட்டுள்ளது.',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['நோயாளி அஷ்விகாவுக்கு URTI சிகிச்சைக்காக 4 சிரப்கள் வழங்கப்பட்டுள்ளன.'],
        whatIsUnclear: ['அனைத்து விவரங்களும் தெளிவாக உள்ளன.'],
        whatToAskDoctor: ['காய்ச்சல் குறைந்தால் கால்போலை நிறுத்தலாமா?'],
        spokenScript: "வணக்கம்! நான் டாக்டர் பென் கார்ட்டர், உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். 4 வயது அஷ்விகாவின் குழந்தைகள் மருந்துச் சீட்டை ஆய்வு செய்தேன். குழந்தைக்கு URTI சளித் தொற்று உள்ளது. காய்ச்சலுக்கு கால்போல் 250, மூக்கொழுகலுக்கு டெல்கான், இருமலுக்கு லெவோலின், மற்றும் அதிக காய்ச்சலுக்கு மட்டும் மெஃப்டால்-பி சிரப் பரிந்துரைக்கப்பட்டுள்ளது. குழந்தைக்கு வெந்நீர் கொடுக்கவும்.",
        sentenceTimings: [
          { sentence: "வணக்கம்! நான் டாக்டர் பென் கார்ட்டர், உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர்.", durationSec: 4.5, topic: 'intro' },
          { sentence: "4 வயது அஷ்விகாவின் குழந்தைகள் மருந்துச் சீட்டை ஆய்வு செய்தேன். குழந்தைக்கு URTI தொற்று உள்ளது.", durationSec: 6.0, topic: 'diag' },
          { sentence: "கால்போல் 250, டெல்கான், லெவோலின், மற்றும் மெஃப்டால்-பி சிரப் பரிந்துரைக்கப்பட்டுள்ளது.", durationSec: 6.0, topic: 'meds' }
        ]
      },
      te: {
        language: 'te',
        languageName: 'Telugu',
        simpleSummary: 'సిహెచ్‌సి నెమ్మారా ప్రిస్క్రిప్షన్: రోగి: అశ్విక (4 సం., బరువు: 13.25 కేజీలు). నిర్ధారణ: URTI (ఎగువ శ్వాసకోశ ఇన్ఫెక్షన్). 4 సిరప్‌లు: కాల్పోల్ 250 (జ్వరం కోసం), డెల్కాన్ (జలుబు కోసం), లెవోలిన్ (దగ్గు కోసం), మెఫ్తాల్-పి (ఎక్కువ జ్వరం వచ్చినప్పుడు మాత్రమే). వేడి నీరు తాగించాలి.',
        explainLikeIm10: 'డాక్టర్ నితిన్ నారాయణన్ 4 ఏళ్ల అశ్వికను పరీక్షించి జలుబు, గొంతు ఇన్ఫెక్షన్ ఉందని తెలిపారు. జ్వరానికి కాల్పోల్, జలుబుకు డెల్కాన్, దగ్గుకు లెవోలిన్, తీవ్ర జ్వరానికి మెఫ్తాల్-పి ఇచ్చారు.',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['అశ్వికకు URTI కోసం 4 సిరప్‌లు సూచించబడ్డాయి.'],
        whatIsUnclear: ['అన్ని వివరాలు ధృవీకరించబడ్డాయి.'],
        whatToAskDoctor: ['జ్వరం తగ్గిన తర్వాత కాల్పోల్ ఆపవచ్చా?'],
        spokenScript: "నమస్కారం! నేను డాక్టర్ బెన్ కార్టర్. 4 ఏళ్ల అశ్విక ప్రిస్క్రిప్షన్ పరిశీలించాను. పాపకు URTI జలుబు ఇన్ఫెక్షన్ ఉంది. కాల్పోల్, డెల్కాన్, లెవోలిన్ మరియు ఎక్కువ జ్వరం వచ్చినప్పుడు మాత్రమే వేయడానికి మెఫ్తాల్-పి సిరప్‌లు ఇచ్చారు. పాపకు గోరువెచ్చని నీరు తాగించండి.",
        sentenceTimings: [
          { sentence: "నమస్కారం! నేను డాక్టర్ బెన్ కార్టర్. 4 ఏళ్ల అశ్విక ప్రిస్క్రిప్షన్ పరిశీలించాను.", durationSec: 4.5, topic: 'intro' },
          { sentence: "పాపకు URTI ఇన్ఫెక్షన్ కోసం కాల్పోల్, డెల్కాన్, లెవోలిన్ సిరప్‌లు రాశారు.", durationSec: 6.0, topic: 'meds' }
        ]
      },
      kn: {
        language: 'kn',
        languageName: 'Kannada',
        simpleSummary: 'ಸಿಹೆಚ್‌ಸಿ ನೆಮ್ಮಾರಾ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್: ರೋಗಿ: ಅಶ್ವಿಕಾ (4 ವರ್ಷ, ತೂಕ: 13.25 ಕೆಜಿ). ರೋಗನಿರ್ಣಯ: URTI (ಉಸಿರಾಟದ ಸೋಂಕು). 4 ಸಿರಪ್‌ಗಳು: ಕಾಲ್ಪೋಲ್ 250 (ಜ್ವರಕ್ಕೆ), ಡೆಲ್ಕಾನ್ (ನೆಗಡಿಗೆ), ಲೆವೋಲಿನ್ (ಕೆಮ್ಮಿಗೆ), ಮೆಫ್ತಾಲ್-ಪಿ (ತೀವ್ರ ಜ್ವರಕ್ಕೆ ಮಾತ್ರ). ಬಿಸಿ ನೀರು ಕುಡಿಸಿ.',
        explainLikeIm10: 'ಡಾ. ನಿತಿನ್ ನಾರಾಯಣನ್ 4 ವರ್ಷದ ಅಶ್ವಿಕಾರನ್ನು ಪರೀಕ್ಷಿಸಿ ಜ್ವರ ಮತ್ತು ನೆಗಡಿಗೆ ಔಷಧಿಗಳನ್ನು ನೀಡಿದ್ದಾರೆ.',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['ಅಶ್ವಿಕಾರಿಗೆ URTI ಚಿಕಿತ್ಸೆಗಾಗಿ 4 ಸಿರಪ್ ನೀಡಲಾಗಿದೆ.'],
        whatIsUnclear: ['ಎಲ್ಲಾ ಔಷಧ ವಿವರಗಳು ಸ್ಪಷ್ಟವಾಗಿವೆ.'],
        whatToAskDoctor: ['ಜ್ವರ ಕಡಿಮೆಯಾದರೆ ಕಾಲ್ಪೋಲ್ ನಿಲ್ಲಿಸಬಹುದೇ?'],
        spokenScript: "ನಮಸ್ಕಾರ! ನಾನು ಡಾ. ಬೆನ್ ಕಾರ್ಟರ್. 4 ವರ್ಷದ ಅಶ್ವಿಕಾರ ಮಕ್ಕಳ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. ಜ್ವರ, ನೆಗಡಿ ಮತ್ತು ಕೆಮ್ಮಿಗಾಗಿ 4 ಸಿರಪ್‌ಗಳನ್ನು ಸೂಚಿಸಲಾಗಿದೆ.",
        sentenceTimings: [
          { sentence: "ನಮಸ್ಕಾರ! ನಾನು ಡಾ. ಬೆನ್ ಕಾರ್ಟರ್. ಅಶ್ವಿಕಾರ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪರಿಶೀಲಿಸಿದ್ದೇನೆ.", durationSec: 4.0, topic: 'intro' },
          { sentence: "ಜ್ವರ ಮತ್ತು ನೆಗಡಿಗಾಗಿ ಕಾಲ್ಪೋಲ್, ಡೆಲ್ಕಾನ್, ಲೆವೋಲಿನ್ ಸಿರಪ್ ಸೂಚಿಸಲಾಗಿದೆ.", durationSec: 5.5, topic: 'meds' }
        ]
      },
      bn: {
        language: 'bn',
        languageName: 'Bengali',
        simpleSummary: 'সিএইচসি নেম্মারা পেডিয়াট্রিক প্রেসক্রিপশন: রোগী: অশ্বিকা (৪ বছর, ওজন: ১৩.২৫ কেজি)। রোগ নির্ণয়: URTI (সর্দি ও গলার সংক্রমণ)। ৪টি সিরাপ: কালপোল ২৫০, ডেলকন, লেভোলিন, মেফট্যাল-পি (কেবলমাত্র বেশি জ্বরের জন্য)। গরম জল পান করান।',
        explainLikeIm10: 'ডাক্তার অশ্বিকাকে পরীক্ষা করে সর্দির জন্য কালপোল, ডেলকন, লেভোলিন ও মেফট্যাল-পি সিরাপ দিয়েছেন।',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['অশ্বিকার জন্য ৪টি পেডিয়াট্রিক সিরাপ প্রেসক্রাইব করা হয়েছে।'],
        whatIsUnclear: ['সকল তথ্য স্পষ্টভাবে যাচাইকৃত।'],
        whatToAskDoctor: ['জ্বর কমলে কালপোল কি বন্ধ করব?'],
        spokenScript: "নমস্কার! আমি ডক্টর বেন কার্টার। ৪ বছর বয়সী অশ্বিকার প্রেসক্রিপশন পরীক্ষা করেছি। সর্দি ও কাশির জন্য ৪টি সিরাপ দেওয়া হয়েছে। শিশুকে হালকা গরম জল পান করান।",
        sentenceTimings: [
          { sentence: "নমস্কার! আমি ডক্টর বেন কার্টার। অশ্বিকার প্রেসক্রিপশন দেখেছি।", durationSec: 4.0, topic: 'intro' },
          { sentence: "কালপোল, ডেলকন, লেভোলিন ও মেফট্যাল-পি সিরাপ দেওয়া হয়েছে।", durationSec: 5.5, topic: 'meds' }
        ]
      },
      mr: {
        language: 'mr',
        languageName: 'Marathi',
        simpleSummary: 'सीएचसी नेम्मारा बालरोग प्रिस्क्रिप्शन: रुग्ण: अश्विक़ा (वय ४ वर्षे, वजन: १३.२५ किलो). निदान: URTI (सर्दी आणि श्वसन नलिकेचा संसर्ग). ४ सिरप: कालपोल २५०, डेलकॉन, लेवोलिन, मेफ्टाल-पी (फक्त जास्त ताप आल्यास खाण्यासोबत). कोमट पाणी द्या.',
        explainLikeIm10: 'डॉ. नितीन नारायणन यांनी ४ वर्षांच्या अश्विक़ासाठी तापासाठी कालपोल, सर्दीसाठी डेलकॉन, खोकल्यासाठी लेवोलिन आणि जास्त ताप आल्यास मेफ्टाल-पी दिले आहे.',
        whatWasWritten: enWhatWasWritten,
        whatMedicalTermsMean: termsMean,
        whatDocumentSaysHappened: ['अश्विक़ासाठी ४ बालरोग सिरप लिहून दिले आहेत.'],
        whatIsUnclear: ['सर्व नोंदी तपासल्या गेल्या आहेत.'],
        whatToAskDoctor: ['ताप कमी झाल्यावर कालपोल थांबवावे का?'],
        spokenScript: "नमस्कार! मी डॉ. बेन कार्टर. ४ वर्षांच्या अश्विक़ाचे बालरोग प्रिस्क्रिप्शन तपासले आहे. सर्दी आणि तापासाठी ४ सिरप लिहून दिले आहेत. बाळाला कोमट पाणी द्या.",
        sentenceTimings: [
          { sentence: "नमस्कार! मी डॉ. बेन कार्टर. अश्विक़ाचे प्रिस्क्रिप्शन तपासले आहे.", durationSec: 4.0, topic: 'intro' },
          { sentence: "तापासाठी कालपोल, सर्दीसाठी डेलकॉन आणि खोकल्यासाठी लेवोलिन सिरप दिले आहे.", durationSec: 5.5, topic: 'meds' }
        ]
      }
    },
    structuredMeds,
    diagnoses: ['URTI (Upper Respiratory Tract Infection)'],
    instructions: [
      'SYP CALPOL (250/5): 4 mL every 6 hours for 3 days for fever control.',
      'SYP DELCON: 3 mL three times daily for 5 days for runny nose and nasal congestion.',
      'SYP LEVOLIN: 3 mL three times daily for 5 days to open bronchial airways and ease cough.',
      'SYP MEFTAL-P (100/5): 3 mL SOS with food strictly for high fever spikes (കൂടിയ പനിക്ക്).',
      'Drink boiled/warm water (ചൂടുവെള്ളം കുടിക്കുക) and maintain frequent oral hydration.'
    ],
    labFindings: [
      'Patient Weight: 13.25 kg',
      'Patient Age / Gender: 4 yr / Female',
      'Respiratory Rate (RR): 22/min (Normal)',
      'Respiratory System (RS): Bilateral Air Entry Equal (BIL AEE)'
    ],
    symptoms: [
      'Fever, rhinorrhea (runny nose), sneezing, cough, and nasal congestion due to acute URTI'
    ],
    separatedContent: {
      documentSays: [
        { category: 'Diagnosis', field: 'Clinical Finding', value: 'URTI (Upper Respiratory Tract Infection)' },
        { category: 'Vital Sign', field: 'Respiratory Rate', value: 'RR - 22/min (Normal physiological rate)' },
        { category: 'Physical Examination', field: 'Chest Auscultation', value: 'RS - BIL AEE (Bilateral Air Entry Equal)' },
        { category: 'Patient Info', field: 'Demographics & Growth', value: 'ASHVIKA, 4 yr / Female, Weight: 13.25 kg' },
        { category: 'Prescribed Medicine 1', field: 'Antipyretic', value: 'SYP CALPOL (250/5) 4 mL Q6H x 3 d' },
        { category: 'Prescribed Medicine 2', field: 'Decongestant / Antihistamine', value: 'SYP DELCON 3 mL TDS x 5 d' },
        { category: 'Prescribed Medicine 3', field: 'Bronchodilator', value: 'SYP LEVOLIN 3 mL TDS x 5 d' },
        { category: 'Prescribed Medicine 4', field: 'Rescue Antipyretic', value: 'SYP MEFTAL-P (100/5) 3 mL SOS (കൂടിയ പനിക്ക്)' },
        { category: 'Doctor & Facility', field: 'Attending Paediatrician', value: 'Dr. Nithin Narayanan, MBBS, M.D. Paediatrics (JIPMER), CHC Nemmara' }
      ],
      termMeanings: [
        { term: 'URTI', meaning: 'Upper Respiratory Tract Infection of nasal and throat airways.', caution: 'Lungs are clear with equal air entry.' },
        { term: 'SYP CALPOL (250/5)', meaning: 'Paracetamol 250mg/5mL paediatric suspension (200 mg dose = 15.1 mg/kg for 13.25 kg).', caution: 'Do not exceed 4 doses per 24 hours.' },
        { term: 'SYP DELCON', meaning: 'Paediatric chlorpheniramine + phenylephrine cold and runny nose syrup.', caution: 'May cause mild sleepiness.' },
        { term: 'SYP LEVOLIN', meaning: 'Paediatric levosalbutamol 0.31mg/5mL bronchodilator for cough and airway relaxation.', caution: 'Give orally using measured dropper/cup.' },
        { term: 'SYP MEFTAL-P (കൂടിയ പനിക്ക്)', meaning: 'Mefenamic acid 100mg/5mL rescue suspension for high fever spikes only.', caution: 'Must be given with food or milk.' }
      ],
      notDetermined: [
        { topic: 'Prior Vaccination / Immunization Records', explanation: 'Complete childhood vaccine history is not documented on this consultation slip.' },
        { topic: 'Family History of Asthma or Atopy', explanation: 'No family allergy or asthma background is noted on this prescription.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'MedScript Clinical Paediatric Verification Engine',
      hasNumericalConfidence: true,
      averageConfidenceScore: 99,
      providerNotice: 'Optical stroke verification and paediatric pharmacopoeia matching completed with 99% confidence.'
    },
    serviceConfigured: true,
    get explanation(): DocumentExplanation {
      return (this.translations[this.selectedLanguage] || this.translations.en)!;
    }
  };
}

// Full array of demo documents
export const DEMO_DOCUMENTS: ProcessedDocument[] = [
  // Document 0: Ashvika Paediatric Prescription (Dr. Nithin Narayanan, CHC Nemmara)
  createAshvikaPediatricDocument(),

  // Document 1: Prabha Hospital COVID-19 Requisition Slip (Patient: Ashok Kumar Agrawal)
  createPrabhaCovidDocument(),

  // Document 1: Cardiology Prescription (Rajesh Sharma)
  {
    id: 'demo-doc-1',
    name: 'Cardiology_Prescription_DrMehta.pdf',
    type: 'prescription',
    imageDataUrl: createPrescription1Svg(),
    uploadedAt: new Date(Date.now() - 3600000).toISOString(),
    fileSize: 428000,
    isDemo: true,
    quality: {
      status: 'pass',
      overallScore: 94,
      blurScore: 96,
      darknessScore: 92,
      glareScore: 95,
      resolutionScore: 98,
      rotationAngle: 0.2,
      handwritingVisibilityScore: 90,
      issues: [],
      suggestions: [
        'Document lighting and resolution are well within clinical OCR requirements.',
        'High contrast between blue ink and prescription paper.'
      ]
    },
    tokens: [
      { id: 'tok-1', text: 'Patient: Rajesh Sharma (52 Yrs / Male)', confidence: 99, bbox: { x: 8, y: 20, width: 40, height: 4 }, category: 'patient_info', isUncertain: false },
      { id: 'tok-2', text: 'BP: 138/88 mmHg | Wt: 74 kg', confidence: 97, bbox: { x: 55, y: 23, width: 35, height: 4 }, category: 'patient_info', isUncertain: false },
      { id: 'tok-3', text: 'Type 2 Diabetes Mellitus & Essential Hypertension', confidence: 96, bbox: { x: 8, y: 32, width: 75, height: 4 }, category: 'diagnosis', isUncertain: false, medicalMeaning: 'Chronic conditions where the body cannot process blood sugar efficiently, and high blood pressure in arteries.' },
      { id: 'tok-4', text: 'Recent HbA1c: 7.2%', confidence: 95, bbox: { x: 8, y: 36, width: 45, height: 4 }, category: 'lab_value', isUncertain: false, medicalMeaning: 'Average blood sugar level over the past 2 to 3 months. Normal is below 5.7%, while 7.2% indicates elevated blood sugar.' },
      { id: 'tok-5', text: 'Tab. Metformin 500 mg — 1 tab PO BD (after meals)', confidence: 96, bbox: { x: 8, y: 47, width: 75, height: 4 }, category: 'medication', isUncertain: false, medicalMeaning: 'An oral medication to help lower glucose production by the liver and improve insulin sensitivity.' },
      { id: 'tok-6', text: 'Tab. Telmisartan 40 mg — 1 tab PO OD (morning)', confidence: 95, bbox: { x: 8, y: 52, width: 75, height: 4 }, category: 'medication', isUncertain: false, medicalMeaning: 'An angiotensin receptor blocker (ARB) medicine that helps relax blood vessels to reduce high blood pressure.' },
      { id: 'tok-7', text: 'Tab. Atorvastatin 20 mg — 1 tab PO HS (at bedtime)', confidence: 94, bbox: { x: 8, y: 58, width: 75, height: 4 }, category: 'medication', isUncertain: false, medicalMeaning: 'A statin medication prescribed to reduce LDL (bad) cholesterol and protect blood vessels against plaque build-up.' },
      { id: 'tok-8', text: 'Leukopenia', confidence: 62, bbox: { x: 45, y: 64, width: 22, height: 4 }, category: 'diagnosis', isUncertain: true, alternatives: ['Leukopenia', 'Leukemia', 'Leukoplakia'], sourceCropUrl: createLeukopeniaCropSvg(), medicalMeaning: 'A reduction in the number of white blood cells (leukocytes) in the blood, which can temporarily reduce resistance to infections.' },
      { id: 'tok-9', text: 'Recheck Complete Blood Count & Fasting Sugars in 2 weeks', confidence: 92, bbox: { x: 8, y: 69, width: 85, height: 4 }, category: 'instruction', isUncertain: false }
    ],
    uncertainWords: [
      {
        id: 'unc-1',
        tokenId: 'tok-8',
        extractedText: 'Leukopenia',
        confidence: 62,
        alternatives: ['Leukopenia', 'Leukemia', 'Leukoplakia'],
        isResolved: false,
        sourceCropUrl: createLeukopeniaCropSvg(),
        sentenceContext: 'Routine CBC showed mild [Leukopenia / Leukemia / Leukoplakia] (mild WBC drop).',
        question: 'What did the doctor write regarding the CBC follow-up?'
      }
    ],
    allUncertainResolved: false,
    selectedLanguage: 'en',
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        { id: 'chk-1', name: 'Hallucination Prevention', passed: true, details: 'Strictly grounded in extracted text tokens only.' },
        { id: 'chk-2', name: 'Dosage Cross-Validation', passed: true, details: 'Metformin 500mg, Telmisartan 40mg, Atorvastatin 20mg verified.' },
        { id: 'chk-3', name: 'Uncertainty Isolation', passed: true, details: 'Word "Leukopenia" (62% confidence) isolated until user confirms.' },
        { id: 'chk-4', name: 'Non-Diagnostic Boundary', passed: true, details: 'Explanatory role preserved; no speculative diagnoses generated.' }
      ]
    },
    translations: {
      en: {
        language: 'en',
        languageName: 'English',
        simpleSummary: 'This is a prescription from Dr. Suresh K. Mehta for Rajesh Sharma managing blood sugar and blood pressure with 3 daily medications.',
        explainLikeIm10: "Think of your body like a busy city. Your blood sugar is like traffic that got a little too heavy (7.2 HbA1c). Metformin helps clear the traffic jam, Telmisartan keeps your blood vessels smooth and calm so blood flows easily, and Atorvastatin cleans the road so grease doesn't stick. The doctor also asked for a blood test check in two weeks to count your white blood cell defense team.",
        whatWasWritten: [
          'Diagnosis: Type 2 Diabetes Mellitus and Essential Hypertension.',
          'Recent Lab Value: HbA1c is 7.2% (average blood glucose over the last 3 months).',
          'Medication 1: Metformin 500mg — Take 1 tablet by mouth twice a day after meals.',
          'Medication 2: Telmisartan 40mg — Take 1 tablet by mouth once daily every morning.',
          'Medication 3: Atorvastatin 20mg — Take 1 tablet by mouth once daily at bedtime.',
          'Follow-up: Repeat Complete Blood Count (CBC) and fasting blood glucose in 2 weeks.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'A 3-month average of blood sugar levels. A healthy non-diabetic level is below 5.7%. 7.2% means blood sugar has been moderately elevated.',
            documentContext: 'Recent HbA1c: 7.2% (suboptimal glycemic control)',
            whatItDoesNotMean: 'It does not mean acute organ failure or that insulin injections are immediately required.',
            category: 'lab_value'
          },
          {
            id: 'term-2',
            term: 'Metformin (500mg)',
            simpleMeaning: 'A foundational diabetes tablet that helps your liver produce less sugar and helps your muscles absorb sugar better.',
            documentContext: 'Tab. Metformin 500 mg — 1 tab PO BD (after meals)',
            whatItDoesNotMean: 'It is not an insulin injection and does not immediately cause severe low blood sugar by itself.',
            category: 'medication'
          },
          {
            id: 'term-3',
            term: 'Telmisartan (40mg)',
            simpleMeaning: 'A blood pressure medicine that relaxes blood vessels so blood flows more gently without straining your heart.',
            documentContext: 'Tab. Telmisartan 40 mg — 1 tab PO OD (morning)',
            whatItDoesNotMean: 'It is not a water pill (diuretic) and should not be stopped suddenly without doctor approval.',
            category: 'medication'
          },
          {
            id: 'term-4',
            term: 'Atorvastatin (20mg)',
            simpleMeaning: 'A cholesterol tablet that lowers bad LDL cholesterol to prevent artery blockages.',
            documentContext: 'Tab. Atorvastatin 20 mg — 1 tab PO HS (at bedtime)',
            whatItDoesNotMean: 'It is not a painkiller or a blood thinner.',
            category: 'medication'
          },
          {
            id: 'term-5',
            term: 'Leukopenia (Uncertain / 62% confidence)',
            simpleMeaning: 'A lower count of infection-fighting white blood cells in your blood.',
            documentContext: 'Routine CBC showed mild Leukopenia (mild WBC drop).',
            whatItDoesNotMean: 'This term does NOT mean leukemia or blood cancer. It is often mild and temporary following viral illness or medication.',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'The patient had a routine checkup showing blood pressure of 138/88 mmHg and weight of 74 kg.',
          'HbA1c test recorded 7.2%, prompting the physician to adjust or continue glycemic medication.',
          'The doctor prescribed three daily oral medications for metabolic and cardiovascular support.',
          'A follow-up test was requested in two weeks to re-evaluate blood counts and sugar levels.'
        ],
        whatIsUnclear: [
          'Handwriting on Line 4 has 62% confidence between "Leukopenia" and "Leukemia". The doctor added "(mild WBC drop)" which strongly supports Leukopenia, but user verification is required.',
          'Dietary sodium limit was noted generally ("maintain low sodium") without specific milligram targets.'
        ],
        whatToAskDoctor: [
          'Should I take Metformin immediately with my meal or 30 minutes afterward to minimize stomach sensitivity?',
          'What was my exact white blood cell count that prompted the follow-up CBC in 2 weeks?',
          'Do I need to check my blood sugar at home with a glucometer before our next visit?',
          'Are there any specific dietary adjustments to help bring my HbA1c from 7.2% closer to under 6.5%?'
        ],
        spokenScript: "Hello, I am your MedScript AI Virtual Medical Explainer. I have reviewed your document from Dr. Suresh K. Mehta and verified the clear text. You were prescribed three medications: Metformin 500 milligrams twice daily after meals to help control your blood sugar, Telmisartan 40 milligrams once every morning for your blood pressure, and Atorvastatin 20 milligrams at bedtime for cholesterol protection. Your recent HbA1c level was recorded at 7.2 percent. Dr. Mehta also requested a follow-up Complete Blood Count test in two weeks. Note that the word regarding your white blood cells showed handwriting uncertainty between Leukopenia and Leukemia. The note clarifies a mild decrease in white blood cells and does not establish a diagnosis of cancer. Please verify what your doctor wrote or confirm with your clinic.",
        sentenceTimings: [
          { sentence: "Hello, I am your MedScript AI Virtual Medical Explainer.", durationSec: 3.5, topic: 'intro' },
          { sentence: "I have reviewed your document from Dr. Suresh K. Mehta and verified the clear text.", durationSec: 4.2, topic: 'review' },
          { sentence: "You were prescribed three medications: Metformin 500 milligrams twice daily after meals to help control your blood sugar,", durationSec: 5.5, topic: 'metformin' },
          { sentence: "Telmisartan 40 milligrams once every morning for your blood pressure,", durationSec: 4.0, topic: 'telmisartan' },
          { sentence: "and Atorvastatin 20 milligrams at bedtime for cholesterol protection.", durationSec: 4.2, topic: 'atorvastatin' },
          { sentence: "Your recent HbA1c level was recorded at 7.2 percent.", durationSec: 3.8, topic: 'hba1c' },
          { sentence: "Dr. Mehta also requested a follow-up Complete Blood Count test in two weeks.", durationSec: 4.5, topic: 'followup' },
          { sentence: "Note that the word regarding your white blood cells showed handwriting uncertainty between Leukopenia and Leukemia.", durationSec: 5.8, topic: 'uncertainty' },
          { sentence: "The note clarifies a mild decrease in white blood cells and does not establish a diagnosis of cancer.", durationSec: 5.2, topic: 'clarification' },
          { sentence: "Please verify what your doctor wrote or confirm with your clinic.", durationSec: 3.8, topic: 'cta' }
        ]
      },
      te: {
        language: 'te',
        languageName: 'Telugu',
        simpleSummary: 'ఇది డాక్టర్ సురేష్ కె. మెహతా గారు రాజేష్ శర్మ గారి కోసం ఇచ్చిన ప్రిస్క్రిప్షన్. ఇందులో రక్తంలో చక్కెర (HbA1c 7.2%) మరియు రక్తపోటు (138/88) నియంత్రణ కోసం 3 మందులు ఉన్నాయి.',
        explainLikeIm10: "మీ శరీరాన్ని ఒక చక్కటి ఇల్లుగా భావించండి. రక్తంలో చక్కెర పరిమాణం కొద్దిగా పెరిగింది (HbA1c 7.2%). మెట్‌ఫార్మిన్ ఆ చక్కెరను తగ్గించడంలో సహాయపడుతుంది, టెల్మిసార్టన్ మీ రక్తనాళాలను విశ్రాంతిగా ఉంచి రక్తపోటును తగ్గిస్తుంది, మరియు అటోర్వాస్టాటిన్ కొలెస్ట్రాల్ చేరకుండా కాపాడుతుంది. ల్యూకోపీనియా అంటే తెల్ల రక్త కణాలు కొద్దిగా తగ్గడం మాత్రమే; ఇది క్యాన్సర్ లేదా లుకేమియా కాదు!",
        whatWasWritten: [
          'వ్యాధి నిర్ధారణ: టైప్ 2 డయాబెటిస్ మరియు హైపర్‌టెన్షన్ (Type 2 Diabetes & Hypertension).',
          'ల్యాబ్ విలువలు: HbA1c 7.2%, రక్తపోటు 138/88 mmHg.',
          'మందు 1: Tab. Metformin 500 mg — భోజనం తర్వాత రోజుకు 2 సార్లు (షుగర్ నియంత్రణకు).',
          'మందు 2: Tab. Telmisartan 40 mg — ఉదయం ఒకసారి (రక్తపోటు నియంత్రణకు).',
          'మందు 3: Tab. Atorvastatin 20 mg — రాత్రి పడుకునే ముందు (కొలెస్ట్రాల్ మరియు గుండె రక్షణకు).',
          'తదుపరి తనిఖీ: 2 వారాలలో మళ్ళీ సీబీసీ (CBC) రక్త పరీక్ష చేయించాలి.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-te-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'గత 3 నెలల సగటు రక్తంలో చక్కెర స్థాయి.',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'దీని అర్థం వెంటనే ఇన్సులిన్ ఇంజెక్షన్లు అవసరమని కాదు.',
            category: 'lab_value'
          },
          {
            id: 'term-te-2',
            term: 'Leukopenia (ల్యూకోపీనియా)',
            simpleMeaning: 'రక్తంలో తెల్ల రక్త కణాల సంఖ్య తాత్కాలికంగా కొద్దిగా తగ్గడం.',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'ఇది ఎట్టి పరిస్థితుల్లోనూ లుకేమియా లేదా రక్త క్యాన్సర్ కాదు.',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'రోగి బీపీ 138/88 mmHg గా నమోదైంది.',
          'షుగర్ 7.2% ఉన్నందున మూడు రకాల రోజువారీ మాత్రలు సూచించబడ్డాయి.',
          'తెల్ల రక్త కణాలను పరిశీలించడానికి 2 వారాల్లో మళ్ళీ రక్త పరీక్ష ఆదేశించబడింది.'
        ],
        whatIsUnclear: [
          'చేతిరాతలో "ల్యూకోపీనియా" లేదా "లుకేమియా" అన్న పదంపై అనిశ్చితి ఉంది. కానీ ఇది కేవలం తెల్ల రక్త కణాల తాత్కాలిక తగ్గుదల మాత్రమే.'
        ],
        whatToAskDoctor: [
          'మెట్‌ఫార్మిన్ మాత్రను భోజనం చేసిన వెంటనే వేసుకోవాలా?',
          '2 వారాల తర్వాత చేయించే సీబీసీ పరీక్షకు ఖాళీ కడుపుతో వెళ్ళాలా?'
        ],
        spokenScript: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని. డాక్టర్ సురేష్ మేహతా గారు రాజేష్ శర్మ గారికి ఇచ్చిన ప్రిస్క్రిప్షన్‌ను నేను సమగ్రంగా విశ్లేషించాను. డాక్టర్ రిపోర్టు ఏమి చెబుతోందంటే, మీ రక్తంలో చక్కెర స్థాయి (HbA1c 7.2%) మరియు రక్తపోటు 138/88 గా ఉంది. దీనికోసం మీరు వేసుకోవలసిన మాత్రలు: మొదటిది, రక్తంలో చక్కెరను నియంత్రించడానికి మెట్‌ఫార్మిన్ 500 మి.గ్రా మాత్ర భోజనం తర్వాత రోజుకు రెండుసార్లు వేసుకోవాలి. రెండవది, రక్తపోటు నియంత్రణ కోసం టెల్మిసార్టన్ 40 మి.గ్రా మాత్ర రోజూ ఉదయం ఒకసారి వేసుకోవాలి. మూడవది, కొలెస్ట్రాల్‌ను తగ్గించి గుండెను రక్షించడానికి అటోర్వాస్టాటిన్ 20 మి.గ్రా మాత్ర రాత్రి పడుకునే ముందు వేసుకోవాలి. అత్యంత ముఖ్యమైన విషయం, రిపోర్టులో ల్యూకోపీనియా అని రాయబడింది; ఇది తెల్ల రక్త కణాలు స్వల్పంగా తగ్గాయని మాత్రమే తెలియజేస్తుంది, ఇది ఎట్టి పరిస్థితుల్లోనూ లుకేమియా లేదా క్యాన్సర్ రకం కాదు! భయపడాల్సిన అవసరం లేదు. తెల్ల రక్త కణాల రికవరీని చూసేందుకు రెండు వారాల్లో మళ్ళీ సీబీసీ రక్త పరీక్ష చేయించుకోవాలని డాక్టర్ సూచించారు.",
        spokenScriptPhonetic: "Namaskaram! Nenu mee MedScript AI vaidya sahaayakudini. Doctor Suresh Mehta gaaru Rajesh Sharma gaariki ichina prescription nu nenu samagramgaa vishleshinchanu. Doctor report emi chebuthondante, mee rakthamlo chakkera sthaayi HbA1c 7.2% mariyu raktapotu 138/88 gaa undi. Meeru vesukovalasina tablets: Modatidi, rakthamlo chakkera tagginchadaniki Metformin 500 milligram tablet bhojanam tharuvatha roojuku rendu saarlu vesukovaali. Rendavadi, raktapotu niyanatrana kosam Telmisartan 40 milligram tablet roojoo udayam okasaari vesukovaali. Moodavadi, cholesterol tagginchi gundenu rakshinchadaniki Atorvastatin 20 milligram tablet raathri padukune mundu vesukovaali. Mukhyamgaa report lo Leukopenia ani undi; idi thella raktha kanaalu swalpamgaa thaggaayani maatrame theliyajestondi, idi cancer leda leukemia kaadu! Bayapadalsina pani ledu. Rendu vaarala tharuvatha malli raktha pareeksha CBC cheyinchi doctor gaarini sampradinchandi.",
        sentenceTimings: [
          { sentence: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని. డాక్టర్ సురేష్ మేహతా గారు రాజేష్ శర్మ గారికి ఇచ్చిన ప్రిస్క్రిప్షన్‌ను నేను సమగ్రంగా విశ్లేషించాను.", phoneticSentence: "Namaskaram! Nenu mee MedScript AI vaidya sahaayakudini. Doctor Suresh Mehta gaaru Rajesh Sharma gaariki ichina prescription nu nenu samagramgaa vishleshinchanu.", durationSec: 5.5, topic: 'intro' },
          { sentence: "డాక్టర్ రిపోర్టు ఏమి చెబుతోందంటే, మీ రక్తంలో చక్కెర స్థాయి (HbA1c 7.2%) మరియు రక్తపోటు 138/88 గా ఉంది.", phoneticSentence: "Doctor report emi chebuthondante, mee rakthamlo chakkera sthaayi HbA1c 7.2% mariyu raktapotu 138/88 gaa undi.", durationSec: 5.5, topic: 'findings' },
          { sentence: "మీరు వేసుకోవలసిన మాత్రలు: మొదటిది, రక్తంలో చక్కెరను తగ్గించడానికి మెట్‌ఫార్మిన్ 500 మి.గ్రా మాత్ర భోజనం తర్వాత రోజుకు రెండుసార్లు వేసుకోవాలి.", phoneticSentence: "Meeru vesukovalasina tablets: Modatidi, rakthamlo chakkera tagginchadaniki Metformin 500 milligram tablet bhojanam tharuvatha roojuku rendu saarlu vesukovaali.", durationSec: 6.5, topic: 'metformin' },
          { sentence: "రెండవది, రక్తపోటు నియంత్రణ కోసం టెల్మిసార్టన్ 40 మి.గ్రా మాత్ర రోజూ ఉదయం ఒకసారి వేసుకోవాలి.", phoneticSentence: "Rendavadi, raktapotu niyanatrana kosam Telmisartan 40 milligram tablet roojoo udayam okasaari vesukovaali.", durationSec: 5.0, topic: 'telmisartan' },
          { sentence: "మూడవది, కొలెస్ట్రాల్‌ను తగ్గించి గుండెను రక్షించడానికి అటోర్వాస్టాటిన్ 20 మి.గ్రా మాత్ర రాత్రి పడుకునే ముందు వేసుకోవాలి.", phoneticSentence: "Moodavadi, cholesterol tagginchi gundenu rakshinchadaniki Atorvastatin 20 milligram tablet raathri padukune mundu vesukovaali.", durationSec: 5.5, topic: 'atorvastatin' },
          { sentence: "ముఖ్యంగా రిపోర్టులో ల్యూకోపీనియా అని ఉంది; ఇది తెల్ల రక్త కణాలు స్వల్పంగా తగ్గాయని మాత్రమే తెలియజేస్తుంది, ఇది క్యాన్సర్ లేదా లుకేమియా కాదు!", phoneticSentence: "Mukhyamgaa report lo Leukopenia ani undi; idi thella raktha kanaalu swalpamgaa thaggaayani maatrame theliyajestondi, idi cancer leda leukemia kaadu!", durationSec: 6.5, topic: 'clarification' },
          { sentence: "రెండు వారాల తర్వాత మళ్ళీ రక్త పరీక్ష (CBC) చేయించి డాక్టర్ గారిని సంప్రదించండి.", phoneticSentence: "Rendu vaarala tharuvatha malli raktha pareeksha CBC cheyinchi doctor gaarini sampradinchandi.", durationSec: 4.5, topic: 'followup' }
        ]
      },
      hi: {
        language: 'hi',
        languageName: 'Hindi',
        simpleSummary: 'यह डॉ. सुरेश के. मेहता द्वारा राजेश शर्मा के लिए लिखा गया पर्चा है जिसमें ब्लड शुगर (HbA1c 7.2%) और बीपी (138/88) नियंत्रण के लिए 3 दैनिक दवाएं दी गई हैं।',
        explainLikeIm10: "अपने शरीर को एक कार की तरह समझें। कार में पेट्रोल की मात्रा (शुगर 7.2%) थोड़ी बढ़ गई है। मेटफॉर्मिन शुगर को सामान्य करने में मदद करती है, टेल्मीसार्टन नसों के दबाव (बीपी) को शांत रखती है, और एटोरवास्टेटिन नसों में जमी चिकनाई को साफ करती है। ल्यूकोपेनिया केवल सफेद रक्त कोशिकाओं में हल्की अस्थाई कमी है; यह कोई कैंसर या ल्यूकेमिया नहीं है!",
        whatWasWritten: [
          'निदान: टाइप 2 डायबिटीज और एसेंशियल हाइपरटेंशन (Type 2 Diabetes & Hypertension)।',
          'जांच रिपोर्ट: हालिया HbA1c 7.2%, रक्तचाप 138/88 mmHg.',
          'दवा 1: Tab. Metformin 500 mg — भोजन के बाद दिन में दो बार (ब्लड शुगर नियंत्रण)।',
          'दवा 2: Tab. Telmisartan 40 mg — रोज सुबह एक बार (ब्लड प्रेशर नियंत्रण)।',
          'दवा 3: Tab. Atorvastatin 20 mg — रात को सोते समय (कोलेस्ट्रॉल और हृदय सुरक्षा)।',
          'फॉलो-अप: 2 सप्ताह में दोबारा सीबीसी (CBC) रक्त जांच कराएं।'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-hi-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'पिछले 3 महीनों के औसत ब्लड शुगर का स्तर।',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'इसका मतलब तत्काल इंसुलिन की आवश्यकता नहीं है।',
            category: 'lab_value'
          },
          {
            id: 'term-hi-2',
            term: 'Leukopenia (ल्यूकोपेनिया)',
            simpleMeaning: 'सफेद रक्त कोशिकाओं में हल्की अस्थाई कमी।',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'यह किसी भी प्रकार का कैंसर या ल्यूकेमिया नहीं है।',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'रक्तचाप 138/88 mmHg दर्ज किया गया।',
          'शुगर और बीपी के लिए तीन दैनिक दवाएं निर्धारित की गई हैं।',
          'सफेद रक्त कोशिकाओं की स्थिति देखने के लिए 2 सप्ताह बाद दोबारा रक्त जांच कराने को कहा गया है।'
        ],
        whatIsUnclear: [
          'चौथी पंक्ति में ल्यूकोपेनिया और ल्यूकेमिया के बीच संशय था, लेकिन यह केवल सफेद रक्त कोशिकाओं की हल्की कमी है।'
        ],
        whatToAskDoctor: [
          'क्या मेटफॉर्मिन को भोजन के तुरंत बाद लेना चाहिए?',
          'दो सप्ताह बाद वाली सीबीसी जांच के लिए क्या खाली पेट रहना होगा?'
        ],
        spokenScript: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई वर्चुअल मेडिकल एक्सप्लेनर हूँ। डॉ. सुरेश के. मेहता द्वारा राजेश शर्मा के लिए लिखे गए पर्चे की मैंने पूरी जांच कर ली है। डॉक्टर की रिपोर्ट बताती है कि आपका ब्लड शुगर स्तर (HbA1c 7.2%) और ब्लड प्रेशर 138/88 थोड़ा बढ़ा हुआ है। इसके लिए आपको जो दवाएं लेनी हैं: पहली, ब्लड शुगर नियंत्रित करने के लिए मेटफॉर्मिन 500 मिलीग्राम भोजन के बाद दिन में दो बार। दूसरी, ब्लड प्रेशर के लिए टेल्मीसार्टन 40 मिलीग्राम रोज सुबह एक बार। तीसरी, कोलेस्ट्रॉल घटाने और दिल की सुरक्षा के लिए एटोरवास्टेटिन 20 मिलीग्राम रात को सोते समय। सबसे महत्वपूर्ण बात, पर्चे में ल्यूकोपेनिया लिखा है; इसका अर्थ केवल सफेद रक्त कोशिकाओं में हल्की अस्थाई कमी है, यह किसी भी प्रकार का कैंसर या ल्यूकेमिया नहीं है! बिल्कुल घबराएं नहीं। डॉक्टर ने दो सप्ताह बाद दोबारा सीबीसी ब्लड टेस्ट कराने की सलाह दी है।",
        spokenScriptPhonetic: "Namaste! Main aapka MedScript AI virtual medical explainer hoon. Doctor Suresh Mehta ke parche ki maine poori jaanch kar li hai. Doctor ki report batati hai ki aapka blood sugar level HbA1c 7.2% aur blood pressure 138/88 thoda badha hua hai. Dawaiyan jo aapko leni hain: Pehli, sugar niyantran ke liye Metformin 500 milligram bhojan ke baad din mein do baar. Doosri, blood pressure ke liye Telmisartan 40 milligram roz subah ek baar. Teesri, cholesterol kam karne ke liye Atorvastatin 20 milligram raat ko sote samay. Sabse mahatvapoorna, report mein Leukopenia likha hai, jo safed rakt koshikaon ki halki kami hai; yeh koi cancer ya leukemia nahi hai! Ghabrayein nahi. Do saptah baad dobara CBC blood test karayein aur apne doctor se paramarsh lein.",
        sentenceTimings: [
          { sentence: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई वर्चुअल मेडिकल एक्सप्लेनर हूँ। डॉ. सुरेश के. मेहता के पर्चे की मैंने पूरी जांच कर ली है।", phoneticSentence: "Namaste! Main aapka MedScript AI virtual medical explainer hoon. Doctor Suresh Mehta ke parche ki maine poori jaanch kar li hai.", durationSec: 5.0, topic: 'intro' },
          { sentence: "डॉक्टर की रिपोर्ट बताती है कि आपका ब्लड शुगर स्तर (HbA1c 7.2%) और ब्लड प्रेशर 138/88 थोड़ा बढ़ा हुआ है।", phoneticSentence: "Doctor ki report batati hai ki aapka blood sugar level HbA1c 7.2% aur blood pressure 138/88 thoda badha hua hai.", durationSec: 5.5, topic: 'findings' },
          { sentence: "दवाएं जो आपको लेनी हैं: पहली, शुगर नियंत्रण के लिए मेटफॉर्मिन 500 मिलीग्राम भोजन के बाद दिन में दो बार।", phoneticSentence: "Dawaiyan jo aapko leni hain: Pehli, sugar niyantran ke liye Metformin 500 milligram bhojan ke baad din mein do baar.", durationSec: 6.0, topic: 'metformin' },
          { sentence: "दूसरी, ब्लड प्रेशर के लिए टेल्मीसार्टन 40 मिलीग्राम रोज सुबह एक बार।", phoneticSentence: "Doosri, blood pressure ke liye Telmisartan 40 milligram roz subah ek baar.", durationSec: 4.5, topic: 'telmisartan' },
          { sentence: "तीसरी, कोलेस्ट्रॉल कम करने के लिए एटोरवास्टेटिन 20 मिलीग्राम रात को सोते समय।", phoneticSentence: "Teesri, cholesterol kam karne ke liye Atorvastatin 20 milligram raat ko sote samay.", durationSec: 5.0, topic: 'atorvastatin' },
          { sentence: "सबसे महत्वपूर्ण, रिपोर्ट में ल्यूकोपेनिया लिखा है, जो सफेद रक्त कोशिकाओं की हल्की कमी है; यह कोई कैंसर या ल्यूकेमिया नहीं है!", phoneticSentence: "Sabse mahatvapoorna, report mein Leukopenia likha hai, jo safed rakt koshikaon ki halki kami hai; yeh koi cancer ya leukemia nahi hai!", durationSec: 6.5, topic: 'clarification' },
          { sentence: "दो सप्ताह बाद दोबारा सीबीसी ब्लड टेस्ट कराएं और अपने डॉक्टर से परामर्श लें।", phoneticSentence: "Do saptah baad dobara CBC blood test karayein aur apne doctor se paramarsh lein.", durationSec: 4.5, topic: 'followup' }
        ]
      },
      ta: {
        language: 'ta',
        languageName: 'Tamil',
        simpleSummary: 'டாக்டர் சுரேஷ் கே. மேத்தா அவர்கள் ராஜேஷ் சர்மாவுக்கு வழங்கிய இதய மற்றும் நீரிழிவு மருத்துவ மருந்துச் சீட்டு. இதில் ரத்த சர்க்கரை (HbA1c 7.2%), ரத்த அழுத்தம் (138/88) மற்றும் கொழுப்பைக் கட்டுப்படுத்த 3 மாத்திரைகள் பரிந்துரைக்கப்பட்டுள்ளன.',
        explainLikeIm10: "உங்கள் உடலை ஒரு அழகான வீடாகக் கருதுங்கள். அந்த வீட்டில் சர்க்கரை அளவு (7.2%) சற்று அதிகமாக உள்ளது. அதைச் சரிசெய்ய மெட்ஃபோர்மின் மாத்திரை உதவுகிறது. ரத்த அழுத்தத்தைக் கட்டுக்குள் வைக்க டெல்மிசார்டன் மாத்திரையும், ரத்தக் குழாய்களில் கொழுப்பு படியாமல் இதயத்தைப் பாதுகாக்க அடோர்வாஸ்டாடின் மாத்திரையும் கொடுக்கப்பட்டுள்ளன. லுகோபீனியா என்பது ரத்த வெள்ளையணுக்கள் லேசாக குறைந்துள்ளது மட்டுமே; இது புற்றுநோய் அல்லது லுகேமியா கிடையாது!",
        whatWasWritten: [
          'நோய் கண்டறிதல்: வகை 2 நீரிழிவு நோய் மற்றும் ரத்தக் கொதிப்பு (Type 2 Diabetes Mellitus & Essential Hypertension).',
          'சமீபத்திய ஆய்வக முடிவு: HbA1c ரத்த சர்க்கரை அளவு 7.2%, ரத்த அழுத்தம் 138/88 mmHg.',
          'மாத்திரை 1: Tab. Metformin 500 mg — உணவுக்குப் பின் தினமும் இருவேளை (காலை, இரவு).',
          'மாத்திரை 2: Tab. Telmisartan 40 mg — தினமும் காலையில் ஒருமுறை (ரத்த அழுத்தத்திற்கு).',
          'மாத்திரை 3: Tab. Atorvastatin 20 mg — இரவு தூங்குவதற்கு முன் ஒருமுறை (கொலஸ்ட்ராலுக்கு).',
          'மறுபரிசோதனை: 2 வாரங்களுக்குப் பிறகு மீண்டும் சிபிசி (CBC) முழு ரத்தப் பரிசோதனை.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-ta-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'கடந்த 3 மாதங்களில் உங்கள் ரத்தத்தில் இருந்த சராசரி சர்க்கரை அளவு.',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'உடனடியாக இன்சுலின் ஊசி போட வேண்டும் என்று இதற்கு அர்த்தமல்ல.',
            category: 'lab_value'
          },
          {
            id: 'term-ta-2',
            term: 'Leukopenia (லுகோபீனியா)',
            simpleMeaning: 'ரத்தத்தில் உள்ள வெள்ளையணுக்களின் எண்ணிக்கை தற்காலிகமாக லேசாகக் குறைதல்.',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'இது லுகேமியா அல்லது ரத்தப் புற்றுநோய் (cancer) வகை கிடையாது!',
            category: 'diagnosis'
          },
          {
            id: 'term-ta-3',
            term: 'Metformin (மெட்ஃபோர்மின் 500 மிகி)',
            simpleMeaning: 'ரத்தத்தில் சர்க்கரை அளவைக் கட்டுப்படுத்தும் பாதுகாப்பான முதல் நிலை மருந்து.',
            documentContext: 'Tab. Metformin 500mg BD after meals',
            whatItDoesNotMean: 'இது கணையத்தை சேதப்படுத்தாது; உணவுடன் எடுப்பது சிறந்தது.',
            category: 'medication'
          },
          {
            id: 'term-ta-4',
            term: 'Telmisartan (டெல்மிசார்டன் 40 மிகி)',
            simpleMeaning: 'ரத்தக் குழாய்களைத் தளர்த்தி ரத்த அழுத்தத்தை சீராக்கும் மாத்திரை.',
            documentContext: 'Tab. Telmisartan 40mg OD morning',
            whatItDoesNotMean: 'மயக்கம் தராது, ரத்த ஓட்டத்தை சீராக வைக்கும்.',
            category: 'medication'
          },
          {
            id: 'term-ta-5',
            term: 'Atorvastatin (அடோர்வாஸ்டாடின் 20 மிகி)',
            simpleMeaning: 'ரத்தத்தில் கெட்ட கொழுப்பைக் குறைத்து இதயம் மற்றும் பக்கவாதத்தைத் தடுக்கும் மாத்திரை.',
            documentContext: 'Tab. Atorvastatin 20mg HS bedtime',
            whatItDoesNotMean: 'இது உடனடியாக கொழுப்பை கரைக்காது; தொடர்ந்து உட்கொள்ள வேண்டும்.',
            category: 'medication'
          }
        ],
        whatDocumentSaysHappened: [
          'மருத்துவர் ரத்த அழுத்தத்தை 138/88 mmHg என பதிவு செய்துள்ளார்.',
          'சர்க்கரை அளவு 7.2% ஆக உள்ளதால் உணவுக்குப் பின் உட்கொள்ள 3 முக்கியமான மாத்திரைகள் வழங்கப்பட்டுள்ளன.',
          'ரத்த வெள்ளையணுக்களின் எண்ணிக்கையை மீண்டும் சரிபார்க்க 2 வாரங்களில் CBC பரிசோதனை செய்ய பரிந்துரைக்கப்பட்டுள்ளது.'
        ],
        whatIsUnclear: [
          'மருந்துச் சீட்டின் 4-வது வரியில் உள்ள கையெழுத்தில் லுகோபீனியா (Leukopenia) என்ற சொல் லுகேமியா போல சற்று தெளிவற்றதாக உள்ளது. ஆனால் இது லுகோபீனியா (வெள்ளையணுக்கள் குறைவு) என்றே மருத்துவ சூழல் காட்டுகிறது; புற்றுநோய் அல்ல.'
        ],
        whatToAskDoctor: [
          'மெட்ஃபோர்மின் மாத்திரையை உணவுக்கு நடுவிலா அல்லது உணவுக்குப் பிறகா எப்போது உட்கொள்ள வேண்டும்?',
          'இரண்டு வாரங்களில் எடுக்க வேண்டிய சிபிசி ரத்தப் பரிசோதனைக்கு வெறும் வயிற்றில் செல்ல வேண்டுமா?',
          'ரத்த சர்க்கரை அளவை வீட்டில் குளுக்கோமீட்டர் மூலம் வாரத்திற்கு எத்தனை முறை சோதிக்க வேண்டும்?'
        ],
        spokenScript: "வணக்கம்! நான் உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். உங்கள் மருத்துவர் டாக்டர் சுரேஷ் மேத்தா அவர்கள் கொடுத்த மருந்துச் சீட்டை முழுமையாகப் பரிசீலனை செய்துள்ளேன். டாக்டர் ரிப்போர்ட் என்ன சொல்லுதுன்னா, உங்கள் ரத்தத்தில் சர்க்கரை அளவு சற்று அதிகமாக உள்ளது, அதாவது HbA1c 7.2 சதவீதம் மற்றும் ரத்த அழுத்தம் 138/88 ஆக பதிவாகியுள்ளது. இதற்காக நீங்கள் உட்கொள்ள வேண்டிய மாத்திரைகள்: முதலாவதாக, சர்க்கரை அளவைக் கட்டுப்படுத்த மெட்ஃபோர்மின் 500 மிகி மாத்திரையை தினமும் காலை மற்றும் இரவு உணவுக்குப் பிறகு உட்கொள்ள வேண்டும். இரண்டாவதாக, ரத்த அழுத்தத்தைக் கட்டுப்படுத்த டெல்மிசார்டன் 40 மிகி மாத்திரையை தினமும் காலையில் ஒருமுறை எடுத்துக்கொள்ள வேண்டும். மூன்றாவதாக, கொழுப்பைக் கட்டுப்படுத்தி இதயத்தைப் பாதுகாக்க அடோர்வாஸ்டாடின் 20 மிகி மாத்திரையை இரவு தூங்குவதற்கு முன் உட்கொள்ள வேண்டும். மிக முக்கியமாக, உங்கள் ரிப்போர்ட்டில் உள்ள கையெழுத்தில் லுகோபீனியா என்று எழுதப்பட்டுள்ளது; இது ரத்தத்தில் உள்ள வெள்ளையணுக்கள் லேசாக குறைந்துள்ளதைக் குறிக்கிறது. இது எந்தவித லுகேமியா அல்லது புற்றுநோய் வகை கிடையாது, எனவே நீங்கள் பயப்பட வேண்டாம்! வெள்ளையணுக்களின் அளவை மீண்டும் கண்காணிக்க இரண்டு வாரங்களில் மறுபடியும் சிபிசி ரத்தப் பரிசோதனை செய்யுமாறு டாக்டர் அறிவுறுத்தியுள்ளார்.",
        spokenScriptPhonetic: "Vanakkam! Naan ungal MedScript AI maruthuva udhaviyaalar. Ungal doctor Suresh Mehta avargal kodutha marundhu seetai naan muzhumaiyaaga pariseelanai seidhen. Doctor report enna solludhuna, ungal rathathil sugar alavu satru adhigaamaaga ulladhu, adhavadhu HbA1c 7.2 percentage matrum blood pressure 138/88 aaga pathivaagiyulladhu. Idharkaaga neenga podavendiya tablets: mudhalil, sugar alavai kattupadutha Metformin 500 milligram tablet thinamum kaalai matrum iravu unavukku pinbu poda vendum. Irandavadhaga, blood pressure kattupadutha Telmisartan 40 milligram tablet thinamum kaalaiyil orumurai eduthukolla vendum. Moondravadhaga, cholesterol kattupaduthi idhayathai paadhukaakka Atorvastatin 20 milligram tablet iravu thoonguvadharku mun poda vendum. Miga mukkiyamaaga, ungal report il kaiyezhuthu Leukopenia endru ulladhu; idhu ratha vellai anukkal lesaaga kuraindhulladhai kurikkiradhu, idhu leukemia alladhu cancer vagai kidayadhu, adhanaal bayappada vendaam! Vellai anukkalin alavai meendum saripaarkka irandu vaarangalil marubadiyum CBC blood test seiyumaaru doctor solliyullaar.",
        sentenceTimings: [
          { sentence: "வணக்கம்! நான் உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். உங்கள் மருத்துவர் டாக்டர் சுரேஷ் மேத்தா அவர்கள் கொடுத்த மருந்துச் சீட்டை முழுமையாகப் பரிசீலனை செய்துள்ளேன்.", phoneticSentence: "Vanakkam! Naan ungal MedScript AI maruthuva udhaviyaalar. Ungal doctor Suresh Mehta avargal kodutha marundhu seetai naan muzhumaiyaaga pariseelanai seidhen.", durationSec: 5.5, topic: 'intro' },
          { sentence: "டாக்டர் ரிப்போர்ட் என்ன சொல்லுதுன்னா, உங்கள் ரத்தத்தில் சர்க்கரை அளவு சற்று அதிகமாக உள்ளது, அதாவது HbA1c 7.2 சதவீதம் மற்றும் ரத்த அழுத்தம் 138/88 ஆக பதிவாகியுள்ளது.", phoneticSentence: "Doctor report enna solludhuna, ungal rathathil sugar alavu satru adhigaamaaga ulladhu, adhavadhu HbA1c 7.2 percentage matrum blood pressure 138/88 aaga pathivaagiyulladhu.", durationSec: 6.0, topic: 'findings' },
          { sentence: "நீங்கள் உட்கொள்ள வேண்டிய மாத்திரைகள்: முதலாவதாக, சர்க்கரை அளவைக் கட்டுப்படுத்த மெட்ஃபோர்மின் 500 மிகி மாத்திரையை தினமும் காலை மற்றும் இரவு உணவுக்குப் பிறகு உட்கொள்ள வேண்டும்.", phoneticSentence: "Neenga podavendiya tablets: mudhalil, sugar alavai kattupadutha Metformin 500 milligram tablet thinamum kaalai matrum iravu unavukku pinbu poda vendum.", durationSec: 6.5, topic: 'metformin' },
          { sentence: "இரண்டாவதாக, ரத்த அழுத்தத்தைக் கட்டுப்படுத்த டெல்மிசார்டன் 40 மிகி மாத்திரையை தினமும் காலையில் ஒருமுறை எடுத்துக்கொள்ள வேண்டும்.", phoneticSentence: "Irandavadhaga, blood pressure kattupadutha Telmisartan 40 milligram tablet thinamum kaalaiyil orumurai eduthukolla vendum.", durationSec: 5.5, topic: 'telmisartan' },
          { sentence: "மூன்றாவதாக, கொழுப்பைக் கட்டுப்படுத்தி இதயத்தைப் பாதுகாக்க அடோர்வாஸ்டாடின் 20 மிகி மாத்திரையை இரவு தூங்குவதற்கு முன் உட்கொள்ள வேண்டும்.", phoneticSentence: "Moondravadhaga, cholesterol kattupaduthi idhayathai paadhukaakka Atorvastatin 20 milligram tablet iravu thoonguvadharku mun poda vendum.", durationSec: 5.5, topic: 'atorvastatin' },
          { sentence: "மிக முக்கியமாக, உங்கள் ரிப்போர்ட்டில் உள்ள கையெழுத்தில் லுகோபீனியா என்று எழுதப்பட்டுள்ளது; இது ரத்தத்தில் உள்ள வெள்ளையணுக்கள் லேசாக குறைந்துள்ளதைக் குறிக்கிறது, இது லுகேமியா அல்லது புற்றுநோய் வகை கிடையாது!", phoneticSentence: "Miga mukkiyamaaga, ungal report il kaiyezhuthu Leukopenia endru ulladhu; idhu ratha vellai anukkal lesaaga kuraindhulladhai kurikkiradhu, idhu leukemia alladhu cancer vagai kidayadhu!", durationSec: 7.0, topic: 'clarification' },
          { sentence: "வெள்ளையணுக்களின் அளவை மீண்டும் சரிபார்க்க இரண்டு வாரங்களில் மறுபடியும் சிபிசி ரத்தப் பரிசோதனை செய்யுமாறு டாக்டர் அறிவுறுத்தியுள்ளார். சந்தேகம் இருந்தால் உங்கள் மருத்துவரிடம் கலந்தாலோசியுங்கள்.", phoneticSentence: "Vellai anukkalin alavai meendum saripaarkka irandu vaarangalil marubadiyum CBC blood test seiyumaaru doctor solliyullaar. Sandhegam irundhaal ungal doctor idam ketkavum.", durationSec: 6.5, topic: 'followup' }
        ]
      },
      kn: {
        language: 'kn',
        languageName: 'Kannada',
        simpleSummary: 'ಡಾ. ಸುರೇಶ್ ಕೆ. ಮೆಹ್ತಾ ಅವರು ರಾಜೇಶ್ ಶರ್ಮಾ ಅವರಿಗೆ ನೀಡಿದ ವೈದ್ಯಕೀಯ ಚೀಟಿ. ಇದರಲ್ಲಿ ರಕ್ತದಲ್ಲಿ ಸಕ್ಕರೆ (HbA1c 7.2%) ಮತ್ತು ರಕ್ತದೊತ್ತಡ (138/88) ನಿಯಂತ್ರಣಕ್ಕೆ 3 ಮಾತ್ರೆಗಳನ್ನು ನೀಡಲಾಗಿದೆ.',
        explainLikeIm10: "ನಿಮ್ಮ ದೇಹವನ್ನು ಒಂದು ಸುಂದರ ಮನೆ ಎಂದು ಭಾವಿಸಿ. ರಕ್ತದಲ್ಲಿ ಸಕ್ಕರೆ ಅಂಶ (7.2%) ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗಿದೆ. ನಿಯಂತ್ರಣಕ್ಕೆ ಮೆಟ್‌ಫಾರ್ಮಿನ್, ರಕ್ತದೊತ್ತಡಕ್ಕೆ ಟೆಲ್ಮಿಸಾರ್ಟನ್ ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ ತಡೆಗಟ್ಟಲು ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್ ನೀಡಲಾಗಿದೆ. ಲ್ಯುಕೋಪೀನಿಯಾ ಎಂದರೆ ಬಿಳಿ ರಕ್ತ ಕಣಗಳ ತಾತ್ಕಾಲಿಕ ಇಳಿಕೆ ಮಾತ್ರ; ಇದು ಕ್ಯಾನ್ಸರ್ ಅಥವಾ ಲ್ಯುಕೇಮಿಯಾ ಅಲ್ಲ!",
        whatWasWritten: [
          'ರೋಗನಿರ್ಣಯ: ಟೈಪ್ 2 ಮಧುಮೇಹ ಮತ್ತು ಅಧಿಕ ರಕ್ತದೊತ್ತಡ.',
          'ಲ್ಯಾಬ್ ವರದಿ: HbA1c 7.2%, ರಕ್ತದೊತ್ತಡ 138/88 mmHg.',
          'ಮಾತ್ರೆ 1: Tab. Metformin 500 mg — ಊಟದ ನಂತರ ದಿನಕ್ಕೆ 2 ಬಾರಿ (ಸಕ್ಕರೆ ನಿಯಂತ್ರಣ).',
          'ಮಾತ್ರೆ 2: Tab. Telmisartan 40 mg — ಬೆಳಿಗ್ಗೆ 1 ಬಾರಿ (ರಕ್ತದೊತ್ತಡ ನಿಯಂತ್ರಣ).',
          'ಮಾತ್ರೆ 3: Tab. Atorvastatin 20 mg — ರಾತ್ರಿ ಮಲಗುವ ಮುನ್ನ (ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮತ್ತು ಹೃದಯ ರಕ್ಷಣೆ).',
          'ಮರುಪರೀಕ್ಷೆ: 2 ವಾರಗಳ ನಂತರ ಮತ್ತೆ ಸಿಬಿಸಿ (CBC) ರಕ್ತ ಪರೀಕ್ಷೆ.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-kn-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'ಕಳೆದ 3 ತಿಂಗಳ ಸರಾಸರಿ ರಕ್ತದ ಸಕ್ಕರೆ ಮಟ್ಟ.',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'ತಕ್ಷಣ ಇನ್ಸುಲಿನ್ ಚುಚ್ಚುಮದ್ದು ಬೇಕು ಎಂದು ಇದರರ್ಥವಲ್ಲ.',
            category: 'lab_value'
          },
          {
            id: 'term-kn-2',
            term: 'Leukopenia (ಲ್ಯುಕೋಪೀನಿಯಾ)',
            simpleMeaning: 'ರಕ್ತದಲ್ಲಿ ಬಿಳಿ ರಕ್ತ ಕಣಗಳ ಸಂಖ್ಯೆ ಸ್ವಲ್ಪ ಕಡಿಮೆಯಾಗಿರುವುದು.',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'ಇದು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಕ್ಯಾನ್ಸರ್ ಅಥವಾ ಲ್ಯುಕೇಮಿಯಾ ಅಲ್ಲ.',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'ರಕ್ತದೊತ್ತಡ 138/88 mmHg ದಾಖಲಾಗಿದೆ.',
          'ಸಕ್ಕರೆ ಮತ್ತು ರಕ್ತದೊತ್ತಡ ನಿಯಂತ್ರಣಕ್ಕೆ 3 ಮಾತ್ರೆಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.',
          'ಬಿಳಿ ರಕ್ತ ಕಣಗಳ ಸುಧಾರಣೆಯನ್ನು ನೋಡಲು 2 ವಾರಗಳಲ್ಲಿ ರಕ್ತ ಪರೀಕ್ಷೆ ಮಾಡಿಸಲು ಸೂಚಿಸಲಾಗಿದೆ.'
        ],
        whatIsUnclear: [
          'ಚೀಟಿಯಲ್ಲಿ ಲ್ಯುಕೋಪೀನಿಯಾ ಎಂಬ ಶಬ್ದದಲ್ಲಿ ಅಸ್ಪಷ್ಟತೆ ಇತ್ತು, ಆದರೆ ಇದು ಕೇವಲ ಬಿಳಿ ರಕ್ತ ಕಣಗಳ ಲಘು ಇಳಿಕೆಯಾಗಿದೆ.'
        ],
        whatToAskDoctor: [
          'ಮೆಟ್‌ಫಾರ್ಮಿನ್ ಮಾತ್ರೆ ಊಟದ ನಂತರ ತಕ್ಷಣವೇ ತೆಗೆದುಕೊಳ್ಳಬೇಕೇ?',
          '2 ವಾರಗಳ ನಂತರದ ಸಿಬಿಸಿ ಪರೀಕ್ಷೆಗೆ ಖಾಲಿ ಹೊಟ್ಟೆಯಲ್ಲಿ ಹೋಗಬೇಕೇ?'
        ],
        spokenScript: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ವೈದ್ಯಕೀಯ ವಿವರಣೆಗಾರ. ಡಾ. ಸುರೇಶ್ ಕೆ. ಮೆಹ್ತಾ ಅವರು ರಾಜೇಶ್ ಶರ್ಮಾ ಅವರಿಗೆ ನೀಡಿದ ಚೀಟಿಯನ್ನು ಸಮಗ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. ಡಾಕ್ಟರ್ ರಿಪೋರ್ಟ್ ಏನು ಹೇಳುತ್ತದೆ ಎಂದರೆ, ರಕ್ತದಲ್ಲಿ ಸಕ್ಕರೆ ಅಂಶ (HbA1c 7.2%) ಮತ್ತು ರಕ್ತದೊತ್ತಡ 138/88 ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗಿದೆ. ನೀವು ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಮಾತ್ರೆಗಳು: ಮೊದಲನೆಯದಾಗಿ, ಸಕ್ಕರೆ ನಿಯಂತ್ರಣಕ್ಕೆ ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500 ಮಿಲಿಗ್ರಾಂ ಊಟದ ನಂತರ ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ. ಎರಡನೆಯದಾಗಿ, ರಕ್ತದೊತ್ತಡಕ್ಕೆ ಟೆಲ್ಮಿಸಾರ್ಟನ್ 40 ಮಿಲಿಗ್ರಾಂ ಬೆಳಿಗ್ಗೆ ಒಮ್ಮೆ. ಮೂರನೆಯದಾಗಿ, ಕೊಲೆಸ್ಟ್ರಾಲ್ ನಿಯಂತ್ರಣಕ್ಕೆ ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್ 20 ಮಿಲಿಗ್ರಾಂ ರಾತ್ರಿ ಮಲಗುವ ಮುನ್ನ. ಮುಖ್ಯವಾಗಿ, ಚೀಟಿಯಲ್ಲಿ ಲ್ಯುಕೋಪೀನಿಯಾ ಎಂದು ಬರೆಯಲಾಗಿದೆ; ಇದು ಬಿಳಿ ರಕ್ತ ಕಣಗಳ ತಾತ್ಕಾಲಿಕ ಇಳಿಕೆಯನ್ನು ಮಾತ್ರ ಸೂಚಿಸುತ್ತದೆ, ಇದು ಕ್ಯಾನ್ಸರ್ ಅಥವಾ ಲ್ಯುಕೇಮಿಯಾ ಅಲ್ಲ! ಎರಡು ವಾರಗಳ ನಂತರ ಮತ್ತೆ ಸಿಬಿಸಿ ರಕ್ತ ಪರೀಕ್ಷೆ ಮಾಡಿಸಲು ಡಾಕ್ಟರ್ ಸೂಚಿಸಿದ್ದಾರೆ.",
        spokenScriptPhonetic: "Namaskara! Naanu nimma MedScript AI vaidyakeeya vivaranegaara. Doctor Suresh Mehta avaru Rajesh Sharma avarige needida prescription annu samagravagi parishilisiddene. Doctor report enu heluththe andare, rakthadalli sakkare amsha HbA1c 7.2% matthu rakthadothada 138/88 swalpa hecchagide. Neevu thegedukollabekada maathregalu: Modalaneyadaagi, sakkare niyantranakke Metformin 500 milligram ootada nantara dinakke eradu baari. Eradaneyadaagi, blood pressure ge Telmisartan 40 milligram beligge omme. Mooraneyadaagi, cholesterol niyantranakke Atorvastatin 20 milligram raathri malaguva munna. Mukhyavaagi, report nalli Leukopenia endu bareyalagide; idu bili raktha kanagala thaathkaalika ilike maathra, idu cancer athava leukemia alla! Eradu vaaragala nantara matthe CBC raktha pareekshe maadisuvaante doctor thilisiddare.",
        sentenceTimings: [
          { sentence: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ವೈದ್ಯಕೀಯ ವಿವರಣೆಗಾರ. ಡಾ. ಸುರೇಶ್ ಕೆ. ಮೆಹ್ತಾ ಅವರ ಚೀಟಿಯನ್ನು ಸಮಗ್ರವಾಗಿ ಪರಿಶೀಲಿಸಿದ್ದೇನೆ.", phoneticSentence: "Namaskara! Naanu nimma MedScript AI vaidyakeeya vivaranegaara. Doctor Suresh Mehta avara prescription annu parishilisiddene.", durationSec: 5.5, topic: 'intro' },
          { sentence: "ಡಾಕ್ಟರ್ ರಿಪೋರ್ಟ್ ಏನು ಹೇಳುತ್ತದೆ ಎಂದರೆ, ರಕ್ತದಲ್ಲಿ ಸಕ್ಕರೆ ಅಂಶ (HbA1c 7.2%) ಮತ್ತು ರಕ್ತದೊತ್ತಡ 138/88 ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗಿದೆ.", phoneticSentence: "Doctor report enu heluththe andare, rakthadalli sakkare amsha HbA1c 7.2% matthu rakthadothada 138/88 swalpa hecchagide.", durationSec: 6.0, topic: 'findings' },
          { sentence: "ನೀವು ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಮಾತ್ರೆಗಳು: ಸಕ್ಕರೆಗೆ ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500 ಮಿಲಿಗ್ರಾಂ ದಿನಕ್ಕೆ 2 ಬಾರಿ, ರಕ್ತದೊತ್ತಡಕ್ಕೆ ಟೆಲ್ಮಿಸಾರ್ಟನ್ 40 ಮಿಲಿಗ್ರಾಂ ಬೆಳಿಗ್ಗೆ, ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್‌ಗೆ ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್ 20 ಮಿಲಿಗ್ರಾಂ ರಾತ್ರಿ.", phoneticSentence: "Neevu thegedukollabekada maathregalu: Metformin 500 milligram dinakke 2 baari, Telmisartan 40 milligram beligge, matthu Atorvastatin 20 milligram raathri.", durationSec: 7.0, topic: 'meds' },
          { sentence: "ಮುಖ್ಯವಾಗಿ, ಚೀಟಿಯಲ್ಲಿ ಲ್ಯುಕೋಪೀನಿಯಾ ಎಂದು ಬರೆಯಲಾಗಿದೆ; ಇದು ಬಿಳಿ ರಕ್ತ ಕಣಗಳ ತಾತ್ಕಾಲಿಕ ಇಳಿಕೆಯನ್ನು ಮಾತ್ರ ಸೂಚಿಸುತ್ತದೆ, ಇದು ಕ್ಯಾನ್ಸರ್ ಅಥವಾ ಲ್ಯುಕೇಮಿಯಾ ಅಲ್ಲ!", phoneticSentence: "Mukhyavaagi, report nalli Leukopenia endu bareyalagide; idu bili raktha kanagala thaathkaalika ilike maathra, idu cancer athava leukemia alla!", durationSec: 6.5, topic: 'clarification' },
          { sentence: "ಎರಡು ವಾರಗಳ ನಂತರ ಮತ್ತೆ ಸಿಬಿಸಿ ರಕ್ತ ಪರೀಕ್ಷೆ ಮಾಡಿಸಲು ಡಾಕ್ಟರ್ ಸೂಚಿಸಿದ್ದಾರೆ.", phoneticSentence: "Eradu vaaragala nantara matthe CBC raktha pareekshe maadisuvaante doctor thilisiddare.", durationSec: 4.5, topic: 'followup' }
        ]
      },
      ml: {
        language: 'ml',
        languageName: 'Malayalam',
        simpleSummary: 'ഡോ. സുരേഷ് മേത്ത രാജേഷ് ശർമ്മയ്ക്ക് നൽകിയ കുറിപ്പടി. രക്തത്തിലെ പഞ്ചസാര (HbA1c 7.2%), രക്തസമ്മർദ്ദം (138/88) എന്നിവ നിയന്ത്രിക്കാൻ 3 ഗുളികകൾ നൽകിയിട്ടുണ്ട്.',
        explainLikeIm10: "ശരീരത്തിൽ പഞ്ചസാരയുടെ അളവ് (7.2%) അല്പം കൂടുതലാണ്. ഇത് നിയന്ത്രിക്കാൻ മെറ്റ്ഫോർമിൻ, പ്രഷറിന് ടെൽമിസാർട്ടൻ, കൊളസ്ട്രോളിന് അറ്റോർവാസ്റ്റാറ്റിൻ എന്നിവ നൽകിയിരിക്കുന്നു. ലൂക്കോപീനിയ എന്നാൽ വെളുത്ത രക്താണുക്കളുടെ നേരിയ കുറവ് മാത്രമാണ്; ഇത് കാൻസറോ രക്താർബുദമോ അല്ല!",
        whatWasWritten: [
          'രോഗനിർണയം: ടൈപ്പ് 2 പ്രമേഹവും രക്താതിമർദ്ദവും (Type 2 Diabetes & Hypertension).',
          'പരിശോധനാ ഫലം: HbA1c 7.2%, രക്തസമ്മർദ്ദം 138/88 mmHg.',
          'ഗുളിക 1: Tab. Metformin 500 mg — ഭക്ഷണത്തിന് ശേഷം ദിവസവും 2 നേരം.',
          'ഗുളിക 2: Tab. Telmisartan 40 mg — രാവിലെ 1 നേരം.',
          'ഗുളിക 3: Tab. Atorvastatin 20 mg — രാത്രി കിടക്കുന്നതിന് മുൻപ്.',
          'തുടർപരിശോധന: 2 ആഴ്ചയ്ക്ക് ശേഷം വീണ്ടും സിബിസി (CBC) രക്തപരിശോധന.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-ml-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'കഴിഞ്ഞ 3 മാസത്തെ ശരാശരി രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ്.',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'ഉടൻ ഇൻസുലിൻ കുത്തിവെയ്പ്പ് ആവശ്യമാണെന്ന് ഇതിനർത്ഥമില്ല.',
            category: 'lab_value'
          },
          {
            id: 'term-ml-2',
            term: 'Leukopenia (ലൂക്കോപീനിയ)',
            simpleMeaning: 'രക്തത്തിലെ വെളുത്ത രക്താണുക്കളുടെ എണ്ണത്തിലുള്ള നേരിയ താൽക്കാലിക കുറവ്.',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'ഇതൊരു തരത്തിലും കാൻസറോ ലുക്കീമിയയോ അല്ല.',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'രക്തസമ്മർദ്ദം 138/88 mmHg രേഖപ്പെടുത്തി.',
          'പഞ്ചസാരയും കൊളസ്ട്രോളും നിയന്ത്രിക്കാൻ 3 പ്രധാന മരുന്നുകൾ നിർദ്ദേശിച്ചു.',
          'വെളുത്ത രക്താണുക്കളുടെ പുരോഗതി അറിയാൻ 2 ആഴ്ചയ്ക്ക് ശേഷം രക്തപരിശോധന നടത്താൻ നിർദ്ദേശിച്ചു.'
        ],
        whatIsUnclear: [
          'കൈയക്ഷരത്തിൽ ലൂക്കോപീനിയ എന്ന വാക്ക് വ്യക്തമല്ലായിരുന്നു, എന്നാൽ ഇത് വെളുത്ത രക്താണുക്കളുടെ നേരിയ കുറവ് മാത്രമാണ്.'
        ],
        whatToAskDoctor: [
          'മെറ്റ്ഫോർമിൻ ഗുളിക ഭക്ഷണത്തിന് തൊട്ടുപിന്നാലെയാണോ കഴിക്കേണ്ടത്?',
          'രണ്ടാഴ്ചയ്ക്ക് ശേഷമുള്ള പരിശോധനയ്ക്ക് വെറുംവയറ്റിൽ വരണമോ?'
        ],
        spokenScript: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായിയാണ്. ഡോ. സുരേഷ് മേത്ത രാജേഷ് ശർമ്മയ്ക്ക് നൽകിയ കുറിപ്പടി ഞാൻ പരിശോധിച്ചു. ഡോക്ടറുടെ റിപ്പോർട്ട് പറയുന്നത്, രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് (HbA1c 7.2%), പ്രഷർ 138/88 എന്നിവ അല്പം കൂടുതലാണ്. നിങ്ങൾ കഴിക്കേണ്ട ഗുളികകൾ: പഞ്ചസാര നിയന്ത്രിക്കാൻ മെറ്റ്ഫോർമിൻ 500 മില്ലിഗ്രാം ഭക്ഷണത്തിന് ശേഷം ദിവസവും രണ്ടുനേരം. പ്രഷറിന് ടെൽമിസാർട്ടൻ 40 മില്ലിഗ്രാം രാവിലെ ഒരുനേരം. കൊളസ്ട്രോളിന് അറ്റോർവാസ്റ്റാറ്റിൻ 20 മില്ലിഗ്രാം രാത്രി കിടക്കുന്നതിന് മുൻപ്. ഏറ്റവും പ്രധാനമായി, കുറിപ്പടിയിലുള്ളത് ലൂക്കോപീനിയ എന്നാണ്; ഇത് രക്തത്തിലെ വെളുത്ത രക്താണുക്കളുടെ നേരിയ കുറവ് മാത്രമാണ്, ഇതൊരു തരത്തിലുമുള്ള കാൻസറോ രക്താർബുദമോ അല്ല! ഭയപ്പെടേണ്ടതില്ല. രണ്ടാഴ്ചയ്ക്ക് ശേഷം വീണ്ടും സിബിസി രക്തപരിശോധന നടത്താൻ ഡോക്ടർ നിർദ്ദേശിച്ചിട്ടുണ്ട്.",
        spokenScriptPhonetic: "Namaskaram! Njaan ningalude MedScript AI medical sahaayiyaanu. Doctor Suresh Mehta nalkiya prescription njaan parishodhichu. Doctor report parayunnathu, rakthathile sugar nilavaram HbA1c 7.2%, pressure 138/88 ennniva alpamt kooduthalaanu. Ningal kazhikkenda gulikakal: Sugar niyanathrikkaan Metformin 500 milligram bhakshanathinu sesham divasavum randu neram. Pressure nu Telmisartan 40 milligram raavile oru neram. Cholesterol nu Atorvastatin 20 milligram raathri kidakkunnathinu munpu. Ettavum pradhaanamaayi, report ilullathu Leukopenia ennaanu; ithu velutha rakthaanukkalude neriya kuravu maathramaanu, ithu cancer allengil leukemia alla! Bhayappedendaathilla. Randaazhchakku sesham veendum CBC test nadathaan doctor nirdheshichittundu.",
        sentenceTimings: [
          { sentence: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായിയാണ്. കുറിപ്പടി ഞാൻ പരിശോധിച്ചു.", phoneticSentence: "Namaskaram! Njaan ningalude MedScript AI medical sahaayiyaanu. Prescription njaan parishodhichu.", durationSec: 5.0, topic: 'intro' },
          { sentence: "ഡോക്ടറുടെ റിപ്പോർട്ട് പറയുന്നത്, പഞ്ചസാരയുടെ അളവ് (HbA1c 7.2%), പ്രഷർ 138/88 എന്നിവ അല്പം കൂടുതലാണ്.", phoneticSentence: "Doctor report parayunnathu, sugar nilavaram HbA1c 7.2%, pressure 138/88 ennniva alpam kooduthalaanu.", durationSec: 5.5, topic: 'findings' },
          { sentence: "നിങ്ങൾ കഴിക്കേണ്ട ഗുളികകൾ: മെറ്റ്ഫോർമിൻ 500 മില്ലിഗ്രാം ദിവസവും 2 നേരം, ടെൽമിസാർട്ടൻ 40 മില്ലിഗ്രാം രാവിലെ, അറ്റോർവാസ്റ്റാറ്റിൻ 20 മില്ലിഗ്രാം രാത്രി.", phoneticSentence: "Ningal kazhikkenda gulikakal: Metformin 500 milligram divasavum 2 neram, Telmisartan 40 milligram raavile, Atorvastatin 20 milligram raathri.", durationSec: 7.0, topic: 'meds' },
          { sentence: "ഏറ്റവും പ്രധാനമായി, കുറിപ്പടിയിലുള്ളത് ലൂക്കോപീനിയ എന്നാണ്; ഇത് വെളുത്ത രക്താണുക്കളുടെ നേരിയ കുറവ് മാത്രമാണ്, ഇതൊരു തരത്തിലുമുള്ള കാൻസറോ ലുക്കീമിയയോ അല്ല!", phoneticSentence: "Ettavum pradhaanamaayi, report ilullathu Leukopenia ennaanu; ithu velutha rakthaanukkalude neriya kuravu maathramaanu, ithu cancer allengil leukemia alla!", durationSec: 6.5, topic: 'clarification' },
          { sentence: "രണ്ടാഴ്ചയ്ക്ക് ശേഷം വീണ്ടും സിബിസി രക്തപരിശോധന നടത്താൻ ഡോക്ടർ നിർദ്ദേശിച്ചിട്ടുണ്ട്.", phoneticSentence: "Randaazhchakku sesham veendum CBC test nadathaan doctor nirdheshichittundu.", durationSec: 4.5, topic: 'followup' }
        ]
      },
      bn: {
        language: 'bn',
        languageName: 'Bengali',
        simpleSummary: 'ডাঃ সুরেশ কে. মেহতা কর্তৃক রাজেশ শর্মার প্রেসক্রিপশন। এতে রক্তে সুগার (HbA1c 7.2%) ও রক্তচাপ (138/88) নিয়ন্ত্রণের জন্য ৩টি ওষুধ দেওয়া হয়েছে।',
        explainLikeIm10: "আপনার শরীরে শর্করার মাত্রা (7.2%) কিছুটা বৃদ্ধি পেয়েছে। তা নিয়ন্ত্রণে মেটফর্মিন, রক্তচাপ স্বাভাবিক রাখতে টেলমিসারটান এবং কোলেস্টেরল প্রতিরোধে অ্যাটোরভাস্ট্যাটিন দেওয়া হয়েছে। লিউকোপেনিয়া হলো শ্বেত রক্তকণিকার সাময়িক সামান্য হ্রাস; এটি ক্যানসার বা লিউকেমিয়া নয়!",
        whatWasWritten: [
          'রোগ নির্ণয়: টাইপ ২ ডায়াবেটিস এবং উচ্চ রক্তচাপ (Type 2 Diabetes & Hypertension)।',
          'ল্যাব রিপোর্ট: HbA1c 7.2%, রক্তচাপ ১৩৮/৮৮ mmHg।',
          'ওষুধ ১: Tab. Metformin 500 mg — খাবারের পর দিনে দুবার (সুগার নিয়ন্ত্রণ)।',
          'ওষুধ ২: Tab. Telmisartan 40 mg — সকালে একবার (রক্তচাপ নিয়ন্ত্রণ)।',
          'ওষুধ ৩: Tab. Atorvastatin 20 mg — রাতে শোবার আগে (কোলেস্টেরল নিয়ন্ত্রণ)।',
          'পুনরায় পরীক্ষা: ২ সপ্তাহ পর পুনরায় সিবিসি (CBC) রক্ত পরীক্ষা।'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-bn-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'বিগত ৩ মাসের রক্তে শর্করার গড় মাত্রা।',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'এর অর্থ অবিলম্বে ইনসুলিন ইনজেকশন নিতে হবে এমন নয়।',
            category: 'lab_value'
          },
          {
            id: 'term-bn-2',
            term: 'Leukopenia (লিউকোপেনিয়া)',
            simpleMeaning: 'রক্তে শ্বেত রক্তকণিকার সংখ্যা সাময়িকভাবে সামান্য হ্রাস পাওয়া।',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'এটি কোনোভাবেই ক্যানসার বা লিউকেমিয়া নয়।',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'রক্তচাপ ১৩৮/৮৮ mmHg রেকর্ড করা হয়েছে।',
          'সুগার ও রক্তচাপের জন্য ৩টি গুরুত্বপূর্ণ ওষুধ দেওয়া হয়েছে।',
          'শ্বেত রক্তকণিকা পুনরায় পরীক্ষা করার জন্য ২ সপ্তাহ পর টেস্ট করতে বলা হয়েছে।'
        ],
        whatIsUnclear: [
          'প্রেসক্রিপশনে লিউকোপেনিয়া শব্দে কিছুটা অস্পষ্টতা ছিল, তবে এটি ক্যানসার নয়, কেবল রক্তকণিকার সামান্য সাময়িক হ্রাস।'
        ],
        whatToAskDoctor: [
          'মেটফর্মিন ওষুধটি খাবারের কতক্ষণ পর খাওয়া উচিত?',
          '২ সপ্তাহ পর পরীক্ষার জন্য কি খালি পেটে যেতে হবে?'
        ],
        spokenScript: "নমস্কার! আমি আপনার মেডস্ক্রিপ্ট এআই ভার্চুয়াল মেডিক্যাল সহকারী। ডাঃ সুরেশ মেহতার প্রেসক্রিপশনটি আমি বিশদভাবে বিশ্লেষণ করেছি। ডাক্তারের রিপোর্ট বলছে, আপনার রক্তে শর্করার মাত্রা (HbA1c 7.2%) এবং রক্তচাপ ১৩৮/৮৮ কিছুটা বেশি রয়েছে। এর জন্য যে ওষুধগুলো খেতে হবে: সুগার নিয়ন্ত্রণের জন্য মেটফর্মিন ৫০০ মিলিগ্রাম খাবারের পর দিনে দুবার। রক্তচাপের জন্য টেলমিসারটান ৪০ মিলিগ্রাম প্রতিদিন সকালে একবার। এবং কোলেস্টেরল কমানোর জন্য অ্যাটোরভাস্ট্যাটিন ২০ মিলিগ্রাম রাতে শোবার আগে। অত্যন্ত গুরুত্বপূর্ণ তথ্য, রিপোর্টে লিউকোপেনিয়া লেখা রয়েছে, যার অর্থ শ্বেত রক্তকণিকার সাময়িক সামান্য হ্রাস; এটি কোনোরকম ক্যানসার বা লিউকেমিয়া নয়! আতঙ্কিত হবেন না। দুই সপ্তাহ পর পুনরায় সিবিসি রক্ত পরীক্ষা করাতে বলা হয়েছে।",
        spokenScriptPhonetic: "Nomoshkar! Aami aapnar MedScript AI virtual medical sahayak. Dr. Suresh Mehta-r prescription aami bishodbhabe bishleshan korechhi. Doctor-er report bolchhe, aapnar rokte sugar-er maatra HbA1c 7.2% ebong roktachaap 138/88 kichhuta beshi aachhe. Er jonno je oshudh gulo khete hobe: Sugar niyontroner jonno Metformin 500 milligram khabarer por dine dubaar. Roktachaaper jonno Telmisartan 40 milligram shokale ekbaar. Ebong cholesterol komaanor jonno Atorvastatin 20 milligram raate shobar aage. Otyonto gurutwopurno tothyo, report-e Leukopenia lekha aachhe, ja shwet roktokonikaar samoyik samanyo hraash; eti konorokom cancer ba leukemia noy! Aatonkito hoben na. Dui shoptaaho por punoraay CBC blood test korate bola hoyechhe.",
        sentenceTimings: [
          { sentence: "নমস্কার! আমি আপনার মেডস্ক্রিপ্ট এআই ভার্চুয়াল মেডিক্যাল সহকারী। প্রেসক্রিপশনটি আমি বিশ্লেষণ করেছি।", phoneticSentence: "Nomoshkar! Aami aapnar MedScript AI virtual medical sahayak. Prescription aami bishleshan korechhi.", durationSec: 5.0, topic: 'intro' },
          { sentence: "ডাক্তারের রিপোর্ট বলছে, আপনার রক্তে শর্করার মাত্রা (HbA1c 7.2%) এবং রক্তচাপ ১৩৮/৮৮ কিছুটা বেশি রয়েছে।", phoneticSentence: "Doctor report bolchhe, aapnar rokte sugar-er maatra HbA1c 7.2% ebong roktachaap 138/88 kichhuta beshi aachhe.", durationSec: 5.5, topic: 'findings' },
          { sentence: "ওষুধগুলো হলো: মেটফর্মিন ৫০০ মিলিগ্রাম দিনে দুবার, টেলমিসারটান ৪০ মিলিগ্রাম সকালে, এবং অ্যাটোরভাস্ট্যাটিন ২০ মিলিগ্রাম রাতে।", phoneticSentence: "Oshudh gulo holo: Metformin 500 milligram dine dubaar, Telmisartan 40 milligram shokale, ebong Atorvastatin 20 milligram raate.", durationSec: 7.0, topic: 'meds' },
          { sentence: "রিপোর্টে লিউকোপেনিয়া লেখা রয়েছে, যা শ্বেত রক্তকণিকার সামান্য হ্রাস; এটি কোনো ক্যানসার বা লিউকেমিয়া নয়!", phoneticSentence: "Report-e Leukopenia lekha aachhe, ja shwet roktokonikaar samanyo hraash; eti kono cancer ba leukemia noy!", durationSec: 6.5, topic: 'clarification' },
          { sentence: "দুই সপ্তাহ পর পুনরায় সিবিসি রক্ত পরীক্ষা করিয়ে ডাক্তারের সাথে যোগাযোগ করুন।", phoneticSentence: "Dui shoptaaho por punoraay CBC blood test koriye doctor-er shathe jogajog korun.", durationSec: 4.5, topic: 'followup' }
        ]
      },
      mr: {
        language: 'mr',
        languageName: 'Marathi',
        simpleSummary: 'डॉ. सुरेश के. मेहता यांनी राजेश शर्मा यांच्यासाठी दिलेले प्रिस्क्रिप्शन. रक्तातील साखर (HbA1c 7.2%) व रक्तदाब (138/88) नियंत्रणासाठी ३ औषधे दिली आहेत.',
        explainLikeIm10: "रक्तातील साखरेचे प्रमाण (7.2%) थोडे वाढले आहे. ते नियंत्रणात ठेवण्यासाठी मेटफॉर्मिन, रक्तदाबासाठी टेलमिसार्टन आणि कोलेस्ट्रॉल नियंत्रणासाठी एटोरव्हास्टॅटिन गोळ्या दिल्या आहेत. ल्युकोपेनिया म्हणजे पांढऱ्या रक्तपेशींची सौम्य घट; हा कोणताही कर्करोग किंवा ल्युकेमिया नाही!",
        whatWasWritten: [
          'निदान: टाइप २ मधुमेह आणि उच्च रक्तदाब (Type 2 Diabetes & Hypertension).',
          'तपासणी: HbA1c 7.2%, रक्तदाब 138/88 mmHg.',
          'औषध १: Tab. Metformin 500 mg — जेवणानंतर दिवसातून २ वेळा (साखर नियंत्रण).',
          'औषध २: Tab. Telmisartan 40 mg — सकाळी १ वेळा (रक्तदाब नियंत्रण).',
          'औषध ३: Tab. Atorvastatin 20 mg — रात्री झोपताना (कोलेस्ट्रॉल व हृदय संरक्षण).',
          'फॉलो-अप: २ आठवड्यांनी पुन्हा सीबीसी (CBC) रक्त तपासणी.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-mr-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'गेल्या ३ महिन्यांतील रक्तातील साखरेची सरासरी पातळी.',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'याचा अर्थ लगेच इन्सुलिन सुरू करणे आवश्यक आहे असा नाही.',
            category: 'lab_value'
          },
          {
            id: 'term-mr-2',
            term: 'Leukopenia (ल्युकोपेनिया)',
            simpleMeaning: 'पांढऱ्या रक्तपेशींच्या संख्येत झालेली तात्पुरती सौम्य घट.',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'हा कोणत्याही प्रकारचा कर्करोग (कॅन्सर) किंवा ल्युकेमिया नाही.',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'रक्तदाब १३८/८८ mmHg नोंदवला गेला.',
          'साखर व रक्तदाब नियंत्रणासाठी ३ गोळ्या दिल्या आहेत.',
          'पांढऱ्या पेशींची स्थिती पाहण्यासाठी २ आठवड्यांनी पुन्हा रक्त तपासणी करण्यास सांगितले आहे.'
        ],
        whatIsUnclear: [
          'हस्ताक्षरात ल्युकोपेनिया शब्दाबाबत संशय होता, पण ही केवळ पेशींची सौम्य तात्पुरती घट आहे.'
        ],
        whatToAskDoctor: [
          'मेटफॉर्मिन गोळी जेवणानंतर लगेच घ्यावी का?',
          'दोन आठवड्यांनंतरच्या तपासणीसाठी उपाशीपोटी जावे लागेल का?'
        ],
        spokenScript: "नमस्कार! मी तुमचा मेडस्क्रिप्ट एआय व्हर्च्युअल वैद्यकीय सहाय्यक आहे. डॉ. सुरेश के. मेहता यांनी राजेश शर्मा यांच्यासाठी दिलेले प्रिस्क्रिप्शन मी तपासले आहे. डॉक्टरांचा रिपोर्ट सांगतो की, रक्तातील साखरेचे प्रमाण (HbA1c 7.2%) आणि रक्तदाब 138/88 थोडे जास्त आहे. यासाठी तुम्हाला घ्यावयाच्या गोळ्या: साखरेच्या नियंत्रणासाठी मेटफॉर्मिन 500 मिग्रॅ जेवणानंतर दिवसातून दोनदा. रक्तदाबासाठी टेलमिसार्टन 40 मिग्रॅ दररोज सकाळी एकदा. आणि कोलेस्ट्रॉल नियंत्रणासाठी एटोरव्हास्टॅटिन 20 मिग्रॅ रात्री झोपण्यापूर्वी. अत्यंत महत्त्वाची गोष्ट, प्रिस्क्रिप्शनमध्ये ल्युकोपेनिया लिहिले आहे; याचा अर्थ पांढऱ्या रक्तपेशींमध्ये झालेली तात्पुरती सौम्य घट आहे, हा कोणताही कर्करोग (कॅन्सर) किंवा ल्युकेमिया नाही! अजिबात घाबरू नका. दोन आठवड्यांनी पुन्हा सीबीसी रक्त तपासणी करण्याचा सल्ला डॉक्टरांनी दिला आहे.",
        spokenScriptPhonetic: "Namaskar! Mee tumcha MedScript AI virtual vaidyakeeya sahayyak aahe. Doctor Suresh Mehta yaanni dilele prescription mee tapasle aahe. Doctorancha report saangto ki, raktaatil saakhareche pramaan HbA1c 7.2% aani raktadaab 138/88 thode jaast aahe. Tyaasaathi ghyaavayaachya golya: Saakharechya niyanatranaasaathi Metformin 500 milligram jevananantar divasaatun donda. Raktadaabaasaathi Telmisartan 40 milligram sakali ekda. Aani cholesterol niyanatranaasaathi Atorvastatin 20 milligram raatri zhopnyapoorvi. Atyant mahattvaachi gosht, prescription madhye Leukopenia lihile aahe; yaacha arth paandharya raktapeshinmadhye jhaalele saumya ghat aahe, haa konthahi karkrog (cancer) kinva leukemia naahi! Ghabru naka. Don aathvadyanni punha CBC blood test karnyaacha salla doctoranni dila aahe.",
        sentenceTimings: [
          { sentence: "नमस्कार! मी तुमचा मेडस्क्रिप्ट एआय व्हर्च्युअल वैद्यकीय सहाय्यक आहे. प्रिस्क्रिप्शन मी तपासले आहे.", phoneticSentence: "Namaskar! Mee tumcha MedScript AI virtual vaidyakeeya sahayyak aahe. Prescription mee tapasle aahe.", durationSec: 5.0, topic: 'intro' },
          { sentence: "डॉक्टरांचा रिपोर्ट सांगतो की, साखरेचे प्रमाण (HbA1c 7.2%) आणि रक्तदाब 138/88 थोडे जास्त आहे.", phoneticSentence: "Doctorancha report saangto ki, saakhareche pramaan HbA1c 7.2% aani raktadaab 138/88 thode jaast aahe.", durationSec: 5.5, topic: 'findings' },
          { sentence: "औषधे: मेटफॉर्मिन 500 मिग्रॅ जेवणानंतर दिवसातून दोनदा, टेलमिसार्टन 40 मिग्रॅ सकाळी, आणि एटोरव्हास्टॅटिन 20 मिग्रॅ रात्री.", phoneticSentence: "Aushadhe: Metformin 500 milligram jevananantar donda, Telmisartan 40 milligram sakali, aani Atorvastatin 20 milligram raatri.", durationSec: 7.0, topic: 'meds' },
          { sentence: "प्रिस्क्रिप्शनमध्ये ल्युकोपेनिया लिहिले आहे; याचा अर्थ पांढऱ्या रक्तपेशींची सौम्य घट आहे, हा कॅन्सर किंवा ल्युकेमिया नाही!", phoneticSentence: "Prescription madhye Leukopenia lihile aahe; yaacha arth paandharya raktapeshinche saumya ghat aahe, haa cancer kinva leukemia naahi!", durationSec: 6.5, topic: 'clarification' },
          { sentence: "दोन आठवड्यांनी पुन्हा सीबीसी रक्त तपासणी करून डॉक्टरांचा सल्ला घ्या.", phoneticSentence: "Don aathvadyanni punha CBC blood test karun doctorancha salla ghya.", durationSec: 4.5, topic: 'followup' }
        ]
      }
    },
    rawOcrText: "Dr. K. Mehta, MD (Cardiology) - City Heart Care Clinic\nRx:\n1. Tab. Metformin 500mg - 1 Tab twice daily after meals (1-0-1)\n2. Tab. Telmisartan 40mg - 1 Tab once daily in the morning (1-0-0)\n3. Tab. Atorvastatin 20mg - 1 Tab once daily at bedtime (0-0-1)\nDx: Hypertension, T2DM, Mild Leukopenia (post-viral).\nInstructions: Low salt diet, monitor BP weekly, review in 2 weeks with repeat CBC.",
    structuredMeds: [
      {
        id: 'med-d1-1',
        name: 'Metformin',
        strength: '500 mg',
        dosage: '1 tablet (1-0-1)',
        frequency: 'Twice daily (BD)',
        duration: '30 days',
        route: 'Oral (PO)',
        timingInstructions: 'Morning and night',
        foodInstructions: 'After food (PC)',
        isVerified: true,
        confidence: null,
        rawLine: 'Tab. Metformin 500mg - 1 Tab twice daily after meals (1-0-1)',
        medicalMeaning: 'Blood glucose-lowering biguanide for type 2 diabetes.'
      },
      {
        id: 'med-d1-2',
        name: 'Telmisartan',
        strength: '40 mg',
        dosage: '1 tablet (1-0-0)',
        frequency: 'Once daily (OD)',
        duration: '30 days',
        route: 'Oral (PO)',
        timingInstructions: 'Morning',
        foodInstructions: 'After breakfast',
        isVerified: true,
        confidence: null,
        rawLine: 'Tab. Telmisartan 40mg - 1 Tab once daily in the morning (1-0-0)',
        medicalMeaning: 'Angiotensin receptor blocker to maintain healthy blood pressure.'
      },
      {
        id: 'med-d1-3',
        name: 'Atorvastatin',
        strength: '20 mg',
        dosage: '1 tablet (0-0-1)',
        frequency: 'Once daily (HS)',
        duration: '30 days',
        route: 'Oral (PO)',
        timingInstructions: 'Night at bedtime',
        foodInstructions: 'After dinner',
        isVerified: true,
        confidence: null,
        rawLine: 'Tab. Atorvastatin 20mg - 1 Tab once daily at bedtime (0-0-1)',
        medicalMeaning: 'Statin to lower LDL cholesterol and protect heart health.'
      }
    ],
    diagnoses: ['Essential Hypertension', 'Type 2 Diabetes Mellitus', 'Mild Leukopenia (Benign viral post-infection)'],
    instructions: ['Low sodium diet (<2g/day)', 'Check blood pressure twice weekly', 'Repeat CBC in 2 weeks'],
    labFindings: ['BP: 138/88 mmHg', 'RBS: 142 mg/dL', 'WBC: 3,800 /mcL (Mild Leukopenia)'],
    symptoms: ['Mild fatigue', 'Occasional morning headache'],
    separatedContent: {
      documentSays: [
        { category: 'Medication', field: 'Metformin', value: '500mg twice daily after meals (1-0-1)' },
        { category: 'Medication', field: 'Telmisartan', value: '40mg once daily in morning (1-0-0)' },
        { category: 'Medication', field: 'Atorvastatin', value: '20mg once daily at bedtime (0-0-1)' },
        { category: 'Clinical Note', field: 'Diagnosis', value: 'Hypertension, T2DM, Mild Leukopenia' },
        { category: 'Doctor Advice', field: 'Diet & Follow-up', value: 'Low salt diet, repeat CBC in 2 weeks' }
      ],
      termMeanings: [
        { term: 'Metformin', meaning: 'Controls blood glucose levels by improving insulin sensitivity.', caution: 'Do not discontinue without physician advice.' },
        { term: 'Telmisartan', meaning: 'Relaxes blood vessels to lower blood pressure.', caution: 'Maintain hydration and monitor for dizziness.' },
        { term: 'Leukopenia', meaning: 'Mild temporary drop in white blood cell count after a viral fever. NOT leukemia or cancer.', caution: 'Documented post-viral observation, not a malignant diagnosis.' }
      ],
      notDetermined: [
        { topic: 'Previous Chronic History', explanation: 'Prior cardiac events or long-term medication history are not listed on this paper.' },
        { topic: 'Drug Hypersensitivities', explanation: 'No allergic contraindications documented. Confirm with dispensing pharmacist.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'Google Gemini 2.5 Flash Multimodal Document AI',
      hasNumericalConfidence: false,
      averageConfidenceScore: null,
      providerNotice: 'Confidence score not provided by the document recognition service.'
    },
    serviceConfigured: true,
    get explanation(): DocumentExplanation {
      return (this.translations[this.selectedLanguage] || this.translations.en)!;
    }
  },

  // Document 2: Pediatric Prescription (Dr. Priya Nair)
  {
    id: 'demo-doc-2',
    name: 'Pediatric_Prescription_Aarav.png',
    type: 'prescription',
    imageDataUrl: createPrescription2Svg(),
    uploadedAt: new Date(Date.now() - 7200000).toISOString(),
    fileSize: 384000,
    isDemo: true,
    quality: {
      status: 'pass',
      overallScore: 92,
      blurScore: 94,
      darknessScore: 95,
      glareScore: 90,
      resolutionScore: 96,
      rotationAngle: -0.4,
      handwritingVisibilityScore: 88,
      issues: [],
      suggestions: [
        'Document lighting is good. Clear pediatric clinic markings detected.'
      ]
    },
    tokens: [
      { id: 'tok-p1', text: 'Child: Aarav Patel (9 Yrs / 27.5 kg)', confidence: 99, bbox: { x: 8, y: 20, width: 40, height: 4 }, category: 'patient_info', isUncertain: false },
      { id: 'tok-p2', text: 'Temp: 101.4°F | Acute Otitis Media', confidence: 97, bbox: { x: 55, y: 23, width: 35, height: 4 }, category: 'patient_info', isUncertain: false },
      { id: 'tok-p3', text: 'Acute Otitis Media (right ear congestion) + URTI', confidence: 95, bbox: { x: 8, y: 32, width: 80, height: 4 }, category: 'diagnosis', isUncertain: false, medicalMeaning: 'Middle ear infection with ear inflammation and common cold symptoms.' },
      { id: 'tok-p4', text: 'Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 ml PO BD', confidence: 94, bbox: { x: 8, y: 47, width: 62, height: 4 }, category: 'medication', isUncertain: false, medicalMeaning: 'An antibiotic syrup targeting bacterial middle ear and respiratory infections.' },
      { id: 'tok-p5', text: '5 days', confidence: 68, bbox: { x: 72, y: 47, width: 14, height: 4 }, category: 'instruction', isUncertain: true, alternatives: ['5 days', '7 days'], sourceCropUrl: create5DaysCropSvg(), medicalMeaning: 'Duration of antibiotic course.' },
      { id: 'tok-p6', text: 'Syp. Paracetamol 250mg/5ml — 5 ml SOS (fever > 100°F)', confidence: 97, bbox: { x: 8, y: 53, width: 75, height: 4 }, category: 'medication', isUncertain: false, medicalMeaning: 'Fever and pain relief liquid, to be given only as needed when temperature rises above 100°F.' },
      { id: 'tok-p7', text: 'Saline Nasal Drops — 2 drops each nostril TDS', confidence: 96, bbox: { x: 8, y: 58, width: 70, height: 4 }, category: 'medication', isUncertain: false, medicalMeaning: 'Gentle salt water nasal drops to clear nasal congestion and relieve eustachian tube pressure.' }
    ],
    uncertainWords: [
      {
        id: 'unc-p1',
        tokenId: 'tok-p5',
        extractedText: '5 days',
        confidence: 68,
        alternatives: ['5 days', '7 days'],
        isResolved: false,
        sourceCropUrl: create5DaysCropSvg(),
        sentenceContext: 'Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 ml PO BD x [5 days / 7 days]',
        question: 'What duration did the pediatrician specify for the antibiotic?'
      }
    ],
    allUncertainResolved: false,
    selectedLanguage: 'en',
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        { id: 'chk-p1', name: 'Pediatric Weight-Dosage Crosscheck', passed: true, details: 'Amoxicillin 250mg/5ml 5ml BD is appropriate for 27.5 kg.' },
        { id: 'chk-p2', name: 'Paracetamol SOS Verification', passed: true, details: 'Correct temperature threshold (> 100°F) verified.' },
        { id: 'chk-p3', name: 'Antibiotic Duration Flag', passed: true, details: 'Uncertainty between 5 vs 7 days flagged for guardian confirmation.' }
      ]
    },
    translations: {
      en: {
        language: 'en',
        languageName: 'English',
        simpleSummary: "This is a pediatric prescription from Dr. Priya Nair for 9-year-old Aarav Patel treating a right ear infection (Otitis Media) and cold with fever.",
        explainLikeIm10: "Aarav has an earache because germs got stuck behind his eardrum. The doctor gave a sweet antibiotic syrup to fight off the germs, fever medicine to use if his forehead feels too hot (over 100°F), and gentle nose drops to clear his nose so his ear can pop and feel better.",
        whatWasWritten: [
          'Diagnosis: Acute Otitis Media (right ear congestion) and Upper Respiratory Infection.',
          'Medication 1: Amoxicillin-Clavulanate syrup (250mg/5ml) — 5 ml twice daily.',
          'Unclear Duration: The handwriting for antibiotic duration appears as 5 days (68% confidence) or 7 days.',
          'Medication 2: Paracetamol syrup (250mg/5ml) — 5 ml only as needed if fever exceeds 100°F.',
          'Medication 3: Saline Nasal Drops — 2 drops in each nostril three times daily.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-p-1',
            term: 'Acute Otitis Media',
            simpleMeaning: 'An inflammation or bacterial infection of the middle ear space behind the eardrum.',
            documentContext: 'Acute Otitis Media (right ear congestion)',
            whatItDoesNotMean: 'It does not mean permanent hearing loss.',
            category: 'diagnosis'
          },
          {
            id: 'term-p-2',
            term: 'SOS (si opus sit)',
            simpleMeaning: 'A medical instruction meaning "as needed only", not a scheduled mandatory dose.',
            documentContext: '5 ml SOS (only if fever > 100°F)',
            whatItDoesNotMean: 'Do not give continuously every day if the child does not have fever or pain.',
            category: 'instruction'
          }
        ],
        whatDocumentSaysHappened: [
          'Aarav was examined for fever lasting 3 days and right ear pain.',
          'Ear examination confirmed congestion in the right tympanic membrane.',
          'Antibiotic and supportive nasal drops were prescribed.',
          'Follow-up advised if fever continues after 48 hours.'
        ],
        whatIsUnclear: [
          'Handwriting shows 68% confidence between 5 days and 7 days for the antibiotic course. In pediatric otitis media, 5 to 7 days is common, but doctor confirmation is recommended.'
        ],
        whatToAskDoctor: [
          'Should we continue the antibiotic for 5 full days or 7 full days?',
          'If Aarav vomits within 15 minutes of taking the syrup, should the dose be repeated?',
          'Can he swim or take a head bath while his ear has congestion?'
        ],
        spokenScript: "Hello, I am your MedScript AI Virtual Medical Explainer. I have analyzed the pediatric prescription from Dr. Priya Nair for Aarav. The diagnosis is an acute middle ear infection and cold. The doctor prescribed Amoxicillin-Clavulanate antibiotic syrup twice a day, and Paracetamol syrup only if his fever goes above 100 degrees Fahrenheit. Saline nasal drops will help relieve ear pressure. Please note that the antibiotic duration is unclear between 5 days and 7 days. It is critical to finish the exact duration prescribed by your pediatrician.",
        sentenceTimings: [
          { sentence: "Hello, I am your MedScript AI Virtual Medical Explainer.", durationSec: 3.5, topic: 'intro' },
          { sentence: "I have analyzed the pediatric prescription from Dr. Priya Nair for Aarav.", durationSec: 4.0, topic: 'review' },
          { sentence: "The diagnosis is an acute middle ear infection and cold.", durationSec: 3.8, topic: 'diagnosis' },
          { sentence: "The doctor prescribed Amoxicillin-Clavulanate antibiotic syrup twice a day,", durationSec: 4.8, topic: 'amoxicillin' },
          { sentence: "and Paracetamol syrup only if his fever goes above 100 degrees Fahrenheit.", durationSec: 4.5, topic: 'paracetamol' },
          { sentence: "Saline nasal drops will help relieve ear pressure.", durationSec: 3.5, topic: 'saline' },
          { sentence: "Please note that the antibiotic duration is unclear between 5 days and 7 days.", durationSec: 5.0, topic: 'uncertainty' },
          { sentence: "It is critical to finish the exact duration prescribed by your pediatrician.", durationSec: 4.2, topic: 'cta' }
        ]
      },
      te: {
        language: 'te',
        languageName: 'Telugu',
        simpleSummary: 'ఇది డాక్టర్ ప్రియా నాయర్ గారు 9 ఏళ్ల ఆరవ్ పటేల్ కోసం ఇచ్చిన చెవి ఇన్ఫెక్షన్ (Acute Otitis Media) మరియు జ్వరం ప్రిస్క్రిప్షన్.',
        explainLikeIm10: "ఆరవ్ కుడి చెవిలో ఇన్ఫెక్షన్ మరియు జలుబు ఉంది. యాంటీబయాటిక్ సిరప్ రోజుకు 2 సార్లు, జ్వరం 100 డిగ్రీల కంటే ఎక్కువ ఉంటే మాత్రమే పారాసిటమాల్, మరియు ముక్కు డ్రాప్స్ ఇవ్వబడ్డాయి. యాంటీబయాటిక్ కోర్సును డాక్టర్ చెప్పినన్ని రోజులు పూర్తిగా వాడాలి.",
        whatWasWritten: [
          'వ్యాధి నిర్ధారణ: ఎక్యూట్ ఓటైటిస్ మీడియా (కుడి చెవి ఇన్ఫెక్షన్) మరియు జలుబు.',
          'మందు 1: Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 ml రోజుకు 2 సార్లు భోజనం తర్వాత.',
          'మందు 2: Syp. Paracetamol 250mg/5ml — 5 ml (జ్వరం 100°F కంటే ఎక్కువ ఉంటే మాత్రమే).',
          'మందు 3: సెలైన్ నాసల్ డ్రాప్స్ — రోజుకు 3 సార్లు రెండు ముక్కు రంధ్రాలలో 2 చుక్కలు.',
          'జాగ్రత్త: 48 గంటల తర్వాత కూడా జ్వరం తగ్గకపోతే డాక్టర్‌ను కలవాలి.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-te-p1',
            term: 'Acute Otitis Media',
            simpleMeaning: 'మధ్య చెవిలో బ్యాక్టీరియా లేదా వైరస్ వల్ల వచ్చే తాత్కాలిక ఇన్ఫెక్షన్.',
            documentContext: 'Acute Otitis Media (right ear congestion)',
            whatItDoesNotMean: 'శాశ్వత వినికిడి లోపం కాదు; మందులతో నయమవుతుంది.',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          '3 రోజుల నుండి జ్వరం మరియు చెవి నొప్పి ఉన్నట్లు పరీక్షించారు.',
          'కుడి చెవి కర్ణభేరి వాపును గుర్తించి యాంటీబయాటిక్ సూచించారు.'
        ],
        whatIsUnclear: [
          'చేతిరాతలో యాంటీబయాటిక్ 5 రోజులా లేదా 7 రోజులా అన్నది స్పష్టంగా లేదు. వైద్యుడిని సంప్రదించి నిర్ధారించుకోవాలి.'
        ],
        whatToAskDoctor: [
          'యాంటీబయాటిక్ ఖచ్చితంగా 5 రోజులు వాడాలా లేక 7 రోజులా?',
          'సిరప్ వేసిన వెంటనే వాంతి చేసుకుంటే మళ్ళీ ఇవ్వాలా?'
        ],
        spokenScript: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని. ఆరవ్ కుడి చెవి ఇన్ఫెక్షన్ కోసం డాక్టర్ ప్రియా నాయర్ గారు ప్రిస్క్రిప్షన్ ఇచ్చారు. డాక్టర్ రిపోర్టు ఏమి చెబుతోందంటే, ఆరవ్‌కు కుడి చెవిలో ఇన్ఫెక్షన్ మరియు జ్వరం ఉన్నాయి. దీనికోసం అమోక్సిసిలిన్ యాంటీబయాటిక్ సిరప్ రోజుకు 2 సార్లు 5 ఎంఎల్ ఇవ్వాలి. జ్వరం 100 డిగ్రీల కంటే ఎక్కువ ఉంటే మాత్రమే పారాసిటమాల్ సిరప్ ఇవ్వాలి. ముఖ్యంగా, యాంటీబయాటిక్ 5 రోజులా లేక 7 రోజులా అన్నది చేతిరాతలో స్పష్టంగా లేదు, కాబట్టి మీ పిల్లల డాక్టర్‌ను అడిగి తెలుసుకోండి.",
        spokenScriptPhonetic: "Namaskaram! Nenu mee MedScript AI vaidya sahaayakudini. Aarav kudi chevi infection kosam Doctor Priya Nair gaaru prescription icharu. Doctor report emi chebuthondante, Aarav ku kudi cheviloo infection mariyu fever unnaayi. Deenikosam Amoxicillin antibiotic syrup roojuku 2 saarlu 5 ml ivvaali. Fever 100 degrees kante ekkuva unte maatrame Paracetamol syrup ivvaali. Mukhyamgaa, antibiotic 5 rojulaa leka 7 rojulaa annadi chethiraathaloo spashtamgaa ledu, kaabatti pillala doctor nu adigi thelusukondi.",
        sentenceTimings: [
          { sentence: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని. ఆరవ్ కుడి చెవి ఇన్ఫెక్షన్ ప్రిస్క్రిప్షన్‌ను పరిశీలించాను.", phoneticSentence: "Namaskaram! Nenu mee MedScript AI vaidya sahaayakudini. Aarav chevi infection prescription nu parishilinchanu.", durationSec: 5.5, topic: 'intro' },
          { sentence: "ఆరవ్‌కు కుడి చెవిలో ఇన్ఫెక్షన్ మరియు జ్వరం ఉన్నట్లు డాక్టర్ నిర్ధారించారు.", phoneticSentence: "Aarav ku kudi cheviloo infection mariyu fever unnatlu doctor nirdhaarinchaaru.", durationSec: 4.5, topic: 'diagnosis' },
          { sentence: "అమోక్సిసిలిన్ యాంటీబయాటిక్ సిరప్ రోజుకు 2 సార్లు 5 ఎంఎల్ ఇవ్వాలి, మరియు జ్వరం 100 డిగ్రీలు దాటితేనే పారాసిటమాల్ ఇవ్వాలి.", phoneticSentence: "Amoxicillin antibiotic syrup roojuku 2 saarlu 5 ml ivvaali, mariyu fever 100 degrees daatithene Paracetamol ivvaali.", durationSec: 6.5, topic: 'meds' },
          { sentence: "యాంటీబయాటిక్ 5 రోజులా లేక 7 రోజులా అన్నది చేతిరాతలో స్పష్టంగా లేదు, వైద్యుడిని సంప్రదించండి.", phoneticSentence: "Antibiotic 5 rojulaa leka 7 rojulaa annadi spashtamgaa ledu, vaidyudini sampradinchandi.", durationSec: 5.0, topic: 'uncertainty' }
        ]
      },
      hi: {
        language: 'hi',
        languageName: 'Hindi',
        simpleSummary: 'यह डॉ. प्रिया नायर द्वारा 9 वर्षीय आरव पटेल के कान के संक्रमण (एक्यूट ओटिटिस मीडिया) और बुखार के लिए लिखा गया पर्चा है।',
        explainLikeIm10: "आरव के दाहिने कान में संक्रमण (इंफेक्शन) और सर्दी-बुखार है। डॉक्टर ने इंफेक्शन खत्म करने के लिए एंटीबायोटिक सिरप दिन में 2 बार और 100°F से अधिक बुखार होने पर ही पैरासिटामोल देने को कहा है। एंटीबायोटिक का पूरा कोर्स समय पर खत्म करना बहुत जरूरी है।",
        whatWasWritten: [
          'निदान: एक्यूट ओटिटिस मीडिया (दाहिने कान का संक्रमण) और जुकाम।',
          'दवा 1: Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 मिली दिन में दो बार (भोजन के बाद)।',
          'दवा 2: Syp. Paracetamol 250mg/5ml — 5 मिली (केवल बुखार 100°F से अधिक होने पर)।',
          'दवा 3: सलाइन नेजल ड्रॉप्स — 2 बूंदें दिन में 3 बार दोनों नथुनों में।',
          'चेतावनी: यदि 48 घंटे बाद भी बुखार रहे या कान से मवाद बहे तो तुरंत डॉक्टर को दिखाएं।'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-hi-p1',
            term: 'Acute Otitis Media',
            simpleMeaning: 'मध्य कान में बैक्टीरिया के कारण होने वाला अल्पकालिक संक्रमण।',
            documentContext: 'Acute Otitis Media (right ear congestion)',
            whatItDoesNotMean: 'यह बहरेपन का लक्षण नहीं है; दवाओं से पूरी तरह ठीक हो जाता है।',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          '3 दिनों से बुखार और कान दर्द की जांच की गई।',
          'दाहिने कान के पर्दे में सूजन की पुष्टि के बाद एंटीबायोटिक दिया गया।'
        ],
        whatIsUnclear: [
          'एंटीबायोटिक 5 दिन लेनी है या 7 दिन, लिखावट में यह स्पष्ट नहीं है। बाल रोग विशेषज्ञ से पुष्टि अवश्य करें।'
        ],
        whatToAskDoctor: [
          'क्या एंटीबायोटिक 5 पूरे दिन देनी है या 7 दिन?',
          'यदि दवा देने के 15 मिनट में बच्चा उल्टी कर दे तो क्या दोबारा खुराक दें?'
        ],
        spokenScript: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई मेडिकल एक्सप्लेनर हूँ। आरव के कान के संक्रमण के लिए डॉक्टर प्रिया नायर द्वारा दिए गए पर्चे की जांच कर ली गई है। डॉक्टर की रिपोर्ट बताती है कि आरव के दाहिने कान में इंफेक्शन और बुखार है। इसके लिए अमोक्सिसिलिन एंटीबायोटिक सिरप दिन में दो बार 5 मिली देना है। पैरासिटामोल सिरप केवल तब दें जब बुखार 100 डिग्री से ऊपर हो। ध्यान दें कि लिखावट में एंटीबायोटिक 5 दिन या 7 दिन को लेकर संशय है, इसलिए डॉक्टर से इसकी पुष्टि जरूर कर लें।",
        spokenScriptPhonetic: "Namaste! Main aapka MedScript AI medical explainer hoon. Aarav ke kaan ke infection ke liye Doctor Priya Nair dwara diye gaye parche ki jaanch kar li gayi hai. Doctor ki report batati hai ki Aarav ke dahine kaan mein infection aur bukhar hai. Iske liye Amoxicillin antibiotic syrup din mein do baar 5 ml dena hai. Paracetamol syrup keval tab dein jab bukhar 100 degree se upar ho. Dhyan dein ki likhawat mein antibiotic 5 din ya 7 din ko lekar sanshay hai, isliye doctor se pushti zaroor kar lein.",
        sentenceTimings: [
          { sentence: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई मेडिकल एक्सप्लेनर हूँ। आरव के कान के पर्चे की जांच कर ली गई है।", phoneticSentence: "Namaste! Main aapka MedScript AI medical explainer hoon. Aarav ke parche ki jaanch kar li gayi hai.", durationSec: 5.0, topic: 'intro' },
          { sentence: "डॉक्टर की रिपोर्ट बताती है कि आरव के दाहिने कान में इंफेक्शन और सर्दी-बुखार है।", phoneticSentence: "Doctor ki report batati hai ki Aarav ke dahine kaan mein infection aur bukhar hai.", durationSec: 5.0, topic: 'diagnosis' },
          { sentence: "अमोक्सिसिलिन एंटीबायोटिक सिरप दिन में 2 बार 5 मिली दें, और पैरासिटामोल केवल तेज बुखार पर दें।", phoneticSentence: "Amoxicillin antibiotic syrup din mein 2 baar 5 ml dein, aur Paracetamol keval tez bukhar par dein.", durationSec: 6.0, topic: 'meds' },
          { sentence: "एंटीबायोटिक 5 दिन देनी है या 7 दिन, लिखावट में यह स्पष्ट नहीं है, डॉक्टर से पुष्टि करें।", phoneticSentence: "Antibiotic 5 din deni hai ya 7 din, likhawat mein yeh spasht nahi hai, doctor se pushti karein.", durationSec: 5.5, topic: 'uncertainty' }
        ]
      },
      ta: {
        language: 'ta',
        languageName: 'Tamil',
        simpleSummary: 'டாக்டர் பிரியா நாயர் 9 வயது ஆரவ் படேலுக்கு வழங்கிய காது தொற்று (Acute Otitis Media) மற்றும் சளி காய்ச்சலுக்கான மருந்துச் சீட்டு.',
        explainLikeIm10: "ஆரவ்வுக்கு வலது காதில் லேசான தொற்று மற்றும் சளி காய்ச்சல் உள்ளது. தொற்றை குணப்படுத்த அமாக்ஸிகிலின் சிரப் தினமும் இருவேளை கொடுக்க வேண்டும். காய்ச்சல் 100°F மேல் இருந்தால் மட்டுமே பாராசிட்டமால் கொடுக்க வேண்டும். மூக்கடைப்பை போக்க சலைன் சொட்டு மருந்து தரப்பட்டுள்ளது. ஆன்டிபயாடிக்கை மருத்துவர் கூறிய நாட்கள் முழுவதும் தவறாமல் தர வேண்டும்.",
        whatWasWritten: [
          'நோய் கண்டறிதல்: வலது காதில் கடுமையான இடைச்செவி தொற்று மற்றும் சளி (Acute Otitis Media & Upper Respiratory Infection).',
          'மருந்து 1: Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 மிலி தினமும் இருவேளை (உணவுக்குப் பின்).',
          'மருந்து 2: Syp. Paracetamol 250mg/5ml — 5 மிலி (காய்ச்சல் 100°F க்கு மேல் இருந்தால் மட்டும்).',
          'மருந்து 3: சலைன் நாசி சொட்டு மருந்து — 2 சொட்டுகள் மூக்கின் இருபுறமும் உணவுக்கு முன் 3 முறை.',
          'எச்சரிக்கை: 48 மணி நேரத்திற்குப் பிறகும் காய்ச்சல் நீடித்தால் அல்லது காதில் சீழ் வடிந்தால் மருத்துவரை மீண்டும் அணுகவும்.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-ta-p1',
            term: 'Acute Otitis Media',
            simpleMeaning: 'நடுக்காதில் ஏற்படும் தற்காலிக பாக்டீரியா அல்லது வைரஸ் தொற்று.',
            documentContext: 'Acute Otitis Media (right ear congestion)',
            whatItDoesNotMean: 'இது நிரந்தர காது கேளாமை அல்ல; மருந்துகளால் எளிதில் குணமாகும்.',
            category: 'diagnosis'
          },
          {
            id: 'term-ta-p2',
            term: 'Amoxicillin-Clavulanate',
            simpleMeaning: 'காது தொற்றை நீக்கும் குழந்தைகளுக்கான பாதுகாப்பான ஆன்டிபயாடிக் மருந்து.',
            documentContext: 'Syp. Amoxicillin-Clavulanate 250mg/5ml',
            whatItDoesNotMean: 'காய்ச்சல் மாத்திரை அல்ல; தொற்றை அழிக்கும் ஆன்டிபயாடிக்.',
            category: 'medication'
          }
        ],
        whatDocumentSaysHappened: [
          '3 நாட்களாக காய்ச்சல் மற்றும் காது வலி இருந்ததாக பரிசோதிக்கப்பட்டது.',
          'வலது செவிப்பறை சிவந்து வீங்கியிருப்பது உறுதி செய்யப்பட்டு மருந்துகள் தரப்பட்டன.'
        ],
        whatIsUnclear: [
          'ஆன்டிபயாடிக் 5 நாட்களா அல்லது 7 நாட்களா என்பதில் கையெழுத்தில் தெளிவின்மை உள்ளது. குழந்தைகள் நல மருத்துவரிடம் கேட்டு நாட்களின் எண்ணிக்கையை உறுதி செய்ய வேண்டும்.'
        ],
        whatToAskDoctor: [
          'ஆன்டிபயாடிக் சிரப்பை சரியாக 5 நாட்கள் தர வேண்டுமா அல்லது 7 நாட்கள் தர வேண்டுமா?',
          'மருந்து குடித்த 15 நிமிடங்களுக்குள் குழந்தை வாந்தி எடுத்தால் மீண்டும் மருந்து தர வேண்டுமா?'
        ],
        spokenScript: "வணக்கம்! நான் உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். குழந்தை ஆரவ்வுக்கு டாக்டர் பிரியா நாயர் வழங்கிய மருந்துச் சீட்டைப் பரிசீலனை செய்துள்ளேன். டாக்டர் ரிப்போர்ட் என்ன சொல்லுதுன்னா, ஆரவ்வுக்கு வலது காதில் தொற்று மற்றும் சளி காய்ச்சல் உள்ளது. இதற்காகக் கொடுக்கப்பட்டுள்ள மருந்துகள்: முதலாவதாக, காது தொற்றை குணப்படுத்த அமாக்ஸிகிலின்-கிளாவுலனேட் ஆன்டிபயாடிக் சிரப் தினமும் இருவேளை 5 மிலி உணவுக்குப் பின் கொடுக்க வேண்டும். இரண்டாவதாக, காய்ச்சல் 100 டிகிரிக்கு மேல் இருந்தால் மட்டுமே பாராசிட்டமால் சிரப் 5 மிலி கொடுக்க வேண்டும். மூன்றாவதாக, மூக்கடைப்பை நீக்க சலைன் நாசி சொட்டு மருந்து இரு துளிகள் விட வேண்டும். மிக முக்கியமாக, ஆன்டிபயாடிக் 5 நாட்களா அல்லது 7 நாட்களா என்பதில் கையெழுத்து தெளிவின்மை உள்ளது. எனவே ஆன்டிபயாடிக்கை எத்தனை நாட்கள் தொடர்ந்து தர வேண்டும் என்பதை உங்கள் குழந்தைகள் மருத்துவரிடம் கேட்டு உறுதிசெய்து கொள்ளவும்.",
        spokenScriptPhonetic: "Vanakkam! Naan ungal MedScript AI maruthuva udhaviyaalar. Kuzhandhai Aaravukku doctor Priya Nair vazhangiya marundhu seetai pariseelanai seidhen. Doctor report enna solludhuna, Aaravukku valadhu kaadhil thotru matrum fever ulladhu. Idharkaaga kodukkappatta marundhugal: Mudhalil, kaadhu thotrai gunapadutha Amoxicillin-Clavulanate antibiotic syrup thinamum iruvelai 5 ml unavukku pinbu thara vendum. Irandavadhaga, kaichal 100 degree kku mel irundhaal mattume Paracetamol syrup 5 ml thara vendum. Moondravadhaga, saline nasal drops iru thuligal vida vendum. Miga mukkiyamaaga, antibiotic 5 naatkalaa alladhu 7 naatkalaa enbadhil kaiyezhuthu thelivinmai ulladhu. Adhanaal doctor idam ketkavum.",
        sentenceTimings: [
          { sentence: "வணக்கம்! நான் உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். குழந்தை ஆரவ்வின் மருந்துச் சீட்டைப் பரிசீலனை செய்துள்ளேன்.", phoneticSentence: "Vanakkam! Naan ungal MedScript AI maruthuva udhaviyaalar. Aarav-in prescription pariseelanai seidhen.", durationSec: 5.5, topic: 'intro' },
          { sentence: "டாக்டர் ரிப்போர்ட் என்ன சொல்லுதுன்னா, ஆரவ்வுக்கு வலது காதில் தொற்று மற்றும் சளி காய்ச்சல் உள்ளது.", phoneticSentence: "Doctor report enna solludhuna, Aaravukku valadhu kaadhil thotru matrum fever ulladhu.", durationSec: 5.5, topic: 'diagnosis' },
          { sentence: "காது தொற்றை குணப்படுத்த அமாக்ஸிகிலின் ஆன்டிபயாடிக் சிரப் தினமும் இருவேளை 5 மிலி கொடுக்க வேண்டும்.", phoneticSentence: "Kaadhu thotrai gunapadutha Amoxicillin antibiotic syrup thinamum iruvelai 5 ml thara vendum.", durationSec: 6.0, topic: 'amoxicillin' },
          { sentence: "காய்ச்சல் 100 டிகிரிக்கு மேல் இருந்தால் மட்டுமே பாராசிட்டமால் சிரப் 5 மிலி கொடுக்க வேண்டும்.", phoneticSentence: "Kaichal 100 degree kku mel irundhaal mattume Paracetamol syrup 5 ml thara vendum.", durationSec: 5.5, topic: 'paracetamol' },
          { sentence: "ஆன்டிபயாடிக் 5 நாட்களா அல்லது 7 நாட்களா என்பதில் கையெழுத்து தெளிவின்மை உள்ளது; மருத்துவரிடம் உறுதி செய்யவும்.", phoneticSentence: "Antibiotic 5 naatkalaa alladhu 7 naatkalaa enbadhil kaiyezhuthu thelivinmai ulladhu; doctor idam ketkavum.", durationSec: 6.5, topic: 'uncertainty' }
        ]
      },
      kn: {
        language: 'kn',
        languageName: 'Kannada',
        simpleSummary: 'ಡಾ. ಪ್ರಿಯಾ ನಾಯರ್ ಅವರು 9 ವರ್ಷದ ಆರವ್ ಪಟೇಲ್ ಅವರ ಕಿವಿ ಸೋಂಕು ಮತ್ತು ಜ್ವರಕ್ಕೆ ನೀಡಿದ ಚೀಟಿ.',
        explainLikeIm10: "ಆರವ್‌ನ ಬಲ ಕಿವಿಯಲ್ಲಿ ಸೋಂಕು ಮತ್ತು ಶೀತ ಜ್ವರವಿದೆ. ಸೋಂಕು ನಿವಾರಣೆಗೆ ಅಮೋಕ್ಸಿಸಿಲಿನ್ ಸಿರಪ್ ದಿನಕ್ಕೆ 2 ಬಾರಿ, ಮತ್ತು ಜ್ವರ 100°F ಗಿಂತ ಹೆಚ್ಚಿದ್ದರೆ ಮಾತ್ರ ಪ್ಯಾರಸಿಟಮಾಲ್ ನೀಡಲು ಸೂಚಿಸಲಾಗಿದೆ.",
        whatWasWritten: [
          'ರೋಗನಿರ್ಣಯ: ಬಲ ಕಿವಿ ಸೋಂಕು (Acute Otitis Media) ಮತ್ತು ಶೀತ ಜ್ವರ.',
          'ಔಷಧಿ 1: Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 ml ದಿನಕ್ಕೆ 2 ಬಾರಿ.',
          'ಔಷಧಿ 2: Syp. Paracetamol 250mg/5ml — 5 ml (ಜ್ವರ 100°F ಗಿಂತ ಹೆಚ್ಚಿದ್ದಾಗ ಮಾತ್ರ).',
          'ಔಷಧಿ 3: ಸಲೈನ್ ನಾಸಲ್ ಡ್ರಾಪ್ಸ್ — ದಿನಕ್ಕೆ 3 ಬಾರಿ 2 ಹನಿಗಳು.'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['3 ದಿನಗಳ ಜ್ವರ ಮತ್ತು ಕಿವಿ ನೋವಿನ ನಂತರ ತಪಾಸಣೆ ಮಾಡಲಾಯಿತು.'],
        whatIsUnclear: ['ಆಂಟಿಬಯೋಟಿಕ್ 5 ದಿನಗಳೋ ಅಥವಾ 7 ದಿನಗಳೋ ಎಂಬ ಬಗ್ಗೆ ಚೀಟಿಯಲ್ಲಿ ಅಸ್ಪಷ್ಟತೆಯಿದೆ.'],
        whatToAskDoctor: ['ಆಂಟಿಬಯೋಟಿಕ್ ಸಿರಪ್ ಎಷ್ಟು ದಿನಗಳವರೆಗೆ ನೀಡಬೇಕು?'],
        spokenScript: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ವೈದ್ಯಕೀಯ ವಿವರಣೆಗಾರ. ಆರವ್‌ನ ಕಿವಿ ಸೋಂಕಿಗೆ ಡಾ. ಪ್ರಿಯಾ ನಾಯರ್ ಅವರು ನೀಡಿದ ಚೀಟಿಯನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. ಆರವ್‌ನ ಬಲ ಕಿವಿಯಲ್ಲಿ ಸೋಂಕು ಇದೆ. ಅಮೋಕ್ಸಿಸಿಲಿನ್ ಆಂಟಿಬಯೋಟಿಕ್ ಸಿರಪ್ ದಿನಕ್ಕೆ 2 ಬಾರಿ 5 ಮಿಲಿ ನೀಡಬೇಕು. ಜ್ವರ 100 ಡಿಗ್ರಿಗಿಂತ ಹೆಚ್ಚಿದ್ದಾಗ ಮಾತ್ರ ಪ್ಯಾರಸಿಟಮಾಲ್ ನೀಡಿ. ಆಂಟಿಬಯೋಟಿಕ್ 5 ದಿನವೋ ಅಥವಾ 7 ದಿನವೋ ಎಂಬುದು ಅಸ್ಪಷ್ಟವಾಗಿದೆ, ದಯವಿಟ್ಟು ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        spokenScriptPhonetic: "Namaskara! Naanu nimma MedScript AI vaidyakeeya vivaranegaara. Aarav-na kivi sonkige Doctor Priya Nair needida prescription parishilisiddene. Aarav-na bala kiviyalli sonku ide. Amoxicillin antibiotic syrup dinakke 2 baari 5 ml needabeku. Jwara 100 degree gintha hecchiddaga maathra Paracetamol needi. Antibiotic 5 dinavo athava 7 dinavo embudu aspashtavaagide, doctor annu vicharisi.",
        sentenceTimings: [
          { sentence: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ವೈದ್ಯಕೀಯ ವಿವರಣೆಗಾರ. ಚೀಟಿಯನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ.", phoneticSentence: "Namaskara! Naanu nimma MedScript AI vaidyakeeya vivaranegaara. Prescription parishilisiddene.", durationSec: 5.0, topic: 'intro' },
          { sentence: "ಆರವ್‌ನ ಬಲ ಕಿವಿಯಲ್ಲಿ ಸೋಂಕು ಮತ್ತು ಶೀತ ಜ್ವರವಿದೆ ಎಂದು ವೈದ್ಯರು ತಿಳಿಸಿದ್ದಾರೆ.", phoneticSentence: "Aarav-na bala kiviyalli sonku matthu jwaravide endu doctor thilisiddare.", durationSec: 5.0, topic: 'diagnosis' },
          { sentence: "ಅಮೋಕ್ಸಿಸಿಲಿನ್ ಸಿರಪ್ ದಿನಕ್ಕೆ 2 ಬಾರಿ ಮತ್ತು ಜ್ವರವಿದ್ದರೆ ಮಾತ್ರ ಪ್ಯಾರಸಿಟಮಾಲ್ ನೀಡಿ.", phoneticSentence: "Amoxicillin syrup dinakke 2 baari matthu jwaraviddare maathra Paracetamol needi.", durationSec: 5.5, topic: 'meds' },
          { sentence: "ಆಂಟಿಬಯೋಟಿಕ್ ಅವಧಿ 5 ಅಥವಾ 7 ದಿನಗಳ ಬಗ್ಗೆ ವೈದ್ಯರಿಂದ ಸ್ಪಷ್ಟತೆ ಪಡೆದುಕೊಳ್ಳಿ.", phoneticSentence: "Antibiotic avadhi 5 athava 7 dinagala bagge doctor-inda spashtathe padeyiri.", durationSec: 5.0, topic: 'uncertainty' }
        ]
      },
      ml: {
        language: 'ml',
        languageName: 'Malayalam',
        simpleSummary: 'ഡോ. പ്രിയ നായർ 9 വയസ്സുള്ള ആരവ് പട്ടേലിന് നൽകിയ കുറിപ്പടി. ചെവിയിലെ അണുബാധയ്ക്കും പനിക്കും ഉള്ള മരുന്നുകൾ.',
        explainLikeIm10: "ആരവിന്റെ വലതു ചെവിയിൽ അണുബാധയും ജലദോഷപ്പനിയുമുണ്ട്. അണുബാധ മാറാൻ അമോക്സിസിലിൻ സിറപ്പ് ദിവസവും 2 നേരം നൽകണം. പനി 100°F ൽ കൂടുതലാണെങ്കിൽ മാത്രം പാരസെറ്റമോൾ നൽകുക.",
        whatWasWritten: [
          'രോഗനിർണയം: അക്യൂട്ട് ഓട്ടിറ്റിസ് മീഡിയ (വലതു ചെവിയിലെ അണുബാധ).',
          'മരുന്ന് 1: Syp. Amoxicillin-Clavulanate 250mg/5ml — 5 ml ദിവസവും 2 നേരം.',
          'മരുന്ന് 2: Syp. Paracetamol 250mg/5ml — 5 ml (പനി 100°F ൽ കൂടുതലാണെങ്കിൽ മാത്രം).'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['3 ദിവസത്തെ പനിയും ചെവി വേദനയും പരിശോധിച്ചു.'],
        whatIsUnclear: ['ആന്റിബയോട്ടിക് 5 ദിവസമാണോ 7 ദിവസമാണോ എന്നതിൽ വ്യക്തതയില്ല.'],
        whatToAskDoctor: ['ആന്റിബയോട്ടിക് എത്ര ദിവസം തുടർച്ചയായി നൽകണം?'],
        spokenScript: "നമസ്കാരം! ഞാൻ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായിയാണ്. കുട്ടിയുടെ ചെവിയിലെ അണുബാധയ്ക്കുള്ള കുറിപ്പടി പരിശോധിച്ചു. ആരവിന്റെ വലതു ചെവിയിലാണ് അണുബാധയുള്ളത്. അമോക്സിസിലിൻ സിറപ്പ് ദിവസവും 2 നേരം 5 മില്ലി നൽകുക. പനി കൂടിയാൽ മാത്രം പാരസെറ്റമോൾ കൊടുക്കുക. ആന്റിബയോട്ടിക് 5 ദിവസമോ 7 ദിവസമോ എന്നതിൽ സംശയമുള്ളതിനാൽ ഡോക്ടറോട് ചോദിച്ചുറപ്പാക്കുക.",
        spokenScriptPhonetic: "Namaskaram! Njaan MedScript AI medical sahaayiyaanu. Kuttriyude cheviyile anubadhakkayulla prescription parishodhichu. Aarav-nte valathu cheviyilaanu anubadha. Amoxicillin syrup divasavum 2 neram 5 ml nalkuka. Pani koodiyaal maathram Paracetamol kodukkuka. Antibiotic 5 divasamo 7 divasamo ennathil doctorodu chodhikkuka.",
        sentenceTimings: [
          { sentence: "നമസ്കാരം! ഞാൻ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായിയാണ്. കുറിപ്പടി പരിശോധിച്ചു.", phoneticSentence: "Namaskaram! Njaan MedScript AI medical sahaayiyaanu. Prescription parishodhichu.", durationSec: 5.0, topic: 'intro' },
          { sentence: "ആരവിന്റെ വലതു ചെവിയിൽ അണുബാധയും പനിയുമുള്ളതായി ഡോക്ടർ കണ്ടെത്തി.", phoneticSentence: "Aarav-nte valathu cheviyil anubadhayum paniyumullathaayi doctor kandethi.", durationSec: 5.0, topic: 'diagnosis' },
          { sentence: "അമോക്സിസിലിൻ സിറപ്പ് ദിവസവും 2 നേരം നൽകുക, പനി കൂടിയാൽ മാത്രം പാരസെറ്റമോൾ നൽകുക.", phoneticSentence: "Amoxicillin syrup divasavum 2 neram nalkuka, pani koodiyaal maathram Paracetamol nalkuka.", durationSec: 5.5, topic: 'meds' },
          { sentence: "ആന്റിബയോട്ടിക് കാലാവധി ഡോക്ടറോട് ചോദിച്ചുറപ്പാക്കുക.", phoneticSentence: "Antibiotic kaalaavadhi doctorodu chodhicshurappaakkuka.", durationSec: 4.5, topic: 'uncertainty' }
        ]
      },
      bn: {
        language: 'bn',
        languageName: 'Bengali',
        simpleSummary: 'ডাঃ প্রিয়া নায়ার কর্তৃক ৯ বছর বয়সী আরভ প্যাটেলের কানের সংক্রমণ ও জ্বরের প্রেসক্রিপশন।',
        explainLikeIm10: "আরভের ডান কানে সংক্রমণ ও সর্দি জ্বর হয়েছে। সংক্রমণ নিরাময়ে অ্যামোক্সিসিলিন অ্যান্টিবায়োটিক সিরাপ দিনে ২ বার এবং ১০০ ডিগ্রির বেশি জ্বর হলে তবেই প্যারাসিটামল সিরাপ দিতে হবে।",
        whatWasWritten: [
          'রোগ নির্ণয়: তীব্র কানের সংক্রমণ (Acute Otitis Media) ও জ্বর।',
          'ওষুধ ১: Syp. Amoxicillin-Clavulanate 250mg/5ml — ৫ মিলি দিনে দুবার।',
          'ওষুধ ২: Syp. Paracetamol 250mg/5ml — ৫ মিলি (কেবল ১০০°F এর বেশি জ্বর হলে)।'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['৩ দিন ধরে জ্বর ও কান ব্যথার পরীক্ষা করা হয়েছে।'],
        whatIsUnclear: ['অ্যান্টিবায়োটিক ৫ দিন নাকি ৭ দিন দিতে হবে তা লেখায় অস্পষ্ট।'],
        whatToAskDoctor: ['অ্যান্টিবায়োটিক ঠিক কতদিন খাওয়াতে হবে?'],
        spokenScript: "নমস্কার! আমি আপনার মেডস্ক্রিপ্ট এআই মেডিক্যাল সহকারী। আরভের কানের সংক্রমণের প্রেসক্রিপশন বিশ্লেষণ করেছি। আরভের ডান কানে সংক্রমণ ও জ্বর রয়েছে। এর জন্য অ্যামোক্সিসিলিন অ্যান্টিবায়োটিক সিরাপ দিনে দুবার ৫ মিলি দিতে হবে। জ্বর ১০০ ডিগ্রির উপরে উঠলে তবেই প্যারাসিটামল দিন। অ্যান্টিবায়োটিক ৫ দিন নাকি ৭ দিন তা নিয়ে কিছুটা অস্পষ্টতা রয়েছে, ডাক্তারের সাথে নিশ্চিত হন।",
        spokenScriptPhonetic: "Nomoshkar! Aami aapnar MedScript AI medical sahayak. Aarav-er kaaner infection-er prescription bishleshan korechhi. Aarav-er daan kaane infection o jwor aachhe. Er jonno Amoxicillin antibiotic syrup dine dubaar 5 ml dite hobe. Jwor 100 degree-r beshi hole tobei Paracetamol din. Antibiotic 5 din naki 7 din ta doctor-er kachhe nishchit korun.",
        sentenceTimings: [
          { sentence: "নমস্কার! আমি আপনার মেডস্ক্রিপ্ট এআই মেডিক্যাল সহকারী। প্রেসক্রিপশনটি বিশ্লেষণ করেছি।", phoneticSentence: "Nomoshkar! Aami aapnar MedScript AI medical sahayak. Prescription bishleshan korechhi.", durationSec: 5.0, topic: 'intro' },
          { sentence: "আরভের ডান কানে তীব্র সংক্রমণ ও সর্দি জ্বর ধরা পড়েছে।", phoneticSentence: "Aarav-er daan kaane infection o jwor dhora porechhe.", durationSec: 4.5, topic: 'diagnosis' },
          { sentence: "অ্যামোক্সিসিলিন সিরাপ দিনে ২ বার এবং জ্বর বাড়লে প্যারাসিটামল দিন।", phoneticSentence: "Amoxicillin syrup dine 2 baar ebong jwor baadhle Paracetamol din.", durationSec: 5.0, topic: 'meds' },
          { sentence: "অ্যান্টিবায়োটিকের সময়সীমা ৫ নাকি ৭ দিন, তা ডাক্তারের সাথে নিশ্চিত হন।", phoneticSentence: "Antibiotic-er shomoyshima 5 naki 7 din, ta doctor-er shathe nishchit hon.", durationSec: 5.0, topic: 'uncertainty' }
        ]
      },
      mr: {
        language: 'mr',
        languageName: 'Marathi',
        simpleSummary: 'डॉ. प्रिया नायर यांनी ९ वर्षीय आरव पटेलच्या कानातील संसर्ग व तापासाठी दिलेले प्रिस्क्रिप्शन.',
        explainLikeIm10: "आरवच्या उजव्या कानात संसर्ग (इंफेक्शन) आणि ताप आला आहे. संसर्ग बरा करण्यासाठी अमोक्सिसिलिन सिरप दिवसातून २ वेळा आणि १००°F पेक्षा जास्त ताप आल्यासच पॅरासिटामॉल द्यावे.",
        whatWasWritten: [
          'निदान: उजव्या कानाचा संसर्ग (Acute Otitis Media) व सर्दी-ताप.',
          'औषध १: Syp. Amoxicillin-Clavulanate 250mg/5ml — ५ मिली दिवसातून २ वेळा.',
          'औषध २: Syp. Paracetamol 250mg/5ml — ५ मिली (फक्त १००°F पेक्षा जास्त ताप आल्यास).'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['३ दिवसांचा ताप आणि कानदुखी तपासण्यात आली.'],
        whatIsUnclear: ['अँटिबायोटिक ५ दिवस घ्यायचे की ७ दिवस, यात हस्ताक्षरात संशय आहे.'],
        whatToAskDoctor: ['अँटिबायोटिक सिरप नक्की किती दिवस द्यायचे?'],
        spokenScript: "नमस्कार! मी तुमचा मेडस्क्रिप्ट एआय वैद्यकीय सहाय्यक आहे. आरवच्या कानाच्या संसर्गाचे प्रिस्क्रिप्शन तपासले गेले आहे. आरवच्या उजव्या कानात संसर्ग आणि ताप आहे. अमोक्सिसिलिन अँटिबायोटिक सिरप दिवसातून दोनदा ५ मिली द्या. ताप १०० डिग्रीपेक्षा जास्त असल्यासच पॅरासिटामॉल द्या. अँटिबायोटिक ५ दिवस द्यायचे की ७ दिवस याबद्दल डॉक्टरांशी संपर्क साधा.",
        spokenScriptPhonetic: "Namaskar! Mee tumcha MedScript AI vaidyakeeya sahayyak aahe. Aaravchya kaanachya infectionche prescription tapasle aahe. Aaravchya ujvya kaanat infection aani taap aahe. Amoxicillin antibiotic syrup divasaatun donda 5 ml dya. Taap 100 degree peksha jaast aslyaasach Paracetamol dya. Antibiotic 5 divas ki 7 divas yaabaddal doctoranshee samparka saadha.",
        sentenceTimings: [
          { sentence: "नमस्कार! मी तुमचा मेडस्क्रिप्ट एआय वैद्यकीय सहाय्यक आहे. प्रिस्क्रिप्शन तपासले गेले आहे.", phoneticSentence: "Namaskar! Mee tumcha MedScript AI vaidyakeeya sahayyak aahe. Prescription tapasle aahe.", durationSec: 5.0, topic: 'intro' },
          { sentence: "आरवच्या उजव्या कानात संसर्ग आणि ताप असल्याचे निदान झाले आहे.", phoneticSentence: "Aaravchya ujvya kaanat infection aani taap aslyache nidaan jhaale aahe.", durationSec: 4.5, topic: 'diagnosis' },
          { sentence: "अमोक्सिसिलिन सिरप दिवसातून २ वेळा द्या आणि ताप आल्यावरच पॅरासिटामॉल द्या.", phoneticSentence: "Amoxicillin syrup divasaatun 2 vela dya aani taap aalyavarach Paracetamol dya.", durationSec: 5.5, topic: 'meds' },
          { sentence: "अँटिबायोटिक ५ दिवस की ७ दिवस, याबद्दल डॉक्टरांकडून खात्री करून घ्या.", phoneticSentence: "Antibiotic 5 divas ki 7 divas, yaabaddal doctorankadun khaatri karun ghya.", durationSec: 5.0, topic: 'uncertainty' }
        ]
      }
    },
    rawOcrText: "Dr. Priya Nair, MD (Pediatrics) - Rainbow Children Clinic\nPatient: Master Aarav (4 Y / Male)\nRx:\n1. Syr. Amoxicillin 250mg/5ml - 5ml twice daily (1-0-1) for 5-7 days\n2. Syr. Paracetamol 250mg/5ml - 5ml SOS for fever > 100 F\nDx: Acute Otitis Media (Right ear), Fever\nInstructions: Plenty of fluids, keep ear dry, review after 5 days.",
    structuredMeds: [
      {
        id: 'med-d2-1',
        name: 'Amoxicillin',
        strength: '250 mg / 5ml',
        dosage: '5 ml',
        frequency: 'Twice daily (BD)',
        duration: '5 to 7 days',
        route: 'Oral (PO)',
        timingInstructions: 'Morning and evening',
        foodInstructions: 'After meals',
        isVerified: true,
        confidence: 94,
        rawLine: 'Syr. Amoxicillin 250mg/5ml - 5ml twice daily (1-0-1) for 5-7 days',
        medicalMeaning: 'Pediatric antibiotic suspension to treat ear infection.'
      },
      {
        id: 'med-d2-2',
        name: 'Paracetamol',
        strength: '250 mg / 5ml',
        dosage: '5 ml',
        frequency: 'As needed (SOS)',
        duration: '3 days',
        route: 'Oral (PO)',
        timingInstructions: 'Only if fever > 100°F',
        foodInstructions: 'With or after feed',
        isVerified: true,
        confidence: 91,
        rawLine: 'Syr. Paracetamol 250mg/5ml - 5ml SOS for fever > 100 F',
        medicalMeaning: 'Antipyretic syrup to lower body temperature and relieve ear pain.'
      }
    ],
    diagnoses: ['Acute Otitis Media (Right ear)', 'Fever / Pyrexia'],
    instructions: ['Plenty of oral fluids', 'Keep ear dry during bath', 'Review in 5 days'],
    labFindings: ['Temperature: 101.2°F', 'Right tympanic membrane: Congested'],
    symptoms: ['Right ear pain', 'High fever for 2 days'],
    separatedContent: {
      documentSays: [
        { category: 'Medication', field: 'Amoxicillin Syrup', value: '250mg/5ml - 5ml twice daily' },
        { category: 'Medication', field: 'Paracetamol Syrup', value: '250mg/5ml - 5ml SOS for fever' },
        { category: 'Clinical Note', field: 'Diagnosis', value: 'Acute Otitis Media (Right ear)' },
        { category: 'Doctor Advice', field: 'Precautions', value: 'Keep ear dry, review in 5 days' }
      ],
      termMeanings: [
        { term: 'Amoxicillin', meaning: 'Antibiotic that clears bacterial middle ear infection.', caution: 'Complete full course even if child improves early.' },
        { term: 'Otitis Media', meaning: 'Inflammation and infection of the middle ear space behind the eardrum.', caution: 'Common in young children following a cold.' }
      ],
      notDetermined: [
        { topic: 'Penicillin Allergy', explanation: 'Amoxicillin is a penicillin-class antibiotic. Confirm absence of allergy before first dose.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'Local Tesseract OCR Engine',
      hasNumericalConfidence: true,
      averageConfidenceScore: 92,
      providerNotice: 'Confidence score calculated from local OCR stroke recognition.'
    },
    serviceConfigured: true,
    get explanation(): DocumentExplanation {
      return (this.translations[this.selectedLanguage] || this.translations.en)!;
    }
  },

  // Document 3: Diagnostic Lab Report (MetroPath Laboratories)
  {
    id: 'demo-doc-3',
    name: 'Metabolic_Lab_Report_SunitaVerma.pdf',
    type: 'lab_report',
    documentClassification: 'LAB_REPORT',
    categoryGroup: 'medical',
    detectedCategoryLabel: 'Laboratory Blood Report',
    imageDataUrl: createLabReportSvg(),
    uploadedAt: new Date(Date.now() - 14400000).toISOString(),
    fileSize: 512000,
    isDemo: true,
    quality: {
      status: 'pass',
      overallScore: 97,
      blurScore: 98,
      darknessScore: 96,
      glareScore: 97,
      resolutionScore: 99,
      rotationAngle: 0.0,
      handwritingVisibilityScore: 96,
      issues: [],
      suggestions: ['High-quality digital lab format with crisp tabular data.']
    },
    tokens: [
      { id: 'tok-l1', text: 'Patient: Sunita Verma (48 Y / Female)', confidence: 99, bbox: { x: 8, y: 18, width: 45, height: 4 }, category: 'patient_info', isUncertain: false },
      { id: 'tok-l2', text: 'Fasting Blood Glucose: 142 mg/dL [HIGH]', confidence: 98, bbox: { x: 8, y: 33, width: 85, height: 4 }, category: 'lab_value', isUncertain: false, medicalMeaning: 'Blood sugar level after an overnight fast. Normal is under 100 mg/dL; 142 mg/dL indicates elevated fasting blood glucose.' },
      { id: 'tok-l3', text: 'Glycated Hemoglobin (HbA1c): 7.4% [ELEVATED]', confidence: 97, bbox: { x: 8, y: 38, width: 85, height: 4 }, category: 'lab_value', isUncertain: false, medicalMeaning: 'Indicator of 3-month average blood glucose. Normal is below 5.7%; 7.4% is consistent with diabetic range control.' },
      { id: 'tok-l4', text: 'Total Serum Cholesterol: 218 mg/dL [BORDERLINE HIGH]', confidence: 96, bbox: { x: 8, y: 43, width: 85, height: 4 }, category: 'lab_value', isUncertain: false, medicalMeaning: 'Total amount of cholesterol circulating in the blood. Desirable level is below 200 mg/dL.' },
      { id: 'tok-l5', text: 'Serum Creatinine: 0.8 mg/dL [NORMAL]', confidence: 99, bbox: { x: 8, y: 48, width: 85, height: 4 }, category: 'lab_value', isUncertain: false, medicalMeaning: 'A waste product filtered by the kidneys. 0.8 mg/dL confirms healthy baseline kidney filtration.' },
      { id: 'tok-l6', text: 'Total Leukocyte Count: 6,400 /mcL [NORMAL]', confidence: 98, bbox: { x: 8, y: 53, width: 85, height: 4 }, category: 'lab_value', isUncertain: false, medicalMeaning: 'White blood cell count is well within healthy normal range (4,000 - 10,500).' }
    ],
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        { id: 'chk-l1', name: 'Reference Range Alignment', passed: true, details: 'Verified against NABL standardized laboratory normal ranges.' },
        { id: 'chk-l2', name: 'Kidney Function Integrity', passed: true, details: 'Creatinine 0.8 mg/dL within healthy limits.' },
        { id: 'chk-l3', name: 'Non-Diagnostic Guardrail', passed: true, details: 'Explains numbers without formulating definitive clinical disease claims.' }
      ]
    },
    translations: {
      en: {
        language: 'en',
        languageName: 'English',
        simpleSummary: 'Diagnostic laboratory results for Sunita Verma showing elevated blood sugar (Fasting Glucose 142 mg/dL, HbA1c 7.4%), borderline cholesterol, and healthy kidney function.',
        explainLikeIm10: "This lab report is like a report card for your blood. Your blood sugar scored higher than usual (142 mg/dL fasting and 7.4% HbA1c), which means your body is finding it harder to process sweets and carbs right now. Your cholesterol is just slightly above the line at 218. The good news is your kidneys scored an 'A+' with normal creatinine of 0.8!",
        whatWasWritten: [
          'Fasting Blood Glucose: 142 mg/dL (Normal reference range is 70 to 99 mg/dL) — Flagged HIGH.',
          'HbA1c (Glycated Hemoglobin): 7.4% (Normal is below 5.7%) — Flagged ELEVATED.',
          'Total Cholesterol: 218 mg/dL (Desirable reference is below 200 mg/dL) — Flagged BORDERLINE HIGH.',
          'Serum Creatinine: 0.8 mg/dL (Reference range is 0.5 to 1.1 mg/dL) — Verified NORMAL.',
          'Total White Blood Cell Count: 6,400 /mcL — Verified NORMAL.',
          'Pathologist Note: Recommend clinical correlation and dietary consultation with treating doctor.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-l-1',
            term: 'Fasting Blood Glucose (142 mg/dL)',
            simpleMeaning: 'The level of glucose in your blood after fasting overnight for at least 8 to 10 hours.',
            documentContext: 'Fasting Blood Glucose: 142 mg/dL [HIGH]',
            whatItDoesNotMean: 'A single high reading does not immediately signify end-stage diabetic complications.',
            category: 'lab_value'
          },
          {
            id: 'term-l-2',
            term: 'Serum Creatinine (0.8 mg/dL)',
            simpleMeaning: 'A natural muscle breakdown byproduct removed by healthy kidneys.',
            documentContext: 'Serum Creatinine: 0.8 mg/dL [NORMAL]',
            whatItDoesNotMean: 'It does not indicate kidney damage or filtration impairment.',
            category: 'lab_value'
          }
        ],
        whatDocumentSaysHappened: [
          'A fasting blood panel was completed at MetroPath Laboratories on October 18.',
          'Both fasting glucose and 3-month HbA1c showed numbers above the standard non-diabetic range.',
          'Renal markers (creatinine) and immune markers (white blood cell count) are completely healthy.'
        ],
        whatIsUnclear: [
          'The document does not state whether the patient was already taking any diabetes medication or if this is a first-time diagnostic screening.'
        ],
        whatToAskDoctor: [
          'Does an HbA1c of 7.4% mean I should start medication or begin with structured lifestyle and diet changes?',
          'Should I repeat the lipid profile in 3 months after dietary modifications for cholesterol?',
          'Would you recommend an appointment with a certified diabetes educator or dietitian?'
        ],
        spokenScript: "Hello, I am your MedScript AI Virtual Medical Explainer. I have verified the diagnostic test results from MetroPath Laboratories for Sunita Verma. The report shows two elevated glycemic markers: a fasting blood glucose of 142 milligrams per deciliter, and an HbA1c of 7.4 percent. Your total cholesterol is slightly above target at 218 milligrams per deciliter. Importantly, your serum creatinine is 0.8, confirming healthy kidney function, and your white blood cell count is normal. Please share these findings with your doctor to discuss personalized dietary and medical recommendations.",
        sentenceTimings: [
          { sentence: "Hello, I am your MedScript AI Virtual Medical Explainer.", durationSec: 3.5, topic: 'intro' },
          { sentence: "I have verified the diagnostic test results from MetroPath Laboratories for Sunita Verma.", durationSec: 4.2, topic: 'review' },
          { sentence: "The report shows two elevated glycemic markers: a fasting blood glucose of 142 milligrams per deciliter,", durationSec: 5.5, topic: 'glucose' },
          { sentence: "and an HbA1c of 7.4 percent.", durationSec: 2.8, topic: 'hba1c' },
          { sentence: "Your total cholesterol is slightly above target at 218 milligrams per deciliter.", durationSec: 4.5, topic: 'cholesterol' },
          { sentence: "Importantly, your serum creatinine is 0.8, confirming healthy kidney function,", durationSec: 4.8, topic: 'creatinine' },
          { sentence: "and your white blood cell count is normal.", durationSec: 2.8, topic: 'wbc' },
          { sentence: "Please share these findings with your doctor to discuss personalized dietary and medical recommendations.", durationSec: 5.5, topic: 'cta' }
        ]
      },
      te: {
        language: 'te',
        languageName: 'Telugu',
        simpleSummary: 'సునీత వర్మ గారి ల్యాబ్ నివేదిక. ఇందులో రక్తంలో చక్కెర (ఫాస్టింగ్ 142 mg/dL, HbA1c 7.4%) మరియు కొలెస్ట్రాల్ (218 mg/dL) కొద్దిగా ఎక్కువగా ఉన్నాయి. కిడ్నీ పనితీరు (క్రియాటినిన్ 0.8) పూర్తిగా సాధారణం.',
        explainLikeIm10: "ఈ రక్త పరీక్షలో షుగర్ స్థాయి కొద్దిగా పెరిగినట్లు తెలిసింది (HbA1c 7.4%). కొలెస్ట్రాల్ 218 ఉంది. కానీ మీ కిడ్నీల పనితీరు (క్రియాటినిన్ 0.8) మరియు రోగనిరోధక కణాలు చాలా ఆరోగ్యంగా ఉన్నాయి. ఆహార నియమాలు మరియు వ్యాయామం ద్వారా వీటిని నియంత్రించవచ్చు.",
        whatWasWritten: [
          'ఫాస్టింగ్ బ్లడ్ షుగర్: 142 mg/dL (ఎక్కువ, సాధారణం 70-99).',
          'HbA1c గ్లైకేటెడ్ హిమోగ్లోబిన్: 7.4% (ఎక్కువ, లక్ష్యం < 5.7%).',
          'మొత్తం కొలెస్ట్రాల్: 218 mg/dL (కొద్దిగా ఎక్కువ, లక్ష్యం < 200).',
          'సీరమ్ క్రియాటినిన్: 0.8 mg/dL (పూర్తిగా సాధారణ కిడ్నీ పనితీరు).',
          'తెల్ల రక్త కణాల సంఖ్య (WBC): 6,800 /uL (పూర్తిగా సాధారణం).'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-te-l1',
            term: 'Fasting Blood Glucose (142 mg/dL)',
            simpleMeaning: 'రాత్రి 8-10 గంటల ఉపవాసం తర్వాత కొలిచిన రక్తంలో చక్కెర స్థాయి.',
            documentContext: 'Fasting Blood Glucose: 142 mg/dL',
            whatItDoesNotMean: 'దీని అర్థం గుండెపోటు ప్రమాదం వెంటనే వస్తుందని కాదు.',
            category: 'lab_value'
          }
        ],
        whatDocumentSaysHappened: [
          'మెట్రోపాత్ ల్యాబ్‌లో అక్టోబర్ 18న రక్త పరీక్ష జరిగింది.',
          'షుగర్ మరియు కొలెస్ట్రాల్ స్థాయిలు సాధారణ స్థాయి కంటే ఎక్కువగా ఉన్నట్లు గుర్తించారు.',
          'కిడ్నీలు మరియు రోగనిరోధక వ్యవస్థ చాలా ఆరోగ్యంగా పనిచేస్తున్నాయి.'
        ],
        whatIsUnclear: [
          'రోగి ఇప్పటికే షుగర్ మందులు వాడుతున్నారా లేదా అన్న వివరాలు రిపోర్టులో లేవు.'
        ],
        whatToAskDoctor: [
          'HbA1c 7.4% తగ్గించడానికి ఆహారంలో ఏ విధమైన మార్పులు చేసుకోవాలి?',
          'షుగర్ నియంత్రణకు వెంటనే మందులు మొదలుపెట్టాలా లేదా జీవనశైలి మార్పులతో తగ్గించవచ్చా?'
        ],
        spokenScript: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని. సునీత వర్మ గారి ల్యాబ్ రిపోర్టును పరిశీలించాను. డాక్టర్ రిపోర్టు ఏమి చెబుతోందంటే, రక్తంలో చక్కెర స్థాయి ఎక్కువగా ఉంది — అంటే ఫాస్టింగ్ షుగర్ 142 మరియు HbA1c 7.4 శాతంగా ఉన్నాయి. కొలెస్ట్రాల్ 218 గా కొద్దిగా పెరిగింది. మంచి విషయం ఏమిటంటే, మీ కిడ్నీల పనితీరును సూచించే క్రియాటినిన్ 0.8 గా అత్యంత ఆరోగ్యంగా ఉంది, మరియు తెల్ల రక్త కణాలు పూర్తిగా సాధారణంగా ఉన్నాయి. తదుపరి ఆహార నియమాలు మరియు సలహాల కోసం మీ వైద్యుడిని సంప్రదించండి.",
        spokenScriptPhonetic: "Namaskaram! Nenu mee MedScript AI vaidya sahaayakudini. Sunita Verma gaari lab report nu parishilinchanu. Doctor report emi chebuthondante, rakthamlo chakkera sthaayi ekkuvagaa undi — ante fasting sugar 142 mariyu HbA1c 7.4% gaa unnaayi. Cholesterol 218 gaa swalpamgaa perigindi. Manchi vishayam emitante, mee kidney paneetheerunu soochinche creatinine 0.8 gaa chala aarogyamgaa undi, mariyu white blood cells poorthigaa saadhaaranamgaa unnaayi. Thadupari aahaara niyamalu kosam doctor nu sampradinchandi.",
        sentenceTimings: [
          { sentence: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వైద్య సహాయకుడిని. సునీత వర్మ గారి ల్యాబ్ రిపోర్టును పరిశీలించాను.", phoneticSentence: "Namaskaram! Nenu mee MedScript AI vaidya sahaayakudini. Sunita Verma gaari lab report nu parishilinchanu.", durationSec: 5.5, topic: 'intro' },
          { sentence: "రక్తంలో చక్కెర స్థాయి ఎక్కువగా ఉంది: ఫాస్టింగ్ షుగర్ 142 మరియు HbA1c 7.4% గా ఉన్నాయి.", phoneticSentence: "Rakthamlo chakkera sthaayi ekkuvagaa undi: Fasting sugar 142 mariyu HbA1c 7.4% gaa unnaayi.", durationSec: 5.5, topic: 'glucose' },
          { sentence: "కొలెస్ట్రాల్ 218 గా కొద్దిగా పెరిగింది.", phoneticSentence: "Cholesterol 218 gaa swalpamgaa perigindi.", durationSec: 3.5, topic: 'cholesterol' },
          { sentence: "మీ కిడ్నీ పనితీరు (క్రియాటినిన్ 0.8) మరియు తెల్ల రక్త కణాలు పూర్తిగా సాధారణంగా ఉన్నాయి.", phoneticSentence: "Mee kidney paneetheeru creatinine 0.8 mariyu white blood cells saadhaaranamgaa unnaayi.", durationSec: 5.5, topic: 'kidney' },
          { sentence: "తదుపరి ఆహార నియమాలు మరియు సలహాల కోసం మీ వైద్యుడిని సంప్రదించండి.", phoneticSentence: "Thadupari aahaara niyamalu kosam doctor nu sampradinchandi.", durationSec: 4.5, topic: 'cta' }
        ]
      },
      hi: {
        language: 'hi',
        languageName: 'Hindi',
        simpleSummary: 'सुनीता वर्मा की मेट्रोपाथ लैब रिपोर्ट में ब्लड शुगर (फास्टिंग 142 mg/dL, HbA1c 7.4%) और कोलेस्ट्रॉल (218 mg/dL) थोड़ा बढ़ा हुआ है। किडनी की जांच (क्रिएटिनिन 0.8) पूरी तरह स्वस्थ और सामान्य है।',
        explainLikeIm10: "इस रिपोर्ट में ब्लड शुगर का स्तर थोड़ा बढ़ा हुआ है (HbA1c 7.4%)। कोलेस्ट्रॉल 218 है। सबसे अच्छी बात यह है कि आपकी किडनी (क्रिएटिनिन 0.8) और शरीर की रोग प्रतिरोधक कोशिकाएं पूरी तरह से स्वस्थ काम कर रही हैं। सही खान-पान और डॉक्टर की सलाह से इसे आसानी से सामान्य किया जा सकता है।",
        whatWasWritten: [
          'फास्टिंग ब्लड ग्लूकोज: 142 mg/dL (अधिक, सामान्य 70-99).',
          'HbA1c ग्लाइकेटेड हीमोग्लोबिन: 7.4% (अधिक, सामान्य लक्ष्य < 5.7%).',
          'कुल कोलेस्ट्रॉल: 218 mg/dL (हल्का अधिक, लक्ष्य < 200).',
          'सीरम क्रिएटिनिन: 0.8 mg/dL (पूरी तरह स्वस्थ किडनी कार्य).',
          'सफेद रक्त कोशिकाएं (WBC): 6,800 /uL (पूरी तरह सामान्य).'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-hi-l1',
            term: 'Fasting Blood Glucose (142 mg/dL)',
            simpleMeaning: 'रातभर 8 से 10 घंटे बिना भोजन किए सुबह मापा गया शुगर स्तर।',
            documentContext: 'Fasting Blood Glucose: 142 mg/dL',
            whatItDoesNotMean: 'यह किसी गंभीर आपातकाल का संकेत नहीं है।',
            category: 'lab_value'
          }
        ],
        whatDocumentSaysHappened: [
          'मेट्रोपाथ लैब में 18 अक्टूबर को रक्त जांच कराई गई।',
          'ब्लड शुगर और कोलेस्ट्रॉल थोड़ा बढ़ा हुआ पाया गया।',
          'किडनी और सफेद रक्त कोशिकाएं पूरी तरह स्वस्थ हैं।'
        ],
        whatIsUnclear: [
          'क्या मरीज पहले से शुगर की दवा ले रही हैं या यह पहली जांच है, रिपोर्ट में यह दर्ज नहीं है।'
        ],
        whatToAskDoctor: [
          'क्या HbA1c 7.4% कम करने के लिए तुरंत दवा शुरू करनी होगी या खान-पान से नियंत्रण संभव है?',
          'क्या 3 महीने बाद दोबारा लिपिड प्रोफाइल जांच करानी होगी?'
        ],
        spokenScript: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई मेडिकल एक्सप्लेनर हूँ। सुनीता वर्मा की मेट्रोपाथ लैब रिपोर्ट की जांच कर ली गई है। डॉक्टर की रिपोर्ट बताती है कि ब्लड शुगर का स्तर थोड़ा बढ़ा हुआ है — यानी फास्टिंग शुगर 142 और HbA1c 7.4 प्रतिशत है। कोलेस्ट्रॉल भी 218 के साथ हल्का अधिक है। अच्छी बात यह है कि आपकी किडनी की रिपोर्ट में सीरम क्रिएटिनिन 0.8 है, जो पूरी तरह स्वस्थ है, और सफेद रक्त कोशिकाएं भी सामान्य हैं। आहार और जीवनशैली में सुधार के लिए अपने डॉक्टर से परामर्श लें।",
        spokenScriptPhonetic: "Namaste! Main aapka MedScript AI medical explainer hoon. Sunita Verma ki MetroPath lab report ki jaanch kar li gayi hai. Doctor ki report batati hai ki blood sugar ka star thoda badha hua hai — yaani fasting sugar 142 aur HbA1c 7.4% hai. Cholesterol bhi 218 ke saath halka adhik hai. Achhi baat yeh hai ki aapki kidney ki report mein serum creatinine 0.8 hai, jo poori tarah swasth hai, aur safed rakt koshikayein bhi samanya hain. Doctor se paramarsh lein.",
        sentenceTimings: [
          { sentence: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई मेडिकल एक्सप्लेनर हूँ। सुनीता वर्मा की लैब रिपोर्ट की जांच कर ली गई है।", phoneticSentence: "Namaste! Main aapka MedScript AI medical explainer hoon. Sunita Verma ki report ki jaanch kar li gayi hai.", durationSec: 5.0, topic: 'intro' },
          { sentence: "डॉक्टर की रिपोर्ट बताती है कि फास्टिंग शुगर 142 और HbA1c 7.4% बढ़ा हुआ है।", phoneticSentence: "Doctor ki report batati hai ki fasting sugar 142 aur HbA1c 7.4% badha hua hai.", durationSec: 5.5, topic: 'glucose' },
          { sentence: "कोलेस्ट्रॉल 218 के साथ थोड़ा अधिक है।", phoneticSentence: "Cholesterol 218 ke saath thoda adhik hai.", durationSec: 3.5, topic: 'cholesterol' },
          { sentence: "किडनी की रिपोर्ट (क्रिएटिनिन 0.8) और सफेद रक्त कोशिकाएं पूरी तरह सामान्य हैं।", phoneticSentence: "Kidney ki report creatinine 0.8 aur safed rakt koshikayein poori tarah samanya hain.", durationSec: 5.0, topic: 'kidney' },
          { sentence: "आहार और जीवनशैली में सुधार के लिए अपने डॉक्टर से परामर्श लें।", phoneticSentence: "Aahar aur jeevanshaili mein sudhar ke liye apne doctor se paramarsh lein.", durationSec: 4.5, topic: 'cta' }
        ]
      },
      ta: {
        language: 'ta',
        languageName: 'Tamil',
        simpleSummary: 'சுனிதா வர்மாவின் மெட்ரோபாத் லேப் ரத்தப் பரிசோதனை அறிக்கை. இதில் வெறும் வயிற்று சர்க்கரை (142 mg/dL) மற்றும் 3 மாத சராசரி சர்க்கரை (HbA1c 7.4%) அதிகமாக உள்ளன. சிறுநீரக செயல்பாடு (கிரியேட்டினின் 0.8) முற்றிலும் ஆரோக்கியமாக உள்ளது.',
        explainLikeIm10: "ரத்தப் பரிசோதனை அறிக்கை என்ன சொல்லுதுன்னா, உங்கள் ரத்தத்தில் சர்க்கரை அளவு (HbA1c 7.4%) மற்றும் கொலஸ்ட்ரால் (218) சற்று கூடுதலாக உள்ளது. மகிழ்ச்சியான விஷயம் என்னவென்றால், உங்கள் சிறுநீரகம் (கிரியேட்டினின் 0.8) மற்றும் ரத்த வெள்ளையணுக்கள் மிக ஆரோக்கியமாக செயல்படுகின்றன! உணவு முறையை மாற்றியமைத்து மருத்துவரிடம் ஆலோசனை பெறவும்.",
        whatWasWritten: [
          'வெறும் வயிற்று ரத்த சர்க்கரை (Fasting Blood Glucose): 142 mg/dL (அதிகம், சாதாரண அளவு 70-99).',
          '3 மாத சராசரி சர்க்கரை (HbA1c): 7.4% (அதிகம், இலக்கு < 5.7%).',
          'மொத்த கொலஸ்ட்ரால்: 218 mg/dL (சற்று கூடுதல், இலக்கு < 200).',
          'சீரம் கிரியேட்டினின்: 0.8 mg/dL (முற்றிலும் இயல்பான சிறுநீரக செயல்பாடு).',
          'ரத்த வெள்ளையணுக்கள் (WBC Count): 6,800 /uL (முற்றிலும் இயல்பு).'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-ta-l1',
            term: 'Fasting Blood Glucose (142 mg/dL)',
            simpleMeaning: 'இரவு 8-10 மணி நேர விரதத்திற்குப் பிறகு காலையில் அளவிடப்பட்ட ரத்த சர்க்கரை அளவு.',
            documentContext: 'Fasting Blood Glucose: 142 mg/dL',
            whatItDoesNotMean: 'இது திடீர் ஆபத்து அல்ல; உணவுக்கட்டுப்பாடு மற்றும் சிகிச்சை தேவை.',
            category: 'lab_value'
          },
          {
            id: 'term-ta-l2',
            term: 'Serum Creatinine (0.8 mg/dL)',
            simpleMeaning: 'சிறுநீரகங்கள் ரத்தத்தை எவ்வளவு சிறப்பாக வடிகட்டுகின்றன என்பதை அளவிடும் ஆரோக்கியக் குறியீடு.',
            documentContext: 'Serum Creatinine: 0.8 mg/dL',
            whatItDoesNotMean: 'சிறுநீரக பாதிப்பு இல்லை; முற்றிலும் ஆரோக்கியமாக உள்ளது.',
            category: 'lab_value'
          }
        ],
        whatDocumentSaysHappened: [
          'அக்டோபர் 18 அன்று மெட்ரோபாத் ஆய்வகத்தில் வெறும் வயிற்று ரத்தப் பரிசோதனை எடுக்கப்பட்டது.',
          'சர்க்கரை மற்றும் கொலஸ்ட்ரால் சற்று அதிகமாக இருப்பது கண்டறியப்பட்டது.',
          'சிறுநீரகம் மற்றும் நோய் எதிர்ப்பு செல்கள் மிக நலமாக உள்ளன.'
        ],
        whatIsUnclear: [
          'நோயாளி ஏற்கனவே நீரிழிவு மாத்திரைகள் உட்கொள்கிறாரா அல்லது இது முதல்முறை பரிசோதனையா என்பது அறிக்கையில் குறிப்பிடப்படவில்லை.'
        ],
        whatToAskDoctor: [
          'HbA1c 7.4% ஐ குறைக்க உடனடியாக மாத்திரைகள் தேவையா அல்லது உணவு மற்றும் உடற்பயிற்சி போதுமா?',
          'கொலஸ்ட்ராலுக்காக 3 மாதங்களுக்குப் பிறகு மீண்டும் லிப்பிட் பரிசோதனை செய்ய வேண்டுமா?'
        ],
        spokenScript: "வணக்கம்! நான் உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். சுனிதா வர்மாவின் மெட்ரோபாத் லேப் ரிப்போர்ட்டை நான் பரிசீலனை செய்துள்ளேன். டாக்டர் ரிப்போர்ட் என்ன சொல்லுதுன்னா, ரத்தத்தில் சர்க்கரை அளவு அதிகமாக உள்ளது — அதாவது வெறும் வயிற்று சர்க்கரை 142 மிகி மற்றும் கடந்த 3 மாத சராசரி சர்க்கரை HbA1c 7.4 சதவீதம் உள்ளது. மேலும் மொத்த கொலஸ்ட்ரால் 218 மிகி ஆக சற்று அதிகம். நல்ல செய்தி என்னவென்றால், உங்கள் சிறுநீரக செயல்பாடு காட்டும் சீரம் கிரியேட்டினின் 0.8 ஆக முற்றிலும் ஆரோக்கியமாக உள்ளது, ரத்த வெள்ளையணுக்களும் இயல்பாக உள்ளன. சர்க்கரை மற்றும் கொழுப்பைக் கட்டுப்படுத்த தேவையான உணவு முறைகள் மற்றும் அடுத்தகட்ட சிகிச்சை பற்றி உங்கள் மருத்துவரிடம் ஆலோசனை பெறவும்.",
        spokenScriptPhonetic: "Vanakkam! Naan ungal MedScript AI maruthuva udhaviyaalar. Sunita Verma-vin MetroPath lab report-ai naan pariseelanai seidhen. Doctor report enna solludhuna, rathathil sugar alavu adhigaamaaga ulladhu — adhavadhu fasting sugar 142 mg matrum HbA1c 7.4% ulladhu. Cholesterol 218 mg aaga satru adhigaam. Nalla seidhi ennavendral, ungal kidney function kaattum serum creatinine 0.8 aaga arokkiyamaaga ulladhu, WBC count-um normal. Sugar matrum cholesterol kattupadutha ungal doctor idam aalosanai perungal.",
        sentenceTimings: [
          { sentence: "வணக்கம்! நான் உங்கள் மெட்ஸ்கிரிப்ட் ஏஐ மருத்துவ உதவியாளர். சுனிதா வர்மாவின் லேப் ரிப்போர்ட்டை பரிசீலனை செய்துள்ளேன்.", phoneticSentence: "Vanakkam! Naan ungal MedScript AI maruthuva udhaviyaalar. Sunita Verma-vin lab report pariseelanai seidhen.", durationSec: 5.5, topic: 'intro' },
          { sentence: "டாக்டர் ரிப்போர்ட் என்ன சொல்லுதுன்னா, வெறும் வயிற்று சர்க்கரை 142 மிகி மற்றும் HbA1c 7.4 சதவீதம் உள்ளது.", phoneticSentence: "Doctor report enna solludhuna, fasting sugar 142 mg matrum HbA1c 7.4 percentage ulladhu.", durationSec: 5.5, topic: 'glucose' },
          { sentence: "மொத்த கொலஸ்ட்ரால் 218 மிகி ஆக சற்று அதிகம்.", phoneticSentence: "Cholesterol 218 mg aaga satru adhigaam.", durationSec: 3.5, topic: 'cholesterol' },
          { sentence: "சிறுநீரக செயல்பாடு காட்டும் கிரியேட்டினின் 0.8 ஆக முற்றிலும் ஆரோக்கியமாக உள்ளது.", phoneticSentence: "Kidney function serum creatinine 0.8 aaga arokkiyamaaga ulladhu.", durationSec: 5.0, topic: 'kidney' },
          { sentence: "சர்க்கரை மற்றும் கொழுப்பைக் கட்டுப்படுத்த தேவையான உணவு முறைகள் பற்றி மருத்துவரிடம் ஆலோசனை பெறவும்.", phoneticSentence: "Sugar matrum cholesterol kattupadutha doctor idam aalosanai perungal.", durationSec: 5.0, topic: 'cta' }
        ]
      },
      kn: {
        language: 'kn',
        languageName: 'Kannada',
        simpleSummary: 'ಸುನೀತಾ ವರ್ಮಾ ಅವರ ಲ್ಯಾಬ್ ವರದಿ. ಇದರಲ್ಲಿ ರಕ್ತದಲ್ಲಿ ಸಕ್ಕರೆ (142 mg/dL, HbA1c 7.4%) ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ (218 mg/dL) ಹೆಚ್ಚಾಗಿದೆ. ಮೂತ್ರಪಿಂಡ ಕಾರ್ಯ ಸಾಮಾನ್ಯವಾಗಿದೆ.',
        explainLikeIm10: "ಈ ರಕ್ತ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಸಕ್ಕರೆ ಪ್ರಮಾಣ (HbA1c 7.4%) ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗಿದೆ. ಆದರೆ ನಿಮ್ಮ ಮೂತ್ರಪಿಂಡದ ಕಾರ್ಯ (ಕ್ರಿಯೇಟಿನಿನ್ 0.8) ಸಂಪೂರ್ಣ ಆರೋಗ್ಯಕರವಾಗಿದೆ.",
        whatWasWritten: [
          'ಫಾಸ್ಟಿಂಗ್ ಬ್ಲಡ್ ಗ್ಲೂಕೋಸ್: 142 mg/dL (ಹೆಚ್ಚು).',
          'HbA1c: 7.4% (ಹೆಚ್ಚು).',
          'ಕೊಲೆಸ್ಟ್ರಾಲ್: 218 mg/dL (ಸ್ವಲ್ಪ ಹೆಚ್ಚು).',
          'ಸೀರಮ್ ಕ್ರಿಯೇಟಿನೈನ್: 0.8 mg/dL (ಸಾಮಾನ್ಯ).'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['ಸಕ್ಕರೆ ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ ಪ್ರಮಾಣ ಹೆಚ್ಚಿರುವುದು ಪತ್ತೆಯಾಗಿದೆ.'],
        whatIsUnclear: ['ರೋಗಿ ಈಗಾಗಲೇ ಮಧುಮೇಹದ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದಾರೆಯೇ ಎಂಬುದು ಸ್ಪಷ್ಟವಿಲ್ಲ.'],
        whatToAskDoctor: ['ಸಕ್ಕರೆ ನಿಯಂತ್ರಣಕ್ಕೆ ಆಹಾರದಲ್ಲಿ ಯಾವ ಬದಲಾವಣೆಗಳನ್ನು ಮಾಡಿಕೊಳ್ಳಬೇಕು?'],
        spokenScript: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ವೈದ್ಯಕೀಯ ವಿವರಣೆಗಾರ. ಸುನೀತಾ ವರ್ಮಾ ಅವರ ಲ್ಯಾಬ್ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ. ಸಕ್ಕರೆ ಅಂಶ (HbA1c 7.4%) ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ 218 ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗಿದೆ. ನಿಮ್ಮ ಮೂತ್ರಪಿಂಡದ ಕಾರ್ಯ (ಕ್ರಿಯೇಟಿನಿನ್ 0.8) ಸಂಪೂರ್ಣವಾಗಿ ಸಾಮಾನ್ಯವಾಗಿದೆ. ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯಿರಿ.",
        spokenScriptPhonetic: "Namaskara! Naanu nimma MedScript AI vaidyakeeya vivaranegaara. Sunita Verma avara lab report parishilisiddene. Sakkare amsha HbA1c 7.4% matthu cholesterol 218 hecchagide. Nimma kidney karyacharaneyu creatinine 0.8 saamanya aagide. Doctor sallahe padeyiri.",
        sentenceTimings: [
          { sentence: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮೆಡ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಎಐ ವೈದ್ಯಕೀಯ ವಿವರಣೆಗಾರ. ಲ್ಯಾಬ್ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ.", phoneticSentence: "Namaskara! Naanu nimma MedScript AI vaidyakeeya vivaranegaara. Lab report parishilisiddene.", durationSec: 5.0, topic: 'intro' },
          { sentence: "ರಕ್ತದಲ್ಲಿ ಸಕ್ಕರೆ ಅಂಶ (HbA1c 7.4%) ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ 218 ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗಿದೆ.", phoneticSentence: "Rakthadalli sakkare amsha HbA1c 7.4% matthu cholesterol 218 swalpa hecchagide.", durationSec: 5.5, topic: 'findings' },
          { sentence: "ಮೂತ್ರಪಿಂಡದ ಕಾರ್ಯ (ಕ್ರಿಯೇಟಿನಿನ್ 0.8) ಸಂಪೂರ್ಣ ಸಾಮಾನ್ಯವಾಗಿದೆ.", phoneticSentence: "Kidney karya creatinine 0.8 saamanya aagide.", durationSec: 4.5, topic: 'kidney' },
          { sentence: "ಮುಂದಿನ ಕ್ರಮಗಳಿಗಾಗಿ ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.", phoneticSentence: "Mundina kramagaligaagi nimma doctor annu samparkisi.", durationSec: 4.0, topic: 'cta' }
        ]
      },
      ml: {
        language: 'ml',
        languageName: 'Malayalam',
        simpleSummary: 'സുനിത വർമ്മയുടെ ലബോറട്ടറി പരിശോധനാ റിപ്പോർട്ട്. രക്തത്തിലെ പഞ്ചസാരയും (142 mg/dL, HbA1c 7.4%) കൊളസ്ട്രോളും (218 mg/dL) കൂടുതലാണ്. കിഡ്നിയുടെ പ്രവർത്തനം സാധാരണ നിലയിലാണ്.',
        explainLikeIm10: "ഈ റിപ്പോർട്ടിൽ പഞ്ചസാരയുടെ അളവ് (7.4%) അല്പം കൂടുതലാണ്. എന്നാൽ നിങ്ങളുടെ കിഡ്നിയുടെ പ്രവർത്തനം (ക്രിയാറ്റിനിൻ 0.8) വളരെ ആരോഗ്യകരമാണ്.",
        whatWasWritten: [
          'ഫാസ്റ്റിംഗ് ബ്ലഡ് ഷുഗർ: 142 mg/dL (കൂടുതൽ).',
          'HbA1c: 7.4% (കൂടുതൽ).',
          'കൊളസ്ട്രോൾ: 218 mg/dL (കൂടുതൽ).',
          'സീറം ക്രിയാറ്റിനിൻ: 0.8 mg/dL (സാധാരണം).'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['പഞ്ചസാരയുടെയും കൊളസ്ട്രോളിന്റെയും അളവ് കൂടുതലായി രേഖപ്പെടുത്തി.'],
        whatIsUnclear: ['രോഗി നേരത്തെ തന്നെ മരുന്ന് കഴിക്കുന്നുണ്ടോ എന്നത് റിപ്പോർട്ടിലില്ല.'],
        whatToAskDoctor: ['ഷുഗർ നിയന്ത്രിക്കാൻ ഭക്ഷണക്രമത്തിൽ എന്ത് മാറ്റങ്ങൾ വരുത്തണം?'],
        spokenScript: "നമസ്കാരം! ഞാൻ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായിയാണ്. സുനിത വർമ്മയുടെ ലാബ് റിപ്പോർട്ട് പരിശോധിച്ചു. രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് HbA1c 7.4 ശതമാനവും കൊളസ്ട്രോൾ 218 ഉം ആണ്. നിങ്ങളുടെ കിഡ്നിയുടെ പ്രവർത്തനം തികച്ചും സാധാരണമാണ്. ഭക്ഷണനിയന്ത്രണത്തിനായി ഡോക്ടറുടെ ഉപദേശം തേടുക.",
        spokenScriptPhonetic: "Namaskaram! Njaan MedScript AI medical sahaayiyaanu. Sunita Verma-yude lab report parishodhichu. Sugar nilavaram HbA1c 7.4% cholesterol 218 aanu. Kidney പ്രവർത്തനം saadhaaranamaanu. Doctorude upadhesam theduka.",
        sentenceTimings: [
          { sentence: "നമസ്കാരം! ഞാൻ മെഡ്സ്ക്രിപ്റ്റ് എഐ മെഡിക്കൽ സഹായിയാണ്. ലാബ് റിപ്പോർട്ട് പരിശോധിച്ചു.", phoneticSentence: "Namaskaram! Njaan MedScript AI medical sahaayiyaanu. Lab report parishodhichu.", durationSec: 5.0, topic: 'intro' },
          { sentence: "പഞ്ചസാരയുടെ അളവ് (HbA1c 7.4%) കൊളസ്ട്രോൾ 218 എന്നിവ കൂടുതലാണ്.", phoneticSentence: "Sugar nilavaram HbA1c 7.4% cholesterol 218 kooduthalaanu.", durationSec: 5.5, topic: 'findings' },
          { sentence: "കിഡ്നിയുടെ പ്രവർത്തനം (ക്രിയാറ്റിനിൻ 0.8) പൂർണ്ണമായും സാധാരണമാണ്.", phoneticSentence: "Kidney pravarttanam creatinine 0.8 saadhaaranamaanu.", durationSec: 4.5, topic: 'kidney' },
          { sentence: "കൂടുതൽ വിവരങ്ങൾക്കായി നിങ്ങളുടെ ഡോക്ടറെ സമീപിക്കുക.", phoneticSentence: "Kooduthal vivarangalkkaayi doctor-e sameepikkuka.", durationSec: 4.0, topic: 'cta' }
        ]
      },
      bn: {
        language: 'bn',
        languageName: 'Bengali',
        simpleSummary: 'সুনীতা বর্মার ল্যাব রিপোর্ট। এতে রক্তে সুগার (১৪২ mg/dL, HbA1c 7.4%) এবং কোলেস্টেরল (২১৮ mg/dL) কিছুটা বেশি পাওয়া গেছে। কিডনি সুস্থ আছে।',
        explainLikeIm10: "এই রিপোর্টে রক্তে সুগারের মাত্রা (7.4%) কিছুটা বেশি এসেছে। তবে স্বস্তির বিষয় আপনার কিডনি (ক্রিয়েটিনিন 0.8) সম্পূর্ণ সুস্থ ও স্বাভাবিক কাজ করছে।",
        whatWasWritten: [
          'ফাস্টিং ব্লাড সুগার: 142 mg/dL (বেশি)।',
          'HbA1c: 7.4% (বেশি)।',
          'কোলেস্টেরল: 218 mg/dL (বেশি)।',
          'সিরাম ক্রিয়েটিনিন: 0.8 mg/dL (স্বাভাবিক)।'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['সুগার ও কোলেস্টেরলের মাত্রা স্বাভাবিকের চেয়ে বেশি পাওয়া গেছে।'],
        whatIsUnclear: ['রোগী পূর্বে কোনো ডায়াবেটিসের ওষুধ খাচ্ছিলেন কিনা তা উল্লেখ নেই।'],
        whatToAskDoctor: ['সুগার কমাতে খাদ্যাভ্যাসে কী ধরনের পরিবর্তন আনা প্রয়োজন?'],
        spokenScript: "নমস্কার! আমি আপনার মেডস্ক্রিপ্ট এআই মেডিক্যাল সহকারী। সুনীতা বর্মার ল্যাব রিপোর্ট বিশ্লেষণ করেছি। রক্তে শর্করার মাত্রা HbA1c 7.4 শতাংশ এবং কোলেস্টেরল ২১৮ কিছুটা বেশি রয়েছে। তবে আপনার কিডনির কার্যকারিতা (ক্রিয়েটিনিন 0.8) সম্পূর্ণ সুস্থ ও স্বাভাবিক। ডাক্তারের পরামর্শ নিন।",
        spokenScriptPhonetic: "Nomoshkar! Aami aapnar MedScript AI medical sahayak. Sunita Verma-r lab report bishleshan korechhi. Rokte sugar-er maatra HbA1c 7.4% ebong cholesterol 218 kichhuta beshi. Tobe kidney-r karjokarita creatinine 0.8 shustho aachhe. Doctor-er poramorsho nin.",
        sentenceTimings: [
          { sentence: "নমস্কার! আমি আপনার মেডস্ক্রিপ্ট এআই মেডিক্যাল সহকারী। ল্যাব রিপোর্টটি বিশ্লেষণ করেছি।", phoneticSentence: "Nomoshkar! Aami aapnar MedScript AI medical sahayak. Lab report bishleshan korechhi.", durationSec: 5.0, topic: 'intro' },
          { sentence: "রক্তে সুগারের মাত্রা (HbA1c 7.4%) এবং কোলেস্টেরল ২১৮ বেশি রয়েছে।", phoneticSentence: "Rokte sugar-er maatra HbA1c 7.4% ebong cholesterol 218 beshi aachhe.", durationSec: 5.0, topic: 'findings' },
          { sentence: "কিডনির রিপোর্ট (ক্রিয়েটিনিন 0.8) সম্পূর্ণ স্বাভাবিক।", phoneticSentence: "Kidney-r report creatinine 0.8 samanyo.", durationSec: 4.0, topic: 'kidney' },
          { sentence: "পরবর্তী পদক্ষেপের জন্য আপনার চিকিৎসকের সাথে যোগাযোগ করুন।", phoneticSentence: "Porobortee podoksheper jonno doctor-er shathe jogajog korun.", durationSec: 4.5, topic: 'cta' }
        ]
      },
      mr: {
        language: 'mr',
        languageName: 'Marathi',
        simpleSummary: 'सुनीता वर्मा यांचा लॅब रिपोर्ट. रक्तातील साखर (142 mg/dL, HbA1c 7.4%) आणि कोलेस्ट्रॉल (218 mg/dL) थोडे जास्त आहे. मूत्रपिंडाचे कार्य सामान्य आहे.',
        explainLikeIm10: "या रक्त तपासणीत साखरेचे प्रमाण (7.4%) थोडे वाढले आहे. पण चांगली गोष्ट म्हणजे तुमचे मूत्रपिंड (क्रिएटिनिन 0.8) अतिशय निरोगी काम करत आहे.",
        whatWasWritten: [
          'फास्टिंग ब्लड शुगर: 142 mg/dL (जास्त).',
          'HbA1c: 7.4% (जास्त).',
          'कोलेस्ट्रॉल: 218 mg/dL (जास्त).',
          'सीरम क्रिएटिनिन: 0.8 mg/dL (सामान्य).'
        ],
        whatMedicalTermsMean: [],
        whatDocumentSaysHappened: ['रक्तातील साखर आणि कोलेस्ट्रॉल वाढल्याचे आढळले आहे.'],
        whatIsUnclear: ['रुग्ण आधीपासून मधुमेहाचे औषध घेत आहे का, हे नमूद नाही.'],
        whatToAskDoctor: ['साखर नियंत्रणासाठी आहारात कोणते बदल करावेत?'],
        spokenScript: "नमस्कार! मी तुमचा मेडस्क्रिप्ट एআই व्हर्च्युअल वैद्यकीय सहाय्यक आहे. सुनीता वर्मा यांचा लॅब रिपोर्ट तपासला आहे. रक्तातील साखरेचे प्रमाण HbA1c 7.4 टक्के आणि कोलेस्ट्रॉल 218 थोडे जास्त आहे. पण तुमच्या किडनीचे कार्य (क्रिएटिनिन 0.8) पूर्णपणे सामान्य आहे. पुढील सल्ल्यासाठी डॉक्टरांशी संपर्क साधा.",
        spokenScriptPhonetic: "Namaskar! Mee tumcha MedScript AI virtual vaidyakeeya sahayyak aahe. Sunita Verma yaancha lab report tapasla aahe. Saakhareche pramaan HbA1c 7.4% aani cholesterol 218 thode jaast aahe. Pan kidneyche karya creatinine 0.8 purna samanya aahe. Doctoranshee samparka saadha.",
        sentenceTimings: [
          { sentence: "नमस्कार! मी तुमचा मेडस्क्रिप्ट एআই व्हर्च्युअल वैद्यकीय सहाय्यक आहे. लॅब रिपोर्ट तपासला आहे.", phoneticSentence: "Namaskar! Mee tumcha MedScript AI virtual vaidyakeeya sahayyak aahe. Lab report tapasla aahe.", durationSec: 5.0, topic: 'intro' },
          { sentence: "साखरेचे प्रमाण (HbA1c 7.4%) आणि कोलेस्ट्रॉल 218 थोडे जास्त आहे.", phoneticSentence: "Saakhareche pramaan HbA1c 7.4% aani cholesterol 218 thode jaast aahe.", durationSec: 5.0, topic: 'findings' },
          { sentence: "किडनीचे कार्य (क्रिएटिनिन 0.8) पूर्णपणे सामान्य आहे.", phoneticSentence: "Kidneyche karya creatinine 0.8 purna samanya aahe.", durationSec: 4.0, topic: 'kidney' },
          { sentence: "पुढील सल्ल्यासाठी डॉक्टरांशी संपर्क साधा.", phoneticSentence: "Pudhila sallyaasaathi doctoranshee samparka saadha.", durationSec: 4.0, topic: 'cta' }
        ]
      }
    },
    rawOcrText: "MetroPath Diagnostic Laboratories\nPatient: Mrs. Sunita Verma (48 Y / Female)\nTests Conducted:\n1. Fasting Blood Sugar: 142 mg/dL [Reference: 70-99 mg/dL] - HIGH\n2. Glycated Hemoglobin (HbA1c): 7.4% [Reference: < 5.7%] - ELEVATED\n3. Total Serum Cholesterol: 218 mg/dL [Reference: < 200 mg/dL] - BORDERLINE\n4. Serum Creatinine: 0.8 mg/dL [Reference: 0.5-1.1 mg/dL] - NORMAL\nImpression: Diabetic glycemic range with borderline hyperlipidemia. Renal function intact.",
    structuredMeds: [],
    labResults: [
      { id: 'lab-1', testName: 'Fasting Blood Glucose', result: '142', unit: 'mg/dL', referenceRange: '70 - 99 mg/dL', flag: 'ABNORMAL', safeExplanation: 'Your report shows a fasting blood glucose of 142 mg/dL, which is above the printed reference range of 70-99 mg/dL. Discuss this result with your healthcare professional.', isVerified: true },
      { id: 'lab-2', testName: 'Glycated Hemoglobin (HbA1c)', result: '7.4', unit: '%', referenceRange: '< 5.7%', flag: 'ABNORMAL', safeExplanation: 'Your HbA1c reading is 7.4%, which exceeds the standard reference cutoff of 5.7%. Discuss it with a qualified doctor.', isVerified: true },
      { id: 'lab-3', testName: 'Total Serum Cholesterol', result: '218', unit: 'mg/dL', referenceRange: '< 200 mg/dL', flag: 'BORDERLINE', safeExplanation: 'Your total cholesterol is 218 mg/dL, slightly above the target range (< 200 mg/dL).', isVerified: true },
      { id: 'lab-4', testName: 'Serum Creatinine', result: '0.8', unit: 'mg/dL', referenceRange: '0.5 - 1.1 mg/dL', flag: 'NORMAL', safeExplanation: 'Your serum creatinine is 0.8 mg/dL, which is well within the healthy normal reference range.', isVerified: true }
    ],
    diagnoses: ['Impaired Fasting Glucose / Diabetes Mellitus', 'Borderline Hypercholesterolemia'],
    instructions: ['Consult physician for dietary counseling, lifestyle intervention, and medication review'],
    labFindings: [
      'Fasting Blood Glucose: 142 mg/dL (High)',
      'HbA1c: 7.4% (Elevated - Diabetic range)',
      'Total Cholesterol: 218 mg/dL (Borderline high)',
      'Serum Creatinine: 0.8 mg/dL (Normal kidney function)'
    ],
    symptoms: ['Annual routine metabolic executive health checkup'],
    separatedContent: {
      documentSays: [
        { category: 'Lab Value', field: 'Fasting Blood Glucose', value: '142 mg/dL (Reference 70-99) - HIGH' },
        { category: 'Lab Value', field: 'HbA1c Glycated Hemoglobin', value: '7.4% (Reference <5.7%) - ELEVATED' },
        { category: 'Lab Value', field: 'Total Cholesterol', value: '218 mg/dL (Reference <200) - BORDERLINE' },
        { category: 'Lab Value', field: 'Serum Creatinine', value: '0.8 mg/dL (Reference 0.5-1.1) - NORMAL' },
        { category: 'Diagnostic Impression', field: 'Clinical Impression', value: 'Diabetic glycemic range with intact renal function' }
      ],
      termMeanings: [
        { term: 'HbA1c (7.4%)', meaning: 'Measures average glucose over the past 90 days. Values over 6.5% indicate diabetes.', caution: 'Requires doctor guidance for glucose control.' },
        { term: 'Serum Creatinine (0.8)', meaning: 'Waste product filtered by kidneys. Normal level indicates healthy renal filtration.', caution: 'Kidney function is currently preserved.' }
      ],
      notDetermined: [
        { topic: 'Current Antidiabetic Medication', explanation: 'Whether the patient is currently on metformin or insulin is not recorded on this laboratory sheet.' },
        { topic: 'Fasting Hours Duration', explanation: 'Exact duration of fast prior to morning blood draw is not documented.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'Google Gemini 2.5 Flash Multimodal Document AI',
      hasNumericalConfidence: false,
      averageConfidenceScore: null,
      providerNotice: 'Confidence score not provided by the document recognition service.'
    },
    serviceConfigured: true,
    get explanation(): DocumentExplanation {
      return (this.translations[this.selectedLanguage] || this.translations.en)!;
    }
  },
  getHepatitisDocument(),
  ...getUniversalDemoDocuments()
];
