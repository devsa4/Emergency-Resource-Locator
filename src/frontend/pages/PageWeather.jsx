import React, { useEffect, useState } from "react";
import { T } from "../config/appData";
import { t, phrase } from "../config/translations";
import { Ic } from "../components/shared";

function PageWeather({lang,online}){
  const [weather,setWeather]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(null);
  const [selDay,setSelDay]=useState(null);

  useEffect(()=>{
    if(!online){setErr("Offline");return;}
    setLoading(true);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=30.3165&longitude=78.0322&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max&timezone=Asia%2FKolkata&forecast_days=7")
      .then(r=>r.json()).then(d=>{setWeather(d);setLoading(false);}).catch(()=>{setErr("Could not fetch weather");setLoading(false);});
  },[online]);

  const WC={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Foggy",48:"Dense Fog",
    51:"Light Drizzle",61:"Light Rain",63:"Moderate Rain",65:"Heavy Rain",71:"Light Snow",
    80:"Rain Showers",95:"Thunderstorm",99:"Hail Storm"};

  /* Animated SVG weather scenes */
  const WeatherScene=({code,size=120})=>{
    const c=code||0;
    const isClear=c<=1, isCloudy=c>=2&&c<=3, isFoggy=c>=45&&c<=48,
          isRain=c>=51&&c<=65||c===80, isSnow=c===71, isStorm=c>=95;

    if(isClear) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <defs>
          <radialGradient id="sg1" cx="50%" cy="50%"><stop offset="0%" stopColor="#fde68a"/><stop offset="100%" stopColor="#f59e0b"/></radialGradient>
        </defs>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
          <line key={i} x1={60+Math.cos(a*Math.PI/180)*28} y1={60+Math.sin(a*Math.PI/180)*28}
            x2={60+Math.cos(a*Math.PI/180)*38} y2={60+Math.sin(a*Math.PI/180)*38}
            stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"
            style={{animation:"af-glow 2s "+(i*0.15)+"s ease-in-out infinite"}}/>
        ))}
        <circle cx="60" cy="60" r="22" fill="url(#sg1)"
          style={{animation:"af-float 3s ease-in-out infinite"}}/>
      </svg>
    );
    if(isCloudy||isFoggy) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <defs>
          <radialGradient id="sg2" cx="50%" cy="50%"><stop offset="0%" stopColor="#e2e8f0"/><stop offset="100%" stopColor="#94a3b8"/></radialGradient>
        </defs>
        {!isFoggy&&<circle cx="42" cy="58" r="14" fill="#fde68a" opacity=".7"/>}
        <ellipse cx="50" cy="72" rx="26" ry="14" fill="#cbd5e1"
          style={{animation:"af-float 4s 0.2s ease-in-out infinite"}}/>
        <ellipse cx="72" cy="68" rx="28" ry="16" fill="url(#sg2)"
          style={{animation:"af-float 3.5s ease-in-out infinite"}}/>
        {isFoggy&&[58,68,78,88].map((y,i)=>(
          <line key={i} x1="20" y1={y} x2="100" y2={y} stroke="#94a3b8" strokeWidth="2.5"
            strokeLinecap="round" style={{animation:"af-blink 2s "+(i*0.3)+"s ease-in-out infinite"}}/>
        ))}
      </svg>
    );
    if(isRain||isStorm) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <ellipse cx="50" cy="52" rx="26" ry="14" fill="#94a3b8"
          style={{animation:"af-float 3s ease-in-out infinite"}}/>
        <ellipse cx="72" cy="48" rx="28" ry="16" fill="#64748b"
          style={{animation:"af-float 3.5s 0.3s ease-in-out infinite"}}/>
        {isStorm&&<path d="M65 52 L55 72 L63 72 L52 90" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none"
          style={{animation:"af-blink 1.2s ease-in-out infinite"}}/>}
        {!isStorm&&[35,50,65,80].map((x,i)=>(
          <line key={i} x1={x} y1={65+i*3} x2={x-8} y2={80+i*3}
            stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
            style={{animation:"af-dot 1s "+(i*0.2)+"s ease-in-out infinite"}}/>
        ))}
        {isStorm&&[35,55,75,88].map((x,i)=>(
          <line key={i} x1={x} y1={75+i*2} x2={x-8} y2={90+i*2}
            stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"
            style={{animation:"af-dot 0.9s "+(i*0.15)+"s ease-in-out infinite"}}/>
        ))}
      </svg>
    );
    if(isSnow) return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <ellipse cx="55" cy="52" rx="28" ry="15" fill="#e2e8f0"
          style={{animation:"af-float 3s ease-in-out infinite"}}/>
        {[30,50,70,88,40,60,80].map((x,i)=>(
          <text key={i} x={x} y={70+i*6} fill="#bfdbfe" fontSize="14"
            style={{animation:"af-dot 1.5s "+(i*0.2)+"s ease-in-out infinite"}}
            textAnchor="middle">*</text>
        ))}
      </svg>
    );
    return(
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="24" fill="#fde68a" style={{animation:"af-float 3s ease-in-out infinite"}}/>
      </svg>
    );
  };

  const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const RISK={95:"High flood & landslide risk — stay indoors",99:"Severe hailstorm warning",65:"Heavy rain — flood watch active",63:"Moderate rain — carry umbrella",61:"Light rain expected today",80:"Rain showers — carry protection"};
  const SEASON_COLOR=["#3b82f6","#f59e0b","#6366f1","#ef4444"];
  const SEASON_DATA=[
    {m:"Jul–Sep",label:"Monsoon",risk:"Flood & Landslide Season",detail:"Peak risk period for Uttarakhand",c:"#3b82f6",icon:"flood"},
    {m:"Oct–Nov",label:"Post-Monsoon",risk:"Road Damage Risk",detail:"Damaged roads and bridges",c:"#f59e0b",icon:"mountain"},
    {m:"Dec–Feb",label:"Winter",risk:"Dense Fog & Cold",detail:"Carry warm clothes, fog lamps",c:"#6366f1",icon:"cloud"},
    {m:"Mar–Jun",label:"Summer",risk:"Heat Wave Risk",detail:"Stay hydrated, avoid midday",c:"#ef4444",icon:"sun"},
  ];

  const wc=weather?.current?.weathercode;
  const riskMsg=RISK[wc]||null;
  const temp=weather?.current?.temperature_2m;
  const feelsLike=weather?.current?.apparent_temperature;

  /* Determine sky gradient from weather code */
  const skyGrad=wc>=95?"linear-gradient(180deg,#1e293b,#334155)"
    :wc>=60?"linear-gradient(180deg,#1e3a5f,#2563eb)"
    :wc>=45?"linear-gradient(180deg,#475569,#94a3b8)"
    :wc>=2?"linear-gradient(180deg,#0ea5e9,#38bdf8)"
    :"linear-gradient(180deg,#0284c7,#38bdf8)";

  return(
    <div className="af-page">

      {/* Animated weather hero */}
      <div style={{background:skyGrad,padding:"0 0 0 0",position:"relative",overflow:"hidden",minHeight:260}}>
        {/* Stars for clear night feel */}
        {(wc===0||wc===1)&&[...Array(16)].map((_,i)=>(
          <div key={i} style={{position:"absolute",width:2,height:2,borderRadius:"50%",background:"white",
            top:Math.sin(i*37)*35+8+"%",left:(i*6.3)%95+"%",
            animation:"af-blink "+(1+i*0.3)+"s "+(i*0.2)+"s ease-in-out infinite"}}/>
        ))}
        {/* Weather animation */}
        <div style={{position:"absolute",right:16,top:20,opacity:.9}}>
          <WeatherScene code={wc} size={130}/>
        </div>
        {/* Content */}
        <div style={{padding:"26px 22px 22px",position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
            <Ic n="pin" c="rgba(255,255,255,.7)" s={14}/>
            <span style={{fontSize:"0.78rem",color:"rgba(255,255,255,.7)",fontWeight:600}}>Dehradun, Uttarakhand</span>
          </div>

          {loading&&(
            <div style={{color:"rgba(255,255,255,.8)",fontSize:"0.9rem",display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:16,height:16,border:"2px solid rgba(255,255,255,.5)",borderTopColor:"white",borderRadius:"50%",animation:"af-spin 1s linear infinite"}}/>
              Fetching live weather...
            </div>
          )}

          {err&&!weather&&(
            <div style={{color:"rgba(255,255,255,.75)",fontSize:"0.84rem",background:"rgba(0,0,0,.15)",padding:"10px 14px",borderRadius:10}}>
              {err} — showing seasonal advisory
            </div>
          )}

          {weather&&(
            <>
              <div style={{fontFamily:"Sora,sans-serif",fontSize:"4.5rem",fontWeight:800,color:"white",lineHeight:1,marginBottom:6,textShadow:"0 2px 20px rgba(0,0,0,.3)"}}>
                {Math.round(temp||0)}°C
              </div>
              <div style={{fontSize:"1.1rem",fontWeight:600,color:"rgba(255,255,255,.9)",marginBottom:12}}>
                {WC[wc]||"Loading..."}
              </div>
              {/* Metrics strip */}
              <div style={{display:"flex",gap:16}}>
                {[
                  [()=><Ic n="wind" c="rgba(255,255,255,.8)" s={15}/>, Math.round(weather.current.windspeed_10m)+" km/h","Wind"],
                  [()=><Ic n="drop" c="rgba(255,255,255,.8)" s={15}/>, weather.current.relativehumidity_2m+"%","Humidity"],
                  [()=><Ic n="thermo" c="rgba(255,255,255,.8)" s={15}/>, Math.round(feelsLike||temp||0)+"°C","Feels Like"],
                ].map(([Icon,v,l])=>(
                  <div key={l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <Icon/>
                    <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.88rem",color:"white"}}>{v}</span>
                    <span style={{fontSize:"0.64rem",color:"rgba(255,255,255,.6)"}}>{l}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{padding:"14px 16px 28px",display:"flex",flexDirection:"column",gap:14}}>

        {/* Risk alert */}
        {riskMsg&&(
          <div className="em-fadein" style={{background:"#fef2f2",border:"1.5px solid #fca5a5",borderRadius:14,padding:"14px 16px",display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:40,height:40,borderRadius:12,background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Ic n="warn" c="#dc2626" s={20}/>
            </div>
            <div>
              <div style={{fontWeight:800,color:"#dc2626",fontSize:"0.9rem",marginBottom:2}}>Emergency Risk Alert</div>
              <div style={{color:"#7f1d1d",fontSize:"0.82rem"}}>{riskMsg}</div>
            </div>
          </div>
        )}

        {/* 7-day forecast */}
        {weather&&(
          <div style={{background:"white",borderRadius:16,overflow:"hidden",boxShadow:T.sh}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",gap:8}}>
              <Ic n="cloud" c={T.blue} s={16}/>
              <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",color:T.text}}>7-Day Forecast</span>
            </div>
            <div style={{display:"flex",gap:0,overflowX:"auto"}}>
              {(weather.daily.time||[]).map((date,i)=>{
                const d=new Date(date);
                const code=weather.daily.weathercode[i];
                const rain=weather.daily.precipitation_sum[i];
                const mx=Math.round(weather.daily.temperature_2m_max[i]);
                const mn=Math.round(weather.daily.temperature_2m_min[i]);
                const isSel=selDay===i;
                return(
                  <button key={date} onClick={()=>setSelDay(isSel?null:i)}
                    style={{flex:"0 0 auto",minWidth:70,padding:"13px 8px",textAlign:"center",
                      background:isSel?"linear-gradient(180deg,"+skyGrad.split(",")[1].replace(")","")+" 0%,"+T.bg2+" 100%)":"transparent",
                      border:"none",cursor:"pointer",borderRight:"1px solid "+T.border,
                      borderBottom:isSel?"2px solid "+T.blue:"2px solid transparent",transition:"all .2s"}}>
                    <div style={{fontSize:"0.7rem",color:isSel?T.blue:T.text2,fontWeight:700,marginBottom:6}}>{i===0?"Today":DAYS[d.getDay()]}</div>
                    <div style={{margin:"0 auto 6px",width:32,height:32}}>
                      <WeatherScene code={code} size={32}/>
                    </div>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.88rem",color:T.text,marginBottom:2}}>{mx}°</div>
                    <div style={{fontSize:"0.72rem",color:T.textL,marginBottom:rain>1?3:0}}>{mn}°</div>
                    {rain>1&&(
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:2,fontSize:"0.62rem",color:"#3b82f6",fontWeight:700}}>
                        <Ic n="drop" c="#3b82f6" s={9}/>{rain.toFixed(1)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Seasonal advisory */}
        <div style={{background:"white",borderRadius:16,overflow:"hidden",boxShadow:T.sh}}>
          <div style={{padding:"14px 16px",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",gap:8}}>
            <Ic n="satellite" c={T.blue} s={16}/>
            <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",color:T.text}}>Seasonal Risk Advisory</span>
          </div>
          {SEASON_DATA.map((s,i)=>(
            <div key={s.m} style={{display:"flex",gap:12,padding:"12px 16px",borderBottom:i<3?"1px solid "+T.border:"none"}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.c+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n={s.icon} c={s.c} s={18}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontWeight:700,fontSize:"0.85rem",color:T.text}}>{s.label}</span>
                  <span style={{fontSize:"0.65rem",color:s.c,fontWeight:700,background:s.c+"15",padding:"1px 7px",borderRadius:999}}>{s.m}</span>
                </div>
                <div style={{fontSize:"0.78rem",fontWeight:600,color:s.c,marginBottom:2}}>{s.risk}</div>
                <div style={{fontSize:"0.73rem",color:T.text2}}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Weather source */}
        <div style={{textAlign:"center",fontSize:"0.7rem",color:T.textL,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          <Ic n="satellite" c={T.textL} s={12}/>
          Data: Open-Meteo · IMD · Updated live
        </div>
      </div>
    </div>
  );
}

/* ─── NOTEPAD ────────────────────────────────────────────────────────────── */

export default PageWeather;
