import React, { useEffect, useRef, useState } from "react";
import { T, TICKER } from "../config/appData";
import { t, phrase, weatherLabel } from "../config/translations";
import { Logo, Ic, Btn } from "../components/shared";

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
            <button className="hov-btn" onClick={sos}
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

export default PageHome;
