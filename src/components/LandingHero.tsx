import React, { useState } from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Stethoscope,
  FileSpreadsheet,
  Building2,
  Zap,
  GraduationCap,
  Scale,
  FileText,
  Volume2,
  Languages,
  PenTool,
  AlertCircle
} from 'lucide-react';
import { MainMode, SupportedLanguage, SUPPORTED_LANGUAGES } from '../types/medscript';
import { speechManager } from '../utils/speech';

interface LandingHeroProps {
  onUploadClick: (mode?: MainMode) => void;
  onDemoClick: (sampleIndex?: number) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onUploadClick,
  onDemoClick
}) => {
  const [demoTab, setDemoTab] = useState<'medical' | 'bill' | 'formal'>('medical');
  const [demoLang, setDemoLang] = useState<SupportedLanguage>('en');
  const [isPlayingDemoSpeech, setIsPlayingDemoSpeech] = useState(false);

  const demoData: Record<'medical' | 'bill' | 'formal', {
    category: string;
    original: string;
    translations: Partial<Record<SupportedLanguage, { simple: string; verySimple: string; speech: string }>>;
  }> = {
    medical: {
      category: 'Handwritten Prescription',
      original: 'Tab Dolo 650mg 1-0-1 x 5d PC. Cap Amoxyclav 625 1-1-1 x 3d. Review SOS.',
      translations: {
        en: {
          simple: 'Take Dolo 650mg twice a day (morning and night) after food for 5 days. Take Amoxyclav 625mg three times a day for 3 days. Return to the clinic if symptoms worsen.',
          verySimple: 'Take the fever tablet twice a day after meals. Take the antibiotic three times a day. See your doctor if you feel worse.',
          speech: 'This is a prescription. Take Dolo 650mg twice daily after meals for 5 days. Take Amoxyclav three times daily for 3 days. Return to the clinic if symptoms worsen.'
        },
        te: {
          simple: 'డోలో 650mg రోజూ రెండుసార్లు (ఉదయం మరియు రాత్రి) భోజనం తర్వాత 5 రోజులు వేసుకోండి. అమాక్సిక్లావ్ 625mg రోజుకు మూడుసార్లు 3 రోజులు వేసుకోండి. లక్షణాలు తగ్గకపోతే క్లినిక్‌కు రండి.',
          verySimple: 'జ్వరం మాత్రను భోజనం తర్వాత రోజుకు రెండుసార్లు వేసుకోండి. యాంటీబయాటిక్ మాత్రను రోజుకు మూడుసార్లు వేసుకోండి. నీరసంగా అనిపిస్తే డాక్టర్‌ను చూడండి.',
          speech: 'నమస్కారం! డోలో 650mg రోజూ రెండుసార్లు భోజనం తర్వాత 5 రోజులు వేసుకోండి. అమాక్సిక్లావ్ 625mg రోజుకు మూడుసార్లు 3 రోజులు వేసుకోండి.'
        },
        hi: {
          simple: 'डोलो 650mg दिन में दो बार (सुबह और रात) खाने के बाद 5 दिनों तक लें। अमोक्सीक्लेव 625mg दिन में तीन बार 3 दिनों तक लें। लक्षण बिगड़ने पर डॉक्टर से मिलें।',
          verySimple: 'बुखार की गोली खाने के बाद दिन में दो बार लें। एंटीबायोटिक गोली दिन में तीन बार लें। तबीयत ठीक न लगे तो डॉक्टर को दिखाएं।',
          speech: 'नमस्ते! डोलो 650mg दिन में दो बार खाने के बाद 5 दिनों तक लें। अमोक्सीक्लेव 625mg दिन में तीन बार 3 दिनों तक लें।'
        },
        ta: {
          simple: 'டோலோ 650mg மாத்திரையை உணவுக்குப் பிறகு தினமும் இரண்டு முறை (காலை மற்றும் இரவு) 5 நாட்களுக்கு எடுத்துக் கொள்ளுங்கள். அமோக்ஸிக்லாவ் 625mg தினமும் மூன்று முறை 3 நாட்களுக்கு எடுத்துக் கொள்ளுங்கள்.',
          verySimple: 'காய்ச்சல் மாத்திரையை சாப்பாட்டுக்கு பின் இருவேளை சாப்பிடுங்கள். ஆன்டிபயாடிக் மாத்திரையை மூன்று வேளை சாப்பிடுங்கள்.',
          speech: 'வணக்கம்! டோலோ 650mg உணவுக்குப் பிறகு இருவேளை 5 நாட்களுக்கு சாப்பிடவும். அமோக்ஸிக்லாவ் மூன்று வேளை சாப்பிடவும்.'
        },
        kn: {
          simple: 'ಡೋಲೋ 650mg ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ (ಬೆಳಿಗ್ಗೆ ಮತ್ತು ರಾತ್ರಿ) ಊಟದ ನಂತರ 5 ದಿನಗಳವರೆಗೆ ತೆಗೆದುಕೊಳ್ಳಿ. ಅಮೋಕ್ಸಿಕ್ಲಾವ್ 625mg ದಿನಕ್ಕೆ ಮೂರು ಬಾರಿ 3 ದಿನಗಳವರೆಗೆ ತೆಗೆದುಕೊಳ್ಳಿ.',
          verySimple: 'ಜ್ವರದ ಮಾತ್ರೆ ಊಟದ ನಂತರ ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ತೆಗೆದುಕೊಳ್ಳಿ. ಆ್ಯಂಟಿಬಯೋಟಿಕ್ ಮಾತ್ರೆ ದಿನಕ್ಕೆ ಮೂರು ಬಾರಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
          speech: 'ನಮಸ್ಕಾರ! ಡೋಲೋ 650mg ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ಊಟದ ನಂತರ 5 ದಿನ ತೆಗೆದುಕೊಳ್ಳಿ. ಅಮೋಕ್ಸಿಕ್ಲಾವ್ ಮೂರು ಬಾರಿ ತೆಗೆದುಕೊಳ್ಳಿ.'
        },
        ml: {
          simple: 'ഡോളോ 650mg ദിവസവും രണ്ടുതവണ (രാവിലെയും രാത്രിയും) ഭക്ഷണത്തിന് ശേഷം 5 ദിവസത്തേക്ക് കഴിക്കുക. അമോക്സിക്ലാവ് 625mg ദിവസവും മൂന്നുതവണ 3 ദിവസത്തേക്ക് കഴിക്കുക.',
          verySimple: 'പനിയുടെ ഗുളിക ഭക്ഷണത്തിന് ശേഷം രണ്ടുനേരം കഴിക്കുക. ആന്റിബയോട്ടിക് മൂന്നുനേരം കഴിക്കുക.',
          speech: 'നമസ്കാരം! ഡോളോ 650mg ഭക്ഷണത്തിന് ശേഷം രണ്ടുതവണ കഴിക്കുക. അമോക്സിക്ലാവ് മൂന്നുതവണ കഴിക്കുക.'
        },
        bn: {
          simple: 'ডলো ৬৫০ মিলিগ্রাম দিনে দুবার (সকালে ও রাতে) খাবারের পর ৫ দিন খান। অ্যামোক্সিক্ল্যাভ ৬২৫ মিলিগ্রাম দিনে তিনবার ৩ দিন খান।',
          verySimple: 'জ্বরের ওষুধ খাবারের পর দিনে দুবার খান। অ্যান্টিবায়োটিক দিনে তিনবার খান।',
          speech: 'নমস্কার! ডলো ৬৫০ মিলিগ্রাম দিনে দুবার খাবারের পর ৫ দিন গ্রহণ করুন।'
        },
        mr: {
          simple: 'डोलो ६५० मिलीग्राम दिवसातून दोनदा (सकाळी आणि संध्याकाळी) जेवणानंतर ५ दिवस घ्या. अमोक्सिक्लाव्ह ६२५ मिलीग्राम दिवसातून तीनदा ३ दिवस घ्या.',
          verySimple: 'तापाची गोळी जेवणानंतर दिवसातून दोनदा घ्या. अँटिबायोटिक गोळी दिवसातून तीनदा घ्या.',
          speech: 'नमस्कार! डोलो ६५० मिलीग्राम जेवणानंतर दिवसातून दोनदा ५ दिवस घ्या.'
        },
        gu: {
          simple: 'ડોલો 650mg દિવસમાં બે વાર (સવાર અને રાત્રે) જમ્યા પછી 5 દિવસ લો. એમોક્સિક્લાવ 625mg દિવસમાં ત્રણ વાર 3 દિવસ લો.',
          verySimple: 'તાવની ગોળી જમ્યા પછી દિવસમાં બે વાર લો. એન્ટિબાયોટિક દિવસમાં ત્રણ વાર લો.',
          speech: 'નમસ્તે! ડોલો 650mg જમ્યા પછી દિવસમાં બે વાર 5 દિવસ સુધી લો.'
        },
        pa: {
          simple: 'ਡੋਲੋ 650mg ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ (ਸਵੇਰੇ ਅਤੇ ਰਾਤ) ਖਾਣੇ ਤੋਂ ਬਾਅਦ 5 ਦਿਨਾਂ ਲਈ ਲਓ। ਐਮੋਕਸੀਕਲੇਵ 625mg ਦਿਨ ਵਿੱਚ ਤਿੰਨ ਵਾਰ 3 ਦਿਨਾਂ ਲਈ ਲਓ।',
          verySimple: 'ਬੁਖਾਰ ਦੀ ਗੋਲੀ ਖਾਣੇ ਤੋਂ ਬਾਅਦ ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ ਲਓ। ਐਂਟੀਬਾਇਓਟਿਕ ਦਿਨ ਵਿੱਚ ਤਿੰਨ ਵਾਰ ਲਓ।',
          speech: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਡੋਲੋ 650mg ਖਾਣੇ ਤੋਂ ਬਾਅਦ ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ 5 ਦਿਨਾਂ ਲਈ ਲਓ।'
        },
        ur: {
          simple: 'ڈولو 650 ملی گرام دن میں دو بار (صبح اور رات) کھانے کے بعد 5 دن تک لیں۔ اموکسی کلاو 625 ملی گرام دن میں تین بار 3 دن تک لیں۔',
          verySimple: 'بخار کی گولی کھانے کے بعد دن میں دو بار لیں۔ اینٹی بائیوٹک دن میں تین بار لیں۔',
          speech: 'السلام علیکم! ڈولو 650 ملی گرام کھانے کے بعد دن میں دو بار 5 دن تک لیں۔'
        }
      }
    },
    bill: {
      category: 'Electricity Utility Bill',
      original: 'Current Read: 4892. Prev Read: 4708. Consumed: 184 Units. Net Payable: ₹742.00 Due: 15/10/2026. Disconnection surcharge: ₹50.',
      translations: {
        en: {
          simple: 'You consumed 184 units this month. Your total bill amount is ₹742.00. The payment deadline is 15 October 2026. A late fee of ₹50 applies after the due date.',
          verySimple: 'Your electricity bill is 742 rupees. You must pay it before 15 October. If you pay late, an extra 50 rupees will be added.',
          speech: 'Your electricity bill shows 184 units used. The total amount to pay is 742 rupees before 15 October to prevent disconnection.'
        },
        te: {
          simple: 'ఈ నెలలో 184 యూనిట్లు వినియోగించారు. చెల్లించాల్సిన మొత్తం ₹742.00. ఆఖరి తేదీ 15 అక్టోబర్ 2026. గడువు దాటితే ₹50 లేట్ ఫీజు పడుతుంది.',
          verySimple: 'ఇది కరెంట్ బిల్లు. 15 అక్టోబర్ లోపు ₹742 చెల్లించండి. ఆలస్యమైతే ₹50 అదనంగా పడుతుంది.',
          speech: 'నమస్కారం! మీ కరెంట్ బిల్లు మొత్తం ₹742. 15 అక్టోబర్ లోపు చెల్లించి కరెంట్ కట్ కాకుండా చూసుకోండి.'
        },
        hi: {
          simple: 'इस महीने आपने 184 यूनिट बिजली इस्तेमाल की। कुल देय राशि ₹742.00 है। अंतिम तिथि 15 अक्टूबर 2026 है। देर होने पर ₹50 जुर्माना लगेगा।',
          verySimple: 'यह बिजली का बिल है। 15 अक्टूबर से पहले ₹742 जमा करें ताकि बिजली न कटे।',
          speech: 'नमस्ते! आपका बिजली बिल ₹742 है। 15 अक्टूबर से पहले भुगतान अवश्य करें।'
        },
        ta: {
          simple: 'இந்த மாதம் 184 யூனிட்கள் பயன்படுத்தப்பட்டுள்ளது. கட்டணம் ₹742.00. கடைசி தேதி 15 அக்டோபர் 2026. தாமதக் கட்டணம் ₹50.',
          verySimple: 'மின்சார கட்டணம் ₹742. அக்டோபர் 15-க்குள் செலுத்துங்கள்.',
          speech: 'வணக்கம்! உங்கள் மின்சாரக் கட்டணம் ₹742. அக்டோபர் 15-க்குள் செலுத்துங்கள்.'
        },
        kn: {
          simple: 'ಈ ತಿಂಗಳು 184 ಯೂನಿಟ್ ಬಳಸಲಾಗಿದೆ. ಒಟ್ಟು ಬಿಲ್ ಮೊತ್ತ ₹742.00. ಕೊನೆಯ ದಿನಾಂಕ 15 ಅಕ್ಟೋಬರ್ 2026.',
          verySimple: 'ಇದು ವಿದ್ಯುತ್ ಬಿಲ್. ಅಕ್ಟೋಬರ್ 15 ರೊಳಗೆ ₹742 ಪಾವತಿಸಿ.',
          speech: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ ಮೊತ್ತ ₹742. ಅಕ್ಟೋಬರ್ 15 ರೊಳಗೆ ಪಾವತಿಸಿ.'
        },
        ml: {
          simple: 'ഈ മാസം 184 യൂണിറ്റ് ഉപയോഗിച്ചു. അടയ്ക്കേണ്ട തുക ₹742.00. അവസാന തീയതി 15 ഒക്ടോബർ 2026.',
          verySimple: 'വൈദ്യുതി ബിൽ ₹742 ആണ്. ഒക്ടോബർ 15-ന് മുൻപ് അടയ്ക്കുക.',
          speech: 'നമസ്കാരം! നിങ്ങളുടെ കറന്റ് ബിൽ ₹742 ആണ്. ഒക്ടോബർ 15-ന് മുൻപ് അടയ്ക്കുക.'
        },
        bn: {
          simple: 'এই মাসে ১৮৪ ইউনিট ব্যবহার হয়েছে। মোট বিল ₹৭৪২.০০। শেষ তারিখ ১৫ অক্টোবর ২০২৬।',
          verySimple: 'বিদ্যুৎ বিল ৭৪২ টাকা। ১৫ অক্টোবরের আগে জমা দিন।',
          speech: 'নমস্কার! আপনার বিদ্যুৎ বিল ৭৪২ টাকা। ১৫ অক্টোবরের আগে জমা দিন।'
        },
        mr: {
          simple: 'या महिन्यात १८४ युनिट्स वापरले गेले. एकूण देय रक्कम ₹७४२.०० आहे. अंतिम तारीख १५ ऑक्टोबर २०२६ आहे.',
          verySimple: 'हे विजेचे बिल आहे. १५ ऑक्टोबरपूर्वी ₹७४२ भरा.',
          speech: 'नमस्कार! तुमचे वीज बिल ₹७४२ आहे. १५ ऑक्टोबरपूर्वी भरा.'
        },
        gu: {
          simple: 'આ મહિને 184 યુનિટ વપરાયા છે. કુલ રકમ ₹742.00 છે. છેલ્લી તારીખ 15 ઓક્ટોબર 2026 છે.',
          verySimple: 'આ લાઇટ બિલ છે. 15 ઓક્ટોબર પહેલાં ₹742 ભરો.',
          speech: 'નમસ્તે! તમારું લાઇટ બિલ ₹742 છે. 15 ઓક્ટોબર પહેલાં ભરો.'
        },
        pa: {
          simple: 'ਇਸ ਮਹੀਨੇ 184 ਯੂਨਿਟ ਖਪਤ ਹੋਏ ਹਨ। ਕੁੱਲ ਬਿੱਲ ₹742.00 ਹੈ। ਆਖਰੀ ਮਿਤੀ 15 ਅਕਤੂਬਰ 2026 ਹੈ।',
          verySimple: 'ਬਿਜਲੀ ਦਾ ਬਿੱਲ ₹742 ਹੈ। 15 ਅਕਤੂਬਰ ਤੋਂ ਪਹਿਲਾਂ ਭਰੋ।',
          speech: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡਾ ਬਿਜਲੀ ਦਾ ਬਿੱਲ ₹742 ਹੈ। 15 ਅਕਤੂਬਰ ਤੋਂ ਪਹਿਲਾਂ ਭਰੋ।'
        },
        ur: {
          simple: 'اس ماہ 184 یونٹ استعمال ہوئے۔ کل واجب الادا رقم ₹742.00 ہے۔ آخری تاریخ 15 اکتوبر 2026 ہے۔',
          verySimple: 'بجلی کا بل ₹742 ہے۔ 15 اکتوبر سے پہلے جمع کرائیں۔',
          speech: 'السلام علیکم! آپ کا بجلی کا بل ₹742 ہے۔ 15 اکتوبر سے پہلے ادا کریں۔'
        }
      }
    },
    formal: {
      category: 'Bank / Government Official Notice',
      original: 'Applicants are required to furnish the requisite documentation prior to commencement of the aforementioned verification process.',
      translations: {
        en: {
          simple: 'You need to submit the required identity and address documents before the verification process can start.',
          verySimple: 'Give your required papers to the office before the check begins. Keep photocopies with you.',
          speech: 'This official notice asks you to submit your required documents before the verification starts.'
        },
        te: {
          simple: 'ధృవీకరణ ప్రక్రియ ప్రారంభం కావడానికి ముందే అవసరమైన గుర్తింపు మరియు చిరునామా పత్రాలను సమర్పించాలి.',
          verySimple: 'తనిఖీ ప్రారంభమయ్యే లోపు మీ కాగితాలను కార్యాలయంలో ఇవ్వండి. జిరాక్స్ కాపీలు ఉంచుకోండి.',
          speech: 'ధృవీకరణ ప్రక్రియ మొదలయ్యే లోపు మీ గుర్తింపు పత్రాలను సమర్పించండి.'
        },
        hi: {
          simple: 'सत्यापन प्रक्रिया शुरू होने से पहले आपको आवश्यक पहचान और पते के दस्तावेज जमा करने होंगे।',
          verySimple: 'जांच शुरू होने से पहले अपने जरूरी कागजात दफ्तर में जमा करें। फोटोकॉपी पास रखें।',
          speech: 'सत्यापन शुरू होने से पहले कृपया अपने आवश्यक दस्तावेज कार्यालय में जमा करें।'
        },
        ta: {
          simple: 'சரிபார்ப்பு செயல்முறை தொடங்குவதற்கு முன் தேவையான ஆவணங்களை நீங்கள் சமர்ப்பிக்க வேண்டும்.',
          verySimple: 'ஆய்வு தொடங்குவதற்கு முன் தேவையான ஆவணங்களை அலுவலகத்தில் சமர்ப்பிக்கவும்.',
          speech: 'சரிபார்ப்பு தொடங்குவதற்கு முன் தேவையான ஆவணங்களை சமர்ப்பிக்கவும்.'
        },
        kn: {
          simple: 'ಪರಿಶೀಲನಾ ಪ್ರಕ್ರಿಯೆ ಪ್ರಾರಂಭವಾಗುವ ಮೊದಲು ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ನೀವು ಸಲ್ಲಿಸಬೇಕು.',
          verySimple: 'ತಪಾಸಣೆ ಪ್ರಾರಂಭವಾಗುವ ಮೊದಲು ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ನೀಡಿ.',
          speech: 'ಪರಿಶೀಲನೆ ಪ್ರಾರಂಭವಾಗುವ ಮೊದಲು ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿ.'
        },
        ml: {
          simple: 'പരിശോധന ആരംഭിക്കുന്നതിന് മുൻപായി ആവശ്യമായ രേഖകൾ സമർപ്പിക്കേണ്ടതാണ്.',
          verySimple: 'പരിശോധനയ്ക്ക് മുൻപായി രേഖകൾ സമർപ്പിക്കുക.',
          speech: 'പരിശോധന ആരംഭിക്കുന്നതിന് മുൻപ് രേഖകൾ സമർപ്പിക്കുക.'
        },
        bn: {
          simple: 'যাচাই প্রক্রিয়া শুরু হওয়ার আগে প্রয়োজনীয় কাগজপত্র জমা দিতে হবে।',
          verySimple: 'যাচাই শুরু হওয়ার আগে কাগজপত্র অফিসে জমা দিন।',
          speech: 'যাচাইকরণ শুরু হওয়ার আগে প্রয়োজনীয় কাগজপত্র জমা দিন।'
        },
        mr: {
          simple: 'पडताळणी प्रक्रिया सुरू होण्यापूर्वी आवश्यक कागदपत्रे सादर करणे आवश्यक आहे.',
          verySimple: 'तपासणी सुरू होण्यापूर्वी कागदपत्रे कार्यालयात जमा करा.',
          speech: 'पडताळणी सुरू होण्यापूर्वी आवश्यक कागदपत्रे सादर करा.'
        },
        gu: {
          simple: 'ચકાસણી પ્રક્રિયા શરૂ થાય તે પહેલાં જરૂરી દસ્તાવેજો જમા કરાવવા પડશે.',
          verySimple: 'તપાસ શરૂ થાય તે પહેલાં તમારા જરૂરી કાગળો આપો.',
          speech: 'ચકાસણી શરૂ થાય તે પહેલાં જરૂરી કાગળો જમા કરાવો.'
        },
        pa: {
          simple: 'ਪੜਤਾਲ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਜਮ੍ਹਾਂ ਕਰਵਾਉਣੇ ਜ਼ਰੂਰੀ ਹਨ।',
          verySimple: 'ਜਾਂਚ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੇ ਜ਼ਰੂਰੀ ਕਾਗਜ਼ ਜਮ੍ਹਾਂ ਕਰਵਾਓ।',
          speech: 'ਪੜਤਾਲ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਲੋੜੀਂਦੇ ਕਾਗਜ਼ ਜਮ੍ਹਾਂ ਕਰਵਾਓ।'
        },
        ur: {
          simple: 'تصدیقی عمل شروع ہونے سے پہلے ضروری دستاویزات جمع کرانا لازمی ہے۔',
          verySimple: 'جانچ شروع ہونے سے پہلے ضروری کاغذات دفتر میں جمع کرائیں۔',
          speech: 'تصدیق کا عمل شروع ہونے سے پہلے ضروری کاغذات جمع کرائیں۔'
        }
      }
    }
  };

  const currentTabObj = demoData[demoTab];
  const activeTranslation = currentTabObj.translations[demoLang] || currentTabObj.translations.en || {
    simple: currentTabObj.original,
    verySimple: currentTabObj.original,
    speech: currentTabObj.original
  };
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === demoLang) || SUPPORTED_LANGUAGES[0];

  const handlePlayDemoSpeech = () => {
    if (isPlayingDemoSpeech) {
      speechManager.stop();
      setIsPlayingDemoSpeech(false);
      return;
    }

    setIsPlayingDemoSpeech(true);
    speechManager.speakScript(
      activeTranslation.speech,
      demoLang,
      {
        onEnd: () => setIsPlayingDemoSpeech(false),
        onError: () => setIsPlayingDemoSpeech(false)
      }
    );
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      
      {/* Background Soft Gradients */}
      <div className="absolute top-0 left-1/3 w-[550px] h-[550px] bg-teal-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[480px] h-[480px] bg-blue-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/4 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Core Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs sm:text-sm font-bold shadow-2xs mb-6">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Universal AI Document Understanding &amp; Accessibility</span>
          <span className="hidden sm:inline text-teal-300">|</span>
          <span className="hidden sm:inline text-teal-700 font-medium">11 Indian Languages + Voice</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-4">
          Don’t understand a document?
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-medblue-600 to-indigo-600">
            Upload it. We’ll explain it.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-8">
          Krishxtattva turns handwritten prescriptions, doctor notes, lab reports, bank letters, utility bills, and complicated text into <strong className="text-slate-800">simple language</strong>, <strong className="text-slate-800">voice explanations</strong>, and an <strong className="text-slate-800">AI visual cartoon guide</strong>.
        </p>

        {/* Two Main Mode Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onUploadClick('medical')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-base font-bold shadow-lg shadow-teal-600/25 transition-all transform active:scale-95"
          >
            <Stethoscope className="w-5 h-5" />
            Upload Medical Document
          </button>

          <button
            onClick={() => onUploadClick('general')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-base font-bold border-2 border-slate-200 hover:border-indigo-300 shadow-md transition-all transform active:scale-95"
          >
            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            Simplify Any Document
          </button>
        </div>

        {/* Visual Workflow Infographic: Left (Messy) -> Middle (AI) -> Right (Simple + Voice) */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl mb-14 text-left">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-teal-700">How Krishxtattva Works</span>
              <h3 className="text-lg font-bold text-slate-900">From Complex Document to Instant Understanding</h3>
            </div>
            <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Zero guessing &bull; 100% Traceable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Step 1: Messy Input */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase mb-2">
                <PenTool className="w-4 h-4" />
                <span>1. Difficult Document</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-700 leading-snug">
                <p className="line-through decoration-rose-400">Tab Dolo 650 1-0-1 PC</p>
                <p className="line-through decoration-rose-400">Net Payable: ₹742.00 Due: 15/10</p>
                <p className="text-2xs text-slate-400 mt-1 italic font-sans">Messy handwriting, dense jargon, legal clauses</p>
              </div>
            </div>

            {/* Step 2: Krishxtattva Engine */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-4 border border-teal-200 text-center relative">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-2 font-bold text-sm shadow-xs">
                K
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Krishxtattva AI Engine</h4>
              <p className="text-2xs text-slate-600 mt-1">
                OCR &bull; Gemini Multimodal Vision &bull; Deterministic Safety Rules
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-teal-800 font-bold bg-white/80 px-2 py-0.5 rounded-md border border-teal-200">
                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                Facts Separated from Advice
              </div>
            </div>

            {/* Step 3: Simple Output */}
            <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase mb-2">
                <Volume2 className="w-4 h-4" />
                <span>3. Simple Words + Voice</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-teal-100 text-xs text-slate-800 leading-relaxed font-sans">
                <p className="font-semibold text-teal-900">“Take fever tablet twice a day after meals.”</p>
                <p className="text-2xs text-slate-500 mt-1">KrishBuddy reads aloud with live captions in your language.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Conversion Sandbox */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mb-14 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Interactive Preview</span>
              <h3 className="text-lg font-bold text-slate-900">See How Krishxtattva Simplifies Any Document</h3>
            </div>

            {/* Sandbox Category Tabs */}
            <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
              <button
                onClick={() => { speechManager.stop(); setIsPlayingDemoSpeech(false); setDemoTab('medical'); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  demoTab === 'medical' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Prescription
              </button>
              <button
                onClick={() => { speechManager.stop(); setIsPlayingDemoSpeech(false); setDemoTab('bill'); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  demoTab === 'bill' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Electricity Bill
              </button>
              <button
                onClick={() => { speechManager.stop(); setIsPlayingDemoSpeech(false); setDemoTab('formal'); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  demoTab === 'formal' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Official Notice
              </button>
            </div>
          </div>

          {/* 11 Indian Languages Switcher Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-teal-50/70 border border-teal-100">
            <span className="text-[10px] font-extrabold uppercase text-teal-800 px-1.5 flex items-center gap-1">
              <span>Choose Language:</span>
            </span>
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  speechManager.stop();
                  setIsPlayingDemoSpeech(false);
                  setDemoLang(l.code);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  demoLang === l.code
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white hover:bg-teal-100/50 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{l.nativeName}</span>
                <span className="text-[10px] font-normal opacity-75 ml-1">({l.name})</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            {/* Original Card */}
            <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                Original Difficult Document Text
              </span>
              <p className="text-sm font-medium text-slate-800 leading-relaxed font-mono">
                {currentTabObj.original}
              </p>
            </div>

            {/* Simplified Card */}
            <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-teal-700 block mb-1">
                Plain Everyday Language (Simple) &bull; {currentLangObj.nativeName}
              </span>
              <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                {activeTranslation.simple}
              </p>
            </div>
          </div>

          {/* Very Simple Card for Low Literacy */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 mb-2">
            <span className="text-2xs font-extrabold uppercase tracking-wider text-amber-800 block mb-1">
              Very Simple Explanation (For Low Literacy / 1st Grade Reading Level) &bull; {currentLangObj.nativeName}
            </span>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {activeTranslation.verySimple}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePlayDemoSpeech}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs ${
                isPlayingDemoSpeech 
                  ? 'bg-amber-500 text-white animate-pulse' 
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingDemoSpeech ? 'Pause Voice' : `Listen with KrishBuddy Voice in ${currentLangObj.name}`}</span>
            </button>

            <button
              onClick={() => onDemoClick(demoTab === 'medical' ? 0 : demoTab === 'bill' ? 2 : 3)}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
            >
              <span>Open full interactive results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Supported Categories Grid */}
        <div className="max-w-5xl mx-auto mb-16 text-left">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-slate-900">Supported Document Categories</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Krishxtattva is your universal assistant for any difficult document in daily life.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {[
              {
                icon: Stethoscope,
                title: 'Medical Documents',
                desc: 'Handwritten prescriptions, doctor notes, lab reports, discharge summaries, medicine labels',
                color: 'text-teal-600 bg-teal-50 border-teal-200'
              },
              {
                icon: Zap,
                title: 'Utility Bills',
                desc: 'Electricity, gas, water, internet, and mobile phone billing statements',
                color: 'text-amber-600 bg-amber-50 border-amber-200'
              },
              {
                icon: Building2,
                title: 'Banking & Financial',
                desc: 'Bank letters, loan/EMI notices, account statements, payment requests, insurance',
                color: 'text-blue-600 bg-blue-50 border-blue-200'
              },
              {
                icon: FileText,
                title: 'Government Notices',
                desc: 'Official letters, welfare schemes, public notices, certificates, tax alerts',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
              },
              {
                icon: GraduationCap,
                title: 'Education Documents',
                desc: 'College circulars, school notices, examination schedules, admit cards, scholarships',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
              },
              {
                icon: Scale,
                title: 'Legal & Agreements',
                desc: 'Formal contracts, rental agreements, terms and conditions, official notices',
                color: 'text-purple-600 bg-purple-50 border-purple-200'
              },
              {
                icon: PenTool,
                title: 'Handwritten Notes',
                desc: 'Difficult doctor handwriting, informal letters, handwritten application forms',
                color: 'text-rose-600 bg-rose-50 border-rose-200'
              },
              {
                icon: Globe,
                title: 'Technical & Complex Text',
                desc: 'Technical instruction manuals, academic papers, dense formal English paragraphs',
                color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
              }
            ].map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 border ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{cat.title}</h4>
                  <p className="text-2xs text-slate-500 leading-snug">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 11 Indian Languages Ribbon */}
        <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-teal-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Languages className="w-3.5 h-3.5" />
            <span>Empowering Everyone in Their Own Language</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            Available in 11 Indian Languages with Voice &amp; Synchronized Captions
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {[
              'English', 'తెలుగు (Telugu)', 'हिन्दी (Hindi)', 'தமிழ் (Tamil)', 
              'ಕನ್ನಡ (Kannada)', 'മലയാളം (Malayalam)', 'বাংলা (Bengali)', 
              'मराठी (Marathi)', 'ગુજરાતી (Gujarati)', 'ਪੰਜਾਬੀ (Punjabi)', 'اردو (Urdu)'
            ].map((lang, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-800/90 text-slate-200 rounded-full text-xs font-semibold border border-slate-700">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Safety & Trust Principle Banner */}
        <div className="max-w-3xl mx-auto text-center border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700">Safety Guarantee:</strong> Krishxtattva does NOT allow an AI language model to make final safety-critical medical decisions. Structured facts are validated with deterministic clinical rules. Humans remain the final authority.
          </p>
        </div>

      </div>
    </section>
  );
};
