import React from 'react';
import { Sparkles, ShieldAlert, RefreshCw, BookmarkCheck, Flame, Dumbbell, Wheat, Droplets, ArrowRight } from 'lucide-react';
import { MealAnalysisResult } from '../types';

interface NutritionDashboardViewProps {
  meal: MealAnalysisResult;
  onScanAnother: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
  onOpenAwareness: () => void;
}

export const NutritionDashboardView: React.FC<NutritionDashboardViewProps> = ({
  meal,
  onScanAnother,
  onSaveToHistory,
  isSaved,
  onOpenAwareness,
}) => {
  const { totalCalories, totalProtein, totalCarbs, totalFat, totalFiber, healthScore, feedback, detectedFoods } = meal;

  // Calorie progress against a standard ~700 kcal main meal benchmark
  const caloriePercent = Math.min(100, Math.round((totalCalories.average / 700) * 100));

  // Determine score badge colors (Strictly Orange Palette)
  const getScoreBadge = (score: number) => {
    if (score >= 80) return { bg: 'bg-orange-500', text: 'text-orange-700', lightBg: 'bg-orange-50', border: 'border-orange-200' };
    if (score >= 65) return { bg: 'bg-amber-500', text: 'text-amber-700', lightBg: 'bg-amber-50', border: 'border-amber-200' };
    if (score >= 50) return { bg: 'bg-orange-400', text: 'text-orange-800', lightBg: 'bg-orange-50/80', border: 'border-orange-200' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', lightBg: 'bg-rose-50', border: 'border-rose-200' };
  };

  const scoreBadge = getScoreBadge(healthScore.overallScore);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Top Banner Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
              Step 3 of 3 • Nutrition Dashboard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-0.5">
            Meal Nutrition Breakdown
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Calculated from plate items and verified portions for college student dietary needs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onScanAnother}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-orange-50 border border-orange-200 px-3.5 py-2 rounded-xl transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
            <span>Scan Another</span>
          </button>

          <button
            onClick={onSaveToHistory}
            disabled={isSaved}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs ${
              isSaved
                ? 'bg-orange-100 text-orange-800 border border-orange-200 cursor-default'
                : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white active:scale-95'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved in History' : 'Save Meal'}</span>
          </button>
        </div>
      </div>

      {/* Row 1: Calorie Range Hero + Meal Health Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Total Calories Card */}
        <div className="bg-white rounded-3xl p-6 border border-orange-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Estimated Energy
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                Confidence: {meal.overallConfidence}
              </span>
            </div>
            
            <div className="pt-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
                {totalCalories.min} – {totalCalories.max} <span className="text-lg font-semibold text-slate-500">kcal</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Midpoint estimate: ~{totalCalories.average} kcal
              </div>
            </div>
          </div>

          {/* Calorie Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span>Main Meal Target (~600–750 kcal)</span>
              <span className="font-bold text-orange-600">{caloriePercent}%</span>
            </div>
            <div className="w-full bg-orange-100/60 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-700"
                style={{ width: `${caloriePercent}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            *Actual nutrition varies based on cooking oil, ladle size, and specific mess recipe preparation.
          </p>
        </div>

        {/* Meal Health Score Card */}
        <div className="bg-white rounded-3xl p-6 border border-orange-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Nutritional Balance Index
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] mt-0.5">
                Meal Health Score
              </h3>
            </div>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${scoreBadge.lightBg} ${scoreBadge.text} ${scoreBadge.border}`}>
              {healthScore.category}
            </span>
          </div>

          <div className="flex items-center gap-6 py-1">
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex flex-col items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
              <span className="text-3xl font-black font-['Outfit'] leading-none">
                {healthScore.overallScore}
              </span>
              <span className="text-[11px] text-white/80 font-medium">/ 100</span>
            </div>

            <div className="space-y-1.5 flex-1 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Protein Intake:</span>
                <span className="font-bold text-orange-700">{healthScore.proteinStatus} ({healthScore.proteinScore}/20)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Dietary Fiber:</span>
                <span className="font-bold text-orange-700">{healthScore.fiberStatus} ({healthScore.fiberScore}/20)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Portion Balance:</span>
                <span className="font-bold text-orange-700">{healthScore.portionStatus} ({healthScore.portionBalanceScore}/20)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Carb Quality:</span>
                <span className="font-bold text-orange-700">{healthScore.carbStatus} ({healthScore.carbQualityScore}/20)</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
            Educational scoring model tailored for students. Not a medical diagnosis.
          </div>
        </div>

      </div>

      {/* Row 2: 4 Key Macro Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Protein */}
        <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Protein</span>
            <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {totalProtein} <span className="text-xs font-normal text-slate-500">g</span>
            </div>
            <p className="text-[11px] text-orange-700 font-medium mt-0.5">
              {totalProtein >= 18 ? 'Target met' : 'Aim for 18–25g'}
            </p>
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Carbs</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {totalCarbs} <span className="text-xs font-normal text-slate-500">g</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {healthScore.carbStatus === 'Optimal' ? 'Balanced ratio' : 'Rice/roti heavy'}
            </p>
          </div>
        </div>

        {/* Fat */}
        <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Fat</span>
            <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {totalFat} <span className="text-xs font-normal text-slate-500">g</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {healthScore.fatStatus === 'Balanced' ? 'Good cooking level' : 'Watch mess oil'}
            </p>
          </div>
        </div>

        {/* Fiber */}
        <div className="bg-white rounded-2xl p-4 border border-orange-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Dietary Fiber</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Wheat className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {totalFiber} <span className="text-xs font-normal text-slate-500">g</span>
            </div>
            <p className="text-[11px] text-orange-700 font-medium mt-0.5">
              {totalFiber >= 6 ? 'Healthy gut fuel' : 'Add raw salad'}
            </p>
          </div>
        </div>

      </div>

      {/* Row 3: Actionable Health Suggestions Section */}
      <div className="bg-gradient-to-br from-slate-900 via-orange-950/90 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-6 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit']">
                Actionable Health Suggestions
              </h3>
              <p className="text-xs text-slate-300">
                Personalized guidance for this meal
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAwareness}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
          >
            <span>Awareness Hub</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* What's Good */}
          <div className="bg-slate-900/80 border border-orange-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
              <span>★</span>
              <span>What's Balanced</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {feedback.good}
            </p>
          </div>

          {/* What Could Improve */}
          <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <span>▲</span>
              <span>What Could Improve</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {feedback.improve}
            </p>
          </div>

          {/* Try This */}
          <div className="bg-slate-900/80 border border-rose-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>●</span>
              <span>Try This Next</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {feedback.tryThis}
            </p>
          </div>

        </div>
      </div>

      {/* Row 4: Food Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 border border-orange-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
          Detailed Food Breakdown ({detectedFoods.length} Items)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-orange-200/70 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3 font-semibold">Food Item</th>
                <th className="py-2.5 px-3 font-semibold">Portion</th>
                <th className="py-2.5 px-3 font-semibold">Calories</th>
                <th className="py-2.5 px-3 font-semibold">Protein</th>
                <th className="py-2.5 px-3 font-semibold">Carbs</th>
                <th className="py-2.5 px-3 font-semibold">Fat</th>
                <th className="py-2.5 px-3 font-semibold">Fiber</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100/60">
              {detectedFoods.map((item) => (
                <tr key={item.id} className="hover:bg-orange-50/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {item.portionLabel}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800">
                    ~{item.calories} kcal
                  </td>
                  <td className="py-3 px-3 text-orange-700 font-semibold">
                    {item.protein}g
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {item.carbs}g
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {item.fat}g
                  </td>
                  <td className="py-3 px-3 text-amber-800 font-semibold">
                    {item.fiber}g
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-orange-200 font-bold text-slate-900 bg-orange-50/40">
                <td className="py-3 px-3" colSpan={2}>
                  Total Estimated Meal
                </td>
                <td className="py-3 px-3 text-orange-700">
                  ~{totalCalories.average} kcal
                </td>
                <td className="py-3 px-3 text-orange-700">
                  {totalProtein}g
                </td>
                <td className="py-3 px-3">
                  {totalCarbs}g
                </td>
                <td className="py-3 px-3">
                  {totalFat}g
                </td>
                <td className="py-3 px-3 text-amber-800">
                  {totalFiber}g
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Bottom Medical Disclaimer */}
      <div className="bg-orange-50 border border-orange-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-orange-900">
        <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold">Educational Health Notice:</span>
          <p>
            NutriLens provides nutritional awareness estimates to help students understand their everyday eating habits. It is not intended for medical diagnosis, eating disorder treatment, or clinical nutrition therapy.
          </p>
        </div>
      </div>

    </div>
  );
};
