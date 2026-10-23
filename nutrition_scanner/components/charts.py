"""
NutriLens AI - Weekly Insights & Plotly Visualization Component
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

def render_charts_section():
    st.markdown("### 📈 YOUR WEEK IN NUTRITION")
    st.caption("Historical insights and meal consistency over the past 7 days:")

    # Simulated 7-day college student meal data
    week_data = pd.DataFrame({
        "Day": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "Calories": [1980, 2150, 1890, 2280, 2040, 2350, 1920],
        "Calorie_Target": [2200, 2200, 2200, 2200, 2200, 2200, 2200],
        "Protein_g": [68, 85, 72, 94, 76, 88, 80],
        "Protein_Target": [90, 90, 90, 90, 90, 90, 90],
        "Health_Score": [74, 82, 68, 88, 76, 85, 84],
        "Salad_Fruit_Servings": [1, 2, 1, 3, 2, 3, 2]
    })

    tab1, tab2, tab3 = st.tabs(["🔥 Calorie & Energy Balance", "💪 Protein Intake", "🥗 Health Score & Fiber"])

    with tab1:
        fig1 = go.Figure()
        fig1.add_trace(go.Bar(
            x=week_data["Day"],
            y=week_data["Calories"],
            name="Daily Calories",
            marker=dict(color=["#10b981", "#10b981", "#f59e0b", "#f43f5e", "#10b981", "#f43f5e", "#10b981"]),
            opacity=0.85
        ))
        fig1.add_trace(go.Scatter(
            x=week_data["Day"],
            y=week_data["Calorie_Target"],
            name="Baseline Target (2,200 kcal)",
            line=dict(color="#047857", width=2, dash="dash")
        ))
        fig1.update_layout(
            title="Daily Caloric Intake vs. College Target",
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(0,0,0,0)",
            font=dict(family="Plus Jakarta Sans", size=12),
            margin=dict(l=20, r=20, t=40, b=20),
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        st.plotly_chart(fig1, use_container_width=True)

    with tab2:
        fig2 = go.Figure()
        fig2.add_trace(go.Scatter(
            x=week_data["Day"],
            y=week_data["Protein_g"],
            mode="lines+markers",
            name="Protein Intake (g)",
            line=dict(color="#3b82f6", width=3),
            marker=dict(size=8, color="#1d4ed8")
        ))
        fig2.add_trace(go.Scatter(
            x=week_data["Day"],
            y=week_data["Protein_Target"],
            mode="lines",
            name="Target (90g)",
            line=dict(color="#94a3b8", dash="dot", width=2)
        ))
        fig2.update_layout(
            title="Daily Protein Retention Trend",
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(0,0,0,0)",
            font=dict(family="Plus Jakarta Sans", size=12),
            margin=dict(l=20, r=20, t=40, b=20),
            yaxis=dict(title="Grams of Protein"),
            legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
        )
        st.plotly_chart(fig2, use_container_width=True)

    with tab3:
        fig3 = px.bar(
            week_data,
            x="Day",
            y="Health_Score",
            color="Health_Score",
            color_continuous_scale="Viridis",
            title="Weekly Average Meal Health Score (0 - 100)"
        )
        fig3.update_layout(
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(0,0,0,0)",
            font=dict(family="Plus Jakarta Sans", size=12),
            margin=dict(l=20, r=20, t=40, b=20),
            yaxis=dict(range=[40, 100], title="Health Score")
        )
        st.plotly_chart(fig3, use_container_width=True)
