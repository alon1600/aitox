"use client";

import { useRouter } from "next/navigation";
import { UploadWidget } from "@/components/UploadWidget";
import { useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Create FormData for API
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Call scan API
      const response = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process scan");
      }

      const result = await response.json();

      // Store results in localStorage
      const scanId = result.scanId;
      localStorage.setItem(`scan_${scanId}`, JSON.stringify(result));

      // Store in scan history
      const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      history.unshift({
        scanId,
        timestamp: result.timestamp,
        productCount: result.detectedProducts?.length || 0,
      });
      localStorage.setItem("scanHistory", JSON.stringify(history.slice(0, 50)));

      // Navigate to processing page
      router.push(`/upload/processing?scanId=${scanId}`);
    } catch (err) {
      setError("Failed to process your images. Please try again.");
      setIsProcessing(false);
      console.error("Scan error:", err);
    }
  };

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10">
      <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
        Scan your home
      </h1>
      <p className="mt-2 text-slate-300">
        Upload clear photos or short videos of rooms and cabinets. We'll
        identify items and generate safer replacements.
      </p>

      <div className="mt-6">
        <UploadWidget onFilesSelected={handleFilesSelected} />
      </div>

      {error && (
        <div className="mt-4 rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <button
        disabled={selectedFiles.length === 0 || isProcessing}
        onClick={handleAnalyze}
        className="mt-6 w-full rounded-2xl bg-white py-3 font-semibold text-slate-900 ring-1 ring-white/10 disabled:cursor-not-allowed disabled:bg-white/40 disabled:text-slate-500 hover:bg-slate-50 transition-colors"
      >
        {isProcessing ? "Processing..." : `Analyze ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}`}
      </button>

      <div className="mt-6 space-y-3 text-xs text-slate-400">
        <p>
          <span className="font-semibold">Tips for best results:</span>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use clear, well-lit photos</li>
          <li>Focus on product labels when possible</li>
          <li>Capture multiple angles for better detection</li>
        </ul>
        <p className="mt-4">
          Processing runs locally first; cloud analysis is optional for higher
          accuracy.
        </p>
      </div>
    </div>
  );
}


