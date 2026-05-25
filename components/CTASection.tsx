"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="cta" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="gradient-border rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold tracking-widest uppercase text-fleet-emerald mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fleet-emerald animate-pulse" />
              Limited Early Access
            </motion.div>

            <h2 className="font-grotesk font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
              Ready to run your{" "}
              <span className="gradient-text">fleet smarter?</span>
            </h2>

            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Join 12,000+ drivers already earning more, stressing less, and
              growing their business with FourFleet.
            </p>

            {/* Perks */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
              {[
                "First 30 days free",
                "No credit card",
                "Setup in 5 min",
              ].map((perk) => (
                <div key={perk} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                    className="flex-shrink-0"
                  >
                    <circle cx="7" cy="7" r="6" fill="rgba(52,211,153,0.15)" />
                    <path
                      d="M4.5 7l2 2 3-3"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Email form */}
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-[rgba(255,255,255,0.06)] border border-[rgba(34,211,238,0.15)] text-white placeholder-slate-500 focus:outline-none focus:border-fleet-cyan transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl bg-fleet-cyan text-fleet-bg font-semibold text-sm whitespace-nowrap hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transform"
                >
                  Get Early Access
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-fleet-emerald"
                >
                  <circle cx="12" cy="12" r="10" fill="rgba(52,211,153,0.15)" />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-fleet-emerald font-semibold">
                  You&apos;re on the list! We&apos;ll be in touch shortly.
                </p>
              </motion.div>
            )}

            <p className="text-slate-600 text-xs mt-5">
              By signing up you agree to our Terms of Service and Privacy
              Policy. No spam, ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
