import { SupportedLanguage } from '../types/medscript';

export interface UITranslation {
  // Navigation & Brand
  brandName: string;
  tagline: string;
  navHome: string;
  navDashboard: string;
  navPrescriptions: string;
  navDocuments: string;
  navPrivacy: string;
  navGetStarted: string;

  // Hero Section
  heroBadge: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  btnTryLiveDemo: string;
  btnHowItWorks: string;
  statZeroGuesswork: string;
  stat11Languages: string;
  statVerifiedSafe: string;
  trustPrivacyNotice: string;

  // Mascot & Badges
  mascotGreeting: string;
  mascotRole: string;
  mascotSpeakingNotice: string;
  tagDocsToSimple: string;
  tagSmallSteps: string;
  tagFeelConfident: string;
  book1: string;
  book2: string;
  book3: string;

  // Dual Cards
  cardATitle: string;
  cardASubtitle: string;
  cardAPoint1: string;
  cardAPoint2: string;
  cardAPoint3: string;
  cardABtn: string;
  cardAWarning: string;

  cardBTitle: string;
  cardBSubtitle: string;
  cardBPoint1: string;
  cardBPoint2: string;
  cardBPoint3: string;
  cardBBtn: string;
  cardBNotice: string;

  // Interactive Live Demo
  demoSectionBadge: string;
  demoSectionTitle: string;
  demoSectionSubtitle: string;
  tabPrescription: string;
  tabUtilityBill: string;
  tabGovNotice: string;
  colOriginalTitle: string;
  colExplanationTitle: string;
  colVoiceTitle: string;
  btnPlayVoice: string;
  btnPauseVoice: string;
  btnReplayVoice: string;
  subtitlesLabel: string;
  selectLanguagePrompt: string;

  // 3-Step Journey
  stepsBadge: string;
  stepsTitle: string;
  step1Number: string;
  step1Title: string;
  step1Desc: string;
  step2Number: string;
  step2Title: string;
  step2Desc: string;
  step3Number: string;
  step3Title: string;
  step3Desc: string;

  // Footer
  footerRights: string;
  footerMedicalDisclaimer: string;
}

export const UI_TRANSLATIONS: Record<SupportedLanguage, UITranslation> = {
  en: {
    brandName: "DocuEase AI",
    tagline: "Medical & Utility",
    navHome: "Home",
    navDashboard: "Select Document",
    navPrescriptions: "Prescriptions",
    navDocuments: "Documents",
    navPrivacy: "Privacy & Safety",
    navGetStarted: "Get Started",

    heroBadge: "AI Medical & Document Deciphering",
    heroHeadlinePrefix: "Confusing Documents?",
    heroHeadlineHighlight: "Let's Make Them Clear!",
    heroSubtitle: "Upload a prescription or a complicated document. Our AI helps explain it in simple words and your preferred language.",
    btnTryLiveDemo: "Try a Live Demo",
    btnHowItWorks: "How It Works",
    statZeroGuesswork: "Zero Guesswork",
    stat11Languages: "11 Indian Languages",
    statVerifiedSafe: "Pharmacist Verified",
    trustPrivacyNotice: "Private & confidential. Files are processed securely and never retained.",

    mascotGreeting: "Hi! I'm DocuBot, your friendly document guide!",
    mascotRole: "3D Health & Document Companion",
    mascotSpeakingNotice: "DocuBot is explaining in your chosen language...",
    tagDocsToSimple: "Docs → Simple Words",
    tagSmallSteps: "Small Steps, Big Clarity",
    tagFeelConfident: "Understand • Translate • Feel Confident",
    book1: "Better Health",
    book2: "Clearer Understanding",
    book3: "In Any Language",

    cardATitle: "Medical Handwritten Prescriptions",
    cardASubtitle: "Decipher cursive doctor handwriting, medicine dosages, and treatment instructions with zero guessing.",
    cardAPoint1: "Extracts handwritten medicine names, strengths & dosage timings (1-0-1, TDS, SOS)",
    cardAPoint2: "Instant alerts for duplicate paracetamol toxicity and drug-drug interactions",
    cardAPoint3: "Explicitly flags illegible strokes as 'Needs Pharmacist Verification'",
    cardABtn: "Try Prescription Demo",
    cardAWarning: "AI never replaces a licensed clinician. Always verify medication with a certified pharmacist.",

    cardBTitle: "Complex Documents Made Simple",
    cardBSubtitle: "Turn dense utility bills, official notices, bank letters, and lab reports into crystal clarity.",
    cardBPoint1: "Isolates total payable amounts, due dates, tariff breakdowns & late penalties",
    cardBPoint2: "Explains official and legal jargon in everyday conversational language",
    cardBPoint3: "Includes mandatory anti-fraud advisory: never share OTP, CVV, or passwords",
    cardBBtn: "Try Document Demo",
    cardBNotice: "Zero fabrication policy — numbers, dates, and names are extracted strictly as printed.",

    demoSectionBadge: "Interactive Live Demo",
    demoSectionTitle: "Test DocuEase AI Yourself",
    demoSectionSubtitle: "Choose a real document below, switch languages, and watch DocuBot explain it with live voice and subtitles!",
    tabPrescription: "💊 Doctor Prescription",
    tabUtilityBill: "⚡ Electricity Bill",
    tabGovNotice: "🏛️ Official Notice",
    colOriginalTitle: "1. Original Scanned Document",
    colExplanationTitle: "2. Plain-Language Explanation",
    colVoiceTitle: "3. Listen with DocuBot (3D Mascot)",
    btnPlayVoice: "Listen with DocuBot",
    btnPauseVoice: "Pause",
    btnReplayVoice: "Replay Speech",
    subtitlesLabel: "Live Synchronized Subtitles",
    selectLanguagePrompt: "Switch Language & Listen:",

    stepsBadge: "Simple 3-Step Process",
    stepsTitle: "How DocuEase AI Works",
    step1Number: "01",
    step1Title: "Upload Prescription or Doc",
    step1Desc: "Take a photo, upload a scan, or select a PDF. Every document format is accepted with zero rejection.",
    step2Number: "02",
    step2Title: "AI Deciphers & Simplifies",
    step2Desc: "Optical stroke recognition and clinical databases decode handwriting, tariffs, and deadlines without guessing.",
    step3Number: "03",
    step3Title: "Listen in Your Language",
    step3Desc: "Our cute 3D robot mascot speaks the explanation aloud in your mother tongue with synchronized subtitles.",

    footerRights: "DocuEase AI — Healthcare Accessibility & Linguistic Equity across India.",
    footerMedicalDisclaimer: "Notice: DocuEase AI simplifies complex language. Always confirm medical treatments with your doctor or pharmacist."
  },

  te: {
    brandName: "డాక్యుఈజ్ AI",
    tagline: "వైద్య & పత్రాల సహాయం",
    navHome: "హోమ్",
    navDashboard: "పత్రం ఎంచుకోండి",
    navPrescriptions: "ప్రిస్క్రిప్షన్లు",
    navDocuments: "పత్రాలు",
    navPrivacy: "గోప్యత & భద్రత",
    navGetStarted: "ప్రారంభించండి",

    heroBadge: "AI ఆధారిత వైద్య & పత్రాల విశ్లేషణ",
    heroHeadlinePrefix: "గందరగోళంగా ఉన్న పత్రాలా?",
    heroHeadlineHighlight: "వాటిని సులభంగా అర్థం చేసుకుందాం!",
    heroSubtitle: "డాక్టర్ ప్రిస్క్రిప్షన్ లేదా క్లిష్టమైన పత్రాన్ని అప్‌లోడ్ చేయండి. మా AI మీ మాతృభాషలో సులభమైన పదాలలో వివరిస్తుంది.",
    btnTryLiveDemo: "లైవ్ డెమో ప్రయత్నించండి",
    btnHowItWorks: "ఇది ఎలా పనిచేస్తుంది",
    statZeroGuesswork: "ఊహాగానాలు లేవు",
    stat11Languages: "11 భారతీయ భాషలు",
    statVerifiedSafe: "ఫార్మసిస్ట్ భద్రతా హెచ్చరికలు",
    trustPrivacyNotice: "పూర్తిగా ప్రైవేట్ & గోప్యమైనది. మీ పత్రాలు భద్రంగా ప్రాసెస్ చేయబడతాయి.",

    mascotGreeting: "నమస్కారం! నేను డాక్యుబాట్, మీ సహాయక స్నేహితుడిని!",
    mascotRole: "3D వైద్య & పత్రాల గైడ్",
    mascotSpeakingNotice: "డాక్యుబాట్ తెలుగులో స్పష్టంగా వివరిస్తోంది...",
    tagDocsToSimple: "పత్రాలు → సులభమైన మాటలు",
    tagSmallSteps: "చిన్న అడుగులు, పూర్తి స్పష్టత",
    tagFeelConfident: "అర్థం చేసుకోండి • అనువదించండి • ధైర్యంగా ఉండండి",
    book1: "మంచి ఆరోగ్యం",
    book2: "స్పష్టమైన అవగాహన",
    book3: "మీ భాషలోనే",

    cardATitle: "డాక్టర్ చేతిరాత ప్రిస్క్రిప్షన్లు",
    cardASubtitle: "డాక్టర్ల గీతలు, మందుల పేర్లు మరియు మోతాదులను (డ్రగ్ డోసేజ్) సులభంగా అర్థం చేసుకోండి.",
    cardAPoint1: "చేతిరాత మందుల పేర్లు & ఖచ్చితమైన సమయాలు (1-0-1, ఉదయం-రాత్రి, ఆహారం తర్వాత)",
    cardAPoint2: "ఒకే రకమైన మందులు (డోలో + కాంబిఫ్లామ్) కలిపి వాడితే వెంటనే హెచ్చరిస్తుంది",
    cardAPoint3: "అర్థం కాని చేతిరాతను 'ఫార్మసిస్ట్ నిర్ధారణ అవసరం' అని స్పష్టంగా సూచిస్తుంది",
    cardABtn: "ప్రిస్క్రిప్షన్ డెమో చూడండి",
    cardAWarning: "AI వైద్యుడి ప్రత్యామ్నాయం కాదు. మందులు వేసుకునే ముందు ఫార్మసిస్ట్‌తో నిర్ధారించుకోండి.",

    cardBTitle: "క్లిష్టమైన పత్రాలు - సులభ వివరణ",
    cardBSubtitle: "కరెంట్ బిల్లులు, ప్రభుత్వ నోటీసులు, బ్యాంక్ లేఖలను తేలికగా అర్థం చేసుకోండి.",
    cardBPoint1: "మొత్తం చెల్లించాల్సిన బకాయి, గడువు తేదీ, యూనిట్ల వివరాలు సులభంగా చూపిస్తుంది",
    cardBPoint2: "కఠినమైన చట్టపరమైన పదాలను రోజువారీ మాట్లాడే భాషలో వివరిస్తుంది",
    cardBPoint3: "మోసాల నివారణ హెచ్చరిక: ఎవరికీ మీ OTP లేదా పాస్‌వర్డ్ చెప్పకండి",
    cardBBtn: "పత్రాల డెమో చూడండి",
    cardBNotice: "ఖచ్చితమైన సమాచారం — పత్రంలో ఉన్న వివరాలు మాత్రమే చూపబడతాయి.",

    demoSectionBadge: "ప్రత్యక్ష డెమో అనుభవం",
    demoSectionTitle: "మీరే స్వయంగా ప్రయత్నించండి",
    demoSectionSubtitle: "కింద ఉన్న పత్రాన్ని ఎంచుకోండి, భాష మార్చండి మరియు 3D డాక్యుబాట్ వాయిస్‌తో వినండి!",
    tabPrescription: "💊 డాక్టర్ ప్రిస్క్రిప్షన్",
    tabUtilityBill: "⚡ కరెంట్ బిల్లు",
    tabGovNotice: "🏛️ ప్రభుత్వ నోటీసు",
    colOriginalTitle: "1. అసలు పత్రం",
    colExplanationTitle: "2. సులభమైన తెలుగు వివరణ",
    colVoiceTitle: "3. డాక్యుబాట్ వాయిస్ వివరణ (3D)",
    btnPlayVoice: "డాక్యుబాట్ ద్వారా వినండి",
    btnPauseVoice: "ఆపండి",
    btnReplayVoice: "మళ్ళీ వినండి",
    subtitlesLabel: "ప్రత్యక్ష తెలుగు ఉపశీర్షికలు (సబ్‌టైటిల్స్)",
    selectLanguagePrompt: "భాషను మార్చండి & వినండి:",

    stepsBadge: "3 సులభమైన దశలు",
    stepsTitle: "డాక్యుఈజ్ ఎలా పనిచేస్తుంది?",
    step1Number: "01",
    step1Title: "పత్రాన్ని అప్‌లోడ్ చేయండి",
    step1Desc: "ఫోటో తీయండి లేదా PDF అప్‌లోడ్ చేయండి. ఏ పత్రమైనా వెంటనే స్వీకరించబడుతుంది.",
    step2Number: "02",
    step2Title: "AI విశ్లేషించి సులభతరం చేస్తుంది",
    step2Desc: "చేతిరాత, మొత్తాలు మరియు తేదీలను ఖచ్చితంగా గుర్తిస్తుంది.",
    step3Number: "03",
    step3Title: "మీ భాషలో వినండి",
    step3Desc: "ముద్దుల 3D రోబోట్ మీ మాతృభాషలో స్పష్టమైన గొంతుతో వివరిస్తుంది.",

    footerRights: "డాక్యుఈజ్ AI — అందరికీ అర్థమయ్యే వైద్య & పత్రాల సాంకేతికత.",
    footerMedicalDisclaimer: "గమనిక: డాక్యుఈజ్ పత్రాలను సులభతరం చేస్తుంది. ఎల్లప్పుడూ వైద్యుడిని సంప్రదించండి."
  },

  hi: {
    brandName: "डॉक्यूईज़ AI",
    tagline: "चिकित्सा व दस्तावेज़ सहायता",
    navHome: "होम",
    navDashboard: "दस्तावेज़ चुनें",
    navPrescriptions: "पर्चे (प्रिस्क्रिप्शन)",
    navDocuments: "दस्तावेज़",
    navPrivacy: "गोपनीयता व सुरक्षा",
    navGetStarted: "शुरू करें",

    heroBadge: "AI आधारित चिकित्सा व दस्तावेज़ समाधान",
    heroHeadlinePrefix: "कठिन दस्तावेज़?",
    heroHeadlineHighlight: "आइए इन्हें आसान बनाएं!",
    heroSubtitle: "डॉक्टर का पर्चा या कोई भी कठिन दस्तावेज़ अपलोड करें। हमारा AI इसे सरल शब्दों और आपकी चुनी हुई भाषा में समझाता है।",
    btnTryLiveDemo: "लाइव डेमो देखें",
    btnHowItWorks: "यह कैसे काम करता है",
    statZeroGuesswork: "बिना किसी तुक्के के",
    stat11Languages: "11 भारतीय भाषाएं",
    statVerifiedSafe: "फार्मासिस्ट सत्यापन चेतावनी",
    trustPrivacyNotice: "पूर्णतः सुरक्षित व गोपनीय। आपकी फाइलें सुरक्षित रूप से प्रोसेस होती हैं।",

    mascotGreeting: "नमस्ते! मैं डॉक्यूबाट हूँ, आपका सहायक मित्र!",
    mascotRole: "3D स्वास्थ्य व दस्तावेज़ गाइड",
    mascotSpeakingNotice: "डॉक्यूबाट हिंदी में समझा रहा है...",
    tagDocsToSimple: "दस्तावेज़ → आसान शब्द",
    tagSmallSteps: "छोटे कदम, पूरी स्पष्टता",
    tagFeelConfident: "समझें • अनुवाद करें • निश्चिंत रहें",
    book1: "बेहतर स्वास्थ्य",
    book2: "स्पष्ट समझ",
    book3: "अपनी भाषा में",

    cardATitle: "डॉक्टर के हस्तलिखित पर्चे",
    cardASubtitle: "डॉक्टर की कठिन लिखावट, दवाइयों के नाम और खुराक के सही समय को बिना किसी भ्रांति के समझें।",
    cardAPoint1: "दवाइयों के नाम, ताकत और खुराक (1-0-1, सुबह-शाम, खाने के बाद) स्पष्ट करें",
    cardAPoint2: "दोहरी पैरासिटामोल या हानिकारक दवा अंतःक्रियाओं की तुरंत चेतावनी",
    cardAPoint3: "अस्पष्ट लिखावट को 'फार्मासिस्ट से जांच आवश्यक' के रूप में चिन्हित करता है",
    cardABtn: "पर्चे का डेमो देखें",
    cardAWarning: "AI डॉक्टर का विकल्प नहीं है। दवा लेने से पहले फार्मासिस्ट से जरूर पुष्टि करें।",

    cardBTitle: "जटिल दस्तावेज़ - सरल शब्दों में",
    cardBSubtitle: "बिजली के बिल, सरकारी नोटिस, बैंक पत्र और लैब रिपोर्ट को आसानी से समझें।",
    cardBPoint1: "कुल देय राशि, अंतिम तिथि, टैरिफ शुल्क और विलंब शुल्क को अलग से दिखाता है",
    cardBPoint2: "कानूनी व आधिकारिक भाषा को आम बोलचाल के सरल शब्दों में बदलता है",
    cardBPoint3: "धोखाधड़ी से बचाव: किसी के साथ भी अपना OTP या पासवर्ड साझा न करें",
    cardBBtn: "दस्तावेज़ डेमो देखें",
    cardBNotice: "सटीक जानकारी — केवल दस्तावेज़ में दर्ज वास्तविक विवरण ही प्रस्तुत किए जाते हैं।",

    demoSectionBadge: "इंटरैक्टिव लाइव डेमो",
    demoSectionTitle: "स्वयं आज़मा कर देखें",
    demoSectionSubtitle: "नीचे से दस्तावेज़ चुनें, भाषा बदलें और 3D डॉक्यूबाट को बोलते हुए सुनें!",
    tabPrescription: "💊 डॉक्टर का पर्चा",
    tabUtilityBill: "⚡ बिजली का बिल",
    tabGovNotice: "🏛️ सरकारी नोटिस",
    colOriginalTitle: "1. मूल स्कैन किया दस्तावेज़",
    colExplanationTitle: "2. सरल हिंदी व्याख्या",
    colVoiceTitle: "3. डॉक्यूबाट की आवाज़ में सुनें (3D)",
    btnPlayVoice: "डॉक्यूबाट की आवाज़ सुनें",
    btnPauseVoice: "रोकें",
    btnReplayVoice: "पुनः सुनें",
    subtitlesLabel: "लाइव हिंदी सबटाइटल",
    selectLanguagePrompt: "भाषा चुनें व सुनें:",

    stepsBadge: "3 आसान चरण",
    stepsTitle: "डॉक्यूईज़ कैसे काम करता है?",
    step1Number: "01",
    step1Title: "पर्चा या दस्तावेज़ अपलोड करें",
    step1Desc: "फोटो खींचें या PDF डालें। हर प्रकार का दस्तावेज़ स्वीकार किया जाता है।",
    step2Number: "02",
    step2Title: "AI समझता व सरल बनाता है",
    step2Desc: "हस्तलेख, तिथियां व जरूरी आंकड़े बिना किसी अनुमान के पढ़े जाते हैं।",
    step3Number: "03",
    step3Title: "अपनी भाषा में सुनें",
    step3Desc: "हमारा प्यारा 3D रोबोट आपकी भाषा में सबटाइटल के साथ बोलकर समझाता है।",

    footerRights: "डॉक्यूईज़ AI — भाषाई समानता और सुलभ स्वास्थ्य तकनीक।",
    footerMedicalDisclaimer: "नोट: डॉक्यूईज़ भाषा को आसान बनाता है। किसी भी इलाज से पहले डॉक्टर से परामर्श लें।"
  },

  ta: {
    brandName: "டாக்யூஈஸ் AI",
    tagline: "மருத்துவ & ஆவண வழிகாட்டி",
    navHome: "முகப்பு",
    navDashboard: "ஆவணத்தை தேர்வு செய்க",
    navPrescriptions: "மருத்துவ சீட்டுகள்",
    navDocuments: "ஆவணங்கள்",
    navPrivacy: "தனியுரிமை & பாதுகாப்பு",
    navGetStarted: "தொடங்குங்கள்",

    heroBadge: "AI மருத்துவ & ஆவண விளக்கம்",
    heroHeadlinePrefix: "குழப்பமான ஆவணங்களா?",
    heroHeadlineHighlight: "அவற்றை எளிதாக புரிந்துகொள்வோம்!",
    heroSubtitle: "மருத்துவர் சீட்டு அல்லது சிக்கலான ஆவணத்தை பதிவேற்றுங்கள். எங்கள் AI உங்கள் தாய்மொழியில் எளிய வார்த்தைகளில் விளக்குகிறது.",
    btnTryLiveDemo: "நேரடி டெமோ காண்க",
    btnHowItWorks: "இது எவ்வாறு இயங்குகிறது",
    statZeroGuesswork: "ஊகங்கள் இல்லை",
    stat11Languages: "11 இந்திய மொழிகள்",
    statVerifiedSafe: "மருந்தாளர் பாதுகாப்பு எச்சரிக்கை",
    trustPrivacyNotice: "முழுமையான தனியுரிமை. உங்கள் ஆவணங்கள் பாதுகாப்பாக செயலாக்கப்படுகின்றன.",

    mascotGreeting: "வணக்கம்! நான் டாக்யூபாட், உங்கள் உதவியாளன்!",
    mascotRole: "3D மருத்துவ & ஆவண வழிகாட்டி",
    mascotSpeakingNotice: "டாக்யூபாட் தமிழில் அழகாக விளக்குகிறது...",
    tagDocsToSimple: "ஆவணங்கள் → எளிய சொற்கள்",
    tagSmallSteps: "சிறு அடிகள், முழு தெளிவு",
    tagFeelConfident: "புரிந்துகொள்ளுங்கள் • மொழியாக்கம் • நம்பிக்கையுடன் இருங்கள்",
    book1: "சிறந்த நல்வாழ்வு",
    book2: "தெளிவான புரிதல்",
    book3: "உங்கள் மொழியில்",

    cardATitle: "மருத்துவரின் கையெழுத்து சீட்டுகள்",
    cardASubtitle: "மருத்துவரின் கையெழுத்து, மருந்துகளின் பெயர்கள் மற்றும் உட்கொள்ளும் முறைகளை எளிதில் அறியலாம்.",
    cardAPoint1: "மருந்துகளின் பெயர்கள் மற்றும் நேரங்கள் (1-0-1, உணவுக்குப் பின்) துல்லியமாக",
    cardAPoint2: "ஒரே வகையான மருந்துகளை உட்கொண்டால் உடனடி எச்சரிக்கை",
    cardAPoint3: "புரியாத கையெழுத்தை 'மருந்தாளரிடம் உறுதிப்படுத்தவும்' என தெளிவாகக் காட்டும்",
    cardABtn: "மருத்துவ சீட்டு டெமோ",
    cardAWarning: "AI மருத்துவருக்கு மாற்று அல்ல. மருந்துகளை எடுக்கும் முன் மருந்தாளரிடம் சரிபார்க்கவும்.",

    cardBTitle: "கடினமான ஆவணங்கள் - எளிய விளக்கம்",
    cardBSubtitle: "மின்சார கட்டணங்கள், அரசு அறிவிப்புகள், வங்கி கடிதங்களை சுலபமாக புரிந்துகொள்ளுங்கள்.",
    cardBPoint1: "செலுத்த வேண்டிய தொகை, கடைசி தேதி, கட்டண விவரங்கள் தனியாகப் பிரிக்கப்படும்",
    cardBPoint2: "சட்ட மற்றும் அரசு சொற்களை அன்றாட பேச்சுத் தமிழில் விளக்குகிறது",
    cardBPoint3: "மோசடி எச்சரிக்கை: உங்கள் OTP அல்லது கடவுச்சொல்லை யாரிடமும் பகிராதீர்கள்",
    cardBBtn: "ஆவண டெமோ காண்க",
    cardBNotice: "துல்லியமான தகவல் — ஆவணத்தில் உள்ள உண்மைகள் மட்டுமே காட்டப்படும்.",

    demoSectionBadge: "நேரடி செயல்முறை டெமோ",
    demoSectionTitle: "நீங்களே முயற்சி செய்து பாருங்கள்",
    demoSectionSubtitle: "கீழே உள்ள ஆவணத்தை தேர்வு செய்து, மொழியை மாற்றி 3D டாக்யூபாட் குரலில் கேளுங்கள்!",
    tabPrescription: "💊 மருத்துவ சீட்டு",
    tabUtilityBill: "⚡ மின்சார கட்டணம்",
    tabGovNotice: "🏛️ அரசு அறிவிப்பு",
    colOriginalTitle: "1. அசல் ஆவணம்",
    colExplanationTitle: "2. எளிய தமிழ் விளக்கம்",
    colVoiceTitle: "3. டாக்யூபாட் குரல் விளக்கம் (3D)",
    btnPlayVoice: "டாக்யூபாட் மூலம் கேட்க",
    btnPauseVoice: "நிறுத்து",
    btnReplayVoice: "மீண்டும் கேட்க",
    subtitlesLabel: "நேரடி தமிழ் சப்-டைட்டில்கள்",
    selectLanguagePrompt: "மொழியை மாற்றி கேளுங்கள்:",

    stepsBadge: "3 எளிய படிகள்",
    stepsTitle: "டாக்யூஈஸ் எவ்வாறு செயல்படுகிறது?",
    step1Number: "01",
    step1Title: "ஆவணத்தை பதிவேற்றவும்",
    step1Desc: "புகைப்படம் அல்லது PDF ஐ பதிவேற்றுங்கள். அனைத்து ஆவணங்களும் ஏற்கப்படும்.",
    step2Number: "02",
    step2Title: "AI படித்து எளிதாக்குகிறது",
    step2Desc: "கையெழுத்து மற்றும் முக்கிய எண்கள் துல்லியமாக படிக்கப்படுகின்றன.",
    step3Number: "03",
    step3Title: "உங்கள் மொழியில் கேட்கவும்",
    step3Desc: "எங்கள் 3D ரோபோ உங்கள் தாய்மொழியில் பேசிக் காட்டும்.",

    footerRights: "டாக்யூஈஸ் AI — அனைவருக்கும் சமமான மருத்துவ புரிதல்.",
    footerMedicalDisclaimer: "குறிப்பு: டாக்யூஈஸ் ஆவணங்களை எளிதாக்குகிறது. சிகிச்சைக்கு மருத்துவரை அணுகவும்."
  },

  kn: {
    brandName: "ಡಾಕ್ಯುಈಸ್ AI",
    tagline: "ವೈದ್ಯಕೀಯ & ದಾಖಲೆ ನೆರವು",
    navHome: "ಮುಖಪುಟ",
    navDashboard: "ದಾಖಲೆ ಆಯ್ಕೆಮಾಡಿ",
    navPrescriptions: "ವೈದ್ಯರ ಚೀಟಿಗಳು",
    navDocuments: "ದಾಖಲೆಗಳು",
    navPrivacy: "ಗೌಪ್ಯತೆ & ಭದ್ರತೆ",
    navGetStarted: "ಪ್ರಾರಂಭಿಸಿ",

    heroBadge: "AI ಆಧಾರಿತ ವೈದ್ಯಕೀಯ & ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆ",
    heroHeadlinePrefix: "ಗೊಂದಲಮಯ ದಾಖಲೆಗಳೇ?",
    heroHeadlineHighlight: "ಅವುಗಳನ್ನು ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳೋಣ!",
    heroSubtitle: "ವೈದ್ಯರ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಅಥವಾ ಕಠಿಣ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ನಮ್ಮ AI ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಸರಳವಾಗಿ ವಿವರಿಸುತ್ತದೆ.",
    btnTryLiveDemo: "ಲೈವ್ ಡೆಮೊ ಪ್ರಯತ್ನಿಸಿ",
    btnHowItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    statZeroGuesswork: "ಯಾವುದೇ ಊಹೆಗಳಿಲ್ಲ",
    stat11Languages: "11 ಭಾರತೀಯ ಭಾಷೆಗಳು",
    statVerifiedSafe: "ಫಾರ್ಮಾಸಿಸ್ಟ್ ಭದ್ರತಾ ಎಚ್ಚರಿಕೆ",
    trustPrivacyNotice: "ಸಂಪೂರ್ಣ ಖಾಸಗಿ & ಸುರಕ್ಷಿತ. ನಿಮ್ಮ ಕಡತಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತದೆ.",

    mascotGreeting: "ನಮಸ್ಕಾರ! ನಾನು ಡಾಕ್ಯುಬಾಟ್, ನಿಮ್ಮ ಸಹಾಯಕ ಸ್ನೇಹಿತ!",
    mascotRole: "3D ಆರೋಗ್ಯ & ದಾಖಲೆ ಮಾರ್ಗದರ್ಶಿ",
    mascotSpeakingNotice: "ಡಾಕ್ಯುಬಾಟ್ ಕನ್ನಡದಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸುತ್ತಿದೆ...",
    tagDocsToSimple: "ದಾಖಲೆಗಳು → ಸರಳ ಮಾತುಗಳು",
    tagSmallSteps: "ಸಣ್ಣ ಹೆಜ್ಜೆಗಳು, ಸಂಪೂರ್ಣ ಸ್ಪಷ್ಟತೆ",
    tagFeelConfident: "ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ • ಅನುವಾದಿಸಿ • ಧೈರ್ಯವಾಗಿರಿ",
    book1: "ಉತ್ತಮ ಆರೋಗ್ಯ",
    book2: "ಸ್ಪಷ್ಟ ತಿಳುವಳಿಕೆ",
    book3: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲೇ",

    cardATitle: "ವೈದ್ಯರ ಕೈಬರಹದ ಚೀಟಿಗಳು",
    cardASubtitle: "ವೈದ್ಯರ ಕೈಬರಹ, ಔಷಧಿಗಳ ಹೆಸರುಗಳು ಮತ್ತು ಸೇವಿಸುವ ಸಮಯವನ್ನು ಸರಳವಾಗಿ ತಿಳಿಯಿರಿ.",
    cardAPoint1: "ಔಷಧಗಳ ಹೆಸರುಗಳು & ನಿಖರ ಸಮಯ (1-0-1, ಊಟದ ನಂತರ)",
    cardAPoint2: "ಒಂದೇ ಬಗೆಯ ಔಷಧಿಗಳ ಅಪಾಯಕಾರಿ ಬಳಕೆಯ ತಕ್ಷಣದ ಎಚ್ಚರಿಕೆ",
    cardAPoint3: "ಅಸ್ಪಷ್ಟ ಕೈಬರಹವನ್ನು 'ಫಾರ್ಮಾಸಿಸ್ಟ್ ಪರಿಶೀಲನೆ ಅಗತ್ಯ' ಎಂದು ಸೂಚಿಸುತ್ತದೆ",
    cardABtn: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಡೆಮೊ ನೋಡಿ",
    cardAWarning: "AI ವೈದ್ಯರ ಪರ್ಯಾಯವಲ್ಲ. ಔಷಧ ತೆಗೆದುಕೊಳ್ಳುವ ಮುನ್ನ ಫಾರ್ಮಾಸಿಸ್ಟ್ ಬಳಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",

    cardBTitle: "ಸಂಕೀರ್ಣ ದಾಖಲೆಗಳು - ಸರಳ ವಿವರಣೆ",
    cardBSubtitle: "ವಿದ್ಯುತ್ ಬಿಲ್‌ಗಳು, ಸರ್ಕಾರಿ ನೋಟಿಸ್‌ಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್ ಪತ್ರಗಳನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    cardBPoint1: "ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ, ಕೊನೆಯ ದಿನಾಂಕ ಮತ್ತು ಶುಲ್ಕಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸುತ್ತದೆ",
    cardBPoint2: "ಕಾನೂನು ಮತ್ತು ಅಧಿಕೃತ ಪದಗಳನ್ನು ದಿನನಿತ್ಯದ ಆಡುಮಾತಿನಲ್ಲಿ ವಿವರಿಸುತ್ತದೆ",
    cardBPoint3: "ವಂಚನೆ ತಡೆ ಎಚ್ಚರಿಕೆ: ನಿಮ್ಮ OTP ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ",
    cardBBtn: "ದಾಖಲೆ ಡೆಮೊ ನೋಡಿ",
    cardBNotice: "ನಿಖರ ಮಾಹಿತಿ — ದಾಖಲೆಯಲ್ಲಿರುವ ನೈಜ ವಿವರಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸಲಾಗುತ್ತದೆ.",

    demoSectionBadge: "ನೇರ ಡೆಮೊ ಅನುಭವ",
    demoSectionTitle: "ನೀವೇ ಸ್ವತಃ ಪ್ರಯತ್ನಿಸಿ",
    demoSectionSubtitle: "ಕೆಳಗಿನ ದಾಖಲೆ ಆರಿಸಿ, ಭಾಷೆ ಬದಲಾಯಿಸಿ ಮತ್ತು 3D ಡಾಕ್ಯುಬಾಟ್ ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ!",
    tabPrescription: "💊 ವೈದ್ಯರ ಚೀಟಿ",
    tabUtilityBill: "⚡ ಕರೆಂಟ್ ಬಿಲ್",
    tabGovNotice: "🏛️ ಸರ್ಕಾರಿ ನೋಟಿಸ್",
    colOriginalTitle: "1. ಮೂಲ ದಾಖಲೆ",
    colExplanationTitle: "2. ಸರಳ ಕನ್ನಡ ವಿವರಣೆ",
    colVoiceTitle: "3. ಡಾಕ್ಯುಬಾಟ್ ಧ್ವನಿ ವಿವರಣೆ (3D)",
    btnPlayVoice: "ಡಾಕ್ಯುಬಾಟ್ ಧ್ವನಿ ಕೇಳಿ",
    btnPauseVoice: "ವಿರಾಮ",
    btnReplayVoice: "ಮತ್ತೆ ಕೇಳಿ",
    subtitlesLabel: "ನೇರ ಕನ್ನಡ ಉಪಶೀರ್ಷಿಕೆಗಳು",
    selectLanguagePrompt: "ಭಾಷೆ ಬದಲಾಯಿಸಿ & ಕೇಳಿ:",

    stepsBadge: "3 ಸರಳ ಹಂತಗಳು",
    stepsTitle: "ಡಾಕ್ಯುಈಸ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?",
    step1Number: "01",
    step1Title: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    step1Desc: "ಫೋಟೋ ಅಥವಾ PDF ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಎಲ್ಲಾ ದಾಖಲೆಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ.",
    step2Number: "02",
    step2Title: "AI ವಿಶ್ಲೇಷಿಸಿ ಸರಳಗೊಳಿಸುತ್ತದೆ",
    step2Desc: "ಕೈಬರಹ ಮತ್ತು ಪ್ರಮುಖ ಅಂಕಿಅಂಶಗಳನ್ನು ನಿಖರವಾಗಿ ಓದಲಾಗುತ್ತದೆ.",
    step3Number: "03",
    step3Title: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಆಲಿಸಿ",
    step3Desc: "ಮುದ್ದಾದ 3D ರೋಬೋಟ್ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ವಿವರಿಸುತ್ತದೆ.",

    footerRights: "ಡಾಕ್ಯುಈಸ್ AI — ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಸುಲಭ ವೈದ್ಯಕೀಯ ತಿಳುವಳಿಕೆ.",
    footerMedicalDisclaimer: "ಸೂಚನೆ: ಡಾಕ್ಯುಈಸ್ ದಾಖಲೆಗಳನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ. ಯಾವಾಗಲೂ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ."
  },

  ml: {
    brandName: "ഡോക്യൂഈസ് AI",
    tagline: "മെഡിക്കൽ & ഡോക്യുമെന്റ് ഗൈഡ്",
    navHome: "ഹോം",
    navDashboard: "രേഖ തിരഞ്ഞെടുക്കുക",
    navPrescriptions: "പ്രിസ്ക്രിപ്ഷനുകൾ",
    navDocuments: "രേഖകൾ",
    navPrivacy: "സ്വകാര്യത & സുരക്ഷ",
    navGetStarted: "തുടങ്ങുക",

    heroBadge: "AI അധിഷ്ഠിത മെഡിക്കൽ & ഡോക്യുമെന്റ് ഗൈഡ്",
    heroHeadlinePrefix: "സങ്കീർണ്ണമായ രേഖകളോ?",
    heroHeadlineHighlight: "നമുക്കിത് എളുപ്പത്തിൽ മനസ്സിലാക്കാം!",
    heroSubtitle: "ഡോക്ടറുടെ കുറിപ്പടിയോ സങ്കീർണ്ണമായ രേഖയോ നൽകുക. ഞങ്ങളുടെ AI നിങ്ങളുടെ ഭാഷയിൽ ലളിതമായി വിശദീകരിക്കും.",
    btnTryLiveDemo: "ഡെമോ കാണുക",
    btnHowItWorks: "പ്രവർത്തനം എങ്ങനെ",
    statZeroGuesswork: "ഊഹങ്ങളില്ല",
    stat11Languages: "11 ഇന്ത്യൻ ഭാഷകൾ",
    statVerifiedSafe: "ഫാർമസിസ്റ്റ് സുരക്ഷാ നിർദ്ദേശം",
    trustPrivacyNotice: "പൂർണ്ണമായും സുരക്ഷിതം. നിങ്ങളുടെ വിവരങ്ങൾ രഹസ്യമായി സൂക്ഷിക്കുന്നു.",

    mascotGreeting: "നമസ്കാരം! ഞാൻ ഡോക്യുബോട്ട്, നിങ്ങളുടെ സഹായി!",
    mascotRole: "3D ആരോഗ്യ & ഡോക്യുമെന്റ് ഗൈഡ്",
    mascotSpeakingNotice: "ഡോക്യുബോട്ട് മലയാളത്തിൽ സംസാരിക്കുന്നു...",
    tagDocsToSimple: "രേഖകൾ → ലളിതമായ വാക്കുകൾ",
    tagSmallSteps: "ചെറിയ ചുവടുകൾ, വലിയ വ്യക്തത",
    tagFeelConfident: "മനസ്സിലാക്കുക • വിവർത്തനം • ആത്മവിശ്വാസം",
    book1: "നല്ല ആരോഗ്യം",
    book2: "വ്യക്തമായ അറിവ്",
    book3: "നിങ്ങളുടെ ഭാഷയിൽ",

    cardATitle: "ഡോക്ടറുടെ കുറിപ്പടികൾ (Prescriptions)",
    cardASubtitle: "കൈയെഴുത്തും മരുന്നുകളുടെ വിവരങ്ങളും കൃത്യമായി മനസ്സിലാക്കാം.",
    cardAPoint1: "മരുന്നുകളുടെ പേരുകളും കഴിക്കേണ്ട സമയവും (1-0-1, ഭക്ഷണ ശേഷം)",
    cardAPoint2: "ഒരേ തരം മരുന്നുകൾ ഒന്നിച്ചു കഴിക്കുന്നതിന്റെ അപകട മുന്നറിയിപ്പ്",
    cardAPoint3: "വ്യക്തമല്ലാത്ത കൈയെഴുത്തിന് 'ഫാർമസിസ്റ്റിന്റെ സ്ഥിരീകരണം വേണം' എന്ന് കാട്ടുന്നു",
    cardABtn: "കുറിപ്പടി ഡെമോ കാണുക",
    cardAWarning: "AI ഡോക്ടർക്ക് പകരമല്ല. മരുന്ന് കഴിക്കുന്നതിന് മുൻപ് ഫാർമസിസ്റ്റുമായി സംസാരിക്കുക.",

    cardBTitle: "സങ്കീർണ്ണ രേഖകൾ - ലളിത രൂപത്തിൽ",
    cardBSubtitle: "വൈദ്യുതി ബില്ലുകൾ, സർക്കാർ അറിയിപ്പുകൾ, ബാങ്ക് കത്തുകൾ എളുപ്പത്തിൽ വായിക്കാം.",
    cardBPoint1: "അടയ്ക്കാനുള്ള തുക, അവസാന തീയതി എന്നിവ കൃത്യമായി കാണിക്കുന്നു",
    cardBPoint2: "കഠിനമായ വാക്കുകൾ സാധാരണ സംസാരഭാഷയിൽ വിശദീകരിക്കുന്നു",
    cardBPoint3: "തട്ടിപ്പ് മുന്നറിയിപ്പ്: OTP അല്ലെങ്കിൽ പാസ്‌വേഡ് ആരോടും പറയരുത്",
    cardBBtn: "ഡോക്യുമെന്റ് ഡെമോ കാണുക",
    cardBNotice: "കൃത്യമായ വിവരം — രേഖയിലുള്ള യഥാർത്ഥ വിവരങ്ങൾ മാത്രം നൽകുന്നു.",

    demoSectionBadge: "തത്സമയ ഡെമോ",
    demoSectionTitle: "നിങ്ങൾ സ്വയം പരീക്ഷിക്കൂ",
    demoSectionSubtitle: "രേഖ തിരഞ്ഞെടുത്ത് 3D ഡോക്യുബോട്ടിന്റെ ശബ്ദത്തിൽ കേൾക്കൂ!",
    tabPrescription: "💊 കുറിപ്പടി",
    tabUtilityBill: "⚡ കറന്റ് ബിൽ",
    tabGovNotice: "🏛️ സർക്കാർ നോട്ടീസ്",
    colOriginalTitle: "1. യഥാർത്ഥ രേഖ",
    colExplanationTitle: "2. ലളിതമായ മലയാള വിശദീകരണം",
    colVoiceTitle: "3. ഡോക്യുബോട്ട് ശബ്ദ വിശദീകരണം (3D)",
    btnPlayVoice: "ശബ്ദം കേൾക്കുക",
    btnPauseVoice: "നിർത്തുക",
    btnReplayVoice: "വീണ്ടും കേൾക്കുക",
    subtitlesLabel: "തത്സമയ മലയാളം സബ്‌ടൈറ്റിലുകൾ",
    selectLanguagePrompt: "ഭാഷ മാറ്റി കേൾക്കൂ:",

    stepsBadge: "3 ലളിതമായ ഘട്ടങ്ങൾ",
    stepsTitle: "ഡോക്യൂഈസ് എങ്ങനെ പ്രവർത്തിക്കുന്നു?",
    step1Number: "01",
    step1Title: "രേഖ അപ്‌ലോഡ് ചെയ്യുക",
    step1Desc: "ഫോട്ടോയോ PDF ഫയലോ നൽകുക. ഏതു രേഖയും സ്വീകരിക്കും.",
    step2Number: "02",
    step2Title: "AI പരിശോധിച്ച് ലളിതമാക്കുന്നു",
    step2Desc: "കൈയെഴുത്തും തീയതികളും കൃത്യമായി വായിച്ചെടുക്കുന്നു.",
    step3Number: "03",
    step3Title: "നിങ്ങളുടെ ഭാഷയിൽ കേൾക്കുക",
    step3Desc: "സുന്ദരനായ 3D റോബോട്ട് നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ സംസാരിച്ചു തരും.",

    footerRights: "ഡോക്യൂഈസ് AI — എല്ലാവർക്കും തുല്യമായ ആരോഗ്യ അറിവ്.",
    footerMedicalDisclaimer: "ശ്രദ്ധിക്കുക: ഡോക്യൂഈസ് രേഖകൾ ലളിതമാക്കുന്നു. ചികിത്സയ്ക്ക് ഡോക്ടറെ സമീപിക്കുക."
  },

  bn: {
    brandName: "ডকুইজ AI",
    tagline: "মেডিকেল ও নথি সহায়ক",
    navHome: "হোম",
    navDashboard: "নথি নির্বাচন",
    navPrescriptions: "প্রেসক্রিপশন",
    navDocuments: "নথিপত্র",
    navPrivacy: "গোপনীয়তা ও নিরাপত্তা",
    navGetStarted: "শুরু করুন",

    heroBadge: "AI চালিত চিকিৎসা ও নথি সহজীকরণ",
    heroHeadlinePrefix: "জটিল নথিপত্র?",
    heroHeadlineHighlight: "চলুন সহজভাবে বুঝি!",
    heroSubtitle: "প্রেসক্রিপশন বা কোনো কঠিন নথি আপলোড করুন। আমাদের AI আপনার নিজের ভাষায় সহজ করে বুঝিয়ে দেবে।",
    btnTryLiveDemo: "লাইভ ডেমো দেখুন",
    btnHowItWorks: "কীভাবে কাজ করে",
    statZeroGuesswork: "কোনো অনুমান নয়",
    stat11Languages: "১১টি ভারতীয় ভাষা",
    statVerifiedSafe: "ফার্মাসিস্ট যাচাইকরণ সতর্কতা",
    trustPrivacyNotice: "সম্পূর্ণ নিরাপদ ও গোপনীয়। আপনার নথি নিরাপদে প্রক্রিয়াজাত হয়।",

    mascotGreeting: "নমস্কার! আমি ডকুবাট, আপনার সহায়ক বন্ধু!",
    mascotRole: "3D স্বাস্থ্য ও নথি গাইড",
    mascotSpeakingNotice: "ডকুবাট বাংলায় সহজভাবে বোঝাচ্ছে...",
    tagDocsToSimple: "নথি → সহজ শব্দ",
    tagSmallSteps: "ছোট পদক্ষেপ, পরিষ্কার ধারণা",
    tagFeelConfident: "বুঝুন • অনুবাদ করুন • নিশ্চিন্ত থাকুন",
    book1: "সুস্বাস্থ্য",
    book2: "স্পষ্ট ধারণা",
    book3: "নিজের ভাষায়",

    cardATitle: "হাতে লেখা প্রেসক্রিপশন",
    cardASubtitle: "ডাক্তারের হাতের লেখা ও ওষুধের নিয়মাবলী সহজে বুঝুন।",
    cardAPoint1: "ওষুধের নাম ও সেবনের সঠিক সময় (১-০-১, খাবারের পরে)",
    cardAPoint2: "একই ওষুধ অতিরিক্ত সেবনের তাৎক্ষণিক সতর্কতা",
    cardAPoint3: "অস্পষ্ট লেখাকে 'ফার্মাসিস্ট দ্বারা যাচাই প্রয়োজন' হিসেবে দেখায়",
    cardABtn: "প্রেসক্রিপশন ডেমো দেখুন",
    cardAWarning: "AI চিকিৎসকের বিকল্প নয়। ওষুধ সেবনের আগে ফার্মাসিস্টের পরামর্শ নিন।",

    cardBTitle: "জটিল নথি - সহজ কথায়",
    cardBSubtitle: "বিদ্যুৎ বিল, সরকারি নোটিশ ও ব্যাংকের চিঠি সহজে বুঝে নিন।",
    cardBPoint1: "মোট দেয় টাকা, শেষ তারিখ ও অতিরিক্ত ফি পরিষ্কারভাবে দেখায়",
    cardBPoint2: "আইনি ও সরকারি পরিভাষা সাধারণ কথ্য ভাষায় রূপান্তর করে",
    cardBPoint3: "প্রতারণা প্রতিরোধ: কোনোভাবেই OTP বা পাসওয়ার্ড শেয়ার করবেন না",
    cardBBtn: "নথি ডেমো দেখুন",
    cardBNotice: "সঠিক তথ্য — নথিতে যা আছে শুধুমাত্র তাই পরিবেশন করা হয়।",

    demoSectionBadge: "ইন্টারেক্টিভ ডেমো",
    demoSectionTitle: "নিজে পরখ করে দেখুন",
    demoSectionSubtitle: "নথি নির্বাচন করুন, ভাষা পরিবর্তন করুন এবং 3D ডকুবাটের মুখে শুনুন!",
    tabPrescription: "💊 প্রেসক্রিপশন",
    tabUtilityBill: "⚡ বিদ্যুৎ বিল",
    tabGovNotice: "🏛️ সরকারি নোটিশ",
    colOriginalTitle: "১. মূল স্ক্যান করা নথি",
    colExplanationTitle: "২. সহজ বাংলা ব্যাখ্যা",
    colVoiceTitle: "৩. ডকুবাটের গলায় শুনুন (3D)",
    btnPlayVoice: "ডকুবাটের কণ্ঠে শুনুন",
    btnPauseVoice: "থামুন",
    btnReplayVoice: "পুনরায় শুনুন",
    subtitlesLabel: "লাইভ বাংলা সাবটাইটেল",
    selectLanguagePrompt: "ভাষা নির্বাচন করে শুনুন:",

    stepsBadge: "৩টি সহজ ধাপ",
    stepsTitle: "ডকুইজ কীভাবে কাজ করে?",
    step1Number: "০১",
    step1Title: "নথি আপলোড করুন",
    step1Desc: "ছবি তুলুন বা PDF ফাইল দিন। সব ধরনের নথি গৃহীত হয়।",
    step2Number: "০২",
    step2Title: "AI পড়ে সহজ করে",
    step2Desc: "হাতের লেখা এবং গুরুত্বপূর্ণ তথ্য নির্ভুলভাবে উদ্ধার করা হয়।",
    step3Number: "০৩",
    step3Title: "নিজের ভাষায় শুনুন",
    step3Desc: "আমাদের মিষ্টি 3D রোবট আপনার ভাষায় কথা বলে বুঝিয়ে দেয়।",

    footerRights: "ডকুইজ AI — সবার জন্য সহজ স্বাস্থ্য প্রযুক্তি।",
    footerMedicalDisclaimer: "মনে রাখবেন: ডকুইজ ভাষা সহজ করে। চিকিৎসার জন্য সর্বদা ডাক্তারের পরামর্শ নিন।"
  },

  mr: {
    brandName: "डॉक्यूईज AI",
    tagline: "वैद्यकीय व दस्तऐवज मार्गदर्शक",
    navHome: "होम",
    navDashboard: "दस्तऐवज निवडा",
    navPrescriptions: "प्रिस्क्रिप्शन",
    navDocuments: "दस्तऐवज",
    navPrivacy: "गोपनीयता व सुरक्षा",
    navGetStarted: "सुरू करा",

    heroBadge: "AI आधारित वैद्यकीय व दस्तऐवज सहाय्य",
    heroHeadlinePrefix: "कठीण दस्तऐवज?",
    heroHeadlineHighlight: "चला ते सोपे करूया!",
    heroSubtitle: "डॉक्टरांचे प्रिस्क्रिप्शन किंवा कोणतेही कठीण दस्तऐवज अपलोड करा. आमचा AI तुमच्या भाषेत सोप्या शब्दांत समजावून सांगेल.",
    btnTryLiveDemo: "थेट डेमो पहा",
    btnHowItWorks: "हे कसे चालते",
    statZeroGuesswork: "कोणताही अंदाज नाही",
    stat11Languages: "११ भारतीय भाषा",
    statVerifiedSafe: "फार्मासिस्ट सुरक्षा इशारा",
    trustPrivacyNotice: "पूर्णपणे सुरक्षित व खाजगी. तुमच्या फायली सुरक्षित ठेवल्या जातात.",

    mascotGreeting: "नमस्कार! मी डॉक्युबॉट, तुमचा मदतनीस मित्र!",
    mascotRole: "3D आरोग्य व दस्तऐवज मार्गदर्शक",
    mascotSpeakingNotice: "डॉक्युबॉट मराठीत समजावून सांगत आहे...",
    tagDocsToSimple: "दस्तऐवज → सोपे शब्द",
    tagSmallSteps: "लहान पावले, पूर्ण स्पष्टता",
    tagFeelConfident: "समजून घ्या • अनुवाद करा • निश्चिंत राहा",
    book1: "चांगले आरोग्य",
    book2: "स्पष्ट समज",
    book3: "आपल्या भाषेत",

    cardATitle: "डॉक्टरांचे हस्तलिखित प्रिस्क्रिप्शन",
    cardASubtitle: "डॉक्टरांचे हस्ताक्षर, औषधांची नावे आणि डोसच्या वेळा सहज समजून घ्या.",
    cardAPoint1: "औषधांची नावे आणि अचूक वेळ (१-०-१, जेवणानंतर)",
    cardAPoint2: "एकाच प्रकारच्या औषधांच्या अतिसेवनाची तत्काळ सूचना",
    cardAPoint3: "अस्पष्ट हस्ताक्षर 'फार्मासिस्ट तपासणी आवश्यक' म्हणून दर्शविले जाते",
    cardABtn: "प्रिस्क्रिप्शन डेमो पहा",
    cardAWarning: "AI डॉक्टरांचा पर्याय नाही. औषध घेण्यापूर्वी फार्मासिस्टशी संपर्क साधा.",

    cardBTitle: "जटिल दस्तऐवज - सोप्या भाषेत",
    cardBSubtitle: "वीज बिल, सरकारी नोटिसा आणि बँकेची पत्रे सहज समजून घ्या.",
    cardBPoint1: "एकूण देय रक्कम, अंतिम मुदत आणि शुल्काचा तपशील स्वतंत्रपणे दाखवतो",
    cardBPoint2: "कायदेशीर व सरकारी भाषा दैनंदिन बोलचालीच्या भाषेत रूपांतरित करतो",
    cardBPoint3: "फसवणूक प्रतिबंध: कोणाशीही OTP किंवा पासवर्ड शेअर करू नका",
    cardBBtn: "दस्तऐवज डेमो पहा",
    cardBNotice: "अचूक माहिती — केवळ मूळ दस्तऐवजातील तपशील दाखवला जातो.",

    demoSectionBadge: "थेट परस्परसंवादी डेमो",
    demoSectionTitle: "स्वतः अनुभव घ्या",
    demoSectionSubtitle: "खालील दस्तऐवज निवडा, भाषा बदला आणि 3D डॉक्युबॉटच्या आवाजात ऐका!",
    tabPrescription: "💊 डॉक्टरांचे प्रिस्क्रिप्शन",
    tabUtilityBill: "⚡ वीज बिल",
    tabGovNotice: "🏛️ सरकारी नोटीस",
    colOriginalTitle: "१. मूळ स्कॅन दस्तऐवज",
    colExplanationTitle: "२. सोपे मराठी स्पष्टीकरण",
    colVoiceTitle: "३. डॉक्युबॉटच्या आवाजात ऐका (3D)",
    btnPlayVoice: "डॉक्युबॉटचा आवाज ऐका",
    btnPauseVoice: "थांबवा",
    btnReplayVoice: "पुन्हा ऐका",
    subtitlesLabel: "थेट मराठी सबटायटल्स",
    selectLanguagePrompt: "भाषा निवडा व ऐका:",

    stepsBadge: "३ सोप्या पायऱ्या",
    stepsTitle: "डॉक्यूईज कसे काम करते?",
    step1Number: "०१",
    step1Title: "दस्तऐवज अपलोड करा",
    step1Desc: "फोटो काढा किंवा PDF जोडा. सर्व फाईल्स स्वीकारल्या जातात.",
    step2Number: "०२",
    step2Title: "AI समजून सोपे करतो",
    step2Desc: "हस्ताक्षर आणि आकडेवारी कोणत्याही अंदाराशिवाय वाचली जाते.",
    step3Number: "०३",
    step3Title: "आपल्या भाषेत ऐका",
    step3Desc: "आमचा गोंडस 3D रोबोट तुमच्या मातृभाषेत बोलून दाखवतो.",

    footerRights: "डॉक्यूईज AI — सर्वांसाठी सुलभ वैद्यकीय समज.",
    footerMedicalDisclaimer: "टीप: डॉक्युईज भाषा सोपी करते. उपचारासाठी नेहमी डॉक्टरांचा सल्ला घ्या."
  },

  gu: {
    brandName: "ડોક્યુઈઝ AI",
    tagline: "મેડિકલ અને દસ્તાવેજ સહાયક",
    navHome: "હોમ",
    navDashboard: "દસ્તાવેજ પસંદ કરો",
    navPrescriptions: "પ્રિસ્ક્રિપ્શન",
    navDocuments: "દસ્તાવેજો",
    navPrivacy: "ગોપનીયતા અને સુરક્ષા",
    navGetStarted: "શરૂ કરો",

    heroBadge: "AI આધારિત મેડિકલ અને દસ્તાવેજ સમજૂતી",
    heroHeadlinePrefix: "ગૂંચવણભર્યા દસ્તાવેજો?",
    heroHeadlineHighlight: "ચાલો તેને સરળ બનાવીએ!",
    heroSubtitle: "ડૉક્ટરનું પ્રિસ્ક્રિપ્શન કે અઘરો દસ્તાવેજ અપલોડ કરો. અમારું AI તમારી માતૃભાષામાં સરળતાથી સમજાવશે.",
    btnTryLiveDemo: "લાઈવ ડેમો જુઓ",
    btnHowItWorks: "તે કેવી રીતે કાર્ય કરે છે",
    statZeroGuesswork: "કોઈ અટકળ નહીં",
    stat11Languages: "૧૧ ભારતીય ભાષાઓ",
    statVerifiedSafe: "ફાર્માસિસ્ટ ચકાસણી ચેતવણી",
    trustPrivacyNotice: "સંપૂર્ણ ખાનગી અને સુરક્ષિત. તમારી ફાઇલો સલામત રીતે પ્રોસેસ થાય છે.",

    mascotGreeting: "નમસ્તે! હું ડોક્યુબોટ છું, તમારો સહાયક મિત્ર!",
    mascotRole: "3D આરોગ્ય અને દસ્તાવેજ ગાઈડ",
    mascotSpeakingNotice: "ડોક્યુબોટ ગુજરાતીમાં સમજાવી રહ્યો છે...",
    tagDocsToSimple: "દસ્તાવેજો → સરળ શબ્દો",
    tagSmallSteps: "નાના પગલાં, સંપૂર્ણ સ્પષ્ટતા",
    tagFeelConfident: "સમજો • અનુવાદ કરો • નિશ્ચિંત રહો",
    book1: "સારું સ્વાસ્થ્ય",
    book2: "સ્પષ્ટ સમજ",
    book3: "તમારી ભાષામાં",

    cardATitle: "ડૉક્ટરના હસ્તલિખિત પ્રિસ્ક્રિપ્શન",
    cardASubtitle: "ડૉક્ટરના અક્ષરો, દવાઓના નામ અને લેવાના સમયને સરળતાથી સમજો.",
    cardAPoint1: "દવાઓના નામ અને ચોક્કસ સમય (૧-૦-૧, જમ્યા પછી)",
    cardAPoint2: "એક જ પ્રકારની બેવડી દવાઓના જોખમ સામે ત્વરિત ચેતવણી",
    cardAPoint3: "અસ્પષ્ટ અક્ષરોને 'ફાર્માસિસ્ટ દ્વારા ચકાસણી જરૂરી' તરીકે દર્શાવે છે",
    cardABtn: "પ્રિસ્ક્રિપ્શન ડેમો જુઓ",
    cardAWarning: "AI ડૉક્ટરનો વિકલ્પ નથી. દવા લેતા પહેલા ફાર્માસિસ્ટ પાસે ખાતરી કરો.",

    cardBTitle: "અટપટા દસ્તાવેજો - સરળ શબ્દોમાં",
    cardBSubtitle: "લાઇટ બિલ, સરકારી નોટિસ અને બેંકના પત્રોને સહેલાઈથી સમજો.",
    cardBPoint1: "ભરવાપાત્ર રકમ, છેલ્લી તારીખ અને ચાર્જિસ અલગ તારવીને બતાવે છે",
    cardBPoint2: "કાયદાકીય ભાષાને રોજિંદી બોલચાલની સરળ ગુજરાતીમાં ફેરવે છે",
    cardBPoint3: "છેતરપિંડીથી બચો: કોઈની સાથે પણ OTP કે પાસવર્ડ શેર કરશો નહીં",
    cardBBtn: "દસ્તાવેજ ડેમો જુઓ",
    cardBNotice: "ચોક્કસ માહિતી — દસ્તાવેજમાં લખેલી વાસ્તવિક વિગતો જ દર્શાવાય છે.",

    demoSectionBadge: "લાઈવ ડેમો અનુભવ",
    demoSectionTitle: "જાતે અજમાવી જુઓ",
    demoSectionSubtitle: "નીચેથી દસ્તાવેજ પસંદ કરો, ભાષા બદલો અને 3D ડોક્યુબોટના અવાજમાં સાંભળો!",
    tabPrescription: "💊 ડૉક્ટરનું પ્રિસ્ક્રિપ્શન",
    tabUtilityBill: "⚡ લાઈટ બિલ",
    tabGovNotice: "🏛️ સરકારી નોટિસ",
    colOriginalTitle: "૧. મૂળ સ્કેન કરેલો દસ્તાવેજ",
    colExplanationTitle: "૨. સરળ ગુજરાતી સમજૂતી",
    colVoiceTitle: "૩. ડોક્યુબોટના અવાજમાં સાંભળો (3D)",
    btnPlayVoice: "ડોક્યુબોટનો અવાજ સાંભળો",
    btnPauseVoice: "અટકાવો",
    btnReplayVoice: "ફરી સાંભળો",
    subtitlesLabel: "લાઈવ ગુજરાતી સબટાઈટલ",
    selectLanguagePrompt: "ભાષા બદલો અને સાંભળો:",

    stepsBadge: "૩ સરળ પગલાં",
    stepsTitle: "ડોક્યુઈઝ કેવી રીતે કાર્ય કરે છે?",
    step1Number: "૦૧",
    step1Title: "દસ્તાવેજ અપલોડ કરો",
    step1Desc: "ફોટો પાડો કે PDF ફાઈલ મૂકો. દરેક પ્રકારનો દસ્તાવેજ સ્વીકારાય છે.",
    step2Number: "૦૨",
    step2Title: "AI વાંચીને સરળ બનાવે છે",
    step2Desc: "હસ્તાક્ષર અને તારીખો કોઈપણ અંદાજ વિના ચોકસાઈથી વંચાય છે.",
    step3Number: "૦૩",
    step3Title: "તમારી ભાષામાં સાંભળો",
    step3Desc: "અમારો ક્યૂટ 3D રોબોટ તમારી માતૃભાષામાં બોલીને સમજાવે છે.",

    footerRights: "ડોક્યુઈઝ AI — સૌ માટે સુલભ આરોગ્ય અને ભાષાકીય સમાનતા.",
    footerMedicalDisclaimer: "નોંધ: ડોક્યુઈઝ ભાષા સરળ બનાવે છે. સારવાર માટે હંમેશા ડૉક્ટરની સલાહ લો."
  },

  pa: {
    brandName: "ਡੌਕਿਊਈਜ਼ AI",
    tagline: "ਮੈਡੀਕਲ ਤੇ ਦਸਤਾਵੇਜ਼ ਸਹਾਇਕ",
    navHome: "ਹੋਮ",
    navDashboard: "ਦਸਤਾਵੇਜ਼ ਚੁਣੋ",
    navPrescriptions: "ਪਰਚੀਆਂ (ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ)",
    navDocuments: "ਦਸਤਾਵੇਜ਼",
    navPrivacy: "ਗੁਪਤਤਾ ਤੇ ਸੁਰੱਖਿਆ",
    navGetStarted: "ਸ਼ੁਰੂ ਕਰੋ",

    heroBadge: "AI ਮੈਡੀਕਲ ਤੇ ਦਸਤਾਵੇਜ਼ ਸਰਲੀਕਰਨ",
    heroHeadlinePrefix: "ਉਲਝਣ ਭਰੇ ਦਸਤਾਵੇਜ਼?",
    heroHeadlineHighlight: "ਆਓ ਇਹਨਾਂ ਨੂੰ ਸੌਖਾ ਬਣਾਈਏ!",
    heroSubtitle: "ਡਾਕਟਰ ਦੀ ਪਰਚੀ ਜਾਂ ਕੋਈ ਵੀ ਮੁਸ਼ਕਲ ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ। ਸਾਡਾ AI ਤੁਹਾਡੀ ਮਾਂ ਬੋਲੀ ਵਿੱਚ ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਸਮਝਾਉਂਦਾ ਹੈ।",
    btnTryLiveDemo: "ਲਾਈਵ ਡੈਮੋ ਦੇਖੋ",
    btnHowItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    statZeroGuesswork: "ਕੋਈ ਅੰਦਾਜ਼ਾ ਨਹੀਂ",
    stat11Languages: "੧੧ ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ",
    statVerifiedSafe: "ਫਾਰਮਾਸਿਸਟ ਸੁਰੱਖਿਆ ਚੇਤਾਵਨੀ",
    trustPrivacyNotice: "ਪੂਰੀ ਤਰ੍ਹਾਂ ਨਿੱਜੀ ਤੇ ਸੁਰੱਖਿਅਤ। ਤੁਹਾਡੀਆਂ ਫਾਈਲਾਂ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਪ੍ਰੋਸੈਸ ਹੁੰਦੀਆਂ ਹਨ।",

    mascotGreeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਡੌਕਿਊਬੋਟ ਹਾਂ, ਤੁਹਾਡਾ ਮਿੱਤਰ!",
    mascotRole: "3D ਸਿਹਤ ਤੇ ਦਸਤਾਵੇਜ਼ ਗਾਈਡ",
    mascotSpeakingNotice: "ਡੌਕਿਊਬੋਟ ਪੰਜਾਬੀ ਵਿੱਚ ਬੋਲ ਕੇ ਸਮਝਾ ਰਿਹਾ ਹੈ...",
    tagDocsToSimple: "ਦਸਤਾਵੇਜ਼ → ਸੌਖੇ ਸ਼ਬਦ",
    tagSmallSteps: "ਛੋਟੇ ਕਦਮ, ਪੂਰੀ ਸਪਸ਼ਟਤਾ",
    tagFeelConfident: "ਸਮਝੋ • ਅਨੁਵਾਦ ਕਰੋ • ਬੇਫ਼ਿਕਰ ਰਹੋ",
    book1: "ਚੰਗੀ ਸਿਹਤ",
    book2: "ਸਪਸ਼ਟ ਸਮਝ",
    book3: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ",

    cardATitle: "ਡਾਕਟਰ ਦੀਆਂ ਲਿਖੀਆਂ ਪਰਚੀਆਂ",
    cardASubtitle: "ਡਾਕਟਰ ਦੇ ਹੱਥ-ਲਿਖਤ ਅੱਖਰ, ਦਵਾਈਆਂ ਦੇ ਨਾਮ ਅਤੇ ਲੈਣ ਦੇ ਸਮੇਂ ਨੂੰ ਸੌਖਿਆਂ ਸਮਝੋ।",
    cardAPoint1: "ਦਵਾਈਆਂ ਦੇ ਨਾਮ ਅਤੇ ਸਹੀ ਖੁਰਾਕ ਦੇ ਸਮੇਂ (੧-੦-੧, ਰੋਟੀ ਤੋਂ ਬਾਅਦ)",
    cardAPoint2: "ਇੱਕੋ ਜਿਹੀਆਂ ਦਵਾਈਆਂ ਦੇ ਜ਼ਹਿਰੀਲੇ ਪ੍ਰਭਾਵ ਤੋਂ ਤੁਰੰਤ ਚੇਤਾਵਨੀ",
    cardAPoint3: "ਨਾ ਪੜ੍ਹੇ ਜਾਣ ਵਾਲੇ ਅੱਖਰਾਂ ਨੂੰ 'ਫਾਰਮਾਸਿਸਟ ਤੋਂ ਪੁਸ਼ਟੀ ਜ਼ਰੂਰੀ' ਦੱਸਦਾ ਹੈ",
    cardABtn: "ਪਰਚੀ ਡੈਮੋ ਦੇਖੋ",
    cardAWarning: "AI ਡਾਕਟਰ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ। ਦਵਾਈ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਫਾਰਮਾਸਿਸਟ ਤੋਂ ਜ਼ਰੂਰ ਪੁੱਛੋ।",

    cardBTitle: "ਮੁਸ਼ਕਲ ਦਸਤਾਵੇਜ਼ - ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ",
    cardBSubtitle: "ਬਿਜਲੀ ਦੇ ਬਿੱਲ, ਸਰਕਾਰੀ ਨੋਟਿਸ ਅਤੇ ਬੈਂਕ ਦੀਆਂ ਚਿੱਠੀਆਂ ਸੌਖਿਆਂ ਸਮਝੋ।",
    cardBPoint1: "ਕੁੱਲ ਰਕਮ, ਆਖ਼ਰੀ ਮਿਤੀ ਅਤੇ ਵਾਧੂ ਖਰਚੇ ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਦਿਖਾਉਂਦਾ ਹੈ",
    cardBPoint2: "ਕਾਨੂੰਨੀ ਅਤੇ ਸਰਕਾਰੀ ਭਾਸ਼ਾ ਨੂੰ ਆਮ ਬੋਲਚਾਲ ਵਿੱਚ ਬਦਲਦਾ ਹੈ",
    cardBPoint3: "ਧੋਖਾਧੜੀ ਤੋਂ ਬਚਾਅ: ਆਪਣਾ OTP ਜਾਂ ਪਾਸਵਰਡ ਕਿਸੇ ਨਾਲ ਸਾਂਝਾ ਨਾ ਕਰੋ",
    cardBBtn: "ਦਸਤਾਵੇਜ਼ ਡੈਮੋ ਦੇਖੋ",
    cardBNotice: "ਸਹੀ ਜਾਣਕਾਰੀ — ਸਿਰਫ਼ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਦਰਜ ਸੱਚੇ ਵੇਰਵੇ ਹੀ ਪੇਸ਼ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।",

    demoSectionBadge: "ਇੰਟਰਐਕਟਿਵ ਲਾਈਵ ਡੈਮੋ",
    demoSectionTitle: "ਖੁਦ ਅਜ਼ਮਾ ਕੇ ਦੇਖੋ",
    demoSectionSubtitle: "ਹੇਠਾਂ ਤੋਂ ਦਸਤਾਵੇਜ਼ ਚੁਣੋ, ਭਾਸ਼ਾ ਬਦਲੋ ਅਤੇ 3D ਡੌਕਿਊਬੋਟ ਦੀ ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ!",
    tabPrescription: "💊 ਡਾਕਟਰ ਦੀ ਪਰਚੀ",
    tabUtilityBill: "⚡ ਬਿਜਲੀ ਦਾ ਬਿੱਲ",
    tabGovNotice: "🏛️ ਸਰਕਾਰੀ ਨੋਟਿਸ",
    colOriginalTitle: "੧. ਅਸਲ ਸਕੈਨ ਦਸਤਾਵੇਜ਼",
    colExplanationTitle: "੨. ਸੌਖੀ ਪੰਜਾਬੀ ਵਿਆਖਿਆ",
    colVoiceTitle: "੩. ਡੌਕਿਊਬੋਟ ਦੀ ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ (3D)",
    btnPlayVoice: "ਡੌਕਿਊਬੋਟ ਦੀ ਆਵਾਜ਼ ਸੁਣੋ",
    btnPauseVoice: "ਰੋਕੋ",
    btnReplayVoice: "ਮੁੜ ਸੁਣੋ",
    subtitlesLabel: "ਲਾਈਵ ਪੰਜਾਬੀ ਸਬ-ਟਾਈਟਲ",
    selectLanguagePrompt: "ਭਾਸ਼ਾ ਚੁਣੋ ਤੇ ਸੁਣੋ:",

    stepsBadge: "੩ ਸੌਖੇ ਕਦਮ",
    stepsTitle: "ਡੌਕਿਊਈਜ਼ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?",
    step1Number: "੦੧",
    step1Title: "ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ",
    step1Desc: "ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ PDF ਪਾਓ। ਹਰ ਪ੍ਰਕਾਰ ਦਾ ਦਸਤਾਵੇਜ਼ ਸਵੀਕਾਰਿਆ ਜਾਂਦਾ ਹੈ।",
    step2Number: "੦੨",
    step2Title: "AI ਸਮਝਦਾ ਤੇ ਸੌਖਾ ਬਣਾਉਂਦਾ ਹੈ",
    step2Desc: "ਹੱਥ-ਲਿਖਤ ਅਤੇ ਤਾਰੀਖਾਂ ਬਿਨਾਂ ਕਿਸੇ ਅੰਦਾਜ਼ੇ ਦੇ ਸਹੀ ਪੜ੍ਹੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    step3Number: "੦੩",
    step3Title: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸੁਣੋ",
    step3Desc: "ਸਾਡਾ ਪਿਆਰਾ 3D ਰੋਬੋਟ ਤੁਹਾਡੀ ਮਾਂ ਬੋਲੀ ਵਿੱਚ ਬੋਲ ਕੇ ਸਮਝਾਉਂਦਾ ਹੈ।",

    footerRights: "ਡੌਕਿਊਈਜ਼ AI — ਹਰ ਕਿਸੇ ਲਈ ਸੌਖੀ ਸਿਹਤ ਤੇ ਭਾਸ਼ਾਈ ਸਮਾਨਤਾ।",
    footerMedicalDisclaimer: "ਨੋਟ: ਡੌਕਿਊਈਜ਼ ਭਾਸ਼ਾ ਸੌਖੀ ਕਰਦਾ ਹੈ। ਇਲਾਜ ਲਈ ਹਮੇਸ਼ਾ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਲਓ।"
  },

  ur: {
    brandName: "ڈاکیوز AI",
    tagline: "طبی اور دفتری دستاویزات گائیڈ",
    navHome: "ہوم",
    navDashboard: "دستاویز منتخب کریں",
    navPrescriptions: "نسخے (نسخہ جات)",
    navDocuments: "دستاویزات",
    navPrivacy: "رازداری اور تحفظ",
    navGetStarted: "شروع کریں",

    heroBadge: "AI پر مبنی طبی و دفتری فہم",
    heroHeadlinePrefix: "مشکل دستاویزات؟",
    heroHeadlineHighlight: "آئیے انہیں آسان بنائیں!",
    heroSubtitle: "ڈاکٹر کا نسخہ یا کوئی بھی پیچیدہ دستاویز اپ لوڈ کریں۔ ہمارا AI آپ کی مادری زبان میں آسان الفاظ میں سمجھاتا ہے۔",
    btnTryLiveDemo: "لائیو ڈیمو آزمائیں",
    btnHowItWorks: "یہ کیسے کام کرتا ہے",
    statZeroGuesswork: "بغیر کسی قیاس کے",
    stat11Languages: "11 ہندوستانی زبانیں",
    statVerifiedSafe: "فارماسسٹ حفاظتی انتباہ",
    trustPrivacyNotice: "مکمل طور پر نجی اور محفوظ۔ آپ کی فائلیں حفاظت سے پروسیس ہوتی ہیں۔",

    mascotGreeting: "السلام علیکم! میں ڈاکیوبوٹ ہوں، آپ کا مددگار دوست!",
    mascotRole: "3D صحت اور دستاویز گائیڈ",
    mascotSpeakingNotice: "ڈاکیوبوٹ اردو میں بول کر سمجھا رہا ہے...",
    tagDocsToSimple: "دستاویزات ← آسان الفاظ",
    tagSmallSteps: "چھوٹے قدم، مکمل وضاحت",
    tagFeelConfident: "سمجھیں • ترجمہ کریں • پر اعتماد رہیں",
    book1: "بہتر صحت",
    book2: "واضح فہم",
    book3: "آپ کی اپنی زبان میں",

    cardATitle: "ڈاکٹر کے ہاتھ سے لکھے ہوئے نسخے",
    cardASubtitle: "ڈاکٹر کی بدخط تحریر، ادویات کے نام اور خوراک کے اوقات کو آسانی سے سمجھیں۔",
    cardAPoint1: "ادویات کے نام اور صحیح اوقات (1-0-1، صبح و شام، کھانے کے بعد)",
    cardAPoint2: "ایک جیسی دوائیوں کے بیک وقت استعمال سے فوری خبردار کرتا ہے",
    cardAPoint3: "ناقابل فہم تحریر پر 'فارماسسٹ سے تصدیق ضروری ہے' ظاہر کرتا ہے",
    cardABtn: "نسخے کا ڈیمو دیکھیں",
    cardAWarning: "AI معالج کا متبادل نہیں ہے۔ دوائی لینے سے پہلے فارماسسٹ سے ضرور تصدیق کریں۔",

    cardBTitle: "پیچیدہ دستاویزات - آسان الفاظ میں",
    cardBSubtitle: "بجلی کے بل، سرکاری نوٹس اور بینک کے خطوط کو باآسانی سمجھیں۔",
    cardBPoint1: "کل واجب الادا رقم، آخری تاریخ اور اضافی چارجز الگ دکھاتا ہے",
    cardBPoint2: "قانونی اور دفتری اصطلاحات کو عام بول چال کی اردو میں سمجھاتا ہے",
    cardBPoint3: "فراڈ سے بچاؤ: اپنا OTP یا پاس ورڈ کبھی کسی کے ساتھ شیئر نہ کریں",
    cardBBtn: "دستاویز ڈیمو دیکھیں",
    cardBNotice: "سو فیصد مستند معلومات — صرف دستاویز میں لکھی اصل تفصیلات ہی دی جاتی ہیں۔",

    demoSectionBadge: "لائیو ڈیمو تجربہ",
    demoSectionTitle: "خود آزما کر دیکھیں",
    demoSectionSubtitle: "نیچے دی گئی دستاویز منتخب کریں، زبان بدلیں اور 3D ڈاکیوبوٹ کی آواز میں سنیں!",
    tabPrescription: "💊 ڈاکٹر کا نسخہ",
    tabUtilityBill: "⚡ بجلی کا بل",
    tabGovNotice: "🏛️ سرکاری نوٹس",
    colOriginalTitle: "1. اصل اسکین شدہ دستاویز",
    colExplanationTitle: "2. آسان اردو تشریح",
    colVoiceTitle: "3. ڈاکیوبوٹ کی آواز میں سنیں (3D)",
    btnPlayVoice: "ڈاکیوبوٹ کی آواز سنیں",
    btnPauseVoice: "روکیں",
    btnReplayVoice: "دوبارہ سنیں",
    subtitlesLabel: "لائیو اردو سب ٹائٹلز",
    selectLanguagePrompt: "زبان منتخب کریں اور سنیں:",

    stepsBadge: "3 آسان مراحل",
    stepsTitle: "ڈاکیوز کیسے کام کرتا ہے؟",
    step1Number: "01",
    step1Title: "دستاویز اپ لوڈ کریں",
    step1Desc: "تصویر کھینچیں یا PDF دیں۔ ہر قسم کی دستاویز قبول کی جاتی ہے۔",
    step2Number: "02",
    step2Title: "AI سمجھ کر آسان بناتا ہے",
    step2Desc: "ہاتھ کی تحریر اور تاریخیں بغیر کسی اندازے کے درست پڑھی جاتی ہیں۔",
    step3Number: "03",
    step3Title: "اپنی زبان میں سنیں",
    step3Desc: "ہمارا پیارا 3D روبوٹ آپ کی مادری زبان میں بول کر سمجھاتا ہے۔",

    footerRights: "ڈاکیوز AI — سب کے لیے آسان طبی فہم اور لسانی مساوات۔",
    footerMedicalDisclaimer: "نوٹ: ڈاکیوز زبان آسان بناتا ہے۔ علاج کے لیے ہمیشہ ڈاکٹر سے رجوع کریں۔"
  },

  or: {
    brandName: "ଡକୁଇଜ୍ AI",
    tagline: "ଡାକ୍ତରୀ ଓ ଦସ୍ତାବିଜ ସହାୟକ",
    navHome: "ହୋମ୍",
    navDashboard: "ଦସ୍ତାବିଜ ବାଛନ୍ତୁ",
    navPrescriptions: "ପ୍ରେସକ୍ରିପସନ୍",
    navDocuments: "ଦସ୍ତାବିଜ",
    navPrivacy: "ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା",
    navGetStarted: "ଆରମ୍ଭ କରନ୍ତୁ",

    heroBadge: "AI ଆଧାରିତ ମେଡିକାଲ ଓ ଦସ୍ତାବିଜ ବିଶ୍ଳେଷଣ",
    heroHeadlinePrefix: "ଜଟିଳ ଦସ୍ତାବିଜ?",
    heroHeadlineHighlight: "ଆସନ୍ତୁ ଏହାକୁ ସହଜରେ ବୁଝିବା!",
    heroSubtitle: "ଡାକ୍ତରଙ୍କ ପ୍ରେସକ୍ରିପସନ୍ କିମ୍ବା କୌଣସି କଠିନ ଦସ୍ତାବିଜ ଅପଲୋଡ୍ କରନ୍ତୁ। ଆମର AI ଆପଣଙ୍କ ମାତୃଭାଷାରେ ସରଳ ଭାବରେ ବୁଝାଇବ।",
    btnTryLiveDemo: "ଲାଇଭ୍ ଡେମୋ ଦେଖନ୍ତୁ",
    btnHowItWorks: "ଏହା କିପରି କାମ କରେ",
    statZeroGuesswork: "କୌଣସି ଅନୁମାନ ନାହିଁ",
    stat11Languages: "୧୧ଟି ଭାରତୀୟ ଭାଷା",
    statVerifiedSafe: "ଫାର୍ମାସିଷ୍ଟ ସୁରକ୍ଷା ଚେତାବନୀ",
    trustPrivacyNotice: "ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ ଓ ଗୋପନୀୟ। ଆପଣଙ୍କ ଫାଇଲ୍ ସୁରକ୍ଷିତ ଭାବେ ପ୍ରକ୍ରିୟାକରଣ ହୁଏ।",

    mascotGreeting: "ନମସ୍କାର! ମୁଁ ଡକୁବଟ୍, ଆପଣଙ୍କ ସହାୟକ ବନ୍ଧୁ!",
    mascotRole: "3D ସ୍ୱାସ୍ଥ୍ୟ ଓ ଦସ୍ତାବିଜ ଗାଇଡ୍",
    mascotSpeakingNotice: "ଡକୁବଟ୍ ଓଡ଼ିଆରେ ସରଳ ଭାବରେ ବୁଝାଉଛି...",
    tagDocsToSimple: "ଦସ୍ତାବିଜ → ସରଳ ଶବ୍ଦ",
    tagSmallSteps: "ଛୋଟ ପଦକ୍ଷେପ, ପୂର୍ଣ୍ଣ ସ୍ପଷ୍ଟତା",
    tagFeelConfident: "ବୁଝନ୍ତୁ • ଅନୁବାଦ କରନ୍ତୁ • ନିଶ୍ଚିନ୍ତ ରୁହନ୍ତୁ",
    book1: "ଉତ୍ତମ ସ୍ୱାସ୍ଥ୍ୟ",
    book2: "ସ୍ପଷ୍ଟ ବୁଝାମଣା",
    book3: "ନିଜ ଭାଷାରେ",

    cardATitle: "ଡାକ୍ତରଙ୍କ ହାତଲେଖା ପ୍ରେସକ୍ରିପସନ୍",
    cardASubtitle: "ଡାକ୍ତରଙ୍କ ହାତଲେଖା, ଔଷଧର ନାମ ଓ ଖାଇବା ନିୟମ ସହଜରେ ବୁଝନ୍ତୁ।",
    cardAPoint1: "ଔଷଧର ନାମ ଓ ସଠିକ୍ ସମୟ (୧-୦-୧, ଖାଇବା ପରେ)",
    cardAPoint2: "ଗୋଟିଏ ପ୍ରକାର ଔଷଧର ଅତ୍ୟଧିକ ବ୍ୟବହାରରୁ ତୁରନ୍ତ ସତର୍କତା",
    cardAPoint3: "ଅସ୍ପଷ୍ଟ ଲେଖାକୁ 'ଫାର୍ମାସିଷ୍ଟଙ୍କ ଯାଞ୍ଚ ଆବଶ୍ୟକ' ଭାବେ ଦର୍ଶାଏ",
    cardABtn: "ପ୍ରେସକ୍ରିପସନ୍ ଡେମୋ ଦେଖନ୍ତୁ",
    cardAWarning: "AI ଡାକ୍ତରଙ୍କ ବିକଳ୍ପ ନୁହେଁ। ଔଷଧ ଖାଇବା ପୂର୍ବରୁ ଫାର୍ମାସିଷ୍ଟଙ୍କୁ ପଚାରନ୍ତୁ।",

    cardBTitle: "ଜଟିଳ ଦସ୍ତାବିଜ - ସରଳ ଭାଷାରେ",
    cardBSubtitle: "ବିଜୁଳି ବିଲ୍, ସରକାରୀ ନୋଟିସ୍ ଓ ବ୍ୟାଙ୍କ ଚିଠି ସହଜରେ ବୁଝନ୍ତୁ।",
    cardBPoint1: "ମୋଟ ଦେୟ ଟଙ୍କା, ଶେଷ ତାରିଖ ଓ ଚାର୍ଜ ଅଲଗା ଭାବେ ଦେଖାଏ",
    cardBPoint2: "ଆଇନଗତ ଓ ସରକାରୀ ଭାଷାକୁ ସାଧାରଣ କଥିତ ଭାଷାରେ ବଦଳାଏ",
    cardBPoint3: "ଠକାମିରୁ ରକ୍ଷା: କାହା ସହିତ ନିଜର OTP ବା ପାସୱାର୍ଡ ବାଣ୍ଟନ୍ତୁ ନାହିଁ",
    cardBBtn: "ଦସ୍ତାବିଜ ଡେମୋ ଦେଖନ୍ତୁ",
    cardBNotice: "ସଠିକ୍ ସୂଚନା — ଦସ୍ତାବିଜରେ ଥିବା ପ୍ରକୃତ ତଥ୍ୟ ହିଁ ଦିଆଯାଏ।",

    demoSectionBadge: "ଇଣ୍ଟରାକ୍ଟିଭ୍ ଲାଇଭ୍ ଡେମୋ",
    demoSectionTitle: "ନିଜେ ଚେଷ୍ଟା କରି ଦେଖନ୍ତୁ",
    demoSectionSubtitle: "ତଳୁ ଦସ୍ତାବିଜ ବାଛନ୍ତୁ, ଭାଷା ବଦଳାନ୍ତୁ ଏବଂ 3D ଡକୁବଟ୍ ସ୍ୱରରେ ଶୁଣନ୍ତୁ!",
    tabPrescription: "💊 ପ୍ରେସକ୍ରିପସନ୍",
    tabUtilityBill: "⚡ ବିଜୁଳି ବିଲ୍",
    tabGovNotice: "🏛️ ସରକାରୀ ନୋଟିସ୍",
    colOriginalTitle: "୧. ମୂଳ ସ୍କାନ୍ ଦସ୍ତାବିଜ",
    colExplanationTitle: "୨. ସରଳ ଓଡ଼ିଆ ବୁଝାମଣା",
    colVoiceTitle: "୩. ଡକୁବଟ୍ ସ୍ୱରରେ ଶୁଣନ୍ତୁ (3D)",
    btnPlayVoice: "ଡକୁବଟ୍ ସ୍ୱର ଶୁଣନ୍ତୁ",
    btnPauseVoice: "ରୁହନ୍ତୁ",
    btnReplayVoice: "ପୁନଃ ଶୁଣନ୍ତୁ",
    subtitlesLabel: "ଲାଇଭ୍ ଓଡ଼ିଆ ସବ୍-ଟାଇଟଲ୍",
    selectLanguagePrompt: "ଭାଷା ବାଛନ୍ତୁ ଓ ଶୁଣନ୍ତୁ:",

    stepsBadge: "୩ଟି ସରଳ ପଦକ୍ଷେପ",
    stepsTitle: "ଡକୁଇଜ୍ କିପରି କାମ କରେ?",
    step1Number: "୦୧",
    step1Title: "ଦସ୍ତାବିଜ ଅପଲୋଡ୍ କରନ୍ତୁ",
    step1Desc: "ଫଟୋ ଉଠାନ୍ତୁ ବା PDF ଦିଅନ୍ତୁ। ସବୁ ପ୍ରକାର ଦସ୍ତାବିଜ ଗ୍ରହଣ କରାଯାଏ।",
    step2Number: "୦୨",
    step2Title: "AI ବୁଝି ସହଜ କରେ",
    step2Desc: "ହାତଲେଖା ଓ ତାରିଖ ବିନା କୌଣସି ଅନୁମାନରେ ସଠିକ୍ ପଢ଼ାଯାଏ।",
    step3Number: "୦୩",
    step3Title: "ନିଜ ଭାଷାରେ ଶୁଣନ୍ତୁ",
    step3Desc: "ଆମର ସୁନ୍ଦର 3D ରୋବୋଟ୍ ଆପଣଙ୍କ ମାତୃଭାଷାରେ କହି ବୁଝାଏ।",

    footerRights: "ଡକୁଇଜ୍ AI — ସମସ୍ତଙ୍କ ପାଇଁ ସୁଲଭ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା।",
    footerMedicalDisclaimer: "ସୂଚନା: ଡକୁଇଜ୍ ଭାଷାକୁ ସରଳ କରେ। ଚିକିତ୍ସା ପାଇଁ ସର୍ବଦା ଡାକ୍ତରଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।"
  },

  // Fallback map for remaining optional locales
  as: {} as any,
  bho: {} as any,
  sa: {} as any,
  ne: {} as any,
  es: {} as any,
  fr: {} as any,
  ar: {} as any,
  de: {} as any,
};

// Fill fallbacks for non-core languages
const fallbackEn = UI_TRANSLATIONS.en;
(['as', 'bho', 'sa', 'ne', 'es', 'fr', 'ar', 'de'] as SupportedLanguage[]).forEach(code => {
  if (!UI_TRANSLATIONS[code] || Object.keys(UI_TRANSLATIONS[code]).length === 0) {
    UI_TRANSLATIONS[code] = { ...fallbackEn };
  }
});

export function getUITranslation(lang: SupportedLanguage): UITranslation {
  return UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
}
