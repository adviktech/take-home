// Animation design tokens — use these everywhere so durations, easings, and
// distances stay consistent across the whole site.

export const ANIM = {
  // Durations (ms for animejs / seconds for Framer Motion — see helpers below)
  FAST:     200,
  BASE:     400,
  SLOW:     700,
  ENTRANCE: 900,

  // Framer Motion cubic-bezier easings (use as `ease` arrays)
  EASE_OUT:    [0.22, 1, 0.36, 1] as const,     // snappy deceleration
  EASE_IN_OUT: [0.65, 0, 0.35, 1] as const,     // smooth in-and-out
  EASE_SPRING: [0.16, 1, 0.3, 1]  as const,     // spring-like overshoot

  // animejs easing strings
  ANIME_EASE_OUT:    "easeOutExpo",
  ANIME_BOUNCE:      "easeOutElastic(1, .6)",
  ANIME_EASE_QUART:  "easeOutQuart",

  // Slide distances (px)
  SLIDE_UP:   40,
  SLIDE_SIDE: 30,

  // Stagger delays (seconds, for Framer Motion)
  STAGGER_BASE:  0.08,
  STAGGER_TIGHT: 0.04,

  // Float animation (dashboard bob)
  FLOAT_AMPLITUDE: 8,   // px
  FLOAT_DURATION:  4,   // seconds

  // Scroll-reveal blur
  BLUR_HIDDEN:  "blur(4px)",
  BLUR_VISIBLE: "blur(0px)",
} as const;

// Convenience: Framer Motion hidden/visible variants for the <Reveal> component
export const revealVariants = {
  up: {
    hidden:  { opacity: 0, y: ANIM.SLIDE_UP,    filter: ANIM.BLUR_HIDDEN  },
    visible: { opacity: 1, y: 0,                 filter: ANIM.BLUR_VISIBLE },
  },
  down: {
    hidden:  { opacity: 0, y: -ANIM.SLIDE_UP,   filter: ANIM.BLUR_HIDDEN  },
    visible: { opacity: 1, y: 0,                 filter: ANIM.BLUR_VISIBLE },
  },
  left: {
    hidden:  { opacity: 0, x: -ANIM.SLIDE_SIDE, filter: ANIM.BLUR_HIDDEN  },
    visible: { opacity: 1, x: 0,                 filter: ANIM.BLUR_VISIBLE },
  },
  right: {
    hidden:  { opacity: 0, x: ANIM.SLIDE_SIDE,  filter: ANIM.BLUR_HIDDEN  },
    visible: { opacity: 1, x: 0,                 filter: ANIM.BLUR_VISIBLE },
  },
  fade: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
} as const;
