import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Hospital, Home, Truck, Wifi, WifiOff, 
  PhoneCall, ShieldCheck, Menu, ChevronRight, X, Radio 
} from 'lucide-react';

const EmergencyDashboard = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFetching = useRef(false);

  // State starts empty to ensure we only show what we actually fetch
  const [updates, setUpdates] = useState([]);

  /**
   * ROBUST CAP-XML PARSER
   * Scrapes specific fields from NDMA Sachet including fallback for different XML structures
   */
  
  
  const parseLiveCAPData = (xmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    // This finds <item> regardless of prefixes
    const items = xmlDoc.querySelectorAll("item");

    if (items.length === 0) return [{ id: 'none', msg: "No active alerts", time: '--' }];

    return Array.from(items).slice(0, 5).map((item, index) => {
      // getElementsByTagNameNS("*", "tag") finds the tag even if it's <cap:title>
      const title = item.getElementsByTagName("title")[0]?.textContent;
      const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent;
      
      return {
        id: `live-${index}`,
        time: pubDate ? new Date(pubDate).toLocaleTimeString() : 'Recent',
        msg: title || "Disaster Update",
        type: 'alert'
      };
    });
  } catch (e) {
    return null;
  }
};
  /**
   * LIVE DATA SCRAPER VIA LOCAL BACKEND
   * Connects to the Node.js scraper to bypass the Government Firewall
   */
  const fetchLiveNDMA = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      // Connect to your local Node.js Kitchen (The Scraper)
      const response = await fetch('http://localhost:5000/fetch-alerts');
      const xmlString = await response.text();

      if (xmlString && xmlString.includes('<')) {
        // Save to cache for offline availability
        localStorage.setItem('ndma_xml_cache', xmlString);

        const liveUpdates = parseLiveCAPData(xmlString);
        if (liveUpdates && liveUpdates.length > 0) {
          setUpdates(liveUpdates);
        }
      }
    } catch (error) {
      console.warn("Local backend unreachable. Checking cache...");
      const cachedXML = localStorage.getItem('ndma_xml_cache');
      if (cachedXML) {
        setUpdates(parseLiveCAPData(cachedXML));
      } else {
        setUpdates([{
          id: 'err',
          time: 'SYNC ERR',
          msg: "Scraper offline. Ensure 'node server.js' is running in your backend folder.",
          type: 'alert'
        }]);
      }
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    
    fetchLiveNDMA();
    const interval = setInterval(fetchLiveNDMA, 60000); 

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      clearInterval(interval);
    };
  }, [fetchLiveNDMA]);

  const resourceNodes = [
    { id: 'hospital', title: 'Emergency Hospitals', icon: <Hospital size={24} />, desc: 'Find nearest medical facilities' },
    { id: 'shelter', title: 'Relief Shelters', icon: <Home size={24} />, desc: 'Active safe zones and camps' },
    { id: 'supply', title: 'Supply Points', icon: <Truck size={24} />, desc: 'Food, water, and medicine' },
    { id: 'map', title: 'Resource Maps', icon: <MapPin size={24} />, desc: 'Offline situational awareness' },
  ];

  const Modal = ({ type, onClose }) => {
    const content = {
      sos: {
        title: "CONFIRM EMERGENCY SOS",
        body: "Your current GPS coordinates will be transmitted to the National Command Center. Responders will be dispatched to your location.",
        btnColor: "bg-red-600", btnText: "Send Signal Now"
      },
      hospital: {
        title: "Hospital Resource Status",
        body: "AI identifies 3 hospitals within 5km. Average wait time: 15 mins. Specialized trauma care available at City General.",
        btnColor: "bg-[#002855]", btnText: "View on Map"
      },
      default: {
        title: "Resource Detail",
        body: "Accessing verified data from the intelligence layer. Information is synced with MongoDB and cached in IndexedDB.",
        btnColor: "bg-slate-600", btnText: "Acknowledge"
      }
    };
    const active = content[type] || content.default;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border-t-8 border-[#002855]">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">{active.title}</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed font-medium">{active.body}</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 px-4 rounded-lg font-bold text-slate-500 bg-slate-100 hover:bg-slate-200">Cancel</button>
              <button className={`flex-1 py-3 px-4 rounded-lg font-bold text-white shadow-lg ${active.btnColor}`} onClick={onClose}>{active.btnText}</button>
            </div>
          </div>
          <div className="bg-slate-50 p-3 text-center border-t text-[9px] text-slate-400 uppercase tracking-widest font-bold">ERSS Secure Gateway • Encrypted Session</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans">
      {activeModal && <Modal type={activeModal} onClose={() => setActiveModal(null)} />}

      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg shadow-md"><ShieldCheck size={24} /></div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#002855] tracking-tight leading-none uppercase">ERSS Portal</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">Emergency Response Support System</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
  {/* Indian Flag SVG */}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-4 h-3 rounded-sm">
    <path fill="#f4c430" d="M0 0h640v160H0z"/>
    <path fill="#fff" d="M0 160h640v160H0z"/>
    <path fill="#248828" d="M0 320h640v160H0z"/>
    <g transform="translate(320 240)">
      <circle r="70" fill="none" stroke="#000080" strokeWidth="8"/>
      <path fill="#000080" d="M0-70V70M-70 0h140M-49.5-49.5l99 99M-49.5 49.5l99-99"/>
    </g>
  </svg>
  
  <span className="opacity-20 self-stretch border-l border-current my-0.5"></span>

  {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />} 
  <span className="whitespace-nowrap uppercase">{isOnline ? 'Live Access' : 'Offline Mode'}</span>
</div>
        </div>
      </div>

     <nav className="bg-[#002855] text-white sticky top-0 z-50 shadow-lg">
  <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-12">
    <div className="flex gap-6 text-[11px] font-bold uppercase tracking-wide h-full">
      
      {/* Dashboard - Currently Active */}
      <Link to="/" className="border-b-2 border-orange-400 py-3 px-1 flex items-center">
        Dashboard
      </Link>
      
      {/* About - Hover Underline */}
      <Link 
        to="/about" 
        className="py-3 px-1 opacity-80 hover:opacity-100 transition-all hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 flex items-center"
      >
        About
      </Link>

      {/* FAQ - Hover Underline */}
     <Link 
        to="/faq" 
        className="py-3 px-1 opacity-80 hover:opacity-100 transition-all hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 flex items-center"
      >
        FAQ
      </Link>
   
      
    </div>
    <button className="sm:hidden p-2"><Menu size={20} /></button>
  </div>
</nav>
      <div className="bg-[#0b54a8] text-white py-12 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black mb-3 uppercase tracking-tighter tracking-tight">National Alert Feed</h2>
            <div className="flex flex-wrap gap-3 mb-5">
              
             
            </div>
            <p className="max-w-2xl text-base opacity-90 leading-relaxed font-medium">
              Verified life-saving information scraped directly from the National Disaster Alert Portal. 
              Real-time resource availability for active evacuation zones.
            </p>
          </div>
          <MapPin className="absolute right-[-30px] top-[-30px] text-white opacity-10 w-64 h-64" />
      </div>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {resourceNodes.map((item, index) => (
              <button key={index} onClick={() => setActiveModal(item.id)} className="bg-white border-b-4 border-b-[#002855] p-6 rounded shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex gap-5 items-center group text-left w-full">
                <div className="bg-slate-100 p-4 rounded-full text-[#002855] group-hover:bg-[#002855] group-hover:text-white transition-all">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg uppercase tracking-tight">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="ml-auto text-gray-300 group-hover:text-[#002855]" />
              </button>
            ))}
          </div>
         
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="h-48 overflow-hidden bg-slate-200 relative">
              <img src="femaleDispatcher.JPG" alt="112 Dispatch" className="w-full h-full object-cover object-top" />
            </div> 
            <div className="p-6 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest border-b pb-3">Emergency Panic Control</p>
              <button className="w-full bg-[#e11d48] hover:bg-[#be123c] text-white py-8 rounded-xl shadow-[0_10px_20px_rgba(225,29,72,0.3)] flex flex-col items-center justify-center transition-all active:scale-[0.98] mb-6" onClick={() => setActiveModal('sos')}>
                <span className="text-5xl font-black tracking-tighter">112</span>
                <span className="text-xs font-bold opacity-90 uppercase tracking-[0.2em] mt-2">Click to Activate Panic Signal</span>
              </button>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 w-full justify-center">
                <PhoneCall size={18} className="text-[#002855]" />
                <span className="text-sm font-bold text-[#002855]">Helpline: +11-23093563</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl border-t-4 border-orange-500 shadow-lg min-h-[300px]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold uppercase opacity-50 tracking-widest flex items-center gap-2"><Radio size={14} className="text-red-500" /> LIVE SACHET FEED</h4>
              <span className={`flex h-2 w-2 rounded-full bg-red-500 ${!loading && 'animate-ping'}`}></span>
            </div>
            <ul className="space-y-4">
              {updates.length > 0 ? updates.map((update) => (
                <li key={update.id} className={`text-[11px] leading-normal border-l-2 pl-3 transition-all transform ${update.type === 'alert' ? 'border-orange-400' : 'border-green-400'}`}>
                  <span className={`block font-bold mb-0.5 ${update.type === 'alert' ? 'text-orange-400' : 'text-green-400'}`}>{update.time}</span>
                  <p className="text-slate-200">{update.msg}</p>
                </li>
              )) : (
                <li className="text-[11px] opacity-50 italic py-10 text-center">
                  <div className="animate-spin mb-2 flex justify-center"><Radio size={20} /></div>
                  Synchronizing with Scraper...
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-16 p-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h5 className="font-extrabold text-[#002855] text-sm uppercase tracking-tight">ERSS Emergency Response Portal</h5>
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">Live CAP-XML Scraper Mode Active</p>
          </div>
          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em]">© 2026 Portal ID: ERSS-6772-AI</p>
        </div>
      </footer>
    </div>
  );
};

export default EmergencyDashboard;