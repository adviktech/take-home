"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import LiveFleetFlow from "@/components/LiveFleetFlow";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const DRIVER_TOASTS = [
  { name: "Marcus T.", amount: "$3,240", lane: "OTR · Solo" },
  { name: "DeShawn P.", amount: "$2,890", lane: "Regional · Team" },
  { name: "Hector R.", amount: "$3,560", lane: "OTR · Team" },
  { name: "Sarah K.", amount: "$2,650", lane: "Regional · Solo" },
  { name: "Tony W.", amount: "$4,100", lane: "OTR · Solo" },
];

const WEEK_BARS = [72, 85, 64, 91, 78, 88, 95];

const CYCLING_BENEFITS = [
  "No dispatcher markup — ever.",
  "Weekly pay floor, guaranteed.",
  "Booking to bank, fully automated.",
  "Real-time freight visibility.",
  "48-state coverage, zero surprises.",
];

// ---------------------------------------------------------------------------
// useCountUp — counts a number up from 0 with an ease-out cubic
// ---------------------------------------------------------------------------
function useCountUp(end: number, duration = 1800, delay = 0): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [end, duration, delay]);
  return count;
}

// ---------------------------------------------------------------------------
// useFleetData — shared live state for desktop + mobile panels
// ---------------------------------------------------------------------------
function useFleetData() {
  const [fleetTotal, setFleetTotal] = useState(147832);
  const [toastIdx, setToastIdx] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);

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
    return () => {
      clearInterval(earningsIv);
      clearInterval(toastIv);
    };
  }, []);

  return { fleetTotal, toastIdx, toastVisible };
}

// ---------------------------------------------------------------------------
// CyclingTagline — rotates through CYCLING_BENEFITS, no flicker
// ---------------------------------------------------------------------------
function CyclingTagline() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx(p => (p + 1) % CYCLING_BENEFITS.length), 2800);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="flex items-center gap-2 mb-10">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: "var(--accent)" }}
      />
      <div style={{ overflow: "hidden", height: "1.25rem", position: "relative", minWidth: 240 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            className="font-outfit text-sm font-semibold"
            style={{ color: "var(--text-muted)", display: "block" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {CYCLING_BENEFITS[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LiveDashboard — desktop right panel
// ---------------------------------------------------------------------------
interface LiveDashboardProps {
  fleetTotal: number;
  toastIdx: number;
  toastVisible: boolean;
}

function LiveDashboard({ fleetTotal, toastIdx, toastVisible }: LiveDashboardProps) {
  const [activeBar, setActiveBar] = useState(6);

  useEffect(() => {
    const barIv = setInterval(() => setActiveBar(p => (p + 1) % 7), 1400);
    return () => clearInterval(barIv);
  }, []);

  const toast = DRIVER_TOASTS[toastIdx];

  return (
    <div className="relative pb-10 pl-6">
      {/* Main dashboard card */}
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.10)",
        }}
        initial={{ opacity: 0, y: 40, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 pt-5 pb-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <div
              className="font-outfit text-xs uppercase tracking-widest font-semibold mb-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              Fleet Command Center
            </div>
            <div className="font-montserrat font-black text-base" style={{ color: "var(--text)" }}>
              Weekly Earnings
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            <span className="font-outfit text-[11px] font-bold" style={{ color: "var(--accent)" }}>
              LIVE
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Big earnings number */}
          <div className="mb-5">
            <div
              className="font-outfit text-xs uppercase tracking-widest mb-1"
              style={{ color: "var(--text-faint)" }}
            >
              Fleet Total Earned This Week
            </div>
            <div
              className="font-montserrat font-black tabular-nums leading-none"
              style={{ fontSize: "2.6rem", color: "var(--accent)" }}
            >
              ${fleetTotal.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className="font-outfit text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}
              >
                ↑ 12.4%
              </span>
              <span className="font-outfit text-xs" style={{ color: "var(--text-faint)" }}>
                vs last week
              </span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-2 h-24 mb-2">
            {WEEK_BARS.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1"
                style={{ borderRadius: "4px 4px 0 0" }}
                animate={{
                  height: `${h}%`,
                  background: i === activeBar ? "var(--accent)" : "var(--bg-alt)",
                  opacity: i === activeBar ? 1 : 0.55,
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
          <div className="flex gap-2 mb-5">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div
                key={d}
                className="flex-1 text-center font-outfit text-[10px]"
                style={{
                  color: i === activeBar ? "var(--accent)" : "var(--text-faint)",
                  fontWeight: i === activeBar ? 700 : 400,
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "247", label: "Active Drivers" },
              { val: "$3.2k", label: "Avg/Driver" },
              { val: "98.1%", label: "On-Time" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}
              >
                <div
                  className="font-montserrat font-black text-sm mb-0.5"
                  style={{ color: "var(--text)" }}
                >
                  {val}
                </div>
                <div
                  className="font-outfit text-[10px] uppercase tracking-wide"
                  style={{ color: "var(--text-faint)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Toast notification */}
      <div className="absolute bottom-0 left-0" style={{ zIndex: 10, minWidth: 230 }}>
        <AnimatePresence mode="wait">
          {toastVisible && (
            <motion.div
              key={toastIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl flex items-center gap-3"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                padding: "10px 14px",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-montserrat font-black text-sm"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                {toast.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-outfit text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {toast.name} just locked in
                </div>
                <div
                  className="font-montserrat font-black text-sm"
                  style={{ color: "var(--text)" }}
                >
                  {toast.amount}
                  <span
                    className="text-xs font-outfit font-normal"
                    style={{ color: "var(--text-muted)" }}
                  >
                    /wk guaranteed
                  </span>
                </div>
                <div className="font-outfit text-[10px]" style={{ color: "var(--text-faint)" }}>
                  {toast.lane}
                </div>
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
        <div className="font-outfit text-[10px] text-white opacity-80 uppercase tracking-wider">
          Drivers Earning
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MobileProofCard — compact live panel shown on mobile / tablet only
// ---------------------------------------------------------------------------
interface MobileProofCardProps {
  fleetTotal: number;
  toastIdx: number;
  toastVisible: boolean;
}

function MobileProofCard({ fleetTotal, toastIdx, toastVisible }: MobileProofCardProps) {
  const toast = DRIVER_TOASTS[toastIdx];

  return (
    <motion.div
      className="lg:hidden mt-8 rounded-2xl overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span
          className="font-outfit text-[11px] uppercase tracking-widest font-semibold"
          style={{ color: "var(--text-muted)" }}
        >
          Fleet Earnings · Live
        </span>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full"
          style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
          <span className="font-outfit text-[10px] font-bold" style={{ color: "var(--accent)" }}>
            LIVE
          </span>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Earnings number */}
        <div className="mb-4">
          <div
            className="font-montserrat font-black tabular-nums leading-none"
            style={{ fontSize: "2rem", color: "var(--accent)" }}
          >
            ${fleetTotal.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="font-outfit text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}
            >
              ↑ 12.4%
            </span>
            <span className="font-outfit text-xs" style={{ color: "var(--text-faint)" }}>
              earned this week by fleet
            </span>
          </div>
        </div>

        {/* Live toast */}
        <AnimatePresence mode="wait">
          {toastVisible && (
            <motion.div
              key={toastIdx}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 rounded-xl p-3"
              style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-montserrat font-black text-sm"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                {toast.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-outfit text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {toast.name} just locked in
                </div>
                <div
                  className="font-montserrat font-black text-sm"
                  style={{ color: "var(--text)" }}
                >
                  {toast.amount}
                  <span
                    className="font-outfit font-normal text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    /wk guaranteed
                  </span>
                </div>
                <div className="font-outfit text-[10px]" style={{ color: "var(--text-faint)" }}>
                  {toast.lane}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { val: "247", label: "Active Drivers" },
            { val: "$3.2k", label: "Avg/Driver" },
            { val: "98.1%", label: "On-Time" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="rounded-xl p-2.5 text-center"
              style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}
            >
              <div
                className="font-montserrat font-black text-sm mb-0.5"
                style={{ color: "var(--text)" }}
              >
                {val}
              </div>
              <div
                className="font-outfit text-[9px] uppercase tracking-wide leading-tight"
                style={{ color: "var(--text-faint)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ScrollTruckIndicator — truck rides a highway as you scroll through the hero
// ---------------------------------------------------------------------------
function ScrollTruckIndicator() {
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 45, damping: 16 });
  const truckLeft = useTransform(smoothProgress, [0, 1], ["4%", "91%"]);
  // Road fill width tracks slightly behind the truck
  const roadFill = useTransform(smoothProgress, [0, 1], ["4%", "95%"]);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p =
        scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
      rawProgress.set(p);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [rawProgress]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* Road surface */}
      <div
        className="relative w-full"
        style={{
          height: 52,
          background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.32) 100%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Road tarmac strip */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "30%",
            height: 22,
            background: "rgba(0,0,0,0.28)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        />

        {/* Dashed centre line */}
        <div
          className="absolute left-0 right-0 flex items-center"
          style={{ top: "calc(30% + 10px)", height: 2, gap: 0 }}
        >
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 2,
                marginLeft: 2,
                marginRight: 2,
                background: "rgba(245,158,11,0.22)",
                borderRadius: 1,
              }}
            />
          ))}
        </div>

        {/* Amber progress glow behind the truck */}
        <motion.div
          className="absolute left-0"
          style={{
            top: "28%",
            height: 26,
            width: roadFill,
            background:
              "linear-gradient(90deg, rgba(245,158,11,0.10) 0%, rgba(245,158,11,0.05) 100%)",
            borderRadius: "0 3px 3px 0",
          }}
        />

        {/* Truck */}
        <motion.div
          className="absolute"
          style={{
            left: truckLeft,
            top: "50%",
            translateY: "-100%",
            translateX: "-50%",
          }}
        >
          <svg
            width="64"
            height="30"
            viewBox="0 0 64 30"
            fill="none"
            aria-hidden="true"
          >
            {/* Trailer body */}
            <rect
              x="0" y="5" width="38" height="16" rx="2.5"
              fill="rgba(30,25,20,0.85)"
              stroke="rgba(245,158,11,0.55)"
              strokeWidth="1"
            />
            {/* Trailer ribs */}
            {[8, 14, 20, 26, 32].map(x => (
              <line
                key={x}
                x1={x} y1="5" x2={x} y2="21"
                stroke="rgba(245,158,11,0.18)"
                strokeWidth="0.8"
              />
            ))}
            <text
              x="3" y="15"
              fontFamily="monospace"
              fontSize="4"
              fill="rgba(245,158,11,0.65)"
            >
              SUPERTRUCK
            </text>
            {/* Cab */}
            <rect
              x="38" y="2" width="22" height="19" rx="3"
              fill="rgba(245,158,11,0.92)"
            />
            {/* Windshield */}
            <rect
              x="51" y="5" width="7" height="9" rx="2"
              fill="white" fillOpacity="0.75"
            />
            {/* Side window */}
            <rect
              x="41" y="5" width="7" height="7" rx="1.5"
              fill="white" fillOpacity="0.25"
            />
            {/* Exhaust stack */}
            <rect
              x="42" y="-4" width="3" height="7" rx="1"
              fill="rgba(200,170,100,0.6)"
            />
            {/* Exhaust puff */}
            <circle cx="43.5" cy="-5" r="2" fill="rgba(200,180,120,0.2)" />
            {/* Bumper */}
            <rect
              x="59" y="14" width="4" height="5" rx="1"
              fill="rgba(200,160,80,0.7)"
            />
            {/* Trailer wheels */}
            <circle cx="10" cy="21" r="6" fill="rgba(30,30,30,0.9)" />
            <circle cx="10" cy="21" r="2.5" fill="rgba(245,158,11,0.5)" />
            <circle cx="10" cy="21" r="1" fill="rgba(255,255,255,0.6)" />
            <circle cx="26" cy="21" r="6" fill="rgba(30,30,30,0.9)" />
            <circle cx="26" cy="21" r="2.5" fill="rgba(245,158,11,0.5)" />
            <circle cx="26" cy="21" r="1" fill="rgba(255,255,255,0.6)" />
            {/* Cab wheel */}
            <circle cx="48" cy="21" r="6" fill="rgba(30,30,30,0.9)" />
            <circle cx="48" cy="21" r="2.5" fill="rgba(245,158,11,0.5)" />
            <circle cx="48" cy="21" r="1" fill="rgba(255,255,255,0.6)" />
            {/* Headlight */}
            <rect
              x="59" y="6" width="3" height="4" rx="1"
              fill="rgba(255,245,180,0.9)"
            />
          </svg>
        </motion.div>

        {/* City endpoints */}
        <span
          className="absolute bottom-1.5 left-4 font-outfit text-[9px] uppercase tracking-widest select-none"
          style={{ color: "rgba(245,158,11,0.3)" }}
        >
          Los Angeles
        </span>
        <span
          className="absolute bottom-1.5 right-4 font-outfit text-[9px] uppercase tracking-widest select-none"
          style={{ color: "rgba(245,158,11,0.3)" }}
        >
          New York
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero headline words
// ---------------------------------------------------------------------------
const LINE1 = ["Your", "Guaranteed"];
const LINE2 = ["Take-Home", "Floor."];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export default function Hero() {
  // Shared live data — one source of truth for desktop + mobile panels
  const fleetData = useFleetData();

  // Counter values for stats strip
  const c1 = useCountUp(12000, 2000, 1300);
  const c2 = useCountUp(48, 1400, 1400);
  const c3 = useCountUp(100, 1600, 1500);

  // Dashboard visibility toggle
  const [showDashboard, setShowDashboard] = useState(true);

  // Parallax tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 120, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tiltX.set(((e.clientY - cy) / (rect.height / 2)) * -6);
      tiltY.set(((e.clientX - cx) / (rect.width / 2)) * 6);
    },
    [tiltX, tiltY]
  );

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const STATS = [
    { val: `${c1.toLocaleString()}+`, label: "Active Drivers" },
    { val: String(c2), label: "States Covered" },
    { val: "$0", label: "Hidden Fees" },
    { val: `${c3}%`, label: "Guaranteed Floor" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <LiveFleetFlow />

      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px]"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, var(--accent-light) 0%, transparent 60%)",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px]"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, var(--accent-light) 0%, transparent 60%)",
            opacity: 0.25,
          }}
        />
        {/* Content spotlight — darkens the periphery so the eye anchors to the text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 28% 48%, transparent 30%, rgba(0,0,0,0.18) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 min-h-screen items-center pt-24 pb-16">

          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
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
                      style={{
                        fontSize: "clamp(3rem, 7vw, 6rem)",
                        color: "var(--text-muted)",
                      }}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
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
                      style={{
                        fontSize: "clamp(3rem, 7vw, 6rem)",
                        color: "var(--accent)",
                      }}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.4 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="font-outfit text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              FourFleet eliminates dispatcher markup, guarantees your weekly pay floor, and
              automates every step from booking to bank.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <motion.a
                href="#calculator"
                className="btn-fill px-8 py-4 rounded-xl font-montserrat font-black text-base text-center hero-cta-glow"
                style={{
                  background: "var(--text)",
                  color: "var(--bg)",
                  border: "2px solid var(--text)",
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Calculate My Take-Home →
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="px-8 py-4 rounded-xl font-montserrat font-black text-base text-center transition-colors duration-200"
                style={{
                  background: "transparent",
                  color: "var(--text)",
                  border: "2px solid var(--border)",
                }}
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

            {/* Cycling tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <CyclingTagline />
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {STATS.map(({ val, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.08, duration: 0.4 }}
                >
                  <div
                    className="font-montserrat font-black text-2xl leading-none tabular-nums"
                    style={{ color: "var(--accent)" }}
                  >
                    {val}
                  </div>
                  <div
                    className="font-outfit text-xs uppercase tracking-wider mt-0.5"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile proof card — visible below lg only */}
            <MobileProofCard {...fleetData} />
          </div>

          {/* Right: toggle button + dashboard (desktop only) */}
          <div className="hidden lg:block relative">
            {/* Toggle button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={() => setShowDashboard(v => !v)}
              className="absolute -top-10 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-outfit text-xs font-semibold transition-colors duration-200 cursor-pointer"
              style={{
                background: "var(--bg-alt)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                zIndex: 20,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {showDashboard ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                  Hide chart
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Show chart
                </>
              )}
            </motion.button>

            <AnimatePresence mode="wait">
              {showDashboard && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={
                    {
                      rotateX: springX,
                      rotateY: springY,
                      perspective: 1000,
                      transformStyle: "preserve-3d",
                    } as React.CSSProperties
                  }
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
                  >
                    <LiveDashboard {...fleetData} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll truck — rides the highway as you scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
      >
        <ScrollTruckIndicator />
      </motion.div>
    </section>
  );
}
