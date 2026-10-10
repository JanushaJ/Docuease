/**
 * Krishxtattva Deterministic Safety & Rule Engine
 * 
 * CORE PRINCIPLE:
 * The LLM must NEVER be the final authority for safety-critical medical
 * or financial decisions. Deterministic code evaluates structured facts against
 * reliable, traceable clinical and security databases.
 */

import { SafetyCheck, SafetyCheckItem, StructuredMedication, LabResultEntry } from '../src/types/medscript';

export interface InteractionRule {
  drugA: string;
  drugB: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  source: string;
  actionRequired: string;
}

// Trusted clinical interaction knowledge base (derived from FDA, BNF, and Clinical Pharmacology)
export const KNOWN_DRUG_INTERACTIONS: InteractionRule[] = [
  {
    drugA: 'aspirin',
    drugB: 'ibuprofen',
    severity: 'moderate',
    description: 'Ibuprofen may interfere with the antiplatelet protective effect of low-dose aspirin and increases risk of gastrointestinal ulcers.',
    source: 'FDA Drug Safety Communication / BNF Section 2.9 (Antiplatelet drugs)',
    actionRequired: 'Consult your doctor or pharmacist about appropriate spacing (e.g. taking immediate-release aspirin 30 minutes before ibuprofen).'
  },
  {
    drugA: 'warfarin',
    drugB: 'aspirin',
    severity: 'severe',
    description: 'Combining anticoagulants (warfarin) with antiplatelet agents (aspirin) significantly heightens the risk of major internal bleeding.',
    source: 'American College of Cardiology (ACC) / CHEST Guidelines',
    actionRequired: 'Verify with your prescribing physician whether dual therapy was specifically intentional and monitor INR closely.'
  },
  {
    drugA: 'clopidogrel',
    drugB: 'omeprazole',
    severity: 'moderate',
    description: 'Omeprazole significantly reduces the antiplatelet activation of clopidogrel (Plavix), decreasing its protective effect.',
    source: 'FDA Public Health Advisory / American College of Gastroenterology',
    actionRequired: 'Ask your doctor about switching to a non-interacting acid reducer such as pantoprazole or famotidine.'
  },
  {
    drugA: 'metformin',
    drugB: 'contrast',
    severity: 'severe',
    description: 'Iodinated radiologic contrast media combined with metformin creates a potential risk of contrast-induced nephropathy and lactic acidosis.',
    source: 'American College of Radiology (ACR) Contrast Manual',
    actionRequired: 'Metformin is typically paused at the time of procedure and for 48 hours afterward until renal function is confirmed.'
  },
  {
    drugA: 'atorvastatin',
    drugB: 'clarithromycin',
    severity: 'moderate',
    description: 'Strong CYP3A4 inhibitors like clarithromycin or erythromycin significantly increase statin blood levels, increasing myopathy/rhabdomyolysis risk.',
    source: 'FDA Drug Safety Bulletin on Statin-Macrolide Interactions',
    actionRequired: 'Consult your physician about temporarily holding statin therapy during macrolide antibiotic treatment.'
  },
  {
    drugA: 'paracetamol',
    drugB: 'combiflam',
    severity: 'moderate',
    description: 'Combiflam already contains 325mg Paracetamol. Taking additional Paracetamol concurrently risks exceeding the safe 4,000mg/day liver toxicity limit.',
    source: 'World Health Organization (WHO) Analgesic Guidelines',
    actionRequired: 'Do not take standalone Paracetamol alongside combination analgesics containing paracetamol.'
  },
  {
    drugA: 'paracetamol',
    drugB: 'dolo',
    severity: 'severe',
    description: 'Both medications contain Paracetamol (Dolo contains 650mg Paracetamol). Taking both concurrently is a dangerous duplicate dose.',
    source: 'WHO Model Formulary & Central Drugs Standard Control Organisation (CDSCO)',
    actionRequired: 'Choose only one single paracetamol brand as prescribed to prevent accidental liver toxicity.'
  }
];

// Max daily dosage safety thresholds (WHO / BNF standards)
export const MAX_DAILY_DOSE_THRESHOLDS: Record<string, { maxMg: number; source: string; warning: string }> = {
  paracetamol: {
    maxMg: 4000,
    source: 'FDA / WHO Analgesics Formulary',
    warning: 'Daily paracetamol exceeding 4,000 mg in adults can cause severe hepatic necrosis (liver injury).'
  },
  acetaminophen: {
    maxMg: 4000,
    source: 'FDA / WHO Analgesics Formulary',
    warning: 'Daily acetaminophen exceeding 4,000 mg in adults can cause severe hepatic necrosis.'
  },
  ibuprofen: {
    maxMg: 2400,
    source: 'FDA / BNF Section 10.1',
    warning: 'Daily ibuprofen exceeding 2,400 mg increases risks of gastrointestinal bleeding and renal impairment.'
  },
  metformin: {
    maxMg: 2550,
    source: 'American Diabetes Association (ADA) Standards of Care',
    warning: 'Daily metformin exceeding 2,550 mg increases risk of severe gastrointestinal distress and lactic acidosis.'
  },
  atorvastatin: {
    maxMg: 80,
    source: 'AHA / ACC Cholesterol Guidelines',
    warning: 'Daily atorvastatin should not exceed 80 mg.'
  }
};

/**
 * Validate extracted medications deterministically
 */
export function validateMedicalPrescription(
  meds: StructuredMedication[],
  uncertainWordsCount: number = 0
): SafetyCheck {
  const checks: SafetyCheckItem[] = [];
  const drugInteractions: SafetyCheck['drugInteractions'] = [];
  const duplicateMedicines: SafetyCheck['duplicateMedicines'] = [];

  let overallPassed = true;

  // 1. Check for Duplicate Ingredients / Brand-Generic Overlaps
  const normNames = meds.map(m => m.name.toLowerCase().trim());
  const checkedPairs = new Set<string>();

  for (let i = 0; i < meds.length; i++) {
    for (let j = i + 1; j < meds.length; j++) {
      const nameA = normNames[i];
      const nameB = normNames[j];
      const pairKey = [nameA, nameB].sort().join(':::');
      if (checkedPairs.has(pairKey)) continue;
      checkedPairs.add(pairKey);

      // Check duplicate Paracetamol / NSAID combos
      const isParaA = nameA.includes('paracetamol') || nameA.includes('calpol') || nameA.includes('dolo') || nameA.includes('panadol') || nameA.includes('combiflam');
      const isParaB = nameB.includes('paracetamol') || nameB.includes('calpol') || nameB.includes('dolo') || nameB.includes('panadol') || nameB.includes('combiflam');

      if (isParaA && isParaB) {
        overallPassed = false;
        duplicateMedicines.push({
          drugs: [meds[i].name, meds[j].name],
          ingredient: 'Paracetamol / Acetaminophen',
          warning: `Both ${meds[i].name} and ${meds[j].name} contain paracetamol. Taking both concurrently risks toxic liver overdose.`
        });

        checks.push({
          id: `dup-${i}-${j}`,
          name: 'Duplicate Active Ingredient Detected',
          passed: false,
          severity: 'high',
          details: `Multiple medicines contain Paracetamol (${meds[i].name} & ${meds[j].name}). Never take two paracetamol-containing products together without doctor clearance.`,
          sourceReference: 'WHO Model Formulary & CDSCO Safety Advisory',
          confidenceLevel: 'HIGH',
          verificationAction: 'Verify with your doctor or pharmacist to confirm whether only one medicine was intended.'
        });
      }

      // Check Drug-Drug Interactions
      for (const rule of KNOWN_DRUG_INTERACTIONS) {
        const matchesA = nameA.includes(rule.drugA) && nameB.includes(rule.drugB);
        const matchesB = nameA.includes(rule.drugB) && nameB.includes(rule.drugA);

        if (matchesA || matchesB) {
          overallPassed = false;
          drugInteractions.push({
            drugA: meds[i].name,
            drugB: meds[j].name,
            severity: rule.severity,
            description: rule.description,
            source: rule.source,
            actionRequired: rule.actionRequired
          });

          checks.push({
            id: `interact-${rule.drugA}-${rule.drugB}`,
            name: `Potential Drug Interaction: ${rule.drugA.toUpperCase()} + ${rule.drugB.toUpperCase()}`,
            passed: false,
            severity: rule.severity === 'severe' ? 'critical' : 'medium',
            details: rule.description,
            sourceReference: rule.source,
            confidenceLevel: 'HIGH',
            verificationAction: rule.actionRequired
          });
        }
      }
    }
  }

  // 2. Check for Missing Critical Dosing Information
  for (const med of meds) {
    const isStrengthMissing = !med.strength || med.strength.toLowerCase().includes('not specified') || med.strength === '';
    const isFreqMissing = !med.frequency || med.frequency.toLowerCase().includes('not specified') || med.frequency === '';

    if (isStrengthMissing && !med.name.toLowerCase().includes('ointment') && !med.name.toLowerCase().includes('drops')) {
      checks.push({
        id: `missing-strength-${med.id}`,
        name: `Missing Medication Strength: ${med.name}`,
        passed: false,
        severity: 'medium',
        details: `The prescription does not clearly display the milligram (mg) strength for ${med.name}. Multiple strengths exist commercially.`,
        sourceReference: 'Institute for Safe Medication Practices (ISMP) Prescription Standards',
        confidenceLevel: 'HIGH',
        verificationAction: 'Ask your pharmacist or doctor for the exact prescribed strength before dispensing.'
      });
    }

    if (isFreqMissing) {
      checks.push({
        id: `missing-freq-${med.id}`,
        name: `Missing Frequency / Schedule: ${med.name}`,
        passed: false,
        severity: 'medium',
        details: `How often to take ${med.name} is not legibly indicated on the document.`,
        sourceReference: 'ISMP Guidelines for Timely & Safe Administration',
        confidenceLevel: 'HIGH',
        verificationAction: 'Do not guess medication frequency. Confirm with your doctor or pharmacist.'
      });
    }
  }

  // 3. Check for Handwriting Uncertainty Flags
  if (uncertainWordsCount > 0) {
    checks.push({
      id: 'uncertain-handwriting',
      name: 'Unclear Handwriting Detected',
      passed: false,
      severity: 'medium',
      details: `${uncertainWordsCount} word(s) in this handwritten document could not be read with 100% confidence.`,
      sourceReference: 'Krishxtattva Verification Gate & ISMP Handwriting Safety Rule',
      confidenceLevel: 'HIGH',
      verificationAction: 'Always verify unclear medicine names with a licensed pharmacist or physician.'
    });
  }

  // 4. If all checks passed
  if (checks.length === 0) {
    checks.push({
      id: 'all-clear',
      name: 'No Known Critical Conflicts Detected in Extracted Fields',
      passed: true,
      severity: 'low',
      details: 'Extracted medicines do not match known high-risk drug-drug conflict pairs in our reference database. Always follow doctor instructions.',
      sourceReference: 'Krishxtattva Clinical Validation Layer',
      confidenceLevel: 'HIGH',
      verificationAction: 'Take medicines strictly as prescribed by your registered medical practitioner.'
    });
  }

  return {
    passed: overallPassed,
    timestamp: new Date().toISOString(),
    checks,
    drugInteractions,
    duplicateMedicines
  };
}

/**
 * Validate Laboratory Report Values deterministically
 */
export function validateLabReport(tests: LabResultEntry[]): SafetyCheck {
  const checks: SafetyCheckItem[] = [];
  let abnormalCount = 0;

  for (const t of tests) {
    if (t.flag === 'ABNORMAL' || t.flag === 'BORDERLINE') {
      abnormalCount++;
      checks.push({
        id: `lab-${t.id}`,
        name: `Outside Reference Range: ${t.testName}`,
        passed: false,
        severity: 'medium',
        details: `${t.testName} was reported as ${t.result} ${t.unit || ''} (Reference range: ${t.referenceRange || 'See report'}).`,
        sourceReference: 'Laboratory Report Provided Values (Non-Diagnostic Evaluation)',
        confidenceLevel: 'HIGH',
        verificationAction: 'Discuss this result with your doctor. Do not self-diagnose or alter medications independently.'
      });
    }
  }

  if (checks.length === 0) {
    checks.push({
      id: 'lab-normal',
      name: 'All Displayed Results Within Listed Reference Ranges',
      passed: true,
      severity: 'low',
      details: 'Reported test values fall within the laboratory reference boundaries specified on your paper report.',
      sourceReference: 'Laboratory Sheet Documentation',
      confidenceLevel: 'HIGH',
      verificationAction: 'Review overall health status during your next scheduled routine appointment.'
    });
  }

  return {
    passed: abnormalCount === 0,
    timestamp: new Date().toISOString(),
    checks
  };
}
