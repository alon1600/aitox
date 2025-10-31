"use client";

interface ToxicologicalDimensionProps {
  dimension: string;
  score: number; // 0-100, lower is better
  level: "low" | "medium" | "high" | "very-high";
  evidence: {
    summary: string;
    studies: number;
    regulatoryStatus: string;
    keyFindings: string[];
  };
  chemicals: Array<{
    name: string;
    concentration: string;
    riskLevel: "low" | "medium" | "high";
  }>;
}

export function ToxicologicalDimension({
  dimension,
  score,
  level,
  evidence,
  chemicals,
}: ToxicologicalDimensionProps) {
  const levelColors = {
    low: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    high: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "very-high": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };

  const levelLabels = {
    low: "Low Risk",
    medium: "Moderate Risk",
    high: "High Risk",
    "very-high": "Very High Risk",
  };

  const getScoreColor = (score: number) => {
    if (score <= 25) return "text-emerald-300";
    if (score <= 50) return "text-amber-300";
    if (score <= 75) return "text-orange-300";
    return "text-rose-300";
  };

  const getRiskColor = (risk: string) => {
    if (risk === "low") return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    if (risk === "medium") return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    return "bg-rose-500/20 text-rose-300 border-rose-500/30";
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 border border-white/5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
            {dimension}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${levelColors[level]}`}
            >
              {levelLabels[level]}
            </span>
            <span className={`text-sm font-bold ${getScoreColor(score)}`}>
              Score: {score}/100
            </span>
          </div>
        </div>
      </div>

      {/* Evidence Summary */}
      <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Evidence Summary
          </span>
          <span className="text-xs text-slate-400">
            {evidence.studies} studies
          </span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed mb-3">
          {evidence.summary}
        </p>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-xs font-medium text-slate-400 mb-2 block">
            Regulatory Status:
          </span>
          <span className="text-xs text-slate-200 bg-white/5 px-2 py-1 rounded">
            {evidence.regulatoryStatus}
          </span>
        </div>
      </div>

      {/* Key Findings */}
      {evidence.keyFindings.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Key Findings
          </h4>
          <ul className="space-y-1.5">
            {evidence.keyFindings.map((finding, idx) => (
              <li
                key={idx}
                className="text-sm text-slate-200 flex items-start gap-2"
              >
                <span className="text-amber-400 mt-1">•</span>
                <span className="leading-relaxed">{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chemicals of Concern */}
      {chemicals.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Chemicals of Concern
          </h4>
          <div className="flex flex-wrap gap-2">
            {chemicals.map((chemical, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-lg text-xs border ${getRiskColor(
                  chemical.riskLevel
                )}`}
              >
                <div className="font-medium">{chemical.name}</div>
                {chemical.concentration && (
                  <div className="text-xs opacity-75 mt-0.5">
                    {chemical.concentration}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

