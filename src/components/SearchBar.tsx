"use client";

import React from "react";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search any product..." }: SearchBarProps) {
  return (
    <div className="mt-6 w-full rounded-3xl lg:rounded-2xl glass p-4 shadow-[0_8px_30px_rgba(0,0,0,0.20)] ring-1 ring-white/15">
      <div className="flex items-center gap-3">
        <span aria-hidden className="text-2xl text-slate-300">🔎</span>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent text-base text-slate-100 placeholder:text-slate-300 focus:outline-none"
        />
      </div>
    </div>
  );
}


