import { ProcessedDocument } from '../types/medscript';
import { getUniversalDemoDocuments } from '../../server/universalDemoSamples';

export const DEMO_DOCUMENTS: ProcessedDocument[] = getUniversalDemoDocuments();
export default DEMO_DOCUMENTS;
