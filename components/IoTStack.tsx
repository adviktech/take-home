"use client";

import { motion } from "framer-motion";

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
          className="mt-12 flex items-center justify-center gap-4">
          {["ELD Data", "→", "Supertruck OS", "→", "Automated Action"].map((item, i) => (
            <span key={i} className="font-outfit text-sm font-medium" style={{ color: item === "→" ? "var(--border)" : i === 2 ? "var(--accent)" : "var(--text-muted)", fontWeight: i === 2 ? 700 : 500 }}>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
