"""
NutriLens AI - Python Nutrition Engine
Deterministic nutritional calculations based on curated Indian food baseline dataset.
"""

import os
import pandas as pd
import numpy as np

DATABASE_PATH = os.path.join(os.path.dirname(__file__), "nutrition_data.csv")

def load_nutrition_database():
    try:
        df = pd.read_csv(DATABASE_PATH)
        return df
    except Exception as e:
        print(f"Error loading nutrition database: {e}")
        return pd.DataFrame()

DB = load_nutrition_database()

def find_food_in_db(name: str):
    """Fuzzy and keyword matching against local database."""
    if DB.empty:
        return None

    clean_name = name.lower().strip()
    
    # Exact match on name or id
    exact = DB[DB["name"].str.lower() == clean_name]
    if not exact.empty:
        return exact.iloc[0].to_dict()

    # Tag search
    for _, row in DB.iterrows():
        tags = [t.strip().lower() for t in str(row["tags"]).split(",")]
        if any(t in clean_name or clean_name in t for t in tags):
            return row.to_dict()

    # Substring search
    sub = DB[DB["name"].str.lower().str.contains(clean_name, regex=False)]
    if not sub.empty:
        return sub.iloc[0].to_dict()

    return None

def calculate_item_nutrition(food_dict: dict, grams: float):
    ratio = grams / 100.0
    return {
        "calories": int(round(food_dict["calories_per_100g"] * ratio)),
        "protein": round(food_dict["protein_per_100g"] * ratio, 1),
        "carbs": round(food_dict["carbs_per_100g"] * ratio, 1),
        "fat": round(food_dict["fat_per_100g"] * ratio, 1),
        "fiber": round(food_dict["fiber_per_100g"] * ratio, 1),
    }

def calculate_meal_totals(items: list):
    """Calculates meal totals with rounded calorie range to prevent fake precision."""
    total_cals = sum(item["calories"] for item in items)
    total_prot = sum(item["protein"] for item in items)
    total_carbs = sum(item["carbs"] for item in items)
    total_fat = sum(item["fat"] for item in items)
    total_fiber = sum(item["fiber"] for item in items)

    # Uncertainty window (8-10%)
    variance = max(30, int(round(total_cals * 0.08)))
    min_cals = int(round((total_cals - variance) / 10.0) * 10)
    max_cals = int(round((total_cals + variance) / 10.0) * 10)

    return {
        "calories_min": min_cals,
        "calories_max": max_cals,
        "calories_avg": total_cals,
        "protein": round(total_prot, 1),
        "carbs": round(total_carbs, 1),
        "fat": round(total_fat, 1),
        "fiber": round(total_fiber, 1),
    }

def compute_health_score(items: list, totals: dict):
    """
    Computes an educational Health Score (0 - 100) based on Indian student dietary factors:
    1. Protein content (0-20)
    2. Fiber content (0-20)
    3. Portion/calorie balance (0-20)
    4. Carb ratio (0-20)
    5. Fat ratio (0-20)
    """
    prot = totals["protein"]
    fiber = totals["fiber"]
    carbs = totals["carbs"]
    fat = totals["fat"]
    cals = max(1, totals["calories_avg"])

    # 1. Protein score
    if prot >= 22:
        protein_score = 20
        protein_status = "Good"
    elif prot >= 15:
        protein_score = 16
        protein_status = "Adequate"
    elif prot >= 8:
        protein_score = 11
        protein_status = "Low"
    else:
        protein_score = 6
        protein_status = "Low"

    # 2. Fiber score
    if fiber >= 8:
        fiber_score = 20
        fiber_status = "High"
    elif fiber >= 5:
        fiber_score = 15
        fiber_status = "Moderate"
    else:
        fiber_score = 8
        fiber_status = "Low"

    # 3. Portion / Calorie balance
    if 450 <= cals <= 750:
        portion_score = 20
        portion_status = "Balanced"
    elif 350 <= cals < 450 or 750 < cals <= 900:
        portion_score = 15
        portion_status = "Light" if cals < 450 else "Heavy"
    else:
        portion_score = 10
        portion_status = "Heavy"

    # 4. Carb quality & ratio
    carb_cals = carbs * 4
    carb_pct = (carb_cals / cals) * 100
    if 40 <= carb_pct <= 62:
        carb_score = 20
        carb_status = "Optimal"
    elif 62 < carb_pct <= 72:
        carb_score = 14
        carb_status = "Moderate"
    else:
        carb_score = 8
        carb_status = "Excessive"

    # 5. Fat ratio
    fat_cals = fat * 9
    fat_pct = (fat_cals / cals) * 100
    if 18 <= fat_pct <= 32:
        fat_score = 20
        fat_status = "Balanced"
    elif 32 < fat_pct <= 42:
        fat_score = 14
        fat_status = "Moderate"
    else:
        fat_score = 7
        fat_status = "Oily/High"

    total_score = min(100, max(25, protein_score + fiber_score + portion_score + carb_score + fat_score))

    if total_score >= 80:
        category = "Exceptional"
    elif total_score >= 68:
        category = "Nutrient Rich"
    elif total_score >= 50:
        category = "Moderate Balance"
    else:
        category = "Needs Attention"

    return {
        "overall_score": total_score,
        "category": category,
        "protein_score": protein_score,
        "fiber_score": fiber_score,
        "portion_score": portion_score,
        "carb_score": carb_score,
        "fat_score": fat_score,
        "protein_status": protein_status,
        "fiber_status": fiber_status,
        "portion_status": portion_status,
        "carb_status": carb_status,
        "fat_status": fat_status,
    }

def generate_coach_feedback(items: list, totals: dict, score_info: dict):
    """Generates concise, non-judgmental guidance for student hostel life."""
    highest_protein = max(items, key=lambda x: x["protein"]) if items else None
    
    if totals["protein"] >= 18 and highest_protein:
        good = f"Great protein foundation: {highest_protein['name']} provides ~{highest_protein['protein']}g protein for alertness and study stamina."
    elif totals["fiber"] >= 6:
        good = "Generous dietary fiber supports smooth digestion and prevents afternoon fatigue."
    else:
        good = f"Your plate delivers quick, accessible energy with {len(items)} meal components."

    if score_info["carb_status"] == "Excessive":
        improve = "Carbohydrates are dominant on this plate (rice/breads exceed protein and vegetables)."
    elif score_info["fat_status"] == "Oily/High":
        improve = "Cooking oil in the curry or fried items is driving up total calorie density."
    elif score_info["fiber_status"] == "Low":
        improve = "Low in raw dietary fiber or non-starchy vegetables."
    else:
        improve = "Could benefit from an extra serving of lentils or protein to extend satiety."

    if score_info["carb_status"] == "Excessive":
        try_this = "Ask for an extra katori of dal or add a cup of curd (dahi) to balance out the rice."
    elif score_info["fat_status"] == "Oily/High":
        try_this = "Tilt your serving spoon to drain excess curry oil before pouring onto your rice or plate."
    else:
        try_this = "Grab a ₹15 pack of roasted chana or 2 boiled eggs from nearby to boost your protein goal."

    return {
        "good": good,
        "improve": improve,
        "try_this": try_this,
    }
