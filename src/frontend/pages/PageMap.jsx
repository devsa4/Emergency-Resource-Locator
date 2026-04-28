import React, { useRef, useState } from "react";
import { AI, T } from "../config/appData";
import { t, phrase, resourceMapsLabel } from "../config/translations";
import { Ic, Pill, Btn, Tag } from "../components/shared";

function PageMap({mapR,mapF,setMapF,onRoute,lang}){
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [search, setSearch] = useState("");
  const topRef = useRef(null);
  const cols={hospital:"#ef4444",shelter:"#22c55e",fire:T.orange,police:"#3b82f6"};
  const bgCols={hospital:"#fef2f2",shelter:"#f0fdf4",fire:"#fff7ed",police:"#eff6ff"};
  const gradients={hospital:"linear-gradient(135deg,#dc2626,#ef4444)",shelter:"linear-gradient(135deg,#16a34a,#22c55e)",fire:"linear-gradient(135deg,#ea580c,"+T.orange+")",police:"linear-gradient(135deg,#2563eb,#3b82f6)"};

  const allResources=[...mapR].map(r=>({
    ...r,d:Math.round(AI.dist(AI.lat,AI.lng,r.lat,r.lng)*10)/10
  })).sort((a,b)=>a.d-b.d);

  const filtered=search ? allResources.filter(r=>r.name.toLowerCase().includes(search.toLowerCase())) : allResources;
  const sel=selected ? allResources.find(r=>r.id===selected) : null;

  const vbSize=Math.round(800/zoom), vbX=Math.round((800-vbSize)/2), vbY=Math.round((500-Math.round(500/zoom))/2);

  const handlePinClick=(e,rid)=>{
    e.stopPropagation();
    setSelected(selected===rid?null:rid);
    if(selected!==rid){
      setTimeout(()=>topRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),60);
    }
  };

  return(
    <div className="af-page" ref={topRef}>

      {/* ── Hero header strip ── */}
      <div style={{background:"linear-gradient(135deg,"+T.blueDk+" 0%,"+T.blue+" 100%)",padding:"20px 20px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 80% 50%,rgba(255,255,255,.06) 0%,transparent 60%)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"1.6rem",fontWeight:800,color:"white",marginBottom:4,display:"flex",alignItems:"center",gap:10}}>
            <Ic n="map" c="white" s={18}/>
            {resourceMapsLabel(lang)}
          </h2>
          <p style={{fontSize:"0.81rem",color:"rgba(255,255,255,.7)",marginBottom:14}}>{t(lang,"aiCalc")}</p>
          {/* Search */}
          <div style={{position:"relative"}}>
            <svg style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder={t(lang,"searchHospitals") + " / " + t(lang,"searchShelters")}
              style={{width:"100%",padding:"10px 14px 10px 36px",border:"none",
                borderRadius:12,fontSize:"0.86rem",outline:"none",
                background:"rgba(255,255,255,.15)",color:"white",backdropFilter:"blur(8px)"}}/>
          </div>
        </div>
      </div>

      {/* Selected resource detail — scrolls to top on pin click */}
      {sel&&(
        <div className="em-fadein" style={{margin:"0",borderBottom:"1px solid "+T.border}}>
          {/* Full-width accent header */}
          <div style={{background:gradients[sel.type]||"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",padding:"18px 20px"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{width:52,height:52,borderRadius:16,background:"rgba(255,255,255,.2)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem",flexShrink:0}}>
                {sel.icon}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"white",fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.05rem",marginBottom:3}}>{sel.name}</div>
                <div style={{color:"rgba(255,255,255,.75)",fontSize:"0.78rem",marginBottom:6}}>{sel.address}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span style={{background:"rgba(255,255,255,.2)",color:"white",padding:"3px 10px",borderRadius:999,fontSize:"0.72rem",fontWeight:700}}>{sel.d} km away</span>
                  {sel["24h"]&&<span style={{background:"rgba(255,255,255,.2)",color:"white",padding:"3px 10px",borderRadius:999,fontSize:"0.72rem",fontWeight:700}}>24H Open</span>}
                  {sel.govt&&<span style={{background:"rgba(255,255,255,.15)",color:"white",padding:"3px 10px",borderRadius:999,fontSize:"0.72rem",fontWeight:700}}>Govt</span>}
                </div>
              </div>
              <button onClick={()=>setSelected(null)}
                style={{background:"rgba(255,255,255,.2)",border:"none",color:"white",
                  width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:"0.9rem",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                ✕
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",background:"white",
            borderBottom:"1px solid "+T.border}}>
            {[
              sel.availableBeds!=null && [sel.availableBeds+" / "+sel.beds,"Beds","#22c55e"],
              sel.available!=null && [sel.available+" / "+sel.capacity,"Spots","#22c55e"],
              sel.phone && [sel.phone,"Phone",T.blue],
              sel.score!=null && [sel.score+"/10","AI Score",T.orange],
            ].filter(Boolean).slice(0,3).map(([val,lbl,c])=>(
              <div key={lbl} style={{padding:"12px 10px",textAlign:"center",borderRight:"1px solid "+T.border}}>
                <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.92rem",color:c}}>{val}</div>
                <div style={{fontSize:"0.66rem",color:T.textL,marginTop:2}}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Specialties */}
          {sel.specialties&&(
            <div style={{padding:"12px 16px",background:"white",borderBottom:"1px solid "+T.border,display:"flex",gap:5,flexWrap:"wrap"}}>
              {sel.specialties.map(s=>(
                <span key={s} style={{fontSize:"0.72rem",background:T.bg2,color:T.blue,padding:"3px 10px",borderRadius:999,fontWeight:600}}>{s}</span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div style={{padding:"12px 16px",background:"white",display:"flex",gap:10}}>
            <button onClick={()=>onRoute(sel)}
              style={{flex:2,padding:"12px",borderRadius:12,border:"none",
                background:"linear-gradient(135deg,"+T.blue+","+T.blueLt+")",
                color:"white",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <><Ic n="map" c="white" s={15}/> Get Directions</>
            </button>
            {sel.phone&&(
              <button onClick={()=>window.location.href="tel:"+sel.phone}
                style={{flex:1,padding:"12px",borderRadius:12,
                  border:"1.5px solid "+(cols[sel.type]||T.border),
                  background:bgCols[sel.type]||T.bg,
                  color:cols[sel.type]||T.blue,fontWeight:700,fontSize:"0.88rem",cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <><Ic n="phone" c={cols[sel.type]||T.blue} s={15}/> Call</>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter pills */}
      <div style={{display:"flex",gap:7,padding:"12px 16px",overflowX:"auto",background:T.white,borderBottom:"1px solid "+T.border}}>
        {[["all","all",t(lang,"all")],["hospital","hospital",t(lang,"hospitals")],
          ["shelter","shelter",t(lang,"shelters")],["fire","fire",t(lang,"fire")],
          ["police","police",t(lang,"police")]].map(([v,ic,l])=>(
          <button key={v} onClick={()=>{setMapF(v);setSelected(null);}}
            style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:999,
              border:"1.5px solid "+(mapF===v?T.blue:T.border),
              background:mapF===v?T.blue:"white",
              color:mapF===v?"white":T.text2,
              fontSize:"0.79rem",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all .18s",flexShrink:0}}>
            {ic!=="all"&&<Ic n={ic} c={mapF===v?"white":T.text2} s={13}/>}
            {l}
          </button>
        ))}
      </div>

      {/* Interactive SVG Map */}
      <div style={{margin:"12px 16px",borderRadius:18,overflow:"hidden",
        boxShadow:"0 8px 32px rgba(26,79,160,.2)",
        border:"1.5px solid "+T.border,background:"#e8f0fe",position:"relative",height:340}}>

        <svg viewBox={vbX+" "+vbY+" "+vbSize+" "+Math.round(500/zoom)}
          style={{width:"100%",height:"100%",cursor:"default"}}
          onClick={()=>setSelected(null)}>

          <defs>
            <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25"/>
            </filter>
          </defs>

          {/* Background */}
          <rect x="-100" y="-100" width="1000" height="700" fill="#dce8f8"/>
          {/* Park / green areas */}
          <ellipse cx="150" cy="180" rx="60" ry="35" fill="#dcfce7" opacity=".7"/>
          <ellipse cx="650" cy="320" rx="50" ry="28" fill="#dcfce7" opacity=".6"/>
          {/* City blocks */}
          {[[80,80,55,40],[160,120,70,35],[240,90,45,50],[580,150,55,45],[640,200,60,35],[500,90,40,40]].map(([x,y,w,h],i)=>(
            <rect key={"blk"+i} x={x} y={y} width={w} height={h} rx="4" fill="#c8d9f0" opacity=".5"/>
          ))}
          {/* Grid */}
          {[100,200,300,400,500,600,700].map(x=>(
            <line key={"gx"+x} x1={x} y1="0" x2={x} y2="500" stroke="#c4d3ef" strokeWidth="0.8" opacity=".6"/>
          ))}
          {[100,200,300,400].map(y=>(
            <line key={"gy"+y} x1="0" y1={y} x2="800" y2={y} stroke="#c4d3ef" strokeWidth="0.8" opacity=".6"/>
          ))}
          {/* River */}
          <path d="M0 395 Q80 375 180 388 Q300 405 430 398 Q570 385 680 402 Q750 410 800 406"
            stroke="#60a5fa" strokeWidth="14" fill="none" opacity="0.45" strokeLinecap="round"/>
          <path d="M0 395 Q80 375 180 388 Q300 405 430 398 Q570 385 680 402 Q750 410 800 406"
            stroke="#93c5fd" strokeWidth="7" fill="none" opacity="0.5" strokeLinecap="round"/>
          {/* Major road */}
          <path d="M0 255 Q150 248 300 255 Q450 262 600 255 Q700 250 800 255" stroke="white" strokeWidth="6" fill="none" opacity=".7"/>
          <path d="M0 255 Q150 248 300 255 Q450 262 600 255 Q700 250 800 255" stroke="#e2e8f0" strokeWidth="4" fill="none"/>
          <path d="M395 0 L395 500" stroke="white" strokeWidth="4" fill="none" opacity=".7"/>
          <path d="M395 0 L395 500" stroke="#e2e8f0" strokeWidth="2.5" fill="none"/>
          {/* Hills */}
          <path d="M480 0 Q520 35 555 60 Q585 40 615 65 Q645 42 675 58 Q705 30 740 50 Q765 18 800 35 L800 0 Z" fill="#a7f3d0" opacity=".3"/>
          {/* Road labels */}
          <text x="400" y="248" textAnchor="middle" fontSize="7" fill="#94a3b8">Rajpur Road</text>
          <text x="140" y="263" textAnchor="middle" fontSize="7" fill="#94a3b8">Haridwar Rd</text>
          <text x="50" y="400" fontSize="8" fill="#93c5fd" opacity=".9">Ganga</text>

          {/* Connecting lines */}
          {filtered.map(r=>{
            const c=cols[r.type]||"#888";
            const x=r.coords?.x||400, y=r.coords?.y||250;
            const isSel=selected===r.id;
            return(
              <line key={"ln"+r.id} x1="338" y1="242" x2={x} y2={y}
                stroke={c} strokeWidth={isSel?2.5:1} strokeDasharray="6,4"
                opacity={isSel?0.7:0.2} style={{transition:"all .3s"}}/>
            );
          })}

          {/* Resource pins */}
          {filtered.map(r=>{
            const c=cols[r.type]||"#888";
            const x=r.coords?.x||400, y=r.coords?.y||250;
            const isSel=selected===r.id;
            const scale=isSel?1.3:1;
            const ox=(x-(x*scale))/scale, oy=(y-(y*scale))/scale;
            return(
              <g key={r.id} style={{cursor:"pointer",transform:isSel?"scale(1.3)":"scale(1)",transformOrigin:x+"px "+y+"px",transition:"transform .25s cubic-bezier(.34,1.56,.64,1)"}}
                onClick={e=>handlePinClick(e,r.id)}>
                {isSel&&<circle cx={x} cy={y} r="26" fill={c} opacity="0.12"/>}
                {/* Drop shadow */}
                <ellipse cx={x+1} cy={y+17} rx="8" ry="3" fill="rgba(0,0,0,.18)"/>
                {/* Teardrop pin */}
                <path d={"M"+x+","+(y+13)+" C"+(x-8)+","+(y+4)+" "+(x-10)+","+(y-6)+" "+(x-10)+","+(y-9)+" A10,10 0 1,1 "+(x+10)+","+(y-9)+" C"+(x+10)+","+(y-6)+" "+(x+8)+","+(y+4)+" "+x+","+(y+13)+" Z"}
                  fill={c} filter="url(#pin-shadow)" stroke={isSel?"white":"rgba(255,255,255,.6)"} strokeWidth={isSel?2:1}/>
                <text x={x} y={y+1} textAnchor="middle" fontSize="9" fill="white" style={{pointerEvents:"none"}}>{r.icon}</text>
                {/* Label */}
                <text x={x} y={y+24} textAnchor="middle" fontSize="8" fill={c} fontWeight="700" style={{pointerEvents:"none",filter:"drop-shadow(0 1px 1px white)"}}>
                  {r.name.split(" ").slice(0,2).join(" ")}
                </text>
                {/* Distance badge */}
                <rect x={x-16} y={y+27} width={32} height={11} rx={5} fill="white" opacity=".9"/>
                <text x={x} y={y+35} textAnchor="middle" fontSize="7.5" fill={c} fontWeight="700">{r.d}km</text>
              </g>
            );
          })}

          {/* User pin */}
          <circle cx="338" cy="242" r="25" fill={T.blue} opacity="0.1"/>
          <circle cx="338" cy="242" r="16" fill={T.blue} stroke="white" strokeWidth="3" filter="url(#pin-shadow)"/>
          <circle cx="338" cy="242" r="6" fill="white"/>
          <text x="338" y="266" textAnchor="middle" fontSize="9" fill={T.blue} fontWeight="800">YOU</text>
        </svg>

        {/* Zoom controls */}
        <div style={{position:"absolute",top:10,right:10,display:"flex",flexDirection:"column",gap:5}}>
          {[["+",()=>setZoom(z=>Math.min(3,+(z+0.4).toFixed(1)))],["-",()=>setZoom(z=>Math.max(0.6,+(z-0.4).toFixed(1)))]].map(([l,a])=>(
            <button key={l} onClick={a}
              style={{width:34,height:34,borderRadius:10,background:"white",border:"none",
                fontSize:"1.2rem",fontWeight:700,cursor:"pointer",
                boxShadow:"0 2px 10px rgba(0,0,0,.15)",
                display:"flex",alignItems:"center",justifyContent:"center",color:T.blue}}>
              {l}
            </button>
          ))}
          <button onClick={()=>setZoom(1)}
            style={{width:34,height:34,borderRadius:10,background:"white",border:"none",
              fontSize:"0.65rem",fontWeight:700,cursor:"pointer",
              boxShadow:"0 2px 10px rgba(0,0,0,.15)",color:T.text2}}>
            1:1
          </button>
        </div>

        {/* Legend */}
        <div style={{position:"absolute",bottom:10,left:10,background:"rgba(255,255,255,.96)",
          borderRadius:12,padding:"8px 12px",boxShadow:"0 2px 12px rgba(0,0,0,.12)",fontSize:"0.68rem"}}>
          {[["#ef4444","Hospital"],["#22c55e","Shelter"],[T.orange,"Fire"],[T.blue,"You"]].map(([c,l])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
              <span style={{width:9,height:9,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0,boxShadow:"0 0 4px "+c+"60"}}/>{l}
            </div>
          ))}
        </div>

        {/* Tap hint */}
        {!selected&&(
          <div style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",
            borderRadius:8,padding:"5px 10px",fontSize:"0.67rem",color:"white",fontWeight:500}}>
            Tap a pin for details
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,margin:"0 16px 12px",background:T.border,borderRadius:12,overflow:"hidden"}}>
        {[["hospital",allResources.filter(r=>r.type==="hospital").length,"Hospitals","#ef4444"],
          ["shelter",allResources.filter(r=>r.type==="shelter").length,"Shelters","#22c55e"],
          ["fire",allResources.filter(r=>r.type==="fire").length,"Fire",""+T.orange],
          ["police",allResources.filter(r=>r.type==="police").length,"Police","#3b82f6"]
        ].map(([ic,cnt,lb,c])=>(
          <div key={lb} style={{background:T.white,padding:"10px 6px",textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:4}}>
              <Ic n={ic} c={c} s={18}/>
            </div>
            <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.1rem",color:c}}>{cnt}</div>
            <div style={{fontSize:"0.64rem",color:T.textL}}>{lb}</div>
          </div>
        ))}
      </div>

      {/* Resource list */}
      <div style={{padding:"0 16px 28px",display:"flex",flexDirection:"column",gap:8}}>
        <div style={{fontSize:"0.78rem",fontWeight:600,color:T.text2,marginBottom:2}}>
          {filtered.length} resources sorted by distance
        </div>
        {filtered.map(r=>(
          <button key={r.id}
            onClick={e=>handlePinClick(e,r.id)}
            style={{display:"flex",alignItems:"center",gap:12,padding:"13px 14px",
              background:selected===r.id?(bgCols[r.type]||T.bg2):T.white,
              borderRadius:14,cursor:"pointer",border:"1.5px solid "+(selected===r.id?(cols[r.type]||T.border):T.border),
              textAlign:"left",width:"100%",transition:"all .2s",
              boxShadow:selected===r.id?"0 4px 16px "+(cols[r.type]||T.blue)+"25":T.sh}}>
            <div style={{width:42,height:42,borderRadius:12,background:bgCols[r.type]||T.bg,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0,
              border:"1.5px solid "+(selected===r.id?(cols[r.type]||T.border):"transparent"),
              transition:"all .2s"}}>
              {r.icon}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:"0.88rem",color:T.text,marginBottom:2}}>{r.name}</div>
              <div style={{fontSize:"0.72rem",color:T.text2}}>{r.address}</div>
              {r.phone&&<div style={{fontSize:"0.69rem",color:T.textL,marginTop:1}}>{r.phone}</div>}
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.92rem",color:cols[r.type]||T.blue}}>{r.d} km</div>
              {r.availableBeds!=null&&<div style={{fontSize:"0.67rem",color:"#22c55e",fontWeight:600,marginTop:2}}>{r.availableBeds} beds</div>}
              {r.available!=null&&<div style={{fontSize:"0.67rem",color:"#22c55e",fontWeight:600,marginTop:2}}>{r.available} spots</div>}
              <div style={{fontSize:"0.75rem",color:T.textL,marginTop:2}}>→</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}



/* ─── EMERGENCIES ────────────────────────────────────────────────────────── */

export default PageMap;
