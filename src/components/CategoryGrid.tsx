
import React from 'react';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const categories = [
  { id: 'action', name: 'Action', emoji: '⚔️', count: 150, gradient: 'from-red-500 to-orange-500' },
  { id: 'romance', name: 'Romance', emoji: '💖', count: 89, gradient: 'from-pink-500 to-rose-500' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🔮', count: 134, gradient: 'from-purple-500 to-indigo-500' },
  { id: 'mecha', name: 'Mecha', emoji: '🤖', count: 67, gradient: 'from-blue-500 to-teal-500' },
  { id: 'school', name: 'School Life', emoji: '🎒', count: 98, gradient: 'from-green-500 to-emerald-500' },
  { id: 'supernatural', name: 'Supernatural', emoji: '👻', count: 112, gradient: 'from-violet-500 to-purple-500' },
  { id: 'slice-of-life', name: 'Slice of Life', emoji: '🍃', count: 76, gradient: 'from-amber-500 to-yellow-500' },
  { id: 'sports', name: 'Sports', emoji: '⚽', count: 54, gradient: 'from-cyan-500 to-blue-500' },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Categories</h1>
        <p className="text-purple-200 opacity-80">Discover amazing anime wallpapers</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="group cursor-pointer"
          >
            {/* Glass morphism card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              {/* Category gradient background */}
              <div className={`w-full h-32 bg-gradient-to-br ${category.gradient} rounded-xl mb-4 flex items-center justify-center shadow-lg`}>
                <span className="text-4xl filter drop-shadow-lg">{category.emoji}</span>
              </div>
              
              {/* Category info */}
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-purple-200 opacity-70 text-sm">{category.count} wallpapers</p>
              </div>
              
              {/* Hover indicator */}
              <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured section */}
      <div className="mt-12 max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">✨ Featured This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="backdrop-blur-lg bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold">Featured #{item}</span>
                </div>
                <p className="text-purple-200 text-sm text-center">Premium Collection</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
