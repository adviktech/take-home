"use client";

// Thin amber progress bar pinned to the top of the viewport.
// Fills left-to-right as the user scrolls down the page.
// GPU-accelerated via transform:scaleX — zero layout cost.

import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        background: "var(--accent)",
        transformOrigin: "0% 50%",
      }}
    />
  );
}
