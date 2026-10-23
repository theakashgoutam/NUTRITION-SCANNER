import React, { useState } from 'react';
import { Trash2, Plus, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { DetectedFoodItem, FoodItemData } from '../types';
import { INDIAN_FOODS_DATABASE } from '../data/foods';
import { updateItemPortion, buildDetectedItemFromDatabase } from '../lib/nutritionEngine';

interface ConfirmationViewProps {
  detectedFoods: DetectedFoodItem[];
  imageUrl?: string;
  onConfirm: (updatedFoods: DetectedFoodItem[]) => void;
  onRetake: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  detectedFoods: initialFoods,
  imageUrl,
  onConfirm,
  onRetake,
}) => {
  const [foods, setFoods] = useState<DetectedFoodItem[]>(initialFoods);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handlePortionChange = (item: DetectedFoodItem, newPortion: 'Small' | 'Medium' | 'Large') => {
    const updated = updateItemPortion(item, newPortion);
    setFoods(foods.map(f => (f.id === item.id ? updated : f)));
  };

  const handleRemoveItem = (id: string) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  const handleAddFood = (foodData: FoodItemData) => {
    const newItem = buildDetectedItemFromDatabase(foodData, 'Medium', 0.95);
    newItem.isUserModified = true;
    setFoods([...foods, newItem]);
    setShowAddModal(false);
    setSearchQuery('');
  };

  const handleNameChange = (itemId: string, newFoodData: FoodItemData) => {
    const current = foods.find(f => f.id === itemId);
    const portion = current?.portionSize || 'Medium';
    const updated = buildDetectedItemFromDatabase(newFoodData, portion === 'Custom' ? 'Medium' : portion, 0.95);
    updated.id = itemId;
    updated.isUserModified = true;
    setFoods(foods.map(f => (f.id === itemId ? updated : f)));
    setEditingItemId(null);
  };

  // Filter food database for add modal
  const categories = ['All', 'Grains & Breads', 'Lentils & Curries', 'Protein & Dairy', 'Vegetables', 'Snacks & Canteen', 'Salads & Sides'];
  const filteredDatabase = INDIAN_FOODS_DATABASE.filter(f => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate live preview totals
  const totalCalories = Math.round(foods.reduce((sum, f) => sum + f.calories, 0));
  const totalProtein = Math.round(foods.reduce((sum, f) => sum + f.protein, 0) * 10) / 10;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Step 2 of 3 • User Review</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Confirm Detected Foods
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Verify plate items and adjust portions to calculate your exact nutritional breakdown.
          </p>
        </div>

        <button
          onClick={onRetake}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Rescan Photo</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Image & Live Summary */}
        <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
          {imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-orange-200 shadow-xs bg-slate-950 aspect-4/3 relative">
              <img
                src={imageUrl}
                alt="Meal Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {foods.length} items detected
              </div>
            </div>
          )}

          {/* Real-time Tally Card */}
          <div className="bg-white rounded-2xl border border-orange-200/80 p-4 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Live Recalculated Summary
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-orange-50/70 p-3 rounded-xl border border-orange-100">
                <span className="text-[11px] text-slate-600 block">Est. Calories</span>
                <span className="text-xl font-black text-orange-600 font-['Outfit']">
                  ~{totalCalories} <span className="text-xs font-normal">kcal</span>
                </span>
              </div>

              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100">
                <span className="text-[11px] text-slate-600 block">Protein</span>
                <span className="text-xl font-black text-amber-700 font-['Outfit']">
                  {totalProtein} <span className="text-xs font-normal">g</span>
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              *Nutrition updates dynamically as you adjust portions or remove items.
            </p>
          </div>

          <button
            id="confirm-foods-btn"
            disabled={foods.length === 0}
            onClick={() => onConfirm(foods)}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-sm py-3.5 px-4 rounded-2xl shadow-md shadow-orange-500/20 transition-all active:scale-98 disabled:opacity-50"
          >
            <span>View Nutrition Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: Detected Foods List */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Identified Plate Items ({foods.length})
            </h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Missing Item</span>
            </button>
          </div>

          {foods.length === 0 ? (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-orange-500 mx-auto" />
              <p className="text-sm font-semibold text-orange-900">
                All food items were removed.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl"
              >
                Add a Food Item
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {foods.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-orange-200/80 p-4 shadow-xs hover:border-orange-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">
                          {item.name}
                        </span>
                        
                        {/* Confidence Badge */}
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                          {item.isUserModified ? 'User Set' : `${Math.round(item.confidence * 100)}% Confidence`}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500">
                        Estimated: ~{item.estimatedGrams}g • ~{item.calories} kcal • {item.protein}g protein
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
                        className="text-xs text-slate-500 hover:text-orange-600 hover:underline"
                      >
                        Change Name
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Change Food Selector */}
                  {editingItemId === item.id && (
                    <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-200 space-y-2">
                      <span className="text-xs font-bold text-slate-700 block">
                        Swap "{item.name}" with another food:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {INDIAN_FOODS_DATABASE.slice(0, 18).map(f => (
                          <button
                            key={f.id}
                            onClick={() => handleNameChange(item.id, f)}
                            className="text-left text-xs bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 p-1.5 rounded-lg truncate"
                          >
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Portion Size Toggle Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-slate-500 font-medium">Portion:</span>
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      {(['Small', 'Medium', 'Large'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePortionChange(item, p)}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                            item.portionSize === p
                              ? 'bg-white text-orange-700 shadow-xs border border-orange-300 font-bold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 ml-auto">
                      {item.portionLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Item Trigger */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-3 border-2 border-dashed border-orange-200 hover:border-orange-400 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 hover:text-orange-700 hover:bg-orange-50/40 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Add another item (e.g. Curd, Salad, Extra Roti)</span>
          </button>

        </div>

      </div>

      {/* Add Food Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-orange-200 space-y-4 max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Add Food from Database
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search food (e.g. Curd, Momos, Paratha, Dal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />

            {/* Category Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Food List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
              {filteredDatabase.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No matching foods found in verified database.
                </div>
              ) : (
                filteredDatabase.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => handleAddFood(food)}
                    className="pt-2 first:pt-0 flex items-center justify-between p-2 rounded-xl hover:bg-orange-50/50 cursor-pointer transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{food.name}</h4>
                      <p className="text-[11px] text-slate-500">
                        {food.servingSizeUnit} • ~{food.caloriesPer100g} kcal/100g • {food.proteinPer100g}g protein
                      </p>
                    </div>
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-lg">
                      + Add
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
