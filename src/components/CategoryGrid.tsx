
import React from 'react';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const categories = [
  { id: 'action', name: 'Action', emoji: '⚔️', count: 150, gradient: 'from-red-500/40 to-orange-500/40', color: 'red' },
  { id: 'romance', name: 'Romance', emoji: '💖', count: 89, gradient: 'from-pink-500/40 to-rose-500/40', color: 'pink' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🔮', count: 134, gradient: 'from-purple-500/40 to-indigo-500/40', color: 'purple' },
  { id: 'mecha', name: 'Mecha', emoji: '🤖', count: 67, gradient: 'from-blue-500/40 to-teal-500/40', color: 'blue' },
  { id: 'school', name: 'School Life', emoji: '🎒', count: 98, gradient: 'from-green-500/40 to-emerald-500/40', color: 'green' },
  { id: 'supernatural', name: 'Supernatural', emoji: '👻', count: 112, gradient: 'from-violet-500/40 to-purple-500/40', color: 'violet' },
  { id: 'slice-of-life', name: 'Slice of Life', emoji: '🍃', count: 76, gradient: 'from-amber-500/40 to-yellow-500/40', color: 'amber' },
  { id: 'sports', name: 'Sports', emoji: '⚽', count: 54, gradient: 'from-cyan-500/40 to-blue-500/40', color: 'cyan' },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="min-h-screen p-4">
      {/* Responsive Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mb-8">
        {categories.map((category, index) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-2xl hover:shadow-purple-500/10 hover:bg-white/10">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} backdrop-blur-xl`}></div>
              </div>
              
              {/* Content */}
              <div className="relative p-4">
                <div className={`w-full h-32 bg-gradient-to-br ${category.gradient} rounded-2xl mb-4 flex items-center justify-center shadow-xl relative overflow-hidden backdrop-blur-xl border border-white/10`}>
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                  <span className="relative text-4xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{category.emoji}</span>
                </div>
                
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-200 transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-white/60">
                    <span className="text-sm font-medium">{category.count}</span>
                    <span className="text-xs">wallpapers</span>
                  </div>
                </div>
                
                {/* Progress Bar Animation */}
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <span className="text-yellow-400">✨</span>
              Featured Collections
            </h2>
            <p className="text-white/70">Handpicked premium wallpapers updated weekly</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Trending Now", subtitle: "Most Popular", gradient: "from-red-400/30 to-pink-500/30" },
              { title: "Editor's Choice", subtitle: "Staff Picks", gradient: "from-blue-400/30 to-purple-500/30" },
              { title: "New Arrivals", subtitle: "Fresh Content", gradient: "from-green-400/30 to-teal-500/30" }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-purple-500/10 hover:scale-105">
                  <div className={`w-full h-40 bg-gradient-to-br ${item.gradient} relative flex items-center justify-center overflow-hidden backdrop-blur-xl`}>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                    <div className="relative text-center text-white px-2">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-sm opacity-80">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-white/60 text-sm">Premium Collection</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
