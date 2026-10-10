import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  Sparkles, 
  Stethoscope, 
  FileText, 
  Zap, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Building2, 
  HeartHandshake,
  HelpCircle,
  Eye,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../types/medscript';
import { KrishXTattvaAvatar } from '../KrishXTattvaAvatar';
import { getUITranslation } from '../../utils/uiTranslations';
import { speechManager } from '../../utils/speech';
import { DocumentCategory } from './DocumentTypeScreen';

export interface LandingScreenProps {
  onGetStarted: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSelectCategory?: (category: DocumentCategory) => void;
}

// Sample Demonstration Datasets for Evaluators
const DEMO_SAMPLES = {
  prescription: {
    id: 'sample-rx',
    type: 'prescription' as const,
    title: 'Dr. Anita Rajan — City Health Clinic',
    patient: 'Ramesh Kumar (Age: 42) • Acute Bronchitis',
    originalOcrText: [
      '1. Tab. Paracetamol 650mg — 1 tab TDS after meals (3 days)',
      '2. Tab. Azithromycin 500mg — 1 tab OD after food (5 days)',
      '3. Syr. Ascoril D — 5ml at bedtime for cough',
      'Advice: Drink warm water, steam inhalation. Rest 3 days.'
    ],
    medications: [
      { name: 'Paracetamol 650mg', dose: '1-0-1 (TDS)', timing: 'After food', status: 'VERIFIED' },
      { name: 'Azithromycin 500mg', dose: '1-0-0 (OD)', timing: 'After lunch', status: 'VERIFIED' },
      { name: 'Ascoril D Cough Syrup', dose: '5ml', timing: 'At bedtime', status: 'LIKELY' }
    ],
    warning: 'Always confirm dosage and duration with your pharmacist before taking medications.',
    spokenScripts: {
      en: "This prescription contains Paracetamol for fever, Azithromycin antibiotic for 5 days, and cough syrup. Take after food and drink warm fluids.",
      te: "ఈ ప్రిస్క్రిప్షన్‌లో జ్వరం కోసం పారాసిటమాల్, 5 రోజుల యాంటీబయాటిక్ మరియు దగ్గు సిరప్ ఉన్నాయి. భోజనం తర్వాత వేసుకోండి మరియు గోరువెచ్చని నీరు తాగండి.",
      hi: "इस पर्चे में बुखार के लिए पैरासिटामोल, 5 दिनों की एंटीबायोटिक और खांसी की सिरप है। खाने के बाद लें और गुनगुना पानी पिएं।",
      ta: "இந்த மருந்து சீட்டில் காய்ச்சலுக்கு பாராசிட்டமால், 5 நாட்களுக்கு அசித்ரோமைசின் மற்றும் இருமல் மருந்து உள்ளன. உணவுக்குப் பின் சாப்பிடவும்.",
      kn: "ಈ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನಲ್ಲಿ ಜ್ವರಕ್ಕೆ ಪ್ಯಾರಾಸಿಟಮಾಲ್, 5 ದಿನಗಳ ಆಂಟಿಬಯೋಟಿಕ್ ಮತ್ತು ಕೆಮ್ಮಿನ ಸಿರಪ್ ಇವೆ. ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ.",
      ml: "ഈ കുറിപ്പടിയിൽ പനിക്ക് പാരസെറ്റാമോളും 5 ദിവസത്തെ ആന്റിബയോട്ടിക്കും ചുമയുടെ മരുന്നും ഉണ്ട്. ഭക്ഷണത്തിന് ശേഷം കഴിക്കുക.",
      bn: "এই প্রেসক্রিপশনে জ্বরের জন্য প্যারাসিটামল, ৫ দিনের অ্যান্টিবায়োটিক এবং কাশির সিরাপ রয়েছে। খাবারের পরে সেবন করুন।",
      mr: "या प्रिस्क्रिप्शनमध्ये तापासाठी पॅरासिटामॉल, ५ दिवसांचे अँटीबायोटिक आणि खोकल्याचे सिरप आहे. जेवणानंतर घ्या.",
      gu: "આ પ્રિસ્ક્રિપ્શનમાં તાવ માટે પેરાસીટામોલ, ૫ દિવસની એન્ટિબાયોટિક અને ઉધરસની સિરપ છે. જમ્યા પછી લેવી.",
      pa: "ਇਸ ਪਰਚੀ ਵਿੱਚ ਬੁਖ਼ਾਰ ਲਈ ਪੈਰਾਸੀਟਾਮੋਲ, ੫ ਦਿਨਾਂ ਦੀ ਐਂਟੀਬਾਇਓਟਿਕ ਅਤੇ ਖੰਘ ਦਾ ਸ਼ਰਬਤ ਹੈ। ਖਾਣਾ ਖਾਣ ਤੋਂ ਬਾਅਦ ਲਵੋ।",
      ur: "اس نسخے میں بخار کے لیے پیراسیٹامول، 5 دن کی اینٹی بائیوٹک اور کھانسی کا شربت ہے۔ کھانے کے بعد لیں اور نیم گرم پانی پیئیں۔"
    } as Record<string, string>
  },
  utility: {
    id: 'sample-bill',
    type: 'utility' as const,
    title: 'State Electricity Distribution Co. — Consumer #582910',
    patient: 'Consumer: Sunita Sharma • Billing: September 2026',
    originalOcrText: [
      'Current Reading: 4,820 kWh • Previous: 4,636 kWh (184 Units)',
      'Energy Tariff Charges: ₹644.00',
      'Fixed Meter Rent: ₹60.00 | Electricity Duty: ₹38.00',
      'Total Amount Due: ₹742.00 | Due Date: 15 Oct 2026'
    ],
    items: [
      { label: 'Total Payable Amount', val: '₹742.00', highlight: true },
      { label: 'Due Date', val: '15 Oct 2026', highlight: true },
      { label: 'Units Consumed', val: '184 Units', highlight: false },
      { label: 'Late Surcharge Fee', val: '₹45.00 after due date', highlight: false }
    ],
    warning: 'Pay before 15 Oct 2026 to avoid late fee surcharge or supply disconnection.',
    spokenScripts: {
      en: "Your electricity bill total is 742 rupees for 184 units. The payment due date is 15 October 2026. Please pay before the deadline.",
      te: "మీ కరెంట్ బిల్లు మొత్తం 184 యూనిట్లకు 742 రూపాయలు. చెల్లించాల్సిన గడువు తేదీ 15 అక్టోబర్ 2026. ఆలస్య రుసుము లేకుండా చెల్లించండి.",
      hi: "आपका बिजली बिल 184 यूनिट का कुल 742 रुपये है। भुगतान की अंतिम तिथि 15 अक्टूबर 2026 है। कृपया समय पर भुगतान करें।",
      ta: "உங்கள் மின்சார கட்டணம் 184 யூனிட்டுகளுக்கு 742 ரூபாய். செலுத்த வேண்டிய கடைசி தேதி 15 அக்டோபர் 2026. தாமத கட்டணத்தை தவிர்க்கவும்.",
      kn: "ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ 184 ಯೂನಿಟ್‌ಗಳಿಗೆ ಒಟ್ಟು 742 ರೂಪಾಯಿಗಳು. ಪಾವತಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ 15 ಅಕ್ಟೋಬರ್ 2026 ಆಗಿದೆ.",
      ml: "നിങ്ങളുടെ വൈദ്യുതി ബിൽ 184 യൂണിറ്റുകൾക്ക് 742 രൂപയാണ്. അടയ്ക്കേണ്ട അവസാന തീയതി 2026 ഒക്ടോബർ 15 ആണ്.",
      bn: "আপনার বিদ্যুৎ বিল ১৮৪ ইউনিটের জন্য মোট ৭৪২ টাকা। বিল জমা দেওয়ার শেষ তারিখ ১৫ অক্টোবর ২০২৬।",
      mr: "तुमचे वीज बिल १८४ युनिट्ससाठी एकूण ७४२ रुपये आहे. भरण्याची शेवटची तारीख १५ ऑक्टोबर २०२६ आहे.",
      gu: "તમારું લાઇટ બિલ ૧૮૪ યુનિટનું કુલ ૭૪૨ રૂપિયા છે. ભરવાની છેલ્લી તારીખ ૧૫ ઓક્ટોબર ૨૦૨૬ છે.",
      pa: "ਤੁਹਾਡਾ ਬਿਜਲੀ ਦਾ ਬਿੱਲ ੧੮੪ ਯੂਨਿਟਾਂ ਦਾ ਕੁੱਲ ੭੪੨ ਰੁਪਏ ਹੈ। ਭਰਨ ਦੀ ਆਖ਼ਰੀ ਮਿਤੀ ੧੫ ਅਕਤੂਬਰ ੨੦੨೬ ਹੈ।",
      ur: "آپ کا بجلی کا بل 184 یونٹ کا کل 742 روپے ہے۔ ادائیگی کی آخری تاریخ 15 اکتوبر 2026 ہے۔"
    } as Record<string, string>
  },
  hepatitis: {
    id: 'sample-hepatitis',
    type: 'utility' as const, // For rendering compatibility
    title: 'Metropolis Healthcare — Diagnostic Pathology',
    patient: 'Mr. Rajeev Verma (Age: 38) • Viral Serology Panel',
    originalOcrText: [
      'Investigation: HBsAg (Hepatitis B Surface Antigen)',
      'Methodology: Chemiluminescent Microparticle Immunoassay (CMIA)',
      'Observed Value: 0.35 S/CO',
      'Biological Reference Interval: < 0.90 S/CO (Non-Reactive)',
      'Final Verified Status: NON-REACTIVE / NEGATIVE',
      'Clinical Interpretation: No active Hepatitis B virus detected.'
    ],
    items: [
      { label: 'Observed HBsAg Index', val: '0.35 S/CO', highlight: true },
      { label: 'Reference Cutoff Limit', val: '< 0.90 S/CO (Non-Reactive)', highlight: false },
      { label: 'Verified Status', val: 'NON-REACTIVE (Negative)', highlight: true },
      { label: 'Prescription Medicines Needed', val: '0 (None Required)', highlight: false }
    ],
    warning: 'Non-Reactive indicates no active Hepatitis B infection. Zero daily medications are required for this diagnostic test.',
    spokenScripts: {
      en: "Your Hepatitis B surface antigen test result is 0.35 S/CO, which is Non-Reactive and Negative. This confirms no active infection. No medicines are needed.",
      te: "మీ హెపటైటిస్ బి పరీక్ష ఫలితం 0.35 S/CO, ఇది నాన్-రియాక్టివ్ మరియు నెగటివ్. ఎటువంటి క్రియాశీల ఇన్ఫెక్షన్ లేదు. మందులు అవసరం లేదు.",
      hi: "आपकी हेपेटाइटिस बी जांच रिपोर्ट 0.35 S/CO है, जो नॉन-रिएक्टिव और नेगेटिव है। शरीर में कोई सक्रिय संक्रमण नहीं है। किसी दवा की आवश्यकता नहीं है।",
      ta: "உங்கள் ஹெபடைடிஸ் பி சோதனை முடிவு 0.35 S/CO ஆகும், இது எதிர்மறையானது (நெகட்டிவ்). வைரஸ் தொற்று இல்லை. மருந்துகள் தேவையில்லை.",
      kn: "ನಿಮ್ಮ ಹೆಪಟೈಟಿಸ್ ಬಿ ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶ 0.35 S/CO ಆಗಿದ್ದು, ಇದು ನಾನ್-ರಿಯಾಕ್ಟಿವ್ ಮತ್ತು ನೆಗೆಟಿವ್ ಆಗಿದೆ. ಯಾವುದೇ ಸೋಂಕು ಇಲ್ಲ. ಔಷಧಿಗಳ ಅಗತ್ಯವಿಲ್ಲ.",
      ml: "നിങ്ങളുടെ ഹെപ്പറ്റൈറ്റിസ് ബി പരിശോധനാ ഫലം 0.35 S/CO ആണ്, ഇത് നെഗറ്റീവ് ആണ്. സജീവമായ അണുബാധയില്ല. മരുന്നുകൾ ആവശ്യമില്ല.",
      bn: "আপনার হেপাটাইটিস বি পরীক্ষার ফলাফল ০.৩৫ S/CO, যা নন-রিঅ্যাকটিভ এবং নেগেটিভ। শরীরে কোনো সংক্রমণ নেই। ওষুধের প্রয়োজন নেই।",
      mr: "तुमचा हिपॅटायटीस बी चाचणी निकाल ०.३५ S/CO आहे, जो नॉन-रिअॅक्टिव्ह आणि निगेटिव्ह आहे. कोणताही संसर्ग नाही. औषधांची गरज नाही.",
      gu: "તમારો હેપેટાઇટિસ બી રિપોર્ટ ૦.૩૫ S/CO છે, જે નોન-રિએક્ટિવ અને નેગેટિવ છે. કોઈ ચેપ નથી. દવાની જરૂર નથી.",
      pa: "ਤੁਹਾਡਾ ਹੈਪੇਟਾਈਟਿਸ ਬੀ ਟੈਸਟ ੦.੩੫ S/CO ਹੈ, ਜੋ ਕਿ ਨੈਗੇਟਿਵ ਹੈ। ਕੋਈ ਲਾਗ ਨਹੀਂ ਹੈ। ਦਵਾਈ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ।",
      ur: "آپ کا ہیپاٹائٹس بی ٹیسٹ رزلٹ 0.35 S/CO ہے، جو کہ نان ری ایکٹیو اور منفی ہے۔ کوئی فعال انفیکشن نہیں ہے۔"
    } as Record<string, string>
  }
};

// Floating Tablet Screen Translations (From Reference Image)
export const TABLET_TRANSLATIONS: Record<string, {
  header: string;
  items: string[];
  spoken: string;
}> = {
  ta: {
    header: 'மருத்துவக் குறிப்புகள்',
    items: [
      'இந்த மருந்தை நாளில் 2 முறை எடுக்கவும்.',
      'உணவுக்குப் பிறகு எடுத்துக்கொள்ளவும்.',
      '7 நாட்கள் தொடர்ந்தால் போதும்.'
    ],
    spoken: 'மருத்துவக் குறிப்புகள். இந்த மருந்தை நாளில் இரண்டு முறை உணவுக்குப் பிறகு எடுத்துக்கொள்ளவும். ஏழு நாட்கள் தொடர்ந்தால் போதும்.'
  },
  te: {
    header: 'వైద్య సూచనలు',
    items: [
      'ఈ మందును రోజుకు 2 సార్లు వేసుకోండి.',
      'భోజనం తర్వాత మాత్రమే తీసుకోవాలి.',
      '7 రోజుల పాటు క్రమం తప్పకుండా వాడండి.'
    ],
    spoken: 'వైద్య సూచనలు. ఈ మందును రోజుకు రెండు సార్లు భోజనం తర్వాత మాత్రమే తీసుకోవాలి. ఏడు రోజుల పాటు క్రమం తప్పకుండా వాడండి.'
  },
  hi: {
    header: 'दवा की पर्ची व निर्देश',
    items: [
      'यह दवा दिन में 2 बार लें।',
      'भोजन के बाद ही दवा का सेवन करें।',
      '7 दिनों तक लगातार कोर्स पूरा करें।'
    ],
    spoken: 'दवा की पर्ची व निर्देश. यह दवा दिन में दो बार भोजन के बाद ही लें। सात दिनों तक लगातार कोर्स पूरा करें।'
  },
  en: {
    header: 'Medical Notes & Directions',
    items: [
      'Take this medicine 2 times a day.',
      'Always take after meals with water.',
      'Continue for 7 days as prescribed.'
    ],
    spoken: 'Medical Notes. Take this medicine two times a day after meals with water. Continue for seven days as prescribed.'
  },
  kn: {
    header: 'ವೈದ್ಯಕೀಯ ಟಿಪ್ಪಣಿಗಳು',
    items: [
      'ಈ ಔಷಧಿಯನ್ನು ದಿನಕ್ಕೆ 2 ಬಾರಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
      'ಊಟದ ನಂತರ ಮಾತ್ರ ತೆಗೆದುಕೊಳ್ಳಬೇಕು.',
      '7 ದಿನಗಳ ಕಾಲ ಕೋರ್ಸ್ ಪೂರ್ಣಗೊಳಿಸಿ.'
    ],
    spoken: 'ವೈದ್ಯಕೀಯ ಟಿಪ್ಪಣಿಗಳು. ಈ ಔಷಧಿಯನ್ನು ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ. ಏಳು ದಿನಗಳ ಕಾಲ ಪೂರ್ಣಗೊಳಿಸಿ.'
  },
  ml: {
    header: 'ചികിത്സാ നിർദ്ദേശങ്ങൾ',
    items: [
      'ഈ മരുന്ന് ദിവസത്തിൽ 2 തവണ കഴിക്കുക.',
      'ഭക്ഷണത്തിന് ശേഷം മാത്രം കഴിക്കുക.',
      '7 ദിവസം കൃത്യമായി തുടരുക.'
    ],
    spoken: 'ചികിത്സാ നിർദ്ദേശങ്ങൾ. ഈ മരുന്ന് ദിവസത്തിൽ രണ്ട് തവണ ഭക്ഷണത്തിന് ശേഷം കഴിക്കുക. ഏഴ് ദിവസം തുടരുക.'
  },
  bn: {
    header: 'চিকিৎসকের প্রেসক্রিপশন নির্দেশিকা',
    items: [
      'এই ওষুধটি দিনে ২ বার গ্রহণ করুন।',
      'খাবারের পরে জল দিয়ে সেবন করুন।',
      '৭ দিন পর্যন্ত এই নিয়ম বজায় রাখুন।'
    ],
    spoken: 'চিকিৎসকের প্রেসক্রিপশন নির্দেশিকা. এই ওষুধটি দিনে দুই বার খাবারের পরে সেবন করুন। সাত দিন বজায় রাখুন।'
  },
  mr: {
    header: 'वैद्यकीय सूचना व औषधे',
    items: [
      'हे औषध दिवसातून २ वेळा घ्या.',
      'जेवणानंतरच औषध घ्यावे.',
      '७ दिवस कोर्स पूर्ण करा.'
    ],
    spoken: 'वैद्यकीय सूचना व औषधे. हे औषध दिवसातून दोन वेळा जेवणानंतर घ्या. सात दिवस कोर्स पूर्ण करा.'
  },
  gu: {
    header: 'તબીબી સલાહ અને દવાઓ',
    items: [
      'આ દવા દિવસમાં ૨ વખત લો.',
      'જમ્યા પછી જ દવા લેવી.',
      '૭ દિવસ સુધી કોર્સ ચાલુ રાખો.'
    ],
    spoken: 'તબીબી સલાહ અને દવાઓ. આ દવા દિવસમાં બે વખત જમ્યા પછી લો. સાત દિવસ સુધી ચાલુ રાખો.'
  },
  pa: {
    header: 'ਡਾਕਟਰੀ ਹਦਾਇਤਾਂ ਤੇ ਦਵਾਈਆਂ',
    items: [
      'ਇਹ ਦਵਾਈ ਦਿਨ ਵਿੱਚ ੨ ਵਾਰ ਲਵੋ।',
      'ਖਾਣਾ ਖਾਣ ਤੋਂ ਬਾਅਦ ਹੀ ਲਵੋ।',
      '੭ ਦਿਨਾਂ ਤੱਕ ਕੋਰਸ ਪੂਰਾ ਕਰੋ।'
    ],
    spoken: 'ਡਾਕਟਰੀ ਹਦਾਇਤਾਂ. ਇਹ ਦਵਾਈ ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ ਖਾਣਾ ਖਾਣ ਤੋਂ ਬਾਅਦ ਲਵੋ। ਸੱਤ ਦਿਨਾਂ ਤੱਕ ਪੂਰਾ ਕਰੋ।'
  },
  ur: {
    header: 'طبی ہدایات اور نسخہ',
    items: [
      'یہ دوا دن میں 2 بار لیں۔',
      'کھانے کے بعد ہی دوا لیں۔',
      '7 دن تک باقاعدگی سے استعمال کریں۔'
    ],
    spoken: 'طبی ہدایات. یہ دوا دن میں دو بار کھانے کے بعد لیں۔ سات دن تک باقاعدگی سے استعمال کریں۔'
  }
};

export const LandingScreen: React.FC<LandingScreenProps> = ({ 
  onGetStarted,
  currentLanguage,
  onLanguageChange,
  onSelectCategory
}) => {
  const t = getUITranslation(currentLanguage);

  // Live Demo Playground State (Hepatitis Lab Report, Prescription, Utility Bill)
  const [activeDemoTab, setActiveDemoTab] = useState<'hepatitis' | 'prescription' | 'utility'>('hepatitis');
  const [isPlayingDemoVoice, setIsPlayingDemoVoice] = useState(false);
  const [isPlayingTabletVoice, setIsPlayingTabletVoice] = useState(false);
  const [showTabletLangMenu, setShowTabletLangMenu] = useState(false);
  const [activeTabletLang, setActiveTabletLang] = useState<SupportedLanguage>(currentLanguage);
  const [demoSubtitle, setDemoSubtitle] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [langToast, setLangToast] = useState<{ show: boolean; name: string } | null>(null);
  const prevLangRef = useRef(currentLanguage);

  // Keep tablet language synced with main language
  useEffect(() => {
    setActiveTabletLang(currentLanguage);
  }, [currentLanguage]);

  // Trigger brief delightful toast when language changes
  useEffect(() => {
    if (prevLangRef.current !== currentLanguage) {
      const langObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
      setLangToast({ show: true, name: langObj?.nativeName || currentLanguage });
      prevLangRef.current = currentLanguage;
      const timer = setTimeout(() => setLangToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentLanguage]);

  // Smooth scroll anchors
  const demoSectionRef = useRef<HTMLDivElement>(null);
  const stepsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSteps = () => {
    stepsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSample = DEMO_SAMPLES[activeDemoTab];
  const activeSpokenScript = currentSample.spokenScripts[currentLanguage] || currentSample.spokenScripts.en;

  // Handle Demo Voice Playback
  const handleToggleDemoSpeech = () => {
    if (isPlayingDemoVoice) {
      speechManager.stop();
      setIsPlayingDemoVoice(false);
      setDemoSubtitle('');
    } else {
      setIsPlayingDemoVoice(true);
      setDemoSubtitle(activeSpokenScript);
      speechManager.speakScript(
        activeSpokenScript,
        currentLanguage,
        {
          onStart: () => setIsPlayingDemoVoice(true),
          onSentenceChange: (_idx, text) => setDemoSubtitle(text),
          onEnd: () => {
            setIsPlayingDemoVoice(false);
            setDemoSubtitle('');
          },
          onError: () => {
            setIsPlayingDemoVoice(false);
            setDemoSubtitle('');
          }
        },
        playbackSpeed
      );
    }
  };

  const handleReplayDemoSpeech = () => {
    speechManager.stop();
    setIsPlayingDemoVoice(true);
    setDemoSubtitle(activeSpokenScript);
    speechManager.speakScript(
      activeSpokenScript,
      currentLanguage,
      {
        onStart: () => setIsPlayingDemoVoice(true),
        onSentenceChange: (_idx, text) => setDemoSubtitle(text),
        onEnd: () => {
          setIsPlayingDemoVoice(false);
          setDemoSubtitle('');
        }
      },
      playbackSpeed
    );
  };

  // Handle Floating Luminous Tablet Voice Playback
  const handleToggleTabletSpeech = () => {
    if (isPlayingTabletVoice) {
      speechManager.stop();
      setIsPlayingTabletVoice(false);
    } else {
      speechManager.stop();
      setIsPlayingDemoVoice(false);
      setIsPlayingTabletVoice(true);
      const tabletData = TABLET_TRANSLATIONS[activeTabletLang] || TABLET_TRANSLATIONS.ta || TABLET_TRANSLATIONS.en;
      speechManager.speakScript(
        tabletData.spoken,
        activeTabletLang,
        {
          onStart: () => setIsPlayingTabletVoice(true),
          onEnd: () => setIsPlayingTabletVoice(false),
          onError: () => setIsPlayingTabletVoice(false)
        },
        1.0
      );
    }
  };

  const handleSelectTabletLang = (langCode: SupportedLanguage) => {
    setActiveTabletLang(langCode);
    setShowTabletLangMenu(false);
    onLanguageChange(langCode);
    if (isPlayingTabletVoice) {
      speechManager.stop();
      setIsPlayingTabletVoice(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-[#f0f9ff]/70 via-[#f8fafc] to-white text-slate-900 overflow-x-hidden relative">
      
      {/* Floating Language Switched Feedback Toast */}
      {langToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-xl shadow-blue-900/20 border border-blue-400/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-blue-200 animate-spin" />
          <span className="text-xs font-bold">
            Translated whole page to {langToast.name} ✨
          </span>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: PEACEFUL, SUNLIT COVERPAGE HERO (FROM REFERENCE IMAGE)
          "From Confusing Documents to Clear Understanding"
          ========================================================================= */}
      <section className="relative w-full bg-[#f4f9fd] overflow-hidden pt-2 pb-10 sm:pb-14 px-3 sm:px-6 lg:px-8">
        
        {/* Soft Ambient Morning Sunbeam Light */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-amber-100/40 via-sky-100/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-[1240px] mx-auto w-full">

          {/* HERO COVER CANVAS: Exact Grandmother Scene with Live Working Controls (Always Visible Everywhere) */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl shadow-sky-900/10 border border-sky-100 bg-[#eaf4fd]">
            
            {/* The Visual Scene Artwork (Eager Loaded) */}
            <img 
              src="/grandmother_cover.jpg" 
              alt="DocuEase Cover: From Confusing Documents to Clear Understanding"
              className="w-full h-auto object-cover select-none pointer-events-none block"
              loading="eager"
            />

            {/* LIVE WORKING HOTSPOT: Try Now Button (Matches Reference Coordinates) */}
            <button
              onClick={onGetStarted}
              className="absolute left-[6.1%] top-[39.2%] w-[12.2%] h-[6.8%] min-h-[38px] rounded-full bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white font-bold text-xs lg:text-sm tracking-wide shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 group cursor-pointer z-20"
              title="Try DocuEase AI Now"
            >
              <span>Try Now</span>
              <span className="text-indigo-200 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>

            {/* LIVE WORKING FLOATING LUMINOUS TABLET (Positioned directly over tablet in artwork) */}
            <div 
              className="absolute left-[59.3%] top-[20.8%] w-[25.8%] h-[40.8%] bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl border-2 border-sky-200/90 shadow-[0_8px_30px_rgba(56,189,248,0.22)] p-2.5 sm:p-3 lg:p-4 flex flex-col justify-between z-20 transition-all hover:shadow-[0_12px_36px_rgba(56,189,248,0.32)]"
            >
              {/* Tablet Top Bar: Document Icon + "Converted to your language" + Language Dropdown */}
              <div className="flex items-center justify-between gap-1 border-b border-slate-100 pb-1.5 sm:pb-2">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-slate-700 truncate">
                    Converted to your language
                  </span>
                </div>

                {/* Interactive Language Dropdown Button */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => setShowTabletLangMenu(!showTabletLangMenu)}
                    className="flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[10px] sm:text-xs font-bold transition-colors cursor-pointer"
                    title="Change Tablet Language"
                  >
                    <span>
                      {SUPPORTED_LANGUAGES.find(l => l.code === activeTabletLang)?.nativeName || 'Tamil'}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-sky-600 transition-transform ${showTabletLangMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu (All 11 Indian Languages) */}
                  {showTabletLangMenu && (
                    <div className="absolute right-0 top-full mt-1 w-44 max-h-56 overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200 py-1 z-50 text-left">
                      <div className="px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        Choose Language
                      </div>
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectTabletLang(lang.code)}
                          className={`w-full text-left px-2.5 py-1.5 text-xs flex items-center justify-between hover:bg-sky-50 transition-colors ${
                            activeTabletLang === lang.code ? 'font-bold text-sky-700 bg-sky-50/70' : 'text-slate-700'
                          }`}
                        >
                          <span>{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tablet Content: Title in Selected Language */}
              <div className="my-auto py-1">
                <h3 className="text-xs sm:text-sm lg:text-base font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-1">
                  {TABLET_TRANSLATIONS[activeTabletLang]?.header || TABLET_TRANSLATIONS.ta.header}
                </h3>

                {/* 3 Bullet Points with Emerald Checkmarks */}
                <div className="mt-1 sm:mt-1.5 space-y-1 sm:space-y-1.5 text-[9px] sm:text-[10px] lg:text-xs text-slate-700 font-medium">
                  {(TABLET_TRANSLATIONS[activeTabletLang]?.items || TABLET_TRANSLATIONS.ta.items).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 leading-tight">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[9px] font-bold">✓</span>
                      </div>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tablet Bottom: Working Audio Waveform Player Bar */}
              <div className="pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center gap-2">
                {/* Play / Pause Circular Button */}
                <button
                  onClick={handleToggleTabletSpeech}
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 transition-transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                  title={isPlayingTabletVoice ? 'Pause Audio' : 'Play Spoken Audio in this Language'}
                >
                  {isPlayingTabletVoice ? (
                    <Pause className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-white ml-0.5" />
                  )}
                </button>

                {/* 16 Animated Waveform Equalizer Bars */}
                <div className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1 h-5 sm:h-6 px-1">
                  {[35, 60, 85, 45, 95, 75, 40, 90, 65, 80, 50, 95, 70, 45, 85, 60].map((h, i) => (
                    <span
                      key={i}
                      className={`w-0.5 sm:w-1 rounded-full transition-all duration-150 ${
                        isPlayingTabletVoice ? 'bg-blue-600' : 'bg-blue-400/50'
                      }`}
                      style={{
                        height: isPlayingTabletVoice 
                          ? `${Math.max(20, (h * (0.5 + 0.5 * Math.sin(Date.now() / 250 + i * 0.8))))}%` 
                          : `${Math.max(20, h * 0.45)}%`,
                        transition: 'height 0.15s ease-in-out'
                      }}
                    />
                  ))}
                </div>

                {/* Speaker Icon with Active Sound Waves */}
                <div 
                  onClick={handleToggleTabletSpeech}
                  className="cursor-pointer text-slate-500 hover:text-blue-600 transition-colors shrink-0" 
                  title="Toggle Audio Voice"
                >
                  <Volume2 className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isPlayingTabletVoice ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
                </div>
              </div>

            </div>

            {/* LIVE WORKING HOTSPOTS: 4 Bottom Feature Cards */}
            {/* Card 1: Upload Document */}
            <div
              onClick={onGetStarted}
              className="absolute left-[8.5%] top-[74%] w-[14.5%] h-[24%] rounded-2xl cursor-pointer hover:bg-sky-500/10 transition-colors z-20"
              title="Upload PDF, image or handwritten prescriptions"
            />

            {/* Card 2: Translate Instantly */}
            <div
              onClick={() => setShowTabletLangMenu(true)}
              className="absolute left-[26.5%] top-[74%] w-[14.5%] h-[24%] rounded-2xl cursor-pointer hover:bg-sky-500/10 transition-colors z-20"
              title="Choose your preferred language"
            />

            {/* Card 3: Get Simple Explanation */}
            <div
              onClick={scrollToDemo}
              className="absolute left-[44.5%] top-[74%] w-[14.5%] h-[24%] rounded-2xl cursor-pointer hover:bg-sky-500/10 transition-colors z-20"
              title="AI converts complex text into easy language"
            />

            {/* Card 4: In Any Language */}
            <div
              onClick={() => setShowTabletLangMenu(true)}
              className="absolute left-[62.5%] top-[74%] w-[14.5%] h-[24%] rounded-2xl cursor-pointer hover:bg-sky-500/10 transition-colors z-20"
              title="From local to global, we've got you covered"
            />

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 2: SEPARATED DUAL EXPERIENCE CARDS (CARD A & CARD B)
          ========================================================================= */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {t.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Two Dedicated Intelligence Tools
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Medical prescriptions require strict pharmacological safeguards, while official documents need clear financial breakdowns. Choose your workflow below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* ---------------- CARD A: MEDICAL PRESCRIPTIONS ---------------- */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-teal-50/50 via-white to-teal-50/30 border-2 border-teal-200/90 hover:border-teal-400 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="space-y-6">
                
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold">
                    MedScan AI
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t.cardATitle}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.cardASubtitle}
                  </p>
                </div>

                {/* Specific Capabilities */}
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>{t.cardAPoint1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span>{t.cardAPoint2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>{t.cardAPoint3}</span>
                  </li>
                </ul>

                {/* Medical Safety Disclaimer Notice */}
                <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{t.cardAWarning}</p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory('prescription');
                    } else {
                      onGetStarted();
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm sm:text-base shadow-md shadow-teal-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>{t.cardABtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* ---------------- CARD B: COMPLEX DOCUMENTS MADE SIMPLE ---------------- */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 border-2 border-sky-200/90 hover:border-sky-400 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="space-y-6">
                
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-sky-700 text-white flex items-center justify-center shadow-md shadow-sky-700/20 group-hover:scale-105 transition-transform">
                    <FileText className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sky-100/70 text-sky-800 text-xs font-bold">
                    DocuSimplify AI
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t.cardBTitle}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.cardBSubtitle}
                  </p>
                </div>

                {/* Specific Capabilities */}
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <span>{t.cardBPoint1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <span>{t.cardBPoint2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                    <span>{t.cardBPoint3}</span>
                  </li>
                </ul>

                {/* Zero Guessing Policy Notice */}
                <div className="p-3.5 rounded-2xl bg-sky-50/90 border border-sky-200/80 text-sky-900 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{t.cardBNotice}</p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory('complex_document');
                    } else {
                      onGetStarted();
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm sm:text-base shadow-md shadow-sky-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>{t.cardBBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE LIVE DEMO (FOR EVALUATORS & USERS)
          ========================================================================= */}
      <section ref={demoSectionRef} className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {t.demoSectionBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.demoSectionTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t.demoSectionSubtitle}
            </p>
          </div>

          {/* Sample Switcher Tabs & Language Control */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  speechManager.stop();
                  setIsPlayingDemoVoice(false);
                  setActiveDemoTab('prescription');
                }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeDemoTab === 'prescription'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.tabPrescription}
              </button>

              <button
                onClick={() => {
                  speechManager.stop();
                  setIsPlayingDemoVoice(false);
                  setActiveDemoTab('utility');
                }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeDemoTab === 'utility'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.tabUtilityBill}
              </button>
            </div>

            {/* Language Selector for Live Demo */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                {t.selectLanguagePrompt}
              </span>
              <select
                value={currentLanguage}
                onChange={(e) => {
                  speechManager.stop();
                  setIsPlayingDemoVoice(false);
                  onLanguageChange(e.target.value as SupportedLanguage);
                }}
                className="px-3 py-2 rounded-xl border border-teal-200 bg-teal-50/50 text-teal-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Side-by-Side 3-Column Interactive Demo Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Col 1: Original Scanned OCR Document (4 Cols) */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.colOriginalTitle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  Real Sample
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {currentSample.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {currentSample.patient}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 space-y-2">
                {currentSample.originalOcrText.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">›</span>
                    <span className="leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-[11px] text-teal-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Extracted with Optical Stroke Analysis • Zero guessing</span>
              </div>
            </div>

            {/* Col 2: Plain-Language Structured Explanation (4 Cols) */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.colExplanationTitle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 uppercase">
                  {currentLanguage}
                </span>
              </div>

              {/* Spoken / Translated Script Display */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/90 text-sm leading-relaxed text-teal-950 font-medium">
                "{activeSpokenScript}"
              </div>

              {/* Items / Meds list */}
              {activeDemoTab === 'prescription' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Detected Medications &amp; Dosage:
                  </p>
                  {(currentSample as typeof DEMO_SAMPLES.prescription).medications.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{m.name}</p>
                        <p className="text-[11px] text-slate-500">{m.timing}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold text-[10px]">
                        {m.dose}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeDemoTab === 'utility' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Key Financial Highlights:
                  </p>
                  {(currentSample as typeof DEMO_SAMPLES.utility).items.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="text-slate-600 font-medium">{item.label}</span>
                      <span className={`font-bold ${item.highlight ? 'text-teal-700 text-sm' : 'text-slate-900'}`}>
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Safety Warning */}
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                {currentSample.warning}
              </p>
            </div>

            {/* Col 3: DocuBot Voice Narration & Live Subtitles (4 Cols) */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-gradient-to-b from-teal-900 to-slate-900 rounded-3xl text-white shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-teal-700/50 pb-2">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    {t.colVoiceTitle}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Google TTS Active
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  DocuBot speaks fluently in {SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.nativeName || currentLanguage} with mouth sync and captions.
                </p>
              </div>

              {/* Mini Avatar or Subtitles visualizer */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/30 border border-teal-400/40 flex items-center justify-center text-teal-300">
                    <Volume2 className={`w-6 h-6 ${isPlayingDemoVoice ? 'animate-bounce text-emerald-400' : ''}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">DocuBot Audio</p>
                    <p className="text-xs text-teal-300">Native {currentLanguage.toUpperCase()} Pronunciation</p>
                  </div>
                </div>

                {/* Subtitle Display */}
                <div className="min-h-[50px] p-2.5 rounded-xl bg-black/40 text-xs text-emerald-300 font-sans leading-relaxed border border-emerald-500/20 flex items-center justify-center">
                  {isPlayingDemoVoice && demoSubtitle ? (
                    <span>"{demoSubtitle}"</span>
                  ) : (
                    <span className="text-slate-400 italic">Click Play to hear DocuBot speak in {currentLanguage.toUpperCase()}</span>
                  )}
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleToggleDemoSpeech}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all transform hover:scale-[1.02]"
                >
                  {isPlayingDemoVoice ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>{t.btnPauseVoice}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 ml-0.5" />
                      <span>{t.btnPlayVoice}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReplayDemoSpeech}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                  title={t.btnReplayVoice}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 3-STEP JOURNEY (HOW IT WORKS)
          ========================================================================= */}
      <section ref={stepsSectionRef} className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto w-full space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              {t.stepsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.stepsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-md space-y-4">
              <span className="text-3xl font-black text-teal-600/40">
                {t.step1Number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.step1Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-md space-y-4">
              <span className="text-3xl font-black text-teal-600/40">
                {t.step2Number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.step2Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all hover:shadow-md space-y-4">
              <span className="text-3xl font-black text-teal-600/40">
                {t.step3Number}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.step3Title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>

          </div>

          {/* Bottom Action */}
          <div className="text-center pt-4">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-base shadow-lg shadow-teal-700/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.navGetStarted}</span>
              <ArrowRight className="w-5 h-5 text-teal-200" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FOOTER & TRUST
          ========================================================================= */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-slate-100 border-t border-slate-200 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>{t.footerRights}</p>
          <p className="text-[11px] text-slate-400 max-w-md">{t.footerMedicalDisclaimer}</p>
        </div>
      </footer>

    </div>
  );
};

export default LandingScreen;
