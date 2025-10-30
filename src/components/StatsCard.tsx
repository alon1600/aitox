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
    <div className="mt-6 w-full rounded-3xl glass p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
      <div className="grid grid-cols-3 gap-4 sm:gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-3xl font-extrabold text-transparent">
              {s.value}
            </div>
            <div className="mt-1 text-xs font-medium text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


