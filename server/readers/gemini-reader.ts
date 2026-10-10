/**
 * Vaidyalens Gemini Vision Document Reader
 * Primary reader using Google Gemini 2.5 Flash for document analysis.
 * Implements IDocumentReader interface.
 */

import { GoogleGenAI } from '@google/genai';
import { IDocumentReader, ReaderResult } from './interface';
import { getSetting } from '../db';

export class GeminiVisionReader implements IDocumentReader {
  name = 'Google Gemini 2.5 Flash Vision';

  isConfigured(): boolean {
    return Boolean(process.env.GEMINI_API_KEY || getSetting('GEMINI_API_KEY'));
  }

  private getClient(): GoogleGenAI {
    const key = process.env.GEMINI_API_KEY || getSetting('GEMINI_API_KEY');
    if (!key) throw new Error('GEMINI_API_KEY not configured');
    return new GoogleGenAI({ apiKey: key });
  }

  async read(imageDataUrl: string, documentType?: string): Promise<ReaderResult> {
    const client = this.getClient();

    // Extract base64 and mime type from data URL
    const match = imageDataUrl.match(/^data:(image\/[a-z+]+|application\/pdf);base64,(.+)$/i);
    if (!match) throw new Error('Invalid image data URL format');
    const mimeType = match[1] as 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf';
    const base64Data = match[2];

    const prompt = this.buildExtractionPrompt(documentType);

    const response = await client.models.generateContent({
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

    const text = response?.text || '';

    // Extract JSON from response
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Gemini did not return valid JSON extraction');
    }

    const jsonStr = jsonMatch[1] || jsonMatch[0];
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      throw new Error('Failed to parse Gemini JSON output');
    }

    // Build regions from the response
    const regions: ReaderResult['regions'] = [];
    const rawRegions = parsed.regions as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(rawRegions)) {
      for (const r of rawRegions) {
        regions.push({
          text: String(r.text || ''),
          type: (r.type as ReaderResult['regions'][0]['type']) || 'content',
          confidence: typeof r.confidence === 'number' ? r.confidence : null,
          bbox: r.bbox as { x: number; y: number; width: number; height: number } | undefined,
        });
      }
    }

    const rawText = typeof parsed.rawText === 'string' ? parsed.rawText : text;

    return {
      rawText,
      readerName: this.name,
      regions,
      structuredData: parsed,
      providerConfidence: null,
      providerConfidenceNote: 'Confidence score not provided by the recognition service.',
    };
  }

  private buildExtractionPrompt(documentType?: string): string {
    return `You are a medical document analysis system for Vaidyalens. Analyze this medical document image with extreme accuracy.

CRITICAL RULES:
- Extract ONLY what is actually printed/written in the document. NEVER guess or invent any value.
- If a field is not visible or readable, set it to null.
- Identify non-content regions: logos, barcodes, QR codes, watermarks, letterheads, stamps, headers, footers.
- Non-content text must NEVER be included as medicine names, test names, or medical content.

STEP 1: CLASSIFY the document. Determine if it is:
- MEDICINE_STRIP_OR_BOX: A medicine packaging, blister strip, tablet box, syrup bottle label
- LAB_REPORT: A pathology/laboratory test report with test results
- PRESCRIPTION_HANDWRITTEN: A handwritten doctor's prescription
- PRESCRIPTION_TYPED: A typed/printed prescription
- UNKNOWN: Cannot determine

STEP 2: EXTRACT based on classification.

For MEDICINE_STRIP_OR_BOX, extract:
{
  "documentType": "MEDICINE_STRIP_OR_BOX",
  "brandName": "exact brand name as printed",
  "genericComposition": "salt/generic composition as printed",
  "strengthPerUnit": "strength with unit as printed (e.g. 500mg)",
  "dosageForm": "Tablet/Capsule/Syrup/etc as printed",
  "manufacturer": "manufacturer name as printed",
  "batchNumber": "batch/lot number as printed",
  "manufactureDate": "MFG date as printed",
  "expiryDate": "EXP date as printed",
  "mrp": "MRP as printed",
  "storageText": "storage instructions as printed",
  "printedUsageDirections": "any usage directions printed on pack",
  "rawText": "all readable text from the document",
  "regions": [{"text": "...", "type": "content|logo|barcode|qr_code|watermark|header|footer|stamp"}]
}

For LAB_REPORT, extract:
{
  "documentType": "LAB_REPORT",
  "testResults": [
    {
      "testName": "exact test name",
      "result": "exact result value",
      "unit": "unit if printed",
      "cutoff": "cutoff value if printed",
      "referenceRange": "reference range as printed",
      "printedInterpretation": "interpretation text if printed (e.g. Non-Reactive)",
      "rawLine": "the raw line of text"
    }
  ],
  "printedNotes": "any notes or comments printed on the report",
  "rawText": "all readable text",
  "patientInfo": {"name": null, "age": null, "gender": null, "phone": null, "id": null},
  "regions": [{"text": "...", "type": "content|logo|barcode|letterhead|stamp"}]
}

For PRESCRIPTION_HANDWRITTEN or PRESCRIPTION_TYPED, extract:
{
  "documentType": "PRESCRIPTION_HANDWRITTEN" or "PRESCRIPTION_TYPED",
  "medications": [
    {
      "name": "medicine name as written",
      "strength": "strength if written",
      "dosage": "dosage if written",
      "frequency": "frequency if written",
      "duration": "duration if written",
      "route": "route if written",
      "instructions": "any specific instructions",
      "rawLine": "the raw line"
    }
  ],
  "diagnoses": ["only if explicitly written"],
  "instructions": ["follow-up or general instructions"],
  "rawText": "all readable text"
}

For UNKNOWN:
{
  "documentType": "UNKNOWN",
  "rawText": "all readable text",
  "reason": "why classification failed"
}

Return ONLY the JSON object. No explanations outside the JSON.`;
  }
}
