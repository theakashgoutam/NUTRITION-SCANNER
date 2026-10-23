import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  HeartPulse,
  Scale,
  Target,
  Droplets,
  Flame,
  Dumbbell,
  Wheat,
  Activity,
  Send,
  Bot,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface UserHealthProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  goal: 'loss' | 'maintain' | 'muscle' | 'gain';
}

export const AiHealthAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'targets' | 'chat'>('profile');

  // Open modal via custom event from HomeView "Start Chat" button
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setActiveTab('chat');
    };
    window.addEventListener('open-health-assistant', handleOpen);
    return () => window.removeEventListener('open-health-assistant', handleOpen);
  }, []);

  // Stored / default profile
  const [profile, setProfile] = useState<UserHealthProfile>(() => {
    try {
      const saved = localStorage.getItem('nutrilens_health_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      age: 21,
      gender: 'male',
      heightCm: 172,
      weightKg: 68,
      goal: 'muscle',
    };
  });

  // Save profile to local storage on change
  const updateProfile = (partial: Partial<UserHealthProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem('nutrilens_health_profile', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // BMI Calculation
  const bmiData = useMemo(() => {
    const heightM = profile.heightCm / 100;
    if (heightM <= 0 || profile.weightKg <= 0) {
      return { bmi: 0, category: 'Unknown', color: 'slate', text: '' };
    }
    const bmiVal = Number((profile.weightKg / (heightM * heightM)).toFixed(1));

    let category = 'Normal';
    let color = 'orange';
    let text = 'You are currently within the healthy recommended weight range.';

    if (bmiVal < 18.5) {
      category = 'Underweight';
      color = 'amber';
      text = 'Your BMI is below average. Prioritize nutrient-dense whole foods, healthy fats, and adequate protein.';
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      category = 'Normal';
      color = 'orange';
      text = 'Your BMI is in the healthy zone. Maintain balanced meals and consistent physical activity.';
    } else if (bmiVal >= 25.0 && bmiVal <= 29.9) {
      category = 'Overweight';
      color = 'orange';
      text = 'Your BMI is in the overweight range. Focus on lean protein, dietary fiber, and portion regulation in hostel mess meals.';
    } else {
      category = 'Obese';
      color = 'rose';
      text = 'Your BMI indicates obesity risk. Gradually reduce ultra-processed canteen foods and prioritize fiber-rich veggies.';
    }

    return { bmi: bmiVal, category, color, text };
  }, [profile.heightCm, profile.weightKg]);

  // Daily Nutrition Targets based on Mifflin-St Jeor formula
  const targets = useMemo(() => {
    // Basal Metabolic Rate (BMR)
    let bmr = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age;
    bmr += profile.gender === 'male' ? 5 : -161;

    // Moderate student activity multiplier (1.4x)
    let tdee = bmr * 1.4;

    // Adjust for Goal
    let targetCalories = Math.round(tdee);
    let proteinPerKg = 1.4;

    if (profile.goal === 'loss') {
      targetCalories = Math.max(1400, Math.round(tdee - 400));
      proteinPerKg = 1.6; // High protein to preserve lean muscle
    } else if (profile.goal === 'muscle') {
      targetCalories = Math.round(tdee + 250);
      proteinPerKg = 1.8;
    } else if (profile.goal === 'gain') {
      targetCalories = Math.round(tdee + 450);
      proteinPerKg = 1.6;
    } else {
      // maintain
      targetCalories = Math.round(tdee);
      proteinPerKg = 1.2;
    }

    const targetProtein = Math.round(profile.weightKg * proteinPerKg);
    const targetFat = Math.round((targetCalories * 0.25) / 9);
    const remainingCals = targetCalories - targetProtein * 4 - targetFat * 9;
    const targetCarbs = Math.max(80, Math.round(remainingCals / 4));
    const targetWater = Number(((profile.weightKg * 0.035) + 0.5).toFixed(1));

    return {
      calories: targetCalories,
      protein: targetProtein,
      carbs: targetCarbs,
      fat: targetFat,
      water: targetWater,
    };
  }, [profile]);

  // Chatbot State
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: `Hello! I'm your AI Health Assistant. Based on your profile (${profile.weightKg}kg, ${profile.heightCm}cm), your BMI is ${bmiData.bmi} (${bmiData.category}). How can I help you optimize your hostel meals today?`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getLocalStudentReply = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('protein') || lower.includes('muscle')) {
      return `To hit your ${targets.protein}g protein goal on a hostel budget: 1) Add 1 katori boiled eggs (₹14, ~12g protein), 2) Have roasted chana (sattu) as snacks (₹20, ~15g protein), 3) Choose thick dal or double rajma over excess white rice.`;
    } else if (lower.includes('budget') || lower.includes('cheap') || lower.includes('cost')) {
      return `Smart student budget swaps: Swap canteen samosas/burgers (₹40, zero protein) for roasted peanuts + boiled eggs (₹25, 16g protein + healthy fats). Curd (₹15) is also a cheap digestion and probiotic powerhouse!`;
    } else if (lower.includes('weight loss') || lower.includes('fat loss')) {
      return `For healthy fat loss targeting ${targets.calories} kcal/day: 1) Start your meal with cucumber and tomato salad first, 2) Swap fried puris for dry rotis, 3) Drink 500ml water 15 minutes before lunch to reduce hunger spikes.`;
    } else if (lower.includes('mess') || lower.includes('oil')) {
      return `Hostel mess curries often have floating excess oil. Pro tip: Tilt your bowl slightly and skim off the surface oil with your spoon before eating to cut 80–120 empty calories without losing the dal or vegetables!`;
    } else {
      return `Great question! For your goal (${profile.goal}) and BMI ${bmiData.bmi}, aim for ${targets.calories} kcal, ${targets.protein}g protein, and ${targets.water}L of water daily. Consistency in your mess meal choices will yield great results in 3–4 weeks.`;
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isTyping) return;

    const userMsg = { sender: 'user' as const, text: textToSend, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    try {
      // Try backend endpoint with Gemini and multi-model fallback
      const res = await fetch('/api/assistant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          profile,
          bmiData,
          targets,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: data.reply, time: 'Just now' },
        ]);
        return;
      }
    } catch {
      // Network or offline fallback
    } finally {
      setIsTyping(false);
    }

    // Fallback to local rule engine
    const reply = getLocalStudentReply(textToSend);
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: reply, time: 'Just now' },
    ]);
  };

  return (
    <>
      {/* Floating Fruit-Orb Button matching Joyful Website Palette */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <motion.button
            id="ai-orb-button"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl shadow-orange-950/15 backdrop-blur-xl border-2 border-orange-200/90 transition-all duration-300"
            title="Open AI Health Assistant & BMI Calculator"
          >
            {/* Joyful Fruit Glowing Orb Sphere */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 via-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/35">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="absolute inset-0 rounded-full border border-white/60 animate-ping"></span>
            </div>

            {/* Label */}
            <div className="hidden sm:flex flex-col text-left pr-2">
              <span className="text-xs font-black tracking-wide uppercase bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent font-['Outfit']">
                AI Health Assistant
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                BMI: {bmiData.bmi} • <strong className="text-orange-600">{bmiData.category}</strong>
              </span>
            </div>

            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white shadow-sm animate-bounce"></span>
          </motion.button>
        )}
      </div>

      {/* Expanded Joyful Glassmorphism Assistant Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex items-center justify-center p-3 sm:p-0">
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs sm:hidden"
              onClick={() => setIsOpen(false)}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg sm:w-[440px] max-h-[92vh] sm:max-h-[640px] bg-white text-slate-900 rounded-3xl border-2 border-orange-200/90 shadow-2xl shadow-orange-950/20 backdrop-blur-2xl flex flex-col overflow-hidden"
            >
              {/* Header with Joyful Fruit Gradient */}
              <div className="p-4 border-b border-orange-200/80 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base font-['Outfit'] tracking-wide">
                        AI HEALTH ASSISTANT
                      </h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/25 text-white border border-white/40">
                        LIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-orange-100 font-medium">
                      Student BMI & College Diet Engine
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 text-white flex items-center justify-center transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-orange-100 bg-orange-50/40 p-1.5 text-xs gap-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-orange-950 hover:bg-orange-100/60'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>BMI & Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('targets')}
                  className={`flex-1 py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'targets'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-orange-950 hover:bg-orange-100/60'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Daily Targets</span>
                </button>

                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'chat'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-orange-950 hover:bg-orange-100/60'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Coach Chat</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm bg-gradient-to-b from-orange-50/20 to-white">
                
                {/* TAB 1: BMI & PROFILE */}
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    {/* BMI Result Hero Card in Warm Palette */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-rose-50/40 border border-orange-200/90 text-center relative overflow-hidden shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
                        Real-Time Student BMI Gauge
                      </span>
                      
                      <div className="mt-2 flex items-baseline justify-center gap-2">
                        <span className="text-4xl sm:text-5xl font-black font-['Outfit'] bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                          {bmiData.bmi}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">kg/m²</span>
                      </div>

                      <div className="inline-block mt-2">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                            bmiData.category === 'Normal'
                              ? 'bg-orange-100 text-orange-800 border border-orange-300'
                              : bmiData.category === 'Underweight'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          ● {bmiData.category} Range
                        </span>
                      </div>

                      {/* Joyful BMI Scale Gauge Bar */}
                      <div className="mt-4 space-y-1">
                        <div className="h-2.5 w-full rounded-full bg-slate-200/80 flex overflow-hidden p-0.5 shadow-inner">
                          <div className="h-full w-[25%] bg-amber-400 rounded-l-full" title="Underweight (< 18.5)"></div>
                          <div className="h-full w-[40%] bg-orange-400" title="Normal (18.5 - 24.9)"></div>
                          <div className="h-full w-[20%] bg-orange-600" title="Overweight (25 - 29.9)"></div>
                          <div className="h-full w-[15%] bg-rose-500 rounded-r-full" title="Obese (>= 30)"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 px-1 font-semibold">
                          <span>16 (Low)</span>
                          <span>18.5</span>
                          <span>25</span>
                          <span>30+</span>
                        </div>
                      </div>

                      {/* Diagnosis Note */}
                      <p className="mt-3 text-xs text-slate-700 leading-relaxed bg-white/90 p-2.5 rounded-xl border border-orange-200/80 shadow-xs">
                        «{bmiData.text}»
                      </p>
                    </div>

                    {/* Profile Edit Inputs */}
                    <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-orange-200/80 shadow-xs">
                      <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                        <span>Adjust Your Metrics</span>
                        <span className="text-[10px] text-orange-600 font-semibold">Updates live</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[11px] text-slate-500 font-medium">Age</label>
                          <input
                            type="number"
                            value={profile.age}
                            onChange={(e) => updateProfile({ age: Number(e.target.value) || 20 })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-semibold focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 font-medium">Gender</label>
                          <select
                            value={profile.gender}
                            onChange={(e) => updateProfile({ gender: e.target.value as any })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-semibold focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 font-medium">Height (cm)</label>
                          <input
                            type="number"
                            value={profile.heightCm}
                            onChange={(e) => updateProfile({ heightCm: Number(e.target.value) || 170 })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-semibold focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-500 font-medium">Weight (kg)</label>
                          <input
                            type="number"
                            value={profile.weightKg}
                            onChange={(e) => updateProfile({ weightKg: Number(e.target.value) || 65 })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 font-semibold focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Target Goal Selector */}
                      <div>
                        <label className="text-[11px] text-slate-500 mb-1.5 block font-medium">Your Primary Goal</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: 'loss', label: '🔥 Weight Loss' },
                            { id: 'muscle', label: '💪 Muscle Building' },
                            { id: 'maintain', label: '🥗 Balanced Life' },
                            { id: 'gain', label: '📈 Weight Gain' },
                          ].map((g) => (
                            <button
                              key={g.id}
                              onClick={() => updateProfile({ goal: g.id as any })}
                              className={`py-1.5 px-2 rounded-xl text-xs font-semibold text-left transition-all ${
                                profile.goal === g.id
                                  ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
                                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-orange-50 hover:text-orange-950'
                              }`}
                            >
                              {g.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('targets')}
                      className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-orange-500/20 active:scale-98"
                    >
                      <span>View Personalized Daily Targets</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* TAB 2: DAILY TARGETS */}
                {activeTab === 'targets' && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">
                        Calculated for Your Biology
                      </span>
                      <h4 className="text-lg font-bold font-['Outfit'] text-slate-900">
                        Daily Nutritional Baseline
                      </h4>
                      <p className="text-xs text-slate-500">
                        Goal: <strong className="text-orange-600 capitalize">{profile.goal}</strong> • Weight: {profile.weightKg}kg
                      </p>
                    </div>

                    {/* Joyful Target Cards */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200 text-center shadow-xs">
                        <div className="flex items-center justify-center gap-1 text-[11px] text-orange-700 font-semibold mb-1">
                          <Flame className="w-3.5 h-3.5 text-orange-500" />
                          <span>Calories</span>
                        </div>
                        <div className="text-2xl font-black font-['Outfit'] text-slate-900">
                          {targets.calories}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">kcal / day</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 text-center shadow-xs">
                        <div className="flex items-center justify-center gap-1 text-[11px] text-rose-700 font-semibold mb-1">
                          <Dumbbell className="w-3.5 h-3.5 text-rose-500" />
                          <span>Daily Protein</span>
                        </div>
                        <div className="text-2xl font-black font-['Outfit'] text-rose-600">
                          {targets.protein}g
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">~{(targets.protein / profile.weightKg).toFixed(1)}g / kg bodyweight</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 text-center shadow-xs">
                        <div className="flex items-center justify-center gap-1 text-[11px] text-amber-700 font-semibold mb-1">
                          <Wheat className="w-3.5 h-3.5 text-amber-500" />
                          <span>Carbohydrates</span>
                        </div>
                        <div className="text-2xl font-black font-['Outfit'] text-slate-900">
                          {targets.carbs}g
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">sustained study energy</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 text-center shadow-xs">
                        <div className="flex items-center justify-center gap-1 text-[11px] text-cyan-700 font-semibold mb-1">
                          <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Hydration</span>
                        </div>
                        <div className="text-2xl font-black font-['Outfit'] text-cyan-700">
                          {targets.water}L
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">clean water / day</div>
                      </div>
                    </div>

                    {/* Practical Student Mess Rule */}
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 text-xs text-slate-700 space-y-1.5 shadow-xs">
                      <div className="font-bold text-orange-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-orange-600" />
                        <span>Actionable Student Mess Rule</span>
                      </div>
                      <p className="leading-relaxed">
                        Divide your <strong>{targets.protein}g protein</strong> across 3 meals (~{Math.round(targets.protein / 3)}g/meal) plus 1 snack. Hostel mess dal gives ~4–5g per bowl, so bolster it with eggs, curd, or sattu chana.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('chat')}
                      className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-orange-500/20 active:scale-98"
                    >
                      <span>Ask Coach About Your Goals</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* TAB 3: COACH CHAT */}
                {activeTab === 'chat' && (
                  <div className="space-y-3 flex flex-col h-[320px]">
                    {/* Messages scroll area */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                      {messages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${
                            m.sender === 'user' ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                              m.sender === 'user'
                                ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-br-none'
                                : 'bg-white border border-amber-200/90 text-slate-800 rounded-bl-none'
                            }`}
                          >
                            {m.text}
                          </div>
                          <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
                        </div>
                      ))}

                      {/* AI Thinking / Typing indicator */}
                      {isTyping && (
                        <div className="flex flex-col items-start">
                          <div className="rounded-2xl p-3 bg-white border border-amber-200 text-slate-400 rounded-bl-none shadow-xs flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Student Prompts */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] text-slate-500 font-semibold">1-Tap Student Prompts:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'How to hit 80g protein in hostel?',
                          'Cheap budget muscle foods?',
                          'How to reduce oily mess curries?',
                        ].map((prompt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(prompt)}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-900 font-medium text-left transition-colors"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input row */}
                    <div className="flex gap-1.5 pt-1">
                      <input
                        type="text"
                        placeholder="Ask advice about your hostel meal..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-500 shadow-xs"
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        className="w-9 h-9 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl flex items-center justify-center transition-all shadow-xs shrink-0 active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
