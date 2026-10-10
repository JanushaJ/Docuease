/**
 * Krishxtattva Universal AI Document Understanding Platform
 * "From difficult documents to language everyone can understand."
 * "Complex documents. Clear understanding."
 */

export type SupportedLanguage = 
  | 'en' 
  | 'te' 
  | 'hi' 
  | 'ta' 
  | 'kn' 
  | 'ml' 
  | 'bn' 
  | 'mr' 
  | 'gu' 
  | 'pa' 
  | 'ur'
  | 'or'
  | 'as'
  | 'bho'
  | 'sa'
  | 'ne'
  | 'es'
  | 'fr'
  | 'ar'
  | 'de';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  voiceLangCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', voiceLangCode: 'en-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', voiceLangCode: 'te-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', voiceLangCode: 'hi-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', voiceLangCode: 'ta-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', voiceLangCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', voiceLangCode: 'ml-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', voiceLangCode: 'bn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', voiceLangCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', voiceLangCode: 'gu-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', voiceLangCode: 'pa-IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', voiceLangCode: 'ur-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', voiceLangCode: 'or-IN' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', voiceLangCode: 'as-IN' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', voiceLangCode: 'hi-IN' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', voiceLangCode: 'hi-IN' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', voiceLangCode: 'ne-NP' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', voiceLangCode: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', voiceLangCode: 'fr-FR' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', voiceLangCode: 'ar-SA' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', voiceLangCode: 'de-DE' },
];

export interface QualityCheckResult {
  status: 'pass' | 'warning' | 'fail';
  overallScore: number; // 0 - 100
  blurScore: number;
  darknessScore: number;
  glareScore: number;
  resolutionScore: number;
  rotationAngle: number;
  handwritingVisibilityScore: number;
  textDensityScore?: number;
  issues: string[];
  suggestions: string[];
}

export type MainMode = 'medical' | 'general';

export type DocumentCategoryGroup = 
  | 'medical' 
  | 'financial' 
  | 'utility' 
  | 'government' 
  | 'education' 
  | 'legal' 
  | 'general';

export type DocumentClassification = 
  // Medical
  | 'PRESCRIPTION' 
  | 'HANDWRITTEN_SCRIPT'
  | 'LAB_REPORT' 
  | 'MEDICINE_STRIP_OR_BOX'
  | 'DISCHARGE_SUMMARY'
  | 'MEDICAL_REPORT'
  // Financial
  | 'BANK_LETTER'
  | 'BANK_STATEMENT'
  | 'LOAN_EMI_NOTICE'
  | 'INSURANCE_DOC'
  // Utility
  | 'ELECTRICITY_BILL'
  | 'GAS_BILL'
  | 'WATER_BILL'
  | 'TELECOM_BILL'
  // Government
  | 'GOVERNMENT_NOTICE'
  | 'OFFICIAL_CERTIFICATE'
  | 'WELFARE_SCHEME'
  | 'TAX_NOTICE'
  // Education
  | 'SCHOOL_COLLEGE_NOTICE'
  | 'EXAM_ADMIT_DOC'
  | 'SCHOLARSHIP_DOC'
  // Legal
  | 'LEGAL_AGREEMENT'
  | 'OFFICIAL_NOTICE'
  | 'TERMS_CONDITIONS'
  // General
  | 'HANDWRITTEN_NOTE'
  | 'COMPLICATED_TEXT'
  | 'TECHNICAL_DOCUMENT'
  | 'SCANNED_DOCUMENT'
  | 'UNKNOWN';

export type ExplanationLevel = 'original' | 'simple' | 'very_simple';

export interface WhatDoesThisMeanBreakdown {
  whatIsThis: string;       // 1. What is this document?
  whatItSays: string;       // 2. What does it say?
  whatToDo: string;         // 3. What do I need to do?
  deadline?: string;        // 4. Is there a deadline?
  importantAmounts?: string;// 5. Are there any important amounts?
  whatToWatch?: string;     // 6. What should I pay attention to?
  whatIsUnclear?: string;   // 7. What is unclear?
}

export interface LabResultEntry {
  id: string;
  testName: string;
  result: string;
  unit?: string;
  cutoff?: string;
  referenceRange?: string;
  interpretation?: string;
  flag?: 'NORMAL' | 'ABNORMAL' | 'BORDERLINE' | 'INCONCLUSIVE' | 'HIGH' | 'LOW';
  isInconsistent?: boolean;
  inconsistencyNote?: string;
  rawLine?: string;
  isVerified: boolean;
  safeExplanation?: string;
}

export interface BillDetails {
  provider: string;
  accountNumber?: string;
  consumerName?: string;
  consumerNumber?: string;
  billingPeriod?: string;
  previousReading?: string;
  currentReading?: string;
  unitsConsumed?: string;
  amountDue: string;
  dueDate: string;
  lateFee?: string;
  paymentInstructions?: string;
  disconnectionNotice?: string;
  breakdown?: {
    energyCharges?: string;
    meterRent?: string;
    taxes?: string;
    [key: string]: any;
  };
}

export interface FinancialDetails {
  institutionName: string;
  accountRef?: string;
  accountNumberMasked?: string;
  noticeType: string;
  amountMentioned?: string;
  deadline?: string;
  actionRequired: string;
  fraudCaution: string;
  officialContact?: string;
}

export interface GovernmentDetails {
  department: string;
  noticeTitle: string;
  beneficiaryOrApplicant?: string;
  eligibilityOrRequirement: string;
  actionRequired: string;
  deadline?: string;
  officialPortalOrOffice: string;
}

export interface EducationDetails {
  institution: string;
  noticeSubject: string;
  targetGroup: string;
  keyInstructions: string;
  deadlineOrExamDate?: string;
  feesOrDocumentsRequired?: string;
}

export interface LegalDetails {
  documentTitle: string;
  partiesInvolved?: string;
  coreObligations: string;
  keyDatesOrDeadlines?: string;
  plainLanguageSummary: string;
  legalDisclaimerNotice: string;
}

export type TokenCategory = 
  | 'medication' 
  | 'dosage' 
  | 'diagnosis' 
  | 'lab_value' 
  | 'instruction' 
  | 'patient_info' 
  | 'amount'
  | 'date'
  | 'deadline'
  | 'organization'
  | 'action_item'
  | 'non_content'
  | 'general';

export interface OCRToken {
  id: string;
  text: string;
  confidence: number | null; // numeric confidence or null if unrated
  confidenceDisplay?: string;
  bbox: {
    x: number; // percentage (0 - 100)
    y: number; // percentage (0 - 100)
    width: number;
    height: number;
  };
  category: TokenCategory;
  isUncertain: boolean;
  isGarbage?: boolean;
  isUnreadable?: boolean;
  isNonContent?: boolean;
  nonContentReason?: string;
  alternatives?: string[];
  sourceCropUrl?: string;
  meaning?: string;
  medicalMeaning?: string;
}

export interface UncertainWord {
  id: string;
  tokenId?: string;
  extractedText?: string;
  originalOcrWord?: string;
  confidence: number | null;
  alternatives?: string[];
  candidates?: string[];
  userSelectedText?: string;
  selectedCandidate?: string;
  isResolved: boolean;
  sourceCropUrl?: string;
  cropImageUrl?: string;
  sentenceContext?: string;
  question?: string;
}

export interface TermCard {
  id: string;
  term: string;
  simpleMeaning: string;
  documentContext: string;
  whatItDoesNotMean?: string;
  category: TokenCategory;
}

// Backwards compatibility alias
export type MedicalTerm = TermCard;

export interface SentenceTiming {
  sentence: string;
  durationSec: number;
  topic?: string;
  phoneticSentence?: string;
  audioStartTime?: number;
  audioEndTime?: number;
}

export interface DocumentExplanation {
  language?: SupportedLanguage;
  languageName?: string;
  // Three levels of comprehension:
  originalTextSummary?: string;  // Original formal/technical wording
  originalSummary?: string;      // Compatibility alias
  simpleSummary?: string;        // Everyday clear conversational language
  explainLikeIm10?: string;      // Very simple 1st-grade language for low literacy
  
  threeLevelExplanation?: {
    originalTextSummary?: string;
    simpleSummary: string;
    explainLikeIm10: string;
  };

  whatWasWritten?: string[];
  whatMedicalTermsMean?: TermCard[];
  whatDocumentSaysHappened?: string[];
  whatIsUnclear?: string[];
  whatToAskDoctor?: string[];    // Or what to verify with official/bank
  spokenScript: string;
  spokenScriptPhonetic?: string;
  sentenceTimings?: SentenceTiming[];
  tokens?: any[];
  
  // Universal 7-part breakdown:
  breakdown?: WhatDoesThisMeanBreakdown;
  
  // Specific category payload if applicable:
  billDetails?: BillDetails;
  financialDetails?: FinancialDetails;
  governmentDetails?: GovernmentDetails;
  educationDetails?: EducationDetails;
  legalDetails?: LegalDetails;
}

export interface SafetyCheckItem {
  id: string;
  name: string;
  passed: boolean;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  sourceReference?: string;
  confidenceLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  verificationAction?: string;
}

export interface SafetyCheck {
  passed: boolean;
  timestamp: string;
  checks: SafetyCheckItem[];
  drugInteractions?: Array<{
    drugA: string;
    drugB: string;
    severity: 'mild' | 'moderate' | 'severe';
    description: string;
    source: string;
    actionRequired: string;
  }>;
  duplicateMedicines?: Array<{
    drugs: string[];
    ingredient: string;
    warning: string;
  }>;
}

export interface StructuredMedication {
  id: string;
  name: string;
  strength?: string;
  dosage: string;
  frequency: string;
  duration?: string;
  route?: string;
  timingInstructions: string;
  foodInstructions?: string;
  purpose?: string;
  isVerified?: boolean;
  verificationStatus?: 'VERIFIED' | 'LIKELY' | 'UNCLEAR' | 'NO_MATCH' | 'STRENGTH_REJECTED';
  verificationMessage?: string;
  matchedBrand?: string;
  matchedGeneric?: string;
  confidence: number | null;
  confidenceGrade?: 'HIGH' | 'MEDIUM' | 'LOW / NEEDS VERIFICATION';
  rawLine?: string;
  medicalMeaning?: string;
}

export interface SeparatedClinicalContent {
  documentSays: Array<{
    category: string;
    field: string;
    value: string;
    locationNote?: string;
  }>;
  termMeanings: Array<{
    term: string;
    meaning: string;
    caution?: string;
    source?: string;
  }>;
  notDetermined: Array<{
    topic?: string;
    question?: string;
    explanation?: string;
    reason?: string;
  }>;
}

export interface ConfidenceInfo {
  serviceName: string;
  hasNumericalConfidence: boolean;
  averageConfidenceScore: number | null;
  providerNotice: string;
  highConfidenceCount?: number;
  mediumConfidenceCount?: number;
  needsVerificationCount?: number;
}

export interface ProcessedDocument {
  id: string;
  name: string;
  type: 'prescription' | 'notes' | 'lab_report' | 'discharge_summary' | 'bill' | 'banking' | 'government' | 'education' | 'legal' | 'general' | 'medical' | 'other';
  classification?: DocumentClassification;
  documentClassification?: DocumentClassification;
  detectedCategoryLabel?: string;
  categoryGroup?: DocumentCategoryGroup;
  imageDataUrl: string;
  uploadedAt: string;
  fileSize: number;
  quality: QualityCheckResult;
  tokens: OCRToken[];
  rawOcrText: string;
  uncertainWords: UncertainWord[];
  allUncertainResolved: boolean;
  selectedLanguage: SupportedLanguage;
  explanation: DocumentExplanation;
  translations: Partial<Record<SupportedLanguage, DocumentExplanation>>;
  safety: SafetyCheck;
  structuredMeds: StructuredMedication[];
  diagnoses: string[];
  instructions: string[];
  labFindings: string[];
  labResults?: LabResultEntry[];
  symptoms: string[];
  separatedContent: SeparatedClinicalContent;
  confidenceInfo: ConfidenceInfo;
  serviceConfigured: boolean;
  isUnreadable?: boolean;
  isVerifiedContent?: boolean;
  verifiedAt?: string;
  isDemo?: boolean;
  patientName?: string;
  clinicOrDoctorName?: string;
  
  // Universal fields:
  billDetails?: BillDetails;
  financialDetails?: FinancialDetails;
  governmentDetails?: GovernmentDetails;
  educationDetails?: EducationDetails;
  legalDetails?: LegalDetails;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor' | 'assistant';
  text: string;
  timestamp: string;
  isGrounded: boolean;
  referencedText?: string;
}
