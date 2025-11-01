"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HomeProduct {
  id: string;
  name: string;
  category: string;
  riskLevel: "low" | "medium" | "high" | "very-high";
  concerns: string[];
  saferAlternative: string;
  addedAt: string;
  scanId?: string;
}

export default function MyHomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<HomeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem("myHomeProducts");
        if (storedProducts) {
          const parsed = JSON.parse(storedProducts);
          setProducts(parsed);
        }
      } catch (error) {
        console.error("Error loading home products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const removeProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    localStorage.setItem("myHomeProducts", JSON.stringify(updated));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "very-high":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "high":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "low":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  const getRiskBadgeText = (risk: string) => {
    return risk.replace("-", " ").toUpperCase();
  };

  const groupByCategory = (products: HomeProduct[]) => {
    const grouped: Record<string, HomeProduct[]> = {};
    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });
    return grouped;
  };

  const groupedProducts = groupByCategory(products);
  const categories = Object.keys(groupedProducts).sort();

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10 items-center justify-center">
        <div className="text-slate-400">Loading your home inventory...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10">
      <div className="mb-6">
        <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
          My Home
        </h1>
        <p className="mt-2 text-slate-300">
          Products detected in your home scans
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-lg font-semibold text-slate-200 mb-2">
            No products yet
          </h2>
          <p className="text-sm text-slate-400 mb-6 max-w-xs">
            Scan your home to start cataloging products and getting safety
            recommendations.
          </p>
          <Link
            href="/upload"
            className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 ring-1 ring-white/10 hover:bg-slate-50 transition-colors"
          >
            Start scanning
          </Link>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-2xl font-bold text-white">{products.length}</div>
              <div className="text-xs text-slate-400 mt-1">Total products</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-2xl font-bold text-white">{categories.length}</div>
              <div className="text-xs text-slate-400 mt-1">Categories</div>
            </div>
          </div>

          {/* Products by Category */}
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {category}
                </h2>
                <div className="space-y-3">
                  {groupedProducts[category].map((product) => (
                    <div
                      key={product.id}
                      className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/8 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-slate-100 mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full border ${getRiskColor(
                                product.riskLevel
                              )}`}
                            >
                              {getRiskBadgeText(product.riskLevel)}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(product.addedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="flex-shrink-0 rounded-lg bg-white/5 p-2 hover:bg-white/10 transition-colors text-slate-400 hover:text-red-400"
                          aria-label="Remove product"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {product.concerns && product.concerns.length > 0 && (
                        <div className="mt-3 mb-3">
                          <p className="text-xs font-medium text-slate-400 mb-1">
                            Concerns:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {product.concerns.map((concern, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 rounded-lg bg-red-500/10 text-red-300 border border-red-500/20"
                              >
                                {concern}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {product.saferAlternative && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-xs text-slate-400 mb-1">
                            Safer alternative:
                          </p>
                          <p className="text-sm text-emerald-300 font-medium">
                            {product.saferAlternative}
                          </p>
                        </div>
                      )}

                      <div className="mt-3 flex gap-2">
                        <Link
                          href={`/product/${product.id}`}
                          className="flex-1 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition-all text-center"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              href="/upload"
              className="rounded-2xl bg-white/10 py-3 text-center font-semibold text-white ring-1 ring-white/10 hover:bg-white/15 transition-colors"
            >
              Scan more
            </Link>
            <Link
              href="/recommendations"
              className="rounded-2xl bg-white py-3 text-center font-semibold text-slate-900 ring-1 ring-white/10 hover:bg-slate-50 transition-colors"
            >
              Get recommendations
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

