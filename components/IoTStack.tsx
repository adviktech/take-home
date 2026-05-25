"use client";

import { motion } from "framer-motion";

const hardware = [
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <rect x="4" y="10" width="28" height="16" rx="3" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="M12 18h12M12 22h6" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="27" cy="18" r="2" fill="#22d3ee" opacity="0.6" />
        <path d="M18 4v6M8 7l3 3M28 7l-3 3" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "ELD & GPS",
    subtitle: "HOS & Asset Tracking",
    description:
      "Electronic Logging Devices and GPS units sync with Supertruck OS to automate Hours of Service compliance and provide real-time asset location data across your entire fleet.",
    features: [
      "Automated HOS logging",
      "Real-time asset tracking",
      "FMCSA compliance alerts",
      "Route optimization data",
    ],
    color: "from-fleet-cyan/10 to-transparent",
    border: "border-fleet-cyan/20 hover:border-fleet-cyan/40",
    tag: "HOS Compliance",
    tagColor: "text-fleet-cyan bg-fleet-cyan/10",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <rect x="10" y="6" width="16" height="20" rx="2" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="18" cy="16" r="5" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="18" cy="16" r="2" fill="#6366f1" opacity="0.5" />
        <path d="M18 26v4M14 29h8" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 10l3 3M29 10l-3 3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Dashcams",
    subtitle: "Safety Monitoring",
    description:
      "Computer vision dashcams detect unsafe driving events in real-time, feeding data directly into FleetWatch and triggering dynamic insurance premium adjustments.",
    features: [
      "Forward + cab-facing video",
      "AI event detection",
      "Insurance premium reduction",
      "Driver coaching alerts",
    ],
    color: "from-fleet-indigo/10 to-transparent",
    border: "border-fleet-indigo/20 hover:border-fleet-indigo/40",
    tag: "Safety Score",
    tagColor: "text-fleet-indigo bg-fleet-indigo/10",
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <rect x="6" y="14" width="24" height="12" rx="2" stroke="#34d399" strokeWidth="1.5" />
        <path d="M10 14V10a8 8 0 0116 0v4" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="20" r="3" stroke="#34d399" strokeWidth="1.5" />
        <path d="M18 17v-2M18 25v-2M15 20H13M23 20H21" stroke="#34d399" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: "Asset Sensors",
    subtitle: "Fuel & Cargo Health",
    description:
      "IoT sensors monitor fuel levels, cargo temperature, door status, and structural integrity — ensuring compliance and protecting high-value freight.",
    features: [
      "Real-time fuel monitoring",
      "Cargo temperature alerts",
      "Tamper detection",
      "Predictive maintenance signals",
    ],
    color: "from-fleet-emerald/10 to-transparent",
    border: "border-fleet-emerald/20 hover:border-fleet-emerald/40",
    tag: "Cargo Integrity",
    tagColor: "text-fleet-emerald bg-fleet-emerald/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function IoTStack() {
  return (
    <section id="iot" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(52,211,153,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-fleet-emerald text-xs font-semibold tracking-widest uppercase mb-4">
            IoT Infrastructure
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-5xl text-white mb-4">
            Hardware + Software{" "}
            <span className="gradient-text">in Sync</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            FourFleet integrates seamlessly with the physical devices already in your
            trucks — turning raw sensor data into automated decisions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {hardware.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className={`glass-card rounded-2xl p-7 border transition-all duration-300 group relative overflow-hidden ${item.border}`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Tag */}
              <div className="relative z-10">
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-5 ${item.tagColor}`}
                >
                  {item.tag}
                </span>

                {/* Icon */}
                <div className="mb-5">{item.icon}</div>

                {/* Title */}
                <h3 className="font-grotesk font-bold text-white text-xl mb-1">
                  {item.title}
                </h3>
                <p className="text-fleet-cyan text-sm font-medium mb-4">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-fleet-cyan flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connection indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {["ELD Data", "→", "Supertruck OS", "→", "Automated Action"].map(
            (item, i) => (
              <span
                key={i}
                className={`text-sm font-medium ${
                  item === "→"
                    ? "text-fleet-cyan/40"
                    : i === 2
                    ? "gradient-text font-semibold"
                    : "text-slate-500"
                }`}
              >
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
