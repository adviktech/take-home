"use client";

import { motion } from "framer-motion";

const fleetNames = [
  "Apex Freight Co.",
  "Ironclad Logistics",
  "Meridian Transport",
  "SkyBridge Carriers",
  "CrossCountry Haul",
  "Pinnacle Fleet Group",
  "Blue Ridge Trucking",
  "Keystone Dispatch",
];

export default function TrustStrip() {
  return (
    <section className="py-12 border-y border-[rgba(34,211,238,0.08)] bg-[rgba(14,26,51,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-slate-500 text-sm font-medium tracking-widest uppercase mb-8"
        >
          Trusted by{" "}
          <span className="text-fleet-cyan font-semibold">12,000+ drivers</span>{" "}
          across{" "}
          <span className="text-fleet-cyan font-semibold">48 states</span>
        </motion.p>

        {/* Scrolling fleet names */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#03070f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#03070f] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            style={{ width: "max-content" }}
          >
            {[...fleetNames, ...fleetNames, ...fleetNames].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-slate-600 font-grotesk font-semibold text-lg tracking-wide hover:text-slate-400 transition-colors"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
