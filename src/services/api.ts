import { 
  ProcessedDocument, 
  QualityCheckResult, 
  SupportedLanguage, 
  ChatMessage,
  OCRToken,
  StructuredMedication,
  SeparatedClinicalContent,
  ConfidenceInfo
} from '../types/medscript';

const API_BASE = '/api';

/**
 * Upload document file to backend (Section 16: /api/upload)
 */
export async function uploadDocumentFile(
  name: string,
  imageDataUrl: string,
  type: string
): Promise<{ uploadId: string; filename: string; sizeBytes: number }> {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, imageDataUrl, type })
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

/**
 * Upload and process document directly through universal pipeline
 */
export async function processDocumentDirect(
  name: string,
  imageDataUrl: string,
  type: string = 'general',
  targetLanguage: SupportedLanguage = 'en',
  directOcrText?: string
): Promise<ProcessedDocument> {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, imageDataUrl, type, targetLanguage, directOcrText, text: directOcrText })
  });
  if (!res.ok) throw new Error('Document processing failed');
  const data = await res.json();
  return data.document;
}

/**
 * Perform Image Quality Pre-check (Section 16: /api/document-quality)
 */
export async function checkImageQuality(
  imageDataUrl: string, 
  filename: string, 
  uploadId?: string
): Promise<QualityCheckResult> {
  const res = await fetch(`${API_BASE}/document-quality`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageDataUrl, filename, uploadId })
  });
  if (!res.ok) throw new Error('Quality check failed');
  const data = await res.json();
  return data.quality;
}

/**
 * Execute Real OCR (Section 16: /api/ocr)
 */
export async function runOcrApi(
  imageDataUrl: string,
  uploadId?: string
): Promise<{ rawText: string; tokens: OCRToken[]; serviceName: string; confidenceInfo: ConfidenceInfo }> {
  const res = await fetch(`${API_BASE}/ocr`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageDataUrl, uploadId })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `OCR recognition failed with status ${res.status}`);
  }
  return await res.json();
}

/**
 * Extract Medical Information (Section 16: /api/extract)
 */
export async function extractMedicalInfoApi(
  imageDataUrl: string,
  uploadId?: string
): Promise<{ 
  structuredMeds: StructuredMedication[]; 
  diagnoses: string[]; 
  instructions: string[]; 
  labValues: string[]; 
  symptoms: string[]; 
  separatedContent: SeparatedClinicalContent 
}> {
  const res = await fetch(`${API_BASE}/extract`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageDataUrl, uploadId })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Medical extraction failed with status ${res.status}`);
  }
  return await res.json();
}

/**
 * Verify Medical Information (Section 16: /api/verify)
 */
export async function verifyMedicalInfoApi(
  imageDataUrl: string,
  uploadId?: string
): Promise<{ safety: any; uncertainWords: any[]; allVerified: boolean }> {
  const res = await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageDataUrl, uploadId })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Medical safety verification failed with status ${res.status}`);
  }
  return await res.json();
}

/**
 * Generate Explanation (Section 16: /api/explain)
 */
export async function generateExplanationApi(
  imageDataUrl: string,
  language: SupportedLanguage = 'en',
  uploadId?: string
): Promise<{ explanation: any }> {
  const res = await fetch(`${API_BASE}/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageDataUrl, language, uploadId })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Explanation generation failed with status ${res.status}`);
  }
  return await res.json();
}

/**
 * Translate Explanation (Section 16: /api/translate)
 */
export async function translateExplanationApi(
  docId: string,
  language: SupportedLanguage
): Promise<{ explanation: any }> {
  const res = await fetch(`${API_BASE}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId, language })
  });
  if (!res.ok) throw new Error('Translation failed');
  return res.json();
}

/**
 * Generate AI Doctor Speech Payload (Section 16: /api/speech)
 */
export async function getDoctorSpeechApi(
  docId: string,
  language: SupportedLanguage
): Promise<{ spokenScript: string; spokenScriptPhonetic?: string; sentenceTimings: any[]; language: SupportedLanguage }> {
  const res = await fetch(`${API_BASE}/speech`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId, language })
  });
  if (!res.ok) throw new Error('Speech synthesis preparation failed');
  return res.json();
}

/**
 * Process Uploaded Document through Full Pipeline
 */
export async function processDocument(
  name: string,
  imageDataUrl: string,
  type: 'prescription' | 'notes' | 'lab_report' | 'discharge_summary' | 'other'
): Promise<ProcessedDocument> {
  const res = await fetch(`${API_BASE}/process-document`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, imageDataUrl, type })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Processing failed' }));
    throw new Error(err.error || 'Backend process-document failed');
  }
  const data = await res.json();
  return data.document;
}

/**
 * Confirm Uncertain Word
 */
export async function confirmUncertainWord(
  docId: string,
  uncertainId: string,
  userSelection: string
): Promise<ProcessedDocument> {
  const res = await fetch(`${API_BASE}/confirm-uncertain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId, uncertainId, userSelection })
  });
  if (!res.ok) throw new Error('Confirm uncertain failed');
  const data = await res.json();
  return data.document;
}

/**
 * Ask AI Doctor Grounded Question (Section 16: /api/chat)
 */
export async function askDoctor(
  docOrId: ProcessedDocument | string,
  question: string
): Promise<{ answer: string; isGrounded: boolean; referencedText?: string }> {
  const docId = typeof docOrId === 'string' ? docOrId : docOrId.id;
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId, question })
  });
  if (!res.ok) throw new Error('Ask doctor failed');
  const data = await res.json();
  return {
    answer: data.answer,
    isGrounded: data.isGrounded,
    referencedText: data.referencedText
  };
}

/**
 * Fetch Saved Documents from SQLite backend
 */
export async function getSavedDocuments(): Promise<ProcessedDocument[]> {
  try {
    const res = await fetch(`${API_BASE}/documents`);
    if (res.ok) {
      const data = await res.json();
      return data.documents || [];
    }
  } catch (err) {
    console.warn('Could not fetch saved documents from backend:', err);
  }
  return [];
}

/**
 * Get Document by ID
 */
export async function getDocumentById(id: string): Promise<ProcessedDocument | null> {
  try {
    const res = await fetch(`${API_BASE}/documents/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.document;
    }
  } catch (err) {
    console.warn('Could not fetch document:', err);
  }
  return null;
}

/**
 * Fetch Chat History for a document
 */
export async function getChatHistory(docId: string): Promise<ChatMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/chat/${docId}`);
    if (res.ok) {
      const data = await res.json();
      return data.messages || [];
    }
  } catch (err) {
    console.warn('Could not fetch chat history:', err);
  }
  return [];
}

/**
 * Get Backend Settings Status
 */
export async function getBackendSettings(): Promise<{ hasGeminiKey: boolean; activeEngine: string; configuredMessage: string }> {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {}
  return {
    hasGeminiKey: false,
    activeEngine: 'Local Tesseract Clinical Engine',
    configuredMessage: 'Document AI service is not configured. Add the required API credentials to enable real prescription analysis.'
  };
}

/**
 * Save Backend Settings (e.g. Gemini API Key)
 */
export async function saveGeminiKey(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ geminiApiKey: apiKey })
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

/**
 * Delete Document from Database
 */
export async function deleteDocument(docId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/documents/${docId}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    return true;
  }
}

/**
 * Purge All Documents and Memory (Privacy feature)
 */
export async function purgeAllDocuments(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/settings/purge`, {
      method: 'POST'
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

/**
 * Fetch Demo Documents
 */
export async function getDemoDocuments(): Promise<ProcessedDocument[]> {
  try {
    const res = await fetch(`${API_BASE}/demo-documents`);
    if (res.ok) {
      const data = await res.json();
      if (data.documents && data.documents.length > 0) {
        return data.documents;
      }
    }
  } catch (err) {
    console.warn('Could not fetch demo documents:', err);
  }
  return [];
}

/**
 * "Explain This" feature: Explain complex paragraph or sentence in selected mode
 */
export async function explainCustomText(
  text: string, 
  mode: 'simple' | 'safe' | 'newbie' = 'simple', 
  language: string = 'en'
): Promise<{ explanation: string; originalText: string }> {
  try {
    const res = await fetch(`${API_BASE}/explain-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, mode, language })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Explain text API request failed, falling back:', err);
  }
  // Client-side fallback simplification
  return {
    originalText: text,
    explanation: `Plain-Language Explanation: ${text.replace(/\b(aforementioned|requisite|furnish|commencement|stipulated)\b/gi, (match) => {
      const map: Record<string, string> = {
        aforementioned: 'previously mentioned',
        requisite: 'required',
        furnish: 'provide/submit',
        commencement: 'start',
        stipulated: 'required'
      };
      return map[match.toLowerCase()] || match;
    })}`
  };
}

