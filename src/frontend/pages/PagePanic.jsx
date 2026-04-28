import React, { useEffect, useState } from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Ic, Btn } from "../components/shared";

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

export default PagePanic;
