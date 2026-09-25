import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vektra Dynamics — Engineered Digital Systems. Built for Scale.",
  description:
    "Vektra Dynamics is a technology studio building web platforms, custom software, and the groundwork for AI systems.",
  keywords: [
    "web engineering",
    "Next.js development",
    "AI integration",
    "custom software",
    "full-stack development",
    "Vektra Dynamics",
  ],
  openGraph: {
    title: "Vektra Dynamics",
    description:
      "We architect web platforms & scalable digital ecosystems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${grotesk.variable}`}
    >
      <body className="bg-obsidian font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-accent-cyan"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
