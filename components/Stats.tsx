"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 94, suffix: "%", prefix: "", label: "On-Time Delivery", desc: "Industry-leading delivery performance" },
  { value: 3200, suffix: "", prefix: "$", label: "Avg Weekly Take-Home", desc: "Per active driver on the platform" },
  { value: 12000, suffix: "+", prefix: "", label: "Active Drivers", desc: "Growing fleet across all 48 states" },
  { value: 38, suffix: "%", prefix: "", label: "Lower Operating Cost", desc: "Vs. industry average for comparable fleets" },
];

function Counter({ value, prefix, suffix, animate }: { value: number; prefix: string; suffix: string; animate: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const steps = 60, dur = 1800, sv = value / steps, st = dur / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += sv;
      if (cur >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, st);
    return () => clearInterval(t);
  }, [animate, value]);
  const display = value >= 1000 ? count.toLocaleString() : String(count);
  return <span>{prefix}{display}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="stats" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="section-label">By the Numbers</p>
          <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
            Numbers That <span style={{ color: "var(--accent)" }}>Speak for Themselves</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card p-6 md:p-8">
              <div className="font-montserrat font-black text-4xl md:text-5xl mb-3" style={{ color: "var(--accent)" }}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} animate={inView} />
              </div>
              <h3 className="font-montserrat font-bold text-base mb-1" style={{ color: "var(--text)" }}>{s.label}</h3>
              <p className="font-outfit text-sm" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
