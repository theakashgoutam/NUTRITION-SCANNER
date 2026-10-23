import { MealAnalysisResult } from '../types';

const STORAGE_KEY = 'nutrilens_meal_history';

/**
 * Clean meal record before persisting to prevent QuotaExceededError from large base64 strings.
 */
function sanitizeMealForStorage(meal: MealAnalysisResult): MealAnalysisResult {
  let safeImageUrl = meal.imageUrl;
  // If imageUrl is a massive base64 string (>35KB), truncate or retain clean ref
  if (safeImageUrl && safeImageUrl.startsWith('data:image/') && safeImageUrl.length > 35000) {
    safeImageUrl = undefined;
  }
  return {
    ...meal,
    imageUrl: safeImageUrl,
  };
}

/**
 * Load history safely from localStorage.
 * STRICTLY returns empty array if the user has not scanned anything yet.
 * Never hardcodes or seeds fake/sample meals.
 */
export function loadMealHistory(): MealAnalysisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to load meal history from localStorage:', err);
    return [];
  }
}

/**
 * Fetch persisted meals from server JSON backend (survives container restarts).
 */
export async function fetchMealsFromServer(): Promise<MealAnalysisResult[]> {
  try {
    const res = await fetch('/api/meals');
    const data = await res.json();
    if (data.success && Array.isArray(data.meals)) {
      // Sync local storage if server has newer or stored records
      if (data.meals.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.meals));
      }
      return data.meals;
    }
    return loadMealHistory();
  } catch (err) {
    console.warn('Server meal fetch failed, using local storage:', err);
    return loadMealHistory();
  }
}

/**
 * Save history safely to localStorage and asynchronously sync with backend JSON.
 */
export function saveMealHistory(history: MealAnalysisResult[]): boolean {
  try {
    const sanitized = history.map(sanitizeMealForStorage);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    return true;
  } catch (err) {
    console.warn('First save attempt failed (likely quota). Sanitizing older meals...', err);
    try {
      // Strip base64 data URLs from older meals
      const lightHistory = history.map((m, idx) => {
        if (idx === 0) return sanitizeMealForStorage(m);
        return {
          ...m,
          imageUrl: m.imageUrl?.startsWith('data:image/') ? undefined : m.imageUrl,
        };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightHistory));
      return true;
    } catch (fallbackErr) {
      console.error('Critical failure saving meal history:', fallbackErr);
      return false;
    }
  }
}

/**
 * Sync a single newly scanned meal to the server JSON database.
 */
export async function syncMealToServer(meal: MealAnalysisResult): Promise<void> {
  try {
    const sanitized = sanitizeMealForStorage(meal);
    await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitized),
    });
  } catch (err) {
    console.warn('Background server sync for meal skipped:', err);
  }
}

/**
 * Delete a meal from server JSON database.
 */
export async function deleteMealFromServer(mealId: string): Promise<void> {
  try {
    await fetch(`/api/meals/${encodeURIComponent(mealId)}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.warn('Server delete failed:', err);
  }
}

/**
 * Clear all meals from server JSON database.
 */
export async function clearAllMealsFromServer(): Promise<void> {
  try {
    await fetch('/api/meals', {
      method: 'DELETE',
    });
  } catch (err) {
    console.warn('Server clear failed:', err);
  }
}
