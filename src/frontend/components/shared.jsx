import React from "react";
import { T, AI } from "../config/appData";

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

export { Logo, Pill, Ic, SevBar, AIBadge, Tag, Btn, Toast, StepVisual, RCard };
