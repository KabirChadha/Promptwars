import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SDG 8 Engine | Decent Work & Economic Growth Compliance",
  description:
    "Production-grade compliance audit, labour risk analysis, and actionable SDG 8 roadmap generator powered by AI.",
  keywords: [
    "SDG 8",
    "Decent Work",
    "Economic Growth",
    "Labour Compliance",
    "Workplace Safety",
    "ESG Audit",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-zinc-950 text-zinc-50 min-h-screen selection:bg-orange-500/30 selection:text-orange-200`}
      >
        {children}
      </body>
    </html>
  );
}
