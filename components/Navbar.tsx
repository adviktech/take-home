"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const navLinks = [
  { label: "Features", href: "#services" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
];

function TruckIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="8" width="16" height="12" rx="2" fill="#22d3ee" opacity="0.9" />
      <path
        d="M18 10h4l3 4v6h-7V10z"
        fill="#6366f1"
        opacity="0.9"
      />
      <circle cx="7" cy="21" r="2.5" fill="#03070f" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="21" cy="21" r="2.5" fill="#03070f" stroke="#22d3ee" strokeWidth="1.5" />
      <rect x="5" y="11" width="6" height="4" rx="1" fill="#03070f" opacity="0.5" />
    </svg>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 40);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#03070f]/90 backdrop-blur-xl border-b border-[rgba(34,211,238,0.1)] shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <TruckIcon />
            <span className="font-grotesk font-bold text-xl tracking-tight text-white group-hover:text-fleet-cyan transition-colors">
              FourFleet
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-fleet-cyan transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#cta"
              className="px-5 py-2 rounded-lg bg-fleet-cyan text-fleet-bg font-semibold text-sm hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              ) : (
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#03070f]/95 backdrop-blur-xl border-b border-[rgba(34,211,238,0.1)] px-4 pb-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-slate-400 hover:text-fleet-cyan transition-colors font-medium border-b border-[rgba(34,211,238,0.06)] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 px-5 py-2.5 rounded-lg bg-fleet-cyan text-fleet-bg font-semibold text-sm text-center"
          >
            Get Started
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
