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
}

interface ResearchCitationsProps {
  citations: Citation[];
  dimension?: string;
}

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
        <h3 className="text-base sm:text-lg font-semibold text-white">
          {dimension ? `${dimension} Research` : "Research Citations"}
        </h3>
        <span className="text-xs text-slate-400">
          {citations.length} {citations.length === 1 ? "study" : "studies"}
        </span>
      </div>

      <div className="space-y-4">
        {citations
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .map((citation) => (
            <div
              key={citation.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold text-slate-100 leading-snug flex-1">
                  {citation.title}
                </h4>
                <div className="flex-shrink-0">
                  <div className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">
                    {citation.relevanceScore}% relevant
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 mb-2">
                <div className="font-medium">{citation.authors.join(", ")}</div>
                <div className="text-slate-400 mt-1">
                  {citation.journal} ({citation.year})
                </div>
              </div>

              {citation.keyFindings && (
                <p className="text-xs text-slate-200 leading-relaxed mt-2 pt-2 border-t border-white/10">
                  {citation.keyFindings}
                </p>
              )}

              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
                {citation.doi && (
                  <a
                    href={`https://doi.org/${citation.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-300 hover:text-cyan-200 underline"
                  >
                    DOI: {citation.doi}
                  </a>
                )}
                {citation.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-300 hover:text-cyan-200 underline"
                  >
                    PubMed: {citation.pmid}
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-slate-400 leading-relaxed">
          All citations are from peer-reviewed journals and have been verified
          for scientific rigor by our toxicology team.
        </p>
      </div>
    </div>
  );
}

