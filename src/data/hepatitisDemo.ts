/**
 * Krishxtattva - Official Hepatitis B Lab Report Demonstration Document
 * Exactly matching the prompt requirements for:
 * HBsAg, Patient Value (0.35), Cutoff (<0.9), Result (Non-Reactive),
 * CMIA methodology, Laboratory Notes, Vaccination Caveats, and Disclaimers.
 */

import { ProcessedDocument } from '../types/medscript';

export function createHepatitisReportSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 1100" width="850" height="1100">
    <!-- Paper Background with Subtle Medical Tint -->
    <rect width="850" height="1100" fill="#FAF7EE" />
    <rect x="25" y="25" width="800" height="1050" rx="10" fill="#FFFFFF" stroke="#E2D8C3" stroke-width="2" />

    <!-- Laboratory Header (Dark Blue & Gold Brand) -->
    <rect x="25" y="25" width="800" height="135" rx="10" fill="#0A1128" />
    <circle cx="80" cy="92" r="32" fill="#121D46" stroke="#E5C07B" stroke-width="2" />
    <path d="M80 72 v40 M60 92 h40" stroke="#E5C07B" stroke-width="5" stroke-linecap="round" />
    <circle cx="80" cy="92" r="10" fill="#38BDF8" />

    <text x="130" y="70" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">METROPOLIS VIROLOGY &amp; DIAGNOSTIC LABS</text>
    <text x="130" y="94" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#E5C07B">NATIONAL ACCREDITATION BOARD FOR TESTING &amp; CALIBRATION LABORATORIES (NABL)</text>
    <text x="130" y="114" font-family="'Inter', sans-serif" font-size="12" fill="#CBD5E1">Center of Clinical Excellence &bull; Plot 84, Medical Enclave &bull; 24x7 Helpline: 1800-209-4455</text>
    <text x="130" y="132" font-family="'JetBrains Mono', monospace" font-size="11" fill="#94A3B8">ISO 15189:2012 Certified Lab ID: NABL-VIRO-2026-8842 &bull; Website: www.metropolis-lab.org</text>

    <!-- Patient Metadata Box (Area 1) -->
    <rect x="45" y="175" width="760" height="100" rx="8" fill="#F8F5EC" stroke="#E5DAC3" />
    <text x="65" y="202" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#475569">PATIENT NAME:</text>
    <text x="175" y="202" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="800" fill="#0A1128">Rajeev Verma</text>
    
    <text x="460" y="202" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#475569">PATIENT ID / BARCODE:</text>
    <text x="615" y="202" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#0A1128">#HEP-2026-09412</text>

    <text x="65" y="232" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#475569">AGE / GENDER:</text>
    <text x="175" y="232" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#1E293B">42 Yrs / Male</text>

    <text x="460" y="232" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#475569">COLLECTION DATE:</text>
    <text x="615" y="232" font-family="'Inter', sans-serif" font-size="13" fill="#1E293B">04-Oct-2026 08:30 AM</text>

    <text x="65" y="260" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#475569">REFERRED BY:</text>
    <text x="175" y="260" font-family="'Inter', sans-serif" font-size="13" fill="#1E293B">Dr. K. M. Rao, MD (Internal Medicine)</text>

    <text x="460" y="260" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#475569">SAMPLE TYPE:</text>
    <text x="615" y="260" font-family="'Inter', sans-serif" font-size="13" fill="#1E293B">Serum (Fasting)</text>

    <!-- Department Title -->
    <rect x="45" y="290" width="760" height="28" rx="4" fill="#0A1128" />
    <text x="65" y="309" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#E5C07B" letter-spacing="1">DEPARTMENT OF SEROLOGY &amp; MOLECULAR VIROLOGY &bull; HEPATITIS PANEL</text>

    <!-- Test Table Header -->
    <rect x="45" y="325" width="760" height="38" rx="4" fill="#121D46" />
    <text x="65" y="349" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">INVESTIGATION (TEST)</text>
    <text x="350" y="349" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">OBSERVED VALUE</text>
    <text x="490" y="349" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">REFERENCE / CUTOFF</text>
    <text x="680" y="349" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">RESULT STATUS</text>

    <!-- Primary Test Row: HBsAg (Area 2 & Area 3) -->
    <rect x="45" y="370" width="760" height="70" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.5" rx="6" />
    
    <!-- Test Name -->
    <text x="65" y="398" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="800" fill="#0A1128">HBsAg</text>
    <text x="65" y="420" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#475569">Hepatitis B Surface Antigen (Qualitative/Quantitative Screen)</text>

    <!-- Patient Value -->
    <text x="350" y="405" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="800" fill="#047857">0.35</text>
    <text x="408" y="403" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#64748B">S/CO</text>
    <text x="350" y="423" font-family="'Inter', sans-serif" font-size="10" fill="#059669">Index Value &lt; 0.90</text>

    <!-- Reference Cutoff Range -->
    <text x="490" y="402" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="#1E293B">&lt; 0.90 : Non-Reactive</text>
    <text x="490" y="420" font-family="'Inter', sans-serif" font-size="11" fill="#64748B">Biological Reference Limit</text>

    <!-- Result Badge -->
    <rect x="670" y="385" width="120" height="32" rx="6" fill="#10B981" />
    <text x="730" y="406" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">NON-REACTIVE</text>

    <!-- Methodology Box (Area 4) -->
    <rect x="45" y="450" width="760" height="36" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="65" y="473" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#0369A1">TESTING METHOD:</text>
    <text x="185" y="473" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#334155">Chemiluminescent Microparticle Immunoassay (CMIA &bull; Architect i2000SR / Abbott)</text>

    <!-- Cutoff Interpretation Table (Area 5) -->
    <rect x="45" y="498" width="760" height="135" rx="8" fill="#FAF9F5" stroke="#E2D8C3" />
    <rect x="45" y="498" width="760" height="28" rx="8" fill="#F1ECE0" />
    <text x="65" y="517" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="800" fill="#45341C" letter-spacing="0.5">LABORATORY CUTOFF CRITERIA &amp; INDEX VALUE INTERPRETATION:</text>

    <line x1="45" y1="526" x2="805" y2="526" stroke="#E2D8C3" />
    
    <text x="65" y="550" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#047857">&lt; 0.90 S/CO</text>
    <text x="210" y="550" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#047857">NON-REACTIVE</text>
    <text x="360" y="550" font-family="'Inter', sans-serif" font-size="11" fill="#475569">No Hepatitis B surface antigen detected above threshold. (Your Result: 0.35)</text>

    <line x1="65" y1="562" x2="785" y2="562" stroke="#EFE7DA" />

    <text x="65" y="584" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#D97706">0.90 - 1.00 S/CO</text>
    <text x="210" y="584" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#D97706">BORDERLINE / GRAY ZONE</text>
    <text x="360" y="584" font-family="'Inter', sans-serif" font-size="11" fill="#475569">Equivocal. Retesting with fresh sample in 2 to 4 weeks is advised.</text>

    <line x1="65" y1="596" x2="785" y2="596" stroke="#EFE7DA" />

    <text x="65" y="618" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#DC2626">&gt;= 1.00 S/CO</text>
    <text x="210" y="618" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="700" fill="#DC2626">REACTIVE</text>
    <text x="360" y="618" font-family="'Inter', sans-serif" font-size="11" fill="#475569">Presence of Hepatitis B surface antigen detected. Correlate with HBV DNA &amp; ALT.</text>

    <!-- Clinical Remarks & Window Period (Area 6) -->
    <rect x="45" y="645" width="760" height="150" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
    <rect x="45" y="645" width="760" height="28" rx="8" fill="#E2E8F0" />
    <text x="65" y="664" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="800" fill="#1E293B">PATHOLOGIST CLINICAL NOTES &amp; BIOLOGICAL SIGNIFICANCE:</text>

    <text x="65" y="694" font-family="'Inter', sans-serif" font-size="12" fill="#334155">1. <tspan font-weight="700">What HBsAg Is:</tspan> HBsAg is the outer envelope protein of Hepatitis B Virus. It is the primary screening marker</text>
    <text x="80" y="710" font-family="'Inter', sans-serif" font-size="12" fill="#334155">for active infection (acute or chronic carrier state). It typically appears 2 to 6 weeks before onset of clinical symptoms.</text>

    <text x="65" y="734" font-family="'Inter', sans-serif" font-size="12" fill="#334155">2. <tspan font-weight="700">Patient Value Context:</tspan> Patient index value of <tspan font-weight="700" fill="#047857">0.35 S/CO</tspan> is comfortably below the 0.90 cutoff threshold,</text>
    <text x="80" y="750" font-family="'Inter', sans-serif" font-size="12" fill="#334155">confirming a Non-Reactive (negative) result in this assay.</text>

    <text x="65" y="774" font-family="'Inter', sans-serif" font-size="12" fill="#334155">3. <tspan font-weight="700">Window Period Caveat:</tspan> A Non-Reactive result does not rule out acute HBV infection during the early 'window period'</text>
    <text x="80" y="790" font-family="'Inter', sans-serif" font-size="12" fill="#334155">(first 2–4 weeks after suspected exposure) before circulating antigen levels reach analytical sensitivity.</text>

    <!-- Vaccination Caveat & Safety Notice (Area 7) -->
    <rect x="45" y="805" width="760" height="120" rx="8" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
    <text x="65" y="828" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="800" fill="#92400E">CRITICAL VACCINATION NOTE &amp; INTERPRETATION NOTICE:</text>
    
    <text x="65" y="852" font-family="'Inter', sans-serif" font-size="12" fill="#78350F">&bull; <tspan font-weight="700">Vaccine Status:</tspan> This test detects the VIRAL ANTIGEN itself, NOT protective vaccination antibodies.</text>
    <text x="75" y="868" font-family="'Inter', sans-serif" font-size="12" fill="#78350F">A vaccinated person without infection will normally test <tspan font-weight="700">Non-Reactive for HBsAg</tspan>. To check your vaccine protection,</text>
    <text x="75" y="884" font-family="'Inter', sans-serif" font-size="12" fill="#78350F">doctors measure <tspan font-weight="700">Anti-HBs antibody</tspan> titer (titer &gt; 10 mIU/mL indicates protective immunity).</text>

    <text x="65" y="906" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#92400E">&bull; <tspan font-weight="700">Clinical Corroboration:</tspan> Single screening tests do not constitute medical diagnosis. Clinical correlation required.</text>

    <!-- Signatures & Accreditation Footer (Area 8) -->
    <g transform="translate(45, 940)">
      <line x1="0" y1="0" x2="760" y2="0" stroke="#E2E8F0" stroke-width="1.5" />
      
      <!-- QR Verification -->
      <rect x="10" y="15" width="60" height="60" fill="#F8FAFC" stroke="#CBD5E1" />
      <text x="20" y="48" font-family="'JetBrains Mono', monospace" font-size="9" fill="#64748B">SECURE</text>
      <text x="23" y="60" font-family="'JetBrains Mono', monospace" font-size="9" fill="#64748B">QR-ID</text>
      
      <text x="85" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="700" fill="#0A1128">DIGITALLY AUTHENTICATED REPORT</text>
      <text x="85" y="48" font-family="'Inter', sans-serif" font-size="10" fill="#64748B">Report Generated: 04-Oct-2026 11:15 AM &bull; Laboratory Electronic Signature Verified</text>
      <text x="85" y="62" font-family="'Inter', sans-serif" font-size="10" fill="#64748B">End of Serology Examination &bull; Page 1 of 1</text>

      <!-- Pathologist Signature -->
      <g transform="translate(540, 10)">
        <path d="M 20 28 Q 45 10 70 25 T 120 18 T 160 28" fill="none" stroke="#0A1128" stroke-width="2" stroke-linecap="round" />
        <text x="10" y="48" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="800" fill="#0A1128">Dr. Shalini Deshmukh, MD</text>
        <text x="10" y="62" font-family="'Inter', sans-serif" font-size="10" fill="#64748B">Consultant Microbiologist &amp; Virologist</text>
      </g>
    </g>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function getHepatitisDocument(): ProcessedDocument {
  const svgDataUrl = createHepatitisReportSvg();

  return {
    id: 'demo-hepatitis-hbsag',
    name: 'Viral Hepatitis Laboratory Report (HBsAg)',
    type: 'medical',
    categoryGroup: 'medical',
    documentClassification: 'LAB_REPORT',
    detectedCategoryLabel: 'Viral Hepatitis Serology Report',
    imageDataUrl: svgDataUrl,
    uploadedAt: new Date().toISOString(),
    fileSize: 42800,
    quality: {
      status: 'pass',
      overallScore: 98,
      blurScore: 96,
      darknessScore: 95,
      glareScore: 98,
      resolutionScore: 99,
      rotationAngle: 0,
      handwritingVisibilityScore: 95,
      issues: [],
      suggestions: []
    },
    rawOcrText: `METROPOLIS VIROLOGY & DIAGNOSTIC LABS
NABL ACCREDITED LAB | ISO 15189:2012 Certified ID: NABL-VIRO-2026-8842
PATIENT NAME: Rajeev Verma | AGE/GENDER: 42 Yrs / Male | BARCODE: #HEP-2026-09412
COLLECTION DATE: 04-Oct-2026 08:30 AM | REFERRED BY: Dr. K. M. Rao, MD | SAMPLE: Serum
DEPARTMENT OF SEROLOGY & MOLECULAR VIROLOGY • HEPATITIS PANEL
INVESTIGATION: HBsAg (Hepatitis B Surface Antigen)
OBSERVED VALUE: 0.35 S/CO
REFERENCE / CUTOFF: < 0.90 Non-Reactive
RESULT STATUS: NON-REACTIVE
TESTING METHOD: Chemiluminescent Microparticle Immunoassay (CMIA • Architect i2000SR / Abbott)
LABORATORY CUTOFF CRITERIA:
< 0.90 S/CO : NON-REACTIVE (No Hepatitis B surface antigen detected above threshold)
0.90 - 1.00 S/CO : BORDERLINE / GRAY ZONE (Retesting with fresh sample in 2-4 weeks advised)
>= 1.00 S/CO : REACTIVE (Presence of Hepatitis B surface antigen detected)
PATHOLOGIST CLINICAL NOTES:
1. What HBsAg Is: HBsAg is the outer envelope protein of Hepatitis B Virus. Primary screening marker.
2. Patient Value: Patient index value of 0.35 S/CO is comfortably below the 0.90 cutoff threshold.
3. Window Period Caveat: Does not rule out acute HBV infection during first 2-4 weeks.
CRITICAL VACCINATION NOTE:
This test detects VIRAL ANTIGEN, NOT vaccine antibodies. Vaccinated person without infection will normally test Non-Reactive for HBsAg. To check immunity, measure Anti-HBs titer (> 10 mIU/mL).
Correlate clinically with other markers. Digitally authenticated report: Dr. Shalini Deshmukh, MD.`,
    tokens: [
      {
        id: 'tok-hep-1',
        text: 'PATIENT: Rajeev Verma, 42 Yrs / Male',
        category: 'patient_info',
        confidence: 0.99,
        confidenceDisplay: '99%',
        isUncertain: false,
        bbox: { x: 5, y: 16, width: 90, height: 10 },
        meaning: 'Patient demographic identification on the laboratory requisition.'
      },
      {
        id: 'tok-hep-2',
        text: 'TEST: HBsAg (Hepatitis B Surface Antigen)',
        category: 'lab_value',
        confidence: 0.99,
        confidenceDisplay: '99%',
        isUncertain: false,
        bbox: { x: 5, y: 34, width: 35, height: 7 },
        meaning: 'A blood protein marker from the surface of the Hepatitis B virus used to screen for infection.'
      },
      {
        id: 'tok-hep-3',
        text: 'OBSERVED PATIENT VALUE: 0.35 S/CO',
        category: 'lab_value',
        confidence: 0.99,
        confidenceDisplay: '99%',
        isUncertain: false,
        bbox: { x: 41, y: 34, width: 16, height: 7 },
        meaning: 'The laboratory machine measured an index value of 0.35, which is well below the 0.90 cutoff limit.'
      },
      {
        id: 'tok-hep-4',
        text: 'CUTOFF LIMIT: < 0.90 S/CO',
        category: 'lab_value',
        confidence: 0.98,
        confidenceDisplay: '98%',
        isUncertain: false,
        bbox: { x: 57, y: 34, width: 20, height: 7 },
        meaning: 'The laboratory threshold below which no viral surface antigen is detected.'
      },
      {
        id: 'tok-hep-5',
        text: 'RESULT: NON-REACTIVE',
        category: 'lab_value',
        confidence: 0.99,
        confidenceDisplay: '99%',
        isUncertain: false,
        bbox: { x: 78, y: 34, width: 17, height: 7 },
        meaning: 'Negative for Hepatitis B surface antigen; marker was not found above the laboratory threshold.'
      },
      {
        id: 'tok-hep-6',
        text: 'METHOD: Chemiluminescent Microparticle Immunoassay (CMIA)',
        category: 'organization',
        confidence: 0.97,
        confidenceDisplay: '97%',
        isUncertain: false,
        bbox: { x: 5, y: 41, width: 90, height: 4 },
        meaning: 'A sensitive automated laboratory technique using light emission from magnetic microparticles to detect viral proteins.'
      },
      {
        id: 'tok-hep-7',
        text: 'CUTOFF INTERPRETATION RANGES',
        category: 'lab_value',
        confidence: 0.98,
        confidenceDisplay: '98%',
        isUncertain: false,
        bbox: { x: 5, y: 45, width: 90, height: 13 },
        meaning: 'The criteria defined by the manufacturer: < 0.9 Non-Reactive, 0.9-1.0 Borderline, > 1.0 Reactive.'
      },
      {
        id: 'tok-hep-8',
        text: 'PATHOLOGIST NOTES & WINDOW PERIOD',
        category: 'general',
        confidence: 0.97,
        confidenceDisplay: '97%',
        isUncertain: false,
        bbox: { x: 5, y: 59, width: 90, height: 14 },
        meaning: 'Notes explaining that tests taken too early after suspected exposure (window period) may not show markers yet.'
      },
      {
        id: 'tok-hep-9',
        text: 'VACCINATION NOTICE & DISCLAIMER',
        category: 'instruction',
        confidence: 0.98,
        confidenceDisplay: '98%',
        isUncertain: false,
        bbox: { x: 5, y: 73, width: 90, height: 12 },
        meaning: 'Clarification that vaccine protection is measured by Anti-HBs antibodies, whereas this test detects active virus antigen.'
      }
    ],
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    explanation: {
      threeLevelExplanation: {
        originalTextSummary: 'Serum tested for Hepatitis B Surface Antigen (HBsAg) by Chemiluminescent Microparticle Immunoassay (CMIA). Observed index 0.35 S/CO against laboratory non-reactive threshold of < 0.90 S/CO. Result reported as Non-Reactive.',
        simpleSummary: "This is your Hepatitis B screening lab report. HBsAg stands for Hepatitis B surface antigen, a protein marker doctors check to look for evidence of hepatitis B virus. Your result is 'Non-Reactive' with a patient value of 0.35, which is safely below the laboratory's 0.90 threshold. This means the test did not detect the viral marker in your blood.",
        explainLikeIm10: "Think of this test like a detector searching for a specific flag that the Hepatitis B virus wears. Your score is 0.35, and any score below 0.90 means the flag was not found. Your test is completely negative/non-reactive."
      },
      breakdown: {
        whatIsThis: 'A specialized viral serology blood test report screening for Hepatitis B Virus (HBV) infection.',
        whatItSays: "Your HBsAg screening result is 'Non-Reactive' (Negative). The lab measured an index value of 0.35 S/CO, which is well below the laboratory cutoff threshold of 0.90 S/CO.",
        whatToDo: 'Share this report with your consulting physician Dr. K. M. Rao during your routine review. If you were vaccinated in the past and want to check your immunity, ask about an Anti-HBs antibody titer.',
        deadline: 'No urgent deadline. Routine follow-up with your treating doctor.',
        importantAmounts: 'Patient Index Value: 0.35 S/CO (Safe threshold: < 0.90 S/CO).',
        whatToWatch: 'Remember that a single screening test does not establish a diagnosis on its own, and does not check for vaccine immunity (which requires an Anti-HBs test).',
        whatIsUnclear: 'All values, cutoffs, and methodology are printed clearly with 100% confidence. No unclear handwriting.'
      },
      spokenScript: "Hello! Let's understand this lab report together, step by step like a teacher. This document is a Viral Hepatitis Serology Report for Rajeev Verma. The test is called HBsAg, which stands for Hepatitis B surface antigen. This is a protein marker that laboratories search for to screen for hepatitis B infection. Now, look at your result: it says 'Non-Reactive'. The laboratory machine measured your patient value as 0.35 S/CO, and the laboratory's stated cutoff rule is that anything below 0.90 is Non-Reactive. Because 0.35 is well below 0.90, this test did not detect the viral marker. Also, the report includes an important note: this test screens for the virus itself, not vaccine protection. If you received the Hepatitis B vaccine, your doctor can order an Anti-HBs antibody test to check your immune protection.",
      sentenceTimings: [
        { sentence: "Hello! Let's understand this lab report together, step by step like a teacher.", durationSec: 4.0, audioStartTime: 0, audioEndTime: 4.0 },
        { sentence: "This document is a Viral Hepatitis Serology Report for Rajeev Verma.", durationSec: 4.0, audioStartTime: 4.0, audioEndTime: 8.0 },
        { sentence: "The test is called HBsAg, which stands for Hepatitis B surface antigen.", durationSec: 4.2, audioStartTime: 8.0, audioEndTime: 12.2 },
        { sentence: "This is a protein marker that laboratories search for to screen for hepatitis B infection.", durationSec: 4.8, audioStartTime: 12.2, audioEndTime: 17.0 },
        { sentence: "Now, look at your result: it says 'Non-Reactive'.", durationSec: 3.5, audioStartTime: 17.0, audioEndTime: 20.5 },
        { sentence: "The laboratory machine measured your patient value as 0.35, and the laboratory's cutoff states that anything below 0.90 is Non-Reactive.", durationSec: 6.2, audioStartTime: 20.5, audioEndTime: 26.7 },
        { sentence: "Because 0.35 is comfortably below 0.90, this test did not detect the viral marker in your sample.", durationSec: 5.5, audioStartTime: 26.7, audioEndTime: 32.2 },
        { sentence: "Also note: this test checks for active viral marker, not vaccine protection antibodies.", durationSec: 4.8, audioStartTime: 32.2, audioEndTime: 37.0 },
        { sentence: "Please share this report with your consulting physician for complete clinical context.", durationSec: 4.5, audioStartTime: 37.0, audioEndTime: 41.5 }
      ],
      tokens: []
    },
    translations: {
      en: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg screen by CMIA: 0.35 S/CO against < 0.90 cutoff. Result: Non-Reactive.',
          simpleSummary: "HBsAg stands for Hepatitis B surface antigen. Your result is 'Non-Reactive' with a patient value of 0.35, which is safely below the lab's 0.90 cutoff threshold.",
          explainLikeIm10: "Your score is 0.35, which is below 0.90. This means no Hepatitis B virus marker was detected."
        },
        breakdown: {
          whatIsThis: 'Hepatitis B viral screening lab report.',
          whatItSays: 'HBsAg Non-Reactive. Patient value 0.35 is below cutoff < 0.90.',
          whatToDo: 'Share with your physician during routine consultation.',
          importantAmounts: '0.35 S/CO (Cutoff: < 0.90)',
          whatToWatch: 'Screening test only; correlation with doctor required.'
        },
        spokenScript: "Hello! Let's understand this lab report together. HBsAg stands for Hepatitis B surface antigen. Your result is Non-Reactive, with a value of 0.35 against the cutoff of 0.90. This means the viral marker was not detected."
      },
      te: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg పరీక్ష ఫలితం: 0.35 S/CO (కట్ ఆఫ్ < 0.90). నాన్-రియాక్టివ్.',
          simpleSummary: 'ఇది మీ హెపటైటిస్ బి రక్త పరీక్ష నివేదిక. HBsAg అంటే హెపటైటిస్ బి ఉపరితల యాంటిజెన్. మీ ఫలితం "నాన్-రియాక్టివ్" (నెగటివ్) అని వచ్చింది. మీ విలువ 0.35, ఇది ల్యాబ్ నిర్ణయించిన 0.90 పరిమితి కంటే తక్కువగా ఉంది. అంటే మీ రక్తంలో వైరస్ మార్కర్ కనుగొనబడలేదు.',
          explainLikeIm10: 'మీ పరీక్షలో 0.35 వచ్చింది, ఇది 0.90 కంటే తక్కువ. అంటే హెపటైటిస్ వైరస్ కనిపించలేదు.'
        },
        breakdown: {
          whatIsThis: 'హెపటైటిస్ బి వైరస్ స్క్రీనింగ్ రక్త పరీక్ష రిపోర్ట్.',
          whatItSays: 'HBsAg నాన్-రియాక్టివ్ (నెగటివ్). రోగి విలువ 0.35, కట్ ఆఫ్ 0.90 కంటే తక్కువ.',
          whatToDo: 'ఈ రిపోర్ట్‌ను మీ డాక్టర్‌కు చూపించండి. మీరు గతంలో వ్యాక్సిన్ తీసుకుని ఉంటే, రోగనిరోధక శక్తి కోసం యాంటీ-HBs పరీక్ష చేయించవచ్చు.',
          importantAmounts: 'విలువ: 0.35 S/CO (పరిమితి: < 0.90)',
          whatToWatch: 'ఈ పరీక్ష వైరస్ మార్కర్‌ను మాత్రమే గుర్తిస్తుంది, టీకా రక్షణను కాదు.'
        },
        spokenScript: 'నమస్కారం! రండి, ఈ ల్యాబ్ రిపోర్ట్‌ను ఒక టీచర్‌లా సులభంగా అర్థం చేసుకుందాం. ఇది రాజీవ్ వర్మ గారి హెపటైటిస్ బి పరీక్ష రిపోర్ట్. HBsAg అంటే హెపటైటిస్ బి వైరస్ యొక్క ఉపరితల ప్రోటీన్ మార్కర్. మీ రిపోర్ట్‌లో ఫలితం నాన్-రియాక్టివ్ అని ఉంది. మీ విలువ 0.35 గా నమోదైంది, మరియు ల్యాబ్ నియమం ప్రకారం 0.90 కంటే తక్కువ ఉంటే నాన్-రియాక్టివ్. కాబట్టి మీ రక్తంలో వైరస్ మార్కర్ కనిపించలేదు. దయచేసి ఈ రిపోర్ట్‌ను మీ వైద్యుడికి చూపించండి.'
      },
      hi: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg जांच: 0.35 S/CO (कटऑफ < 0.90)। परिणाम: नॉन-रिएक्टिव।',
          simpleSummary: 'यह आपकी हेपेटाइटिस बी जांच रिपोर्ट है। HBsAg का अर्थ हेपेटाइटिस बी सरफेस एंटीजन है। आपकी रिपोर्ट "नॉन-रिएक्टिव" (नेगेटिव) आई है। आपका मान 0.35 है जो कि प्रयोगशाला के 0.90 कटऑफ से काफी कम है। इसका मतलब है कि वायरस का कोई मार्कर नहीं मिला।',
          explainLikeIm10: 'आपका स्कोर 0.35 है जो 0.90 से कम है। इसका मतलब शरीर में हेपेटाइटिस बी वायरस का कोई अंश नहीं मिला।'
        },
        breakdown: {
          whatIsThis: 'हेपेटाइटिस बी वायरस स्क्रीनिंग लैब रिपोर्ट।',
          whatItSays: 'HBsAg नॉन-रिएक्टिव (नेगेटिव)। मरीज का मान 0.35 है, जो कटऑफ 0.90 से नीचे है।',
          whatToDo: 'अपने डॉक्टर से सलाह लें। वैक्सीन सुरक्षा जांचने के लिए एंटी-HBs टेस्ट के बारे में पूछें।',
          importantAmounts: 'मान: 0.35 S/CO (कटऑफ: < 0.90)',
          whatToWatch: 'यह स्क्रीनिंग टेस्ट है। डॉक्टर से समग्र परामर्श जरूरी है।'
        },
        spokenScript: 'नमस्ते! आइए इस जांच रिपोर्ट को एक शिक्षक की तरह चरण-दर-चरण समझते हैं। यह राजीव वर्मा की हेपेटाइटिस बी रिपोर्ट है। टेस्ट का नाम HBsAg है, यानी हेपेटाइटिस बी सरफेस एंटीजन। आपका परिणाम नॉन-रिएक्टिव है। मशीन में आपकी वैल्यू 0.35 आई है, जो प्रयोगशाला की 0.90 की सीमा से कम है। इसका मतलब है कि खून में वायरस का मार्कर नहीं पाया गया है। कृपया अपने डॉक्टर से परामर्श अवश्य लें।'
      },
      ta: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg ஆய்வு: 0.35 S/CO. வரம்பு < 0.90. முடிவு: நான்-ரியாக்டிவ்.',
          simpleSummary: 'இது ஹெபடைடிஸ் பி இரத்தப் பரிசோதனை அறிக்கை. HBsAg என்பது வைரஸ் மேற்பரப்பு புரதம். உங்கள் முடிவு "நான்-ரியாக்டிவ்" (நெகட்டிவ்). உங்கள் மதிப்பு 0.35, இது ஆய்வக வரம்பான 0.90 ஐ விடக் குறைவாக உள்ளது.',
          explainLikeIm10: 'உங்கள் மதிப்பு 0.35, இது 0.90 ஐ விடக் குறைவு. வைரஸ் புரதம் எதுவும் கண்டறியப்படவில்லை.'
        },
        breakdown: {
          whatIsThis: 'ஹெபடைடிஸ் பி இரத்தப் பரிசோதனை அறிக்கை.',
          whatItSays: 'HBsAg நான்-ரியாக்டிவ். மதிப்பு 0.35 (வரம்பு < 0.90).',
          whatToDo: 'மருத்துவரிடம் காட்டி ஆலோசனை பெறவும்.',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'இது திரையிடல் சோதனை மட்டுமே.'
        },
        spokenScript: 'வணக்கம்! இந்த மருத்துவ அறிக்கையை ஒரு ஆசிரியர் போல எளிதாகப் புரிந்து கொள்வோம். இது ஹெபடைடிஸ் பி பரிசோதனை அறிக்கை. HBsAg முடிவு நான்-ரியாக்டிவ் என்று வந்துள்ளது. உங்கள் மதிப்பு 0.35, ஆய்வக வரம்பு 0.90 விட குறைவு. உங்கள் இரத்தத்தில் வைரஸ் எதுவும் இல்லை.'
      },
      kn: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg ಪರೀಕ್ಷೆ: 0.35 S/CO. ಕಟ್-ಆಫ್ < 0.90. ಫಲಿತಾಂಶ: ನಾನ್-ರಿಯಾಕ್ಟಿವ್.',
          simpleSummary: 'ಇದು ಹೆಪಟೈಟಿಸ್ ಬಿ ತಪಾಸಣಾ ವರದಿ. HBsAg ಎಂದರೆ ಹೆಪಟೈಟಿಸ್ ಬಿ ಮೇಲ್ಮೈ ಆಂಟಿಜೆನ್. ನಿಮ್ಮ ಫಲಿತಾಂಶ ನಾನ್-ರಿಯಾಕ್ಟಿವ್ (ನೆಗೆಟಿವ್) ಆಗಿದೆ. ನಿಮ್ಮ ಮೌಲ್ಯ 0.35 ಆಗಿದ್ದು, 0.90 ಗಿಂತ ಕಡಿಮೆಯಿದೆ.',
          explainLikeIm10: 'ನಿಮ್ಮ ಸ್ಕೋರ್ 0.35 ಆಗಿದೆ, ಇದು 0.90 ಕ್ಕಿಂತ ಕಡಿಮೆ. ಯಾವುದೇ ವೈರಸ್ ಪತ್ತೆಯಾಗಿಲ್ಲ.'
        },
        breakdown: {
          whatIsThis: 'ಹೆಪಟೈಟಿಸ್ ಬಿ ರಕ್ತ ತಪಾಸಣಾ ವರದಿ.',
          whatItSays: 'HBsAg ನಾನ್-ರಿಯಾಕ್ಟಿವ್. ಮೌಲ್ಯ 0.35, ಮಿತಿ < 0.90.',
          whatToDo: 'ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ ಈ ವರದಿ ತೋರಿಸಿ.',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'ವೈದ್ಯರ ಸಲಹೆ ಮುಖ್ಯ.'
        },
        spokenScript: 'ನಮಸ್ಕಾರ! ಈ ರಕ್ತ ತಪಾಸಣಾ ವರದಿಯನ್ನು ಶಿಕ್ಷಕರಂತೆ ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳೋಣ. HBsAg ಫಲಿತಾಂಶ ನಾನ್-ರಿಯಾಕ್ಟಿವ್ ಆಗಿದೆ. ನಿಮ್ಮ ಮೌಲ್ಯ 0.35 ಆಗಿದ್ದು, ಪ್ರಯೋಗಾಲಯದ ಕಟ್-ಆಫ್ 0.90 ಕ್ಕಿಂತ ಕಡಿಮೆಯಿದೆ. ಅಂದರೆ ವೈರಸ್ ಮಾರ್ಕರ್ ಕಂಡುಬಂದಿಲ್ಲ.'
      },
      ml: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg പരിശോധന: 0.35 S/CO (കട്ട്-ഓഫ് < 0.90). ഫലം: നോൺ-റിയാക്ടീവ്.',
          simpleSummary: 'ഇത് ഹെപ്പറ്റൈറ്റിസ് ബി രക്തപരിശോധനാ റിപ്പോർട്ടാണ്. HBsAg ഫലം "നോൺ-റിയാക്ടീവ്" (നെഗറ്റീവ്) ആണ്. നിങ്ങളുടെ മൂല്യം 0.35 ആണ്, ഇത് 0.90 പരിധിയേക്കാൾ കുറവാണ്.',
          explainLikeIm10: 'നിങ്ങളുടെ സ്കോർ 0.35 ആണ്, ഇത് 0.90 ൽ താഴെയാണ്. വൈറസ് സാന്നിധ്യം കണ്ടെത്തിയിട്ടില്ല.'
        },
        breakdown: {
          whatIsThis: 'ഹെപ്പറ്റൈറ്റിസ് ബി സ്ക്രീനിംഗ് റിപ്പോർട്ട്.',
          whatItSays: 'HBsAg നോൺ-റിയാക്ടീവ്. മൂല്യം 0.35 (< 0.90).',
          whatToDo: 'ഡോക്ടറോട് സംസാരിക്കുക.',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'സ്ക്രീനിംഗ് പരിശോധന മാത്രമാണ്.'
        },
        spokenScript: 'നമസ്കാരം! ഈ ലാബ് റിപ്പോർട്ട് ഒരു അധ്യാപകനെപ്പോലെ നമുക്ക് മനസ്സിലാക്കാം. ഇത് ഹെപ്പറ്റൈറ്റിസ് ബി റിപ്പോർട്ടാണ്. HBsAg ഫലം നോൺ-റിയാക്ടീവ് ആണ്. നിങ്ങളുടെ മൂല്യം 0.35 ആണ്, കട്ട്-ഓഫ് 0.90 നേക്കാൾ താഴെയാണ്. വൈറസ് സാന്നിധ്യമില്ല.'
      },
      bn: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg টেস্ট: 0.35 S/CO (কাট-অফ < 0.90)। ফলাফল: নন-রিঅ্যাকটিভ।',
          simpleSummary: 'এটি আপনার হেপাটাইটিস বি পরীক্ষার রিপোর্ট। HBsAg ফলাফল "নন-রিঅ্যাকটিভ" (নেগেটিভ)। আপনার মান 0.35, যা ল্যাবের 0.90 সীমার চেয়ে কম। অর্থাৎ কোনো ভাইরাস মার্কার পাওয়া যায়নি।',
          explainLikeIm10: 'আপনার স্কোর 0.35 যা 0.90 এর চেয়ে কম। এর মানে শরীরে কোনো হেপাটাইটিস ভাইরাস নেই।'
        },
        breakdown: {
          whatIsThis: 'হেপাটাইটিস বি স্ক্রিনিং রক্ত পরীক্ষার রিপোর্ট।',
          whatItSays: 'HBsAg নন-রিঅ্যাকটিভ। মান 0.35 (কাট-অফ < 0.90)।',
          whatToDo: 'ডাক্তারের সাথে পরামর্শ করুন।',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'এটি একটি স্ক্রিনিং পরীক্ষা।'
        },
        spokenScript: 'নমস্কার! এই ল্যাব রিপোর্টটি একজন শিক্ষকের মতো সহজ ভাষায় বুঝে নেওয়া যাক। এটি হেপাটাইটিস বি রিপোর্ট। HBsAg ফলাফল নন-রিঅ্যাকটিভ এসেছে। আপনার মান 0.35 যা ল্যাবের সীমা 0.90 এর চেয়ে কম।'
      },
      mr: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg चाचणी: 0.35 S/CO (कट-ऑफ < 0.90). निकाल: नॉन-रिअॅक्टिव्ह.',
          simpleSummary: 'हा तुमचा हेपॅटायटीस बी चाचणी अहवाल आहे. HBsAg चा निकाल "नॉन-रिअॅक्टिव्ह" (निगेटिव्ह) आला आहे. तुमचे मूल्य 0.35 आहे, जे लॅबच्या 0.90 मर्यादेपेक्षा कमी आहे.',
          explainLikeIm10: 'तुमचा स्कोअर 0.35 आहे जो 0.90 पेक्षा कमी आहे. याचा अर्थ शरीरात हेपॅटायटीस बी विषाणू आढळलेला नाही.'
        },
        breakdown: {
          whatIsThis: 'हेपॅटायटीस बी रक्त तपासणी अहवाल.',
          whatItSays: 'HBsAg नॉन-रिअॅक्टिव्ह. मूल्य 0.35 (मर्यादा < 0.90).',
          whatToDo: 'तुमच्या डॉक्टरांचा सल्ला घ्या.',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'ही एक स्क्रीनिंग चाचणी आहे.'
        },
        spokenScript: 'नमस्कार! हा प्रयोगशाळा अहवाल एका शिक्षकाप्रमाणे समजून घेऊया. हा हेपॅटायटीस बी अहवाल आहे. HBsAg निकाल नॉन-रिअॅक्टिव्ह आला आहे. तुमचे मूल्य 0.35 आहे जे 0.90 पेक्षा कमी आहे. विषाणू आढळलेला नाही.'
      },
      gu: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg પરીક્ષણ: 0.35 S/CO (કટ-ઓફ < 0.90). પરિણામ: નોન-રિએક્ટિવ.',
          simpleSummary: 'આ તમારો હેપેટાઇટિસ બી લેબ રિપોર્ટ છે. HBsAg પરિણામ "નોન-રિએક્ટિવ" (નેગેટિવ) છે. તમારું મૂલ્ય 0.35 છે, જે 0.90 ની મર્યાદા કરતાં ઘણું ઓછું છે. એટલે કે શરીરમાં વાયરસ મળ્યો નથી.',
          explainLikeIm10: 'તમારો સ્કોર 0.35 છે જે 0.90 થી ઓછો છે. શરીરમાં હેપેટાઇટિસ વાયરસ નથી.'
        },
        breakdown: {
          whatIsThis: 'હેપેટાઇટિસ બી સ્ક્રીનીંગ લેબ રિપોર્ટ.',
          whatItSays: 'HBsAg નોન-રિએક્ટિવ. દર્દીનું મૂલ્ય 0.35 (મર્યાદા < 0.90).',
          whatToDo: 'તમારા ડૉક્ટરનો સંપર્ક કરો.',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'આ માત્ર સ્ક્રીનીંગ તપાસ છે.'
        },
        spokenScript: 'નમસ્તે! ચાલો આ લેબ રિપોર્ટને એક શિક્ષકની જેમ સરળ રીતે સમજીએ. આ હેપેટાઇટિસ બી રિપોર્ટ છે. HBsAg પરિણામ નોન-રિએક્ટિવ આવ્યું છે. તમારું મૂલ્ય 0.35 છે, જે લેબની મર્યાદા 0.90 કરતાં ઓછું છે. એટલે કે લોહીમાં વાયરસનું કોઈ ચિહ્ન મળ્યું નથી. ડૉક્ટરની સલાહ લો.'
      },
      pa: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg ਟੈਸਟ: 0.35 S/CO (ਕੱਟ-ਆਫ < 0.90)। ਨਤੀਜਾ: ਨਾਨ-ਰੀਐਕਟਿਵ।',
          simpleSummary: 'ਇਹ ਤੁਹਾਡੀ ਹੈਪੇਟਾਈਟਿਸ ਬੀ ਲੈਬ ਰਿਪੋਰਟ ਹੈ। HBsAg ਦਾ ਨਤੀਜਾ "ਨਾਨ-ਰੀਐਕਟਿਵ" (ਨੈਗੇਟਿਵ) ਆਇਆ ਹੈ। ਤੁਹਾਡਾ ਮੁੱਲ 0.35 ਹੈ ਜੋ ਲੈਬ ਦੀ 0.90 ਸੀਮਾ ਤੋਂ ਕਾਫੀ ਘੱਟ ਹੈ। ਯਾਨੀ ਕੋਈ ਵਾਇਰਸ ਨਹੀਂ ਮਿਲਿਆ।',
          explainLikeIm10: 'ਤੁਹਾਡਾ ਸਕੋਰ 0.35 ਹੈ ਜੋ 0.90 ਤੋਂ ਘੱਟ ਹੈ। ਸਰੀਰ ਵਿੱਚ ਕੋਈ ਹੈਪੇਟਾਈਟਿਸ ਵਾਇਰਸ ਨਹੀਂ ਹੈ।'
        },
        breakdown: {
          whatIsThis: 'ਹੈਪੇਟਾਈਟਿਸ ਬੀ ਸਕ੍ਰੀਨਿੰਗ ਲੈਬ ਰਿਪੋਰਟ।',
          whatItSays: 'HBsAg ਨਾਨ-ਰੀਐਕਟਿਵ। ਮੁੱਲ 0.35 (ਸੀਮਾ < 0.90)।',
          whatToDo: 'ਆਪਣੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'ਇਹ ਇੱਕ ਸਕ੍ਰੀਨਿੰਗ ਟੈਸਟ ਹੈ।'
        },
        spokenScript: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਆਓ ਇਸ ਲੈਬ ਰਿਪੋਰਟ ਨੂੰ ਇੱਕ ਅਧਿਆਪਕ ਵਾਂਗ ਸਮਝੀਏ। ਇਹ ਹੈਪੇਟਾਈਟਿਸ ਬੀ ਟੈਸਟ ਦੀ ਰਿਪੋਰਟ ਹੈ। HBsAg ਨਤੀਜਾ ਨਾਨ-ਰੀਐਕਟਿਵ ਆਇਆ ਹੈ। ਤੁਹਾਡਾ ਮੁੱਲ 0.35 ਹੈ ਜੋ ਲੈਬ ਦੀ 0.90 ਸੀਮਾ ਤੋਂ ਘੱਟ ਹੈ। ਇਸਦਾ ਮਤਲਬ ਹੈ ਕਿ ਖੂਨ ਵਿੱਚ ਵਾਇਰਸ ਨਹੀਂ ਮਿਲਿਆ।'
      },
      ur: {
        threeLevelExplanation: {
          originalTextSummary: 'HBsAg ٹیسٹ: 0.35 S/CO (کٹ آف < 0.90)۔ نتیجہ: نان ری ایکٹیو۔',
          simpleSummary: 'یہ آپ کی ہیپاٹائٹس بی لیب رپورٹ ہے۔ HBsAg کا نتیجہ "نان ری ایکٹیو" (منفی) آیا ہے۔ آپ کی قدر 0.35 ہے جو لیب کی 0.90 کی حد سے کم ہے۔ اس کا مطلب ہے کہ وائرس کا کوئی نشان نہیں ملا۔',
          explainLikeIm10: 'آپ کا اسکور 0.35 ہے جو 0.90 سے کم ہے۔ جسم میں ہیپاٹائٹس وائرس نہیں ہے۔'
        },
        breakdown: {
          whatIsThis: 'ہیپاٹائٹس بی اسکریننگ لیب رپورٹ۔',
          whatItSays: 'HBsAg نان ری ایکٹیو۔ قدر 0.35 (حد < 0.90)۔',
          whatToDo: 'اپنے معالج سے مشورہ کریں۔',
          importantAmounts: '0.35 S/CO (< 0.90)',
          whatToWatch: 'یہ محض اسکریننگ ٹیسٹ ہے۔'
        },
        spokenScript: 'السلام علیکم! آئیے اس لیب رپورٹ کو ایک استاد کی طرح سمجھتے ہیں۔ یہ ہیپاٹائٹس بی کی رپورٹ ہے۔ HBsAg کا نتیجہ نان ری ایکٹیو آیا ہے۔ آپ کی ریڈنگ 0.35 ہے جو 0.90 سے کم ہے۔ اس کا مطلب ہے کہ خون میں وائرس موجود نہیں ہے۔'
      }
    },
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        {
          id: 'hep-safe-1',
          name: 'Zero-Diagnostic Assertion Rule',
          passed: true,
          severity: 'low',
          details: "Preserves the laboratory's exact terminology 'Non-Reactive'. Does not issue an absolute clinical diagnosis.",
          sourceReference: 'CLSI H38-A Diagnostic Serology Standards',
          confidenceLevel: 'HIGH',
          verificationAction: 'Preserve physical copy.'
        },
        {
          id: 'hep-safe-2',
          name: 'Cutoff Preservation Rule',
          passed: true,
          severity: 'low',
          details: "Laboratory stated cutoff threshold < 0.90 S/CO strictly preserved without generic substitution.",
          sourceReference: 'Metropolis Virology Assay Protocol',
          confidenceLevel: 'HIGH',
          verificationAction: 'Validated against assay specifications.'
        },
        {
          id: 'hep-safe-3',
          name: 'Vaccination vs Antigen Distinction',
          passed: true,
          severity: 'low',
          details: 'Clarifies that HBsAg detects viral antigen, not protective vaccine antibodies.',
          sourceReference: 'CDC Hepatitis B Serology Guidelines',
          confidenceLevel: 'HIGH',
          verificationAction: 'Educational note added.'
        }
      ]
    },
    structuredMeds: [],
    diagnoses: [],
    instructions: [
      'Share with consulting physician Dr. K. M. Rao during routine follow-up.',
      'If checking vaccination status, request Anti-HBs antibody titer.'
    ],
    symptoms: [],
    labFindings: [
      'HBsAg (Hepatitis B Surface Antigen): 0.35 S/CO (Cutoff < 0.90 Non-Reactive) - NON-REACTIVE'
    ],
    labResults: [
      {
        id: 'lab-hbsag-main',
        testName: 'HBsAg (Hepatitis B Surface Antigen)',
        result: 'NON-REACTIVE',
        unit: 'S/CO',
        cutoff: '< 0.90',
        referenceRange: '< 0.90 Non-Reactive',
        interpretation: 'Non-Reactive (Patient Value: 0.35 S/CO is below the 0.90 cutoff threshold). No viral surface antigen detected above assay sensitivity.',
        flag: 'NORMAL',
        isVerified: true,
        safeExplanation: 'The screening test did not detect Hepatitis B surface antigen above the laboratory cutoff threshold.'
      }
    ],
    separatedContent: {
      documentSays: [
        { category: 'Investigation', field: 'Test Name', value: 'HBsAg (Hepatitis B Surface Antigen)' },
        { category: 'Observed Value', field: 'Patient Value', value: '0.35 S/CO' },
        { category: 'Cutoff Rule', field: 'Biological Reference', value: '< 0.90 S/CO Non-Reactive' },
        { category: 'Result', field: 'Reported Status', value: 'NON-REACTIVE' },
        { category: 'Method', field: 'Assay Protocol', value: 'Chemiluminescent Microparticle Immunoassay (CMIA)' }
      ],
      termMeanings: [
        { term: 'HBsAg', meaning: 'Hepatitis B surface antigen: outer coat protein of the virus used to detect active infection.', source: 'Clinical Virology' },
        { term: 'S/CO', meaning: 'Signal to Cutoff ratio: numerical index comparing sample luminescence against the negative calibrator cutoff.', source: 'Assay Manual' },
        { term: 'CMIA', meaning: 'Chemiluminescent Microparticle Immunoassay: advanced laboratory automation using light signals to detect molecules.', source: 'Laboratory Science' },
        { term: 'Non-Reactive', meaning: 'Below threshold; marker was not detected.', source: 'Medical Diagnostics' }
      ],
      notDetermined: [
        { question: 'Does this test prove I am immune from hepatitis B vaccine?', reason: 'HBsAg tests for virus presence, NOT vaccine antibodies. You need an Anti-HBs test to check immunity.' },
        { question: 'Does this rule out exposure that happened yesterday?', reason: 'The window period (2 to 4 weeks) is needed before virus markers reach detectable levels.' }
      ]
    },
    confidenceInfo: {
      serviceName: 'Krishxtattva Precision Virology & Clinical Rule Engine',
      hasNumericalConfidence: true,
      averageConfidenceScore: 0.99,
      providerNotice: 'Document processed with optical stroke recognition, reference cutoff validation, and zero-hallucination verification.',
      highConfidenceCount: 9,
      mediumConfidenceCount: 0,
      needsVerificationCount: 0
    },
    serviceConfigured: true,
    isVerifiedContent: true
  };
}
