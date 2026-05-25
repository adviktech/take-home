import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FourFleet — The Operating System for Modern Fleets",
  description:
    "From load booking to payday — FourFleet handles compliance, dispatch, maintenance, and earnings in one unified platform.",
  keywords: [
    "trucking",
    "fleet management",
    "logistics",
    "factoring",
    "compliance",
    "FMCSA",
    "dispatch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-fleet-bg text-slate-200 font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
