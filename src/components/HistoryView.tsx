import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Trash2,
  ArrowRight,
  Flame,
  HeartPulse,
  Camera,
  Sparkles,
  Dumbbell,
  Wheat,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { MealAnalysisResult } from '../types';

interface HistoryViewProps {
  history: MealAnalysisResult[];
  onSelectMeal: (meal: MealAnalysisResult) => void;
  onDeleteMeal: (mealId: string) => void;
  onClearHistory: () => void;
  onScanNew: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectMeal,
  onDeleteMeal,
  onClearHistory,
  onScanNew,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high-protein' | 'light' | 'high-fiber'>('all');

  const totalMeals = history.length;
  const avgHealthScore = totalMeals > 0
    ? Math.round(history.reduce((sum, m) => sum + m.healthScore.overallScore, 0) / totalMeals)
    : 0;
  const avgCalories = totalMeals > 0
    ? Math.round(history.reduce((sum, m) => sum + m.totalCalories.average, 0) / totalMeals)
    : 0;
  const totalProteinLogged = totalMeals > 0
    ? Math.round(history.reduce((sum, m) => sum + m.totalProtein, 0))
    : 0;

  // Filtered meals
  const filteredHistory = history.filter((meal) => {
    if (activeFilter === 'high-protein') return meal.totalProtein >= 18;
    if (activeFilter === 'light') return meal.totalCalories.average <= 450;
    if (activeFilter === 'high-fiber') return meal.totalFiber >= 6;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header with Joyful Fruit Styling */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Persistent Meal Log • Auto-Saved
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1 flex items-center gap-2">
            <span>Past Scanned Meals</span>
            <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs">
              {totalMeals}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Every meal you scan or test is automatically saved here. Tap any meal to reopen its complete nutrition analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {totalMeals > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-colors"
            >
              Clear Log
            </button>
          )}
        </div>
      </div>

      {/* Summary Stat Cards with Warm Fruit Visuals */}
      {totalMeals > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs hover:border-orange-300 transition-all">
            <span className="text-[11px] text-slate-500 font-medium block">Total Scans</span>
            <span className="text-2xl font-black text-slate-900 font-['Outfit']">{totalMeals}</span>
            <span className="text-[10px] text-orange-600 font-semibold mt-0.5 block">Logged in storage</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs hover:border-orange-300 transition-all">
            <span className="text-[11px] text-slate-500 font-medium block">Avg. Health Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent font-['Outfit']">
                {avgHealthScore}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
              {avgHealthScore >= 75 ? 'Healthy balance' : 'Needs attention'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs hover:border-orange-300 transition-all">
            <span className="text-[11px] text-slate-500 font-medium block">Avg. Meal Energy</span>
            <span className="text-2xl font-black text-slate-900 font-['Outfit']">~{avgCalories}</span>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">kcal per plate</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs hover:border-orange-300 transition-all">
            <span className="text-[11px] text-slate-500 font-medium block">Total Protein</span>
            <span className="text-2xl font-black text-rose-600 font-['Outfit']">{totalProteinLogged}g</span>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">combined intake</span>
          </div>
        </div>
      )}

      {/* Filter Chips Bar */}
      {totalMeals > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>

          {[
            { id: 'all', label: `All (${totalMeals})` },
            { id: 'high-protein', label: 'High Protein (≥18g)' },
            { id: 'light', label: 'Light Meals (≤450 kcal)' },
            { id: 'high-fiber', label: 'High Fiber (≥6g)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-orange-50 hover:text-orange-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {totalMeals === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-orange-200/80 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-100 to-rose-100 text-orange-600 flex items-center justify-center mx-auto border border-orange-200 animate-float-gentle">
            <Camera className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              No Scans Recorded in History Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Snap a meal or test one of the 1-click presets on the home screen to automatically start logging meals here!
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onScanNew}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Scan Meal Now</span>
            </button>
          </div>
        </div>
      ) : (
        /* Scanned Meals Cards Grid */
        <div className="space-y-3.5">
          <AnimatePresence>
            {filteredHistory.map((meal, index) => {
              const dateStr = new Date(meal.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              // Dominant food title
              const foodNames = meal.detectedFoods.map(f => f.name).join(' • ');

              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/70 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  {/* Left: Thumbnail & Details */}
                  <div
                    onClick={() => onSelectMeal(meal)}
                    className="flex items-start sm:items-center gap-3.5 cursor-pointer flex-1 w-full"
                  >
                    {/* Meal Thumbnail or Fallback Icon */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-orange-50 border border-orange-200/80 shrink-0 relative flex items-center justify-center">
                      {meal.imageUrl ? (
                        <img
                          src={meal.imageUrl}
                          alt="Meal thumbnail"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-amber-100 to-orange-100 flex items-center justify-center text-orange-500 font-bold text-xl">
                          🍽️
                        </div>
                      )}
                      <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                        {meal.healthScore.overallScore}/100
                      </div>
                    </div>

                    {/* Meal Text Info */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-orange-500" />
                          <span>{dateStr}</span>
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                          {meal.detectedFoods.length} items
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {meal.healthScore.proteinStatus || 'Balanced'} Protein
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm sm:text-base font-['Outfit'] truncate group-hover:text-orange-600 transition-colors">
                        {meal.detectedFoods[0]?.name || 'Scanned Student Meal'}
                        {meal.detectedFoods.length > 1 && ` + ${meal.detectedFoods.length - 1} more`}
                      </h4>

                      <p className="text-xs text-slate-500 truncate max-w-md">
                        {foodNames}
                      </p>

                      {/* Nutrient Tags */}
                      <div className="flex flex-wrap items-center gap-3 text-xs pt-0.5">
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500" />
                          <span>~{meal.totalCalories.average} kcal</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-bold text-rose-600 flex items-center gap-1">
                          <Dumbbell className="w-3 h-3" />
                          <span>{meal.totalProtein}g protein</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 flex items-center gap-1">
                          <Wheat className="w-3 h-3 text-amber-600" />
                          <span>{meal.totalFiber}g fiber</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => onSelectMeal(meal)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3.5 py-2 rounded-xl transition-all shadow-xs group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-rose-500 group-hover:text-white group-hover:border-transparent"
                    >
                      <span>Open Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Delete meal record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
};
