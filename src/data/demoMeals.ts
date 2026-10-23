export interface QuickPlateInspiration {
  id: string;
  name: string;
  description: string;
  mealType: 'Lunch' | 'Dinner' | 'Late Night' | 'Breakfast';
  imageUrl: string;
  tag: string;
  detectedFoods: {
    foodDatabaseId: string;
    name: string;
    portionLabel: string;
    estimatedGrams: number;
    servingMultiplier: number;
    portionSize: 'Small' | 'Medium' | 'Large';
    confidence: number;
  }[];
}

// For backwards compatibility
export type DemoPresetMeal = QuickPlateInspiration;

export const QUICK_PLATE_INSPIRATIONS: QuickPlateInspiration[] = [
  {
    id: 'rajma-chawal-roti',
    name: 'Rajma + Jeera Rice + 2 Rotis',
    description: 'High in complex carbohydrates and wholesome plant protein.',
    mealType: 'Lunch',
    tag: 'Balanced Protein',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    detectedFoods: [
      {
        foodDatabaseId: 'rajma-masala',
        name: 'Rajma Masala (Kidney Beans)',
        portionLabel: '1 bowl (~170g)',
        estimatedGrams: 170,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.94,
      },
      {
        foodDatabaseId: 'jeera-rice',
        name: 'Jeera Rice / Ghee Rice',
        portionLabel: '1 bowl (~180g)',
        estimatedGrams: 180,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.91,
      },
      {
        foodDatabaseId: 'roti-phulka',
        name: 'Roti / Chapati (Phulka)',
        portionLabel: '2 Rotis (70g)',
        estimatedGrams: 70,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.89,
      },
      {
        foodDatabaseId: 'green-salad',
        name: 'Fresh Salad (Cucumber, Onion, Tomato)',
        portionLabel: 'Small portion (~60g)',
        estimatedGrams: 60,
        servingMultiplier: 0.67,
        portionSize: 'Small',
        confidence: 0.85,
      }
    ]
  },
  {
    id: 'paneer-roti-salad',
    name: 'Paneer Masala + 2 Rotis + Green Salad',
    description: 'High-protein vegetarian plate with satiety from cottage cheese and fiber.',
    mealType: 'Dinner',
    tag: 'High Protein Vegetarian',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    detectedFoods: [
      {
        foodDatabaseId: 'paneer-curry',
        name: 'Paneer Masala / Matar Paneer',
        portionLabel: '1 bowl (~150g)',
        estimatedGrams: 150,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.95,
      },
      {
        foodDatabaseId: 'roti-phulka',
        name: 'Roti / Chapati (Phulka)',
        portionLabel: '2 Rotis (70g)',
        estimatedGrams: 70,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.92,
      },
      {
        foodDatabaseId: 'green-salad',
        name: 'Fresh Salad (Cucumber, Onion, Tomato)',
        portionLabel: '1 small plate (~90g)',
        estimatedGrams: 90,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.88,
      }
    ]
  },
  {
    id: 'chicken-biryani-raita',
    name: 'Chicken Biryani + Onion Veg Raita',
    description: 'High protein plate with digestive cooling cucumber raita.',
    mealType: 'Dinner',
    tag: 'High Protein Plate',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    detectedFoods: [
      {
        foodDatabaseId: 'chicken-biryani',
        name: 'Chicken Biryani',
        portionLabel: '1 full plate (~300g)',
        estimatedGrams: 300,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.96,
      },
      {
        foodDatabaseId: 'cucumber-raita',
        name: 'Cucumber / Veg Raita',
        portionLabel: '1 bowl (~130g)',
        estimatedGrams: 130,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.86,
      }
    ]
  },
  {
    id: 'maggi-egg',
    name: 'Noodles + 2 Boiled Eggs',
    description: 'Balancing quick carbs with 13g of egg protein.',
    mealType: 'Late Night',
    tag: 'Quick Protein Upgrade',
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    detectedFoods: [
      {
        foodDatabaseId: 'maggi-noodles',
        name: 'Maggi 2-Minute Instant Noodles',
        portionLabel: '1 single pack (~180g)',
        estimatedGrams: 180,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.93,
      },
      {
        foodDatabaseId: 'boiled-egg',
        name: 'Boiled Egg',
        portionLabel: '2 Eggs (100g)',
        estimatedGrams: 100,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.92,
      }
    ]
  },
  {
    id: 'dal-rice-sabzi',
    name: 'Dal Tadka + Steamed Rice + Veg Sabzi + Dahi',
    description: 'Traditional wholesome everyday balanced thali plate.',
    mealType: 'Lunch',
    tag: 'Daily Balanced Plate',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    detectedFoods: [
      {
        foodDatabaseId: 'yellow-dal',
        name: 'Yellow Dal (Toor / Moong)',
        portionLabel: '1 bowl (~150g)',
        estimatedGrams: 150,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.91,
      },
      {
        foodDatabaseId: 'steamed-rice',
        name: 'Steamed White Rice',
        portionLabel: '1 bowl (~180g)',
        estimatedGrams: 180,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.94,
      },
      {
        foodDatabaseId: 'mixed-vegetable-sabzi',
        name: 'Mixed Veg Sabzi',
        portionLabel: '1 katori (~130g)',
        estimatedGrams: 130,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.87,
      },
      {
        foodDatabaseId: 'curd-dahi',
        name: 'Plain Curd / Dahi',
        portionLabel: '1 katori (~120g)',
        estimatedGrams: 120,
        servingMultiplier: 1.0,
        portionSize: 'Medium',
        confidence: 0.83,
      }
    ]
  }
];

// Backwards compatibility
export const DEMO_PRESET_MEALS = QUICK_PLATE_INSPIRATIONS;
