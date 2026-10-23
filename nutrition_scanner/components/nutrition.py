"""
NutriLens AI - Nutrition Result & Health Score Component
"""

import streamlit as st
from utils.nutrition import calculate_meal_totals, compute_health_score

def render_nutrition_section():
    items = st.session_state.get("detected_items", [])
    if not items:
        st.info("Scan a meal or pick a 1-click preset above to view the live nutrition dashboard.")
        return

    totals = calculate_meal_totals(items)
    score_info = compute_health_score(items, totals)

    st.markdown("""
    <style>
    .hero-metric-card {
        background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #fef3c7 100%);
        border: 1px solid #a7f3d0;
        border-radius: 24px;
        padding: 1.75rem 1.5rem;
        box-shadow: 0 15px 35px -10px rgba(16, 185, 129, 0.15);
        text-align: center;
        margin-bottom: 1.5rem;
    }
    
    .calorie-heading {
        font-size: 0.85rem;
        font-weight: 700;
        color: #047857;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }
    
    .calorie-value {
        font-family: 'Outfit', sans-serif;
        font-size: clamp(2.2rem, 5vw, 3.4rem);
        font-weight: 900;
        color: #064e3b;
        margin: 0.3rem 0;
    }
    
    .score-circle {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: white;
        border: 6px solid #10b981;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
        margin: 0.5rem 0;
    }
    
    .score-num {
        font-family: 'Outfit', sans-serif;
        font-size: 2.5rem;
        font-weight: 900;
        color: #065f46;
        line-height: 1;
    }
    
    .score-total {
        font-size: 0.8rem;
        font-weight: 700;
        color: #94a3b8;
    }
    
    .macro-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .macro-pill {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        padding: 1.25rem 1rem;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        transition: transform 0.2s ease;
    }
    .macro-pill:hover {
        transform: translateY(-3px);
    }
    
    .macro-label {
        font-size: 0.85rem;
        color: #64748b;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    
    .macro-val {
        font-family: 'Outfit', sans-serif;
        font-size: 1.8rem;
        font-weight: 800;
        line-height: 1.1;
    }
    
    .progress-bar-bg {
        background-color: #f1f5f9;
        border-radius: 9999px;
        height: 10px;
        width: 100%;
        overflow: hidden;
        margin-top: 6px;
    }
    .progress-bar-fill {
        height: 100%;
        border-radius: 9999px;
    }
    </style>
    """, unsafe_allow_html=True)

    st.markdown("### 📊 NUTRITION RESULT & HEALTH SCORE")

    col_cal, col_score = st.columns([1.2, 1])

    with col_cal:
        st.markdown(f"""
        <div class="hero-metric-card">
            <div class="calorie-heading">🔥 TOTAL MEAL CALORIES</div>
            <div class="calorie-value">{totals['calories_min']} – {totals['calories_max']} <span style="font-size: 1.2rem; font-weight: 600; color: #059669;">kcal</span></div>
            <div style="font-size: 0.9rem; color: #475569; font-weight: 500;">
                Calculated average: <strong>~{totals['calories_avg']} kcal</strong>
            </div>
            <div style="margin-top: 8px; font-size: 0.8rem; color: #047857; background: #d1fae5; padding: 4px 12px; border-radius: 20px; display: inline-block;">
                Realistic student dinner target (~550–750 kcal)
            </div>
        </div>
        """, unsafe_allow_html=True)

    with col_score:
        st.markdown(f"""
        <div class="hero-metric-card" style="background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);">
            <div class="calorie-heading">MEAL HEALTH SCORE</div>
            <div class="score-circle">
                <div class="score-num">{score_info['overall_score']}</div>
                <div class="score-total">/ 100</div>
            </div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #059669;">
                {score_info['verdict']}
            </div>
            <div style="font-size: 0.85rem; color: #64748b; margin-top: 4px;">
                Protein: <strong>{score_info['protein_status']}</strong> • Fiber: <strong>{score_info['fiber_status']}</strong> • Portion: <strong>{score_info['portion_status']}</strong>
            </div>
        </div>
        """, unsafe_allow_html=True)

    # 4 Main Macro Cards
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        st.markdown(f"""
        <div class="macro-pill" style="border-top: 4px solid #3b82f6;">
            <div class="macro-label">💪 Protein</div>
            <div class="macro-val" style="color: #2563eb;">{totals['protein']}g</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Status: {score_info['protein_status']}</div>
        </div>
        """, unsafe_allow_html=True)
    with c2:
        st.markdown(f"""
        <div class="macro-pill" style="border-top: 4px solid #eab308;">
            <div class="macro-label">🍞 Carbohydrates</div>
            <div class="macro-val" style="color: #ca8a04;">{totals['carbs']}g</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Status: {score_info['carb_status']}</div>
        </div>
        """, unsafe_allow_html=True)
    with c3:
        st.markdown(f"""
        <div class="macro-pill" style="border-top: 4px solid #f97316;">
            <div class="macro-label">🥑 Healthy Fat</div>
            <div class="macro-val" style="color: #ea580c;">{totals['fat']}g</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Status: {score_info['fat_status']}</div>
        </div>
        """, unsafe_allow_html=True)
    with c4:
        st.markdown(f"""
        <div class="macro-pill" style="border-top: 4px solid #10b981;">
            <div class="macro-label">🌾 Dietary Fiber</div>
            <div class="macro-val" style="color: #059669;">{totals['fiber']}g</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Status: {score_info['fiber_status']}</div>
        </div>
        """, unsafe_allow_html=True)

    # Section 18: DAILY NUTRITION TRACKER
    st.markdown("---")
    st.markdown("### 📅 TODAY'S DAILY PROGRESS")
    st.caption("Cumulative tracking toward college daily baseline targets:")

    # Simulated cumulative intake (including this meal)
    day_cals = min(2200, 850 + totals['calories_avg'])
    day_prot = min(120, round(42 + totals['protein'], 1))
    day_carbs = min(250, round(95 + totals['carbs'], 1))
    day_fiber = min(30, round(11 + totals['fiber'], 1))

    t1, t2, t3, t4 = st.columns(4)
    with t1:
        pct = min(100, int((day_cals / 2200) * 100))
        st.markdown(f"**🔥 Calories:** {day_cals:,} / 2,200 kcal")
        st.markdown(f"""
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: {pct}%; background: linear-gradient(90deg, #10b981, #059669);"></div>
        </div>
        <div style="text-align: right; font-size: 0.75rem; color: #64748b;">{pct}% of daily target</div>
        """, unsafe_allow_html=True)

    with t2:
        pct = min(100, int((day_prot / 120) * 100))
        st.markdown(f"**💪 Protein:** {day_prot} / 120g")
        st.markdown(f"""
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: {pct}%; background: linear-gradient(90deg, #3b82f6, #1d4ed8);"></div>
        </div>
        <div style="text-align: right; font-size: 0.75rem; color: #64748b;">{pct}% of daily target</div>
        """, unsafe_allow_html=True)

    with t3:
        pct = min(100, int((day_carbs / 250) * 100))
        st.markdown(f"**🍞 Carbs:** {day_carbs} / 250g")
        st.markdown(f"""
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: {pct}%; background: linear-gradient(90deg, #eab308, #ca8a04);"></div>
        </div>
        <div style="text-align: right; font-size: 0.75rem; color: #64748b;">{pct}% of daily target</div>
        """, unsafe_allow_html=True)

    with t4:
        pct = min(100, int((day_fiber / 30) * 100))
        st.markdown(f"**🌾 Fiber:** {day_fiber} / 30g")
        st.markdown(f"""
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: {pct}%; background: linear-gradient(90deg, #10b981, #047857);"></div>
        </div>
        <div style="text-align: right; font-size: 0.75rem; color: #64748b;">{pct}% of daily target</div>
        """, unsafe_allow_html=True)
