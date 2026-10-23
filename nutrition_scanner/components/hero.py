"""
NUTRITION SCANNER - Premium Hero Component
Featuring Giant 3D Realistic Fruit Basket, 5-Stage Storytelling Animations,
and Interactive AI Health Assistant with BMI Gauge & Nutrition Targets.
"""

import streamlit as st

def render_hero_section():
    # Injected modern Apple-level CSS styling & 3D Fruit animation
    st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    .brand-container {
        text-align: center;
        padding: 1.5rem 1rem 1rem 1rem;
        position: relative;
    }
    
    .brand-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(16, 185, 129, 0.4);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.12);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #065f46;
        margin-bottom: 1rem;
    }

    .brand-title {
        font-family: 'Outfit', sans-serif;
        font-size: clamp(2.8rem, 6.5vw, 4.8rem);
        font-weight: 900;
        letter-spacing: -0.03em;
        background: linear-gradient(135deg, #059669 0%, #10b981 30%, #f59e0b 65%, #f43f5e 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.4rem;
        line-height: 1.1;
    }
    
    .brand-subtitle {
        font-size: clamp(1.1rem, 2.4vw, 1.4rem);
        font-weight: 600;
        color: #475569;
        margin-bottom: 1.5rem;
        max-width: 650px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.4;
    }
    
    /* 3D Basket & Levitating Fruit Arena */
    .stage-arena {
        position: relative;
        width: 100%;
        max-width: 820px;
        height: 420px;
        margin: 0 auto 1.5rem auto;
        border-radius: 32px;
        background: radial-gradient(circle at 50% 65%, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.7) 45%, rgba(254, 243, 199, 0.4) 100%);
        border: 1.5px solid rgba(16, 185, 129, 0.25);
        box-shadow: 0 30px 70px -15px rgba(16, 185, 129, 0.22), inset 0 2px 8px rgba(255, 255, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        backdrop-filter: blur(16px);
    }
    
    /* Ambient Energy Aura */
    .ambient-glow {
        position: absolute;
        width: 380px;
        height: 380px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(245, 158, 11, 0.2) 45%, rgba(244, 63, 94, 0.1) 75%, transparent 100%);
        filter: blur(50px);
        animation: pulseGlow 5s ease-in-out infinite alternate;
    }
    
    @keyframes pulseGlow {
        0% { transform: scale(0.9) rotate(0deg); opacity: 0.7; }
        100% { transform: scale(1.3) rotate(45deg); opacity: 1; }
    }
    
    /* Realistic 3D Woven Wooden Basket */
    .basket-base {
        position: absolute;
        bottom: 20px;
        width: 300px;
        height: 120px;
        background: linear-gradient(180deg, #b45309 0%, #78350f 50%, #451a03 100%);
        border-radius: 14px 14px 100px 100px;
        box-shadow: 0 25px 45px rgba(69, 26, 3, 0.45), inset 0 8px 16px rgba(251, 191, 36, 0.45);
        border: 3.5px solid #d97706;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 15;
    }
    
    .basket-rim {
        position: absolute;
        top: -14px;
        width: 320px;
        height: 26px;
        background: linear-gradient(90deg, #92400e, #f59e0b, #92400e);
        border-radius: 20px;
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
        border: 1px solid #fef3c7;
    }
    
    .basket-label {
        color: #fef3c7;
        font-family: 'Outfit', sans-serif;
        font-weight: 800;
        font-size: 0.85rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-top: 15px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.6);
    }

    .basket-sub {
        color: #fde68a;
        font-size: 0.65rem;
        font-weight: 600;
        opacity: 0.85;
    }
    
    /* 3D Realistic Levitating Fruits with Specular Spheres */
    .fruit-item {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        box-shadow: 0 16px 28px rgba(0,0,0,0.2), inset 0 -4px 8px rgba(0,0,0,0.25);
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 20;
        user-select: none;
        cursor: pointer;
    }

    .fruit-item span {
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
    }
    
    /* Dynamic Fruit Positioning & Keyframes */
    .fruit-pineapple {
        width: 80px; height: 80px; font-size: 3.5rem;
        background: radial-gradient(circle at 35% 35%, #fef08a, #eab308 60%, #854d0e 100%);
        border: 2px solid #fef08a;
        animation: floatPineapple 5.5s ease-in-out infinite alternate;
        z-index: 25;
    }
    .fruit-apple {
        width: 72px; height: 72px; font-size: 3rem;
        background: radial-gradient(circle at 35% 35%, #fca5a5, #dc2626 60%, #7f1d1d 100%);
        border: 2px solid #fecaca;
        animation: floatApple 4.2s ease-in-out infinite alternate;
    }
    .fruit-orange {
        width: 72px; height: 72px; font-size: 3rem;
        background: radial-gradient(circle at 35% 35%, #fdba74, #ea580c 60%, #7c2d12 100%);
        border: 2px solid #fed7aa;
        animation: floatOrange 4.8s ease-in-out infinite alternate;
    }
    .fruit-banana {
        width: 68px; height: 68px; font-size: 2.8rem;
        background: radial-gradient(circle at 35% 35%, #fef9c3, #facc15 60%, #a16207 100%);
        border: 2px solid #fef08a;
        animation: floatBanana 5.2s ease-in-out infinite alternate;
    }
    .fruit-strawberry {
        width: 60px; height: 60px; font-size: 2.5rem;
        background: radial-gradient(circle at 35% 35%, #fda4af, #e11d48 60%, #881337 100%);
        border: 2px solid #ffe4e6;
        animation: floatStrawberry 3.8s ease-in-out infinite alternate;
    }
    .fruit-grapes {
        width: 62px; height: 62px; font-size: 2.5rem;
        background: radial-gradient(circle at 35% 35%, #d8b4fe, #7c3aed 60%, #4c1d95 100%);
        border: 2px solid #e9d5ff;
        animation: floatGrapes 4.5s ease-in-out infinite alternate;
    }
    .fruit-kiwi {
        width: 62px; height: 62px; font-size: 2.5rem;
        background: radial-gradient(circle at 35% 35%, #bef264, #65a30d 60%, #365314 100%);
        border: 2px solid #d9f99d;
        animation: floatKiwi 4.0s ease-in-out infinite alternate;
    }
    .fruit-mango {
        width: 66px; height: 66px; font-size: 2.7rem;
        background: radial-gradient(circle at 35% 35%, #fed7aa, #f59e0b 60%, #b45309 100%);
        border: 2px solid #fef3c7;
        animation: floatMango 4.6s ease-in-out infinite alternate;
    }
    
    @keyframes floatPineapple {
        0% { transform: translate(0px, -40px) scale(1); }
        100% { transform: translate(0px, -150px) scale(1.25) rotate(5deg); }
    }
    @keyframes floatApple {
        0% { transform: translate(-65px, -10px) rotate(-6deg); }
        100% { transform: translate(-130px, -105px) scale(1.2) rotate(-18deg); }
    }
    @keyframes floatOrange {
        0% { transform: translate(65px, -10px) rotate(6deg); }
        100% { transform: translate(135px, -100px) scale(1.2) rotate(20deg); }
    }
    @keyframes floatBanana {
        0% { transform: translate(-25px, -20px) rotate(-15deg); }
        100% { transform: translate(-50px, -145px) scale(1.15) rotate(-28deg); }
    }
    @keyframes floatStrawberry {
        0% { transform: translate(25px, -15px) rotate(5deg); }
        100% { transform: translate(60px, -135px) scale(1.22) rotate(18deg); }
    }
    @keyframes floatGrapes {
        0% { transform: translate(-95px, 5px) rotate(10deg); }
        100% { transform: translate(-175px, -55px) scale(1.18) rotate(-22deg); }
    }
    @keyframes floatKiwi {
        0% { transform: translate(95px, 5px) rotate(-8deg); }
        100% { transform: translate(175px, -50px) scale(1.18) rotate(45deg); }
    }
    @keyframes floatMango {
        0% { transform: translate(0px, 0px) rotate(0deg); }
        100% { transform: translate(0px, -90px) scale(1.18) rotate(10deg); }
    }
    
    /* Glowing Badges in Orbit */
    .orbit-badge {
        position: absolute;
        background: rgba(15, 23, 42, 0.88);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #ecfdf5;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 9999px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.25);
        pointer-events: none;
        backdrop-filter: blur(8px);
    }
    
    /* 3 Value Pillars */
    .pillar-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        height: 100%;
    }
    .pillar-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 30px rgba(16, 185, 129, 0.12);
        border-color: #6ee7b7;
    }
    </style>
    
    <div class="brand-container">
        <div class="brand-pill">
            <span>●</span>
            <span>AI Food & Nutrition Perception Engine</span>
        </div>
        
        <div class="brand-title">NUTRITION SCANNER</div>
        <div class="brand-subtitle">See your food. Understand your nutrition. Eat smarter.</div>
        
        <div class="stage-arena">
            <div class="ambient-glow"></div>
            
            <!-- 8 3D Realistic Levitating Fruits (Apple, Orange, Banana, Strawberry, Grapes, Kiwi, Pineapple, Mango) -->
            <div class="fruit-item fruit-pineapple" title="Pineapple (Bromelain & Vitamin C)"><span>🍍</span></div>
            <div class="fruit-item fruit-apple" title="Apple (Dietary Fiber & Quercetin)"><span>🍎</span></div>
            <div class="fruit-item fruit-orange" title="Orange (Hydration & Vitamin C)"><span>🍊</span></div>
            <div class="fruit-item fruit-banana" title="Banana (Sustained Brain Energy)"><span>🍌</span></div>
            <div class="fruit-item fruit-strawberry" title="Strawberry (Polyphenols)"><span>🍓</span></div>
            <div class="fruit-item fruit-grapes" title="Grapes (Heart Protection)"><span>🍇</span></div>
            <div class="fruit-item fruit-kiwi" title="Kiwi (Immunity Zinc & C)"><span>🥝</span></div>
            <div class="fruit-item fruit-mango" title="Mango (Vitamin A Cellular Radiance)"><span>🥭</span></div>
            
            <!-- Giant 3D Realistic Woven Basket -->
            <div class="basket-base">
                <div class="basket-rim"></div>
                <div class="basket-label">Artisanal Basket</div>
                <div class="basket-sub">100% Bio-Nutrient Matrix</div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Interactive Stage Storyteller Bar
    st.markdown("##### 🍎 Apple-Style 5-Stage Storytelling Showcase")
    col_s1, col_s2 = st.columns([3, 1])
    with col_s1:
        chosen_stage = st.select_slider(
            "Select Story Stage",
            options=[
                "Stage 1: Nestled in Basket",
                "Stage 2: Levitation & Separation",
                "Stage 3: Nutrition Energy Field",
                "Stage 4: Healthy Nutrition Burst",
                "Stage 5: Healthy Meal Reassembly"
            ],
            value="Stage 4: Healthy Nutrition Burst",
            label_visibility="collapsed"
        )
    with col_s2:
        st.caption(f"**Current State:** {chosen_stage.split(':')[0]}")

    st.markdown("---")

    # 3 Structural Pillars (Answering What does it do? How does it help students?)
    pcol1, pcol2, pcol3 = st.columns(3)
    with pcol1:
        st.markdown("""
        <div class="pillar-card">
            <h4 style="color: #065f46; font-weight: 800; margin-bottom: 8px;">1. Multi-Item Detection</h4>
            <p style="color: #475569; font-size: 0.9rem; line-height: 1.5;">
                Detects composite Indian hostel plates: rice, dal, roti, paneer, and salad simultaneously from a single photo.
            </p>
        </div>
        """, unsafe_allow_html=True)
    with pcol2:
        st.markdown("""
        <div class="pillar-card">
            <h4 style="color: #065f46; font-weight: 800; margin-bottom: 8px;">2. Honest Calorie Ranges</h4>
            <p style="color: #475569; font-size: 0.9rem; line-height: 1.5;">
                Transparent windows (e.g. 580–680 kcal) verified against our 60+ student food database rather than false hallucinations.
            </p>
        </div>
        """, unsafe_allow_html=True)
    with pcol3:
        st.markdown("""
        <div class="pillar-card">
            <h4 style="color: #065f46; font-weight: 800; margin-bottom: 8px;">3. Hostel Budget Optimizer</h4>
            <p style="color: #475569; font-size: 0.9rem; line-height: 1.5;">
                Smart swaps: replace low-protein canteen snacks (samosas) with high-protein budget powerhouses (curd, roasted chana, boiled eggs).
            </p>
        </div>
        """, unsafe_allow_html=True)

    st.markdown("<br/>", unsafe_allow_html=True)

    # Interactive AI Health Assistant & BMI Engine Expander
    with st.expander("✨ Open AI Health Assistant & Real-Time BMI Calculator", expanded=False):
        st.markdown("### 🤖 Personal Biological Profile & Nutrition Targets")
        st.caption("Customizes recommendations according to your unique height, weight, and student lifestyle goal.")

        bcol1, bcol2, bcol3, bcol4 = st.columns(4)
        with bcol1:
            age = st.number_input("Age (years)", min_value=15, max_value=80, value=21, step=1)
        with bcol2:
            gender = st.selectbox("Gender", ["Male", "Female", "Other"])
        with bcol3:
            height_cm = st.number_input("Height (cm)", min_value=120, max_value=230, value=172, step=1)
        with bcol4:
            weight_kg = st.number_input("Weight (kg)", min_value=35.0, max_value=200.0, value=68.0, step=0.5)

        goal = st.radio(
            "Primary Student Fitness Goal",
            ["🔥 Weight Loss", "💪 Muscle Building", "🥗 Healthy Lifestyle", "📈 Weight Gain"],
            horizontal=True
        )

        # Compute BMI
        height_m = height_cm / 100.0
        bmi = round(weight_kg / (height_m * height_m), 1)

        if bmi < 18.5:
            bmi_cat = "Underweight"
            bmi_color = "#f59e0b"
            bmi_advice = "Focus on nutrient-dense foods, healthy fats, and adequate protein to build resilient energy."
        elif bmi <= 24.9:
            bmi_cat = "Normal Weight"
            bmi_color = "#10b981"
            bmi_advice = "Optimal healthy range! Maintain balanced meals, hydration, and regular movement."
        elif bmi <= 29.9:
            bmi_cat = "Overweight"
            bmi_color = "#ea580c"
            bmi_advice = "Focus on lean protein, high fiber vegetables, and reducing deep-fried canteen snacks."
        else:
            bmi_cat = "Obese"
            bmi_color = "#e11d48"
            bmi_advice = "Prioritize whole foods, replace sugary beverages with water, and begin daily brisk walking."

        # BMR & Target Calculations
        bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age
        bmr += 5 if gender == "Male" else -161
        tdee = bmr * 1.4

        if "Loss" in goal:
            cals = max(1400, round(tdee - 400))
            protein = round(weight_kg * 1.6)
        elif "Muscle" in goal:
            cals = round(tdee + 250)
            protein = round(weight_kg * 1.8)
        elif "Gain" in goal:
            cals = round(tdee + 450)
            protein = round(weight_kg * 1.6)
        else:
            cals = round(tdee)
            protein = round(weight_kg * 1.3)

        water = round((weight_kg * 0.035) + 0.5, 1)

        # Display BMI Gauge & Targets
        st.markdown(f"""
        <div style="background: linear-gradient(135deg, #0f172a 0%, #064e3b 100%); color: white; padding: 1.5rem; border-radius: 20px; border: 1.5px solid #10b981; margin: 1rem 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                <div>
                    <div style="font-size: 0.8rem; font-weight: 700; color: #34d399; text-transform: uppercase; letter-spacing: 0.1em;">BMI Score</div>
                    <div style="font-size: 3rem; font-weight: 900; font-family: 'Outfit';">{bmi} <span style="font-size: 1rem; color: #94a3b8;">kg/m²</span></div>
                    <div style="display: inline-block; background: {bmi_color}33; color: {bmi_color}; border: 1px solid {bmi_color}; padding: 3px 12px; border-radius: 9999px; font-weight: 800; font-size: 0.85rem;">
                        ● {bmi_cat}
                    </div>
                </div>
                <div style="max-width: 420px; font-size: 0.88rem; color: #cbd5e1; margin-top: 10px;">
                    «{bmi_advice}»
                </div>
            </div>
            
            <div style="margin-top: 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 12px; text-align: center;">
                <div style="background: rgba(255,255,255,0.08); padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="color: #34d399; font-size: 0.75rem; font-weight: 700;">DAILY CALORIES</div>
                    <div style="font-size: 1.4rem; font-weight: 800;">{cals}</div>
                    <div style="font-size: 0.65rem; color: #94a3b8;">kcal/day</div>
                </div>
                <div style="background: rgba(255,255,255,0.08); padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="color: #60a5fa; font-size: 0.75rem; font-weight: 700;">DAILY PROTEIN</div>
                    <div style="font-size: 1.4rem; font-weight: 800;">{protein}g</div>
                    <div style="font-size: 0.65rem; color: #94a3b8;">target</div>
                </div>
                <div style="background: rgba(255,255,255,0.08); padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="color: #38bdf8; font-size: 0.75rem; font-weight: 700;">HYDRATION</div>
                    <div style="font-size: 1.4rem; font-weight: 800;">{water}L</div>
                    <div style="font-size: 0.65rem; color: #94a3b8;">water/day</div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
