import { FoodItemData, DetectedFoodItem, HealthScoreBreakdown, MealCoachFeedback } from '../types';
import { INDIAN_FOODS_DATABASE, findFoodInDatabase } from '../data/foods';

export function calculateItemNutrition(
  foodData: FoodItemData,
  grams: number
): { calories: number; protein: number; carbs: number; fat: number; fiber: number } {
  const ratio = grams / 100;
  return {
    calories: Math.round(foodData.caloriesPer100g * ratio),
    protein: Math.round(foodData.proteinPer100g * ratio * 10) / 10,
    carbs: Math.round(foodData.carbsPer100g * ratio * 10) / 10,
    fat: Math.round(foodData.fatPer100g * ratio * 10) / 10,
    fiber: Math.round(foodData.fiberPer100g * ratio * 10) / 10,
  };
}

export function calculateMealTotals(items: DetectedFoodItem[]): {
  calories: { min: number; max: number; average: number };
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
} {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;

  for (const item of items) {
    totalCalories += item.calories;
    totalProtein += item.protein;
    totalCarbs += item.carbs;
    totalFat += item.fat;
    totalFiber += item.fiber;
  }

  // Rounded range to prevent false calorie precision (as mandated in PRD)
  const avg = Math.round(totalCalories);
  const variance = Math.max(30, Math.round(avg * 0.08));
  const min = Math.round((avg - variance) / 10) * 10;
  const max = Math.round((avg + variance) / 10) * 10;

  return {
    calories: {
      min,
      max,
      average: avg,
    },
    protein: Math.round(totalProtein * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    fat: Math.round(totalFat * 10) / 10,
    fiber: Math.round(totalFiber * 10) / 10,
  };
}

export function computeMealHealthScore(
  items: DetectedFoodItem[],
  totals: { calories: { average: number }; protein: number; carbs: number; fat: number; fiber: number }
): HealthScoreBreakdown {
  const { protein, carbs, fat, fiber } = totals;
  const cal = totals.calories.average || 1;

  // 1. Protein Score (0 - 20)
  // Target: 20g - 30g is ideal for a student main meal (20 pts)
  let proteinScore = 0;
  let proteinStatus: 'Low' | 'Adequate' | 'Good' | 'High' = 'Low';
  if (protein >= 22) {
    proteinScore = 20;
    proteinStatus = 'Good';
  } else if (protein >= 15) {
    proteinScore = 16;
    proteinStatus = 'Adequate';
  } else if (protein >= 8) {
    proteinScore = 11;
    proteinStatus = 'Low';
  } else {
    proteinScore = 6;
    proteinStatus = 'Low';
  }

  // 2. Fiber Score (0 - 20)
  // Target: 6g - 12g for healthy gut & slow glucose curve
  let fiberScore = 0;
  let fiberStatus: 'Low' | 'Moderate' | 'High' = 'Low';
  if (fiber >= 8) {
    fiberScore = 20;
    fiberStatus = 'High';
  } else if (fiber >= 5) {
    fiberScore = 15;
    fiberStatus = 'Moderate';
  } else if (fiber >= 2) {
    fiberScore = 10;
    fiberStatus = 'Low';
  } else {
    fiberScore = 5;
    fiberStatus = 'Low';
  }

  // 3. Portion & Calorie Balance Score (0 - 20)
  // Target: 450 - 750 kcal is typical healthy main meal for active college students
  let portionBalanceScore = 0;
  let portionStatus: 'Light' | 'Balanced' | 'Heavy' = 'Balanced';
  if (cal >= 450 && cal <= 750) {
    portionBalanceScore = 20;
    portionStatus = 'Balanced';
  } else if ((cal >= 350 && cal < 450) || (cal > 750 && cal <= 900)) {
    portionBalanceScore = 15;
    portionStatus = cal < 450 ? 'Light' : 'Heavy';
  } else if (cal > 900) {
    portionBalanceScore = 9;
    portionStatus = 'Heavy';
  } else {
    portionBalanceScore = 12;
    portionStatus = 'Light';
  }

  // 4. Carb Quality & Ratio Score (0 - 20)
  // 45% - 60% of calories from carbs is healthy Indian benchmark.
  // Over 70% carbs lowers score (typical hostel rice/maggi spike).
  const carbCalories = carbs * 4;
  const carbPercentage = (carbCalories / cal) * 100;
  let carbQualityScore = 0;
  let carbStatus: 'Excessive' | 'Moderate' | 'Optimal' = 'Moderate';

  if (carbPercentage >= 40 && carbPercentage <= 62) {
    carbQualityScore = 20;
    carbStatus = 'Optimal';
  } else if (carbPercentage > 62 && carbPercentage <= 72) {
    carbQualityScore = 14;
    carbStatus = 'Moderate';
  } else if (carbPercentage > 72) {
    carbQualityScore = 8;
    carbStatus = 'Excessive';
  } else {
    carbQualityScore = 16;
    carbStatus = 'Optimal';
  }

  // 5. Fat Quality & Balance Score (0 - 20)
  // 20% - 35% fat calories is balanced. Over 40% signals oily mess gravy/deep frying.
  const fatCalories = fat * 9;
  const fatPercentage = (fatCalories / cal) * 100;
  let fatQualityScore = 0;
  let fatStatus: 'Oily/High' | 'Moderate' | 'Balanced' = 'Balanced';

  if (fatPercentage >= 18 && fatPercentage <= 32) {
    fatQualityScore = 20;
    fatStatus = 'Balanced';
  } else if (fatPercentage > 32 && fatPercentage <= 42) {
    fatQualityScore = 14;
    fatStatus = 'Moderate';
  } else if (fatPercentage > 42) {
    fatQualityScore = 7;
    fatStatus = 'Oily/High';
  } else {
    fatQualityScore = 16;
    fatStatus = 'Balanced';
  }

  // Check if salad or fresh vegetables exist
  const hasSaladOrVeggies = items.some(
    it => it.foodDatabaseId === 'green-salad' || it.foodDatabaseId === 'cucumber-raita' || it.foodDatabaseId === 'sprouts-salad' || it.foodDatabaseId === 'mixed-vegetable-sabzi'
  );
  if (hasSaladOrVeggies) {
    fiberScore = Math.min(20, fiberScore + 2);
  }

  const overallScore = Math.min(
    100,
    Math.max(25, proteinScore + fiberScore + portionBalanceScore + carbQualityScore + fatQualityScore)
  );

  let category: 'Needs Attention' | 'Moderate Balance' | 'Nutrient Rich' | 'Exceptional';
  if (overallScore >= 80) {
    category = 'Exceptional';
  } else if (overallScore >= 68) {
    category = 'Nutrient Rich';
  } else if (overallScore >= 50) {
    category = 'Moderate Balance';
  } else {
    category = 'Needs Attention';
  }

  return {
    overallScore,
    category,
    proteinScore,
    fiberScore,
    portionBalanceScore,
    carbQualityScore,
    fatQualityScore,
    proteinStatus,
    fiberStatus,
    portionStatus,
    carbStatus,
    fatStatus,
  };
}

export function generateLocalCoachFeedback(
  items: DetectedFoodItem[],
  totals: { calories: { average: number }; protein: number; carbs: number; fat: number; fiber: number },
  healthScore: HealthScoreBreakdown
): MealCoachFeedback {
  // Find highest protein item
  const proteinItem = [...items].sort((a, b) => b.protein - a.protein)[0];
  const carbHeavy = healthScore.carbStatus === 'Excessive';
  const lowFiber = healthScore.fiberStatus === 'Low';
  const isOily = healthScore.fatStatus === 'Oily/High';
  const hasSalad = items.some(it => it.name.toLowerCase().includes('salad') || it.name.toLowerCase().includes('cucumber'));

  let good = 'Your meal provides solid sustained fuel for your college classes.';
  if (totals.protein >= 18 && proteinItem) {
    good = `Great protein source: ${proteinItem.name} provides ~${proteinItem.protein}g protein for muscle recovery and alertness.`;
  } else if (totals.fiber >= 6) {
    good = 'Good dietary fiber content helps prevent afternoon study drowsiness and keeps you full.';
  } else if (items.length >= 3) {
    good = `Nice variety across ${items.length} meal components providing multiple micronutrients.`;
  }

  let improve = 'Carbohydrate ratio is relatively high compared to protein.';
  if (carbHeavy) {
    improve = 'The meal is carbohydrate-heavy with rice/breads dominating over lentils and vegetables.';
  } else if (isOily) {
    improve = 'Cooking oil or deep-fried elements are elevating the total calorie density significantly.';
  } else if (lowFiber) {
    improve = 'Very little raw dietary fiber or non-starchy vegetables in this plate.';
  } else if (totals.protein < 12) {
    improve = 'Protein content is under 12g, which may lead to hunger cravings before your evening study session.';
  }

  let tryThis = 'Add a katori of curd (dahi) or an egg from the canteen to boost protein.';
  if (carbHeavy && !hasSalad) {
    tryThis = 'Reduce rice portion by 1/4th and grab a cucumber or fresh salad from the mess counter.';
  } else if (isOily) {
    tryThis = 'Drain excess gravy oil with your spoon edge and opt for roasted or tawa items instead of deep-fried.';
  } else if (lowFiber) {
    tryThis = 'Ask the canteen for sliced raw onions, tomato, or a katori of sprouts with lemon juice.';
  } else if (totals.protein < 15) {
    tryThis = 'Pair this with a ₹15 pack of roasted chana or 2 boiled eggs to hit 20g+ protein effortlessly.';
  }

  return {
    good,
    improve,
    tryThis,
    summaryNote: 'Educational feedback tailored for college & hostel mess diets.',
  };
}

export function buildDetectedItemFromDatabase(
  food: FoodItemData,
  portionSize: 'Small' | 'Medium' | 'Large' = 'Medium',
  confidence = 0.9
): DetectedFoodItem {
  let grams = food.standardServingGrams;
  let multiplier = 1.0;
  let label = food.servingSizeUnit;

  if (portionSize === 'Small') {
    multiplier = 0.7;
    grams = Math.round(food.standardServingGrams * 0.7);
    label = `Small (~${grams}g)`;
  } else if (portionSize === 'Large') {
    multiplier = 1.4;
    grams = Math.round(food.standardServingGrams * 1.4);
    label = `Large (~${grams}g)`;
  }

  const nutrition = calculateItemNutrition(food, grams);

  return {
    id: `${food.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    foodDatabaseId: food.id,
    name: food.name,
    portionLabel: label,
    estimatedGrams: grams,
    servingMultiplier: multiplier,
    portionSize,
    confidence,
    ...nutrition,
  };
}

export function updateItemPortion(
  item: DetectedFoodItem,
  newPortion: 'Small' | 'Medium' | 'Large'
): DetectedFoodItem {
  const foodData = item.foodDatabaseId
    ? INDIAN_FOODS_DATABASE.find(f => f.id === item.foodDatabaseId)
    : findFoodInDatabase(item.name);

  if (!foodData) {
    // Custom item fallback multiplier
    let mult = 1.0;
    if (newPortion === 'Small') mult = 0.7;
    if (newPortion === 'Large') mult = 1.4;
    const baseGrams = item.estimatedGrams / (item.servingMultiplier || 1);
    const newGrams = Math.round(baseGrams * mult);
    return {
      ...item,
      portionSize: newPortion,
      servingMultiplier: mult,
      estimatedGrams: newGrams,
      portionLabel: `${newPortion} (~${newGrams}g)`,
      calories: Math.round(item.calories * (mult / item.servingMultiplier)),
      protein: Math.round(item.protein * (mult / item.servingMultiplier) * 10) / 10,
      carbs: Math.round(item.carbs * (mult / item.servingMultiplier) * 10) / 10,
      fat: Math.round(item.fat * (mult / item.servingMultiplier) * 10) / 10,
      fiber: Math.round(item.fiber * (mult / item.servingMultiplier) * 10) / 10,
      isUserModified: true,
    };
  }

  let grams = foodData.standardServingGrams;
  let mult = 1.0;
  if (newPortion === 'Small') {
    mult = 0.7;
    grams = Math.round(foodData.standardServingGrams * 0.7);
  } else if (newPortion === 'Large') {
    mult = 1.4;
    grams = Math.round(foodData.standardServingGrams * 1.4);
  }

  const nutrition = calculateItemNutrition(foodData, grams);

  return {
    ...item,
    portionSize: newPortion,
    servingMultiplier: mult,
    estimatedGrams: grams,
    portionLabel: `${newPortion} (~${grams}g)`,
    ...nutrition,
    isUserModified: true,
  };
}
