"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PALETTES, usePalette } from "./ThemeProvider";

function PaletteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="8" cy="4"  r="1.4" fill="currentColor"/>
      <circle cx="11.46" cy="6" r="1.4" fill="currentColor"/>
      <circle cx="11.46" cy="10" r="1.4" fill="currentColor"/>
      <circle cx="8" cy="12" r="1.4" fill="currentColor"/>
      <circle cx="4.54" cy="10" r="1.4" fill="currentColor"/>
      <circle cx="4.54" cy="6"  r="1.4" fill="currentColor"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
      <path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function PaletteSelector() {
  const { paletteId, palette, setPaletteId } = usePalette();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const lightPalettes = PALETTES.filter(p => !p.dark);
  const darkPalettes = PALETTES.filter(p => p.dark);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Choose color palette"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 h-9 rounded-lg font-outfit text-xs font-semibold transition-all duration-200"
        style={{
          background: open ? "var(--accent-light)" : "var(--bg-alt)",
          color: open ? "var(--accent)" : "var(--text-muted)",
          border: open ? "1px solid var(--accent)" : "1px solid var(--border)",
        }}
        onMouseEnter={e => { if (!open) { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; } }}
        onMouseLeave={e => { if (!open) { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; } }}
      >
        {/* Live accent preview dot */}
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: palette.vars["--accent"], boxShadow: "0 0 0 2px var(--border)" }} />
        <PaletteIcon />
        <span className="hidden sm:inline max-w-[72px] truncate">{palette.name}</span>
        <motion.svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          style={{ flexShrink: 0 }}
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              boxShadow: "var(--shadow), 0 0 0 1px var(--border)",
              width: 340,
              zIndex: 200,
            }}
          >
            {/* Header */}
            <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-montserrat font-black text-sm" style={{ color: "var(--text)" }}>Color Palette</div>
                  <div className="font-outfit text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>20 palettes · click to preview instantly</div>
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "var(--bg-alt)", color: "var(--text-faint)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"; }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            <div className="p-3 overflow-y-auto" style={{ maxHeight: "70vh" }}>
              {/* Light palettes */}
              <div className="mb-3">
                <div className="font-outfit text-[10px] font-bold uppercase tracking-widest px-1 mb-2" style={{ color: "var(--text-faint)" }}>
                  ☀ Light Palettes
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {lightPalettes.map(p => (
                    <PaletteSwatch key={p.id} p={p} selected={paletteId === p.id} onSelect={() => { setPaletteId(p.id); }} />
                  ))}
                </div>
              </div>

              {/* Dark palettes */}
              <div>
                <div className="font-outfit text-[10px] font-bold uppercase tracking-widest px-1 mb-2" style={{ color: "var(--text-faint)" }}>
                  ☾ Dark Palettes
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {darkPalettes.map(p => (
                    <PaletteSwatch key={p.id} p={p} selected={paletteId === p.id} onSelect={() => { setPaletteId(p.id); }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: palette.vars["--accent"] }} />
                <span className="font-montserrat font-bold text-xs" style={{ color: "var(--text)" }}>{palette.name}</span>
                <span className="font-outfit text-[10px]" style={{ color: "var(--text-faint)" }}>· {palette.description}</span>
              </div>
              <span className="font-outfit text-[10px] px-2 py-0.5 rounded-full" style={{ background: palette.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: "var(--text-muted)" }}>
                {palette.dark ? "Dark" : "Light"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaletteSwatch({ p, selected, onSelect }: { p: (typeof PALETTES)[0]; selected: boolean; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all duration-150"
        style={{
          background: selected ? "var(--accent-light)" : hovered ? "var(--bg-alt)" : "transparent",
          border: selected ? "1px solid var(--accent)" : "1px solid transparent",
        }}
        title={`${p.name} — ${p.description}`}
      >
        {/* Color preview: split circle */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
          style={{ border: selected ? `2px solid ${p.vars["--accent"]}` : "2px solid transparent", outline: selected ? `2px solid ${p.vars["--accent"]}` : "none", outlineOffset: "1px" }}>
          {/* Left half: bg */}
          <div className="absolute inset-0 left-0 w-1/2" style={{ background: p.vars["--bg"] }} />
          {/* Right half: accent */}
          <div className="absolute inset-0 right-0 left-1/2" style={{ background: p.vars["--accent"] }} />
          {/* Divider */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-px h-full" style={{ background: "rgba(128,128,128,0.2)" }} />
          </div>
          {/* Selected check */}
          {selected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: p.vars["--accent"] }}>
                <CheckIcon />
              </div>
            </div>
          )}
        </div>

        {/* Name */}
        <span className="font-outfit text-[9px] text-center leading-tight w-full truncate"
          style={{ color: selected ? "var(--accent)" : "var(--text-muted)", fontWeight: selected ? 700 : 400 }}>
          {p.name}
        </span>
      </button>
    </div>
  );
}
