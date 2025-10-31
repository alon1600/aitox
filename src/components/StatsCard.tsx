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
    <div className="mt-6 w-full rounded-2xl glass p-7 lg:p-8 shadow-xl shadow-black/25 ring-1 ring-white/20">
      <div className="grid grid-cols-3 gap-4 lg:gap-6 justify-items-center">
        {stats.map((s) => (
          <div key={s.label} className="w-full flex flex-col items-center justify-center text-center">
            <div className="w-full flex justify-center">
              <div className="bg-gradient-to-br from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-3xl lg:text-4xl font-extrabold text-transparent drop-shadow-[0_2px_4px_rgba(139,92,246,0.3)] text-center">
                {s.value}
              </div>
            </div>
            <div className="mt-2 w-full text-xs lg:text-sm font-medium text-slate-300 leading-tight break-words whitespace-normal text-center">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


