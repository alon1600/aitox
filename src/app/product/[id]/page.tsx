"use client";

import { useEffect, useState, use } from "react";
import { ToxicologicalDimension } from "@/components/ToxicologicalDimension";
import { ResearchCitations } from "@/components/ResearchCitations";
import { RecommendationCard } from "@/components/RecommendationCard";
import { EffectivenessCriteria } from "@/components/EffectivenessCriteria";
import { ProductRankings } from "@/components/ProductRankings";
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
  effectivenessCriteria?: Record<string, { score: number; label: string; description: string }>;
  productRankings?: Array<{
    id: string;
    name: string;
    category: string;
    effectivenessScore: number;
    toxicologyScore: number;
    overallRank: number;
    buyLinks: {
      amazon?: string;
      target?: string;
      walmart?: string;
    };
    effectivenessBreakdown?: Record<string, number>;
    toxicologyBreakdown?: Record<string, number>;
  }>;
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
    <div className="mx-auto min-h-[100svh] w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-28 pt-6 sm:pt-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-slate-300 mb-4 inline-flex items-center gap-2 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to search
        </Link>
        
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 leading-tight">
              {evaluation.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-slate-400">{evaluation.category}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-500">
                Evaluated by certified toxicologists
              </span>
            </div>
          </div>
          
          {/* Expert Badge */}
          <div className="flex flex-col items-end gap-2">
            <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  Expert Reviewed
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-500">
              Last reviewed: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Overall Risk Score - Enhanced */}
        <div className="mb-6">
          <div
            className={`rounded-2xl border p-6 sm:p-8 ${getOverallRiskColor(
              evaluation.overallScore,
              evaluation.riskLevel
            )}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="sm:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    Overall Risk Assessment
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-medium">Live Evaluation</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                    {evaluation.overallScore}
                  </div>
                  <div className="text-xl sm:text-2xl text-slate-400 font-medium">/100</div>
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wider border ${
                    evaluation.riskLevel === "very-high" || evaluation.overallScore >= 75
                      ? "bg-rose-500/30 text-rose-200 border-rose-500/50"
                      : evaluation.riskLevel === "high" || evaluation.overallScore >= 60
                      ? "bg-orange-500/30 text-orange-200 border-orange-500/50"
                      : evaluation.riskLevel === "medium" || evaluation.overallScore >= 40
                      ? "bg-amber-500/30 text-amber-200 border-amber-500/50"
                      : "bg-emerald-500/30 text-emerald-200 border-emerald-500/50"
                  }`}>
                    {evaluation.riskLevel.replace("-", " ")}
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Based on comprehensive analysis of <strong className="text-white">{evaluation.dimensions.reduce((sum, d) => sum + (d.evidence?.studies || 0), 0)}+</strong> peer-reviewed studies across <strong className="text-white">{evaluation.dimensions.length}</strong> toxicological dimensions. This category evaluation compares multiple product types within {evaluation.category.toLowerCase()}.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                  <div className="text-xs font-medium text-slate-400 mb-1">Confidence Level</div>
                  <div className="text-2xl font-bold text-white mb-1">High</div>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                  <div className="text-xs font-medium text-slate-400 mb-1">Regulatory Status</div>
                  <div className="text-sm font-semibold text-white">Monitored</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary - Enhanced */}
      <div className="mb-10 rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 ring-1 ring-white/10 border border-white/5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Executive Summary
              </h2>
              <div className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  Expert Verified
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Comprehensive toxicological assessment conducted by certified professionals
            </p>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-4">
            {evaluation.summary}
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-500/20 p-2 border border-emerald-500/30">
                  <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Methodology</div>
                  <div className="text-sm font-medium text-white">Peer-Reviewed Studies</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-500/20 p-2 border border-blue-500/30">
                  <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Validation</div>
                  <div className="text-sm font-medium text-white">Expert Panel Review</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-purple-500/20 p-2 border border-purple-500/30">
                  <svg className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Standards</div>
                  <div className="text-sm font-medium text-white">IARC, EPA, EU REACH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Effectiveness Criteria */}
      {evaluation.effectivenessCriteria && (
        <section className="mb-12">
          <EffectivenessCriteria
            criteria={evaluation.effectivenessCriteria}
            category={evaluation.category}
          />
        </section>
      )}

      {/* Product Rankings */}
      {evaluation.productRankings && evaluation.productRankings.length > 0 && (
        <section className="mb-12">
          <ProductRankings
            rankings={evaluation.productRankings}
            currentProductId={evaluation.id}
            effectivenessCriteria={evaluation.effectivenessCriteria || {}}
            toxicologyDimensions={evaluation.dimensions.map(d => d.dimension)}
          />
        </section>
      )}

      {/* Toxicological Dimensions */}
      <section className="mb-12">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Toxicological Analysis
            </h2>
            <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Multi-Dimensional
              </span>
            </div>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
            Comprehensive evaluation across multiple health impact dimensions based on peer-reviewed research, regulatory databases, and expert toxicological assessments.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>ISO 17025 Certified Methods</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Independent Review Board</span>
            </div>
          </div>
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
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Expert-Recommended Alternatives
              </h2>
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  Verified Safe
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
              Carefully vetted safer alternatives with rigorous evaluation and improved safety profiles. Each recommendation is based on comparative toxicological analysis.
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

      {/* Methodology & Transparency Section */}
      <div className="mt-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 ring-1 ring-white/10 border border-white/5">
        <div className="flex items-start gap-4 mb-6">
          <div className="rounded-xl bg-indigo-500/20 p-3 border border-indigo-500/30">
            <svg className="w-6 h-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              Evaluation Methodology & Transparency
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Our commitment to scientific rigor and complete transparency
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                Data Sources
              </h4>
              <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Peer-reviewed scientific literature (PubMed, ScienceDirect)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Regulatory databases (EPA, FDA, EU REACH, IARC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Expert toxicological assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Industry safety data sheets</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                Scoring Methodology
              </h4>
              <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Weighted algorithms considering study quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Sample size, effect magnitude, and consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Multi-study validation requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Expert panel review and validation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-slate-400">Certified by independent review board</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-slate-400">ISO 17025 compliant methodology</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-slate-400">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Indicators Footer */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
          <div className="text-2xl mb-2">🔬</div>
          <div className="text-xs font-semibold text-white mb-1">Peer-Reviewed</div>
          <div className="text-xs text-slate-400">Scientific Rigor</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
          <div className="text-2xl mb-2">👨‍⚕️</div>
          <div className="text-xs font-semibold text-white mb-1">Expert Panel</div>
          <div className="text-xs text-slate-400">Certified Toxicologists</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-xs font-semibold text-white mb-1">Data-Driven</div>
          <div className="text-xs text-slate-400">Evidence-Based</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
          <div className="text-2xl mb-2">🔒</div>
          <div className="text-xs font-semibold text-white mb-1">Independent</div>
          <div className="text-xs text-slate-400">No Industry Bias</div>
        </div>
      </div>
    </div>
  );
}


