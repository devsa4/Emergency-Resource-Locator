import React, { useState } from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Ic, Pill, Btn } from "../components/shared";

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

export default PageChecklist;
