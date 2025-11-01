"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ChipProps {
  label: string;
  productId?: string; // Optional direct product ID for known products
}

// Map popular queries to product IDs or search terms
const POPULAR_QUERY_MAP: Record<string, string | null> = {
  "Teflon pans": "1", // Direct product ID
  "Baby bottles": "2", // Direct product ID
  "Baby Bottles": "2", // Direct product ID
  "Non-Toxic Pots & Pans": "1", // Direct product ID - Pots and Pans
  "Best Shampoo for my hair": null, // No product yet
  "Rugs best for my air quality": null, // No product yet
  "Non-toxic hand soap": null, // No product yet
  "Shampoo": null, // No product yet, will search
  "Rugs": null, // No product yet, will search
  "Hand soap": null, // No product yet, will search
};

export function Chip({ label, productId }: ChipProps) {
  const router = useRouter();

  const handleClick = () => {
    // If productId is provided or mapped, navigate directly
    const mappedId = productId || POPULAR_QUERY_MAP[label];
    
    if (mappedId) {
      router.push(`/product/${mappedId}`);
    } else {
      // Otherwise, navigate to search page with query
      router.push(`/search?q=${encodeURIComponent(label)}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-slate-200 shadow-lg shadow-black/10 ring-1 ring-white/15 hover:bg-white/15 hover:ring-white/25 hover:shadow-xl hover:shadow-black/15 transition-all duration-200 cursor-pointer"
    >
      {label}
    </button>
  );
}


