import { DEMO_DOCUMENTS } from '../server/demoDocuments';

try {
  const doc = DEMO_DOCUMENTS[0];
  console.log('Testing doc:', doc.id);
  const s = JSON.stringify(doc);
  console.log('Successfully stringified! Length:', s.length);
} catch (err: any) {
  console.error('Error stringifying doc 0:', err);
}
