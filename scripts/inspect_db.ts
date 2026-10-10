import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('server/data/medscript.db');
const db = new Database(dbPath);

console.log('======================================================');
console.log('📊 MEDSCRIPT AI — SQLITE DATABASE AUDIT INSPECTION');
console.log('======================================================\n');

console.log('1. TABLE: documents');
const docs = db.prepare('SELECT id, name, type, file_size, uploaded_at FROM documents').all();
console.table(docs);

console.log('\n2. TABLE: chat_messages (Grounded Conversations)');
const chats = db.prepare('SELECT id, doc_id, sender, text, is_grounded, timestamp FROM chat_messages').all();
console.table(chats);

console.log('\n3. TABLE: app_settings');
const settings = db.prepare('SELECT key, value FROM app_settings').all();
console.table(settings);
