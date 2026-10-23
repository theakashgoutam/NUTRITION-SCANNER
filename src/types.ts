export interface FoodItemData {
  id: string;
  name: string;
  category: 'Grains & Breads' | 'Lentils & Curries' | 'Vegetables' | 'Protein & Dairy' | 'Snacks & Canteen' | 'Breakfast' | 'Salads & Sides';
  servingSizeUnit: string;
  standardServingGrams: number;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
  commonPortionOptions: { label: string; grams: number; multiplier: number }[];
  tags: string[];
}

export interface DetectedFoodItem {
  id: string;
  foodDatabaseId?: string;
  name: string;
  portionLabel: string;
  estimatedGrams: number;
  servingMultiplier: number;
  portionSize: 'Small' | 'Medium' | 'Large' | 'Custom';
  confidence: number; // 0 to 1
  isUserModified?: boolean;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface HealthScoreBreakdown {
  overallScore: number;
  category: 'Needs Attention' | 'Moderate Balance' | 'Nutrient Rich' | 'Exceptional';
  proteinScore: number; // 0 - 20
  fiberScore: number; // 0 - 20
  portionBalanceScore: number; // 0 - 20
  carbQualityScore: number; // 0 - 20
  fatQualityScore: number; // 0 - 20
  proteinStatus: 'Low' | 'Adequate' | 'Good' | 'High';
  fiberStatus: 'Low' | 'Moderate' | 'High';
  portionStatus: 'Light' | 'Balanced' | 'Heavy';
  carbStatus: 'Excessive' | 'Moderate' | 'Optimal';
  fatStatus: 'Oily/High' | 'Moderate' | 'Balanced';
}

export interface MealCoachFeedback {
  good: string;
  improve: string;
  tryThis: string;
  summaryNote?: string;
}

export interface MealAnalysisResult {
  id: string;
  timestamp: number | string;
  imageUrl?: string;
  mealType?: 'Breakfast' | 'Lunch' | 'Evening Snack' | 'Dinner' | 'Late Night';
  detectedFoods: DetectedFoodItem[];
  totalCalories: { min: number; max: number; average: number };
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  healthScore: HealthScoreBreakdown;
  feedback: MealCoachFeedback;
  overallConfidence: 'High' | 'Medium' | 'Low';
  isSimulated?: boolean;
}

export interface AwarenessCard {
  id: string;
  title: string;
  category: 'Nutrition 101' | 'Mess & Canteen Hacks' | 'Portion Sense' | 'Student Wellness';
  emoji: string;
  summary: string;
  bulletPoints: string[];
  studentTip: string;
  readTime: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium';
  tag: string;
  actionPrompt: string;
  completed?: boolean;
}
