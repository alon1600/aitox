"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type HomeProduct = {
  id: string;
  name: string;
  category: string;
  riskLevel: "low" | "medium" | "high" | "very-high";
  concerns: string[];
  saferAlternative: string;
  addedAt: string;
  sourceScanId?: string;
};

export default function HomePage() {
  const router = useRouter();
  const [inventory, setInventory] = useState<HomeProduct[]>([]);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();

    // Listen for storage changes (in case products are added from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "myHomeProducts") {
        loadInventory();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleCustomStorageChange = () => {
      loadInventory();
    };
    window.addEventListener("myHomeProductsUpdated", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("myHomeProductsUpdated", handleCustomStorageChange);
    };
  }, []);

  const loadInventory = () => {
    const stored = localStorage.getItem("myHomeProducts");
    if (stored) {
      try {
        const inventoryData = JSON.parse(stored);
        setInventory(inventoryData);
      } catch (err) {
        console.error("Failed to parse home products:", err);
      }
    }
  };

  const removeProduct = (productId: string) => {
    const updated = inventory.filter((p) => p.id !== productId);
    setInventory(updated);
    localStorage.setItem("myHomeProducts", JSON.stringify(updated));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event("myHomeProductsUpdated"));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "very-high":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "low":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "very-high":
        return "VERY HIGH";
      case "high":
        return "HIGH";
      case "medium":
        return "MEDIUM";
      case "low":
        return "LOW";
      default:
        return risk.toUpperCase();
    }
  };

  const categories = Array.from(new Set(inventory.map((p) => p.category)));

  const filteredInventory = inventory.filter((product) => {
    if (filter !== "all") {
      if (filter === "high") {
        // Include both "high" and "very-high" in high filter
        if (product.riskLevel !== "high" && product.riskLevel !== "very-high") {
          return false;
        }
      } else {
        // For other filters, match exactly
        if (product.riskLevel !== filter) {
          return false;
        }
      }
    }
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const riskStats = {
    "very-high": inventory.filter((p) => p.riskLevel === "very-high").length,
    high: inventory.filter((p) => p.riskLevel === "high" || p.riskLevel === "very-high").length,
    medium: inventory.filter((p) => p.riskLevel === "medium").length,
    low: inventory.filter((p) => p.riskLevel === "low").length,
  };

  if (inventory.length === 0) {
    return (
      <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10">
        <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
          My Home
        </h1>
        <p className="mt-2 text-slate-300">
          Catalog products in your home to track their safety profiles.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-6">🏠</div>
          <h2 className="text-xl font-semibold text-slate-200 mb-2">
            No products yet
          </h2>
          <p className="text-slate-400 mb-8 max-w-xs">
            Start by scanning your home to add products to your inventory.
          </p>
          <Link
            href="/upload"
            className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 ring-1 ring-white/10 hover:bg-slate-50 transition-colors"
          >
            Scan your home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
          My Home
        </h1>
        <button
          onClick={() => router.push("/upload")}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 ring-1 ring-white/10 hover:bg-white/15 transition-colors"
        >
          Add More
        </button>
      </div>
      <p className="mt-2 text-slate-300 mb-6">
        {inventory.length} {inventory.length === 1 ? "product" : "products"} in your home
      </p>

      {/* Risk Statistics */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="rounded-xl bg-rose-500/10 p-3 ring-1 ring-rose-500/20 text-center">
          <div className="text-2xl font-bold text-rose-300">{riskStats["very-high"]}</div>
          <div className="text-xs text-rose-400 mt-1">Very High</div>
        </div>
        <div className="rounded-xl bg-orange-500/10 p-3 ring-1 ring-orange-500/20 text-center">
          <div className="text-2xl font-bold text-orange-300">{riskStats.high}</div>
          <div className="text-xs text-orange-400 mt-1">High</div>
        </div>
        <div className="rounded-xl bg-amber-500/10 p-3 ring-1 ring-amber-500/20 text-center">
          <div className="text-2xl font-bold text-amber-300">{riskStats.medium}</div>
          <div className="text-xs text-amber-400 mt-1">Medium</div>
        </div>
        <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20 text-center">
          <div className="text-2xl font-bold text-emerald-300">{riskStats.low}</div>
          <div className="text-xs text-emerald-400 mt-1">Low</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === "all"
                ? "bg-white text-slate-900"
                : "bg-white/10 text-slate-300 ring-1 ring-white/10"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === "high"
                ? "bg-orange-500/30 text-orange-200 ring-1 ring-orange-500/50"
                : "bg-white/10 text-slate-300 ring-1 ring-white/10"
            }`}
          >
            High Risk
          </button>
          <button
            onClick={() => setFilter("medium")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === "medium"
                ? "bg-amber-500/30 text-amber-200 ring-1 ring-amber-500/50"
                : "bg-white/10 text-slate-300 ring-1 ring-white/10"
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter("low")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === "low"
                ? "bg-emerald-500/30 text-emerald-200 ring-1 ring-emerald-500/50"
                : "bg-white/10 text-slate-300 ring-1 ring-white/10"
            }`}
          >
            Low Risk
          </button>
        </div>

        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? "bg-white text-slate-900"
                  : "bg-white/10 text-slate-300 ring-1 ring-white/10"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-white text-slate-900"
                    : "bg-white/10 text-slate-300 ring-1 ring-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredInventory.length === 0 ? (
          <div className="rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10">
            <p className="text-slate-400">No products match your filters.</p>
          </div>
        ) : (
          filteredInventory.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/8 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-100">
                      {product.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold border ${getRiskColor(
                        product.riskLevel
                      )}`}
                    >
                      {getRiskBadge(product.riskLevel)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{product.category}</p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition-colors"
                  aria-label="Remove product"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {product.concerns.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-slate-500 mb-1">Concerns:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.concerns.map((concern, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-white/5 px-2 py-0.5 text-xs text-slate-300"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.saferAlternative && (
                <div className="mb-2">
                  <p className="text-xs text-slate-500">
                    Safer alternative:{" "}
                    <span className="text-emerald-300 font-medium">
                      {product.saferAlternative}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                {product.id && product.id.startsWith('home_') ? (
                  <Link
                    href={`/search?q=${encodeURIComponent(product.name)}`}
                    className="text-xs text-cyan-300 hover:text-cyan-200 underline"
                  >
                    Search for evaluation
                  </Link>
                ) : (
                  <Link
                    href={`/product/${product.id}`}
                    className="text-xs text-cyan-300 hover:text-cyan-200 underline"
                  >
                    View detailed evaluation
                  </Link>
                )}
                <span className="text-xs text-slate-500">
                  {new Date(product.addedAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
