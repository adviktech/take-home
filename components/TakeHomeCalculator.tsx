"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  role: string;
  cdlAge: number;
  drivingRecord: string;
  type: string;
  regions: string[];
  lane: string;
  homeTime: string;
  target: string;
  start: string;
}

interface ContactForm {
  name: string;
  phone: string;
  email: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const REGIONS = ["Southeast", "Northeast", "Midwest", "West Coast", "Texas / South", "No Preference"];

const ANALYSIS_MSGS = [
  "Calculating your guaranteed amount...",
  "Matching your profile to open lanes...",
  "Eliminating dispatcher markup...",
  "Locking in your take-home floor...",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcGuaranteed(f: FormData): number {
  const base = parseInt(f.target) || 2500;
  return base + (f.type === "Team" ? 400 : 250) + (f.lane === "OTR" ? 150 : f.lane === "Regional" ? 75 : 0);
}

function buildCalendarUrl(c: ContactForm): string {
  const parts = c.name.trim().split(" ");
  const p = new URLSearchParams({
    first_name: parts[0] || "",
    last_name: parts.slice(1).join(" ") || "",
    email: c.email,
    phone: c.phone,
  });
  return "https://api.leadconnectorhq.com/widget/booking/GKsrU2o9Jh4uSUrdFV1y?" + p.toString();
}

// ─── anime.js count-up (progressive enhancement — page works without it) ──────

async function animeCountUp(el: HTMLElement, to: number) {
  try {
    const anime = (await import("animejs")).default;
    const obj = { val: 0 };
    anime({
      targets: obj,
      val: to,
      duration: 1400,
      easing: "easeOutExpo",
      update() {
        el.textContent = "$" + Math.round(obj.val).toLocaleString() + "+";
      },
    });
  } catch {
    el.textContent = "$" + to.toLocaleString() + "+";
  }
}

async function animeStagger(selector: string) {
  try {
    const anime = (await import("animejs")).default;
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    anime({
      targets: selector,
      translateX: [-12, 0],
      opacity: [0.4, 1],
      delay: (anime as any).stagger(50),
      duration: 320,
      easing: "easeOutQuart",
    });
  } catch {
    // silent — elements are already visible via CSS
  }
}

// ─── Framer variants ──────────────────────────────────────────────────────────

const stepVariants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.18 } },
};

// ─── Glass styles ─────────────────────────────────────────────────────────────

const glassPanel: React.CSSProperties = {
  background: "rgba(14,26,51,0.82)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.07)",
};

const glassItem: React.CSSProperties = {
  background: "rgba(30,41,59,0.55)",
  border: "1px solid rgba(255,255,255,0.08)",
};

// ─── Small components ─────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1 px-6 pt-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div
          key={i}
          className="h-[3px] flex-1 rounded-full transition-all duration-500"
          style={{
            background:
              step > i ? "#22d3ee" : step === i ? "rgba(34,211,238,0.45)" : "rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  );
}

function OptionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl transition-all duration-200"
      style={glassItem}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(34,211,238,0.4)";
        el.style.background = "rgba(34,211,238,0.06)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.08)";
        el.style.background = "rgba(30,41,59,0.55)";
        el.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

function PrimaryBtn({
  onClick,
  disabled,
  type = "button",
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 rounded-xl font-bold text-[#03070f] transition-all duration-200"
      style={{
        background: disabled ? "rgba(34,211,238,0.3)" : "#22d3ee",
        boxShadow: disabled ? "none" : "0 0 22px rgba(34,211,238,0.3)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 38px rgba(34,211,238,0.55)";
      }}
      onMouseLeave={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 22px rgba(34,211,238,0.3)";
      }}
    >
      {children}
    </button>
  );
}

function InputField({
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}: {
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full p-4 rounded-2xl text-base outline-none transition-all duration-200"
        style={{
          background: "rgba(15,23,42,0.8)",
          border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.1)",
          color: "#f8fafc",
        }}
        onFocus={(e) => {
          if (!error) (e.currentTarget as HTMLElement).style.borderColor = "#22d3ee";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = error
            ? "#f87171"
            : "rgba(255,255,255,0.1)";
        }}
      />
      {error && <p className="text-red-400 text-xs mt-1 pl-1">{error}</p>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TakeHomeCalculator() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    role: "", cdlAge: 3, drivingRecord: "", type: "",
    regions: [], lane: "", homeTime: "", target: "", start: "",
  });
  const [contact, setContact] = useState<ContactForm>({ name: "", phone: "", email: "" });
  const [targetErr, setTargetErr] = useState("");
  const [contactErrs, setContactErrs] = useState({ name: "", phone: "", email: "" });
  const [analysisMsg, setAnalysisMsg] = useState(ANALYSIS_MSGS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const amountRef = useRef<HTMLSpanElement>(null);

  function go(n: number) {
    setDirection(n > step ? 1 : -1);
    setStep(n);
  }

  function patch(partial: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...partial }));
  }

  function patchContact(partial: Partial<ContactForm>) {
    setContact((prev) => ({ ...prev, ...partial }));
  }

  // Stagger option buttons whenever step changes
  useEffect(() => {
    if (step >= 1 && step <= 9) {
      setTimeout(() => animeStagger(".calc-opt"), 80);
    }
  }, [step]);

  // Count-up on results
  useEffect(() => {
    if (step === 11 && amountRef.current) {
      animeCountUp(amountRef.current, calcGuaranteed(formData));
    }
  }, [step]); // eslint-disable-line

  // ── Analysis ────────────────────────────────────────────────────────────────

  function runAnalysis(start: string) {
    patch({ start });
    go(10);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < ANALYSIS_MSGS.length) setAnalysisMsg(ANALYSIS_MSGS[i]);
    }, 520);
    setTimeout(() => { clearInterval(iv); go(11); }, 2300);
  }

  // ── Validation ──────────────────────────────────────────────────────────────

  function validateTarget() {
    const val = parseInt(formData.target);
    if (!formData.target || isNaN(val)) { setTargetErr("Please enter a weekly amount."); return; }
    if (val < 500) { setTargetErr("Minimum is $500/week."); return; }
    if (val > 99999) { setTargetErr("Please enter a realistic amount."); return; }
    setTargetErr("");
    go(9);
  }

  function validateContact(): boolean {
    const e = { name: "", phone: "", email: "" };
    let ok = true;
    if (contact.name.trim().length < 2) { e.name = "Please enter your full name."; ok = false; }
    if (contact.phone.replace(/\D/g, "").length < 10) { e.phone = "Valid 10-digit number required."; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) { e.email = "Valid email required."; ok = false; }
    setContactErrs(e);
    return ok;
  }

  async function submitLead() {
    if (!validateContact()) return;
    setIsSubmitting(true);
    setSubmitErr("");
    try {
      const nameParts = contact.name.split(" ");
      await fetch(
        "https://services.leadconnectorhq.com/hooks/pMKtOmnlpKKlzeCR8Sqe/webhook-trigger/KYm9IflHHhJ8YwoNkXiQ",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: nameParts[0], lastName: nameParts.slice(1).join(" "),
            phone: contact.phone, email: contact.email,
            customField: {
              role: formData.role, cdlExperience: formData.cdlAge + " years",
              drivingRecord: formData.drivingRecord, drivingType: formData.type,
              regions: formData.regions.join(", "), lane: formData.lane,
              homeTime: formData.homeTime, targetTakeHome: "$" + formData.target,
              startDate: formData.start,
              guaranteedAmount: "$" + calcGuaranteed(formData).toLocaleString(),
              source: "FourFleet Landing Page",
            },
            tags: ["takehome-landing"],
          }),
        }
      );
      go(12);
    } catch {
      // GHL webhooks often throw CORS on response read — lead is still received
      go(12);
    } finally {
      setIsSubmitting(false);
    }
  }

  function reset() {
    setStep(0);
    setFormData({ role: "", cdlAge: 3, drivingRecord: "", type: "", regions: [], lane: "", homeTime: "", target: "", start: "" });
    setContact({ name: "", phone: "", email: "" });
    setTargetErr(""); setContactErrs({ name: "", phone: "", email: "" });
    setSubmitErr(""); setIsSubmitting(false);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }

  const amount = calcGuaranteed(formData);

  // ── Steps 1-9 content ────────────────────────────────────────────────────────

  function renderStep() {
    switch (step) {

      // Step 1: Role
      case 1: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">
            What&apos;s your current setup?
          </h2>
          <p className="text-slate-500 text-sm text-center mb-5">Choose the option that fits you best</p>
          <div className="space-y-3">
            {[
              { role: "Company Driver", color: "#22d3ee", bg: "rgba(34,211,238,0.08)", sub: '"I want a steady, guaranteed check."', svgColor: "#22d3ee", d: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3 21c0-4.418 4.03-8 9-8s9 3.582 9 8" },
              { role: "Lease Purchase", color: "#818cf8", bg: "rgba(99,102,241,0.08)", sub: '"I want truck ownership + high take-home."', svgColor: "#818cf8", d: "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
              { role: "Owner Operator", color: "#34d399", bg: "rgba(52,211,153,0.08)", sub: '"I have a tractor; I need a fair authority."', svgColor: "#34d399", d: "M3 17h2l1.5-5h11L19 17h2M5 17l-1-3h16l-1 3M7 17v2m10-2v2" },
            ].map(({ role, color, bg, sub, svgColor, d }) => (
              <OptionButton key={role} onClick={() => { patch({ role }); go(2); }}>
                <div className="calc-opt flex items-center gap-3 p-4 sm:p-5">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: bg }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path d={d} stroke={svgColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color }}>{role}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{sub}</div>
                  </div>
                </div>
              </OptionButton>
            ))}
          </div>
        </div>
      );

      // Step 2: CDL Years
      case 2: return (
        <div className="text-center">
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white mb-1">Years of CDL Experience?</h2>
          <p className="text-slate-500 text-sm mb-5">Drag the slider to set your experience</p>
          <div className="text-6xl sm:text-7xl font-black text-fleet-cyan tabular-nums mb-5 font-grotesk">
            {formData.cdlAge}{formData.cdlAge >= 25 ? "+" : ""}<span className="text-4xl"> yr</span>
          </div>
          <input
            type="range" min={1} max={25} value={formData.cdlAge}
            onChange={(e) => patch({ cdlAge: parseInt(e.target.value) })}
            className="w-full mb-2"
            style={{ accentColor: "#22d3ee" }}
          />
          <div className="flex justify-between text-xs text-slate-600 mb-7 px-1">
            <span>1 yr</span><span>25+ yr</span>
          </div>
          <PrimaryBtn onClick={() => go(3)}>Continue →</PrimaryBtn>
        </div>
      );

      // Step 3: Driving Record
      case 3: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">How&apos;s your driving record?</h2>
          <p className="text-slate-500 text-sm text-center mb-5">Be honest — we match you to the right carriers</p>
          <div className="space-y-3">
            {[
              { val: "Excellent", emoji: "⭐", sub: "No violations or accidents" },
              { val: "Good", emoji: "👍", sub: "Minor issues, nothing major" },
              { val: "Ok", emoji: "🔄", sub: "Some violations or accidents" },
            ].map(({ val, emoji, sub }) => (
              <OptionButton key={val} onClick={() => { patch({ drivingRecord: val }); go(4); }}>
                <div className="calc-opt flex items-center gap-4 p-4 sm:p-5">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <div className="font-bold text-slate-200">{val}</div>
                    <div className="text-xs text-slate-500">{sub}</div>
                  </div>
                </div>
              </OptionButton>
            ))}
          </div>
        </div>
      );

      // Step 4: Solo / Team
      case 4: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">Driving Style?</h2>
          <p className="text-slate-500 text-sm text-center mb-5">How do you prefer to run?</p>
          <div className="grid grid-cols-2 gap-4">
            {[{ val: "Solo", emoji: "🚛" }, { val: "Team", emoji: "👥" }].map(({ val, emoji }) => (
              <button
                key={val}
                onClick={() => { patch({ type: val }); go(5); }}
                className="calc-opt p-8 sm:p-10 rounded-2xl font-black text-lg uppercase tracking-widest text-center transition-all duration-200"
                style={glassItem}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(34,211,238,0.4)";
                  el.style.background = "rgba(34,211,238,0.06)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(30,41,59,0.55)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <span className="text-white">{val}</span>
              </button>
            ))}
          </div>
        </div>
      );

      // Step 5: Regions
      case 5: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">Preferred Regions?</h2>
          <p className="text-slate-500 text-sm text-center mb-5">Select all that apply</p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {REGIONS.map((r) => {
              const sel = formData.regions.includes(r);
              return (
                <button
                  key={r}
                  onClick={() => patch({ regions: sel ? formData.regions.filter((x) => x !== r) : [...formData.regions, r] })}
                  className="calc-opt py-3 px-4 rounded-xl text-sm font-semibold text-center transition-all duration-200"
                  style={{
                    border: sel ? "1px solid #22d3ee" : "1px solid rgba(255,255,255,0.08)",
                    background: sel ? "rgba(34,211,238,0.1)" : "rgba(30,41,59,0.55)",
                    color: sel ? "#22d3ee" : "#94a3b8",
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
          <PrimaryBtn onClick={() => go(6)} disabled={formData.regions.length === 0}>
            Lock In Regions →
          </PrimaryBtn>
        </div>
      );

      // Step 6: Lane
      case 6: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">Desired Lane?</h2>
          <p className="text-slate-500 text-sm text-center mb-5">Pick your preferred run type</p>
          <div className="space-y-3">
            {[
              { id: "Local", desc: "Home every day, city routes" },
              { id: "Regional", desc: "Out 1–3 days, familiar territory" },
              { id: "OTR", desc: "Cross-country, max miles & pay" },
            ].map(({ id, desc }) => (
              <OptionButton key={id} onClick={() => { patch({ lane: id }); go(7); }}>
                <div className="calc-opt flex justify-between items-center p-4 sm:p-5">
                  <span className="font-bold text-slate-200">{id}</span>
                  <span className="text-xs text-slate-500">{desc}</span>
                </div>
              </OptionButton>
            ))}
          </div>
        </div>
      );

      // Step 7: Home Time
      case 7: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">Home Frequency?</h2>
          <p className="text-slate-500 text-sm text-center mb-5">How often do you need to be home?</p>
          <div className="grid grid-cols-2 gap-3">
            {["Daily", "Weekly", "Bi-Weekly", "Monthly"].map((h) => (
              <button
                key={h}
                onClick={() => { patch({ homeTime: h }); go(8); }}
                className="calc-opt py-5 rounded-xl font-bold text-slate-200 text-center transition-all duration-200"
                style={glassItem}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(34,211,238,0.4)";
                  el.style.background = "rgba(34,211,238,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(30,41,59,0.55)";
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      );

      // Step 8: Target
      case 8: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">Target Take-Home?</h2>
          <p className="text-slate-500 text-sm text-center mb-5">Minimum weekly amount you need in your bank</p>
          <div className="relative max-w-xs mx-auto mb-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-500 pointer-events-none select-none">$</span>
            <input
              type="number"
              value={formData.target}
              onChange={(e) => { patch({ target: e.target.value }); setTargetErr(""); }}
              placeholder="2500"
              min={500} max={99999}
              className="w-full p-5 pl-10 text-2xl font-black text-center rounded-2xl outline-none transition-all duration-200"
              style={{
                background: "rgba(15,23,42,0.8)",
                border: targetErr ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
              }}
              onFocus={(e) => { if (!targetErr) (e.currentTarget as HTMLElement).style.borderColor = "#22d3ee"; }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = targetErr ? "#f87171" : "rgba(255,255,255,0.1)"; }}
            />
          </div>
          {targetErr && <p className="text-red-400 text-xs text-center mb-2">{targetErr}</p>}
          <div className="flex gap-2 justify-center mb-5">
            {[1500, 2000, 2500, 3000].map((v) => (
              <button
                key={v}
                onClick={() => { patch({ target: String(v) }); setTargetErr(""); }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", background: "transparent" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#22d3ee"; el.style.color = "#22d3ee"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "#94a3b8"; }}
              >
                ${v.toLocaleString()}
              </button>
            ))}
          </div>
          <PrimaryBtn onClick={validateTarget}>Continue →</PrimaryBtn>
        </div>
      );

      // Step 9: Start Date
      case 9: return (
        <div>
          <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-white text-center mb-1">When can you start?</h2>
          <p className="text-slate-500 text-sm text-center mb-5">Be honest — we&apos;ll match the right opportunity</p>
          <div className="space-y-3">
            {[
              { id: "Immediately", desc: "Ready to roll now", icon: "⚡" },
              { id: "In 2 Weeks", desc: "Wrapping things up", icon: "📅" },
              { id: "Just Browsing", desc: "Exploring options", icon: "👀" },
            ].map(({ id, desc, icon }) => (
              <OptionButton key={id} onClick={() => runAnalysis(id)}>
                <div className="calc-opt flex items-center gap-4 p-4 sm:p-5">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-bold text-slate-200">{id}</div>
                    <div className="text-xs text-slate-500">{desc}</div>
                  </div>
                </div>
              </OptionButton>
            ))}
          </div>
        </div>
      );

      default: return null;
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section id="calculator" className="py-24 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-fleet-cyan text-xs font-semibold tracking-widest uppercase mb-4">
            Everything You Need
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-5xl text-white mb-4">
            Calculate Your{" "}
            <span className="gradient-text">Guaranteed Take-Home</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Answer 9 quick questions. We calculate your guaranteed weekly
            take-home floor — no BS, no hidden fees, no dispatcher games.
          </p>
        </motion.div>

        {/* Calculator container */}
        <div className="max-w-[560px] mx-auto">

          {/* ══ STEP 0: Intro ══ */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-3xl p-8 sm:p-10 text-center" style={glassPanel}>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] font-bold uppercase tracking-widest"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}
                >
                  Guaranteed Take-Home Program
                </div>

                <h3 className="font-grotesk font-bold text-3xl sm:text-4xl text-white mb-3 leading-tight">
                  Stop Fueling Their Profit.
                  <span className="block gradient-text mt-1">Earn Yours.</span>
                </h3>
                <p className="text-slate-400 text-base mb-8 max-w-sm mx-auto leading-relaxed">
                  Tired of the house taking the lion&apos;s share? We guarantee a{" "}
                  <span className="text-slate-200 font-semibold">Take-Home Floor</span>.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { val: "12k+", label: "Drivers" },
                    { val: "48", label: "States" },
                    { val: "100%", label: "Guaranteed" },
                  ].map(({ val, label }) => (
                    <div key={label} className="rounded-2xl p-4 text-center" style={glassItem}>
                      <div className="font-grotesk font-bold text-xl text-fleet-cyan">{val}</div>
                      <div className="text-slate-600 text-[11px] uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => go(1)}
                  className="w-full py-5 rounded-2xl font-black text-lg uppercase tracking-wider text-[#03070f] transition-all duration-200"
                  style={{ background: "#22d3ee", boxShadow: "0 0 28px rgba(34,211,238,0.4)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 44px rgba(34,211,238,0.65)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(34,211,238,0.4)"; }}
                >
                  Calculate My Take-Home →
                </button>
                <p className="text-slate-700 text-xs mt-3">Takes less than 2 minutes · No commitment required</p>
              </div>
            </motion.div>
          )}

          {/* ══ STEPS 1–9: Wizard ══ */}
          {step >= 1 && step <= 9 && (
            <div className="rounded-3xl overflow-hidden" style={glassPanel}>
              <ProgressBar step={step} />
              <div className="text-center pt-3 pb-1">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                  Step {step} of 9
                </span>
              </div>
              <div className="px-6 sm:px-8 pb-6 pt-2" style={{ minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
              {step > 1 && (
                <div className="px-6 sm:px-8 pb-6 pt-0 -mt-2">
                  <button
                    onClick={() => go(step - 1)}
                    className="text-slate-600 text-sm font-medium hover:text-slate-400 transition-colors flex items-center gap-1"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <path d="M19 12H5m0 0 7 7m-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ STEP 10: Analyzing ══ */}
          {step === 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="rounded-3xl overflow-hidden" style={glassPanel}>
                <ProgressBar step={9} />
                <div className="text-center pt-3 pb-1">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Analyzing...</span>
                </div>
                <div className="p-8 text-center" style={{ minHeight: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  {/* Spinner */}
                  <div className="relative w-14 h-14 mb-6">
                    <div
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{ border: "4px solid rgba(34,211,238,0.12)", borderTopColor: "#22d3ee" }}
                    />
                    <div className="absolute inset-2 rounded-full" style={{ background: "rgba(34,211,238,0.06)" }} />
                  </div>
                  <h2
                    className="text-sm font-bold tracking-widest text-fleet-cyan uppercase mb-2"
                    style={{ animation: "calcPulse 1.6s ease-in-out infinite" }}
                  >
                    Calculating Your Amount...
                  </h2>
                  <p className="text-slate-600 text-sm transition-all duration-300">{analysisMsg}</p>
                </div>
              </div>
              <style>{`@keyframes calcPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
            </motion.div>
          )}

          {/* ══ STEP 11: Results + Contact ══ */}
          {step === 11 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{ ...glassPanel, borderTop: "4px solid #22d3ee" }}
              >
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div
                      className="inline-block px-4 py-1 rounded-full text-[11px] font-black tracking-widest mb-4 uppercase"
                      style={{ background: "rgba(34,211,238,0.08)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.22)" }}
                    >
                      ✓ Analysis Complete
                    </div>
                    <h2 className="font-grotesk font-bold text-2xl sm:text-3xl text-white mb-1">
                      Your Take-Home Is Guaranteed.
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Based on your{" "}
                      <span className="text-slate-300 font-semibold">{formData.role}</span> profile
                    </p>
                  </div>

                  {/* Amount */}
                  <div
                    className="rounded-2xl p-6 mb-5 text-center"
                    style={{ background: "rgba(3,7,15,0.7)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div className="text-xs uppercase font-bold text-slate-600 tracking-widest mb-2">
                      Min. Guaranteed Weekly Take-Home
                    </div>
                    <div className="font-grotesk font-black text-5xl sm:text-6xl text-white mb-1">
                      <span ref={amountRef}>${amount.toLocaleString()}+</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-2">
                      {formData.type} · {formData.lane} · Home {formData.homeTime}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { val: formData.cdlAge + " yr", label: "Experience", color: "#22d3ee" },
                      { val: formData.lane, label: "Lane", color: "#818cf8" },
                      { val: formData.homeTime, label: "Home Time", color: "#34d399" },
                    ].map(({ val, label, color }) => (
                      <div key={label} className="rounded-xl p-3 text-center" style={{ background: "rgba(3,7,15,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <div className="font-black text-base" style={{ color }}>{val}</div>
                        <div className="text-slate-600 text-[10px] uppercase tracking-wide mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Contact form */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
                    <h3 className="font-bold text-slate-200 mb-1 text-center">Lock In This Amount</h3>
                    <p className="text-slate-500 text-xs text-center mb-4">Enter your info to confirm your guaranteed take-home</p>
                    <form onSubmit={(e) => { e.preventDefault(); submitLead(); }} className="space-y-3">
                      <InputField type="text" value={contact.name} onChange={(v) => { patchContact({ name: v }); setContactErrs((e) => ({ ...e, name: "" })); }} placeholder="Full Name" autoComplete="name" error={contactErrs.name} />
                      <InputField type="tel" value={contact.phone} onChange={(v) => { patchContact({ phone: v }); setContactErrs((e) => ({ ...e, phone: "" })); }} placeholder="Cell Number (e.g. 555-867-5309)" autoComplete="tel" error={contactErrs.phone} />
                      <InputField type="email" value={contact.email} onChange={(v) => { patchContact({ email: v }); setContactErrs((e) => ({ ...e, email: "" })); }} placeholder="hello@gmail.com" autoComplete="email" error={contactErrs.email} />
                      {submitErr && (
                        <div className="rounded-xl p-3 text-sm text-center" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171" }}>
                          {submitErr}
                        </div>
                      )}
                      <PrimaryBtn type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Submitting...
                          </span>
                        ) : "Lock In This Amount →"}
                      </PrimaryBtn>
                    </form>
                    <p className="text-slate-700 text-xs text-center mt-3">Your info is never sold or shared.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ STEP 12: Calendar ══ */}
          {step === 12 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-3xl overflow-hidden" style={glassPanel}>
                <div className="p-6 sm:p-8 pb-4 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(34,211,238,0.1)", border: "2px solid #22d3ee" }}
                  >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="font-grotesk font-bold text-xl sm:text-2xl text-fleet-cyan mb-1">You&apos;re Almost There!</h2>
                  <p className="text-slate-400 text-sm mb-1">
                    Hey <strong className="text-slate-200">{contact.name}</strong> — pick a time to finalize your{" "}
                    <strong className="text-white">${amount.toLocaleString()}+ guaranteed take-home</strong>{" "}
                    with a SuperTruck fleet manager.
                  </p>
                  <p className="text-slate-600 text-xs">Calls are free · No obligation · 20–30 min</p>
                </div>
                <div className="px-4 pb-6">
                  <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(34,211,238,0.15)" }}>
                    <iframe src={buildCalendarUrl(contact)} style={{ width: "100%", border: "none", display: "block", minHeight: 620 }} scrolling="no" />
                  </div>
                </div>
              </div>
              <div className="text-center mt-5">
                <button onClick={reset} className="text-slate-600 text-sm hover:text-slate-400 transition-colors underline underline-offset-2">
                  Start over
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
