"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-b from-indigo-900/95 via-violet-900/95 to-purple-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Link */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-all">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                AI Toxicologist
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === "/"
                  ? "bg-white/10 text-white ring-1 ring-white/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>
            <Link
              href="/upload"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname?.startsWith("/upload")
                  ? "bg-white/10 text-white ring-1 ring-white/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Scan
            </Link>
            <Link
              href="/profile"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === "/profile" || pathname?.startsWith("/profile")
                  ? "bg-white/10 text-white ring-1 ring-white/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

