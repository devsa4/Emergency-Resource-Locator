import React from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Logo, Ic } from "../components/shared";

function PageAbout({lang}){
  const nums=[
    ["Police",       "100",  "police"],
    ["Fire",         "101",  "fire"],
    ["Ambulance",    "102",  "medical"],
    ["All Emergency","112",  "sos"],
    ["SDRF",         "1070", "shield"],
    ["NDRF","9711077372",    "shield"],
  ];
  const feats=[
    {icon:"offline",t:"100% Offline-First",d:"All features work without internet — hospitals, shelters, first aid, AI chat"},
    {icon:"satellite",t:"Aapada AI Chatbot",d:"Understands 9 Indian languages, detects your script automatically"},
    {icon:"map",t:"AI Resource Map",d:"Haversine distance scoring ranks nearest hospitals & shelters in real time"},
    {icon:"cloud",t:"Live Weather & Risk",d:"Real-time weather via Open-Meteo API with disaster risk alerts"},
    {icon:"check",t:"Emergency Checklist",d:"Track your disaster preparedness across floods, earthquakes, fire"},
    {icon:"phone",t:"Emergency Contacts",d:"12 national helplines + personal contact manager with offline storage"},
    {icon:"globe",t:"10 Indian Languages",d:"Full UI translation for Hindi, Urdu, Tamil, Telugu, Kannada, Bengali + more"},
    {icon:"hospital",t:"Multi-factor Scoring",d:"Distance 40% + Availability 30% + Specialization 20% + Congestion 10%"},
  ];
  return(
    <div className="af-page">
      {/* Hero with Pexels image */}
      <div style={{position:"relative",height:200,overflow:"hidden"}}>
        <img src="https://images.pexels.com/photos/6894436/pexels-photo-6894436.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Aapada Flow — Emergency Response"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,"+T.blueDk+"e8,"+T.blue+"bb)"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
          <Logo sz={52}/>
          <h2 style={{fontFamily:"Sora,sans-serif",fontSize:"2rem",fontWeight:800,color:"white",letterSpacing:1.5}}>
            Aapada<span style={{color:T.orange}}>Setu</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.78)",fontSize:"0.83rem",textAlign:"center",maxWidth:260}}>
            AI-Powered Emergency Resource Allocation
          </p>
        </div>
      </div>

      <div style={{padding:"20px 20px 32px",display:"flex",flexDirection:"column",gap:16}}>
        <div className="af-card-rise" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[
            ["112",phrase(lang,"Always Ready",{hi:"हमेशा तैयार",ur:"ہمیشہ تیار"}),T.blue],
            ["AI",phrase(lang,"Offline Help",{hi:"ऑफलाइन मदद",ur:"آف لائن مدد"}),T.orange],
            ["SOS",phrase(lang,"Fast access",{hi:"तेज़ पहुँच",ur:"فوری رسائی"}),"#ef4444"],
          ].map(([value,label,color])=>(
            <div key={label} style={{background:"white",borderRadius:16,padding:"16px 10px",textAlign:"center",boxShadow:T.sh}}>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.25rem",color}}>{value}</div>
              <div style={{fontSize:"0.72rem",color:T.text2,fontWeight:700}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div style={{background:T.white,borderRadius:T.r,padding:"20px 22px",boxShadow:T.sh}}>
          <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.2rem",color:T.blue,marginBottom:10}}>
            {t(lang,"aboutTitle")||"About Aapada-Flow"}
          </h3>
          <p style={{fontSize:"0.87rem",color:T.text2,lineHeight:1.75}}>
            Aapada-Flow is a disaster response platform built for India — designed to work even when the internet doesn't. During emergencies, it locates the nearest hospitals and shelters using AI scoring, provides first aid guides in 10 languages, and lets communities report incidents in real time.
          </p>
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
            {["100% Offline","AI Powered","10 Languages","Open Source"].map(b=>(
              <span key={b} style={{background:T.bg2,color:T.blue,padding:"4px 12px",borderRadius:999,fontSize:"0.74rem",fontWeight:700}}>{b}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{background:T.white,borderRadius:T.r,padding:"18px 18px",boxShadow:T.sh}}>
          <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.1rem",color:T.text,marginBottom:12,
            borderBottom:"2px solid "+T.border,paddingBottom:8}}>
            {t(lang,"keyFeatures")}
          </h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {feats.map(f=>(
              <div key={f.t} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:34,height:34,borderRadius:10,background:T.bg2,
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ic n={f.icon} c={T.blue} s={17}/>
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:"0.88rem",color:T.text,marginBottom:2}}>{f.t}</div>
                  <div style={{fontSize:"0.78rem",color:T.text2,lineHeight:1.5}}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency numbers */}
        <div style={{background:"linear-gradient(135deg,"+T.blueDk+","+T.blue+")",borderRadius:T.r,padding:"18px 20px",color:"white"}}>
          <h3 style={{fontFamily:"Sora,sans-serif",fontSize:"1.15rem",marginBottom:14}}>
            {t(lang,"emergencyNumbers")}
          </h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {nums.map(([label,num,iconKey])=>(
              <a key={num} href={"tel:"+num.replace(/\-/g,"")}
                style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",
                  background:"rgba(255,255,255,.1)",borderRadius:12,textDecoration:"none",
                  border:"1px solid rgba(255,255,255,.15)",transition:"background .18s"}}>
                <div style={{width:32,height:32,borderRadius:9,background:"rgba(255,255,255,.15)",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ic n={iconKey} c="white" s={16}/>
                </div>
                <div>
                  <div style={{color:"rgba(255,255,255,.65)",fontSize:"0.69rem"}}>{label}</div>
                  <div style={{color:T.orange,fontWeight:800,fontSize:"1rem",fontFamily:"Sora,sans-serif"}}>{num}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Version */}
        <div style={{textAlign:"center",padding:"8px 0",color:T.textL,fontSize:"0.75rem"}}>
          Aapada-Flow v2.0 · Built for India · FS-VI-T038 · GEU B.Tech CSE
        </div>
      </div>
    </div>
  );
}

export default PageAbout;
