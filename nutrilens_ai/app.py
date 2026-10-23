"""
NutriLens AI - Streamlit Application
AI Food Scanner + Healthy Eating Awareness Program for College & Hostel Students
"""

import streamlit as st
import pandas as pd
from PIL import Image
import io

from nutrition_engine import (
    find_food_in_db,
    calculate_item_nutrition,
    calculate_meal_totals,
    compute_health_score,
    generate_coach_feedback,
    DB
)
from ai_service import analyze_food_image
from awareness_content import AWARENESS_CARDS, DAILY_CHALLENGES

# Configure Page
st.set_page_config(
    page_title="NutriLens AI - Student Food Scanner",
    page_icon="🥗",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling
st.markdown("""
<style>
    .main-title {
        font-size: 2.2rem;
        font-weight: 800;
        color: #065f46;
        margin-bottom: 0.2rem;
    }
    .subtitle {
        font-size: 1.1rem;
        color: #4b5563;
        margin-bottom: 1.5rem;
    }
    .metric-box {
        background-color: #f0fdf4;
        border: 1px solid #bbf7d0;
        padding: 1rem;
        border-radius: 0.75rem;
        text-align: center;
    }
    .score-badge {
        font-size: 1.8rem;
        font-weight: bold;
        color: #047857;
    }
    .coach-card {
        padding: 1rem;
        border-radius: 0.75rem;
        margin-bottom: 0.75rem;
    }
</style>
""", unsafe_allow_html=True)

# Session State Initialization
if "current_items" not in st.session_state:
    st.session_state["current_items"] = []
if "analyzed" not in st.session_state:
    st.session_state["analyzed"] = False
if "uploaded_image" not in st.session_state:
    st.session_state["uploaded_image"] = None

# Sidebar Navigation
st.sidebar.title("🥗 NutriLens AI")
st.sidebar.markdown("**Student Nutrition Companion**")
menu = st.sidebar.radio(
    "Navigate",
    ["🏠 Home", "📸 Scan Meal", "📊 Nutrition Dashboard", "📚 Awareness Program"]
)

st.sidebar.markdown("---")
st.sidebar.info("💡 **Hostel Hack:** Watery mess dal? Grab 2 boiled eggs from the canteen to reach your 20g protein target!")

# ----------------- HOME VIEW -----------------
if menu == "🏠 Home":
    st.markdown('<div class="main-title">NutriLens AI</div>', unsafe_allow_html=True)
    st.markdown('<div class="subtitle">Snap your meal. Understand your nutrition. Built for hostel and college life.</div>', unsafe_allow_html=True)

    col1, col2 = st.columns([3, 2])
    with col1:
        st.markdown("""
        **No manual calorie counting. No food weighing scales in hostel rooms.**
        
        NutriLens AI is designed specifically around typical Indian college diets—mess thalis, canteen snacks, and late-night study cravings.
        
        ### How it Works:
        1. 📸 **Snap a Photo**: Upload or capture your meal thali or plate.
        2. 🤖 **AI Identification**: Detects multiple foods (rice, dal, sabzi, roti, paneer) and estimates portions.
        3. ✏️ **Review & Confirm**: Modify portion sizes or correct items with a single tap.
        4. 📊 **Student Dashboard**: Get estimated calorie ranges, protein breakdown, and an educational **Health Score (0-100)**.
        5. 💡 **Practical Coaching**: Realistic mess hacks (e.g. draining excess oil, smart canteen swaps).
        """)
        
        st.caption("⚠️ **Educational Notice:** Nutrition values are estimates and should not be considered medical advice.")
    
    with col2:
        st.image("https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", caption="Sample Mess Thali Scan")

# ----------------- SCAN MEAL VIEW -----------------
elif menu == "📸 Scan Meal":
    st.markdown('<div class="main-title">📸 Scan Your Meal</div>', unsafe_allow_html=True)
    st.markdown('<div class="subtitle">Capture your plate or test with a 1-click hackathon demo preset.</div>', unsafe_allow_html=True)

    tab_photo, tab_demo = st.tabs(["📷 Upload / Camera", "⚡ 1-Click Demo Presets"])

    with tab_photo:
        input_type = st.radio("Choose Input Method:", ["Upload Image File", "Use Device Camera"], horizontal=True)
        img_file = None
        
        if input_type == "Upload Image File":
            img_file = st.file_uploader("Upload meal photograph (JPG / PNG):", type=["jpg", "jpeg", "png"])
        else:
            img_file = st.camera_input("Take a photo of your meal")

        if img_file:
            image = Image.open(img_file)
            st.image(image, caption="Uploaded Plate", width=350)
            
            if st.button("🚀 Analyze Meal with AI", type="primary"):
                with st.spinner("Analyzing photo with Gemini Vision and matching verified food database..."):
                    img_bytes = img_file.getvalue()
                    detected = analyze_food_image(img_bytes)
                    
                    processed_items = []
                    for it in detected:
                        matched = find_food_in_db(it["name"])
                        grams = it.get("estimated_grams", 150)
                        if matched:
                            nutrition = calculate_item_nutrition(matched, grams)
                            processed_items.append({
                                "name": matched["name"],
                                "portion_size": it.get("portion_size", "Medium"),
                                "grams": grams,
                                "calories": nutrition["calories"],
                                "protein": nutrition["protein"],
                                "carbs": nutrition["carbs"],
                                "fat": nutrition["fat"],
                                "fiber": nutrition["fiber"],
                                "confidence": it.get("confidence", 0.9),
                            })
                        else:
                            processed_items.append({
                                "name": it["name"],
                                "portion_size": it.get("portion_size", "Medium"),
                                "grams": grams,
                                "calories": int(grams * 1.5),
                                "protein": round(grams * 0.05, 1),
                                "carbs": round(grams * 0.22, 1),
                                "fat": round(grams * 0.04, 1),
                                "fiber": round(grams * 0.02, 1),
                                "confidence": it.get("confidence", 0.8),
                            })
                    
                    st.session_state["current_items"] = processed_items
                    st.session_state["analyzed"] = True
                    st.success(f"Detected {len(processed_items)} food items! Scroll down to confirm.")

    with tab_demo:
        st.markdown("#### Test the complete pipeline without a camera:")
        demo_choice = st.selectbox(
            "Select a student meal preset:",
            [
                "🍛 Rajma Masala + Jeera Rice + 2 Rotis + Salad",
                "🧀 Paneer Masala + 2 Rotis + Salad",
                "🍗 Chicken Biryani + Veg Raita",
                "🍜 Maggi Noodles + 2 Boiled Eggs",
                "🍲 Dal Tadka + Steamed Rice + Mixed Veg Sabzi"
            ]
        )
        
        if st.button("⚡ Load Preset Meal", type="secondary"):
            if "Rajma" in demo_choice:
                r1 = find_food_in_db("Rajma Masala")
                r2 = find_food_in_db("Jeera Rice")
                r3 = find_food_in_db("Roti / Chapati (Phulka)")
                r4 = find_food_in_db("Fresh Salad")
                items = [
                    {"name": r1["name"], "portion_size": "Medium", "grams": 170, **calculate_item_nutrition(r1, 170), "confidence": 0.94},
                    {"name": r2["name"], "portion_size": "Medium", "grams": 180, **calculate_item_nutrition(r2, 180), "confidence": 0.91},
                    {"name": r3["name"], "portion_size": "Medium", "grams": 70, **calculate_item_nutrition(r3, 70), "confidence": 0.92},
                    {"name": r4["name"], "portion_size": "Small", "grams": 60, **calculate_item_nutrition(r4, 60), "confidence": 0.88},
                ]
            elif "Paneer" in demo_choice:
                p1 = find_food_in_db("Paneer Masala")
                p2 = find_food_in_db("Roti / Chapati (Phulka)")
                p3 = find_food_in_db("Fresh Salad")
                items = [
                    {"name": p1["name"], "portion_size": "Medium", "grams": 150, **calculate_item_nutrition(p1, 150), "confidence": 0.95},
                    {"name": p2["name"], "portion_size": "Medium", "grams": 70, **calculate_item_nutrition(p2, 70), "confidence": 0.92},
                    {"name": p3["name"], "portion_size": "Medium", "grams": 90, **calculate_item_nutrition(p3, 90), "confidence": 0.87},
                ]
            elif "Biryani" in demo_choice:
                b1 = find_food_in_db("Chicken Biryani")
                b2 = find_food_in_db("Cucumber / Veg Raita")
                items = [
                    {"name": b1["name"], "portion_size": "Medium", "grams": 300, **calculate_item_nutrition(b1, 300), "confidence": 0.96},
                    {"name": b2["name"], "portion_size": "Medium", "grams": 130, **calculate_item_nutrition(b2, 130), "confidence": 0.88},
                ]
            elif "Maggi" in demo_choice:
                m1 = find_food_in_db("Maggi")
                m2 = find_food_in_db("Boiled Egg")
                items = [
                    {"name": m1["name"], "portion_size": "Medium", "grams": 180, **calculate_item_nutrition(m1, 180), "confidence": 0.93},
                    {"name": m2["name"], "portion_size": "Medium", "grams": 100, **calculate_item_nutrition(m2, 100), "confidence": 0.92},
                ]
            else:
                d1 = find_food_in_db("Yellow Dal")
                d2 = find_food_in_db("Steamed White Rice")
                d3 = find_food_in_db("Mixed Veg Sabzi")
                items = [
                    {"name": d1["name"], "portion_size": "Medium", "grams": 150, **calculate_item_nutrition(d1, 150), "confidence": 0.91},
                    {"name": d2["name"], "portion_size": "Medium", "grams": 180, **calculate_item_nutrition(d2, 180), "confidence": 0.94},
                    {"name": d3["name"], "portion_size": "Medium", "grams": 130, **calculate_item_nutrition(d3, 130), "confidence": 0.86},
                ]
            
            st.session_state["current_items"] = items
            st.session_state["analyzed"] = True
            st.success("Loaded preset meal! Review items below.")

    # ----------------- USER CONFIRMATION & EDIT STEP -----------------
    if st.session_state["analyzed"] and st.session_state["current_items"]:
        st.markdown("---")
        st.markdown("### ✏️ Step 2: Confirm & Adjust Plate Items")
        st.markdown("Adjust portion sizes or remove any false detections:")

        updated_items = []
        for i, item in enumerate(st.session_state["current_items"]):
            c1, c2, c3, c4 = st.columns([3, 2, 2, 1])
            with c1:
                st.markdown(f"**{item['name']}** ({int(item.get('confidence', 0.9)*100)}% Confidence)")
            with c2:
                portion = st.selectbox(
                    "Portion",
                    ["Small (~0.7x)", "Medium (1.0x)", "Large (~1.4x)"],
                    index=1 if item["portion_size"] == "Medium" else (0 if item["portion_size"] == "Small" else 2),
                    key=f"portion_{i}"
                )
            with c3:
                mult = 0.7 if "Small" in portion else (1.4 if "Large" in portion else 1.0)
                grams = int(item["grams"] * mult)
                st.caption(f"~{grams}g | ~{int(item['calories']*mult)} kcal")
            with c4:
                remove = st.button("🗑️", key=f"del_{i}")
            
            if not remove:
                matched = find_food_in_db(item["name"])
                if matched:
                    nut = calculate_item_nutrition(matched, grams)
                    updated_items.append({
                        "name": item["name"],
                        "portion_size": "Small" if "Small" in portion else ("Large" if "Large" in portion else "Medium"),
                        "grams": grams,
                        "calories": nut["calories"],
                        "protein": nut["protein"],
                        "carbs": nut["carbs"],
                        "fat": nut["fat"],
                        "fiber": nut["fiber"],
                        "confidence": item.get("confidence", 0.9)
                    })
                else:
                    updated_items.append(item)

        st.session_state["current_items"] = updated_items

        if st.button("✅ Calculate Nutrition & Health Score ➔", type="primary"):
            st.session_state["view_dashboard"] = True
            st.info("Switching to 📊 Nutrition Dashboard tab in sidebar!")

# ----------------- NUTRITION DASHBOARD VIEW -----------------
elif menu == "📊 Nutrition Dashboard":
    st.markdown('<div class="main-title">📊 Meal Nutrition Dashboard</div>', unsafe_allow_html=True)
    
    items = st.session_state.get("current_items", [])
    if not items:
        st.warning("No meal scanned yet. Go to '📸 Scan Meal' to scan a meal or try a preset!")
    else:
        totals = calculate_meal_totals(items)
        score_info = compute_health_score(items, totals)
        coach = generate_coach_feedback(items, totals, score_info)

        # Calorie Range & Health Score Hero
        col_cal, col_score = st.columns(2)
        with col_cal:
            st.markdown(f"""
            <div class="metric-box">
                <div style="font-size: 0.9rem; color: #6b7280; font-weight: bold;">TOTAL ESTIMATED CALORIES</div>
                <div style="font-size: 2.5rem; font-weight: 800; color: #111827; margin: 0.5rem 0;">
                    {totals['calories_min']} – {totals['calories_max']} <span style="font-size: 1.2rem; color: #6b7280;">kcal</span>
                </div>
                <div style="font-size: 0.85rem; color: #4b5563;">Typical college main meal target (~600–750 kcal)</div>
            </div>
            """, unsafe_allow_html=True)

        with col_score:
            st.markdown(f"""
            <div class="metric-box">
                <div style="font-size: 0.9rem; color: #6b7280; font-weight: bold;">MEAL HEALTH SCORE</div>
                <div class="score-badge">{score_info['overall_score']} / 100</div>
                <div style="font-size: 1rem; font-weight: bold; color: #047857;">{score_info['category']}</div>
            </div>
            """, unsafe_allow_html=True)

        # Macro Metrics
        st.markdown("### 🥗 Macronutrient Breakdown")
        m1, m2, m3, m4 = st.columns(4)
        m1.metric("Protein", f"{totals['protein']}g", delta=f"{score_info['protein_status']}")
        m2.metric("Carbohydrates", f"{totals['carbs']}g", delta=f"{score_info['carb_status']}", delta_color="inverse" if score_info['carb_status'] == 'Excessive' else "normal")
        m3.metric("Total Fat", f"{totals['fat']}g", delta=f"{score_info['fat_status']}")
        m4.metric("Dietary Fiber", f"{totals['fiber']}g", delta=f"{score_info['fiber_status']}")

        # AI Meal Coach Feedback
        st.markdown("### 🤖 NutriLens AI Coach Feedback")
        st.markdown(f"""
        <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.5rem;">
            🟢 <strong>What's Good:</strong> {coach['good']}
        </div>
        <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.5rem;">
            🟡 <strong>What Could Improve:</strong> {coach['improve']}
        </div>
        <div style="background-color: #f0fdfa; border: 1px solid #99f6e4; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.5rem;">
            💡 <strong>Try This:</strong> {coach['try_this']}
        </div>
        """, unsafe_allow_html=True)

        # Detailed Breakdown Table
        st.markdown("### 📋 Plate Item Breakdown")
        df_display = pd.DataFrame([
            {
                "Food Item": it["name"],
                "Portion Size": it["portion_size"],
                "Est. Grams": f"{it['grams']}g",
                "Calories": f"{it['calories']} kcal",
                "Protein": f"{it['protein']}g",
                "Carbs": f"{it['carbs']}g",
                "Fat": f"{it['fat']}g",
                "Fiber": f"{it['fiber']}g",
            }
            for it in items
        ])
        st.dataframe(df_display, use_container_width=True)

        st.caption("⚠️ **Educational Disclaimer:** Nutrition calculations are approximations based on representative recipe data. Actual values vary based on preparation and oil use.")

# ----------------- AWARENESS PROGRAM VIEW -----------------
elif menu == "📚 Awareness Program":
    st.markdown('<div class="main-title">📚 Healthy Eating Awareness Program</div>', unsafe_allow_html=True)
    st.markdown('<div class="subtitle">Practical micro-guides and daily challenges for hostel & PG students.</div>', unsafe_allow_html=True)

    # Daily Challenges
    st.markdown("### 🏆 Today's Micro-Habit Challenges")
    for ch in DAILY_CHALLENGES:
        st.checkbox(f"**{ch['title']}** — {ch['description']} *({ch['tag']})*", key=ch["id"])

    st.markdown("---")
    st.markdown("### 📖 10 Essential Student Nutrition Guides")

    for card in AWARENESS_CARDS:
        with st.expander(f"{card['emoji']} {card['title']} ({card['category']})"):
            st.markdown(f"**{card['summary']}**")
            st.markdown("#### Key Takeaways:")
            for tip in card["tips"]:
                st.markdown(f"- {tip}")
            st.info(f"💡 **Hostel Mess Hack:** {card['hack']}")
