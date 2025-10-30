"use client";

import React from "react";

interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return (
    <button
      type="button"
      className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-slate-200 shadow-lg shadow-black/10 ring-1 ring-white/15 hover:bg-white/15 hover:ring-white/25 hover:shadow-xl hover:shadow-black/15 transition-all duration-200"
    >
      {label}
    </button>
  );
}


