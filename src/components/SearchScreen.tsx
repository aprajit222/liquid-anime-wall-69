
import React, { useState } from 'react';

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Mock search results
    if (query.length > 0) {
      const mockResults = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `${query} Wallpaper ${i + 1}`,
        gradient: [
          'from-red-400/40 to-pink-400/40',
          'from-blue-400/40 to-purple-400/40',
          'from-green-400/40 to-teal-400/40',
          'from-yellow-400/40 to-orange-400/40',
        ][i % 4],
      }));
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Search Wallpapers</h1>
        <p className="text-white/60">Find your perfect anime wallpaper</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-4 shadow-lg">
          <input
            type="text"
            placeholder="Search for anime, character, or style..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-transparent text-white placeholder-white/50 outline-none text-lg"
          />
        </div>
      </div>

      {/* Popular Searches */}
      {searchQuery === '' && (
        <div className="mb-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-3">
            {['Naruto', 'Dragon Ball', 'One Piece', 'Attack on Titan', 'Demon Slayer', 'Studio Ghibli'].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="backdrop-blur-xl bg-white/10 border border-white/20 text-white/80 px-4 py-2 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4">
            Results for "{searchQuery}" ({searchResults.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((result) => (
              <div key={result.id} className="group cursor-pointer">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className={`w-full aspect-[9/16] bg-gradient-to-br ${result.gradient} flex items-center justify-center backdrop-blur-xl`}>
                    <span className="text-white font-semibold text-center px-2">{result.title}</span>
                  </div>
                  <div className="p-3">
                    <div className="text-white/60 text-xs text-center">
                      HD Quality • Free Download
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {searchQuery && searchResults.length === 0 && (
        <div className="text-center max-w-md mx-auto">
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-white/60">Try searching for different keywords or browse categories</p>
          </div>
        </div>
      )}
    </div>
  );
};
