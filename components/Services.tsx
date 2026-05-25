"use client";

import { motion } from "framer-motion";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}

function FleetPayIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <rect x="3" y="7" width="22" height="14" rx="3" stroke="#22d3ee" strokeWidth="1.5" />
      <path d="M3 11h22" stroke="#22d3ee" strokeWidth="1.5" />
      <rect x="7" y="15" width="5" height="2" rx="1" fill="#22d3ee" />
    </svg>
  );
}

function ComplyIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <path d="M14 3L5 7v7c0 5.25 3.85 10.15 9 11.35C19.15 24.15 23 19.25 23 14V7L14 3z" stroke="#6366f1" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 14l3 3 6-6" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WatchTowerIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="10" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="4" fill="#22d3ee" opacity="0.3" />
      <circle cx="14" cy="14" r="1.5" fill="#22d3ee" />
      <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RoadReadyIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="9" stroke="#34d399" strokeWidth="1.5" />
      <path d="M14 9v5l3 3" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="14" r="1.5" fill="#34d399" />
    </svg>
  );
}

function MyMilesIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <path d="M5 20L14 6l9 14H5z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 17h8" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="13" r="1.5" fill="#f59e0b" />
    </svg>
  );
}

function AIMaintenanceIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <rect x="4" y="4" width="9" height="9" rx="2" stroke="#6366f1" strokeWidth="1.5" />
      <rect x="15" y="4" width="9" height="9" rx="2" stroke="#6366f1" strokeWidth="1.5" />
      <rect x="4" y="15" width="9" height="9" rx="2" stroke="#6366f1" strokeWidth="1.5" />
      <rect x="15" y="15" width="9" height="9" rx="2" stroke="#6366f1" strokeWidth="1.5" />
    </svg>
  );
}

function InsuranceIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <path d="M14 3C14 3 6 6 6 13v5l8 5 8-5v-5C22 6 14 3 14 3z" stroke="#22d3ee" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 14l3 3 5-5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AcademyIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <path d="M14 4L3 10l11 6 11-6-11-6z" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 13v5c0 2.5 3.13 5 7 5s7-2.5 7-5v-5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 10v5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const services: Service[] = [
  {
    icon: <FleetPayIcon />,
    title: "FleetPay",
    description:
      "Integrated factoring with one-click load booking and instant payment on delivery. Fuel discount network with GPS fraud prevention.",
    accent: "border-fleet-cyan/20 hover:border-fleet-cyan/40",
  },
  {
    icon: <ComplyIcon />,
    title: "Comply",
    description:
      "Full-service FMCSA authority maintenance and safety administration. We handle the paperwork so you handle the road.",
    accent: "border-fleet-indigo/20 hover:border-fleet-indigo/40",
  },
  {
    icon: <WatchTowerIcon />,
    title: "WatchTower",
    description:
      "Outsourced load tracking, tracing, and invoicing using the Supertruck.ai dashboard. Every load monitored 24/7.",
    accent: "border-fleet-cyan/20 hover:border-fleet-cyan/40",
  },
  {
    icon: <RoadReadyIcon />,
    title: "RoadReady",
    description:
      "Subscription-based preventive maintenance with OS-triggered scheduled intervals. Keep your trucks rolling, not stalled.",
    accent: "border-fleet-emerald/20 hover:border-fleet-emerald/40",
  },
  {
    icon: <MyMilesIcon />,
    title: "MyMiles",
    description:
      "10–20¢ per mile auto-deposited into a retirement account. Every mile you drive builds your financial future.",
    accent: "border-amber-500/20 hover:border-amber-500/40",
  },
  {
    icon: <AIMaintenanceIcon />,
    title: "AI Maintenance Predictor",
    description:
      "Integrates ELD diagnostic codes with RoadReady to auto-book repairs before breakdowns happen.",
    accent: "border-fleet-indigo/20 hover:border-fleet-indigo/40",
  },
  {
    icon: <InsuranceIcon />,
    title: "Dynamic Insurance",
    description:
      "Usage-based premiums that fluctuate based on real-time ELD safety data and dashcam footage. Safer drivers pay less.",
    accent: "border-fleet-cyan/20 hover:border-fleet-cyan/40",
  },
  {
    icon: <AcademyIcon />,
    title: "Training Academy",
    description:
      "Platform to train drivers on Supertruck OS and business management. Turn drivers into fleet operators.",
    accent: "border-fleet-emerald/20 hover:border-fleet-emerald/40",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)",
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
          <span className="inline-block text-fleet-cyan text-xs font-semibold tracking-widest uppercase mb-4">
            Everything You Need
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-5xl text-white mb-4">
            Eight Services.{" "}
            <span className="gradient-text">One Platform.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            FourFleet wraps every operational need into a single, seamless
            experience — from the first mile to the last invoice.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className={`glass-card rounded-2xl p-6 border transition-all duration-300 group cursor-default ${service.accent}`}
            >
              <div className="mb-4 p-2.5 rounded-xl inline-flex bg-[rgba(255,255,255,0.04)] group-hover:bg-[rgba(34,211,238,0.06)] transition-colors">
                {service.icon}
              </div>
              <h3 className="font-grotesk font-semibold text-white text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
