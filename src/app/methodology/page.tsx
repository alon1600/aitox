"use client";

import Link from "next/link";

export default function MethodologyPage() {
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
        Back to home
      </Link>

      {/* Methodology & Transparency Section */}
      <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 ring-1 ring-white/10 border border-white/5">
        <div className="flex items-start gap-4 mb-6">
          <div className="rounded-xl bg-indigo-500/20 p-3 border border-indigo-500/30">
            <svg className="w-6 h-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Evaluation Methodology & Transparency
            </h1>
            <p className="text-base text-slate-400 mb-4">
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
    </div>
  );
}

