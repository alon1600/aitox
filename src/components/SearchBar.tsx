"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search any product..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full">
      <div className="rounded-2xl glass p-5 lg:p-6 shadow-xl shadow-black/25 ring-1 ring-white/20 hover:ring-white/30 transition-all duration-300">
        <div className="flex items-center gap-4">
          <span aria-hidden className="text-2xl lg:text-3xl opacity-80">🔎</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-base lg:text-lg text-white placeholder:text-slate-300 placeholder:opacity-60 focus:outline-none"
          />
          {query.trim() && (
            <button
              type="submit"
              className="rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition-all"
            >
              Search
            </button>
          )}
        </div>
      </div>
    </form>
  );
}


