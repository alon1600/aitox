"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type DetectedProduct = {
  name: string;
  category: string;
  riskLevel: "low" | "medium" | "high";
  concerns: string[];
  saferAlternative: string;
};

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing scan...");
  const [detectedProducts, setDetectedProducts] = useState<DetectedProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scanId = searchParams.get("scanId");
    if (!scanId) {
      router.push("/upload");
      return;
    }

    // Simulate processing progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Update status messages
    const statusMessages = [
      "Analyzing images...",
      "Detecting products...",
      "Identifying ingredients...",
      "Cross-referencing safety data...",
      "Generating recommendations...",
    ];

    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      if (statusIndex < statusMessages.length - 1) {
        setStatus(statusMessages[statusIndex]);
        statusIndex++;
      }
    }, 800);

    // Fetch scan results
    const fetchResults = async () => {
      try {
        // In production, poll the API or use WebSockets
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Get results from localStorage (set by upload page)
        const storedResults = localStorage.getItem(`scan_${scanId}`);
        if (storedResults) {
          const results = JSON.parse(storedResults);
          setDetectedProducts(results.detectedProducts || []);
        }

        setProgress(100);
        setStatus("Analysis complete!");
        
        setTimeout(() => {
          router.push(`/recommendations?scanId=${scanId}`);
        }, 1000);
      } catch (err) {
        setError("Failed to process scan. Please try again.");
        clearInterval(progressInterval);
        clearInterval(statusInterval);
      }
    };

    fetchResults();

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [searchParams, router]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10">
      <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
        Analyzing your home
      </h1>

      <div className="mt-8 flex flex-col items-center">
        {/* Progress Circle */}
        <div className="relative w-32 h-32 mb-8">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-white/10"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              className="text-fuchsia-400 transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Status Text */}
        <p className="text-lg text-slate-300 mb-6 text-center">{status}</p>

        {/* Error Message */}
        {error && (
          <div className="w-full rounded-2xl bg-red-500/10 border border-red-500/20 p-4 mb-6">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => router.push("/upload")}
              className="mt-3 w-full rounded-xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Detected Products Preview */}
        {detectedProducts.length > 0 && (
          <div className="w-full mt-6">
            <p className="text-sm font-semibold text-slate-400 mb-3">Detected items:</p>
            <div className="space-y-2">
              {detectedProducts.slice(0, 3).map((product, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10 flex items-center justify-between"
                >
                  <span className="text-sm text-slate-300">{product.name}</span>
                  <span className={`text-xs font-semibold ${getRiskColor(product.riskLevel)}`}>
                    {product.riskLevel.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10 items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <ProcessingContent />
    </Suspense>
  );
}

