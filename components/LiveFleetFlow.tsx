
"use client";

import { useEffect, useRef, useState } from "react";

// ── Proper US lower-48 outline (normalized 0..1 coords) ───────────────────────
const US_OUTLINE: readonly [number, number][] = [
  // Pacific NW - Washington
  [0.07,0.05],[0.08,0.12],[0.10,0.16],[0.09,0.20],[0.10,0.24],[0.10,0.28],
  // Oregon coast
  [0.09,0.30],[0.09,0.34],[0.10,0.38],[0.09,0.42],[0.10,0.46],
  // California coast (long curve south)
  [0.09,0.50],[0.08,0.54],[0.09,0.58],[0.10,0.62],[0.11,0.65],[0.12,0.68],
  [0.13,0.72],[0.14,0.75],[0.14,0.78],
  // SW corner / AZ-NM border
  [0.16,0.79],[0.18,0.80],[0.20,0.80],[0.24,0.80],[0.28,0.80],[0.32,0.80],
  // Texas bottom — Gulf coast
  [0.36,0.80],[0.40,0.84],[0.42,0.88],[0.44,0.92],[0.47,0.95],
  [0.49,0.97],[0.52,0.98],[0.53,0.96],[0.54,0.93],
  // Texas/Louisiana coast
  [0.55,0.90],[0.56,0.88],[0.57,0.87],[0.58,0.86],[0.59,0.87],
  [0.61,0.88],[0.62,0.89],[0.63,0.88],[0.64,0.86],
  // Louisiana/Mississippi/Alabama coast
  [0.64,0.85],[0.65,0.86],[0.66,0.88],[0.67,0.87],[0.68,0.86],
  [0.69,0.87],[0.70,0.88],[0.71,0.87],[0.72,0.86],
  // Florida peninsula (dips south then back up)
  [0.73,0.85],[0.74,0.84],[0.75,0.86],[0.76,0.88],[0.77,0.92],
  [0.78,0.96],[0.79,0.99],[0.80,1.00],[0.81,0.98],[0.82,0.96],
  [0.82,0.93],[0.82,0.90],[0.81,0.87],
  // Georgia / Carolinas Atlantic coast
  [0.82,0.84],[0.82,0.80],[0.83,0.76],[0.84,0.72],[0.85,0.68],
  // Mid-Atlantic / Cape Hatteras
  [0.86,0.65],[0.87,0.62],[0.88,0.59],[0.88,0.56],[0.88,0.53],[0.87,0.51],
  // NJ/NY
  [0.88,0.49],[0.89,0.47],[0.89,0.45],[0.90,0.43],
  // New England coast
  [0.91,0.40],[0.92,0.38],[0.93,0.36],[0.93,0.33],[0.94,0.30],
  [0.94,0.27],[0.95,0.24],[0.95,0.21],[0.94,0.19],[0.94,0.17],[0.94,0.15],
  // Maine
  [0.95,0.12],[0.96,0.10],[0.96,0.07],
  // Canada border east → west (straight-ish)
  [0.95,0.05],[0.90,0.04],[0.85,0.04],[0.80,0.04],[0.75,0.04],[0.70,0.04],[0.65,0.04],
  // Great Lakes notches (simplified)
  [0.62,0.05],[0.60,0.07],[0.59,0.09],[0.58,0.10],[0.57,0.09],
  [0.55,0.08],[0.53,0.07],[0.51,0.06],[0.50,0.07],[0.49,0.09],
  [0.48,0.10],[0.47,0.09],[0.46,0.07],[0.45,0.06],
  // Northern plains border back to WA
  [0.42,0.05],[0.38,0.05],[0.34,0.05],[0.30,0.05],[0.26,0.05],
  [0.22,0.05],[0.18,0.05],[0.14,0.05],[0.10,0.05],[0.07,0.05],
];

// ── Hub cities — real US logistics/freight hubs ───────────────────────────────
const HUBS: readonly [number, number, string][] = [
  [0.14, 0.14, "SEA"],   // Seattle
  [0.11, 0.48, "SFO"],   // San Francisco
  [0.13, 0.70, "LAX"],   // Los Angeles
  [0.30, 0.72, "PHX"],   // Phoenix
  [0.50, 0.68, "DFW"],   // Dallas
  [0.68, 0.72, "ATL"],   // Atlanta
  [0.78, 0.60, "CLT"],   // Charlotte
  [0.80, 0.36, "NYC"],   // New York
  [0.72, 0.28, "BOS"],   // Boston
  [0.60, 0.30, "ORD"],   // Chicago
  [0.47, 0.44, "DEN"],   // Denver
  [0.36, 0.44, "SLC"],   // Salt Lake City
  [0.64, 0.50, "MEM"],   // Memphis
  [0.68, 0.60, "BNA"],   // Nashville
];

// ── Route network (realistic freight corridors) ───────────────────────────────
const ROUTES: readonly [number, number][] = [
  [0,1],[0,9],[0,11],
  [1,2],[1,10],[1,11],
  [2,3],[2,10],
  [3,4],[3,10],[3,12],
  [4,5],[4,12],[4,13],[4,9],
  [5,6],[5,13],[5,7],
  [6,7],[6,8],
  [7,8],[7,9],
  [8,9],
  [9,10],[9,12],
  [10,11],[10,4],
  [11,3],
  [12,13],[12,5],
  [13,6],
];

const ROUTES_FROM: readonly (readonly number[])[] = HUBS.map((_, hi) =>
  ROUTES.reduce<number[]>((acc, r, ri) => (r[0] === hi ? [...acc, ri] : acc), [])
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  routeIdx: number;
  progress: number;
  speed: number;
  size: number;
  alpha: number;
  nx: number; ny: number;
  nvx: number; nvy: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const toCanvas = (
  nx: number, ny: number,
  W: number, H: number,
  px: number, py: number
): [number, number] => [px + nx * (W - 2 * px), py + ny * (H - 2 * py)];



const routePt = (
  ri: number, t: number,
  W: number, H: number,
  px: number, py: number
): [number, number] => {
  const [ai, bi] = ROUTES[ri];
  const [ax, ay] = toCanvas(HUBS[ai][0], HUBS[ai][1], W, H, px, py);
  const [bx, by] = toCanvas(HUBS[bi][0], HUBS[bi][1], W, H, px, py);
  return [lerp(ax, bx, t), lerp(ay, by, t)];
};

const mkParticle = (i: number): Particle => ({
  x: 0, y: 0,
  routeIdx: i % ROUTES.length,
  progress: Math.random(),
  speed: 0.0006 + Math.random() * 0.001,
  size: 1.2 + Math.random() * 1.6,
  alpha: 0.5 + Math.random() * 0.45,
  nx: 0, ny: 0,
  nvx: (Math.random() - 0.5) * 0.1,
  nvy: (Math.random() - 0.5) * 0.1,
});

const buildStamp = (dpr: number): HTMLCanvasElement => {
  const sz = 44 * dpr;
  const c = document.createElement("canvas");
  c.width = sz; c.height = sz;
  const cx = c.getContext("2d")!;
  const g = cx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
  g.addColorStop(0.00, "rgba(251, 191, 36, 1.0)");
  g.addColorStop(0.25, "rgba(217, 119, 6, 0.85)");
  g.addColorStop(0.55, "rgba(245, 158, 11, 0.35)");
  g.addColorStop(1.00, "rgba(253, 186, 116, 0.0)");
  cx.beginPath();
  cx.arc(sz / 2, sz / 2, sz / 2, 0, Math.PI * 2);
  cx.fillStyle = g;
  cx.fill();
  return c;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function LiveFleetFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const eligible = !mq.matches && window.innerWidth >= 768 && window.innerHeight >= 600;
    setIsActive(eligible);

    if (eligible) {
      const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, PX = 0, PY = 0;
    let animationFrameId: number;
    let lastTime = 0;
    let paused = false;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      W = rect.width;
      // 55% aspect ratio — matches the natural shape of the lower 48
      H = Math.round(W * 0.55);
      PX = W * 0.04;
      PY = H * 0.04;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const stamp = buildStamp(dpr);
    const area = dimensions.w * dimensions.h;
    const particleCount = area < 600 * 400 ? 120 : area < 1200 * 800 ? 220 : 320;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => mkParticle(i));

    particles.forEach(p => {
      const [x, y] = routePt(p.routeIdx, p.progress, W, H, PX, PY);
      p.x = x; p.y = y;
    });

    let mx = -9999, my = -9999;
    let cursorDebounce: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(cursorDebounce);
      cursorDebounce = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
      }, 16);
    };
    const handleMouseLeave = () => { mx = -9999; my = -9999; };

    const hero = canvas.parentElement;
    hero?.addEventListener("mousemove", handleMouseMove);
    hero?.addEventListener("mouseleave", handleMouseLeave);

    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const drawMap = () => {
      ctx.beginPath();
      US_OUTLINE.forEach(([nx, ny], i) => {
        const [x, y] = toCanvas(nx, ny, W, H, PX, PY);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(180, 160, 120, 0.07)";
      ctx.fill();
      ctx.strokeStyle = "rgba(180, 155, 100, 0.50)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawRoutes = () => {
      ctx.setLineDash([3, 10]);
      ctx.strokeStyle = "rgba(217, 119, 6, 0.18)";
      ctx.lineWidth = 0.7;
      ROUTES.forEach(([ai, bi]) => {
        const [ax, ay] = toCanvas(HUBS[ai][0], HUBS[ai][1], W, H, PX, PY);
        const [bx, by] = toCanvas(HUBS[bi][0], HUBS[bi][1], W, H, PX, PY);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    };

    const drawHubs = (pulse: number) => {
      const fontSize = Math.max(8, Math.round(W / 90));

      HUBS.forEach(([nx, ny, label]) => {
        const [hx, hy] = toCanvas(nx, ny, W, H, PX, PY);

        // Pulse ring
        ctx.beginPath();
        ctx.arc(hx, hy, 5 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 119, 6, ${0.07 + pulse * 0.10})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${0.6 + pulse * 0.3})`;
        ctx.fill();

        // City label
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = `rgba(210, 180, 110, ${0.55 + pulse * 0.20})`;
        ctx.textBaseline = "middle";
        ctx.fillText(label, hx + 5, hy - 7);
      });
    };

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (paused || time - lastTime < 16) return;
      lastTime = time;

      ctx.clearRect(0, 0, W, H);
      const pulse = Math.sin(time * 0.0017) * 0.5 + 0.5;

      drawMap();
      drawRoutes();
      drawHubs(pulse);

      ctx.globalCompositeOperation = "lighter";

      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          const endHub = ROUTES[p.routeIdx][1];
          const opts = ROUTES_FROM[endHub];
          p.routeIdx = opts.length > 0
            ? opts[Math.floor(Math.random() * opts.length)]
            : Math.floor(Math.random() * ROUTES.length);
        }

        const [rx, ry] = routePt(p.routeIdx, p.progress, W, H, PX, PY);

        p.nvx += (Math.random() - 0.5) * 0.06;
        p.nvy += (Math.random() - 0.5) * 0.06;
        p.nvx *= 0.92; p.nvy *= 0.92;
        p.nx = (p.nx + p.nvx) * 0.97;
        p.ny = (p.ny + p.nvy) * 0.97;

        const dx = rx - mx, dy = ry - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 140 * 140 && dist2 > 4) {
          const dist = Math.sqrt(dist2);
          const force = (1 - dist / 140) * 3;
          p.nvx += (dx / dist) * force;
          p.nvy += (dy / dist) * force;
        }

        p.x = rx + p.nx;
        p.y = ry + p.ny;

        const renderSize = p.size * (1 + pulse * 0.25);
        ctx.globalAlpha = p.alpha * (0.75 + pulse * 0.35);
        ctx.drawImage(
          stamp,
          p.x - renderSize * dpr,
          p.y - renderSize * dpr,
          renderSize * 2 * dpr,
          renderSize * 2 * dpr
        );
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    animationFrameId = requestAnimationFrame(animate);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });
    if (hero) ro.observe(hero);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(cursorDebounce);
      clearTimeout(resizeTimeout);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      hero?.removeEventListener("mousemove", handleMouseMove);
      hero?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isActive, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.5s ease",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}