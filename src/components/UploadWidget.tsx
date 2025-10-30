"use client";

import React, { useRef, useState } from "react";

type PreviewItem = {
  url: string;
  type: string;
};

interface UploadWidgetProps {
  onFilesSelected?: (files: File[]) => void;
}

export function UploadWidget({ onFilesSelected }: UploadWidgetProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setPreviews(
      files.map((f) => ({ url: URL.createObjectURL(f), type: f.type }))
    );
    onFilesSelected?.(files);
  }

  return (
    <div className="rounded-3xl glass p-4 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-3">
        <button
          className="flex-1 rounded-2xl bg-white/10 px-4 py-3 font-semibold ring-1 ring-white/10 hover:bg-white/15"
          onClick={() => inputRef.current?.click()}
        >
          Choose photos/videos
        </button>
        <label className="flex-1">
          <span className="sr-only">Capture using camera</span>
          <input
            className="hidden"
            type="file"
            accept="image/*,video/*"
            capture="environment"
            multiple
            onChange={handleSelect}
          />
          <div className="cursor-pointer rounded-2xl bg-white/10 px-4 py-3 text-center font-semibold ring-1 ring-white/10 hover:bg-white/15">
            Use camera
          </div>
        </label>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleSelect}
      />

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {previews.slice(0, 9).map((p, i) => (
            <div key={i} className="overflow-hidden rounded-xl ring-1 ring-white/10">
              {p.type.startsWith("video/") ? (
                <video src={p.url} className="h-24 w-full object-cover" muted />
              ) : (
                <img src={p.url} className="h-24 w-full object-cover" alt="preview" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


