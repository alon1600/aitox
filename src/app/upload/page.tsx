"use client";

import { useRouter } from "next/navigation";
import { UploadWidget } from "@/components/UploadWidget";
import { useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col px-6 pb-28 pt-10">
      <h1 className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-2xl font-extrabold text-transparent">
        Scan your home
      </h1>
      <p className="mt-2 text-slate-300">
        Upload clear photos or short videos of rooms and cabinets. We’ll
        identify items and generate safer replacements.
      </p>

      <div className="mt-5">
        <UploadWidget onFilesSelected={(files) => setSelectedCount(files.length)} />
      </div>

      <button
        disabled={selectedCount === 0}
        onClick={() => router.push("/recommendations")}
        className="mt-5 w-full rounded-2xl bg-white py-3 font-semibold text-slate-900 ring-1 ring-white/10 disabled:cursor-not-allowed disabled:bg-white/40"
      >
        Analyze {selectedCount > 0 ? `(${selectedCount})` : ""}
      </button>

      <p className="mt-3 text-xs text-slate-400">
        Processing runs locally first; cloud analysis is optional for higher
        accuracy.
      </p>
    </div>
  );
}


