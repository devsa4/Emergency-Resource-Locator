import React, { useState } from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Ic, Btn, Tag } from "../components/shared";

function PageShelters({shelters,search,setSearch,onRoute,lang}){
  const [expanded,setExpanded]=useState(null);

  const totalCap=shelters.reduce((s,h)=>s+(Number(h.capacity)||0),0);
  const totalOcc=shelters.reduce((s,h)=>s+(Number(h.current)||0),0);
  const totalFree=totalCap-totalOcc;

  return(
    <div className="af-page">
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",padding:"22px 20px 20px"}}>
        <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.6rem",fontWeight:800,color:"white",marginBottom:4}}>
          Emergency Shelters
        </h2>
        <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,.7)",marginBottom:14}}>Active relief camps — Dehradun & Rishikesh</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[[totalFree+" spots","Available now","#4ade80"],[shelters.length+" camps","Active now","#6ee7b7"],
            [Math.round((totalOcc/totalCap)*100)+"%","Occupancy","#fbbf24"]].map(([v,l,c])=>(
            <div key={l} style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"10px",textAlign:"center"}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.05rem",color:c}}>{v}</div>
              <div style={{fontSize:"0.67rem",color:"rgba(255,255,255,.6)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{padding:"12px 16px 10px",background:"white",borderBottom:"1px solid "+T.border}}>
        <div style={{position:"relative"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search shelters..."
            style={{width:"100%",padding:"10px 14px 10px 36px",border:"1.5px solid "+T.border,borderRadius:12,fontSize:"0.86rem",outline:"none",background:T.bg}}/>
        </div>
      </div>

      {/* Shelter cards */}
      <div style={{padding:"12px 16px 28px",display:"flex",flexDirection:"column",gap:12}}>
        {shelters.map((s,i)=>{
          const isExp=expanded===s.id;
          const avail=s.available!==undefined?s.available:(s.capacity-s.current);
          const pct=s.capacity?Math.round(((Number(s.current)||0)/s.capacity)*100):0;
          const barC=pct>85?"#ef4444":pct>65?T.orange:"#22c55e";
          const isNgo=s.supportType==="ngo";
          const urgency=isNgo?"Support Available":pct>85?"Almost Full":pct>65?"Filling Up":"Space Available";
          const urgencyC=isNgo?T.blue:(pct>85?"#ef4444":pct>65?T.orange:"#22c55e");
          return(
            <div key={s.id} style={{background:"white",borderRadius:16,boxShadow:isExp?"0 8px 32px rgba(6,78,59,.15)":T.sh,
              border:"1.5px solid "+(isExp?"#059669":T.border),overflow:"hidden",transition:"all .25s"}}>
              <button onClick={()=>setExpanded(isExp?null:s.id)} style={{width:"100%",padding:"14px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  {/* Status indicator */}
                  <div style={{width:40,height:40,borderRadius:12,background:pct>85?"#fef2f2":pct>65?"#fff7ed":"#f0fdf4",
                    border:"2px solid "+(pct>85?"#fca5a5":pct>65?"#fed7aa":"#86efac"),
                    display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={barC} strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                      <div style={{fontWeight:700,fontSize:"0.92rem",color:T.text}}>{s.name}</div>
                      {isNgo&&<span style={{fontSize:"0.62rem",background:"#dbeafe",color:T.blue,padding:"1px 7px",borderRadius:999,fontWeight:700}}>NGO</span>}
                    </div>
                    <div style={{fontSize:"0.74rem",color:T.text2,marginBottom:7,display:"flex",alignItems:"center",gap:4}}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {s.address}
                    </div>
                    {/* Capacity bar */}
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <div style={{flex:1,height:6,background:T.bg2,borderRadius:999,overflow:"hidden"}}>
                        <div style={{width:(isNgo?40:pct)+"%",height:"100%",background:urgencyC,borderRadius:999,transition:"width .5s"}}/>
                      </div>
                      <span style={{fontSize:"0.7rem",fontWeight:700,color:urgencyC,whiteSpace:"nowrap"}}>{isNgo?"Help center":(avail+" spots")}</span>
                    </div>
                    <span style={{fontSize:"0.68rem",fontWeight:700,color:urgencyC,background:urgencyC+"15",padding:"2px 8px",borderRadius:999}}>{urgency}</span>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.95rem",color:isNgo?T.blue:"#059669"}}>{isNgo?"NGO":avail}</div>
                    <div style={{fontSize:"0.62rem",color:T.textL}}>{isNgo?"support":"of "+s.capacity}</div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.textL} strokeWidth="2" strokeLinecap="round" style={{marginTop:8,transform:isExp?"rotate(180deg)":"none",transition:"transform .2s"}}>
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
              </button>

              {isExp&&(
                <div className="em-fadein" style={{borderTop:"1px solid "+T.border}}>
                  {/* Amenities */}
                  <div style={{padding:"12px 16px",borderBottom:"1px solid "+T.border}}>
                    <div style={{fontSize:"0.7rem",fontWeight:700,color:T.textL,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Amenities Available</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {s.amenities.map(a=>(
                        <span key={a} style={{fontSize:"0.75rem",fontWeight:600,background:"#f0fdf4",color:"#15803d",padding:"3px 10px",borderRadius:999,border:"1px solid #86efac",display:"flex",alignItems:"center",gap:4}}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Contact + actions */}
                  <div style={{padding:"12px 16px"}}>
                    {s.contact&&(
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,fontSize:"0.82rem",color:T.text2}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Contact: <strong style={{color:T.text}}>{s.contact}</strong>
                      </div>
                    )}
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>onRoute(s)}
                        style={{flex:2,padding:"10px",borderRadius:10,border:"none",
                          background:"linear-gradient(135deg,#059669,#10b981)",
                          color:"white",fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="3,11 22,2 13,21 11,13"/></svg>
                        Get Directions
                      </button>
                      {s.contact&&(
                        <button onClick={()=>window.location.href="tel:"+s.contact}
                          style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid #a7f3d0",
                            background:"#ecfdf5",color:"#059669",fontWeight:700,fontSize:"0.84rem",cursor:"pointer",
                            display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.4 2 2 0 0 1 3.67 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.06a16 16 0 0 0 6.06 6.06l1.02-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          Call
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {/* SDRF helpline */}
        <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",borderRadius:14,padding:"16px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{color:"white",fontWeight:700,fontSize:"0.88rem",marginBottom:2}}>SDRF Shelter Helpline</div>
            <div style={{color:"rgba(255,255,255,.65)",fontSize:"0.75rem"}}>State Disaster Response Force — 24/7</div>
          </div>
          <a href="tel:1070" style={{padding:"9px 18px",borderRadius:10,background:"#22c55e",color:"white",fontWeight:800,fontSize:"0.9rem",textDecoration:"none",fontFamily:"Sora,sans-serif"}}>1070</a>
        </div>
      </div>
    </div>
  );
}

/* ─── FIRST AID ──────────────────────────────────────────────────────────── */

export default PageShelters;
