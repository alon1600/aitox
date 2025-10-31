"use client";

interface EffectivenessCriteriaProps {
  criteria: Record<string, { score: number; label: string; description: string }>;
  category: string;
}

export function EffectivenessCriteria({ criteria, category }: EffectivenessCriteriaProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-300 bg-emerald-500/20 border-emerald-500/30";
    if (score >= 60) return "text-amber-300 bg-amber-500/20 border-amber-500/30";
    return "text-orange-300 bg-orange-500/20 border-orange-500/30";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-emerald-400";
    if (score >= 60) return "bg-amber-400";
    return "bg-orange-400";
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 ring-1 ring-white/10 border border-white/5">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Product Effectiveness Evaluation
          </h2>
          <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
              {category}-Specific
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-sm sm:text-base">
          Performance assessment criteria for evaluating {category.toLowerCase()} across different product types and materials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(criteria).map(([key, criterion]) => (
          <div
            key={key}
            className="rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/8 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {criterion.label}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {criterion.description}
                </p>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg text-sm font-bold border ml-3 ${getScoreColor(
                  criterion.score
                )}`}
              >
                {criterion.score}/100
              </div>
            </div>
            
            {/* Score bar */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreBarColor(criterion.score)} transition-all duration-500`}
                style={{ width: `${criterion.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

