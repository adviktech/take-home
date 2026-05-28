"use client";
import { createContext, useContext, useEffect, useState } from "react";

export interface PaletteVars {
  "--bg": string;
  "--bg-alt": string;
  "--bg-card": string;
  "--text": string;
  "--text-muted": string;
  "--text-faint": string;
  "--accent": string;
  "--accent-light": string;
  "--border": string;
  "--border-card": string;
  "--nav-bg": string;
  "--shadow": string;
}

export interface Palette {
  id: string;
  name: string;
  description: string;
  dark: boolean;
  vars: PaletteVars;
}

export const PALETTES: Palette[] = [
  {
    id: "amber-road",
    name: "Amber Road",
    description: "Warm earthy light",
    dark: false,
    vars: {
      "--bg": "#F7F3ED", "--bg-alt": "#EDE9E1", "--bg-card": "#FFFFFF",
      "--text": "#0D0F1A", "--text-muted": "#6B6D7A", "--text-faint": "#A0A2AC",
      "--accent": "#D97706", "--accent-light": "#FEF3C7",
      "--border": "#DDD8CF", "--border-card": "#E8E3DB",
      "--nav-bg": "rgba(247,243,237,0.92)", "--shadow": "0 4px 32px rgba(13,15,26,0.08)",
    },
  },
  {
    id: "night-shift",
    name: "Night Shift",
    description: "Dark charcoal + amber",
    dark: true,
    vars: {
      "--bg": "#0D0F1A", "--bg-alt": "#141620", "--bg-card": "#1A1D2E",
      "--text": "#F2EDE4", "--text-muted": "#8B8EA3", "--text-faint": "#52556A",
      "--accent": "#F59E0B", "--accent-light": "rgba(245,158,11,0.12)",
      "--border": "#23263A", "--border-card": "#2A2E44",
      "--nav-bg": "rgba(13,15,26,0.92)", "--shadow": "0 4px 32px rgba(0,0,0,0.32)",
    },
  },
  {
    id: "steel-blue",
    name: "Steel Blue",
    description: "Cool white + electric blue",
    dark: false,
    vars: {
      "--bg": "#F0F4F8", "--bg-alt": "#E4EBF3", "--bg-card": "#FFFFFF",
      "--text": "#0F1923", "--text-muted": "#4A5568", "--text-faint": "#94A3B8",
      "--accent": "#2563EB", "--accent-light": "#DBEAFE",
      "--border": "#CBD5E1", "--border-card": "#D8E4F0",
      "--nav-bg": "rgba(240,244,248,0.92)", "--shadow": "0 4px 32px rgba(15,25,35,0.08)",
    },
  },
  {
    id: "midnight-navy",
    name: "Midnight Navy",
    description: "Deep navy + gold",
    dark: true,
    vars: {
      "--bg": "#0A1628", "--bg-alt": "#101E36", "--bg-card": "#162440",
      "--text": "#F0F4FF", "--text-muted": "#8899BB", "--text-faint": "#4A5A7A",
      "--accent": "#EAB308", "--accent-light": "rgba(234,179,8,0.12)",
      "--border": "#1E2E4A", "--border-card": "#263A5C",
      "--nav-bg": "rgba(10,22,40,0.92)", "--shadow": "0 4px 32px rgba(0,0,0,0.4)",
    },
  },
  {
    id: "carbon-black",
    name: "Carbon Black",
    description: "Pure black + white",
    dark: true,
    vars: {
      "--bg": "#0C0C0C", "--bg-alt": "#141414", "--bg-card": "#1C1C1C",
      "--text": "#F5F5F5", "--text-muted": "#A0A0A0", "--text-faint": "#606060",
      "--accent": "#FAFAFA", "--accent-light": "rgba(250,250,250,0.08)",
      "--border": "#2A2A2A", "--border-card": "#333333",
      "--nav-bg": "rgba(12,12,12,0.95)", "--shadow": "0 4px 32px rgba(0,0,0,0.6)",
    },
  },
  {
    id: "crimson-haul",
    name: "Crimson Haul",
    description: "Clean white + deep red",
    dark: false,
    vars: {
      "--bg": "#FDF8F8", "--bg-alt": "#F5EEEE", "--bg-card": "#FFFFFF",
      "--text": "#1A0A0A", "--text-muted": "#7A5555", "--text-faint": "#B08080",
      "--accent": "#DC2626", "--accent-light": "#FEE2E2",
      "--border": "#E8DADA", "--border-card": "#F0E5E5",
      "--nav-bg": "rgba(253,248,248,0.92)", "--shadow": "0 4px 32px rgba(26,10,10,0.08)",
    },
  },
  {
    id: "emerald-route",
    name: "Emerald Route",
    description: "Dark forest + emerald",
    dark: true,
    vars: {
      "--bg": "#071A14", "--bg-alt": "#0C2219", "--bg-card": "#102B20",
      "--text": "#ECFDF5", "--text-muted": "#6EE7B7", "--text-faint": "#3A7A60",
      "--accent": "#10B981", "--accent-light": "rgba(16,185,129,0.12)",
      "--border": "#143D2A", "--border-card": "#1C5038",
      "--nav-bg": "rgba(7,26,20,0.92)", "--shadow": "0 4px 32px rgba(0,0,0,0.45)",
    },
  },
  {
    id: "sunset-road",
    name: "Sunset Road",
    description: "Warm cream + burnt orange",
    dark: false,
    vars: {
      "--bg": "#FFF8F0", "--bg-alt": "#FDEBD6", "--bg-card": "#FFFFFF",
      "--text": "#1C0E00", "--text-muted": "#7A5A3A", "--text-faint": "#B08A6A",
      "--accent": "#EA580C", "--accent-light": "#FFEDD5",
      "--border": "#E8D5B8", "--border-card": "#F0DFCA",
      "--nav-bg": "rgba(255,248,240,0.92)", "--shadow": "0 4px 32px rgba(28,14,0,0.08)",
    },
  },
  {
    id: "arctic-freight",
    name: "Arctic Freight",
    description: "Ice white + cyan",
    dark: false,
    vars: {
      "--bg": "#F0FBFF", "--bg-alt": "#E0F4FF", "--bg-card": "#FFFFFF",
      "--text": "#0A2030", "--text-muted": "#406080", "--text-faint": "#80AAC0",
      "--accent": "#0891B2", "--accent-light": "#CFFAFE",
      "--border": "#BAE6FD", "--border-card": "#D0EEF8",
      "--nav-bg": "rgba(240,251,255,0.92)", "--shadow": "0 4px 32px rgba(10,32,48,0.08)",
    },
  },
  {
    id: "asphalt",
    name: "Asphalt",
    description: "Dark grey + neon orange",
    dark: true,
    vars: {
      "--bg": "#171717", "--bg-alt": "#202020", "--bg-card": "#282828",
      "--text": "#F5F5F5", "--text-muted": "#A0A0A0", "--text-faint": "#606060",
      "--accent": "#F97316", "--accent-light": "rgba(249,115,22,0.12)",
      "--border": "#333333", "--border-card": "#3D3D3D",
      "--nav-bg": "rgba(23,23,23,0.92)", "--shadow": "0 4px 32px rgba(0,0,0,0.5)",
    },
  },
  {
    id: "violet-dispatch",
    name: "Violet Dispatch",
    description: "Soft white + deep purple",
    dark: false,
    vars: {
      "--bg": "#FAFAFF", "--bg-alt": "#F0EEFF", "--bg-card": "#FFFFFF",
      "--text": "#0F0A1E", "--text-muted": "#6B5E8A", "--text-faint": "#A090C0",
      "--accent": "#7C3AED", "--accent-light": "#EDE9FE",
      "--border": "#DDD5F0", "--border-card": "#E8E2F8",
      "--nav-bg": "rgba(250,250,255,0.92)", "--shadow": "0 4px 32px rgba(15,10,30,0.08)",
    },
  },
  {
    id: "desert-dust",
    name: "Desert Dust",
    description: "Sandy tan + terracotta",
    dark: false,
    vars: {
      "--bg": "#FDF5E6", "--bg-alt": "#F5E8CC", "--bg-card": "#FFFBF2",
      "--text": "#1A1000", "--text-muted": "#7A6040", "--text-faint": "#B09060",
      "--accent": "#C2410C", "--accent-light": "#FED7AA",
      "--border": "#E8D0A0", "--border-card": "#F0DCBC",
      "--nav-bg": "rgba(253,245,230,0.92)", "--shadow": "0 4px 32px rgba(26,16,0,0.08)",
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    description: "Black + lime green",
    dark: true,
    vars: {
      "--bg": "#080F08", "--bg-alt": "#0C160C", "--bg-card": "#101C10",
      "--text": "#E8FFE8", "--text-muted": "#70C070", "--text-faint": "#305030",
      "--accent": "#84CC16", "--accent-light": "rgba(132,204,22,0.10)",
      "--border": "#1A2E1A", "--border-card": "#223822",
      "--nav-bg": "rgba(8,15,8,0.95)", "--shadow": "0 4px 32px rgba(0,0,0,0.55)",
    },
  },
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    description: "Deep ocean + teal",
    dark: true,
    vars: {
      "--bg": "#041520", "--bg-alt": "#071D2C", "--bg-card": "#0A2438",
      "--text": "#E0F4FF", "--text-muted": "#5BA3C0", "--text-faint": "#2A6080",
      "--accent": "#06B6D4", "--accent-light": "rgba(6,182,212,0.12)",
      "--border": "#0F2E40", "--border-card": "#153A50",
      "--nav-bg": "rgba(4,21,32,0.92)", "--shadow": "0 4px 32px rgba(0,0,0,0.5)",
    },
  },
  {
    id: "rose-cargo",
    name: "Rose Cargo",
    description: "Warm white + crimson rose",
    dark: false,
    vars: {
      "--bg": "#FFF8F9", "--bg-alt": "#FDEEF2", "--bg-card": "#FFFFFF",
      "--text": "#1A0A10", "--text-muted": "#8A5060", "--text-faint": "#C08090",
      "--accent": "#E11D48", "--accent-light": "#FFE4E9",
      "--border": "#F0CEDA", "--border-card": "#F8DAEA",
      "--nav-bg": "rgba(255,248,249,0.92)", "--shadow": "0 4px 32px rgba(26,10,16,0.08)",
    },
  },
  {
    id: "gunmetal",
    name: "Gunmetal",
    description: "Dark steel + electric blue",
    dark: true,
    vars: {
      "--bg": "#12151A", "--bg-alt": "#181C23", "--bg-card": "#1E222C",
      "--text": "#E8ECFF", "--text-muted": "#8090B0", "--text-faint": "#4A5570",
      "--accent": "#60A5FA", "--accent-light": "rgba(96,165,250,0.12)",
      "--border": "#262D3D", "--border-card": "#303848",
      "--nav-bg": "rgba(18,21,26,0.92)", "--shadow": "0 4px 32px rgba(0,0,0,0.4)",
    },
  },
  {
    id: "copper-wire",
    name: "Copper Wire",
    description: "Light sand + copper bronze",
    dark: false,
    vars: {
      "--bg": "#F9F5EE", "--bg-alt": "#EFE8DC", "--bg-card": "#FFFFFF",
      "--text": "#1A1008", "--text-muted": "#786040", "--text-faint": "#B09870",
      "--accent": "#B45309", "--accent-light": "#FEF3C7",
      "--border": "#E0CCAA", "--border-card": "#EAD8BC",
      "--nav-bg": "rgba(249,245,238,0.92)", "--shadow": "0 4px 32px rgba(26,16,8,0.08)",
    },
  },
  {
    id: "slate-clean",
    name: "Slate Clean",
    description: "Minimal white + charcoal",
    dark: false,
    vars: {
      "--bg": "#F8FAFC", "--bg-alt": "#EEF2F7", "--bg-card": "#FFFFFF",
      "--text": "#0F172A", "--text-muted": "#475569", "--text-faint": "#94A3B8",
      "--accent": "#0F172A", "--accent-light": "#E2E8F0",
      "--border": "#CBD5E1", "--border-card": "#DDE4EE",
      "--nav-bg": "rgba(248,250,252,0.92)", "--shadow": "0 4px 32px rgba(15,23,42,0.08)",
    },
  },
  {
    id: "cyber-yellow",
    name: "Cyber Yellow",
    description: "Dark black + electric yellow",
    dark: true,
    vars: {
      "--bg": "#0D0D00", "--bg-alt": "#141400", "--bg-card": "#1C1C00",
      "--text": "#FFFFE0", "--text-muted": "#B0B060", "--text-faint": "#606020",
      "--accent": "#FACC15", "--accent-light": "rgba(250,204,21,0.10)",
      "--border": "#282800", "--border-card": "#333300",
      "--nav-bg": "rgba(13,13,0,0.95)", "--shadow": "0 4px 32px rgba(0,0,0,0.55)",
    },
  },
  {
    id: "neon-dispatch",
    name: "Neon Dispatch",
    description: "Black + neon green",
    dark: true,
    vars: {
      "--bg": "#0A0A0A", "--bg-alt": "#111111", "--bg-card": "#181818",
      "--text": "#F0FFF0", "--text-muted": "#80CC80", "--text-faint": "#3A6A3A",
      "--accent": "#39FF14", "--accent-light": "rgba(57,255,20,0.08)",
      "--border": "#1E2E1E", "--border-card": "#263826",
      "--nav-bg": "rgba(10,10,10,0.95)", "--shadow": "0 4px 32px rgba(0,0,0,0.65)",
    },
  },
];

export const DEFAULT_PALETTE_ID = "amber-road";

// ── Font pairs ──────────────────────────────────────────────────────────────
export interface FontPair {
  id: string;
  name: string;
  description: string;
  heading: string;         // CSS font-family value for headings (empty = keep default)
  body: string;            // CSS font-family value for body (empty = keep default)
  googleFamilies: string[]; // URL-encoded family strings for Google Fonts
}

export const FONT_PAIRS: FontPair[] = [
  { id: "default",        name: "Original",           description: "Montserrat + Outfit",           heading: "",                         body: "",                       googleFamilies: [] },
  { id: "space-inter",    name: "Space Modern",        description: "Space Grotesk + Inter",         heading: "Space Grotesk",            body: "Inter",                  googleFamilies: ["Space+Grotesk:wght@400;500;600;700;800", "Inter:wght@400;500;600"] },
  { id: "bebas-dm",       name: "Haul Bold",           description: "Bebas Neue + DM Sans",          heading: "Bebas Neue",               body: "DM Sans",                googleFamilies: ["Bebas+Neue", "DM+Sans:wght@400;500;600"] },
  { id: "syne-manrope",   name: "Editorial",           description: "Syne + Manrope",                heading: "Syne",                     body: "Manrope",                googleFamilies: ["Syne:wght@400;600;700;800", "Manrope:wght@400;500;600"] },
  { id: "raleway-nunito", name: "Elegant Route",       description: "Raleway + Nunito",              heading: "Raleway",                  body: "Nunito",                 googleFamilies: ["Raleway:wght@400;600;700;800;900", "Nunito:wght@400;500;600"] },
  { id: "jakarta-source", name: "Clean Pro",           description: "Plus Jakarta Sans + Source Sans",heading: "Plus Jakarta Sans",        body: "Source Sans 3",          googleFamilies: ["Plus+Jakarta+Sans:wght@400;500;600;700;800", "Source+Sans+3:wght@400;500;600"] },
  { id: "barlow",         name: "Road Condensed",      description: "Barlow Condensed + Barlow",     heading: "Barlow Condensed",         body: "Barlow",                 googleFamilies: ["Barlow+Condensed:wght@400;600;700;800;900", "Barlow:wght@400;500;600"] },
  { id: "josefin",        name: "Josefin",             description: "Josefin Sans — heading + body", heading: "Josefin Sans",             body: "Josefin Sans",           googleFamilies: ["Josefin+Sans:wght@400;600;700"] },
  { id: "urbanist",       name: "Urbanist",            description: "Urbanist — heading + body",     heading: "Urbanist",                 body: "Urbanist",               googleFamilies: ["Urbanist:wght@400;500;600;700;800;900"] },
  { id: "work-sans",      name: "Work Sans",           description: "Work Sans — heading + body",    heading: "Work Sans",                body: "Work Sans",              googleFamilies: ["Work+Sans:wght@400;500;600;700;800;900"] },
  { id: "ibm-plex",       name: "Fleet Tech",          description: "IBM Plex Sans + IBM Plex Mono", heading: "IBM Plex Sans",            body: "IBM Plex Mono",          googleFamilies: ["IBM+Plex+Sans:wght@400;500;600;700", "IBM+Plex+Mono:wght@400;500;600"] },
  { id: "poppins",        name: "Poppins",             description: "Poppins — heading + body",      heading: "Poppins",                  body: "Poppins",                googleFamilies: ["Poppins:wght@400;500;600;700;800;900"] },
  { id: "oswald-open",    name: "Highway",             description: "Oswald + Open Sans",            heading: "Oswald",                   body: "Open Sans",              googleFamilies: ["Oswald:wght@400;500;600;700", "Open+Sans:wght@400;500;600"] },
  { id: "exo2",           name: "Exo 2",               description: "Exo 2 — heading + body",        heading: "Exo 2",                    body: "Exo 2",                  googleFamilies: ["Exo+2:wght@400;500;600;700;800;900"] },
  { id: "anton-roboto",   name: "Impact Haul",         description: "Anton + Roboto",                heading: "Anton",                    body: "Roboto",                 googleFamilies: ["Anton", "Roboto:wght@400;500;600"] },
  { id: "big-shoulders",  name: "Big Shoulders",       description: "Big Shoulders Display + Text",  heading: "Big Shoulders Display",    body: "Big Shoulders Text",     googleFamilies: ["Big+Shoulders+Display:wght@400;600;700;800;900", "Big+Shoulders+Text:wght@400;500;600"] },
  { id: "unbounded",      name: "Unbounded",           description: "Unbounded + Nunito Sans",        heading: "Unbounded",                body: "Nunito Sans",            googleFamilies: ["Unbounded:wght@400;600;700;800;900", "Nunito+Sans:wght@400;500;600"] },
  { id: "chakra",         name: "Cyber Freight",       description: "Chakra Petch — heading + body", heading: "Chakra Petch",             body: "Chakra Petch",           googleFamilies: ["Chakra+Petch:wght@400;500;600;700"] },
];

export const DEFAULT_FONT_PAIR_ID = "default";

function applyFont(pair: FontPair) {
  if (typeof document === "undefined") return;
  if (!pair.heading) {
    // Restore Next.js font variables
    document.documentElement.style.removeProperty("--font-montserrat");
    document.documentElement.style.removeProperty("--font-outfit");
    return;
  }
  // Load Google Fonts once
  const linkId = `gfont-${pair.id}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${pair.googleFamilies.join("&family=")}&display=swap`;
    document.head.appendChild(link);
  }
  // Override CSS custom properties (inline style = highest specificity)
  document.documentElement.style.setProperty("--font-montserrat", `'${pair.heading}', sans-serif`);
  document.documentElement.style.setProperty("--font-outfit", `'${pair.body}', sans-serif`);
}

function applyPalette(palette: Palette) {
  const root = document.documentElement;
  (Object.entries(palette.vars) as [string, string][]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute("data-theme", palette.dark ? "dark" : "light");
}

interface PaletteCtxType {
  paletteId: string;
  palette: Palette;
  setPaletteId: (id: string) => void;
  fontPairId: string;
  fontPair: FontPair;
  setFontPairId: (id: string) => void;
}

const defaultPalette = PALETTES.find(p => p.id === DEFAULT_PALETTE_ID)!;
const defaultFontPair = FONT_PAIRS.find(f => f.id === DEFAULT_FONT_PAIR_ID)!;
const PaletteCtx = createContext<PaletteCtxType>({
  paletteId: DEFAULT_PALETTE_ID,
  palette: defaultPalette,
  setPaletteId: () => {},
  fontPairId: DEFAULT_FONT_PAIR_ID,
  fontPair: defaultFontPair,
  setFontPairId: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [paletteId, setPaletteIdState] = useState(DEFAULT_PALETTE_ID);
  const [fontPairId, setFontPairIdState] = useState(DEFAULT_FONT_PAIR_ID);

  useEffect(() => {
    const storedPalette = localStorage.getItem("paletteId");
    const pid = storedPalette && PALETTES.find(p => p.id === storedPalette) ? storedPalette : DEFAULT_PALETTE_ID;
    const palette = PALETTES.find(p => p.id === pid)!;
    setPaletteIdState(pid);
    applyPalette(palette);

    const storedFont = localStorage.getItem("fontPairId");
    const fid = storedFont && FONT_PAIRS.find(f => f.id === storedFont) ? storedFont : DEFAULT_FONT_PAIR_ID;
    const fontPair = FONT_PAIRS.find(f => f.id === fid)!;
    setFontPairIdState(fid);
    applyFont(fontPair);
  }, []);

  function setPaletteId(id: string) {
    const palette = PALETTES.find(p => p.id === id);
    if (!palette) return;
    setPaletteIdState(id);
    localStorage.setItem("paletteId", id);
    applyPalette(palette);
  }

  function setFontPairId(id: string) {
    const pair = FONT_PAIRS.find(f => f.id === id);
    if (!pair) return;
    setFontPairIdState(id);
    localStorage.setItem("fontPairId", id);
    applyFont(pair);
  }

  const palette = PALETTES.find(p => p.id === paletteId) ?? defaultPalette;
  const fontPair = FONT_PAIRS.find(f => f.id === fontPairId) ?? defaultFontPair;

  return (
    <PaletteCtx.Provider value={{ paletteId, palette, setPaletteId, fontPairId, fontPair, setFontPairId }}>
      {children}
    </PaletteCtx.Provider>
  );
}

export const usePalette = () => useContext(PaletteCtx);
// Keep useTheme as a shim so existing code doesn't break
export const useTheme = () => {
  const { palette, setPaletteId, paletteId } = usePalette();
  return {
    theme: palette.dark ? "dark" as const : "light" as const,
    toggle: () => {
      // Find a complementary palette (dark↔light)
      const target = palette.dark
        ? PALETTES.find(p => !p.dark) ?? PALETTES[0]
        : PALETTES.find(p => p.dark) ?? PALETTES[1];
      setPaletteId(target.id);
    },
  };
};
