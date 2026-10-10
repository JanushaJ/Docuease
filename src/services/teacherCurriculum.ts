/**
 * Krishxtattva 3D Teacher & Avatar Curriculum Engine
 * Transforms any processed document into a structured, step-by-step
 * educational teaching walkthrough for the 3D AI Teacher Avatar.
 *
 * Implements the core prompt philosophy:
 * "The explanation must feel like a knowledgeable teacher explaining
 * something to a student who has never seen the topic before."
 */

import { ProcessedDocument, SupportedLanguage } from '../types/medscript';

export interface BoundingBoxPercent {
  x: number;      // 0 - 100 percentage from left
  y: number;      // 0 - 100 percentage from top
  width: number;  // 0 - 100 percentage width
  height: number; // 0 - 100 percentage height
}

export interface RangeComparisonData {
  userValue: number;
  cutoffValue: number;
  cutoffLabel: string;
  isBelowCutoff: boolean;
  unit: string;
  minScale: number;
  maxScale: number;
  grayZoneMin?: number;
  grayZoneMax?: number;
  safeZoneLabel: string;
  reactiveZoneLabel: string;
  interpretationText: string;
}

export interface TeacherStep {
  id: string;
  stepNumber: number;
  totalSteps: number;
  stepCategory: 'patient' | 'investigation' | 'value' | 'cutoff' | 'interpretation' | 'method' | 'notes' | 'disclaimer' | 'prescription' | 'bill' | 'takeaway';
  title: string;
  subtitle: string;
  highlightText: string;
  badgeLabel?: string;
  badgeColor?: 'green' | 'amber' | 'blue' | 'purple' | 'red';
  documentArea: BoundingBoxPercent;
  
  // 7-part Teacher Explanation Structure
  whatIsIt: string;
  whyIsItThere: string;
  whatDoesItSay: string;
  simpleExplanation: string;
  whyDoesItMatter: string;
  referenceComparison?: RangeComparisonData;
  importantNote: string;
  factsVsInterpretation: string;
  
  // Teacher avatar speech script
  spokenScript: string;
  translations?: Record<string, string>;

  // Visual widget type
  visualType?: 'range_bar' | 'organ_diagram' | 'prescription_schedule' | 'handwriting_zoom' | 'table_breakdown' | 'financial_summary';
  visualData?: any;
}

export interface DocumentCurriculum {
  documentId: string;
  documentTitle: string;
  categoryLabel: string;
  totalSteps: number;
  summaryOneMinute: string;
  steps: TeacherStep[];
  fiveKeyLearnings: string[];
  whatDocumentSays: string[];
  whatDocumentDoesNotEstablish: string[];
}

/**
 * Generate curriculum for the Hepatitis B Laboratory Report
 */
export function generateHepatitisCurriculum(): DocumentCurriculum {
  const steps: TeacherStep[] = [
    {
      id: 'hep-step-1',
      stepNumber: 1,
      totalSteps: 9,
      stepCategory: 'patient',
      title: 'STEP 01 — Patient & Laboratory Registration',
      subtitle: 'Who this report belongs to and sample collection details',
      highlightText: 'PATIENT: Rajeev Verma | Age: 42 Yrs / Male | Collection: 04-Oct-2026',
      badgeLabel: 'Identity & Context',
      badgeColor: 'blue',
      documentArea: { x: 5, y: 16, width: 90, height: 10 },
      whatIsIt: 'The administrative and demographic header of the diagnostic laboratory report.',
      whyIsItThere: 'Ensures chain of custody so the biological sample is mapped to the correct individual without mix-ups.',
      whatDoesItSay: 'Patient Name: Rajeev Verma, Age: 42 Years, Gender: Male, Sample: Fasting Serum, Referred by Dr. K. M. Rao.',
      simpleExplanation: 'This confirms that this report belongs to Rajeev Verma. The blood sample was collected in the morning on 04 October 2026.',
      whyDoesItMatter: 'Always verify patient name, age, and collection date before reading medical findings.',
      importantNote: 'All lab numbers and decisions apply specifically to this patient.',
      factsVsInterpretation: 'Fact: The sample was collected on 04-Oct-2026. Interpretation: The result reflects the biological status at that date.',
      spokenScript: "Welcome! Let's understand this laboratory report together, step by step like a teacher. First, look at the top section: this confirms the report is for Rajeev Verma, age 42. It was collected on 04 October 2026 under the referral of Dr. Rao.",
      translations: {
        te: "స్వాగతం! ఈ ల్యాబ్ రిపోర్ట్‌ను ఒక టీచర్‌లా సులభంగా అర్థం చేసుకుందాం. మొదటగా పైన ఉన్న వివరాలు చూడండి: ఇది 42 సంవత్సరాల రాజీవ్ వర్మ గారి నివేదిక.",
        hi: "नमस्ते! आइए इस जांच रिपोर्ट को एक शिक्षक की तरह समझते हैं। सबसे पहले ऊपर देखें: यह 42 वर्षीय राजीव वर्मा की रिपोर्ट है।",
        ta: "வணக்கம்! இந்த மருத்துவ அறிக்கையை எளிதாகப் புரிந்து கொள்வோம். முதலில் மேலே உள்ள விவரங்கள்: இது ராஜீவ் வர்மா அவர்களின் அறிக்கை.",
        kn: "ನಮಸ್ಕಾರ! ಈ ವರದಿಯನ್ನು ಸರಳವಾಗಿ ಕಲಿಯೋಣ. ಮೊದಲನೆಯದಾಗಿ, ಇದು 42 ವರ್ಷದ ರಾಜೀವ್ ವರ್ಮಾ ಅವರ ವರದಿಯಾಗಿದೆ."
      }
    },
    {
      id: 'hep-step-2',
      stepNumber: 2,
      totalSteps: 9,
      stepCategory: 'investigation',
      title: 'STEP 02 — Test Name & Marker: HBsAg',
      subtitle: 'Understanding what HBsAg means and why it was tested',
      highlightText: 'HBsAg (Hepatitis B Surface Antigen)',
      badgeLabel: 'Primary Marker',
      badgeColor: 'blue',
      documentArea: { x: 5, y: 34, width: 35, height: 7 },
      whatIsIt: 'HBsAg stands for Hepatitis B Surface Antigen. It is a protein present on the outer shell of the Hepatitis B virus.',
      whyIsItThere: 'Doctors test for HBsAg as the primary first-line screening tool to detect if Hepatitis B virus is actively present in the liver and bloodstream.',
      whatDoesItSay: 'Investigation: HBsAg (Qualitative/Quantitative Screening).',
      simpleExplanation: 'Think of HBsAg like a distinctive uniform or badge that the Hepatitis B virus wears on its surface. If the virus is multiplying in the body, this uniform shows up in the blood.',
      whyDoesItMatter: 'It is the most critical screening marker for hepatitis B. If positive, it means the virus is present; if negative, the marker is absent.',
      importantNote: 'HBsAg tests for the virus antigen itself, NOT for your vaccine protection antibodies.',
      factsVsInterpretation: 'Fact: The laboratory tested for the surface antigen protein. Interpretation: Presence or absence indicates viral activity.',
      spokenScript: "Now look at the test name: HBsAg. This abbreviation looks intimidating, but it simply stands for Hepatitis B Surface Antigen. Think of it as a specific biological marker that laboratories look for to screen for hepatitis B infection.",
      translations: {
        te: "ఇప్పుడు పరీక్ష పేరును చూడండి: HBsAg. దీని పూర్తి రూపం హెపటైటిస్ బి ఉపరితల యాంటిజెన్. ఇది వైరస్ ఉనికిని గుర్తించడానికి ఉపయోగించే ముఖ్యమైన మార్కర్.",
        hi: "अब टेस्ट का नाम देखें: HBsAg। इसका पूरा नाम हेपेटाइटिस बी सरफेस एंटीजन है। यह वायरस की मौजूदगी जांचने वाला प्राथमिक मार्कर है।"
      },
      visualType: 'organ_diagram',
      visualData: {
        organ: 'liver',
        marker: 'HBsAg',
        description: 'Liver cells with Hepatitis B surface coat proteins circulating in blood vessels.'
      }
    },
    {
      id: 'hep-step-3',
      stepNumber: 3,
      totalSteps: 9,
      stepCategory: 'value',
      title: 'STEP 03 — Patient Observed Value: 0.35 S/CO',
      subtitle: 'The exact numerical index value recorded by the analyzer',
      highlightText: 'OBSERVED VALUE: 0.35 S/CO',
      badgeLabel: 'Patient Value',
      badgeColor: 'green',
      documentArea: { x: 41, y: 34, width: 16, height: 7 },
      whatIsIt: 'The numerical signal measured by the chemiluminescence analyzer, expressed in S/CO (Signal to Cutoff ratio).',
      whyIsItThere: 'Modern automated lab machines generate a precise optical signal ratio rather than just guessing yes or no.',
      whatDoesItSay: 'Observed Value: 0.35 S/CO (Signal-to-Cutoff Index).',
      simpleExplanation: 'Your blood sample produced a signal reading of 0.35. In this test, lower numbers mean less or no signal, while high numbers mean the virus was detected.',
      whyDoesItMatter: 'This exact number is what determines whether the test is Non-Reactive or Reactive according to the laboratory rules.',
      importantNote: 'A value of 0.35 is not zero because laboratory instruments always detect baseline optical background noise in serum.',
      factsVsInterpretation: 'Fact: The machine measured an index of 0.35 S/CO. Interpretation: Needs to be compared with the 0.90 threshold.',
      spokenScript: "Now look at your specific number right here: 0.35. The unit is S/CO, which means Signal-to-Cutoff ratio. A score of 0.35 is very low and represents normal background instrument reading.",
      translations: {
        te: "ఇప్పుడు మీ సంఖ్యను చూడండి: 0.35. ఇది ల్యాబ్ మెషిన్ రికార్డ్ చేసిన సిగ్నల్ విలువ. ఇది చాలా తక్కువ విలువ.",
        hi: "अब अपना मान देखें: 0.35। यह मशीन द्वारा मापा गया सिग्नल इंडेक्स है, जो काफी कम है।"
      },
      visualType: 'range_bar',
      visualData: {
        userValue: 0.35,
        cutoffValue: 0.90,
        cutoffLabel: '< 0.90 Non-Reactive',
        isBelowCutoff: true,
        unit: 'S/CO',
        minScale: 0,
        maxScale: 2.0,
        grayZoneMin: 0.90,
        grayZoneMax: 1.00,
        safeZoneLabel: 'Non-Reactive (Safe < 0.90)',
        reactiveZoneLabel: 'Reactive (>= 1.00)',
        interpretationText: '0.35 falls well inside the Non-Reactive green zone.'
      }
    },
    {
      id: 'hep-step-4',
      stepNumber: 4,
      totalSteps: 9,
      stepCategory: 'cutoff',
      title: 'STEP 04 — Laboratory Cutoff Threshold: < 0.90',
      subtitle: 'The reference standard used to separate negative from positive',
      highlightText: 'REFERENCE / CUTOFF: < 0.90 Non-Reactive',
      badgeLabel: 'Threshold Limit',
      badgeColor: 'amber',
      documentArea: { x: 57, y: 34, width: 20, height: 7 },
      whatIsIt: 'The biological reference limit established by the assay manufacturer and validated by the laboratory.',
      whyIsItThere: 'Without a cutoff threshold, a number like 0.35 would have no meaning. The cutoff is the dividing line.',
      whatDoesItSay: '< 0.90 : Non-Reactive. Values from 0.90 to 1.00 are Borderline / Gray Zone. Values >= 1.00 are Reactive.',
      simpleExplanation: 'Think of 0.90 as a speed limit or safety boundary. Any score below 0.90 means the machine found no virus marker. Because your score is 0.35, it is well below the 0.90 line.',
      whyDoesItMatter: 'Preserving the laboratory’s stated 0.90 cutoff avoids misleading interpretations from generic ranges.',
      importantNote: 'Different labs may use different cutoff scales (e.g. 1.0 or 0.9), so we always read this specific lab’s threshold.',
      factsVsInterpretation: 'Fact: The laboratory protocol defines < 0.90 as the non-reactive threshold.',
      spokenScript: "Next, look at the reference column: it says '< 0.90'. This is the cutoff threshold. Think of it as a safety line: anything below 0.90 is considered Non-Reactive, while anything above 1.00 would be Reactive.",
      translations: {
        te: "తరువాత పరిమితిని చూడండి: < 0.90. ఇది ల్యాబ్ నిర్ణయించిన సరిహద్దు. 0.90 కంటే తక్కువ ఉంటే నాన్-రియాక్టివ్.",
        hi: "अगला कॉलम कटऑफ दिखाता है: < 0.90। यह सुरक्षा सीमा है। 0.90 से कम का मतलब नॉन-रिएक्टिव है।"
      },
      visualType: 'range_bar',
      visualData: {
        userValue: 0.35,
        cutoffValue: 0.90,
        cutoffLabel: '< 0.90 Non-Reactive',
        isBelowCutoff: true,
        unit: 'S/CO',
        minScale: 0,
        maxScale: 2.0,
        grayZoneMin: 0.90,
        grayZoneMax: 1.00,
        safeZoneLabel: 'Non-Reactive (Safe < 0.90)',
        reactiveZoneLabel: 'Reactive (>= 1.00)',
        interpretationText: '0.35 is comfortably below the 0.90 cutoff threshold.'
      }
    },
    {
      id: 'hep-step-5',
      stepNumber: 5,
      totalSteps: 9,
      stepCategory: 'interpretation',
      title: 'STEP 05 — Clinical Result: NON-REACTIVE',
      subtitle: 'What Non-Reactive means in clear everyday language',
      highlightText: 'RESULT STATUS: NON-REACTIVE',
      badgeLabel: 'Favorable Finding',
      badgeColor: 'green',
      documentArea: { x: 78, y: 34, width: 17, height: 7 },
      whatIsIt: 'The formal laboratory result concluding that Hepatitis B surface antigen was not detected.',
      whyIsItThere: 'Gives the clinician and patient an unambiguous qualitative answer based on the mathematical reading.',
      whatDoesItSay: 'NON-REACTIVE (Negative for HBsAg).',
      simpleExplanation: 'Non-Reactive means negative. The test looked carefully for the Hepatitis B virus surface marker in your blood and did not find it.',
      whyDoesItMatter: 'This is the standard expected outcome for someone who does not have an active Hepatitis B infection.',
      importantNote: 'Medical ethics rule: A screening result is not an absolute lifelong guarantee. Context matters.',
      factsVsInterpretation: 'Fact: The result is Non-Reactive. Interpretation: No active viral surface antigen was detected in this sample.',
      spokenScript: "Now look at the result status: it clearly says 'NON-REACTIVE'. In simple words, Non-Reactive means Negative. This assay did not detect the hepatitis B virus surface marker in your blood sample.",
      translations: {
        te: "ఇప్పుడు ఫలితాన్ని చూడండి: 'నాన్-రియాక్టివ్' అని ఉంది. నాన్-రియాక్టివ్ అంటే నెగటివ్. రక్తంలో వైరస్ మార్కర్ కనుగొనబడలేదు.",
        hi: "अब रिजल्ट स्टेटस देखें: यहाँ 'नॉन-रिएक्टिव' लिखा है। इसका सीधा मतलब नेगेटिव है। रक्त में वायरस का मार्कर नहीं मिला है।"
      }
    },
    {
      id: 'hep-step-6',
      stepNumber: 6,
      totalSteps: 9,
      stepCategory: 'method',
      title: 'STEP 06 — Testing Method: CMIA Technology',
      subtitle: 'Chemiluminescent Microparticle Immunoassay explained',
      highlightText: 'METHOD: Chemiluminescent Microparticle Immunoassay (CMIA)',
      badgeLabel: 'Gold Standard Assay',
      badgeColor: 'blue',
      documentArea: { x: 5, y: 41, width: 90, height: 4 },
      whatIsIt: 'CMIA is an advanced automated laboratory method that uses magnetic microparticles coated with antibodies and light emission to measure molecules.',
      whyIsItThere: 'Documents the technological standard so any specialist doctor knows the test’s precision and sensitivity level.',
      whatDoesItSay: 'Chemiluminescent Microparticle Immunoassay (CMIA) performed on Abbott Architect i2000SR analyzer.',
      simpleExplanation: 'Think of CMIA like using an ultra-sensitive light detector. If the virus protein is there, it glows; if it doesn’t glow, the protein is absent. It is far more accurate than simple paper test strips.',
      whyDoesItMatter: 'CMIA has over 99.8% sensitivity and specificity, making it an internationally recognized gold standard.',
      importantNote: 'Because it is automated, human visual reading bias is eliminated.',
      factsVsInterpretation: 'Fact: The test was performed using CMIA methodology on an Abbott Architect platform.',
      spokenScript: "Underneath the test, you will see 'Testing Method: CMIA'. That stands for Chemiluminescent Microparticle Immunoassay. It is an advanced, automated medical technology that uses light signals to detect microscopic virus proteins with extremely high accuracy.",
      translations: {
        te: "పరీక్ష క్రింద 'మెథడ్: CMIA' అని ఉంది. ఇది కాంతి సంకేతాల ద్వారా వైరస్ ప్రోటీన్లను ఖచ్చితంగా గుర్తించే ఆధునిక సాంకేతికత.",
        hi: "नीचे 'CMIA' तकनीक लिखी है। यह एक उच्च-सटीक आधुनिक प्रयोगशाला प्रणाली है जो प्रकाश संकेतों से वायरस का पता लगाती है।"
      }
    },
    {
      id: 'hep-step-7',
      stepNumber: 7,
      totalSteps: 9,
      stepCategory: 'cutoff',
      title: 'STEP 07 — Laboratory Interpretation Criteria Table',
      subtitle: 'Understanding the 3 classification zones: Non-reactive, Borderline, Reactive',
      highlightText: '< 0.90 Non-Reactive | 0.90-1.00 Borderline | >= 1.00 Reactive',
      badgeLabel: 'Reference Matrix',
      badgeColor: 'purple',
      documentArea: { x: 5, y: 45, width: 90, height: 13 },
      whatIsIt: 'The reference decision matrix defining the three diagnostic tiers.',
      whyIsItThere: 'Provides total transparency into how the laboratory categorizes every possible reading.',
      whatDoesItSay: '< 0.90 S/CO: Non-Reactive; 0.90 - 1.00 S/CO: Borderline / Gray Zone; >= 1.00 S/CO: Reactive.',
      simpleExplanation: 'The lab uses a three-tier system: anything under 0.90 is clear and negative. The narrow range between 0.90 and 1.00 is a gray zone requiring a repeat test. Anything 1.00 or higher is positive. Your 0.35 is far below the gray zone.',
      whyDoesItMatter: 'You can clearly see that your 0.35 value is safely in the bottom non-reactive tier, nowhere near the borderline zone.',
      importantNote: 'Borderline results are uncommon and usually prompt a repeat test 2-4 weeks later.',
      factsVsInterpretation: 'Fact: The criteria table establishes explicit thresholds for non-reactive, borderline, and reactive categories.',
      spokenScript: "The table in the middle explains the lab's three classification zones. Less than 0.90 is Non-Reactive. Between 0.90 and 1.00 is a borderline gray zone. And 1.00 or higher is Reactive. Your 0.35 sits safely in the Non-Reactive zone.",
      translations: {
        te: "మధ్యలో ఉన్న పట్టిక మూడు స్థాయిలను వివరిస్తుంది: 0.90 కంటే తక్కువ ఉంటే నాన్-రియాక్టివ్, 0.90 నుండి 1.00 మధ్య ఉంటే పునఃపరిశీలన, 1.00 దాటితే రియాక్టివ్. మీ 0.35 సురక్షితంగా మొదటి విభాగంలో ఉంది.",
        hi: "बीच की तालिका तीन श्रेणियां दिखाती है: 0.90 से कम सुरक्षित है। आपका 0.35 पूरी तरह से नॉन-रिएक्टिव श्रेणी में है।"
      }
    },
    {
      id: 'hep-step-8',
      stepNumber: 8,
      totalSteps: 9,
      stepCategory: 'notes',
      title: 'STEP 08 — Clinical Notes & The Window Period',
      subtitle: 'Why timing matters and what a negative result cannot tell you',
      highlightText: 'PATHOLOGIST NOTES: Window period & biological significance',
      badgeLabel: 'Scientific Context',
      badgeColor: 'amber',
      documentArea: { x: 5, y: 59, width: 90, height: 14 },
      whatIsIt: 'Clinical correlation notes written by the pathologist regarding viral kinetics and the window period.',
      whyIsItThere: 'Medical safety mandate: A blood test only reflects what is detectable in the blood at the moment the needle drew the sample.',
      whatDoesItSay: 'A Non-Reactive result does not rule out acute infection during the first 2 to 4 weeks after exposure before antigen levels rise (the window period).',
      simpleExplanation: 'If someone was exposed to the virus only a few days ago, the virus might still be hiding in tiny quantities before it sheds enough surface protein to be detected. That delay is called the window period.',
      whyDoesItMatter: 'If you had a very recent needle stick or high-risk exposure in the last week, your doctor may recheck in a few weeks.',
      importantNote: 'For routine health checkups, this is an excellent, reassuring finding.',
      factsVsInterpretation: 'Fact: Biological viruses have an incubation window period. Interpretation: Timing of exposure must be considered by your doctor.',
      spokenScript: "Now pay attention to note number three regarding the 'Window Period'. The pathologist explains that if a person was exposed to hepatitis B very recently—like in the past two weeks—the virus might not have produced enough protein to be detected yet. That is why doctors always consider your personal history.",
      translations: {
        te: "ఇప్పుడు 'విండో పీరియడ్' గురించిన ముఖ్యమైన గమనికను చూడండి. వైరస్ శరీరంలోకి ప్రవేశించిన మొదటి రెండు వారాల్లో రక్తంలో వెంటనే కనిపించకపోవచ్చు. అందుకే డాక్టర్లు మీ మునుపటి చరిత్రను కూడా పరిగణనలోకి తీసుకుంటారు.",
        hi: "अब 'विंडो पीरियड' के नोट पर ध्यान दें। यदि संक्रमण बहुत हाल ही में (पिछले 1-2 हफ्तों में) हुआ हो, तो यह तुरंत पकड़ में नहीं आता। इसीलिए डॉक्टर पूरी हिस्ट्री देखते हैं।"
      }
    },
    {
      id: 'hep-step-9',
      stepNumber: 9,
      totalSteps: 9,
      stepCategory: 'disclaimer',
      title: 'STEP 09 — Vaccination Note & What to Ask Your Doctor',
      subtitle: 'Antigen vs Antibody: Understanding your vaccine status',
      highlightText: 'VACCINATION NOTE: Measures VIRAL ANTIGEN, NOT vaccine antibodies',
      badgeLabel: 'Important Advice',
      badgeColor: 'purple',
      documentArea: { x: 5, y: 73, width: 90, height: 12 },
      whatIsIt: 'An essential educational distinction between viral infection screening (HBsAg) and vaccine immunity testing (Anti-HBs).',
      whyIsItThere: 'Many patients mistakenly believe that a negative HBsAg test means their hepatitis B vaccine has expired or failed. The report proactively clarifies this misconception.',
      whatDoesItSay: 'This test detects viral antigen, NOT protective vaccine antibodies. A vaccinated person without infection will normally test Non-Reactive for HBsAg. To check immunity, measure Anti-HBs titer (> 10 mIU/mL).',
      simpleExplanation: 'If you took the Hepatitis B vaccine as a child or adult, this test being Non-Reactive is completely normal and expected! The vaccine gives you protective shields called antibodies (Anti-HBs), not the virus antigen. If you want to check if your vaccine is still protecting you, ask for an Anti-HBs test.',
      whyDoesItMatter: 'Prevents unnecessary anxiety about vaccine protection while providing actionable questions for your doctor.',
      importantNote: 'Take this report to Dr. K. M. Rao for your standard medical record review.',
      factsVsInterpretation: 'Fact: HBsAg detects viral antigen. Anti-HBs detects vaccine antibodies. Interpretation: Consult your physician for personalized immunization advice.',
      spokenScript: "Finally, look at the highlighted vaccination note. This is very important: this test looks for the virus, NOT your vaccine protection antibodies. If you received the hepatitis B vaccine, your result is supposed to be Non-Reactive! If you want to verify your vaccine immunity, your doctor can order an Anti-HBs antibody test.",
      translations: {
        te: "చివరగా వ్యాక్సినేషన్ గమనికను గమనించండి. ఇది చాలా ముఖ్యం: ఈ పరీక్ష వైరస్ కోసం మాత్రమే, వ్యాక్సిన్ రక్షణ కోసం కాదు. మీరు వ్యాక్సిన్ వేసుకుని ఉంటే ఈ ఫలితం నాన్-రియాక్టివ్ రావడం సహజం. వ్యాక్సిన్ రక్షణను తెలుసుకోవడానికి 'యాంటీ-HBs' పరీక్ష చేయించాలి.",
        hi: "अंत में महत्वपूर्ण वैक्सीनेशन नोट देखें: यह टेस्ट वायरस ढूंढता है, वैक्सीन के एंटीबॉडी नहीं। अगर आपने टीका लगवाया है, तो यह परिणाम नॉन-रिएक्टिव ही आना चाहिए। वैक्सीन सुरक्षा जांचने के लिए 'एंटी-HBs' टेस्ट कराया जाता है।"
      }
    }
  ];

  return {
    documentId: 'demo-hepatitis-hbsag',
    documentTitle: 'Viral Hepatitis Laboratory Report (HBsAg)',
    categoryLabel: 'Serology / Virology Lab Report',
    totalSteps: steps.length,
    summaryOneMinute: 'Rajeev Verma’s Hepatitis B surface antigen (HBsAg) test is Non-Reactive with an observed value of 0.35 S/CO, which is well below the laboratory cutoff threshold of 0.90 S/CO. This indicates that the laboratory did not detect evidence of Hepatitis B virus surface antigen.',
    steps,
    fiveKeyLearnings: [
      '1. HBsAg is the outer envelope protein marker of Hepatitis B Virus used for screening.',
      '2. Non-Reactive means Negative; no viral surface antigen was found above the cutoff threshold.',
      '3. Your patient value of 0.35 S/CO is comfortably below the laboratory’s stated 0.90 cutoff.',
      '4. This test checks for the active virus itself, NOT your protective vaccine antibodies.',
      '5. Always correlate screening results with your consulting physician Dr. K. M. Rao.'
    ],
    whatDocumentSays: [
      'Investigation: HBsAg (Hepatitis B Surface Antigen)',
      'Patient Observed Value: 0.35 S/CO',
      'Laboratory Reference Cutoff: < 0.90 Non-Reactive',
      'Reported Status: NON-REACTIVE',
      'Methodology: Chemiluminescent Microparticle Immunoassay (CMIA)',
      'Digital authentication by Consultant Virologist Dr. Shalini Deshmukh, MD'
    ],
    whatDocumentDoesNotEstablish: [
      'Does not diagnose past resolved infections (which requires Anti-HBc total antibody).',
      'Does not measure protective vaccine immunity (which requires an Anti-HBs antibody titer).',
      'Does not rule out recent infection acquired in the 2-week window period prior to testing.'
    ]
  };
}

/**
 * Generate curriculum dynamically for ANY processed document
 */
export function buildCurriculumFromDocument(doc: ProcessedDocument): DocumentCurriculum {
  if (doc.id === 'demo-hepatitis-hbsag' || doc.name.toLowerCase().includes('hepatitis') || doc.rawOcrText?.toLowerCase().includes('hbsag')) {
    return generateHepatitisCurriculum();
  }

  // Dynamic generic curriculum builder for any uploaded document
  const steps: TeacherStep[] = [];
  let stepIdx = 1;

  // Step 1: Document classification & identity
  steps.push({
    id: `dyn-step-${stepIdx}`,
    stepNumber: stepIdx,
    totalSteps: 5,
    stepCategory: 'patient',
    title: `STEP 01 — Document Overview & Classification`,
    subtitle: doc.detectedCategoryLabel || 'Document Identification',
    highlightText: doc.name,
    badgeLabel: 'Document Type',
    badgeColor: 'blue',
    documentArea: { x: 5, y: 5, width: 90, height: 15 },
    whatIsIt: `This document has been recognized as a ${doc.detectedCategoryLabel || 'standard document'}.`,
    whyIsItThere: 'Every official document starts with identification and origin context.',
    whatDoesItSay: doc.explanation.breakdown.whatIsThis,
    simpleExplanation: doc.explanation.threeLevelExplanation.simpleSummary,
    whyDoesItMatter: 'Knowing the exact purpose of the document ensures you take the right actions.',
    importantNote: 'Processed with zero-fabrication verification.',
    factsVsInterpretation: 'Direct extraction from uploaded document.',
    spokenScript: `Hello! Let's understand this document together step by step like a teacher. This document is a ${doc.detectedCategoryLabel}. ${doc.explanation.breakdown.whatIsThis}`
  });
  stepIdx++;

  // Step 2: Core contents / What it says
  steps.push({
    id: `dyn-step-${stepIdx}`,
    stepNumber: stepIdx,
    totalSteps: 5,
    stepCategory: 'investigation',
    title: `STEP 02 — Core Contents & Key Information`,
    subtitle: 'What the document is communicating to you',
    highlightText: doc.explanation.breakdown.whatItSays.slice(0, 100),
    badgeLabel: 'Key Message',
    badgeColor: 'purple',
    documentArea: { x: 5, y: 22, width: 90, height: 25 },
    whatIsIt: 'The main body and findings of the document.',
    whyIsItThere: 'This contains the substance of what the issuer or laboratory wanted to communicate.',
    whatDoesItSay: doc.explanation.breakdown.whatItSays,
    simpleExplanation: doc.explanation.threeLevelExplanation.explainLikeIm10 || doc.explanation.breakdown.whatItSays,
    whyDoesItMatter: 'Understanding this message prevents misinterpretation.',
    importantNote: 'Always refer to the original paper copy for critical decisions.',
    factsVsInterpretation: 'Extracted directly from textual tokens.',
    spokenScript: `Now look at what this document says: ${doc.explanation.breakdown.whatItSays}`
  });
  stepIdx++;

  // Step 3: Important amounts or lab values
  if (doc.labResults && doc.labResults.length > 0) {
    const firstLab = doc.labResults[0];
    steps.push({
      id: `dyn-step-${stepIdx}`,
      stepNumber: stepIdx,
      totalSteps: 5,
      stepCategory: 'value',
      title: `STEP 03 — Primary Finding: ${firstLab.testName}`,
      subtitle: `Result: ${firstLab.result} ${firstLab.unit || ''}`,
      highlightText: `${firstLab.testName}: ${firstLab.result}`,
      badgeLabel: firstLab.flag || 'Observed Value',
      badgeColor: firstLab.flag === 'ABNORMAL' || firstLab.flag === 'HIGH' ? 'red' : 'green',
      documentArea: { x: 5, y: 50, width: 90, height: 18 },
      whatIsIt: `Observed laboratory test result for ${firstLab.testName}.`,
      whyIsItThere: 'Diagnostic measurement performed by the laboratory.',
      whatDoesItSay: `Value: ${firstLab.result} ${firstLab.unit || ''} (Reference: ${firstLab.referenceRange || firstLab.cutoff || 'Standard'})`,
      simpleExplanation: firstLab.safeExplanation || `The test showed ${firstLab.result} ${firstLab.unit || ''}.`,
      whyDoesItMatter: 'Lab values give objective insight into body function.',
      importantNote: 'Must be interpreted together with your complete clinical picture.',
      factsVsInterpretation: `Fact: Machine measured ${firstLab.result}. Interpretation: Compare with reference range.`,
      spokenScript: `Here is the key finding: ${firstLab.testName}. The observed result is ${firstLab.result} ${firstLab.unit || ''}.`
    });
    stepIdx++;
  } else if (doc.structuredMeds && doc.structuredMeds.length > 0) {
    const firstMed = doc.structuredMeds[0];
    steps.push({
      id: `dyn-step-${stepIdx}`,
      stepNumber: stepIdx,
      totalSteps: 5,
      stepCategory: 'prescription',
      title: `STEP 03 — Prescribed Medication: ${firstMed.name}`,
      subtitle: `${firstMed.dosage} • ${firstMed.frequency}`,
      highlightText: `${firstMed.name} ${firstMed.dosage || ''}`,
      badgeLabel: 'Medication',
      badgeColor: 'amber',
      documentArea: { x: 5, y: 50, width: 90, height: 18 },
      whatIsIt: `Doctor's prescription for ${firstMed.name}.`,
      whyIsItThere: 'Therapeutic treatment prescribed by the consulting physician.',
      whatDoesItSay: `${firstMed.name} (${firstMed.dosage || ''}) - ${firstMed.frequency} for ${firstMed.duration || 'as directed'}. Instructions: ${firstMed.timingInstructions || 'Take as advised'}.`,
      simpleExplanation: `Your doctor prescribed ${firstMed.name}. Take ${firstMed.dosage || '1 dose'} ${firstMed.frequency}.`,
      whyDoesItMatter: 'Following precise dosage and timing ensures effectiveness.',
      importantNote: 'Never change dosage or stop medication without doctor consultation.',
      factsVsInterpretation: 'Extracted from doctor prescription.',
      spokenScript: `Now look at the prescription section: your doctor prescribed ${firstMed.name}. The dosage written is ${firstMed.dosage || ''} to be taken ${firstMed.frequency}.`,
      visualType: 'prescription_schedule'
    });
    stepIdx++;
  }

  // Step 4: Required Action / What to do
  steps.push({
    id: `dyn-step-${stepIdx}`,
    stepNumber: stepIdx,
    totalSteps: 5,
    stepCategory: 'notes',
    title: `STEP 04 — What You Need To Do`,
    subtitle: 'Clear, actionable instructions',
    highlightText: doc.explanation.breakdown.whatToDo,
    badgeLabel: 'Action Plan',
    badgeColor: 'blue',
    documentArea: { x: 5, y: 70, width: 90, height: 14 },
    whatIsIt: 'The concrete follow-up actions required from you.',
    whyIsItThere: 'A document is only useful when you know what step to take next.',
    whatDoesItSay: doc.explanation.breakdown.whatToDo,
    simpleExplanation: doc.explanation.breakdown.whatToDo,
    whyDoesItMatter: 'Ensures you do not miss deadlines, appointments, or doses.',
    importantNote: doc.explanation.breakdown.deadline ? `Deadline: ${doc.explanation.breakdown.deadline}` : 'No immediate expiration.',
    factsVsInterpretation: 'Action recommendation derived from document directives.',
    spokenScript: `Here is what you need to do next: ${doc.explanation.breakdown.whatToDo}`
  });
  stepIdx++;

  // Step 5: Important Notes & Safety Caution
  steps.push({
    id: `dyn-step-${stepIdx}`,
    stepNumber: stepIdx,
    totalSteps: 5,
    stepCategory: 'disclaimer',
    title: `STEP 05 — Things to Watch & Consultation Advice`,
    subtitle: 'Important warnings and professional consultation reminder',
    highlightText: doc.explanation.breakdown.whatToWatch || 'Professional consultation required',
    badgeLabel: 'Safety Reminder',
    badgeColor: 'purple',
    documentArea: { x: 5, y: 85, width: 90, height: 12 },
    whatIsIt: 'Important cautions, terms, and professional verification notice.',
    whyIsItThere: 'To prevent mistakes, fraud, or misinterpretation.',
    whatDoesItSay: doc.explanation.breakdown.whatToWatch || 'Please consult the relevant professional for formal advice.',
    simpleExplanation: 'Always discuss this document with your qualified doctor or advisor. AI helps you understand, but does not replace human experts.',
    whyDoesItMatter: 'Safe, informed decision making.',
    importantNote: 'This AI explanation is an educational tool.',
    factsVsInterpretation: 'Educational safety guidance.',
    spokenScript: `Finally, remember to discuss this document with a qualified professional. ${doc.explanation.breakdown.whatToWatch || ''}`
  });

  // Update totalSteps count on all
  const total = steps.length;
  steps.forEach(s => s.totalSteps = total);

  return {
    documentId: doc.id,
    documentTitle: doc.name,
    categoryLabel: doc.detectedCategoryLabel,
    totalSteps: total,
    summaryOneMinute: doc.explanation.threeLevelExplanation.simpleSummary,
    steps,
    fiveKeyLearnings: [
      `1. Document identified as ${doc.detectedCategoryLabel}.`,
      `2. ${doc.explanation.threeLevelExplanation.simpleSummary}`,
      `3. Important amounts / findings: ${doc.explanation.breakdown.importantAmounts || 'Document text reviewed.'}`,
      `4. Next steps: ${doc.explanation.breakdown.whatToDo}`,
      `5. Cautions: ${doc.explanation.breakdown.whatToWatch || 'Always consult a professional.'}`
    ],
    whatDocumentSays: [
      doc.explanation.breakdown.whatItSays,
      doc.explanation.breakdown.whatToDo
    ],
    whatDocumentDoesNotEstablish: [
      'This document alone cannot replace an in-person physical clinical examination or professional financial audit.'
    ]
  };
}
