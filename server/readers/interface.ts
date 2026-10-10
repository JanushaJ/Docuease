/**
 * Vaidyalens Document Reader Interface
 * Plug-in architecture: add new readers by implementing IDocumentReader.
 * With multiple readers: consensus voting.
 * With single reader: mark more fields "please confirm".
 */

export interface ReaderResult {
  rawText: string;
  readerName: string;
  regions: Array<{
    text: string;
    type: 'content' | 'logo' | 'barcode' | 'qr_code' | 'watermark' | 'header' | 'footer' | 'stamp' | 'letterhead';
    confidence: number | null;
    bbox?: { x: number; y: number; width: number; height: number };
  }>;
  structuredData: Record<string, unknown>;
  providerConfidence: number | null;
  providerConfidenceNote: string;
}

export interface IDocumentReader {
  name: string;
  isConfigured(): boolean;
  read(imageDataUrl: string, documentType?: string): Promise<ReaderResult>;
}

/**
 * Consensus voting: if multiple readers agree on a field value, it's more trustworthy.
 * Returns agreement count for each field.
 */
export function computeConsensus(results: ReaderResult[]): Map<string, { value: string; agreementCount: number; total: number }> {
  const consensus = new Map<string, { value: string; agreementCount: number; total: number }>();

  if (results.length === 0) return consensus;

  // Collect all field keys across readers
  const allKeys = new Set<string>();
  for (const r of results) {
    for (const key of Object.keys(r.structuredData)) {
      allKeys.add(key);
    }
  }

  for (const key of allKeys) {
    const values: string[] = [];
    for (const r of results) {
      const val = r.structuredData[key];
      if (val !== null && val !== undefined && String(val).trim()) {
        values.push(String(val).trim().toLowerCase());
      }
    }

    if (values.length === 0) continue;

    // Find most common value
    const freq = new Map<string, number>();
    for (const v of values) {
      freq.set(v, (freq.get(v) || 0) + 1);
    }

    let bestValue = '';
    let bestCount = 0;
    for (const [v, c] of freq) {
      if (c > bestCount) {
        bestValue = v;
        bestCount = c;
      }
    }

    // Find original casing from the first reader that provided this value
    let originalCaseValue = bestValue;
    for (const r of results) {
      const val = r.structuredData[key];
      if (val && String(val).trim().toLowerCase() === bestValue) {
        originalCaseValue = String(val).trim();
        break;
      }
    }

    consensus.set(key, {
      value: originalCaseValue,
      agreementCount: bestCount,
      total: results.length,
    });
  }

  return consensus;
}

/**
 * Reader Registry: manages all configured readers
 */
export class ReaderRegistry {
  private readers: IDocumentReader[] = [];

  register(reader: IDocumentReader): void {
    this.readers.push(reader);
  }

  getConfiguredReaders(): IDocumentReader[] {
    return this.readers.filter(r => r.isConfigured());
  }

  getReaderCount(): number {
    return this.getConfiguredReaders().length;
  }

  hasAnyReader(): boolean {
    return this.getReaderCount() > 0;
  }

  isSingleReaderMode(): boolean {
    return this.getReaderCount() === 1;
  }

  async readAll(imageDataUrl: string, documentType?: string): Promise<ReaderResult[]> {
    const configured = this.getConfiguredReaders();
    if (configured.length === 0) {
      throw new Error('Document AI service is not configured. Add the required API credentials to enable real analysis.');
    }

    const results: ReaderResult[] = [];
    const errors: string[] = [];

    for (const reader of configured) {
      try {
        const result = await reader.read(imageDataUrl, documentType);
        results.push(result);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${reader.name}: ${msg}`);
      }
    }

    if (results.length === 0) {
      throw new Error(`All document readers failed: ${errors.join('; ')}`);
    }

    return results;
  }
}
