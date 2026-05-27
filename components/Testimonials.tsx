"use client";

import { motion } from "framer-motion";

const reviews = [
  { name: "Marcus T.", role: "Owner-Operator", company: "Solo Rig", quote: "FleetPay changed my life. I used to wait 30–45 days for payment. Now it's same-day factoring. My take-home went from $2,100 to $3,400 a week after switching.", highlight: "$3,400/week take-home", avatar: "MT" },
  { name: "Diana R.", role: "Fleet Manager", company: "Meridian Transport", quote: "Comply handles all our FMCSA renewals, safety audits, and driver qualification files. We went from 4 compliance staff to 1. The savings alone pay for the entire FourFleet subscription.", highlight: "4 staff → 1 with Comply", avatar: "DR" },
  { name: "Jerome W.", role: "CDL Driver", company: "Ironclad Logistics", quote: "The AI dispatch is scary-good. It routes me to loads that keep me out of deadhead miles. I'm running 87% loaded miles now. Used to be 64%.", highlight: "87% loaded miles", avatar: "JW" },
  { name: "Priya S.", role: "Operations Director", company: "CrossCountry Haul", quote: "WatchTower is incredible. Our ops team was spending 3 hours a day on check calls. Now the system handles all tracking and invoicing automatically. That's 15 hours a week back.", highlight: "15 hrs/week saved", avatar: "PS" },
  { name: "Kevin O.", role: "Small Fleet Owner", company: "3-truck operation", quote: "The AI Maintenance Predictor flagged a brake issue on my Freightliner before it became a breakdown on I-80. Saved me $12,000 in repair costs and kept my load commitment.", highlight: "$12,000 repair cost avoided", avatar: "KO" },
  { name: "Angela M.", role: "Lease-Purchase Driver", company: "Apex Freight Co.", quote: "MyMiles is the retirement plan I never thought I'd have. I've got $8,400 built up in 14 months just from miles I was already driving. It's automatic money I don't have to think about.", highlight: "$8,400 saved in 14 months", avatar: "AM" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="section-label">Driver Reviews</p>
          <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
            Heard from the<br/><span style={{ color: "var(--accent)" }}>Drivers Themselves</span>
          </h2>
          <p className="font-outfit text-lg mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            12,000+ operators trust FourFleet with their livelihoods. Here&apos;s what they have to say.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card p-6 flex flex-col">
              {/* Quotation mark */}
              <div className="font-montserrat font-black text-6xl leading-none mb-2" style={{ color: "var(--accent)", opacity: 0.3 }}>&ldquo;</div>
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(s => <svg key={s} width="14" height="14" fill="var(--accent)" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="font-outfit text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-muted)" }}>{r.quote}</p>
              <span className="inline-block font-outfit text-xs font-semibold px-3 py-1 rounded-full mb-5 self-start" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{r.highlight}</span>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-montserrat font-black text-xs" style={{ background: "var(--accent)", color: "#fff" }}>{r.avatar}</div>
                <div>
                  <p className="font-montserrat font-bold text-sm" style={{ color: "var(--text)" }}>{r.name}</p>
                  <p className="font-outfit text-xs" style={{ color: "var(--text-muted)" }}>{r.role} · {r.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
