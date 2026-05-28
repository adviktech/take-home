"use client";

// Reusable scroll-reveal wrapper. Wraps any content and fades it in from a
// direction when it enters the viewport. Fires only once per page load.
// Use the `delay` prop to stagger sibling items.

import { motion } from "framer-motion";
import { ANIM, revealVariants } from "@/lib/animations";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;            // seconds
  direction?: Direction;
  className?: string;
  amount?: number;           // 0–1, how much of element must be visible to trigger
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  amount = 0.15,
}: RevealProps) {
  const vars = revealVariants[direction];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: vars.hidden,
        visible: {
          ...vars.visible,
          transition: {
            duration: ANIM.SLOW / 1000,
            delay,
            ease: ANIM.EASE_OUT,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
