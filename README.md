# DocuEase AI — Understand Any Document, in Your Language

> **Built for HackSphere AI Hackathon**  
> *"Don't make difficult documents harder to read. Make them easier to understand."*

DocuEase AI is a full-stack, multimodal document accessibility and simplification platform designed to help people understand difficult documents without needing advanced English skills. It bridges the literacy and language divide for senior citizens, rural families, and non-English speakers through two specialized tools and a synchronized **3D AI Assistant named "Milo"**.

---

## 🌟 Two Specialized Tools

### 1. MedScan AI (`/medscan`)
* **Handwritten & Printed Prescription OCR**: Scans doctor handwriting and isolates medication names, strengths, dosages, and schedules.
* **Separated Original Transcription**: Displays verbatim OCR extraction alongside plain-language explanations.
* **Editable OCR Text**: Allows users to review and edit recognized handwriting before generating or regenerating explanations.
* **Zero-Guessing Medical Guard**: Refuses to guess ambiguous handwriting; flags unclear words explicitly as *"Needs verification with a doctor or pharmacist"*.
* **Drug-Drug & Duplicate Toxicity Checks**: Deterministic pharmacopoeia rules detect interactions (e.g., Aspirin + Ibuprofen) and duplicate active ingredients (e.g., Combiflam + Dolo 650).
* **Medical Safety Notice**: Prominently warns that the AI assists in reading and does not replace qualified healthcare advice.

### 2. DocuSimplify AI (`/simplify`)
* **Universal Document Intake**: Processes electricity bills, gas bills, water bills, bank notices, government circulars, school letters, and legal agreements.
* **Supported File Types**: PDF, JPG, JPEG, PNG, TXT, DOCX.
* **4-Point Critical Extraction**:
  * 💰 **Important Amounts & Fees**: Preserves exact tariff figures, totals, and late surcharges.
  * 📅 **Deadlines & Due Dates**: Clearly flags payment or compliance cutoffs.
  * 📋 **Concrete Required Actions**: Steps telling the user what to do next.
  * 🛡️ **Anti-Scam & Surcharge Advisories**: Protects citizens from fraud and avoidable penalties.
* **Difficult Jargon Dictionary**: Explains complex terms (e.g., *"Re-KYC"*, *"Fuel Surcharge"*, *"Indemnity"*, *"Ipso Facto"*) in everyday language.

---

## 🤖 Meet Milo: Interactive 3D AI Assistant

DocuEase AI includes a procedurally modeled 3D robot cartoon assistant named **Milo**:
* **Aesthetic**: Friendly rounded robot helper in pearl white and teal with cyan highlights.
* **States & Expressions**:
  * `welcoming`: Joyful wave and friendly greeting on the Landing Page.
  * `idle` / `calm`: Relaxed floating physics with natural eye blinking and subtle mouse parallax tracking.
  * `thinking`: Pensive head tilt with active glowing antenna pulse during document processing.
  * `speaking`: Animated audio mouth waveform and synchronized speech cadence.
  * `error`: Sympathetic tilt with amber alert pulse when image quality or API checks fail.
* **WebGL + Fallback**: Rendered via Three.js WebGL with soft shadows, with a high-fidelity CSS/SVG fallback on low-end hardware.

---

## 🌐 Global Language System (11 Indian Languages)

DocuEase AI supports 11 Indian languages with full Unicode fidelity and right-to-left layout:
1. **English** (`en`)
2. **Telugu** (`te` - తెలుగు)
3. **Hindi** (`hi` - हिन्दी)
4. **Tamil** (`ta` - தமிழ்)
5. **Kannada** (`kn` - ಕನ್ನಡ)
6. **Malayalam** (`ml` - മലയാളം)
7. **Bengali** (`bn` - বাংলা)
8. **Marathi** (`mr` - मराठी)
9. **Gujarati** (`gu` - ગુજરાતી)
10. **Punjabi** (`pa` - ਪੰਜਾਬੀ)
11. **Urdu** (`ur` - اردو) *(Supports RTL layout)*

The selected language synchronizes:
* The simplified summary and breakdown
* Milo's spoken voice narration
* Live subtitle sentence highlighting
* Important dates and required action items

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
* **Node.js**: v18.0.0 or higher (Tested on Node v22.17.0)
* **npm**: v9.0.0 or higher

### 2. Install Dependencies
```bash
# On Windows Command Prompt / PowerShell:
npm install
```

### 3. Environment Variable Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your API keys in `.env`:
```env
PORT=5001
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
OCR_MODE=clinical_engine
```
> **Note**: DocuEase AI works out of the box with its built-in clinical rule engine, preloaded real-world test cases, and browser speech synthesis. Adding `GEMINI_API_KEY` enables live Gemini 2.5 Flash multimodal vision analysis for newly uploaded custom documents.

### 4. Run Development Server
```bash
# Starts both Express backend (port 5001) and Vite frontend (port 3000) concurrently:
npm run dev
```
Open your browser at: **`http://localhost:3000`**

---

## 🧪 Testing

DocuEase AI includes an automated verification test suite:

```bash
# Run all automated tests:
npm test
```

### Test Coverage:
* `tests/docuease.test.ts`:
  * MedScan prescription handwriting safeguards & zero-guessing
  * Drug-Drug interaction detection (Aspirin + Ibuprofen)
  * Duplicate Paracetamol toxicity alerts (Combiflam + Dolo 650)
  * Electricity bill exact tariff & due date preservation (₹742.00, 15 Oct 2026)
  * Bank KYC notice anti-scam advisory (Never share OTP)
  * All 11 Indian languages + Urdu RTL Unicode validation
  * Synchronized speech sentence timing generation
* `tests/krishxtattva.test.ts`: 14 Universal document classification & safety rule tests
* `tests/hepatitis_zero_fake.test.ts`: Zero-fabrication clinical lab verification

---

## 🏗️ Production Build

```bash
# Compile TypeScript and generate optimized production bundle:
npm run build

# Preview production build:
npm run preview
```

---

## 📡 Backend API Endpoints

The server provides clean REST endpoints under `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System status, active OCR engine, and language capabilities |
| `POST` | `/api/documents/upload` | Uploads and processes document via OCR + multimodal reasoning |
| `POST` | `/api/documents/extract` | Returns structured facts, medicines, lab values, and utility details |
| `POST` | `/api/documents/explain` | Generates plain-language explanation in target language |
| `POST` | `/api/documents/translate` | Translates explanations into any of the 11 supported languages |
| `POST` | `/api/speech` | Returns speech text, voice selection, and sentence subtitle timings |
| `POST` | `/api/medical/validate` | Deterministic drug safety and interaction rule engine |

---

## 🔒 Privacy & Security Principles

1. **Ephemeral Processing**: Documents are processed in temporary memory. No medical records or utility bills are permanently stored without user consent.
2. **Server-Side Credentials**: Secret API keys never leak to browser code.
3. **Zero Medical Hallucination**: Medicine dosages, quantities, and frequencies are extracted strictly from source strokes.
4. **One-Click Session Reset**: Clicking "Process Another Document" wipes loaded data and resets audio synthesizers.
5. **Regulatory Disclaimer**: DocuEase AI does not claim HIPAA certification or medical device clearance. It is an assistive accessibility tool.

---

## 🏆 HackSphere AI Hackathon Deliverables

* **Unified Application**: Landing Page (`/`), MedScan AI (`/medscan`), DocuSimplify AI (`/simplify`), Privacy Policy (`/privacy`).
* **Interactive 3D Assistant**: Milo WebGL avatar with blinking, mouse parallax, thinking pulses, and speech synchronization.
* **Real OCR & Safety Engine**: Tesseract OCR, Gemini 2.5 Flash multimodal vision, and deterministic pharmacopoeia checks.
* **1-Click Test Documents**: Instant verification available for cardiology prescriptions, pediatric scripts, electricity bills, and bank notices.
