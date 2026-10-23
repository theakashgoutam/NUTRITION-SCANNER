"""
NUTRITION SCANNER
Premium AI Food Nutrition Scanner & Awareness Web Application
Built with Python + Streamlit
"""

import streamlit as st
import sys
import os

# Add local directory to path for clean modular imports
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from components.hero import render_hero_section
from components.scanner import render_scanner_section
from components.nutrition import render_nutrition_section
from components.recommendations import render_recommendations_section
from components.charts import render_charts_section

# Page Configuration
st.set_page_config(
    page_title="NUTRITION SCANNER — AI Food & Nutrition Intelligence",
    page_icon="🍎",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Global Premium Styles
st.markdown("""
<style>
/* Clean Background & Typography */
.stApp {
    background: linear-gradient(180deg, #f8fafc 0%, #f0fdf4 40%, #ffffff 100%);
    color: #0f172a;
}

/* Hide default streamlit header/footer */
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;}

/* Custom Top Navigation Bar */
.top-navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    position: sticky;
    top: 0;
    z-index: 100;
    margin-bottom: 1.5rem;
    border-radius: 0 0 20px 20px;
}

.brand-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    color: #065f46;
}

.nav-tagline {
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 500;
}
</style>

<div class="top-navbar">
    <div class="brand-badge">
        <span>🥗</span>
        <span>NUTRITION SCANNER</span>
    </div>
    <div class="nav-tagline">AI-Powered Perception • Built for College Life</div>
</div>
""", unsafe_allow_html=True)

# Navigation Menu
nav_selection = st.radio(
    "Navigation Menu",
    ["🏠 Home & Hero", "📸 Scan Meal", "📊 Nutrition Dashboard", "📈 Weekly Insights", "ℹ️ About & Architecture"],
    horizontal=True,
    label_visibility="collapsed"
)

st.markdown("<br/>", unsafe_allow_html=True)

# Route to Components
if nav_selection == "🏠 Home & Hero":
    render_hero_section()
    render_scanner_section()
    render_nutrition_section()
    render_recommendations_section()

elif nav_selection == "📸 Scan Meal":
    render_scanner_section()
    render_nutrition_section()
    render_recommendations_section()

elif nav_selection == "📊 Nutrition Dashboard":
    render_nutrition_section()
    render_recommendations_section()

elif nav_selection == "📈 Weekly Insights":
    render_charts_section()

elif nav_selection == "ℹ️ About & Architecture":
    st.markdown("### ℹ️ About NUTRITION SCANNER")
    st.markdown("""
    #### 🚀 Two-Stage AI Perception & Deterministic Calculation Architecture
    
    1. **Stage 1 (Perception):** Computer vision model (Google Gemini 2.5 Flash via `google-genai`) identifies multiple foods on thalis, plates, and bowls with confidence ratings.
    2. **Stage 2 (Nutrition Engine):** Zero-hallucination deterministic nutritional math based on 60+ curated Indian and hostel meal recipes.
    3. **Uncertainty Windows:** Calories are reported as realistic ranges (e.g. 620–720 kcal) to prevent false precision.
    4. **Student Budget Mode:** Tailored to college hostel and PG living with realistic food swaps (curd, roasted chana, boiled eggs) to save money and boost protein.
    
    #### 🔒 Privacy & Safety
    - No persistent image storage.
    - No personal identifying information (PII) collected.
    - Food images are processed solely in memory for nutrient extraction.
    
    #### ⚠️ Educational Disclaimer
    *Nutrition Scanner provides nutritional estimates and dietary awareness to help students build healthier eating habits. It is not intended as medical diagnosis, clinical advice, or a prescription.*
    """)
