"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  riskLevel: string;
  overallScore: number;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      setResults([]);
      setError(null);
      return;
    }

    async function performSearch() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Search failed' }));
          throw new Error(errorData.error || 'Search failed');
        }
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  const getRiskScore = (riskLevel: string): "low" | "medium" | "high" => {
    if (riskLevel === 'very-high' || riskLevel === 'high') return 'high';
    if (riskLevel === 'medium') return 'medium';
    return 'low';
  };

  return (
    <div className="mx-auto min-h-[100svh] w-full max-w-4xl px-6 pb-28 pt-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-slate-400 hover:text-slate-300 mb-4 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-slate-400">
            Results for: <span className="text-slate-200 font-medium">"{query}"</span>
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30 mx-auto mb-4"></div>
            <p className="text-slate-300">Searching...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-2xl bg-rose-500/20 border border-rose-500/30 p-6">
          <h2 className="text-xl font-semibold text-rose-300 mb-2">
            Error
          </h2>
          <p className="text-slate-300">{error}</p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          {query && results.length === 0 ? (
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-8 ring-1 ring-white/10 border border-white/5 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-white mb-2">
                No products found
              </h2>
              <p className="text-slate-300 mb-6">
                We couldn't find any products matching "{query}". Try different search terms.
              </p>
              <Link
                href="/"
                className="inline-block rounded-xl bg-white/10 hover:bg-white/15 px-6 py-3 font-semibold text-white"
              >
                Back to search
              </Link>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-slate-400 mb-6">
                Found {results.length} {results.length === 1 ? 'product' : 'products'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result) => {
                  const score = getRiskScore(result.riskLevel);
                  return (
                    <ProductCard
                      key={result.id}
                      id={result.id}
                      name={result.name}
                      score={score}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            !query && (
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-8 ring-1 ring-white/10 border border-white/5 text-center">
                <div className="text-4xl mb-4">🔎</div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Enter a search query
                </h2>
                <p className="text-slate-300 mb-6">
                  Search for products to see their toxicological evaluations.
                </p>
                <Link
                  href="/"
                  className="inline-block rounded-xl bg-white/10 hover:bg-white/15 px-6 py-3 font-semibold text-white"
                >
                  Go to home
                </Link>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto min-h-[100svh] w-full max-w-4xl px-6 pb-28 pt-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}

