"use client";

import { useEffect, useState, use } from "react";
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
    preference?: string;
    preferenceDescription?: string;
    product: any;
    reason: string;
    dimensionComparison?: any[];
  }>;
  researchLibrary?: any[];
  researchLibraryStats?: {
    totalStudies: number;
    seminalStudies: number;
    highImpactStudies: number;
    chemicalsCovered?: string[];
    dimensionsCovered?: string[];
  };
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const [evaluation, setEvaluation] = useState<ProductEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State for expanded criteria and dimensions - must be declared before any conditional returns
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set());
  const [expandedDimensions, setExpandedDimensions] = useState<Set<number>>(new Set());

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

  // Get top recommendation (safest one - lowest score)
  const topRecommendation = evaluation.recommendations && evaluation.recommendations.length > 0 
    ? [...evaluation.recommendations].sort((a: any, b: any) => a.product.score - b.product.score)[0]
    : null;

  // Get overall approach recommendation based on category
  const getApproachRecommendation = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('cookware') || categoryLower.includes('pots') || categoryLower.includes('pans')) {
      return {
        title: 'Recommended Cookware Strategy',
        approach: 'Maintain a collection of pots and pans across multiple safe material types. Use stainless steel for general cooking and acidic foods. Use ceramic-coated for non-stick convenience when needed. Use cast iron for high-heat searing. Absolutely avoid traditional plastic-based non-stick pans (Teflon/PTFE) which release toxic fumes when overheated.'
      };
    }
    
    if (categoryLower.includes('baby') && categoryLower.includes('bottle')) {
      return {
        title: 'Recommended Baby Bottle Strategy',
        approach: 'Use glass bottles as your primary choice for maximum safety. If you need lightweight options for travel, choose silicone or stainless steel alternatives. Absolutely avoid polycarbonate plastic bottles, which may contain BPA or other harmful chemicals that can leach into formula, especially when heated.'
      };
    }
    
    return {
      title: 'Recommended Approach',
      approach: 'Prioritize products made from inert, non-reactive materials. Avoid products containing perfluorinated compounds (PFOA, PTFE), phthalates, or BPA. When possible, choose natural materials like glass, stainless steel, or ceramic over synthetic plastics.'
    };
  };

  const approachRecommendation = getApproachRecommendation(evaluation.category);

  // Generate effectiveness summary
  const getEffectivenessSummary = () => {
    if (!evaluation.effectivenessCriteria) return null;
    
    const criteria = Object.values(evaluation.effectivenessCriteria) as Array<{score: number, label: string, description: string}>;
    const sortedByScore = [...criteria].sort((a, b) => b.score - a.score);
    
    // Find highest and lowest scores to identify strengths and weaknesses
    const highest = sortedByScore[0];
    const lowest = sortedByScore[sortedByScore.length - 1];
    
    // For cookware, focus on safety-related effectiveness (temperature resistance)
    const safetyCritical = criteria.find(c => 
      c.label.toLowerCase().includes('temperature') || 
      c.label.toLowerCase().includes('resistance')
    );
    
    if (safetyCritical && safetyCritical.score < 70) {
      return `Most critical: ${safetyCritical.label} (score: ${safetyCritical.score}/100). ${safetyCritical.description}. This is the primary safety concern as it directly impacts health risks during use.`;
    }
    
    if (lowest && lowest.score < 60) {
      return `Primary concern: ${lowest.label} (score: ${lowest.score}/100). ${lowest.description}. This weakness may compromise product performance and safety over time.`;
    }
    
    if (highest && highest.score > 85) {
      return `Key strength: ${highest.label} (score: ${highest.score}/100). ${highest.description}. While effective in this area, health risks should be prioritized over performance.`;
    }
    
    return `Evaluated across ${criteria.length} effectiveness dimensions including ${sortedByScore.slice(0, 2).map(c => c.label).join(' and ')}. Performance characteristics are secondary to safety considerations.`;
  };

  // Generate health/toxicity summary
  const getToxicitySummary = () => {
    if (!evaluation.dimensions || evaluation.dimensions.length === 0) return null;
    
    const sortedDims = [...evaluation.dimensions].sort((a, b) => b.score - a.score);
    const highestRisk = sortedDims[0];
    const highRiskDims = sortedDims.filter(d => d.score >= 60);
    
    if (highestRisk && highestRisk.score >= 70) {
      const riskWord = highestRisk.score >= 80 ? 'severe' : highestRisk.score >= 70 ? 'significant' : 'moderate';
      const healthImpact = highestRisk.dimension === 'Carcinogenicity' 
        ? 'cancer risk' 
        : highestRisk.dimension === 'Endocrine Disruption'
        ? 'hormonal system disruption'
        : highestRisk.dimension === 'Reproductive Toxicity'
        ? 'reproductive health impacts'
        : highestRisk.dimension === 'Neurotoxicity'
        ? 'neurological effects'
        : 'health risks';
        
      const whyMatters = highestRisk.dimension === 'Carcinogenicity'
        ? 'Long-term exposure increases cancer risk, particularly for kidney and testicular cancers.'
        : highestRisk.dimension === 'Endocrine Disruption'
        ? 'Interferes with hormone function, affecting development, metabolism, and reproductive health.'
        : highestRisk.dimension === 'Reproductive Toxicity'
        ? 'Can impact fertility, pregnancy outcomes, and child development, especially in vulnerable populations.'
        : highestRisk.dimension === 'Neurotoxicity'
        ? 'May affect brain development and cognitive function, particularly concerning for children.'
        : 'Documented health impacts from peer-reviewed research.';
      
      return `Primary concern: ${highestRisk.dimension} (${highestRisk.score}/100 risk). ${whyMatters} ${highRiskDims.length > 1 ? `Additional concerns include ${highRiskDims.slice(1, 3).map(d => d.dimension.toLowerCase()).join(' and ')}.` : ''}`;
    }
    
    return `Evaluated across ${evaluation.dimensions.length} toxicological dimensions. Lower risk profiles are associated with safer alternatives that prioritize health over convenience.`;
  };

  const effectivenessSummary = getEffectivenessSummary();
  const toxicitySummary = getToxicitySummary();

  // Get display name for category
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Cookware': 'Pots & Pans',
      'Baby Products': 'Baby Bottles',
    };
    return categoryMap[category] || category;
  };

  // Get why-it-matters description for effectiveness criteria
  const getCriterionImportance = (label: string, category: string) => {
    const lowerLabel = label.toLowerCase();
    const lowerCategory = category.toLowerCase();
    
    if (lowerLabel.includes('temperature') || lowerLabel.includes('resistance')) {
      return 'Critical for safe cooking—prevents toxic fume release and ensures proper meat searing';
    }
    if (lowerLabel.includes('heat distribution')) {
      return 'Ensures even cooking—prevents burned spots and undercooked areas';
    }
    if (lowerLabel.includes('non-stick') || lowerLabel.includes('nonstick')) {
      return 'Affects food release and cooking quality—reduces need for excessive oils';
    }
    if (lowerLabel.includes('durability')) {
      return 'Determines lifespan and replacement frequency—impacts long-term value';
    }
    if (lowerLabel.includes('cleaning') || lowerLabel.includes('ease of')) {
      return 'Impacts daily usability—affects time and effort for maintenance';
    }
    if (lowerCategory.includes('baby') && (lowerLabel.includes('ease') || lowerLabel.includes('use'))) {
      return 'Affects convenience during feeding—impacts daily routine with babies';
    }
    if (lowerCategory.includes('baby') && lowerLabel.includes('portability')) {
      return 'Important for on-the-go feeding—affects travel and outings';
    }
    
    return 'Affects product performance and daily usability';
  };

  // Get why-it-matters description for toxicological dimensions
  const getDimensionImportance = (dimension: string) => {
    const lowerDim = dimension.toLowerCase();
    
    if (lowerDim.includes('carcinogenicity') || lowerDim.includes('cancer')) {
      return 'Long-term cancer risk—linked to kidney, testicular, and other cancers';
    }
    if (lowerDim.includes('endocrine') || lowerDim.includes('hormone')) {
      return 'Disrupts hormones—affects metabolism, development, and reproductive health';
    }
    if (lowerDim.includes('reproductive')) {
      return 'Impacts fertility and pregnancy—especially critical for expecting parents';
    }
    if (lowerDim.includes('neuro') || lowerDim.includes('brain')) {
      return 'Affects brain development—crucial for children and cognitive function';
    }
    if (lowerDim.includes('immune')) {
      return 'Weakens immune response—may reduce vaccine effectiveness';
    }
    if (lowerDim.includes('kidney') || lowerDim.includes('renal')) {
      return 'Damages kidney function—long-term exposure causes chronic issues';
    }
    if (lowerDim.includes('respiratory') || lowerDim.includes('asthma')) {
      return 'Triggers respiratory issues—worsens asthma and breathing problems';
    }
    
    return 'Documented health impacts from peer-reviewed research';
  };

  // Get t-shirt size for effectiveness criteria (lower score = more concerning = larger size)
  const getEffectivenessSize = (score: number, isSafetyCritical: boolean) => {
    // Safety-critical criteria get bumped up a size
    const adjustedScore = isSafetyCritical ? score - 15 : score;
    
    if (adjustedScore < 50) return 'XL'; // Very concerning
    if (adjustedScore < 65) return 'L';  // Concerning
    if (adjustedScore < 80) return 'M';  // Moderate
    return 'S'; // Good performance
  };

  // Get t-shirt size for health/toxicity dimensions (higher score = higher risk = larger size)
  const getToxicitySize = (score: number) => {
    if (score >= 75) return 'XL'; // Very high risk
    if (score >= 60) return 'L';  // High risk
    if (score >= 40) return 'M';  // Medium risk
    return 'S'; // Lower risk
  };

  return (
    <div className="mx-auto min-h-[100svh] w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-28 pt-6 sm:pt-10">
      {/* Back Link */}
      <Link
        href="/"
        className="text-sm text-slate-400 hover:text-slate-300 mb-6 inline-flex items-center gap-2 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to search
      </Link>

      {/* Above the Fold - Simple Summary */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
          {evaluation.name}
        </h1>

        {/* AITox Recommendation */}
        <div className="mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 backdrop-blur-xl p-6 sm:p-8 ring-1 ring-emerald-500/20 border border-emerald-500/30">
            <div className="mb-2">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">AITox Recommendation</span>
            </div>
            
            {/* Overall Approach Recommendation */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {approachRecommendation.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                {approachRecommendation.approach}
              </p>
            </div>

            {/* Specific Product Recommendation (Smaller) */}
            {topRecommendation && (
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="rounded-lg bg-emerald-500/20 p-2 border border-emerald-500/30 flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {topRecommendation.product.specificProduct || topRecommendation.product.name}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">
                      {topRecommendation.reason}
                    </p>
                    {topRecommendation.product.improvement > 0 && (
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">Toxicity Reduction:</span>
                          <span className="font-semibold text-emerald-300">{topRecommendation.product.improvement}%</span>
                        </div>
                        <span className="text-slate-600">•</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">Safety Score:</span>
                          <span className="font-semibold text-emerald-300">{topRecommendation.product.score}/100</span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`https://www.amazon.com/s?k=${encodeURIComponent(topRecommendation.product.specificProduct || topRecommendation.product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium py-2 px-4 transition-all text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Amazon
                      </a>
                      <a
                        href={`https://www.walmart.com/search?q=${encodeURIComponent(topRecommendation.product.specificProduct || topRecommendation.product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium py-2 px-4 transition-all text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Walmart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Risk Assessment (if no recommendation) */}
        {!topRecommendation && (
          <div className="mb-6">
            <div className="rounded-xl bg-white/5 backdrop-blur-xl p-5 ring-1 ring-white/10 border border-white/5">
              <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 border flex-shrink-0 ${
                  evaluation.riskLevel === "very-high" || evaluation.overallScore >= 75
                    ? "bg-rose-500/20 border-rose-500/30"
                    : evaluation.riskLevel === "high" || evaluation.overallScore >= 60
                    ? "bg-orange-500/20 border-orange-500/30"
                    : evaluation.riskLevel === "medium" || evaluation.overallScore >= 40
                    ? "bg-amber-500/20 border-amber-500/30"
                    : "bg-emerald-500/20 border-emerald-500/30"
                }`}>
                  <svg className={`w-5 h-5 ${
                    evaluation.riskLevel === "very-high" || evaluation.overallScore >= 75
                      ? "text-rose-300"
                      : evaluation.riskLevel === "high" || evaluation.overallScore >= 60
                      ? "text-orange-300"
                      : evaluation.riskLevel === "medium" || evaluation.overallScore >= 40
                      ? "text-amber-300"
                      : "text-emerald-300"
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">Risk Assessment</h2>
                  <p className="text-base text-white font-medium mb-1">{evaluation.riskLevel.replace("-", " ").toUpperCase()} Risk</p>
                  <p className="text-sm text-slate-300">{evaluation.summary.split('.')[0]}.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Types of Products that Experts Recommend */}
        {evaluation.recommendations && evaluation.recommendations.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Types of {getCategoryDisplayName(evaluation.category || 'Products')} that Experts Recommend
              </h2>
              <span className="text-xs text-slate-400">{evaluation.recommendations.length} options</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {evaluation.recommendations.map((rec: any) => (
                <div
                  key={rec.id}
                  className="rounded-xl bg-white/5 backdrop-blur-xl p-4 ring-1 ring-white/10 border border-white/5 hover:bg-white/8 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        {rec.preference && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                            {rec.preference}
                          </span>
                        )}
                        {rec.product.verified && (
                          <span className="text-xs text-emerald-300">✓</span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-white leading-snug mb-1">
                        {rec.product.name}
                      </h3>
                      {rec.preferenceDescription && (
                        <p className="text-xs text-slate-400 mb-1">{rec.preferenceDescription}</p>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-bold border flex-shrink-0 ${
                      rec.product.score <= 25
                        ? "text-emerald-300 bg-emerald-500/20 border-emerald-500/30"
                        : rec.product.score <= 50
                        ? "text-amber-300 bg-amber-500/20 border-amber-500/30"
                        : "text-orange-300 bg-orange-500/20 border-orange-500/30"
                    }`}>
                      {rec.product.score}
                    </div>
                  </div>

                  {/* Improvement */}
                  {rec.product.improvement > 0 && (
                    <div className="mb-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-emerald-300">↑</span>
                        <span className="text-xs font-semibold text-emerald-300">{rec.product.improvement}% safer</span>
                      </div>
                    </div>
                  )}

                  {/* Top Benefits */}
                  {rec.product.keyBenefits && rec.product.keyBenefits.length > 0 && (
                    <div className="mb-2">
                      <div className="space-y-1">
                        {rec.product.keyBenefits.slice(0, 2).map((benefit: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <span className="text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                            <span className="leading-tight">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Reduction */}
                  {rec.dimensionComparison && rec.dimensionComparison.length > 0 && (
                    <div className="mb-3 pt-2 border-t border-white/10">
                      <div className="text-xs text-slate-400 mb-1">Risk reduction:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.dimensionComparison.slice(0, 2).map((comp: any, idx: number) => (
                          <div key={idx} className="text-xs text-slate-300">
                            <span className="text-slate-500 line-through">{comp.currentScore}</span>
                            <span className="text-emerald-300 mx-1">→</span>
                            <span className="text-emerald-300 font-medium">{comp.recommendedScore}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-1.5 pt-2 border-t border-white/10">
                    <Link
                      href={`/product/${rec.product.id}`}
                      className="flex-1 text-center rounded-lg bg-white/10 hover:bg-white/15 px-2 py-1.5 text-xs font-semibold text-white transition-all"
                    >
                      Details
                    </Link>
                    <a
                      href="#"
                      className="flex-1 text-center rounded-lg bg-white text-slate-900 hover:bg-slate-50 px-2 py-1.5 text-xs font-semibold transition-all"
                    >
                      Shop
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Criteria that Matter */}
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Criteria that Matter
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Effectiveness Summary */}
            {effectivenessSummary && (
            <div className="rounded-xl bg-white/5 backdrop-blur-xl p-4 ring-1 ring-white/10 border border-white/5">
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Effectiveness
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {effectivenessSummary}
              </p>
              
              {/* Ranked Criteria List */}
              {evaluation.effectivenessCriteria && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Criteria by Importance
                  </div>
                  <div className="space-y-1.5">
                    {Object.values(evaluation.effectivenessCriteria)
                      .sort((a: any, b: any) => {
                        // Sort by score (lower = more concerning for effectiveness)
                        // But prioritize safety-related criteria
                        const aSafety = a.label.toLowerCase().includes('temperature') || a.label.toLowerCase().includes('resistance') ? -20 : 0;
                        const bSafety = b.label.toLowerCase().includes('temperature') || b.label.toLowerCase().includes('resistance') ? -20 : 0;
                        return (a.score + aSafety) - (b.score + bSafety);
                      })
                      .map((criterion: any, idx: number) => {
                        const importance = getCriterionImportance(criterion.label, evaluation.category);
                        const isSafetyCritical = criterion.label.toLowerCase().includes('temperature') || criterion.label.toLowerCase().includes('resistance');
                        const size = getEffectivenessSize(criterion.score, isSafetyCritical);
                        const sizeColor = size === 'XL' 
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : size === 'L'
                          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                          : size === 'M'
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
                        
                        const criterionKey = `${idx}-${criterion.label}`;
                        const isExpanded = expandedCriteria.has(criterionKey);
                        const criterionSlug = criterion.label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        const researchLink = `/research/criteria/${evaluation.category.toLowerCase().replace(/\s+/g, '-')}/${criterionSlug}`;
                        
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <span className={`px-2 py-0.5 rounded font-bold text-xs border flex-shrink-0 ${sizeColor}`}>
                                {size}
                              </span>
                              <span className="text-slate-300 font-medium flex-1">{criterion.label}</span>
                              <button
                                onClick={() => {
                                  const newSet = new Set(expandedCriteria);
                                  if (isExpanded) {
                                    newSet.delete(criterionKey);
                                  } else {
                                    newSet.add(criterionKey);
                                  }
                                  setExpandedCriteria(newSet);
                                }}
                                className="text-slate-400 hover:text-slate-300 transition-colors flex-shrink-0"
                                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                              >
                                <svg 
                                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                            <p className="text-xs text-slate-400 leading-tight ml-14">{importance}</p>
                            {isExpanded && (
                              <div className="ml-14 mt-2 p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                                <p className="text-xs text-slate-300">{criterion.description || 'Detailed evaluation based on peer-reviewed research and expert assessments.'}</p>
                                <a
                                  href={researchLink}
                                  className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
                                >
                                  <span>View research deep-dive</span>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Health/Toxicity Summary */}
          {toxicitySummary && (
            <div className="rounded-xl bg-white/5 backdrop-blur-xl p-4 ring-1 ring-white/10 border border-white/5">
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Health & Toxicity
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {toxicitySummary}
              </p>
              
              {/* Ranked Dimensions List */}
              {evaluation.dimensions && evaluation.dimensions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Dimensions by Risk Level
                  </div>
                  <div className="space-y-1.5">
                    {[...evaluation.dimensions]
                      .sort((a, b) => b.score - a.score)
                      .map((dim, idx) => {
                        const importance = getDimensionImportance(dim.dimension);
                        const size = getToxicitySize(dim.score);
                        const sizeColor = size === 'XL' 
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : size === 'L'
                          ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                          : size === 'M'
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
                        
                        const isExpanded = expandedDimensions.has(idx);
                        const dimensionSlug = dim.dimension.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        const researchLink = `/research/dimensions/${evaluation.category.toLowerCase().replace(/\s+/g, '-')}/${dimensionSlug}`;
                        
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <span className={`px-2 py-0.5 rounded font-bold text-xs border flex-shrink-0 ${sizeColor}`}>
                                {size}
                              </span>
                              <span className="text-slate-300 font-medium flex-1">{dim.dimension}</span>
                              <button
                                onClick={() => {
                                  const newSet = new Set(expandedDimensions);
                                  if (isExpanded) {
                                    newSet.delete(idx);
                                  } else {
                                    newSet.add(idx);
                                  }
                                  setExpandedDimensions(newSet);
                                }}
                                className="text-slate-400 hover:text-slate-300 transition-colors flex-shrink-0"
                                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                              >
                                <svg 
                                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                            <p className="text-xs text-slate-400 leading-tight ml-14">{importance}</p>
                            {isExpanded && (
                              <div className="ml-14 mt-2 p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                                <p className="text-xs text-slate-300">
                                  {dim.evidence?.summary || 'Comprehensive toxicological assessment based on peer-reviewed studies, regulatory databases, and expert analysis.'}
                                </p>
                                {dim.evidence?.keyFindings && dim.evidence.keyFindings.length > 0 && (
                                  <div className="space-y-1">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Findings:</p>
                                    <ul className="space-y-1">
                                      {dim.evidence.keyFindings.slice(0, 3).map((finding: string, fIdx: number) => (
                                        <li key={fIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                                          <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                                          <span>{finding}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                <a
                                  href={researchLink}
                                  className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
                                >
                                  <span>View research deep-dive</span>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
        </section>
      </div>




      {/* Expert-Recommended Products */}
      {evaluation.recommendations && evaluation.recommendations.length > 0 && (
        <section className="mt-12 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Expert-Recommended Products
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Specific products our toxicology experts recommend, with verified safety profiles and direct purchase links.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {evaluation.recommendations.map((rec: any) => (
              <article
                key={rec.id}
                className="rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 border border-white/5 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 lg:p-8">
                  {/* Left: Product Image */}
                  <div className="lg:col-span-1">
                    {rec.product.imageUrl && (
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                        <img
                          src={rec.product.imageUrl}
                          alt={rec.product.specificProduct || rec.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Header: Best For */}
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          {rec.preferenceDescription && (
                            <div className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-2">
                              Best For
                            </div>
                          )}
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                            {rec.product.specificProduct || rec.product.name}
                          </h3>
                          {rec.product.specificProduct && rec.product.name !== rec.product.specificProduct && (
                            <p className="text-base text-slate-400 mb-2">{rec.product.name}</p>
                          )}
                          {rec.preferenceDescription && (
                            <p className="text-lg text-slate-300 leading-relaxed">
                              {rec.preferenceDescription}
                            </p>
                          )}
                        </div>
                        {rec.product.verified && (
                          <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                              ✓ Verified
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Why We Like It */}
                      <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                          Why We Like It
                        </h4>
                        <p className="text-base text-slate-200 leading-relaxed">{rec.reason}</p>
                      </div>
                    </div>

                    {/* Health & Safety Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Overall Safety Score */}
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                          Safety Score
                        </div>
                        <div className="text-3xl font-bold text-emerald-300 mb-1">
                          {rec.product.score}
                          <span className="text-lg text-emerald-400">/100</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {rec.product.improvement > 0 ? `${rec.product.improvement}% safer than current` : 'Lower is better'}
                        </div>
                      </div>

                      {/* Risk Reduction */}
                      {rec.dimensionComparison && rec.dimensionComparison.length > 0 && (
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Risk Reduction
                          </div>
                          <div className="space-y-2">
                            {rec.dimensionComparison.slice(0, 2).map((comp: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">{comp.dimension}:</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-500 line-through text-xs">{comp.currentScore}</span>
                                  <span className="text-emerald-300 font-semibold">→ {comp.recommendedScore}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Key Features / Pros */}
                    {rec.product.keyBenefits && rec.product.keyBenefits.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {rec.product.keyBenefits.map((benefit: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pricing & Availability */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      {rec.product.priceRange && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{rec.product.priceRange}</span>
                        </div>
                      )}
                      {rec.product.availability && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{rec.product.availability}</span>
                        </div>
                      )}
                    </div>

                      {/* Buy Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <a
                          href={`https://www.amazon.com/s?k=${encodeURIComponent(rec.product.specificProduct || rec.product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold py-3 px-4 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Amazon
                        </a>
                        <a
                          href={`https://www.walmart.com/search?q=${encodeURIComponent(rec.product.specificProduct || rec.product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold py-3 px-4 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Walmart
                        </a>
                      </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Methodology & Transparency Link */}
      <div className="mt-12">
        <Link
          href="/methodology"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Evaluation Methodology & Transparency</span>
        </Link>
      </div>
    </div>
  );
}


