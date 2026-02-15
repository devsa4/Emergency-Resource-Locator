import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, ChevronLeft, ChevronDown, ChevronUp, 
  HelpCircle, MessageSquare, CheckCircle, PhoneCall, Loader2
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const FAQPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      category: "General",
      question: "What is the primary purpose of the ERSS Portal?",
      answer: "The Emergency Response Support System (ERSS) acts as a centralized bridge between national disaster agencies (like NDMA) and local citizens. It translates technical hazard data into actionable safety information."
    },
    {
      category: "Technical",
      question: "How does the system handle massive spikes in traffic?",
      answer: "The portal utilizes a serverless architecture with auto-scaling capabilities. This allows the infrastructure to expand instantly to manage millions of concurrent users during high-intensity disaster events without performance degradation."
    },
    {
      category: "Reliability",
      question: "How accurate is the real-time alert data?",
      answer: "Our system parses official CAP-XML feeds directly from government sensors. Alerts are categorized by severity—Extreme, Severe, and Advisory—ensuring life-critical info reaches you with sub-second latency."
    },
    {
      category: "Offline Use",
      question: "Can I use the portal during a network blackout?",
      answer: "Yes. The system utilizes 'Edge Intelligence' (IndexedDB). Once loaded, critical disaster maps and safety protocols are cached locally on your device for offline reference."
    },
    {
      category: "Privacy",
      question: "Is my location tracked by the system?",
      answer: "We only process GPS data locally on your device to pinpoint relief centers. Your precise coordinates are never stored on our central servers, maintaining 100% user anonymity."
    },
    {
      category: "Infrastructure",
      question: "What is the 'Early Warning System' (EWS) integration?",
      answer: "The portal is synced with seismic sensors and meteorological satellites. If a sensor detects a threshold breach, a geofenced alert is automatically pushed to all users in the affected zone."
    },
    {
      category: "Verification",
      question: "How do I verify if an alert on the portal is official?",
      answer: "Every alert published carries a unique Digital Signature and an origin stamp from verified agencies like the IMD or NDMA. Unsigned notifications are automatically filtered out."
    }
  ];

  const submitQuery = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    
    setIsSubmitting(true);
    const newTicketId = `ERSS-${Math.floor(Math.random() * 9000) + 1000}`;

    // EMAILJS INTEGRATION
    const templateParams = {
      from_name: "ERSS Portal Citizen",
      title: userQuery,
      ticket_id: newTicketId,
      reply_to: "erss.service.in@gmail.com" 
    };

    emailjs.send(
      'service_2ot5e6n',   // Replace with your EmailJS Service ID
      'template_amsf8ca',  // Replace with your EmailJS Template ID
      templateParams,
      'n-VgrRqbjzZTssWpl'    // Replace with your EmailJS Public Key
    )
    .then(() => {
        setTicketId(newTicketId);
        setSubmittedQuery(userQuery);
        setUserQuery("");
        setIsSubmitting(false);
    })
  .catch((error) => {
    // This will alert the SPECIFIC error from EmailJS (e.g., "The service ID is invalid")
    alert("Error: " + (error.text || error.message || "Unknown Error"));
    console.error('Full Error Object:', error);
    setIsSubmitting(false);
});
  };

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans selection:bg-orange-100">
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg shadow-md">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#002855] tracking-tight leading-none uppercase">ERSS Portal</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">Support & Guidance</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 text-xs font-bold text-[#002855] hover:text-orange-600 transition-all group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            BACK TO DASHBOARD
          </Link>
        </div>
      </header>

      {/* --- HERO --- */}
      <div className="relative h-[280px] flex items-center justify-center overflow-hidden bg-[#002855]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-100 via-[#002855]/85 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-20 px-4 mt-[-20px]">
          <h2 className="text-4xl sm:text-6xl font-black mb-2 uppercase tracking-tighter text-white  drop-shadow-2xl">
            Support <span className="text-orange-400">Desk</span>
          </h2>
          <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-bold">Official Knowledge Base & IT Inquiry System</p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto p-6 -mt-16 relative z-30 pb-24">
        
        {/* --- FAQ ACCORDION --- */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`group bg-white rounded-xl shadow-sm border border-transparent overflow-hidden transition-all duration-700 hover:bg-[#002855] hover:shadow-2xl hover:-translate-y-1
                         ${hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
                className="w-full p-6 text-left flex justify-between items-center transition-colors"
              >
                <div className="flex gap-5 items-center">
                  <div className={`p-2.5 rounded-xl transition-all duration-300 shadow-sm
                    ${openIndex === idx 
                      ? 'bg-orange-500 text-white scale-110' 
                      : 'bg-slate-50 text-[#002855] group-hover:bg-white/10 group-hover:text-orange-400'}`}>
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-orange-400/80 mb-1">{faq.category}</p>
                    <span className="font-bold text-[#002855] group-hover:text-white uppercase text-sm tracking-tight">{faq.question}</span>
                  </div>
                </div>
                {openIndex === idx ? (
                  <ChevronUp size={20} className="text-orange-500" />
                ) : (
                  <ChevronDown size={20} className="text-slate-300 group-hover:text-white/50" />
                )}
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-6 pt-0 border-t border-slate-50 group-hover:border-white/5 text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed bg-slate-50/50 group-hover:bg-black/20">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- INTEGRATED CONTACT SUPPORT CARD --- */}
        <div className="bg-[#002855] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-orange-500/20 transition-all duration-1000"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex items-center gap-5 flex-1">
              <div className="bg-orange-500 p-5 rounded-3xl shadow-xl shadow-orange-500/20">
                <MessageSquare size={32} />
              </div>
              <div className="max-w-[200px]">
                <h3 className="font-black uppercase tracking-tight text-2xl leading-[0.9]">Direct <br/><span className="text-orange-400">Support</span></h3>
                <p className="text-[10px] opacity-50 mt-2 font-bold uppercase tracking-widest">Inquiries sent to IT Cell</p>
              </div>
            </div>

            <div className="w-full lg:w-[60%] relative min-h-[90px] flex items-center">
              {submittedQuery ? (
                /* --- THE POPPED SUCCESS STATE --- */
                <div className="w-full animate-in zoom-in-95 fade-in duration-500 bg-orange-500 rounded-2xl p-5 flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2 rounded-full animate-bounce">
                      <CheckCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-xs tracking-tight">Inquiry Sent</h4>
                      <p className="text-[10px] opacity-90 font-bold uppercase tracking-widest">Ref ID: {ticketId}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSubmittedQuery(null)}
                    className="text-[9px] font-black uppercase bg-white text-[#002855] hover:bg-slate-100 px-4 py-2.5 rounded-lg transition-all active:scale-95"
                  >
                    New Ticket
                  </button>
                </div>
              ) : (
                /* --- THE FORM STATE --- */
                <form onSubmit={submitQuery} className="w-full group/form">
                  <div className={`flex bg-black/30 backdrop-blur-xl rounded-2xl border transition-all p-2 ${isSubmitting ? 'opacity-50 pointer-events-none' : 'border-white/10 focus-within:border-orange-500/50'}`}>
                    <input 
                      type="text" 
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="Describe your issue..." 
                      className="flex-1 bg-transparent px-5 py-3 text-sm focus:outline-none placeholder:text-slate-500 text-white"
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit" 
                      className="bg-orange-500 hover:bg-white text-white hover:text-[#002855] px-6 rounded-xl transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 disabled:bg-slate-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : 'Send'}
                    </button>
                  </div>
                  <div className="flex justify-between px-3 mt-3">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">IT Node: Active</span>
                    <a href="tel:112" className="text-[8px] font-black text-orange-400 hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                      <PhoneCall size={10} /> Call Support: 112
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 text-center">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em]">Emergency Response Support System • 2026</p>
      </footer>
    </div>
  );
};

export default FAQPage;