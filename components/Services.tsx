"use client";

import { motion } from "framer-motion";

const services = [
  { title: "FleetPay", description: "Integrated factoring with one-click load booking and instant payment on delivery. Fuel discount network with GPS fraud prevention.", num: "01" },
  { title: "Comply", description: "Full-service FMCSA authority maintenance and safety administration. We handle the paperwork so you handle the road.", num: "02" },
  { title: "WatchTower", description: "Outsourced load tracking, tracing, and invoicing using the Supertruck.ai dashboard. Every load monitored 24/7.", num: "03" },
  { title: "RoadReady", description: "Subscription-based preventive maintenance with OS-triggered scheduled intervals. Keep your trucks rolling, not stalled.", num: "04" },
  { title: "MyMiles", description: "10–20¢ per mile auto-deposited into a retirement account. Every mile you drive builds your financial future.", num: "05" },
  { title: "AI Maintenance Predictor", description: "Integrates ELD diagnostic codes with RoadReady to auto-book repairs before breakdowns happen.", num: "06" },
  { title: "Dynamic Insurance", description: "Usage-based premiums that fluctuate based on real-time ELD safety data and dashcam footage. Safer drivers pay less.", num: "07" },
  { title: "Training Academy", description: "Platform to train drivers on Supertruck OS and business management. Turn drivers into fleet operators.", num: "08" },
];

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="section-label">Everything You Need</p>
          <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
            Eight Services.<br/><span style={{ color: "var(--accent)" }}>One Platform.</span>
          </h2>
          <p className="font-outfit text-lg mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            FourFleet wraps every operational need into a single, seamless experience — from the first mile to the last invoice.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="card p-6 group cursor-default">
              <div className="font-montserrat font-black text-4xl mb-4 transition-colors" style={{ color: "var(--border)" }}>{s.num}</div>
              <h3 className="font-montserrat font-bold text-lg mb-2" style={{ color: "var(--text)" }}>{s.title}</h3>
              <p className="font-outfit text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.description}</p>
              <div className="mt-5 flex items-center gap-1 font-outfit text-xs font-semibold" style={{ color: "var(--accent)" }}>
                Learn more
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
