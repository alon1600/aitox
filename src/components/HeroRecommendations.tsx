"use client";

import Link from "next/link";
import Image from "next/image";

interface Recommendation {
  id: string;
  preference?: string;
  preferenceDescription?: string;
  product: {
    id: string;
    name: string;
    category: string;
    score: number;
    improvement: number;
    keyBenefits: string[];
    verified: boolean;
    priceRange?: string;
    availability?: string;
    imageUrl?: string;
  };
  reason: string;
  dimensionComparison?: Array<{
    dimension: string;
    currentScore: number;
    recommendedScore: number;
  }>;
}

interface HeroRecommendationsProps {
  recommendations: Recommendation[];
}

export function HeroRecommendations({ recommendations }: HeroRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score <= 25) return "text-emerald-300 bg-emerald-500/20 border-emerald-500/30";
    if (score <= 50) return "text-amber-300 bg-amber-500/20 border-amber-500/30";
    if (score <= 75) return "text-orange-300 bg-orange-500/20 border-orange-500/30";
    return "text-rose-300 bg-rose-500/20 border-rose-500/30";
  };

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Expert Recommendations
          </h2>
          <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              {recommendations.length} Options
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
          Safer alternatives tailored to your priorities. Each recommendation has been rigorously evaluated and verified by our toxicology team.
        </p>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 border border-white/5 overflow-hidden hover:bg-white/8 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Hero Image */}
              <div className="relative lg:col-span-1 h-64 lg:h-auto bg-gradient-to-br from-slate-800 to-slate-900">
                {rec.product.imageUrl ? (
                  <Image
                    src={rec.product.imageUrl}
                    alt={rec.product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="lg:col-span-2 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {rec.product.name}
                      </h3>
                      {rec.product.verified && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    {rec.preference && (
                      <div className="mb-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-2">
                          <svg className="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span className="text-sm font-semibold text-indigo-300">{rec.preference}</span>
                        </div>
                        <p className="text-sm text-slate-400">{rec.preferenceDescription}</p>
                      </div>
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-lg font-bold border flex-shrink-0 ${getScoreColor(rec.product.score)}`}>
                    {rec.product.score}/100
                  </div>
                </div>

                {/* Improvement Badge */}
                {rec.product.improvement > 0 && (
                  <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-300 text-2xl">↑</span>
                      <div>
                        <div className="text-lg font-bold text-emerald-300">
                          {rec.product.improvement}% safer
                        </div>
                        <div className="text-sm text-slate-300">
                          Compared to your current product
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reason */}
                <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Why we recommend this
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{rec.reason}</p>
                </div>

                {/* Key Benefits */}
                {rec.product.keyBenefits.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                      Key Benefits
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {rec.product.keyBenefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                          <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dimension Comparison */}
                {rec.dimensionComparison && rec.dimensionComparison.length > 0 && (
                  <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                      Risk Reduction
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {rec.dimensionComparison.map((comp, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">{comp.dimension}:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 line-through">{comp.currentScore}</span>
                            <span className="text-emerald-300 font-semibold">→ {comp.recommendedScore}</span>
                            <span className="text-emerald-300">↓</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Info & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    {rec.product.priceRange && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {rec.product.priceRange}
                      </span>
                    )}
                    {rec.product.availability && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {rec.product.availability}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Link
                      href={`/product/${rec.product.id}`}
                      className="flex-1 sm:flex-none sm:px-6 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white ring-1 ring-white/20 transition-all"
                    >
                      View Details
                    </Link>
                    <a
                      href="#"
                      className="flex-1 sm:flex-none sm:px-6 rounded-xl bg-white text-slate-900 hover:bg-slate-50 px-4 py-2.5 text-center text-sm font-semibold ring-1 ring-white/10 transition-all"
                    >
                      Find Retailer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

