"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="cta" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-3xl p-10 md:p-16 relative overflow-hidden" style={{ background: "var(--text)", color: "var(--bg)" }}>
          {/* Decorative amber blob */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(217,119,6,0.25) 0%, transparent 70%)", transform: "translate(40%, -40%)" }} />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-outfit text-xs font-bold uppercase tracking-widest mb-8"
              style={{ background: "rgba(255,255,255,0.1)", color: "var(--bg)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              Limited Early Access
            </div>

            <h2 className="font-montserrat font-black text-4xl md:text-6xl leading-none mb-6" style={{ color: "var(--bg)" }}>
              Ready to run your<br/><span style={{ color: "var(--accent)" }}>fleet smarter?</span>
            </h2>

            <p className="font-outfit text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(247,243,237,0.7)" }}>
              Join 12,000+ drivers already earning more, stressing less, and growing their business with FourFleet.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-10">
              {["First 30 days free", "No credit card", "Setup in 5 min"].map(p => (
                <div key={p} className="flex items-center gap-2 font-outfit text-sm" style={{ color: "rgba(247,243,237,0.8)" }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeWidth="1.5"/>
                    <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {p}
                </div>
              ))}
            </div>

            {!submitted ? (
              <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required
                  className="flex-1 px-5 py-4 rounded-xl font-outfit text-sm outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "var(--bg)" }} />
                <button type="submit" className="btn-fill px-7 py-4 rounded-xl font-montserrat font-bold text-sm whitespace-nowrap transition-all duration-300"
                  style={{ background: "var(--accent)", color: "#fff", border: "2px solid var(--accent)" }}>
                  Get Early Access
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-3 py-4">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="2"/>
                  <path d="M8 12l3 3 5-5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-montserrat font-bold" style={{ color: "var(--accent)" }}>You&apos;re on the list! We&apos;ll be in touch shortly.</p>
              </motion.div>
            )}

            <p className="font-outfit text-xs mt-5" style={{ color: "rgba(247,243,237,0.4)" }}>
              By signing up you agree to our Terms of Service and Privacy Policy. No spam, ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
