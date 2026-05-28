"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DRIVER_TOASTS = [
  { name: "Marcus T.", amount: "$3,240", lane: "OTR · Solo" },
  { name: "DeShawn P.", amount: "$2,890", lane: "Regional · Team" },
  { name: "Hector R.", amount: "$3,560", lane: "OTR · Team" },
  { name: "Sarah K.", amount: "$2,650", lane: "Regional · Solo" },
  { name: "Tony W.", amount: "$4,100", lane: "OTR · Solo" },
];

const WEEK_BARS = [72, 85, 64, 91, 78, 88, 95];

function LiveDashboard() {
  const [fleetTotal, setFleetTotal] = useState(147832);
  const [toastIdx, setToastIdx] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);
  const [activeBar, setActiveBar] = useState(6);

  useEffect(() => {
    const earningsIv = setInterval(() => {
      setFleetTotal(p => p + Math.floor(Math.random() * 80 + 20));
    }, 1800);
    const toastIv = setInterval(() => {
      setToastVisible(false);
      setTimeout(() => {
        setToastIdx(p => (p + 1) % DRIVER_TOASTS.length);
        setToastVisible(true);
      }, 350);
    }, 3200);
    const barIv = setInterval(() => {
      setActiveBar(p => (p + 1) % 7);
    }, 1400);
    return () => { clearInterval(earningsIv); clearInterval(toastIv); clearInterval(barIv); };
  }, []);

  const toast = DRIVER_TOASTS[toastIdx];

  return (
    <div className="relative pb-10 pl-6">
      {/* Main dashboard card */}
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}
        initial={{ opacity: 0, y: 40, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <div className="font-outfit text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>Fleet Command Center</div>
            <div className="font-montserrat font-black text-base" style={{ color: "var(--text)" }}>Weekly Earnings</div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            <span className="font-outfit text-[11px] font-bold" style={{ color: "var(--accent)" }}>LIVE</span>
          </div>
        </div>

        <div className="p-6">
          {/* Big earnings number */}
          <div className="mb-5">
            <div className="font-outfit text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-faint)" }}>Fleet Total Earned This Week</div>
            <div className="font-montserrat font-black tabular-nums leading-none" style={{ fontSize: "2.6rem", color: "var(--accent)" }}>
              ${fleetTotal.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="font-outfit text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>↑ 12.4%</span>
              <span className="font-outfit text-xs" style={{ color: "var(--text-faint)" }}>vs last week</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-2 h-24 mb-2">
            {WEEK_BARS.map((h, i) => (
              <motion.div key={i} className="flex-1"
                style={{ borderRadius: "4px 4px 0 0" }}
                animate={{ height: `${h}%`, background: i === activeBar ? "var(--accent)" : "var(--bg-alt)", opacity: i === activeBar ? 1 : 0.55 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
          <div className="flex gap-2 mb-5">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={d} className="flex-1 text-center font-outfit text-[10px]"
                style={{ color: i === activeBar ? "var(--accent)" : "var(--text-faint)", fontWeight: i === activeBar ? 700 : 400 }}>
                {d}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[{ val: "247", label: "Active Drivers" }, { val: "$3.2k", label: "Avg/Driver" }, { val: "98.1%", label: "On-Time" }].map(({ val, label }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
                <div className="font-montserrat font-black text-sm mb-0.5" style={{ color: "var(--text)" }}>{val}</div>
                <div className="font-outfit text-[10px] uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Toast notification */}
      <div className="absolute bottom-0 left-0" style={{ zIndex: 10, minWidth: 230 }}>
        <AnimatePresence mode="wait">
          {toastVisible && (
            <motion.div key={toastIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl flex items-center gap-3"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", padding: "10px 14px" }}
            >
              <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-montserrat font-black text-sm"
                style={{ background: "var(--accent)", color: "#fff" }}>
                {toast.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-outfit text-[11px]" style={{ color: "var(--text-muted)" }}>{toast.name} just locked in</div>
                <div className="font-montserrat font-black text-sm" style={{ color: "var(--text)" }}>
                  {toast.amount}<span className="text-xs font-outfit font-normal" style={{ color: "var(--text-muted)" }}>/wk guaranteed</span>
                </div>
                <div className="font-outfit text-[10px]" style={{ color: "var(--text-faint)" }}>{toast.lane}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-4 right-4 rounded-2xl px-4 py-2 text-center"
        style={{ background: "var(--accent)", boxShadow: "0 8px 24px rgba(245,158,11,0.4)" }}
      >
        <div className="font-montserrat font-black text-white text-base leading-none">12,000+</div>
        <div className="font-outfit text-[10px] text-white opacity-80 uppercase tracking-wider">Drivers Earning</div>
      </motion.div>
    </div>
  );
}

const LINE1 = ["Your", "Guaranteed"];
const LINE2 = ["Take-Home", "Floor."];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px]"
          style={{ background: "radial-gradient(circle at 70% 30%, var(--accent-light) 0%, transparent 60%)", opacity: 0.7 }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]"
          style={{ background: "radial-gradient(circle at 20% 80%, var(--accent-light) 0%, transparent 60%)", opacity: 0.35 }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 min-h-screen items-center pt-24 pb-16">

          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-outfit text-xs font-bold tracking-widest uppercase"
              style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              Powered by Supertruck.ai
            </motion.div>

            {/* Headline — per-word overflow-hidden clip reveal (avoids horizontal clipping on large screens) */}
            <h1 className="font-montserrat font-black leading-[1.05] mb-6">
              <div>
                {LINE1.map((word, i) => (
                  <span key={word + i} className="inline-block overflow-hidden align-bottom mr-[0.2em]">
                    <motion.span className="inline-block"
                      style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--text-muted)" }}
                      initial={{ y: "110%" }} animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
              <div>
                {LINE2.map((word, i) => (
                  <span key={word + i} className="inline-block overflow-hidden align-bottom mr-[0.2em]">
                    <motion.span className="inline-block"
                      style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--accent)" }}
                      initial={{ y: "110%" }} animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
            </h1>

            {/* Sub */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
              className="font-outfit text-lg md:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: "var(--text-muted)" }}>
              FourFleet eliminates dispatcher markup, guarantees your weekly pay floor, and automates every step from booking to bank.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="#calculator"
                className="btn-fill px-8 py-4 rounded-xl font-montserrat font-black text-base text-center hero-cta-glow"
                style={{ background: "var(--text)", color: "var(--bg)", border: "2px solid var(--text)" }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Calculate My Take-Home →
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="px-8 py-4 rounded-xl font-montserrat font-black text-base text-center transition-colors duration-200"
                style={{ background: "transparent", color: "var(--text)", border: "2px solid var(--border)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text)"; }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                See How It Works
              </motion.a>
            </motion.div>

            {/* Stats strip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { val: "12,000+", label: "Active Drivers" },
                { val: "48", label: "States Covered" },
                { val: "$0", label: "Hidden Fees" },
                { val: "100%", label: "Guaranteed Floor" },
              ].map(({ val, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.08, duration: 0.4 }}>
                  <div className="font-montserrat font-black text-2xl leading-none" style={{ color: "var(--accent)" }}>{val}</div>
                  <div className="font-outfit text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-faint)" }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Live dashboard (desktop only) — entry via LiveDashboard, then bobs continuously */}
          <motion.div
            className="hidden lg:block relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
          >
            <LiveDashboard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ color: "var(--text-faint)" }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1">
          <span className="text-xs tracking-widest uppercase font-outfit">Scroll</span>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 9l5 5 5-5"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
