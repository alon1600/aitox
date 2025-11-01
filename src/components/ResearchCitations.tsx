"use client";

interface Citation {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  keyFindings: string;
  relevanceScore: number; // 0-100
  // Extended fields (optional, from catalogue)
  studyType?: string;
  impactScore?: number;
  isSeminal?: boolean;
  methodologicalQuality?: string;
  regulatoryImpact?: string[];
  chemicals?: string[];
}

interface ResearchCitationsProps {
  citations: Citation[];
  dimension?: string;
}

const STUDY_TYPE_LABELS: Record<string, string> = {
  'epidemiological': 'Epidemiological',
  'experimental': 'Experimental',
  'meta-analysis': 'Meta-Analysis',
  'review': 'Systematic Review',
  'case-control': 'Case-Control',
  'cohort': 'Cohort Study'
};

export function ResearchCitations({
  citations,
  dimension,
}: ResearchCitationsProps) {
  if (citations.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-5 sm:p-6 ring-1 ring-white/10 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {dimension ? `Key ${dimension} Studies` : "Research Citations"}
          </h3>
          <span className="text-xs text-slate-500">Most relevant for this dimension</span>
        </div>
        <span className="text-xs text-slate-400">
          {citations.length} {citations.length === 1 ? "study" : "studies"}
        </span>
      </div>

      <div className="space-y-4">
        {citations
          .sort((a, b) => (b.impactScore || b.relevanceScore) - (a.impactScore || a.relevanceScore))
          .map((citation) => (
            <div
              key={citation.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold text-slate-100 leading-snug flex-1">
                  {citation.title}
                </h4>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {citation.isSeminal && (
                    <div className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                      <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                        Seminal
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">
                    Impact: {citation.impactScore || citation.relevanceScore}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 mb-2">
                <div className="font-medium">{citation.authors.join(", ")}</div>
                <div className="text-slate-400 mt-1">
                  {citation.journal} ({citation.year})
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                {citation.studyType && (
                  <span className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {STUDY_TYPE_LABELS[citation.studyType] || citation.studyType}
                  </span>
                )}
                {citation.methodologicalQuality && (
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      citation.methodologicalQuality === 'high' ? 'bg-emerald-400' :
                      citation.methodologicalQuality === 'medium' ? 'bg-amber-400' :
                      'bg-slate-400'
                    }`}></div>
                    <span className="text-xs text-slate-400 capitalize">
                      {citation.methodologicalQuality} quality
                    </span>
                  </div>
                )}
              </div>

              {citation.keyFindings && (
                <p className="text-xs text-slate-200 leading-relaxed mt-2 pt-2 border-t border-white/10">
                  <span className="font-semibold text-white">Key Finding: </span>
                  {citation.keyFindings}
                </p>
              )}

              {citation.regulatoryImpact && citation.regulatoryImpact.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1 mb-1">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs font-semibold text-emerald-300">Regulatory Impact</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {citation.regulatoryImpact.slice(0, 2).map((impact, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-slate-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded"
                      >
                        {impact}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
                {citation.doi && (
                  <a
                    href={`https://doi.org/${citation.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-300 hover:text-cyan-200 underline flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    DOI
                  </a>
                )}
                {citation.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-300 hover:text-cyan-200 underline flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    PubMed
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-slate-400 leading-relaxed">
          These are the most consequential studies for this health dimension. See the comprehensive Research Library below for all relevant research.
        </p>
      </div>
    </div>
  );
}

