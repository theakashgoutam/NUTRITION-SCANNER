import { AwarenessCard, DailyChallenge } from '../types';

export const AWARENESS_CARDS: AwarenessCard[] = [
  {
    id: 'why-protein-matters',
    title: 'Why Protein Matters for Students',
    category: 'Nutrition 101',
    emoji: '💪',
    summary: 'Most hostel meals are 80%+ carbohydrates. Getting enough protein keeps your brain sharp and prevents the dreaded 3 PM study coma.',
    bulletPoints: [
      'Protein fuels neurotransmitters that help focus, memory, and sustained exam revision.',
      'Unlike pure carbs (like plain rice or Maggi), protein triggers satiety hormones so you don\'t get hungry 1 hour later.',
      'Top hostel sources: Dal (opt for thick dal), boiled eggs from nearby stalls, curd/dahi, chole/rajma, and sattu/roasted chana.'
    ],
    studentTip: 'If your mess dal is too watery, grab 2 boiled eggs from the canteen or mix 2 spoons of curd to hit your protein goal.',
    readTime: '2 min read',
  },
  {
    id: 'understanding-portions',
    title: 'Visual Portion Guide (No Weighing Scale)',
    category: 'Portion Sense',
    emoji: '✋',
    summary: 'You do not need a food scale in your hostel room. Your own hand is a calibrated portable measurement tool.',
    bulletPoints: [
      'Palm = 1 serving of protein (paneer slice, chicken piece, or 2 boiled eggs).',
      'Cupped Hand = 1 serving of rice or cooked dal (roughly 1 katori or ~150–180g).',
      'Fist = 1 serving of cooked vegetables, sabzi, or fruit.',
      'Thumb tip = 1 serving of oil, butter, or ghee (~1 teaspoon).'
    ],
    studentTip: 'When loading your mess thali, aim for 2 cupped hands of veggies/dal for every 1 cupped hand of rice.',
    readTime: '2 min read',
  },
  {
    id: 'hidden-cooking-oil',
    title: 'The Hidden Cooking Oil in Mess Food',
    category: 'Mess & Canteen Hacks',
    emoji: '🛢️',
    summary: 'Hostel mess and dhabas rely heavily on palm or refined vegetable oils for preservation and fast bulk cooking.',
    bulletPoints: [
      'A single tablespoon of floating oil adds ~120 empty calories with zero protein or micronutrients.',
      'Gravy curries like paneer butter masala or oily dal tadka often carry 15–20g of added cooking oil per serving.',
      'Deep-fried puris and bhature absorb up to 25% of their weight in hot oil.'
    ],
    studentTip: 'Tilt your serving spoon against the edge of the vessel to drain excess oil before pouring curry onto your plate.',
    readTime: '2 min read',
  },
  {
    id: 'why-fiber-matters',
    title: 'Fiber: The Hostel Gut Guardian',
    category: 'Nutrition 101',
    emoji: '🌾',
    summary: 'Irregular mess food often leads to sluggish digestion, acidity, and bloating. Dietary fiber is the ultimate natural remedy.',
    bulletPoints: [
      'Soluble fiber slows down sugar absorption, preventing sleepiness right after lunch.',
      'Insoluble fiber supports smooth digestion and prevents common hostel stomach distress.',
      'Easy student fiber boosts: Whole wheat rotis over refined naan, unpeeled cucumbers, carrots, and rajma/chana.'
    ],
    studentTip: 'Ask the mess counter for raw sliced onions and cucumbers. Eating them before rice reduces blood sugar spikes by 25%.',
    readTime: '2 min read',
  },
  {
    id: 'balanced-indian-thali',
    title: 'The Golden Rule of the Balanced Thali',
    category: 'Nutrition 101',
    emoji: '🍛',
    summary: 'Transform any standard mess thali into a balanced powerhouse using the 50-25-25 distribution rule.',
    bulletPoints: [
      '50% (Half your plate): Non-starchy vegetables and fresh salad (sabzi, cucumber, tomato).',
      '25% (Quarter plate): High-quality protein (thick dal, rajma, chole, paneer, curd, or eggs).',
      '25% (Quarter plate): Slow complex carbohydrates (1–2 rotis or 1 small cup of rice, not both piled high).'
    ],
    studentTip: 'Avoid the "Rice Mountain" habit where 80% of the stainless steel thali is filled with white rice alone.',
    readTime: '2 min read',
  },
  {
    id: 'smart-canteen-choices',
    title: 'Smart Swaps at the College Canteen',
    category: 'Mess & Canteen Hacks',
    emoji: '🥪',
    summary: 'You do not need to starve when hanging out with friends at the campus canteen—just make high-leverage swaps.',
    bulletPoints: [
      'Swap fried samosa (310 kcal, 18g fat) ➔ Steamed veg or chicken momos / egg roll with less mayo.',
      'Swap packaged cold drinks / sodas (150 kcal sugar) ➔ Cold salted chhaas / plain sweet lassi / fresh coconut water.',
      'Swap plain white bread toast ➔ Poha or vegetable idli-sambar from the South Indian counter.'
    ],
    studentTip: 'Canteen chhaas (buttermilk) costs under ₹15, hydrates you, provides probiotics, and aids digestion during hot afternoons.',
    readTime: '2 min read',
  },
  {
    id: 'hydration-vs-fatigue',
    title: 'Are You Tired or Just Dehydrated?',
    category: 'Student Wellness',
    emoji: '💧',
    summary: 'A 2% drop in hydration reduces academic concentration by up to 20%. College fatigue is frequently disguised thirst.',
    bulletPoints: [
      'Air-conditioned library rooms and caffeine from late-night coffee accelerate dehydration without you noticing.',
      'Mild dehydration causes headaches, lethargy, and pseudo-hunger cravings for salty chips or biscuits.',
      'Aim for 2.5 to 3 liters daily. Check your urine color: pale straw yellow indicates optimal hydration.'
    ],
    studentTip: 'Keep a 1-liter water bottle on your study desk. Finish one before 12 PM, second before 5 PM, third before sleep.',
    readTime: '1 min read',
  },
  {
    id: 'maggi-instant-noodles-upgrade',
    title: 'The Exam-Night Maggi Upgrade',
    category: 'Mess & Canteen Hacks',
    emoji: '🍜',
    summary: 'Students will always eat instant noodles—let us make them 3x more nutritious instead of demonizing them.',
    bulletPoints: [
      'Plain Maggi is high in sodium and refined flour with almost zero protein or vitamins.',
      'Hack 1: Crack 1 or 2 eggs into boiling noodles for 12g of complete bioavailable protein.',
      'Hack 2: Toss in a handful of frozen peas, chopped tomatoes, or paneer cubes from the mess fridge.',
      'Hack 3: Use half the seasoning packet to reduce sodium intake by 50% and flavor with black pepper and chilli flakes.'
    ],
    studentTip: 'Adding protein and veggies cuts the glycemic index, meaning no crashing mid-way through your 2 AM syllabus cramming.',
    readTime: '2 min read',
  },
  {
    id: 'reading-student-food-labels',
    title: 'How to Read Packaged Food Labels',
    category: 'Portion Sense',
    emoji: '🏷️',
    summary: 'Canteen snacks often brag about "Wheat" or "Healthy Oats" while concealing the first ingredient is refined palm sugar.',
    bulletPoints: [
      'Ingredients are listed in order of quantity: if "Sugar" or "Maida" is in the top 3, it is basically dessert.',
      'Check the serving size: a ₹20 pack of potato chips often claims "only 120 calories" but contains 3 servings in one small bag.',
      'Watch out for hidden sugar aliases: Maltodextrin, High Fructose Corn Syrup, Invert Syrup, and Dextrose.'
    ],
    studentTip: 'Check protein-to-sugar ratio: if sugar grams are higher than protein grams, it will trigger an insulin spike followed by lethargy.',
    readTime: '2 min read',
  },
  {
    id: 'budget-student-nutrition',
    title: 'High Protein on a Tight Student Budget',
    category: 'Mess & Canteen Hacks',
    emoji: '💰',
    summary: 'You do not need expensive protein powders or exotic foods. Traditional Indian staples provide maximum nutrition per rupee.',
    bulletPoints: [
      'Roasted Chana (₹20/bag): ~19g protein per 100g, shelf-stable, no cooking required.',
      'Sattu Drink (₹15/glass): Nature\'s student protein shake, rich in iron, calcium, and dietary fiber.',
      'Boiled Eggs: Under ₹10 per egg, provides 6g protein with essential choline for cognitive brain function.',
      'Peanuts: High healthy fats and protein, perfect study snack when roasted without palm oil.'
    ],
    studentTip: 'A ₹15 packet of roasted chana in your backpack is the best defense against impulsive ₹50 canteen fried snack purchases.',
    readTime: '2 min read',
  }
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'challenge-fiber-boost',
    title: 'Color Your Plate with Fiber',
    description: 'Add at least one raw or fresh fiber source (cucumber, raw onion, carrot, or tomato) to your next lunch or dinner.',
    difficulty: 'Easy',
    tag: 'Digestion & Satiety',
    actionPrompt: 'Snap a meal with salad included today!',
  },
  {
    id: 'challenge-oil-drain',
    title: 'The 1-Spoon Oil Drain',
    description: 'Drain excess oil from your mess curry or dal using the spoon edge before serving onto your plate.',
    difficulty: 'Easy',
    tag: 'Calorie Control',
    actionPrompt: 'Save ~80–120 empty calories without reducing food quantity.',
  },
  {
    id: 'challenge-protein-upgrade',
    title: 'Target 15g+ Protein in One Meal',
    description: 'Pair your meal with at least one high-protein item (thick dal + curd, 2 boiled eggs, or paneer/chole).',
    difficulty: 'Medium',
    tag: 'Focus & Energy',
    actionPrompt: 'Check your Meal Health Score to see if your Protein meter reaches Good!',
  },
  {
    id: 'challenge-hydration-kick',
    title: 'The 1-Liter Morning Challenge',
    description: 'Drink a full 1-liter bottle of clean water before your afternoon lectures begin.',
    difficulty: 'Easy',
    tag: 'Brain Hydration',
    actionPrompt: 'Notice how much sharper your afternoon focus feels.',
  },
  {
    id: 'challenge-smart-canteen-swap',
    title: 'The Canteen Drink Swap',
    description: 'Replace a sugary bottled soda or packaged fruit drink with chilled chhaas (buttermilk), coconut water, or lime water.',
    difficulty: 'Medium',
    tag: 'Zero Added Sugar',
    actionPrompt: 'Eliminate 30g of refined fructose in one simple move.',
  }
];
