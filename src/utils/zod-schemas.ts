/**
 * Vaidyalens Zod Validation Schemas
 * Every AI/provider output is validated through these schemas.
 * Invalid JSON is rejected and retried, or fails — never silently accepted.
 */
import { z } from 'zod';

// =============================================
// Gemini Vision Extraction Schemas
// =============================================

export const MedicineStripExtractionSchema = z.object({
  documentType: z.literal('MEDICINE_STRIP_OR_BOX'),
  brandName: z.string().nullable(),
  genericComposition: z.string().nullable(),
  strengthPerUnit: z.string().nullable(),
  dosageForm: z.string().nullable(),
  manufacturer: z.string().nullable(),
  batchNumber: z.string().nullable(),
  manufactureDate: z.string().nullable(),
  expiryDate: z.string().nullable(),
  mrp: z.string().nullable(),
  storageText: z.string().nullable(),
  printedUsageDirections: z.string().nullable(),
  rawText: z.string(),
  regions: z.array(z.object({
    text: z.string(),
    type: z.enum(['content', 'logo', 'barcode', 'qr_code', 'watermark', 'header', 'footer', 'stamp']),
    bbox: z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    }).optional(),
  })).optional(),
});

export const LabReportExtractionSchema = z.object({
  documentType: z.literal('LAB_REPORT'),
  testResults: z.array(z.object({
    testName: z.string(),
    result: z.string(),
    unit: z.string().nullable().optional(),
    cutoff: z.string().nullable().optional(),
    referenceRange: z.string().nullable().optional(),
    printedInterpretation: z.string().nullable().optional(),
    rawLine: z.string().optional(),
  })),
  printedNotes: z.string().nullable().optional(),
  rawText: z.string(),
  patientInfo: z.object({
    name: z.string().nullable().optional(),
    age: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    id: z.string().nullable().optional(),
  }).optional(),
  regions: z.array(z.object({
    text: z.string(),
    type: z.enum(['content', 'logo', 'barcode', 'qr_code', 'watermark', 'header', 'footer', 'stamp', 'letterhead']),
  })).optional(),
});

export const PrescriptionExtractionSchema = z.object({
  documentType: z.enum(['PRESCRIPTION_HANDWRITTEN', 'PRESCRIPTION_TYPED']),
  medications: z.array(z.object({
    name: z.string(),
    strength: z.string().nullable().optional(),
    dosage: z.string().nullable().optional(),
    frequency: z.string().nullable().optional(),
    duration: z.string().nullable().optional(),
    route: z.string().nullable().optional(),
    instructions: z.string().nullable().optional(),
    rawLine: z.string().optional(),
  })),
  diagnoses: z.array(z.string()).optional(),
  instructions: z.array(z.string()).optional(),
  rawText: z.string(),
});

export const DocumentClassificationSchema = z.object({
  classification: z.enum([
    'MEDICINE_STRIP_OR_BOX',
    'LAB_REPORT',
    'PRESCRIPTION_HANDWRITTEN',
    'PRESCRIPTION_TYPED',
    'UNKNOWN'
  ]),
  confidence: z.number().min(0).max(1).nullable(),
  reasoning: z.string(),
});

// =============================================
// Explanation Schema
// =============================================
export const ExplanationSchema = z.object({
  documentSays: z.array(z.string()),
  whatThisGenerallyMeans: z.array(z.string()),
  generalMeaningSources: z.array(z.object({
    statement: z.string(),
    source: z.string(),
    sourceUrl: z.string().optional(),
  })),
  cannotBeDetermined: z.array(z.string()),
  simpleSummary: z.string(),
  explainLikeIm10: z.string(),
  medicalTerms: z.array(z.object({
    term: z.string(),
    simpleMeaning: z.string(),
    documentContext: z.string(),
    whatItDoesNotMean: z.string(),
  })),
  whatToAskDoctor: z.array(z.string()),
});

// =============================================
// Translation Schema
// =============================================
export const TranslationSchema = z.object({
  language: z.string(),
  documentSays: z.array(z.string()),
  whatThisGenerallyMeans: z.array(z.string()),
  cannotBeDetermined: z.array(z.string()),
  simpleSummary: z.string(),
  explainLikeIm10: z.string(),
  spokenScript: z.string(),
  sentenceTimings: z.array(z.object({
    sentence: z.string(),
    durationSec: z.number(),
    topic: z.string().optional(),
  })),
});

// =============================================
// Chat Response Schema
// =============================================
export const ChatResponseSchema = z.object({
  answer: z.string(),
  isGrounded: z.boolean(),
  referencedField: z.string().nullable().optional(),
  sourceInfo: z.string().nullable().optional(),
});

// =============================================
// Validation Helpers
// =============================================
export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown, context: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`[Vaidyalens Validation Error] ${context}: ${errors}`);
  }
  return result.data;
}

export function validateOrNull<T>(schema: z.ZodSchema<T>, data: unknown): T | null {
  const result = schema.safeParse(data);
  return result.success ? result.data : null;
}

export type MedicineStripExtraction = z.infer<typeof MedicineStripExtractionSchema>;
export type LabReportExtraction = z.infer<typeof LabReportExtractionSchema>;
export type PrescriptionExtraction = z.infer<typeof PrescriptionExtractionSchema>;
