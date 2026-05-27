"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  { number: "01", title: "Broker Posts on Vetted Load Board", description: "Verified brokers list loads on the FourFleet load board. Every load is pre-vetted for creditworthiness before appearing." },
  { number: "02", title: "Carrier Books via One-Click", description: "FleetPay verifies broker credit instantly. Driver books the load with a single tap — no phone calls, no faxes." },
  { number: "03", title: "GPS / ELD Tracks the Trip", description: "Real-time tracking begins. FleetPay activates fuel discounts at 1,200+ partner stations along the route." },
  { number: "04", title: "POD Uploaded to Driver App", description: "Driver uploads proof of delivery. WatchTower auto-generates and sends the invoice to the broker immediately." },
  { number: "05", title: "FleetPay Factors & MyMiles Deposits", description: "Invoice is factored within hours. MyMiles auto-deposits retirement savings per mile. WatchTower closes the file." },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActive(p => (p + 1) % steps.length), 3000);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section id="how-it-works" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="section-label">Operational Flow</p>
          <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
            How FourFleet <span style={{ color: "var(--accent)" }}>Works</span>
          </h2>
          <p className="font-outfit text-lg mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Five seamless steps from load posting to payment — fully automated, fully transparent.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps list */}
          <div className="space-y-2">
            {steps.map((s, i) => (
              <motion.div key={s.number} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActive(i)} className="flex gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300"
                style={{ background: active === i ? "var(--bg-card)" : "transparent", border: active === i ? "1px solid var(--accent)" : "1px solid transparent" }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-montserrat font-black text-lg"
                  style={{ background: active === i ? "var(--accent)" : "var(--bg-alt)", color: active === i ? "#fff" : "var(--text-faint)" }}>
                  {s.number}
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-base mb-1 transition-colors" style={{ color: active === i ? "var(--text)" : "var(--text-muted)" }}>{s.title}</h3>
                  {active === i && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="font-outfit text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {s.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress visualization */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-outfit text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>Fleet Dashboard</p>
                  <h4 className="font-montserrat font-bold text-lg" style={{ color: "var(--text)" }}>Weekly Earnings</h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }}></span>
                  <span className="font-outfit text-xs font-medium" style={{ color: "var(--accent)" }}>Live</span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-40 mb-4">
                {[65, 82, 47, 91, 74, 55, 88].map((h, i) => (
                  <motion.div key={i} className="flex-1 rounded-t" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: i * 0.06 }} style={{ height: `${h}%`, transformOrigin: "bottom", background: i === active % 7 ? "var(--accent)" : "var(--bg-alt)" }} />
                ))}
              </div>
              <div className="flex gap-3 mb-5">
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                  <div key={d} className="flex-1 text-center font-outfit text-xs" style={{ color: "var(--text-faint)" }}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ label: "Step", value: steps[active].number }, { label: "Revenue", value: "$" + (3200 + active * 400).toLocaleString() }, { label: "On-Time", value: "94%" }].map(item => (
                  <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: "var(--bg-alt)" }}>
                    <div className="font-montserrat font-black text-lg" style={{ color: "var(--accent)" }}>{item.value}</div>
                    <div className="font-outfit text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-outfit text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "var(--text-faint)" }}>Current Step</p>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
                  <motion.div className="h-full rounded-full" animate={{ width: `${((active + 1) / steps.length) * 100}%` }} transition={{ duration: 0.5 }} style={{ background: "var(--accent)" }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
