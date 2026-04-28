import React from "react";
import { T } from "../config/appData";
import { t } from "../config/translations";
import { Ic, SevBar } from "../components/shared";

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

export default PageAlerts;
