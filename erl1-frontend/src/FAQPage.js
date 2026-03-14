import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, ChevronLeft, ChevronDown, ChevronUp, 
  HelpCircle, MessageSquare, CheckCircle, PhoneCall, Loader2, Languages,
  Wifi, WifiOff
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const FAQPage = () => {
  const [lang, setLang] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const BRAND = "आपदा-Flow";

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    const timer = setTimeout(() => setHasLoaded(true), 150);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      clearTimeout(timer);
    };
  }, []);

  // ... (content object with all 13 languages remains same as previous step)
  const content = {
    en: { portal_title: BRAND, erss_sub: "Emergency Response Support System", support_title: "Support", desk: "Desk", sub_text: "Official Knowledge Base & IT Inquiry System", back: "Back to Dashboard", faq_cat: "General", contact_title: "Direct", contact_sub: "Support", placeholder: "Describe your issue...", send: "Send", call: "Call Support", new_ticket: "New Ticket", sent: "Inquiry Sent", node: "IT Node: Active", live_access: "Live Access", offline_mode: "Offline Mode", q1: "What is the primary purpose of the ERSS Portal?", a1: "The ERSS acts as a bridge between national disaster agencies and local citizens.", q2: "Can I use the portal offline?", a2: "Yes. Once loaded, critical maps and protocols are cached locally on your device.", q3: "How accurate is the data?", a3: "We parse official feeds directly from government sensors with sub-second latency." },
    hi: { portal_title: BRAND, erss_sub: "आपातकालीन प्रतिक्रिया सहायता प्रणाली", support_title: "सहायता", desk: "डेस्क", sub_text: "आधिकारिक ज्ञान केंद्र और आईटी पूछताछ प्रणाली", back: "डैशबोर्ड पर वापस", faq_cat: "सामान्य", contact_title: "सीधा", contact_sub: "संपर्क", placeholder: "अपनी समस्या बताएं...", send: "भेजें", call: "कॉल सपोर्ट", new_ticket: "नया टिकट", sent: "पूछताछ भेजी गई", node: "आईटी नोड: सक्रिय", live_access: "लाइव एक्सेस", offline_mode: "ऑफ़लाइन मोड", q1: "ERSS पोर्टल का मुख्य उद्देश्य क्या है?", a1: "ERSS राष्ट्रीय आपदा एजेंसियों और स्थानीय नागरिकों के बीच एक सेतु के रूप में कार्य करता है।", q2: "क्या मैं पोर्टल का ऑफलाइन उपयोग कर सकता हूँ?", a2: "हाँ। एक बार लोड होने के बाद, मानचित्र आपके डिवाइस पर सुरक्षित हो जाते हैं।", q3: "डेटा कितना सटीक है?", a3: "हम आधिकारिक सरकारी सेंसर से सीधे डेटा प्राप्त करते हैं।" },
    bn: { portal_title: BRAND, erss_sub: "জরুরী প্রতিক্রিয়া সহায়তা ব্যবস্থা", support_title: "সহায়তা", desk: "ডেস্ক", sub_text: "অফিসিয়াল জ্ঞান কেন্দ্র এবং আইটি অনুসন্ধান সিস্টেম", back: "ড্যাশবোর্ডে ফিরে যান", faq_cat: "সাধারণ", contact_title: "সরাসরি", contact_sub: "সহায়তা", placeholder: "আপনার সমস্যা বর্ণনা করুন...", send: "পাঠান", call: "কল সাপোর্ট", new_ticket: "নতুন টিকিট", sent: "অনুসন্ধান পাঠানো হয়েছে", node: "আইটি নোড: সক্রিয়", live_access: "লাইভ অ্যাক্সেস", offline_mode: "অফলাইন মোড", q1: "ERSS পোর্টালের মূল উদ্দেশ্য কি?", a1: "ERSS জাতীয় দুর্যোগ সংস্থা এবং স্থানীয় নাগরিকদের মধ্যে একটি সেতু হিসাবে কাজ করে।", q2: "আমি কি অফলাইনে পোর্টালটি ব্যবহার করতে পারি?", a2: "হ্যাঁ। একবার লোড হয়ে গেলে, মানচিত্র এবং প্রোটোকল আপনার ডিভাইসে ক্যাশ করা থাকে।", q3: "তথ্য কতটা সঠিক?", a3: "আমরা সরাসরি সরকারি সেন্সর থেকে তথ্য সংগ্রহ করি।" },
    as: { portal_title: BRAND, erss_sub: "জৰুৰীকালীন সঁহাৰি সমৰ্থন ব্যৱস্থা", support_title: "সহায়তা", desk: "ডেস্ক", sub_text: "চৰকাৰী তথ্য কেন্দ্ৰ আৰু আইটি সোধপোছ ব্যৱস্থা", back: "ডেশ্ববৰ্ডলৈ ঘূৰি যাওক", faq_cat: "সাধাৰণ", contact_title: "সরাসরি", contact_sub: "সহায়তা", placeholder: "আপোনাৰ সমস্যাটো বৰ্ণনা কৰক...", send: "পঠিয়াওক", call: "সহায়তা কল", new_ticket: "নতুন টিকট", sent: "পঠোৱা হ'ল", node: "আইটি নোড: সক্ৰিয়", live_access: "লাইভ এক্সেছ", offline_mode: "অফলাইন মোড", q1: "ERSS পৰ্টেলৰ মূল উদ্দেশ্য কি?", a1: "ERSS ৰাষ্ট্ৰীয় দুৰ্যোগ সংস্থা আৰু স্থানীয় নাগৰিকৰ মাজৰ এক সেতু।", q2: "ਮੈਂ ਆਫਲਾਈਨ ਪੋਰਟਲ ਦੀ ਵਰਤੋਂ ਕਰ ਸਕਦਾ ਹਾਂ?", a2: "ਹਾਂ। ਇੱਕ ਵਾਰ ਲੋਡ ਹੋਣ ਤੋਂ ਬਾਅਦ ਜਾਣਕਾਰੀ ਸੇਵ ਹੋ ਜਾਂਦੀ ਹੈ।", q3: "তথ্য কিমান নিখুঁত?", a3: "আমরা পোনপটীয়াকৈ চৰকাৰী ছেন্সৰৰ পৰা তথ্য সংগ্ৰহ কৰোঁ।" },
    mni: { portal_title: BRAND, erss_sub: "অক্সিদেন্ত রেস্পোন্স সপ্পোর্ত সিস্তেম", support_title: "মতেং", desk: "দেস্ক", sub_text: "ওফিসিয়েল নোলেজ বেস অমসুং আই.তি ইনক্বাইরী", back: "দেশবোর্দতা হনগদবা", faq_cat: "জেনরেল", contact_title: "দাইরেক্ত", contact_sub: "সপ্পোর্ত", placeholder: "অৱাবা অদু ইবীয়ু...", send: "থাবীয়ু", call: "হেল্পলাইন", new_ticket: "অনৌবা তিকেত", sent: "থাজিনখ্রে", node: "আই.তি নোত: এক্তিব", live_access: "লাইভ এক্সেস", offline_mode: "অফলাইন মোদ", q1: "ERSS পোর্তেলগী মরুওইবা পান্দম করিনো?", a1: "ERSS না নেসনেল দিজাস্তর এজেন্সী অমসুং মীয়ামগী মরক্তা থোং ওইনা থবক তৌই।", q2: "অফলাইনদা পোর্তেল অসি শীজিন্নবা য়াব্রা?", a2: "য়াই। অমুক্তা লোদ তৌরবা মতুংদা অফলাইনদা শীজিন্নবা য়াই।", q3: "দেতা অসি করম্না চুম্বনো?", a3: "আইফিসিয়েল ওইবা সোর্সতগী দেতা লৌই।" },
    gu: { portal_title: BRAND, erss_sub: "ઇમરજન્સી રિસ્પોન્સ સપોર્ટ સિસ્ટમ", support_title: "સહાય", desk: "ડેસ્ક", sub_text: "સત્તાવાર જ્ઞાન કેન્દ્ર અને આઈટી પૂછપરછ સિસ્ટમ", back: "ડેશબોર્ડ પર પાછા", faq_cat: "સામાન્ય", contact_title: "સીધો", contact_sub: "સંપર્ક", placeholder: "તમારી સમસ્યા વર્ણવો...", send: "મોકલો", call: "કોલ સપોર્ટ", new_ticket: "નવી ટિકિટ", sent: "પૂછપરછ મોકલી", node: "IT નોડ: સક્રિય", live_access: "લાઇવ એક્સેસ", offline_mode: "ઓફલાઇન મોડ", q1: "ERSS પોર્ટલનો મુખ્ય હેતુ શું છે?", a1: "ERSS રાષ્ટ્રીય આપત્તિ એજન્સીઓ અને સ્થાનિક નાગરિકો વચ્ચે સેતુ તરીકે કામ કરે છે.", q2: "શું હું ઓફલાઇન પોર્ટલનો ઉપયોગ કરી શકું?", a2: "હા। એકવાર લોડ થયા પછી, નકશા તમારા ઉપકરણ પર સંગ્રહિત થાય છે.", q3: "ડેટા કેટલો સચોટ છે?", a3: "સરકારી સેન્સર દ્વારા ડેટા સચોટ રીતે મળે છે।" },
    mr: { portal_title: BRAND, erss_sub: "आणीबाणी प्रतिसाद समर्थन प्रणाली", support_title: "सहायता", desk: "डेस्क", sub_text: "अधिकृत ज्ञान केंद्र आणि आयटी चौकशी प्रणाली", back: "डॅशबोर्डवर परत", faq_cat: "सामान्य", contact_title: "थेट", contact_sub: "संपर्क", placeholder: "तुमची समस्या सांगा...", send: "पाठवा", call: "call support", new_ticket: "नवीन तिकीट", sent: "चौकशी पाठवली", node: "IT नोड: सक्रिय", live_access: "थेट প্রবেশ", offline_mode: "ऑफलाइन मोड", q1: "ERSS पोर्टलचा मुख्य उद्देश काय आहे?", a1: "ERSS राष्ट्रीय आपत्ती संस्था आणि स्थानिक नागरिकांमधील दुवा म्हणून काम करते.", q2: "मी पोर्टल ऑफलाइन वापरू शकतो का?", a2: "हो. एकदा लोड झाल्यावर, नकाशे तुमच्या डिव्हाइसवर जतन केले जातात.", q3: "डेटा किती अचूक आहे?", a3: "आम्ही थेट सरकारी सेन्सरवरून माहिती मिळवतो।" },
    ur: { portal_title: BRAND, erss_sub: "ہنگامی ردعمل کی امدادی اسکیم", support_title: "تعاون", desk: "ڈیسک", sub_text: "سرکاری معلوماتی مرکز اور آئی ٹی انکوائری", back: "ڈیش بورڈ پر واپسی", faq_cat: "عام", contact_title: "براہ راست", contact_sub: "سپورٹ", placeholder: "اپنا مسئلہ بیان کریں...", send: "بھیجیں", call: "کال سپورٹ", new_ticket: "نیا ٹکٹ", sent: "انکوائری بھیج دی گئی", node: "آئی ٹی نوڈ: فعال", live_access: "لائیو رسائی", offline_mode: "آف لائن موڈ", q1: "ERSS پورٹલ کا بنیادی مقصد کیا ہے؟", a1: "ERSS قومی آفات کی ایجنسیوں اور شہریوں کے درمیان پل کا کام کرتا ہے۔", q2: "کیا میں آف لائن استعمال کر سکتا ہوں؟", a2: "جی ہاں। ایک بار لوڈ ہونے کے بعد معلومات محفوظ ہو جاتی ہیں۔", q3: "ڈیٹا کتنا درست ہے؟", a3: "ہم سرکاری ذرائع سے براہ راست ڈیٹا حاصل کرتے ہیں۔" },
    pa: { portal_title: BRAND, erss_sub: "ਐਮਰਜੈਂਸੀ ਰਿਸਪਾਂਸ ਸਪੋਰਟ ਸਿਸਟਮ", support_title: "ਸਹਾਇਤਾ", desk: "ਡੈਸਕ", sub_text: "ਅਧਿਕਾਰਤ ਗਿਆਨ ਕੇਂਦਰ ਅਤੇ ਆਈ.ਟੀ. ਪੁੱਛਗਿੱਛ ਪ੍ਰਣਾਲੀ", back: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਵਾਪਸ", faq_cat: "ਆਮ", contact_title: "ਸਿੱਧਾ", contact_sub: "ਸੰਪਰਕ", placeholder: "ਆਪਣੀ ਸਮੱਸਿਆ ਦੱਸੋ...", send: "ਭੇਜੋ", call: "ਕਾਲ ਸਹਾਇਤਾ", new_ticket: "ਨਵਾਂ ਟਿਕਟ", sent: "ਪੁੱਛਗਿੱਛ ਭੇਜੀ ਗਈ", node: "IT ਨੋਡ: ਸਰਗਰਮ", live_access: "ਲਾਈਵ ਪਹੁੰਚ", offline_mode: "ਔਫਲਾਈਨ ਮੋਡ", q1: "ERSS ਪੋਰਟਲ ਦਾ ਮੁੱਖ ਉਦੇਸ਼ ਕੀ ਹੈ?", a1: "ERSS ਰਾਸ਼ਟਰੀ ਆਫ਼ਤ ਏਜੰਸੀਆਂ ਅਤੇ ਨਾਗਰਿਕਾਂ ਵਿਚਕਾਰ ਇੱਕ ਪੁਲ ਵਜੋਂ ਕੰਮ ਕਰਦਾ ਹੈ।", q2: "ਕੀ ਮੈਂ ਆਫਲਾਈਨ ਵਰਤੋਂ ਕਰ ਸਕਦਾ ਹਾਂ?", a2: "ਹਾਂ। ਇੱਕ ਵਾਰ ਲੋਡ ਹੋਣ ਤੋਂ ਬਾਅਦ ਜਾਣਕਾਰੀ ਸੇਵ ਹੋ ਜਾਂਦੀ ਹੈ।", q3: "ਡੇਟਾ ਕਿੰਨਾ ਸਹੀ ਹੈ?", a3: "ਅਸੀਂ ਸਰਕਾਰੀ ਸੈਂਸਰਾਂ ਤੋਂ ਸਿੱਧਾ ਡੇਟਾ ਪ੍ਰਾਪਤ ਕਰਦੇ ਹਾਂ।" },
    kn: { portal_title: BRAND, erss_sub: "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ", support_title: "ಸಹಾಯ", desk: "ಡೆಸ್ಕ್", sub_text: "ಅಧಿಕೃತ ಮಾಹಿತಿ ಕೇಂದ್ರ ಮತ್ತು ಐಟಿ ವಿಚಾರಣಾ ವ್ಯವಸ್ಥೆ", back: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ", faq_cat: "ಸಾಮಾನ್ಯ", contact_title: "ನೇರ", contact_sub: "ಸಂಪರ್క", placeholder: "ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿவರಿಸಿ...", send: "ಕಳುಹಿಸಿ", call: "ಕರೆ ಸಹಾಯ", new_ticket: "ಹೊಸ ಟಿಕೆಟ್", sent: "ವಿಚಾರಣೆ ಕಳುహಿಸಲಾಗಿದೆ", node: "IT ನೋಡ್: ಸಕ್ರಿಯ", live_access: "ಲೈವ್ ಪ್ರವೇಶ", offline_mode: "ಆಫ್‌ಲೈನ್ ಮೋడ్", q1: "ERSS ಪೋರ್ಟಲ್‌ನ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?", a1: "ERSS ರಾಷ್ಟ್ರೀయ ವಿಪತ್ತು ಏಜೆನ್ಸಿಗಳು ಮತ್ತು ನಾಗರಿಕರ ನಡುವೆ ಸೇತುವೆಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ।", q2: "ನಾನು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಬಳಸಬಹುದೇ?", a2: "ಹೌದು. ಒಮ್ಮೆ ಲೋಡ್ ಆದ ನಂತರ ನಕ್ಷೆಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಉಳಿಯುತ್ತವೆ।", q3: "ಮಾಹಿತಿ ಎಷ್ಟು ನಿಖರವಾಗಿದೆ?", a3: "ನಾವು ಸರ್ಕಾರಿ ಮೂಲಗಳಿಂದ ನೇರ ಮಾಹಿತಿ ಪಡೆಯುತ್ತೇವೆ।" },
    ta: { portal_title: BRAND, erss_sub: "அவசரகால பதில் ஆதரவு அமைப்பு", support_title: "உதவி", desk: "மையம்", sub_text: "அதிகாரப்பூர்வ தகவல் மற்றும் ஐடி விசாரணை அமைப்பு", back: "டாஷ்போர்டிற்கு திரும்பு", faq_cat: "பொதுவானது", contact_title: "நேரடி", contact_sub: "உதவி", placeholder: "உங்கள் பிரச்சினையை விவரிக்கவும்...", send: "அனுப்பு", call: "அழைப்பு உதவி", new_ticket: "புதிய டிக்கெட்", sent: "விசாரணை அனுப்பப்பட்டது", node: "IT நோடு: செயலில் உள்ளது", live_access: "நேரடி அணுகல்", offline_mode: "ஆஃப்லைன் பயன்முறை", q1: "ERSS போர்ட்டலின் முக்கிய நோக்கம் என்ன?", a1: "ERSS தேசிய பேரிடர் முகமைகள் மற்றும் குடிமக்களுக்கு இடையே ஒரு பாலமாக செயல்படுகிறது।", q2: "நான் ஆஃப்லைனில் பயன்படுத்தலாமா?", a2: "ஆம்। ஒருமுறை பதிவிறக்கம் செய்தவுடன் ஆஃப்லைனில் தகவல்களைப் பார்க்கலாம்।", q3: "தகவல்கள் எவ்வளவு துல்லியமானது?", a3: "அரசாங்க சென்சார்களிடமிருந்து நேரடியாக தகவல்களைப் பெறுகிறோம்।" },
    te: { portal_title: BRAND, erss_sub: "అత్యవసర ప్రతిస్పందన మద్దతు వ్యవస్థ", support_title: "సహాయం", desk: "డెస్క్", sub_text: "అధికారిక సమాచార కేంద్రం మరియు ఐటి విచారణ వ్యవస్థ", back: "డ్యాష్‌బోర్డ్‌కు తిరిగి", faq_cat: "సాధారణ", contact_title: "నేరుగా", contact_sub: "సహాయం", placeholder: "మీ సమస్యను వివరించండి...", send: "పంపు", call: "కాల్ సపోర్ట్", new_ticket: "కొత్త టికెట్", sent: "విచారణ పంపబడింది", node: "IT నోడ్: యాక్టివ్", live_access: "లైవ్ యాక్సెస్", offline_mode: "ఆఫ్‌లైన్ మోడ్", q1: "ERSS పోర్టల్ ప్రధాన ఉద్దేశ్యం ఏమిటి?", a1: "ERSS జాతీయ విపత్తు సంస్థలు మరియు పౌరుల మధ్య వంతెనలా పనిచేస్తుంది।", q2: "నేను ఆఫ్‌లైన్‌లో ఉపయోగించవచ్చా?", a2: "అవును। ఒకసారి లోడ్ అయిన తర్వాత సమాచారం సేవ్ అవుతుంది।", q3: "డేటా ఎంత ఖచ్చితమైనది?", a3: "మేము ప్రభుత్వ సెన్సార్ల నుండి నేరుగా డేటాను అందుకుంటాము।" },
    ne: { portal_title: BRAND, erss_sub: "आकस्मिक प्रतिक्रिया सहायता प्रणाली", support_title: "सहायता", desk: "डेस्क", sub_text: "आधिकारिक ज्ञान केन्द्र र आईटी सोधपुछ प्रणाली", back: "ड्यासबोर्डमा फिर्ता", faq_cat: "सामान्य", contact_title: "प्रत्यक्ष", contact_sub: "सम्पर्क", placeholder: "आफ्नो समस्या वर्णन गर्नुहोस्...", send: "पठाउनुहोस्", call: "कल सपोर्ट", new_ticket: "नयाँ टिकट", sent: "सोधपुछ पठाइयो", node: "IT नोड: सक्रिय", live_access: "লাইভ पहुँच", offline_mode: "अफलाइन मोड", q1: "ERSS पोर्टलको मुख्य उद्देश्य के हो?", a1: "ERSS ले राष्ट्रिय विपद् एजेन्सीहरू र नागरिकहरू बीच पुलको रूपमा काम गर्दछ।", q2: "के म अफलाइन प्रयोग गर्न सक्छु?", a2: "हो। एक पटक लोड भएपछि नक्साहरू तपाईंको उपकरणमा सुरक्षित हुन्छन्।", q3: "तथ्यांक कत्तिको सही छ?", a3: "हामी सरकारी स्रोतहरूबाट सीधा जानकारी प्राप्त गर्छौं।" }
  };

  const t = (key) => content[lang]?.[key] || content['en']?.[key] || key;

  const faqs = [
    { category: t('faq_cat'), question: t('q1'), answer: t('a1') },
    { category: "System", question: t('q2'), answer: t('a2') },
    { category: "Security", question: t('q3'), answer: t('a3') }
  ];

  const submitQuery = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    setIsSubmitting(true);
    const newTicketId = `ERSS-${Math.floor(Math.random() * 9000) + 1000}`;
    const templateParams = { from_name: `${BRAND} Citizen`, title: userQuery, ticket_id: newTicketId, reply_to: "erss.service.in@gmail.com" };

    emailjs.send('service_2ot5e6n', 'template_amsf8ca', templateParams, 'n-VgrRqbjzZTssWpl')
    .then(() => {
        setTicketId(newTicketId);
        setSubmittedQuery(userQuery);
        setUserQuery("");
        setIsSubmitting(false);
    })
    .catch((error) => {
        alert("Error: " + (error.text || error.message));
        setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans selection:bg-orange-100">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-50 shadow-sm">
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
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent text-[10px] font-bold uppercase outline-none cursor-pointer text-slate-700">
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
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              <span className="whitespace-nowrap uppercase">{isOnline ? t('live_access') : t('offline_mode')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="bg-[#002855] text-white sticky top-[73px] z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center px-4 h-12">
          <Link to="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide py-3 hover:text-orange-400 transition-all group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('back')}
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto p-6 mt-10 pb-24">
        {/* FAQS WITH BLUE HOVER TRANSITION */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`group bg-white rounded-xl shadow-sm border-b-4 border-b-[#002855] overflow-hidden transition-all duration-500 
                hover:bg-[#002855] hover:shadow-2xl hover:-translate-y-1
                ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
                className="w-full p-6 text-left flex justify-between items-center transition-colors"
              >
                <div className="flex gap-5 items-center">
                  <div className={`p-2.5 rounded-xl transition-all duration-300 ${openIndex === idx ? 'bg-orange-500 text-white shadow-lg scale-110' : 'bg-slate-50 text-[#002855] group-hover:bg-white/10 group-hover:text-orange-400'}`}>
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-orange-400/80 mb-1">{faq.category}</p>
                    <span className="font-bold text-[#002855] group-hover:text-white uppercase text-sm tracking-tight transition-colors">{faq.question}</span>
                  </div>
                </div>
                {openIndex === idx ? <ChevronUp size={20} className="text-orange-500" /> : <ChevronDown size={20} className="text-slate-300 group-hover:text-white/50 transition-colors" />}
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-6 pt-0 text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed bg-slate-50/50 group-hover:bg-black/10 border-t border-gray-100 group-hover:border-white/5 italic">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUPPORT TICKET FORM */}
        <div className={`transition-all duration-1000 delay-500 ${hasLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-[#002855] rounded-3xl p-8 md:p-10 text-white shadow-2xl border-t-8 border-t-orange-500 relative overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                <div className="flex items-center gap-5 flex-1">
                  <div className="bg-orange-500 p-5 rounded-3xl shadow-xl shadow-orange-500/20"><MessageSquare size={32} /></div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-2xl leading-[0.9]">{t('contact_title')} <br/><span className="text-orange-400">{t('contact_sub')}</span></h3>
                    <p className="text-[10px] opacity-40 mt-2 font-bold uppercase tracking-widest">{t('node')}</p>
                  </div>
                </div>
                
                <div className="w-full lg:w-[60%] relative">
                  {submittedQuery ? (
                    <div className="w-full bg-orange-500 rounded-2xl p-5 flex items-center justify-between shadow-2xl animate-in zoom-in-95">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-full animate-bounce">
                          <CheckCircle size={24} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-black uppercase text-xs tracking-tight">{t('sent')}</h4>
                          <p className="text-[10px] opacity-90 font-bold uppercase tracking-widest">ID: {ticketId}</p>
                        </div>
                      </div>
                      <button onClick={() => setSubmittedQuery(null)} className="text-[9px] font-black uppercase bg-white text-[#002855] px-4 py-2.5 rounded-lg hover:bg-slate-100 active:scale-95 transition-all">
                        {t('new_ticket')}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submitQuery} className="w-full">
                      <div className={`flex bg-black/30 backdrop-blur-xl rounded-2xl border p-2 transition-all ${isSubmitting ? 'opacity-50 pointer-events-none' : 'border-white/10'}`}>
                        <input type="text" value={userQuery} onChange={(e) => setUserQuery(e.target.value)} placeholder={t('placeholder')} className="flex-1 bg-transparent px-5 py-3 text-sm focus:outline-none text-white placeholder:text-slate-500" />
                        <button type="submit" className="bg-orange-500 hover:bg-white text-white hover:text-[#002855] px-6 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest">
                          {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : t('send')}
                        </button>
                      </div>
                      <div className="flex justify-between px-3 mt-3">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">SECURE GATEWAY: ACTIVE</span>
                        <a href="tel:112" className="text-[8px] font-black text-orange-400 hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                          <PhoneCall size={10} /> {t('call')}: 112
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 text-center mt-auto">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em]">{BRAND} ERSS • 2026</p>
      </footer>
    </div>
  );
};

export default FAQPage;