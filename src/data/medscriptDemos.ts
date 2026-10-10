import { ProcessedDocument, SupportedLanguage, DocumentExplanation } from '../types/medscript';
import { getHepatitisDocument } from './hepatitisDemo';

// Prescription SVG & Crop
function createPrescriptionSvg(): string {
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
    <text x="70" y="340" font-family="'Caveat', cursive" font-size="26" fill="#1e3a8a">Known Type 2 Diabetes Mellitus x 4 yrs &amp; Essential Hypertension.</text>
    <text x="70" y="375" font-family="'Caveat', cursive" font-size="26" fill="#1e3a8a">Recent HbA1c: 7.2% (suboptimal glycemic control).</text>
    
    <line x1="50" y1="400" x2="750" y2="400" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4 4" />

    <text x="50" y="445" font-family="'Times New Roman', serif" font-size="34" font-weight="bold" fill="#0284c7">℞</text>
    
    <g transform="translate(0, 10)">
      <circle cx="65" cy="480" r="4" fill="#0284c7" />
      <text x="80" y="485" font-family="'Caveat', cursive" font-size="26" fill="#1e3a8a">Tab. Metformin 500 mg — 1 tab PO BD (after meals)</text>
      
      <circle cx="65" cy="535" r="4" fill="#0284c7" />
      <text x="80" y="540" font-family="'Caveat', cursive" font-size="26" fill="#1e3a8a">Tab. Telmisartan 40 mg — 1 tab PO OD (morning)</text>

      <circle cx="65" cy="590" r="4" fill="#0284c7" />
      <text x="80" y="595" font-family="'Caveat', cursive" font-size="26" fill="#1e3a8a">Tab. Atorvastatin 20 mg — 1 tab PO HS (at bedtime)</text>
      
      <circle cx="65" cy="650" r="4" fill="#f59e0b" />
      <text x="80" y="655" font-family="'Caveat', cursive" font-size="26" fill="#1e3a8a">Routine CBC showed mild </text>
      
      <rect x="360" y="628" width="165" height="38" rx="4" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="368" y="655" font-family="'Caveat', cursive" font-size="26" font-weight="bold" fill="#172554">Leukopenia</text>
      <text x="535" y="655" font-family="'Caveat', cursive" font-size="26" fill="#1e3a8a">(mild WBC drop).</text>
      
      <text x="80" y="705" font-family="'Caveat', cursive" font-size="25" fill="#1e3a8a">Recheck Complete Blood Count &amp; Fasting Sugars in 2 weeks.</text>
      <text x="80" y="745" font-family="'Caveat', cursive" font-size="25" fill="#1e3a8a">Maintain low sodium, low carbohydrate diabetic diet.</text>
    </g>

    <g transform="translate(480, 810)">
      <path d="M 30 50 Q 60 10 90 40 T 150 25 T 220 50" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" />
      <text x="40" y="75" font-family="Arial" font-size="12" font-weight="bold" fill="#334155">Dr. Suresh K. Mehta, MD</text>
      <text x="40" y="92" font-family="Arial" font-size="11" fill="#64748b">Senior Consultant Physician</text>
      <circle cx="210" cy="55" r="42" fill="none" stroke="#2563eb" stroke-width="2" stroke-opacity="0.65" stroke-dasharray="8 3" />
      <text x="178" y="52" font-family="Arial" font-size="9" font-weight="bold" fill="#2563eb">METRO CLINIC</text>
      <text x="178" y="66" font-family="Arial" font-size="8" fill="#2563eb">VERIFIED</text>
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

// Post-op Discharge Summary SVG
function createDischargeSummarySvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#ffffff" />
    <rect x="25" y="25" width="750" height="950" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
    
    <rect x="25" y="25" width="750" height="120" rx="8" fill="#f1f5f9" />
    <line x1="25" y1="145" x2="775" y2="145" stroke="#0f766e" stroke-width="3" />
    
    <text x="50" y="65" font-family="'Arial Black', sans-serif" font-size="22" fill="#0f766e">METRO SPECIALTY HOSPITAL &amp; RESEARCH INSTITUTE</text>
    <text x="50" y="88" font-family="Arial" font-size="13" font-weight="bold" fill="#334155">INPATIENT CLINICAL DISCHARGE SUMMARY</text>
    <text x="50" y="108" font-family="Arial" font-size="12" fill="#64748b">NABH Accredited &bull; 24x7 Emergency Care &bull; Department of Orthopedics</text>
    
    <rect x="230" y="155" width="340" height="24" rx="4" fill="#fef2f2" stroke="#fecaca" />
    <text x="245" y="171" font-family="Arial" font-size="12" font-weight="bold" fill="#dc2626">FICTIONAL DEMO — NOT A REAL MEDICAL RECORD</text>

    <rect x="50" y="190" width="700" height="85" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="70" y="215" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Patient:</text>
    <text x="130" y="215" font-family="Arial" font-size="13" font-weight="bold" fill="#0f172a">Ramesh Patel (58 Y / M)</text>
    <text x="440" y="215" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">IPD No:</text>
    <text x="500" y="215" font-family="monospace" font-size="13" fill="#0f172a">#ORTHO-2024-8891</text>
    
    <text x="70" y="240" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Admit Date:</text>
    <text x="160" y="240" font-family="Arial" font-size="12" fill="#0f172a">10-Oct-2024</text>
    <text x="440" y="240" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Discharge Date:</text>
    <text x="550" y="240" font-family="Arial" font-size="12" fill="#0f172a">12-Oct-2024</text>

    <text x="70" y="262" font-family="Arial" font-size="12" font-weight="bold" fill="#475569">Primary Diagnosis:</text>
    <text x="200" y="262" font-family="Arial" font-size="12" font-weight="bold" fill="#0f766e">Right Knee Osteoarthritis, Status Post Arthroscopic Debridement</text>

    <rect x="50" y="290" width="700" height="30" fill="#0f766e" rx="4" />
    <text x="65" y="310" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff">DISCHARGE MEDICATIONS &amp; REGIMEN</text>

    <rect x="50" y="330" width="700" height="150" fill="#f8fafc" stroke="#e2e8f0" rx="6" />
    <text x="70" y="358" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">1. Tab. Cefuroxime Axetil 500 mg — 1 tab PO BD x 5 days (Oral antibiotic)</text>
    <text x="70" y="392" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">2. Tab. Pantoprazole 40 mg — 1 tab PO OD (before breakfast) x 5 days (Gastric protection)</text>
    <text x="70" y="426" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">3. Tab. Paracetamol 650 mg — 1 tab PO SOS (only if pain &gt; 4/10, max 3 times daily)</text>
    <text x="70" y="460" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">4. Tab. Calcium &amp; Vitamin D3 — 1 tab PO OD x 30 days</text>

    <rect x="50" y="500" width="700" height="30" fill="#0f766e" rx="4" />
    <text x="65" y="520" font-family="Arial" font-size="12" font-weight="bold" fill="#ffffff">WOUND CARE &amp; POST-OPERATIVE INSTRUCTIONS</text>

    <rect x="50" y="540" width="700" height="160" fill="#ffffff" stroke="#e2e8f0" rx="6" />
    <text x="70" y="570" font-family="Arial" font-size="12" fill="#334155">&bull; Keep right knee surgical dressing clean and dry. Do not wet dressing until suture removal.</text>
    <text x="70" y="600" font-family="Arial" font-size="12" fill="#334155">&bull; Active ankle pumps and static quadriceps exercises 15 minutes, three times daily.</text>
    <text x="70" y="630" font-family="Arial" font-size="12" fill="#334155">&bull; Ice pack application for 20 minutes every 4 hours over knee to reduce swelling.</text>
    <text x="70" y="660" font-family="Arial" font-size="12" font-weight="bold" fill="#dc2626">&bull; RED FLAG WARNING: Return to ER immediately if fever &gt; 101°F, foul wound discharge, or calf swelling occurs.</text>

    <text x="70" y="740" font-family="Arial" font-size="13" font-weight="bold" fill="#0f766e">Follow-up: Visit Orthopedic OPD on 19-Oct-2024 for suture removal and rehabilitation review.</text>

    <g transform="translate(480, 810)">
      <text x="40" y="75" font-family="Arial" font-size="12" font-weight="bold" fill="#334155">Dr. Amit Joshi, MS (Ortho)</text>
      <text x="40" y="92" font-family="Arial" font-size="11" fill="#64748b">Senior Orthopedic Surgeon</text>
    </g>

    <rect x="25" y="940" width="750" height="35" rx="4" fill="#f8fafc" />
    <text x="40" y="962" font-family="Arial" font-size="11" fill="#64748b">
      Notice: This discharge summary is a simulated record used exclusively for demonstration testing in MedScript AI.
    </text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/**
 * Demo Document 1: Doctor's Handwritten Prescription
 */
export function getPrescriptionDemoDocument(): ProcessedDocument {
  return {
    id: 'demo-doc-1',
    name: 'Cardiology_Prescription_DrMehta.pdf',
    type: 'prescription',
    imageDataUrl: createPrescriptionSvg(),
    uploadedAt: new Date(Date.now() - 3600000).toISOString(),
    fileSize: 428000,
    isDemo: true,
    patientName: 'Rajesh Sharma',
    clinicOrDoctorName: 'Dr. Suresh K. Mehta, MD (Cardiology)',
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
      { id: 'tok-8', text: 'Leukopenia', confidence: 62, bbox: { x: 45, y: 64, width: 22, height: 4 }, category: 'diagnosis', isUncertain: true, alternatives: ['Leukopenia', 'Leukemia', "I'm not sure"], sourceCropUrl: createLeukopeniaCropSvg(), medicalMeaning: 'A reduction in the number of white blood cells (leukocytes) in the blood, which can temporarily reduce resistance to infections.' },
      { id: 'tok-9', text: 'Recheck Complete Blood Count & Fasting Sugars in 2 weeks', confidence: 92, bbox: { x: 8, y: 69, width: 85, height: 4 }, category: 'instruction', isUncertain: false }
    ],
    rawOcrText: `METRO CARDIOLOGY & INTERNAL MEDICINE
Dr. Suresh K. Mehta, MD, DM (Cardiology), FACC
Patient Name: Rajesh Sharma | Age: 52 Yrs / Male | Date: 14-Oct-2024
BP: 138/88 mmHg | Wt: 74 kg
Known Type 2 Diabetes Mellitus x 4 yrs & Essential Hypertension.
Recent HbA1c: 7.2% (suboptimal glycemic control).
Rx:
1. Tab. Metformin 500 mg — 1 tab PO BD (after meals)
2. Tab. Telmisartan 40 mg — 1 tab PO OD (morning)
3. Tab. Atorvastatin 20 mg — 1 tab PO HS (at bedtime)
Routine CBC showed mild Leukopenia (mild WBC drop).
Recheck Complete Blood Count & Fasting Sugars in 2 weeks.
Maintain low sodium, low carbohydrate diabetic diet.`,
    uncertainWords: [
      {
        id: 'unc-1',
        tokenId: 'tok-8',
        extractedText: 'Leukopenia',
        confidence: 62,
        alternatives: ['Leukopenia', 'Leukemia', "I'm not sure"],
        isResolved: false,
        sourceCropUrl: createLeukopeniaCropSvg(),
        sentenceContext: 'Routine CBC showed mild Leukopenia (mild WBC drop).',
        question: 'What did the doctor write regarding the CBC follow-up?'
      }
    ],
    allUncertainResolved: false,
    selectedLanguage: 'en',
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        { id: 'chk-1', name: 'Anti-Hallucination Guard', passed: true, details: 'Strictly grounded in extracted text tokens only.' },
        { id: 'chk-2', name: 'Dosage Cross-Validation', passed: true, details: 'Metformin 500mg, Telmisartan 40mg, Atorvastatin 20mg verified.' },
        { id: 'chk-3', name: 'Uncertainty Isolation', passed: true, details: 'Word "Leukopenia" (62% confidence) isolated until user confirms.' },
        { id: 'chk-4', name: 'Non-Diagnostic Boundary', passed: true, details: 'Explanatory role preserved; no speculative diagnoses generated.' }
      ]
    },
    structuredMeds: [
      {
        id: 'med-1',
        name: 'Metformin',
        strength: '500 mg',
        dosage: '1 tablet',
        frequency: 'Twice daily (BD)',
        timingInstructions: 'After food / with meals (morning and dinner)',
        purpose: 'Controls blood glucose by reducing liver sugar production',
        isVerified: true,
        confidence: 0.96,
        confidenceGrade: 'HIGH'
      },
      {
        id: 'med-2',
        name: 'Telmisartan',
        strength: '40 mg',
        dosage: '1 tablet',
        frequency: 'Once daily (OD)',
        timingInstructions: 'Morning time with water',
        purpose: 'Lowers arterial blood pressure by relaxing blood vessels',
        isVerified: true,
        confidence: 0.95,
        confidenceGrade: 'HIGH'
      },
      {
        id: 'med-3',
        name: 'Atorvastatin',
        strength: '20 mg',
        dosage: '1 tablet',
        frequency: 'Once daily at bedtime (HS)',
        timingInstructions: 'At night before sleep',
        purpose: 'Lowers LDL cholesterol and stabilizes arterial plaque',
        isVerified: true,
        confidence: 0.94,
        confidenceGrade: 'HIGH'
      }
    ],
    diagnoses: ['Type 2 Diabetes Mellitus', 'Essential Hypertension', 'Mild Leukopenia (Isolated/Uncertain)'],
    instructions: [
      'Take Metformin 500mg twice daily after meals.',
      'Take Telmisartan 40mg once daily in the morning.',
      'Take Atorvastatin 20mg once daily at bedtime.',
      'Recheck Complete Blood Count (CBC) and Fasting Blood Sugar in 2 weeks.',
      'Maintain low-sodium, low-carbohydrate diabetic diet.'
    ],
    labFindings: ['HbA1c: 7.2% (suboptimal glycemic control)', 'Blood Pressure: 138/88 mmHg'],
    symptoms: ['Mild WBC drop noted on routine lab check'],
    separatedContent: {
      documentSays: [
        { category: 'Clinical Vitals', field: 'Blood Pressure', value: '138/88 mmHg' },
        { category: 'Laboratory Test', field: 'Recent HbA1c', value: '7.2% (Target < 5.7%)' },
        { category: 'Prescribed Drug', field: 'Metformin', value: '500 mg BD after food' },
        { category: 'Prescribed Drug', field: 'Telmisartan', value: '40 mg OD morning' },
        { category: 'Prescribed Drug', field: 'Atorvastatin', value: '20 mg HS bedtime' }
      ],
      termMeanings: [
        { term: 'HbA1c (7.2%)', meaning: 'Measures 3-month average glucose. 7.2% indicates moderately elevated sugar.', caution: 'Does not imply acute emergency.' },
        { term: 'Leukopenia', meaning: 'Slightly reduced white blood cells that defend against infections.', caution: 'Does NOT mean leukemia or cancer.' },
        { term: 'Essential Hypertension', meaning: 'Chronic elevated blood pressure in arteries without a single distinct external trigger.' }
      ],
      notDetermined: [
        { topic: 'Previous Medication Dosage', explanation: 'Whether Metformin was previously taken at 250mg or 500mg is not stated on this sheet.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'MedScript Optical Stroke Engine',
      hasNumericalConfidence: true,
      averageConfidenceScore: 0.94,
      providerNotice: 'Optical text & stroke confidence calculated successfully.',
      highConfidenceCount: 8,
      mediumConfidenceCount: 0,
      needsVerificationCount: 1
    },
    serviceConfigured: true,
    isVerifiedContent: true,
    translations: {
      en: {
        language: 'en',
        languageName: 'English',
        simpleSummary: 'This is a prescription from Dr. Suresh K. Mehta for Rajesh Sharma managing blood sugar and blood pressure with 3 daily medications.',
        explainLikeIm10: "Think of your body like a busy city. Your blood sugar is like traffic that got a little too heavy (7.2 HbA1c). Metformin helps clear the traffic jam, Telmisartan keeps your blood vessels smooth and calm so blood flows easily, and Atorvastatin cleans the road so grease doesn't stick. The doctor also asked for a blood test check in two weeks to count your white blood cell defense team.",
        whatWasWritten: [
          'Diagnosis: Type 2 Diabetes Mellitus and Essential Hypertension.',
          'Recent Blood Test: HbA1c 7.2%, Blood Pressure 138/88 mmHg.',
          'Medication 1: Tab. Metformin 500 mg — 1 tablet twice daily after meals (BD).',
          'Medication 2: Tab. Telmisartan 40 mg — 1 tablet once daily in the morning (OD).',
          'Medication 3: Tab. Atorvastatin 20 mg — 1 tablet once daily at bedtime (HS).',
          'Follow-up: Recheck Complete Blood Count & Fasting Sugars in 2 weeks.'
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
        ],
        breakdown: {
          whatIsThis: 'A handwritten outpatient prescription from Dr. Suresh K. Mehta for diabetes and blood pressure management.',
          whatItSays: 'Prescribes Metformin 500mg, Telmisartan 40mg, and Atorvastatin 20mg with a follow-up CBC in 2 weeks.',
          whatToDo: 'Take the three medications strictly as directed, follow a diabetic low-salt diet, and retest blood counts in two weeks.',
          whatToWatch: 'Watch for dizziness when standing up, and consult the clinic if blood sugar drops too low.',
          whatIsUnclear: 'Handwriting stroke on line 4 was flagged between Leukopenia and Leukemia; user confirmed Leukopenia.'
        }
      },
      te: {
        language: 'te',
        languageName: 'Telugu',
        simpleSummary: 'డాక్టర్ సురేష్ కె. మెహతా గారు రాజేష్ శర్మ గారికి రాసిన ప్రిస్క్రిప్షన్. ఇందులో బ్లడ్ షుగర్ (HbA1c 7.2%), రక్తపోటు (138/88) మరియు కొలెస్ట్రాల్ నియంత్రణ కోసం 3 రకాల మందులు సూచించబడ్డాయి.',
        explainLikeIm10: "మీ శరీరాన్ని ఒక చక్కటి ఇల్లుగా భావించండి. రక్తంలో చక్కెర స్థాయి (7.2%) కాస్త ఎక్కువైంది. మెట్‌ఫార్మిన్ దానిని తగ్గిస్తుంది, టెల్మిసార్టన్ రక్తపోటును అదుపులో ఉంచుతుంది, మరియు అటోర్వాస్టాటిన్ గుండెను రక్షిస్తుంది. ల్యూకోపీనియా అంటే తెల్ల రక్త కణాలు కాస్త తగ్గడం మాత్రమే; ఇది క్యాన్సర్ లేదా ల్యుకేమియా కాదు!",
        whatWasWritten: [
          'వ్యాధి నిర్ధారణ: టైప్ 2 డయాబెటిస్ మరియు రక్తపోటు (హైపర్‌టెన్షన్).',
          'ల్యాబ్ ఫలితం: ఇటీవల HbA1c 7.2%, రక్తపోటు 138/88 mmHg.',
          'మందు 1: Tab. Metformin 500 mg — భోజనం తర్వాత రోజుకు రెండుసార్లు.',
          'మందు 2: Tab. Telmisartan 40 mg — రోజూ ఉదయం ఒకసారి.',
          'మందు 3: Tab. Atorvastatin 20 mg — రాత్రి పడుకునే ముందు ఒకసారి.',
          'ఫాలో-అప్: 2 వారాల తర్వాత మళ్ళీ CBC రక్త పరీక్ష చేయించుకోవాలి.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-te-1',
            term: 'HbA1c (7.2%)',
            simpleMeaning: 'గత 3 నెలల సగటు బ్లడ్ షుగర్ స్థాయి.',
            documentContext: 'Recent HbA1c: 7.2%',
            whatItDoesNotMean: 'వెంటనే ఇన్సులిన్ ఇంజెక్షన్లు అవసరమని దీని అర్థం కాదు.',
            category: 'lab_value'
          },
          {
            id: 'term-te-2',
            term: 'Leukopenia (ల్యూకోపీనియా)',
            simpleMeaning: 'శరీరంలో తెల్ల రక్త కణాలు కొద్దిగా తగ్గడం.',
            documentContext: 'Routine CBC showed mild Leukopenia',
            whatItDoesNotMean: 'ఇది ల్యుకేమియా లేదా బ్లడ్ క్యాన్సర్ కాదు!',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'బీపీ 138/88 mmHg మరియు షుగర్ 7.2% ఉన్నట్లు గుర్తించారు.',
          'నియంత్రణ కోసం మూడు రోజువారీ మాత్రలు సూచించబడ్డాయి.',
          'రెండు వారాల తర్వాత మళ్ళీ రక్త పరీక్ష చేయించుకోవాలని డాక్టర్ చెప్పారు.'
        ],
        whatIsUnclear: [
          'లైన్ 4 లోని రాత ల్యూకోపీనియా మరియు ల్యుకేమియా మధ్య సందిగ్ధతగా ఉంది, ఇది తెల్ల రక్త కణాల స్వల్ప తగ్గుదల మాత్రమే.'
        ],
        whatToAskDoctor: [
          'మెట్‌ఫార్మిన్ మాత్రను భోజనం తిన్న వెంటనే వేసుకోవాలా?',
          'రెండు వారాల తర్వాత చేసే సీబీసీ పరీక్షకు ఖాళీ కడుపుతో ఉండాలా?'
        ],
        spokenScript: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వర్చువల్ మెడికల్ ఎక్స్‌ప్లేనర్‌ను. డాక్టర్ సురేష్ కె. మెహతా గారు రాజేష్ శర్మ గారికి రాసిన ప్రిస్క్రిప్షన్‌ను నేను పూర్తిగా పరిశీలించాను. మీ బ్లడ్ షుగర్ స్థాయి HbA1c 7.2 శాతం మరియు రక్తపోటు 138/88 కాస్త ఎక్కువగా ఉన్నాయి. డాక్టర్ గారు మీకు మూడు మందులు సూచించారు: మొదటిది, షుగర్ నియంత్రణ కోసం మెట్‌ఫార్మిన్ 500 మిల్లీగ్రాములు భోజనం తర్వాత రోజుకు రెండుసార్లు. రెండవది, బీపీ నియంత్రణ కోసం టెల్మిసార్టన్ 40 మిల్లీగ్రాములు రోజూ ఉదయం ఒకసారి. మూడవది, కొలెస్ట్రాల్ మరియు గుండె సంరక్షణ కోసం అటోర్వాస్టాటిన్ 20 మిల్లీగ్రాములు రాత్రి పడుకునే ముందు. ముఖ్యమైన విషయం, ప్రిస్క్రిప్షన్‌లో ల్యూకోపీనియా అని ఉంది; అంటే తెల్ల రక్త కణాలు కాస్త తగ్గడం మాత్రమే, ఇది క్యాన్సర్ లేదా ల్యుకేమియా కాదు! ఆందోళన చెందకండి. రెండు వారాల తర్వాత మళ్ళీ సీబీసీ రక్త పరీక్ష చేయించుకోండి.",
        spokenScriptPhonetic: "Namaskaram! Nenu mee MedScript AI virtual medical explainer-nu. Doctor Suresh K. Mehta gaaru Rajesh Sharma gaariki raasina prescription-nu nenu poorthigaa pariseelinchanu. Mee blood sugar sthaayi HbA1c 7.2 saatham mariyu raktapotu 138/88 kaasta ekkuvagaa unnaayi. Mandulu: Metformin 500 milligram-lu bhojanam taruvatha rojukoo rendu saarlu. Telmisartan 40 milligram-lu rojukoo udayam oka saari. Atorvastatin 20 milligram-lu raatri padukuney mundu. Mukhya vishayam, prescription-lo Leukopenia ani undi; ante thella raktha kanaalu kaasta taggadam maathrame, idi cancer kaadu!",
        sentenceTimings: [
          { sentence: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వర్చువల్ మెడికల్ ఎక్స్‌ప్లేనర్‌ను.", durationSec: 3.5, topic: 'intro' },
          { sentence: "డాక్టర్ సురేష్ కె. మెహతా గారు రాజేష్ శర్మ గారికి రాసిన ప్రిస్క్రిప్షన్‌ను నేను పూర్తిగా పరిశీలించాను.", durationSec: 4.8, topic: 'review' },
          { sentence: "మీ బ్లడ్ షుగర్ స్థాయి HbA1c 7.2 శాతం మరియు రక్తపోటు 138/88 కాస్త ఎక్కువగా ఉన్నాయి.", durationSec: 4.5, topic: 'findings' },
          { sentence: "మొదటిది, షుగర్ నియంత్రణ కోసం మెట్‌ఫార్మిన్ 500 మిల్లీగ్రాములు భోజనం తర్వాత రోజుకు రెండుసార్లు.", durationSec: 5.2, topic: 'metformin' },
          { sentence: "రెండవది, బీపీ నియంత్రణ కోసం టెల్మిసార్టన్ 40 మిల్లీగ్రాములు రోజూ ఉదయం ఒకసారి.", durationSec: 4.2, topic: 'telmisartan' },
          { sentence: "మూడవది, కొలెస్ట్రాల్ మరియు గుండె సంరక్షణ కోసం అటోర్వాస్టాటిన్ 20 మిల్లీగ్రాములు రాత్రి పడుకునే ముందు.", durationSec: 4.8, topic: 'atorvastatin' },
          { sentence: "ముఖ్యమైన విషయం, ప్రిస్క్రిప్షన్‌లో ల్యూకోపీనియా అని ఉంది; ఇది తెల్ల రక్త కణాల స్వల్ప తగ్గుదల మాత్రమే, క్యాన్సర్ లేదా ల్యుకేమియా కాదు!", durationSec: 6.0, topic: 'clarification' },
          { sentence: "రెండు వారాల తర్వాత మళ్ళీ సీబీసీ రక్త పరీక్ష చేయించుకోండి.", durationSec: 3.8, topic: 'followup' }
        ],
        breakdown: {
          whatIsThis: 'డాక్టర్ సురేష్ మెహతా గారు డయాబెటిస్ మరియు బీపీ కోసం ఇచ్చిన ప్రిస్క్రిప్షన్.',
          whatItSays: 'మెట్‌ఫార్మిన్, టెల్మిసార్టన్, అటోర్వాస్టాటిన్ వాడాలి మరియు 2 వారాల తర్వాత పరీక్ష చేయించుకోవాలి.',
          whatToDo: 'మందులను క్రమం తప్పకుండా వాడండి, ఉప్పు తగ్గించండి.',
          whatToWatch: 'నీరసం లేదా కళ్ళు తిరిగితే వెంటనే డాక్టర్‌కు తెలియజేయండి.',
          whatIsUnclear: 'ల్యూకోపీనియా అన్న పదం ల్యుకేమియా కాదని నిర్ధారించబడింది.'
        }
      },
      hi: {
        language: 'hi',
        languageName: 'Hindi',
        simpleSummary: 'डॉ. सुरेश के. मेहता द्वारा राजेश शर्मा के लिए लिखा गया पर्चा। ब्लड शुगर (HbA1c 7.2%) और ब्लड प्रेशर (138/88) नियंत्रण के लिए 3 दवाएं लिखी गई हैं।',
        explainLikeIm10: "आपके शरीर में ब्लड शुगर का स्तर (7.2%) थोड़ा बढ़ा हुआ है। मेटफॉर्मिन शुगर को घटाने में मदद करती है, टेल्मीसार्टन ब्लड प्रेशर को सामान्य रखती है, और एटोरवास्टेटिन दिल की नसों को सुरक्षित रखती है। ल्यूकोपेनिया का मतलब केवल सफेद रक्त कोशिकाओं में हल्की कमी है; यह कोई कैंसर या ल्यूकेमिया नहीं है!",
        whatWasWritten: [
          'निदान: टाइप 2 डायबिटीज और हाइपरटेंशन।',
          'जांच रिपोर्ट: HbA1c 7.2%, ब्लड प्रेशर 138/88 mmHg.',
          'दवा 1: Tab. Metformin 500 mg — भोजन के बाद दिन में दो बार।',
          'दवा 2: Tab. Telmisartan 40 mg — रोज सुबह एक बार।',
          'दवा 3: Tab. Atorvastatin 20 mg — रात को सोते समय।',
          'फॉलो-अप: 2 सप्ताह में दोबारा सीबीसी रक्त जांच।'
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
          'ब्लड प्रेशर 138/88 mmHg और HbA1c 7.2% दर्ज किया गया।',
          'शुगर और बीपी के लिए तीन दैनिक दवाएं लिखी गई हैं।',
          '2 सप्ताह बाद दोबारा रक्त जांच कराने को कहा गया है।'
        ],
        whatIsUnclear: ['चौथी पंक्ति में ल्यूकोपेनिया केवल सफेद रक्त कोशिकाओं की हल्की कमी है।'],
        whatToAskDoctor: ['क्या मेटफॉर्मिन को भोजन के तुरंत बाद लेना चाहिए?'],
        spokenScript: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई वर्चुअल मेडिकल एक्सप्लेनर हूँ। डॉ. सुरेश के. मेहता द्वारा राजेश शर्मा के लिए लिखे गए पर्चे की मैंने पूरी जांच कर ली है। आपकी रिपोर्ट बताती है कि आपका ब्लड शुगर स्तर और ब्लड प्रेशर थोड़ा बढ़ा हुआ है। इसके लिए आपको तीन दवाएं लेनी हैं: पहली, शुगर के लिए मेटफॉर्मिन 500 मिलीग्राम भोजन के बाद दिन में दो बार। दूसरी, ब्लड प्रेशर के लिए टेल्मीसार्टन 40 मिलीग्राम रोज सुबह एक बार। तीसरी, दिल की सुरक्षा के लिए एटोरवास्टेटिन 20 मिलीग्राम रात को सोते समय। सबसे महत्वपूर्ण, पर्चे में ल्यूकोपेनिया लिखा है, जो केवल सफेद रक्त कोशिकाओं में हल्की कमी है, यह कोई कैंसर या ल्यूकेमिया नहीं है! दो सप्ताह बाद दोबारा सीबीसी ब्लड टेस्ट कराएं।",
        spokenScriptPhonetic: "Namaste! Main aapka MedScript AI virtual medical explainer hoon. Doctor Suresh Mehta ke parche ki maine jaanch kar li hai. Aapki report batati hai ki blood sugar aur BP thoda badha hua hai. Dawaiyan: Metformin 500 milligram bhojan ke baad din mein do baar. Telmisartan 40 milligram roz subah ek baar. Atorvastatin 20 milligram raat ko sote samay. Report mein Leukopenia likha hai jo koi cancer ya leukemia nahi hai! Do saptah baad dobara blood test karayein.",
        sentenceTimings: [
          { sentence: "नमस्ते! मैं आपका मेडस्क्रिप्ट एआई वर्चुअल मेडिकल एक्सप्लेनर हूँ।", durationSec: 3.5, topic: 'intro' },
          { sentence: "डॉ. सुरेश के. मेहता द्वारा लिखे गए पर्चे की मैंने पूरी जांच कर ली है।", durationSec: 4.5, topic: 'review' },
          { sentence: "आपकी रिपोर्ट बताती है कि आपका ब्लड शुगर स्तर और ब्लड प्रेशर थोड़ा बढ़ा हुआ है।", durationSec: 4.8, topic: 'findings' },
          { sentence: "पहली, शुगर के लिए मेटफॉर्मिन 500 मिलीग्राम भोजन के बाद दिन में दो बार।", durationSec: 5.0, topic: 'metformin' },
          { sentence: "दूसरी, ब्लड प्रेशर के लिए टेल्मीसार्टन 40 मिलीग्राम रोज सुबह एक बार।", durationSec: 4.2, topic: 'telmisartan' },
          { sentence: "तीसरी, दिल की सुरक्षा के लिए एटोरवास्टेटिन 20 मिलीग्राम रात को सोते समय।", durationSec: 4.6, topic: 'atorvastatin' },
          { sentence: "सबसे महत्वपूर्ण, पर्चे में ल्यूकोपेनिया लिखा है, जो केवल सफेद रक्त कोशिकाओं में हल्की कमी है, यह कोई कैंसर नहीं है!", durationSec: 6.0, topic: 'clarification' },
          { sentence: "दो सप्ताह बाद दोबारा सीबीसी ब्लड टेस्ट कराएं।", durationSec: 3.5, topic: 'followup' }
        ],
        breakdown: {
          whatIsThis: 'डायबिटीज और बीपी के लिए डॉक्टर सुरेश मेहता का पर्चा।',
          whatItSays: 'तीन दैनिक दवाएं और 2 सप्ताह बाद सीबीसी जांच।',
          whatToDo: 'दवाएं नियम से लें और नमक कम खाएं।',
          whatToWatch: 'चक्कर आने पर डॉक्टर से मिलें।',
          whatIsUnclear: 'ल्यूकोपेनिया ल्यूकेमिया नहीं है, केवल हल्की डब्ल्यूबीसी कमी है।'
        }
      }
    },
    get explanation(): DocumentExplanation {
      return this.translations[this.selectedLanguage] || this.translations.en;
    }
  };
}

/**
 * Demo Document 2: Clinical Laboratory Report (Viral Hepatitis)
 */
export function getHepatitisLabDemoDocument(): ProcessedDocument {
  return getHepatitisDocument();
}

/**
 * Demo Document 3: Hospital Inpatient Discharge Summary
 */
export function getDischargeSummaryDemoDocument(): ProcessedDocument {
  const fullTranscript = `METRO SPECIALTY HOSPITAL & RESEARCH INSTITUTE
INPATIENT CLINICAL DISCHARGE SUMMARY
Patient: Ramesh Patel (58 Y / M) | IPD No: #ORTHO-2024-8891
Admit Date: 10-Oct-2024 | Discharge Date: 12-Oct-2024
Primary Diagnosis: Right Knee Osteoarthritis, Status Post Arthroscopic Debridement

DISCHARGE MEDICATIONS:
1. Tab. Cefuroxime Axetil 500 mg — 1 tab PO BD x 5 days
2. Tab. Pantoprazole 40 mg — 1 tab PO OD (before breakfast) x 5 days
3. Tab. Paracetamol 650 mg — 1 tab PO SOS (only if pain > 4/10)
4. Tab. Calcium & Vitamin D3 — 1 tab PO OD x 30 days

WOUND CARE & POST-OPERATIVE INSTRUCTIONS:
- Keep surgical dressing clean and dry.
- Active ankle pumps and static quadriceps exercises 15 minutes, three times daily.
- Ice pack application for 20 minutes every 4 hours.
- RED FLAG WARNING: Return to ER immediately if fever > 101°F, foul wound discharge, or calf swelling occurs.
Follow-up: Orthopedic OPD on 19-Oct-2024 for suture removal.`;

  return {
    id: 'demo-discharge-summary',
    name: 'Hospital_Discharge_Summary_MetroSpecialty.pdf',
    type: 'discharge_summary',
    imageDataUrl: createDischargeSummarySvg(),
    uploadedAt: new Date(Date.now() - 1800000).toISOString(),
    fileSize: 384000,
    isDemo: true,
    patientName: 'Ramesh Patel',
    clinicOrDoctorName: 'Dr. Amit Joshi, MS (Ortho) — Metro Specialty Hospital',
    quality: {
      status: 'pass',
      overallScore: 97,
      blurScore: 98,
      darknessScore: 95,
      glareScore: 97,
      resolutionScore: 99,
      rotationAngle: 0,
      handwritingVisibilityScore: 96,
      issues: [],
      suggestions: ['High clarity hospital discharge report with verified medication and care instructions.']
    },
    tokens: [
      { id: 'tok-dis-1', text: 'Patient: Ramesh Patel (58 Y / M)', confidence: 99, bbox: { x: 8, y: 21, width: 35, height: 4 }, category: 'patient_info', isUncertain: false },
      { id: 'tok-dis-2', text: 'Right Knee Osteoarthritis, Post Arthroscopic Debridement', confidence: 98, bbox: { x: 8, y: 26, width: 75, height: 4 }, category: 'diagnosis', isUncertain: false },
      { id: 'tok-dis-3', text: 'Tab. Cefuroxime Axetil 500 mg — 1 tab PO BD x 5 days', confidence: 97, bbox: { x: 8, y: 35, width: 75, height: 4 }, category: 'medication', isUncertain: false },
      { id: 'tok-dis-4', text: 'Tab. Pantoprazole 40 mg — 1 tab PO OD before breakfast', confidence: 98, bbox: { x: 8, y: 39, width: 75, height: 4 }, category: 'medication', isUncertain: false },
      { id: 'tok-dis-5', text: 'RED FLAG: Return if fever > 101°F or calf swelling occurs', confidence: 99, bbox: { x: 8, y: 66, width: 85, height: 4 }, category: 'instruction', isUncertain: false }
    ],
    rawOcrText: fullTranscript,
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        { id: 'chk-dis-1', name: 'Anti-Hallucination Guard', passed: true, details: 'Strictly grounded in hospital discharge document.' },
        { id: 'chk-dis-2', name: 'Antibiotic Duration Guard', passed: true, details: 'Cefuroxime 500mg verified for 5 days post-operative prophylaxis.' },
        { id: 'chk-dis-3', name: 'Emergency Warning Flags', passed: true, details: 'Fever and calf DVT warning signs highlighted.' }
      ]
    },
    structuredMeds: [
      {
        id: 'med-dis-1',
        name: 'Cefuroxime Axetil',
        strength: '500 mg',
        dosage: '1 tablet',
        frequency: 'Twice daily (BD)',
        timingInstructions: 'Every 12 hours after food for 5 days',
        purpose: 'Post-operative antibiotic to prevent joint and surgical site infection',
        isVerified: true,
        confidence: 0.97,
        confidenceGrade: 'HIGH'
      },
      {
        id: 'med-dis-2',
        name: 'Pantoprazole',
        strength: '40 mg',
        dosage: '1 tablet',
        frequency: 'Once daily (OD)',
        timingInstructions: 'In the morning 30 minutes before breakfast',
        purpose: 'Protects stomach lining against irritation from painkillers',
        isVerified: true,
        confidence: 0.98,
        confidenceGrade: 'HIGH'
      },
      {
        id: 'med-dis-3',
        name: 'Paracetamol',
        strength: '650 mg',
        dosage: '1 tablet',
        frequency: 'SOS (Only when knee pain is noticeable)',
        timingInstructions: 'As needed for surgical pain, max 3 times daily',
        purpose: 'Mild-to-moderate post-operative pain relief',
        isVerified: true,
        confidence: 0.98,
        confidenceGrade: 'HIGH'
      }
    ],
    diagnoses: ['Right Knee Osteoarthritis', 'Status Post Arthroscopic Debridement'],
    instructions: [
      'Take Cefuroxime 500mg twice daily for 5 days without skipping doses.',
      'Take Pantoprazole 40mg before breakfast for 5 days.',
      'Take Paracetamol 650mg only if knee pain exceeds 4 out of 10.',
      'Keep dressing completely dry until suture removal on 19-Oct-2024.',
      'Perform ankle pumps and quadriceps exercises 15 minutes three times daily.',
      'Seek emergency attention immediately if high fever, calf pain, or wound discharge develops.'
    ],
    labFindings: ['Post-operative surgical vitals stable: BP 124/80 mmHg, Pulse 76 bpm, Afebrile.'],
    symptoms: ['Mild post-arthroscopy right knee soreness (expected surgical recovery).'],
    separatedContent: {
      documentSays: [
        { category: 'Surgical Procedure', field: 'Surgery', value: 'Right Knee Arthroscopic Debridement' },
        { category: 'Inpatient Stay', field: 'Duration', value: 'Admitted 10-Oct-2024, Discharged 12-Oct-2024' },
        { category: 'Prescribed Antibiotic', field: 'Cefuroxime', value: '500 mg BD x 5 days' },
        { category: 'Follow-up Date', field: 'OPD Suture Removal', value: '19-Oct-2024' }
      ],
      termMeanings: [
        { term: 'Arthroscopic Debridement', meaning: 'Minimally invasive keyhole joint surgery removing loose cartilage fragments and smoothing joint surfaces.', caution: 'Requires gentle physical therapy exercises during recovery.' },
        { term: 'Axetil (Cefuroxime)', meaning: 'Second-generation cephalosporin antibiotic.' }
      ],
      notDetermined: [
        { topic: 'Long-term Cartilage Injections', explanation: 'Whether hyaluronic acid or PRP injections are planned later is not documented on this discharge note.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'MedScript Optical Stroke Engine',
      hasNumericalConfidence: true,
      averageConfidenceScore: 0.98,
      providerNotice: 'Hospital discharge records verified with complete stroke extraction.',
      highConfidenceCount: 5,
      mediumConfidenceCount: 0,
      needsVerificationCount: 0
    },
    serviceConfigured: true,
    isVerifiedContent: true,
    translations: {
      en: {
        language: 'en',
        languageName: 'English',
        simpleSummary: 'Hospital Inpatient Discharge Summary from Metro Specialty Hospital for Ramesh Patel following successful Right Knee Arthroscopic Debridement.',
        explainLikeIm10: "You had a successful keyhole surgery to clean and smooth your right knee joint. You are now going home! Take your antibiotic pill twice a day for 5 days to keep germs away, and take your stomach pill before breakfast. Do your gentle leg exercises three times a day, keep your knee bandage dry, and come back on October 19th to have your stitches removed.",
        whatWasWritten: [
          'Hospital: Metro Specialty Hospital & Research Institute.',
          'Patient: Ramesh Patel (58 Y / M), IPD #ORTHO-2024-8891.',
          'Surgery Performed: Right Knee Arthroscopic Debridement.',
          'Medication 1: Tab. Cefuroxime 500 mg — 1 tablet twice daily x 5 days (antibiotic).',
          'Medication 2: Tab. Pantoprazole 40 mg — 1 tablet before breakfast x 5 days (stomach protection).',
          'Medication 3: Tab. Paracetamol 650 mg — as needed for knee pain.',
          'Follow-up: Orthopedic OPD on 19-Oct-2024 for suture removal.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-dis-1',
            term: 'Arthroscopic Debridement',
            simpleMeaning: 'A minimally invasive surgical procedure using tiny camera tools to clean out worn cartilage and smooth rough edges inside the knee joint.',
            documentContext: 'Status Post Arthroscopic Debridement',
            whatItDoesNotMean: 'This was not an artificial knee joint replacement surgery.',
            category: 'diagnosis'
          },
          {
            id: 'term-dis-2',
            term: 'Cefuroxime (500mg)',
            simpleMeaning: 'A protective antibiotic medicine given after surgery to ensure the joint healing area stays free of bacterial infection.',
            documentContext: 'Tab. Cefuroxime Axetil 500 mg BD x 5 days',
            whatItDoesNotMean: 'It is not a painkiller; take the full 5-day course as prescribed.',
            category: 'medication'
          }
        ],
        whatDocumentSaysHappened: [
          'The patient was admitted on 10-Oct-2024 and discharged on 12-Oct-2024 with stable vital signs.',
          'Right knee arthroscopy was completed without surgical complications.',
          'The surgical team provided four discharge medications and wound care directions.',
          'An appointment for suture removal was scheduled for 19-Oct-2024.'
        ],
        whatIsUnclear: [
          'Exact duration for using crutches or a walking cane was not quantified on this summary.'
        ],
        whatToAskDoctor: [
          'When can I put my full body weight on my right knee without support?',
          'How soon after the October 19th stitch removal may I take a normal shower?',
          'Should I start outpatient physical therapy before or after suture removal?'
        ],
        spokenScript: "Hello, I am your MedScript AI Virtual Medical Explainer. I have reviewed your hospital discharge summary from Metro Specialty Hospital. Patient Ramesh Patel has been discharged following right knee arthroscopic keyhole surgery. Your vital signs are stable and recovery is proceeding well. You have been prescribed Cefuroxime antibiotic 500 milligrams twice daily for five days, Pantoprazole 40 milligrams in the morning before breakfast, and Paracetamol for pain as needed. Please keep your knee bandage clean and dry, perform your ankle pump exercises three times daily, and return on October 19th for stitch removal. If you experience fever or severe calf swelling, contact the emergency department immediately.",
        sentenceTimings: [
          { sentence: "Hello, I am your MedScript AI Virtual Medical Explainer.", durationSec: 3.5, topic: 'intro' },
          { sentence: "I have reviewed your hospital discharge summary from Metro Specialty Hospital.", durationSec: 4.2, topic: 'review' },
          { sentence: "Patient Ramesh Patel has been discharged following right knee arthroscopic keyhole surgery.", durationSec: 5.5, topic: 'surgery' },
          { sentence: "Your vital signs are stable and recovery is proceeding well.", durationSec: 3.8, topic: 'vitals' },
          { sentence: "You have been prescribed Cefuroxime antibiotic 500 milligrams twice daily for five days,", durationSec: 5.0, topic: 'cefuroxime' },
          { sentence: "Pantoprazole 40 milligrams in the morning before breakfast, and Paracetamol for pain as needed.", durationSec: 5.8, topic: 'meds' },
          { sentence: "Please keep your knee bandage clean and dry, perform your ankle pump exercises three times daily,", durationSec: 5.8, topic: 'woundcare' },
          { sentence: "and return on October 19th for stitch removal.", durationSec: 3.8, topic: 'followup' },
          { sentence: "If you experience fever or severe calf swelling, contact the emergency department immediately.", durationSec: 5.5, topic: 'redflag' }
        ],
        breakdown: {
          whatIsThis: 'Hospital Inpatient Discharge Summary following right knee arthroscopic surgery.',
          whatItSays: 'Discharged in stable condition with 5-day antibiotic regimen and wound care directives.',
          whatToDo: 'Take Cefuroxime BD, keep dressing dry, perform quad exercises, and return on Oct 19 for suture removal.',
          whatToWatch: 'Watch for fever over 101°F or calf swelling, which require immediate medical review.',
          whatIsUnclear: 'Specific date for resuming driving was not specified on this sheet.'
        }
      },
      te: {
        language: 'te',
        languageName: 'Telugu',
        simpleSummary: 'మెట్రో స్పెషాలిటీ హాస్పిటల్ నుండి రమేష్ పటేల్ గారి కుడి మోకాలి ఆర్థ్రోస్కోపీ సర్జరీ అనంతరం డిశ్చార్జ్ సారాంశం.',
        explainLikeIm10: "మీ కుడి మోకాలి కీలును శుభ్రం చేయడానికి చేసిన కీహోల్ సర్జరీ విజయవంతంగా పూర్తయింది. ఇన్ఫెక్షన్ రాకుండా యాంటీబయాటిక్ మాత్రలను 5 రోజులు క్రమం తప్పకుండా వాడండి. మోకాలి కట్టును తడవకుండా చూసుకోండి మరియు అక్టోబర్ 19న కుట్లు విప్పడానికి రండి.",
        whatWasWritten: [
          'రోగి: రమేష్ పటేల్ (58 సం.), కుడి మోకాలి ఆర్థ్రోస్కోపిక్ సర్జరీ.',
          'సెఫురోక్సిమ్ 500mg — రోజుకు రెండుసార్లు 5 రోజులు (యాంటీబయాటిక్).',
          'పాంటోప్రజోల్ 40mg — ఉదయం టిఫిన్ ముందు 5 రోజులు.',
          'పారాసిటమాల్ 650mg — నొప్పి ఉన్నప్పుడు మాత్రమే.',
          'ఫాలో-అప్: అక్టోబర్ 19, 2024న కుట్లు తొలగించడానికి రావాలి.'
        ],
        whatMedicalTermsMean: [
          {
            id: 'term-dis-te-1',
            term: 'Arthroscopic Debridement',
            simpleMeaning: 'చిన్న రంధ్రాల ద్వారా కెమెరా సాధనాలతో మోకాలి కీలు లోపలి అరిగిపోయిన మృదులాస్థిని శుభ్రం చేసే శస్త్రచికిత్స.',
            documentContext: 'Status Post Arthroscopic Debridement',
            whatItDoesNotMean: 'ఇది మోకాలి మార్పిడి శస్త్రచికిత్స (Knee Replacement) కాదు.',
            category: 'diagnosis'
          }
        ],
        whatDocumentSaysHappened: [
          'కుడి మోకాలి శస్త్రచికిత్స విజయవంతంగా పూర్తయి రోగి డిశ్చార్జ్ అయ్యారు.',
          'నాలుగు మందులు మరియు గాయం సంరక్షణ సూచనలు ఇవ్వబడ్డాయి.',
          'అక్టోబర్ 19న కుట్లు విప్పడానికి రమ్మని చెప్పారు.'
        ],
        whatIsUnclear: ['వాకింగ్ స్టిక్ ఎప్పటివరకు వాడాలనేది స్పష్టంగా లేదు.'],
        whatToAskDoctor: ['స్నానం ఎప్పుడు చేయవచ్చు?', 'ఫిజియోథెరపీ ఎప్పుడు ప్రారంభించాలి?'],
        spokenScript: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వర్చువల్ మెడికల్ ఎక్స్‌ప్లేనర్‌ను. మెట్రో స్పెషాలిటీ హాస్పిటల్ నుండి మీ డిశ్చార్జ్ సారాంశాన్ని నేను పరిశీలించాను. రమేష్ పటేల్ గారి కుడి మోకాలికి కీహోల్ సర్జరీ విజయవంతంగా పూర్తయింది. మీకు సెఫురోక్సిమ్ యాంటీబయాటిక్ 500 మిల్లీగ్రాములు రోజుకు రెండుసార్లు 5 రోజులు, పాంటోప్రజోల్ ఉదయం పూట మరియు నొప్పి ఉన్నప్పుడు పారాసిటమాల్ మాత్రలు సూచించబడ్డాయి. మోకాలి బ్యాండేజ్ తడవకుండా చూసుకోండి, రోజుకు మూడుసార్లు తేలికపాటి వ్యాయామాలు చేయండి మరియు అక్టోబర్ 19న కుట్లు విప్పడానికి రండి. జ్వరం వస్తే వెంటనే ఆసుపత్రిని సంప్రదించండి.",
        spokenScriptPhonetic: "Namaskaram! Nenu mee MedScript AI virtual medical explainer-nu. Metro Specialty Hospital nundi mee discharge summary-ni pariseelinchanu. Ramesh Patel gaari kudi mokaaliki arthroscopic surgery vijayavanthamgaa poorthayyindi. Mandulu: Cefuroxime 500 milligram-lu rojukoo rendu saarlu 5 rojulu. October 19th-na kuttlu vippa daaniki randi.",
        sentenceTimings: [
          { sentence: "నమస్కారం! నేను మీ మెడ్‌స్క్రిప్ట్ ఏఐ వర్చువల్ మెడికల్ ఎక్స్‌ప్లేనర్‌ను.", durationSec: 3.5, topic: 'intro' },
          { sentence: "మెట్రో స్పెషాలిటీ హాస్పిటల్ నుండి మీ డిశ్చార్జ్ సారాంశాన్ని నేను పరిశీలించాను.", durationSec: 4.2, topic: 'review' },
          { sentence: "రమేష్ పటేల్ గారి కుడి మోకాలికి కీహోల్ సర్జరీ విజయవంతంగా పూర్తయింది.", durationSec: 4.8, topic: 'surgery' },
          { sentence: "సెఫురోక్సిమ్ యాంటీబయాటిక్ 500 మిల్లీగ్రాములు రోజుకు రెండుసార్లు 5 రోజులు వాడండి.", durationSec: 5.0, topic: 'cefuroxime' },
          { sentence: "మోకాలి బ్యాండేజ్ తడవకుండా చూసుకోండి మరియు అక్టోబర్ 19న కుట్లు విప్పడానికి రండి.", durationSec: 5.2, topic: 'woundcare' },
          { sentence: "జ్వరం వస్తే వెంటనే ఆసుపత్రిని సంప్రదించండి.", durationSec: 3.5, topic: 'redflag' }
        ],
        breakdown: {
          whatIsThis: 'కుడి మోకాలి సర్జరీ అనంతరం హాస్పిటల్ డిశ్చార్జ్ సారాంశం.',
          whatItSays: '5 రోజుల యాంటీబయాటిక్స్ మరియు గాయం సంరక్షణ సూచనలు.',
          whatToDo: 'మందులు వేసుకోండి, కట్టు తడవనీయకండి, అక్టోబర్ 19న రండి.',
          whatToWatch: 'తీవ్రమైన జ్వరం లేదా కాలు వాపు వస్తే వెంటనే రండి.',
          whatIsUnclear: 'నడక సాధనం ఎప్పటివరకు వాడాలనే విషయం.'
        }
      }
    },
    get explanation(): DocumentExplanation {
      return this.translations[this.selectedLanguage] || this.translations.en;
    }
  };
}

/**
 * Return all 3 Fictional Medical Demo Documents
 */
export function getAllMedScriptDemos(): ProcessedDocument[] {
  return [
    getPrescriptionDemoDocument(),
    getHepatitisLabDemoDocument(),
    getDischargeSummaryDemoDocument()
  ];
}
