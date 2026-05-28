// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// const reviews = [
//   { name: "Marcus T.", role: "Owner-Operator", company: "Solo Rig", quote: "FleetPay changed my life. I used to wait 30–45 days for payment. Now it's same-day factoring. My take-home went from $2,100 to $3,400 a week after switching.", highlight: "$3,400/week take-home", avatar: "MT" },
//   { name: "Diana R.", role: "Fleet Manager", company: "Meridian Transport", quote: "Comply handles all our FMCSA renewals, safety audits, and driver qualification files. We went from 4 compliance staff to 1. The savings alone pay for the entire FourFleet subscription.", highlight: "4 staff → 1 with Comply", avatar: "DR" },
//   { name: "Jerome W.", role: "CDL Driver", company: "Ironclad Logistics", quote: "The AI dispatch is scary-good. It routes me to loads that keep me out of deadhead miles. I'm running 87% loaded miles now. Used to be 64%.", highlight: "87% loaded miles", avatar: "JW" },
//   { name: "Priya S.", role: "Operations Director", company: "CrossCountry Haul", quote: "WatchTower is incredible. Our ops team was spending 3 hours a day on check calls. Now the system handles all tracking and invoicing automatically. That's 15 hours a week back.", highlight: "15 hrs/week saved", avatar: "PS" },
//   { name: "Kevin O.", role: "Small Fleet Owner", company: "3-truck operation", quote: "The AI Maintenance Predictor flagged a brake issue on my Freightliner before it became a breakdown on I-80. Saved me $12,000 in repair costs and kept my load commitment.", highlight: "$12,000 repair cost avoided", avatar: "KO" },
//   { name: "Angela M.", role: "Lease-Purchase Driver", company: "Apex Freight Co.", quote: "MyMiles is the retirement plan I never thought I'd have. I've got $8,400 built up in 14 months just from miles I was already driving. It's automatic money I don't have to think about.", highlight: "$8,400 saved in 14 months", avatar: "AM" },
// ];

// const STAR_PATH = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

// function StarRow() {
//   return (
//     <div className="flex gap-1">
//       {[0, 1, 2, 3, 4].map((i) => (
//         <motion.svg
//           key={i}
//           width="18"
//           height="18"
//           viewBox="0 0 20 20"
//           fill="var(--accent)"
//           initial={{ opacity: 0, scale: 0.4 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: i * 0.07, duration: 0.3, ease: "backOut" }}
//         >
//           <path d={STAR_PATH} />
//         </motion.svg>
//       ))}
//     </div>
//   );
// }

// export default function Testimonials() {
//   const [activeIdx, setActiveIdx] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [starKey, setStarKey] = useState(0);

//   useEffect(() => {
//     if (paused) return;
//     const timer = setInterval(() => {
//       setActiveIdx((prev) => (prev + 1) % reviews.length);
//       setStarKey((prev) => prev + 1);
//     }, 5500);
//     return () => clearInterval(timer);
//   }, [paused]);

//   function handleSelect(idx: number) {
//     setActiveIdx(idx);
//     setStarKey((prev) => prev + 1);
//   }

//   const featured = reviews[activeIdx];

//   return (
//     <section
//       id="testimonials"
//       className="py-24"
//       style={{ background: "var(--bg-alt)" }}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section header */}
//         <motion.div
//           initial={{ opacity: 0, y: 28 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-14"
//         >
//           <p className="section-label">Driver Reviews</p>
//           <h2
//             className="font-montserrat font-black leading-none"
//             style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}
//           >
//             Heard from the
//             <br />
//             <span style={{ color: "var(--accent)" }}>Drivers Themselves</span>
//           </h2>
//           <p
//             className="font-outfit text-lg mt-4 max-w-2xl"
//             style={{ color: "var(--text-muted)" }}
//           >
//             12,000+ operators trust FourFleet with their livelihoods. Here&apos;s what they have to say.
//           </p>
//         </motion.div>

//         {/* Desktop: two-column layout */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left: featured card — 60% */}
//           <div className="w-full lg:w-[60%] min-h-[420px]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeIdx}
//                 initial={{ opacity: 0, x: -40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 40 }}
//                 transition={{ duration: 0.45, ease: "easeInOut" }}
//                 className="card flex flex-col overflow-hidden h-full"
//                 style={{ borderRadius: "16px" }}
//               >
//                 {/* Accent band */}
//                 <div
//                   className="px-8 py-5 flex items-center justify-between gap-4 flex-wrap"
//                   style={{ background: "var(--accent)" }}
//                 >
//                   <span
//                     className="font-montserrat font-black"
//                     style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#fff", letterSpacing: "-0.02em" }}
//                   >
//                     {featured.highlight}
//                   </span>
//                   <span
//                     className="font-outfit text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full flex-shrink-0"
//                     style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
//                   >
//                     Verified outcome
//                   </span>
//                 </div>

//                 {/* Body */}
//                 <div className="flex-1 px-8 py-8 flex flex-col justify-between" style={{ background: "var(--bg-card)" }}>
//                   <div className="relative">
//                     {/* Giant faded quote mark */}
//                     <span
//                       className="font-montserrat font-black select-none pointer-events-none absolute -top-4 -left-3"
//                       style={{ fontSize: "8rem", lineHeight: 1, color: "var(--accent)", opacity: 0.08 }}
//                       aria-hidden="true"
//                     >
//                       &ldquo;
//                     </span>
//                     <p
//                       className="font-outfit relative z-10 leading-relaxed"
//                       style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", color: "var(--text)", paddingTop: "1.5rem" }}
//                     >
//                       {featured.quote}
//                     </p>
//                   </div>

//                   {/* Footer */}
//                   <div className="flex items-center gap-4 mt-8 flex-wrap">
//                     <StarRow key={starKey} />
//                     <div className="flex items-center gap-3 ml-auto">
//                       <div
//                         className="w-[54px] h-[54px] rounded-full flex items-center justify-center flex-shrink-0 font-montserrat font-black text-base"
//                         style={{ background: "var(--accent)", color: "#fff" }}
//                       >
//                         {featured.avatar}
//                       </div>
//                       <div>
//                         <p
//                           className="font-montserrat font-black text-base"
//                           style={{ color: "var(--text)" }}
//                         >
//                           {featured.name}
//                         </p>
//                         <p
//                           className="font-outfit text-sm"
//                           style={{ color: "var(--text-muted)" }}
//                         >
//                           {featured.role}
//                         </p>
//                         <p
//                           className="font-outfit text-xs"
//                           style={{ color: "var(--text-faint)" }}
//                         >
//                           {featured.company}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Right: mini-cards stack — 40%, desktop only */}
//           <div className="hidden lg:flex w-[40%] flex-col gap-3">
//             {reviews.map((r, i) => {
//               const isActive = i === activeIdx;
//               return (
//                 <motion.button
//                   key={r.name}
//                   onClick={() => handleSelect(i)}
//                   initial={{ opacity: 0, x: 30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
//                   whileHover={{ x: -4 }}
//                   className="text-left w-full rounded-xl px-4 py-3 transition-colors cursor-pointer"
//                   style={{
//                     background: "var(--bg-card)",
//                     border: `1.5px solid ${isActive ? "var(--accent)" : "var(--border-card)"}`,
//                     outline: "none",
//                   }}
//                 >
//                   {/* Top row: avatar + name + highlight */}
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-montserrat font-black text-xs"
//                       style={{ background: "var(--accent)", color: "#fff" }}
//                     >
//                       {r.avatar}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p
//                         className="font-montserrat font-black text-sm truncate"
//                         style={{ color: "var(--text)" }}
//                       >
//                         {r.name}
//                       </p>
//                       <p
//                         className="font-outfit text-xs font-semibold truncate"
//                         style={{ color: "var(--accent)" }}
//                       >
//                         {r.highlight}
//                       </p>
//                     </div>
//                   </div>
//                   {/* Truncated quote */}
//                   <p
//                     className="font-outfit text-xs mt-2 line-clamp-2"
//                     style={{ color: "var(--text-muted)" }}
//                   >
//                     {r.quote}
//                   </p>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Mobile: horizontal scrollable mini-cards below featured */}
//         <div className="lg:hidden mt-5 -mx-4 px-4">
//           <div
//             className="flex gap-3 overflow-x-auto pb-2"
//             style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
//           >
//             {reviews.map((r, i) => {
//               const isActive = i === activeIdx;
//               return (
//                 <motion.button
//                   key={r.name}
//                   onClick={() => handleSelect(i)}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.07, duration: 0.4 }}
//                   className="flex-shrink-0 rounded-xl px-4 py-3 text-left cursor-pointer"
//                   style={{
//                     width: "220px",
//                     scrollSnapAlign: "start",
//                     background: "var(--bg-card)",
//                     border: `1.5px solid ${isActive ? "var(--accent)" : "var(--border-card)"}`,
//                     outline: "none",
//                   }}
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <div
//                       className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-montserrat font-black text-xs"
//                       style={{ background: "var(--accent)", color: "#fff" }}
//                     >
//                       {r.avatar}
//                     </div>
//                     <div className="min-w-0">
//                       <p
//                         className="font-montserrat font-black text-sm truncate"
//                         style={{ color: "var(--text)" }}
//                       >
//                         {r.name}
//                       </p>
//                       <p
//                         className="font-outfit text-xs font-semibold truncate"
//                         style={{ color: "var(--accent)" }}
//                       >
//                         {r.highlight}
//                       </p>
//                     </div>
//                   </div>
//                   <p
//                     className="font-outfit text-xs line-clamp-2"
//                     style={{ color: "var(--text-muted)" }}
//                   >
//                     {r.quote}
//                   </p>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { motion } from "framer-motion";

const reviews = [
  { 
    name: "Marcus T.", 
    role: "Owner-Operator", 
    company: "Solo Rig", 
    quote: "FleetPay changed my life. I used to wait 30–45 days for payment. Now it's same-day factoring. My take-home went from $2,100 to $3,400 a week after switching.", 
    highlight: "$3,400/week take-home", 
    avatar: "MT",
    size: "lg"
  },
  { 
    name: "Diana R.", 
    role: "Fleet Manager", 
    company: "Meridian Transport", 
    quote: "Comply handles all our FMCSA renewals, safety audits, and driver qualification files. We went from 4 compliance staff to 1. The savings alone pay for the entire FourFleet subscription.", 
    highlight: "4 staff → 1 with Comply", 
    avatar: "DR",
    size: "md"
  },
  { 
    name: "Jerome W.", 
    role: "CDL Driver", 
    company: "Ironclad Logistics", 
    quote: "The AI dispatch is scary-good. It routes me to loads that keep me out of deadhead miles. I'm running 87% loaded miles now. Used to be 64%.", 
    highlight: "87% loaded miles", 
    avatar: "JW",
    size: "sm"
  },
  { 
    name: "Priya S.", 
    role: "Operations Director", 
    company: "CrossCountry Haul", 
    quote: "WatchTower is incredible. Our ops team was spending 3 hours a day on check calls. Now the system handles all tracking and invoicing automatically. That's 15 hours a week back.", 
    highlight: "15 hrs/week saved", 
    avatar: "PS",
    size: "md"
  },
  { 
    name: "Kevin O.", 
    role: "Small Fleet Owner", 
    company: "3-truck operation", 
    quote: "The AI Maintenance Predictor flagged a brake issue on my Freightliner before it became a breakdown on I-80. Saved me $12,000 in repair costs and kept my load commitment.", 
    highlight: "$12,000 saved", 
    avatar: "KO",
    size: "sm"
  },
  { 
    name: "Angela M.", 
    role: "Lease-Purchase Driver", 
    company: "Apex Freight Co.", 
    quote: "MyMiles is the retirement plan I never thought I'd have. I've got $8,400 built up in 14 months just from miles I was already driving. It's automatic money I don't have to think about.", 
    highlight: "$8,400 saved", 
    avatar: "AM",
    size: "lg"
  },
];

const STAR_PATH = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="var(--accent)">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="testimonials" className="py-24" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="tracking-widest uppercase text-xs font-bold mb-3" style={{ color: "var(--accent)" }}>
              Real Results
            </p>
            <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--text)" }}>
              Heard from the <span style={{ color: "var(--accent)" }}>Drivers</span>
            </h2>
          </div>
          <p
            className="font-outfit text-base md:text-lg max-w-xl text-balance lg:text-right"
            style={{ color: "var(--text-muted)" }}
          >
            Over 12,000 operators trust FourFleet with their livelihoods. Here is the unfiltered economic impact on their operations.
          </p>
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto"
        >
          {reviews.map((r) => {
            const isLarge = r.size === "lg";
            const gridClasses = isLarge 
              ? "md:col-span-2 lg:col-span-2" 
              : "col-span-1";

            return (
              <motion.div
                key={r.name}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`${gridClasses} flex flex-col justify-between p-6 md:p-8 rounded-2xl relative overflow-hidden group`}
                style={{ 
                  background: "var(--bg-card)", 
                  border: "1px solid var(--border-card, rgba(255,255,255,0.08))",
                }}
              >
                <div>
                  {/* Top Line badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <span
                      className="font-montserrat font-black text-xs md:text-sm px-3 py-1.5 rounded-lg inline-block uppercase tracking-wide"
                      style={{ background: "rgba(235, 94, 40, 0.15)", color: "var(--accent)" }}
                    >
                      {r.highlight}
                    </span>
                    <span className="font-outfit text-[10px] uppercase tracking-widest font-bold opacity-40">
                      ✓ Verified
                    </span>
                  </div>

                  {/* Testimonial text */}
                  <p
                    className="font-outfit leading-relaxed mb-6 font-medium"
                    style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)", color: "var(--text)" }}
                  >
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </div>

                {/* Card Footer Profile */}
                <div className="border-t pt-5 flex items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-montserrat font-black text-xs"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    {r.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-montserrat font-black text-xs md:text-sm truncate" style={{ color: "var(--text)" }}>
                      {r.name}
                    </p>
                    <p className="font-outfit text-xs truncate" style={{ color: "var(--text-muted)" }}>
                      {r.role} <span className="opacity-40 mx-1">•</span> <span className="italic opacity-70">{r.company}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-end">
                    <StarRow />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}