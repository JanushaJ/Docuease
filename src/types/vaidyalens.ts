/**
 * Re-export all types from medscript for Krishxtattva
 */
export * from './medscript';

export type DoctorGender = 'female' | 'male';

export interface FieldConfirmation {
  fieldId: string;
  confirmedValue: string;
  confirmedBy: string;
  confirmedAt: string;
  notes?: string;
}

export interface PipelineStage {
  name: string;
  label: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  startedAt?: string;
  completedAt?: string;
  message?: string;
}

export interface PipelineState {
  currentStage: string;
  stages: PipelineStage[];
  percentComplete: number;
  error?: string;
}

export interface MedicineStripData {
  brandName?: string;
  genericName?: string;
  strength?: string;
  dosageForm?: string;
  manufacturer?: string;
  batchNumber?: string;
  expiryDate?: string;
  mfgDate?: string;
  storageInstructions?: string;
  scheduleWarning?: string;
}

export interface VerifiedField {
  fieldName: string;
  value: string;
  confidence: number | null;
  status: 'VERIFIED' | 'LIKELY' | 'UNCLEAR' | 'UNVERIFIED';
  source?: string;
  warningNote?: string;
}
