import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Cpu, Users, Lock, ChevronLeft, Map, Activity, Bell, Languages 
} from 'lucide-react';

const AboutPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [lang, setLang] = useState('en');

  // Strict Brand Name - No Translation
  const BRAND = "आपदा-Flow";

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      sub: "Emergency Support System", back: "BACK TO DASHBOARD",
      h1: "Your Safety,", h2: "Simplified",
      desc: `${BRAND} is a dedicated platform designed to help citizens stay informed and safe during natural disasters and emergencies.`,
      m1_t: "Real-Time Awareness", m1_d: "We gather official safety alerts from across the country and bring them into one clear view.",
      m2_t: "Local Resources", m2_d: "Find exactly what you need—from the nearest hospital to active relief centers.",
      m3_t: "Always Accessible", m3_d: "The system is built to stay functional even when your internet connection is weak.",
      approach: "Our Approach", help: "HOW WE HELP", 
      quote: "During an emergency, the last thing you should worry about is where to find reliable information.",
      how_desc: "Our system works in the background to simplify complex reports into easy-to-read updates. We focus on speed and reliability.",
      verified: "Verified Sources", citizen: "Citizen Centric", arch: "Backend Architecture",
      footer: "Empowering Citizens through Information • 2026"
    },
    hi: {
      sub: "आपातकालीन सहायता प्रणाली", back: "डैशबोर्ड पर वापस",
      h1: "आपकी सुरक्षा,", h2: "सरलीकृत",
      desc: `${BRAND} एक समर्पित मंच है जिसे आपदाओं के दौरान नागरिकों को सूचित और सुरक्षित रखने के लिए डिज़ाइन किया गया है।`,
      m1_t: "वास्तविक समय जागरूकता", m1_d: "हम देश भर से आधिकारिक सुरक्षा अलर्ट एकत्र करते हैं और उन्हें एक स्पष्ट दृश्य में लाते हैं।",
      m2_t: "स्थानीय संसाधन", m2_d: "निकटतम अस्पताल से लेकर राहत केंद्रों तक, वह सब कुछ खोजें जिसकी आपको आवश्यकता है।",
      m3_t: "हमेशा सुलभ", m3_d: "सिस्टम कमजोर इंटरनेट कनेक्शन में भी कार्यात्मक रहने के लिए बनाया गया है।",
      approach: "हमारा दृष्टिकोण", help: "हम कैसे मदद करते हैं", 
      quote: "आपातकाल के दौरान, विश्वसनीय जानकारी कहाँ मिलेगी, यह आपकी चिंता नहीं होनी चाहिए।",
      how_desc: "हमारा सिस्टम जटिल रिपोर्टों को सरल बनाने के लिए काम करता है। हम गति और विश्वसनीयता पर ध्यान देते हैं।",
      verified: "सत्यापित स्रोत", citizen: "नागरिक केंद्रित", arch: "बैकएंड आर्किटेक्चर",
      footer: "सूचना के माध्यम से नागरिकों का सशक्तिकरण • 2026"
    },
    bn: {
      sub: "জরুরী সহায়তা ব্যবস্থা", back: "ড্যাশবোর্ডে ফিরে যান",
      h1: "আপনার সুরক্ষা,", h2: "সরলীকৃত",
      desc: `${BRAND} হল একটি নিবেদিত প্ল্যাটফর্ম যা প্রাকৃতিক দুর্যোগের সময় নাগরিকদের নিরাপদ রাখতে সাহায্য করে।`,
      m1_t: "রিয়েল-টাইম সচেতনতা", m1_d: "আমরা সারা দেশ থেকে অফিসিয়াল সুরক্ষা সতর্কতা সংগ্রহ করি।",
      m2_t: "স্থানীয় সম্পদ", m2_d: "নিকটতম হাসপাতাল থেকে ত্রাণ কেন্দ্র পর্যন্ত সব খুঁজে নিন।",
      m3_t: "সর্বদা অ্যাক্সেসযোগ্য", m3_d: "ইন্টারনেট সংযোগ দুর্বল থাকলেও সিস্টেমটি কার্যকর থাকে।",
      approach: "আমাদের পদ্ধতি", help: "আমরা কীভাবে সাহায্য করি", 
      quote: "জরুরী অবস্থার সময়, নির্ভরযোগ্য তথ্য কোথায় পাবেন তা নিয়ে আপনার চিন্তা করা উচিত নয়।",
      how_desc: "আমাদের সিস্টেম জটিল রিপোর্টগুলিকে সহজ করার জন্য কাজ করে।",
      verified: "যাচাইকৃত উৎস", citizen: "নাগরিক কেন্দ্রিক", arch: "ব্যাকএন্ড আর্কিটেকচার",
      footer: "তথ্যের মাধ্যমে ক্ষমতায়ন • ২০২৬"
    },
    as: {
      sub: "জৰুৰীকালীন সহায় প্ৰণালী", back: "ডেশ্ববৰ্ডলৈ ঘূৰি যাওক",
      h1: "আপোনাৰ সুৰক্ষা,", h2: "সৰলীকৃত",
      desc: `প্ৰাকৃতিক দুৰ্যোগৰ সময়ত নাগৰিকক সুৰক্ষিত ৰখাৰ এক মঞ্চ হ’ল ${BRAND}।`,
      m1_t: "ৰিয়েল-টাইম সজাগতা", m1_d: "আমি দেশৰ চৰকাৰী সুৰক্ষা সতৰ্কবাণীসমূহ সংগ্ৰহ কৰোঁ।",
      m2_t: "স্থানীয় সম্পদ", m2_d: "চিকিৎসালয় আৰু সাহায্য কেন্দ্ৰসমূহ বিচাৰি উলিওৱাত সহায় কৰে।",
      m3_t: "সদায় সুলভ", m3_d: "ইণ্টাৰনেট দুৰ্বল হ’লেও এই ব্যৱস্থাটো কাৰ্যকৰী হৈ থাকে।",
      approach: "আমাৰ দৃষ্টিভংগী", help: "আমি কেনেকৈ সহায় কৰো", 
      quote: "জৰুৰীকালীন অৱস্থাত, বিশ্বাসযোগ্য তথ্য ক’ত পোৱা যাব সেইটো চিন্তাৰ বিষয় নহয়।",
      how_desc: "আমাৰ প্ৰণালীয়ে জটিল ৰিপৰ্টসমূহ সৰল কৰিবলৈ কাম কৰে।",
      verified: "সত্যাপিত উৎস", citizen: "নাগৰিক কেন্দ্ৰিক", arch: "বেকেণ্ড স্থাপত্য",
      footer: "সৱলীকৰণ • ২০২৬"
    },
    mni: {
      sub: "ইমর্জেন্সী সপোর্ত সিস্তেম", back: "দেশবোর্দতা হনবা",
      h1: "নহাক্কী সেফতী,", h2: "লাইথোকহনবা",
      desc: `${BRAND} অসি খুদোংথিবশিং মনুংদা মীয়ামদা ই-পাউ ফংহন্নবা শেম্বা পাম্বৈ অমনি।`,
      m1_t: "রিয়েল-টাইম এৱেয়ারনেস", m1_d: "লৈবাক অসিগী সেফতী এলর্তশিং অমত্তা ওইনা ফংহল্লি।",
      m2_t: "লোকেল রিসোর্স", m2_d: "হোস্পিতাল অমসুং রিলিফ সেন্টরশিং খঙদোকপদা মতেং ওই।",
      m3_t: "সদায় ফংবা", m3_d: "ইন্তরনেত কনেক্সন ফত্তবা মনুংদসু মথৌ তৌবা ঙম্মি।",
      approach: "ঐখোয়গী থৌরাং", help: "ঐখোয়না মতেং পাংবা মওং", 
      quote: "খুদোংথিবগী মনুংদা, চুম্বা ই-পাউ কদাইদা ফংগনি হায়বদু নহাক্কী অৱাবা ওইহনগদবনি।",
      how_desc: "ঐখোয়গী সিস্তেম অসিনা ই-পাউশিং লাইনা খঙহন্নবা থৌরাং তৌই।",
      verified: "অফিসিএল সোর্স", citizen: "সিটিজেন সেন্ট্রিক", arch: "বেকেণ্ড আর্কিতেকচর",
      footer: "মীয়ামদা শক্তি পীব • ২০২৬"
    },
    gu: {
      sub: "ઇમરજન્સી સપોર્ટ સિસ્ટમ", back: "ડેશબોર્ડ પર પાછા ફરો",
      h1: "તમારી સુરક્ષા,", h2: "સરળીકૃત",
      desc: `${BRAND} કુદરતી આફતો દરમિયાન નાગરિકોને સુરક્ષિત રાખવાનું પ્લેટફોર્મ છે।`,
      m1_t: "રીઅલ-ટાઇમ જાગૃતિ", m1_d: "અમે દેશભરમાંથી સત્તાવાર સુરક્ષા ચેતવણીઓ એકત્રિત કરીએ છીએ।",
      m2_t: "સ્થાનિક સંસાધનો", m2_d: "નજીકની હોસ્પિટલ અને રાહત કેન્દ્રો શોધો।",
      m3_t: "હંમેશા સુલભ", m3_d: "નબળા ઇન્ટરનેટમાં પણ સિસ્ટમ કાર્યરત રહે છે।",
      approach: "અમારો અભિગમ", help: "અમે કેવી રીતે મદદ કરીએ છીએ", 
      quote: "કટોકટી દરમિયાન, વિશ્વસનીય માહિતી મેળવવી એ તમારી ચિંતા ન હોવી જોઈએ।",
      how_desc: "અમારી સિસ્ટમ જટિલ અહેવાલોને સરળ બનાવવા માટે કાર્ય કરે છે।",
      verified: "ચકાસાયેલ સ્ત્રોતો", citizen: "નાગરિક કેન્દ્રિત", arch: "બેકએન્ડ આર્કિટેક્ચર",
      footer: "નાગરિકોનું સશક્તિકરણ • 2026"
    },
    mr: {
      sub: "आत्त्कालीन मदत प्रणाली", back: "डॅशबोर्डवर परत जा",
      h1: "तुमची सुरक्षा,", h2: "सरलीकृत",
      desc: `${BRAND} नागरिकांना सुरक्षित ठेवण्यासाठी तयार केलेले व्यासपीठ आहे।`,
      m1_t: "रिअल-टाइम जागरूकता", m1_d: "आम्ही देशभरातून अधिकृत सुरक्षा सूचना एकत्रित करतो।",
      m2_t: "स्थानिक संसाधने", m2_d: "जवळच्या रुग्णालयापासून ते मदत केंद्रांपर्यंत माहिती मिळवा।",
      m3_t: "नेहमी उपलब्ध", m3_d: "इंटरनेट कमकुवत असतानाही ही प्रणाली कार्यरत राहते।",
      approach: "आमचा दृष्टिकोन", help: "आम्ही कशी मदत करतो", 
      quote: "आणीबाणीच्या वेळी, विश्वसनीय माहिती कोठे मिळेल याची काळजी करू नका।",
      how_desc: "आमची प्रणाली जटिल अहवालांना सुलभ करण्यासाठी कार्य करते।",
      verified: "सत्यापित स्रोत", citizen: "नागरिक केंद्रित", arch: "बॅकएंड आर्किटेक्चर",
      footer: "नागरिकांचे सक्षમીकरण • 2026"
    },
    ur: {
      sub: "ہنگامی امدادی نظام", back: "ڈیش بورڈ پر واپس",
      h1: "آپ کی حفاظت،", h2: "آسان",
      desc: `شہریوں کو باخبر رکھنے کے لیے ${BRAND} ایک وقف شدہ پلیٹ فارم ہے۔`,
      m1_t: "بروقت آگاہی", m1_d: "ہم ملک بھر سے سرکاری حفاظتی الرٹس جمع کرتے ہیں۔",
      m2_t: "مقامی وسائل", m2_d: "قریبی ہسپتالوں اور امدادی مراکز کے بارے میں معلومات حاصل کریں۔",
      m3_t: "ہمیشہ دستیاب", m3_d: "یہ نظام انٹرنیٹ کمزور ہونے پر بھی کام کرتا ہے۔",
      approach: "ہمارا طریقہ کار", help: "ہم کیسے مدد کرتے ہیں", 
      quote: "ہنگامی صورتحال میں، قابل اعتماد معلومات کہاں سے ملے گی، یہ آپ کی پریشانی نہیں ہونی چاہیے۔",
      how_desc: "ہمارا نظام پیچیدہ رپورٹس کو سادہ بنانے کے لیے کام کرتا ہے۔",
      verified: "تصدیق شدہ ذرائع", citizen: "عوامی مرکز", arch: "بیک اینڈ آرکیٹیکچر",
      footer: "بااختیار بنانا • 2026"
    },
    pa: {
      sub: "ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ ਪ੍ਰਣਾਲੀ", back: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਵਾਪਸ",
      h1: "ਤੁਹਾਡੀ ਸੁਰੱਖਿਆ,", h2: "ਸਰਲ",
      desc: `${BRAND} ਨਾਗਰਿਕਾਂ ਨੂੰ ਸੂਚਿਤ এবং ਸੁਰੱਖਿਅਤ ਰੱਖਣ ਲਈ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ।`,
      m1_t: "ਰੀਅਲ-ਟਾਈਮ ਜਾਗਰੂਕਤਾ", m1_d: "ਅਸੀਂ ਦੇਸ਼ ਭਰ ਤੋਂ ਸਰਕਾਰੀ ਸੁਰੱਖਿਆ ਅਲਰਟ ਇਕੱਠੇ ਕਰਦੇ ਹਾਂ।",
      m2_t: "ਸਥਾਨਕ ਸਰੋਤ", m2_d: "ਨੇੜਲੇ ਹਸਪਤਾਲ ਅਤੇ ਰਾਹਤ ਕੇਂਦਰਾਂ ਦੀ ਜਾਣਕਾਰੀ ਲਓ।",
      m3_t: "ਹਮੇਸ਼ਾ ਉਪਲਬਧ", m3_d: "ਕਮਜ਼ੋਰ ਇੰਟਰਨੈਟ 'ਤੇ ਵੀ ਕੰਮ ਕਰਨ ਲਈ ਬਣਾਈ ਗਈ ਹੈ।",
      approach: "ਸਾਡਾ ਤਰੀਕਾ", help: "ਅਸੀਂ ਕਿਵੇਂ ਮਦਦ ਕਰਦੇ ਹਾਂ", 
      quote: "ਐਮਰਜੈਂਸੀ ਦੌਰਾਨ, ਭਰੋਸੇਯੋਗ ਜਾਣਕਾਰੀ ਕਿੱਥੋਂ ਮਿਲੇਗੀ، ਇਹ ਤੁਹਾਡੀ ਚਿੰਤਾ ਨਹੀਂ ਹੋਣੀ ਚਾਹੀਦੀ।",
      how_desc: "ਸਾਡਾ ਸਿਸਟম ਗੁੰਝਲਦਾਰ ਰਿਪੋਰਟਾਂ ਨੂੰ ਸਰਲ ਬਣਾਉਂਦਾ ਹੈ।",
      verified: "ਪ੍ਰਮਾਣਿਤ ਸਰੋত", citizen: "ਨਾਗਰਿਕ ਕੇਂਦ੍ਰਿਤ", arch: "ਬੈਕਐਂਡ ਆਰਕੀਟੈਕਚਰ",
      footer: "ਸਸ਼ਕਤੀਕਰਨ • 2026"
    },
    te: {
      sub: "అత్యవసర సహాయ వ్యవస్థ", back: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి",
      h1: "మీ భద్రత,", h2: "సరళీకృతం",
      desc: `విపత్తుల సమయంలో పౌరులకు సమాచారం అందించడానికి ${BRAND} రూపొందించబడింది.`,
      m1_t: "నిజ-సమయ అవగాహన", m1_d: "మేము దేశవ్యాప్తంగా అధికారిక భద్రతా హెచ్చరికలను అందిస్తాము.",
      m2_t: "స్థానిక వనరులు", m2_d: "సమీప ఆసుపత్రి నుండి సహాయ కేంద్రాల వరకు కనుగొనండి.",
      m3_t: "ఎల్లప్పుడూ అందుబాటులో", m3_d: "ఇంటర్నెట్ బలహీనంగా ఉన్నప్పటికీ సిస్టమ్ పనిచేస్తుంది.",
      approach: "మా విధానం", help: "మేము ఎలా సహాయం చేస్తాము", 
      quote: "అత్యవసర సమయంలో, నమ్మదగిన సమాచారం కోసం వెతకడం మీ ఆందోళన కాకూడదు.",
      how_desc: "క్లిష్టమైన నివేదికలను సులభంగా అర్థమయ్యేలా మా సిస్టమ్ పనిచేస్తుంది.",
      verified: "ధృవీకరించబడిన మూలాలు", citizen: "పౌర కేంద్రం", arch: "బ్యాకెండ్ ఆర్కిటెక్చర్",
      footer: "పౌరుల సాధికారత • 2026"
    },
    ta: {
      sub: "அவசரகால ஆதரவு அமைப்பு", back: "டாஷ்போர்டிற்குத் திரும்பு",
      h1: "உங்கள் பாதுகாப்பு,", h2: "எளிமைப்படுத்தப்பட்டது",
      desc: `பேரிடர்களின் போது குடிமக்கள் பாதுகாப்பாக இருக்க ${BRAND} ஒரு பிரத்யேக தளமாகும்.`,
      m1_t: "நிகழ்நேர விழிப்புணர்வு", m1_d: "பாதுகாப்பு எச்சரிக்கைகளை நாங்கள் சேகரித்து வழங்குகிறோம்.",
      m2_t: "உள்ளூர் ஆதாரங்கள்", m2_d: "மருத்துவமனை முதல் நிவாரண மையங்கள் வரை கண்டறிய உதவுகிறோம்.",
      m3_t: "எப்போதும் அணுகக்கூடியது", m3_d: "இணையம் பலவீனமாக இருந்தாலும் இந்த அமைப்பு செயல்படும்.",
      approach: "எங்கள் அணுகுமுறை", help: "நாங்கள் எப்படி உதவுகிறோம்", 
      quote: "அவசரகாலத்தில், நம்பகமான தகவலை தேடுவது உங்கள் கவலையாக இருக்கக்கூடாது.",
      how_desc: "சிக்கலான அறிக்கைகளை எளிதாக்க எங்கள் அமைப்பு செயல்படுகிறது.",
      verified: "சரிபார்க்கப்பட்ட ஆதாரங்கள்", citizen: "குடிமக்கள் மையம்", arch: "பின்னணி கட்டமைப்பு",
      footer: "தகவல் மூலம் அதிகாரம் • 2026"
    },
    kn: {
      sub: "ತುರ್ತು ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ", back: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
      h1: "ನಿಮ್ಮ ಸುರಕ್ಷತೆ,", h2: "ಸರಳೀಕೃತ",
      desc: `ತುರ್ತು ಸಂದರ್ಭಗಳಲ್ಲಿ ನಾಗರಿಕರಿಗೆ ಮಾಹಿತಿ ನೀಡಲು ${BRAND} ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.`,
      m1_t: "ನೈಜ-ಸಮಯದ ಜಾಗೃತಿ", m1_d: "ನಾವು ಅಧಿಕೃತ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆಗಳನ್ನು ನೀಡುತ್ತೇವೆ.",
      m2_t: "ಸ್ಥಾನಿಕ ಸಂಪನ್ಮೂಲಗಳು", m2_d: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಪರಿಹಾರ ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ.",
      m3_t: "ಯಾವಾಗಲೂ ಲಭ್ಯ", m3_d: "ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ಕೆಲಸ ಮಾಡುವಂತೆ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
      approach: "ನಮ್ಮ ವಿಧಾನ", help: "ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ", 
      quote: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ, ವಿಶ್ವಾಸಾರ್ಹ ಮಾಹಿತಿ ಹುಡುಕುವುದು ನಿಮ್ಮ ಚಿಂತೆಯಾಗಬಾರದು.",
      how_desc: "ನಮ್ಮ ವ್ಯವಸ್ಥೆಯು ಸಂಕೀರ್ಣ ವರದಿಗಳನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ.",
      verified: "ದೃಢೀಕೃತ ಮೂಲಗಳು", citizen: "ನಾಗರಿಕ ಕೇಂದ್ರಿತ", arch: "ಬ್ಯಾಕೆಂಡ್ ಆರ್ಕಿಟೆಕ್ಚರ್",
      footer: "ಸಬಲೀಕರಣ • 2026"
    },
    ne: {
      sub: "आकस्मिक सहायता प्रणाली", back: "ड्यासबोर्डमा फिर्ता",
      h1: "तपाईंको सुरक्षा,", h2: "सरलीकृत",
      desc: `${BRAND} प्राकृतिक प्रकोप र आपतकालिन समयमा नागरिकहरूलाई सूचित राख्न बनाइएको हो।`,
      m1_t: "वास्तविक समय जागरूकता", m1_d: "हामी देशैभरबाट आधिकारिक सुरक्षा अलर्टहरू संकलन गर्छौं।",
      m2_t: "स्थानीय स्रोतहरू", m2_d: "नजिकैको अस्पताल र राहत केन्द्रहरू सजिलै फेला पार्नुहोस्।",
      m3_t: "सधैं उपलब्ध", m3_d: "कमजोर इन्टरनेटमा पनि यो प्रणालीले काम गर्दछ।",
      approach: "हाम्रो दृष्टिकोण", help: "हामी कसरी मद्दत गर्छौं", 
      quote: "आपतकालिन समयमा, भरपर्दो जानकारी कहाँ पाउने भन्ने कुरा तपाईंको चिन्ता हुनु हुँदैन।",
      how_desc: "हाम्रो प्रणालीले जटिल रिपोर्टहरूलाई सजिलो अपडेटमा बदल्छ।",
      verified: "प्रमाणित स्रोतहरू", citizen: "नागरिक केन्द्रित", arch: "ब्याकइन्ड आर्किटेक्चर",
      footer: "नागरिक सशक्तिकरण • २०२६"
    }
  };

  const t = (key) => content[lang][key] || content['en'][key];

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg shadow-md">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#002855] tracking-tight leading-none uppercase">{BRAND}</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">{t('sub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Languages size={14} className="text-slate-500" />
              <select 
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-[10px] font-bold uppercase outline-none cursor-pointer text-slate-700 w-24 sm:w-auto"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="as">অসমীয়া (Assamese)</option>
                <option value="mni">মৈতেইলোন (Manipuri)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ne">नेपाली (Nepali)</option>
              </select>
            </div>

            <Link to="/" className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#002855] hover:text-orange-600 transition-colors group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              {t('back')}
            </Link>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[400px] sm:h-[450px] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover">
          <source src="cityVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#001529] via-[#002855]/60 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-20 px-4">
          <h2 className="text-3xl sm:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight text-white">
            {t('h1')} <span className="text-orange-400">{t('h2')}</span>
          </h2>
          <p className="text-md sm:text-lg text-white leading-relaxed font-semibold max-w-2xl mx-auto opacity-90">
            {t('desc')}
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6 -mt-12 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className={`group bg-white p-8 rounded-xl shadow-lg border-b-4 border-orange-500 transition-all duration-700 ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="mb-4 bg-slate-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform"><Bell className="text-orange-500" size={28} /></div>
              <h3 className="text-lg font-black text-[#002855] uppercase mb-2 tracking-tight group-hover:text-orange-600 transition-colors">{t('m1_t')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t('m1_d')}</p>
            </div>
            <div className={`group bg-white p-8 rounded-xl shadow-lg border-b-4 border-orange-500 transition-all duration-700 delay-150 ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="mb-4 bg-slate-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform"><Map className="text-[#002855]" size={28} /></div>
              <h3 className="text-lg font-black text-[#002855] uppercase mb-2 tracking-tight group-hover:text-orange-600 transition-colors">{t('m2_t')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t('m2_d')}</p>
            </div>
            <div className={`group bg-white p-8 rounded-xl shadow-lg border-b-4 border-orange-500 transition-all duration-700 delay-300 ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="mb-4 bg-slate-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform"><Activity className="text-orange-500" size={28} /></div>
              <h3 className="text-lg font-black text-[#002855] uppercase mb-2 tracking-tight group-hover:text-orange-600 transition-colors">{t('m3_t')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t('m3_d')}</p>
            </div>
        </div>

        {/* HOW WE HELP SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-16 space-y-6">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest"><div className="w-8 h-[1px] bg-orange-500"></div> {t('approach')}</div>
              <h2 className="text-3xl font-black text-[#002855] leading-tight uppercase">{t('help')}</h2>
              <p className="text-slate-600 leading-relaxed font-medium italic">"{t('quote')}"</p>
              <p className="text-slate-600 text-sm">{t('how_desc')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><Lock size={18} className="text-[#002855]" /><span className="text-[11px] font-black uppercase text-slate-700">{t('verified')}</span></div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><Users size={18} className="text-[#002855]" /><span className="text-[11px] font-black uppercase text-slate-700">{t('citizen')}</span></div>
              </div>
            </div>
            <div className="bg-slate-900 p-8 flex flex-col items-center justify-center border-l border-slate-100 relative min-h-[300px]">
                <div className="relative z-10 text-center">
                  <Cpu size={48} className="text-orange-400 mb-4 mx-auto animate-pulse" />
                  <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-2">{t('arch')}</h4>
                  <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full"></div>
                </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t p-12 text-center">
        <ShieldCheck size={32} className="text-slate-200 mx-auto mb-4" />
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">{t('footer')}</p>
      </footer>
    </div>
  );
};

export default AboutPage;