import React from "react";
import { T, DISASTER } from "../config/appData";
import { t } from "../config/translations";
import { Ic, SevBar, Btn } from "../components/shared";

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

export default PageEmergencies;
