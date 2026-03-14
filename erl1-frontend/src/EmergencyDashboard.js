import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Hospital, Home, Truck, Wifi, WifiOff, 
  ShieldCheck, Menu, ChevronRight, X, Languages 
} from 'lucide-react';

const EmergencyDashboard = () => {
  const [lang, setLang] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeModal, setActiveModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const BRAND = "आपदा-Flow";

  const content = {
    en: {
      portal_title: BRAND, erss_sub: "Emergency Response Support System", dashboard: "Dashboard", about: "About", faq: "FAQ", alert_feed: "National Alert Feed", hero_desc: "Verified life-saving information and emergency infrastructure data.", emergency_hospitals: "Emergency Hospitals", hosp_desc: "Find nearest medical facilities", relief_shelters: "Relief Shelters", shelter_desc: "Active safe zones and camps", supply_points: "Supply Points", supply_desc: "Food, water, and medicine", resource_maps: "Resource Maps", map_desc: "Offline situational awareness", panic_title: "Emergency Panic Control", panic_signal: "Click to Activate Panic Signal", live_access: "Live Access", offline_mode: "Offline Mode", cancel: "Cancel", send_now: "Send Now", sos_title: "CONFIRM EMERGENCY SOS", sos_body: "Your GPS coordinates will be sent to the Command Center."
    },
    hi: {
      portal_title: BRAND, erss_sub: "आपातकालीन प्रतिक्रिया सहायता प्रणाली", dashboard: "डैशबोर्ड", about: "परिचय", faq: "सामान्य प्रश्न", alert_feed: "राष्ट्रीय अलर्ट फीड", hero_desc: "सत्यापित जीवन रक्षक जानकारी और आपातकालीन बुनियादी ढांचा डेटा।", emergency_hospitals: "आपातकालीन अस्पताल", hosp_desc: "निकटतम चिकित्सा सुविधाएं खोजें", relief_shelters: "राहत शिविर", shelter_desc: "सक्रिय सुरक्षित क्षेत्र और शिविर", supply_points: "आपूर्ति केंद्र", supply_desc: "भोजन, पानी और दवा", resource_maps: "संसाधन मानचित्र", map_desc: "ऑफ़लाइन स्थितिजन्य जागरूकता", panic_title: "आपातकालीन पैनिक कंट्रोल", panic_signal: "पैनिक सिग्नल सक्रिय करने के लिए क्लिक करें", live_access: "लाइव एक्सेस", offline_mode: "ऑफ़लाइन मोड", cancel: "रद्द करें", send_now: "अभी भेजें", sos_title: "आपातकालीन SOS की पुष्टि करें", sos_body: "आपके GPS निर्देशांक कमांड सेंटर को भेजे जाएंगे।"
    },
    bn: {
      portal_title: BRAND, erss_sub: "জরুরী প্রতিক্রিয়া সহায়তা ব্যবস্থা", dashboard: "ড্যাশবোর্ড", about: "সম্পর্কে", faq: "জিজ্ঞাসাবাদ", alert_feed: "জাতীয় সতর্কতা ফিড", hero_desc: "যাচাইকৃত জীবন রক্ষাকারী তথ্য এবং জরুরী অবকাঠামো ডেটা।", emergency_hospitals: "জরুরী হাসপাতাল", hosp_desc: "নিকটস্থ চিকিৎসা কেন্দ্র খুঁজুন", relief_shelters: "ত্রাণ শিবির", shelter_desc: "সক্রিয় নিরাপদ অঞ্চল এবং ক্যাম্প", supply_points: "সরবরাহ কেন্দ্র", supply_desc: "খাদ্য, জল এবং ঔষধ", resource_maps: "সম্পদ মানচিত্র", map_desc: "অফলাইন পরিস্থিতিগত সচেতনতা", panic_title: "জরুরী প্যানিক কন্ট্রোল", panic_signal: "প্যানিক সিগন্যাল সক্রিয় করতে ক্লিক করুন", live_access: "লাইভ অ্যাক্সেস", offline_mode: "অফলাইন মোড", cancel: "বাতিল", send_now: "এখন পাঠান", sos_title: "জরুরী SOS নিশ্চিত করুন", sos_body: "আপনার GPS স্থানাঙ্ক কমান্ড সেন্টারে পাঠানো হবে।"
    },
    as: {
      portal_title: BRAND, erss_sub: "জৰুৰীকালীন সঁহাৰি সমৰ্থন ব্যৱস্থা", dashboard: "ডেশ্ববৰ্ড", about: "বিষয়ে", faq: "প্ৰশ্ন", alert_feed: "ৰাষ্ট্ৰীয় সতৰ্কবাণী ফীড", hero_desc: "পৰীক্ষিত জীৱন ৰক্ষাকাৰী তথ্য আৰু জৰুৰীকালীন আন্তঃগাঁথনি তথ্য।", emergency_hospitals: "জৰুৰীকালীন চিকিৎসালয়", hosp_desc: "নিকটতম চিকিৎসা কেন্দ্ৰ বিচাৰক", relief_shelters: "সাহায্য শিবিৰ", shelter_desc: "সক্ৰিয় সুৰক্ষিত অঞ্চল আৰু শিবিৰ", supply_points: "যোগান কেন্দ্ৰ", supply_desc: "খাদ্য, পানী আৰু ঔষধ", resource_maps: "সম্পদ মানচিত্ৰ", map_desc: "অফলাইন পৰিস্থিতিগত সজাগতা", panic_title: "জৰুৰীকালীন পেনিক নিয়ন্ত্ৰণ", panic_signal: "পেনিক চিগনেল সক্ৰিয় কৰিবলৈ ক্লিক কৰক", live_access: "লাইভ এক্সেছ", offline_mode: "অফলাইন মোড", cancel: "বাতিল কৰক", send_now: "এতিয়াই পঠিয়াওক", sos_title: "জৰুৰীকালীন SOS নিশ্চিত কৰক", sos_body: "আপোনাৰ GPS স্থানাংক কমাণ্ড চেণ্টাৰলৈ পঠিওৱা হ’ব।"
    },
    mni: {
      portal_title: BRAND, erss_sub: "অক্সিদেন্ত রেস্পোন্স সপ্পোর্ত সিস্তেম", dashboard: "দেশবোর্দ", about: "মরী লৈনবা", faq: "হঙবা", alert_feed: "নেসনেল অলর্ত ফীদ", hero_desc: "পুন্সি কনবা ঙম্বা ভেরিফাইদ তৌরবা ইনোর্মেসন অমসুং ইনফ্রাস্ত্রকচর দেতা।", emergency_hospitals: "অক্সিদেন্ত হোস্পিতাল", hosp_desc: "নাকনবা হিদাকফম থীবীয়ু", relief_shelters: "রিলিফ শেলতর", shelter_desc: "সেফ জোন অমসুং কেম্পশিং", supply_points: "সপ্লাই পোইন্ত", supply_desc: "চাক-ঈশিং অমসুং হিদাক-লাংথক", resource_maps: "রিসোর্স মেপ", map_desc: "অফলাইন মেপ মরী লৈনবা", panic_title: "ইমর্জেন্সী পেনিক কন্ত্রোল", panic_signal: "পেনিক সিগনেল এক্তিভেত তৌনবগীদমক ক্লিক তৌবীয়ু", live_access: "লাইভ এক্সেস", offline_mode: "অফলাইন মোদ", cancel: "কেন্সেল", send_now: "হৌজিক থাবীয়ু", sos_title: "SOS কনফার্ম তৌবীয়ু", sos_body: "নহাক্কী GPS কোওর্দিনেতশিং কমান্দ সেন্তরদা থাগনি।"
    },
    gu: {
      portal_title: BRAND, erss_sub: "ઇમરજન્સી રિસ્પોન્સ સપોર્ટ સિસ્ટમ", dashboard: "ડેશબોર્ડ", about: "વિશે", faq: "પ્રશ્નોત્તરી", alert_feed: "રાષ્ટ્રીય એલર્ટ ફીড", hero_desc: "ચકાસાયેલ જીવનરક્ષક માહિતી અને કટોકટી ઇન્ફ્રાસ્ટ્રક્ચર ડેટા.", emergency_hospitals: "ઇમરજન્સી હોસ્પિટલો", hosp_desc: "નજીકની તબીબી સુવિધાઓ શોધો", relief_shelters: "રાહત શિબિરો", shelter_desc: "સક્રિય સુરક્ષિત વિસ્તારો અને કેમ્પ", supply_points: "પુરવઠા કેન્દ્રો", supply_desc: "ખોરાક, પાણી અને દવા", resource_maps: "સંસાધન નકશા", map_desc: "ઓફલાઇન પરિસ્થિતિગત જાગૃતિ", panic_title: "ઇમરજન્સી પેનિક કંટ્રોલ", panic_signal: "પેનિક સિગ્નલ સક્રિય કરવા ક્લિક કરો", live_access: "લાઇવ એક્સેસ", offline_mode: "ઓફલાઇન મોડ", cancel: "રદ કરો", send_now: "હમણાં મોકલો", sos_title: "ઇમરજન્સી SOS કન્ફર્મ કરો", sos_body: "તમારા GPS કોઓર્ડિનેટ્સ કમાન્ડ સેન્ટર પર મોકલવામાં આવશે."
    },
    mr: {
      portal_title: BRAND, erss_sub: "आणीबाणी प्रतिसाद समर्थन प्रणाली", dashboard: "डॅशबोर्ड", about: "बद्दल", faq: "वारंवार विचारले जाणारे प्रश्न", alert_feed: "राष्ट्रीय अलर्ट फीड", hero_desc: "सत्यापित जीवनरक्षक माहिती आणि आपत्कालीन पायाभूत सुविधा डेटा.", emergency_hospitals: "आणीबाणी रुग्णालये", hosp_desc: "जवळपासच्या वैद्यकीय सुविधा शोधा", relief_shelters: "निवारा केंद्रे", shelter_desc: "सक्रिय सुरक्षित क्षेत्र आणि शिबिरे", supply_points: "पुरवठा बिंदू", supply_desc: "अन्न, पाणी और औषध", resource_maps: "संसाधन नकाशे", map_desc: "ऑफलाइन परिस्थितीची जाणीव", panic_title: "आणीबाणी पॅनिक नियंत्रण", panic_signal: "पॅनिक सिग्नल सक्रिय करण्यासाठी क्लिक करा", live_access: "थेट प्रवेश", offline_mode: "ऑफलाइन मोड", cancel: "रद्द करा", send_now: "आता पाठवा", sos_title: "आणीबाणी SOS की पुष्टी करा", sos_body: "तुमचे GPS निर्देशांक कमांड सेंटरला पाठवले जातील."
    },
    ur: { portal_title: BRAND, erss_sub: "ہنگامی ردعمل کی امدادی اسکیم", dashboard: "ڈیش بورڈ", about: "متعلق", faq: "سوالات", alert_feed: "قومی الرٹ فیড", hero_desc: "تصدیق شدہ زندگی بچانے والی معلومات اور ہنگامی بنیادی ڈھانچے کا ڈیٹا۔", emergency_hospitals: "ہنگامی ہسپتال", hosp_desc: "قریبی طبی سہولیات تلاش کریں", relief_shelters: "امدادی کیمپ", shelter_desc: "فعال محفوظ مقامات اور کیمپ", supply_points: "سپلائی پوائنٹس", supply_desc: "خوراک، پانی اور ادویات", resource_maps: "وسائل کے نقشے", map_desc: "آف لائن آگاہی", panic_title: "ہنگامی پینک کنٹرول", panic_signal: "پینک سگنل فعال کرنے کے لیے کلک کریں", live_access: "لائیو رسائی", offline_mode: "آف لائن موڈ", cancel: "منسوخ کریں", send_now: "ابھی بھیجیں", sos_title: "ہنگامی SOS کی تصدیق کریں", sos_body: "آپ کے GPS کوآرڈینیٹس کمانڈ سینٹر کو بھیجے جائیں گے۔" },
    pa: { portal_title: BRAND, erss_sub: "ਐਮਰਜੈਂਸੀ ਰਿਸਪਾਂਸ ਸਪੋਰਟ ਸਿਸਟਮ", dashboard: "ਡੈਸ਼ਬੋਰਡ", about: "ਬਾਰੇ", faq: "ਸਵਾਲ", alert_feed: "ਰਾਸ਼ਟਰੀ ਅਲਰਟ ਫੀਡ", hero_desc: "ਤਸਦੀਕਸ਼ੁਦਾ ਜੀਵਨ-ਰੱਖਿਅਕ ਜਾਣਕਾਰੀ ਅਤੇ ਐਮਰਜੈਂਸੀ ਬੁਨਿਆਦੀ ਢਾਂਚਾ ਡੇਟਾ।", emergency_hospitals: "ਐਮਰਜੈਂਸੀ ਹਸਪਤਾਲ", hosp_desc: "ਨੇੜਲੇ ਮੈਡੀਕਲ ਸਹੂਲਤਾਂ ਲੱਭੋ", relief_shelters: "ਰਾਹਤ ਕੈਂਪ", shelter_desc: "ਸਰਗਰਮ ਸੁਰੱਖਿਅਤ ਖੇਤਰ ਅਤੇ ਕੈਂਪ", supply_points: "ਸਪਲਾਈ ਪੁਆਇੰਟ", supply_desc: "ਭੋਜਨ, ਪਾਣੀ ਅਤੇ ਦਵਾਈ", resource_maps: "ਸਰੋਤ ਨਕਸ਼ੇ", map_desc: "ਔਫਲਾਈਨ ਸਥਿਤੀ ਸੰਬੰਧੀ ਜਾਗਰੂਕਤਾ", panic_title: "ਐਮਰਜੈਂਸੀ ਪੈਨਿਕ ਕੰਟਰੋਲ", panic_signal: "ਪੈਨਿਕ ਸਿਗਨਲ ਨੂੰ ਸਰਗਰਮ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ", live_access: "ਲਾਈਵ ਪਹੁੰਚ", offline_mode: "ਔਫਲਾਈਨ ਮੋਡ", cancel: "ਰੱਦ ਕਰੋ", send_now: "ਹੁਣੇ ਭੇਜੋ", sos_title: "ਐਮਰਜੈਂਸੀ SOS ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ", sos_body: "ਤੁਹਾਡੇ GPS ਨਿਰਦੇਸ਼ ਕਮਾਂਡ ਸੈਂਟਰ ਨੂੰ ਭੇਜੇ ਜਾਣਗੇ।" },
    kn: { portal_title: BRAND, erss_sub: "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ", dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", about: "ಬಗ್ಗೆ", faq: "ಪ್ರಶ್ನೆಗಳು", alert_feed: "ರಾಷ್ಟ್ರೀಯ ಎಚ್ಚರಿಕೆ ಫೀಡ್", hero_desc: "ದೃಢೀಕರಿಸಲ್ಪಟ್ಟ ಜೀವ ಉಳಿಸುವ ಮಾಹಿತಿ ಮತ್ತು ತುರ್ತು ಮೂಲಸೌಕರ್ಯ ಡೇಟಾ.", emergency_hospitals: "ತುರ್ತು ಆಸ್ಪತ್ರೆಗಳು", hosp_desc: "ಹತ್ತಿರದ ವೈದ್ಯಕೀಯ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಿ", relief_shelters: "ಪರಿಹಾರ ಶಿಬಿರಗಳು", shelter_desc: "ಸಕ್ರಿಯ ಸುರಕ್ಷಿತ ವಲಯಗಳು ಮತ್ತು ಶಿಬಿರಗಳು", supply_points: "ಪೂರೈಕೆ ಕೇಂದ್ರಗಳು", supply_desc: "ಆಹಾರ, ನೀರು ಮತ್ತು ಔಷಧ", resource_maps: "ಸಂಪನ್ಮೂಲ ನಕ್ಷೆಗಳು", map_desc: "ಆಫ್‌ಲೈನ್ ಪರಿಸ್ಥಿತಿ ಅರಿವು", panic_title: "ತುರ್ತು ಪ್ಯಾನಿಕ್ ನಿಯಂತ್ರಣ", panic_signal: "ಪ್ಯಾನಿಕ್ ಸಿಗ್ನಲ್ ಸಕ್ರಿಯಗೊಳಿಸಲು ಕ್ಲಿక్ ಮಾಡಿ", live_access: "ಲೈವ್ ಪ್ರವೇಶ", offline_mode: "ಆಫ್‌ಲೈನ್ ಮೋಡ್", cancel: "ರದ್ದುಗೊಳಿಸಿ", send_now: "ಈಗ ಕಳುహಿಸಿ", sos_title: "ತುರ್ತು SOS ಖಚಿತಪಡಿಸಿ", sos_body: "ನಿಮ್ಮ GPS ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ಕಮಾಂಡ್ ಸೆಂಟರ್‌ಗೆ ಕಳುహಿಸಲಾಗುತ್ತದೆ।" },
    ta: { portal_title: BRAND, erss_sub: "அவசரகால பதில் ஆதரவு அமைப்பு", dashboard: "டாஷ்போர்டு", about: "பற்றி", faq: "கேள்விகள்", alert_feed: "தேசிய எச்சரிக்கை ஊட்டம்", hero_desc: "சரிபார்க்கப்பட்ட உயிர் காக்கும் தகவல் மற்றும் அவசரகால உள்கட்டமைப்பு தரவு.", emergency_hospitals: "அவசர மருத்துவமனைகள்", hosp_desc: "அருகிலுள்ள மருத்துவ வசதிகளைக் கண்டறியவும்", relief_shelters: "நிவாரண முகாம்கள்", shelter_desc: "செயலில் உள்ள பாதுகாப்பான மண்டலங்கள்", supply_points: "விநியோக புள்ளிகள்", supply_desc: "உணவு, தண்ணீர் மற்றும் மருந்து", resource_maps: "ஆதார வரைபடங்கள்", map_desc: "ஆஃப்லைன் சூழ்நிலை விழிப்புணர்வு", panic_title: "அவசரகால பீதி கட்டுப்பாடு", panic_signal: "பீதி சமிக்ஞையைச் செயல்படுத்த கிளிக் செய்யவும்", live_access: "நேரடி அணுகல்", offline_mode: "ஆஃப்லைன் பயன்முறை", cancel: "ரத்துசெய்", send_now: "இப்போது அனுப்பு", sos_title: "அவசரகால SOS-ஐ உறுதிப்படுத்தவும்", sos_body: "உங்கள் GPS ஒருங்கிணைப்புகள் கட்டுப்பாட்டு மையத்திற்கு அனுப்பப்படும்।" },
    te: { portal_title: BRAND, erss_sub: "అత్యవసర ప్రతిస్పందన మద్దతు వ్యవస్థ", dashboard: "డ్యాష్‌బోర్డ్", about: "గురించి", faq: "ప్రశ్నలు", alert_feed: "జాతీయ అలర్ట్ ఫీడ్", hero_desc: "ధృవీకరించబడిన ప్రాణ రక్షణ సమాచారం మరియు అత్యవసర మౌలిక సదుపాయాల డేటా.", emergency_hospitals: "అత్యవసర ఆసుపత్రులు", hosp_desc: "సమీప వైద్య సౌకర్యాలను కనుగొనండి", relief_shelters: "సహాయక శిబిరాలు", shelter_desc: "క్రియాశీల సురక్షిత ప్రాంతాలు మరియు శిబిరాలు", supply_points: "సరఫరా పాయింట్లు", supply_desc: "ఆహారం, నీరు మరియు మందులు", resource_maps: "వనరుల మ్యాప్‌లు", map_desc: "ఆఫ్‌లైన్ పరిస్థితి అవగాహన", panic_title: "అత్యవసర పానిక్ నియంత్రణ", panic_signal: "పానిక్ సిగ్నల్ యాక్టివేట్ చేయడానికి క్లిక్ చేయండి", live_access: "లైవ్ యాక్సెస్", offline_mode: "ఆఫ్‌లైన్ మోడ్", cancel: "రద్దు చేయండి", send_now: "ఇప్పుడే పంపండి", sos_title: "అత్యవసర SOS నిర్ధారించండి", sos_body: "మీ GPS కోఆర్డినేట్లు కమాండ్ సెంటర్కు పంపబడతాయి." },
    ne: { portal_title: BRAND, erss_sub: "आकस्मिक प्रतिक्रिया सहायता प्रणाली", dashboard: "ड्यासबोर्ड", about: "बारेमा", faq: "प्रश्नहरू", alert_feed: "राष्ट्रिय अलर्ट फिड", hero_desc: "प्रमाणित जीवन-रक्षक जानकारी र आकस्मिक पूर्वाधार डाटा।", emergency_hospitals: "आकस्मिक अस्पतालहरू", hosp_desc: "नजिकैको चिकित्सा सुविधाहरू खोज्नुहोस्", relief_shelters: "राहत शिविरहरू", shelter_desc: "सक्रिय सुरक्षित क्षेत्र और शिविरहरू", supply_points: "आपूर्ति केन्द्रहरू", supply_desc: "खाना, पानी र औषधि", resource_maps: "स्रोत नक्सा", map_desc: "अफलाइन परिस्थितिजन्य जागरूकता", panic_title: "आकस्मिक प्यानिक नियन्त्रण", panic_signal: "प्यानিক सिग्नल सक्रिय गर्न क्लिक गर्नुहोस्", live_access: "লাইভ पहुँच", offline_mode: "अफलाइन मोड", cancel: "رद्द गर्नुहोस्", send_now: "अहिले पठाउनुहोस्", sos_title: "आकस्मिक SOS पुष्टि गर्नुहोस्", sos_body: "तपाईंको GPS निर्देशांक कमाण্ড सेन्टरमा पठाइनेछ।" }
  };

  const t = (key) => content[lang][key] || content['en'][key];

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const resourceNodes = [
    { id: 'hospital', title: t('emergency_hospitals'), icon: <Hospital size={24} />, desc: t('hosp_desc') },
    { id: 'shelter', title: t('relief_shelters'), icon: <Home size={24} />, desc: t('shelter_desc') },
    { id: 'supply', title: t('supply_points'), icon: <Truck size={24} />, desc: t('supply_desc') },
    { id: 'map', title: t('resource_maps'), icon: <MapPin size={24} />, desc: t('map_desc') },
  ];

  const Modal = ({ type, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border-t-8 border-[#002855]">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">{type === 'sos' ? t('sos_title') : 'Detail'}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed font-medium">{type === 'sos' ? t('sos_body') : 'Verified data access.'}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 px-4 rounded-lg font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 uppercase">{t('cancel')}</button>
            <button className="flex-1 py-3 px-4 rounded-lg font-bold text-white shadow-lg bg-red-600 uppercase" onClick={onClose}>{t('send_now')}</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans">
      {activeModal && <Modal type={activeModal} onClose={() => setActiveModal(null)} />}

      {/* Top Utility Bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg shadow-md"><ShieldCheck size={24} /></div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#002855] tracking-tight leading-none uppercase">{t('portal_title')}</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">{t('erss_sub')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
               <div className="flex items-center gap-1.5 pr-1 border-r border-slate-300">
                <span className="text-sm" role="img" aria-label="India Flag">🇮🇳</span>
                <Languages size={14} className="text-slate-500" />
              </div>
              <select 
                value={lang}
                onChange={(e) => setLang(e.target.value)} 
                className="bg-transparent text-[10px] font-bold uppercase outline-none cursor-pointer text-slate-700" 
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
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              <span className="whitespace-nowrap uppercase">{isOnline ? t('live_access') : t('offline_mode')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Taskbar with Orange Hovers */}
      <nav className="bg-[#002855] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-12">
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex absolute sm:relative top-12 sm:top-0 left-0 w-full sm:w-auto bg-[#002855] flex-col sm:flex-row gap-8 text-[11px] font-bold uppercase tracking-wide px-4 sm:px-0 py-4 sm:py-0`}>
            
            <Link to="/" className="relative py-3 transition-colors group">
              <span className="text-orange-400">{t('dashboard')}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400"></span>
            </Link>

            <Link to="/about" className="relative py-3 opacity-80 hover:opacity-100 transition-all group">
              <span>{t('about')}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/faq" className="relative py-3 opacity-80 hover:opacity-100 transition-all group">
              <span>{t('faq')}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
          </div>
          <button className="sm:hidden p-2 ml-auto" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-[#0b54a8] text-white py-12 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black mb-3 uppercase tracking-tighter">{t('alert_feed')}</h2>
          <p className="max-w-2xl text-base opacity-90 leading-relaxed font-medium">{t('hero_desc')}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {resourceNodes.map((item, index) => (
              <button 
                key={index} 
                onClick={() => setActiveModal(item.id)} 
                className="bg-white border-b-4 border-b-[#002855] p-6 rounded shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex gap-5 items-center group text-left w-full"
              >
                <div className="bg-slate-100 p-4 rounded-full text-[#002855] group-hover:bg-[#002855] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg uppercase tracking-tight group-hover:text-orange-600 transition-colors">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="ml-auto text-gray-300 group-hover:text-orange-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar / Panic Section */}
        <div className="space-y-4">
          {/* Dispatcher Visual Header */}
          <div className="relative h-48 rounded-xl overflow-hidden shadow-sm border border-gray-200 group">
            <img 
              src="femaleDispatcher.jpg" 
              alt="Emergency Dispatcher" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          
          </div>

          {/* SOS Card */}
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden p-6 text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest border-b pb-3">
              {t('panic_title')}
            </p>
            <button 
              className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white py-8 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all active:scale-[0.98]" 
              onClick={() => setActiveModal('sos')}
            >
              <span className="text-6xl font-black tracking-tighter">112</span>
              <span className="text-[11px] font-bold opacity-90 uppercase tracking-[0.2em] mt-2">
                {t('panic_signal')}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyDashboard;