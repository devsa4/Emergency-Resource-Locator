import React, { useEffect, useState } from "react";
import { T, FIRSTAID } from "../config/appData";
import { t } from "../config/translations";
import { Ic, Pill, StepVisual, Btn } from "../components/shared";

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

export default PageFirstAid;
