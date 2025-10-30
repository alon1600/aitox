import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({
  variable: "--font-app-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Toxicologist",
  description: "Vet every product for toxins using the latest research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-gradient-to-b from-indigo-900 via-violet-900 to-cyan-900 text-slate-50`}>
        <div className="relative mx-auto min-h-[100svh] w-full max-w-7xl lg:px-6 pb-24">
          {/* decorative gradient blobs for brand identity */}
          <div aria-hidden className="pointer-events-none absolute -top-20 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-400/40 via-indigo-400/35 to-cyan-300/35 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-300/35 via-sky-400/35 to-fuchsia-400/40 blur-3xl" />
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
