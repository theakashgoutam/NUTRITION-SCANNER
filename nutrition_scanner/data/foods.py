"""
Curated Nutrition Database for College & Student Meals
Deterministic nutritional reference data per 100g.
"""

FOODS_DATABASE = [
    {
        "id": "steamed-rice",
        "name": "Steamed White Rice",
        "icon": "🍚",
        "category": "Grains & Breads",
        "calories_per_100g": 130,
        "protein_per_100g": 2.7,
        "carbs_per_100g": 28.2,
        "fat_per_100g": 0.3,
        "fiber_per_100g": 0.4,
        "standard_grams": 180,
        "unit": "1 bowl (~180g)",
        "cost_est": 15,
        "tags": ["rice", "chawal", "white rice", "steamed rice"]
    },
    {
        "id": "jeera-rice",
        "name": "Jeera / Ghee Rice",
        "icon": "🍚",
        "category": "Grains & Breads",
        "calories_per_100g": 155,
        "protein_per_100g": 2.9,
        "carbs_per_100g": 29.0,
        "fat_per_100g": 3.2,
        "fiber_per_100g": 0.5,
        "standard_grams": 180,
        "unit": "1 bowl (~180g)",
        "cost_est": 25,
        "tags": ["jeera rice", "ghee rice", "flavored rice"]
    },
    {
        "id": "roti-phulka",
        "name": "Roti / Chapati (Phulka)",
        "icon": "🫓",
        "category": "Grains & Breads",
        "calories_per_100g": 264,
        "protein_per_100g": 9.0,
        "carbs_per_100g": 55.0,
        "fat_per_100g": 1.5,
        "fiber_per_100g": 8.0,
        "standard_grams": 70,
        "unit": "2 Rotis (~70g)",
        "cost_est": 16,
        "tags": ["roti", "chapati", "phulka", "flatbread", "wheat"]
    },
    {
        "id": "yellow-dal",
        "name": "Yellow Dal (Toor / Moong)",
        "icon": "🥣",
        "category": "Lentils & Curries",
        "calories_per_100g": 105,
        "protein_per_100g": 6.5,
        "carbs_per_100g": 15.5,
        "fat_per_100g": 2.0,
        "fiber_per_100g": 3.8,
        "standard_grams": 150,
        "unit": "1 katori (~150g)",
        "cost_est": 20,
        "tags": ["dal", "yellow dal", "toor dal", "moong dal", "lentils"]
    },
    {
        "id": "dal-tadka",
        "name": "Dal Tadka",
        "icon": "🥣",
        "category": "Lentils & Curries",
        "calories_per_100g": 135,
        "protein_per_100g": 6.0,
        "carbs_per_100g": 15.0,
        "fat_per_100g": 5.8,
        "fiber_per_100g": 3.5,
        "standard_grams": 150,
        "unit": "1 bowl (~150g)",
        "cost_est": 30,
        "tags": ["dal tadka", "tadka dal", "spiced dal"]
    },
    {
        "id": "rajma-masala",
        "name": "Rajma Masala (Kidney Beans)",
        "icon": "🫘",
        "category": "Lentils & Curries",
        "calories_per_100g": 140,
        "protein_per_100g": 8.2,
        "carbs_per_100g": 19.0,
        "fat_per_100g": 4.0,
        "fiber_per_100g": 6.5,
        "standard_grams": 170,
        "unit": "1 bowl (~170g)",
        "cost_est": 35,
        "tags": ["rajma", "kidney beans", "rajma chawal"]
    },
    {
        "id": "paneer-masala",
        "name": "Paneer Masala / Matar Paneer",
        "icon": "🧀",
        "category": "Protein & Dairy",
        "calories_per_100g": 195,
        "protein_per_100g": 11.5,
        "carbs_per_100g": 9.0,
        "fat_per_100g": 13.0,
        "fiber_per_100g": 1.5,
        "standard_grams": 150,
        "unit": "1 bowl (~150g)",
        "cost_est": 50,
        "tags": ["paneer", "cottage cheese", "matar paneer", "paneer butter"]
    },
    {
        "id": "boiled-egg",
        "name": "Boiled Eggs (2 pcs)",
        "icon": "🥚",
        "category": "Protein & Dairy",
        "calories_per_100g": 155,
        "protein_per_100g": 13.0,
        "carbs_per_100g": 1.1,
        "fat_per_100g": 11.0,
        "fiber_per_100g": 0.0,
        "standard_grams": 100,
        "unit": "2 Eggs (~100g)",
        "cost_est": 16,
        "tags": ["egg", "boiled egg", "eggs", "anda"]
    },
    {
        "id": "chicken-curry",
        "name": "Homestyle Chicken Curry",
        "icon": "🍗",
        "category": "Protein & Dairy",
        "calories_per_100g": 170,
        "protein_per_100g": 18.5,
        "carbs_per_100g": 4.0,
        "fat_per_100g": 9.0,
        "fiber_per_100g": 0.8,
        "standard_grams": 160,
        "unit": "1 bowl with 2 pcs (~160g)",
        "cost_est": 60,
        "tags": ["chicken", "chicken curry", "non veg", "murgh"]
    },
    {
        "id": "chicken-biryani",
        "name": "Chicken Biryani",
        "icon": "🥘",
        "category": "Protein & Dairy",
        "calories_per_100g": 200,
        "protein_per_100g": 12.0,
        "carbs_per_100g": 23.0,
        "fat_per_100g": 7.0,
        "fiber_per_100g": 1.5,
        "standard_grams": 300,
        "unit": "1 full plate (~300g)",
        "cost_est": 90,
        "tags": ["biryani", "chicken biryani", "dum biryani"]
    },
    {
        "id": "green-salad",
        "name": "Fresh Salad (Cucumber, Onion, Tomato)",
        "icon": "🥗",
        "category": "Salads & Sides",
        "calories_per_100g": 25,
        "protein_per_100g": 1.0,
        "carbs_per_100g": 4.5,
        "fat_per_100g": 0.2,
        "fiber_per_100g": 1.8,
        "standard_grams": 90,
        "unit": "1 plate (~90g)",
        "cost_est": 15,
        "tags": ["salad", "cucumber", "tomato", "onion", "raw veg", "kachumber"]
    },
    {
        "id": "cucumber-raita",
        "name": "Cucumber / Veg Raita",
        "icon": "🥣",
        "category": "Salads & Sides",
        "calories_per_100g": 70,
        "protein_per_100g": 3.2,
        "carbs_per_100g": 5.0,
        "fat_per_100g": 4.0,
        "fiber_per_100g": 0.8,
        "standard_grams": 130,
        "unit": "1 bowl (~130g)",
        "cost_est": 20,
        "tags": ["raita", "curd raita", "cucumber raita", "dahi"]
    },
    {
        "id": "curd-dahi",
        "name": "Plain Curd / Dahi",
        "icon": "🥛",
        "category": "Protein & Dairy",
        "calories_per_100g": 60,
        "protein_per_100g": 3.5,
        "carbs_per_100g": 4.5,
        "fat_per_100g": 3.1,
        "fiber_per_100g": 0.0,
        "standard_grams": 120,
        "unit": "1 katori (~120g)",
        "cost_est": 15,
        "tags": ["curd", "dahi", "yogurt", "probiotic"]
    },
    {
        "id": "mixed-vegetable-sabzi",
        "name": "Mixed Veg Sabzi (Hostel Style)",
        "icon": "🥦",
        "category": "Vegetables",
        "calories_per_100g": 90,
        "protein_per_100g": 2.5,
        "carbs_per_100g": 11.0,
        "fat_per_100g": 4.2,
        "fiber_per_100g": 3.5,
        "standard_grams": 130,
        "unit": "1 katori (~130g)",
        "cost_est": 20,
        "tags": ["sabzi", "mixed veg", "vegetables", "curry"]
    },
    {
        "id": "maggi-noodles",
        "name": "Maggi 2-Minute Instant Noodles",
        "icon": "🍜",
        "category": "Snacks & Canteen",
        "calories_per_100g": 400,
        "protein_per_100g": 8.0,
        "carbs_per_100g": 60.0,
        "fat_per_100g": 14.5,
        "fiber_per_100g": 2.5,
        "standard_grams": 180,
        "unit": "1 single pack cooked (~180g)",
        "cost_est": 20,
        "tags": ["maggi", "noodles", "instant noodles", "ramen"]
    },
    {
        "id": "samosa",
        "name": "Aloo Samosa (Deep Fried)",
        "icon": "🥟",
        "category": "Snacks & Canteen",
        "calories_per_100g": 310,
        "protein_per_100g": 4.5,
        "carbs_per_100g": 32.0,
        "fat_per_100g": 18.0,
        "fiber_per_100g": 2.0,
        "standard_grams": 80,
        "unit": "1 piece (~80g)",
        "cost_est": 15,
        "tags": ["samosa", "fried snack", "canteen", "aloo samosa"]
    },
    {
        "id": "steamed-momos",
        "name": "Steamed Veg / Chicken Momos",
        "icon": "🥟",
        "category": "Snacks & Canteen",
        "calories_per_100g": 175,
        "protein_per_100g": 8.0,
        "carbs_per_100g": 26.0,
        "fat_per_100g": 4.5,
        "fiber_per_100g": 1.6,
        "standard_grams": 120,
        "unit": "5 pieces (~120g)",
        "cost_est": 40,
        "tags": ["momos", "steamed momos", "dumplings"]
    },
    {
        "id": "roasted-chana",
        "name": "Roasted Chana (Student Snack)",
        "icon": "🥜",
        "category": "Protein & Dairy",
        "calories_per_100g": 370,
        "protein_per_100g": 19.0,
        "carbs_per_100g": 58.0,
        "fat_per_100g": 5.5,
        "fiber_per_100g": 12.0,
        "standard_grams": 50,
        "unit": "1 pouch (~50g)",
        "cost_est": 15,
        "tags": ["chana", "roasted chana", "snack", "cheap protein"]
    },
    {
        "id": "poha",
        "name": "Poha with Peanuts",
        "icon": "🥣",
        "category": "Grains & Breads",
        "calories_per_100g": 180,
        "protein_per_100g": 3.5,
        "carbs_per_100g": 33.0,
        "fat_per_100g": 4.5,
        "fiber_per_100g": 2.0,
        "standard_grams": 150,
        "unit": "1 plate (~150g)",
        "cost_est": 25,
        "tags": ["poha", "breakfast", "flattened rice"]
    }
]

def search_food(query: str):
    q = query.lower().strip()
    # Exact name match
    for f in FOODS_DATABASE:
        if f["name"].lower() == q or f["id"] == q:
            return f
    # Tag match
    for f in FOODS_DATABASE:
        if any(t in q or q in t for t in f["tags"]):
            return f
    # Substring match
    for f in FOODS_DATABASE:
        if q in f["name"].lower():
            return f
    return None
