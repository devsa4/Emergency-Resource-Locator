/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          AAPADA-FLOW — Emergency Resource System             ║
 * ║   Team EmergencyCoders · FS-VI-T038 · GEU B.Tech CSE        ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  HOW TO RUN:                                                 ║
 * ║   npm create vite@latest my-app -- --template react          ║
 * ║   cd my-app && npm install                                   ║
 * ║   Replace src/App.jsx with this file                         ║
 * ║   Delete src/App.css and src/index.css (not needed)          ║
 * ║   npm run dev                                                ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── TRANSLATIONS ───────────────────────────────────────────────────────── */
const TR = {
  en:{nav:"Navigation",online:"Online",offline:"Offline",home:"Home",map:"Resource Map",emergencies:"Emergencies",hospitals:"Hospitals",shelters:"Shelters",firstaid:"First Aid",alerts:"Alerts",about:"About",worksOffline:"Works fully offline",sos:"SOS",sosTitle:"SOS Alert Sent!",sosDesc:"Your SOS has been dispatched to emergency services.",sosBody:"Your SOS has been dispatched to emergency services.",sosLocShared:"Your location is being shared.",locationShared:"Your location is being shared.",sosNearHosp:"Nearest hospital:",sosNearShelt:"Nearest shelter:",sosCall:"Call 112 for immediate assistance.",callImmediate:"Call 112 for immediate assistance.",close:"Close",callBtn:"Call 112",call112:"Call 112",spotsAvail:"spots available",bedsAvail:"beds available",aiReady:"AI-Powered Emergency Response",aiPowered:"AI-Powered Emergency Response",heroTitle:"Ready When",readyWhen:"Ready When",heroEm:"Disaster Strikes",disasterStrikes:"Disaster Strikes",heroDesc:"Find hospitals, shelters, and emergency resources near you — even without internet.",findNearby:"Find Nearby Resources",reportEmergency:"Report Emergency",languages:"Languages",offlineMode:"Offline Mode",smartRouting:"Smart Routing",quickActions:"Quick Actions",qHospLabel:"Find Hospital",findHospital:"Find Hospital",qHospSub:"AI Ranked",aiRanked:"AI Ranked",qSheltLabel:"Find Shelter",findShelter:"Find Shelter",qSheltSub:"Nearest First",nearestFirst:"Nearest First",qFALabel:"First Aid",firstAid:"First Aid",qFASub:"Offline Guide",offlineGuide:"Offline Guide",qRepLabel:"Report Now",reportNow:"Report Now",qRepSub:"Live Alerts",liveAlerts:"Live Alerts",qAILabel:"AI Assistant",aiAssistant:"AI Assistant",qAISub:"24/7 Active",available247:"24/7 Active",qSOSLabel:"SOS Alert",sosAlert:"SOS Alert",qSOSSub:"Emergency",emergency:"Emergency",emTypes:"Emergency Types",emergencyTypes:"Emergency Types",disPrep:"Disaster Preparedness",tapCard:"Tap a card to view the safety guide",mapTitle:"Resource Map",resourceMap:"Resource Map",mapDesc:"AI-calculated distances to all nearby resources",aiCalc:"AI-calculated distances to all nearby resources",allFilter:"All",all:"All",fireFilter:"Fire",fire:"Fire",policeFilter:"Police",police:"Police",emgTitle:"Emergencies",reportTitle:"Report Emergency",reportEm:"Report Emergency",emgType:"Emergency Type",emType:"Emergency Type",descLabel:"Describe the emergency",describe:"Describe the emergency",descPlaceholder:"Location, people affected, immediate needs...",submitReport:"Submit Report",submit:"Submit Report",activeAlerts:"Active Alerts",hospTitle:"Hospitals & Medical",hospitalsTitle:"Hospitals & Medical",hospDesc:"AI Score = Distance 40% · Availability 30% · Specialization 20% · Congestion 10%",aiScoreDesc:"AI Score = Distance 40% · Availability 30% · Specialization 20% · Congestion 10%",searchHosp:"Search hospitals...",searchHospitals:"Search hospitals...",searchShelt:"Search shelters...",searchShelters:"Search shelters...",sheltTitle:"Emergency Shelters",sheltersTitle:"Emergency Shelters",faTitle:"First Aid Guide",firstAidTitle:"First Aid Guide",faDesc:"Fully available offline — no internet needed",fullyOffline:"Fully available offline — no internet needed",alertsTitle:"Alerts & News",aboutTitle:"About Aapada-Flow",teamLabel:"Team EmergencyCoders",teamName:"Team EmergencyCoders",keyFeatures:"Key Features",emergencyNums:"Emergency Numbers",emergencyNumbers:"Emergency Numbers",chatWithUs:"Chat with us about your emergency",chatWith:"Chat with us about your emergency",chatWelcome:"Namaste! I am Aapada AI — your emergency assistant. Ask me about hospitals, shelters, first aid, or disaster safety.",chatPlaceholder:"Ask Aapada AI anything...",chatSugg1:"nearest hospital",chatSugg2:"flood safety",chatSugg3:"CPR steps",chatSugg4:"emergency contacts",aiBadge:"Aapada AI",aiActive:"Active",prevStep:"Prev",nextStep:"Next",firstAction:"First Action",safetySteps:"Safety Steps",stepOf:"of",openLabel:"OPEN",callNum:"Call",viewGuide:"View Safety Guide",govtLabel:"Govt",pvtLabel:"Pvt",routeBtn:"Route",callContact:"Call",warningLabel:"Warning",heroLine1:"When Every Second",heroLine2:"Counts — We're Here",heroDesc3:"Hospitals, shelters, first aid, disaster guides — your complete emergency companion. Trusted. Offline. Instant.",weatherTitle:"Weather",checklistTitle:"Checklist",checklistDesc:"Track your disaster preparedness",notepadTitle:"Emergency Notepad",panicTitle:"Panic Timer",panicDesc:"Press if you are in danger",contactsTitle:"Emergency Contacts",resourceMapTitle:"Resource Map",mapSubTitle:"AI-ranked resources near you",firstAidPageTitle:"First Aid Guide",weatherPageTitle:"Weather",aboutPageTitle:"About AapadaFlow",sidebarOnline:"Online",sidebarOffline:"Offline"},
  hi:{nav:"नेविगेशन",online:"ऑनलाइन",offline:"ऑफलाइन",home:"होम",map:"संसाधन मानचित्र",emergencies:"आपातकालीन",hospitals:"अस्पताल",shelters:"आश्रय",firstaid:"प्राथमिक उपचार",alerts:"अलर्ट",about:"परिचय",worksOffline:"पूरी तरह ऑफलाइन",sos:"SOS",sosTitle:"SOS अलर्ट भेजा गया!",sosBody:"आपका SOS आपातकालीन सेवाओं को भेज दिया गया है।",sosLocShared:"आपका स्थान साझा किया जा रहा है।",sosNearHosp:"निकटतम अस्पताल:",sosNearShelt:"निकटतम आश्रय:",sosCall:"तत्काल सहायता के लिए 112 पर कॉल करें।",close:"बंद करें",callBtn:"112 पर कॉल करें",aiReady:"AI-संचालित आपातकालीन प्रतिक्रिया",heroTitle:"तैयार रहें जब",heroEm:"आपदा आए",heroDesc:"इंटरनेट के बिना भी पास में अस्पताल, आश्रय और आपातकालीन संसाधन खोजें।",findNearby:"पास के संसाधन खोजें",reportEmergency:"आपातकाल रिपोर्ट करें",languages:"भाषाएं",offlineMode:"ऑफलाइन मोड",smartRouting:"स्मार्ट रूटिंग",quickActions:"त्वरित कार्य",qHospLabel:"अस्पताल खोजें",qHospSub:"AI रैंकड",qSheltLabel:"आश्रय खोजें",qSheltSub:"निकटतम पहले",qFALabel:"प्राथमिक उपचार",qFASub:"ऑफलाइन गाइड",qRepLabel:"अभी रिपोर्ट करें",qRepSub:"लाइव अलर्ट",qAILabel:"AI सहायक",qAISub:"24/7 उपलब्ध",qSOSLabel:"SOS अलर्ट",qSOSSub:"आपातकालीन",emTypes:"आपदा प्रकार",disPrep:"आपदा प्रबंधन",tapCard:"सुरक्षा गाइड के लिए कार्ड टैप करें",mapTitle:"संसाधन मानचित्र",mapDesc:"AI द्वारा निकटतम संसाधनों की दूरी",allFilter:"सभी",fireFilter:"अग्निशमन",policeFilter:"पुलिस",emgTitle:"आपातकालीन",reportTitle:"आपातकाल रिपोर्ट करें",emgType:"आपदा प्रकार",descLabel:"आपातकाल का विवरण",descPlaceholder:"स्थान, प्रभावित लोग, तत्काल जरूरतें...",submitReport:"रिपोर्ट सबमिट करें",activeAlerts:"सक्रिय अलर्ट",hospTitle:"अस्पताल और चिकित्सा",hospDesc:"AI स्कोर = दूरी 40% + उपलब्धता 30% + विशेषज्ञता 20% + भीड़ 10%",searchHosp:"अस्पताल खोजें...",searchShelt:"आश्रय खोजें...",sheltTitle:"आपातकालीन आश्रय",faTitle:"प्राथमिक उपचार गाइड",faDesc:"पूरी तरह ऑफलाइन उपलब्ध",alertsTitle:"अलर्ट और समाचार",aboutTitle:"आपदा-फ्लो के बारे में",teamLabel:"टीम EmergencyCoders",keyFeatures:"मुख्य विशेषताएं",emergencyNums:"आपातकालीन नंबर",chatWithUs:"आपातकाल के बारे में हमसे बात करें",chatWelcome:"नमस्ते! मैं Aapada AI हूं। अस्पताल, आश्रय, प्राथमिक उपचार में मदद कर सकता हूं।",chatPlaceholder:"Aapada AI से पूछें...",chatSugg1:"निकटतम अस्पताल",chatSugg2:"बाढ़ सुरक्षा",chatSugg3:"CPR steps",chatSugg4:"आपातकालीन नंबर",aiBadge:"Aapada AI",aiActive:"सक्रिय",prevStep:"पिछला",nextStep:"अगला",firstAction:"पहला कदम",safetySteps:"सुरक्षा के कदम",stepOf:"में से",openLabel:"खुला",findHospital:"अस्पताल खोजें",callNum:"कॉल",viewGuide:"सुरक्षा गाइड",spotsAvail:"स्थान उपलब्ध",bedsAvail:"बेड उपलब्ध",govtLabel:"सरकारी",pvtLabel:"निजी",routeBtn:"रास्ता",callContact:"कॉल",warningLabel:"चेतावनी",heroLine1:"हर पल में",heroLine2:"हम आपके साथ हैं",heroDesc3:"अस्पताल, आश्रय, प्राथमिक उपचार — एक ही जगह। बिना इंटरनेट के भी काम करता है।",weatherTitle:"मौसम",checklistTitle:"चेकलिस्ट",checklistDesc:"आपदा की तैयारी ट्रैक करें",notepadTitle:"आपातकालीन नोटपैड",panicTitle:"पैनिक टाइमर",panicDesc:"खतरे में हों तो दबाएं",contactsTitle:"आपातकालीन संपर्क",resourceMapTitle:"संसाधन मानचित्र",mapSubTitle:"AI-रैंक्ड निकटतम संसाधन",firstAidPageTitle:"प्राथमिक उपचार गाइड",weatherPageTitle:"मौसम",aboutPageTitle:"AapadaFlow के बारे में",sidebarOnline:"ऑनलाइन",sidebarOffline:"ऑफलाइन"},
  ur:{nav:"نیویگیشن",online:"آن لائن",offline:"آف لائن",home:"ہوم",map:"نقشہ",emergencies:"ہنگامی",hospitals:"اسپتال",shelters:"پناہ گاہ",firstaid:"ابتدائی طبی",alerts:"الرٹ",about:"تعارف",worksOffline:"آف لائن کام",sos:"SOS",sosTitle:"SOS الرٹ بھیج دیا!",sosBody:"آپ کا SOS بھیج دیا گیا۔",sosLocShared:"مقام شیئر ہو رہا ہے۔",sosNearHosp:"قریبی اسپتال:",sosNearShelt:"قریبی پناہ:",sosCall:"112 پر کال کریں۔",close:"بند",callBtn:"112 کال",aiReady:"AI ہنگامی ردعمل",heroTitle:"تیار رہیں",heroEm:"جب آفت آئے",heroDesc:"بغیر انٹرنیٹ کے قریبی اسپتال اور آشیانہ تلاش کریں۔",findNearby:"قریبی وسائل",reportEmergency:"ہنگامی اطلاع",languages:"زبانیں",offlineMode:"آف لائن",smartRouting:"سمارٹ روٹ",quickActions:"فوری اقدام",qHospLabel:"اسپتال",qHospSub:"AI درجہ",qSheltLabel:"پناہ",qSheltSub:"قریب پہلے",qFALabel:"طبی امداد",qFASub:"آف لائن",qRepLabel:"رپورٹ",qRepSub:"لائیو",qAILabel:"AI معاون",qAISub:"24/7",qSOSLabel:"SOS",qSOSSub:"ہنگامی",emTypes:"آفت اقسام",disPrep:"آفت انتظام",tapCard:"گائیڈ کیلئے ٹیپ کریں",mapTitle:"نقشہ",mapDesc:"AI فاصلہ",allFilter:"سب",fireFilter:"آگ",policeFilter:"پولیس",emgTitle:"ہنگامی",reportTitle:"ہنگامی رپورٹ",emgType:"آفت قسم",descLabel:"تفصیل",descPlaceholder:"مقام، متاثرین...",submitReport:"جمع",activeAlerts:"فعال الرٹ",hospTitle:"اسپتال",hospDesc:"AI اسکور",searchHosp:"اسپتال...",searchShelt:"پناہ...",sheltTitle:"آشیانے",faTitle:"طبی امداد",faDesc:"آف لائن",alertsTitle:"الرٹ",aboutTitle:"آپدا-فلو",teamLabel:"ٹیم",keyFeatures:"خصوصیات",emergencyNums:"ہنگامی نمبر",chatWithUs:"ہنگامی صورت میں بات کریں",chatWelcome:"السلام علیکم! میں Aapada AI ہوں۔",chatPlaceholder:"Aapada AI سے پوچھیں...",chatSugg1:"اسپتال",chatSugg2:"سیلاب",chatSugg3:"CPR",chatSugg4:"ہنگامی نمبر",aiBadge:"Aapada AI",aiActive:"فعال",prevStep:"پچھلا",nextStep:"اگلا",firstAction:"پہلا قدم",safetySteps:"حفاظت",stepOf:"میں سے",openLabel:"کھلا",findHospital:"اسپتال",callNum:"کال",viewGuide:"گائیڈ",spotsAvail:"جگہ",bedsAvail:"بیڈ",govtLabel:"سرکاری",pvtLabel:"نجی",routeBtn:"راستہ",callContact:"کال",warningLabel:"انتباہ",heroLine1:"ہر لمحے",heroLine2:"ہم آپ کے ساتھ ہیں",heroDesc3:"اسپتال، پناہ، طبی امداد — ایک ہی جگہ۔ بغیر انٹرنیٹ کے بھی۔",weatherTitle:"موسم",checklistTitle:"چیک لسٹ",checklistDesc:"تیاری ٹریک کریں",notepadTitle:"نوٹ پیڈ",panicTitle:"پینک ٹائمر",panicDesc:"خطرے میں دبائیں",contactsTitle:"ہنگامی رابطے",resourceMapTitle:"وسائل نقشہ",mapSubTitle:"AI-درجہ بندی وسائل",firstAidPageTitle:"طبی امداد گائیڈ",weatherPageTitle:"موسم",aboutPageTitle:"AapadaFlow کے بارے میں",sidebarOnline:"آن لائن",sidebarOffline:"آف لائن"},
  mr:{nav:"नेव्हिगेशन",online:"ऑनलाइन",offline:"ऑफलाइन",home:"मुख्यपृष्ठ",map:"नकाशा",emergencies:"आणीबाणी",hospitals:"रुग्णालये",shelters:"निवारे",firstaid:"प्रथमोपचार",alerts:"सूचना",about:"परिचय",worksOffline:"ऑफलाइन कार्य",sos:"SOS",sosTitle:"SOS पाठवले!",sosBody:"SOS पाठवले गेले.",sosLocShared:"स्थान शेअर होत आहे.",sosNearHosp:"जवळचे रुग्णालय:",sosNearShelt:"जवळचा निवारा:",sosCall:"112 वर कॉल करा.",close:"बंद",callBtn:"112 कॉल",aiReady:"AI आपत्कालीन",heroTitle:"तयार रहा",heroEm:"आपत्ती येते तेव्हा",heroDesc:"इंटरनेटशिवाय जवळचे रुग्णालय आणि निवारा शोधा.",findNearby:"जवळचे शोधा",reportEmergency:"आणीबाणी नोंदवा",languages:"भाषा",offlineMode:"ऑफलाइन",smartRouting:"स्मार्ट रूट",quickActions:"त्वरित",qHospLabel:"रुग्णालय",qHospSub:"AI क्रम",qSheltLabel:"निवारा",qSheltSub:"जवळचे",qFALabel:"प्रथमोपचार",qFASub:"ऑफलाइन",qRepLabel:"नोंदवा",qRepSub:"लाइव्ह",qAILabel:"AI सहाय्यक",qAISub:"24/7",qSOSLabel:"SOS",qSOSSub:"आणीबाणी",emTypes:"आपत्ती प्रकार",disPrep:"आपत्ती व्यवस्थापन",tapCard:"कार्ड टॅप करा",mapTitle:"नकाशा",mapDesc:"AI अंतर",allFilter:"सर्व",fireFilter:"आग",policeFilter:"पोलीस",emgTitle:"आणीबाणी",reportTitle:"आणीबाणी नोंद",emgType:"प्रकार",descLabel:"विवरण",descPlaceholder:"स्थान, प्रभावित...",submitReport:"सादर करा",activeAlerts:"सक्रिय",hospTitle:"रुग्णालये",hospDesc:"AI स्कोर",searchHosp:"शोधा...",searchShelt:"शोधा...",sheltTitle:"निवारे",faTitle:"प्रथमोपचार",faDesc:"ऑफलाइन",alertsTitle:"सूचना",aboutTitle:"आपदा-फ्लो",teamLabel:"टीम",keyFeatures:"वैशिष्ट्ये",emergencyNums:"आपत्कालीन",chatWithUs:"आणीबाणीबद्दल बोला",chatWelcome:"नमस्कार! मी Aapada AI आहे.",chatPlaceholder:"Aapada AI ला विचारा...",chatSugg1:"जवळचे रुग्णालय",chatSugg2:"पूर सुरक्षा",chatSugg3:"CPR",chatSugg4:"आपत्कालीन",aiBadge:"Aapada AI",aiActive:"सक्रिय",prevStep:"मागील",nextStep:"पुढील",firstAction:"पहिले पाऊल",safetySteps:"सुरक्षा",stepOf:"पैकी",openLabel:"उघडा",findHospital:"रुग्णालय",callNum:"कॉल",viewGuide:"गाइड",spotsAvail:"जागा",bedsAvail:"बेड",govtLabel:"सरकारी",pvtLabel:"खाजगी",routeBtn:"मार्ग",callContact:"कॉल",warningLabel:"इशारा",heroLine1:"प्रत्येक क्षणी",heroLine2:"आम्ही तुमच्यासोबत",heroDesc3:"रुग्णालये, निवारे, प्रथमोपचार — एकाच ठिकाणी। इंटरनेटशिवायही।",weatherTitle:"हवामान",checklistTitle:"चेकलिस्ट",checklistDesc:"आपत्ती तयारी ट्रॅक करा",notepadTitle:"आपत्कालीन नोटपॅड",panicTitle:"पॅनिक टायमर",panicDesc:"धोक्यात असल्यास दाबा",contactsTitle:"आपत्कालीन संपर्क",resourceMapTitle:"संसाधन नकाशा",mapSubTitle:"AI-क्रमांकित जवळचे संसाधने",firstAidPageTitle:"प्रथमोपचार गाइड",weatherPageTitle:"हवामान",aboutPageTitle:"AapadaFlow बद्दल",sidebarOnline:"ऑनलाइन",sidebarOffline:"ऑफलाइन"},
  kn:{nav:"ನ್ಯಾವಿ",online:"ಆನ್‌ಲೈನ್",offline:"ಆಫ್‌ಲೈನ್",home:"ಮನೆ",map:"ನಕ್ಷೆ",emergencies:"ತುರ್ತು",hospitals:"ಆಸ್ಪತ್ರೆ",shelters:"ಆಶ್ರಯ",firstaid:"ಪ್ರಥಮ ಚಿಕ್",alerts:"ಎಚ್ಚರಿಕೆ",about:"ಬಗ್ಗೆ",worksOffline:"ಆಫ್‌ಲೈನ್ ಕಾರ್ಯ",sos:"SOS",sosTitle:"SOS ಕಳುಹಿಸಲಾಯಿತು!",sosBody:"SOS ಕಳುಹಿಸಲಾಗಿದೆ.",sosLocShared:"ಸ್ಥಳ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ.",sosNearHosp:"ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ:",sosNearShelt:"ಹತ್ತಿರದ ಆಶ್ರಯ:",sosCall:"112 ಗೆ ಕರೆ ಮಾಡಿ.",close:"ಮುಚ್ಚಿ",callBtn:"112 ಕರೆ",aiReady:"AI ತುರ್ತು",heroTitle:"ಸಿದ್ಧ ರಾಗಿ",heroEm:"ವಿಪತ್ತು ಬಂದಾಗ",heroDesc:"ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಹುಡುಕಿ.",findNearby:"ಹತ್ತಿರ ಹುಡುಕಿ",reportEmergency:"ತುರ್ತು ನೋಂದಿಸಿ",languages:"ಭಾಷೆ",offlineMode:"ಆಫ್‌ಲೈನ್",smartRouting:"ಸ್ಮಾರ್ಟ್ ರೂಟ್",quickActions:"ತ್ವರಿತ",qHospLabel:"ಆಸ್ಪತ್ರೆ",qHospSub:"AI ಶ್ರೇಣಿ",qSheltLabel:"ಆಶ್ರಯ",qSheltSub:"ಹತ್ತಿರ",qFALabel:"ಪ್ರಥಮ ಚಿಕ್",qFASub:"ಆಫ್‌ಲೈನ್",qRepLabel:"ನೋಂದಿಸಿ",qRepSub:"ಲೈವ್",qAILabel:"AI ಸಹಾಯ",qAISub:"24/7",qSOSLabel:"SOS",qSOSSub:"ತುರ್ತು",emTypes:"ವಿಪತ್ತು ವಿಧ",disPrep:"ವಿಪತ್ತು ನಿರ್ವ",tapCard:"ಕಾರ್ಡ್ ಟ್ಯಾಪ್",mapTitle:"ನಕ್ಷೆ",mapDesc:"AI ಅಂತರ",allFilter:"ಎಲ್ಲ",fireFilter:"ಬೆಂಕಿ",policeFilter:"ಪೊಲೀಸ್",emgTitle:"ತುರ್ತು",reportTitle:"ತುರ್ತು ನೋಂದ",emgType:"ವಿಧ",descLabel:"ವಿವರ",descPlaceholder:"ಸ್ಥಳ, ಪ್ರಭಾವಿತ...",submitReport:"ಸಲ್ಲಿಸಿ",activeAlerts:"ಸಕ್ರಿಯ",hospTitle:"ಆಸ್ಪತ್ರೆ",hospDesc:"AI ಸ್ಕೋರ್",searchHosp:"ಹುಡುಕಿ...",searchShelt:"ಹುಡುಕಿ...",sheltTitle:"ಆಶ್ರಯ",faTitle:"ಪ್ರಥಮ ಚಿಕ್",faDesc:"ಆಫ್‌ಲೈನ್",alertsTitle:"ಎಚ್ಚರಿಕೆ",aboutTitle:"ಆಪದ-ಫ್ಲೋ",teamLabel:"ತಂಡ",keyFeatures:"ವೈಶಿಷ್ಟ್ಯ",emergencyNums:"ತುರ್ತು ಸಂ",chatWithUs:"ತುರ್ತು ಬಗ್ಗೆ ಮಾತಾಡಿ",chatWelcome:"ನಮಸ್ಕಾರ! ನಾನು Aapada AI.",chatPlaceholder:"Aapada AI ಕೇಳಿ...",chatSugg1:"ಹತ್ತಿರ ಆಸ್ಪತ್ರೆ",chatSugg2:"ಪ್ರವಾಹ",chatSugg3:"CPR",chatSugg4:"ತುರ್ತು",aiBadge:"Aapada AI",aiActive:"ಸಕ್ರಿಯ",prevStep:"ಹಿಂದೆ",nextStep:"ಮುಂದೆ",firstAction:"ಮೊದಲ",safetySteps:"ಸುರಕ್ಷತೆ",stepOf:"ರಲ್ಲಿ",openLabel:"ತೆರೆ",findHospital:"ಆಸ್ಪತ್ರೆ",callNum:"ಕರೆ",viewGuide:"ಗೈಡ್",spotsAvail:"ಸ್ಥಳ",bedsAvail:"ಹಾಸಿಗೆ",govtLabel:"ಸರಕಾರ",pvtLabel:"ಖಾಸ",routeBtn:"ಮಾರ್ಗ",callContact:"ಕರೆ",warningLabel:"ಎಚ್ಚರ",heroLine1:"ಪ್ರತಿ ಕ್ಷಣದಲ್ಲಿ",heroLine2:"ನಾವು ನಿಮ್ಮ ಜೊತೆ",heroDesc3:"ಆಸ್ಪತ್ರೆ, ಆಶ್ರಯ, ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ — ಒಂದೇ ಜಾಗದಲ್ಲಿ. ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆಯೂ.",weatherTitle:"ಹವಾಮಾನ",checklistTitle:"ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",checklistDesc:"ಸಿದ್ಧತೆ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",notepadTitle:"ತುರ್ತು ನೋಟ್‌ಪ್ಯಾಡ್",panicTitle:"ಪ್ಯಾನಿಕ್ ಟೈಮರ್",panicDesc:"ಅಪಾಯದಲ್ಲಿ ಒತ್ತಿರಿ",contactsTitle:"ತುರ್ತು ಸಂಪರ್ಕಗಳು",resourceMapTitle:"ಸಂಪನ್ಮೂಲ ನಕ್ಷೆ",mapSubTitle:"AI-ಶ್ರೇಣಿ ಸಂಪನ್ಮೂಲಗಳು",firstAidPageTitle:"ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಗೈಡ್",weatherPageTitle:"ಹವಾಮಾನ",aboutPageTitle:"AapadaFlow ಬಗ್ಗೆ",sidebarOnline:"ಆನ್‌ಲೈನ್",sidebarOffline:"ಆಫ್‌ಲೈನ್"},
  te:{nav:"నావిగేషన్",online:"ఆన్‌లైన్",offline:"ఆఫ్‌లైన్",home:"హోమ్",map:"మ్యాప్",emergencies:"అత్యవసర",hospitals:"ఆసుపత్రి",shelters:"ఆశ్రయం",firstaid:"ప్రథమ చికిత్స",alerts:"హెచ్చరిక",about:"గురించి",worksOffline:"ఆఫ్‌లైన్",sos:"SOS",sosTitle:"SOS పంపబడింది!",sosBody:"SOS పంపబడింది.",sosLocShared:"స్థానం షేర్.",sosNearHosp:"దగ్గరి ఆసుపత్రి:",sosNearShelt:"దగ్గరి ఆశ్రయం:",sosCall:"112 కు కాల్.",close:"మూసివేయి",callBtn:"112 కాల్",aiReady:"AI అత్యవసర",heroTitle:"సిద్ధంగా ఉండండి",heroEm:"విపత్తు వచ్చినప్పుడు",heroDesc:"ఇంటర్నెట్ లేకుండా దగ్గరి ఆసుపత్రి కనుగొనండి.",findNearby:"దగ్గరి వనరులు",reportEmergency:"అత్యవసర నివేదించు",languages:"భాషలు",offlineMode:"ఆఫ్‌లైన్",smartRouting:"స్మార్ట్ రూట్",quickActions:"త్వరిత",qHospLabel:"ఆసుపత్రి",qHospSub:"AI ర్యాంక్",qSheltLabel:"ఆశ్రయం",qSheltSub:"దగ్గరి",qFALabel:"ప్రథమ చికిత్స",qFASub:"ఆఫ్‌లైన్",qRepLabel:"నివేదించు",qRepSub:"లైవ్",qAILabel:"AI సహాయకుడు",qAISub:"24/7",qSOSLabel:"SOS",qSOSSub:"అత్యవసర",emTypes:"విపత్తు రకాలు",disPrep:"విపత్తు నిర్వహణ",tapCard:"కార్డ్ నొక్కండి",mapTitle:"మ్యాప్",mapDesc:"AI దూరం",allFilter:"అన్నీ",fireFilter:"అగ్ని",policeFilter:"పోలీసు",emgTitle:"అత్యవసర",reportTitle:"అత్యవసర నివేదిక",emgType:"రకం",descLabel:"వివరణ",descPlaceholder:"స్థానం, అవసరాలు...",submitReport:"సమర్పించు",activeAlerts:"యాక్టివ్",hospTitle:"ఆసుపత్రులు",hospDesc:"AI స్కోర్",searchHosp:"వెతుకు...",searchShelt:"వెతుకు...",sheltTitle:"ఆశ్రయాలు",faTitle:"ప్రథమ చికిత్స",faDesc:"ఆఫ్‌లైన్",alertsTitle:"హెచ్చరికలు",aboutTitle:"ఆపద-ఫ్లో",teamLabel:"టీమ్",keyFeatures:"లక్షణాలు",emergencyNums:"అత్యవసర నంబర్లు",chatWithUs:"అత్యవసర గురించి మాట్లాడండి",chatWelcome:"నమస్కారం! నేను Aapada AI.",chatPlaceholder:"Aapada AI అడగండి...",chatSugg1:"దగ్గరి ఆసుపత్రి",chatSugg2:"వరద",chatSugg3:"CPR",chatSugg4:"అత్యవసర",aiBadge:"Aapada AI",aiActive:"యాక్టివ్",prevStep:"వెనక్కి",nextStep:"ముందుకు",firstAction:"మొదటి",safetySteps:"భద్రత",stepOf:"లో",openLabel:"తెరవు",findHospital:"ఆసుపత్రి",callNum:"కాల్",viewGuide:"గైడ్",spotsAvail:"స్థానాలు",bedsAvail:"బెడ్లు",govtLabel:"ప్రభుత్వ",pvtLabel:"ప్రైవేట్",routeBtn:"మార్గం",callContact:"కాల్",warningLabel:"హెచ్చరిక",heroLine1:"ప్రతి క్షణంలో",heroLine2:"మేం మీతో ఉన్నాం",heroDesc3:"ఆసుపత్రి, ఆశ్రయం, ప్రాథమిక చికిత్స — ఒకే చోట. ఇంటర్నెట్ లేకుండా కూడా.",weatherTitle:"వాతావరణం",checklistTitle:"చెక్‌లిస్ట్",checklistDesc:"సంసిద్ధతను ట్రాక్ చేయండి",notepadTitle:"అత్యవసర నోట్‌పాడ్",panicTitle:"పానిక్ టైమర్",panicDesc:"ప్రమాదంలో నొక్కండి",contactsTitle:"అత్యవసర పరిచయాలు",resourceMapTitle:"వనరుల మ్యాప్",mapSubTitle:"AI-ర్యాంక్ వనరులు",firstAidPageTitle:"ప్రాథమిక చికిత్స గైడ్",weatherPageTitle:"వాతావరణం",aboutPageTitle:"AapadaFlow గురించి",sidebarOnline:"ఆన్‌లైన్",sidebarOffline:"ఆఫ్‌లైన్"},
  ta:{nav:"வழிசெலுத்தல்",online:"இணையம்",offline:"இணையமின்றி",home:"முகப்பு",map:"வரைபடம்",emergencies:"அவசரம்",hospitals:"மருத்துவமனை",shelters:"தங்குமிடம்",firstaid:"முதலுதவி",alerts:"எச்சரிக்கை",about:"பற்றி",worksOffline:"ஆஃப்லைன்",sos:"SOS",sosTitle:"SOS அனுப்பப்பட்டது!",sosBody:"SOS அனுப்பப்பட்டது.",sosLocShared:"இருப்பிடம் பகிரப்படுகிறது.",sosNearHosp:"அருகில் மருத்துவமனை:",sosNearShelt:"அருகில் தங்குமிடம்:",sosCall:"112 அழையுங்கள்.",close:"மூடு",callBtn:"112 அழை",aiReady:"AI அவசர",heroTitle:"தயாராக இருங்கள்",heroEm:"பேரிடர் வரும்போது",heroDesc:"இணையம் இல்லாமல் அருகில் மருத்துவமனை கண்டறியுங்கள்.",findNearby:"அருகில் கண்டறி",reportEmergency:"அவசரம் தெரிவி",languages:"மொழிகள்",offlineMode:"ஆஃப்லைன்",smartRouting:"ஸ்மார்ட் ரூட்",quickActions:"விரைவு",qHospLabel:"மருத்துவமனை",qHospSub:"AI தரம்",qSheltLabel:"தங்குமிடம்",qSheltSub:"அருகில்",qFALabel:"முதலுதவி",qFASub:"ஆஃப்லைன்",qRepLabel:"தெரிவி",qRepSub:"நேரடி",qAILabel:"AI உதவி",qAISub:"24/7",qSOSLabel:"SOS",qSOSSub:"அவசரம்",emTypes:"பேரிடர் வகை",disPrep:"பேரிடர் மேலாண்மை",tapCard:"கார்டை தட்டுங்கள்",mapTitle:"வரைபடம்",mapDesc:"AI தூரம்",allFilter:"எல்லாம்",fireFilter:"நெருப்பு",policeFilter:"காவல்",emgTitle:"அவசரம்",reportTitle:"அவசர தெரிவிப்பு",emgType:"வகை",descLabel:"விவரணை",descPlaceholder:"இடம், தேவைகள்...",submitReport:"சமர்ப்பி",activeAlerts:"செயலில்",hospTitle:"மருத்துவமனைகள்",hospDesc:"AI மதிப்பு",searchHosp:"தேடு...",searchShelt:"தேடு...",sheltTitle:"தங்குமிடங்கள்",faTitle:"முதலுதவி",faDesc:"ஆஃப்லைன்",alertsTitle:"எச்சரிக்கைகள்",aboutTitle:"ஆபதா-ஃப்ளோ",teamLabel:"குழு",keyFeatures:"அம்சங்கள்",emergencyNums:"அவசர எண்கள்",chatWithUs:"அவசரம் பற்றி பேசுங்கள்",chatWelcome:"வணக்கம்! நான் Aapada AI.",chatPlaceholder:"Aapada AI கேளுங்கள்...",chatSugg1:"அருகில் மருத்துவமனை",chatSugg2:"வெள்ளம்",chatSugg3:"CPR",chatSugg4:"அவசர தொடர்பு",aiBadge:"Aapada AI",aiActive:"செயலில்",prevStep:"முந்தைய",nextStep:"அடுத்த",firstAction:"முதல் நடவடிக்கை",safetySteps:"பாதுகாப்பு",stepOf:"இல்",openLabel:"திற",findHospital:"மருத்துவமனை",callNum:"அழை",viewGuide:"வழிகாட்டி",spotsAvail:"இடங்கள்",bedsAvail:"படுக்கைகள்",govtLabel:"அரசு",pvtLabel:"தனியார்",routeBtn:"பாதை",callContact:"அழை",warningLabel:"எச்சரிக்கை",heroLine1:"ஒவ்வொரு நொடியும்",heroLine2:"நாங்கள் உங்களுடன்",heroDesc3:"மருத்துவமனை, தங்குமிடம், முதலுதவி — ஒரே இடத்தில். இணையம் இல்லாமலும்.",weatherTitle:"வானிலை",checklistTitle:"சரிபார்ப்பு பட்டியல்",checklistDesc:"தயார்நிலை கண்காணி",notepadTitle:"அவசர குறிப்பேடு",panicTitle:"பதட்ட டைமர்",panicDesc:"ஆபத்தில் அழுத்துங்கள்",contactsTitle:"அவசர தொடர்புகள்",resourceMapTitle:"வளங்கள் வரைபடம்",mapSubTitle:"AI-தரவரிசை வளங்கள்",firstAidPageTitle:"முதலுதவி வழிகாட்டி",weatherPageTitle:"வானிலை",aboutPageTitle:"AapadaFlow பற்றி",sidebarOnline:"இணையம்",sidebarOffline:"இணையமின்றி"},
  bn:{nav:"নেভিগেশন",online:"অনলাইন",offline:"অফলাইন",home:"হোম",map:"মানচিত্র",emergencies:"জরুরি",hospitals:"হাসপাতাল",shelters:"আশ্রয়",firstaid:"প্রাথমিক চিকিৎসা",alerts:"সতর্কতা",about:"সম্পর্কে",worksOffline:"অফলাইন",sos:"SOS",sosTitle:"SOS পাঠানো হয়েছে!",sosBody:"SOS পাঠানো হয়েছে।",sosLocShared:"অবস্থান শেয়ার হচ্ছে।",sosNearHosp:"কাছের হাসপাতাল:",sosNearShelt:"কাছের আশ্রয়:",sosCall:"১১২ কল করুন।",close:"বন্ধ",callBtn:"১১২ কল",aiReady:"AI জরুরি",heroTitle:"প্রস্তুত থাকুন",heroEm:"দুর্যোগ আসলে",heroDesc:"ইন্টারনেট ছাড়াও কাছের হাসপাতাল খুঁজুন।",findNearby:"কাছের সম্পদ",reportEmergency:"জরুরি অবস্থা",languages:"ভাষা",offlineMode:"অফলাইন",smartRouting:"স্মার্ট রুট",quickActions:"দ্রুত",qHospLabel:"হাসপাতাল",qHospSub:"AI র‍্যাংক",qSheltLabel:"আশ্রয়",qSheltSub:"কাছের",qFALabel:"প্রাথমিক চিকিৎসা",qFASub:"অফলাইন",qRepLabel:"রিপোর্ট",qRepSub:"লাইভ",qAILabel:"AI সহকারী",qAISub:"24/7",qSOSLabel:"SOS",qSOSSub:"জরুরি",emTypes:"দুর্যোগ ধরন",disPrep:"দুর্যোগ ব্যবস্থাপনা",tapCard:"কার্ড ট্যাপ করুন",mapTitle:"মানচিত্র",mapDesc:"AI দূরত্ব",allFilter:"সব",fireFilter:"আগুন",policeFilter:"পুলিশ",emgTitle:"জরুরি",reportTitle:"জরুরি রিপোর্ট",emgType:"ধরন",descLabel:"বিবরণ",descPlaceholder:"অবস্থান, প্রয়োজন...",submitReport:"জমা দিন",activeAlerts:"সক্রিয়",hospTitle:"হাসপাতাল",hospDesc:"AI স্কোর",searchHosp:"খুঁজুন...",searchShelt:"খুঁজুন...",sheltTitle:"আশ্রয়",faTitle:"প্রাথমিক চিকিৎসা",faDesc:"অফলাইন",alertsTitle:"সতর্কতা",aboutTitle:"আপদা-ফ্লো",teamLabel:"দল",keyFeatures:"বৈশিষ্ট্য",emergencyNums:"জরুরি নম্বর",chatWithUs:"জরুরি অবস্থা নিয়ে কথা বলুন",chatWelcome:"নমস্কার! আমি Aapada AI।",chatPlaceholder:"Aapada AI জিজ্ঞেস করুন...",chatSugg1:"কাছের হাসপাতাল",chatSugg2:"বন্যা",chatSugg3:"CPR",chatSugg4:"জরুরি যোগাযোগ",aiBadge:"Aapada AI",aiActive:"সক্রিয়",prevStep:"আগের",nextStep:"পরের",firstAction:"প্রথম",safetySteps:"নিরাপত্তা",stepOf:"এর",openLabel:"খোলা",findHospital:"হাসপাতাল",callNum:"কল",viewGuide:"গাইড",spotsAvail:"জায়গা",bedsAvail:"বেড",govtLabel:"সরকারি",pvtLabel:"বেসরকারি",routeBtn:"পথ",callContact:"কল",warningLabel:"সতর্কতা",heroLine1:"প্রতিটি মুহূর্তে",heroLine2:"আমরা আপনার পাশে",heroDesc3:"হাসপাতাল, আশ্রয়, প্রাথমিক চিকিৎসা — একই জায়গায়। ইন্টারনেট ছাড়াও।",weatherTitle:"আবহাওয়া",checklistTitle:"চেকলিস্ট",checklistDesc:"প্রস্তুতি ট্র্যাক করুন",notepadTitle:"জরুরি নোটপ্যাড",panicTitle:"প্যানিক টাইমার",panicDesc:"বিপদে চাপুন",contactsTitle:"জরুরি যোগাযোগ",resourceMapTitle:"সম্পদ মানচিত্র",mapSubTitle:"AI-র‍্যাংক সম্পদ",firstAidPageTitle:"প্রাথমিক চিকিৎসা গাইড",weatherPageTitle:"আবহাওয়া",aboutPageTitle:"AapadaFlow সম্পর্কে",sidebarOnline:"অনলাইন",sidebarOffline:"অফলাইন"},
  gu:{nav:"નેવ",online:"ઓનલ",offline:"ઓફ",home:"હોમ",map:"નકશો",emergencies:"કટ",hospitals:"હોસ",shelters:"આ",firstaid:"ઉ",alerts:"ચ",about:"વિ",worksOffline:"ઓફ",sos:"SOS",sosTitle:"SOS ગયો!",sosBody:"SOS ગયો.",sosLocShared:"સ્થાન શેર.",sosNearHosp:"હોસ:",sosNearShelt:"આ:",sosCall:"112.",close:"બ",callBtn:"112",aiReady:"AI",heroTitle:"તૈ",heroEm:"આફ",heroDesc:"ઇન્ટ ન. ઓ.",findNearby:"નજ.",reportEmergency:"ક.ન.",languages:"ભ",offlineMode:"ઓ",smartRouting:"સ",quickActions:"ઝ",qHospLabel:"હો",qHospSub:"AI",qSheltLabel:"આ",qSheltSub:"ન",qFALabel:"ઉ",qFASub:"ઓ",qRepLabel:"ન",qRepSub:"લ",qAILabel:"AI",qAISub:"24",qSOSLabel:"SOS",qSOSSub:"ક",emTypes:"આ.પ્ર",disPrep:"આ.વ",tapCard:"ટૅ",mapTitle:"ન",mapDesc:"AI",allFilter:"બ",fireFilter:"આ",policeFilter:"પ",emgTitle:"ક",reportTitle:"ક.ન",emgType:"પ",descLabel:"વ",descPlaceholder:"...",submitReport:"ს",activeAlerts:"સ",hospTitle:"હો",hospDesc:"AI",searchHosp:"...",searchShelt:"...",sheltTitle:"આ",faTitle:"ઉ",faDesc:"ઓ",alertsTitle:"ચ",aboutTitle:"આ-ફ",teamLabel:"ટ",keyFeatures:"વ",emergencyNums:"ન",chatWithUs:"વ",chatWelcome:"Aapada AI",chatPlaceholder:"...",chatSugg1:"હો",chatSugg2:"પ",chatSugg3:"CPR",chatSugg4:"ન",aiBadge:"Aapada AI",aiActive:"સ",prevStep:"પ",nextStep:"આ",firstAction:"પ",safetySteps:"સ",stepOf:"ન",openLabel:"ખ",findHospital:"હ",callNum:"ક",viewGuide:"ગ",spotsAvail:"જ",bedsAvail:"બ",govtLabel:"સ",pvtLabel:"ખ",routeBtn:"ર",callContact:"ક",warningLabel:"ચ",heroLine1:"દરેક ક્ષણ",heroLine2:"અમે તમારી સાથે",heroDesc3:"હોસ્પિટલ, આશ્રય, ઉ. સારવાર — એક જ જગ્યાએ. ઇન્ટ. વિના પણ.",weatherTitle:"હવામાન",checklistTitle:"ચેકલિસ્ટ",checklistDesc:"તૈયારી ટ્રૅક કરો",notepadTitle:"કટોકટી નોટપૅડ",panicTitle:"પૅનિક ટાઇમર",panicDesc:"ભયમાં દબાવો",contactsTitle:"કટોકટી સંપર્ક",resourceMapTitle:"સ્ત્રોત નકશો",mapSubTitle:"AI-ક્રમ સ્ત્રોત",firstAidPageTitle:"ઉ. સારવાર ગાઇડ",weatherPageTitle:"હવામાન",aboutPageTitle:"AapadaFlow વિશે",sidebarOnline:"ઓનલ",sidebarOffline:"ઓફ"},
  mni:{nav:"Navigation",online:"Online",offline:"Offline",home:"Home",map:"Resource Map",emergencies:"Emergency",hospitals:"Hospital",shelters:"Shelter",firstaid:"First Aid",alerts:"Alert",about:"About",worksOffline:"Works offline",sos:"SOS",sosTitle:"SOS Sent!",sosBody:"SOS dispatched.",sosLocShared:"Location sharing.",sosNearHosp:"Nearest hospital:",sosNearShelt:"Nearest shelter:",sosCall:"Call 112.",close:"Close",callBtn:"Call 112",aiReady:"AI Emergency",heroTitle:"Ready When",heroEm:"Disaster Strikes",heroDesc:"Find resources without internet.",findNearby:"Find Nearby",reportEmergency:"Report Emergency",languages:"Languages",offlineMode:"Offline",smartRouting:"Smart Route",quickActions:"Quick Actions",qHospLabel:"Hospital",qHospSub:"AI Rank",qSheltLabel:"Shelter",qSheltSub:"Nearest",qFALabel:"First Aid",qFASub:"Offline",qRepLabel:"Report",qRepSub:"Live",qAILabel:"AI Assistant",qAISub:"24/7",qSOSLabel:"SOS",qSOSSub:"Emergency",emTypes:"Emergency Types",disPrep:"Disaster Mgmt",tapCard:"Tap card for guide",mapTitle:"Resource Map",mapDesc:"AI distances",allFilter:"All",fireFilter:"Fire",policeFilter:"Police",emgTitle:"Emergency",reportTitle:"Report Emergency",emgType:"Type",descLabel:"Description",descPlaceholder:"Location, needs...",submitReport:"Submit",activeAlerts:"Active Alerts",hospTitle:"Hospitals",hospDesc:"AI Score",searchHosp:"Search...",searchShelt:"Search...",sheltTitle:"Shelters",faTitle:"First Aid Guide",faDesc:"Fully offline",alertsTitle:"Alerts & News",aboutTitle:"About Aapada-Flow",teamLabel:"Team EmergencyCoders",keyFeatures:"Key Features",emergencyNums:"Emergency Numbers",chatWithUs:"Chat about your emergency",chatWelcome:"Hi! I am Aapada AI.",chatPlaceholder:"Ask Aapada AI...",chatSugg1:"nearest hospital",chatSugg2:"flood safety",chatSugg3:"CPR steps",chatSugg4:"emergency contacts",aiBadge:"Aapada AI",aiActive:"Active",prevStep:"Prev",nextStep:"Next",firstAction:"First Action",safetySteps:"Safety Steps",stepOf:"of",openLabel:"OPEN",findHospital:"Hospital",callNum:"Call",viewGuide:"Guide",spotsAvail:"spots",bedsAvail:"beds",govtLabel:"Govt",pvtLabel:"Pvt",routeBtn:"Route",callContact:"Call",warningLabel:"Warning",heroLine1:"Every Moment",heroLine2:"We're With You",heroDesc3:"Hospitals, shelters, first aid — one place. Works offline too.",weatherTitle:"Weather",checklistTitle:"Checklist",checklistDesc:"Track your preparedness",notepadTitle:"Emergency Notepad",panicTitle:"Panic Timer",panicDesc:"Press if in danger",contactsTitle:"Emergency Contacts",resourceMapTitle:"Resource Map",mapSubTitle:"AI-ranked resources",firstAidPageTitle:"First Aid Guide",weatherPageTitle:"Weather",aboutPageTitle:"About AapadaFlow",sidebarOnline:"Online",sidebarOffline:"Offline"},
};
function t(lang,key){
  const aliases={
    searchHospitals:"searchHosp", searchShelters:"searchShelt",
    hospitalsTitle:"hospTitle", sheltersTitle:"sheltTitle",
    emergencyTypes:"emTypes", emergencyNumbers:"emergencyNums",
    teamName:"teamLabel", aiScoreDesc:"hospDesc", aiCalc:"mapDesc",
    reportEm:"reportTitle", emType:"emgType", describe:"descLabel",
    submit:"submitReport", firstAidTitle:"faTitle", fullyOffline:"faDesc",
    sosDesc:"sosBody", locationShared:"sosLocShared", call112:"callBtn",
    chatWith:"chatWithUs", aiPowered:"aiReady", readyWhen:"heroTitle",
    disasterStrikes:"heroEm", findHospital:"qHospLabel",
    findShelter:"qSheltLabel", aiRanked:"qHospSub",
    nearestFirst:"qSheltSub", firstAid:"qFALabel",
    offlineGuide:"qFASub", reportNow:"qRepLabel", liveAlerts:"qRepSub",
    aiAssistant:"qAILabel", available247:"qAISub",
    sosAlert:"qSOSLabel", emergency:"qSOSSub",
    tapCard:"tapCard", resourceMap:"mapTitle",
    all:"allFilter", fire:"fireFilter", police:"policeFilter",
    emergencies:"emgTitle", reportEmergency:"reportEmergency",
    activeAlerts:"activeAlerts", alertsTitle:"alertsTitle",
    keyFeatures:"keyFeatures", online:"online", offline:"offline",
  };
  const k = aliases[key] || key;
  const raw=(TR[lang]&&TR[lang][k])||(TR[lang]&&TR[lang][key])||TR.en[k]||TR.en[key]||key;
  return String(raw)
    .replace(/Aapada-Flow/g,"AapadaSetu")
    .replace(/AapadaFlow/g,"AapadaSetu")
    .replace(/AAPADA-FLOW/g,"AAPADASETU");
}

function phrase(lang, en, localized = {}){
  return String(localized[lang] || localized.en || en)
    .replace(/Aapada-Flow/g,"AapadaSetu")
    .replace(/AapadaFlow/g,"AapadaSetu")
    .replace(/AAPADA-FLOW/g,"AAPADASETU");
}

function resourceMapsLabel(lang){
  return lang === "en" ? "Resource Maps" : t(lang,"resourceMap");
}

function weatherLabel(lang){
  return t(lang,"weatherPageTitle") || t(lang,"weatherTitle") || "Weather";
}

const RESOURCE_DB_NAME="aapadasetu-offline-cache";
const RESOURCE_STORE_NAME="resources";

function openResourceDb(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(RESOURCE_DB_NAME,1);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(RESOURCE_STORE_NAME)) db.createObjectStore(RESOURCE_STORE_NAME);
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
function idbGet(key){
  return openResourceDb().then(db=>new Promise((resolve,reject)=>{
    const tx=db.transaction(RESOURCE_STORE_NAME,"readonly");
    const store=tx.objectStore(RESOURCE_STORE_NAME);
    const req=store.get(key);
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
    tx.oncomplete=()=>db.close();
    tx.onerror=()=>reject(tx.error);
  }));
}
function idbSet(key,value){
  return openResourceDb().then(db=>new Promise((resolve,reject)=>{
    const tx=db.transaction(RESOURCE_STORE_NAME,"readwrite");
    tx.objectStore(RESOURCE_STORE_NAME).put(value,key);
    tx.oncomplete=()=>{db.close();resolve(true);};
    tx.onerror=()=>reject(tx.error);
  }));
}
function replaceItems(target,next){
  target.splice(0,target.length,...next);
}
function getAllResources(){
  return [...HOSPITALS,...SHELTERS,...FIRE,...POLICE];
}
function safeText(v,fallback=""){
  return typeof v==="string"&&v.trim()?v.trim():fallback;
}
function parseList(v,fallback){
  const out=safeText(v).split(";").map(x=>x.trim()).filter(Boolean);
  return out.length?out:fallback;
}
function pickPhone(tags){
  return safeText(
    tags.phone||
    tags["contact:phone"]||
    tags["operator:phone"]||
    tags["emergency:phone"],
    "Not listed"
  );
}
function buildAddress(tags){
  const parts=[tags["addr:housename"],tags["addr:housenumber"],tags["addr:street"],tags["addr:suburb"],tags["addr:city"],tags["addr:state"]];
  const text=parts.filter(Boolean).join(", ");
  return text||safeText(tags.address,"Address unavailable");
}
function projectCoords(lat,lng){
  const x=Math.max(40,Math.min(760,Math.round(((lng-77.8)/0.7)*700+40)));
  const y=Math.max(40,Math.min(420,Math.round((1-((lat-30.0)/0.45))*380+40)));
  return {x,y};
}
function mapHospitalResource(el,index){
  const tags=el.tags||{};
  const lat=el.lat??el.center?.lat;
  const lng=el.lon??el.center?.lon;
  const bedsTag=Number(tags.beds||tags["capacity:beds"]);
  return {
    id:"osm-h-"+(el.type||"node")+"-"+el.id,
    name:safeText(tags.name,"Hospital"),
    type:"hospital",
    lat,
    lng,
    address:buildAddress(tags),
    phone:pickPhone(tags),
    beds:Number.isFinite(bedsTag)&&bedsTag>0?bedsTag:100,
    availableBeds:null,
    specialties:parseList(tags["healthcare:speciality"]||tags.speciality||tags.department,["General Emergency"]),
    icon:"H",
    "24h":tags.opening_hours==="24/7"||tags.emergency==="yes",
    govt:/(government|public|state|district|municipal)/i.test((tags.operator_type||"")+" "+(tags.ownership||"")),
    rating:null,
    estTime:null,
    coords:projectCoords(lat,lng),
    source:"live",
    sourceUpdatedAt:Date.now(),
    rank:index+1,
  };
}
function mapShelterResource(el,index){
  const tags=el.tags||{};
  const lat=el.lat??el.center?.lat;
  const lng=el.lon??el.center?.lon;
  const capacity=Number(tags.capacity);
  const isNgo=tags.office==="ngo";
  const isAssembly=tags.emergency==="assembly_point";
  return {
    id:"osm-s-"+(el.type||"node")+"-"+el.id,
    name:safeText(tags.name,isNgo?"NGO Support Center":(isAssembly?"Emergency Assembly Point":"Shelter")),
    type:"shelter",
    lat,
    lng,
    address:buildAddress(tags),
    capacity:Number.isFinite(capacity)&&capacity>0?capacity:100,
    current:0,
    available:Number.isFinite(capacity)&&capacity>0?capacity:null,
    amenities:parseList(tags.amenity||tags.shelter_type||tags["social_facility:for"]||tags["ngo"]||tags.operator,["Shelter support"]),
    icon:"S",
    coords:projectCoords(lat,lng),
    contact:pickPhone(tags),
    supportType:isNgo?"ngo":(isAssembly?"assembly":"shelter"),
    source:"live",
    sourceUpdatedAt:Date.now(),
    rank:index+1,
  };
}
function normalizeLiveResources(payload){
  const elements=Array.isArray(payload?.elements)?payload.elements:[];
  const hospitals=elements
    .filter(el=>{
      const tags=el.tags||{};
      return tags.amenity==="hospital"||tags.amenity==="clinic";
    })
    .filter(el=>(el.lat??el.center?.lat)!==undefined&&(el.lon??el.center?.lon)!==undefined)
    .map(mapHospitalResource)
    .slice(0,20);
  const shelters=elements
    .filter(el=>{
      const tags=el.tags||{};
      return tags.amenity==="shelter"||tags.social_facility==="shelter"||tags.emergency==="assembly_point"||tags.office==="ngo";
    })
    .filter(el=>(el.lat??el.center?.lat)!==undefined&&(el.lon??el.center?.lon)!==undefined)
    .map(mapShelterResource)
    .slice(0,20);
  return {hospitals,shelters,fetchedAt:Date.now()};
}


/* Fonts loaded via index.css */

/* Styles loaded via index.css */

/* ─── THEME ──────────────────────────────────────────────────────────────── */
const T = {
  blue:"#1a4fa0",blueDk:"#0d2d6b",blueLt:"#2563eb",
  orange:"#f97316",orangeLt:"#fb923c",
  bg:"#f0f5ff",bg2:"#e4edff",white:"#ffffff",
  text:"#0f1d3a",text2:"#4a5878",textL:"#94a3b8",
  border:"#d4e0f7",
  sh:"0 2px 16px rgba(26,79,160,.09)",
  shMd:"0 4px 24px rgba(26,79,160,.13)",
  shLg:"0 8px 40px rgba(26,79,160,.17)",
  r:"16px",rs:"10px",
};

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const HOSPITALS = [
  {id:"h1",name:"AIIMS Rishikesh",type:"hospital",lat:30.1289,lng:78.3142,address:"Virbhadra Rd, Rishikesh, Uttarakhand 249203",phone:"0135-2462911",beds:960,availableBeds:142,specialties:["Trauma","Cardiology","Neurology","Emergency","Burns","Oncology"],icon:"H","24h":true,govt:true,rating:4.3,estTime:"18 min",coords:{x:390,y:195}},
  {id:"h2",name:"Doon Hospital (Govt)",type:"hospital",lat:30.3165,lng:78.0322,address:"Shyampur, Dehradun 248001",phone:"0135-2652647",beds:500,availableBeds:38,specialties:["General Medicine","Orthopedics","Pediatrics","Gynecology"],icon:"H","24h":true,govt:true,rating:3.8,estTime:"5 min",coords:{x:265,y:175}},
  {id:"h3",name:"Max Super Speciality",type:"hospital",lat:30.3398,lng:78.0644,address:"Mussoorie Road, Dehradun 248001",phone:"0135-6050000",beds:300,availableBeds:52,specialties:["Cardiac","Oncology","Spine","Neurology","Joint Replacement"],icon:"H","24h":true,govt:false,rating:4.5,estTime:"8 min",coords:{x:455,y:155}},
  {id:"h4",name:"Mahant Indiresh Hospital",type:"hospital",lat:30.2672,lng:78.0397,address:"New Patel Nagar, Dehradun 248001",phone:"0135-2760099",beds:750,availableBeds:85,specialties:["Emergency","Burns","Trauma","ICU","Dialysis"],icon:"H","24h":true,govt:false,rating:4.1,estTime:"10 min",coords:{x:305,y:248}},
  {id:"h5",name:"Jolly Grant Coronation Hospital",type:"hospital",lat:30.1929,lng:78.1803,address:"Dehradun–Rishikesh Highway, Dehradun",phone:"0135-2471500",beds:200,availableBeds:28,specialties:["Emergency","Surgery","Maternity"],icon:"H","24h":true,govt:true,rating:3.7,estTime:"22 min",coords:{x:540,y:228}},
  {id:"h6",name:"Himalayan Institute Hospital",type:"hospital",lat:30.1500,lng:78.2800,address:"Swami Ram Nagar, Doiwala, Dehradun",phone:"0135-2471600",beds:800,availableBeds:95,specialties:["General Surgery","Gynecology","Ophthalmology","Dental","Psychiatry"],icon:"H","24h":true,govt:false,rating:4.2,estTime:"28 min",coords:{x:415,y:305}},
];
const DEFAULT_HOSPITALS=JSON.parse(JSON.stringify(HOSPITALS));
const SHELTERS = [
  {id:"s1",name:"Town Hall Relief Camp",type:"shelter",lat:30.3203,lng:78.0294,address:"Town Hall Complex, Dehradun",capacity:500,current:118,amenities:["Food","Drinking Water","Medical Aid","Phone Charging","Toilets"],icon:"S",coords:{x:248,y:218},contact:"0135-2714226"},
  {id:"s2",name:"Govt Inter College Camp",type:"shelter",lat:30.3450,lng:78.0700,address:"Rajpur Road, Dehradun",capacity:300,current:76,amenities:["Food","Water","Toilets","Blankets"],icon:"S",coords:{x:400,y:138},contact:"0135-2651412"},
  {id:"s3",name:"SDRF Operations Base",type:"shelter",lat:30.2900,lng:78.0500,address:"SDRF Campus, Sahastradhara Road, Dehradun",capacity:200,current:42,amenities:["Medical Aid","Drinking Water","Rescue Team On-Site","Radio Communication"],icon:"S",coords:{x:348,y:318},contact:"1070"},
  {id:"s4",name:"District Collectorate Centre",type:"shelter",lat:30.3100,lng:78.0150,address:"Collectorate Compound, Dehradun",capacity:600,current:195,amenities:["Food","Water","Medical","Communication Room","Legal Aid"],icon:"S",coords:{x:178,y:248},contact:"0135-2654201"},
  {id:"s5",name:"Rishikesh Ghat Relief Camp",type:"shelter",lat:30.1050,lng:78.2975,address:"Triveni Ghat Area, Rishikesh",capacity:400,current:162,amenities:["Food","Water","Medical Aid","Boats Available"],icon:"S",coords:{x:470,y:358},contact:"1070"},
];
const DEFAULT_SHELTERS=JSON.parse(JSON.stringify(SHELTERS));
const FIRE = [
  {id:"f1",name:"Fire Station EC Road",type:"fire",lat:30.3192,lng:78.0344,address:"EC Road, Dehradun",phone:"101",icon:"fire",coords:{x:268,y:198}},
  {id:"f2",name:"Fire Station Prem Nagar",type:"fire",lat:30.3000,lng:78.0100,address:"Prem Nagar, Dehradun",phone:"101",icon:"fire",coords:{x:198,y:298}},
];
const POLICE=[{id:"p1",name:"Dehradun Police HQ",type:"police",lat:30.3245,lng:78.0438,address:"Chakrata Rd, Dehradun",phone:"100",icon:"police",coords:{x:298,y:168}}];
const DISASTER = {
  flood:     {title:"Flood Safety",color:"#3b82f6",steps:["Move to higher ground IMMEDIATELY","Never walk or drive in flooded water — 6 inches can knock you down","Disconnect all electrical appliances at the main switch","Store important documents in waterproof bags","Listen to official radio/TV announcements only","If trapped indoors move to the roof and signal rescuers","Do not touch floodwater — it may be contaminated","Call SDRF 1070 for rescue assistance"]},
  earthquake:{title:"Earthquake Safety",color:"#b45309",steps:["DROP to hands and knees immediately","Take COVER under a sturdy desk or table","HOLD ON and stay covered until shaking stops","Stay away from windows exterior walls and mirrors","If outdoors move away from buildings and power lines","After shaking check for injuries before moving","Expect aftershocks — stay alert and prepared","Call 112 if someone is trapped or seriously injured"]},
  fire:      {title:"Fire Emergency",color:"#dc2626",steps:["Call 101 (Fire Department) IMMEDIATELY","Alert everyone — shout FIRE loudly as you leave","Use stairs only — NEVER use lifts during a fire","Stay low to the ground if smoke is present","Feel doors before opening — hot door means fire behind","If trapped seal door gaps with cloth signal from window","NEVER re-enter a burning building for any reason","Gather at the pre-designated assembly point outside"]},
  cyclone:   {title:"Cyclone Safety",color:"#7c3aed",steps:["Move to a strong sturdy shelter immediately","Stay away from coastal areas and river banks","Board up windows or use storm shutters if available","Secure or bring all loose outdoor objects inside","Stock emergency supplies: water food torch medicines","Stay indoors during the storm — do not venture out","Keep a battery-powered radio for official updates","After cyclone beware of flooding and downed power lines"]},
  landslide: {title:"Landslide Safety",color:"#78350f",steps:["Evacuate immediately if you are on a slope or near hills","Move perpendicular to the slide path never downhill","Listen for unusual sounds — cracking trees or rolling rocks","Stay away from the slide area after it stops — more may follow","Block storm drains and gutters near your home","Contact local authorities and report the landslide","Do not enter any building affected by a landslide","Use a flashlight — avoid open flames due to possible gas leaks"]},
  pandemic:  {title:"Pandemic Safety",color:"#166534",steps:["Wear a well-fitting mask in all public places","Wash hands with soap for at least 20 seconds frequently","Maintain 2 metre distance from others at all times","Isolate at home if experiencing any symptoms","Call the helpline before visiting a hospital if symptomatic","Stock a 2-week supply of essential medicines at home","Get vaccinated when you are eligible — protect others too","Follow only official government health advisories"]},
};

const FIRSTAID = {
  cpr:       {title:"CPR",steps:[{t:"Check Safety",d:"Ensure the scene is safe. Tap the person's shoulders firmly and shout 'Are you OK?' to check responsiveness."},{t:"Call 112",d:"Shout for someone nearby to call 112 immediately. Ask them to fetch an AED if available."},{t:"Open Airway",d:"Tilt the head back and lift the chin to open the airway. Look, listen, and feel for normal breathing — no more than 10 seconds."},{t:"30 Compressions",d:"Place the heel of your hand on the centre of the chest. Press down 5–6 cm at 100–120 per minute. Allow full chest recoil between compressions."},{t:"2 Rescue Breaths",d:"Pinch the nose, seal your lips around the mouth, and give 2 breaths over 1 second each until the chest visibly rises."},{t:"Continue Cycles",d:"Repeat the 30:2 cycle until professional help arrives, an AED is ready, or the person starts breathing normally."}],warning:"Only perform CPR if the person is unresponsive and not breathing normally. If untrained, do hands-only CPR — skip rescue breaths."},
  bleeding:  {title:"Bleeding",steps:[{t:"Apply Direct Pressure",d:"Press firmly on the wound with a clean cloth or bandage. Do not remove the cloth if soaked — add more on top."},{t:"Elevate the Wound",d:"Raise the injured area above the level of the heart if possible to slow blood flow. Do not elevate if a fracture is suspected."},{t:"Tourniquet (Severe)",d:"For life-threatening limb bleeding only — tie tightly above the wound and note the exact time. This can cause tissue damage but saves lives."},{t:"Clean & Bandage",d:"Once bleeding slows, rinse with clean water. Cover with a sterile bandage and seek medical care as soon as possible."}],warning:"Call 112 for major bleeding, bright-red spurting blood, or wounds to the neck, chest, or abdomen."},
  burns:     {title:"Burns",steps:[{t:"Remove from Danger",d:"Remove the person from the burn source. Stop, drop, and roll if clothing is on fire."},{t:"Cool the Burn",d:"Run cool (not cold) running water over the burn for 10–20 minutes. Never use ice, butter, toothpaste, or ointments."},{t:"Remove Items",d:"Gently remove jewellery and clothing near the burn before swelling begins. Never remove anything that is stuck to the skin."},{t:"Cover Loosely",d:"Cover the burn loosely with a sterile non-fluffy dressing or clean cling film."},{t:"Pain Relief",d:"Give paracetamol or ibuprofen if available. Keep the person warm to prevent hypothermia."}],warning:"Seek emergency care for burns on the face, hands, or feet; burns larger than the person's palm; or chemical/electrical burns."},
  fracture:  {title:"Fracture",steps:[{t:"Stop Movement",d:"Tell the person not to move the injured area. Support it in the position found — never attempt to straighten a broken bone."},{t:"Splint the Fracture",d:"Use a stick, folded newspaper, or any rigid object. Pad with cloth and secure firmly above and below the fracture site."},{t:"Apply Ice",d:"Wrap ice or a cold pack in a cloth and apply to reduce swelling and pain. Never apply ice directly to skin."},{t:"Treat for Shock",d:"Keep the person warm and calm. Lay them down and elevate the legs slightly unless a spinal injury is suspected."},{t:"Seek Medical Care",d:"All fractures require medical evaluation. Open fractures (bone visible) are emergencies — call 112 immediately."}],warning:"Do NOT move someone with a suspected neck or spine injury. Call 112 and keep them completely still until help arrives."},
  choking:   {title:"Choking",steps:[{t:"Identify Choking",d:"Signs: cannot speak, cough, or breathe; clutching throat; skin turning blue. Ask 'Are you choking?' — if they cannot respond, act immediately."},{t:"5 Back Blows",d:"Lean the person forward. Give 5 firm blows between the shoulder blades with the heel of your hand. Check after each blow."},{t:"5 Abdominal Thrusts",d:"Stand behind the person with arms around the waist. Make a fist above the navel and pull sharply inward and upward 5 times."},{t:"Alternate & Repeat",d:"Alternate 5 back blows with 5 abdominal thrusts until the object dislodges or the person becomes unconscious. If unconscious, begin CPR."},{t:"For Infants",d:"Face down on your forearm. 5 back blows, then turn face up for 5 chest thrusts with 2 fingers. NEVER perform abdominal thrusts on infants."}],warning:"If you are alone and choking: call 112, attempt a self-Heimlich manoeuvre, or thrust yourself over the back of a chair."},
  snakebite: {title:"Snakebite",steps:[{t:"Stay Calm & Move Away",d:"Move away from the snake immediately. Do not attempt to catch or kill it. Note its colour and markings if safely possible."},{t:"Immobilise the Limb",d:"Keep the bitten limb below the level of the heart. Immobilise it as much as possible — movement accelerates venom spread."},{t:"Remove Constrictive Items",d:"Remove rings, watches, and any tight clothing from the bitten limb before swelling begins."},{t:"Mark & Monitor Swelling",d:"Draw a pen line around the edge of swelling and note the time every 15 minutes to track progression."},{t:"Rush to Hospital",d:"This is a medical emergency. Get to the nearest hospital immediately — anti-venom can only be given by medical professionals."}],warning:"NEVER cut the wound, suck out venom, apply a tourniquet, apply ice, or give alcohol. These are myths and will cause additional harm."},
  drowning:  {title:"Drowning",steps:[{t:"Call for Help",d:"Shout for help and call 112 immediately. Do not enter the water unless you are a trained rescuer — many bystanders drown attempting rescues."},{t:"Reach or Throw",d:"Use a rope, branch, clothing, or any floating object to reach the victim. Pull them safely to shore."},{t:"Remove from Water",d:"Carefully remove the person from the water. Support the neck if a diving or spinal injury is suspected."},{t:"Check Breathing",d:"Lay the person on their back. Tilt head, lift chin. If not breathing normally, begin CPR immediately."},{t:"Recovery Position",d:"If the person is breathing, place them in the recovery position on their side. Keep warm and monitor breathing until help arrives."}],warning:"All near-drowning victims require immediate medical evaluation, even if they appear to have fully recovered. Secondary drowning can occur hours later."},
  heatstroke:{title:"Heatstroke",steps:[{t:"Recognise Heatstroke",d:"Signs: body temperature above 40°C, hot and dry skin, confusion, slurred speech, or loss of consciousness. This is life-threatening."},{t:"Move to Cool Area",d:"Get the person out of the heat immediately — move indoors, into shade, or an air-conditioned space."},{t:"Cool Rapidly",d:"Apply ice packs to the neck, armpits, and groin. Fan the person while misting with cool water."},{t:"No Fluids if Confused",d:"Do not give fluids if the person is confused or unconscious — there is a risk of choking. Give small sips only if fully alert."},{t:"Call Emergency",d:"Heatstroke is a medical emergency. Call 112. Continue all cooling measures until professional help arrives."}],warning:"Heat exhaustion (heavy sweating, pale skin, weakness, dizziness) is a warning sign. Cool the person and give fluids before it progresses."},
};

const INIT_ALERTS=[
  {id:"a1",sev:"danger", icon:"flood",   title:"Flood Warning — Rishikesh",    desc:"Ganga water levels rising. Residents near ghats advised to evacuate immediately.",time:"2 hrs ago"},
  {id:"a2",sev:"warning",icon:"rain",    title:"Heavy Rainfall Alert",          desc:"IMD predicts heavy to very heavy rainfall across Uttarakhand for the next 48 hours.",time:"4 hrs ago"},
  {id:"a3",sev:"info",   icon:"medical", title:"Medical Camp Active",            desc:"Free medical camp running at Town Hall, Dehradun — 9 AM to 5 PM today.",time:"6 hrs ago"},
  {id:"a4",sev:"warning",icon:"mountain",title:"Landslide Risk — NH-58",        desc:"National Highway 58 near Shivpuri showing high landslide risk. Avoid travel.",time:"8 hrs ago"},
  {id:"a5",sev:"info",   icon:"shield",  title:"NDRF Teams Deployed",            desc:"5 NDRF teams have been deployed across flood-affected districts of Uttarakhand.",time:"12 hrs ago"},
];
const TICKER=["Flood warning in Rishikesh — Ganga levels rising","Relief camp open at Town Hall · capacity 500 people","NDRF helicopters conducting active rescue operations","Emergency: 112  |  NDRF: 9711077372  |  SDRF: 1070","AIIMS Rishikesh trauma centre on high alert","IMD: Heavy rainfall expected — stay indoors if possible","NH-58 closed due to elevated landslide risk","Free medical camp · Town Hall Dehradun · 9 AM–5 PM"];
const LANGS=[
  {c:"en", native:"English",    en:"English",    flag:"🇬🇧"},
  {c:"hi", native:"हिंदी",      en:"Hindi",      flag:"🇮🇳"},
  {c:"ur", native:"اردو",       en:"Urdu",       flag:"🇵🇰"},
  {c:"mr", native:"मराठी",      en:"Marathi",    flag:"🇮🇳"},
  {c:"kn", native:"ಕನ್ನಡ",      en:"Kannada",    flag:"🇮🇳"},
  {c:"te", native:"తెలుగు",     en:"Telugu",     flag:"🇮🇳"},
  {c:"ta", native:"தமிழ்",      en:"Tamil",      flag:"🇮🇳"},
  {c:"bn", native:"বাংলা",      en:"Bengali",    flag:"🇧🇩"},
  {c:"gu", native:"ગુજરાતી",    en:"Gujarati",   flag:"🇮🇳"},
  {c:"mni",native:"মৈতৈলোন্",   en:"Meitei",    flag:"🇮🇳"},
];


/* ─── AI ENGINE ──────────────────────────────────────────────────────────── */
const AI={
  lat:30.3165,lng:78.0322,
  setLoc(la,lo){this.lat=la;this.lng=lo},
  dist(la1,lo1,la2,lo2){const R=6371,dLa=(la2-la1)*Math.PI/180,dLo=(lo2-lo1)*Math.PI/180;const a=Math.sin(dLa/2)**2+Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dLo/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))},
  scoreH(h,dt){const d=this.dist(this.lat,this.lng,h.lat,h.lng);const availabilityKnown=Number.isFinite(Number(h.availableBeds))&&Number(h.availableBeds)>=0&&Number(h.beds)>0;const availabilityRatio=availabilityKnown?Number(h.availableBeds)/Number(h.beds):0.45;const dS=Math.max(0,10-d)*4,aS=availabilityRatio*30;const map={flood:["Emergency","Trauma","General Medicine"],earthquake:["Trauma","Orthopedics","Neurology","Burns"],fire:["Burns","Trauma","Emergency"],pandemic:["General","ICU","Infectious Disease"],cyclone:["Emergency","Trauma","Cardiac"],landslide:["Trauma","Orthopedics","Neurology"]};const need=dt&&map[dt]||[];const spS=need.length?Math.min(20,h.specialties.filter(s=>need.includes(s)).length*7):15;const cS=availabilityRatio*10;return{score:Math.round(Math.min(10,(dS+aS+spS+cS)/10)*10)/10,distance:Math.round(d*10)/10}},
  rankH(dt=null){return HOSPITALS.map(h=>{const s=this.scoreH(h,dt);return{...h,...s}}).sort((a,b)=>b.score-a.score)},
  scoreS(s){const d=this.dist(this.lat,this.lng,s.lat,s.lng);const capacity=Number(s.capacity)||0;const current=Number(s.current)||0;const availableKnown=capacity>0;const availableRatio=availableKnown?Math.max(0,(capacity-current)/capacity):0.5;return{score:Math.round(Math.min(10,(10-d)*6+availableRatio*4)*10)/10,distance:Math.round(d*10)/10,available:availableKnown?(capacity-current):(s.available??null)}},
  rankS(){return SHELTERS.map(s=>{const sc=this.scoreS(s);return{...s,...sc}}).sort((a,b)=>b.score-a.score)},
  detectReplyProfile(msg){
    const text=(msg||"").trim();
    const lower=text.toLowerCase();
    if(/[\u0900-\u097F]/.test(text)) return {code:"hi",label:"Hindi",instruction:"Reply only in Hindi using Devanagari script. Do not use English except phone numbers or proper nouns."};
    if(/[\u0600-\u06FF]/.test(text)) return {code:"ur",label:"Urdu",instruction:"Reply only in Urdu script. Do not switch to English unless absolutely necessary for phone numbers."};
    if(/[\u0C80-\u0CFF]/.test(text)) return {code:"kn",label:"Kannada",instruction:"Reply only in Kannada."};
    if(/[\u0C00-\u0C7F]/.test(text)) return {code:"te",label:"Telugu",instruction:"Reply only in Telugu."};
    if(/[\u0B80-\u0BFF]/.test(text)) return {code:"ta",label:"Tamil",instruction:"Reply only in Tamil."};
    if(/[\u0980-\u09FF]/.test(text)) return {code:"bn",label:"Bengali",instruction:"Reply only in Bengali."};
    if(/[\u0A80-\u0AFF]/.test(text)) return {code:"gu",label:"Gujarati",instruction:"Reply only in Gujarati."};
    if(/[\uABC0-\uABFF]/.test(text)) return {code:"mni",label:"Meitei",instruction:"Reply only in Meitei."};
    if(/\b(kya|kaise|kaunsa|kaunsi|mujhe|mera|meri|mere|krna|karna|karni|chahiye|madad|jaldi|abhi|hospital|aspatal|doctor|bukhar|dard|saans|khun|ambulance|ghar|bahar|andar|bachao|bachaao|paani|baarish|aag|bhookamp|baadh|kahan|kahaan|kyu|kyun|haan|nahi|nahin|theek|thik)\b/i.test(lower)){
      return {code:"hinglish",label:"Hinglish",instruction:"Reply only in natural Hinglish using Roman script. Do not use Devanagari script."};
    }
    return {code:"en",label:"English",instruction:"Reply only in English."};
  },
  /* Detect script of input text */
  detectLang(msg){
    if(/[\u0900-\u097F]/.test(msg)) return "hi";   // Devanagari (Hindi/Marathi)
    if(/[\u0600-\u06FF]/.test(msg)) return "ur";   // Arabic script (Urdu)
    if(/[\u0C80-\u0CFF]/.test(msg)) return "kn";   // Kannada
    if(/[\u0C00-\u0C7F]/.test(msg)) return "te";   // Telugu
    if(/[\u0B80-\u0BFF]/.test(msg)) return "ta";   // Tamil
    if(/[\u0980-\u09FF]/.test(msg)) return "bn";   // Bengali
    if(/[\u0A80-\u0AFF]/.test(msg)) return "gu";   // Gujarati
    if(/[\uABC0-\uABFF]/.test(msg)) return "mni";  // Meitei
    return "en";
  },
  chat(msg){
    const l=msg.toLowerCase(), rh=this.rankH(), rs=this.rankS();
    const dl=this.detectLang(msg);
    const R={ // Multilingual response templates
      hospital:{
        en:"Nearest Hospital: " + rh[0].name + "\nAddress: " + rh[0].address + "\nPhone: " + rh[0].phone + "\nDistance: " + rh[0].distance + " km | AI Score: " + rh[0].score + "/10\n\nAlso nearby:\n" + rh.slice(1,3).map(h=>"- "+h.name+" ("+h.distance+"km)").join("\n"),
        hi:"निकटतम अस्पताल: " + rh[0].name + "\nपता: " + rh[0].address + "\nफोन: " + rh[0].phone + "\nदूरी: " + rh[0].distance + " km\n\nअन्य अस्पताल:\n" + rh.slice(1,3).map(h=>"- "+h.name+" ("+h.distance+"km)").join("\n"),
        ur:"قریبی اسپتال: " + rh[0].name + "\nفون: " + rh[0].phone + "\nفاصلہ: " + rh[0].distance + " km",
        bn:"নিকটতম হাসপাতাল: " + rh[0].name + "\nফোন: " + rh[0].phone + "\nদূরত্ব: " + rh[0].distance + " km",
        ta:"அருகில் மருத்துவமனை: " + rh[0].name + "\nதொலைபேசி: " + rh[0].phone + "\nதூரம்: " + rh[0].distance + " km",
        te:"దగ్గరి ఆసుపత్రి: " + rh[0].name + "\nఫోన్: " + rh[0].phone + "\nదూరం: " + rh[0].distance + " km",
        kn:"ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ: " + rh[0].name + "\nಫೋನ್: " + rh[0].phone + "\nಅಂತರ: " + rh[0].distance + " km",
        mr:"जवळचे रुग्णालय: " + rh[0].name + "\nफोन: " + rh[0].phone + "\nअंतर: " + rh[0].distance + " km",
        gu:"નજીકની હોસ્પિટલ: " + rh[0].name + "\nફોન: " + rh[0].phone + "\nઅંતર: " + rh[0].distance + " km",
      },
      shelter:{
        en:"Nearest Shelter: " + rs[0].name + "\nAvailable: " + rs[0].available + "/" + rs[0].capacity + " spots\nDistance: " + rs[0].distance + " km",
        hi:"निकटतम आश्रय: " + rs[0].name + "\nउपलब्ध: " + rs[0].available + "/" + rs[0].capacity + " जगह\nदूरी: " + rs[0].distance + " km",
        ur:"قریبی پناہ: " + rs[0].name + "\nدستیاب: " + rs[0].available + "/" + rs[0].capacity,
        bn:"কাছের আশ্রয়: " + rs[0].name + "\nপাওয়া যাচ্ছে: " + rs[0].available + "/" + rs[0].capacity,
        ta:"அருகில் தங்குமிடம்: " + rs[0].name + "\nகிடைக்கும்: " + rs[0].available + "/" + rs[0].capacity,
        te:"దగ్గరి ఆశ్రయం: " + rs[0].name + "\nఅందుబాటు: " + rs[0].available + "/" + rs[0].capacity,
        kn:"ಹತ್ತಿರದ ಆಶ್ರಯ: " + rs[0].name + "\nಲಭ್ಯ: " + rs[0].available + "/" + rs[0].capacity,
        mr:"जवळचा निवारा: " + rs[0].name + "\nउपलब्ध: " + rs[0].available + "/" + rs[0].capacity,
        gu:"નજીકનો આશ્રય: " + rs[0].name + "\nઉપલબ્ધ: " + rs[0].available + "/" + rs[0].capacity,
      },
      cpr:{
        en:"CPR Steps:\n1. Call 112 immediately\n2. Check responsiveness — tap and shout\n3. 30 chest compressions (5-6 cm deep, 100-120/min)\n4. 2 rescue breaths if trained\n5. Repeat until help arrives",
        hi:"CPR के कदम:\n1. तुरंत 112 पर कॉल करें\n2. होश जांचें — थपथपाएं और चिल्लाएं\n3. 30 छाती दबाव (5-6 सेमी गहरे, 100-120/मिनट)\n4. यदि प्रशिक्षित हों तो 2 सांस दें\n5. मदद आने तक दोहराएं",
        ur:"CPR کے مراحل:\n1. فوری 112 کال کریں\n2. ہوش چیک کریں\n3. 30 سینے کی دبائیں\n4. 2 سانسیں دیں\n5. مدد آنے تک دہرائیں",
      },
      flood:{
        en:"Flood Safety:\n- Move to higher ground IMMEDIATELY\n- Never walk in floodwater\n- Disconnect all electrical items\n- If trapped: go to roof, signal rescuers\n\nCall SDRF: 1070 | Emergency: 112",
        hi:"बाढ़ सुरक्षा:\n- तुरंत ऊंची जगह पर जाएं\n- बाढ़ के पानी में न चलें\n- सभी बिजली के उपकरण बंद करें\n- फंसे हों तो छत पर जाएं\n\nSDRF: 1070 | आपातकाल: 112",
        ur:"سیلاب سے بچاؤ:\n- فوری اونچی جگہ جائیں\n- پانی میں نہ چلیں\n- بجلی بند کریں\n\nSDRF: 1070",
        bn:"বন্যা সুরক্ষা:\n- এখনই উঁচু জায়গায় যান\n- বন্যার পানিতে হাঁটবেন না\n\nSDRF: 1070",
        ta:"வெள்ள பாதுகாப்பு:\n- உடனே உயரமான இடத்திற்கு செல்லுங்கள்\n- வெள்ளத்தில் நடக்காதீர்கள்\n\nSDRF: 1070",
      },
      emergency:{
        en:"Emergency Numbers:\nPolice: 100 | Fire: 101 | Ambulance: 102\nAll Emergencies: 112 | SDRF: 1070 | NDRF: 9711077372\n\nNearest hospital: " + rh[0].name + " — " + rh[0].distance + " km",
        hi:"आपातकालीन नंबर:\nपुलिस: 100 | अग्निशमन: 101 | एम्बुलेंस: 102\nसभी आपातकाल: 112 | SDRF: 1070\n\nनिकटतम अस्पताल: " + rh[0].name + " — " + rh[0].distance + " km",
        ur:"ہنگامی نمبر:\nپولیس: 100 | فائر: 101 | ایمبولینس: 102\nتمام: 112 | SDRF: 1070",
        bn:"জরুরি নম্বর:\nপুলিশ: 100 | অগ্নি: 101 | অ্যাম্বুলেন্স: 102\nসব: 112 | SDRF: 1070",
        ta:"அவசர எண்கள்:\nகாவல்: 100 | தீ: 101 | ஆம்புலன்ஸ்: 102\nஏதாவது: 112 | SDRF: 1070",
        te:"అత్యవసర నంబర్లు:\nపోలీసు: 100 | అగ్ని: 101 | అంబులెన్స్: 102\nఏదైనా: 112 | SDRF: 1070",
        kn:"ತುರ್ತು ಸಂಖ್ಯೆಗಳು:\nಪೊಲೀಸ್: 100 | ಅಗ್ನಿ: 101 | ಆಂಬ್ಯುಲೆನ್ಸ್: 102\nಎಲ್ಲ: 112 | SDRF: 1070",
        mr:"आपत्कालीन नंबर:\nपोलीस: 100 | अग्नी: 101 | रुग्णवाहिका: 102\nसर्व: 112 | SDRF: 1070",
        gu:"કટોકટી નંબર:\nપોલીસ: 100 | આગ: 101 | એમ્બ્યુલન્સ: 102\nબધા: 112 | SDRF: 1070",
      }
    };
    const pick=(topic)=>(R[topic][dl]||R[topic].en);
    if(l.match(/hospital|doctor|medical|injur|aspatal|asupatra|maruthuvam|haaspatal|rugnalaya/i))return pick("hospital");
    if(l.match(/shelter|camp|refuge|nivaara|ashray|tangumidam|baas/i))return pick("shelter");
    if(l.match(/cpr|cardiac|heart|dil|idhayam/i))return pick("cpr");
    if(l.match(/flood|inundation|baadh|sel|vellam|bonna/i))return pick("flood");
    if(l.match(/earthquake|quake|tremor|bhukamp|bhumikaap/i)){
      if(dl==="hi")return "भूकंप — गिरें, ढकें, थामें:\n1. तुरंत घुटनों के बल गिरें\n2. मजबूत मेज के नीचे ढकें\n3. थामे रहें जब तक झटके बंद न हों\n4. खिड़कियों से दूर रहें\n\nआपातकाल: 112";
      return "Earthquake — DROP, COVER, HOLD:\n1. Drop to hands and knees\n2. Cover under sturdy furniture\n3. Hold on until shaking stops\n4. Stay away from windows\n\nCall: 112";
    }
    if(l.match(/fire|burn|flame|aag|thee|tee /i)){
      if(dl==="hi")return "आग की आपातस्थिति:\n101 पर तुरंत कॉल करें!\n\n- FIRE चिल्लाएं\n- सीढ़ियां उपयोग करें - लिफ्ट नहीं\n- धुएं में झुककर चलें";
      return "Fire Emergency:\nCall 101 immediately!\n\n- Shout FIRE, alert everyone\n- Use stairs, NEVER lifts\n- Stay low if smoke is present";
    }
    if(l.match(/sos|emergency|help|danger|madad|thunai|sahaayata/i))return pick("emergency");
    if(l.match(/offline|internet|network/i))return "Yes — Aapada-Flow works 100% offline!\n\nAvailable without internet:\n- All hospital and shelter data\n- Complete First Aid guides\n- This AI assistant\n- Emergency maps and distances";
    if(l.match(/nearest|near me|paas|harida|arugil|dagari/i))return "Nearest to you:\nHospital: " + rh[0].name + " — " + rh[0].distance + " km\nShelter: " + rs[0].name + " — " + rs[0].available + " spots\n\nCall 112 for all emergencies.";
    if(l.match(/heart attack|chest pain|heart pain|cardiac arrest|stroke|brain stroke/i))return "Possible cardiac or stroke emergency:\n1. Call 112 immediately\n2. Keep the person still and upright if awake\n3. Do not give food or water\n4. If unresponsive and not breathing normally, start CPR\nNearest hospital: " + rh[0].name + " (" + rh[0].distance + " km)";
    if(l.match(/bleeding|blood loss|cut badly|severe cut|hemorrhage/i))return "Heavy bleeding:\n1. Apply firm direct pressure now\n2. Raise the injured area if safe\n3. Do not remove soaked cloth, add more layers\n4. Call 112 if bleeding is severe or spurting";
    if(l.match(/gas leak|cylinder leak|smell gas|lpg/i))return "Gas leak safety:\n1. Do not switch lights on or off\n2. Open doors and windows immediately\n3. Turn off regulator if safe\n4. Leave the area and call 101 or 112";
    if(l.match(/therapist|counselor|counsellor|psychologist|psychiatrist|mental health doctor|suicide|self harm|kill myself|mental health|panic attack|anxiety/i))return "Mental health support:\n1. Sit somewhere safe and slow your breathing: inhale 4 seconds, exhale 6 seconds.\n2. Call or stay with a trusted person right now.\n3. Emotional support helpline: 9152987821.\n4. If you may harm yourself or cannot stay safe, call 112 immediately.";
    if(l.match(/domestic violence|harassment|stalking|assault|kidnap|abuse|woman unsafe|women unsafe/i))return "Personal safety emergency:\n1. Move to a safer public place if possible\n2. Call 112 right now\n3. Women helpline: 1091\n4. Share your location with a trusted contact";
    if(l.match(/child missing|missing child|child abuse|child unsafe/i))return "Child emergency:\n1. Call 112 immediately\n2. Child helpline: 1098\n3. Keep last seen location, time, and clothing details ready\n4. Alert nearby police and trusted adults now";
    if(l.match(/poison|chemical|overdose|venom|bite|dog bite|rabies|scorpion|bee sting/i))return "Poison or toxic exposure:\n1. Move away from the source now\n2. Do not force vomiting unless instructed\n3. Poison helpline: 1800-116-117\n4. If breathing trouble, swelling, or collapse starts, call 112";
    /* Default responses based on detected language */
    const defaults={
      hi:"नमस्ते! मैं Aapada AI हूं। आप मुझसे पूछ सकते हैं:\n- नजदीकी अस्पताल / आश्रय\n- CPR के कदम\n- बाढ़ / भूकंप सुरक्षा\n- आपातकालीन नंबर",
      ur:"میں Aapada AI ہوں۔ پوچھیں:\n- قریبی اسپتال / پناہ\n- CPR مراحل\n- ہنگامی نمبر",
      bn:"আমি Aapada AI। জিজ্ঞেস করুন:\n- কাছের হাসপাতাল\n- জরুরি নম্বর\n- প্রথমিক চিকিৎসা",
      ta:"நான் Aapada AI. கேளுங்கள்:\n- அருகில் மருத்துவமனை\n- அவசர எண்கள்\n- முதலுதவி",
      te:"నేను Aapada AI. అడగండి:\n- దగ్గరి ఆసుపత్రి\n- అత్యవసర నంబర్లు",
      kn:"ನಾನು Aapada AI. ಕೇಳಿ:\n- ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ\n- ತುರ್ತು ಸಂಖ್ಯೆಗಳು",
      mr:"मी Aapada AI आहे. विचारा:\n- जवळचे रुग्णालय\n- आपत्कालीन नंबर",
      gu:"હું Aapada AI છું. પૂછો:\n- નજીકની હોસ્પિટલ\n- કટોકટી નંબર",
      en:"I am Aapada AI. Ask me about:\n- nearest hospital or shelter\n- CPR and first aid\n- flood, earthquake, fire safety\n- all emergency contacts (112, 101, 100)",
    };
    return defaults[dl]||defaults.en;
  },
};

/* ─── TINY SHARED COMPONENTS ─────────────────────────────────────────────── */
AI.chat = function(msg){
  const q=(msg||"").trim();
  const l=q.toLowerCase();
  const rh=this.rankH();
  const rs=this.rankS();
  const topHospital=rh[0];
  const topShelter=rs[0];
  const emergencyLine="Emergency: 112 | Police: 100 | Fire: 101 | Ambulance: 102";
  const reply=(lines)=>lines.filter(Boolean).join("\n");

  if(!q) return "Tell me what happened, where you are, and if anyone is injured.";
  if(/hospital|doctor|medical|ambulance|injur|injury|pain|aspatal|asupatra|maruthuvam|rugnalaya/i.test(l)){
    return reply([
      "Nearest hospital:",
      topHospital.name + " | " + topHospital.distance + " km | " + topHospital.phone,
      "Also close:",
      rh.slice(1,3).map(h=>"- " + h.name + " (" + h.distance + " km)").join("\n"),
      emergencyLine,
    ]);
  }
  if(/shelter|camp|refuge|ashray|nivaara|relief/i.test(l)){
    return reply([
      "Nearest shelter:",
      topShelter.name + " | " + topShelter.distance + " km | " + topShelter.available + " spots free",
      "Take ID, medicines, water, phone charger, and important documents.",
      "SDRF: 1070 | " + emergencyLine,
    ]);
  }
  if(/cpr|not breathing|unresponsive|cardiac arrest/i.test(l)){
    return reply([
      "CPR now:",
      "1. Call 112 and ask for an ambulance.",
      "2. Start hard, fast chest compressions in the center of the chest.",
      "3. Give 30 compressions, then 2 rescue breaths if trained.",
      "4. Continue until help arrives or the person breathes normally.",
    ]);
  }
  if(/heart attack|stroke|chest pain|one side weak|slurred speech/i.test(l)){
    return reply([
      "Possible heart attack or stroke:",
      "1. Call 112 immediately.",
      "2. Keep the person still and calm.",
      "3. Do not give food or water.",
      "4. Be ready to start CPR if they stop breathing normally.",
      "Nearest hospital: " + topHospital.name + " (" + topHospital.distance + " km)",
    ]);
  }
  if(/bleeding|cut|blood loss|hemorrhage/i.test(l)){
    return reply([
      "Severe bleeding:",
      "1. Press firmly on the wound with a clean cloth.",
      "2. Add more cloth if blood soaks through.",
      "3. Raise the injured part if safe.",
      "4. Call 112 if bleeding is heavy or spurting.",
    ]);
  }
  if(/burn|scald|fire injury/i.test(l)){
    return reply([
      "Burn care:",
      "1. Cool the burn under cool running water for 20 minutes.",
      "2. Remove rings or tight items nearby.",
      "3. Cover loosely with a clean non-stick dressing.",
      "4. Call 112 for large, electrical, chemical, face, or breathing-related burns.",
    ]);
  }
  if(/fracture|broken bone|sprain|dislocation/i.test(l)){
    return reply([
      "Possible fracture:",
      "1. Do not straighten the limb.",
      "2. Support it in the position found.",
      "3. Apply a wrapped cold pack.",
      "4. Call 112 if bone is visible, severe pain, or spine injury is possible.",
    ]);
  }
  if(/snake|dog bite|rabies|scorpion|bee sting|venom/i.test(l)){
    return reply([
      "Bite or sting emergency:",
      "1. Move away from the animal or insect.",
      "2. Keep the affected limb still.",
      "3. Do not cut, suck, or tightly tie the area.",
      "4. Go to " + topHospital.name + " or call 112 if swelling, breathing trouble, or collapse starts.",
    ]);
  }
  if(/poison|overdose|chemical|cleaner|medicine too much/i.test(l)){
    return reply([
      "Possible poisoning:",
      "1. Move away from the source.",
      "2. Do not force vomiting unless instructed.",
      "3. Call Poison Helpline: 1800-116-117.",
      "4. Call 112 if the person is sleepy, confused, seizing, or not breathing normally.",
    ]);
  }
  if(/gas leak|cylinder leak|smell gas|lpg/i.test(l)){
    return reply([
      "Gas leak:",
      "1. Do not switch lights or appliances on/off.",
      "2. Open doors and windows.",
      "3. Turn off the regulator if safe.",
      "4. Leave the area and call 101 or 112.",
    ]);
  }
  if(/earthquake|quake|tremor/i.test(l)){
    return reply([
      "Earthquake:",
      "1. Drop, cover, and hold on.",
      "2. Stay away from windows and heavy shelves.",
      "3. If outside, move away from buildings and wires.",
      "4. After shaking stops, check injuries and call 112 if needed.",
    ]);
  }
  if(/flood|heavy rain|water rising|cloudburst/i.test(l)){
    return reply([
      "Flood safety:",
      "1. Move to higher ground now.",
      "2. Never walk or drive through flood water.",
      "3. Turn off electricity if safe.",
      "4. Shelter: " + topShelter.name + " | SDRF: 1070 | 112",
    ]);
  }
  if(/landslide|hill slide|rocks falling/i.test(l)){
    return reply([
      "Landslide risk:",
      "1. Move away from the slope immediately.",
      "2. Do not stand in drainage channels or below loose rocks.",
      "3. Avoid the area even after the first slide stops.",
      "4. Call 112 if people may be trapped.",
    ]);
  }
  if(/cyclone|storm|lightning|thunder/i.test(l)){
    return reply([
      "Storm safety:",
      "1. Go indoors and stay away from windows.",
      "2. Unplug sensitive electrical items.",
      "3. Do not shelter under isolated trees during lightning.",
      "4. Keep a charged phone, torch, water, and medicines ready.",
    ]);
  }
  if(/finger.*(stuck|trapped)|hand.*(stuck|trapped)|arm.*(stuck|trapped)|stuck.*finger|stuck.*hand|trapped.*finger|trapped.*hand|pinched finger|jammed finger|finger in door|hand in door|finger in fridge|hand in fridge|crush injury|crushed finger|crushed hand/i.test(l)){
    return reply([
      "Trapped or crushed finger/hand:",
      "1. Remove the hand only if it can be done gently and safely. Do not pull hard.",
      "2. Cool the area with cold water or a wrapped cold pack for 15-20 minutes.",
      "3. Remove rings immediately before swelling starts.",
      "4. If there is severe pain, deformity, bleeding, numbness, blue colour, or the finger cannot move, go to " + topHospital.name + " or call 112.",
    ]);
  }
  if(/cut|slice|knife|glass|laceration|wound|deep cut|split skin/i.test(l)){
    return reply([
      "Cut or open wound:",
      "1. Wash your hands, then apply firm pressure with a clean cloth.",
      "2. Rinse gently with clean running water once bleeding slows.",
      "3. Cover with a clean bandage.",
      "4. Call 112 or go to " + topHospital.name + " if bleeding will not stop, the cut is deep, or you can see fat/bone.",
    ]);
  }
  if(/sprain|twist|twisted ankle|twisted wrist|rolled ankle|pulled muscle/i.test(l)){
    return reply([
      "Possible sprain:",
      "1. Rest the injured part and avoid weight on it.",
      "2. Apply a wrapped cold pack for 15-20 minutes.",
      "3. Use a snug bandage if available, but not so tight that fingers/toes go numb.",
      "4. Get medical care if pain is severe, there is major swelling, or the person cannot walk/use the limb.",
    ]);
  }
  if(/dislocat|joint out|shoulder out|popped out/i.test(l)){
    return reply([
      "Possible dislocation:",
      "1. Do not force the joint back in.",
      "2. Keep it still in the position found.",
      "3. Apply a wrapped cold pack.",
      "4. Go to " + topHospital.name + " urgently or call 112 if there is severe pain or numbness.",
    ]);
  }
  if(/eye injury|something in eye|dust in eye|chemical in eye|hit in eye|eye pain/i.test(l)){
    return reply([
      "Eye injury:",
      "1. Do not rub or press the eye.",
      "2. If dust or small particles are in the eye, rinse gently with clean water.",
      "3. If chemical entered the eye, flush with running water for at least 15-20 minutes immediately.",
      "4. Go to " + topHospital.name + " urgently if pain continues, vision is blurry, or there is a cut.",
    ]);
  }
  if(/nosebleed|bleeding nose|blood from nose/i.test(l)){
    return reply([
      "Nosebleed:",
      "1. Sit upright and lean slightly forward.",
      "2. Pinch the soft part of the nose for 10-15 minutes without checking too early.",
      "3. Spit out blood; do not lean back.",
      "4. Get urgent care if bleeding lasts more than 20 minutes, follows a major injury, or the person feels faint.",
    ]);
  }
  if(/faint|fainted|passed out|collapsed|unconscious but breathing/i.test(l)){
    return reply([
      "Fainting or collapse:",
      "1. Lay the person flat and raise the legs slightly if there is no injury.",
      "2. Loosen tight clothing and keep air flowing.",
      "3. If vomiting or very sleepy, place them on their side.",
      "4. Call 112 if they do not wake quickly, have chest pain, seizure, trouble breathing, or a head injury.",
    ]);
  }
  if(/vomit|vomiting|throwing up|nausea|food poisoning|stomach bug/i.test(l)){
    return reply([
      "Vomiting or suspected food poisoning:",
      "1. Give small sips of clean water or ORS often.",
      "2. Rest and avoid oily or heavy food.",
      "3. Watch for dehydration: very dry mouth, dizziness, low urine, or confusion.",
      "4. Get medical help urgently for blood in vomit, severe stomach pain, trouble breathing, or repeated vomiting in a child/elderly person.",
    ]);
  }
  if(/fever|high temperature|temperature 103|temperature 104|very high fever/i.test(l)){
    return reply([
      "High fever:",
      "1. Give fluids and keep clothing light.",
      "2. Use paracetamol if appropriate and already available.",
      "3. Sponge with lukewarm water if very uncomfortable; do not use ice water.",
      "4. Get urgent care for confusion, seizures, breathing trouble, stiff neck, or fever in a very young baby.",
    ]);
  }
  if(/allergy|allergic|rash|swelling|hives/i.test(l)){
    return reply([
      "Allergic reaction:",
      "1. Move away from the trigger if known.",
      "2. Watch for lip/tongue swelling, wheezing, or trouble breathing.",
      "3. Use the person's prescribed anti-allergy medicine or epinephrine auto-injector if they have one.",
      "4. Call 112 immediately if breathing is affected or swelling is spreading fast.",
    ]);
  }
  if(/seizure|fits|convulsion/i.test(l)){
    return reply([
      "Seizure first aid:",
      "1. Move hard or sharp objects away.",
      "2. Turn the person onto their side after shaking if possible.",
      "3. Do not hold them down and do not put anything in the mouth.",
      "4. Call 112 if the seizure lasts more than 5 minutes, repeats, or this is the first seizure.",
    ]);
  }
  if(/suicide|self harm|kill myself|panic attack|mental health|anxiety/i.test(l)){
    return reply([
      "You need support now:",
      "1. Move near another trusted person right away.",
      "2. Call 112 if there is immediate danger.",
      "3. Mental health support: 9152987821.",
      "4. Tell me if this is happening to you or someone else, and if they are safe right now.",
    ]);
  }
  if(/harassment|stalking|assault|abuse|domestic violence|unsafe|kidnap|robbery/i.test(l)){
    return reply([
      "Personal safety steps:",
      "1. Move to a safer public place if possible.",
      "2. Call 112 now.",
      "3. Women Helpline: 1091 | Child Helpline: 1098 if relevant.",
      "4. Share your live location with a trusted contact.",
    ]);
  }
  if(/offline|internet|network/i.test(l)){
    return reply([
      "This assistant is working offline.",
      "Available offline:",
      "- Hospitals and shelters",
      "- First aid guidance",
      "- Emergency contacts",
      "- Safety steps for common emergencies",
    ]);
  }
  if(/pain|swelling|injury|hurt|accident|fell|fall|hit|bumped|door|fridge|machine|stuck|trapped|burned|burnt|bite|sting/i.test(l)){
    return reply([
      "I can help with that injury.",
      "1. Move away from the object or danger source.",
      "2. Cool, wash, or apply pressure depending on bleeding, swelling, or burns.",
      "3. Remove rings or tight items early if the body part may swell.",
      "4. Tell me the exact body part, whether there is bleeding/swelling, and if they can still move it.",
    ]);
  }
  return reply([
    "I can help with almost any emergency.",
    "Tell me these 3 things:",
    "1. What happened",
    "2. Your location",
    "3. Whether anyone is injured or in immediate danger",
    emergencyLine,
  ]);
};

const Logo=({sz=32})=>(
  <svg viewBox="0 0 40 40" width={sz} height={sz} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield shape */}
    <path d="M20 3 L34 9 L34 22 Q34 32 20 37 Q6 32 6 22 L6 9 Z" fill={T.blue} stroke={T.orange} strokeWidth="1.5"/>
    {/* Inner shield highlight */}
    <path d="M20 7 L30 11.5 L30 22 Q30 29 20 33 Q10 29 10 22 L10 11.5 Z" fill="rgba(255,255,255,0.08)"/>
    {/* Emergency cross */}
    <rect x="17.5" y="13" width="5" height="14" rx="1.5" fill="white"/>
    <rect x="13" y="17.5" width="14" height="5" rx="1.5" fill="white"/>
    {/* Orange pulse ring */}
    <circle cx="20" cy="20" r="5" fill="none" stroke={T.orange} strokeWidth="1" opacity="0.6"/>
  </svg>
);

const Pill=({children,active,onClick,cls=""})=>(
  <button onClick={onClick} className={"hov-pill " + cls}
    style={{padding:"7px 15px",borderRadius:999,border:"2px solid " + (active?T.blue:T.border),
      background:active?T.blue:T.white,color:active?T.white:T.text,
      fontSize:"0.82rem",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s"}}>
    {children}
  </button>
);

/* ── SVG Icon System ─────────────────────────────────────────────── */
const ICONS={
  hospital:  (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>,
  shelter:   (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  fire:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  police:    (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  flood:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>,
  rain:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/></svg>,
  medical:   (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  mountain:  (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/></svg>,
  shield:    (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>,
  heart:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  bleed:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>,
  burn:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  bone:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.2 11.8L12 18 6 12l5.8-5.8M18 6l-4 4M6 18l4-4"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="5" r="2"/></svg>,
  choke:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 9s1-2 3-2 3 2 3 2"/><line x1="12" y1="13" x2="12" y2="17"/></svg>,
  snake:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12c0-5 4-9 9-9s9 4 9 9-4 6-9 6H3"/><path d="M3 12l3-3 3 3-3 3z"/></svg>,
  wave:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/><path d="M2 18c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>,
  sun:       (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  pin:       (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  map:       (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  warn:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  sos:       (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  clock:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  beds:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 12h20M6 8v4"/><path d="M6 8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2"/></svg>,
  check:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>,
  cloud:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  wind:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
  drop:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>,
  thermo:    (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
  offline:   (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>,
  report:    (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  satellite: (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  star:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  globe:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  lock:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  notes:     (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  plus:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  user:      (c="currentColor",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>,
};
const Ic=({n,c="currentColor",s=18})=>(ICONS[n]?ICONS[n](c,s):<span style={{width:s,height:s,display:"inline-block"}}/>);

const SevBar=({sev})=>{
  const c=sev==="danger"?"#ef4444":sev==="warning"?T.orange:T.blue;
  return <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:c,borderRadius:"4px 0 0 4px"}}/>;
};

const AIBadge=({val})=>(
  <span style={{background:"linear-gradient(135deg," + T.blue + "," + T.blueLt + ")",color:"white",
    padding:"3px 10px",borderRadius:999,fontSize:"0.71rem",fontWeight:700,whiteSpace:"nowrap"}}>
    AI {val}
  </span>
);

const Tag=({label})=>(
  <span style={{background:T.bg2,border:"1px solid " + T.border,color:T.blue,
    padding:"2px 8px",borderRadius:999,fontSize:"0.71rem"}}>{label}</span>
);

const Btn=({children,onClick,variant="primary",small=false,sx={}})=>{
  const bg=variant==="primary"?T.blue:variant==="orange"?T.orange:T.bg2;
  const fg=variant==="ghost"?T.blue:T.white;
  const bd=variant==="ghost"?"1.5px solid " + T.border:"none";
  return(
    <button onClick={onClick} className="hov-btn"
      style={{padding:small?"6px 12px":"10px 20px",borderRadius:999,border:bd,background:bg,
        color:fg,fontSize:small?"0.78rem":"0.87rem",fontWeight:700,cursor:"pointer",
        display:"inline-flex",alignItems:"center",gap:6,transition:"all .2s",...sx}}>
      {children}
    </button>
  );
};

const Toast=({toasts})=>(
  <div style={{position:"fixed",top:68,right:16,zIndex:9999,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none",maxWidth:300}}>
    {toasts.map(t=>(
      <div key={t.id} style={{padding:"10px 16px",borderRadius:12,color:"white",fontSize:"0.83rem",
        lineHeight:1.45,animation:"af-toast .3s ease",boxShadow:T.shLg,
        background:t.type==="success"?"#16a34a":t.type==="warning"?T.orange:t.type==="error"?"#ef4444":T.text}}>
        {t.msg}
      </div>
    ))}
  </div>
);

const StepVisual=({color="#ef4444",title="First Aid",detail="",stepNumber=1})=>{
  const d=(detail||"").toLowerCase();
  const isBreath=/cpr|breath|breathing|compress|choking|drown/.test(d);
  const isWater=/snake|wash|cool|burn|poison|bite/.test(d);
  const isPressure=/press|bleed|bandage|fracture|support|raise/.test(d);
  return(
    <div style={{height:220,borderRadius:18,overflow:"hidden",background:"#ffffff",border:"1.5px solid "+color+"35",boxShadow:"0 10px 30px "+color+"18"}}>
      <div style={{height:48,background:color,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",color:"white"}}>
        <div style={{fontSize:"0.76rem",fontWeight:700,letterSpacing:.5}}>{title}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:"0.7rem",fontWeight:800,letterSpacing:.6,background:"rgba(255,255,255,.18)",padding:"4px 9px",borderRadius:999}}>VISUAL GUIDE</span>
          <div style={{fontFamily:"Sora,sans-serif",fontSize:"1rem",fontWeight:800}}>STEP {stepNumber}</div>
        </div>
      </div>
      <div style={{padding:"14px 16px 12px"}}>
        <svg viewBox="0 0 320 128" width="100%" height="124" aria-hidden="true">
          <rect x="0" y="0" width="320" height="128" rx="20" fill="#f8fafc"/>
          <rect x="12" y="12" width="296" height="104" rx="18" fill="#fff"/>
          <rect x="24" y="20" width="118" height="88" rx="14" fill={color} opacity=".1"/>
          <circle cx="72" cy="50" r="16" fill={color} opacity=".16">
            <animate attributeName="r" values="14;17;14" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <rect x="56" y="68" width="32" height="20" rx="9" fill={color} opacity=".3"/>
          <rect x="50" y="88" width="10" height="14" rx="5" fill={color} opacity=".32"/>
          <rect x="84" y="88" width="10" height="14" rx="5" fill={color} opacity=".32"/>
          <rect x="145" y="22" width="150" height="84" rx="16" fill="#f8fafc" stroke={color} strokeOpacity=".18"/>
          <rect x="160" y="34" width="78" height="10" rx="5" fill={color} opacity=".22"/>
          <rect x="160" y="52" width="110" height="8" rx="4" fill={color} opacity=".12"/>
          <rect x="160" y="68" width="92" height="8" rx="4" fill={color} opacity=".12"/>
          <rect x="160" y="84" width="64" height="8" rx="4" fill={color} opacity=".12"/>
          <rect x="24" y="20" width="118" height="88" rx="14" fill="none" stroke={color} strokeOpacity=".14"/>
          <rect x="30" y="26" width="106" height="8" rx="4" fill="#0f172a" opacity=".08"/>
          <circle cx="124" cy="30" r="3" fill="#22c55e">
            <animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          {isBreath&&(
            <>
              <path d="M88 54c14 0 18 14 30 14" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none">
                <animate attributeName="d" values="M88 54c8 0 12 8 22 8;M88 54c14 0 18 14 30 14;M88 54c8 0 12 8 22 8" dur="1.4s" repeatCount="indefinite"/>
              </path>
              <path d="M230 74c16 0 26-10 38-22" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none">
                <animate attributeName="opacity" values=".3;1;.3" dur="1.4s" repeatCount="indefinite"/>
              </path>
            </>
          )}
          {isWater&&(
            <>
              {[0,1,2,3].map(i=>(
                <line key={i} x1={206+i*14} y1="44" x2={200+i*14} y2="66" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="translate" values={"0 -8;0 10;0 -8"} dur={(1.2+i*0.2)+"s"} repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;1;0" dur={(1.2+i*0.2)+"s"} repeatCount="indefinite"/>
                </line>
              ))}
            </>
          )}
          {isPressure&&(
            <>
              <rect x="206" y="56" width="44" height="20" rx="10" fill={color} opacity=".2">
                <animate attributeName="y" values="56;60;56" dur="1.1s" repeatCount="indefinite"/>
              </rect>
              <path d="M190 84h76" stroke={color} strokeWidth="3" strokeLinecap="round" opacity=".5"/>
            </>
          )}
          <rect x="24" y="112" width="272" height="6" rx="3" fill={color} opacity=".12"/>
          <rect x="24" y="112" width="68" height="6" rx="3" fill={color}>
            <animate attributeName="width" values="42;220;42" dur="3.6s" repeatCount="indefinite"/>
          </rect>
        </svg>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginTop:8}}>
          <div style={{fontSize:"0.78rem",lineHeight:1.6,color:T.text2,flex:1}}>{detail}</div>
          <div style={{flexShrink:0,padding:"5px 10px",borderRadius:999,background:color+"15",color:color,fontSize:"0.7rem",fontWeight:800}}>AUTO PLAY</div>
        </div>
      </div>
    </div>
  );
};

const RCard=({r,rank,onRoute,onCall})=>{
  const isSh=r.type==="shelter";
  const pct=isSh?Math.round((r.current/r.capacity)*100):null;
  const barC=!pct?null:pct<50?"#22c55e":pct<80?T.orange:"#ef4444";
  const typeColor={hospital:"#ef4444",shelter:"#22c55e",fire:T.orange,police:"#3b82f6"}[r.type]||T.blue;
  const typeBg={hospital:"#fef2f2",shelter:"#f0fdf4",fire:"#fff7ed",police:"#eff6ff"}[r.type]||T.bg;
  const typeIcon={hospital:"hospital",shelter:"shelter",fire:"fire",police:"police"}[r.type]||"shield";
  return(
    <div className="hov-card" style={{display:"flex",gap:14,padding:16,background:T.white,
      borderRadius:T.r,boxShadow:T.sh,position:"relative",marginBottom:10,transition:"all .25s"}}>
      <div style={{width:44,height:44,borderRadius:12,background:typeBg,border:"1.5px solid "+typeColor+"30",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Ic n={typeIcon} c={typeColor} s={22}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:700,fontSize:"0.94rem",marginBottom:3}}>
          {rank&&<span style={{color:T.orange,marginRight:4}}>#{rank}</span>}
          {r.name}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:4,fontSize:"0.79rem",color:T.text2,marginBottom:3}}>
          <Ic n="pin" c={T.textL} s={13}/> {r.address}
        </div>
        {r.phone&&<div style={{display:"flex",alignItems:"center",gap:4,fontSize:"0.79rem",color:T.text2,marginBottom:5}}>
          <Ic n="phone" c={T.textL} s={13}/> {r.phone}{r["24h"]&&" · 24H"}{r.govt?" · Govt":" · Pvt"}
        </div>}
        {r.availableBeds!=null&&<div style={{display:"flex",alignItems:"center",gap:4,fontSize:"0.79rem",color:T.text2,marginBottom:5}}>
          <Ic n="beds" c={T.textL} s={13}/> {r.availableBeds} beds available
        </div>}
        {isSh&&(
          <div style={{marginBottom:7}}>
            <div style={{fontSize:"0.79rem",color:T.text2,marginBottom:4}}>{r.available??(r.capacity-r.current)}/{r.capacity} spots free</div>
            <div style={{background:"#e5e7eb",height:5,borderRadius:3,overflow:"hidden"}}>
              <div style={{width:pct + "%",height:"100%",background:barC,borderRadius:3,transition:"width .4s"}}/>
            </div>
          </div>
        )}
        {r.specialties&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>{r.specialties.map(s=><Tag key={s} label={s}/>)}</div>}
        {r.amenities&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>{r.amenities.map(a=><Tag key={a} label={a}/>)}</div>}
        <div style={{display:"flex",gap:8,marginTop:2}}>
          {onCall&&r.phone&&<Btn small onClick={()=>onCall(r.phone)}><Ic n="phone" c="white" s={13}/> Call</Btn>}
          <Btn small variant="ghost" onClick={()=>onRoute(r)}><Ic n="map" c={T.blue} s={13}/> Route</Btn>
        </div>
      </div>
      {r.score!=null&&<div style={{position:"absolute",top:12,right:12}}><AIBadge val={r.score}/></div>}
      {r.distance!=null&&<div style={{position:"absolute",bottom:12,right:12,fontSize:"0.7rem",color:T.textL,display:"flex",alignItems:"center",gap:3}}><Ic n="pin" c={T.textL} s={11}/>{r.distance} km</div>}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
export default function AapadaFlow(){
  const [splash,  setSplash]  = useState(true);
  const [smsg,    setSmsg]    = useState("Initialising offline database…");
  const [page,    setPage]    = useState("home");
  const [bar,     setBar]     = useState(false);
  const [langO,   setLangO]   = useState(false);
  const [lang,    setLang]    = useState("en");
  const [online,  setOnline]  = useState(navigator.onLine);
  const [toasts,  setToasts]  = useState([]);
  const [dtype,   setDtype]   = useState("flood");
  const [mapF,    setMapF]    = useState("all");
  const [faCat,   setFaCat]   = useState("cpr");
  const [alerts,  setAlerts]  = useState(INIT_ALERTS);
  const [rdesc,   setRdesc]   = useState("");
  const [rtype,   setRtype]   = useState("flood");
  const [hSrch,   setHSrch]   = useState("");
  const [sSrch,   setSSrch]   = useState("");
  const [chatO,   setChatO]   = useState(false);
  const [msgs,    setMsgs]    = useState([{id:1,by:"bot",text:"Namaste! I am Aapada AI — your emergency assistant. Chat with me about your emergency — hospitals, shelters, first aid, or disaster safety."}]);
  const [chatIn,  setChatIn]  = useState("");
  const [typing,  setTyping]  = useState(false);
  const [sosO,    setSosO]    = useState(false);
  const [,setResourceTick]=useState(0);
  const chatEnd=useRef(null); const tid=useRef(0);
  const chatTopicLabels=[
    phrase(lang,"Medical",{hi:"मेडिकल",ur:"میڈیکل"}),
    phrase(lang,"Disaster",{hi:"आपदा",ur:"آفت"}),
    phrase(lang,"Women Safety",{hi:"महिला सुरक्षा",ur:"خواتین تحفظ"}),
    phrase(lang,"Gas Leak",{hi:"गैस लीक",ur:"گیس لیک"}),
    phrase(lang,"Poison",{hi:"जहर",ur:"زہر"}),
    phrase(lang,"Mental Health",{hi:"मानसिक सहायता",ur:"ذہنی مدد"}),
  ];

  useEffect(()=>{
    setMsgs([{id:1,by:"bot",text:"Namaste! I am Aapada AI.\n\nOffline response mode is active, so I can still help with medical, disaster, rescue, safety, crime, and emergency contact guidance."}]);
  },[]);

  useEffect(()=>{
    const steps=["Welcome to AapadaSetu","Preparing offline emergency data…","Loading safety guidance…","Ready!"];
    let i=0; const iv=setInterval(()=>{if(++i<steps.length)setSmsg(steps[i]);else{clearInterval(iv);setTimeout(()=>setSplash(false),380);}},620);
    return()=>clearInterval(iv);
  },[]);

  useEffect(()=>{
    const on=()=>{setOnline(true);toast("Back online! Syncing data…","success")};
    const off=()=>{setOnline(false);toast("Offline — all features still available","warning")};
    window.addEventListener("online",on);window.addEventListener("offline",off);
    return()=>{window.removeEventListener("online",on);window.removeEventListener("offline",off)};
  },[]);

  useEffect(()=>{
    navigator.geolocation?.getCurrentPosition(
      p=>{AI.setLoc(p.coords.latitude,p.coords.longitude);toast("Location acquired — AI recalculating distances","success")},
      ()=>toast("Using default location (Dehradun). Enable location for accurate results.","warning")
    );
  },[]);

  const applyResourceSnapshot=useCallback((snapshot)=>{
    if(!snapshot) return;
    const nextHospitals=Array.isArray(snapshot.hospitals)&&snapshot.hospitals.length?snapshot.hospitals:DEFAULT_HOSPITALS;
    const nextShelters=Array.isArray(snapshot.shelters)&&snapshot.shelters.length?snapshot.shelters:DEFAULT_SHELTERS;
    replaceItems(HOSPITALS,nextHospitals);
    replaceItems(SHELTERS,nextShelters);
    setResourceTick(v=>v+1);
  },[]);

  const refreshNearbyResources=useCallback(async (lat=AI.lat,lng=AI.lng)=>{
    if(!online) return;
    try{
      const res=await fetch("/api/resources",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({lat,lng,radius:30000})
      });
      if(!res.ok) throw new Error("Live resource fetch failed");
      const data=normalizeLiveResources(await res.json());
      if(data.hospitals.length||data.shelters.length){
        applyResourceSnapshot(data);
        await idbSet("nearby-resources",data);
      }
    }catch(error){
      console.error("Unable to refresh live resources.",error);
    }
  },[applyResourceSnapshot,online]);

  useEffect(()=>{
    let active=true;
    idbGet("nearby-resources")
      .then(snapshot=>{if(active&&snapshot) applyResourceSnapshot(snapshot);})
      .catch(()=>{});
    return()=>{active=false;};
  },[applyResourceSnapshot]);

  useEffect(()=>{
    if(online) refreshNearbyResources();
  },[online,refreshNearbyResources]);

  useEffect(()=>{
    navigator.geolocation?.getCurrentPosition(
      p=>{refreshNearbyResources(p.coords.latitude,p.coords.longitude);},
      ()=>{}
    );
  },[refreshNearbyResources]);

  useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"})},[msgs,typing]);

  const toast=useCallback((msg,type="info")=>{
    const id=++tid.current;
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),3400);
  },[]);

  const go=(p)=>{setPage(p);setBar(false)};
  const onRoute=(r)=>{const url="https://www.google.com/maps/dir/?api=1&destination=" + r.lat + "," + r.lng + "&travelmode=driving";if(online)window.open(url,"_blank");else toast("Route to " + r.name + " saved. Will open when online.","info")};
  const onCall=(ph)=>window.location.href="tel:" + ph;
  const submitReport=()=>{
    if(!rdesc.trim()){toast("Please describe the emergency","error");return}
    setAlerts(a=>[{id:"u"+Date.now(),sev:"danger",icon:"report",title:"User Report - " + rtype,desc:rdesc,time:"Just now"},...a]);
    setRdesc("");toast("Emergency reported! Authorities notified.","success");
  };
  const sendChat=async ()=>{
    if(!chatIn.trim())return;
    const txt=chatIn;
    setMsgs(m=>[...m,{id:Date.now(),by:"user",text:txt}]);
    setChatIn("");setTyping(true);
    try{
      const rh=AI.rankH().slice(0,3).map(h=>h.name+" ("+h.distance+"km, "+h.phone+")").join("; ");
      const rs=AI.rankS().slice(0,2).map(s=>s.name+" ("+s.distance+"km, "+s.available+" spots)").join("; ");
      const replyProfile=AI.detectReplyProfile(txt);
      const sysPrompt=[
        "You are Aapada AI — a comprehensive Indian emergency response assistant embedded in the AapadaFlow app.",
        "You are an expert in ALL types of emergencies. NEVER say you cannot help. Always give actionable guidance.",
        "",
        "LANGUAGE RULE (STRICT): " + replyProfile.instruction,
        "- English → English",
        "- Hindi script → Hindi",
        "- Hinglish (e.g. 'kya karna chahiye', 'mujhe help chahiye', 'hospital kahan hai') → Hinglish mix, very natural",
        "- Urdu script → Urdu",
        "- Tamil script → Tamil | Telugu → Telugu | Kannada → Kannada",
        "- Bengali → Bengali | Marathi → Marathi | Gujarati → Gujarati",
        "",
        "CONTEXT: Location = Dehradun, Uttarakhand, India.",
        "Nearby hospitals: "+rh,
        "Nearby shelters: "+rs,
        "",
        "EMERGENCY NUMBERS (always include relevant ones):",
        "Police: 100 | Fire: 101 | Ambulance: 102 | All Emergencies: 112",
        "SDRF (State Disaster): 1070 | NDRF: 9711077372 | Women helpline: 1091",
        "Child helpline: 1098 | Senior citizen: 14567 | Mental health: iCall 9152987821",
        "Poison control: 1800-116-117 | Blood bank: 1910 | COVID: 1075",
        "",
        "YOU CAN HELP WITH (be expert in ALL of these):",
        "MEDICAL: Heart attack, stroke, choking, bleeding, burns, fractures, poisoning, allergic reaction, seizures, diabetic emergency, asthma attack, drowning, heatstroke, hypothermia, eye injury, electric shock, snake bite, dog bite, scorpion sting, bee sting, food poisoning, unconscious person, CPR, AED use, childbirth emergency, mental health crisis, suicide prevention",
        "NATURAL DISASTERS: Flood, earthquake, landslide, cyclone, drought, cloudburst, hailstorm, tsunami, thunderstorm, lightning, fog, extreme heat/cold",
        "ACCIDENTS: Road accident, building collapse, fire, explosion, gas leak, chemical spill, industrial accident, train accident, aircraft emergency",
        "CRIME/SAFETY: Robbery, assault, domestic violence, missing person, kidnapping, eve-teasing, stalking, online fraud, scam",
        "UTILITIES: Power outage, water supply failure, gas cylinder leak, sewage emergency",
        "ANIMALS: Snake bite, dog bite, wild animal attack, rabies exposure",
        "COMMUNITY: Riot, stampede, crowd emergency, public unrest",
        "",
        "RESPONSE FORMAT: Be concise (4-8 lines max). Use numbered steps for procedures.",
        "Always end with the most relevant emergency number if life is at risk.",
        "For medical emergencies, give immediate first aid steps AND tell them to call 112.",
        "For disasters, give immediate safety action AND relevant helpline.",
        "Respond only in the user's current message language.",
      ].join("\n");
      const userPrompt="User language: " + replyProfile.label + ". " + replyProfile.instruction + "\n\nUser message: " + txt;

      if(online){
        const payload={
          model:"llama3.2:1b",
          messages:[
            {role:"system",content:sysPrompt},
            ...msgs.filter(m=>m.id!==1).slice(-2).map(m=>({
              role:m.by==="user"?"user":"assistant",
              content:m.text
            })),
            {role:"user",content:userPrompt}
          ]
        };
        let data=null;
        const llmErrors=[];
        try{
          const controller=new AbortController();
          const timeoutId=setTimeout(()=>controller.abort(),65000);
          const res=await fetch("/api/chat",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            signal:controller.signal,
            body:JSON.stringify(payload)
          });
          clearTimeout(timeoutId);
          if(res.ok){
            data=await res.json();
          } else {
            const details=await res.text();
            llmErrors.push("/api/chat -> " + res.status + " " + (details||"Request failed"));
          }
        }catch(error){
          llmErrors.push("/api/chat -> " + ((error?.name==="AbortError")?"Timed out waiting for Ollama":"Network error"));
        }

        if(data){
          const reply=(data?.message?.content||"").trim()||AI.chat(txt);
          setTyping(false);
          setMsgs(m=>[...m,{id:Date.now()+1,by:"bot",text:reply}]);
        } else {
          throw new Error(llmErrors.join(" | ")||"No LLM route available");
        }
      } else {
        setTimeout(()=>{
          setTyping(false);
          setMsgs(m=>[...m,{id:Date.now()+1,by:"bot",text:AI.chat(txt)}]);
        },600+Math.random()*400);
      }
    }catch(err){
      console.error("Ollama unavailable, using offline fallback.",err);
      toast("Ollama unavailable, switched to offline emergency guidance.","warning");
      setTimeout(()=>{
        setTyping(false);
        setMsgs(m=>[...m,{id:Date.now()+1,by:"bot",text:AI.chat(txt)}]);
      },400);
    }
  };

  const rH=AI.rankH(dtype).filter(h=>h.name.toLowerCase().includes(hSrch.toLowerCase()));
  const rS=AI.rankS().filter(s=>s.name.toLowerCase().includes(sSrch.toLowerCase()));
  const allResources=getAllResources();
  const mapR=mapF==="all"?allResources:allResources.filter(r=>r.type===mapF);
  const sosH=AI.rankH()[0],sosS=AI.rankS()[0];

  if(splash)return<Splash msg={smsg}/>;

  return(
    <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'Inter','Noto Sans Devanagari',sans-serif"}}>
      <Toast toasts={toasts}/>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:200,height:60,display:"flex",alignItems:"center",
        justifyContent:"space-between",padding:"0 16px",background:T.blue,
        boxShadow:"0 2px 20px rgba(13,45,107,.35)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setBar(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",gap:5,padding:4}}>
            {[0,1,2].map(i=><span key={i} style={{display:"block",width:22,height:2,background:"white",borderRadius:2}}/>)}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Logo sz={30}/>
            <span style={{fontFamily:"Sora,sans-serif",fontSize:"1.3rem",fontWeight:700,color:"white",letterSpacing:1}}>
              Aapada<span style={{color:T.orange}}>Setu</span>
            </span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.12)",padding:"4px 12px",borderRadius:999,fontSize:"0.78rem",color:"white"}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:online?"#22c55e":"#ef4444",display:"inline-block",...(!online&&{animation:"af-blink 1.4s infinite"})}}/>
          {online ? t(lang,"online") : t(lang,"offline")}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {/* Indian flag — circular, right side */}
          <div style={{width:32,height:32,borderRadius:"50%",overflow:"hidden",
            boxShadow:"0 0 0 2px rgba(255,255,255,.3)",flexShrink:0,position:"relative"}}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="white"/>
              <clipPath id="cf"><circle cx="16" cy="16" r="16"/></clipPath>
              <g clipPath="url(#cf)">
                <rect width="32" height="11" fill="#FF9933"/>
                <rect y="11" width="32" height="10" fill="white"/>
                <rect y="21" width="32" height="11" fill="#138808"/>
                <circle cx="16" cy="16" r="3.5" fill="none" stroke="#000080" strokeWidth=".7"/>
                <circle cx="16" cy="16" r=".6" fill="#000080"/>
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
                  <line key={i}
                    x1={16+Math.cos(a*Math.PI/180)*0.6} y1={16+Math.sin(a*Math.PI/180)*0.6}
                    x2={16+Math.cos(a*Math.PI/180)*3.3} y2={16+Math.sin(a*Math.PI/180)*3.3}
                    stroke="#000080" strokeWidth=".45"/>
                ))}
              </g>
            </svg>
          </div>
          <div style={{position:"relative"}}>
            <button onClick={()=>setLangO(o=>!o)} style={{background:"rgba(255,255,255,.14)",color:"white",border:"1px solid rgba(255,255,255,.25)",padding:"5px 11px",borderRadius:999,cursor:"pointer",fontSize:"0.81rem",display:"flex",alignItems:"center",gap:5}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> <span style={{maxWidth:70,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{LANGS.find(l=>l.c===lang)?.native}</span>
            </button>
            {langO&&(
              <>
                <div onClick={()=>setLangO(false)} style={{position:"fixed",inset:0,zIndex:10}}/>
                <div style={{position:"absolute",top:42,right:0,background:T.white,borderRadius:T.r,boxShadow:T.shLg,padding:12,width:278,zIndex:11,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {LANGS.map(l=>(
                    <button key={l.c} className="hov-lang" onClick={()=>{setLang(l.c);setLangO(false);toast("Language: " + l.native,"success")}}
                      style={{background:lang===l.c?T.blue:T.bg,border:"2px solid " + (lang===l.c?T.blue:T.border),
                        color:lang===l.c?"white":T.text,padding:"9px 6px",borderRadius:10,
                        cursor:"pointer",transition:"all .2s",textAlign:"center"}}>
                      <div style={{fontSize:"0.84rem",fontWeight:700,lineHeight:1.25}}>{l.native}</div>
                      <div style={{fontSize:"0.68rem",opacity:.65,marginTop:2}}>{l.en}</div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button onClick={()=>setSosO(true)} className="af-sos"
            style={{background:"#ef4444",color:"white",border:"none",padding:"6px 15px",
              borderRadius:999,fontWeight:800,fontSize:"0.87rem",cursor:"pointer",letterSpacing:1}}>
            SOS
          </button>
        </div>
      </nav>

      {/* SIDEBAR */}
      {bar&&<div onClick={()=>setBar(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.52)",zIndex:300}}/>}
      <aside className="af-sidebar-bg" style={{position:"fixed",left:bar?0:-300,top:0,bottom:0,width:288,zIndex:400,transition:"left .32s cubic-bezier(.4,0,.2,1)",display:"flex",flexDirection:"column",boxShadow:"4px 0 32px rgba(0,0,0,.45)",overflow:"hidden"}}>

        {/* Sidebar header */}
        <div style={{padding:"22px 20px 16px",borderBottom:"1px solid rgba(255,255,255,.08)",position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Logo sz={28}/>
              <span style={{fontFamily:"Sora,sans-serif",fontSize:"1.2rem",fontWeight:700,color:"white",letterSpacing:1}}>Aapada<span style={{color:T.orange}}>Setu</span></span>
            </div>
            <button onClick={()=>setBar(false)} style={{background:"rgba(255,255,255,.1)",border:"none",color:"white",width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          {/* Location + status pill */}
          <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.07)",borderRadius:10,padding:"8px 12px"}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:online?"#22c55e":"#ef4444",display:"inline-block",flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:"white",fontSize:"0.78rem",fontWeight:600}}>{online?t(lang,"sidebarOnline")||t(lang,"online"):t(lang,"sidebarOffline")||t(lang,"offline")}</div>
              <div style={{color:"rgba(255,255,255,.45)",fontSize:"0.68rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Dehradun, Uttarakhand</div>
            </div>
            <span style={{fontSize:"0.72rem",color:T.orange,fontWeight:700,background:"rgba(249,115,22,.15)",padding:"2px 7px",borderRadius:999}}>GPS</span>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{flex:1,padding:"10px 12px",display:"flex",flexDirection:"column",gap:2,overflowY:"auto",position:"relative",zIndex:1}}>
          {[
            ["home", t(lang,"home"), "", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            )],
            ["map", resourceMapsLabel(lang), "", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
            )],
            ["emergencies", t(lang,"emergencies"), "", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            )],
            ["hospitals", t(lang,"hospitals"), rH.length+" nearby", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 12h6M12 9v6"/>
              </svg>
            )],
            ["shelters", t(lang,"shelters"), "", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <path d="M8 22V12h8v10"/>
              </svg>
            )],
            ["firstaid", t(lang,"firstAid"), "Offline", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            )],
            ["checklist", t(lang,"checklistTitle")||"Checklist", "", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,11 12,14 22,4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            )],
            ["weather", t(lang,"weatherTitle")||"Weather", "Live", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              </svg>
            )],
            ["panic", t(lang,"panicTitle")||"Panic Timer", "SOS", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            )],
            ["notepad", t(lang,"notepadTitle")||"Notepad", "", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            )],
            ["alerts", t(lang,"alertsTitle"), alerts.filter(a=>a.sev==="danger").length||"", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            )],
            ["about", t(lang,"aboutTitle"), "", (active)=>(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            )],
          ].map(([p, lb, badge, IconFn], idx)=>{
            const isActive=page===p;
            return(
              <button key={p} onClick={()=>go(p)}
                style={{display:"flex",alignItems:"center",gap:11,padding:"10px 12px",borderRadius:10,
                  border:"none",cursor:"pointer",textAlign:"left",width:"100%",
                  transition:"all .2s cubic-bezier(.34,1.56,.64,1)",
                  background:isActive?"rgba(249,115,22,.12)":"transparent",
                  color:isActive?"white":"rgba(255,255,255,.55)",
                  borderLeft:isActive?"3px solid "+T.orange:"3px solid transparent",
                  animation:"af-in .3s "+(idx*0.04)+"s both"}}>
                <span style={{
                  width:32,height:32,borderRadius:8,flexShrink:0,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  background:isActive?"rgba(249,115,22,.25)":"rgba(255,255,255,.06)",
                  border:isActive?"1px solid rgba(249,115,22,.4)":"1px solid rgba(255,255,255,.07)",
                  transition:"all .2s",
                  color:isActive?T.orange:"rgba(255,255,255,.5)",
                  boxShadow:isActive?"0 0 12px rgba(249,115,22,.3)":"none",
                }}>
                  {IconFn(isActive)}
                </span>
                <span style={{flex:1,fontWeight:isActive?700:400,fontSize:"0.86rem",
                  color:isActive?"white":"rgba(255,255,255,.62)"}}>{lb}</span>
                {badge&&<span style={{fontSize:"0.6rem",fontWeight:700,padding:"2px 8px",borderRadius:999,
                  background:isActive?T.orange:badge==="SOS"?"rgba(239,68,68,.3)":badge==="Live"?"rgba(34,197,94,.2)":"rgba(255,255,255,.09)",
                  color:isActive?"white":badge==="SOS"?"#fca5a5":badge==="Live"?"#86efac":"rgba(255,255,255,.5)",
                  flexShrink:0,letterSpacing:.3,
                  animation:badge==="SOS"?"af-pulse 2s ease-in-out infinite":"none"}}>{badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* SOS button in sidebar */}
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <button onClick={()=>{setBar(false);setSosO(true)}}
            style={{width:"100%",padding:"12px",borderRadius:12,
              border:"2px solid rgba(239,68,68,.4)",
              background:"rgba(239,68,68,.1)",color:"#fca5a5",cursor:"pointer",
              fontFamily:"Sora,sans-serif",fontSize:"0.95rem",fontWeight:700,
              display:"flex",alignItems:"center",justifyContent:"center",gap:10,
              animation:"af-pulse 2s ease-in-out infinite"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            SOS — {t(lang,"emergency")}
          </button>
          <div style={{textAlign:"center",marginTop:10,fontSize:"0.67rem",color:"rgba(255,255,255,.25)"}}>
            AapadaSetu v2.0 · GEU · FS-VI-T038
          </div>
        </div>
      </aside>

      {/* PAGES */}
      <main>
        {page==="home"&&        <PageHome        go={go} sos={()=>setSosO(true)} lang={lang}/>}
        {page==="map"&&         <PageMap         mapR={mapR} mapF={mapF} setMapF={setMapF} onRoute={onRoute} lang={lang}/>}
        {page==="emergencies"&& <PageEmergencies dtype={dtype} setDtype={setDtype} alerts={alerts} rdesc={rdesc} setRdesc={setRdesc} rtype={rtype} setRtype={setRtype} onSubmit={submitReport} lang={lang}/>}
        {page==="hospitals"&&   <PageHospitals   hospitals={rH} search={hSrch} setSearch={setHSrch} onRoute={onRoute} onCall={onCall} lang={lang}/>}
        {page==="shelters"&&    <PageShelters    shelters={rS} search={sSrch} setSearch={setSSrch} onRoute={onRoute} lang={lang}/>}
        {page==="firstaid"&&    <PageFirstAid    cat={faCat} setCat={setFaCat} lang={lang}/>}
        {page==="checklist"&&   <PageChecklist   lang={lang}/>}
        {page==="weather"&&     <PageWeather     lang={lang} online={online}/>}
        {page==="notepad"&&     <PageNotepad     lang={lang}/>}
        {page==="panic"&&       <PagePanic       lang={lang} onCall={onCall}/>}
        {page==="alerts"&&      <PageAlerts      alerts={alerts} lang={lang}/>}
        {page==="about"&&       <PageAbout       lang={lang}/>}
      </main>

      {/* CHAT FAB */}
      {!chatO&&(
        <button onClick={()=>setChatO(true)} style={{position:"fixed",bottom:24,right:24,zIndex:90,
          display:"flex",alignItems:"center",gap:10,background:T.blue,color:"white",border:"none",
          borderRadius:999,padding:"12px 20px",cursor:"pointer",
          boxShadow:"0 8px 26px rgba(37,99,235,.32)",transition:"all .2s"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <line x1="9" y1="10" x2="9.01" y2="10"/>
            <line x1="12" y1="10" x2="12.01" y2="10"/>
            <line x1="15" y1="10" x2="15.01" y2="10"/>
          </svg>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:"0.8rem",fontWeight:700,lineHeight:1.2}}>Aapada AI</div>
            <div style={{fontSize:"0.68rem",opacity:.9}}>{phrase(lang,"Offline emergency copilot",{hi:"ऑफलाइन इमरजेंसी कोपायलट",ur:"آف لائن ایمرجنسی معاون"})}</div>
          </div>
        </button>
      )}

      {/* CHAT PANEL */}
      {chatO&&(
        <div style={{position:"fixed",bottom:24,right:24,zIndex:90,width:338,maxWidth:"calc(100vw - 28px)",
          background:T.white,borderRadius:20,boxShadow:T.shLg,display:"flex",flexDirection:"column",
          border:"1px solid " + T.border,overflow:"hidden",maxHeight:"calc(100vh - 100px)",animation:"af-scale .25s ease"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 15px",background:T.blueDk}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,.15)",
                display:"flex",alignItems:"center",justifyContent:"center",
                border:"2px solid rgba(255,255,255,.3)"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <line x1="9" y1="10" x2="9.01" y2="10"/>
                  <line x1="12" y1="10" x2="12.01" y2="10"/>
                  <line x1="15" y1="10" x2="15.01" y2="10"/>
                </svg>
              </div>
              <div>
                <strong style={{color:"white",fontSize:"0.95rem",display:"block",fontFamily:"Sora,sans-serif",letterSpacing:.5}}>Aapada AI</strong>
                <small style={{color:"rgba(255,255,255,.72)",fontSize:"0.67rem"}}>● {t(lang,"chatWith")}</small>
              </div>
            </div>
            <button onClick={()=>setChatO(false)} style={{background:"rgba(255,255,255,.16)",border:"none",color:"white",width:27,height:27,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <div style={{padding:"8px 12px",display:"flex",gap:7,flexWrap:"wrap",background:"#eff6ff",borderBottom:"1px solid " + T.border}}>
            {chatTopicLabels.map((item)=>(
              <span key={item} style={{padding:"4px 10px",borderRadius:999,background:"white",border:"1px solid #bfdbfe",fontSize:"0.69rem",fontWeight:700,color:T.blue}}>
                {item}
              </span>
            ))}
          </div>
          <div style={{flex:1,overflowY:"auto",padding:13,display:"flex",flexDirection:"column",gap:9,minHeight:175,maxHeight:265}}>
            {msgs.map(m=>(
              <div key={m.id} style={{display:"flex",justifyContent:m.by==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"84%",padding:"9px 13px",borderRadius:14,fontSize:"0.84rem",lineHeight:1.55,whiteSpace:"pre-wrap",
                  background:m.by==="user"?T.blue:T.bg2,color:m.by==="user"?T.white:T.text,
                  borderBottomRightRadius:m.by==="user"?3:14,borderBottomLeftRadius:m.by==="bot"?3:14}}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing&&(
              <div style={{display:"flex",gap:4,padding:"9px 13px",background:T.bg2,borderRadius:14,width:"fit-content",borderBottomLeftRadius:3}}>
                {["af-d1","af-d2","af-d3"].map(c=>(
                  <span key={c} className={c} style={{width:8,height:8,background:T.textL,borderRadius:"50%",display:"inline-block"}}/>
                ))}
              </div>
            )}
            <div ref={chatEnd}/>
          </div>
          <div style={{padding:"7px 11px",display:"flex",gap:5,flexWrap:"wrap",borderTop:"1px solid " + T.border}}>
            {[t(lang,"chatSugg1"),t(lang,"chatSugg2"),t(lang,"chatSugg3"),t(lang,"chatSugg4")].map(q=>(
              <button key={q} className="hov-sugg" onClick={()=>{setChatIn(q);setTimeout(()=>{const i=document.getElementById("af-ci");if(i){const ev=new KeyboardEvent("keydown",{key:"Enter",bubbles:true});i.dispatchEvent(ev)}},10)}}
                style={{background:T.bg2,border:"1px solid " + T.border,color:T.blue,padding:"3px 9px",borderRadius:999,fontSize:"0.73rem",cursor:"pointer",fontWeight:500,transition:"all .2s"}}>
                {q}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:7,padding:"10px 12px"}}>
            <input id="af-ci" value={chatIn} onChange={e=>setChatIn(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&sendChat()}
              placeholder={phrase(lang,"Ask about any emergency, first aid, or safe next step")}
              style={{flex:1,padding:"8px 13px",border:"2px solid #fdba74",borderRadius:999,fontSize:"0.87rem",outline:"none"}}/>
            <button onClick={sendChat} style={{background:T.blue,color:"white",border:"none",width:36,height:36,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg></button>
          </div>
        </div>
      )}

      {/* SOS MODAL */}
      {sosO&&(
        <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={()=>setSosO(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.58)",backdropFilter:"blur(4px)"}}/>
          <div className="af-modal" style={{position:"relative",background:T.white,borderRadius:22,padding:32,maxWidth:460,width:"92%",textAlign:"center",boxShadow:T.shLg}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ic n="sos" c="#ef4444" s={32}/>
              </div>
            </div>
            <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.9rem",color:"#ef4444",marginBottom:12}}>{t(lang,"sosTitle")}</h2>
            <p style={{color:T.text2,lineHeight:1.75,fontSize:"0.88rem"}}>
              {t(lang,"sosDesc")}<br/>
              {t(lang,"locationShared")}<br/><br/>
              Nearest hospital: <strong>{sosH?.name}</strong> ({sosH?.distance} km) — {sosH?.phone}<br/>
              Nearest shelter: <strong>{sosS?.name}</strong> — {sosS?.available} {t(lang,"spotsAvail")}<br/><br/>
              {t(lang,"callImmediate")}
            </p>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:22}}>
              <Btn variant="orange" onClick={()=>window.location.href="tel:112"}>{t(lang,"call112")}</Btn>
              <Btn variant="ghost" onClick={()=>setSosO(false)}>{t(lang,"close")}</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SPLASH ──────────────────────────────────────────────────────────────── */
function Splash({msg}){
  return(
    <div style={{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:T.blueDk,flexDirection:"column",zIndex:9999}}>
      <svg viewBox="0 0 80 80" width={94} height={94} fill="none" style={{animation:"af-spin 1.2s ease both",marginBottom:0}}>
        <path d="M40 5 L68 17 L68 44 Q68 64 40 74 Q12 64 12 44 L12 17 Z" fill={T.blue} stroke={T.orange} strokeWidth="2.5"/>
        <rect x="35" y="24" width="10" height="28" rx="3" fill="white"/>
        <rect x="26" y="33" width="28" height="10" rx="3" fill="white"/>
        <circle cx="40" cy="38" r="10" fill="none" stroke={T.orange} strokeWidth="1.5" opacity="0.7"/>
      </svg>
      <h1 style={{fontFamily:"Sora,sans-serif",fontSize:"2.5rem",color:"white",margin:"18px 0 4px",letterSpacing:2}}>
        Aapada<span style={{color:T.orange}}>Setu</span>
      </h1>
      <p style={{color:"rgba(255,255,255,.6)",marginBottom:36,fontSize:"0.91rem"}}>Welcome to AapadaSetu</p>
      <div style={{width:240,height:4,background:"rgba(255,255,255,.12)",borderRadius:999,overflow:"hidden",marginBottom:14}}>
        <div style={{height:"100%",background:"linear-gradient(90deg," + T.blueLt + "," + T.orange + ")",borderRadius:999,animation:"af-bar 2.4s ease forwards"}}/>
      </div>
      <p style={{color:"rgba(255,255,255,.38)",fontSize:"0.81rem"}}>{msg}</p>
    </div>
  );
}

/* ─── HOME ───────────────────────────────────────────────────────────────── */
function PageHome({go,sos,lang}){
  const [pressedQc, setPressedQc] = useState(null);

  const qc=[
    {
      id:"hospitals",
      Icon:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>,
      accent:"#ef4444", bg:"#fef2f2", border:"#fecaca",
      label:t(lang,"findHospital"), sub:t(lang,"aiRanked"),
      detail:"6 hospitals · AI scored", stat:"2.3 km nearest",
      act:()=>go("hospitals"), urgent:true,
    },
    {
      id:"shelters",
      Icon:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
      accent:"#f97316", bg:"#fff7ed", border:"#fed7aa",
      label:t(lang,"findShelter"), sub:t(lang,"nearestFirst"),
      detail:"5 active shelters", stat:"376 spots free",
      act:()=>go("shelters"),
    },
    {
      id:"firstaid",
      Icon:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
      accent:"#22c55e", bg:"#f0fdf4", border:"#bbf7d0",
      label:t(lang,"firstAid"), sub:t(lang,"offlineGuide"),
      detail:"8 guides — CPR, Burns, Fractures", stat:"100% offline",
      act:()=>go("firstaid"),
    },
    {
      id:"emergencies",
      Icon:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
      accent:"#f59e0b", bg:"#fffbeb", border:"#fde68a",
      label:t(lang,"reportNow"), sub:t(lang,"liveAlerts"),
      detail:"Report incidents live", stat:"5 active alerts",
      act:()=>go("emergencies"),
    },
    {
      id:"weather",
      Icon:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
      accent:T.blueLt, bg:"#eff6ff", border:"#bfdbfe",
      label:weatherLabel(lang), sub:phrase(lang,"Scenic forecast"),
      detail:"Real-time weather + disaster risk", stat:"Dehradun",
      act:()=>go("weather"),
    },
    {
      id:"sos",
      Icon:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      accent:"#dc2626", bg:"#fef2f2", border:"#fca5a5",
      label:t(lang,"sosAlert"), sub:t(lang,"emergency"),
      detail:"Instant SOS broadcast", stat:"Call 112 immediately",
      act:sos, urgent:true, pulse:true,
    },
  ];

  const handleQcClick = (e, q) => {
    if (!q.act) return;
    setPressedQc(q.id);
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const rip = document.createElement("span");
    rip.className = "qc-ripple";
    rip.style.cssText = "width:" + size + "px;height:" + size + "px;left:" + (e.clientX - rect.left - size/2) + "px;top:" + (e.clientY - rect.top - size/2) + "px";
    btn.appendChild(rip);
    setTimeout(() => { rip.remove(); setPressedQc(null); }, 500);
    q.act();
  };

  return(
    <div className="af-page">

      {/* ── HERO ── */}
      <div style={{position:"relative",overflow:"hidden",minHeight:420}}>
        <img
          src="https://images.pexels.com/photos/4267531/pexels-photo-4267531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="UP 112 Emergency Dispatch Centre — India"
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%"}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg," + T.blueDk + "ee 0%," + T.blue + "cc 55%,rgba(26,79,160,.35) 100%)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:72,background:T.bg,clipPath:"ellipse(62% 100% at 50% 100%)"}}/>

        <div style={{position:"relative",zIndex:1,padding:"52px 24px 88px",maxWidth:560}}>
          {/* AI badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(249,115,22,.2)",border:"1px solid rgba(249,115,22,.4)",color:"#fed7aa",padding:"5px 14px",borderRadius:999,fontSize:"0.75rem",fontWeight:700,marginBottom:16,letterSpacing:.4}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {t(lang,"aiPowered")}
          </div>

          <h1 style={{fontFamily:"Sora,sans-serif",fontSize:"clamp(2rem,5.5vw,3.4rem)",fontWeight:800,color:"white",lineHeight:1.04,marginBottom:14,textShadow:"0 2px 20px rgba(0,0,0,.45)"}}>
            {t(lang,"heroLine1")||"Your Emergency"}<br/>
            <em style={{color:T.orange,fontStyle:"normal"}}>{t(lang,"heroLine2")||"Response Partner"}</em>
          </h1>
          <p style={{color:"rgba(255,255,255,.86)",fontSize:"0.94rem",lineHeight:1.7,maxWidth:440,marginBottom:24,textShadow:"0 1px 6px rgba(0,0,0,.3)"}}>
            {t(lang,"heroDesc3")||"Medical emergencies, natural disasters, accidents — we help you respond fast. Works even without internet."}
          </p>

          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:28}}>
            <button className="hov-btn" onClick={()=>go("map")}
              style={{display:"flex",alignItems:"center",gap:8,padding:"11px 22px",borderRadius:12,border:"none",
                background:T.orange,color:"white",fontWeight:700,fontSize:"0.9rem",cursor:"pointer",
                boxShadow:"0 4px 16px rgba(249,115,22,.4)",transition:"transform .2s, box-shadow .2s"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {t(lang,"findNearby")}
            </button>
            <button className="hov-btn" onClick={()=>setSosO(true)}
              style={{display:"flex",alignItems:"center",gap:8,padding:"11px 22px",borderRadius:12,
                border:"2px solid rgba(239,68,68,.6)",background:"rgba(239,68,68,.15)",
                color:"white",fontWeight:700,fontSize:"0.9rem",cursor:"pointer",backdropFilter:"blur(8px)",transition:"transform .2s, box-shadow .2s"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              SOS Alert
            </button>
          </div>

          <div style={{display:"inline-flex",alignItems:"center",gap:9,padding:"10px 14px",borderRadius:999,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.16)",color:"white",fontSize:"0.8rem",fontWeight:600}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:T.orange,display:"inline-block",boxShadow:"0 0 0 6px rgba(249,115,22,.16)"}}/>
            {phrase(lang,"Offline help, nearby resources, and SOS in one place",{hi:"ऑफलाइन मदद, नजदीकी संसाधन और SOS एक ही जगह",ur:"آف لائن مدد، قریبی وسائل اور SOS ایک ہی جگہ"})}
          </div>
        </div>

        {/* Floating resource cards — right side */}
        <div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:8}}>
          {[
            {cl:"af-fc1",Icon:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>,nm:"AIIMS Rishikesh",sub:"18 km · Trauma",badge:"AI 9.4",bc:T.orange},
            {cl:"af-fc2",Icon:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,nm:"Town Hall Camp",sub:"382 spots free",badge:"Open",bc:"#22c55e"},
            {cl:"af-fc3",Icon:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M3 18L12 4l9 14H3z"/><line x1="12" y1="12" x2="12" y2="16"/></svg>,nm:"Fire Station EC Rd",sub:"0.8 km",badge:"Active",bc:"#ef4444"},
          ].map(c=>(
            <div key={c.nm} className={c.cl} style={{background:"rgba(255,255,255,.11)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,.2)",borderRadius:12,padding:"9px 12px",display:"flex",alignItems:"center",gap:9,minWidth:185}}>
              <div style={{width:28,height:28,borderRadius:8,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <c.Icon/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"white",fontSize:"0.76rem",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.nm}</div>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:"0.67rem"}}>{c.sub}</div>
              </div>
              <span style={{fontSize:"0.65rem",padding:"2px 7px",borderRadius:999,fontWeight:700,background:c.bc,color:"white",whiteSpace:"nowrap",flexShrink:0}}>{c.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Firefighter image strip — between hero and quick actions */}
      <div style={{position:"relative",height:140,overflow:"hidden",margin:"0"}}>
        <img
          src="https://images.pexels.com/photos/5958682/pexels-photo-5958682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Firefighters in action"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(13,45,107,.92) 0%,rgba(13,45,107,.5) 50%,transparent 100%)"}}/>
        <div style={{position:"absolute",inset:0,padding:"0 20px",display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
          </div>
          <div>
            <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",color:"white",marginBottom:3}}>112 — India's Emergency Number</div>
            <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,.7)"}}>Fire · Police · Ambulance · All emergencies, one number</div>
          </div>
          <button onClick={()=>window.location.href="tel:112"}
            style={{marginLeft:"auto",padding:"9px 18px",borderRadius:10,border:"none",
              background:"#ef4444",color:"white",fontWeight:700,fontSize:"0.84rem",
              cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            Call 112
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{padding:"24px 20px 20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.15rem",fontWeight:700,color:T.text}}>{t(lang,"quickActions")}</h2>
          <span style={{fontSize:"0.72rem",color:T.textL,fontWeight:500}}>{t(lang,"tapCard")||"Tap to open"}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {/* Top 2 urgent cards side by side */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {qc.slice(0,2).map(q=>(
              <button key={q.id} onClick={e=>handleQcClick(e,q)} className="hov-qc"
                style={{padding:"16px 14px",background:q.bg,borderRadius:16,
                  border:"1.5px solid " + q.border,
                  boxShadow:"0 2px 12px " + q.accent + "18",
                  cursor:"pointer",textAlign:"left",position:"relative",overflow:"hidden",
                  borderLeft:"4px solid " + q.accent}}>
                <div style={{width:38,height:38,borderRadius:10,background:"white",border:"1.5px solid "+q.border,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8,color:q.accent}}>
                  <q.Icon/>
                </div>
                <div style={{fontWeight:700,fontSize:"0.9rem",color:T.text,marginBottom:3,lineHeight:1.2}}>{q.label}</div>
                <div style={{fontSize:"0.7rem",color:q.accent,fontWeight:600}}>{q.stat}</div>
              </button>
            ))}
          </div>
          {/* Remaining 4 cards full width horizontal */}
          {qc.slice(2).map(q=>(
            <button key={q.id} onClick={e=>handleQcClick(e,q)} className="hov-qc"
              style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",
                background:q.pulse?"#fff1f2":T.white,borderRadius:14,
                border:"1.5px solid " + (q.pulse?"#fecaca":T.border),
                boxShadow:T.sh,cursor:"pointer",textAlign:"left",
                position:"relative",overflow:"hidden",
                animation:q.pulse?"af-pulse 2s ease-in-out infinite":"none"}}>
              {/* Accent left bar */}
              <div style={{width:4,height:"100%",position:"absolute",left:0,top:0,
                background:q.accent,borderRadius:"14px 0 0 14px"}}/>
              <div style={{width:46,height:46,borderRadius:12,background:q.bg,
                border:"1.5px solid " + q.border,display:"flex",alignItems:"center",
                justifyContent:"center",flexShrink:0,color:q.accent}}>
                <q.Icon/>
              </div>
              {/* Text */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:"0.92rem",color:T.text,marginBottom:2}}>{q.label}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:"0.72rem",color:q.accent,fontWeight:600,
                    background:q.bg,padding:"2px 7px",borderRadius:999,
                    border:"1px solid " + q.border}}>{q.sub}</span>
                  <span style={{fontSize:"0.7rem",color:T.textL}}>{q.detail}</span>
                </div>
              </div>
              {/* Stat + arrow */}
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:"0.72rem",fontWeight:700,color:q.accent,marginBottom:2}}>{q.stat}</div>
                <div style={{fontSize:"0.85rem",color:T.textL,fontWeight:500}}>→</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TICKER */}
      <div style={{display:"flex",alignItems:"center",background:"#0f1d3a",overflow:"hidden",height:40}}>
        <div style={{background:"#ef4444",color:"white",padding:"0 13px",height:"100%",display:"flex",alignItems:"center",fontSize:"0.73rem",fontWeight:700,whiteSpace:"nowrap",flexShrink:0}}>
          <span className="af-live" style={{display:"inline-flex",alignItems:"center"}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10"/></svg>
          </span>&nbsp;LIVE
        </div>
        <div style={{flex:1,overflow:"hidden"}}>
          <div className="af-tick" style={{display:"flex",gap:36,whiteSpace:"nowrap",color:"rgba(255,255,255,.85)",fontSize:"0.79rem",lineHeight:"40px",padding:"0 14px"}}>
            {[...TICKER,...TICKER].map((tk,i)=><span key={i}>{tk}</span>)}
          </div>
        </div>
      </div>

      {/* DISASTER TYPES — interactive */}
      <EmergencyTypesSection go={go} lang={lang}/>
    </div>
  );
}




/* ─── EMERGENCY TYPES — Indian-themed ────────────────────────────────────── */
const EM_DATA = [
  {
    type:"flood", label:"Flood / बाढ़",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#dbeafe"/>
        {/* Sun peeking */}
        <circle cx="28" cy="14" r="7" fill="#fbbf24"/>
        {/* Rain drops */}
        <ellipse cx="18" cy="26" rx="2" ry="3" fill="#3b82f6"/>
        <ellipse cx="28" cy="24" rx="2" ry="3" fill="#2563eb"/>
        <ellipse cx="38" cy="26" rx="2" ry="3" fill="#3b82f6"/>
        <ellipse cx="23" cy="31" rx="2" ry="3" fill="#1d4ed8"/>
        <ellipse cx="33" cy="31" rx="2" ry="3" fill="#3b82f6"/>
        {/* Water */}
        <path d="M8 40 Q14 36 20 40 Q26 44 32 40 Q38 36 44 40 Q50 44 56 40 L56 56 L8 56Z" fill="#3b82f6"/>
        <path d="M0 43 Q7 39 14 43 Q21 47 28 43 Q35 39 42 43 Q49 47 56 43 L56 56 L0 56Z" fill="#1d4ed8"/>
        {/* Boat */}
        <ellipse cx="28" cy="39" rx="10" ry="3" fill="#f97316"/>
        <rect x="27" y="33" width="2" height="7" fill="#92400e"/>
        <polygon points="29,33 29,27 37,33" fill="white"/>
      </svg>
    ),
    accent:"#2563eb", bg:"#eff6ff", border:"#bfdbfe",
    severity:"High", sevColor:"#ef4444",
    tip:"ऊँची जगह पर जाएं / Move to higher ground",
    helpline:"SDRF: 1070",
    stat:"July–September peak season",
    steps:["Move to higher ground immediately","Never walk in moving floodwater","Disconnect all electrical appliances","Listen only to official radio updates","Call SDRF 1070 for rescue","Don't touch floodwater — it may be contaminated","Stay away from drains and culverts","Help elderly and children first"]
  },
  {
    type:"earthquake", label:"Earthquake / भूकंप",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#fef3c7"/>
        {/* Building */}
        <rect x="16" y="18" width="24" height="24" rx="2" fill="#78716c"/>
        <rect x="16" y="18" width="24" height="5" fill="#57534e"/>
        <rect x="20" y="24" width="6" height="7" fill="#fde68a" opacity=".9"/>
        <rect x="30" y="24" width="6" height="7" fill="#fde68a" opacity=".7"/>
        <rect x="20" y="34" width="6" height="7" fill="#fde68a" opacity=".8"/>
        {/* Crack */}
        <path d="M28 18 L25 28 L30 32 L26 42" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
        {/* Seismic wave */}
        <path d="M4 44 L10 40 L14 46 L18 38 L22 46 L26 40 L30 46 L34 40 L38 46 L42 40 L46 46 L52 44" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Warning */}
        <polygon points="44,12 50,22 38,22" fill="#f59e0b"/>
        <text x="44" y="21" textAnchor="middle" fill="#1c1917" fontSize="7" fontWeight="bold">!</text>
      </svg>
    ),
    accent:"#d97706", bg:"#fffbeb", border:"#fde68a",
    severity:"High", sevColor:"#ef4444",
    tip:"गिरें, ढकें, थामें / Drop, Cover, Hold On",
    helpline:"Emergency: 112",
    stat:"Seismic Zone IV — Uttarakhand",
    steps:["DROP to hands and knees immediately","Take COVER under a sturdy table or desk","HOLD ON until shaking completely stops","Stay away from windows and exterior walls","If outdoors, move away from buildings","After shaking stops, check for injuries","Expect aftershocks — stay prepared","Call 112 if someone is trapped"]
  },
  {
    type:"fire", label:"Fire / आग",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#fee2e2"/>
        {/* Flame layers */}
        <path d="M28 42 Q18 36 20 26 Q22 18 28 22 Q26 14 32 16 Q30 8 36 12 Q42 18 38 28 Q40 36 28 42Z" fill="#f97316"/>
        <path d="M28 42 Q20 36 22 28 Q24 22 28 24 Q27 18 31 20 Q34 24 32 30 Q34 36 28 42Z" fill="#fbbf24"/>
        <path d="M28 42 Q23 37 24 30 Q26 25 28 27 Q28 23 30 25 Q32 29 30 34 Q31 38 28 42Z" fill="#fde68a"/>
        {/* Fire truck small */}
        <rect x="8" y="38" width="16" height="8" rx="2" fill="#ef4444"/>
        <rect x="8" y="34" width="8" height="6" rx="1" fill="#dc2626"/>
        <circle cx="12" cy="47" r="2.5" fill="#111"/>
        <circle cx="20" cy="47" r="2.5" fill="#111"/>
        {/* Water stream */}
        <path d="M8 38 Q6 30 12 26" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    accent:"#ef4444", bg:"#fef2f2", border:"#fca5a5",
    severity:"High", sevColor:"#ef4444",
    tip:"101 पर कॉल करें / Call 101 immediately",
    helpline:"Fire: 101",
    stat:"Response time ~8 minutes average",
    steps:["Call 101 (Fire Department) immediately","Alert everyone loudly — shout FIRE","Use stairs only, NEVER use lifts","Stay low if there is smoke in the area","Feel doors before opening — hot = fire behind","If trapped, seal gaps and signal from window","Never re-enter a burning building","Meet at your pre-decided safe assembly point"]
  },
  {
    type:"cyclone", label:"Cyclone / चक्रवात",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#f5f3ff"/>
        {/* Spiral */}
        <path d="M28 28 Q40 14 50 24 Q56 36 46 44 Q34 52 22 44 Q12 36 18 24 Q24 14 28 28" stroke="#8b5cf6" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M28 28 Q36 20 42 26 Q46 34 40 40 Q32 46 24 40 Q18 32 24 26 Q26 22 28 28" stroke="#a78bfa" strokeWidth="2" fill="none"/>
        {/* Eye */}
        <circle cx="28" cy="28" r="5" fill="#ede9fe"/>
        <circle cx="28" cy="28" r="2.5" fill="#8b5cf6" opacity=".7"/>
        {/* Waves at bottom */}
        <path d="M6 46 Q12 42 18 46 Q24 50 30 46 Q36 42 42 46 Q48 50 54 46" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    accent:"#7c3aed", bg:"#f5f3ff", border:"#ddd6fe",
    severity:"Medium", sevColor:"#f97316",
    tip:"घर के अंदर रहें / Stay indoors safely",
    helpline:"Emergency: 112",
    stat:"Bay of Bengal — April to December",
    steps:["Move to a strong, sturdy shelter immediately","Stay away from coastal areas and river banks","Board up windows or use storm shutters","Secure all loose outdoor objects","Stock water, food, torch, and medicines","Stay completely indoors during the storm","Keep a battery-powered radio for updates","After cyclone — beware flooding and fallen wires"]
  },
  {
    type:"landslide", label:"Landslide / भूस्खलन",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#fef3c7"/>
        {/* Mountain */}
        <polygon points="4,44 20,14 36,44" fill="#44403c"/>
        <polygon points="22,44 36,18 50,44" fill="#292524"/>
        {/* Snow */}
        <polygon points="20,14 16,24 24,24" fill="white" opacity=".8"/>
        <polygon points="36,18 32,26 40,26" fill="white" opacity=".7"/>
        {/* Sliding rocks */}
        <ellipse cx="34" cy="28" rx="4" ry="3" fill="#b45309"/>
        <ellipse cx="38" cy="34" rx="5" ry="3.5" fill="#92400e"/>
        <ellipse cx="42" cy="40" rx="4" ry="3" fill="#78350f"/>
        {/* Trail */}
        <path d="M32 26 Q38 33 44 42" stroke="#d97706" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        {/* Road */}
        <rect x="4" y="44" width="48" height="5" fill="#374151"/>
        {/* Closed sign */}
        <rect x="38" y="36" width="14" height="6" rx="2" fill="#ef4444"/>
        <text x="45" y="41" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">CLOSED</text>
      </svg>
    ),
    accent:"#b45309", bg:"#fffbeb", border:"#fde68a",
    severity:"High", sevColor:"#ef4444",
    tip:"ऊपर की तरफ भागें / Evacuate uphill immediately",
    helpline:"SDRF: 1070",
    stat:"High risk after 100mm+ rainfall",
    steps:["Evacuate immediately if near hills or slopes","Move perpendicular to the slide, not downhill","Listen for sounds of cracking trees or rolling rocks","Stay away from slide area — more may follow","Block drains and gutters near your home","Report the landslide to local authorities","Never enter any building affected by landslide","Use flashlight — avoid flames (risk of gas leaks)"]
  },
  {
    type:"pandemic", label:"Pandemic / महामारी",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#ecfdf5"/>
        {/* Shield */}
        <path d="M28 8 L40 13 L40 24 Q40 34 28 40 Q16 34 16 24 L16 13 Z" fill="#059669" opacity=".85"/>
        <rect x="25.5" y="16" width="5" height="14" rx="1.5" fill="white"/>
        <rect x="21" y="21" width="14" height="4" rx="1.5" fill="white"/>
        {/* Virus particles */}
        {[[10,40,4],[44,38,3.5],[8,18,3],[46,16,3]].map(([cx,cy,r],i)=>(
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#10b981" opacity=".4"/>
            {[0,72,144,216,288].map((a,j)=>(
              <line key={j} x1={cx+Math.cos(a*Math.PI/180)*r} y1={cy+Math.sin(a*Math.PI/180)*r}
                x2={cx+Math.cos(a*Math.PI/180)*(r+2.5)} y2={cy+Math.sin(a*Math.PI/180)*(r+2.5)}
                stroke="#34d399" strokeWidth="1.2" strokeLinecap="round"/>
            ))}
          </g>
        ))}
        {/* Mask */}
        <rect x="19" y="42" width="18" height="10" rx="4" fill="#6ee7b7"/>
        <line x1="19" y1="47" x2="37" y2="47" stroke="#34d399" strokeWidth="1"/>
      </svg>
    ),
    accent:"#059669", bg:"#ecfdf5", border:"#a7f3d0",
    severity:"Medium", sevColor:"#f97316",
    tip:"मास्क पहनें, घर रहें / Mask up, stay home",
    helpline:"Helpline: 1075",
    stat:"National helpline active 24/7",
    steps:["Wear a well-fitting mask in all public places","Wash hands with soap for at least 20 seconds","Maintain 2 metre distance from others","Isolate at home immediately if you have symptoms","Call 1075 helpline before visiting any hospital","Stock a 2-week supply of essential medicines","Get vaccinated when you become eligible","Follow only official government health advisories"]
  },
  {
    type:"drought", label:"Drought / सूखा",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#fef9c3"/>
        {/* Sun */}
        <circle cx="28" cy="18" r="10" fill="#fbbf24"/>
        <circle cx="28" cy="18" r="7" fill="#fef08a"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <line key={i} x1={28+Math.cos(a*Math.PI/180)*11} y1={18+Math.sin(a*Math.PI/180)*11}
            x2={28+Math.cos(a*Math.PI/180)*16} y2={18+Math.sin(a*Math.PI/180)*16}
            stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        ))}
        {/* Cracked earth */}
        <rect x="4" y="36" width="48" height="16" rx="2" fill="#92400e"/>
        <path d="M10 36 L14 44 L19 38 L22 50" stroke="#78350f" strokeWidth="1.5" fill="none"/>
        <path d="M28 36 L32 44 L36 38 L38 50" stroke="#78350f" strokeWidth="1.5" fill="none"/>
        <path d="M42 37 L46 45 L50 40" stroke="#6b3a2a" strokeWidth="1.5" fill="none"/>
        {/* Dead tree */}
        <rect x="7" y="24" width="3" height="14" fill="#44403c"/>
        <line x1="8.5" y1="30" x2="4" y2="25" stroke="#44403c" strokeWidth="2"/>
        <line x1="8.5" y1="33" x2="13" y2="28" stroke="#44403c" strokeWidth="2"/>
        {/* Empty pot */}
        <ellipse cx="44" cy="37" rx="6" ry="4" fill="#b45309" opacity=".8"/>
        <rect x="38" y="33" width="12" height="6" rx="1" fill="#92400e"/>
      </svg>
    ),
    accent:"#ca8a04", bg:"#fefce8", border:"#fde68a",
    severity:"Low", sevColor:"#22c55e",
    tip:"पानी बचाएं / Conserve water urgently",
    helpline:"Emergency: 112",
    stat:"Affects over 33% of India annually",
    steps:["Conserve water — fix all leaks immediately","Store drinking water in clean containers","Use water from wells and borewells carefully","Report water scarcity to local authorities","Avoid growing water-intensive crops","Protect livestock with shade and adequate water","Keep emergency supply of food and water","Follow state government drought relief schemes"]
  },
  {
    type:"accident", label:"Accident / दुर्घटना",
    icon:(
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <circle cx="28" cy="28" r="28" fill="#fff1f2"/>
        {/* Road */}
        <rect x="4" y="36" width="48" height="12" rx="2" fill="#374151"/>
        <line x1="28" y1="36" x2="28" y2="48" stroke="white" strokeWidth="1.5" strokeDasharray="3,3"/>
        {/* Crashed car */}
        <rect x="6" y="26" width="20" height="11" rx="2" fill="#dc2626"/>
        <rect x="8" y="22" width="14" height="8" rx="2" fill="#b91c1c"/>
        <rect x="10" y="24" width="5" height="5" fill="#bfdbfe" opacity=".8"/>
        <rect x="16" y="24" width="5" height="5" fill="#bfdbfe" opacity=".5"/>
        <circle cx="10" cy="38" r="3.5" fill="#111"/><circle cx="10" cy="38" r="2" fill="#6b7280"/>
        <circle cx="22" cy="38" r="3.5" fill="#111"/><circle cx="22" cy="38" r="2" fill="#6b7280"/>
        {/* Ambulance */}
        <rect x="30" y="25" width="22" height="12" rx="2" fill="white"/>
        <rect x="30" y="25" width="22" height="4" fill="#ef4444"/>
        <rect x="32" y="29" width="7" height="6" fill="#bfdbfe" opacity=".8"/>
        <rect x="43" y="28" width="3" height="6" rx="1" fill="#ef4444"/>
        <rect x="40" y="30" width="9" height="2.5" rx="1" fill="#ef4444"/>
        <circle cx="35" cy="38" r="3.5" fill="#111"/><circle cx="35" cy="38" r="2" fill="#6b7280"/>
        <circle cx="48" cy="38" r="3.5" fill="#111"/><circle cx="48" cy="38" r="2" fill="#6b7280"/>
        {/* Cones */}
        <polygon points="4,36 7,36 5.5,30" fill="#f97316"/>
        <polygon points="26,36 29,36 27.5,30" fill="#f97316"/>
        {/* 112 badge */}
        <rect x="4" y="44" width="12" height="6" rx="1.5" fill="#ef4444"/>
        <text x="10" y="49" textAnchor="middle" fill="white" fontSize="4.5" fontWeight="bold">112</text>
      </svg>
    ),
    accent:"#e11d48", bg:"#fff1f2", border:"#fecdd3",
    severity:"Medium", sevColor:"#f97316",
    tip:"112 पर कॉल करें / Call 112 immediately",
    helpline:"Ambulance: 102",
    stat:"Golden Hour — first 60 minutes critical",
    steps:["Call 112 (all emergency) immediately","Do NOT move an injured person unless in danger","Keep the person awake and talking if possible","Apply pressure to stop any bleeding","Do not give food or water to injured person","Clear the area to let emergency vehicles through","Note the exact location to tell the dispatcher","Stay with victim until ambulance arrives"]
  },
];

function EmergencyTypesSection({ go, lang }) {
  const [active, setActive] = useState(null);
  const [step,   setStep]   = useState(0);
  const panelRef = useRef(null);

  const sel = EM_DATA.find(e => e.type === active);

  useEffect(() => {
    if (active && panelRef.current) {
      setTimeout(() => {
        panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [active]);

  return (
    <section style={{ background:"#fffbf5", padding:"0 0 8px" }}>

      {/* ── Decorative header band — saffron/white/green tricolor accent ── */}
      <div style={{ background:"white", borderBottom:"1px solid #fde68a", padding:"24px 20px 20px" }}>

        {/* Tricolor stripe */}
        <div style={{ display:"flex", height:4, borderRadius:999, overflow:"hidden", marginBottom:18, gap:2 }}>
          <div style={{ flex:1, background:"#f97316" }}/>
          <div style={{ flex:1, background:"white", border:"1px solid #e5e7eb" }}/>
          <div style={{ flex:1, background:"#22c55e" }}/>
        </div>

        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              {/* Ashoka Chakra–inspired icon */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" stroke="#1a4fa0" strokeWidth="1.5"/>
                <circle cx="11" cy="11" r="3.5" fill="#1a4fa0"/>
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
                  <line key={i} x1={11+Math.cos(a*Math.PI/180)*4} y1={11+Math.sin(a*Math.PI/180)*4}
                    x2={11+Math.cos(a*Math.PI/180)*8.5} y2={11+Math.sin(a*Math.PI/180)*8.5}
                    stroke="#1a4fa0" strokeWidth="1.2" strokeLinecap="round"/>
                ))}
              </svg>
              <span style={{ fontFamily:"Sora,sans-serif", fontSize:"0.7rem", fontWeight:700,
                color:"#1a4fa0", textTransform:"uppercase", letterSpacing:1.5 }}>
                आपदा प्रबंधन · Aapada Prabandhan
              </span>
            </div>
            <h2 style={{ fontFamily:"Sora,sans-serif", fontSize:"1.6rem", fontWeight:700,
              color:"#0f1d3a", lineHeight:1.1 }}>
              {t(lang,"emergencyTypes")}
            </h2>
            <p style={{ fontSize:"0.78rem", color:"#78716c", marginTop:4 }}>
              {t(lang,"tapCard")}
            </p>
          </div>
          {active && (
            <button onClick={()=>{ setActive(null); setStep(0); }}
              style={{ flexShrink:0, background:"white", border:"1.5px solid #e5e7eb",
                borderRadius:999, padding:"5px 14px", fontSize:"0.75rem", color:"#6b7280",
                cursor:"pointer", fontWeight:600, marginTop:4 }}>
              ✕ {t(lang,"close")}
            </button>
          )}
        </div>
      </div>

      {/* ── 4×2 card grid ── */}
      <div style={{ padding:"20px 20px 4px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {EM_DATA.map((em, i) => {
            const isActive = active === em.type;
            return (
              <button key={em.type} className="em-card em-fadein"
                onClick={() => { setActive(isActive ? null : em.type); setStep(0); }}
                style={{
                  animationDelay:(i*0.05) + "s",
                  background: isActive ? em.bg : "white",
                  border: isActive ? "2px solid " + em.accent : "2px solid #f3f4f6",
                  borderRadius:16, padding:"14px 8px 12px",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                  boxShadow: isActive
                    ? "0 4px 20px " + em.accent + "30"
                    : "0 1px 4px rgba(0,0,0,.06)",
                }}>
                {/* Icon */}
                <div style={{ transition:"transform .2s" }}>
                  {em.icon}
                </div>
                {/* Label */}
                <div style={{ fontFamily:"Sora,sans-serif", fontSize:"0.8rem", fontWeight:700,
                  color: isActive ? em.accent : "#1f2937", textAlign:"center", lineHeight:1.3 }}>
                  {em.label.split(" / ")[0]}
                </div>
                {/* Hindi label */}
                <div style={{ fontSize:"0.67rem", color: isActive ? em.accent : "#9ca3af",
                  fontWeight:500, textAlign:"center" }}>
                  {em.label.split(" / ")[1]}
                </div>
                {/* Severity dot */}
                <div style={{ width:7, height:7, borderRadius:"50%",
                  background: em.sevColor, marginTop:-2 }}/>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Expanded panel ── */}
      {sel && (
        <div ref={panelRef} className="em-fadein" style={{ margin:"12px 20px 8px", background:"white",
          borderRadius:20, overflow:"hidden",
          border:"1.5px solid " + sel.border,
          boxShadow:"0 4px 24px " + sel.accent + "14" }}>

          {/* Panel header — warm saffron-tinted banner */}
          <div style={{ padding:"20px 22px 18px",
            background:"linear-gradient(135deg, " + sel.bg + " 0%, white 100%)",
            borderBottom:"1px solid " + sel.border }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              {/* Large icon */}
              <div style={{ flexShrink:0 }}>{sel.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:5 }}>
                  <h3 style={{ fontFamily:"Sora,sans-serif", fontSize:"1.5rem",
                    fontWeight:800, color:"#0f1d3a" }}>
                    {sel.label.split(" / ")[0]}
                  </h3>
                  <span style={{ fontFamily:"Sora,sans-serif", fontSize:"1rem",
                    color: sel.accent, fontWeight:600 }}>
                    {sel.label.split(" / ")[1]}
                  </span>
                  <span style={{ background: sel.sevColor+"15",
                    border:"1px solid " + sel.sevColor + "55",
                    color: sel.sevColor, padding:"2px 10px", borderRadius:999,
                    fontSize:"0.67rem", fontWeight:700 }}>
                    {sel.severity} Risk
                  </span>
                </div>
                <div style={{ fontSize:"0.8rem", color:"#78716c" }}>{sel.stat}</div>
                {/* Helpline pill */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:6,
                  background: sel.accent+"12", border:"1px solid " + sel.accent + "33",
                  borderRadius:999, padding:"3px 12px", marginTop:8,
                  fontSize:"0.75rem", fontWeight:700, color:sel.accent }}>
                  <Ic n="phone" c={sel.accent} s={12}/> {sel.helpline}
                </div>
              </div>
            </div>

            {/* First action — saffron accent strip */}
            <div style={{ marginTop:14, background:"white", borderRadius:12,
              border:"1px solid " + sel.accent + "25", padding:"12px 14px",
              display:"flex", alignItems:"flex-start", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:sel.accent+"15",
                border:"1.5px solid " + sel.accent + "33", display:"flex", alignItems:"center",
                justifyContent:"center", flexShrink:0 }}>
                <Ic n="warn" c={sel.accent} s={16}/>
              </div>
              <div>
                <div style={{ fontSize:"0.67rem", fontWeight:700, color:sel.accent,
                  textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>
                  पहला कदम · First Action
                </div>
                <div style={{ fontSize:"0.92rem", fontWeight:700, color:"#0f1d3a", lineHeight:1.4 }}>
                  {sel.tip}
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-step guide */}
          <div style={{ padding:"18px 22px 20px" }}>
            <div style={{ fontSize:"0.68rem", fontWeight:700, color:"#9ca3af",
              textTransform:"uppercase", letterSpacing:1, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
              <Ic n="shield" c="#9ca3af" s={13}/>
              Safety Steps
            </div>

            {/* Number pills row */}
            <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
              {sel.steps.map((_, i) => (
                <button key={i} onClick={() => setStep(i)}
                  style={{ width:32, height:32, borderRadius:"50%", border:"none",
                    cursor:"pointer", fontWeight:700, fontSize:"0.8rem",
                    transition:"all .18s",
                    background: step === i
                      ? sel.accent
                      : step > i ? sel.accent+"22" : "#f3f4f6",
                    color: step === i ? "white" : step > i ? sel.accent : "#9ca3af",
                    boxShadow: step === i ? "0 2px 10px " + sel.accent + "40" : "none",
                    transform: step === i ? "scale(1.15)" : "scale(1)",
                  }}>
                  {step > i ? "✓" : i+1}
                </button>
              ))}
            </div>

            {/* Active step card */}
            <div key={step} className="em-step-anim"
              style={{ background: sel.bg, border:"1px solid " + sel.border,
                borderRadius:14, padding:"16px 16px", marginBottom:14,
                borderLeft:"4px solid " + sel.accent }}>
              <div style={{ fontSize:"0.68rem", fontWeight:700, color:sel.accent,
                textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>
                Step {step + 1} / {sel.steps.length}
              </div>
              <p style={{ fontSize:"0.93rem", color:"#1f2937", lineHeight:1.65, fontWeight:500 }}>
                {sel.steps[step]}
              </p>
            </div>

            {/* Prev / Next */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
              <button onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}
                style={{ padding:"9px 20px", borderRadius:10,
                  border:"1.5px solid #e5e7eb", background: step===0 ? "#f9fafb" : "white",
                  color: step===0 ? "#d1d5db" : "#374151",
                  fontSize:"0.82rem", fontWeight:600, cursor: step===0 ? "default":"pointer" }}>
                ← पिछला
              </button>

              {/* progress dots */}
              <div style={{ display:"flex", gap:5 }}>
                {sel.steps.map((_,i) => (
                  <div key={i} onClick={() => setStep(i)} style={{ cursor:"pointer",
                    width: step===i ? 18 : 7, height:7, borderRadius:4,
                    background: step===i ? sel.accent : step>i ? sel.accent+"55" : "#e5e7eb",
                    transition:"all .2s" }}/>
                ))}
              </div>

              <button onClick={() => setStep(s => Math.min(sel.steps.length-1, s+1))}
                disabled={step===sel.steps.length-1}
                style={{ padding:"9px 20px", borderRadius:10, border:"none",
                  background: step===sel.steps.length-1 ? "#f3f4f6"
                    : "linear-gradient(135deg," + sel.accent + "dd," + sel.accent + ")",
                  color: step===sel.steps.length-1 ? "#d1d5db" : "white",
                  fontSize:"0.82rem", fontWeight:700,
                  cursor: step===sel.steps.length-1 ? "default":"pointer",
                  boxShadow: step===sel.steps.length-1 ? "none" : "0 2px 8px " + sel.accent + "40" }}>
                अगला →
              </button>
            </div>

            {/* Bottom CTA row */}
            <div style={{ display:"flex", gap:8, marginTop:14 }}>
              <button onClick={() => go("hospitals")}
                style={{ flex:1, padding:"11px 8px", borderRadius:12,
                  border:"1.5px solid #e5e7eb", background:"white",
                  color:"#1a4fa0", fontSize:"0.8rem", fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <><Ic n="hospital" c="#1a4fa0" s={14}/> Find Hospital</>
              </button>
              <button onClick={() => window.location.href="tel:" + sel.helpline.split(": ")[1]}
                style={{ flex:1, padding:"11px 8px", borderRadius:12, border:"none",
                  background:"linear-gradient(135deg," + sel.accent + "dd," + sel.accent + ")",
                  color:"white", fontSize:"0.8rem", fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                  boxShadow:"0 2px 10px " + sel.accent + "35" }}>
                <><Ic n="phone" c="white" s={14}/> Call {sel.helpline.split(": ")[1]}</>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
function PageMap({mapR,mapF,setMapF,onRoute,lang}){
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState("");
  const topRef = useRef(null);
  const cols={hospital:"#ef4444",shelter:"#22c55e",fire:T.orange,police:"#3b82f6"};
  const bgCols={hospital:"#fef2f2",shelter:"#f0fdf4",fire:"#fff7ed",police:"#eff6ff"};
  const gradients={hospital:"linear-gradient(135deg,#dc2626,#ef4444)",shelter:"linear-gradient(135deg,#16a34a,#22c55e)",fire:"linear-gradient(135deg,#ea580c,"+T.orange+")",police:"linear-gradient(135deg,#2563eb,#3b82f6)"};

  const allResources=[...mapR].map(r=>({
    ...r,d:Math.round(AI.dist(AI.lat,AI.lng,r.lat,r.lng)*10)/10
  })).sort((a,b)=>a.d-b.d);

  const filtered=search ? allResources.filter(r=>r.name.toLowerCase().includes(search.toLowerCase())) : allResources;
  const sel=selected ? allResources.find(r=>r.id===selected) : null;

  const vbSize=Math.round(800/zoom), vbX=Math.round((800-vbSize)/2), vbY=Math.round((500-Math.round(500/zoom))/2);

  const handlePinClick=(e,rid)=>{
    e.stopPropagation();
    setSelected(selected===rid?null:rid);
    if(selected!==rid){
      setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),60);
    }
  };

  return(
    <div className="af-page" ref={topRef}>

      {/* ── Hero header strip ── */}
      <div style={{background:"linear-gradient(135deg,"+T.blueDk+" 0%,"+T.blue+" 100%)",padding:"20px 20px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 80% 50%,rgba(255,255,255,.06) 0%,transparent 60%)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.6rem",fontWeight:800,color:"white",marginBottom:4,display:"flex",alignItems:"center",gap:10}}>
            <Ic n="map" c="white" s={18}/>
            {resourceMapsLabel(lang)}
          </h2>
          <p style={{fontSize:"0.81rem",color:"rgba(255,255,255,.7)",marginBottom:14}}>{t(lang,"aiCalc")}</p>
          {/* Search */}
          <div style={{position:"relative"}}>
            <svg style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder={t(lang,"searchHospitals") + " / " + t(lang,"searchShelters")}
              style={{width:"100%",padding:"10px 14px 10px 36px",border:"none",
                borderRadius:12,fontSize:"0.86rem",outline:"none",
                background:"rgba(255,255,255,.15)",color:"white",backdropFilter:"blur(8px)"}}/>
          </div>
        </div>
      </div>

      {/* Selected resource detail — scrolls to top on pin click */}
      {sel&&(
        <div className="em-fadein" style={{margin:"0",borderBottom:"1px solid "+T.border}}>
          {/* Full-width accent header */}
          <div style={{background:gradients[sel.type]||"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",padding:"18px 20px"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{width:52,height:52,borderRadius:16,background:"rgba(255,255,255,.2)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem",flexShrink:0}}>
                {sel.icon}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"white",fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.05rem",marginBottom:3}}>{sel.name}</div>
                <div style={{color:"rgba(255,255,255,.75)",fontSize:"0.78rem",marginBottom:6}}>{sel.address}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span style={{background:"rgba(255,255,255,.2)",color:"white",padding:"3px 10px",borderRadius:999,fontSize:"0.72rem",fontWeight:700}}>{sel.d} km away</span>
                  {sel["24h"]&&<span style={{background:"rgba(255,255,255,.2)",color:"white",padding:"3px 10px",borderRadius:999,fontSize:"0.72rem",fontWeight:700}}>24H Open</span>}
                  {sel.govt&&<span style={{background:"rgba(255,255,255,.15)",color:"white",padding:"3px 10px",borderRadius:999,fontSize:"0.72rem",fontWeight:700}}>Govt</span>}
                </div>
              </div>
              <button onClick={()=>setSelected(null)}
                style={{background:"rgba(255,255,255,.2)",border:"none",color:"white",
                  width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:"0.9rem",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                ✕
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",background:"white",
            borderBottom:"1px solid "+T.border}}>
            {[
              sel.availableBeds!=null && [sel.availableBeds+" / "+sel.beds,"Beds","#22c55e"],
              sel.available!=null && [sel.available+" / "+sel.capacity,"Spots","#22c55e"],
              sel.phone && [sel.phone,"Phone",T.blue],
              sel.score!=null && [sel.score+"/10","AI Score",T.orange],
            ].filter(Boolean).slice(0,3).map(([val,lbl,c])=>(
              <div key={lbl} style={{padding:"12px 10px",textAlign:"center",borderRight:"1px solid "+T.border}}>
                <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.92rem",color:c}}>{val}</div>
                <div style={{fontSize:"0.66rem",color:T.textL,marginTop:2}}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Specialties */}
          {sel.specialties&&(
            <div style={{padding:"12px 16px",background:"white",borderBottom:"1px solid "+T.border,display:"flex",gap:5,flexWrap:"wrap"}}>
              {sel.specialties.map(s=>(
                <span key={s} style={{fontSize:"0.72rem",background:T.bg2,color:T.blue,padding:"3px 10px",borderRadius:999,fontWeight:600}}>{s}</span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div style={{padding:"12px 16px",background:"white",display:"flex",gap:10}}>
            <button onClick={()=>onRoute(sel)}
              style={{flex:2,padding:"12px",borderRadius:12,border:"none",
                background:"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",
                color:"white",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <><Ic n="map" c="white" s={15}/> Get Directions</>
            </button>
            {sel.phone&&(
              <button onClick={()=>window.location.href="tel:"+sel.phone}
                style={{flex:1,padding:"12px",borderRadius:12,
                  border:"1.5px solid "+(cols[sel.type]||T.border),
                  background:bgCols[sel.type]||T.bg,
                  color:cols[sel.type]||T.blue,fontWeight:700,fontSize:"0.88rem",cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <><Ic n="phone" c={cols[sel.type]||T.blue} s={15}/> Call</>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter pills */}
      <div style={{display:"flex",gap:7,padding:"12px 16px",overflowX:"auto",background:T.white,borderBottom:"1px solid "+T.border}}>
        {[["all","all",t(lang,"all")],["hospital","hospital",t(lang,"hospitals")],
          ["shelter","shelter",t(lang,"shelters")],["fire","fire",t(lang,"fire")],
          ["police","police",t(lang,"police")]].map(([v,ic,l])=>(
          <button key={v} onClick={()=>{setMapF(v);setSelected(null);}}
            style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:999,
              border:"1.5px solid "+(mapF===v?T.blue:T.border),
              background:mapF===v?T.blue:"white",
              color:mapF===v?"white":T.text2,
              fontSize:"0.79rem",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all .18s",flexShrink:0}}>
            {ic!=="all"&&<Ic n={ic} c={mapF===v?"white":T.text2} s={13}/>}
            {l}
          </button>
        ))}
      </div>

      {/* Interactive SVG Map */}
      <div style={{margin:"12px 16px",borderRadius:18,overflow:"hidden",
        boxShadow:"0 8px 32px rgba(26,79,160,.2)",
        border:"1.5px solid "+T.border,background:"#e8f0fe",position:"relative",height:340}}>

        <svg viewBox={vbX+" "+vbY+" "+vbSize+" "+Math.round(500/zoom)}
          style={{width:"100%",height:"100%",cursor:"default"}}
          onClick={()=>setSelected(null)}>

          <defs>
            <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25"/>
            </filter>
          </defs>

          {/* Background */}
          <rect x="-100" y="-100" width="1000" height="700" fill="#dce8f8"/>
          {/* Park / green areas */}
          <ellipse cx="150" cy="180" rx="60" ry="35" fill="#dcfce7" opacity=".7"/>
          <ellipse cx="650" cy="320" rx="50" ry="28" fill="#dcfce7" opacity=".6"/>
          {/* City blocks */}
          {[[80,80,55,40],[160,120,70,35],[240,90,45,50],[580,150,55,45],[640,200,60,35],[500,90,40,40]].map(([x,y,w,h],i)=>(
            <rect key={"blk"+i} x={x} y={y} width={w} height={h} rx="4" fill="#c8d9f0" opacity=".5"/>
          ))}
          {/* Grid */}
          {[100,200,300,400,500,600,700].map(x=>(
            <line key={"gx"+x} x1={x} y1="0" x2={x} y2="500" stroke="#c4d3ef" strokeWidth="0.8" opacity=".6"/>
          ))}
          {[100,200,300,400].map(y=>(
            <line key={"gy"+y} x1="0" y1={y} x2="800" y2={y} stroke="#c4d3ef" strokeWidth="0.8" opacity=".6"/>
          ))}
          {/* River */}
          <path d="M0 395 Q80 375 180 388 Q300 405 430 398 Q570 385 680 402 Q750 410 800 406"
            stroke="#60a5fa" strokeWidth="14" fill="none" opacity="0.45" strokeLinecap="round"/>
          <path d="M0 395 Q80 375 180 388 Q300 405 430 398 Q570 385 680 402 Q750 410 800 406"
            stroke="#93c5fd" strokeWidth="7" fill="none" opacity="0.5" strokeLinecap="round"/>
          {/* Major road */}
          <path d="M0 255 Q150 248 300 255 Q450 262 600 255 Q700 250 800 255" stroke="white" strokeWidth="6" fill="none" opacity=".7"/>
          <path d="M0 255 Q150 248 300 255 Q450 262 600 255 Q700 250 800 255" stroke="#e2e8f0" strokeWidth="4" fill="none"/>
          <path d="M395 0 L395 500" stroke="white" strokeWidth="4" fill="none" opacity=".7"/>
          <path d="M395 0 L395 500" stroke="#e2e8f0" strokeWidth="2.5" fill="none"/>
          {/* Hills */}
          <path d="M480 0 Q520 35 555 60 Q585 40 615 65 Q645 42 675 58 Q705 30 740 50 Q765 18 800 35 L800 0 Z" fill="#a7f3d0" opacity=".3"/>
          {/* Road labels */}
          <text x="400" y="248" textAnchor="middle" fontSize="7" fill="#94a3b8">Rajpur Road</text>
          <text x="140" y="263" textAnchor="middle" fontSize="7" fill="#94a3b8">Haridwar Rd</text>
          <text x="50" y="400" fontSize="8" fill="#93c5fd" opacity=".9">Ganga</text>

          {/* Connecting lines */}
          {filtered.map(r=>{
            const c=cols[r.type]||"#888";
            const x=r.coords?.x||400, y=r.coords?.y||250;
            const isSel=selected===r.id;
            return(
              <line key={"ln"+r.id} x1="338" y1="242" x2={x} y2={y}
                stroke={c} strokeWidth={isSel?2.5:1} strokeDasharray="6,4"
                opacity={isSel?0.7:0.2} style={{transition:"all .3s"}}/>
            );
          })}

          {/* Resource pins */}
          {filtered.map(r=>{
            const c=cols[r.type]||"#888";
            const x=r.coords?.x||400, y=r.coords?.y||250;
            const isSel=selected===r.id;
            const scale=isSel?1.3:1;
            const ox=(x-(x*scale))/scale, oy=(y-(y*scale))/scale;
            return(
              <g key={r.id} style={{cursor:"pointer",transform:isSel?"scale(1.3)":"scale(1)",transformOrigin:x+"px "+y+"px",transition:"transform .25s cubic-bezier(.34,1.56,.64,1)"}}
                onClick={e=>handlePinClick(e,r.id)}>
                {isSel&&<circle cx={x} cy={y} r="26" fill={c} opacity="0.12"/>}
                {/* Drop shadow */}
                <ellipse cx={x+1} cy={y+17} rx="8" ry="3" fill="rgba(0,0,0,.18)"/>
                {/* Teardrop pin */}
                <path d={"M"+x+","+(y+13)+" C"+(x-8)+","+(y+4)+" "+(x-10)+","+(y-6)+" "+(x-10)+","+(y-9)+" A10,10 0 1,1 "+(x+10)+","+(y-9)+" C"+(x+10)+","+(y-6)+" "+(x+8)+","+(y+4)+" "+x+","+(y+13)+" Z"}
                  fill={c} filter="url(#pin-shadow)" stroke={isSel?"white":"rgba(255,255,255,.6)"} strokeWidth={isSel?2:1}/>
                <text x={x} y={y+1} textAnchor="middle" fontSize="9" fill="white" style={{pointerEvents:"none"}}>{r.icon}</text>
                {/* Label */}
                <text x={x} y={y+24} textAnchor="middle" fontSize="8" fill={c} fontWeight="700" style={{pointerEvents:"none",filter:"drop-shadow(0 1px 1px white)"}}>
                  {r.name.split(" ").slice(0,2).join(" ")}
                </text>
                {/* Distance badge */}
                <rect x={x-16} y={y+27} width={32} height={11} rx={5} fill="white" opacity=".9"/>
                <text x={x} y={y+35} textAnchor="middle" fontSize="7.5" fill={c} fontWeight="700">{r.d}km</text>
              </g>
            );
          })}

          {/* User pin */}
          <circle cx="338" cy="242" r="25" fill={T.blue} opacity="0.1"/>
          <circle cx="338" cy="242" r="16" fill={T.blue} stroke="white" strokeWidth="3" filter="url(#pin-shadow)"/>
          <circle cx="338" cy="242" r="6" fill="white"/>
          <text x="338" y="266" textAnchor="middle" fontSize="9" fill={T.blue} fontWeight="800">YOU</text>
        </svg>

        {/* Zoom controls */}
        <div style={{position:"absolute",top:10,right:10,display:"flex",flexDirection:"column",gap:5}}>
          {[["+",()=>setZoom(z=>Math.min(3,+(z+0.4).toFixed(1)))],["-",()=>setZoom(z=>Math.max(0.6,+(z-0.4).toFixed(1)))]].map(([l,a])=>(
            <button key={l} onClick={a}
              style={{width:34,height:34,borderRadius:10,background:"white",border:"none",
                fontSize:"1.2rem",fontWeight:700,cursor:"pointer",
                boxShadow:"0 2px 10px rgba(0,0,0,.15)",
                display:"flex",alignItems:"center",justifyContent:"center",color:T.blue}}>
              {l}
            </button>
          ))}
          <button onClick={()=>setZoom(1)}
            style={{width:34,height:34,borderRadius:10,background:"white",border:"none",
              fontSize:"0.65rem",fontWeight:700,cursor:"pointer",
              boxShadow:"0 2px 10px rgba(0,0,0,.15)",color:T.text2}}>
            1:1
          </button>
        </div>

        {/* Legend */}
        <div style={{position:"absolute",bottom:10,left:10,background:"rgba(255,255,255,.96)",
          borderRadius:12,padding:"8px 12px",boxShadow:"0 2px 12px rgba(0,0,0,.12)",fontSize:"0.68rem"}}>
          {[["#ef4444","Hospital"],["#22c55e","Shelter"],[T.orange,"Fire"],[T.blue,"You"]].map(([c,l])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
              <span style={{width:9,height:9,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0,boxShadow:"0 0 4px "+c+"60"}}/>{l}
            </div>
          ))}
        </div>

        {/* Tap hint */}
        {!selected&&(
          <div style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",
            borderRadius:8,padding:"5px 10px",fontSize:"0.67rem",color:"white",fontWeight:500}}>
            Tap a pin for details
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,margin:"0 16px 12px",background:T.border,borderRadius:12,overflow:"hidden"}}>
        {[["hospital",allResources.filter(r=>r.type==="hospital").length,"Hospitals","#ef4444"],
          ["shelter",allResources.filter(r=>r.type==="shelter").length,"Shelters","#22c55e"],
          ["fire",allResources.filter(r=>r.type==="fire").length,"Fire",""+T.orange],
          ["police",allResources.filter(r=>r.type==="police").length,"Police","#3b82f6"]
        ].map(([ic,cnt,lb,c])=>(
          <div key={lb} style={{background:T.white,padding:"10px 6px",textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:4}}>
              <Ic n={ic} c={c} s={18}/>
            </div>
            <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.1rem",color:c}}>{cnt}</div>
            <div style={{fontSize:"0.64rem",color:T.textL}}>{lb}</div>
          </div>
        ))}
      </div>

      {/* Resource list */}
      <div style={{padding:"0 16px 28px",display:"flex",flexDirection:"column",gap:8}}>
        <div style={{fontSize:"0.78rem",fontWeight:600,color:T.text2,marginBottom:2}}>
          {filtered.length} resources sorted by distance
        </div>
        {filtered.map(r=>(
          <button key={r.id}
            onClick={e=>handlePinClick(e,r.id)}
            style={{display:"flex",alignItems:"center",gap:12,padding:"13px 14px",
              background:selected===r.id?(bgCols[r.type]||T.bg2):T.white,
              borderRadius:14,cursor:"pointer",border:"1.5px solid "+(selected===r.id?(cols[r.type]||T.border):T.border),
              textAlign:"left",width:"100%",transition:"all .2s",
              boxShadow:selected===r.id?"0 4px 16px "+(cols[r.type]||T.blue)+"25":T.sh}}>
            <div style={{width:42,height:42,borderRadius:12,background:bgCols[r.type]||T.bg,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0,
              border:"1.5px solid "+(selected===r.id?(cols[r.type]||T.border):"transparent"),
              transition:"all .2s"}}>
              {r.icon}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:"0.88rem",color:T.text,marginBottom:2}}>{r.name}</div>
              <div style={{fontSize:"0.72rem",color:T.text2}}>{r.address}</div>
              {r.phone&&<div style={{fontSize:"0.69rem",color:T.textL,marginTop:1}}>{r.phone}</div>}
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.92rem",color:cols[r.type]||T.blue}}>{r.d} km</div>
              {r.availableBeds!=null&&<div style={{fontSize:"0.67rem",color:"#22c55e",fontWeight:600,marginTop:2}}>{r.availableBeds} beds</div>}
              {r.available!=null&&<div style={{fontSize:"0.67rem",color:"#22c55e",fontWeight:600,marginTop:2}}>{r.available} spots</div>}
              <div style={{fontSize:"0.75rem",color:T.textL,marginTop:2}}>→</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}



/* ─── EMERGENCIES ────────────────────────────────────────────────────────── */
function PageEmergencies({dtype,setDtype,alerts,rdesc,setRdesc,rtype,setRtype,onSubmit,lang}){
  const disasterMeta={
    flood:     {icon:"flood",   color:"#2563eb"},
    earthquake:{icon:"mountain",color:"#d97706"},
    fire:      {icon:"fire",    color:"#dc2626"},
    cyclone:   {icon:"wind",    color:"#7c3aed"},
    landslide: {icon:"mountain",color:"#b45309"},
    pandemic:  {icon:"shield",  color:"#166534"},
  };
  const info=DISASTER[dtype];
  const dm=disasterMeta[dtype]||{icon:"warn",color:T.blue};
  const alertIconMap={flood:"flood",rain:"rain",medical:"medical",mountain:"mountain",shield:"shield",warn:"warn",sos:"sos"};
  const alertColorMap={danger:"#ef4444",warning:T.orange,info:T.blue};
  return(
    <div className="af-page">
      <div style={{padding:"20px 20px 0"}}><h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.8rem",color:T.blue,marginBottom:13}}>{t(lang,"emergencies")}</h2></div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap",padding:"0 20px 15px"}}>
        {Object.keys(DISASTER).map(k=>{
          const m=disasterMeta[k]||{icon:"warn",color:T.blue};
          return(
            <button key={k} onClick={()=>setDtype(k)}
              style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:999,
                border:"1.5px solid "+(dtype===k?m.color:T.border),
                background:dtype===k?m.color+"15":"white",
                color:dtype===k?m.color:T.text2,
                fontWeight:dtype===k?700:500,fontSize:"0.82rem",cursor:"pointer",transition:"all .18s"}}>
              <Ic n={m.icon} c={dtype===k?m.color:T.text2} s={14}/>
              {k.charAt(0).toUpperCase()+k.slice(1)}
            </button>
          );
        })}
      </div>
      {info&&(
        <div style={{margin:"0 20px 17px",padding:20,background:T.white,borderRadius:T.r,
          borderLeft:"4px solid " + dm.color,boxShadow:T.sh}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:dm.color+"15",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Ic n={dm.icon} c={dm.color} s={18}/>
            </div>
            <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.15rem",color:dm.color}}>{info.title.replace(/[^\x00-\x7F]+/g,"").trim()}</h3>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {info.steps.map((s,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"9px 13px",background:T.bg,borderRadius:10,fontSize:"0.85rem",alignItems:"flex-start"}}>
                <div style={{width:20,height:20,borderRadius:6,background:dm.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                  <Ic n="check" c="white" s={11}/>
                </div>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{padding:"0 20px 17px"}}>
        <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.15rem",color:T.text,marginBottom:11}}>{t(lang,"reportEm")}</h3>
        <div style={{background:T.white,borderRadius:T.r,padding:20,boxShadow:T.sh,display:"flex",flexDirection:"column",gap:13}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontSize:"0.81rem",fontWeight:600,color:T.text2}}>{t(lang,"emType")}</label>
            <select value={rtype} onChange={e=>setRtype(e.target.value)} style={{border:"1.5px solid " + T.border,borderRadius:10,padding:"9px 12px",fontSize:"0.9rem",outline:"none",background:T.bg}}>
              {["flood","earthquake","fire","landslide","cyclone","medical","other"].map(v=><option key={v} value={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</option>)}
            </select>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontSize:"0.81rem",fontWeight:600,color:T.text2}}>{t(lang,"describe")}</label>
            <textarea rows={3} value={rdesc} onChange={e=>setRdesc(e.target.value)} placeholder={t(lang,"descPlaceholder")}
              style={{border:"1.5px solid " + T.border,borderRadius:10,padding:"9px 12px",fontSize:"0.87rem",outline:"none",resize:"vertical",background:T.bg}}/>
          </div>
          <button onClick={onSubmit}
            style={{display:"flex",alignItems:"center",gap:8,padding:"11px 22px",borderRadius:12,
              border:"none",background:T.orange,color:"white",fontWeight:700,fontSize:"0.87rem",
              cursor:"pointer",alignSelf:"flex-start"}}>
            <Ic n="report" c="white" s={16}/> {t(lang,"submit")}
          </button>
        </div>
      </div>
      <div style={{padding:"0 20px 24px"}}>
        <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.15rem",color:T.text,marginBottom:11}}>{t(lang,"activeAlerts")}</h3>
        {alerts.slice(0,5).map(a=>{
          const ik=alertIconMap[a.icon]||"warn";
          const ac=alertColorMap[a.sev]||T.blue;
          const bg=a.sev==="danger"?"#fef2f2":a.sev==="warning"?"#fff7ed":"#eff6ff";
          return(
            <div key={a.id} style={{display:"flex",gap:12,padding:"13px 13px 13px 17px",background:T.white,borderRadius:T.rs,boxShadow:T.sh,marginBottom:8,position:"relative",overflow:"hidden"}}>
              <SevBar sev={a.sev}/>
              <div style={{width:36,height:36,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n={ik} c={ac} s={17}/>
              </div>
              <div style={{flex:1}}>
                <strong style={{display:"block",fontSize:"0.89rem",marginBottom:3}}>{a.title}</strong>
                <p style={{fontSize:"0.8rem",color:T.text2,lineHeight:1.5}}>{a.desc}</p>
                <span style={{display:"flex",alignItems:"center",gap:4,fontSize:"0.73rem",color:T.textL,marginTop:3}}>
                  <Ic n="clock" c={T.textL} s={11}/> {a.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── HOSPITALS ──────────────────────────────────────────────────────────── */
/* ─── HOSPITALS ──────────────────────────────────────────────────────────── */
function PageHospitals({hospitals,search,setSearch,onRoute,onCall,lang}){
  const [expanded,setExpanded]=useState(null);
  const [filter,setFilter]=useState("all"); // all | govt | pvt | 24h

  const filtered=hospitals.filter(h=>{
    if(filter==="govt") return h.govt;
    if(filter==="pvt") return !h.govt;
    if(filter==="24h") return h["24h"];
    return true;
  });

  const totalBeds=hospitals.reduce((s,h)=>s+(Number(h.beds)||0),0);
  const availBeds=hospitals.reduce((s,h)=>s+(Number(h.availableBeds)||0),0);
  const avgScore=hospitals.length?(hospitals.reduce((s,h)=>s+(h.score||0),0)/hospitals.length).toFixed(1):0;

  return(
    <div className="af-page">
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,"+T.blueDk+","+T.blue+")",padding:"22px 20px 20px"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.6rem",fontWeight:800,color:"white",marginBottom:4}}>
          Hospitals
        </h2>
        <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,.7)",marginBottom:14}}>AI-ranked by distance, availability and specialization</p>
        {/* Stats strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[[availBeds+" beds","Available now","#22c55e"],[hospitals.length+" nearby","In your area",T.orange],[(avgScore||"–")+"/10","Avg AI Score","#a78bfa"]].map(([v,l,c])=>(
            <div key={l} style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"10px 10px",textAlign:"center"}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.1rem",color:c}}>{v}</div>
              <div style={{fontSize:"0.67rem",color:"rgba(255,255,255,.6)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div style={{padding:"14px 16px 10px",background:T.white,borderBottom:"1px solid "+T.border}}>
        <div style={{position:"relative",marginBottom:10}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search hospitals by name or specialty..."
            style={{width:"100%",padding:"10px 14px 10px 36px",border:"1.5px solid "+T.border,borderRadius:12,fontSize:"0.86rem",outline:"none",background:T.bg}}/>
        </div>
        <div style={{display:"flex",gap:6}}>
          {[["all","All"],["24h","24H Open"],["govt","Govt"],["pvt","Private"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              style={{padding:"6px 14px",borderRadius:999,fontSize:"0.76rem",fontWeight:600,cursor:"pointer",border:"1.5px solid "+(filter===v?T.blue:T.border),background:filter===v?T.blue:"white",color:filter===v?"white":T.text2,transition:"all .18s"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital cards */}
      <div style={{padding:"12px 16px 28px",display:"flex",flexDirection:"column",gap:12}}>
        {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:T.textL}}>No hospitals match your filter</div>}
        {filtered.map((h,i)=>{
          const isExp=expanded===h.id;
          const knownBeds=Number(h.availableBeds);
          const bedPct=knownBeds!=null&&Number.isFinite(knownBeds)&&h.beds?Math.round((1-(knownBeds/h.beds))*100):0;
          const bedColor=knownBeds!=null&&Number.isFinite(knownBeds)?(bedPct>80?"#ef4444":bedPct>60?T.orange:"#22c55e"):T.textL;
          return(
            <div key={h.id} style={{background:"white",borderRadius:16,boxShadow:isExp?"0 8px 32px rgba(26,79,160,.18)":T.sh,
              border:"1.5px solid "+(isExp?T.blue:T.border),overflow:"hidden",transition:"all .25s"}}>
              {/* Card header — always visible */}
              <button onClick={()=>setExpanded(isExp?null:h.id)} style={{width:"100%",padding:"14px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  {/* Rank badge */}
                  <div style={{width:40,height:40,borderRadius:12,background:i===0?"linear-gradient(135deg,#f59e0b,#d97706)":i===1?"linear-gradient(135deg,#94a3b8,#64748b)":i===2?"linear-gradient(135deg,#b45309,#92400e)":T.bg2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.95rem",color:i<3?"white":T.blue}}>#{i+1}</div>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                      <span style={{fontWeight:700,fontSize:"0.92rem",color:T.text}}>{h.name}</span>
                      {h.govt&&<span style={{fontSize:"0.62rem",background:"#dbeafe",color:"#1d4ed8",padding:"1px 7px",borderRadius:999,fontWeight:700}}>GOVT</span>}
                      {h["24h"]&&<span style={{fontSize:"0.62rem",background:"#dcfce7",color:"#15803d",padding:"1px 7px",borderRadius:999,fontWeight:700}}>24H</span>}
                    </div>
                    <div style={{fontSize:"0.74rem",color:T.text2,marginBottom:6,display:"flex",alignItems:"center",gap:4}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {h.address}
                    </div>
                    {/* Bed availability bar */}
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:5,background:T.bg2,borderRadius:999,overflow:"hidden"}}>
                        <div style={{width:(knownBeds!=null&&Number.isFinite(knownBeds)?bedPct:35)+"%",height:"100%",background:bedColor,borderRadius:999,transition:"width .5s"}}/>
                      </div>
                      <span style={{fontSize:"0.7rem",fontWeight:700,color:bedColor,whiteSpace:"nowrap"}}>{knownBeds!=null&&Number.isFinite(knownBeds)?(knownBeds+" beds free"):"Availability unknown"}</span>
                    </div>
                  </div>
                  {/* AI Score */}
                  <div style={{textAlign:"center",flexShrink:0}}>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1rem",color:T.orange}}>{h.score||"–"}</div>
                    <div style={{fontSize:"0.6rem",color:T.textL}}>AI Score</div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{marginTop:6,transform:isExp?"rotate(180deg)":"none",transition:"transform .2s"}}>
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {isExp&&(
                <div className="em-fadein" style={{borderTop:"1px solid "+T.border}}>
                  {/* Specialties */}
                  <div style={{padding:"12px 16px",borderBottom:"1px solid "+T.border}}>
                    <div style={{fontSize:"0.7rem",fontWeight:700,color:T.textL,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Specializations</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {h.specialties.map(s=>(
                        <span key={s} style={{fontSize:"0.75rem",fontWeight:600,background:T.bg2,color:T.blue,padding:"3px 10px",borderRadius:999}}>{s}</span>
                      ))}
                    </div>
                  </div>
                  {/* Stats row */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:"1px solid "+T.border}}>
                    {[[h.beds+" total","Total Beds",""],[(h.score||"–")+"/10","AI Score",""],[h.estTime||"–","Est. Drive",""]].map(([v,l])=>(
                      <div key={l} style={{padding:"11px 12px",textAlign:"center",borderRight:"1px solid "+T.border}}>
                        <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.88rem",color:T.text}}>{v}</div>
                        <div style={{fontSize:"0.65rem",color:T.textL,marginTop:2}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {/* Phone + actions */}
                  <div style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,fontSize:"0.82rem",color:T.text2}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <strong style={{color:T.text}}>{h.phone}</strong>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>onRoute(h)}
                        style={{flex:2,padding:"10px",borderRadius:10,border:"none",
                          background:"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",
                          color:"white",fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="3,11 22,2 13,21 11,13"/></svg>
                        Get Directions
                      </button>
                      <button onClick={()=>onCall(h.phone)}
                        style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid #bfdbfe",
                          background:"#eff6ff",color:T.blue,fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── SHELTERS ───────────────────────────────────────────────────────────── */
function PageShelters({shelters,search,setSearch,onRoute,lang}){
  const [expanded,setExpanded]=useState(null);

  const totalCap=shelters.reduce((s,h)=>s+(Number(h.capacity)||0),0);
  const totalOcc=shelters.reduce((s,h)=>s+(Number(h.current)||0),0);
  const totalFree=totalCap-totalOcc;

  return(
    <div className="af-page">
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",padding:"22px 20px 20px"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.6rem",fontWeight:800,color:"white",marginBottom:4}}>
          Emergency Shelters
        </h2>
        <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,.7)",marginBottom:14}}>Active relief camps — Dehradun & Rishikesh</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[[totalFree+" spots","Available now","#4ade80"],[shelters.length+" camps","Active now","#6ee7b7"],
            [Math.round((totalOcc/totalCap)*100)+"%","Occupancy","#fbbf24"]].map(([v,l,c])=>(
            <div key={l} style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"10px",textAlign:"center"}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.05rem",color:c}}>{v}</div>
              <div style={{fontSize:"0.67rem",color:"rgba(255,255,255,.6)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{padding:"12px 16px 10px",background:"white",borderBottom:"1px solid "+T.border}}>
        <div style={{position:"relative"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search shelters..."
            style={{width:"100%",padding:"10px 14px 10px 36px",border:"1.5px solid "+T.border,borderRadius:12,fontSize:"0.86rem",outline:"none",background:T.bg}}/>
        </div>
      </div>

      {/* Shelter cards */}
      <div style={{padding:"12px 16px 28px",display:"flex",flexDirection:"column",gap:12}}>
        {shelters.map((s,i)=>{
          const isExp=expanded===s.id;
          const avail=s.available!==undefined?s.available:(s.capacity-s.current);
          const pct=s.capacity?Math.round(((Number(s.current)||0)/s.capacity)*100):0;
          const barC=pct>85?"#ef4444":pct>65?T.orange:"#22c55e";
          const isNgo=s.supportType==="ngo";
          const urgency=isNgo?"Support Available":pct>85?"Almost Full":pct>65?"Filling Up":"Space Available";
          const urgencyC=isNgo?T.blue:(pct>85?"#ef4444":pct>65?T.orange:"#22c55e");
          return(
            <div key={s.id} style={{background:"white",borderRadius:16,boxShadow:isExp?"0 8px 32px rgba(6,78,59,.15)":T.sh,
              border:"1.5px solid "+(isExp?"#059669":T.border),overflow:"hidden",transition:"all .25s"}}>
              <button onClick={()=>setExpanded(isExp?null:s.id)} style={{width:"100%",padding:"14px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  {/* Status indicator */}
                  <div style={{width:40,height:40,borderRadius:12,background:pct>85?"#fef2f2":pct>65?"#fff7ed":"#f0fdf4",
                    border:"2px solid "+(pct>85?"#fca5a5":pct>65?"#fed7aa":"#86efac"),
                    display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={barC} strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                      <div style={{fontWeight:700,fontSize:"0.92rem",color:T.text}}>{s.name}</div>
                      {isNgo&&<span style={{fontSize:"0.62rem",background:"#dbeafe",color:T.blue,padding:"1px 7px",borderRadius:999,fontWeight:700}}>NGO</span>}
                    </div>
                    <div style={{fontSize:"0.74rem",color:T.text2,marginBottom:7,display:"flex",alignItems:"center",gap:4}}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {s.address}
                    </div>
                    {/* Capacity bar */}
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <div style={{flex:1,height:6,background:T.bg2,borderRadius:999,overflow:"hidden"}}>
                        <div style={{width:(isNgo?40:pct)+"%",height:"100%",background:urgencyC,borderRadius:999,transition:"width .5s"}}/>
                      </div>
                      <span style={{fontSize:"0.7rem",fontWeight:700,color:urgencyC,whiteSpace:"nowrap"}}>{isNgo?"Help center":(avail+" spots")}</span>
                    </div>
                    <span style={{fontSize:"0.68rem",fontWeight:700,color:urgencyC,background:urgencyC+"15",padding:"2px 8px",borderRadius:999}}>{urgency}</span>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.95rem",color:isNgo?T.blue:"#059669"}}>{isNgo?"NGO":avail}</div>
                    <div style={{fontSize:"0.62rem",color:T.textL}}>{isNgo?"support":"of "+s.capacity}</div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{marginTop:8,transform:isExp?"rotate(180deg)":"none",transition:"transform .2s"}}>
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
              </button>

              {isExp&&(
                <div className="em-fadein" style={{borderTop:"1px solid "+T.border}}>
                  {/* Amenities */}
                  <div style={{padding:"12px 16px",borderBottom:"1px solid "+T.border}}>
                    <div style={{fontSize:"0.7rem",fontWeight:700,color:T.textL,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Amenities Available</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {s.amenities.map(a=>(
                        <span key={a} style={{fontSize:"0.75rem",fontWeight:600,background:"#f0fdf4",color:"#15803d",padding:"3px 10px",borderRadius:999,border:"1px solid #86efac",display:"flex",alignItems:"center",gap:4}}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Contact + actions */}
                  <div style={{padding:"12px 16px"}}>
                    {s.contact&&(
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,fontSize:"0.82rem",color:T.text2}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Contact: <strong style={{color:T.text}}>{s.contact}</strong>
                      </div>
                    )}
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>onRoute(s)}
                        style={{flex:2,padding:"10px",borderRadius:10,border:"none",
                          background:"linear-gradient(135deg,#059669,#10b981)",
                          color:"white",fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="3,11 22,2 13,21 11,13"/></svg>
                        Get Directions
                      </button>
                      {s.contact&&(
                        <button onClick={()=>window.location.href="tel:"+s.contact}
                          style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid #a7f3d0",
                            background:"#ecfdf5",color:"#059669",fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                            display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          Call
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {/* SDRF helpline */}
        <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",borderRadius:14,padding:"16px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{color:"white",fontWeight:700,fontSize:"0.88rem",marginBottom:2}}>SDRF Shelter Helpline</div>
            <div style={{color:"rgba(255,255,255,.65)",fontSize:"0.75rem"}}>State Disaster Response Force — 24/7</div>
          </div>
          <a href="tel:1070" style={{padding:"9px 18px",borderRadius:10,background:"#22c55e",color:"white",fontWeight:800,fontSize:"0.9rem",textDecoration:"none",fontFamily:"Sora,sans-serif"}}>1070</a>
        </div>
      </div>
    </div>
  );
}

/* ─── FIRST AID ──────────────────────────────────────────────────────────── */
function PageFirstAid({cat,setCat,lang}){
  const [step,setStep]=useState(0);
  const [completed,setCompleted]=useState({});
  const guide=FIRSTAID[cat];

  const CATS=[
    {k:"cpr",      label:"CPR",          color:"#ef4444", bg:"#fef2f2", icon:"heart",   desc:"Cardiac arrest"},
    {k:"bleeding", label:"Bleeding",     color:"#dc2626", bg:"#fef2f2", icon:"bleed",   desc:"Severe bleeding"},
    {k:"burns",    label:"Burns",        color:"#ea580c", bg:"#fff7ed", icon:"burn",    desc:"Fire & heat"},
    {k:"fracture", label:"Fracture",     color:"#7c3aed", bg:"#f5f3ff", icon:"bone",    desc:"Broken bones"},
    {k:"choking",  label:"Choking",      color:"#0369a1", bg:"#f0f9ff", icon:"choke",   desc:"Airway blocked"},
    {k:"snakebite",label:"Snakebite",    color:"#166534", bg:"#f0fdf4", icon:"snake",   desc:"Venomous bite"},
    {k:"drowning", label:"Drowning",     color:"#1d4ed8", bg:"#eff6ff", icon:"wave",    desc:"Near drowning"},
    {k:"heatstroke",label:"Heatstroke",  color:"#b45309", bg:"#fffbeb", icon:"sun",     desc:"Extreme heat"},
  ];

  const cur=CATS.find(c=>c.k===cat)||CATS[0];

  useEffect(()=>{setStep(0);setCompleted({});},[cat]);

  const toggleDone=(i)=>setCompleted(p=>({...p,[i]:!p[i]}));
  const allDone=guide?guide.steps.every((_,i)=>completed[i]):false;

  return(
    <div className="af-page">

      {/* Hero header with category color */}
      <div style={{background:"linear-gradient(135deg,"+cur.color+","+cur.color+"cc)",padding:"20px 20px 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,top:-10,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
        <div style={{position:"absolute",right:30,top:20,width:70,height:70,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16,position:"relative",zIndex:1}}>
          <div style={{width:52,height:52,borderRadius:16,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Ic n={cur.icon} c="white" s={26}/>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.5rem",fontWeight:800,color:"white",lineHeight:1}}>{guide?.title?.replace(/[^\x00-\x7F]+/g,"").trim()||cur.label}</h2>
            </div>
            <p style={{color:"rgba(255,255,255,.75)",fontSize:"0.8rem",marginTop:3}}>{cur.desc} · {phrase(lang,"visual guide")} · {guide?.steps?.length||0} {phrase(lang,"steps")}</p>
          </div>
        </div>

        {/* Category selector — scrollable chips */}
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:16,position:"relative",zIndex:1}}>
          {CATS.map(c=>(
            <button key={c.k} onClick={()=>setCat(c.k)}
              style={{display:"flex",alignItems:"center",gap:7,padding:"7px 14px",borderRadius:999,
                border:"none",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all .2s",
                background:cat===c.k?"white":cur.color==="white"?"rgba(255,255,255,.15)":"rgba(255,255,255,.15)",
                color:cat===c.k?cur.color:"white",
                fontWeight:cat===c.k?700:500,fontSize:"0.82rem",
                boxShadow:cat===c.k?"0 2px 12px rgba(0,0,0,.2)":"none"}}>
              <span style={{display:"flex",alignItems:"center",opacity:cat===c.k?1:0.8}}>
                <Ic n={c.icon} c={cat===c.k?c.color:"white"} s={14}/>
              </span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {guide&&(
        <div style={{padding:"16px 16px 28px"}}>
          {/* Progress tracker */}
          <div style={{background:T.white,borderRadius:14,padding:"14px 16px",boxShadow:T.sh,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:"0.78rem",fontWeight:700,color:T.text}}>Progress</span>
              <span style={{fontSize:"0.78rem",fontWeight:700,color:cur.color}}>
                {Object.values(completed).filter(Boolean).length} / {guide.steps.length} steps
              </span>
            </div>
            <div style={{display:"flex",gap:4}}>
              {guide.steps.map((_,i)=>(
                <div key={i} style={{flex:1,height:5,borderRadius:999,
                  background:completed[i]?cur.color:i===step?cur.color+"40":T.bg2,
                  transition:"background .3s",cursor:"pointer"}}
                  onClick={()=>setStep(i)}/>
              ))}
            </div>
            {allDone&&(
              <div className="em-fadein" style={{marginTop:10,display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:cur.bg,borderRadius:10,color:cur.color,fontSize:"0.8rem",fontWeight:700}}>
                <Ic n="check" c={cur.color} s={16}/>
                {phrase(lang,"All steps completed — seek medical help immediately!",{hi:"सभी स्टेप पूरे हुए — तुरंत चिकित्सा सहायता लें!",ur:"تمام مراحل مکمل — فوراً طبی مدد لیں!"})}
              </div>
            )}
          </div>

          {/* Active step card */}
          {guide.steps[step]&&(
            <div key={cat+step} className="em-step-anim" style={{background:"white",borderRadius:16,
              boxShadow:"0 6px 28px "+cur.color+"20",
              border:"2px solid "+cur.color+"30",overflow:"hidden",marginBottom:14}}>
              <div style={{padding:"14px 14px 0"}}>
                <StepVisual
                  color={cur.color}
                  title={guide?.title||cur.label}
                  stepNumber={step+1}
                  detail={guide.steps[step].d}
                />
              </div>
              {/* Step header */}
              <div style={{background:"linear-gradient(135deg,"+cur.color+","+cur.color+"bb)",padding:"14px 16px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora,sans-serif",fontWeight:800,color:"white",fontSize:"1rem"}}>
                      {step+1}
                    </div>
                    <span style={{color:"white",fontWeight:700,fontSize:"0.95rem"}}>{guide.steps[step].t}</span>
                  </div>
                  <button onClick={()=>toggleDone(step)}
                    style={{width:28,height:28,borderRadius:8,border:"2px solid "+(completed[step]?"white":"rgba(255,255,255,.5)"),
                      background:completed[step]?"white":"transparent",cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                    {completed[step]&&<Ic n="check" c={cur.color} s={14}/>}
                  </button>
                </div>
              </div>
              {/* Step body */}
              <div style={{padding:"16px 18px"}}>
                <div style={{padding:"8px 10px",borderRadius:10,background:cur.bg,color:cur.color,fontSize:"0.74rem",fontWeight:800,display:"inline-flex",marginBottom:10}}>{phrase(lang,"Watch the motion and copy the action",{hi:"चलती हुई गाइड देखें और वही करें",ur:"حرکت دیکھیں اور اسی عمل کو دہرائیں"})}</div>
                <p style={{fontSize:"0.92rem",color:T.text,lineHeight:1.7}}>{guide.steps[step].d}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
              style={{padding:"11px",borderRadius:12,border:"1.5px solid "+T.border,
                background:step===0?T.bg:"white",color:step===0?T.textL:T.text,
                cursor:step===0?"default":"pointer",fontWeight:600,fontSize:"0.87rem",
                display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
              {phrase(lang,"Previous",{hi:"पिछला",ur:"پچھلا"})}
            </button>
            <button onClick={()=>{toggleDone(step);if(step<guide.steps.length-1)setStep(s=>s+1);}}
              style={{padding:"11px",borderRadius:12,border:"none",
                background:"linear-gradient(135deg,"+cur.color+","+cur.color+"cc)",
                color:"white",cursor:"pointer",fontWeight:700,fontSize:"0.87rem",
                display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              {step===guide.steps.length-1?phrase(lang,"Done",{hi:"पूर्ण",ur:"مکمل"}):phrase(lang,"Next Step",{hi:"अगला स्टेप",ur:"اگلا مرحلہ"})}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,18 15,12 9,6"/></svg>
            </button>
          </div>

          {/* All steps overview */}
          <div style={{background:T.white,borderRadius:14,padding:"14px 16px",boxShadow:T.sh}}>
            <div style={{fontSize:"0.72rem",fontWeight:700,color:T.textL,textTransform:"uppercase",letterSpacing:.8,marginBottom:12}}>{phrase(lang,"All Steps",{hi:"सभी स्टेप",ur:"تمام مراحل"})}</div>
            {guide.steps.map((s,i)=>(
              <button key={i} onClick={()=>setStep(i)}
                style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 0",
                  background:"none",border:"none",borderBottom:i<guide.steps.length-1?"1px solid "+T.border:"none",
                  cursor:"pointer",textAlign:"left",transition:"opacity .2s",
                  opacity:step===i?1:0.65}}>
                <div style={{width:26,height:26,borderRadius:8,flexShrink:0,
                  background:completed[i]?cur.color:step===i?cur.color+"20":T.bg2,
                  display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                  {completed[i]
                    ?<Ic n="check" c="white" s={13}/>
                    :<span style={{fontFamily:"Sora,sans-serif",fontSize:"0.72rem",fontWeight:700,color:step===i?cur.color:T.textL}}>{i+1}</span>
                  }
                </div>
                <span style={{fontSize:"0.84rem",fontWeight:step===i?700:400,color:step===i?T.text:T.text2}}>{s.t}</span>
              </button>
            ))}
          </div>

          {/* Warning box */}
          {guide.warning&&(
            <div style={{marginTop:14,padding:"13px 16px",background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:12,display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{flexShrink:0,marginTop:1}}>
                <Ic n="warn" c="#f97316" s={18}/>
              </div>
              <div>
                <div style={{fontWeight:700,color:"#9a3412",fontSize:"0.84rem",marginBottom:4}}>{phrase(lang,"Important Warning",{hi:"महत्वपूर्ण चेतावनी",ur:"اہم انتباہ"})}</div>
                <p style={{fontSize:"0.82rem",color:"#92400e",lineHeight:1.55}}>{guide.warning}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── ALERTS ─────────────────────────────────────────────────────────────── */
function PageAlerts({alerts,lang}){
  const alertIconMap={flood:"flood",rain:"rain",medical:"medical",mountain:"mountain",shield:"shield",warn:"warn",sos:"sos"};
  const alertColorMap={danger:"#ef4444",warning:T.orange,info:T.blue};
  return(
    <div className="af-page">
      <div style={{padding:"20px 20px 0"}}><h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.8rem",color:T.blue,marginBottom:15}}>{t(lang,"alertsTitle")}</h2></div>
      <div style={{padding:"0 20px 24px"}}>
        {alerts.map(a=>{
          const iconKey=alertIconMap[a.icon]||"warn";
          const ac=alertColorMap[a.sev]||T.blue;
          const bg=a.sev==="danger"?"#fef2f2":a.sev==="warning"?"#fff7ed":"#eff6ff";
          return(
            <div key={a.id} style={{display:"flex",gap:12,padding:"13px 13px 13px 17px",background:T.white,borderRadius:T.rs,boxShadow:T.sh,marginBottom:9,position:"relative",overflow:"hidden"}}>
              <SevBar sev={a.sev}/>
              <div style={{width:38,height:38,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n={iconKey} c={ac} s={18}/>
              </div>
              <div style={{flex:1}}>
                <strong style={{display:"block",fontSize:"0.91rem",marginBottom:3}}>{a.title}</strong>
                <p style={{fontSize:"0.81rem",color:T.text2,lineHeight:1.52}}>{a.desc}</p>
                <span style={{display:"flex",alignItems:"center",gap:4,fontSize:"0.73rem",color:T.textL,marginTop:4}}>
                  <Ic n="clock" c={T.textL} s={12}/> {a.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


/* ─── EMERGENCY CONTACTS ─────────────────────────────────────────────────── */
function PageBloodBank({lang, online}){
  /* Reused as Emergency Contacts Manager */
  const NATIONAL=[
    {label:"All Emergencies",number:"112",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,color:"#ef4444",bg:"#fef2f2",desc:"Police · Fire · Ambulance"},
    {label:"Police",number:"100",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,color:"#1d4ed8",bg:"#eff6ff",desc:"Law enforcement"},
    {label:"Fire Department",number:"101",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,color:"#ea580c",bg:"#fff7ed",desc:"Fire & rescue"},
    {label:"Ambulance",number:"102",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 12h6M12 9v6"/><path d="M2 12h3M19 12h3"/></svg>,color:"#059669",bg:"#ecfdf5",desc:"Medical emergency"},
    {label:"SDRF Uttarakhand",number:"1070",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,color:"#7c3aed",bg:"#f5f3ff",desc:"State Disaster Response"},
    {label:"NDRF",number:"9711077372",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>,color:"#0369a1",bg:"#f0f9ff",desc:"National Disaster Response"},
    {label:"Women Helpline",number:"1091",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,color:"#db2777",bg:"#fdf2f8",desc:"Women in distress"},
    {label:"Child Helpline",number:"1098",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>,color:"#f59e0b",bg:"#fffbeb",desc:"Child in danger"},
    {label:"Mental Health",number:"9152987821",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/><circle cx="12" cy="12" r="10"/></svg>,color:"#6366f1",bg:"#eef2ff",desc:"iCall — mental health crisis"},
    {label:"Senior Citizens",number:"14567",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>,color:"#0891b2",bg:"#ecfeff",desc:"Elder care helpline"},
    {label:"Poison Control",number:"1800-116-117",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,color:"#b45309",bg:"#fffbeb",desc:"Poison & toxin emergency"},
    {label:"Anti-Corruption",number:"1064",icon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>,color:"#64748b",bg:"#f8fafc",desc:"Vigilance helpline"},
  ];

  const [personalStr, setPersonalStr] = useState(()=>{
    try{return localStorage.getItem("af-personal-contacts")||""}catch{return ""}
  });
  const [notes, setNotes] = useState(()=>{
    try{return localStorage.getItem("af-contact-notes")||""}catch{return ""}
  });
  const [tab, setTab] = useState("national"); // national | personal

  const savePersonal=(v)=>{
    setPersonalStr(v);
    try{localStorage.setItem("af-personal-contacts",v)}catch{}
  };
  const saveNotes=(v)=>{
    setNotes(v);
    try{localStorage.setItem("af-contact-notes",v)}catch{}
  };

  const personalContacts=personalStr.split("\n").map(l=>l.trim()).filter(Boolean).map(l=>{
    const m=l.match(/^(.+?):\s*(\d[\d\s\-]+)$/);
    return m?{name:m[1].trim(),number:m[2].trim(),raw:l}:{name:l,number:null,raw:l};
  });

  return(
    <div className="af-page">
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e293b)",padding:"22px 20px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div>
            <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.5rem",fontWeight:800,color:"white",lineHeight:1}}>Emergency Contacts</h2>
            <p style={{fontSize:"0.78rem",color:"#94a3b8",marginTop:3}}>All critical helplines — national & personal</p>
          </div>
        </div>
        {/* Tab bar */}
        <div style={{display:"flex",gap:8,marginTop:4}}>
          {[["national","National Helplines"],["personal","My Contacts"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTab(v)}
              style={{padding:"7px 16px",borderRadius:999,border:"none",cursor:"pointer",fontSize:"0.8rem",fontWeight:700,transition:"all .18s",
                background:tab===v?"white":"rgba(255,255,255,.1)",
                color:tab===v?"#0f172a":"rgba(255,255,255,.7)"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {tab==="national"&&(
        <div style={{padding:"14px 16px 28px",display:"flex",flexDirection:"column",gap:10}}>
          {/* Call 112 hero card */}
          <div style={{background:"linear-gradient(135deg,#dc2626,#ef4444)",borderRadius:16,padding:"18px 18px",display:"flex",alignItems:"center",gap:14,marginBottom:4}}>
            <div style={{width:52,height:52,borderRadius:14,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.4rem",color:"white",lineHeight:1}}>112</div>
              <div style={{color:"rgba(255,255,255,.85)",fontSize:"0.82rem",marginTop:2}}>All Emergencies · Fire · Police · Ambulance</div>
            </div>
            <a href="tel:112" style={{padding:"11px 22px",borderRadius:12,background:"white",color:"#dc2626",fontWeight:800,fontSize:"1rem",textDecoration:"none",fontFamily:"Sora,sans-serif",flexShrink:0}}>CALL</a>
          </div>

          {/* National contacts grid */}
          {NATIONAL.slice(1).map(c=>(
            <div key={c.number} style={{background:"white",borderRadius:14,boxShadow:T.sh,overflow:"hidden",border:"1.5px solid "+T.border}}>
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px"}}>
                <div style={{width:40,height:40,borderRadius:11,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:c.color}}>
                  <c.icon/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:"0.9rem",color:T.text,marginBottom:2}}>{c.label}</div>
                  <div style={{fontSize:"0.72rem",color:T.text2}}>{c.desc}</div>
                </div>
                <a href={"tel:"+c.number.replace(/\-/g,"")}
                  style={{display:"flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:10,
                    background:c.bg,color:c.color,fontWeight:800,fontSize:"0.9rem",
                    textDecoration:"none",border:"1.5px solid "+c.color+"30",
                    fontFamily:"Sora,sans-serif",flexShrink:0}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {c.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="personal"&&(
        <div style={{padding:"14px 16px 28px",display:"flex",flexDirection:"column",gap:14}}>
          {/* Saved contacts display */}
          {personalContacts.length>0&&(
            <div style={{background:"white",borderRadius:14,boxShadow:T.sh,overflow:"hidden"}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid "+T.border,fontSize:"0.73rem",fontWeight:700,color:T.textL,textTransform:"uppercase",letterSpacing:.8}}>
                Saved Contacts ({personalContacts.length})
              </div>
              {personalContacts.map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:i<personalContacts.length-1?"1px solid "+T.border:"none"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:T.bg2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:"0.88rem",color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                    {c.number&&<div style={{fontSize:"0.74rem",color:T.text2}}>{c.number}</div>}
                  </div>
                  {c.number&&(
                    <a href={"tel:"+c.number.replace(/[\s\-]/g,"")}
                      style={{padding:"7px 14px",borderRadius:9,background:"#eff6ff",color:T.blue,fontWeight:700,fontSize:"0.8rem",textDecoration:"none",border:"1.5px solid #bfdbfe",flexShrink:0}}>
                      Call
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add contacts textarea */}
          <div style={{background:"white",borderRadius:14,padding:"16px",boxShadow:T.sh}}>
            <div style={{fontWeight:700,fontSize:"0.86rem",color:T.text,marginBottom:4,display:"flex",alignItems:"center",gap:8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Add Personal Contacts
            </div>
            <div style={{fontSize:"0.74rem",color:T.text2,marginBottom:10}}>Format: Name: Number (one per line)</div>
            <textarea rows={5} value={personalStr} onChange={e=>savePersonal(e.target.value)}
              placeholder={"Dad: 9876543210\nMom: 9812345678\nDr Sharma: 9988776655\nNeighbour Ravi: 9856741230"}
              style={{width:"100%",border:"1.5px solid "+T.border,borderRadius:10,padding:"10px 12px",
                fontSize:"0.85rem",outline:"none",resize:"vertical",background:T.bg,fontFamily:"Inter,sans-serif",lineHeight:1.7}}/>
            <div style={{fontSize:"0.72rem",color:T.textL,marginTop:6,display:"flex",alignItems:"center",gap:4}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Saved only on your device — never uploaded
            </div>
          </div>

          {/* Emergency notes */}
          <div style={{background:"white",borderRadius:14,padding:"16px",boxShadow:T.sh}}>
            <div style={{fontWeight:700,fontSize:"0.86rem",color:T.text,marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="2.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Emergency Notes
            </div>
            <textarea rows={4} value={notes} onChange={e=>saveNotes(e.target.value)}
              placeholder={"Blood group: B+\nAllergies: Penicillin\nDoctor: Dr. Sharma, Doon Hospital\nInsurance: SBI Life Policy #12345"}
              style={{width:"100%",border:"1.5px solid "+T.border,borderRadius:10,padding:"10px 12px",
                fontSize:"0.85rem",outline:"none",resize:"vertical",background:T.bg,fontFamily:"Inter,sans-serif",lineHeight:1.7}}/>
          </div>
        </div>
      )}
    </div>
  );
}

function PagePanic({lang, onCall}){
  const [phase, setPhase] = useState("idle"); // idle | countdown | alerting
  const [seconds, setSeconds] = useState(10);
  const [contactsStr, setContactsStr] = useState(()=>{
    try{return localStorage.getItem("af-panic-contacts")||""}catch{return ""}
  });
  const [note, setNote] = useState("");
  const [interval, setIntervalRef] = useState(null);
  const COUNTDOWN = 10;

  const start = () => {
    setPhase("countdown");
    setSeconds(COUNTDOWN);
    const iv = setInterval(()=>{
      setSeconds(s=>{
        if(s<=1){
          clearInterval(iv);
          setPhase("alerting");
          return 0;
        }
        return s-1;
      });
    },1000);
    setIntervalRef(iv);
  };

  const cancel = () => {
    if(interval) clearInterval(interval);
    setPhase("idle");
    setSeconds(COUNTDOWN);
  };

  const saveContacts = () => {
    try{localStorage.setItem("af-panic-contacts",contactsStr)}catch{}
  };

  const pct = phase==="countdown" ? ((COUNTDOWN-seconds)/COUNTDOWN)*100 : phase==="alerting"?100:0;

  return(
    <div className="af-page">
      <div style={{padding:"20px 20px 0"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.8rem",color:"#dc2626",marginBottom:4}}>{t(lang,"panicTitle")}</h2>
        <p style={{fontSize:"0.84rem",color:T.text2,marginBottom:20}}>{phrase(lang,"Press and hold if you are in danger. Auto-alerts in")} {COUNTDOWN} {phrase(lang,"seconds unless cancelled.")}</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
          {[phrase(lang,"112 ready",{hi:"112 तैयार",ur:"112 تیار"}),phrase(lang,"Silent support",{hi:"साइलेंट सपोर्ट",ur:"خاموش مدد"}),phrase(lang,"Offline safe mode",{hi:"ऑफलाइन सेफ मोड",ur:"آف لائن سیف موڈ"})].map(label=>(
            <span key={label} style={{padding:"5px 10px",borderRadius:999,background:"#fee2e2",color:"#b91c1c",fontSize:"0.72rem",fontWeight:700}}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div style={{padding:"0 20px 24px"}}>
        {/* Main panic button */}
        <div style={{textAlign:"center",marginBottom:24,position:"relative",overflow:"hidden",borderRadius:24,padding:"18px 10px",background:"linear-gradient(180deg,#fff1f2 0%,#ffffff 100%)"}}>
          <div style={{position:"absolute",left:"12%",top:14,width:18,height:18,borderRadius:"50%",background:"rgba(59,130,246,.14)",animation:"af-float 3s ease-in-out infinite"}}/>
          <div style={{position:"absolute",right:"14%",top:24,width:12,height:12,borderRadius:"50%",background:"rgba(239,68,68,.16)",animation:"af-float 2.4s .3s ease-in-out infinite"}}/>
          <div style={{position:"absolute",left:"20%",bottom:18,width:10,height:10,borderRadius:"50%",background:"rgba(249,115,22,.18)",animation:"af-float 2.7s .2s ease-in-out infinite"}}/>
          {phase==="idle"&&(
            <button onClick={start}
              style={{width:160,height:160,borderRadius:"50%",border:"none",cursor:"pointer",
                background:"linear-gradient(135deg,#dc2626,#ef4444)",color:"white",
                fontFamily:"Sora,sans-serif",fontSize:"1.1rem",fontWeight:800,
                boxShadow:"0 0 0 12px rgba(239,68,68,.15), 0 0 0 24px rgba(239,68,68,.07)",
                animation:"af-pulse 2s ease-in-out infinite",transition:"transform .2s",
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,position:"relative"}}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {phrase(lang,"PANIC",{hi:"पैनिक",ur:"پینک"})}<br/>{phrase(lang,"BUTTON",{hi:"बटन",ur:"بٹن"})}
            </button>
          )}
          {phase==="countdown"&&(
            <div style={{position:"relative",width:180,height:180,margin:"0 auto"}}>
              <svg width="180" height="180" viewBox="0 0 180 180" style={{transform:"rotate(-90deg)"}}>
                <circle cx="90" cy="90" r="80" fill="none" stroke="#fee2e2" strokeWidth="12"/>
                <circle cx="90" cy="90" r="80" fill="none" stroke="#ef4444" strokeWidth="12"
                  strokeDasharray={2*Math.PI*80}
                  strokeDashoffset={2*Math.PI*80*(1-pct/100)}
                  strokeLinecap="round" style={{transition:"stroke-dashoffset 1s linear"}}/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center"}}>
                <div style={{fontFamily:"Sora,sans-serif",fontSize:"3rem",fontWeight:800,color:"#dc2626",lineHeight:1}}>{seconds}</div>
                <div style={{fontSize:"0.8rem",color:"#7f1d1d",fontWeight:600}}>{phrase(lang,"seconds",{hi:"सेकंड",ur:"سیکنڈ"})}</div>
              </div>
            </div>
          )}
          {phase==="alerting"&&(
            <div style={{background:"#fef2f2",border:"3px solid #ef4444",borderRadius:20,padding:"24px",
              animation:"af-pulse 1s ease-in-out infinite",textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Ic n="sos" c="white" s={28}/>
                </div>
              </div>
              <div style={{fontFamily:"Sora,sans-serif",fontSize:"1.4rem",fontWeight:800,color:"#dc2626",marginBottom:8}}>
                {phrase(lang,"ALERT SENT",{hi:"अलर्ट भेजा गया",ur:"الرٹ بھیج دیا گیا"})}
              </div>
              <div style={{fontSize:"0.84rem",color:"#7f1d1d"}}>{phrase(lang,"Emergency broadcast activated. Call 112 now.",{hi:"इमरजेंसी ब्रॉडकास्ट सक्रिय है। अभी 112 पर कॉल करें।",ur:"ہنگامی براڈکاسٹ فعال ہے۔ ابھی 112 پر کال کریں۔"})}</div>
            </div>
          )}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
          {[
            [phase==="idle"?phrase(lang,"Ready",{hi:"तैयार",ur:"تیار"}):phase==="countdown"?phrase(lang,"Counting",{hi:"काउंटिंग",ur:"گنتی"}):phrase(lang,"Alerting",{hi:"अलर्टिंग",ur:"الرٹ جاری"}),"#dbeafe",T.blue,phrase(lang,"status",{hi:"स्थिति",ur:"حالت"})],
            [seconds+"s","#ffedd5",T.orange,phrase(lang,"timer",{hi:"टाइमर",ur:"ٹائمر"})],
            [phase==="alerting"?"112":phrase(lang,"Safe mode",{hi:"सेफ मोड",ur:"سیف موڈ"}),"#fee2e2","#dc2626",phrase(lang,"response",{hi:"रिस्पॉन्स",ur:"ردعمل"})],
          ].map(([label,bg,color,sub],i)=>(
            <div key={i} style={{background:bg,borderRadius:14,padding:"12px 8px",textAlign:"center",fontWeight:800,color}}>
              <div style={{fontFamily:"Sora,sans-serif",fontSize:"1rem",marginBottom:4}}>{label}</div>
              <div style={{fontSize:"0.68rem",opacity:.75}}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Countdown controls */}
        {phase==="countdown"&&(
          <div style={{display:"flex",gap:12,marginBottom:20}}>
            <button onClick={cancel}
              style={{flex:1,padding:"14px",borderRadius:14,border:"2px solid #22c55e",
                background:"#f0fdf4",color:"#16a34a",fontWeight:800,fontSize:"1rem",cursor:"pointer"}}>
              {phrase(lang,"CANCEL — I am Safe",{hi:"रद्द करें — मैं सुरक्षित हूँ",ur:"منسوخ کریں — میں محفوظ ہوں"})}
            </button>
          </div>
        )}

        {phase==="alerting"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
            {[["Call 112","tel:112","#ef4444"],
              ["Call Police","tel:100","#3b82f6"],
              ["Ambulance","tel:102","#22c55e"],
              ["Fire Dept","tel:101","#f97316"]].map(([l,h,c])=>(
              <a key={l} href={h}
                style={{padding:"12px",borderRadius:12,background:c,color:"white",
                  textAlign:"center",fontWeight:700,fontSize:"0.84rem",textDecoration:"none",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <Ic n="phone" c="white" s={14}/> {l}
              </a>
            ))}
          </div>
        )}

        {/* Emergency note */}
        <div style={{background:T.white,borderRadius:16,padding:"16px",boxShadow:T.sh,marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:"0.85rem",color:T.text,marginBottom:8,display:"flex",alignItems:"center",gap:7}}>
            <Ic n="notes" c={T.blue} s={16}/> {phrase(lang,"Emergency Note",{hi:"इमरजेंसी नोट",ur:"ہنگامی نوٹ"})}
          </div>
          <textarea rows={3} value={note} onChange={e=>setNote(e.target.value)}
            placeholder={phrase(lang,"Describe your situation, location, or any important details...",{hi:"अपनी स्थिति, लोकेशन या जरूरी जानकारी लिखें...",ur:"اپنی صورتحال، مقام یا اہم تفصیل لکھیں..."})}
            style={{width:"100%",border:"1.5px solid "+T.border,borderRadius:10,
              padding:"10px 12px",fontSize:"0.84rem",outline:"none",resize:"vertical",
              background:T.bg,fontFamily:"inherit"}}/>
        </div>

        {/* Emergency contacts */}
        <div style={{background:T.white,borderRadius:16,padding:"16px",boxShadow:T.sh,marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:"0.85rem",color:T.text,marginBottom:4,display:"flex",alignItems:"center",gap:7}}>
            <Ic n="user" c={T.blue} s={16}/> {phrase(lang,"Personal Emergency Contacts",{hi:"व्यक्तिगत इमरजेंसी कॉन्टैक्ट्स",ur:"ذاتی ہنگامی رابطے"})}
          </div>
          <div style={{fontSize:"0.74rem",color:T.text2,marginBottom:8}}>{phrase(lang,"One number per line. Saved on device.",{hi:"हर लाइन में एक नंबर। सिर्फ डिवाइस में सेव होगा।",ur:"ہر لائن میں ایک نمبر۔ صرف اسی ڈیوائس میں محفوظ ہوگا۔"})}</div>
          <textarea rows={3} value={contactsStr} onChange={e=>setContactsStr(e.target.value)}
            onBlur={saveContacts}
            placeholder={"Ravi Kumar: 9876543210\nMom: 9812345678"}
            style={{width:"100%",border:"1.5px solid "+T.border,borderRadius:10,
              padding:"10px 12px",fontSize:"0.84rem",outline:"none",resize:"vertical",
              background:T.bg,fontFamily:"inherit"}}/>
        </div>

        {/* Safety tips */}
        <div style={{background:"#fffbeb",borderRadius:14,padding:"14px",border:"1px solid #fde68a"}}>
          <div style={{fontWeight:700,fontSize:"0.82rem",color:"#92400e",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
            <Ic n="warn" c="#f59e0b" s={15}/> {phrase(lang,"Safety Tips",{hi:"सेफ्टी टिप्स",ur:"حفاظتی مشورے"})}
          </div>
          {["Share your live location with 112 dispatcher","Stay on the call until help arrives",
            "If unsafe to speak, tap the phone 3 times as signal","Move to a well-lit, populated area if possible"].map((tip,i)=>(
            <div key={i} style={{fontSize:"0.78rem",color:"#78350f",marginBottom:5,display:"flex",gap:7,alignItems:"flex-start"}}>
              <div style={{width:4,height:4,borderRadius:"50%",background:"#f59e0b",flexShrink:0,marginTop:6}}/>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageChecklist({lang}){
  const LISTS={
    flood:["Store 3 days of drinking water","Pack important documents in waterproof bag","Keep torch and extra batteries ready","Identify nearest high ground route","Save emergency numbers offline","Prepare first aid kit","Keep emergency cash ready","Know your nearest shelter location"],
    earthquake:["Identify safe spots in each room","Secure heavy furniture to walls","Keep shoes near your bed","Practice Drop-Cover-Hold drills","Store 72-hour emergency supplies","Have a family meeting point","Keep fire extinguisher accessible","Know how to shut off gas/electricity"],
    fire:["Check smoke alarms monthly","Plan 2 escape routes from every room","Keep fire extinguisher maintained","Never leave cooking unattended","Store flammables away from heat","Know fire station number: 101","Mark emergency exits clearly","Conduct family fire drills quarterly"],
    general:["Emergency contact list saved offline","First aid kit stocked and accessible","Torch with spare batteries","Portable phone charger/power bank","Copies of ID documents","3-day food and water supply","Blankets and warm clothing","Whistle to signal for help"],
  };
  const [cat,setCat]=useState("general");
  const [checked,setChecked]=useState({});
  const items=LISTS[cat]||[];
  const done=items.filter((_,i)=>checked[cat+i]).length;
  const pct=Math.round((done/items.length)*100);
  const barC=pct<40?"#ef4444":pct<75?T.orange:"#22c55e";
  return(
    <div className="af-page">
      <div style={{padding:"20px 20px 0"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.8rem",color:T.blue,marginBottom:4}}>Emergency Checklist</h2>
        <p style={{fontSize:"0.83rem",color:T.text2,marginBottom:14}}>{t(lang,"checklistDesc")||"Track your disaster preparedness — works offline"}</p>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>
          {Object.keys(LISTS).map(k=>(
            <Pill key={k} active={cat===k} onClick={()=>setCat(k)}>{k.charAt(0).toUpperCase()+k.slice(1)}</Pill>
          ))}
        </div>
        {/* Progress bar */}
        <div style={{background:T.white,borderRadius:T.r,padding:"14px 16px",marginBottom:16,boxShadow:T.sh}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:"0.84rem",fontWeight:700,color:T.text}}>Preparedness Score</span>
            <span style={{fontSize:"0.84rem",fontWeight:800,color:barC}}>{pct}%</span>
          </div>
          <div style={{background:T.bg2,borderRadius:999,height:10,overflow:"hidden"}}>
            <div style={{height:"100%",width:pct+"%",background:barC,borderRadius:999,transition:"width .4s"}}/>
          </div>
          <div style={{fontSize:"0.75rem",color:T.text2,marginTop:6}}>{done} of {items.length} items checked</div>
        </div>
      </div>
      <div style={{padding:"0 20px 28px",display:"flex",flexDirection:"column",gap:8}}>
        {items.map((item,i)=>{
          const key=cat+i;
          const isChecked=!!checked[key];
          return(
            <button key={key} onClick={()=>setChecked(c=>({...c,[key]:!c[key]}))}
              style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",
                background:isChecked?"#f0fdf4":T.white,borderRadius:12,
                border:"1.5px solid "+(isChecked?"#86efac":T.border),
                cursor:"pointer",textAlign:"left",transition:"all .18s",
                boxShadow:T.sh}}>
              <div style={{width:22,height:22,borderRadius:6,border:"2px solid "+(isChecked?"#22c55e":T.border),
                background:isChecked?"#22c55e":"white",display:"flex",alignItems:"center",
                justifyContent:"center",flexShrink:0,transition:"all .18s"}}>
                {isChecked&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>}
              </div>
              <span style={{fontSize:"0.87rem",color:isChecked?"#15803d":T.text,fontWeight:isChecked?600:400,
                textDecoration:isChecked?"none":"none"}}>{item}</span>
            </button>
          );
        })}
        <button onClick={()=>setChecked({})}
          style={{marginTop:8,padding:"10px",borderRadius:10,border:"1.5px solid "+T.border,
            background:"white",color:T.text2,cursor:"pointer",fontSize:"0.82rem"}}>
          Reset All
        </button>
      </div>
    </div>
  );
}

/* ─── WEATHER ────────────────────────────────────────────────────────────── */
function PageWeather({lang,online}){
  const [weather,setWeather]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(null);
  const [selDay,setSelDay]=useState(null);

  useEffect(()=>{
    if(!online){setErr("Offline");return;}
    setLoading(true);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=30.3165&longitude=78.0322&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max&timezone=Asia%2FKolkata&forecast_days=7")
      .then(r=>r.json()).then(d=>{setWeather(d);setLoading(false);}).catch(()=>{setErr("Could not fetch weather");setLoading(false);});
  },[online]);

  const WC={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Foggy",48:"Dense Fog",
    51:"Light Drizzle",61:"Light Rain",63:"Moderate Rain",65:"Heavy Rain",71:"Light Snow",
    80:"Rain Showers",95:"Thunderstorm",99:"Hail Storm"};

  /* Animated SVG weather scenes */
  const WeatherScene=({code,size=120})=>{
    const c=code||0;
    const isClear=c<=1, isCloudy=c>=2&&c<=3, isFoggy=c>=45&&c<=48,
          isRain=c>=51&&c<=65||c===80, isSnow=c===71, isStorm=c>=95;

    if(isClear) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <defs>
          <radialGradient id="sg1" cx="50%" cy="50%"><stop offset="0%" stopColor="#fde68a"/><stop offset="100%" stopColor="#f59e0b"/></radialGradient>
        </defs>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
          <line key={i} x1={60+Math.cos(a*Math.PI/180)*28} y1={60+Math.sin(a*Math.PI/180)*28}
            x2={60+Math.cos(a*Math.PI/180)*38} y2={60+Math.sin(a*Math.PI/180)*38}
            stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"
            style={{animation:"af-glow 2s "+(i*0.15)+"s ease-in-out infinite"}}/>
        ))}
        <circle cx="60" cy="60" r="22" fill="url(#sg1)"
          style={{animation:"af-float 3s ease-in-out infinite"}}/>
      </svg>
    );
    if(isCloudy||isFoggy) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <defs>
          <radialGradient id="sg2" cx="50%" cy="50%"><stop offset="0%" stopColor="#e2e8f0"/><stop offset="100%" stopColor="#94a3b8"/></radialGradient>
        </defs>
        {!isFoggy&&<circle cx="42" cy="58" r="14" fill="#fde68a" opacity=".7"/>}
        <ellipse cx="50" cy="72" rx="26" ry="14" fill="#cbd5e1"
          style={{animation:"af-float 4s 0.2s ease-in-out infinite"}}/>
        <ellipse cx="72" cy="68" rx="28" ry="16" fill="url(#sg2)"
          style={{animation:"af-float 3.5s ease-in-out infinite"}}/>
        {isFoggy&&[58,68,78,88].map((y,i)=>(
          <line key={i} x1="20" y1={y} x2="100" y2={y} stroke="#94a3b8" strokeWidth="2.5"
            strokeLinecap="round" style={{animation:"af-blink 2s "+(i*0.3)+"s ease-in-out infinite"}}/>
        ))}
      </svg>
    );
    if(isRain||isStorm) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <ellipse cx="50" cy="52" rx="26" ry="14" fill="#94a3b8"
          style={{animation:"af-float 3s ease-in-out infinite"}}/>
        <ellipse cx="72" cy="48" rx="28" ry="16" fill="#64748b"
          style={{animation:"af-float 3.5s 0.3s ease-in-out infinite"}}/>
        {isStorm&&<path d="M65 52 L55 72 L63 72 L52 90" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none"
          style={{animation:"af-blink 1.2s ease-in-out infinite"}}/>}
        {!isStorm&&[35,50,65,80].map((x,i)=>(
          <line key={i} x1={x} y1={65+i*3} x2={x-8} y2={80+i*3}
            stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
            style={{animation:"af-dot 1s "+(i*0.2)+"s ease-in-out infinite"}}/>
        ))}
        {isStorm&&[35,55,75,88].map((x,i)=>(
          <line key={i} x1={x} y1={75+i*2} x2={x-8} y2={90+i*2}
            stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"
            style={{animation:"af-dot 0.9s "+(i*0.15)+"s ease-in-out infinite"}}/>
        ))}
      </svg>
    );
    if(isSnow) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <ellipse cx="55" cy="52" rx="28" ry="15" fill="#e2e8f0"
          style={{animation:"af-float 3s ease-in-out infinite"}}/>
        {[30,50,70,88,40,60,80].map((x,i)=>(
          <text key={i} x={x} y={70+i*6} fill="#bfdbfe" fontSize="14"
            style={{animation:"af-dot 1.5s "+(i*0.2)+"s ease-in-out infinite"}}
            textAnchor="middle">*</text>
        ))}
      </svg>
    );
    return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="24" fill="#fde68a" style={{animation:"af-float 3s ease-in-out infinite"}}/>
      </svg>
    );
  };

  const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const RISK={95:"High flood & landslide risk — stay indoors",99:"Severe hailstorm warning",65:"Heavy rain — flood watch active",63:"Moderate rain — carry umbrella",61:"Light rain expected today",80:"Rain showers — carry protection"};
  const SEASON_COLOR=["#3b82f6","#f59e0b","#6366f1","#ef4444"];
  const SEASON_DATA=[
    {m:"Jul–Sep",label:"Monsoon",risk:"Flood & Landslide Season",detail:"Peak risk period for Uttarakhand",c:"#3b82f6",icon:"flood"},
    {m:"Oct–Nov",label:"Post-Monsoon",risk:"Road Damage Risk",detail:"Damaged roads and bridges",c:"#f59e0b",icon:"mountain"},
    {m:"Dec–Feb",label:"Winter",risk:"Dense Fog & Cold",detail:"Carry warm clothes, fog lamps",c:"#6366f1",icon:"cloud"},
    {m:"Mar–Jun",label:"Summer",risk:"Heat Wave Risk",detail:"Stay hydrated, avoid midday",c:"#ef4444",icon:"sun"},
  ];

  const wc=weather?.current?.weathercode;
  const riskMsg=RISK[wc]||null;
  const temp=weather?.current?.temperature_2m;
  const feelsLike=weather?.current?.apparent_temperature;

  /* Determine sky gradient from weather code */
  const skyGrad=wc>=95?"linear-gradient(180deg,#1e293b,#334155)"
    :wc>=60?"linear-gradient(180deg,#1e3a5f,#2563eb)"
    :wc>=45?"linear-gradient(180deg,#475569,#94a3b8)"
    :wc>=2?"linear-gradient(180deg,#0ea5e9,#38bdf8)"
    :"linear-gradient(180deg,#0284c7,#38bdf8)";

  return(
    <div className="af-page">

      {/* Animated weather hero */}
      <div style={{background:skyGrad,padding:"0 0 0 0",position:"relative",overflow:"hidden",minHeight:260}}>
        {/* Stars for clear night feel */}
        {(wc===0||wc===1)&&[...Array(16)].map((_,i)=>(
          <div key={i} style={{position:"absolute",width:2,height:2,borderRadius:"50%",background:"white",
            top:Math.sin(i*37)*35+8+"%",left:(i*6.3)%95+"%",
            animation:"af-blink "+(1+i*0.3)+"s "+(i*0.2)+"s ease-in-out infinite"}}/>
        ))}
        {/* Weather animation */}
        <div style={{position:"absolute",right:16,top:20,opacity:.9}}>
          <WeatherScene code={wc} size={130}/>
        </div>
        {/* Content */}
        <div style={{padding:"26px 22px 22px",position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
            <Ic n="pin" c="rgba(255,255,255,.7)" s={14}/>
            <span style={{fontSize:"0.78rem",color:"rgba(255,255,255,.7)",fontWeight:600}}>Dehradun, Uttarakhand</span>
          </div>

          {loading&&(
            <div style={{color:"rgba(255,255,255,.8)",fontSize:"0.9rem",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:16,height:16,border:"2px solid rgba(255,255,255,.5)",borderTopColor:"white",borderRadius:"50%",animation:"af-spin 1s linear infinite"}}/>
              Fetching live weather...
            </div>
          )}

          {err&&!weather&&(
            <div style={{color:"rgba(255,255,255,.75)",fontSize:"0.84rem",background:"rgba(0,0,0,.15)",padding:"10px 14px",borderRadius:10}}>
              {err} — showing seasonal advisory
            </div>
          )}

          {weather&&(
            <>
              <div style={{fontFamily:"Sora,sans-serif",fontSize:"4.5rem",fontWeight:800,color:"white",lineHeight:1,marginBottom:6,textShadow:"0 2px 20px rgba(0,0,0,.3)"}}>
                {Math.round(temp||0)}°C
              </div>
              <div style={{fontSize:"1.1rem",fontWeight:600,color:"rgba(255,255,255,.9)",marginBottom:12}}>
                {WC[wc]||"Loading..."}
              </div>
              {/* Metrics strip */}
              <div style={{display:"flex",gap:16}}>
                {[
                  [()=><Ic n="wind" c="rgba(255,255,255,.8)" s={15}/>, Math.round(weather.current.windspeed_10m)+" km/h","Wind"],
                  [()=><Ic n="drop" c="rgba(255,255,255,.8)" s={15}/>, weather.current.relativehumidity_2m+"%","Humidity"],
                  [()=><Ic n="thermo" c="rgba(255,255,255,.8)" s={15}/>, Math.round(feelsLike||temp||0)+"°C","Feels Like"],
                ].map(([Icon,v,l])=>(
                  <div key={l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <Icon/>
                    <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.88rem",color:"white"}}>{v}</span>
                    <span style={{fontSize:"0.64rem",color:"rgba(255,255,255,.6)"}}>{l}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{padding:"14px 16px 28px",display:"flex",flexDirection:"column",gap:14}}>

        {/* Risk alert */}
        {riskMsg&&(
          <div className="em-fadein" style={{background:"#fef2f2",border:"1.5px solid #fca5a5",borderRadius:14,padding:"14px 16px",display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:40,height:40,borderRadius:12,background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Ic n="warn" c="#dc2626" s={20}/>
            </div>
            <div>
              <div style={{fontWeight:800,color:"#dc2626",fontSize:"0.9rem",marginBottom:2}}>Emergency Risk Alert</div>
              <div style={{color:"#7f1d1d",fontSize:"0.82rem"}}>{riskMsg}</div>
            </div>
          </div>
        )}

        {/* 7-day forecast */}
        {weather&&(
          <div style={{background:"white",borderRadius:16,overflow:"hidden",boxShadow:T.sh}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",gap:8}}>
              <Ic n="cloud" c={T.blue} s={16}/>
              <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",color:T.text}}>7-Day Forecast</span>
            </div>
            <div style={{display:"flex",gap:0,overflowX:"auto"}}>
              {(weather.daily.time||[]).map((date,i)=>{
                const d=new Date(date);
                const code=weather.daily.weathercode[i];
                const rain=weather.daily.precipitation_sum[i];
                const mx=Math.round(weather.daily.temperature_2m_max[i]);
                const mn=Math.round(weather.daily.temperature_2m_min[i]);
                const isSel=selDay===i;
                return(
                  <button key={date} onClick={()=>setSelDay(isSel?null:i)}
                    style={{flex:"0 0 auto",minWidth:70,padding:"13px 8px",textAlign:"center",
                      background:isSel?"linear-gradient(180deg,"+skyGrad.split(",")[1].replace(")","")+" 0%,"+T.bg2+" 100%)":"transparent",
                      border:"none",cursor:"pointer",borderRight:"1px solid "+T.border,
                      borderBottom:isSel?"2px solid "+T.blue:"2px solid transparent",transition:"all .2s"}}>
                    <div style={{fontSize:"0.7rem",color:isSel?T.blue:T.text2,fontWeight:700,marginBottom:6}}>{i===0?"Today":DAYS[d.getDay()]}</div>
                    <div style={{margin:"0 auto 6px",width:32,height:32}}>
                      <WeatherScene code={code} size={32}/>
                    </div>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.88rem",color:T.text,marginBottom:2}}>{mx}°</div>
                    <div style={{fontSize:"0.72rem",color:T.textL,marginBottom:rain>1?3:0}}>{mn}°</div>
                    {rain>1&&(
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:2,fontSize:"0.62rem",color:"#3b82f6",fontWeight:700}}>
                        <Ic n="drop" c="#3b82f6" s={9}/>{rain.toFixed(1)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Seasonal advisory */}
        <div style={{background:"white",borderRadius:16,overflow:"hidden",boxShadow:T.sh}}>
          <div style={{padding:"14px 16px",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",gap:8}}>
            <Ic n="satellite" c={T.blue} s={16}/>
            <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",color:T.text}}>Seasonal Risk Advisory</span>
          </div>
          {SEASON_DATA.map((s,i)=>(
            <div key={s.m} style={{display:"flex",gap:12,padding:"12px 16px",borderBottom:i<3?"1px solid "+T.border:"none"}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.c+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n={s.icon} c={s.c} s={18}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontWeight:700,fontSize:"0.85rem",color:T.text}}>{s.label}</span>
                  <span style={{fontSize:"0.65rem",color:s.c,fontWeight:700,background:s.c+"15",padding:"1px 7px",borderRadius:999}}>{s.m}</span>
                </div>
                <div style={{fontSize:"0.78rem",fontWeight:600,color:s.c,marginBottom:2}}>{s.risk}</div>
                <div style={{fontSize:"0.73rem",color:T.text2}}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Weather source */}
        <div style={{textAlign:"center",fontSize:"0.7rem",color:T.textL,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          <Ic n="satellite" c={T.textL} s={12}/>
          Data: Open-Meteo · IMD · Updated live
        </div>
      </div>
    </div>
  );
}

/* ─── NOTEPAD ────────────────────────────────────────────────────────────── */
function PageNotepad({lang}){
  const PROMPTS=["Important phone numbers","Family meeting point","Medical conditions & medications","Emergency contacts names","Nearest hospital address","Insurance policy numbers","Important document locations","Blood group of family members"];
  const [notes,setNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem("af-notes")||"{}")}catch{return{}}});
  const [active,setActive]=useState(0);
  const save=(i,val)=>{
    const n={...notes,[i]:val};
    setNotes(n);
    try{localStorage.setItem("af-notes",JSON.stringify(n))}catch{}
  };
  const total=Object.values(notes).filter(v=>v&&v.trim()).length;
  return(
    <div className="af-page">
      <div style={{padding:"20px 20px 0"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.8rem",color:T.blue,marginBottom:4}}>{t(lang,"notepadTitle")}</h2>
        <p style={{fontSize:"0.83rem",color:T.text2,marginBottom:14}}>Save critical info that works offline — stored on your device</p>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#f0fdf4",border:"1px solid #86efac",borderRadius:10,padding:"8px 14px",marginBottom:16,fontSize:"0.8rem",color:"#15803d"}}>
          <Ic n="check" c="#16a34a" s={14}/> {total} of {PROMPTS.length} notes saved locally
        </div>
      </div>
      <div style={{padding:"0 20px 8px",display:"flex",gap:7,overflowX:"auto"}}>
        {PROMPTS.map((_,i)=>(
          <Pill key={i} active={active===i} onClick={()=>setActive(i)}>
            {notes[i]?"✓ ":""}{i+1}
          </Pill>
        ))}
      </div>
      <div style={{padding:"12px 20px 28px"}}>
        <div style={{background:T.white,borderRadius:T.r,padding:18,boxShadow:T.shMd}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:8,background:T.blue,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"0.75rem",fontWeight:700}}>{active+1}</div>
            <span style={{fontSize:"0.88rem",fontWeight:700,color:T.text}}>{PROMPTS[active]}</span>
          </div>
          <textarea rows={5} value={notes[active]||""}
            onChange={e=>save(active,e.target.value)}
            placeholder={"Write your " + PROMPTS[active].toLowerCase() + " here..."}
            style={{width:"100%",border:"1.5px solid "+T.border,borderRadius:10,padding:"12px 14px",
              fontSize:"0.88rem",outline:"none",resize:"vertical",background:T.bg,
              lineHeight:1.6,color:T.text,fontFamily:"inherit"}}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:10,alignItems:"center"}}>
            <span style={{fontSize:"0.75rem",color:T.textL}}>{(notes[active]||"").length} characters</span>
            {notes[active]&&(
              <button onClick={()=>save(active,"")}
                style={{fontSize:"0.75rem",color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>
                Clear
              </button>
            )}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:12}}>
          {[
            [phrase(lang,"Offline"),"#dbeafe",T.blue],
            [phrase(lang,"Private"),"#ffedd5",T.orange],
            [phrase(lang,"Fast edit"),"#dcfce7","#16a34a"],
          ].map(([label,bg,color])=>(
            <div key={label} style={{padding:"10px 8px",borderRadius:12,background:bg,textAlign:"center",fontSize:"0.72rem",fontWeight:700,color}}>
              {label}
            </div>
          ))}
        </div>
        {/* Navigation */}
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button disabled={active===0} onClick={()=>setActive(a=>a-1)}
            style={{flex:1,padding:10,borderRadius:10,border:"1.5px solid "+T.border,background:"white",
              cursor:active===0?"default":"pointer",color:active===0?T.textL:T.text,fontSize:"0.84rem"}}>
            Previous
          </button>
          <button disabled={active===PROMPTS.length-1} onClick={()=>setActive(a=>a+1)}
            style={{flex:1,padding:10,borderRadius:10,border:"none",
              background:active===PROMPTS.length-1?T.bg:"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",
              cursor:active===PROMPTS.length-1?"default":"pointer",
              color:active===PROMPTS.length-1?T.textL:"white",fontSize:"0.84rem",fontWeight:600}}>
            Next
          </button>
        </div>
        <div style={{marginTop:18,padding:14,background:"#fffbeb",borderRadius:T.rs,border:"1px solid #fde68a",fontSize:"0.8rem",color:"#92400e"}}>
          <strong>Privacy Note:</strong> All notes are saved only on your device (localStorage). Nothing is sent to any server.
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────────────── */
function PageAbout({lang}){
  const nums=[
    ["Police",       "100",  "police"],
    ["Fire",         "101",  "fire"],
    ["Ambulance",    "102",  "medical"],
    ["All Emergency","112",  "sos"],
    ["SDRF",         "1070", "shield"],
    ["NDRF","9711077372",    "shield"],
  ];
  const feats=[
    {icon:"offline",t:"100% Offline-First",d:"All features work without internet — hospitals, shelters, first aid, AI chat"},
    {icon:"satellite",t:"Aapada AI Chatbot",d:"Understands 9 Indian languages, detects your script automatically"},
    {icon:"map",t:"AI Resource Map",d:"Haversine distance scoring ranks nearest hospitals & shelters in real time"},
    {icon:"cloud",t:"Live Weather & Risk",d:"Real-time weather via Open-Meteo API with disaster risk alerts"},
    {icon:"check",t:"Emergency Checklist",d:"Track your disaster preparedness across floods, earthquakes, fire"},
    {icon:"phone",t:"Emergency Contacts",d:"12 national helplines + personal contact manager with offline storage"},
    {icon:"globe",t:"10 Indian Languages",d:"Full UI translation for Hindi, Urdu, Tamil, Telugu, Kannada, Bengali + more"},
    {icon:"hospital",t:"Multi-factor Scoring",d:"Distance 40% + Availability 30% + Specialization 20% + Congestion 10%"},
  ];
  return(
    <div className="af-page">
      {/* Hero with Pexels image */}
      <div style={{position:"relative",height:200,overflow:"hidden"}}>
        <img src="https://images.pexels.com/photos/6894436/pexels-photo-6894436.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Aapada Flow — Emergency Response"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,"+T.blueDk+"e8,"+T.blue+"bb)"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
          <Logo sz={52}/>
          <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"2rem",fontWeight:800,color:"white",letterSpacing:1.5}}>
            Aapada<span style={{color:T.orange}}>Setu</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.78)",fontSize:"0.83rem",textAlign:"center",maxWidth:260}}>
            AI-Powered Emergency Resource Allocation
          </p>
        </div>
      </div>

      <div style={{padding:"20px 20px 32px",display:"flex",flexDirection:"column",gap:16}}>
        <div className="af-card-rise" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[
            ["112",phrase(lang,"Always Ready",{hi:"हमेशा तैयार",ur:"ہمیشہ تیار"}),T.blue],
            ["AI",phrase(lang,"Offline Help",{hi:"ऑफलाइन मदद",ur:"آف لائن مدد"}),T.orange],
            ["SOS",phrase(lang,"Fast access",{hi:"तेज़ पहुँच",ur:"فوری رسائی"}),"#ef4444"],
          ].map(([value,label,color])=>(
            <div key={label} style={{background:"white",borderRadius:16,padding:"16px 10px",textAlign:"center",boxShadow:T.sh}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.25rem",color}}>{value}</div>
              <div style={{fontSize:"0.72rem",color:T.text2,fontWeight:700}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div style={{background:T.white,borderRadius:T.r,padding:"20px 22px",boxShadow:T.sh}}>
          <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.2rem",color:T.blue,marginBottom:10}}>
            {t(lang,"aboutTitle")||"About Aapada-Flow"}
          </h3>
          <p style={{fontSize:"0.87rem",color:T.text2,lineHeight:1.75}}>
            Aapada-Flow is a disaster response platform built for India — designed to work even when the internet doesn't. During emergencies, it locates the nearest hospitals and shelters using AI scoring, provides first aid guides in 10 languages, and lets communities report incidents in real time.
          </p>
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
            {["100% Offline","AI Powered","10 Languages","Open Source"].map(b=>(
              <span key={b} style={{background:T.bg2,color:T.blue,padding:"4px 12px",borderRadius:999,fontSize:"0.74rem",fontWeight:700}}>{b}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{background:T.white,borderRadius:T.r,padding:"18px 18px",boxShadow:T.sh}}>
          <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.1rem",color:T.text,marginBottom:12,
            borderBottom:"2px solid "+T.border,paddingBottom:8}}>
            {t(lang,"keyFeatures")}
          </h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {feats.map(f=>(
              <div key={f.t} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:34,height:34,borderRadius:10,background:T.bg2,
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ic n={f.icon} c={T.blue} s={17}/>
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:"0.88rem",color:T.text,marginBottom:2}}>{f.t}</div>
                  <div style={{fontSize:"0.78rem",color:T.text2,lineHeight:1.5}}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency numbers */}
        <div style={{background:"linear-gradient(135deg,"+T.blueDk+","+T.blue+")",borderRadius:T.r,padding:"18px 20px",color:"white"}}>
          <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.15rem",marginBottom:14}}>
            {t(lang,"emergencyNumbers")}
          </h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {nums.map(([label,num,iconKey])=>(
              <a key={num} href={"tel:"+num.replace(/\-/g,"")}
                style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",
                  background:"rgba(255,255,255,.1)",borderRadius:12,textDecoration:"none",
                  border:"1px solid rgba(255,255,255,.15)",transition:"background .18s"}}>
                <div style={{width:32,height:32,borderRadius:9,background:"rgba(255,255,255,.15)",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ic n={iconKey} c="white" s={16}/>
                </div>
                <div>
                  <div style={{color:"rgba(255,255,255,.65)",fontSize:"0.69rem"}}>{label}</div>
                  <div style={{color:T.orange,fontWeight:800,fontSize:"1rem",fontFamily:"Sora,sans-serif"}}>{num}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Version */}
        <div style={{textAlign:"center",padding:"8px 0",color:T.textL,fontSize:"0.75rem"}}>
          Aapada-Flow v2.0 · Built for India · FS-VI-T038 · GEU B.Tech CSE
        </div>
      </div>
    </div>
  );
}
