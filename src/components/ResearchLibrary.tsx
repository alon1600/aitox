"use client";

interface ExtendedCitation {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  keyFindings: string;
  relevanceScore: number;
  studyType?: string;
  chemicals?: string[];
  toxicologicalDimensions?: string[];
  impactScore?: number;
  isSeminal?: boolean;
  methodologicalQuality?: string;
  regulatoryImpact?: string[];
}

interface ResearchLibraryProps {
  studies: ExtendedCitation[];
  stats?: {
    totalStudies: number;
    seminalStudies: number;
    highImpactStudies: number;
    chemicalsCovered?: string[];
    dimensionsCovered?: string[];
  };
  productName?: string;
}

const STUDY_TYPE_LABELS: Record<string, string> = {
  'epidemiological': 'Epidemiological',
  'experimental': 'Experimental',
  'meta-analysis': 'Meta-Analysis',
  'review': 'Systematic Review',
  'case-control': 'Case-Control',
  'cohort': 'Cohort Study'
};

export function ResearchLibrary({
  studies,
  stats,
  productName
}: ResearchLibraryProps) {
  if (!studies || studies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Research Library
          </h2>
          <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              {stats?.totalStudies || studies.length} Studies
            </span>
          </div>
          {stats?.seminalStudies > 0 && (
            <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                {stats.seminalStudies} Seminal
              </span>
            </div>
          )}
        </div>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl mb-4">
          Comprehensive collection of peer-reviewed research studies evaluating the toxicological safety of {productName || 'this product'}. This library includes additional studies beyond those highlighted in the dimension-specific sections above. Studies are sorted by impact and relevance.
        </p>
        
        {stats && (
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
            {stats.highImpactStudies > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>{stats.highImpactStudies} high-impact studies (≥90)</span>
              </div>
            )}
            {stats.chemicalsCovered && stats.chemicalsCovered.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600">•</span>
                <span>Covering {stats.chemicalsCovered.length} chemicals</span>
              </div>
            )}
            {stats.dimensionsCovered && stats.dimensionsCovered.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600">•</span>
                <span>{stats.dimensionsCovered.length} health dimensions</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {studies.map((study) => (
          <div
            key={study.id}
            className="rounded-xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 border border-white/5 hover:bg-white/8 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-white leading-snug mb-2">
                  {study.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="text-xs text-slate-300">
                    <span className="font-medium">{study.authors.join(", ")}</span>
                    <span className="text-slate-500 ml-2">
                      {study.journal} ({study.year})
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {study.isSeminal && (
                  <div className="px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                    <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      Seminal
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">
                    Impact: {study.impactScore || study.relevanceScore}
                  </div>
                </div>
              </div>
            </div>

            {study.keyFindings && (
              <div className="mb-3 pt-3 border-t border-white/10">
                <p className="text-sm text-slate-200 leading-relaxed">
                  <span className="font-semibold text-white">Key Findings: </span>
                  {study.keyFindings}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-3 pt-3 border-t border-white/10">
              {study.studyType && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs text-slate-400">
                    {STUDY_TYPE_LABELS[study.studyType] || study.studyType}
                  </span>
                </div>
              )}
              
              {study.methodologicalQuality && (
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${
                    study.methodologicalQuality === 'high' ? 'bg-emerald-400' :
                    study.methodologicalQuality === 'medium' ? 'bg-amber-400' :
                    'bg-slate-400'
                  }`}></div>
                  <span className="text-xs text-slate-400 capitalize">
                    {study.methodologicalQuality} quality
                  </span>
                </div>
              )}

              {study.chemicals && study.chemicals.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="text-xs text-slate-400">
                    {study.chemicals.slice(0, 3).join(", ")}
                    {study.chemicals.length > 3 && ` +${study.chemicals.length - 3}`}
                  </span>
                </div>
              )}
            </div>

            {study.regulatoryImpact && study.regulatoryImpact.length > 0 && (
              <div className="mb-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                    Regulatory Impact
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {study.regulatoryImpact.map((impact, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-slate-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded"
                    >
                      {impact}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pt-3 border-t border-white/10">
              {study.doi && (
                <a
                  href={`https://doi.org/${study.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-300 hover:text-cyan-200 underline flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  DOI: {study.doi}
                </a>
              )}
              {study.pmid && (
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-300 hover:text-cyan-200 underline flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  PubMed: {study.pmid}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl p-4 sm:p-5 ring-1 ring-white/10">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-indigo-500/20 p-2 border border-indigo-500/30 flex-shrink-0">
            <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">Verified Research:</span> All studies in this library are from peer-reviewed journals and have been verified for scientific rigor by our toxicology team. Studies are automatically matched based on chemicals, product categories, and health dimensions relevant to this product.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

