"use client";

import React, { useRef, useState } from "react";
import { CameraCapture } from "./CameraCapture";

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
  const [files, setFiles] = useState<File[]>([]);
  const [showCamera, setShowCamera] = useState(false);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files ?? []);
    if (newFiles.length === 0) return;
    
    addFiles(newFiles);
    
    // Reset input to allow selecting same file again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function addFiles(newFiles: File[]) {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    // Create previews for new files
    const newPreviews = newFiles.map((f) => ({
      url: URL.createObjectURL(f),
      type: f.type,
    }));
    
    setPreviews([...previews, ...newPreviews]);
    onFilesSelected?.(updatedFiles);
  }

  function handleCameraCapture(file: File) {
    addFiles([file]);
    setShowCamera(false);
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

  function clearAll() {
    previews.forEach(p => URL.revokeObjectURL(p.url));
    setFiles([]);
    setPreviews([]);
    onFilesSelected?.([]);
  }

  return (
    <>
      <div className="rounded-3xl glass p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-3">
          {/* Upload from gallery */}
          <button
            className="flex-1 rounded-2xl bg-white/10 px-4 py-3 font-semibold text-slate-200 ring-1 ring-white/10 hover:bg-white/15 transition-colors active:scale-[0.98]"
            onClick={() => inputRef.current?.click()}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Gallery</span>
            </div>
          </button>

          {/* Camera button */}
          <button
            onClick={() => setShowCamera(true)}
            className="flex-1 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-900 ring-1 ring-white/10 hover:bg-slate-50 transition-colors active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Camera</span>
            </div>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={handleSelect}
        />

        {/* Preview grid */}
        {previews.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">
                {previews.length} {previews.length === 1 ? "file" : "files"} selected
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {previews.map((p, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 aspect-square">
                  {p.type.startsWith("video/") ? (
                    <video src={p.url} className="h-full w-full object-cover" muted />
                  ) : (
                    <img src={p.url} className="h-full w-full object-cover" alt={`Preview ${i + 1}`} />
                  )}
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation"
                  >
                    <span className="text-white text-2xl font-bold">×</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  );
}
