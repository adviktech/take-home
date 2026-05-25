"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Profit counter: $1,000 → $28,400 over ~18 seconds, then loops
function ProfitCounter() {
  const [value, setValue] = useState(1000);

  useEffect(() => {
    const START = 1000;
    const END = 28400;
    const STEP = 15;
    const INTERVAL_MS = 10;

    let current = START;

    const interval = setInterval(() => {
      current += STEP;
      if (current >= END) {
        current = START;
      }
      setValue(current);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 mt-12">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fleet-emerald opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-fleet-emerald"></span>
        </span>
        <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">
          Fleet Earnings This Week
        </span>
      </div>
      <motion.div
        key={Math.floor(value / 1000)}
        className="font-grotesk font-bold text-5xl md:text-7xl text-fleet-emerald tabular-nums"
        style={{ textShadow: "0 0 40px rgba(52, 211, 153, 0.4)" }}
      >
        ${value.toLocaleString()}
      </motion.div>
      <p className="text-slate-500 text-xs tracking-wider">
        LIVE SIMULATION · UPDATES IN REAL-TIME
      </p>
    </div>
  );
}

// Animated grid canvas background
function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animFrame: number;
    let tick = 0;

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 48;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      tick += 0.005;

      // Draw grid lines
      ctx.strokeStyle = "rgba(34,211,238,0.06)";
      ctx.lineWidth = 1;

      for (let x = 0; x < cols; x++) {
        const xPos = x * gridSize;
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < rows; y++) {
        const yPos = y * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke();
      }

      // Draw animated dots at intersections
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const xPos = x * gridSize;
          const yPos = y * gridSize;
          const wave = Math.sin(tick + x * 0.3 + y * 0.2) * 0.5 + 0.5;
          const alpha = wave * 0.35;

          ctx.beginPath();
          ctx.arc(xPos, yPos, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34,211,238,${alpha})`;
          ctx.fill();
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

const headlineWords = ["The", "Operating", "System", "for", "Modern", "Fleets"];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-fleet-bg"
    >
      {/* Canvas Grid */}
      <GridCanvas />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium tracking-widest uppercase text-fleet-cyan mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-fleet-cyan animate-pulse"></span>
          Powered by Supertruck.ai
        </motion.div>

        {/* Headline */}
        <h1 className="font-grotesk font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word + i}
              className={`inline-block mr-[0.25em] ${
                word === "Modern" || word === "Fleets"
                  ? "gradient-text"
                  : "text-white"
              }`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From load booking to payday — FourFleet handles compliance, dispatch,
          maintenance, and earnings in one unified platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#calculator"
            className="px-8 py-3.5 rounded-xl bg-fleet-cyan text-fleet-bg font-semibold text-base hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transform"
          >
            Calculate My Take-Home
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-xl border border-[rgba(34,211,238,0.3)] text-fleet-cyan font-semibold text-base hover:bg-[rgba(34,211,238,0.08)] transition-all duration-200 hover:-translate-y-0.5 transform"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Profit Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <ProfitCounter />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-slate-600"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3v10M3 9l5 5 5-5"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
