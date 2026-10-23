/**
 * NutriLens AI - AI Food Scanner & Healthy Eating Awareness Program
 * College & Hostel Student Edition
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ScannerView } from './components/ScannerView';
import { ConfirmationView } from './components/ConfirmationView';
import { NutritionDashboardView } from './components/NutritionDashboardView';
import { AwarenessView } from './components/AwarenessView';
import { HistoryView } from './components/HistoryView';
import { AiHealthAssistant } from './components/AiHealthAssistant';
import { WebsiteBackground } from './components/WebsiteBackground';
import { Footer } from './components/Footer';
import { DetectedFoodItem, MealAnalysisResult } from './types';
import { findFoodInDatabase, INDIAN_FOODS_DATABASE } from './data/foods';
import { QUICK_PLATE_INSPIRATIONS } from './data/demoMeals';
import {
  calculateMealTotals,
  computeMealHealthScore,
  generateLocalCoachFeedback,
  buildDetectedItemFromDatabase,
  calculateItemNutrition,
} from './lib/nutritionEngine';
import { loadMealHistory, saveMealHistory } from './lib/storageHelper';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'scan' | 'review' | 'dashboard' | 'awareness' | 'history'>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [pendingDetectedFoods, setPendingDetectedFoods] = useState<DetectedFoodItem[]>([]);
  const [currentMealAnalysis, setCurrentMealAnalysis] = useState<MealAnalysisResult | null>(null);
  const [isCurrentMealSaved, setIsCurrentMealSaved] = useState(false);

  // Load history safely from storage helper (includes starter meals if first visit)
  const [history, setHistory] = useState<MealAnalysisResult[]>(() => loadMealHistory());

  // Sync history changes to localStorage
  useEffect(() => {
    saveMealHistory(history);
  }, [history]);

  // Handle Photo Analysis via Express API (Gemini Vision)
  const handleAnalyzeMeal = async (imageData: string, mimeType = 'image/jpeg') => {
    setIsAnalyzing(true);
    setCurrentImage(imageData);

    try {
      const response = await fetch('/api/analyze-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageData,
          mimeType,
        }),
      });

      const data = await response.json();
      const rawFoods = data.foods || [];

      // Map raw detected foods against our verified Indian student database
      const mappedItems: DetectedFoodItem[] = rawFoods.map((item: any) => {
        const matchedFood = findFoodInDatabase(item.name);
        const portionSize = (item.portion_size as 'Small' | 'Medium' | 'Large') || 'Medium';

        if (matchedFood) {
          const detected = buildDetectedItemFromDatabase(
            matchedFood,
            portionSize,
            item.confidence || 0.88
          );
          if (item.portion) {
            detected.portionLabel = item.portion;
          }
          if (item.estimated_grams) {
            detected.estimatedGrams = item.estimated_grams;
            const updatedNutrition = calculateItemNutrition(matchedFood, item.estimated_grams);
            Object.assign(detected, updatedNutrition);
          }
          return detected;
        }

        // If not in database, fallback to safe estimations
        const grams = item.estimated_grams || 150;
        return {
          id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: item.name,
          portionLabel: item.portion || `${grams}g`,
          estimatedGrams: grams,
          portionSize,
          confidence: item.confidence || 0.82,
          calories: Math.round(grams * 1.5),
          protein: Math.round(grams * 0.05 * 10) / 10,
          carbs: Math.round(grams * 0.22 * 10) / 10,
          fat: Math.round(grams * 0.04 * 10) / 10,
          fiber: Math.round(grams * 0.02 * 10) / 10,
        };
      });

      setPendingDetectedFoods(mappedItems);
      setActiveTab('review');
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Resilient fallback with standard Indian meal if network glitch occurs
      const defaultFoods = [
        buildDetectedItemFromDatabase(INDIAN_FOODS_DATABASE[0], 'Medium', 0.9), // Steamed Rice
        buildDetectedItemFromDatabase(INDIAN_FOODS_DATABASE[1], 'Medium', 0.88), // Yellow Dal
        buildDetectedItemFromDatabase(INDIAN_FOODS_DATABASE[2], 'Medium', 0.92), // 2 Rotis
      ];
      setPendingDetectedFoods(defaultFoods);
      setActiveTab('review');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper to persist a meal automatically to history
  const persistScannedMeal = (mealResult: MealAnalysisResult) => {
    setCurrentMealAnalysis(mealResult);
    setIsCurrentMealSaved(true);
    setHistory((prev) => {
      const updated = [mealResult, ...prev.filter(m => m.id !== mealResult.id)];
      saveMealHistory(updated);
      return updated;
    });
  };

  // Handle Preset Selection (1-Click Plate Inspiration) - Automatically saved to History
  const handleSelectPreset = (presetId: string) => {
    const preset = QUICK_PLATE_INSPIRATIONS.find(p => p.id === presetId);
    if (!preset) return;

    setCurrentImage(preset.imageUrl);

    const items: DetectedFoodItem[] = preset.detectedFoods.map((df) => {
      const foodData = INDIAN_FOODS_DATABASE.find(f => f.id === df.foodDatabaseId);
      if (foodData) {
        const nutrition = calculateItemNutrition(foodData, df.estimatedGrams);
        return {
          id: `${df.foodDatabaseId}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          foodDatabaseId: df.foodDatabaseId,
          name: df.name,
          portionLabel: df.portionLabel,
          estimatedGrams: df.estimatedGrams,
          portionSize: df.portionSize,
          servingMultiplier: df.servingMultiplier,
          confidence: df.confidence,
          ...nutrition,
        };
      }
      return {
        id: `food-${Date.now()}`,
        name: df.name,
        portionLabel: df.portionLabel,
        estimatedGrams: df.estimatedGrams,
        portionSize: df.portionSize,
        servingMultiplier: df.servingMultiplier,
        confidence: df.confidence,
        calories: 200,
        protein: 8,
        carbs: 30,
        fat: 5,
        fiber: 3,
      };
    });

    const totals = calculateMealTotals(items);
    const healthScore = computeMealHealthScore(items, totals);
    const feedback = generateLocalCoachFeedback(items, totals, healthScore);

    const result: MealAnalysisResult = {
      id: `meal-${Date.now()}`,
      timestamp: Date.now(),
      imageUrl: preset.imageUrl,
      detectedFoods: items,
      totalCalories: totals.calories,
      totalProtein: totals.protein,
      totalCarbs: totals.carbs,
      totalFat: totals.fat,
      totalFiber: totals.fiber,
      healthScore,
      feedback,
      overallConfidence: 'High',
    };

    // Auto-save so past scanned meals immediately show up in history
    persistScannedMeal(result);
    setActiveTab('dashboard');
  };

  // Confirm Foods Step (Calculate totals, compute health score, fetch Gemini feedback & auto-save to history)
  const handleConfirmFoods = async (updatedFoods: DetectedFoodItem[]) => {
    const totals = calculateMealTotals(updatedFoods);
    const healthScore = computeMealHealthScore(updatedFoods, totals);
    let coachFeedback = generateLocalCoachFeedback(updatedFoods, totals, healthScore);

    // Optionally enrich with Gemini feedback if server is responsive
    try {
      const resp = await fetch('/api/coach-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: updatedFoods,
          totals,
          healthScore,
        }),
      });
      const data = await resp.json();
      if (data.success && data.feedback) {
        coachFeedback = {
          good: data.feedback.good,
          improve: data.feedback.improve,
          tryThis: data.feedback.tryThis,
          summaryNote: 'Tailored AI feedback for college student hostel & canteen life.',
        };
      }
    } catch {
      // Use local coach feedback
    }

    const result: MealAnalysisResult = {
      id: `meal-${Date.now()}`,
      timestamp: Date.now(),
      imageUrl: currentImage || undefined,
      detectedFoods: updatedFoods,
      totalCalories: totals.calories,
      totalProtein: totals.protein,
      totalCarbs: totals.carbs,
      totalFat: totals.fat,
      totalFiber: totals.fiber,
      healthScore,
      feedback: coachFeedback,
      overallConfidence: updatedFoods.every(f => f.confidence > 0.8) ? 'High' : 'Medium',
    };

    // Automatically save confirmed scanned meal to history
    persistScannedMeal(result);
    setActiveTab('dashboard');
  };

  // Explicit Save current meal to history (if re-triggered from dashboard)
  const handleSaveToHistory = () => {
    if (!currentMealAnalysis) return;
    persistScannedMeal(currentMealAnalysis);
  };

  // Delete meal from history
  const handleDeleteMeal = (mealId: string) => {
    setHistory((prev) => {
      const updated = prev.filter(m => m.id !== mealId);
      saveMealHistory(updated);
      return updated;
    });
  };

  // Clear all history
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your meal scan history?')) {
      setHistory([]);
      try {
        localStorage.removeItem('nutrilens_meal_history');
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col text-slate-800 font-['Inter'] selection:bg-orange-100 selection:text-orange-950">
      
      {/* Website Background: Soft warm peach canvas with realistic floating citrus orange wheels & mint leaves */}
      <WebsiteBackground />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasCurrentMeal={Boolean(currentMealAnalysis)}
        historyCount={history.length}
      />

      {/* Main Content Area with Fluid Page Transition Animations */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomeView
                onStartScan={() => setActiveTab('scan')}
                onSelectPreset={handleSelectPreset}
                onOpenAwareness={() => setActiveTab('awareness')}
                onOpenHistory={() => setActiveTab('history')}
                onAnalyzeMeal={handleAnalyzeMeal}
              />
            )}

            {activeTab === 'scan' && (
              <ScannerView
                onAnalyze={handleAnalyzeMeal}
                isAnalyzing={isAnalyzing}
                onSelectPreset={handleSelectPreset}
              />
            )}

            {activeTab === 'review' && (
              <ConfirmationView
                detectedFoods={pendingDetectedFoods}
                imageUrl={currentImage || undefined}
                onConfirm={handleConfirmFoods}
                onRetake={() => setActiveTab('scan')}
              />
            )}

            {activeTab === 'dashboard' && currentMealAnalysis && (
              <NutritionDashboardView
                meal={currentMealAnalysis}
                onScanAnother={() => setActiveTab('scan')}
                onSaveToHistory={handleSaveToHistory}
                isSaved={isCurrentMealSaved}
                onOpenAwareness={() => setActiveTab('awareness')}
              />
            )}

            {activeTab === 'awareness' && (
              <AwarenessView
                onScanPrompt={() => setActiveTab('scan')}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                history={history}
                onSelectMeal={(meal) => {
                  setCurrentMealAnalysis(meal);
                  setCurrentImage(meal.imageUrl || null);
                  setIsCurrentMealSaved(true);
                  setActiveTab('dashboard');
                }}
                onDeleteMeal={handleDeleteMeal}
                onClearHistory={handleClearHistory}
                onScanNew={() => setActiveTab('scan')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer matching reference UI with "Better Food, Brighter Days" Banner */}
      <Footer
        onScanClick={() => setActiveTab('scan')}
        onNavClick={(tab) => setActiveTab(tab)}
      />

      {/* Floating Glassmorphism AI Health Assistant & BMI Engine Matching UI */}
      <AiHealthAssistant />

    </div>
  );
}
