
"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
}

function getPaletteColors(): string[] {
  if (typeof document === "undefined") return ["#F59E0B", "#ffffff"];
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue("--accent").trim() || "#F59E0B";
  const text = style.getPropertyValue("--text").trim() || "#ffffff";
  const bgCard = style.getPropertyValue("--bg-card").trim() || "#ffffff";
  // Build a small palette: main accent, text color, bg-card, and two lighter tints
  return [accent, accent, accent, text, bgCard, accent, text, bgCard];
}

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  size: number;
  color: string;
  shape: "rect" | "circle";
  alpha: number;
  decay: number;
}

const mkPiece = (W: number, H: number, colors: string[]): Piece => ({
  x: W * (0.3 + Math.random() * 0.4),
  y: H * 0.45,
  vx: (Math.random() - 0.5) * 14,
  vy: -(Math.random() * 12 + 6),
  angle: Math.random() * Math.PI * 2,
  spin: (Math.random() - 0.5) * 0.25,
  size: Math.random() * 7 + 4,
  color: colors[Math.floor(Math.random() * colors.length)],
  shape: Math.random() > 0.45 ? "circle" : "rect",
  alpha: 1,
  // Faster decay for smaller pieces — they feel lighter
  decay: 0.012 + Math.random() * 0.010,
});

export default function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Track the burst generation so re-triggering works correctly
  const burstRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Bump generation — cancels any in-flight animation from a previous burst
    burstRef.current += 1;
    const generation = burstRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const GRAVITY = 0.38;
    const DRAG = 0.985;
    const colors = getPaletteColors();

    // Stagger emission: spawn pieces in small waves so they fan out naturally
    const pieces: Piece[] = [];
    const TOTAL = 52;
    const WAVES = 4;
    const perWave = Math.ceil(TOTAL / WAVES);

    let rafId: number;
    let wavesFired = 0;
    let frameCount = 0;

    const tick = () => {
      // Guard: if a newer burst started, stop this one
      if (burstRef.current !== generation) return;

      rafId = requestAnimationFrame(tick);
      frameCount++;

      // Fire a new wave every ~6 frames
      if (wavesFired < WAVES && frameCount % 6 === 0) {
        for (let i = 0; i < perWave && pieces.length < TOTAL; i++) {
          pieces.push(mkPiece(W, H, colors));
        }
        wavesFired++;
      }

      ctx.clearRect(0, 0, W, H);

      let alive = false;

      for (const p of pieces) {
        if (p.alpha <= 0) continue;
        alive = true;

        // Physics
        p.vy += GRAVITY;
        p.vx *= DRAG;
        p.vy *= DRAG;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.alpha -= p.decay;

        if (p.alpha <= 0) { p.alpha = 0; continue; }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Slightly squashed rect feels more like confetti paper
          ctx.fillRect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6);
        }

        ctx.restore();
      }

      // Stop when all pieces have faded out and all waves fired
      if (!alive && wavesFired >= WAVES && pieces.length >= TOTAL) {
        cancelAnimationFrame(rafId);
        ctx.clearRect(0, 0, W, H);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      // Clear canvas on unmount / re-trigger so stale frames don't linger
      ctx.clearRect(0, 0, W, H);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20 }}
      aria-hidden="true"
    />
  );
}