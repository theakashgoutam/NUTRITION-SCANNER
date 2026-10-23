import React, { useState } from 'react';
import { BookOpen, Sparkles, Filter, ChevronRight, Award, Trophy, Lightbulb } from 'lucide-react';
import { AWARENESS_CARDS, DAILY_CHALLENGES } from '../data/awareness';
import { AwarenessCard } from '../types';

interface AwarenessViewProps {
  onScanPrompt: () => void;
}

export const AwarenessView: React.FC<AwarenessViewProps> = ({ onScanPrompt }) => {
  const [selectedCard, setSelectedCard] = useState<AwarenessCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nutrilens_completed_challenges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = ['All', 'Nutrition 101', 'Mess & Canteen Hacks', 'Portion Sense', 'Student Wellness'];

  const filteredCards = AWARENESS_CARDS.filter(
    (c) => activeCategory === 'All' || c.category === activeCategory
  );

  const toggleChallenge = (id: string) => {
    const updated = completedChallenges.includes(id)
      ? completedChallenges.filter(c => c !== id)
      : [...completedChallenges, id];
    setCompletedChallenges(updated);
    try {
      localStorage.setItem('nutrilens_completed_challenges', JSON.stringify(updated));
    } catch {
      // Ignore local storage error
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
          <BookOpen className="w-3.5 h-3.5 text-orange-600" />
          <span>Practical Student Knowledge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
          Healthy Eating Awareness
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Short, practical nutrition guides for everyday student life. Realistic food swaps and habits that boost your energy and academic focus.
        </p>
      </div>

      {/* Today's Daily Challenges Card */}
      <div className="bg-gradient-to-br from-slate-900 via-orange-950/80 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-orange-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit']">
                Student Micro-Habit Challenges
              </h3>
              <p className="text-xs text-slate-400">
                Simple daily moves that compound into lasting energy and health
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700 text-xs font-semibold self-start sm:self-auto">
            <Award className="w-4 h-4 text-orange-400" />
            <span>Completed: <strong className="text-orange-400">{completedChallenges.length}</strong> / {DAILY_CHALLENGES.length}</span>
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DAILY_CHALLENGES.map((challenge) => {
            const isDone = completedChallenges.includes(challenge.id);
            return (
              <div
                key={challenge.id}
                onClick={() => toggleChallenge(challenge.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isDone
                    ? 'bg-orange-950/40 border-orange-500/60 shadow-xs'
                    : 'bg-slate-900/60 border-slate-800 hover:border-orange-500/40'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                      {challenge.tag}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDone ? 'bg-orange-500/30 text-orange-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold ${isDone ? 'text-orange-200 line-through' : 'text-white'}`}>
                    {challenge.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[11px] text-slate-400">
                    {challenge.actionPrompt}
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[11px] font-bold ${
                    isDone ? 'bg-orange-500 border-orange-400 text-white' : 'border-slate-600 text-transparent'
                  }`}>
                    ✓
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Awareness Cards Section */}
      <div className="space-y-6">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-orange-500" />
            <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
              Nutrition Guides
            </h3>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="bg-white rounded-2xl border border-orange-200/80 p-5 shadow-xs hover:border-orange-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{card.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                    {card.readTime}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider block">
                    {card.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {card.summary}
                  </p>
                </div>
              </div>

              {/* Student Quick Tip */}
              <div className="bg-orange-50/70 p-2.5 rounded-xl border border-orange-200/80 flex items-start gap-2 text-xs text-orange-950">
                <Lightbulb className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1 italic font-medium">Tip: {card.studentTip}</span>
              </div>

              <div className="pt-2 border-t border-orange-100 flex items-center justify-between text-xs font-semibold text-orange-600">
                <span>Read Full Guide</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-orange-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-3xl">{selectedCard.emoji}</span>
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider block pt-1">
                  {selectedCard.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  {selectedCard.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100">
              {selectedCard.summary}
            </p>

            {/* Bullet Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Key Takeaways:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedCard.bulletPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Student Tip Callout */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-orange-950">
              <Lightbulb className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Practical Tip:</strong>
                <p className="mt-0.5">{selectedCard.studentTip}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCard(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Close Guide
              </button>
              <button
                onClick={() => {
                  setSelectedCard(null);
                  onScanPrompt();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20"
              >
                Scan a Meal Now ➔
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
