/**
 * Krishxtattva Universal Demo Samples
 * Realistic high-fidelity sample documents across:
 * - Utility: Electricity Bill
 * - Financial: Bank Official Notice
 * - Government: Scholarship / Scheme Circular
 * - Legal: Dense Agreement Clause
 */

import { ProcessedDocument } from '../src/types/medscript';

// -------------------------------------------------------------
// 1. Electricity Utility Bill SVG
// -------------------------------------------------------------
export function createElectricityBillSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#f8fafc" />
    <rect x="25" y="25" width="750" height="950" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
    
    <!-- Header -->
    <rect x="25" y="25" width="750" height="120" rx="8" fill="#fef3c7" />
    <text x="50" y="65" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#78350f">STATE ELECTRICITY DISTRIBUTION COMPANY LTD.</text>
    <text x="50" y="90" font-family="Arial, sans-serif" font-size="13" fill="#92400e">HT/LT Consumer Monthly Billing Statement &bull; Urban Circle Sub-Division 4</text>
    <text x="50" y="112" font-family="Arial, sans-serif" font-size="12" fill="#b45309">Customer Care Helpline: 1912 &bull; www.state-electricity.gov.in</text>
    
    <!-- Consumer Info Box -->
    <rect x="50" y="165" width="700" height="100" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="70" y="195" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155">Consumer No:</text>
    <text x="180" y="195" font-family="monospace" font-size="14" font-weight="bold" fill="#0f172a">LT-9823-4011</text>
    <text x="440" y="195" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155">Billing Month:</text>
    <text x="550" y="195" font-family="monospace" font-size="14" fill="#0f172a">OCTOBER 2026</text>

    <text x="70" y="225" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155">Consumer Name:</text>
    <text x="180" y="225" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">Venkatesh Rao</text>
    <text x="440" y="225" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155">Meter Number:</text>
    <text x="550" y="225" font-family="monospace" font-size="14" fill="#0f172a">MTR-448201-B</text>

    <text x="70" y="252" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Address: Flat 302, Sai Residency, Main Road</text>

    <!-- Meter Reading Table -->
    <rect x="50" y="285" width="700" height="40" fill="#e2e8f0" rx="4" />
    <text x="70" y="310" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b">Previous Reading</text>
    <text x="240" y="310" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b">Current Reading</text>
    <text x="420" y="310" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b">Units Consumed</text>
    <text x="600" y="310" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b">Tariff Category</text>

    <text x="70" y="345" font-family="monospace" font-size="15" fill="#334155">4708 kWh</text>
    <text x="240" y="345" font-family="monospace" font-size="15" fill="#334155">4892 kWh</text>
    <text x="420" y="345" font-family="monospace" font-size="16" font-weight="bold" fill="#0369a1">184 UNITS</text>
    <text x="600" y="345" font-family="Arial, sans-serif" font-size="14" fill="#334155">Domestic LT-1</text>
    <line x1="50" y1="365" x2="750" y2="365" stroke="#cbd5e1" stroke-width="1" />

    <!-- Computation Table -->
    <text x="70" y="405" font-family="Arial, sans-serif" font-size="13" fill="#475569">Energy Charges (Slab 0 - 100 @ ₹3.30):</text>
    <text x="640" y="405" font-family="monospace" font-size="13" fill="#0f172a">₹ 330.00</text>

    <text x="70" y="435" font-family="Arial, sans-serif" font-size="13" fill="#475569">Energy Charges (Slab 101 - 184 @ ₹4.30):</text>
    <text x="640" y="435" font-family="monospace" font-size="13" fill="#0f172a">₹ 361.20</text>

    <text x="70" y="465" font-family="Arial, sans-serif" font-size="13" fill="#475569">Customer Service Charges &amp; Meter Rent:</text>
    <text x="640" y="465" font-family="monospace" font-size="13" fill="#0f172a">₹ 40.00</text>

    <text x="70" y="495" font-family="Arial, sans-serif" font-size="13" fill="#475569">Electricity Duty &amp; Fuel Surcharge (FSA):</text>
    <text x="640" y="495" font-family="monospace" font-size="13" fill="#0f172a">₹ 10.80</text>

    <!-- Prominent Total Box -->
    <rect x="50" y="530" width="700" height="90" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2" />
    <text x="70" y="565" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#166534">TOTAL AMOUNT DUE (PAYABLE BY DUE DATE):</text>
    <text x="70" y="605" font-family="Arial, sans-serif" font-size="32" font-weight="900" fill="#15803d">₹ 742.00</text>

    <text x="440" y="565" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b">DUE DATE FOR PAYMENT:</text>
    <text x="440" y="600" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#b91c1c">15 OCTOBER 2026</text>

    <!-- Warnings / Notes -->
    <rect x="50" y="640" width="700" height="70" rx="6" fill="#fef2f2" stroke="#fecaca" />
    <text x="70" y="665" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#dc2626">IMPORTANT NOTICE / LATE SURCHARGE:</text>
    <text x="70" y="685" font-family="Arial, sans-serif" font-size="12" fill="#991b1b">
      A late payment surcharge of ₹50.00 will be added if paid after 15-10-2026.
    </text>
    <text x="70" y="700" font-family="Arial, sans-serif" font-size="11" fill="#7f1d1d">
      Notice under Sec 56: Service liable for disconnection if payment not received within 15 days of due date.
    </text>

    <!-- Payment barcode & channels -->
    <rect x="50" y="730" width="700" height="110" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="70" y="755" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155">Payment Methods:</text>
    <text x="70" y="778" font-family="Arial, sans-serif" font-size="12" fill="#475569">&bull; Online UPI / Net Banking via Electricity Board Portal or Mobile App</text>
    <text x="70" y="798" font-family="Arial, sans-serif" font-size="12" fill="#475569">&bull; Any authorized MeeSeva / e-Seva Citizen Service Counter</text>
    <text x="70" y="818" font-family="Arial, sans-serif" font-size="12" fill="#475569">&bull; Cheque payable to "State Electricity Distribution Co Ltd"</text>

    <text x="400" y="930" font-family="monospace" font-size="11" fill="#94a3b8" text-anchor="middle">BARCODE: *LT98234011-742-15102026* &bull; Computer Generated Statement</text>
  </svg>`;
}

// -------------------------------------------------------------
// 2. Bank Official Notice SVG
// -------------------------------------------------------------
export function createBankNoticeSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#f8fafc" />
    <rect x="25" y="25" width="750" height="950" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
    
    <!-- Bank Header -->
    <rect x="25" y="25" width="750" height="110" rx="8" fill="#003366" />
    <circle cx="70" cy="80" r="28" fill="#ffffff" />
    <text x="70" y="88" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#003366" text-anchor="middle">NB</text>
    <text x="120" y="70" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#ffffff">NATIONAL CITIZENS BANK</text>
    <text x="120" y="94" font-family="Arial, sans-serif" font-size="13" fill="#cbd5e1">Branch: Commercial Hub &bull; Ref: KYC-REG-2026-8910</text>
    
    <!-- Recipient -->
    <text x="60" y="175" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155">To,</text>
    <text x="60" y="195" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Mr. Ramesh Kumar Sharma</text>
    <text x="60" y="215" font-family="Arial, sans-serif" font-size="13" fill="#475569">Savings Account No: 30998822019</text>
    <text x="60" y="235" font-family="Arial, sans-serif" font-size="13" fill="#475569">Registered Mobile: +91 98XXX X4210</text>
    <text x="560" y="175" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Date: 28-Sep-2026</text>

    <!-- Subject -->
    <rect x="50" y="260" width="700" height="40" fill="#f1f5f9" rx="4" />
    <text x="70" y="285" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">SUBJECT: Mandatory Periodic KYC Update for Active Account Operation</text>

    <!-- Letter Body -->
    <text x="60" y="335" font-family="Arial, sans-serif" font-size="13" fill="#334155">Dear Valued Customer,</text>
    <text x="60" y="365" font-family="Arial, sans-serif" font-size="13" fill="#334155" line-height="1.5">
      As per statutory guidelines issued by the Reserve Bank, all commercial banking institutions are
    </text>
    <text x="60" y="388" font-family="Arial, sans-serif" font-size="13" fill="#334155">
      mandated to periodically refresh Know Your Customer (KYC) records of active savings accounts.
    </text>
    <text x="60" y="415" font-family="Arial, sans-serif" font-size="13" fill="#334155">
      Our compliance records indicate that your re-KYC documentation is due for submission.
    </text>

    <!-- Action Required Box -->
    <rect x="50" y="445" width="700" height="120" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="70" y="475" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#1e40af">ACTION REQUIRED FROM YOU:</text>
    <text x="70" y="500" font-family="Arial, sans-serif" font-size="13" fill="#1e3a8a">&bull; Submit a self-attested photocopy of your Aadhaar card or Voter ID</text>
    <text x="70" y="522" font-family="Arial, sans-serif" font-size="13" fill="#1e3a8a">&bull; Submit a copy of your PAN Card or Form 60</text>
    <text x="70" y="544" font-family="Arial, sans-serif" font-size="13" fill="#1e3a8a">&bull; Provide one recent passport-size photograph with the re-KYC form</text>

    <!-- Deadline Box -->
    <rect x="50" y="585" width="700" height="75" rx="8" fill="#fef2f2" stroke="#fca5a5" />
    <text x="70" y="612" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#991b1b">DEADLINE FOR COMPLIANCE:</text>
    <text x="70" y="640" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#b91c1c">
      31 OCTOBER 2026
    </text>
    <text x="320" y="640" font-family="Arial, sans-serif" font-size="12" fill="#7f1d1d">
      (Failure to submit may lead to temporary restriction on outward debit transactions)
    </text>

    <!-- Scam Warning Banner -->
    <rect x="50" y="680" width="700" height="100" rx="8" fill="#fefce8" stroke="#fef08a" />
    <text x="70" y="708" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#854d0e">
      ⚠️ SECURITY &amp; FRAUD PREVENTION ADVISORY:
    </text>
    <text x="70" y="732" font-family="Arial, sans-serif" font-size="12" fill="#713f12">
      The bank will NEVER call or send SMS asking for your Internet Banking Password, ATM PIN, or OTP.
    </text>
    <text x="70" y="752" font-family="Arial, sans-serif" font-size="12" fill="#713f12">
      Do not click links sent via unverified WhatsApp or SMS claiming account block.
    </text>
    <text x="70" y="770" font-family="Arial, sans-serif" font-size="12" fill="#713f12">
      Visit your home branch directly or verify via official NetBanking at www.nationalbank.in.
    </text>

    <text x="60" y="830" font-family="Arial, sans-serif" font-size="13" fill="#334155">Yours faithfully,</text>
    <text x="60" y="855" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Branch Manager</text>
    <text x="60" y="875" font-family="Arial, sans-serif" font-size="12" fill="#64748b">National Citizens Bank &bull; Customer Care: 1800-425-0011</text>
  </svg>`;
}

// -------------------------------------------------------------
// 3. Government Scheme Notification SVG
// -------------------------------------------------------------
export function createGovernmentNoticeSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#f8fafc" />
    <rect x="25" y="25" width="750" height="950" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
    
    <!-- Government Emblem & Header -->
    <rect x="25" y="25" width="750" height="130" rx="8" fill="#f0fdf4" />
    <circle cx="70" cy="85" r="30" fill="#15803d" />
    <text x="70" y="93" font-family="serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">GOV</text>
    <text x="120" y="65" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#14532d">MINISTRY OF SOCIAL WELFARE &amp; EMPOWERMENT</text>
    <text x="120" y="90" font-family="Georgia, serif" font-size="20" font-weight="bold" fill="#166534">State Scholarship Department</text>
    <text x="120" y="115" font-family="Arial, sans-serif" font-size="12" fill="#15803d">Notification No: SWD/SCHOL/2026-27/088 &bull; Public Notice</text>

    <!-- Notification Title -->
    <rect x="50" y="180" width="700" height="50" fill="#dcfce7" rx="6" />
    <text x="70" y="210" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#14532d">
      ANNUAL POST-MATRIC &amp; HIGHER EDUCATION SCHOLARSHIP SCHEME (2026-27)
    </text>

    <!-- Key Eligibility -->
    <text x="60" y="265" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">1. Eligibility Criteria:</text>
    <text x="80" y="292" font-family="Arial, sans-serif" font-size="13" fill="#334155">&bull; Domicile resident students pursuing Diploma, Degree, or Postgraduate courses.</text>
    <text x="80" y="314" font-family="Arial, sans-serif" font-size="13" fill="#334155">&bull; Annual parental/family income must not exceed ₹ 2,50,000 per annum.</text>
    <text x="80" y="336" font-family="Arial, sans-serif" font-size="13" fill="#334155">&bull; Minimum 60% aggregate marks in the qualifying previous academic examination.</text>

    <!-- Scholarship Amount -->
    <rect x="50" y="365" width="700" height="85" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="70" y="395" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">SCHOLARSHIP ASSISTANCE / FINANCIAL BENEFIT:</text>
    <text x="70" y="430" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1d4ed8">₹ 24,000 / year (Tuition) + ₹ 12,000 Maintenance Grant</text>

    <!-- Required Documents -->
    <text x="60" y="485" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">2. Mandatory Documents to be Uploaded:</text>
    <text x="80" y="512" font-family="Arial, sans-serif" font-size="13" fill="#334155">1. Valid Income Certificate issued by Revenue Tahsildar (issued after April 2026)</text>
    <text x="80" y="534" font-family="Arial, sans-serif" font-size="13" fill="#334155">2. Bonafide Student Certificate signed by College Principal / Registrar</text>
    <text x="80" y="556" font-family="Arial, sans-serif" font-size="13" fill="#334155">3. Marksheet of previous passed examination</text>
    <text x="80" y="578" font-family="Arial, sans-serif" font-size="13" fill="#334155">4. Bank Passbook copy (Account must be Aadhaar-seeded for DBT transfer)</text>

    <!-- Important Deadlines Box -->
    <rect x="50" y="615" width="700" height="90" rx="8" fill="#fef2f2" stroke="#fca5a5" />
    <text x="70" y="645" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#991b1b">IMPORTANT DATES &amp; DEADLINES:</text>
    <text x="70" y="675" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#b91c1c">LAST DATE FOR ONLINE APPLICATION: 30 NOVEMBER 2026</text>
    <text x="70" y="695" font-family="Arial, sans-serif" font-size="12" fill="#7f1d1d">College Principal verification last date: 15 December 2026</text>

    <!-- Official Portal -->
    <rect x="50" y="730" width="700" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="70" y="758" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155">Official Application Portal:</text>
    <text x="70" y="785" font-family="monospace" font-size="15" font-weight="bold" fill="#0369a1">https://scholarships.state.gov.in (Helpline: 040-23120000)</text>

    <text x="400" y="930" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Issued by Order of the State Governor &bull; Government of India Authorized Scheme</text>
  </svg>`;
}

// -------------------------------------------------------------
// 4. Complex Legal / Agreement SVG
// -------------------------------------------------------------
export function createComplexLegalAgreementSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <rect width="800" height="1000" fill="#fdfcf8" />
    <rect x="25" y="25" width="750" height="950" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
    
    <!-- Legal Deed Header -->
    <rect x="25" y="25" width="750" height="100" fill="#f1f5f9" />
    <text x="400" y="75" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#0f172a" text-anchor="middle">COMMERCIAL LEASE &amp; LICENCE AGREEMENT</text>
    <text x="400" y="100" font-family="Georgia, serif" font-size="13" fill="#475569" text-anchor="middle">Registered Document No: 4082/2026 &bull; Sub-Registrar Office IV</text>

    <!-- Dense Legal Clauses -->
    <text x="60" y="165" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#1e293b">CLAUSE 14.1 &mdash; TERMINATION AND VACATION OF DEMISED PREMISES:</text>
    <text x="60" y="195" font-family="Georgia, serif" font-size="13" fill="#334155" line-height="1.6">
      "Notwithstanding anything contained to the contrary hereinabove, in the event the Lessee fails to
    </text>
    <text x="60" y="220" font-family="Georgia, serif" font-size="13" fill="#334155">
      furnish the requisite escalated rental payments within the stipulated moratorium period of fifteen (15)
    </text>
    <text x="60" y="245" font-family="Georgia, serif" font-size="13" fill="#334155">
      calendar days subsequent to receipt of written default notification from the Lessor, the Lessor shall be
    </text>
    <text x="60" y="270" font-family="Georgia, serif" font-size="13" fill="#334155">
      entitled, ipso facto, to terminate this Indenture forthwith without prejudice to any antecedent remedies."
    </text>

    <!-- Plain language callout box -->
    <rect x="50" y="305" width="700" height="90" rx="6" fill="#f0fdf4" stroke="#86efac" />
    <text x="70" y="335" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#166534">KRISHTATTVA PLAIN LANGUAGE TRANSLATION:</text>
    <text x="70" y="360" font-family="Arial, sans-serif" font-size="13" fill="#14532d">
      If the tenant does not pay the increased rent within 15 days of receiving written notice,
    </text>
    <text x="70" y="380" font-family="Arial, sans-serif" font-size="13" fill="#14532d">
      the landlord has the immediate right to cancel the agreement and ask the tenant to vacate.
    </text>

    <!-- Clause 14.2 -->
    <text x="60" y="435" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#1e293b">CLAUSE 14.2 &mdash; SECURITY DEPOSIT FORFEITURE AND ARBITRATION:</text>
    <text x="60" y="465" font-family="Georgia, serif" font-size="13" fill="#334155">
      "Upon such premature termination occasioned by Lessee's uncured default, the Interest-Free Refundable
    </text>
    <text x="60" y="490" font-family="Georgia, serif" font-size="13" fill="#334155">
      Security Deposit (IFRSD) amounting to ₹ 1,50,000/- (Rupees One Lakh Fifty Thousand Only) shall stand
    </text>
    <text x="60" y="515" font-family="Georgia, serif" font-size="13" fill="#334155">
      forfeited in favour of the Lessor towards liquidated pre-estimated damages, and all disputes arising
    </text>
    <text x="60" y="540" font-family="Georgia, serif" font-size="13" fill="#334155">
      herefrom shall be governed by sole arbitration in accordance with the Arbitration &amp; Conciliation Act, 1996."
    </text>

    <!-- Plain language callout 2 -->
    <rect x="50" y="575" width="700" height="85" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="70" y="602" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e40af">KRISHTATTVA PLAIN LANGUAGE TRANSLATION:</text>
    <text x="70" y="626" font-family="Arial, sans-serif" font-size="13" fill="#1e3a8a">
      If the contract is cancelled due to unpaid rent, the landlord will keep the entire ₹1,50,000 deposit.
    </text>
    <text x="70" y="646" font-family="Arial, sans-serif" font-size="13" fill="#1e3a8a">
      Any legal disagreement must be solved through an arbitrator, not a regular public court.
    </text>

    <!-- Signatures -->
    <text x="60" y="730" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#334155">Signed, Sealed and Delivered:</text>
    <line x1="60" y1="790" x2="260" y2="790" stroke="#000000" stroke-width="1.5" />
    <text x="60" y="810" font-family="Arial, sans-serif" font-size="12" fill="#475569">Lessor: K. R. Nambiar (Property Owner)</text>

    <line x1="500" y1="790" x2="700" y2="790" stroke="#000000" stroke-width="1.5" />
    <text x="500" y="810" font-family="Arial, sans-serif" font-size="12" fill="#475569">Lessee: Ramesh Kumar (Tenant)</text>
  </svg>`;
}

export function getUniversalDemoDocuments(): ProcessedDocument[] {
  const electricitySvg = createElectricityBillSvg();
  const bankSvg = createBankNoticeSvg();
  const govSvg = createGovernmentNoticeSvg();
  const legalSvg = createComplexLegalAgreementSvg();

  const toDataUrl = (svg: string): string => {
    if (typeof Buffer !== 'undefined' && typeof Buffer.from === 'function') {
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    }
    try {
      if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
        return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svg)))}`;
      }
    } catch { /* fallback to encoded utf8 */ }
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const billDoc: ProcessedDocument = {
    id: 'demo-electricity-bill',
    name: 'State Electricity Board - Monthly Statement (184 Units)',
    type: 'bill',
    documentClassification: 'ELECTRICITY_BILL',
    detectedCategoryLabel: 'Electricity Utility Bill',
    categoryGroup: 'utility',
    imageDataUrl: toDataUrl(electricitySvg),
    uploadedAt: '2026-10-04T10:00:00.000Z',
    fileSize: 42100,
    quality: {
      status: 'pass',
      overallScore: 94,
      blurScore: 92,
      darknessScore: 90,
      glareScore: 95,
      resolutionScore: 96,
      rotationAngle: 0,
      handwritingVisibilityScore: 90,
      issues: [],
      suggestions: []
    },
    tokens: [
      {
        id: 'tb-1',
        text: 'LT-9823-4011',
        category: 'organization',
        confidence: 0.98,
        confidenceDisplay: '98% (High)',
        isUncertain: false,
        bbox: { x: 22, y: 19, width: 20, height: 4 },
        meaning: 'Consumer Account Number for payment identification'
      },
      {
        id: 'tb-2',
        text: '184 UNITS',
        category: 'amount',
        confidence: 0.99,
        confidenceDisplay: '99% (High)',
        isUncertain: false,
        bbox: { x: 52, y: 34, width: 18, height: 4 },
        meaning: 'Electricity units (kWh) consumed during this 30-day billing cycle'
      },
      {
        id: 'tb-3',
        text: '₹ 742.00',
        category: 'amount',
        confidence: 0.99,
        confidenceDisplay: '99% (High)',
        isUncertain: false,
        bbox: { x: 9, y: 58, width: 28, height: 8 },
        meaning: 'Total net amount to be paid before due date'
      },
      {
        id: 'tb-4',
        text: '15 OCTOBER 2026',
        category: 'deadline',
        confidence: 0.96,
        confidenceDisplay: '96% (High)',
        isUncertain: false,
        bbox: { x: 55, y: 58, width: 30, height: 8 },
        meaning: 'Final deadline for payment without late penalty surcharge'
      },
      {
        id: 'tb-5',
        text: '₹50.00 Late Surcharge',
        category: 'instruction',
        confidence: 0.94,
        confidenceDisplay: '94% (High)',
        isUncertain: false,
        bbox: { x: 9, y: 67, width: 45, height: 5 },
        meaning: 'Additional penalty added to next cycle if paid after 15 October'
      }
    ],
    rawOcrText: `STATE ELECTRICITY DISTRIBUTION COMPANY LTD.\nConsumer No: LT-9823-4011 | Billing Month: OCTOBER 2026\nConsumer Name: Venkatesh Rao | Meter Number: MTR-448201-B\nPrevious: 4708 kWh | Current: 4892 kWh | Consumed: 184 UNITS\nEnergy Charges Slab 1: ₹ 330.00 | Slab 2: ₹ 361.20 | Fixed: ₹ 40.00 | Duty: ₹ 10.80\nTOTAL AMOUNT DUE: ₹ 742.00\nDUE DATE: 15 OCTOBER 2026\nLate payment surcharge of ₹50.00 added after due date.`,
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    explanation: {
      language: 'en',
      languageName: 'English',
      originalTextSummary: 'STATE ELECTRICITY DISTRIBUTION CO LTD. Consumer LT-9823-4011. Units: 184. Net Payable: ₹ 742.00 due on 15 OCTOBER 2026.',
      simpleSummary: 'You used 184 electricity units this month. Your total bill amount is ₹742.00, and the payment deadline is 15 October 2026. A late fee of ₹50 will be charged if paid after the due date.',
      explainLikeIm10: 'You used 184 units of power. You need to pay 742 rupees before 15 October. If you pay late, they will add an extra 50 rupees.',
      whatWasWritten: ['Electricity bill for consumer LT-9823-4011 with total due ₹742.00 payable by 15 October 2026.'],
      whatMedicalTermsMean: [],
      whatDocumentSaysHappened: ['Meter reading increased from 4,708 to 4,892 kWh resulting in 184 units billed.'],
      whatIsUnclear: [],
      whatToAskDoctor: ['Pay via UPI, MeeSeva, or electricity board mobile app using Consumer No LT-9823-4011.'],
      spokenScript: 'Your electricity bill shows you used 184 units this month. Your total amount to pay is 742 rupees. The payment deadline is 15 October 2026. A late fee of 50 rupees applies after the due date.',
      sentenceTimings: [
        { sentence: 'Your electricity bill shows you used 184 units this month.', durationSec: 3.5, audioStartTime: 0, audioEndTime: 3.5 },
        { sentence: 'Your total amount to pay is 742 rupees.', durationSec: 3.0, audioStartTime: 3.5, audioEndTime: 6.5 },
        { sentence: 'The payment deadline is 15 October 2026.', durationSec: 3.0, audioStartTime: 6.5, audioEndTime: 9.5 },
        { sentence: 'A late fee of 50 rupees applies after the due date.', durationSec: 3.5, audioStartTime: 9.5, audioEndTime: 13.0 }
      ],
      breakdown: {
        whatIsThis: 'This is an official monthly Electricity Consumption Bill from the State Electricity Distribution Company.',
        whatItSays: 'The bill records power consumption for October 2026 (184 units billed across domestic slabs).',
        whatToDo: 'Pay ₹742.00 before 15 October 2026 through UPI, mobile app, or MeeSeva counter.',
        deadline: '15 October 2026 (Payment Deadline)',
        importantAmounts: '₹ 742.00 (Total Amount Due) &bull; 184 Units (Consumption) &bull; ₹ 50.00 (Late Fee)',
        whatToWatch: 'Avoid delayed payment: An extra ₹50 surcharge is levied after 15 October, and power is subject to disconnection after 15 days of default.',
        whatIsUnclear: 'None. All meter numbers, consumption figures, and amounts are sharply printed.'
      },
      billDetails: {
        provider: 'State Electricity Distribution Company Ltd.',
        accountNumber: 'LT-9823-4011',
        consumerName: 'Venkatesh Rao',
        billingPeriod: 'OCTOBER 2026',
        previousReading: '4708 kWh',
        currentReading: '4892 kWh',
        unitsConsumed: '184 UNITS',
        amountDue: '₹ 742.00',
        dueDate: '15 OCTOBER 2026',
        lateFee: '₹ 50.00',
        paymentInstructions: 'Pay online via State Electricity App/UPI or at authorized MeeSeva / e-Seva citizen counters.'
      }
    },
    translations: {},
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        {
          id: 'bill-check-due',
          name: 'Payment Due Date Active',
          passed: true,
          severity: 'low',
          details: 'Due date is 15 October 2026. Payment is currently in normal grace period.',
          sourceReference: 'Electricity Supply Code Sec 56',
          confidenceLevel: 'HIGH',
          verificationAction: 'Pay before 15 October 2026 to prevent ₹50 penalty.'
        },
        {
          id: 'bill-check-math',
          name: 'Slab Calculation Verified',
          passed: true,
          severity: 'low',
          details: 'Slab 1 (₹330.00) + Slab 2 (₹361.20) + Fixed (₹40.00) + Duty (₹10.80) = ₹742.00. Math verified.',
          sourceReference: 'State Electricity Regulatory Commission Tariff Order',
          confidenceLevel: 'HIGH'
        }
      ]
    },
    structuredMeds: [],
    diagnoses: [],
    instructions: ['Pay ₹742.00 before 15 October 2026 to prevent ₹50 late fee.'],
    symptoms: [],
    labFindings: [],
    billDetails: {
      provider: 'State Electricity Distribution Company Ltd.',
      accountNumber: 'LT-9823-4011',
      consumerName: 'Venkatesh Rao',
      billingPeriod: 'OCTOBER 2026',
      previousReading: '4708 kWh',
      currentReading: '4892 kWh',
      unitsConsumed: '184 UNITS',
      amountDue: '₹ 742.00',
      dueDate: '15 OCTOBER 2026',
      lateFee: '₹ 50.00',
      paymentInstructions: 'Pay online via State Electricity App/UPI or at authorized MeeSeva / e-Seva citizen counters.'
    },
    separatedContent: {
      documentSays: [
        { category: 'Bill', field: 'Amount Due', value: '₹ 742.00' },
        { category: 'Bill', field: 'Due Date', value: '15 October 2026' },
        { category: 'Bill', field: 'Units Consumed', value: '184 Units' }
      ],
      termMeanings: [
        { term: 'Units (kWh)', meaning: 'Kilowatt-hours of electricity used by electrical appliances in your house.', caution: 'Higher units cross into higher pricing slabs.' },
        { term: 'FSA (Fuel Surcharge)', meaning: 'Variable cost adjustment based on thermal coal prices.', caution: 'Government approved variable tariff item.' }
      ],
      notDetermined: []
    },
    confidenceInfo: {
      serviceName: 'Krishxtattva Universal Document AI',
      hasNumericalConfidence: true,
      averageConfidenceScore: 0.98,
      providerNotice: 'Document processed with 98% OCR accuracy and exact numerical preservation.',
      highConfidenceCount: 5,
      mediumConfidenceCount: 0,
      needsVerificationCount: 0
    },
    serviceConfigured: true,
    isVerifiedContent: true
  };

  const bankDoc: ProcessedDocument = {
    id: 'demo-bank-notice',
    name: 'National Citizens Bank - Mandatory KYC Notice',
    type: 'banking',
    documentClassification: 'BANK_LETTER',
    detectedCategoryLabel: 'Official Bank Notice',
    categoryGroup: 'financial',
    imageDataUrl: toDataUrl(bankSvg),
    uploadedAt: '2026-10-04T10:00:00.000Z',
    fileSize: 45300,
    quality: {
      status: 'pass',
      overallScore: 96,
      blurScore: 95,
      darknessScore: 92,
      glareScore: 96,
      resolutionScore: 98,
      rotationAngle: 0,
      handwritingVisibilityScore: 95,
      issues: [],
      suggestions: []
    },
    tokens: [
      {
        id: 'bk-1',
        text: 'A/c 30998822019',
        category: 'organization',
        confidence: 0.99,
        confidenceDisplay: '99% (High)',
        isUncertain: false,
        bbox: { x: 7, y: 21, width: 25, height: 4 },
        meaning: 'Your active savings bank account number'
      },
      {
        id: 'bk-2',
        text: 'Re-KYC Documentation',
        category: 'action_item',
        confidence: 0.97,
        confidenceDisplay: '97% (High)',
        isUncertain: false,
        bbox: { x: 7, y: 44, width: 35, height: 6 },
        meaning: 'Submission of identity and address proof required by RBI regulations'
      },
      {
        id: 'bk-3',
        text: '31 OCTOBER 2026',
        category: 'deadline',
        confidence: 0.98,
        confidenceDisplay: '98% (High)',
        isUncertain: false,
        bbox: { x: 7, y: 62, width: 28, height: 6 },
        meaning: 'Deadline to submit documents before debit transactions are paused'
      },
      {
        id: 'bk-4',
        text: 'NEVER ASK FOR PASSWORD / PIN / OTP',
        category: 'instruction',
        confidence: 0.99,
        confidenceDisplay: '99% (High)',
        isUncertain: false,
        bbox: { x: 7, y: 70, width: 60, height: 6 },
        meaning: 'Official scam advisory: Banks never request passwords or OTPs'
      }
    ],
    rawOcrText: `NATIONAL CITIZENS BANK\nBranch: Commercial Hub | Ref: KYC-REG-2026-8910\nTo: Mr. Ramesh Kumar Sharma | Savings A/c: 30998822019\nDate: 28-Sep-2026\nSUBJECT: Mandatory Periodic KYC Update for Active Account Operation\nAction Required: Submit self-attested photocopy of Aadhaar/Voter ID, PAN Card or Form 60, and 1 passport photo.\nDeadline: 31 OCTOBER 2026.\nSecurity Warning: The bank will never call asking for PIN, Password or OTP.`,
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    explanation: {
      language: 'en',
      languageName: 'English',
      originalTextSummary: 'National Citizens Bank letter requesting periodic re-KYC update for Savings Account 30998822019 before 31 October 2026.',
      simpleSummary: 'Your bank is informing you that your identity documents (KYC) need to be updated. You must submit copies of your Aadhaar and PAN card at your bank branch before 31 October 2026 to keep your account working smoothly.',
      explainLikeIm10: 'The bank needs a copy of your Aadhaar card and PAN card. Take them to the bank before 31 October so your account stays active. Never tell anyone your secret phone OTP or ATM PIN.',
      whatWasWritten: ['Formal KYC update letter from National Citizens Bank for account 30998822019.'],
      whatMedicalTermsMean: [],
      whatDocumentSaysHappened: ['Periodic regulatory KYC cycle reached. Submission required.'],
      whatIsUnclear: [],
      whatToAskDoctor: ['Visit your branch in person or log in directly to official NetBanking. Do not click random links.'],
      spokenScript: 'This letter is from your bank. It is asking you to update your identity documents. You need to submit a photocopy of your Aadhaar and PAN card before 31 October 2026. Important: The bank will never ask for your PIN, password, or OTP.',
      sentenceTimings: [
        { sentence: 'This letter is from your bank.', durationSec: 2.5, audioStartTime: 0, audioEndTime: 2.5 },
        { sentence: 'It is asking you to update your identity documents.', durationSec: 3.5, audioStartTime: 2.5, audioEndTime: 6.0 },
        { sentence: 'You need to submit a photocopy of your Aadhaar and PAN card before 31 October 2026.', durationSec: 5.0, audioStartTime: 6.0, audioEndTime: 11.0 },
        { sentence: 'Important: The bank will never ask for your PIN, password, or OTP.', durationSec: 4.5, audioStartTime: 11.0, audioEndTime: 15.5 }
      ],
      breakdown: {
        whatIsThis: 'This is an official communication letter from National Citizens Bank regarding your Savings Account.',
        whatItSays: 'Your account requires a periodic KYC (Know Your Customer) update as per Reserve Bank of India safety regulations.',
        whatToDo: 'Take a self-attested photocopy of your Aadhaar Card, PAN Card, and 1 passport photograph to your home bank branch.',
        deadline: '31 October 2026 (Compliance Deadline)',
        importantAmounts: 'Account No: 30998822019 (No fee or payment required)',
        whatToWatch: 'SCAM WARNING: The bank will NEVER call or send SMS asking for your ATM PIN, password, or OTP. Never click SMS links or share credentials.',
        whatIsUnclear: 'None. All instructions and deadlines are printed with official reference number.'
      },
      financialDetails: {
        institutionName: 'National Citizens Bank',
        accountRef: 'Savings A/c: 30998822019',
        noticeType: 'Periodic Re-KYC Updation Notice',
        deadline: '31 October 2026',
        actionRequired: 'Submit self-attested Aadhaar and PAN card copy along with Re-KYC form at your home branch.',
        fraudCaution: 'The bank will NEVER ask for your password, PIN, or OTP over phone or email. Beware of fraudulent calls claiming your account is blocked.',
        officialContact: 'Toll-free 1800-425-0011 or www.nationalbank.in'
      }
    },
    translations: {},
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        {
          id: 'scam-guard',
          name: 'Anti-Phishing & Anti-Scam Verification Check',
          passed: true,
          severity: 'medium',
          details: 'Notice matches authentic banking communication pattern. Explicit scam warning verified.',
          sourceReference: 'RBI Cyber Security & Consumer Protection Framework',
          confidenceLevel: 'HIGH',
          verificationAction: 'Always submit documents directly inside your official bank branch. Never share OTP or debit card PIN with callers.'
        }
      ]
    },
    structuredMeds: [],
    diagnoses: [],
    instructions: ['Submit self-attested Aadhaar and PAN card copy at bank branch before 31 October 2026.'],
    symptoms: [],
    labFindings: [],
    financialDetails: {
      institutionName: 'National Citizens Bank',
      accountRef: 'Savings A/c: 30998822019',
      noticeType: 'Periodic Re-KYC Updation Notice',
      deadline: '31 October 2026',
      actionRequired: 'Submit self-attested Aadhaar and PAN card copy along with Re-KYC form at your home branch.',
      fraudCaution: 'The bank will NEVER ask for your password, PIN, or OTP over phone or email. Beware of fraudulent calls claiming your account is blocked.',
      officialContact: 'Toll-free 1800-425-0011 or www.nationalbank.in'
    },
    separatedContent: {
      documentSays: [
        { category: 'Bank', field: 'Account Number', value: '30998822019' },
        { category: 'Bank', field: 'Deadline', value: '31 October 2026' }
      ],
      termMeanings: [
        { term: 'Re-KYC', meaning: 'Periodic identity verification required by banking law to keep your account secure.', caution: 'Do not pay any fee; KYC is completely free of cost.' }
      ],
      notDetermined: []
    },
    confidenceInfo: {
      serviceName: 'Krishxtattva Universal Document AI',
      hasNumericalConfidence: true,
      averageConfidenceScore: 0.99,
      providerNotice: 'Document processed with structured fact extraction and scam guard evaluation.',
      highConfidenceCount: 4,
      mediumConfidenceCount: 0,
      needsVerificationCount: 0
    },
    serviceConfigured: true,
    isVerifiedContent: true
  };

  const govDoc: ProcessedDocument = {
    id: 'demo-gov-scholarship',
    name: 'Ministry of Social Welfare - Higher Education Scholarship (₹36,000)',
    type: 'government',
    documentClassification: 'GOVERNMENT_NOTICE',
    detectedCategoryLabel: 'Government Scheme / Official Notice',
    categoryGroup: 'government',
    imageDataUrl: toDataUrl(govSvg),
    uploadedAt: '2026-10-04T10:00:00.000Z',
    fileSize: 46200,
    quality: {
      status: 'pass',
      overallScore: 95,
      blurScore: 94,
      darknessScore: 92,
      glareScore: 95,
      resolutionScore: 96,
      rotationAngle: 0,
      handwritingVisibilityScore: 94,
      issues: [],
      suggestions: []
    },
    tokens: [
      {
        id: 'gv-1',
        text: 'Post-Matric Scholarship',
        category: 'organization',
        confidence: 0.98,
        confidenceDisplay: '98% (High)',
        isUncertain: false,
        bbox: { x: 9, y: 19, width: 40, height: 6 },
        meaning: 'Official government scholarship scheme for higher education'
      },
      {
        id: 'gv-2',
        text: '₹ 24,000 + ₹ 12,000',
        category: 'amount',
        confidence: 0.99,
        confidenceDisplay: '99% (High)',
        isUncertain: false,
        bbox: { x: 9, y: 41, width: 35, height: 5 },
        meaning: 'Total financial grant: ₹24,000 tuition assistance + ₹12,000 annual maintenance'
      },
      {
        id: 'gv-3',
        text: '30 NOVEMBER 2026',
        category: 'deadline',
        confidence: 0.99,
        confidenceDisplay: '99% (High)',
        isUncertain: false,
        bbox: { x: 9, y: 65, width: 35, height: 5 },
        meaning: 'Last date to submit online application form on government portal'
      }
    ],
    rawOcrText: `MINISTRY OF SOCIAL WELFARE & EMPOWERMENT\nState Scholarship Department | Notification No: SWD/SCHOL/2026-27/088\nANNUAL POST-MATRIC & HIGHER EDUCATION SCHOLARSHIP SCHEME (2026-27)\nEligibility: Domicile students in Diploma, Degree, or PG. Family income under ₹ 2,50,000/yr. Minimum 60% marks.\nBenefit: ₹ 24,000/yr Tuition + ₹ 12,000 Maintenance Grant.\nDocuments: Income Certificate from Tahsildar, Bonafide Certificate from College, Marksheet, Aadhaar-seeded Bank Passbook.\nLAST DATE: 30 NOVEMBER 2026.\nPortal: https://scholarships.state.gov.in`,
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    explanation: {
      language: 'en',
      languageName: 'English',
      originalTextSummary: 'Government notification for Post-Matric Scholarship Scheme 2026-27 providing up to ₹36,000 financial aid. Last date 30 November 2026.',
      simpleSummary: 'This is an official government scholarship notification. Eligible students pursuing college, diploma, or degree courses can receive ₹36,000 per year. Family income must be under ₹2,50,000. You must apply online before 30 November 2026.',
      explainLikeIm10: 'The government is giving 36,000 rupees to help students pay for college. If your family income is under 2.5 lakh rupees, apply on the website before 30 November. You need an income certificate and your marksheets.',
      whatWasWritten: ['Official government notification SWD/SCHOL/2026-27/088 for student financial assistance.'],
      whatMedicalTermsMean: [],
      whatDocumentSaysHappened: ['Scholarship application window open for academic year 2026-27.'],
      whatIsUnclear: [],
      whatToAskDoctor: ['Ensure your bank account is linked to your Aadhaar card so the scholarship money can be sent via Direct Benefit Transfer.'],
      spokenScript: 'This is an official scholarship announcement from the government. Eligible college students can receive up to 36,000 rupees per year. Applications must be submitted on the official website before 30 November 2026.',
      sentenceTimings: [
        { sentence: 'This is an official scholarship announcement from the government.', durationSec: 3.5, audioStartTime: 0, audioEndTime: 3.5 },
        { sentence: 'Eligible college students can receive up to 36,000 rupees per year.', durationSec: 4.0, audioStartTime: 3.5, audioEndTime: 7.5 },
        { sentence: 'Applications must be submitted on the official website before 30 November 2026.', durationSec: 4.5, audioStartTime: 7.5, audioEndTime: 12.0 }
      ],
      breakdown: {
        whatIsThis: 'This is an official public notice from the Ministry of Social Welfare announcing college scholarships for 2026-27.',
        whatItSays: 'Students pursuing higher education whose family income is below ₹2,50,000 can receive up to ₹36,000 per year.',
        whatToDo: 'Gather your Tahsildar Income Certificate, College Bonafide Certificate, and apply online at https://scholarships.state.gov.in before the deadline.',
        deadline: '30 November 2026 (Student Submission Deadline)',
        importantAmounts: '₹ 36,000 Total Grant (₹24,000 Tuition + ₹12,000 Maintenance) &bull; Income Limit: ₹2,50,000/year',
        whatToWatch: 'Aadhaar Seeding: Your bank account must be actively seeded with Aadhaar, or the payment will fail.',
        whatIsUnclear: 'None. Eligibility conditions, deadlines, and official portal URL are clearly specified.'
      },
      governmentDetails: {
        department: 'Ministry of Social Welfare & Empowerment (State Scholarship Dept)',
        noticeTitle: 'Annual Post-Matric & Higher Education Scholarship Scheme 2026-27',
        eligibilityOrRequirement: 'College/diploma students with family income under ₹2,50,000 and minimum 60% marks in previous exam.',
        actionRequired: 'Upload Tahsildar income certificate, college bonafide certificate, previous marksheet, and bank passbook on portal.',
        deadline: '30 November 2026',
        officialPortalOrOffice: 'https://scholarships.state.gov.in (Helpline: 040-23120000)'
      }
    },
    translations: {},
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        {
          id: 'gov-deadline-check',
          name: 'Application Timeline Verified',
          passed: true,
          severity: 'low',
          details: 'Application window is currently open until 30 November 2026.',
          sourceReference: 'Notification SWD/SCHOL/2026-27/088',
          confidenceLevel: 'HIGH',
          verificationAction: 'Apply early to allow college principal verification before 15 December 2026.'
        }
      ]
    },
    structuredMeds: [],
    diagnoses: [],
    instructions: ['Apply online at https://scholarships.state.gov.in before 30 November 2026.'],
    symptoms: [],
    labFindings: [],
    governmentDetails: {
      department: 'Ministry of Social Welfare & Empowerment (State Scholarship Dept)',
      noticeTitle: 'Annual Post-Matric & Higher Education Scholarship Scheme 2026-27',
      eligibilityOrRequirement: 'College/diploma students with family income under ₹2,50,000 and minimum 60% marks in previous exam.',
      actionRequired: 'Upload Tahsildar income certificate, college bonafide certificate, previous marksheet, and bank passbook on portal.',
      deadline: '30 November 2026',
      officialPortalOrOffice: 'https://scholarships.state.gov.in (Helpline: 040-23120000)'
    },
    separatedContent: {
      documentSays: [
        { category: 'Government Scheme', field: 'Scheme Name', value: 'Post-Matric Scholarship Scheme 2026-27' },
        { category: 'Government Scheme', field: 'Benefit Amount', value: '₹ 36,000 / year' }
      ],
      termMeanings: [
        { term: 'Aadhaar-Seeded Account', meaning: 'A bank account linked with NPCI mapper so government subsidies can be deposited directly.', caution: 'Check with your bank branch that Aadhaar DBT mapping is active.' }
      ],
      notDetermined: []
    },
    confidenceInfo: {
      serviceName: 'Krishxtattva Universal Document AI',
      hasNumericalConfidence: true,
      averageConfidenceScore: 0.98,
      providerNotice: 'Document processed with structured eligibility extraction.',
      highConfidenceCount: 3,
      mediumConfidenceCount: 0,
      needsVerificationCount: 0
    },
    serviceConfigured: true,
    isVerifiedContent: true
  };

  const legalDoc: ProcessedDocument = {
    id: 'demo-legal-lease',
    name: 'Commercial Lease Agreement (Termination & Deposit Clause)',
    type: 'legal',
    documentClassification: 'LEGAL_AGREEMENT',
    detectedCategoryLabel: 'Formal Legal Document',
    categoryGroup: 'legal',
    imageDataUrl: toDataUrl(legalSvg),
    uploadedAt: '2026-10-04T10:00:00.000Z',
    fileSize: 43800,
    quality: {
      status: 'pass',
      overallScore: 96,
      blurScore: 95,
      darknessScore: 92,
      glareScore: 95,
      resolutionScore: 98,
      rotationAngle: 0,
      handwritingVisibilityScore: 95,
      issues: [],
      suggestions: []
    },
    tokens: [
      {
        id: 'lg-1',
        text: 'Fifteen (15) Calendar Days',
        category: 'deadline',
        confidence: 0.99,
        confidenceDisplay: '99% (High)',
        isUncertain: false,
        bbox: { x: 7, y: 22, width: 35, height: 4 },
        meaning: 'Grace period to pay rent arrears following written notice from landlord'
      },
      {
        id: 'lg-2',
        text: 'Deposit of ₹ 1,50,000/- Forfeited',
        category: 'amount',
        confidence: 0.98,
        confidenceDisplay: '98% (High)',
        isUncertain: false,
        bbox: { x: 7, y: 49, width: 45, height: 5 },
        meaning: 'Entire security deposit of ₹1.5 Lakhs will be kept by the owner if rent is unpaid'
      },
      {
        id: 'lg-3',
        text: 'Sole Arbitration',
        category: 'instruction',
        confidence: 0.97,
        confidenceDisplay: '97% (High)',
        isUncertain: false,
        bbox: { x: 7, y: 54, width: 35, height: 4 },
        meaning: 'Disputes are resolved through an arbitrator rather than filing a direct civil court lawsuit'
      }
    ],
    rawOcrText: `COMMERCIAL LEASE & LICENCE AGREEMENT\nRegistered Document No: 4082/2026\nClause 14.1 Termination: In the event Lessee fails to furnish escalated rental payments within 15 calendar days of written notice, Lessor entitled to terminate indenture forthwith.\nClause 14.2 Forfeiture: Interest-Free Refundable Security Deposit (IFRSD) of ₹ 1,50,000/- shall stand forfeited towards liquidated damages. Disputes governed by sole arbitration.\nSignatures: Lessor K. R. Nambiar | Lessee Ramesh Kumar`,
    uncertainWords: [],
    allUncertainResolved: true,
    selectedLanguage: 'en',
    explanation: {
      language: 'en',
      languageName: 'English',
      originalTextSummary: 'Commercial Lease Agreement Clause 14 governing default, 15-day termination notice, and ₹1,50,000 security deposit forfeiture.',
      simpleSummary: 'This is a rental contract clause. It says: If the tenant fails to pay rent within 15 days of receiving written notice, the landlord can cancel the agreement immediately and keep the entire ₹1,50,000 security deposit as compensation.',
      explainLikeIm10: 'If you rent this property and do not pay rent within 15 days of a warning letter, the owner can cancel your contract, make you leave, and keep your 1.5 lakh rupee deposit money.',
      whatWasWritten: ['Registered commercial lease deed clause 14 regarding default remedies and dispute arbitration.'],
      whatMedicalTermsMean: [],
      whatDocumentSaysHappened: ['Contractual obligations binding lessor and lessee.'],
      whatIsUnclear: [],
      whatToAskDoctor: ['Pay all rent on time and obtain written receipts to avoid triggering the 15-day notice clause.'],
      spokenScript: 'This document is a commercial rental agreement clause. If rent is not paid within 15 days of a written notice, the owner can cancel the contract immediately and keep your one lakh fifty thousand rupee security deposit.',
      sentenceTimings: [
        { sentence: 'This document is a commercial rental agreement clause.', durationSec: 3.5, audioStartTime: 0, audioEndTime: 3.5 },
        { sentence: 'If rent is not paid within 15 days of a written notice, the owner can cancel the contract immediately.', durationSec: 5.0, audioStartTime: 3.5, audioEndTime: 8.5 },
        { sentence: 'The owner will also keep your one lakh fifty thousand rupee security deposit.', durationSec: 4.5, audioStartTime: 8.5, audioEndTime: 13.0 }
      ],
      breakdown: {
        whatIsThis: 'This is a registered Commercial Lease and Licence Agreement between property owner K. R. Nambiar and tenant Ramesh Kumar.',
        whatItSays: 'The agreement outlines penalty rules if rent payments are delayed: 15-day cure notice, lease termination, and deposit forfeiture.',
        whatToDo: 'Pay all rent amounts within 15 calendar days of receiving any payment default letter.',
        deadline: '15 Calendar Days (Grace Period After Notice)',
        importantAmounts: '₹ 1,50,000 (Refundable Security Deposit at Risk of Forfeiture)',
        whatToWatch: 'Strict Penalty: Failing to cure the default within 15 days means losing your full ₹1.5 Lakh deposit and immediate lease cancellation.',
        whatIsUnclear: 'None. The contract wording is formal legalese, but the legal obligations are clear.'
      },
      legalDetails: {
        documentTitle: 'Commercial Lease & Licence Agreement (Registered No. 4082/2026)',
        partiesInvolved: 'Lessor: K. R. Nambiar (Owner) &bull; Lessee: Ramesh Kumar (Tenant)',
        coreObligations: 'Tenant must pay agreed rent within 15 days of written notification.',
        keyDatesOrDeadlines: '15 Calendar Days notice period; lease terminates immediately upon expiration.',
        plainLanguageSummary: 'If rent is overdue by 15 days after notice, agreement is cancelled and the full ₹1,50,000 deposit is forfeited.',
        legalDisclaimerNotice: 'Krishxtattva provides plain-language accessibility translation. This does not constitute legal counsel.'
      }
    },
    translations: {},
    safety: {
      passed: true,
      timestamp: new Date().toISOString(),
      checks: [
        {
          id: 'legal-disclaimer-check',
          name: 'Legal Terms Information Notice',
          passed: true,
          severity: 'low',
          details: 'Clause 14 specifies forfeiture of ₹1,50,000 deposit. Consult an advocate if legal dispute arises.',
          sourceReference: 'Arbitration and Conciliation Act, 1996',
          confidenceLevel: 'HIGH',
          verificationAction: 'Ensure all rent payments have documented bank transfer receipts.'
        }
      ]
    },
    structuredMeds: [],
    diagnoses: [],
    instructions: ['Pay rent within 15 days of notice to avoid losing ₹1,50,000 deposit.'],
    symptoms: [],
    labFindings: [],
    legalDetails: {
      documentTitle: 'Commercial Lease & Licence Agreement (Registered No. 4082/2026)',
      partiesInvolved: 'Lessor: K. R. Nambiar (Owner) &bull; Lessee: Ramesh Kumar (Tenant)',
      coreObligations: 'Tenant must pay agreed rent within 15 days of written notification.',
      keyDatesOrDeadlines: '15 Calendar Days notice period; lease terminates immediately upon expiration.',
      plainLanguageSummary: 'If rent is overdue by 15 days after notice, agreement is cancelled and the full ₹1,50,000 deposit is forfeited.',
      legalDisclaimerNotice: 'Krishxtattva provides plain-language accessibility translation. This does not constitute legal counsel.'
    },
    separatedContent: {
      documentSays: [
        { category: 'Legal Agreement', field: 'Document Title', value: 'Commercial Lease Agreement' },
        { category: 'Legal Agreement', field: 'Security Deposit', value: '₹ 1,50,000/-' }
      ],
      termMeanings: [
        { term: 'Ipso Facto', meaning: 'By that very fact / automatically by the agreement itself.', caution: 'Happens immediately without needing extra court orders.' },
        { term: 'Liquidated Damages', meaning: 'Pre-agreed compensation amount for breaking a contract.', caution: 'Protects the landlord for missed rental income.' }
      ],
      notDetermined: []
    },
    confidenceInfo: {
      serviceName: 'Krishxtattva Universal Document AI',
      hasNumericalConfidence: true,
      averageConfidenceScore: 0.99,
      providerNotice: 'Document translated from dense legalese into plain language.',
      highConfidenceCount: 3,
      mediumConfidenceCount: 0,
      needsVerificationCount: 0
    },
    serviceConfigured: true,
    isVerifiedContent: true
  };

  return [billDoc, bankDoc, govDoc, legalDoc];
}

export const UNIVERSAL_DEMO_SAMPLES = getUniversalDemoDocuments();

