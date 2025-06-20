
import React from 'react';
import { Sparkles, TrendingUp, Star } from 'lucide-react';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

const categories = [
  { id: 'action', name: 'Action', emoji: '⚔️', count: 150, gradient: 'from-red-500 to-orange-500', color: 'red' },
  { id: 'romance', name: 'Romance', emoji: '💖', count: 89, gradient: 'from-pink-500 to-rose-500', color: 'pink' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🔮', count: 134, gradient: 'from-purple-500 to-indigo-500', color: 'purple' },
  { id: 'mecha', name: 'Mecha', emoji: '🤖', count: 67, gradient: 'from-blue-500 to-teal-500', color: 'blue' },
  { id: 'school', name: 'School Life', emoji: '🎒', count: 98, gradient: 'from-green-500 to-emerald-500', color: 'green' },
  { id: 'supernatural', name: 'Supernatural', emoji: '👻', count: 112, gradient: 'from-violet-500 to-purple-500', color: 'violet' },
  { id: 'slice-of-life', name: 'Slice of Life', emoji: '🍃', count: 76, gradient: 'from-amber-500 to-yellow-500', color: 'amber' },
  { id: 'sports', name: 'Sports', emoji: '⚽', count: 54, gradient: 'from-cyan-500 to-blue-500', color: 'cyan' },
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="min-h-screen">
      {/* Professional Header with Glass Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-3xl"></div>
        <div className="relative backdrop-blur-xl bg-black/30 border-b border-white/10 p-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                HQ Anime Wall
              </h1>
            </div>
            <p className="text-lg text-purple-200/80 mb-2">Premium Anime Wallpapers Collection</p>
            <div className="flex items-center justify-center gap-6 text-sm text-purple-300/60">
              <span className="flex items-center gap-1"><Star className="w-4 h-4" /> 4.9 Rating</span>
              <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 50K+ Downloads</span>
              <span>1000+ Wallpapers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Categories Grid with Professional Styling */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl overflow-hidden hover:border-white/40 transition-all duration-300 shadow-2xl hover:shadow-purple-500/20">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10`}></div>
                </div>
                
                {/* Content */}
                <div className="relative p-6">
                  <div className={`w-full h-36 bg-gradient-to-br ${category.gradient} rounded-2xl mb-6 flex items-center justify-center shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="relative text-5xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{category.emoji}</span>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-200 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-purple-300/70">
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

        {/* Professional Featured Section */}
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-4xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                Featured Collections
              </h2>
              <p className="text-purple-200/70">Handpicked premium wallpapers updated weekly</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Trending Now", subtitle: "Most Popular", gradient: "from-red-400 to-pink-500" },
                { title: "Editor's Choice", subtitle: "Staff Picks", gradient: "from-blue-400 to-purple-500" },
                { title: "New Arrivals", subtitle: "Fresh Content", gradient: "from-green-400 to-teal-500" }
              ].map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-purple-500/20">
                    <div className={`w-full h-48 bg-gradient-to-br ${item.gradient} relative flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative text-center text-white">
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        <p className="text-sm opacity-80">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-purple-200/70 text-sm">Premium Collection</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
