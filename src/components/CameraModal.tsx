import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setIsInitializing(true);
    setError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsInitializing(false);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setError('Could not access camera. Please check camera permissions or upload an image file instead.');
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL('image/jpeg', 0.85);
    stopCamera();
    onCapture(base64);
  };

  const toggleCamera = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-sm">Capture Meal Photo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Preview Canvas */}
        <div className="relative aspect-4/3 bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center space-y-3 max-w-xs text-slate-300">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <p className="text-xs">{error}</p>
              <button
                onClick={onClose}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl"
              >
                Close & Upload File
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Thali Alignment Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center">
                  <span className="text-[10px] text-white/70 bg-black/40 px-2 py-0.5 rounded-full font-medium">
                    Center meal plate inside circle
                  </span>
                </div>
              </div>
            </>
          )}

          {isInitializing && !error && (
            <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-white gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
              <span className="text-xs text-slate-400">Starting Camera...</span>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        {!error && (
          <div className="p-4 bg-slate-950 flex items-center justify-around">
            <button
              onClick={toggleCamera}
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Switch Camera"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <button
              id="snap-camera-btn"
              onClick={capturePhoto}
              disabled={isInitializing}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
            </button>

            <div className="w-11"></div>
          </div>
        )}

      </div>
    </div>
  );
};
