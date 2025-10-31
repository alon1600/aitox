"use client";

import React, { useRef, useState, useEffect } from "react";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const mimeTypeRef = useRef<string>('video/webm');
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setError(null);
      
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera not supported on this device");
        setHasPermission(false);
        return;
      }

      // Stop existing stream if any
      if (streamRef.current) {
        stopCamera();
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setHasPermission(true);
    } catch (err) {
      console.error("Camera error:", err);
      setHasPermission(false);
      
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setError("Camera permission denied. Please enable camera access in settings.");
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          setError("No camera found on this device.");
        } else {
          setError("Failed to access camera. Please try again.");
        }
      } else {
        setError("Camera access failed.");
      }
    }
  };

  const stopCamera = () => {
    // Stop recording if active
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    recorderRef.current = null;
    recordedChunksRef.current = [];
  };

  const startRecording = () => {
    if (!streamRef.current || !videoRef.current) return;

    try {
      recordedChunksRef.current = [];
      
      // Try different mime types for browser compatibility
      const mimeTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
        'video/mp4',
      ];
      
      mimeTypeRef.current = 'video/webm';
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          mimeTypeRef.current = mimeType;
          break;
        }
      }
      
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: mimeTypeRef.current,
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const fileExtension = mimeTypeRef.current.includes('mp4') ? 'mp4' : 'webm';
        const blob = new Blob(recordedChunksRef.current, { type: mimeTypeRef.current.split(';')[0] });
        const file = new File([blob], `video-${Date.now()}.${fileExtension}`, {
          type: mimeTypeRef.current.split(';')[0],
        });
        setIsCapturing(false);
        onCapture(file);
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError('Failed to record video. Please try again.');
        setIsRecording(false);
        setIsCapturing(false);
      };

      recorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setIsCapturing(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Video recording not supported on this device.');
      setIsRecording(false);
      setIsCapturing(false);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black" style={{ WebkitTouchCallout: 'none' }} suppressHydrationWarning>
      {/* Camera View */}
      <div className="relative flex-1 overflow-hidden">
        {hasPermission === false ? (
          <div className="flex h-full items-center justify-center p-6">
            <div className="text-center">
              <div className="text-5xl mb-4">📷</div>
              <p className="text-white text-lg mb-2">Camera Access Required</p>
              <p className="text-slate-300 text-sm mb-4">{error || "Please allow camera access to record videos."}</p>
              <button
                onClick={startCamera}
                className="rounded-xl bg-white px-6 py-2 font-semibold text-slate-900"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
            />
            
            {/* Overlay guides */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 border-2 border-white/50 rounded-lg"></div>
              </div>
            </div>

            {/* Hidden canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-red-500/90 px-4 py-2 z-10">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                <span className="text-white text-sm font-semibold">Recording...</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black/80 backdrop-blur-xl p-6 pb-safe">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
            aria-label="Close camera"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Record button */}
          <button
            onClick={toggleRecording}
            disabled={hasPermission !== true || (isCapturing && !isRecording)}
            className="rounded-full bg-white p-4 ring-4 ring-white/30 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            <div className={`w-16 h-16 rounded-full ${isRecording ? 'bg-red-500' : 'bg-white'}`}></div>
          </button>

          {/* Switch camera button (only show if multiple cameras available) */}
          <button
            onClick={switchCamera}
            className="rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
            aria-label="Switch camera"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

