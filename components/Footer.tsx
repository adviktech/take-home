import React from "react";

const footerLinks = {
  Product: ["FleetPay", "Comply", "WatchTower", "RoadReady", "MyMiles"],
  Company: ["About", "Careers", "Blog", "Press"],
  Support: ["Help Center", "Documentation", "Status", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

function TruckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="8" width="16" height="12" rx="2" fill="#22d3ee" opacity="0.9" />
      <path d="M18 10h4l3 4v6h-7V10z" fill="#6366f1" opacity="0.9" />
      <circle cx="7" cy="21" r="2.5" fill="#03070f" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="21" cy="21" r="2.5" fill="#03070f" stroke="#22d3ee" strokeWidth="1.5" />
      <rect x="5" y="11" width="6" height="4" rx="1" fill="#03070f" opacity="0.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(34,211,238,0.08)] bg-[rgba(3,7,15,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <TruckIcon />
              <span className="font-grotesk font-bold text-lg text-white">
                FourFleet
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              The operating system for modern trucking fleets. Built on
              Supertruck.ai infrastructure.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {["X", "Li", "Gh"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(34,211,238,0.1)] flex items-center justify-center text-slate-500 hover:text-fleet-cyan hover:border-fleet-cyan/30 transition-all text-xs font-semibold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-grotesk font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-[rgba(34,211,238,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            &copy; 2025 FourFleet by Supertruck.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-fleet-emerald animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
