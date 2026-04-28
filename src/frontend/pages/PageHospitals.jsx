import React, { useState } from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Ic, AIBadge, Btn } from "../components/shared";

function PageHospitals({hospitals,search,setSearch,onRoute,onCall,lang}){
  const [expanded,setExpanded]=useState(null);
  const [filter,setFilter]=useState("all"); // all | govt | pvt | 24h

  const filtered=hospitals.filter(h=>{
    if(filter==="govt") return h.govt;
    if(filter==="pvt") return !h.govt;
    if(filter==="24h") return h["24h"];
    return true;
  });

  const totalBeds=hospitals.reduce((s,h)=>s+(Number(h.beds)||0),0);
  const availBeds=hospitals.reduce((s,h)=>s+(Number(h.availableBeds)||0),0);
  const avgScore=hospitals.length?(hospitals.reduce((s,h)=>s+(h.score||0),0)/hospitals.length).toFixed(1):0;

  return(
    <div className="af-page">
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,"+T.blueDk+","+T.blue+")",padding:"22px 20px 20px"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.6rem",fontWeight:800,color:"white",marginBottom:4}}>
          Hospitals
        </h2>
        <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,.7)",marginBottom:14}}>AI-ranked by distance, availability and specialization</p>
        {/* Stats strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[[availBeds+" beds","Available now","#22c55e"],[hospitals.length+" nearby","In your area",T.orange],[(avgScore||"–")+"/10","Avg AI Score","#a78bfa"]].map(([v,l,c])=>(
            <div key={l} style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"10px 10px",textAlign:"center"}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.1rem",color:c}}>{v}</div>
              <div style={{fontSize:"0.67rem",color:"rgba(255,255,255,.6)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div style={{padding:"14px 16px 10px",background:T.white,borderBottom:"1px solid "+T.border}}>
        <div style={{position:"relative",marginBottom:10}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search hospitals by name or specialty..."
            style={{width:"100%",padding:"10px 14px 10px 36px",border:"1.5px solid "+T.border,borderRadius:12,fontSize:"0.86rem",outline:"none",background:T.bg}}/>
        </div>
        <div style={{display:"flex",gap:6}}>
          {[["all","All"],["24h","24H Open"],["govt","Govt"],["pvt","Private"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              style={{padding:"6px 14px",borderRadius:999,fontSize:"0.76rem",fontWeight:600,cursor:"pointer",border:"1.5px solid "+(filter===v?T.blue:T.border),background:filter===v?T.blue:"white",color:filter===v?"white":T.text2,transition:"all .18s"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital cards */}
      <div style={{padding:"12px 16px 28px",display:"flex",flexDirection:"column",gap:12}}>
        {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:T.textL}}>No hospitals match your filter</div>}
        {filtered.map((h,i)=>{
          const isExp=expanded===h.id;
          const knownBeds=Number(h.availableBeds);
          const bedPct=knownBeds!=null&&Number.isFinite(knownBeds)&&h.beds?Math.round((1-(knownBeds/h.beds))*100):0;
          const bedColor=knownBeds!=null&&Number.isFinite(knownBeds)?(bedPct>80?"#ef4444":bedPct>60?T.orange:"#22c55e"):T.textL;
          return(
            <div key={h.id} style={{background:"white",borderRadius:16,boxShadow:isExp?"0 8px 32px rgba(26,79,160,.18)":T.sh,
              border:"1.5px solid "+(isExp?T.blue:T.border),overflow:"hidden",transition:"all .25s"}}>
              {/* Card header — always visible */}
              <button onClick={()=>setExpanded(isExp?null:h.id)} style={{width:"100%",padding:"14px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  {/* Rank badge */}
                  <div style={{width:40,height:40,borderRadius:12,background:i===0?"linear-gradient(135deg,#f59e0b,#d97706)":i===1?"linear-gradient(135deg,#94a3b8,#64748b)":i===2?"linear-gradient(135deg,#b45309,#92400e)":T.bg2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.95rem",color:i<3?"white":T.blue}}>#{i+1}</div>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                      <span style={{fontWeight:700,fontSize:"0.92rem",color:T.text}}>{h.name}</span>
                      {h.govt&&<span style={{fontSize:"0.62rem",background:"#dbeafe",color:"#1d4ed8",padding:"1px 7px",borderRadius:999,fontWeight:700}}>GOVT</span>}
                      {h["24h"]&&<span style={{fontSize:"0.62rem",background:"#dcfce7",color:"#15803d",padding:"1px 7px",borderRadius:999,fontWeight:700}}>24H</span>}
                    </div>
                    <div style={{fontSize:"0.74rem",color:T.text2,marginBottom:6,display:"flex",alignItems:"center",gap:4}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {h.address}
                    </div>
                    {/* Bed availability bar */}
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,height:5,background:T.bg2,borderRadius:999,overflow:"hidden"}}>
                        <div style={{width:(knownBeds!=null&&Number.isFinite(knownBeds)?bedPct:35)+"%",height:"100%",background:bedColor,borderRadius:999,transition:"width .5s"}}/>
                      </div>
                      <span style={{fontSize:"0.7rem",fontWeight:700,color:bedColor,whiteSpace:"nowrap"}}>{knownBeds!=null&&Number.isFinite(knownBeds)?(knownBeds+" beds free"):"Availability unknown"}</span>
                    </div>
                  </div>
                  {/* AI Score */}
                  <div style={{textAlign:"center",flexShrink:0}}>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1rem",color:T.orange}}>{h.score||"–"}</div>
                    <div style={{fontSize:"0.6rem",color:T.textL}}>AI Score</div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{marginTop:6,transform:isExp?"rotate(180deg)":"none",transition:"transform .2s"}}>
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {isExp&&(
                <div className="em-fadein" style={{borderTop:"1px solid "+T.border}}>
                  {/* Specialties */}
                  <div style={{padding:"12px 16px",borderBottom:"1px solid "+T.border}}>
                    <div style={{fontSize:"0.7rem",fontWeight:700,color:T.textL,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Specializations</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {h.specialties.map(s=>(
                        <span key={s} style={{fontSize:"0.75rem",fontWeight:600,background:T.bg2,color:T.blue,padding:"3px 10px",borderRadius:999}}>{s}</span>
                      ))}
                    </div>
                  </div>
                  {/* Stats row */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:"1px solid "+T.border}}>
                    {[[h.beds+" total","Total Beds",""],[(h.score||"–")+"/10","AI Score",""],[h.estTime||"–","Est. Drive",""]].map(([v,l])=>(
                      <div key={l} style={{padding:"11px 12px",textAlign:"center",borderRight:"1px solid "+T.border}}>
                        <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.88rem",color:T.text}}>{v}</div>
                        <div style={{fontSize:"0.65rem",color:T.textL,marginTop:2}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {/* Phone + actions */}
                  <div style={{padding:"12px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,fontSize:"0.82rem",color:T.text2}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <strong style={{color:T.text}}>{h.phone}</strong>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>onRoute(h)}
                        style={{flex:2,padding:"10px",borderRadius:10,border:"none",
                          background:"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",
                          color:"white",fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="3,11 22,2 13,21 11,13"/></svg>
                        Get Directions
                      </button>
                      <button onClick={()=>onCall(h.phone)}
                        style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid #bfdbfe",
                          background:"#eff6ff",color:T.blue,fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── SHELTERS ───────────────────────────────────────────────────────────── */

export default PageHospitals;
