"""
NutriLens AI - Core Nutrition & Health Calculation Utilities
"""

from data.foods import FOODS_DATABASE, search_food

def calculate_item_macros(food: dict, grams: float):
    ratio = grams / 100.0
    return {
        "calories": int(round(food["calories_per_100g"] * ratio)),
        "protein": round(food["protein_per_100g"] * ratio, 1),
        "carbs": round(food["carbs_per_100g"] * ratio, 1),
        "fat": round(food["fat_per_100g"] * ratio, 1),
        "fiber": round(food["fiber_per_100g"] * ratio, 1),
        "cost": int(round(food.get("cost_est", 20) * (grams / food.get("standard_grams", 100)))),
    }

def calculate_meal_totals(items: list):
    """Calculates meal totals with realistic range display."""
    total_cals = sum(item["calories"] for item in items)
    total_prot = sum(item["protein"] for item in items)
    total_carbs = sum(item["carbs"] for item in items)
    total_fat = sum(item["fat"] for item in items)
    total_fiber = sum(item["fiber"] for item in items)
    total_cost = sum(item.get("cost", 20) for item in items)

    # Uncertainty range (±8% to 10%)
    variance = max(35, int(round(total_cals * 0.08)))
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
        "cost": total_cost,
    }

def compute_health_score(items: list, totals: dict):
    """
    Computes Health Score (0-100) based on protein, fiber, calorie balance, carb quality, and cooking oil balance.
    """
    prot = totals["protein"]
    fiber = totals["fiber"]
    carbs = totals["carbs"]
    fat = totals["fat"]
    cals = max(1, totals["calories_avg"])

    # 1. Protein (0 - 20 pts)
    if prot >= 24:
        p_score = 20
        p_status = "Good"
    elif prot >= 16:
        p_score = 16
        p_status = "Adequate"
    elif prot >= 9:
        p_score = 11
        p_status = "Low"
    else:
        p_score = 6
        p_status = "Low"

    # 2. Fiber (0 - 20 pts)
    if fiber >= 8:
        fib_score = 20
        fib_status = "High"
    elif fiber >= 5:
        fib_score = 15
        fib_status = "Moderate"
    else:
        fib_score = 8
        fib_status = "Low"

    # 3. Portion / Calorie balance (0 - 20 pts)
    if 480 <= cals <= 750:
        cal_score = 20
        cal_status = "Balanced"
    elif (350 <= cals < 480) or (750 < cals <= 900):
        cal_score = 15
        cal_status = "Light" if cals < 480 else "Heavy"
    else:
        cal_score = 9
        cal_status = "Heavy"

    # 4. Carb quality & ratio (0 - 20 pts)
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

    # 5. Fat quality & balance (0 - 20 pts)
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

    overall = min(100, max(30, p_score + fib_score + cal_score + carb_score + fat_score))

    if overall >= 80:
        verdict = "GREAT CHOICE 💚"
        category = "Nutrient Rich"
    elif overall >= 65:
        verdict = "BALANCED MEAL 🥗"
        category = "Good Balance"
    elif overall >= 50:
        verdict = "MODERATE CHOICE ⚡"
        category = "Moderate"
    else:
        verdict = "NEEDS ATTENTION ⚠️"
        category = "Needs Attention"

    return {
        "overall_score": overall,
        "verdict": verdict,
        "category": category,
        "protein_score": p_score,
        "fiber_score": fib_score,
        "calorie_score": cal_score,
        "carb_score": carb_score,
        "fat_score": fat_score,
        "protein_status": p_status,
        "fiber_status": fib_status,
        "portion_status": cal_status,
        "carb_status": carb_status,
        "fat_status": fat_status,
    }

def get_student_recommendation(goal: str, items: list, totals: dict, score_info: dict):
    """
    Adapts recommendations according to student mode:
    - Muscle Gain
    - Fat Loss
    - Maintain Weight
    - Healthy Eating
    - Budget Eating
    """
    prot = totals["protein"]
    carb_heavy = score_info["carb_status"] == "Excessive"
    low_fiber = score_info["fiber_status"] == "Low"
    is_oily = score_info["fat_status"] == "Oily/High"

    # Base recommendation
    if goal == "Muscle Gain":
        if prot < 25:
            rec = "Your meal provides good baseline fuel, but to hit muscle synthesis targets, aim for 25g+ protein."
            easy_improve = "Add 2 boiled eggs (₹16, +13g protein) or a katori of curd (₹15, +4g protein)."
            stat_gain = "+13g Protein"
        else:
            rec = "Excellent high-protein plate! Great amino acid profile for recovery and muscle retention."
            easy_improve = "Ensure you drink 500ml water to assist metabolic digestion of protein."
            stat_gain = "Optimal Protein Target Met"
    elif goal == "Fat Loss":
        if carb_heavy or totals["calories_avg"] > 700:
            rec = "Calorie density is high due to generous rice/roti portions and cooking oils."
            easy_improve = "Cut the rice portion by 1/3 and replace with a large crunchy cucumber-tomato salad."
            stat_gain = "-140 kcal, +2g Fiber"
        else:
            rec = "Great portion control and clean energy density for gradual fat loss."
            easy_improve = "Opt for plain phulkas over buttered naans or tawa parathas."
            stat_gain = "-80 kcal from fat"
    elif goal == "Budget Eating":
        rec = "You can maximize high-yield nutrition while cutting daily canteen expenses."
        easy_improve = "Swap deep-fried samosas or packed biscuits for a ₹15 pack of roasted chana (+9.5g protein)."
        stat_gain = "Saves ₹25, +9g Clean Protein"
    else:  # Healthy Eating / Maintain
        if low_fiber:
            rec = "Your meal has a good protein-to-calorie ratio, but adding raw vegetables would improve digestion and micronutrient intake."
            easy_improve = "Add one small bowl of sliced cucumber and onion with lemon juice."
            stat_gain = "+3g Fiber, Low GI"
        elif is_oily:
            rec = "The meal is tasty, but excess floating mess oil adds unneeded empty calories."
            easy_improve = "Tilt your spoon on the edge of the curry bowl to drain 1 spoonful of cooking oil."
            stat_gain = "-100 empty calories"
        else:
            rec = "Well-balanced meal with stable carbohydrate release and solid micronutrients."
            easy_improve = "Keep hydration up with salted buttermilk (chhaas) instead of packaged sugary drinks."
            stat_gain = "+Probiotics & Hydration"

    return {
        "advice": rec,
        "easy_improvement": easy_improve,
        "stat_gain": stat_gain,
    }

def calculate_budget_hack(items: list, totals: dict):
    """
    Computes the student budget optimization:
    Current meal cost vs smart alternative meal cost.
    """
    current_cost = totals.get("cost", 80)
    # Check if meal contains fried or expensive canteen items
    has_fried = any("fried" in it["name"].lower() or "samosa" in it["name"].lower() or "maggi" in it["name"].lower() for it in items)
    has_heavy_curry = any("paneer" in it["name"].lower() or "biryani" in it["name"].lower() for it in items)

    if has_fried:
        rec = "Replace the deep-fried canteen snack with curd (dahi) + fresh salad."
        new_cost = max(40, current_cost - 20)
        gain = "+6g protein, -180 kcal unhealthy fat"
    elif has_heavy_curry:
        rec = "Replace expensive rich gravy with thick dal + 2 boiled eggs."
        new_cost = max(45, current_cost - 25)
        gain = "+8g protein, saves ₹25 daily"
    else:
        rec = "Add a ₹15 packet of roasted chana or seasonal fruit."
        new_cost = current_cost
        gain = "+9.5g protein for under ₹15"

    return {
        "current_cost": f"₹{current_cost}",
        "new_cost": f"₹{new_cost}",
        "recommendation": rec,
        "improvement": gain,
    }
