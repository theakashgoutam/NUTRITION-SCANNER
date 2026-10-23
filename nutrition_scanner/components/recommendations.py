"""
NutriLens AI - AI Recommendations, Student Mode & Budget Optimizer Component
"""

import streamlit as st
from utils.nutrition import calculate_meal_totals, compute_health_score, get_student_recommendation, calculate_budget_hack

def render_recommendations_section():
    items = st.session_state.get("detected_items", [])
    if not items:
        return

    totals = calculate_meal_totals(items)
    score_info = compute_health_score(items, totals)

    st.markdown("""
    <style>
    .ai-rec-card {
        background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
        border: 1px solid #6ee7b7;
        border-radius: 20px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.1);
    }
    .rec-tag {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #047857;
        background: #d1fae5;
        padding: 4px 10px;
        border-radius: 9999px;
        margin-bottom: 0.75rem;
    }
    .budget-card {
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        border: 1px solid #fde68a;
        border-radius: 20px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .stat-pill {
        display: inline-block;
        background: #059669;
        color: white;
        font-weight: 700;
        font-size: 0.85rem;
        padding: 4px 12px;
        border-radius: 9999px;
        margin-top: 6px;
    }
    </style>
    """, unsafe_allow_html=True)

    st.markdown("### 🤖 PERSONALIZED AI MEAL ADVICE")

    # Section 16: STUDENT MODE GOAL SELECTOR
    col_goal_label, col_goal_pick = st.columns([1, 2])
    with col_goal_label:
        st.markdown("**🎓 STUDENT MODE GOAL:**")
        st.caption("Adapts nutrition advice to your current college objective:")
    with col_goal_pick:
        goal = st.selectbox(
            "Select Your Active Goal:",
            ["💪 Muscle Gain", "🔥 Fat Loss", "⚖️ Maintain Weight", "🥗 Healthy Eating", "💰 Budget Eating"],
            key="student_goal_selector"
        )

    clean_goal = goal.split(" ")[1] if " " in goal else goal
    rec_data = get_student_recommendation(clean_goal, items, totals, score_info)
    budget_data = calculate_budget_hack(items, totals)

    col_rec, col_bud = st.columns([1.2, 1])

    with col_rec:
        st.markdown(f"""
        <div class="ai-rec-card">
            <div class="rec-tag">🧠 AI COACH RECOMMENDATION ({goal})</div>
            <div style="font-size: 1.05rem; color: #064e3b; line-height: 1.5; font-weight: 500; margin-bottom: 1rem;">
                «{rec_data['advice']}»
            </div>
            
            <div style="background: white; border-radius: 14px; padding: 1rem; border: 1px solid #a7f3d0;">
                <div style="font-weight: 700; color: #065f46; font-size: 0.95rem;">💡 EASY ACTIONABLE IMPROVEMENT:</div>
                <div style="color: #334155; margin-top: 4px; font-size: 0.95rem;">{rec_data['easy_improvement']}</div>
                <div class="stat-pill">{rec_data['stat_gain']}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)

    with col_bud:
        st.markdown(f"""
        <div class="budget-card">
            <div class="rec-tag" style="color: #b45309; background: #fef3c7;">💰 HOSTEL BUDGET OPTIMIZER</div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem;">
                <div>
                    <span style="font-size: 0.8rem; color: #92400e;">Current Meal Cost:</span><br/>
                    <strong style="font-size: 1.4rem; color: #78350f;">{budget_data['current_cost']}</strong>
                </div>
                <div style="font-size: 1.3rem; color: #f59e0b;">➔</div>
                <div>
                    <span style="font-size: 0.8rem; color: #065f46;">Optimized Cost:</span><br/>
                    <strong style="font-size: 1.4rem; color: #047857;">{budget_data['new_cost']}</strong>
                </div>
            </div>
            
            <div style="font-size: 0.9rem; color: #78350f; margin-bottom: 0.5rem;">
                «{budget_data['recommendation']}»
            </div>
            <div style="background: white; border-radius: 10px; padding: 6px 12px; font-size: 0.82rem; color: #047857; font-weight: 700; display: inline-block;">
                ⚡ {budget_data['improvement']}
            </div>
        </div>
        """, unsafe_allow_html=True)
