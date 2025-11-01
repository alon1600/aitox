"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/upload", label: "Scan", icon: "📷" },
  { href: "/home", label: "My Home", icon: "🏡" },
  { href: "/profile", label: "Profile", icon: "🧬" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 right-0 mx-auto w-full max-w-md rounded-t-3xl bg-indigo-800/70 px-4 py-2 backdrop-blur-md shadow-[0_-6px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 lg:hidden">
      <ul className="grid grid-cols-4 gap-1">
        {tabs.map((t) => {
          const active = pathname === t.href || (t.href === "/" && pathname === "/");
          return (
            <li key={t.href} className="text-center">
              <Link
                href={t.href}
                className={`flex flex-col items-center rounded-2xl px-2 py-2 text-xs font-medium ${
                  active ? "text-violet-200" : "text-slate-400"
                }`}
              >
                <span className="text-2xl leading-none">{t.icon}</span>
                <span className="mt-1">{t.label}</span>
                {active && (
                  <span aria-hidden className="mt-1 h-0.5 w-6 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


