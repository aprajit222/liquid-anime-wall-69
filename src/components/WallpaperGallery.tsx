
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface WallpaperGalleryProps {
  categoryId: string | null;
  onBack: () => void;
}

export const WallpaperGallery: React.FC<WallpaperGalleryProps> = ({ categoryId, onBack }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<number | null>(null);

  // Mock wallpaper data
  const wallpapers = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Anime Wallpaper ${i + 1}`,
    downloads: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 1000),
    gradient: [
      'from-red-400 to-pink-400',
      'from-blue-400 to-purple-400',
      'from-green-400 to-teal-400',
      'from-yellow-400 to-orange-400',
      'from-purple-400 to-indigo-400',
      'from-pink-400 to-rose-400',
    ][i % 6],
  }));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/50 border-b border-white/10 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white capitalize">{categoryId} Wallpapers</h1>
            <p className="text-purple-200 opacity-70 text-sm">{wallpapers.length} high-quality wallpapers</p>
          </div>
        </div>
      </div>

      {/* Wallpaper Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              onClick={() => setSelectedWallpaper(wallpaper.id)}
              className="group cursor-pointer"
            >
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Wallpaper preview */}
                <div className={`w-full aspect-[9/16] bg-gradient-to-br ${wallpaper.gradient} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <span className="relative z-10 text-white font-semibold text-lg">{wallpaper.title}</span>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-sm">👁️ Preview</div>
                    </div>
                  </div>
                </div>
                
                {/* Wallpaper info */}
                <div className="p-3">
                  <div className="flex justify-between items-center text-xs text-purple-200">
                    <span>💾 {wallpaper.downloads.toLocaleString()}</span>
                    <span>❤️ {wallpaper.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wallpaper Viewer Modal */}
      {selectedWallpaper && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md mx-auto">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden">
              <div className={`w-full aspect-[9/16] bg-gradient-to-br ${wallpapers[selectedWallpaper - 1]?.gradient} flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">{wallpapers[selectedWallpaper - 1]?.title}</span>
              </div>
              
              {/* Action buttons */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button className="backdrop-blur-lg bg-purple-500/20 border border-purple-500/30 text-purple-200 py-3 px-4 rounded-xl hover:bg-purple-500/30 transition-all duration-200">
                    📱 Set as Wallpaper
                  </button>
                  <button className="backdrop-blur-lg bg-blue-500/20 border border-blue-500/30 text-blue-200 py-3 px-4 rounded-xl hover:bg-blue-500/30 transition-all duration-200">
                    💾 Download
                  </button>
                </div>
                
                <button
                  onClick={() => setSelectedWallpaper(null)}
                  className="w-full backdrop-blur-lg bg-white/10 border border-white/20 text-white py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
