"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  description: string;
  color: string;
}

const stats: Stat[] = [
  {
    value: 94,
    suffix: "%",
    prefix: "",
    label: "On-Time Delivery",
    description: "Industry-leading delivery performance",
    color: "text-fleet-cyan",
  },
  {
    value: 3200,
    suffix: "",
    prefix: "$",
    label: "Avg Weekly Take-Home",
    description: "Per active driver on the platform",
    color: "text-fleet-emerald",
  },
  {
    value: 12000,
    suffix: "+",
    prefix: "",
    label: "Active Drivers",
    description: "Growing fleet across all 48 states",
    color: "text-fleet-indigo",
  },
  {
    value: 38,
    suffix: "%",
    prefix: "",
    label: "Lower Operating Cost",
    description: "Vs. industry average for comparable fleets",
    color: "text-amber-400",
  },
];

function StatCounter({ stat, shouldAnimate }: { stat: Stat; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = stat.value / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [shouldAnimate, stat.value]);

  const displayValue =
    stat.value >= 1000
      ? count.toLocaleString()
      : count.toString();

  return (
    <span className={`font-grotesk font-bold text-4xl md:text-5xl ${stat.color} tabular-nums`}>
      {stat.prefix}
      {displayValue}
      {stat.suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="py-24 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-white mb-4">
            Numbers That{" "}
            <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            FourFleet-powered fleets consistently outperform the industry
            average across every metric that matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center hover:border-[rgba(34,211,238,0.25)] transition-all duration-300 group"
            >
              <StatCounter stat={stat} shouldAnimate={isInView} />
              <h3 className="font-grotesk font-semibold text-white mt-2 mb-1">
                {stat.label}
              </h3>
              <p className="text-slate-500 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
