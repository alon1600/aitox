"use client";

import React from "react";

type Stat = {
  value: string;
  label: string;
};

interface StatsCardProps {
  stats: Stat[];
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="w-full rounded-2xl glass p-5 sm:p-6 lg:p-7 xl:p-8 shadow-xl shadow-black/25 ring-1 ring-white/20">
      <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <div className="bg-gradient-to-br from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent drop-shadow-[0_2px_4px_rgba(139,92,246,0.3)] whitespace-nowrap">
              {s.value}
            </div>
            <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs lg:text-sm font-medium text-slate-300 leading-tight break-words">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


