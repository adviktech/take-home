"use client";

const fleetNames = [
  "Apex Freight Co.", "Ironclad Logistics", "Meridian Transport",
  "SkyBridge Carriers", "CrossCountry Haul", "Pinnacle Fleet Group",
  "Blue Ridge Trucking", "Keystone Dispatch",
];

export default function TrustStrip() {
  return (
    <section className="py-10 overflow-hidden" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 mb-7">
        <p className="text-center font-outfit text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Trusted by <span style={{ color: "var(--accent)" }}>12,000+ drivers</span> across <span style={{ color: "var(--accent)" }}>48 states</span>
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, var(--bg-alt), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, var(--bg-alt), transparent)" }} />
        <div className="marquee-track inline-flex gap-10">
          {[...fleetNames, ...fleetNames, ...fleetNames].map((name, i) => (
            <span key={`${name}-${i}`} className="font-montserrat font-semibold text-base" style={{ color: "var(--border)", letterSpacing: "0.05em" }}>
              {name} <span style={{ color: "var(--accent)", marginLeft: 4, marginRight: 4 }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
