import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600"],
});

// TODO: replace with production domain before deploy
export const metadata: Metadata = {
  metadataBase: new URL("https://fourfleet.com"),
  title: {
    default: "FourFleet — The Operating System for Modern Fleets",
    template: "%s | FourFleet",
  },
  description:
    "From load booking to payday — FourFleet handles compliance, dispatch, maintenance, and earnings in one unified platform for CDL drivers and fleet operators.",
  keywords: ["trucking", "fleet management", "logistics", "factoring", "compliance", "FMCSA", "dispatch", "CDL driver", "owner operator", "take-home pay"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FourFleet",
    title: "FourFleet — The Operating System for Modern Fleets",
    description:
      "From load booking to payday — FourFleet handles compliance, dispatch, maintenance, and earnings in one unified platform.",
    // Add /public/og-image.jpg (1200×630) and uncomment to enable social cards:
    // images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FourFleet – The OS for Modern Fleets" }],
  },
  twitter: {
    card: "summary",
    title: "FourFleet — The Operating System for Modern Fleets",
    description:
      "From load booking to payday — FourFleet handles compliance, dispatch, maintenance, and earnings in one unified platform.",
    // images: ["/og-image.jpg"], // uncomment once og-image.jpg exists in /public
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={`${montserrat.variable} ${outfit.variable}`}>
      <body>
        <Preloader />
        <ScrollProgress />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
