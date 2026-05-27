import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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

export const metadata: Metadata = {
  title: "FourFleet — The Operating System for Modern Fleets",
  description:
    "From load booking to payday — FourFleet handles compliance, dispatch, maintenance, and earnings in one unified platform.",
  keywords: ["trucking", "fleet management", "logistics", "factoring", "compliance", "FMCSA", "dispatch"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={`${montserrat.variable} ${outfit.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
