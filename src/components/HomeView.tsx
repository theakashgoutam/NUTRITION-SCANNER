import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Upload,
  Sparkles,
  BarChart3,
  TrendingUp,
  Heart,
  ChevronRight,
  ArrowRight,
  Play,
  CheckCircle2,
  Utensils,
  Bot,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Target,
  Lightbulb
} from 'lucide-react';
import { CuteRobotMascot } from './CuteRobotMascot';
import { CitrusSlice, MintLeaf, CherryTomato } from './WebsiteBackground';
import { CameraModal } from './CameraModal';
import { AnimatedCounter } from './AnimatedCounter';

interface HomeViewProps {
  onStartScan: () => void;
  onSelectPreset: (presetId: string) => void;
  onOpenAwareness: () => void;
  onOpenHistory?: () => void;
  onAnalyzeMeal?: (imageData: string, mimeType?: string) => Promise<void>;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartScan,
  onSelectPreset,
  onOpenAwareness,
  onOpenHistory,
  onAnalyzeMeal,
}) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Rotating inspiring feature highlights
  const rotatingHighlights = [
    '✨ AI-Powered Food Recognition',
    '🥗 Instant Calorie & Macro Breakdown',
    '🎯 Verified Indian Nutrition Data',
    '⚡ Real-Time Portion & Health Scoring',
  ];
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % rotatingHighlights.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [rotatingHighlights.length]);

  // File upload handler for the inline Dropzone
  const handleFileChange = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (onAnalyzeMeal) {
        onAnalyzeMeal(dataUrl, file.type);
      } else {
        onStartScan();
      }
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

  const handleCameraCapture = (imageData: string) => {
    setIsCameraOpen(false);
    if (onAnalyzeMeal) {
      onAnalyzeMeal(imageData, 'image/jpeg');
    } else {
      onStartScan();
    }
  };

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-health-assistant'));
  };

  // 5 Recent meals matching the reference UI cards
  const recentMeals = [
    {
      id: 'paneer-rice-bowl',
      title: 'Paneer Rice Bowl',
      calories: 520,
      protein: 25,
      time: 'Today, 2:15 PM',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'dal-roti-salad',
      title: 'Dal, Roti & Salad',
      calories: 430,
      protein: 18,
      time: 'Yesterday, 8:32 PM',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'chicken-rice',
      title: 'Chicken & Rice',
      calories: 620,
      protein: 42,
      time: '12 Sep, 1:05 PM',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'veg-maggi',
      title: 'Veg Maggi',
      calories: 380,
      protein: 10,
      time: '11 Sep, 7:40 PM',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'idli-sambar',
      title: 'Idli Sambar',
      calories: 310,
      protein: 12,
      time: '10 Sep, 9:10 AM',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="relative space-y-12 sm:space-y-16 pb-12 overflow-hidden">
      
      {/* ========================================================
          1. HERO SECTION (Matching reference image)
      ======================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative pt-4 sm:pt-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Display Typography & CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            <div className="space-y-2">
              {/* Dynamic Animated Rotating Feature Pill */}
              <div className="inline-flex items-center gap-2 bg-orange-100/90 border border-orange-200/90 px-3.5 py-1.5 rounded-full text-xs font-bold text-orange-800 shadow-2xs mb-2 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={highlightIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="inline-block whitespace-nowrap"
                  >
                    {rotatingHighlights[highlightIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Animated Headline Typography */}
              <h1 className="text-5xl sm:text-7xl lg:text-7xl font-black tracking-tight font-['Outfit'] text-slate-950 leading-[1.05]">
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  NUTRITION
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="text-orange-500 block sm:inline lg:block drop-shadow-xs"
                >
                  SCANNER
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
                className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight pt-2"
              >
                See your food. Understand your nutrition.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
                className="text-base sm:text-lg text-slate-600 font-medium"
              >
                Eat smarter. Live better.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1"
            >
              <button
                id="hero-scan-btn"
                onClick={onStartScan}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-orange-500/25 active:scale-95 transition-all group"
              >
                <span>Scan Your Meal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={() => {
                  const el = document.getElementById('scan-your-meal-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-orange-50/70 text-slate-700 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full border border-orange-200/80 shadow-2xs transition-all active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>How It Works</span>
              </button>
            </motion.div>

            {/* Stats Row with Animated Number Counters on View */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: 'easeOut' }}
              className="pt-4 border-t border-orange-200/60 flex items-center justify-center lg:justify-start gap-6 sm:gap-10"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                  <AnimatedCounter to={1} suffix="K+" />
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Happy Users
                </div>
              </div>

              <div className="h-8 w-px bg-orange-200/60" />

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                  <AnimatedCounter to={95} suffix="%" />
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Food Recognition
                </div>
              </div>

              <div className="h-8 w-px bg-orange-200/60" />

              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                  <AnimatedCounter to={50} suffix="+" />
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Indian Food Items
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Food Bowl with floating elements (Matching reference image) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background Soft Sun Glow behind bowl */}
            <div className="absolute inset-0 bg-radial from-orange-300/35 via-amber-200/20 to-transparent blur-3xl -z-10" />

            {/* Outer Decorative Citrus & Mint Leaves around plate */}
            <div className="absolute -top-6 -left-4 pointer-events-none -z-10">
              <CitrusSlice size={130} rotation={-20} />
            </div>
            <div className="absolute -bottom-6 -right-4 pointer-events-none -z-10">
              <CitrusSlice size={140} rotation={45} />
            </div>
            <div className="absolute top-4 -right-4 pointer-events-none -z-10">
              <MintLeaf size={55} rotation={30} />
            </div>
            <div className="absolute bottom-6 -left-4 pointer-events-none -z-10">
              <CherryTomato size={36} />
            </div>

            {/* Main Round Wooden Bowl Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative w-[320px] sm:w-[380px] lg:w-[420px] aspect-square rounded-full p-3.5 bg-gradient-to-tr from-amber-700 via-amber-800 to-amber-900 shadow-2xl shadow-orange-950/20 border-4 border-amber-600/50 flex items-center justify-center group"
            >
              {/* Inner Bowl Food Photo */}
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Delicious nutritious balanced meal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Handwritten Script Tag: "Good Food Brighter You" with sparkles */}
              <div className="absolute -top-3 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-200/80 shadow-md text-orange-600 text-xs sm:text-sm font-black font-['Outfit'] flex items-center gap-1.5 select-none transform rotate-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Good Food Brighter You</span>
              </div>

              {/* Floating Quote Card: Orange heart + "A healthier tomorrow..." */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 sm:-bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-orange-200/80 shadow-xl shadow-orange-950/10 max-w-[220px] text-left select-none"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Heart className="w-4 h-4 fill-orange-500 text-orange-500" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-snug">
                    A healthier tomorrow starts with what you eat today.
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ========================================================
          2. 5 FEATURE PILLS ROW (Matching reference image)
      ======================================================== */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* 1. Scan Meal */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0 }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartScan}
          className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/70 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-orange-100 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center shrink-0 transition-colors">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
              Scan Meal
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              Upload or capture food
            </div>
          </div>
        </motion.div>

        {/* 2. Get Nutrition */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.08 }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartScan}
          className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/70 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-orange-100 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center shrink-0 transition-colors">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
              Get Nutrition
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              Calories, macros & more
            </div>
          </div>
        </motion.div>

        {/* 3. AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.16 }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenChat}
          className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/70 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-orange-100 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center shrink-0 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
              AI Insights
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              Personalized suggestions
            </div>
          </div>
        </motion.div>

        {/* 4. Track Progress */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.24 }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenHistory || onStartScan}
          className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/70 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-orange-100 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center shrink-0 transition-colors">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
              Track Progress
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              See your improvement
            </div>
          </div>
        </motion.div>

        {/* 5. Eat Better */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.32 }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenAwareness}
          className="col-span-2 sm:col-span-1 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/70 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-orange-100 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center shrink-0 transition-colors">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
              Eat Better
            </div>
            <div className="text-[11px] text-slate-500 font-medium leading-tight">
              Small changes, big results
            </div>
          </div>
        </motion.div>

      </section>

      {/* ========================================================
          3. "SCAN YOUR MEAL" CARD (Matching reference image)
      ======================================================== */}
      <motion.section
        id="scan-your-meal-section"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative bg-white/90 backdrop-blur-md rounded-3xl border border-orange-200/80 shadow-xl shadow-orange-950/5 p-6 sm:p-8 space-y-6"
      >
        {/* Header with Utensils / Scanner icon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
              Scan Your Meal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Upload or capture a photo of your meal to discover its nutritional value.
            </p>
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Drag & Drop Zone */}
          <div className="lg:col-span-7">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
                dragActive
                  ? 'border-orange-500 bg-orange-100/60 scale-[1.01]'
                  : 'border-orange-300/80 bg-orange-50/40 hover:bg-orange-50/70 hover:border-orange-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              />

              {/* Orange Cloud Upload Icon with Upward Arrow */}
              <div className="w-16 h-16 rounded-full bg-white border border-orange-200 shadow-sm flex items-center justify-center text-orange-500 group-hover:scale-105 transition-transform">
                <Upload className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <p className="font-bold text-sm sm:text-base text-slate-800">
                  Drag & Drop your meal photo here
                </p>
                <p className="text-xs text-slate-400">
                  Supports JPG, PNG, or WEBP (max 10MB)
                </p>
              </div>

              {/* Action Buttons */}
              <div
                className="flex flex-wrap items-center justify-center gap-3 pt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-orange-500/20 active:scale-95 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload from Device</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-slate-700 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-orange-200/80 shadow-2xs active:scale-95 transition-all"
                >
                  <Camera className="w-4 h-4 text-orange-600" />
                  <span>Take Photo with Camera</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Badges + Appetizing Food Bowl with "Scan Analyze Improve" arrow */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            
            {/* 4 Feature Badges in 2x2 Grid with Staggered Entrance */}
            <div className="grid grid-cols-2 gap-2.5 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="bg-orange-50/80 border border-orange-200/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-800"
              >
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                <span>AI Analysis</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="bg-orange-50/80 border border-orange-200/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-800"
              >
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Multi-Food Detect</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.19 }}
                className="bg-orange-50/80 border border-orange-200/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-800"
              >
                <Target className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Accurate Nutrition</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.26 }}
                className="bg-orange-50/80 border border-orange-200/60 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-800"
              >
                <Lightbulb className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Smart Insights</span>
              </motion.div>
            </div>

            {/* Food Bowl with curved arrow */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-orange-950/15">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                  alt="Healthy bowl"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Handwritten style badge: "Scan Analyze Improve" */}
              <div className="absolute -bottom-2 -left-2 bg-orange-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md select-none transform -rotate-6">
                Scan • Analyze • Improve ➜
              </div>
            </div>

          </div>

        </div>
      </motion.section>

      {/* ========================================================
          4. "YOUR HEALTH AT A GLANCE" & "AI HEALTH ASSISTANT"
          (Matching reference image 2-card layout)
      ======================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        
        {/* Left Card: Your Health at a Glance (4 Animated Circular Progress Rings) */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl border border-orange-200/80 shadow-xl shadow-orange-950/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                <Plus className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 font-['Outfit']">
                Your Health at a Glance
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800">
              Today
            </span>
          </div>

          {/* 4 Circular Progress Meters with Scroll Animation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            {/* Calories (1,420 / 2,200 kcal - 64%) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-orange-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-orange-500"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.64 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute text-[11px] font-black text-slate-800">
                  <AnimatedCounter to={64} suffix="%" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800">
                  1,420 / 2,200
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Calories (kcal)
                </div>
              </div>
            </div>

            {/* Protein (72 / 120 g - 60%) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-orange-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-orange-500"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.18, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute text-[11px] font-black text-slate-800">
                  <AnimatedCounter to={60} suffix="%" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800">
                  72 / 120 g
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Protein
                </div>
              </div>
            </div>

            {/* Carbs (165 / 250 g - 66%) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-orange-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-orange-500"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.66 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.26, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute text-[11px] font-black text-slate-800">
                  <AnimatedCounter to={66} suffix="%" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800">
                  165 / 250 g
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Carbs
                </div>
              </div>
            </div>

            {/* Fiber (18 / 30 g - 60%) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-orange-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-orange-500"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.34, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute text-[11px] font-black text-slate-800">
                  <AnimatedCounter to={60} suffix="%" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800">
                  18 / 30 g
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Fiber
                </div>
              </div>
            </div>

          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-orange-100">
            <span>Based on standard student RDA</span>
            <button
              onClick={handleOpenChat}
              className="font-bold text-orange-600 hover:text-orange-700 hover:underline"
            >
              Recalculate Targets →
            </button>
          </div>
        </div>

        {/* Right Card: AI Health Assistant (with 3D Cute Robot Mascot) */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl border border-orange-200/80 shadow-xl shadow-orange-950/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 font-['Outfit']">
                AI Health Assistant
              </h3>
            </div>
            <button
              onClick={handleOpenChat}
              className="text-slate-400 hover:text-slate-600 p-1"
              title="Options"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Subtitle & Robot Mascot */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Let's know you better to give personalized nutrition & fitness advice.
              </p>
              <button
                id="start-chat-btn"
                onClick={handleOpenChat}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-orange-500/20 active:scale-95 transition-all"
              >
                <span>Start Chat</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3D Cute Robot Mascot from reference UI */}
            <div className="shrink-0 -mr-2">
              <CuteRobotMascot size={120} onClick={handleOpenChat} />
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-medium pt-1 border-t border-orange-100">
            Powered by NutriLens AI • Private & confidential
          </div>
        </div>

      </motion.section>

      {/* ========================================================
          5. "RECENT MEAL HISTORY" SECTION (Matching reference image)
      ======================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 font-['Outfit'] tracking-tight">
              Recent Meal History
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Click any meal to view nutritional breakdown and portion insights.
            </p>
          </div>
          <button
            onClick={onOpenHistory || onStartScan}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Meal Cards in a Row with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {recentMeals.map((meal, idx) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPreset(meal.id)}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-orange-200/70 p-3 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Photo */}
              <div className="w-full h-32 rounded-xl overflow-hidden mb-2.5 relative bg-slate-100">
                <img
                  src={meal.image}
                  alt={meal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {meal.calories} kcal
                </span>
              </div>

              {/* Title & Chevron */}
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                  {meal.title}
                </h4>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              {/* Protein & Time */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1">
                <span>{meal.protein}g protein</span>
                <span className="text-[10px] text-slate-400">{meal.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

    </div>
  );
};
