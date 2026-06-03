"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ---------------------------------------------------------------------------
// LiveDashboard card
// ---------------------------------------------------------------------------
function LiveDashboard() {
  const [fleetTotal, setFleetTotal] = useState(147832);
  const [toastIdx, setToastIdx] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);
  const [activeBar, setActiveBar] = useState(6);

  useEffect(() => {
    const earningsIv = setInterval(
      () => setFleetTotal(p => p + Math.floor(Math.random() * 80 + 20)),
      1800
    );
    const toastIv = setInterval(() => {
      setToastVisible(false);
      setTimeout(() => {
        setToastIdx(p => (p + 1) % DRIVER_TOASTS.length);
        setToastVisible(true);
      }, 350);
    }, 3200);
    const barIv = setInterval(() => setActiveBar(p => (p + 1) % 7), 1400);
    return () => {
      clearInterval(earningsIv);
      clearInterval(toastIv);
      clearInterval(barIv);
    };
  }, []);

  const toast = DRIVER_TOASTS[toastIdx];

  return (
    <div className="relative pb-12 pl-4 sm:pl-6">
      {/* Card */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.10)",
        }}
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
            <div
              className="font-montserrat font-black text-base"
              style={{ color: "var(--text)" }}
            >
              Weekly Earnings
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{
              background: "var(--accent-light)",
              border: "1px solid var(--accent)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="font-outfit text-[11px] font-bold"
              style={{ color: "var(--accent)" }}
            >
              LIVE
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Fleet total */}
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
              <span
                className="font-outfit text-xs"
                style={{ color: "var(--text-faint)" }}
              >
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
                  background:
                    i === activeBar ? "var(--accent)" : "var(--bg-alt)",
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

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "247", label: "Active Drivers" },
              { val: "$3.2k", label: "Avg/Driver" },
              { val: "98.1%", label: "On-Time" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "var(--bg-alt)",
                  border: "1px solid var(--border)",
                }}
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
      </div>

      {/* Toast */}
      <div
        className="absolute bottom-0 left-0 sm:left-6"
        style={{ zIndex: 10, minWidth: 220 }}
      >
        <AnimatePresence mode="wait">
          {toastVisible && (
            <motion.div
              key={toastIdx}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
                <div
                  className="font-outfit text-[11px]"
                  style={{ color: "var(--text-muted)" }}
                >
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
                <div
                  className="font-outfit text-[10px]"
                  style={{ color: "var(--text-faint)" }}
                >
                  {toast.lane}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="absolute -top-4 right-4 rounded-2xl px-4 py-2 text-center"
        style={{
          background: "var(--accent)",
          boxShadow: "0 8px 24px rgba(245,158,11,0.35)",
        }}
      >
        <div className="font-montserrat font-black text-white text-base leading-none">
          12,000+
        </div>
        <div className="font-outfit text-[10px] text-white opacity-80 uppercase tracking-wider">
          Drivers Earning
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function FleetDashboard() {
  return (
    <section
      id="fleet-dashboard"
      className="py-24 sm:py-32"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — context copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-outfit text-xs uppercase tracking-[0.18em] font-semibold mb-4"
              style={{ color: "var(--accent)" }}
            >
              Live Fleet Performance
            </p>
            <h2
              className="font-montserrat font-black leading-[1.08] mb-6"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                color: "var(--text)",
              }}
            >
              Real money.{" "}
              <span style={{ color: "var(--accent)" }}>Real drivers.</span>
              <br />
              Right now.
            </h2>
            <p
              className="font-outfit text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--text-muted)" }}
            >
              This isn't projected revenue — it's the live earnings counter
              from active FourFleet drivers on the road today. Every dollar
              guaranteed before the load is ever accepted.
            </p>

            {/* Feature bullets */}
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "Floor set before dispatch",
                  body: "Your minimum is locked in the moment a load is confirmed — not after delivery.",
                },
                {
                  title: "Friday, without fail",
                  body: "Direct deposit, every week. No invoice chasing, no net-30 delays.",
                },
                {
                  title: "We cover the shortfall",
                  body: "If the load pays less than your floor, FourFleet makes up the difference.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                    style={{ background: "rgba(16,185,129,0.14)", color: "#10B981" }}
                  >
                    ✓
                  </div>
                  <div>
                    <div
                      className="font-montserrat font-black text-sm mb-0.5"
                      style={{ color: "var(--text)" }}
                    >
                      {title}
                    </div>
                    <div
                      className="font-outfit text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — live dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <LiveDashboard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
