import { GoogleGenAI } from '@google/genai';
import { SupportedLanguage } from '../types/medscript';

/**
 * Structured schema definitions for DocuEase AI
 */
export interface MedicationItem {
  name: string;
  strength?: string;
  dosage: string; // e.g. "1-0-1" or "1 tablet twice daily"
  frequency?: string;
  duration?: string; // e.g. "5 days"
  timingInstructions?: string; // e.g. "After food"
  isLegible: boolean;
  needsPharmacistVerification?: boolean;
  originalText?: string;
  notes?: string;
}

export interface LabMarkerItem {
  biomarker: string;
  value: string;
  unit: string;
  referenceRange: string;
  classification: 'Normal' | 'Elevated' | 'Low' | 'Abnormal';
  clinicalNote: string;
}

export interface MedScanAnalysisResult {
  tool: 'MedScan AI';
  documentSubtype: 'PRESCRIPTION' | 'LAB_REPORT' | 'DISCHARGE_SUMMARY';
  identifiedCondition?: string;
  patientName?: string;
  doctorOrLabName?: string;
  date?: string;
  medications: MedicationItem[];
  labBiomarkers: LabMarkerItem[];
  hasIllegibleText: boolean;
  unclearItemsNotes: string[];
  clinicalSummary: string;
  simpleExplanation: string;
  actionItems: string[];
  spokenExplanation: string;
  translatedLanguage: SupportedLanguage;
}

export interface BillFeeItem {
  description: string;
  amount: string;
}

export interface DocuSimplifyAnalysisResult {
  tool: 'DocuSimplify AI';
  documentSubtype: 'ELECTRICITY_BILL' | 'GAS_BILL' | 'WATER_BILL' | 'BANK_LETTER' | 'GOVERNMENT_NOTICE' | 'FINANCIAL_DOC';
  providerOrIssuer: string;
  accountNumber?: string;
  billingPeriod?: string;
  totalAmountDue?: string;
  dueDate?: string;
  lateFeeNotice?: string;
  breakdownOfFees: BillFeeItem[];
  requiredActions: string[];
  fraudCautionNotice?: string;
  summary: string;
  simpleExplanation: string;
  spokenExplanation: string;
  translatedLanguage: SupportedLanguage;
}

export type DocuEaseAnalysisResponse = 
  | { type: 'medical'; data: MedScanAnalysisResult }
  | { type: 'utility_or_notice'; data: DocuSimplifyAnalysisResult };

/**
 * Build Gemini prompt for MedScan AI (Prescriptions, Handwriting & Lab Reports)
 */
export function buildMedScanPrompt(targetLanguageName: string, targetLanguageCode: string): string {
  return `You are MedScan AI, an expert medical document deciphering and clinical verification system.
CRITICAL ZERO-REJECTION & HANDWRITING ACCURACY RULES:
1. NEVER REJECT ANY DOCUMENT:
   - Under NO circumstances should any document, prescription, or clinical note be rejected.
   - Even if the handwriting is cursive, doctor scribbles, faint, blurry, or unformatted, YOU MUST understand and explain something inside the document.
   - Interpret clinical handwriting strokes, doctor signatures/stamps, dates, symptoms, advice, and Rx prescription symbols.
2. FOR PRESCRIPTIONS & MESSY HANDWRITING:
   - Accurately decipher doctor cursive notes, clinical shorthand, and medicine names.
   - Extract prescribed medicines with exact strength, dosages (e.g., 1-0-1, OD, BD, TDS, SOS), frequency, and duration.
   - If any handwriting or abbreviation is unclear or ambiguous, explicitly set "isLegible": false and "needsPharmacistVerification": true. Explain the detected dosage pattern without guessing.
3. FOR LAB REPORTS (Liver Function, Hepatitis, CBC, Metabolic Panels, Blood Tests):
   - Extract EXACT biomarkers (e.g., SGPT/ALT, SGOT/AST, Bilirubin, HBsAg, Platelets), numerical values, units, and reference ranges.
   - Classify each marker strictly as "Normal", "Elevated", or "Low" based on the paper's reference range.
   - NEVER hallucinate or output irrelevant text like "No prescription medicines or daily fever tablets are listed." Provide a clean, professional clinical breakdown of the findings.
4. NATIVE TRANSLATION:
   - Translate clinicalSummary, simpleExplanation, actionItems, and spokenExplanation fully and fluently into ${targetLanguageName} (${targetLanguageCode}).
   - Use natural phrasing suitable for regional speech synthesis.

Return STRICT JSON matching this schema:
{
  "tool": "MedScan AI",
  "documentSubtype": "PRESCRIPTION | LAB_REPORT | DISCHARGE_SUMMARY",
  "identifiedCondition": "Clinical condition or test panel name if stated",
  "patientName": "Patient name or null",
  "doctorOrLabName": "Doctor or diagnostic center name or null",
  "date": "Document date or null",
  "medications": [
    {
      "name": "Medicine name",
      "strength": "e.g. 500mg or null",
      "dosage": "e.g. 1-0-1 or 1 tablet",
      "frequency": "Twice daily",
      "duration": "5 days",
      "timingInstructions": "After meals",
      "isLegible": true,
      "needsPharmacistVerification": false,
      "originalText": "exact handwriting stroke or text",
      "notes": "Any precaution"
    }
  ],
  "labBiomarkers": [
    {
      "biomarker": "SGPT / ALT",
      "value": "38",
      "unit": "U/L",
      "referenceRange": "7 - 56",
      "classification": "Normal | Elevated | Low",
      "clinicalNote": "Neutral explanation without guessing diagnosis"
    }
  ],
  "hasIllegibleText": false,
  "unclearItemsNotes": ["Any stroke marked Needs Pharmacist Verification"],
  "clinicalSummary": "Professional clinical summary in ${targetLanguageName}",
  "simpleExplanation": "Plain everyday explanation in ${targetLanguageName}",
  "actionItems": ["Action points in ${targetLanguageName}"],
  "spokenExplanation": "Conversational spoken script in ${targetLanguageName} for TTS audio narration"
}`;
}

/**
 * Build Gemini prompt for DocuSimplify AI (Utility Bills, Gas Bills & Notices)
 */
export function buildDocuSimplifyPrompt(targetLanguageName: string, targetLanguageCode: string): string {
  return `You are DocuSimplify AI, an elite document simplification engine for utility bills, financial statements, and government notices.
CRITICAL RULES:
1. Accept electricity bills, gas bills, water bills, bank letters, and legal/government notices.
2. Extract exact account/consumer numbers, due dates, billing periods, units consumed, and total fees without hallucinating.
3. NEVER mix this up with medical data or prescriptions.
4. If a bank letter, include mandatory anti-fraud warning (e.g. Never share OTP / Bank will never ask for PIN).
5. NATIVE TRANSLATION:
   - Translate summary, simpleExplanation, requiredActions, and spokenExplanation fully and natively into ${targetLanguageName} (${targetLanguageCode}).

Return STRICT JSON matching this schema:
{
  "tool": "DocuSimplify AI",
  "documentSubtype": "ELECTRICITY_BILL | GAS_BILL | WATER_BILL | BANK_LETTER | GOVERNMENT_NOTICE | FINANCIAL_DOC",
  "providerOrIssuer": "Electricity board, gas provider, or government department",
  "accountNumber": "Account / Consumer number",
  "billingPeriod": "Billing period",
  "totalAmountDue": "Total amount with currency e.g. ₹742.00",
  "dueDate": "Payment deadline e.g. 15 Oct 2026",
  "lateFeeNotice": "Late fee or penalty details if mentioned",
  "breakdownOfFees": [
    { "description": "Energy Charges (184 units)", "amount": "₹612.00" }
  ],
  "requiredActions": ["Step-by-step actions in ${targetLanguageName}"],
  "fraudCautionNotice": "Anti-fraud reminder if applicable or null",
  "summary": "Clear summary in ${targetLanguageName}",
  "simpleExplanation": "Simple everyday breakdown in ${targetLanguageName}",
  "spokenExplanation": "Warm spoken script in ${targetLanguageName} for TTS narration"
}`;
}

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  te: 'Telugu (తెలుగు)',
  ta: 'Tamil (தமிழ்)',
  hi: 'Hindi (हिन्दी)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  bn: 'Bengali (বাংলা)',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
  ur: 'Urdu (اردو)',
  or: 'Odia',
  as: 'Assamese',
  bho: 'Bhojpuri',
  sa: 'Sanskrit',
  ne: 'Nepali',
  es: 'Spanish',
  fr: 'French',
  ar: 'Arabic',
  de: 'German'
};

/**
 * Analyze document via Google Gemini using @google/genai SDK
 */
export async function analyzeDocumentWithGeminiClient(
  apiKey: string,
  imageDataUrl: string,
  preferredTool: 'medscan' | 'simplify' | 'auto',
  targetLanguage: SupportedLanguage = 'en'
): Promise<DocuEaseAnalysisResponse> {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }

  const ai = new GoogleGenAI({ apiKey });

  // Extract base64 and mime type safely without rejecting unusual image formats
  const match = imageDataUrl.match(/^data:([a-zA-Z0-9\+\-\.\/]+);base64,(.+)$/i);
  let mimeType = match ? match[1] : 'image/jpeg';
  if (mimeType.includes('pdf')) mimeType = 'application/pdf';
  else if (!mimeType.startsWith('image/')) mimeType = 'image/jpeg';
  const base64Data = match ? match[2] : (imageDataUrl.includes(',') ? imageDataUrl.split(',')[1] : imageDataUrl);

  const targetLangName = LANGUAGE_NAMES[targetLanguage] || 'English';

  // Determine prompt based on tool preference
  const isMedical = preferredTool === 'medscan';
  const prompt = isMedical 
    ? buildMedScanPrompt(targetLangName, targetLanguage)
    : buildDocuSimplifyPrompt(targetLangName, targetLanguage);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { mimeType, data: base64Data } },
          { text: prompt },
        ],
      },
    ],
  });

  const responseText = response?.text || '';
  const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
  let parsed: any;
  if (jsonMatch) {
    try {
      parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    } catch {
      parsed = null;
    }
  }

  if (!parsed) {
    parsed = {
      tool: isMedical ? 'MedScan AI' : 'DocuSimplify AI',
      documentSubtype: isMedical ? 'PRESCRIPTION' : 'OFFICIAL_DOCUMENT',
      clinicalSummary: responseText.slice(0, 300) || 'Document analyzed successfully.',
      simpleExplanation: responseText.slice(0, 400) || 'The document has been reviewed and simplified.',
      spokenExplanation: responseText.slice(0, 350) || 'Hello! I have reviewed your document and extracted the main details.',
      actionItems: ['Review doctor instructions', 'Follow recommended timings'],
      medications: [],
      labBiomarkers: []
    };
  }

  if (isMedical || parsed.tool === 'MedScan AI') {
    return {
      type: 'medical',
      data: {
        tool: 'MedScan AI',
        documentSubtype: parsed.documentSubtype || 'PRESCRIPTION',
        identifiedCondition: parsed.identifiedCondition,
        patientName: parsed.patientName,
        doctorOrLabName: parsed.doctorOrLabName,
        date: parsed.date,
        medications: Array.isArray(parsed.medications) ? parsed.medications : [],
        labBiomarkers: Array.isArray(parsed.labBiomarkers) ? parsed.labBiomarkers : [],
        hasIllegibleText: Boolean(parsed.hasIllegibleText),
        unclearItemsNotes: Array.isArray(parsed.unclearItemsNotes) ? parsed.unclearItemsNotes : [],
        clinicalSummary: parsed.clinicalSummary || '',
        simpleExplanation: parsed.simpleExplanation || '',
        actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
        spokenExplanation: parsed.spokenExplanation || parsed.simpleExplanation || '',
        translatedLanguage: targetLanguage,
      }
    };
  }

  return {
    type: 'utility_or_notice',
    data: {
      tool: 'DocuSimplify AI',
      documentSubtype: parsed.documentSubtype || 'ELECTRICITY_BILL',
      providerOrIssuer: parsed.providerOrIssuer || 'Service Provider',
      accountNumber: parsed.accountNumber,
      billingPeriod: parsed.billingPeriod,
      totalAmountDue: parsed.totalAmountDue,
      dueDate: parsed.dueDate,
      lateFeeNotice: parsed.lateFeeNotice,
      breakdownOfFees: Array.isArray(parsed.breakdownOfFees) ? parsed.breakdownOfFees : [],
      requiredActions: Array.isArray(parsed.requiredActions) ? parsed.requiredActions : [],
      fraudCautionNotice: parsed.fraudCautionNotice,
      summary: parsed.summary || '',
      simpleExplanation: parsed.simpleExplanation || '',
      spokenExplanation: parsed.spokenExplanation || parsed.simpleExplanation || '',
      translatedLanguage: targetLanguage,
    }
  };
}
