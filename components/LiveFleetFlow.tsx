
"use client";

import { useEffect, useRef, useState } from "react";

// ── US lower-48 outline (normalized 0..1 coords) ──────────────────────────────
const US_OUTLINE: readonly [number, number][] = [
  [0.07,0.05],[0.08,0.12],[0.10,0.16],[0.09,0.20],[0.10,0.24],[0.10,0.28],
  [0.09,0.30],[0.09,0.34],[0.10,0.38],[0.09,0.42],[0.10,0.46],
  [0.09,0.50],[0.08,0.54],[0.09,0.58],[0.10,0.62],[0.11,0.65],[0.12,0.68],
  [0.13,0.72],[0.14,0.75],[0.14,0.78],
  [0.16,0.79],[0.18,0.80],[0.20,0.80],[0.24,0.80],[0.28,0.80],[0.32,0.80],
  [0.36,0.80],[0.40,0.84],[0.42,0.88],[0.44,0.92],[0.47,0.95],
  [0.49,0.97],[0.52,0.98],[0.53,0.96],[0.54,0.93],
  [0.55,0.90],[0.56,0.88],[0.57,0.87],[0.58,0.86],[0.59,0.87],
  [0.61,0.88],[0.62,0.89],[0.63,0.88],[0.64,0.86],
  [0.64,0.85],[0.65,0.86],[0.66,0.88],[0.67,0.87],[0.68,0.86],
  [0.69,0.87],[0.70,0.88],[0.71,0.87],[0.72,0.86],
  [0.73,0.85],[0.74,0.84],[0.75,0.86],[0.76,0.88],[0.77,0.92],
  [0.78,0.96],[0.79,0.99],[0.80,1.00],[0.81,0.98],[0.82,0.96],
  [0.82,0.93],[0.82,0.90],[0.81,0.87],
  [0.82,0.84],[0.82,0.80],[0.83,0.76],[0.84,0.72],[0.85,0.68],
  [0.86,0.65],[0.87,0.62],[0.88,0.59],[0.88,0.56],[0.88,0.53],[0.87,0.51],
  [0.88,0.49],[0.89,0.47],[0.89,0.45],[0.90,0.43],
  [0.91,0.40],[0.92,0.38],[0.93,0.36],[0.93,0.33],[0.94,0.30],
  [0.94,0.27],[0.95,0.24],[0.95,0.21],[0.94,0.19],[0.94,0.17],[0.94,0.15],
  [0.95,0.12],[0.96,0.10],[0.96,0.07],
  [0.95,0.05],[0.90,0.04],[0.85,0.04],[0.80,0.04],[0.75,0.04],[0.70,0.04],[0.65,0.04],
  [0.62,0.05],[0.60,0.07],[0.59,0.09],[0.58,0.10],[0.57,0.09],
  [0.55,0.08],[0.53,0.07],[0.51,0.06],[0.50,0.07],[0.49,0.09],
  [0.48,0.10],[0.47,0.09],[0.46,0.07],[0.45,0.06],
  [0.42,0.05],[0.38,0.05],[0.34,0.05],[0.30,0.05],[0.26,0.05],
  [0.22,0.05],[0.18,0.05],[0.14,0.05],[0.10,0.05],[0.07,0.05],
];

// ── Hub cities ────────────────────────────────────────────────────────────────
const HUBS: readonly [number, number, string][] = [
  [0.14, 0.14, "SEA"],[0.11, 0.48, "SFO"],[0.13, 0.70, "LAX"],
  [0.30, 0.72, "PHX"],[0.50, 0.68, "DFW"],[0.68, 0.72, "ATL"],
  [0.78, 0.60, "CLT"],[0.80, 0.36, "NYC"],[0.72, 0.28, "BOS"],
  [0.60, 0.30, "ORD"],[0.47, 0.44, "DEN"],[0.36, 0.44, "SLC"],
  [0.64, 0.50, "MEM"],[0.68, 0.60, "BNA"],
];

// ── Route network ─────────────────────────────────────────────────────────────
const ROUTES: readonly [number, number][] = [
  [0,1],[0,9],[0,11],[1,2],[1,10],[1,11],[2,3],[2,10],
  [3,4],[3,10],[3,12],[4,5],[4,12],[4,13],[4,9],
  [5,6],[5,13],[5,7],[6,7],[6,8],[7,8],[7,9],[8,9],
  [9,10],[9,12],[10,11],[10,4],[11,3],[12,13],[12,5],[13,6],
];

const ROUTES_FROM: readonly (readonly number[])[] = HUBS.map((_, hi) =>
  ROUTES.reduce<number[]>((acc, r, ri) => (r[0] === hi ? [...acc, ri] : acc), [])
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  routeIdx: number; progress: number; speed: number;
  size: number; alpha: number;
  nx: number; ny: number; nvx: number; nvy: number;
}

type RGB = [number, number, number];

// ── Theme color helpers ───────────────────────────────────────────────────────

/** Parse any CSS color string (hex / rgb / rgba) → [r, g, b] */
function hexToRgb(color: string): RGB {
  const c = color.trim();
  // #RRGGBB
  let m = c.match(/^#([0-9a-f]{6})$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  // #RGB
  m = c.match(/^#([0-9a-f]{3})$/i);
  if (m) return [
    parseInt(m[1][0] + m[1][0], 16),
    parseInt(m[1][1] + m[1][1], 16),
    parseInt(m[1][2] + m[1][2], 16),
  ];
  // rgb(...) / rgba(...)
  m = c.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
  return [245, 158, 11]; // amber fallback
}

interface ThemeColors {
  accent: string;   // raw CSS value, used as change-detection key
  accentRgb: RGB;
  textFaintRgb: RGB;
}

function readThemeColors(): ThemeColors {
  const s   = getComputedStyle(document.documentElement);
  const get = (v: string) => s.getPropertyValue(v).trim();
  const accent = get("--accent");
  return {
    accent,
    accentRgb:     hexToRgb(accent),
    textFaintRgb:  hexToRgb(get("--text-faint")),
  };
}

// ── Pure helpers ──────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const toCanvas = (
  nx: number, ny: number,
  ox: number, oy: number,
  dw: number, dh: number
): [number, number] => [ox + nx * dw, oy + ny * dh];

const routePt = (
  ri: number, t: number,
  ox: number, oy: number,
  dw: number, dh: number
): [number, number] => {
  const [ai, bi] = ROUTES[ri];
  const [ax, ay] = toCanvas(HUBS[ai][0], HUBS[ai][1], ox, oy, dw, dh);
  const [bx, by] = toCanvas(HUBS[bi][0], HUBS[bi][1], ox, oy, dw, dh);
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

/** Soft radial glow stamp — colour driven by theme accent */
function buildStamp(dpr: number, [r, g, b]: RGB): HTMLCanvasElement {
  const sz = 44 * dpr;
  const c  = document.createElement("canvas");
  c.width  = sz; c.height = sz;
  const cx = c.getContext("2d")!;
  const gr = cx.createRadialGradient(sz/2, sz/2, 0, sz/2, sz/2, sz/2);
  gr.addColorStop(0.00, `rgba(${r},${g},${b},1.00)`);
  gr.addColorStop(0.25, `rgba(${r},${g},${b},0.85)`);
  gr.addColorStop(0.55, `rgba(${r},${g},${b},0.35)`);
  gr.addColorStop(1.00, `rgba(${r},${g},${b},0.00)`);
  cx.beginPath();
  cx.arc(sz/2, sz/2, sz/2, 0, Math.PI * 2);
  cx.fillStyle = gr;
  cx.fill();
  return c;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function LiveFleetFlow() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [vpKey, setVpKey]       = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const eligible = !mq.matches && window.innerWidth >= 1024 && window.innerHeight >= 600;
    setIsActive(eligible);

    if (eligible) {
      let t: ReturnType<typeof setTimeout>;
      const onResize = () => { clearTimeout(t); t = setTimeout(() => setVpKey(k => k + 1), 120); };
      window.addEventListener("resize", onResize);
      return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0;
    let OX = 0, OY = 0, DW = 0, DH = 0;
    let animId: number;
    let lastTime = 0;
    let paused = false;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      W = rect.width;
      H = rect.height;

      const MAP_RATIO = 1.85;
      const padH = Math.max(58, H * 0.065);
      const aW = W;
      const aH = H - 2 * padH;

      if (aW / aH > MAP_RATIO) {
        DH = aH;
        DW = DH * MAP_RATIO;
        OX = (W - DW) / 2;
        OY = padH;
      } else {
        DW = aW;
        DH = DW / MAP_RATIO;
        OX = 0;
        const cy = (H - DH) / 2;
        OY = Math.max(padH, cy - H * 0.03);
      }

      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // ── Theme-aware state — updated lazily when accent CSS var changes ─────────
    let themeColors = readThemeColors();
    let stamp       = buildStamp(dpr, themeColors.accentRgb);

    // ── Particles ─────────────────────────────────────────────────────────────
    const drawArea     = DW * DH;
    const particleCount = drawArea < 200_000 ? 140
                        : drawArea < 600_000 ? 280
                        : drawArea < 1_200_000 ? 420
                        : 560;
    const particles = Array.from({ length: particleCount }, (_, i) => mkParticle(i));
    particles.forEach(p => {
      const [x, y] = routePt(p.routeIdx, p.progress, OX, OY, DW, DH);
      p.x = x; p.y = y;
    });

    // ── Cursor repulsion ──────────────────────────────────────────────────────
    let mx = -9999, my = -9999;
    let cursorDebounce: ReturnType<typeof setTimeout>;
    const onMouseMove = (e: MouseEvent) => {
      clearTimeout(cursorDebounce);
      cursorDebounce = setTimeout(() => {
        const r = canvas.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      }, 16);
    };
    const onMouseLeave = () => { mx = -9999; my = -9999; };
    const hero = canvas.parentElement;
    hero?.addEventListener("mousemove", onMouseMove);
    hero?.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", () => { paused = document.hidden; });

    // ── Draw helpers (always use current themeColors) ─────────────────────────
    const drawMap = () => {
      const [ar, ag, ab] = themeColors.accentRgb;
      ctx.beginPath();
      US_OUTLINE.forEach(([nx, ny], i) => {
        const [x, y] = toCanvas(nx, ny, OX, OY, DW, DH);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle   = `rgba(${ar},${ag},${ab},0.06)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.45)`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    };

    const drawRoutes = () => {
      const [ar, ag, ab] = themeColors.accentRgb;
      ctx.setLineDash([3, 10]);
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.18)`;
      ctx.lineWidth   = 0.7;
      ROUTES.forEach(([ai, bi]) => {
        const [ax, ay] = toCanvas(HUBS[ai][0], HUBS[ai][1], OX, OY, DW, DH);
        const [bx, by] = toCanvas(HUBS[bi][0], HUBS[bi][1], OX, OY, DW, DH);
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
      });
      ctx.setLineDash([]);
    };

    const drawHubs = (pulse: number) => {
      const [ar, ag, ab] = themeColors.accentRgb;
      const [tr, tg, tb] = themeColors.textFaintRgb;
      const fontSize = Math.max(8, Math.round(DW / 85));

      HUBS.forEach(([nx, ny, label]) => {
        const [hx, hy] = toCanvas(nx, ny, OX, OY, DW, DH);

        // Pulse ring
        ctx.beginPath();
        ctx.arc(hx, hy, 5 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${(0.07 + pulse * 0.10).toFixed(3)})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${(0.6 + pulse * 0.3).toFixed(3)})`;
        ctx.fill();

        // City label
        ctx.font         = `${fontSize}px sans-serif`;
        ctx.fillStyle    = `rgba(${tr},${tg},${tb},${(0.55 + pulse * 0.20).toFixed(3)})`;
        ctx.textBaseline = "middle";
        ctx.fillText(label, hx + 5, hy - 7);
      });
    };

    // ── Animation loop ────────────────────────────────────────────────────────
    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      if (paused || time - lastTime < 16) return;
      lastTime = time;

      // Re-read accent once per frame — cheap string lookup.
      // Rebuild stamp only when palette actually changes.
      const newAccent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent").trim();
      if (newAccent !== themeColors.accent) {
        themeColors = readThemeColors();
        stamp       = buildStamp(dpr, themeColors.accentRgb);
      }

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
          const opts   = ROUTES_FROM[endHub];
          p.routeIdx   = opts.length > 0
            ? opts[Math.floor(Math.random() * opts.length)]
            : Math.floor(Math.random() * ROUTES.length);
        }

        const [rx, ry] = routePt(p.routeIdx, p.progress, OX, OY, DW, DH);

        p.nvx += (Math.random() - 0.5) * 0.06;
        p.nvy += (Math.random() - 0.5) * 0.06;
        p.nvx *= 0.92; p.nvy *= 0.92;
        p.nx   = (p.nx + p.nvx) * 0.97;
        p.ny   = (p.ny + p.nvy) * 0.97;

        const dx = rx - mx, dy = ry - my;
        const d2 = dx*dx + dy*dy;
        if (d2 < 140*140 && d2 > 4) {
          const d = Math.sqrt(d2), f = (1 - d/140) * 3;
          p.nvx += (dx/d) * f; p.nvy += (dy/d) * f;
        }

        p.x = rx + p.nx;
        p.y = ry + p.ny;

        const rs = p.size * (1 + pulse * 0.25);
        ctx.globalAlpha = p.alpha * (0.75 + pulse * 0.35);
        ctx.drawImage(stamp, p.x - rs*dpr, p.y - rs*dpr, rs*2*dpr, rs*2*dpr);
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(cursorDebounce);
      hero?.removeEventListener("mousemove", onMouseMove);
      hero?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isActive, vpKey]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.6s ease",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
