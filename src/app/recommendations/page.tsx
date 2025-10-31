"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type DetectedProduct = {
  name: string;
  category: string;
  riskLevel: "low" | "medium" | "high";
  concerns: string[];
  saferAlternative: string;
};

function ShoppingListItem({ 
  product, 
  index 
}: { 
  product: DetectedProduct;
  index: number;
}) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <li className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-100 mb-1">{product.name}</div>
          <div className="text-xs text-slate-400 mb-2">{product.category}</div>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.concerns.slice(0, 2).map((concern, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10"
              >
                {concern}
              </span>
            ))}
          </div>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full font-semibold border ${getRiskColor(product.riskLevel)}`}>
          {product.riskLevel.toUpperCase()}
        </span>
      </div>
      
      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-slate-400 mb-1">Safer alternative:</div>
          <div className="text-sm font-medium text-white">{product.saferAlternative}</div>
        </div>
        <Link
          href={`/product/${index + 1}`}
          className="flex-shrink-0 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 ring-1 ring-white/10 hover:bg-slate-50 transition-colors"
        >
          View
        </Link>
      </div>
    </li>
  );
}

export default function RecommendationsPage() {
  const searchParams = useSearchParams();
  const [detectedProducts, setDetectedProducts] = useState<DetectedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scanId = searchParams.get("scanId");
    
    if (scanId) {
      // Get results from localStorage
      const storedResults = localStorage.getItem(`scan_${scanId}`);
      if (storedResults) {
        const results = JSON.parse(storedResults);
        setDetectedProducts(results.detectedProducts || []);
      }
    } else {
      // Try to get the most recent scan
      const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      if (history.length > 0) {
        const latestScanId = history[0].scanId;
        const storedResults = localStorage.getItem(`scan_${latestScanId}`);
        if (storedResults) {
          const results = JSON.parse(storedResults);
          setDetectedProducts(results.detectedProducts || []);
        }
      }
    }
    
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="mx-auto min-h-[100svh] w-full max-w-md px-6 pb-28 pt-10">
        <div className="text-center text-slate-400">Loading recommendations...</div>
      </div>
    );
  }

  if (detectedProducts.length === 0) {
    return (
      <div className="mx-auto min-h-[100svh] w-full max-w-md px-6 pb-28 pt-10">
        <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
          Personalized recommendations
        </h1>
        <p className="mt-2 text-slate-300">
          No products detected. Try uploading more photos or ensure images are clear and well-lit.
        </p>
        <Link
          href="/upload"
          className="mt-6 inline-block w-full rounded-2xl bg-white py-3 text-center font-semibold text-slate-900 ring-1 ring-white/10 hover:bg-slate-50 transition-colors"
        >
          Scan again
        </Link>
      </div>
    );
  }

  const riskCounts = detectedProducts.reduce(
    (acc, p) => {
      acc[p.riskLevel] = (acc[p.riskLevel] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="mx-auto min-h-[100svh] w-full max-w-md px-6 pb-28 pt-10">
      <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
        Personalized recommendations
      </h1>
      <p className="mt-2 text-slate-300">
        We detected {detectedProducts.length} {detectedProducts.length === 1 ? "item" : "items"} in your home. 
        Replace high‑risk products with safer picks.
      </p>

      {/* Risk Summary */}
      {(riskCounts.high || riskCounts.medium) && (
        <div className="mt-5 rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-semibold text-red-400">Action needed</span>
          </div>
          <p className="text-xs text-slate-300">
            {riskCounts.high ? `${riskCounts.high} high-risk ${riskCounts.high === 1 ? "item" : "items"} detected. ` : ""}
            {riskCounts.medium ? `${riskCounts.medium} medium-risk ${riskCounts.medium === 1 ? "item" : "items"} found. ` : ""}
            Consider replacing these with safer alternatives.
          </p>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {detectedProducts.map((product, index) => (
          <ShoppingListItem key={index} product={product} index={index} />
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          href="/upload"
          className="rounded-2xl bg-white/10 py-3 text-center font-semibold text-white ring-1 ring-white/10 hover:bg-white/15 transition-colors"
        >
          Add more photos
        </Link>
        <Link
          href="/shop"
          className="rounded-2xl bg-white py-3 text-center font-semibold text-slate-900 ring-1 ring-white/10 hover:bg-slate-50 transition-colors"
        >
          Shop safer picks
        </Link>
      </div>
    </div>
  );
}
