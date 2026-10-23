import React from 'react';
import { Camera, Mail, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { CitrusSlice } from './WebsiteBackground';

interface FooterProps {
  onScanClick: () => void;
  onNavClick: (tab: 'home' | 'scan' | 'dashboard' | 'awareness' | 'history') => void;
}

export const Footer: React.FC<FooterProps> = ({ onScanClick, onNavClick }) => {
  return (
    <footer className="mt-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-8">
      
      {/* 1. CALLOUT BANNER - "Better Food, Brighter Days" matching reference image */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-6 sm:p-10 text-white shadow-xl shadow-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Background Decorative Citrus Slices */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 flex items-center justify-center">
          <div className="flex items-center gap-6 scale-125">
            <CitrusSlice size={160} rotation={20} />
            <CitrusSlice size={190} rotation={-45} />
            <CitrusSlice size={150} rotation={60} />
          </div>
        </div>

        {/* Banner Left Content */}
        <div className="relative z-10 text-center md:text-left space-y-1">
          <span className="text-orange-100 text-xs uppercase font-bold tracking-widest block">
            Nutritional Balance
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit']">
            Better Food <br className="hidden sm:inline" />
            <span className="text-white">Brighter Days</span>
          </h3>
          <p className="text-xs sm:text-sm text-orange-100 font-medium pt-1">
            Understand. Improve. Stay Healthy.
          </p>
        </div>

        {/* Banner Right Action Button */}
        <div className="relative z-10 shrink-0">
          <button
            onClick={onScanClick}
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm shadow-lg transition-all active:scale-95 group"
          >
            <span>Start Scanning Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. MAIN FOOTER NAV & SOCIALS matching reference image */}
      <div className="pt-6 border-t border-orange-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/25">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 font-['Outfit']">
              NUTRITION <span className="text-orange-600">SCANNER</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              See Food Better. Live Healthier.
            </p>
          </div>
        </div>

        {/* Center Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
          <button onClick={() => onNavClick('home')} className="hover:text-orange-600 transition-colors">
            Home
          </button>
          <button onClick={() => onNavClick('scan')} className="hover:text-orange-600 transition-colors">
            Scan Meal
          </button>
          <button onClick={() => onNavClick('dashboard')} className="hover:text-orange-600 transition-colors">
            Dashboard
          </button>
          <button onClick={() => onNavClick('awareness')} className="hover:text-orange-600 transition-colors">
            Healthy Awareness
          </button>
          <button onClick={() => onNavClick('history')} className="hover:text-orange-600 transition-colors">
            Meal History
          </button>
          <button onClick={() => onNavClick('awareness')} className="hover:text-orange-600 transition-colors">
            About
          </button>
        </nav>

        {/* Social Icons & Slogan */}
        <div className="flex items-center gap-4 text-slate-400">
          <a href="mailto:support@nutrilens.ai" className="hover:text-orange-600 transition-colors" title="Contact Email">
            <Mail className="w-4 h-4" />
          </a>
          <a href="#instagram" className="hover:text-orange-600 transition-colors" title="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#twitter" className="hover:text-orange-600 transition-colors" title="X (Twitter)">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#linkedin" className="hover:text-orange-600 transition-colors" title="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Copyright and Slogan */}
      <div className="text-center text-[11px] text-slate-400 pt-2 font-medium">
        Good Food. Good Life. <span className="text-orange-500">🧡</span>
      </div>

    </footer>
  );
};
