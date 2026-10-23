# NutriLens AI (Python + Streamlit Edition)

AI Food Scanner + Healthy Eating Awareness Program designed specifically for college and hostel/PG students.

---

## Architecture Overview

1. **Perception Layer (AI):** `ai_service.py`
   - Powered by Google Gemini 2.5 Flash (`google-genai` SDK).
   - Identifies multiple composite Indian food items on a single plate or thali and estimates approximate portion sizes and weights.

2. **Deterministic Calculation Engine:** `nutrition_engine.py` & `nutrition_data.csv`
   - Verified reference dataset of 60+ Indian and student food items.
   - Calculates energy, protein, carbohydrates, fats, and dietary fiber without AI hallucinations.
   - Generates calorie ranges (e.g., 580–680 kcal) to respect measurement reality.
   - Computes an educational **Meal Health Score (0–100)** with categorized breakdown.

3. **User Confirmation & Error Prevention:**
   - Review step allowing students to adjust portion sizes (Small / Medium / Large), modify item names, or delete incorrect detections before calculating.

4. **Healthy Eating Awareness Program:** `awareness_content.py`
   - 10 practical educational cards addressing protein, fiber, hidden mess cooking oil, smart canteen swaps, and budget protein.
   - Daily micro-habit challenges with completion trackers.

5. **Demo Mode:**
   - 1-click presets for hackathon testing without camera/API key dependency.

---

## Quick Start (Local Run)

1. **Install requirements:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set your Gemini API Key (optional for live camera vision):**
   ```bash
   export GEMINI_API_KEY="your-gemini-api-key"
   ```

3. **Launch the Streamlit app:**
   ```bash
   streamlit run app.py
   ```

---

## Medical Disclaimer

NutriLens AI provides nutritional awareness estimates to support healthy lifestyle education among students. It does not provide clinical nutrition prescriptions or medical advice.
