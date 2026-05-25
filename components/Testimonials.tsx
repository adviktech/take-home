"use client";

import { motion } from "framer-motion";

interface Review {
  name: string;
  role: string;
  company: string;
  quote: string;
  stars: number;
  avatar: string;
  highlight: string;
}

const reviews: Review[] = [
  {
    name: "Marcus T.",
    role: "Owner-Operator",
    company: "Solo Rig",
    quote:
      "FleetPay changed my life. I used to wait 30–45 days for payment. Now it's same-day factoring. My take-home went from $2,100 to $3,400 a week after switching.",
    stars: 5,
    avatar: "MT",
    highlight: "$3,400/week take-home",
  },
  {
    name: "Diana R.",
    role: "Fleet Manager",
    company: "Meridian Transport",
    quote:
      "Comply handles all our FMCSA renewals, safety audits, and driver qualification files. We went from 4 compliance staff to 1. The savings alone pay for the entire FourFleet subscription.",
    stars: 5,
    avatar: "DR",
    highlight: "4 staff → 1 with Comply",
  },
  {
    name: "Jerome W.",
    role: "CDL Driver",
    company: "Ironclad Logistics",
    quote:
      "The AI dispatch is scary-good. It routes me to loads that keep me out of deadhead miles. I'm running 87% loaded miles now. Used to be 64%.",
    stars: 5,
    avatar: "JW",
    highlight: "87% loaded miles",
  },
  {
    name: "Priya S.",
    role: "Operations Director",
    company: "CrossCountry Haul",
    quote:
      "WatchTower is incredible. Our ops team was spending 3 hours a day on check calls. Now the system handles all tracking and invoicing automatically. That's 15 hours a week back.",
    stars: 5,
    avatar: "PS",
    highlight: "15 hrs/week saved",
  },
  {
    name: "Kevin O.",
    role: "Small Fleet Owner",
    company: "3-truck operation",
    quote:
      "The AI Maintenance Predictor flagged a brake issue on my Freightliner before it became a breakdown on I-80. Saved me $12,000 in repair costs and kept my load commitment.",
    stars: 5,
    avatar: "KO",
    highlight: "$12,000 repair cost avoided",
  },
  {
    name: "Angela M.",
    role: "Lease-Purchase Driver",
    company: "Apex Freight Co.",
    quote:
      "MyMiles is the retirement plan I never thought I'd have. I've got $8,400 built up in 14 months just from miles I was already driving. It's automatic money I don't have to think about.",
    stars: 5,
    avatar: "AM",
    highlight: "$8,400 saved in 14 months",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" fill="#f59e0b" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(34,211,238,0.04) 0%, transparent 60%)",
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
          <span className="inline-block text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Driver Reviews
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-5xl text-white mb-4">
            Heard from the{" "}
            <span className="gradient-text">Drivers Themselves</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            12,000+ operators trust FourFleet with their livelihoods. Here's
            what they have to say.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariants}
              className="glass-card rounded-2xl p-6 border border-[rgba(34,211,238,0.08)] hover:border-[rgba(34,211,238,0.2)] transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <StarRating count={review.stars} />

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mt-4 mb-5 flex-1">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Highlight badge */}
              <div className="mb-5">
                <span className="inline-block text-xs font-semibold text-fleet-emerald bg-fleet-emerald/10 px-3 py-1 rounded-full">
                  {review.highlight}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fleet-cyan to-fleet-indigo flex items-center justify-center flex-shrink-0">
                  <span className="font-grotesk font-bold text-xs text-white">
                    {review.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs">
                    {review.role} · {review.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
