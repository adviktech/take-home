"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveFleetFlow from "@/components/LiveFleetFlow";

// ---------------------------------------------------------------------------
// Driver data pools — 20 names, 4 lanes, weighted random amounts
// ---------------------------------------------------------------------------
const DRIVER_NAMES = [
  "Marcus T.", "DeShawn P.", "Hector R.", "Sarah K.", "Tony W.",
  "Mike J.",   "Lisa M.",    "Carlos V.", "James B.", "Rachel H.",
  "Andre L.",  "Patricia C.","Robert N.", "Keisha D.", "David F.",
  "Maria G.",  "Tyrone S.",  "Amanda R.", "Chris W.", "Tanya M.",
];

const LANES = [
  "OTR · Solo",
  "OTR · Team",
  "Regional · Solo",
  "Regional · Team",
];

// Weighted distribution: most drivers $2,700-$3,500, some high earners
function pickDriver() {
  const name   = DRIVER_NAMES[Math.floor(Math.random() * DRIVER_NAMES.length)];
  const lane   = LANES[Math.floor(Math.random() * LANES.length)];
  const r      = Math.random();
  let base: number;
  if      (r < 0.30) base = 2100 + Math.floor(Math.random() * 600);  // $2,100–2,700
  else if (r < 0.65) base = 2700 + Math.floor(Math.random() * 800);  // $2,700–3,500
  else if (r < 0.90) base = 3500 + Math.floor(Math.random() * 800);  // $3,500–4,300
  else               base = 4300 + Math.floor(Math.random() * 700);  // $4,300–5,000
  const amount = `$${(Math.round(base / 10) * 10).toLocaleString()}`;
  return { name, lane, amount };
}

// ---------------------------------------------------------------------------
// Payment pipeline stages
// ---------------------------------------------------------------------------
const PAY_STAGES = [
  { label: "Load booked",        icon: "📋", color: "var(--text-muted)" },
  { label: "Route confirmed",    icon: "📍", color: "var(--text-muted)" },
  { label: "Floor locked in",    icon: "🔒", color: "var(--accent)"     },
  { label: "Deposited · Friday", icon: "✓",  color: "#10B981"           },
];

// ---------------------------------------------------------------------------
// GuaranteeCard
// ---------------------------------------------------------------------------
interface DriverInfo { name: string; lane: string; amount: string; }

function GuaranteeCard({ driver }: { driver: DriverInfo }) {
  const [stage, setStage] = useState(0);
  const [stageVisible, setStageVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setStageVisible(false);
      setTimeout(() => {
        setStage(p => (p + 1) % PAY_STAGES.length);
        setStageVisible(true);
      }, 280);
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  const current = PAY_STAGES[stage];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        className="absolute -inset-8 -z-10 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      {/* Card */}
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(245,158,11,0.06)",
        }}
        initial={{ opacity: 0, y: 48, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, var(--accent) 0%, rgba(245,158,11,0.2) 100%)",
          }}
        />

        <div className="px-8 pt-7 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div
                className="font-outfit text-[10px] uppercase tracking-[0.18em] font-semibold mb-0.5"
                style={{ color: "var(--text-faint)" }}
              >
                FourFleet · Pay Summary
              </div>
              <div
                className="font-montserrat font-black text-sm"
                style={{ color: "var(--text)" }}
              >
                Weekly Guarantee
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#10B981" }}
              />
              <span
                className="font-outfit text-[10px] font-bold tracking-wide"
                style={{ color: "#10B981" }}
              >
                GUARANTEED
              </span>
            </div>
          </div>

          {/* Amount — fades when driver cycles */}
          <div className="mb-6">
            <div
              className="font-outfit text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--text-faint)" }}
            >
              Your floor this week
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={driver.amount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="font-montserrat font-black tabular-nums leading-none"
                  style={{ fontSize: "3.4rem", color: "var(--accent)" }}
                >
                  {driver.amount}
                </div>
                <div
                  className="font-outfit text-sm mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {driver.lane}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div
            className="my-6"
            style={{ height: 1, background: "var(--border)" }}
          />

          {/* Guarantees */}
          <div className="flex flex-col gap-3 mb-7">
            {[
              "$0 dispatcher markup, ever",
              "Deposited every Friday, guaranteed",
              "Covered if load falls short",
            ].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                  style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}
                >
                  ✓
                </div>
                <span className="font-outfit text-sm" style={{ color: "var(--text-muted)" }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Pipeline */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}
          >
            <div
              className="font-outfit text-[10px] uppercase tracking-widest mb-3"
              style={{ color: "var(--text-faint)" }}
            >
              Payment pipeline
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              {PAY_STAGES.map((_, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="h-1 w-full rounded-full transition-all duration-500"
                    style={{
                      background: i <= stage ? "var(--accent)" : "var(--border)",
                      opacity: i <= stage ? 1 : 0.4,
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ minHeight: 20 }}>
              <AnimatePresence mode="wait">
                {stageVisible && (
                  <motion.div
                    key={stage}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm leading-none">{current.icon}</span>
                    <span
                      className="font-outfit text-xs font-semibold"
                      style={{ color: current.color }}
                    >
                      {current.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating driver badge — cycles with the card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={driver.name}
          initial={{ opacity: 0, scale: 0.9, x: 14 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 14 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-5 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-montserrat font-black text-sm flex-shrink-0"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {driver.name.charAt(0)}
          </div>
          <div>
            <div
              className="font-montserrat font-black text-sm"
              style={{ color: "var(--text)" }}
            >
              {driver.name}
            </div>
            <div
              className="font-outfit text-[10px]"
              style={{ color: "var(--text-faint)" }}
            >
              {driver.amount} deposited · Friday
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
const LINE1 = ["Your", "Guaranteed"];
const LINE2 = ["Take-Home", "Floor."];

export default function Hero() {
  const [showMap, setShowMap]     = useState(true);
  // Start with a fixed driver so SSR and client match, then cycle client-side
  const [driver, setDriver]       = useState<DriverInfo>({
    name: "Marcus T.", lane: "OTR · Solo", amount: "$3,240",
  });

  // Cycle driver every 4 s — client-only, no hydration mismatch
  useEffect(() => {
    const iv = setInterval(() => setDriver(pickDriver()), 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Canvas fleet map — togglable */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            key="fleet-map"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: 0 }}
          >
            <LiveFleetFlow />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px]"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, var(--accent-light) 0%, transparent 60%)",
            opacity: 0.45,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, var(--accent-light) 0%, transparent 60%)",
            opacity: 0.2,
          }}
        />
        {/* Spotlight — darkens edges, anchors eye to left content */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 30% 50%, transparent 25%, rgba(0,0,0,0.22) 100%)",
          }}
        />
      </div>

      {/* Show / hide map toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => setShowMap(v => !v)}
        className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full font-outfit text-xs font-semibold cursor-pointer"
        style={{
          top: "5.5rem",
          right: "1.5rem",
          zIndex: 20,
          background: "var(--bg-alt)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {showMap ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
            Hide map
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Show map
          </>
        )}
      </motion.button>

      {/* Content */}
      <div
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
        style={{ zIndex: 2 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 min-h-screen items-center pt-28 sm:pt-32 pb-24">

          {/* ── Left: Core value ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-outfit text-xs font-bold tracking-widest uppercase"
              style={{
                background: "var(--accent-light)",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              Weekly Pay Guaranteed · Zero Markup
            </motion.div>

            {/* Headline */}
            <h1 className="font-montserrat font-black leading-[1.05] mb-6">
              <div>
                {LINE1.map((word, i) => (
                  <span
                    key={word + i}
                    className="inline-block overflow-hidden align-bottom mr-[0.2em]"
                  >
                    <motion.span
                      className="inline-block"
                      style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--text-muted)" }}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
              <div>
                {LINE2.map((word, i) => (
                  <span
                    key={word + i}
                    className="inline-block overflow-hidden align-bottom mr-[0.2em]"
                  >
                    <motion.span
                      className="inline-block"
                      style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--accent)" }}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="font-outfit text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              FourFleet eliminates dispatcher markup, guarantees your weekly pay
              floor, and automates every step from booking to bank.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex flex-col sm:flex-row gap-4"
            >
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
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text)";
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                See How It Works
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right: Guarantee card (desktop only) ── */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <GuaranteeCard driver={driver} />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 2 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" style={{ color: "var(--text-faint)" }}>
            <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 3v10M3 9l5 5 5-5"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
