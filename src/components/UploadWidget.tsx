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
  const cameraRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files ?? []);
    if (newFiles.length === 0) return;
    
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    setPreviews(
      updatedFiles.map((f) => ({ url: URL.createObjectURL(f), type: f.type }))
    );
    onFilesSelected?.(updatedFiles);
  }

  function removeFile(index: number) {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    
    // Clean up object URLs
    URL.revokeObjectURL(previews[index].url);
    
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFilesSelected?.(updatedFiles);
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
        <button
          onClick={() => cameraRef.current?.click()}
          className="flex-1 rounded-2xl bg-white/10 px-4 py-3 font-semibold ring-1 ring-white/10 hover:bg-white/15"
        >
          Use camera
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleSelect}
      />
      
      <input
        ref={cameraRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={handleSelect}
      />

      {previews.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">
              {previews.length} {previews.length === 1 ? "file" : "files"} selected
            </p>
            <button
              onClick={() => {
                setFiles([]);
                previews.forEach(p => URL.revokeObjectURL(p.url));
                setPreviews([]);
                onFilesSelected?.([]);
              }}
              className="text-xs text-slate-400 hover:text-slate-300"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {previews.map((p, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl ring-1 ring-white/10">
                {p.type.startsWith("video/") ? (
                  <video src={p.url} className="h-24 w-full object-cover" muted />
                ) : (
                  <img src={p.url} className="h-24 w-full object-cover" alt="preview" />
                )}
                <button
                  onClick={() => removeFile(i)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


