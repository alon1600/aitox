"use client";

import Link from "next/link";

interface RecommendationCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    score: number; // 0-100, lower is better
    improvement: number; // percentage improvement
    keyBenefits: string[];
    verified: boolean;
    priceRange?: string;
    availability?: string;
  };
  reason: string;
  dimensionComparison?: {
    dimension: string;
    currentScore: number;
    recommendedScore: number;
  }[];
}

export function RecommendationCard({
  product,
  reason,
  dimensionComparison,
}: RecommendationCardProps) {
  const getScoreColor = (score: number) => {
    if (score <= 25) return "text-emerald-300 bg-emerald-500/20 border-emerald-500/30";
    if (score <= 50) return "text-amber-300 bg-amber-500/20 border-amber-500/30";
    if (score <= 75) return "text-orange-300 bg-orange-500/20 border-orange-500/30";
    return "text-rose-300 bg-rose-500/20 border-rose-500/30";
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 border border-white/5 hover:bg-white/8 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {product.name}
            </h3>
            {product.verified && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mb-3">{product.category}</p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getScoreColor(product.score)}`}>
          {product.score}/100
        </div>
      </div>

      {/* Improvement Badge */}
      {product.improvement > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2">
            <span className="text-emerald-300 text-lg">↑</span>
            <div>
              <div className="text-sm font-semibold text-emerald-300">
                {product.improvement}% safer
              </div>
              <div className="text-xs text-slate-300">
                Compared to your current product
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reason */}
      <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
          Why we recommend this
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{reason}</p>
      </div>

      {/* Key Benefits */}
      {product.keyBenefits.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Key Benefits
          </div>
          <ul className="space-y-1.5">
            {product.keyBenefits.map((benefit, idx) => (
              <li key={idx} className="text-sm text-slate-200 flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dimension Comparison */}
      {dimensionComparison && dimensionComparison.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Comparison by Dimension
          </div>
          <div className="space-y-2">
            {dimensionComparison.map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-slate-300">{comp.dimension}:</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">
                    {comp.currentScore} → {comp.recommendedScore}
                  </span>
                  {comp.recommendedScore < comp.currentScore && (
                    <span className="text-emerald-300">↓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Info */}
      {(product.priceRange || product.availability) && (
        <div className="mb-4 flex items-center gap-4 text-xs text-slate-400">
          {product.priceRange && (
            <span>Price: {product.priceRange}</span>
          )}
          {product.availability && (
            <span>Availability: {product.availability}</span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/product/${product.id}`}
          className="flex-1 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white ring-1 ring-white/20 transition-all"
        >
          View Details
        </Link>
        <a
          href="#"
          className="flex-1 rounded-xl bg-white text-slate-900 hover:bg-slate-50 px-4 py-2.5 text-center text-sm font-semibold ring-1 ring-white/10 transition-all"
        >
          Find Retailer
        </a>
      </div>
    </div>
  );
}

