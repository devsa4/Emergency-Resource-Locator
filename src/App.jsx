import { useState, useEffect, useRef, useCallback } from "react";
import { AI, T, HOSPITALS, DEFAULT_HOSPITALS, SHELTERS, DEFAULT_SHELTERS, INIT_ALERTS, LANGS } from "./frontend/config/appData";
import { t, phrase, resourceMapsLabel } from "./frontend/config/translations";
import { Toast, Logo, Btn, Ic } from "./frontend/components/shared";
import Splash from "./frontend/components/Splash";
import PageHome from "./frontend/pages/PageHome";
import PageMap from "./frontend/pages/PageMap";
import PageEmergencies from "./frontend/pages/PageEmergencies";
import PageHospitals from "./frontend/pages/PageHospitals";
import PageShelters from "./frontend/pages/PageShelters";
import PageFirstAid from "./frontend/pages/PageFirstAid";
import PageChecklist from "./frontend/pages/PageChecklist";
import PageWeather from "./frontend/pages/PageWeather";
import PageNotepad from "./frontend/pages/PageNotepad";
import PagePanic from "./frontend/pages/PagePanic";
import PageAlerts from "./frontend/pages/PageAlerts";
import PageAbout from "./frontend/pages/PageAbout";
import { idbGet, idbSet } from "./backend/storage/resourceCache";
import { replaceItems, getAllResources, normalizeLiveResources } from "./backend/utils/resourceNormalizer";
import { fetchNearbyResources } from "./backend/api/resources";
import { sendEmergencyChat } from "./backend/api/chat";

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
