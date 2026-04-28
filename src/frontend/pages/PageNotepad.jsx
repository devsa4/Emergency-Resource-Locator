import React, { useState } from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Ic, Pill } from "../components/shared";

function PageNotepad({lang}){
  const PROMPTS=["Important phone numbers","Family meeting point","Medical conditions & medications","Emergency contacts names","Nearest hospital address","Insurance policy numbers","Important document locations","Blood group of family members"];
  const [notes,setNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem("af-notes")||"{}")}catch{return{}}});
  const [active,setActive]=useState(0);
  const save=(i,val)=>{
    const n={...notes,[i]:val};
    setNotes(n);
    try{localStorage.setItem("af-notes",JSON.stringify(n))}catch{}
  };
  const total=Object.values(notes).filter(v=>v&&v.trim()).length;
  return(
    <div className="af-page">
      <div style={{padding:"20px 20px 0"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.8rem",color:T.blue,marginBottom:4}}>{t(lang,"notepadTitle")}</h2>
        <p style={{fontSize:"0.83rem",color:T.text2,marginBottom:14}}>Save critical info that works offline — stored on your device</p>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#f0fdf4",border:"1px solid #86efac",borderRadius:10,padding:"8px 14px",marginBottom:16,fontSize:"0.8rem",color:"#15803d"}}>
          <Ic n="check" c="#16a34a" s={14}/> {total} of {PROMPTS.length} notes saved locally
        </div>
      </div>
      <div style={{padding:"0 20px 8px",display:"flex",gap:7,overflowX:"auto"}}>
        {PROMPTS.map((_,i)=>(
          <Pill key={i} active={active===i} onClick={()=>setActive(i)}>
            {notes[i]?"✓ ":""}{i+1}
          </Pill>
        ))}
      </div>
      <div style={{padding:"12px 20px 28px"}}>
        <div style={{background:T.white,borderRadius:T.r,padding:18,boxShadow:T.shMd}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:8,background:T.blue,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"0.75rem",fontWeight:700}}>{active+1}</div>
            <span style={{fontSize:"0.88rem",fontWeight:700,color:T.text}}>{PROMPTS[active]}</span>
          </div>
          <textarea rows={5} value={notes[active]||""}
            onChange={e=>save(active,e.target.value)}
            placeholder={"Write your " + PROMPTS[active].toLowerCase() + " here..."}
            style={{width:"100%",border:"1.5px solid "+T.border,borderRadius:10,padding:"12px 14px",
              fontSize:"0.88rem",outline:"none",resize:"vertical",background:T.bg,
              lineHeight:1.6,color:T.text,fontFamily:"inherit"}}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:10,alignItems:"center"}}>
            <span style={{fontSize:"0.75rem",color:T.textL}}>{(notes[active]||"").length} characters</span>
            {notes[active]&&(
              <button onClick={()=>save(active,"")}
                style={{fontSize:"0.75rem",color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>
                Clear
              </button>
            )}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:12}}>
          {[
            [phrase(lang,"Offline"),"#dbeafe",T.blue],
            [phrase(lang,"Private"),"#ffedd5",T.orange],
            [phrase(lang,"Fast edit"),"#dcfce7","#16a34a"],
          ].map(([label,bg,color])=>(
            <div key={label} style={{padding:"10px 8px",borderRadius:12,background:bg,textAlign:"center",fontSize:"0.72rem",fontWeight:700,color}}>
              {label}
            </div>
          ))}
        </div>
        {/* Navigation */}
        <div style={{display:"flex",gap:10,marginTop:12}}>
          <button disabled={active===0} onClick={()=>setActive(a=>a-1)}
            style={{flex:1,padding:10,borderRadius:10,border:"1.5px solid "+T.border,background:"white",
              cursor:active===0?"default":"pointer",color:active===0?T.textL:T.text,fontSize:"0.84rem"}}>
            Previous
          </button>
          <button disabled={active===PROMPTS.length-1} onClick={()=>setActive(a=>a+1)}
            style={{flex:1,padding:10,borderRadius:10,border:"none",
              background:active===PROMPTS.length-1?T.bg:"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",
              cursor:active===PROMPTS.length-1?"default":"pointer",
              color:active===PROMPTS.length-1?T.textL:"white",fontSize:"0.84rem",fontWeight:600}}>
            Next
          </button>
        </div>
        <div style={{marginTop:18,padding:14,background:"#fffbeb",borderRadius:T.rs,border:"1px solid #fde68a",fontSize:"0.8rem",color:"#92400e"}}>
          <strong>Privacy Note:</strong> All notes are saved only on your device (localStorage). Nothing is sent to any server.
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────────────── */

export default PageNotepad;
