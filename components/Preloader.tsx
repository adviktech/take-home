"use client";

// Branded full-screen preloader. Shows for at least 1 second so users see the
// brand, then fades out once the page has loaded. Respects prefers-reduced-motion.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANIM } from "@/lib/animations";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);

    const MIN_MS = 1000;
    const start = Date.now();

    function dismiss() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setVisible(false), remaining);
    }

    if (document.readyState === "complete") {
      // Already loaded — still wait the minimum time
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Fallback: never block longer than 4 seconds
      const safeguard = setTimeout(() => setVisible(false), 4000);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(safeguard);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.4, ease: ANIM.EASE_OUT }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
          style={{ background: "var(--bg)" }}
        >
          {/* FF badge with glow pulse */}
          <div className="relative">
            {/* Glow halo behind badge */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={reduceMotion ? {} : { opacity: [0.25, 0.6, 0.25], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "var(--accent)", filter: "blur(14px)", zIndex: 0 }}
            />

            <motion.div
              className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center font-montserrat font-black text-2xl"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
              animate={reduceMotion ? {} : { scale: [1, 1.04, 1], rotate: [0, 1.5, -1.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              FF
            </motion.div>
          </div>

          {/* Wordmark */}
          <div className="font-montserrat font-black text-2xl tracking-tight" style={{ color: "var(--text)" }}>
            FourFleet
          </div>

          {/* Three bouncing dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-2 h-2 rounded-full"
                style={{ background: "var(--accent)" }}
                animate={reduceMotion ? {} : { y: [0, -9, 0] }}
                transition={{
                  duration: 0.55,
                  repeat: Infinity,
                  delay: i * 0.14,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
