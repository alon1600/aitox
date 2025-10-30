"use client";

import React from "react";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search any product..." }: SearchBarProps) {
  return (
    <div className="mt-6 w-full rounded-2xl glass p-5 lg:p-6 shadow-xl shadow-black/25 ring-1 ring-white/20 hover:ring-white/30 transition-all duration-300">
      <div className="flex items-center gap-4">
        <span aria-hidden className="text-2xl lg:text-3xl opacity-80">🔎</span>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent text-base lg:text-lg text-white placeholder:text-slate-300 placeholder:opacity-60 focus:outline-none"
        />
      </div>
    </div>
  );
}


