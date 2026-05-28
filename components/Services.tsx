// "use client";

// import { motion } from "framer-motion";

// const services = [
//   { title: "FleetPay", description: "Integrated factoring with one-click load booking and instant payment on delivery. Fuel discount network with GPS fraud prevention.", num: "01" },
//   { title: "Comply", description: "Full-service FMCSA authority maintenance and safety administration. We handle the paperwork so you handle the road.", num: "02" },
//   { title: "WatchTower", description: "Outsourced load tracking, tracing, and invoicing using the Supertruck.ai dashboard. Every load monitored 24/7.", num: "03" },
//   { title: "RoadReady", description: "Subscription-based preventive maintenance with OS-triggered scheduled intervals. Keep your trucks rolling, not stalled.", num: "04" },
//   { title: "MyMiles", description: "10–20¢ per mile auto-deposited into a retirement account. Every mile you drive builds your financial future.", num: "05" },
//   { title: "AI Maintenance Predictor", description: "Integrates ELD diagnostic codes with RoadReady to auto-book repairs before breakdowns happen.", num: "06" },
//   { title: "Dynamic Insurance", description: "Usage-based premiums that fluctuate based on real-time ELD safety data and dashcam footage. Safer drivers pay less.", num: "07" },
//   { title: "Training Academy", description: "Platform to train drivers on Supertruck OS and business management. Turn drivers into fleet operators.", num: "08" },
// ];

// export default function Services() {
//   return (
//     <section id="services" className="py-24" style={{ background: "var(--bg-alt)" }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
//           <p className="section-label">Everything You Need</p>
//           <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
//             Eight Services.<br/><span style={{ color: "var(--accent)" }}>One Platform.</span>
//           </h2>
//           <p className="font-outfit text-lg mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
//             FourFleet wraps every operational need into a single, seamless experience — from the first mile to the last invoice.
//           </p>
//         </motion.div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {services.map((s, i) => (
//             <motion.div
//               key={s.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: i * 0.06 }}
//               className="card p-6 group cursor-default"
//             >
//               <div className="font-montserrat font-black text-4xl mb-4 transition-colors duration-300 group-hover:text-accent" style={{ color: "var(--border)" }}>{s.num}</div>
//               <h3 className="font-montserrat font-bold text-lg mb-2" style={{ color: "var(--text)" }}>{s.title}</h3>
//               <p className="font-outfit text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.description}</p>
//               <div className="mt-5 flex items-center gap-1 font-outfit text-xs font-semibold" style={{ color: "var(--accent)" }}>
//                 Learn more
//                 <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { title: "FleetPay", description: "Integrated factoring with one-click load booking and instant payment on delivery. Fuel discount network with GPS fraud prevention.", num: "01", tag: "Fintech Core" },
  { title: "Comply", description: "Full-service FMCSA authority maintenance and safety administration. We handle the paperwork so you handle the road.", num: "02", tag: "Safety & Legal" },
  { title: "WatchTower", description: "Outsourced load tracking, tracing, and invoicing using the Supertruck.ai dashboard. Every load monitored 24/7.", num: "03", tag: "Operations" },
  { title: "RoadReady", description: "Subscription-based preventive maintenance with OS-triggered scheduled intervals. Keep your trucks rolling, not stalled.", num: "04", tag: "Fleet Health" },
  { title: "MyMiles", description: "10–20¢ per mile auto-deposited into a retirement account. Every mile you drive builds your financial future.", num: "05", tag: "Driver Wealth" },
  { title: "AI Maintenance Predictor", description: "Integrates ELD diagnostic codes with RoadReady to auto-book repairs before breakdowns happen.", num: "06", tag: "Predictive AI" },
  { title: "Dynamic Insurance", description: "Usage-based premiums that fluctuate based on real-time ELD safety data and dashcam footage. Safer drivers pay less.", num: "07", tag: "Risk Controls" },
  { title: "Training Academy", description: "Platform to train drivers on Supertruck OS and business management. Turn drivers into fleet operators.", num: "08", tag: "Operator Growth" },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-play cycling mechanism logic
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimer.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % services.length);
      }, 4000); // Transitions automatically every 4 seconds
    }

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isAutoPlaying]);

  // Handle user interaction overrides safely
  const handleUserSelect = (index: number) => {
    setIsAutoPlaying(false); // Permanently pause auto-rotation once user engages
    setActiveIdx(index);
  };

  return (
    <section id="services" className="py-24 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <p className="tracking-widest uppercase text-xs font-bold mb-3" style={{ color: "var(--accent)" }}>
            Ecosystem Architecture
          </p>
          <h2 className="font-montserrat font-black leading-none mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--text)" }}>
            Eight Services.<br/><span style={{ color: "var(--accent)" }}>One Platform.</span>
          </h2>
          <p className="font-outfit text-base md:text-lg" style={{ color: "var(--text-muted)" }}>
            FourFleet wraps every operational need into a single, seamless experience — from the first mile to the last invoice.
          </p>
        </div>

        {/* Layout Engine */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* DESKTOP VIEW: The Dynamic Interactive Orbital Ring Display Map */}
          <div className="hidden lg:flex w-1/2 justify-center items-center relative aspect-square max-w-[460px]">
            {/* Dashed background layout trace path */}
            <div 
              className="absolute inset-0 rounded-full border border-dashed opacity-20 pointer-events-none"
              style={{ borderColor: "var(--text)" }}
            />
            
            {/* The Central Status Core Hub */}
            <div 
              className="w-44 h-44 rounded-full border flex flex-col items-center justify-center relative z-10 shadow-xl text-center p-4"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
            >
              <span className="font-montserrat font-black text-4xl" style={{ color: "var(--accent)" }}>
                {services[activeIdx].num}
              </span>
              <span className="font-outfit text-[11px] tracking-widest uppercase font-black opacity-90 mt-1" style={{ color: "var(--text)" }}>
                {services[activeIdx].title}
              </span>
              
              {/* Dynamic Auto-play Indicator Light asset badge */}
              {isAutoPlaying && (
                <div className="absolute bottom-5 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-bold tracking-widest uppercase text-white/60">Auto Tour</span>
                </div>
              )}
            </div>

            {/* Orbit Node System Generation mapping loop */}
            {services.map((s, i) => {
              const totalItems = services.length;
              const angle = (i * 2 * Math.PI) / totalItems;
              const radius = 220; 
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));

              const isActive = i === activeIdx;

              return (
                <button
                  key={s.title}
                  onMouseEnter={() => handleUserSelect(i)}
                  onClick={() => handleUserSelect(i)}
                  className="absolute w-12 h-12 rounded-full flex items-center justify-center font-montserrat font-black text-sm transition-all duration-300 shadow-md outline-none cursor-pointer z-20 group"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${isActive ? 1.15 : 1})`,
                    background: isActive ? "var(--accent)" : "var(--bg-card)",
                    color: isActive ? "#fff" : "var(--text-muted)",
                    border: `1.5px solid ${isActive ? "var(--accent)" : "var(--border-card)"}`,
                    boxShadow: isActive ? "0 0 20px rgba(235, 94, 40, 0.4)" : "none"
                  }}
                >
                  {s.num}

                  {/* High contrast contextual tooltips displaying on node boundaries */}
                  <span 
                    className={`absolute whitespace-nowrap bg-black text-white text-[10px] tracking-wide font-bold px-2 py-1 rounded pointer-events-none transition-all duration-200 -top-8 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP VIEW: Showcase Information Stage panel container screen */}
          <div className="hidden lg:block w-1/2 min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-10 rounded-3xl border relative overflow-hidden h-full flex flex-col justify-between"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
              >
                <div>
                  <div className="mb-6 flex justify-between items-center">
                    <span 
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md"
                      style={{ background: "rgba(235, 94, 40, 0.12)", color: "var(--accent)" }}
                    >
                      {services[activeIdx].tag}
                    </span>
                    
                    {!isAutoPlaying && (
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                        Interactive Mode Active
                      </span>
                    )}
                  </div>

                  <h3 className="font-montserrat font-black text-3xl mb-4" style={{ color: "var(--text)" }}>
                    {services[activeIdx].title}
                  </h3>

                  <p className="font-outfit text-base leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
                    {services[activeIdx].description}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="font-outfit text-xs opacity-40">
                    {isAutoPlaying ? "Watching overview wheel timeline tour" : "Hover or click any peripheral hub node to switch views"}
                  </span>
                  <div className="flex items-center gap-1 font-outfit text-xs font-bold uppercase tracking-wider cursor-pointer" style={{ color: "var(--accent)" }}>
                    Deploy Integration 
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE VIEW: Safe Multi-Card Fallback grid setup optimized for finger tapping */}
          <div className="lg:hidden w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s) => (
              <div 
                key={s.title}
                className="p-6 rounded-2xl border flex flex-col justify-between gap-4"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-montserrat font-black text-sm" style={{ color: "var(--accent)" }}>
                      {s.num}
                    </span>
                    <span 
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ background: "rgba(235, 94, 40, 0.12)", color: "var(--accent)" }}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="font-montserrat font-bold text-lg mb-2" style={{ color: "var(--text)" }}>
                    {s.title}
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {s.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 font-outfit text-xs font-bold animate-pulse" style={{ color: "var(--accent)" }}>
                  Explore Integration 
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}