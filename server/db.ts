import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { ProcessedDocument, ChatMessage, SupportedLanguage } from '../src/types/medscript';

const DB_DIR = path.resolve(process.cwd(), 'server', 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'medscript.db');
export const db = new Database(DB_PATH);

// Enable WAL mode for high performance
db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    image_data_url TEXT NOT NULL,
    uploaded_at TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    quality_json TEXT NOT NULL,
    tokens_json TEXT NOT NULL,
    raw_ocr_text TEXT NOT NULL,
    uncertain_words_json TEXT NOT NULL,
    translations_json TEXT NOT NULL,
    safety_json TEXT NOT NULL,
    selected_language TEXT NOT NULL,
    all_uncertain_resolved INTEGER NOT NULL DEFAULT 1,
    verified_at TEXT,
    doc_payload_json TEXT
  );

  CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    doc_id TEXT NOT NULL,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    is_grounded INTEGER NOT NULL DEFAULT 1,
    referenced_text TEXT,
    FOREIGN KEY(doc_id) REFERENCES documents(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Try adding doc_payload_json column if it was created in older schema
try {
  db.exec('ALTER TABLE documents ADD COLUMN doc_payload_json TEXT;');
} catch (e) {
  // column already exists
}

/**
 * Save or update a processed document in SQLite
 */
export function saveDocumentToDb(doc: ProcessedDocument, rawOcrText: string = ''): void {
  const stmt = db.prepare(`
    INSERT INTO documents (
      id, name, type, image_data_url, uploaded_at, file_size,
      quality_json, tokens_json, raw_ocr_text, uncertain_words_json,
      translations_json, safety_json, selected_language,
      all_uncertain_resolved, verified_at, doc_payload_json
    ) VALUES (
      @id, @name, @type, @image_data_url, @uploaded_at, @file_size,
      @quality_json, @tokens_json, @raw_ocr_text, @uncertain_words_json,
      @translations_json, @safety_json, @selected_language,
      @all_uncertain_resolved, @verified_at, @doc_payload_json
    )
    ON CONFLICT(id) DO UPDATE SET
      tokens_json = excluded.tokens_json,
      uncertain_words_json = excluded.uncertain_words_json,
      translations_json = excluded.translations_json,
      selected_language = excluded.selected_language,
      all_uncertain_resolved = excluded.all_uncertain_resolved,
      verified_at = excluded.verified_at,
      doc_payload_json = excluded.doc_payload_json
  `);

  stmt.run({
    id: doc.id,
    name: doc.name,
    type: doc.type,
    image_data_url: doc.imageDataUrl,
    uploaded_at: doc.uploadedAt,
    file_size: doc.fileSize,
    quality_json: JSON.stringify(doc.quality),
    tokens_json: JSON.stringify(doc.tokens),
    raw_ocr_text: rawOcrText || doc.rawOcrText || '',
    uncertain_words_json: JSON.stringify(doc.uncertainWords || []),
    translations_json: JSON.stringify(doc.translations),
    safety_json: JSON.stringify(doc.safety),
    selected_language: doc.selectedLanguage || 'en',
    all_uncertain_resolved: doc.allUncertainResolved ? 1 : 0,
    verified_at: doc.verifiedAt || null,
    doc_payload_json: JSON.stringify(doc)
  });
}

/**
 * Retrieve a document by ID from SQLite
 */
export function getDocumentFromDb(id: string): (ProcessedDocument & { rawOcrText: string }) | null {
  const row = db.prepare('SELECT * FROM documents WHERE id = ?').get(id) as any;
  if (!row) return null;

  if (row.doc_payload_json) {
    try {
      const parsed = JSON.parse(row.doc_payload_json);
      parsed.rawOcrText = row.raw_ocr_text;
      return {
        ...parsed,
        get explanation() {
          if (!this.translations) return parsed.explanation || null;
          return this.translations[this.selectedLanguage] || this.translations.en || parsed.explanation || null;
        }
      };
    } catch (e) {}
  }

  let translations: any = {};
  try {
    translations = JSON.parse(row.translations_json || '{}');
  } catch (e) {}
  const selectedLang = (row.selected_language as SupportedLanguage) || 'en';

  return {
    id: row.id,
    name: row.name,
    type: row.type,
    imageDataUrl: row.image_data_url,
    uploadedAt: row.uploaded_at,
    fileSize: row.file_size,
    quality: JSON.parse(row.quality_json),
    tokens: JSON.parse(row.tokens_json),
    rawOcrText: row.raw_ocr_text,
    uncertainWords: JSON.parse(row.uncertain_words_json),
    allUncertainResolved: Boolean(row.all_uncertain_resolved),
    selectedLanguage: selectedLang,
    verifiedAt: row.verified_at,
    safety: JSON.parse(row.safety_json),
    translations,
    structuredMeds: [],
    diagnoses: [],
    instructions: [],
    labFindings: [],
    symptoms: [],
    separatedContent: {
      documentSays: [],
      termMeanings: [],
      notDetermined: []
    },
    confidenceInfo: {
      serviceName: 'SQLite Local Store',
      hasNumericalConfidence: false,
      averageConfidenceScore: null,
      providerNotice: 'Persisted clinical record'
    },
    serviceConfigured: true,
    get explanation() {
      return translations[this.selectedLanguage] || translations.en;
    }
  };
}

/**
 * Get all saved documents from SQLite
 */
export function getAllDocumentsFromDb(): ProcessedDocument[] {
  const rows = db.prepare('SELECT * FROM documents ORDER BY uploaded_at DESC').all() as any[];
  return rows.map(row => {
    if (row.doc_payload_json) {
      try {
        const parsed = JSON.parse(row.doc_payload_json);
        parsed.rawOcrText = row.raw_ocr_text;
        return {
          ...parsed,
          get explanation() {
            return this.translations[this.selectedLanguage] || this.translations.en;
          }
        };
      } catch (e) {}
    }

    const translations = JSON.parse(row.translations_json);
    const selectedLang = row.selected_language as SupportedLanguage;
    return {
      id: row.id,
      name: row.name,
      type: row.type,
      imageDataUrl: row.image_data_url,
      uploadedAt: row.uploaded_at,
      fileSize: row.file_size,
      quality: JSON.parse(row.quality_json),
      tokens: JSON.parse(row.tokens_json),
      rawOcrText: row.raw_ocr_text,
      uncertainWords: JSON.parse(row.uncertain_words_json),
      allUncertainResolved: Boolean(row.all_uncertain_resolved),
      selectedLanguage: selectedLang,
      verifiedAt: row.verified_at,
      safety: JSON.parse(row.safety_json),
      translations,
      structuredMeds: [],
      diagnoses: [],
      instructions: [],
      labFindings: [],
      symptoms: [],
      separatedContent: {
        documentSays: [],
        termMeanings: [],
        notDetermined: []
      },
      confidenceInfo: {
        serviceName: 'SQLite Local Store',
        hasNumericalConfidence: false,
        averageConfidenceScore: null,
        providerNotice: 'Persisted clinical record'
      },
      serviceConfigured: true,
      get explanation() {
        return translations[this.selectedLanguage] || translations.en;
      }
    };
  });
}

/**
 * Delete document from SQLite
 */
export function deleteDocumentFromDb(id: string): void {
  db.prepare('DELETE FROM documents WHERE id = ?').run(id);
  db.prepare('DELETE FROM chat_messages WHERE doc_id = ?').run(id);
}

/**
 * Purge all documents and chats from SQLite (Privacy feature)
 */
export function purgeAllDocumentsFromDb(): void {
  db.prepare('DELETE FROM documents').run();
  db.prepare('DELETE FROM chat_messages').run();
}

/**
 * Save chat message to SQLite
 */
export function saveChatMessageToDb(msg: ChatMessage, docId: string): void {
  try {
    const docExists = db.prepare('SELECT id FROM documents WHERE id = ?').get(docId);
    if (!docExists) {
      const emptyObj = JSON.stringify({});
      const emptyArr = JSON.stringify([]);
      db.prepare(`
        INSERT OR IGNORE INTO documents (
          id, name, type, image_data_url, uploaded_at, file_size,
          quality_json, tokens_json, raw_ocr_text, uncertain_words_json,
          translations_json, safety_json, selected_language,
          all_uncertain_resolved, verified_at, doc_payload_json
        ) VALUES (?, ?, 'prescription', '', datetime('now'), 0, ?, ?, '', ?, ?, ?, 'en', 1, null, ?)
      `).run(docId, `Document ${docId}`, emptyObj, emptyArr, emptyArr, emptyObj, emptyObj, emptyObj);
    }

    const stmt = db.prepare(`
      INSERT INTO chat_messages (id, doc_id, sender, text, timestamp, is_grounded, referenced_text)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      msg.id,
      docId,
      msg.sender,
      msg.text,
      msg.timestamp,
      msg.isGrounded ? 1 : 0,
      msg.referencedText || null
    );
  } catch (err: any) {
    console.warn(`Could not persist chat message for docId ${docId}:`, err.message);
  }
}

export const saveChatMessage = saveChatMessageToDb;

/**
 * Get chat messages for document from SQLite
 */
export function getChatMessagesForDoc(docId: string): ChatMessage[] {
  const rows = db.prepare('SELECT * FROM chat_messages WHERE doc_id = ? ORDER BY rowid ASC').all(docId) as any[];
  return rows.map(r => ({
    id: r.id,
    sender: r.sender as 'user' | 'doctor',
    text: r.text,
    timestamp: r.timestamp,
    isGrounded: Boolean(r.is_grounded),
    referencedText: r.referenced_text || undefined
  }));
}

/**
 * App Settings Store
 */
export function getSetting(key: string): string | null {
  const row = db.prepare('SELECT value FROM app_settings WHERE key = ?').get(key) as any;
  return row ? row.value : null;
}

export function setSetting(key: string, value: string): void {
  db.prepare('INSERT INTO app_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, value);
}
