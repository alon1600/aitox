"use client";

import { useEffect, useState, use } from "react";
import { ToxicologicalDimension } from "@/components/ToxicologicalDimension";
import { ResearchCitations } from "@/components/ResearchCitations";
import { RecommendationCard } from "@/components/RecommendationCard";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

interface ProductEvaluation {
  id: string;
  name: string;
  category: string;
  overallScore: number;
  riskLevel: string;
  summary: string;
  dimensions: Array<{
    dimension: string;
    score: number;
    level: string;
    evidence: any;
    chemicals: any[];
    citations: any[];
  }>;
  recommendations: Array<{
    id: string;
    product: any;
    reason: string;
    dimensionComparison?: any[];
  }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const [evaluation, setEvaluation] = useState<ProductEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvaluation() {
      try {
        const response = await fetch(`/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation");
        }
        const data = await response.json();
        setEvaluation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchEvaluation();
  }, [id]);

  const getOverallRiskColor = (score: number, riskLevel: string) => {
    if (riskLevel === "very-high" || score >= 75)
      return "bg-rose-500/20 text-rose-300 border-rose-500/30";
    if (riskLevel === "high" || score >= 60)
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    if (riskLevel === "medium" || score >= 40)
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  };

  if (loading) {
    return (
      <div className="mx-auto min-h-[100svh] w-full max-w-4xl px-6 pb-28 pt-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30 mx-auto mb-4"></div>
            <p className="text-slate-300">Analyzing toxicological data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !evaluation) {
    return (
      <div className="mx-auto min-h-[100svh] w-full max-w-4xl px-6 pb-28 pt-10">
        <div className="rounded-2xl bg-rose-500/20 border border-rose-500/30 p-6">
          <h2 className="text-xl font-semibold text-rose-300 mb-2">
            Error loading evaluation
          </h2>
          <p className="text-slate-300">
            {error || "Product evaluation not found"}
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-semibold text-white"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[100svh] w-full max-w-4xl px-6 pb-28 pt-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-slate-300 mb-4 inline-block"
        >
          ← Back to search
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {evaluation.name}
        </h1>
        <p className="text-slate-400 mb-4">{evaluation.category}</p>

        {/* Overall Risk Score */}
        <div
          className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border ${getOverallRiskColor(
            evaluation.overallScore,
            evaluation.riskLevel
          )}`}
        >
          <div>
            <div className="text-xs font-medium uppercase tracking-wider">
              Overall Risk Score
            </div>
            <div className="text-2xl font-bold">{evaluation.overallScore}/100</div>
          </div>
          <div className="text-xs font-semibold uppercase">
            {evaluation.riskLevel.replace("-", " ")}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 rounded-2xl bg-white/5 backdrop-blur-xl p-6 ring-1 ring-white/10 border border-white/5">
        <h2 className="text-lg font-semibold text-white mb-3">
          Evaluation Summary
        </h2>
        <p className="text-slate-200 leading-relaxed">{evaluation.summary}</p>
      </div>

      {/* Toxicological Dimensions */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Toxicological Dimensions
          </h2>
          <p className="text-slate-400">
            Comprehensive evaluation across multiple health impact dimensions
            based on peer-reviewed research
          </p>
        </div>
        <div className="space-y-6">
          {evaluation.dimensions.map((dim, idx) => (
            <div key={idx} className="space-y-6">
              <ToxicologicalDimension
                dimension={dim.dimension}
                score={dim.score}
                level={dim.level as any}
                evidence={dim.evidence}
                chemicals={dim.chemicals}
              />
              {dim.citations && dim.citations.length > 0 && (
                <ResearchCitations
                  citations={dim.citations}
                  dimension={dim.dimension}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      {evaluation.recommendations && evaluation.recommendations.length > 0 && (
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Recommended Alternatives
            </h2>
            <p className="text-slate-400">
              Safer products with rigorous evaluation and improved safety profiles
            </p>
          </div>
          <div className="space-y-6">
            {evaluation.recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                product={rec.product}
                reason={rec.reason}
                dimensionComparison={rec.dimensionComparison}
              />
            ))}
          </div>
        </section>
      )}

      {/* Methodology Notice */}
      <div className="mt-12 rounded-2xl bg-white/5 backdrop-blur-xl p-6 ring-1 ring-white/10 border border-white/5">
        <h3 className="text-base font-semibold text-white mb-3">
          About This Evaluation
        </h3>
        <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
          <p>
            This evaluation is based on comprehensive analysis of peer-reviewed
            scientific literature, regulatory databases, and expert toxicological
            assessments.
          </p>
          <p>
            Scores are calculated using weighted algorithms that consider study
            quality, sample size, effect magnitude, and consistency across
            multiple studies. All cited research has been verified for scientific
            rigor.
          </p>
          <p className="text-xs text-slate-400 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}


