// "use client";

// import { motion } from "framer-motion";

// function AnimatedArrow({ delay = 0 }: { delay?: number }) {
//   return (
//     <svg width="48" height="24" viewBox="0 0 48 24" className="flex-shrink-0" style={{ overflow: "visible" }}>
//       <line x1="2" y1="12" x2="40" y2="12" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3" />
//       <path d="M35 7 L42 12 L35 17" stroke="var(--border)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
//       {[delay, delay + 0.75].map((d, i) => (
//         <motion.g
//           key={i}
//           animate={{ x: [0, 38], opacity: [0, 1, 1, 0] }}
//           transition={{ duration: 1.5, delay: d, repeat: Infinity, ease: "linear", repeatDelay: 0.1 }}
//         >
//           <circle cx={2} cy={12} r={3} fill="var(--accent)" />
//         </motion.g>
//       ))}
//     </svg>
//   );
// }

// const hardware = [
//   { title: "ELD & GPS", subtitle: "HOS & Asset Tracking", tag: "HOS Compliance", description: "Electronic Logging Devices and GPS units sync with Supertruck OS to automate Hours of Service compliance and provide real-time asset location data across your entire fleet.", features: ["Automated HOS logging", "Real-time asset tracking", "FMCSA compliance alerts", "Route optimization data"] },
//   { title: "AI Dashcams", subtitle: "Safety Monitoring", tag: "Safety Score", description: "Computer vision dashcams detect unsafe driving events in real-time, feeding data directly into FleetWatch and triggering dynamic insurance premium adjustments.", features: ["Forward + cab-facing video", "AI event detection", "Insurance premium reduction", "Driver coaching alerts"] },
//   { title: "Asset Sensors", subtitle: "Fuel & Cargo Health", tag: "Cargo Integrity", description: "IoT sensors monitor fuel levels, cargo temperature, door status, and structural integrity — ensuring compliance and protecting high-value freight.", features: ["Real-time fuel monitoring", "Cargo temperature alerts", "Tamper detection", "Predictive maintenance signals"] },
// ];

// export default function IoTStack() {
//   return (
//     <section id="iot" className="py-24" style={{ background: "var(--bg)" }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
//           <p className="section-label">IoT Infrastructure</p>
//           <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
//             Hardware + Software<br/><span style={{ color: "var(--accent)" }}>in Sync</span>
//           </h2>
//           <p className="font-outfit text-lg mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
//             FourFleet integrates seamlessly with the physical devices already in your trucks — turning raw sensor data into automated decisions.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {hardware.map((item, i) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7, delay: i * 0.12 }}
//               className="card p-7"
//             >
//               <span className="inline-block font-outfit text-xs font-bold px-3 py-1 rounded-full mb-5" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{item.tag}</span>
//               <h3 className="font-montserrat font-black text-xl mb-1" style={{ color: "var(--text)" }}>{item.title}</h3>
//               <p className="font-outfit text-sm font-semibold mb-4" style={{ color: "var(--accent)" }}>{item.subtitle}</p>
//               <p className="font-outfit text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>{item.description}</p>
//               <ul className="space-y-2">
//                 {item.features.map(f => (
//                   <li key={f} className="flex items-center gap-2.5 font-outfit text-sm" style={{ color: "var(--text-muted)" }}>
//                     <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
//                     {f}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-12 flex items-center justify-center gap-2 flex-wrap">
//           {[
//             { type: "node" as const, text: "ELD Data", accent: false },
//             { type: "arrow" as const, delay: 0 },
//             { type: "node" as const, text: "Supertruck OS", accent: true },
//             { type: "arrow" as const, delay: 0.35 },
//             { type: "node" as const, text: "Automated Action", accent: false },
//           ].map((item, i) =>
//             item.type === "node" ? (
//               <span key={i} className="font-outfit text-sm font-medium"
//                 style={{ color: item.accent ? "var(--accent)" : "var(--text-muted)", fontWeight: item.accent ? 700 : 500 }}>
//                 {item.text}
//               </span>
//             ) : (
//               <AnimatedArrow key={i} delay={item.delay} />
//             )
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
"use client";

import { motion } from "framer-motion";

const hardware = [
  { 
    title: "ELD & GPS Systems", 
    subtitle: "HOS & Fleet Asset Tracking", 
    tag: "HOS Compliance", 
    metric: "0.0ms Latency",
    description: "Electronic Logging Devices and GPS telemetry units establish a secure connection with Supertruck OS to automate real-time Hours of Service compliance vectors, route mapping, and asset location logs.", 
    features: ["Automated HOS logging", "Real-time asset tracking", "FMCSA compliance alerts", "Route optimization data"] 
  },
  { 
    title: "Computer Vision Dashcams", 
    subtitle: "Real-Time AI Safety Monitoring", 
    tag: "Safety Score", 
    metric: "Edge AI Active",
    description: "Next-generation spatial dashcams process road frames locally to detect safety events instantly, streaming analytical signals directly to FleetWatch to optimize insurance premiums dynamically.", 
    features: ["Forward + cab-facing video", "AI event detection", "Insurance premium reduction", "Driver coaching alerts"] 
  },
  { 
    title: "Telemetry Asset Sensors", 
    subtitle: "Fuel Dynamics & Cargo Integrity", 
    tag: "Cargo Integrity", 
    metric: "IoT Mesh Node",
    description: "Wireless sensor clusters monitor structural door seals, reefer temperatures, and fuel siphon triggers — dispatching warning payloads to prevent transit loss.", 
    features: ["Real-time fuel monitoring", "Cargo temperature alerts", "Tamper detection", "Predictive maintenance signals"] 
  },
];

export default function IoTStack() {
  return (
    <section id="iot" className="py-32" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-20"
        >
          <p className="section-label">Edge Telemetry & Processing</p>
          <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", color: "var(--text)" }}>
            Physical Hardware.<br/>
            <span style={{ color: "var(--accent)" }}>Automated Actions.</span>
          </h2>
          <p className="font-outfit text-base mt-4 max-w-xl" style={{ color: "var(--text-muted)" }}>
            FourFleet ingests unstructured sensor pipelines straight from your vehicles—converting volatile mechanical data streams into automated backend operational events.
          </p>
        </motion.div>

        {/* Creative Split-Architecture Grid */}
        <div className="grid lg:grid-cols-[1fr_2.2fr] gap-12 items-start">
          
          {/* Left Column: Fixed Pipeline Architecture Panel */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--text-faint)" }}>
                Data Pipeline Routing
              </div>
              
              {/* Pipeline Step Visualizer */}
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px" style={{ before: { background: "var(--border)" } } as any}>
                {[
                  { phase: "Physical Ingestion", label: "In-Cabin Hardware Array", status: "Active Pings" },
                  { phase: "Supertruck OS Core", label: "Signal Event Processing", status: "Parsing Matrix", active: true },
                  { phase: "Server Automation", label: "State & Workflow Trigger", status: "Zero-Lease Ops" }
                ].map((p, idx) => (
                  <div key={idx} className="relative pl-8 text-left">
                    {/* Ring Node */}
                    <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-300"
                      style={{ 
                        background: p.active ? "var(--accent)" : "var(--bg-alt)",
                        border: p.active ? "3px solid var(--accent-light)" : "2px solid var(--border)",
                        boxShadow: p.active ? "0 0 12px var(--accent)" : "none"
                      }} 
                    />
                    <div className="font-montserrat font-bold text-xs" style={{ color: p.active ? "var(--accent)" : "var(--text)" }}>
                      {p.phase}
                    </div>
                    <div className="font-outfit text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {p.label}
                    </div>
                    <span className="inline-block font-mono text-[9px] mt-1 px-1.5 py-0.5 rounded" style={{ background: "var(--bg-alt)", color: "var(--text-faint)" }}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Network Metric Card */}
            <div className="rounded-2xl p-5 flex items-center justify-between" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
              <div>
                <div className="font-outfit text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Edge Pipeline Status</div>
                <div className="font-montserrat font-black text-sm text-emerald-500 mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Connected to Telemetry Hub
                </div>
              </div>
              <div className="font-mono text-xs font-bold" style={{ color: "var(--text-muted)" }}>TLS 1.3</div>
            </div>
          </div>

          {/* Right Column: Stacked Offset Stream Blocks */}
          <div className="space-y-6">
            {hardware.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 group"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
                whileHover={{ borderColor: "var(--accent)", transform: "translateY(-2px)" }}
              >
                {/* Meta Header Grid */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block font-outfit text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md mb-2.5" 
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                      {item.tag}
                    </span>
                    <h3 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>
                      {item.title}
                    </h3>
                    <p className="font-outfit text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: "var(--accent)" }}>
                      {item.subtitle}
                    </p>
                  </div>
                  
                  {/* Pseudo Hardware Connection Badge */}
                  <div className="font-mono text-[11px] px-3 py-1 rounded-lg border tracking-tight" style={{ background: "var(--bg-alt)", borderColor: "var(--border)" }}>
                    <span className="text-emerald-500 mr-1.5">●</span> {item.metric}
                  </div>
                </div>

                <p className="font-outfit text-sm leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--text-muted)" }}>
                  {item.description}
                </p>

                {/* Micro Pill Feature Matrix */}
                <div className="pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="font-outfit text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-faint)" }}>
                    Downstream Payload Capabilities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map(f => (
                      <div 
                        key={f} 
                        className="font-outfit text-xs px-3 py-1.5 rounded-xl transition-colors duration-200" 
                        style={{ background: "var(--bg-alt)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Dynamic Horizontal Data Processing Pipeline Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
        >
          <div className="text-left z-10">
            <div className="font-montserrat font-black text-sm uppercase tracking-wider" style={{ color: "var(--text)" }}>
              End-to-End Processing Loop
            </div>
            <p className="font-outfit text-xs" style={{ color: "var(--text-muted)" }}>
              Raw data payloads are evaluated instantly at the edge without manual brokerage interventions.
            </p>
          </div>

          {/* Clean Node Stream */}
          <div className="flex items-center gap-3 font-outfit text-xs font-semibold whitespace-nowrap z-10 bg-card py-2 px-4 rounded-xl">
            <span style={{ color: "var(--text-muted)" }}>Hardware Telemetry</span>
            <span style={{ color: "var(--text-faint)" }}>➔</span>
            <span style={{ color: "var(--accent)" }}>Supertruck Core Engine</span>
            <span style={{ color: "var(--text-faint)" }}>➔</span>
            <span style={{ color: "var(--text-muted)" }}>Automated Ledger Execution</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}