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

export { T, HOSPITALS, DEFAULT_HOSPITALS, SHELTERS, DEFAULT_SHELTERS, FIRE, POLICE, DISASTER, FIRSTAID, INIT_ALERTS, TICKER, LANGS, AI };
