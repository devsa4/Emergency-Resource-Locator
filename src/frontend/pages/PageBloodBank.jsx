import React, { useState } from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Ic, Btn } from "../components/shared";

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

export default PageBloodBank;
