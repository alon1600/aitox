"use client";

interface ProductRanking {
  id: string;
  name: string;
  category: string;
  effectivenessScore: number;
  toxicologyScore: number; // Lower is better
  overallRank: number;
  buyLinks: {
    amazon?: string;
    target?: string;
    walmart?: string;
  };
  effectivenessBreakdown?: Record<string, number>;
  toxicologyBreakdown?: Record<string, number>;
}

interface ProductRankingsProps {
  rankings: ProductRanking[];
  currentProductId: string;
  effectivenessCriteria: Record<string, any>;
  toxicologyDimensions: string[];
}

export function ProductRankings({
  rankings,
  currentProductId,
  effectivenessCriteria,
  toxicologyDimensions,
}: ProductRankingsProps) {
  const getToxicologyColor = (score: number) => {
    if (score <= 25) return "text-emerald-300 bg-emerald-500/20 border-emerald-500/30";
    if (score <= 50) return "text-amber-300 bg-amber-500/20 border-amber-500/30";
    if (score <= 75) return "text-orange-300 bg-orange-500/20 border-orange-500/30";
    return "text-rose-300 bg-rose-500/20 border-rose-500/30";
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 80) return "text-emerald-300 bg-emerald-500/20 border-emerald-500/30";
    if (score >= 60) return "text-amber-300 bg-amber-500/20 border-amber-500/30";
    return "text-orange-300 bg-orange-500/20 border-orange-500/30";
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-emerald-500/30 text-emerald-200 border-emerald-500/50";
    if (rank === 2) return "bg-blue-500/30 text-blue-200 border-blue-500/50";
    return "bg-slate-500/30 text-slate-200 border-slate-500/50";
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 ring-1 ring-white/10 border border-white/5">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Product Rankings
          </h2>
          <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
              Comprehensive Comparison
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-sm sm:text-base">
          Top product types within this category, ranked by combined effectiveness and toxicology scores. Compare different materials and designs to find the best option for your needs.
        </p>
      </div>

      <div className="space-y-4">
        {rankings.map((product) => {
          const isCurrent = product.id === currentProductId || product.id === 'current';
          
          return (
            <div
              key={product.id}
              className={`rounded-xl border p-5 sm:p-6 ${
                isCurrent
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-white/5 border-white/10 hover:bg-white/8"
              } transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-bold border ${getRankBadgeColor(
                        product.overallRank
                      )}`}
                    >
                      #{product.overallRank}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {product.name}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Common Option
                      </span>
                    )}
                  </div>
                </div>

                {/* Scores */}
                <div className="flex gap-3">
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">Effectiveness</div>
                    <div
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getEffectivenessColor(
                        product.effectivenessScore
                      )}`}
                    >
                      {product.effectivenessScore}/100
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">Toxicology</div>
                    <div
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getToxicologyColor(
                        product.toxicologyScore
                      )}`}
                    >
                      {product.toxicologyScore}/100
                      <span className="text-xs ml-1 opacity-75">(lower is better)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {product.effectivenessBreakdown && (
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Effectiveness Breakdown
                    </div>
                    <div className="space-y-2">
                      {Object.entries(product.effectivenessBreakdown).map(([key, score]) => {
                        // Try to find matching criterion by key first, then by label
                        const criterionKey = Object.keys(effectivenessCriteria).find(
                          k => k.toLowerCase() === key.toLowerCase()
                        );
                        const criterion = criterionKey 
                          ? effectivenessCriteria[criterionKey]
                          : Object.values(effectivenessCriteria).find((c: any) => 
                              c.label?.toLowerCase().replace(/\s+/g, '').includes(key.toLowerCase().slice(0, 4)) ||
                              key.toLowerCase().includes(c.label?.toLowerCase().replace(/\s+/g, '').slice(0, 4))
                            ) as any;
                        // Format label: convert camelCase to Title Case
                        const label = criterion?.label || key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, str => str.toUpperCase())
                          .trim();
                        return (
                          <div key={key} className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">{label}:</span>
                            <span className="font-semibold text-white">{score}/100</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {product.toxicologyBreakdown && (
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Toxicology Breakdown
                    </div>
                    <div className="space-y-2">
                      {Object.entries(product.toxicologyBreakdown).map(([dimension, score]) => (
                        <div key={dimension} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">{dimension}:</span>
                          <span className={`font-semibold ${getToxicologyColor(score).split(' ')[0]}`}>
                            {score}/100
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buy Links */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Where to Buy
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.buyLinks.amazon && (
                    <a
                      href={product.buyLinks.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 text-sm font-semibold transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-5.765-4.668-10.436-10.423-10.436S3.154 6.308 3.154 12.073c0 5.765 4.668 10.436 10.423 10.436S24 17.838 24 12.073zm-11.267 6.522c-.595.596-1.391.596-1.986 0l-5.464-5.464c-.595-.595-.595-1.391 0-1.986.595-.595 1.391-.595 1.986 0l4.447 4.447 8.253-8.253c.595-.595 1.391-.595 1.986 0 .595.595.595 1.391 0 1.986l-9.222 9.274z"/>
                      </svg>
                      Amazon
                    </a>
                  )}
                  {product.buyLinks.target && (
                    <a
                      href={product.buyLinks.target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 text-sm font-semibold transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      Target
                    </a>
                  )}
                  {product.buyLinks.walmart && (
                    <a
                      href={product.buyLinks.walmart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-sm font-semibold transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      Walmart
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

