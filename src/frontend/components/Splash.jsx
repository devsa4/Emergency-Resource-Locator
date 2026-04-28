import React from "react";
import { T } from "../config/appData";

function Splash({msg}){
  return(
    <div style={{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:T.blueDk,flexDirection:"column",zIndex:9999}}>
      <svg viewBox="0 0 80 80" width={94} height={94} fill="none" style={{animation:"af-spin 1.2s ease both",marginBottom:0}}>
        <path d="M40 5 L68 17 L68 44 Q68 64 40 74 Q12 64 12 44 L12 17 Z" fill={T.blue} stroke={T.orange} strokeWidth="2.5"/>
        <rect x="35" y="24" width="10" height="28" rx="3" fill="white"/>
        <rect x="26" y="33" width="28" height="10" rx="3" fill="white"/>
        <circle cx="40" cy="38" r="10" fill="none" stroke={T.orange} strokeWidth="1.5" opacity="0.7"/>
      </svg>
      <h1 style={{fontFamily:"Sora,sans-serif",fontSize:"2.5rem",color:"white",margin:"18px 0 4px",letterSpacing:2}}>
        Aapada<span style={{color:T.orange}}>Setu</span>
      </h1>
      <p style={{color:"rgba(255,255,255,.6)",marginBottom:36,fontSize:"0.91rem"}}>Welcome to AapadaSetu</p>
      <div style={{width:240,height:4,background:"rgba(255,255,255,.12)",borderRadius:999,overflow:"hidden",marginBottom:14}}>
        <div style={{height:"100%",background:"linear-gradient(90deg," + T.blueLt + "," + T.orange + ")",borderRadius:999,animation:"af-bar 2.4s ease forwards"}}/>
      </div>
      <p style={{color:"rgba(255,255,255,.38)",fontSize:"0.81rem"}}>{msg}</p>
    </div>
  );
}

/* ─── HOME ───────────────────────────────────────────────────────────────── */

export default Splash;
