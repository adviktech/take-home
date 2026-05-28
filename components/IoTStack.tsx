"use client";

import { motion } from "framer-motion";

function AnimatedArrow({ delay = 0 }: { delay?: number }) {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" className="flex-shrink-0" style={{ overflow: "visible" }}>
      <line x1="2" y1="12" x2="40" y2="12" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M35 7 L42 12 L35 17" stroke="var(--border)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[delay, delay + 0.75].map((d, i) => (
        <motion.g
          key={i}
          animate={{ x: [0, 38], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, delay: d, repeat: Infinity, ease: "linear", repeatDelay: 0.1 }}
        >
          <circle cx={2} cy={12} r={3} fill="var(--accent)" />
        </motion.g>
      ))}
    </svg>
  );
}

const hardware = [
  { title: "ELD & GPS", subtitle: "HOS & Asset Tracking", tag: "HOS Compliance", description: "Electronic Logging Devices and GPS units sync with Supertruck OS to automate Hours of Service compliance and provide real-time asset location data across your entire fleet.", features: ["Automated HOS logging", "Real-time asset tracking", "FMCSA compliance alerts", "Route optimization data"] },
  { title: "AI Dashcams", subtitle: "Safety Monitoring", tag: "Safety Score", description: "Computer vision dashcams detect unsafe driving events in real-time, feeding data directly into FleetWatch and triggering dynamic insurance premium adjustments.", features: ["Forward + cab-facing video", "AI event detection", "Insurance premium reduction", "Driver coaching alerts"] },
  { title: "Asset Sensors", subtitle: "Fuel & Cargo Health", tag: "Cargo Integrity", description: "IoT sensors monitor fuel levels, cargo temperature, door status, and structural integrity — ensuring compliance and protecting high-value freight.", features: ["Real-time fuel monitoring", "Cargo temperature alerts", "Tamper detection", "Predictive maintenance signals"] },
];

export default function IoTStack() {
  return (
    <section id="iot" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="section-label">IoT Infrastructure</p>
          <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
            Hardware + Software<br/><span style={{ color: "var(--accent)" }}>in Sync</span>
          </h2>
          <p className="font-outfit text-lg mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            FourFleet integrates seamlessly with the physical devices already in your trucks — turning raw sensor data into automated decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {hardware.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="card p-7"
            >
              <span className="inline-block font-outfit text-xs font-bold px-3 py-1 rounded-full mb-5" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{item.tag}</span>
              <h3 className="font-montserrat font-black text-xl mb-1" style={{ color: "var(--text)" }}>{item.title}</h3>
              <p className="font-outfit text-sm font-semibold mb-4" style={{ color: "var(--accent)" }}>{item.subtitle}</p>
              <p className="font-outfit text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>{item.description}</p>
              <ul className="space-y-2">
                {item.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 font-outfit text-sm" style={{ color: "var(--text-muted)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-2 flex-wrap">
          {[
            { type: "node" as const, text: "ELD Data", accent: false },
            { type: "arrow" as const, delay: 0 },
            { type: "node" as const, text: "Supertruck OS", accent: true },
            { type: "arrow" as const, delay: 0.35 },
            { type: "node" as const, text: "Automated Action", accent: false },
          ].map((item, i) =>
            item.type === "node" ? (
              <span key={i} className="font-outfit text-sm font-medium"
                style={{ color: item.accent ? "var(--accent)" : "var(--text-muted)", fontWeight: item.accent ? 700 : 500 }}>
                {item.text}
              </span>
            ) : (
              <AnimatedArrow key={i} delay={item.delay} />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
