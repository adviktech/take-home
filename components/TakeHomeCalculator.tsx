"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";

interface FormData {
  role: string; cdlAge: number; drivingRecord: string; type: string;
  regions: string[]; lane: string; homeTime: string; target: string; start: string;
}
interface ContactForm { name: string; phone: string; email: string; }

const REGIONS = ["Southeast", "Northeast", "Midwest", "West Coast", "Texas / South", "No Preference"];

const ANALYSIS_PHASES = [
  { label: "Matching your profile to open lanes", icon: "🔍" },
  { label: "Eliminating dispatcher markup", icon: "✂️" },
  { label: "Calculating your guaranteed floor", icon: "💰" },
  { label: "Locking in your take-home amount", icon: "🔒" },
];

const STEP_META = [
  { n: 1, label: "Your Role" },
  { n: 2, label: "Experience" },
  { n: 3, label: "Driving Record" },
  { n: 4, label: "Driving Style" },
  { n: 5, label: "Regions" },
  { n: 6, label: "Lane Type" },
  { n: 7, label: "Home Time" },
  { n: 8, label: "Target Pay" },
  { n: 9, label: "Start Date" },
];

function calcGuaranteed(f: FormData): number {
  const base = parseInt(f.target) || 2500;
  return base + (f.type === "Team" ? 400 : 250) + (f.lane === "OTR" ? 150 : f.lane === "Regional" ? 75 : 0);
}

function buildCalendarUrl(c: ContactForm): string {
  const parts = c.name.trim().split(" ");
  const p = new URLSearchParams({ first_name: parts[0] || "", last_name: parts.slice(1).join(" ") || "", email: c.email, phone: c.phone });
  return "https://api.leadconnectorhq.com/widget/booking/GKsrU2o9Jh4uSUrdFV1y?" + p.toString();
}

/** Auto-resizing iframe wrapper — listens for postMessage height events from GHL widget */
function CalendarEmbed({ src }: { src: string }) {
  const [height, setHeight] = useState(750);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      // GHL sends several possible formats; handle all of them
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        const h = data?.height ?? data?.iframeHeight ?? data?.scrollHeight ?? data?.pageHeight;
        if (typeof h === "number" && h > 200) {
          setHeight(h + 32); // +32px breathing room so content never clips
        }
      } catch {}
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      style={{ width: "100%", border: "none", display: "block", height, transition: "height 0.3s ease" }}
      allow="payment"
    />
  );
}

function getProfileItems(formData: FormData) {
  const items: Array<{ label: string; value: string; step: number }> = [];
  if (formData.role) items.push({ label: "Role", value: formData.role, step: 1 });
  if (formData.cdlAge > 0) items.push({ label: "Experience", value: `${formData.cdlAge}${formData.cdlAge >= 25 ? "+" : ""} yr CDL`, step: 2 });
  if (formData.drivingRecord) items.push({ label: "Record", value: formData.drivingRecord, step: 3 });
  if (formData.type) items.push({ label: "Style", value: formData.type, step: 4 });
  if (formData.regions.length) items.push({ label: "Regions", value: formData.regions.length === 1 ? formData.regions[0] : formData.regions.length + " selected", step: 5 });
  if (formData.lane) items.push({ label: "Lane", value: formData.lane, step: 6 });
  if (formData.homeTime) items.push({ label: "Home", value: formData.homeTime, step: 7 });
  if (formData.target) items.push({ label: "Target", value: "$" + parseInt(formData.target).toLocaleString() + "/wk", step: 8 });
  if (formData.start) items.push({ label: "Start", value: formData.start, step: 9 });
  return items;
}

async function animeCountUp(el: HTMLElement, to: number) {
  try {
    const anime = (await import("animejs")).default;
    const obj = { val: 0 };
    anime({ targets: obj, val: to, duration: 1600, easing: "easeOutExpo", update() { el.textContent = "$" + Math.round(obj.val).toLocaleString() + "+"; } });
  } catch { el.textContent = "$" + to.toLocaleString() + "+"; }
}

async function animeStagger(selector: string) {
  try {
    const anime = (await import("animejs")).default;
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    anime({ targets: selector, translateX: [-12, 0], opacity: [0, 1], delay: (anime as any).stagger(55), duration: 340, easing: "easeOutQuart" });
  } catch {}
}

async function animeSelectPulse(el: HTMLElement) {
  try {
    const anime = (await import("animejs")).default;
    anime({ targets: el, scale: [1, 0.97, 1.02, 1], duration: 320, easing: "easeOutElastic(1, .8)" });
  } catch {}
}

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.16 } },
};

// ── Sub-components ──────────────────────────────────────────

function StepNav({ step, go }: { step: number; go: (n: number) => void }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
      <div className="font-outfit text-xs uppercase tracking-widest font-bold mb-4" style={{ color: "var(--text-faint)" }}>Your Journey</div>
      <div className="space-y-1">
        {STEP_META.map(({ n, label }) => {
          const done = step > n;
          const active = step === n;
          return (
            <button key={n} onClick={() => { if (n <= step) go(n); }} disabled={n > step}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 text-left"
              style={{
                background: active ? "var(--accent-light)" : "transparent",
                cursor: n > step ? "default" : "pointer",
              }}>
              <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-montserrat font-black transition-all duration-300"
                style={{
                  background: done ? "var(--accent)" : active ? "var(--accent)" : "var(--bg-alt)",
                  color: done || active ? "var(--bg)" : "var(--text-faint)",
                  boxShadow: active ? "0 0 0 3px var(--accent-light)" : "none",
                }}>
                {done ? (
                  <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : n}
              </div>
              <span className="font-outfit text-xs font-medium leading-none"
                style={{ color: active ? "var(--accent)" : done ? "var(--text-muted)" : "var(--text-faint)" }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProfilePreview({ formData, step }: { formData: FormData; step: number }) {
  const items = getProfileItems(formData);
  const filledSteps = items.length;
  const estAmount = filledSteps >= 4 ? calcGuaranteed(formData) : null;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
      <div className="px-4 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="font-outfit text-xs uppercase tracking-widest font-bold" style={{ color: "var(--text-faint)" }}>Your Profile</div>
        <div className="mt-1">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
            <motion.div className="h-full rounded-full" animate={{ width: `${(filledSteps / 9) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }} style={{ background: "var(--accent)" }} />
          </div>
          <div className="font-outfit text-xs mt-1" style={{ color: "var(--text-muted)" }}>{filledSteps} of 9 complete</div>
        </div>
      </div>

      <div className="p-4 space-y-2" style={{ minHeight: 200 }}>
        {items.length === 0 && (
          <div className="py-8 text-center">
            <div className="font-outfit text-sm" style={{ color: "var(--text-faint)" }}>Your profile builds<br/>as you answer</div>
          </div>
        )}
        <AnimatePresence>
          {items.map((item) => (
            <motion.div key={item.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between py-2 px-3 rounded-xl"
              style={{ background: "var(--bg-alt)", border: item.step === step - 1 ? "1px solid var(--accent)" : "1px solid transparent" }}>
              <span className="font-outfit text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</span>
              <span className="font-montserrat font-bold text-xs" style={{ color: "var(--text)" }}>{item.value}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {estAmount && (
        <div className="px-4 pb-4">
          <div className="rounded-xl p-3" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
            <div className="font-outfit text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "var(--accent)" }}>Est. Guaranteed Floor</div>
            <div className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>${estAmount.toLocaleString()}+/wk</div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileProgressBar({ step }: { step: number }) {
  return (
    <div className="px-5 pt-5 pb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="font-outfit text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Step {step} of 9</span>
        <span className="font-outfit text-xs" style={{ color: "var(--accent)", fontWeight: 700 }}>{Math.round((step / 9) * 100)}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
        <motion.div className="h-full rounded-full" animate={{ width: `${(step / 9) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }} style={{ background: "var(--accent)" }} />
      </div>
    </div>
  );
}

function OptionButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button ref={ref}
      onClick={() => { if (ref.current) animeSelectPulse(ref.current); onClick(); }}
      className="w-full text-left rounded-2xl transition-all duration-200"
      style={{ background: "var(--bg-alt)", border: "1px solid var(--border-card)" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-card)"; el.style.transform = "translateY(0)"; }}>
      {children}
    </button>
  );
}

function PrimaryBtn({ onClick, disabled, type = "button", children }: { onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; children: React.ReactNode }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className="w-full py-4 rounded-xl font-montserrat font-black text-base transition-all duration-200"
      style={{ background: disabled ? "var(--border)" : "var(--accent)", color: disabled ? "var(--text-muted)" : "var(--bg)", cursor: disabled ? "not-allowed" : "pointer" }}>
      {children}
    </button>
  );
}

function InputField({ type, value, onChange, placeholder, autoComplete, error }: {
  type: string; value: string; onChange: (v: string) => void; placeholder: string; autoComplete?: string; error?: string;
}) {
  return (
    <div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete}
        className="w-full p-4 rounded-2xl text-base outline-none transition-all duration-200 font-outfit"
        style={{ background: "var(--bg-alt)", border: error ? "1px solid #ef4444" : "1px solid var(--border-card)", color: "var(--text)" }}
        onFocus={e => { if (!error) (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = error ? "#ef4444" : "var(--border-card)"; }} />
      {error && <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>}
    </div>
  );
}

// ── Right-panel context components ──────────────────────────

/** Step 0 — shows how FourFleet's model produces more driver earnings */
function GuaranteeArchPanel() {
  return (
    <div className="space-y-4">
      {/* Old-world flow */}
      <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
        <div className="font-outfit text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-faint)" }}>
          Traditional Trucking Model
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-lg px-3 py-2 font-montserrat font-black text-sm" style={{ background: "var(--bg-alt)", color: "var(--text)" }}>$5,000 gross</div>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: "var(--text-faint)", flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="flex-1 space-y-1.5">
            {[
              { label: "Broker cut", val: "−15%" },
              { label: "Dispatcher markup", val: "−20%" },
              { label: "Compliance/fees", val: "−5%" },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between items-center px-2.5 py-1 rounded-lg text-xs"
                style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <span className="font-outfit" style={{ color: "var(--text-muted)" }}>{label}</span>
                <span className="font-montserrat font-black" style={{ color: "#ef4444" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-xl"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <span className="font-outfit text-xs" style={{ color: "var(--text-muted)" }}>Driver takes home</span>
          <span className="font-montserrat font-black" style={{ color: "#ef4444" }}>~$3,000</span>
        </div>
      </div>

      {/* FourFleet flow */}
      <div className="rounded-2xl p-5" style={{ background: "var(--bg)", border: "1px solid var(--accent)" }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-outfit text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>FourFleet Model</span>
          <span className="px-2 py-0.5 rounded-full font-outfit text-[9px] font-bold uppercase" style={{ background: "var(--accent)", color: "var(--bg)" }}>Guaranteed</span>
        </div>
        <div className="space-y-1.5 mb-3">
          {[
            { label: "Direct carrier access", val: "$0 broker" },
            { label: "No dispatcher markup", val: "$0 cut" },
            { label: "Compliance included", val: "$0 fees" },
          ].map(({ label, val }) => (
            <div key={label} className="flex justify-between items-center px-2.5 py-1 rounded-lg text-xs"
              style={{ background: "var(--bg-card)" }}>
              <span className="flex items-center gap-1.5 font-outfit" style={{ color: "var(--text-muted)" }}>
                <svg width="10" height="10" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {label}
              </span>
              <span className="font-montserrat font-black" style={{ color: "var(--accent)" }}>{val}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--accent)" }}>
          <span className="font-outfit text-xs" style={{ color: "var(--text-muted)" }}>Your guaranteed floor</span>
          <span className="font-montserrat font-black text-lg" style={{ color: "var(--accent)" }}>$3,400+/wk</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: "🛡️", label: "Contract-Backed", sub: "Written guarantee" },
          { icon: "🚫", label: "No Forced Dispatch", sub: "You approve loads" },
          { icon: "📋", label: "FMCSA Compliant", sub: "Fully registered" },
          { icon: "🔒", label: "No Hidden Fees", sub: "Ever" },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="rounded-xl p-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
            <div className="text-lg mb-1">{icon}</div>
            <div className="font-montserrat font-bold text-xs" style={{ color: "var(--text)" }}>{label}</div>
            <div className="font-outfit text-[10px]" style={{ color: "var(--text-faint)" }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Step 11 — Guarantee protections + privacy pledge */
function GuaranteeProtectionsPanel() {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
        <div className="px-5 py-4" style={{ background: "var(--accent)", }}>
          <div className="font-montserrat font-black text-white text-sm">What Your Guarantee Includes</div>
          <div className="font-outfit text-xs text-white opacity-75 mt-0.5">Contractual protections in your offer letter</div>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {[
            { icon: "📄", title: "Contractually Backed", desc: "Your floor is written into your offer — not a verbal promise." },
            { icon: "🚫", title: "No Forced Dispatch", desc: "You review and approve every single load before accepting." },
            { icon: "🔄", title: "Bi-Weekly Floor Review", desc: "Your floor is adjusted to live market rates every two weeks." },
            { icon: "📊", title: "Full Earnings Transparency", desc: "See every line item: gross, deductions, your net." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3 px-5 py-4">
              <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
              <div>
                <div className="font-montserrat font-bold text-sm" style={{ color: "var(--text)" }}>{title}</div>
                <div className="font-outfit text-xs leading-relaxed mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy pledge */}
      <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🔒</span>
          <div className="font-montserrat font-black text-sm" style={{ color: "var(--text)" }}>Privacy & Direct-Line Pledge</div>
        </div>
        <ul className="space-y-2">
          {[
            "One call from one dedicated manager — not a recruiter farm.",
            "Your info is never sold, never shared, never spammed.",
            "Unsubscribe at any time with a single reply.",
          ].map(item => (
            <li key={item} className="flex gap-2 text-xs font-outfit" style={{ color: "var(--text-muted)" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" className="flex-shrink-0 mt-0.5"><path d="M2 7l3.5 3.5L12 3" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Step 12 — Pre-call checklist + call agenda */
function PreCallPanel({ amount }: { amount: number }) {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="font-montserrat font-black text-sm" style={{ color: "var(--text)" }}>Prepare for Your Call</div>
          <div className="font-outfit text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Have these ready — takes 2 min to gather</div>
        </div>
        <div className="p-4 space-y-2">
          {[
            "Current pay stub or last 2 weeks' settlement",
            "CDL number + expiration date",
            "Medical card number",
            "Preferred start window",
            "Equipment details (if Owner Operator)",
          ].map((item, i) => (
            <div key={item} className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
              <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
                <span className="font-montserrat font-black text-[10px]" style={{ color: "var(--accent)" }}>{i + 1}</span>
              </div>
              <span className="font-outfit text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call agenda */}
      <div className="rounded-2xl p-5" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
        <div className="font-montserrat font-black text-sm mb-3" style={{ color: "var(--accent)" }}>On the Call You&apos;ll Cover</div>
        <ul className="space-y-2 mb-4">
          {[
            `Confirm your $${amount.toLocaleString()}+ floor`,
            "Lane matching & load preferences",
            "Equipment fit & onboarding timeline",
            "First-week dispatch logistics",
          ].map(item => (
            <li key={item} className="flex gap-2 text-xs font-outfit" style={{ color: "var(--text)" }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12" className="flex-shrink-0 mt-0.5"><path d="M2 6l3 3 5-5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid var(--accent)" }}>
          <div className="text-center">
            <div className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>20–30</div>
            <div className="font-outfit text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>minutes</div>
          </div>
          <div className="w-px h-8" style={{ background: "var(--accent)", opacity: 0.3 }} />
          <div className="text-center">
            <div className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>1</div>
            <div className="font-outfit text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>manager</div>
          </div>
          <div className="w-px h-8" style={{ background: "var(--accent)", opacity: 0.3 }} />
          <div className="text-center">
            <div className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>$0</div>
            <div className="font-outfit text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>obligation</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────

export default function TakeHomeCalculator() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ role: "", cdlAge: 3, drivingRecord: "", type: "", regions: [], lane: "", homeTime: "", target: "", start: "" });
  const [contact, setContact] = useState<ContactForm>({ name: "", phone: "", email: "" });
  const [targetErr, setTargetErr] = useState("");
  const [contactErrs, setContactErrs] = useState({ name: "", phone: "", email: "" });
  const [analysisPhase, setAnalysisPhase] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [confettiActive, setConfettiActive] = useState(false);
  const amountRef = useRef<HTMLSpanElement>(null);

  function go(n: number) { setStep(n); }
  function patch(p: Partial<FormData>) { setFormData(prev => ({ ...prev, ...p })); }
  function patchContact(p: Partial<ContactForm>) { setContact(prev => ({ ...prev, ...p })); }

  useEffect(() => { if (step >= 1 && step <= 9) setTimeout(() => animeStagger(".calc-opt"), 80); }, [step]);
  useEffect(() => {
    if (step === 11 && amountRef.current) {
      animeCountUp(amountRef.current, calcGuaranteed(formData));
      setConfettiActive(true);
    }
  }, [step]); // eslint-disable-line

  function runAnalysis(start: string) {
    patch({ start }); go(10);
    setAnalysisPhase(0);
    setTimeout(() => setAnalysisPhase(1), 580);
    setTimeout(() => setAnalysisPhase(2), 1160);
    setTimeout(() => setAnalysisPhase(3), 1740);
    setTimeout(() => go(11), 2400);
  }

  function validateTarget() {
    const val = parseInt(formData.target);
    if (!formData.target || isNaN(val)) { setTargetErr("Please enter a weekly amount."); return; }
    if (val < 500) { setTargetErr("Minimum is $500/week."); return; }
    if (val > 99999) { setTargetErr("Please enter a realistic amount."); return; }
    setTargetErr(""); go(9);
  }

  function validateContact(): boolean {
    const e = { name: "", phone: "", email: "" }; let ok = true;
    if (contact.name.trim().length < 2) { e.name = "Please enter your full name."; ok = false; }
    if (contact.phone.replace(/\D/g, "").length < 10) { e.phone = "Valid 10-digit number required."; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) { e.email = "Valid email required."; ok = false; }
    setContactErrs(e); return ok;
  }

  async function submitLead() {
    if (!validateContact()) return;
    setIsSubmitting(true); setSubmitErr("");
    try {
      const nameParts = contact.name.split(" ");
      await fetch("https://services.leadconnectorhq.com/hooks/pMKtOmnlpKKlzeCR8Sqe/webhook-trigger/KYm9IflHHhJ8YwoNkXiQ", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0], lastName: nameParts.slice(1).join(" "),
          phone: contact.phone, email: contact.email,
          customField: { role: formData.role, cdlExperience: formData.cdlAge + " years", drivingRecord: formData.drivingRecord, drivingType: formData.type, regions: formData.regions.join(", "), lane: formData.lane, homeTime: formData.homeTime, targetTakeHome: "$" + formData.target, startDate: formData.start, guaranteedAmount: "$" + calcGuaranteed(formData).toLocaleString(), source: "FourFleet Landing Page" },
          tags: ["takehome-landing", formData.role.toLowerCase().replace(/\s+/g, "-"), formData.start.toLowerCase().replace(/\s+/g, "-")],
        }),
      });
      go(12);
    } catch { go(12); } finally { setIsSubmitting(false); }
  }

  function reset() {
    setStep(0);
    setFormData({ role: "", cdlAge: 3, drivingRecord: "", type: "", regions: [], lane: "", homeTime: "", target: "", start: "" });
    setContact({ name: "", phone: "", email: "" });
    setTargetErr(""); setContactErrs({ name: "", phone: "", email: "" }); setSubmitErr(""); setIsSubmitting(false);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }

  const amount = calcGuaranteed(formData);

  function renderStep() {
    switch (step) {
      case 1: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 1 · Your Role</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>What&apos;s your current setup?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>Choose the option that fits you best</p>
          </div>
          <div className="space-y-3">
            {[
              { role: "Company Driver", sub: '"I want a steady, guaranteed check."', d: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3 21c0-4.418 4.03-8 9-8s9 3.582 9 8" },
              { role: "Lease Purchase", sub: '"I want truck ownership + high take-home."', d: "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
              { role: "Owner Operator", sub: '"I have a tractor; I need a fair authority."', d: "M3 17h2l1.5-5h11L19 17h2M5 17l-1-3h16l-1 3M7 17v2m10-2v2" },
            ].map(({ role, sub, d }) => (
              <OptionButton key={role} onClick={() => { patch({ role }); go(2); }}>
                <div className="calc-opt flex items-center gap-3 p-4 sm:p-5">
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d={d} stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="font-montserrat font-bold" style={{ color: "var(--text)" }}>{role}</div>
                    <div className="text-xs font-outfit mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</div>
                  </div>
                </div>
              </OptionButton>
            ))}
          </div>
        </div>
      );

      case 2: return (
        <div className="text-center">
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 2 · Experience</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>Years of CDL Experience?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>Drag the slider to set your experience</p>
          </div>
          <div className="font-montserrat font-black tabular-nums mb-4" style={{ fontSize: "5rem", color: "var(--accent)", lineHeight: 1 }}>
            {formData.cdlAge}{formData.cdlAge >= 25 ? "+" : ""}<span className="text-4xl"> yr</span>
          </div>
          <input type="range" min={1} max={25} value={formData.cdlAge} onChange={e => patch({ cdlAge: parseInt(e.target.value) })} className="w-full mb-2" style={{ accentColor: "var(--accent)" }} />
          <div className="flex justify-between text-xs font-outfit mb-7 px-1" style={{ color: "var(--text-faint)" }}>
            <span>1 yr</span><span>25+ yr</span>
          </div>
          <PrimaryBtn onClick={() => go(3)}>Continue →</PrimaryBtn>
        </div>
      );

      case 3: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 3 · Driving Record</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>How&apos;s your driving record?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>Be honest — we match you to the right carriers</p>
          </div>
          <div className="space-y-3">
            {[{ val: "Excellent", emoji: "⭐", sub: "No violations or accidents" }, { val: "Good", emoji: "👍", sub: "Minor issues, nothing major" }, { val: "Ok", emoji: "🔄", sub: "Some violations or accidents" }].map(({ val, emoji, sub }) => (
              <OptionButton key={val} onClick={() => { patch({ drivingRecord: val }); go(4); }}>
                <div className="calc-opt flex items-center gap-4 p-4 sm:p-5">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <div className="font-montserrat font-bold" style={{ color: "var(--text)" }}>{val}</div>
                    <div className="text-xs font-outfit" style={{ color: "var(--text-muted)" }}>{sub}</div>
                  </div>
                </div>
              </OptionButton>
            ))}
          </div>
        </div>
      );

      case 4: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 4 · Driving Style</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>Driving Style?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>How do you prefer to run?</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ val: "Solo", emoji: "🚛", desc: "Independent run" }, { val: "Team", emoji: "👥", desc: "More miles, more pay" }].map(({ val, emoji, desc }) => (
              <button key={val} onClick={() => { patch({ type: val }); go(5); }}
                className="calc-opt py-10 rounded-2xl font-montserrat font-black text-lg uppercase tracking-widest text-center transition-all duration-200"
                style={{ background: "var(--bg-alt)", border: "1px solid var(--border-card)", color: "var(--text)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-card)"; el.style.transform = "translateY(0)"; }}>
                <div className="text-4xl mb-3">{emoji}</div>
                {val}
                <div className="text-xs font-outfit mt-1 normal-case" style={{ color: "var(--text-muted)", fontWeight: 400 }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      );

      case 5: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 5 · Regions</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>Preferred Regions?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>Select all that apply</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {REGIONS.map(r => {
              const sel = formData.regions.includes(r);
              return (
                <button key={r} onClick={() => patch({ regions: sel ? formData.regions.filter(x => x !== r) : [...formData.regions, r] })}
                  className="calc-opt py-3 px-4 rounded-xl text-sm font-montserrat font-semibold text-center transition-all duration-200"
                  style={{ border: sel ? "1px solid var(--accent)" : "1px solid var(--border-card)", background: sel ? "var(--accent-light)" : "var(--bg-alt)", color: sel ? "var(--accent)" : "var(--text-muted)" }}>
                  {r}
                </button>
              );
            })}
          </div>
          <PrimaryBtn onClick={() => go(6)} disabled={formData.regions.length === 0}>Lock In Regions →</PrimaryBtn>
        </div>
      );

      case 6: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 6 · Lane Type</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>Desired Lane?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>Pick your preferred run type</p>
          </div>
          <div className="space-y-3">
            {[{ id: "Local", desc: "Home every day, city routes", earn: "+$0" }, { id: "Regional", desc: "Out 1–3 days, familiar territory", earn: "+$75/wk" }, { id: "OTR", desc: "Cross-country, max miles & pay", earn: "+$150/wk" }].map(({ id, desc, earn }) => (
              <OptionButton key={id} onClick={() => { patch({ lane: id }); go(7); }}>
                <div className="calc-opt flex justify-between items-center p-4 sm:p-5">
                  <div>
                    <span className="font-montserrat font-bold block" style={{ color: "var(--text)" }}>{id}</span>
                    <span className="text-xs font-outfit" style={{ color: "var(--text-muted)" }}>{desc}</span>
                  </div>
                  <span className="font-montserrat font-black text-sm" style={{ color: "var(--accent)" }}>{earn}</span>
                </div>
              </OptionButton>
            ))}
          </div>
        </div>
      );

      case 7: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 7 · Home Time</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>Home Frequency?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>How often do you need to be home?</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Daily", "Weekly", "Bi-Weekly", "Monthly"].map(h => (
              <button key={h} onClick={() => { patch({ homeTime: h }); go(8); }}
                className="calc-opt py-6 rounded-xl font-montserrat font-bold text-center transition-all duration-200"
                style={{ background: "var(--bg-alt)", border: "1px solid var(--border-card)", color: "var(--text)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.background = "var(--accent-light)"; el.style.color = "var(--accent)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-card)"; el.style.background = "var(--bg-alt)"; el.style.color = "var(--text)"; }}>
                {h}
              </button>
            ))}
          </div>
        </div>
      );

      case 8: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 8 · Target Pay</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>Target Take-Home?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>Minimum weekly amount you need in your bank</p>
          </div>
          <div className="relative max-w-xs mx-auto mb-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black pointer-events-none select-none font-montserrat" style={{ color: "var(--text-muted)" }}>$</span>
            <input type="number" value={formData.target} onChange={e => { patch({ target: e.target.value }); setTargetErr(""); }} placeholder="2500" min={500} max={99999}
              className="w-full p-5 pl-10 text-2xl font-black text-center rounded-2xl outline-none transition-all duration-200 font-montserrat"
              style={{ background: "var(--bg-alt)", border: targetErr ? "1px solid #ef4444" : "1px solid var(--border-card)", color: "var(--text)" }}
              onFocus={e => { if (!targetErr) (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
              onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = targetErr ? "#ef4444" : "var(--border-card)"; }} />
          </div>
          {targetErr && <p className="text-red-500 text-xs text-center mb-2">{targetErr}</p>}
          <div className="flex gap-2 justify-center mb-5">
            {[1500, 2000, 2500, 3000].map(v => (
              <button key={v} onClick={() => { patch({ target: String(v) }); setTargetErr(""); }}
                className="px-3 py-1.5 rounded-lg text-xs font-montserrat font-bold transition-all duration-150"
                style={{ border: formData.target === String(v) ? "1px solid var(--accent)" : "1px solid var(--border)", color: formData.target === String(v) ? "var(--accent)" : "var(--text-muted)", background: formData.target === String(v) ? "var(--accent-light)" : "transparent" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
                onMouseLeave={e => { if (formData.target !== String(v)) { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-muted)"; } }}>
                ${v.toLocaleString()}
              </button>
            ))}
          </div>
          <PrimaryBtn onClick={validateTarget}>Continue →</PrimaryBtn>
        </div>
      );

      case 9: return (
        <div>
          <div className="mb-5">
            <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Step 9 · Start Date</div>
            <h2 className="font-montserrat font-black text-xl sm:text-2xl" style={{ color: "var(--text)" }}>When can you start?</h2>
            <p className="font-outfit text-sm mt-1" style={{ color: "var(--text-muted)" }}>Be honest — we&apos;ll match the right opportunity</p>
          </div>
          <div className="space-y-3">
            {[{ id: "Immediately", desc: "Ready to roll now", icon: "⚡" }, { id: "In 2 Weeks", desc: "Wrapping things up", icon: "📅" }, { id: "Just Browsing", desc: "Exploring options", icon: "👀" }].map(({ id, desc, icon }) => (
              <OptionButton key={id} onClick={() => runAnalysis(id)}>
                <div className="calc-opt flex items-center gap-4 p-4 sm:p-5">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-montserrat font-bold" style={{ color: "var(--text)" }}>{id}</div>
                    <div className="text-xs font-outfit" style={{ color: "var(--text-muted)" }}>{desc}</div>
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

  return (
    <section id="calculator" className="py-24" style={{ background: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="section-label">Everything You Need</p>
          <h2 className="font-montserrat font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}>
            Calculate Your <span style={{ color: "var(--accent)" }}>Guaranteed</span><br/>Take-Home
          </h2>
          <p className="font-outfit text-lg mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Answer 9 quick questions. We calculate your guaranteed weekly take-home floor — no BS, no hidden fees, no dispatcher games.
          </p>
        </motion.div>

        {/* Step 0: Intro — two column on desktop */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div> {/* left card wrapper */}
            <div className="rounded-3xl p-8 sm:p-10 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-outfit text-xs font-bold uppercase tracking-widest"
                style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent)" }}>
                Guaranteed Take-Home Program
              </div>
              <h3 className="font-montserrat font-black text-3xl sm:text-4xl mb-3 leading-tight" style={{ color: "var(--text)" }}>
                Stop Fueling Their Profit.
                <span className="block mt-1" style={{ color: "var(--accent)" }}>Earn Yours.</span>
              </h3>
              <p className="font-outfit text-base mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Tired of the house taking the lion&apos;s share? We guarantee a <span className="font-semibold" style={{ color: "var(--text)" }}>Take-Home Floor</span>.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[{ val: "12k+", label: "Drivers" }, { val: "48", label: "States" }, { val: "100%", label: "Guaranteed" }].map(({ val, label }) => (
                  <div key={label} className="rounded-2xl p-4 text-center" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
                    <div className="font-montserrat font-black text-xl" style={{ color: "var(--accent)" }}>{val}</div>
                    <div className="font-outfit text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-faint)" }}>{label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => go(1)} className="w-full py-5 rounded-2xl font-montserrat font-black text-lg uppercase tracking-wider transition-all duration-200"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                Calculate My Take-Home →
              </button>
              <p className="font-outfit text-xs mt-3" style={{ color: "var(--text-faint)" }}>Takes less than 2 minutes · No commitment required</p>
            </div>
            </div> {/* end left card wrapper */}
            <GuaranteeArchPanel />
            </div> {/* end grid */}
          </motion.div>
        )}

        {/* Steps 1-9: 3-column layout */}
        {step >= 1 && step <= 9 && (
          <div className="grid lg:grid-cols-[200px_1fr_280px] gap-6 items-start">

            {/* Left: Step navigator (desktop only) */}
            <div className="hidden lg:block sticky top-24">
              <StepNav step={step} go={go} />
            </div>

            {/* Center: Step card */}
            <div>
              <div className="rounded-3xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
                {/* Mobile progress bar */}
                <div className="lg:hidden">
                  <MobileProgressBar step={step} />
                </div>

                {/* Desktop step indicator */}
                <div className="hidden lg:flex items-center gap-3 px-8 pt-6 pb-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-montserrat font-black text-sm"
                    style={{ background: "var(--accent)", color: "var(--bg)" }}>
                    {step}
                  </div>
                  <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                  <span className="font-outfit text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>of 9</span>
                </div>

                <div className="px-6 sm:px-8 py-6" style={{ minHeight: 280 }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={step} variants={stepVariants} initial="enter" animate="center" exit="exit">
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {step > 1 && (
                  <div className="px-6 sm:px-8 pb-5 pt-0">
                    <button onClick={() => go(step - 1)}
                      className="font-outfit text-sm font-medium transition-colors flex items-center gap-1"
                      style={{ color: "var(--text-faint)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M19 12H5m0 0 7 7m-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Profile preview (desktop only) */}
            <div className="hidden lg:block sticky top-24">
              <ProfilePreview formData={formData} step={step} />
            </div>
          </div>
        )}

        {/* Step 10: Analyzing */}
        {step === 10 && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
            className="max-w-lg">
            <div className="rounded-3xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              {/* Progress bar — full */}
              <div className="h-1" style={{ background: "var(--accent)" }} />

              <div className="p-8 sm:p-10">
                <div className="text-center mb-8">
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full animate-spin"
                      style={{ border: "3px solid var(--border)", borderTopColor: "var(--accent)" }} />
                    <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ background: "var(--accent-light)" }}>
                      <span className="font-montserrat font-black text-sm" style={{ color: "var(--accent)" }}>FF</span>
                    </div>
                  </div>
                  <h2 className="font-montserrat font-black text-xl mb-1" style={{ color: "var(--text)" }}>Calculating Your Amount...</h2>
                  <p className="font-outfit text-sm" style={{ color: "var(--text-muted)" }}>Our system is building your guaranteed take-home floor</p>
                </div>

                {/* Phase checklist */}
                <div className="space-y-3">
                  {ANALYSIS_PHASES.map((phase, i) => {
                    const done = analysisPhase > i;
                    const active = analysisPhase === i;
                    return (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: i <= analysisPhase ? 1 : 0.3, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: done ? "var(--accent-light)" : active ? "var(--bg-alt)" : "transparent", border: done ? "1px solid var(--accent)" : active ? "1px solid var(--border)" : "1px solid transparent" }}>
                        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm"
                          style={{ background: done ? "var(--accent)" : active ? "var(--bg-card)" : "var(--bg-alt)" }}>
                          {done ? (
                            <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : active ? (
                            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                          ) : (
                            <span className="font-montserrat font-black text-xs" style={{ color: "var(--text-faint)" }}>{i + 1}</span>
                          )}
                        </div>
                        <span className="font-outfit text-sm font-medium" style={{ color: done ? "var(--accent)" : active ? "var(--text)" : "var(--text-faint)" }}>
                          {phase.icon} {phase.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 11: Results + Contact */}
        {step === 11 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-6 items-start">
            <div className="relative"> {/* left results wrapper */}
            <Confetti active={confettiActive} />
            {/* Colored top bar — separate so overflow-hidden on card isn't needed */}
            <div className="rounded-t-3xl h-1" style={{ background: "var(--accent)" }} />
            <div className="rounded-b-3xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderTop: "none" }}>
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-1 rounded-full font-outfit text-xs font-black tracking-widest mb-4 uppercase"
                    style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent)" }}>
                    ✓ Analysis Complete
                  </div>
                  <h2 className="font-montserrat font-black text-2xl sm:text-3xl mb-1" style={{ color: "var(--text)" }}>Your Take-Home Is Guaranteed.</h2>
                  <p className="font-outfit text-sm" style={{ color: "var(--text-muted)" }}>
                    Based on your <span className="font-semibold" style={{ color: "var(--text)" }}>{formData.role}</span> profile
                  </p>
                </div>

                {/* Big number */}
                <div className="rounded-2xl p-6 mb-5 text-center" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
                  <div className="font-outfit text-xs uppercase font-bold tracking-widest mb-2" style={{ color: "var(--text-faint)" }}>Min. Guaranteed Weekly Take-Home</div>
                  <div className="font-montserrat font-black text-5xl sm:text-6xl mb-1" style={{ color: "var(--accent)" }}>
                    <span ref={amountRef}>${amount.toLocaleString()}+</span>
                  </div>
                  <div className="font-outfit text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                    {formData.type} · {formData.lane} · Home {formData.homeTime}
                  </div>
                </div>

                {/* Summary chips */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[{ val: formData.cdlAge + " yr", label: "Experience" }, { val: formData.lane, label: "Lane" }, { val: formData.homeTime, label: "Home Time" }].map(({ val, label }) => (
                    <div key={label} className="rounded-xl p-3 text-center" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
                      <div className="font-montserrat font-black text-base" style={{ color: "var(--text)" }}>{val}</div>
                      <div className="font-outfit text-xs uppercase tracking-wide mt-0.5" style={{ color: "var(--text-faint)" }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Contact form */}
                <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
                  <h3 className="font-montserrat font-black mb-1 text-center" style={{ color: "var(--text)" }}>Lock In This Amount</h3>
                  <p className="font-outfit text-xs text-center mb-4" style={{ color: "var(--text-muted)" }}>Enter your info to confirm your guaranteed take-home</p>
                  <form onSubmit={e => { e.preventDefault(); submitLead(); }} className="space-y-3">
                    <InputField type="text" value={contact.name} onChange={v => { patchContact({ name: v }); setContactErrs(e => ({ ...e, name: "" })); }} placeholder="Full Name" autoComplete="name" error={contactErrs.name} />
                    <InputField type="tel" value={contact.phone} onChange={v => { patchContact({ phone: v }); setContactErrs(e => ({ ...e, phone: "" })); }} placeholder="Cell Number (e.g. 555-867-5309)" autoComplete="tel" error={contactErrs.phone} />
                    <InputField type="email" value={contact.email} onChange={v => { patchContact({ email: v }); setContactErrs(e => ({ ...e, email: "" })); }} placeholder="hello@gmail.com" autoComplete="email" error={contactErrs.email} />
                    {submitErr && <div className="rounded-xl p-3 text-sm text-center" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444" }}>{submitErr}</div>}
                    {/* Submit button — rendered outside card overflow so it's never clipped */}
                    <div className="pt-1">
                      <button type="submit" disabled={isSubmitting}
                        className="w-full py-5 rounded-2xl font-montserrat font-black text-lg uppercase tracking-wide transition-all duration-200"
                        style={{
                          background: isSubmitting ? "var(--border)" : "var(--accent)",
                          color: isSubmitting ? "var(--text-muted)" : "var(--bg)",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          display: "block",
                          boxShadow: isSubmitting ? "none" : "0 8px 32px rgba(0,0,0,0.22)",
                        }}>
                        {isSubmitting
                          ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Submitting...</span>
                          : "Lock In This Amount →"}
                      </button>
                    </div>
                  </form>
                  <p className="font-outfit text-xs text-center mt-3" style={{ color: "var(--text-faint)" }}>Your info is never sold or shared.</p>
                </div>
              </div>
            </div>
            </div> {/* end left results wrapper */}
            <GuaranteeProtectionsPanel />
            </div> {/* end grid */}
          </motion.div>
        )}

        {/* Step 12: Calendar */}
        {step === 12 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="w-full">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-6 items-start">
            <div> {/* left calendar wrapper */}
            <div className="rounded-3xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
              <div className="p-6 sm:p-8 pb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "var(--accent-light)", border: "2px solid var(--accent)" }}>
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <h2 className="font-montserrat font-black text-lg sm:text-xl leading-tight" style={{ color: "var(--accent)" }}>You&apos;re Almost There!</h2>
                      <p className="font-outfit text-xs" style={{ color: "var(--text-faint)" }}>Calls are free · No obligation · 20–30 min</p>
                    </div>
                  </div>
                  <button onClick={reset}
                    className="flex-shrink-0 font-outfit text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{ color: "var(--text-faint)", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-muted)"; el.style.borderColor = "var(--text-muted)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-faint)"; el.style.borderColor = "var(--border)"; }}>
                    ↺ Start over
                  </button>
                </div>
                <p className="font-outfit text-sm" style={{ color: "var(--text-muted)" }}>
                  Hey <strong style={{ color: "var(--text)" }}>{contact.name}</strong> — pick a time to finalize your{" "}
                  <strong style={{ color: "var(--text)" }}>${amount.toLocaleString()}+ guaranteed take-home</strong>{" "}with a SuperTruck fleet manager.
                </p>
              </div>
              <div className="px-4 pb-6">
                <div className="rounded-2xl" style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
                  <CalendarEmbed src={buildCalendarUrl(contact)} />
                </div>
              </div>
            </div>
            </div> {/* end left calendar wrapper */}
            <PreCallPanel amount={amount} />
            </div> {/* end grid */}
          </motion.div>
        )}

      </div>
    </section>
  );
}
