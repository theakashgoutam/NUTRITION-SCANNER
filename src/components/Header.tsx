import React from 'react';
import { Camera, Sun, User } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

interface HeaderProps {
  activeTab: 'home' | 'scan' | 'review' | 'dashboard' | 'awareness' | 'history';
  setActiveTab: (tab: 'home' | 'scan' | 'review' | 'dashboard' | 'awareness' | 'history') => void;
  hasCurrentMeal: boolean;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasCurrentMeal,
  historyCount,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-orange-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand (Matching reference image: Camera icon in orange rounded square) */}
          <div 
            id="brand-logo" 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-950 font-['Outfit']">
                  NUTRITION{' '}
                  <span className="text-orange-600">
                    SCANNER
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                See Food Better. Live Healthier.
              </p>
            </div>
          </div>

          {/* Desktop Navigation (Matching reference image navigation tabs) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-home"
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-orange-100 text-orange-950 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              Home
            </button>

            <button
              id="nav-scan"
              onClick={() => setActiveTab('scan')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'scan'
                  ? 'bg-orange-100 text-orange-950 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              Scan Meal
            </button>

            <button
              id="nav-dashboard"
              onClick={() => setActiveTab(hasCurrentMeal ? 'dashboard' : 'scan')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'dashboard' || activeTab === 'review'
                  ? 'bg-orange-100 text-orange-950 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              Dashboard
            </button>

            <button
              id="nav-awareness"
              onClick={() => setActiveTab('awareness')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'awareness'
                  ? 'bg-orange-100 text-orange-950 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              Healthy Awareness
            </button>

            <button
              id="nav-history"
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all relative ${
                activeTab === 'history'
                  ? 'bg-orange-100 text-orange-950 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              <span>Meal History</span>
              {historyCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] bg-orange-600 text-white rounded-full font-bold">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Icons: Sun / Theme Icon + Circular Profile Avatar Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="w-9 h-9 rounded-full border border-orange-200/80 bg-white hover:bg-orange-50 flex items-center justify-center text-slate-600 hover:text-orange-600 transition-colors shadow-2xs"
              title="Light Theme"
            >
              <Sun className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
              title="User Profile & Log"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-orange-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'home' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'scan' ? 'bg-orange-500 text-white shadow-xs' : 'bg-orange-50 text-slate-700'
            }`}
          >
            Scan Meal
          </button>
          <button
            onClick={() => setActiveTab(hasCurrentMeal ? 'dashboard' : 'scan')}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'dashboard' || activeTab === 'review' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-slate-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('awareness')}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'awareness' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-slate-700'
            }`}
          >
            Awareness
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap font-semibold ${
              activeTab === 'history' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-slate-700'
            }`}
          >
            History {historyCount > 0 ? `(${historyCount})` : ''}
          </button>
        </div>
      </div>

      {/* Interactive Scroll-Linked Progress Bar */}
      <motion.div
        className="h-[2.5px] w-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 origin-left"
        style={{ scaleX }}
      />
    </header>
  );
};
