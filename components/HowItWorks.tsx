"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Broker Posts on Vetted Load Board",
    description:
      "Verified brokers list loads on the FourFleet load board. Every load is pre-vetted for creditworthiness before appearing.",
    color: "text-fleet-cyan",
    accent: "bg-fleet-cyan",
  },
  {
    number: "02",
    title: "Carrier Books via One-Click",
    description:
      "FleetPay verifies broker credit instantly. Driver books the load with a single tap — no phone calls, no faxes.",
    color: "text-fleet-indigo",
    accent: "bg-fleet-indigo",
  },
  {
    number: "03",
    title: "GPS / ELD Tracks the Trip",
    description:
      "Real-time tracking begins. FleetPay activates fuel discounts at 1,200+ partner stations along the route.",
    color: "text-fleet-cyan",
    accent: "bg-fleet-cyan",
  },
  {
    number: "04",
    title: "POD Uploaded to Driver App",
    description:
      "Driver uploads proof of delivery. WatchTower auto-generates and sends the invoice to the broker immediately.",
    color: "text-fleet-emerald",
    accent: "bg-fleet-emerald",
  },
  {
    number: "05",
    title: "FleetPay Factors & MyMiles Deposits",
    description:
      "Invoice is factored within hours. MyMiles auto-deposits retirement savings per mile. WatchTower closes the file.",
    color: "text-amber-400",
    accent: "bg-amber-400",
  },
];

// Animated bar chart mock dashboard
function MockDashboard({ activeStep }: { activeStep: number }) {
  const bars = [65, 82, 47, 91, 74, 55, 88];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="glass-card rounded-2xl p-6 h-full min-h-[380px]">
      {/* Dashboard header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
            Fleet Dashboard
          </p>
          <h4 className="font-grotesk font-semibold text-white text-lg">
            Weekly Earnings
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-fleet-emerald animate-pulse"></span>
          <span className="text-fleet-emerald text-xs font-medium">Live</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-3 h-40 mb-4">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md relative"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: "easeOut",
            }}
            style={{
              height: `${height}%`,
              transformOrigin: "bottom",
              background:
                i === activeStep % bars.length
                  ? "linear-gradient(180deg, #22d3ee 0%, #6366f1 100%)"
                  : "rgba(34,211,238,0.15)",
            }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex gap-3">
        {labels.map((label) => (
          <div key={label} className="flex-1 text-center text-slate-600 text-xs">
            {label}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "Loads", value: steps[activeStep]?.number || "01" },
          { label: "Revenue", value: "$" + (3200 + activeStep * 400).toLocaleString() },
          { label: "On-Time", value: "94%" },
        ].map((item) => (
          <motion.div
            key={item.label}
            className="bg-[rgba(255,255,255,0.04)] rounded-xl p-3 text-center"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="font-grotesk font-bold text-fleet-cyan text-lg">
              {item.value}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Step indicator */}
      <div className="mt-4">
        <p className="text-xs text-slate-600 uppercase tracking-widest mb-2 font-medium">
          Current Step
        </p>
        <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-fleet-cyan to-fleet-indigo"
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Auto-advance steps
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section id="how-it-works" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.05) 0%, transparent 60%)",
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
          <span className="inline-block text-fleet-indigo text-xs font-semibold tracking-widest uppercase mb-4">
            Operational Flow
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-5xl text-white mb-4">
            How FourFleet{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Five seamless steps from load posting to payment — fully automated,
            fully transparent.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps list */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`flex gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "glass-card border-[rgba(34,211,238,0.2)]"
                    : "hover:bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <div className="flex-shrink-0">
                  <span
                    className={`font-grotesk font-bold text-2xl ${
                      activeStep === index ? step.color : "text-slate-700"
                    } transition-colors`}
                  >
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3
                    className={`font-grotesk font-semibold text-base mb-1 transition-colors ${
                      activeStep === index ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h3>
                  {activeStep === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-slate-400 text-sm leading-relaxed"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </div>
                {activeStep === index && (
                  <div className="ml-auto flex-shrink-0 self-center">
                    <div className={`w-2 h-2 rounded-full ${step.accent}`} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mock dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <MockDashboard activeStep={activeStep} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
