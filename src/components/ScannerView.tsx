import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Image as ImageIcon, RefreshCw, Info, Zap } from 'lucide-react';
import { CameraModal } from './CameraModal';
import { QUICK_PLATE_INSPIRATIONS } from '../data/demoMeals';

interface ScannerViewProps {
  onAnalyze: (imageData: string, mimeType?: string) => Promise<void>;
  isAnalyzing: boolean;
  onSelectPreset: (presetId: string) => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  onAnalyze,
  isAnalyzing,
  onSelectPreset,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis steps animation matching requirement 6
  React.useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setAnalysisStep(0);
      interval = setInterval(() => {
        setAnalysisStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 850);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleFileChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedImage) return;
    await onAnalyze(selectedImage, imageMimeType);
  };

  const analysisMessages = [
    'Analyzing your meal...',
    'Detecting food items',
    'Estimating portions',
    'Calculating nutrition',
    'Preparing your meal report',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header with Text Animations */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
          Scan Your Meal with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 animate-gradient-text">
            Vision AI
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Upload or capture a photo of your hostel mess, canteen, or home thali to discover your meal's estimated nutrition.
        </p>
      </div>

      {/* Main Upload / Camera Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-sm space-y-6">
        
        {/* If no image selected */}
        {!selectedImage ? (
          <div
            onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
              dragActive
                ? 'border-orange-500 bg-orange-50/50 scale-[0.99]'
                : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50/20 bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            />

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-100 to-orange-100 text-orange-600 flex items-center justify-center mb-4 border border-orange-200/80 shadow-xs animate-float-gentle">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-1">
              Drag & Drop your meal photo here
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Supports JPG, PNG, or WEBP from camera roll or files
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="select-file-btn"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all active:scale-95"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Upload from Device</span>
              </button>

              <button
                id="open-camera-btn"
                onClick={() => setIsCameraOpen(true)}
                className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-slate-800 border border-orange-200 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <Camera className="w-4 h-4 text-orange-600" />
                <span>Take Photo with Camera</span>
              </button>
            </div>
          </div>
        ) : (
          /* Preview Selected Image */
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-orange-200 bg-slate-950 aspect-16/10 max-h-96 mx-auto flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected Meal"
                className="w-full h-full object-contain"
              />

              {/* Animated Laser Scanning Beam */}
              {isAnalyzing && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.9)] animate-laser pointer-events-none z-20"></div>
              )}
              
              {/* Overlay while analyzing */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center space-y-4 z-10">
                  <div className="w-14 h-14 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-7 h-7 text-orange-400 animate-spin" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h4 className="text-base font-bold font-['Outfit']">
                      {analysisMessages[analysisStep] || 'Analyzing meal with NutriLens AI...'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Identifying multiple foods and estimating portions...
                    </p>
                  </div>
                  <div className="w-48 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-rose-500 h-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.min(95, (analysisStep + 1) * 25)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions for Selected Image */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  disabled={isAnalyzing}
                  onClick={() => setSelectedImage(null)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors disabled:opacity-50"
                >
                  Change Photo
                </button>
                <button
                  disabled={isAnalyzing}
                  onClick={() => setIsCameraOpen(true)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

              <button
                id="analyze-meal-btn"
                disabled={isAnalyzing}
                onClick={handleStartAnalysis}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Meal...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Meal ➔</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Photography Tips for Students */}
        <div className="bg-orange-50/60 border border-orange-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-800">Tips for Best Food Detection:</span>
            <p>
              Capture the entire plate from a slight angle (45°). Keeping items in distinct katoris or separated sections helps the AI isolate rice, dal, sabzi, and rotis with high accuracy.
            </p>
          </div>
        </div>

      </div>

      {/* Quick Balanced Meal Inspirations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Quick Meal Inspirations
            </h3>
          </div>
          <span className="text-xs text-slate-500">Tap to analyze balanced plate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {QUICK_PLATE_INSPIRATIONS.map((meal) => (
            <button
              key={meal.id}
              onClick={() => onSelectPreset(meal.id)}
              className="bg-white rounded-2xl border border-amber-200/80 p-2.5 text-left hover:border-orange-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-2.5 bg-orange-50">
                <img
                  src={meal.imageUrl}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                  {meal.tag}
                </span>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                  {meal.name}
                </h4>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(base64) => {
          setSelectedImage(base64);
          setImageMimeType('image/jpeg');
          setIsCameraOpen(false);
        }}
      />

    </div>
  );
};
