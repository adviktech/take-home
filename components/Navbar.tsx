"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PaletteSelector from "./PaletteSelector";

const navLinks = [
  { label: "Calculator", href: "#calculator" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-montserrat font-black text-sm flex-shrink-0"
              style={{ background: "var(--accent)", color: "var(--bg)" }}>FF</div>
            <span className="font-montserrat font-black text-xl tracking-tight" style={{ color: "var(--text)" }}>FourFleet</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className="text-sm font-outfit font-medium transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: palette selector + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <PaletteSelector />
            <a href="#calculator"
              className="btn-fill px-5 py-2.5 rounded-lg font-montserrat font-bold text-sm transition-all duration-300"
              style={{ background: "var(--accent)", color: "var(--bg)", border: "2px solid var(--accent)" }}>
              Calculate Take-Home
            </a>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2">
            <PaletteSelector />
            <button
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ color: "var(--text-muted)", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                ) : (
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pb-4 pt-2"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", borderTop: "1px solid var(--border)" }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-outfit font-medium border-b"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>
              {link.label}
            </a>
          ))}
          <a href="#calculator" onClick={() => setMobileOpen(false)}
            className="block mt-3 px-5 py-3 rounded-lg font-montserrat font-bold text-sm text-center"
            style={{ background: "var(--accent)", color: "var(--bg)" }}>
            Calculate Take-Home
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
