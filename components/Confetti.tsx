"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
}

const COLORS = ["#F59E0B", "#D97706", "#FBBF24", "#FCD34D", "#FDE68A", "#ffffff", "#FB923C"];

export default function Confetti({ active }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!active || firedRef.current) return;
    firedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLElement[] = [];
    for (let i = 0; i < 44; i++) {
      const el = document.createElement("div");
      const size = Math.random() * 9 + 4;
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        border-radius: ${Math.random() > 0.45 ? "50%" : "2px"};
        left: ${30 + Math.random() * 40}%;
        top: 40%;
        opacity: 1;
        pointer-events: none;
        will-change: transform, opacity;
      `;
      container.appendChild(el);
      particles.push(el);
    }

    import("animejs")
      .then(({ default: anime }) => {
        anime({
          targets: particles,
          translateX: () => (Math.random() - 0.5) * 340,
          translateY: () => -(Math.random() * 220 + 60),
          rotate: () => Math.random() * 720 - 360,
          opacity: [1, 0],
          duration: () => Math.random() * 900 + 900,
          delay: (_el: Element, i: number) => i * 18,
          easing: "easeOutExpo",
          complete: () => {
            particles.forEach(p => p.remove());
          },
        });
      })
      .catch(() => {
        particles.forEach(p => p.remove());
      });
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 20 }}
    />
  );
}
