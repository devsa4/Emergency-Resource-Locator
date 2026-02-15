import React, { useState, useEffect } from 'react'; // Added useState & useEffect
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Cpu, Users, Lock, ChevronLeft, Map, Activity, Bell 
} from 'lucide-react';

const AboutPage = () => {
  // State to trigger the fade-in after the component mounts
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Small timeout to ensure the browser is ready to animate
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const missionCards = [
    {
      icon: <Bell className="text-orange-500" size={28} />, 
      title: "Real-Time Awareness",
      desc: "We gather official safety alerts from across the country and bring them into one clear view, so you never have to search multiple sources during an emergency."
    },
    {
      icon: <Map className="text-[#002855]" size={28} />,
      title: "Local Resources",
      desc: "Our portal helps you find exactly what you need when it matters most—from the nearest hospital to active relief centers in your specific area."
    },
    {
      icon: <Activity className="text-orange-500" size={28} />,
      title: "Always Accessible",
      desc: "The system is built to stay functional even when your internet connection is weak, ensuring that life-saving information is always in your pocket."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans">
      {/* --- TOP HEADER --- */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg shadow-md">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#002855] tracking-tight leading-none uppercase">ERSS Portal</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">Emergency Support System</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black bg-gray-50 border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-4 h-3 rounded-sm shadow-sm">
                <path fill="#f4c430" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#248828" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="40" fill="none" stroke="#000080" strokeWidth="4"/>
              </svg>
              <span className="text-slate-400 opacity-50">|</span>
            </div>

            <Link 
              to="/" 
              className="flex items-center gap-2 text-xs font-bold text-[#002855] hover:text-orange-600 transition-colors cursor-pointer group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </div>


  {/* --- HERO SECTION WITH VIDEO --- */}
<div className="relative h-[450px] flex items-center justify-center overflow-hidden">
  {/* Background Video */}
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute z-0 w-full h-full object-cover"
  >
    <source src="cityVideo.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* BOTTOM VIGNETTE (Linear Gradient) */}
  {/* Starts transparent at the top and becomes deep navy/black at the bottom */}
  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#001529] via-[#002855]/60 to-transparent"></div>

  {/* Content Card */}
  <div className="max-w-4xl mx-auto text-center relative z-20 px-4">
    <h2 
      className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight text-white"
      style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.8)' }}
    >
      Your Safety, <span className="text-orange-400">Simplified</span>
    </h2>
    <p 
      className="text-lg text-white leading-relaxed font-semibold max-w-2xl mx-auto"
      style={{ textShadow: '1px 2px 10px rgba(0,0,0,0.9)' }}
    >
      The ERSS Portal is a dedicated platform designed to help citizens stay informed and safe during natural disasters and emergencies. We bridge the gap between official government data and the people who need it most.
    </p>
  </div>

</div>

      <main className="max-w-6xl mx-auto p-6 -mt-12 relative z-30">
        {/* Mission Grid with State-Driven Fade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {missionCards.map((card, idx) => (
            <div 
              key={idx} 
              className={`group bg-white p-8 rounded-xl shadow-lg border-b-4 border-orange-500 
                         transition-all duration-1000 ease-out transform
                         hover:shadow-2xl hover:-translate-y-2 hover:bg-slate-50
                         ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ 
                transitionDelay: `${idx * 150}ms` 
              }}
            >
              <div className="mb-4 bg-slate-50 w-12 h-12 flex items-center justify-center rounded-lg 
                              transition-transform duration-300 group-hover:scale-110">
                {card.icon}
              </div>
              
              <h3 className="text-lg font-black text-[#002855] uppercase mb-2 tracking-tight group-hover:text-orange-600 transition-colors">
                {card.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Approach Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-16 space-y-6">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
                <div className="w-8 h-[1px] bg-orange-500"></div> Our Approach
              </div>
              <h2 className="text-3xl font-black text-[#002855] leading-tight uppercase">HOW WE HELP</h2>
              <p className="text-slate-600 leading-relaxed font-medium italic">
                "During an emergency, the last thing you should worry about is where to find reliable information." 
              </p>
              <p className="text-slate-600 text-sm">
                Our system works in the background to simplify complex reports into easy-to-read updates. We focus on three core areas: speed, reliability, and local relevance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Lock size={18} className="text-[#002855]" />
                  <span className="text-[11px] font-black uppercase text-slate-700">Verified Sources</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Users size={18} className="text-[#002855]" />
                  <span className="text-[11px] font-black uppercase text-slate-700">Citizen Centric</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 p-8 flex flex-col items-center justify-center border-l border-slate-100 relative min-h-[300px]">
               <div className="relative z-10 text-center">
                  <Cpu size={48} className="text-orange-400 mb-4 mx-auto animate-pulse" />
                  <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-2">Backend Architecture</h4>
                  <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full"></div>
               </div>
               <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <ShieldCheck size={32} className="text-slate-200" />
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">
            Empowering Citizens through Information • 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;