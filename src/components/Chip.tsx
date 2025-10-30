"use client";

import React from "react";

interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return (
    <button
      type="button"
      className="rounded-full lg:rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 shadow-sm ring-1 ring-white/10 hover:bg-white/15"
    >
      {label}
    </button>
  );
}


