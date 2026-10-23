"""
NutriLens AI - Scanner Component
High-fidelity meal upload, camera capture, animated scan state, multi-food detection cards & user confirmation.
"""

import streamlit as st
import time
from PIL import Image
from utils.image_processing import process_uploaded_image, detect_foods_from_image
from data.foods import search_food
from utils.nutrition import calculate_item_macros

def render_scanner_section():
    st.markdown("""
    <style>
    .scanner-card {
        background: rgba(255, 255, 255, 0.85);
        border: 2px dashed #34d399;
        border-radius: 24px;
        padding: 2rem 1.5rem;
        text-align: center;
        position: relative;
        box-shadow: 0 20px 40px -15px rgba(16, 185, 129, 0.15);
        backdrop-filter: blur(10px);
        margin-bottom: 2rem;
        transition: all 0.3s ease;
    }
    
    .scanner-card:hover {
        border-color: #059669;
        box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
    }
    
    .scanner-header {
        font-family: 'Outfit', sans-serif;
        font-size: 1.8rem;
        font-weight: 800;
        color: #065f46;
        margin-bottom: 0.3rem;
    }
    
    .scanner-sub {
        color: #64748b;
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .scanline {
        height: 3px;
        background: linear-gradient(90deg, transparent, #10b981, #f59e0b, transparent);
        border-radius: 2px;
        margin: 1rem 0;
        animation: scanMove 2s infinite ease-in-out;
    }
    
    @keyframes scanMove {
        0% { transform: scaleX(0.2); opacity: 0.3; }
        50% { transform: scaleX(1); opacity: 1; }
        100% { transform: scaleX(0.2); opacity: 0.3; }
    }
    
    .food-tag-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        margin-bottom: 0.75rem;
        transition: transform 0.2s ease;
    }
    .food-tag-card:hover {
        transform: translateY(-2px);
        border-color: #10b981;
    }
    
    .privacy-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        color: #059669;
        background: #ecfdf5;
        padding: 6px 14px;
        border-radius: 9999px;
        margin-top: 1rem;
    }
    </style>
    """, unsafe_allow_html=True)

    st.markdown('<div class="scanner-card">', unsafe_allow_html=True)
    st.markdown('<div class="scanner-header">📸 SCAN YOUR MEAL</div>', unsafe_allow_html=True)
    st.markdown('<div class="scanner-sub">Upload a plate photo or snap with your camera. AI identifies multiple items and calculates precise nutrition.</div>', unsafe_allow_html=True)
    st.markdown('<div class="scanline"></div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

    # Input method selection
    tab_upload, tab_camera, tab_demo = st.tabs(["📁 Upload Image", "📷 Live Camera", "⚡ 1-Click Hackathon Presets"])

    uploaded_file = None

    with tab_upload:
        file_input = st.file_uploader(
            "Drop your meal photo here (JPG, PNG, WebP):",
            type=["jpg", "jpeg", "png", "webp"],
            key="file_uploader_widget"
        )
        if file_input:
            uploaded_file = file_input

    with tab_camera:
        cam_input = st.camera_input("Take a photo of your plate or canteen tray", key="cam_widget")
        if cam_input:
            uploaded_file = cam_input

    with tab_demo:
        st.markdown("**Test the complete AI recognition & calculation pipeline instantly:**")
        preset_choice = st.selectbox(
            "Select Student Meal Preset:",
            [
                "🍛 Balanced Thali: Steamed Rice, Yellow Dal, Paneer Masala & Salad",
                "🫓 North Indian Mess: 2 Rotis, Dal Tadka, Mixed Veg Sabzi & Curd",
                "🍗 Canteen High-Protein: Chicken Biryani with Veg Raita",
                "🍜 Exam-Night Fuel: Maggi Noodles + 2 Boiled Eggs",
                "🥟 Evening Canteen: Steamed Momos + Roasted Chana Snack"
            ]
        )
        if st.button("⚡ Load Preset Meal Analysis", type="primary"):
            if "Balanced Thali" in preset_choice:
                r1 = search_food("Steamed White Rice")
                r2 = search_food("Yellow Dal")
                r3 = search_food("Paneer Masala")
                r4 = search_food("Fresh Salad")
                items = [
                    {"name": r1["name"], "icon": r1["icon"], "portion_size": "Medium", "grams": 180, "confidence": 0.95, **calculate_item_macros(r1, 180)},
                    {"name": r2["name"], "icon": r2["icon"], "portion_size": "Medium", "grams": 150, "confidence": 0.91, **calculate_item_macros(r2, 150)},
                    {"name": r3["name"], "icon": r3["icon"], "portion_size": "Medium", "grams": 120, "confidence": 0.89, **calculate_item_macros(r3, 120)},
                    {"name": r4["name"], "icon": r4["icon"], "portion_size": "Small", "grams": 80, "confidence": 0.93, **calculate_item_macros(r4, 80)},
                ]
            elif "North Indian" in preset_choice:
                r1 = search_food("Roti")
                r2 = search_food("Dal Tadka")
                r3 = search_food("Mixed Veg")
                r4 = search_food("Plain Curd")
                items = [
                    {"name": r1["name"], "icon": r1["icon"], "portion_size": "Medium", "grams": 70, "confidence": 0.96, **calculate_item_macros(r1, 70)},
                    {"name": r2["name"], "icon": r2["icon"], "portion_size": "Medium", "grams": 150, "confidence": 0.92, **calculate_item_macros(r2, 150)},
                    {"name": r3["name"], "icon": r3["icon"], "portion_size": "Medium", "grams": 130, "confidence": 0.88, **calculate_item_macros(r3, 130)},
                    {"name": r4["name"], "icon": r4["icon"], "portion_size": "Small", "grams": 100, "confidence": 0.94, **calculate_item_macros(r4, 100)},
                ]
            elif "Chicken Biryani" in preset_choice:
                r1 = search_food("Chicken Biryani")
                r2 = search_food("Cucumber / Veg Raita")
                items = [
                    {"name": r1["name"], "icon": r1["icon"], "portion_size": "Large", "grams": 300, "confidence": 0.97, **calculate_item_macros(r1, 300)},
                    {"name": r2["name"], "icon": r2["icon"], "portion_size": "Medium", "grams": 130, "confidence": 0.90, **calculate_item_macros(r2, 130)},
                ]
            elif "Exam-Night" in preset_choice:
                r1 = search_food("Maggi Noodles")
                r2 = search_food("Boiled Eggs")
                items = [
                    {"name": r1["name"], "icon": r1["icon"], "portion_size": "Medium", "grams": 180, "confidence": 0.94, **calculate_item_macros(r1, 180)},
                    {"name": r2["name"], "icon": r2["icon"], "portion_size": "Medium", "grams": 100, "confidence": 0.96, **calculate_item_macros(r2, 100)},
                ]
            else:
                r1 = search_food("Steamed Momos")
                r2 = search_food("Roasted Chana")
                items = [
                    {"name": r1["name"], "icon": r1["icon"], "portion_size": "Medium", "grams": 120, "confidence": 0.91, **calculate_item_macros(r1, 120)},
                    {"name": r2["name"], "icon": r2["icon"], "portion_size": "Small", "grams": 50, "confidence": 0.95, **calculate_item_macros(r2, 50)},
                ]
            
            st.session_state["detected_items"] = items
            st.session_state["scan_complete"] = True
            st.success("Preset loaded successfully! Scroll down to confirm.")

    # Image upload processing with animated scanning sequence
    if uploaded_file:
        img = process_uploaded_image(uploaded_file)
        if img:
            col_img, col_act = st.columns([1, 1])
            with col_img:
                st.image(img, caption="Plate Image to Analyze", use_container_width=True)
            with col_act:
                st.markdown("### 🤖 Ready to Analyze")
                st.write("Our vision pipeline will segment each food cluster, estimate portions, and match against reference databases.")
                
                if st.button("🚀 Analyze Food Plate", type="primary", key="btn_analyze"):
                    # Step 11: Animated Scanning Experience
                    scan_status = st.empty()
                    progress_bar = st.progress(0)
                    
                    steps = [
                        (25, "🔍 Detecting food items & boundary clusters..."),
                        (50, "⚖️ Estimating volumetric portions & serving weights..."),
                        (75, "🧮 Calculating macros, calories & fiber in database..."),
                        (100, "🧠 Generating personalized student AI recommendations...")
                    ]
                    
                    for pct, label in steps:
                        scan_status.markdown(f"**{label}**")
                        progress_bar.progress(pct)
                        time.sleep(0.3)
                    
                    detected = detect_foods_from_image(img)
                    st.session_state["detected_items"] = detected
                    st.session_state["scan_complete"] = True
                    progress_bar.empty()
                    scan_status.success("✅ Meal successfully analyzed!")

    # Step 12 & Step 27: Multiple Food Detection & User Confirmation
    if st.session_state.get("scan_complete") and st.session_state.get("detected_items"):
        st.markdown("---")
        st.markdown("### 📋 DETECTED FOODS (Review & Adjust)")
        st.caption("AI estimates portion weights. You can tweak serving sizes or remove items before final calculation:")

        current_items = st.session_state["detected_items"]
        updated_list = []

        for idx, item in enumerate(current_items):
            c_name, c_portion, c_grams, c_del = st.columns([3, 2, 2, 1])
            
            with c_name:
                st.markdown(f"**{item.get('icon', '🍽️')} {item['name']}**")
                conf = int(item.get("confidence", 0.9) * 100)
                badge_color = "#10b981" if conf >= 85 else "#f59e0b"
                st.markdown(f"<span style='font-size: 0.8rem; color: {badge_color};'>● {conf}% Confidence</span>", unsafe_allow_html=True)
            
            with c_portion:
                curr_size = item.get("portion_size", "Medium")
                p_idx = 0 if curr_size == "Small" else (2 if curr_size == "Large" else 1)
                new_size = st.selectbox(
                    "Portion",
                    ["Small (~0.7x)", "Medium (1.0x)", "Large (~1.4x)"],
                    index=p_idx,
                    key=f"size_select_{idx}"
                )
            
            with c_grams:
                mult = 0.7 if "Small" in new_size else (1.4 if "Large" in new_size else 1.0)
                adj_grams = int(item["grams"] * mult)
                adj_cals = int(item["calories"] * mult)
                st.markdown(f"**{adj_grams}g**")
                st.caption(f"~{adj_cals} kcal")
            
            with c_del:
                to_delete = st.button("🗑️", key=f"del_btn_{idx}")

            if not to_delete:
                matched_db = search_food(item["name"])
                if matched_db:
                    updated_macros = calculate_item_macros(matched_db, adj_grams)
                    updated_list.append({
                        "name": item["name"],
                        "icon": item.get("icon", "🍽️"),
                        "portion_size": "Small" if "Small" in new_size else ("Large" if "Large" in new_size else "Medium"),
                        "grams": adj_grams,
                        "confidence": item.get("confidence", 0.9),
                        **updated_macros,
                    })
                else:
                    updated_list.append(item)

        st.session_state["detected_items"] = updated_list

        st.markdown("""
        <div style="text-align: center; margin: 1.5rem 0;">
            <div class="privacy-badge">🔒 Your food image is processed only for nutrition analysis. No PII stored.</div>
        </div>
        """, unsafe_allow_html=True)
