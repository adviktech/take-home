"use client";

import React from "react";

const footerLinks = {
  Product: ["FleetPay", "Comply", "WatchTower", "RoadReady", "MyMiles"],
  Company: ["About", "Careers", "Blog", "Press"],
  Support: ["Help Center", "Documentation", "Status", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-montserrat font-black text-sm" style={{ background: "var(--accent)", color: "#fff" }}>FF</div>
              <span className="font-montserrat font-black text-lg" style={{ color: "var(--text)" }}>FourFleet</span>
            </a>
            <p className="font-outfit text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
              The operating system for modern trucking fleets. Built on Supertruck.ai infrastructure.
            </p>
            <div className="flex gap-2">
              {["X", "Li", "Gh"].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center font-outfit text-xs font-semibold transition-all"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-montserrat font-black text-sm mb-4 uppercase tracking-wider" style={{ color: "var(--text)" }}>{cat}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="font-outfit text-sm transition-colors" style={{ color: "var(--text-muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="font-outfit text-sm" style={{ color: "var(--text-faint)" }}>
            &copy; 2025 FourFleet by Supertruck.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-outfit text-xs" style={{ color: "var(--text-faint)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
