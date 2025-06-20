
import React, { useState } from 'react';
import { ArrowLeft, Maximize, X } from 'lucide-react';

interface WallpaperGalleryProps {
  categoryId: string | null;
  onBack: () => void;
}

export const WallpaperGallery: React.FC<WallpaperGalleryProps> = ({ categoryId, onBack }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const enterFullscreen = () => {
    setIsFullscreen(true);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Responsive Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/50 border-b border-white/10 p-3 sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-2 sm:p-2.5 hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white capitalize">{categoryId} Wallpapers</h1>
            <p className="text-purple-200 opacity-70 text-xs sm:text-sm">{wallpapers.length} high-quality wallpapers</p>
          </div>
        </div>
      </div>

      {/* Responsive Wallpaper Grid */}
      <div className="p-2 sm:p-3 md:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 max-w-7xl mx-auto">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              onClick={() => setSelectedWallpaper(wallpaper.id)}
              className="group cursor-pointer"
            >
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Wallpaper preview */}
                <div className={`w-full aspect-[9/16] bg-gradient-to-br ${wallpaper.gradient} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <span className="relative z-10 text-white font-semibold text-xs sm:text-sm md:text-lg text-center px-1 sm:px-2">{wallpaper.title}</span>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-xs sm:text-sm">👁️ Preview</div>
                    </div>
                  </div>
                </div>
                
                {/* Wallpaper info */}
                <div className="p-2 sm:p-3">
                  <div className="flex justify-between items-center text-xs text-purple-200">
                    <span>💾 {wallpaper.downloads > 1000 ? `${(wallpaper.downloads/1000).toFixed(1)}k` : wallpaper.downloads}</span>
                    <span>❤️ {wallpaper.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Wallpaper Viewer Modal */}
      {selectedWallpaper && (
        <div className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 ${isFullscreen ? 'bg-black' : ''}`}>
          <div className={`relative w-full max-w-sm mx-auto ${isFullscreen ? 'max-w-full h-full' : ''}`}>
            <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden ${isFullscreen ? 'h-full rounded-none border-none bg-black' : ''}`}>
              <div className={`w-full aspect-[9/16] bg-gradient-to-br ${wallpapers[selectedWallpaper - 1]?.gradient} flex items-center justify-center relative ${isFullscreen ? 'h-full aspect-auto' : ''}`}>
                <span className={`text-white font-bold text-lg sm:text-xl ${isFullscreen ? 'text-4xl' : ''}`}>{wallpapers[selectedWallpaper - 1]?.title}</span>
                
                {/* Fullscreen toggle button */}
                {!isFullscreen && (
                  <button
                    onClick={enterFullscreen}
                    className="absolute top-4 right-4 backdrop-blur-lg bg-black/30 border border-white/20 text-white p-2 rounded-lg hover:bg-black/50 transition-all duration-200"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                )}

                {/* Exit fullscreen button */}
                {isFullscreen && (
                  <button
                    onClick={exitFullscreen}
                    className="absolute top-4 right-4 backdrop-blur-lg bg-black/50 border border-white/20 text-white p-3 rounded-xl hover:bg-black/70 transition-all duration-200 z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>
              
              {/* Action buttons - hidden in fullscreen */}
              {!isFullscreen && (
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button className="backdrop-blur-lg bg-purple-500/20 border border-purple-500/30 text-purple-200 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-sm sm:text-base hover:bg-purple-500/30 transition-all duration-200">
                      📱 Set as Wallpaper
                    </button>
                    <button className="backdrop-blur-lg bg-blue-500/20 border border-blue-500/30 text-blue-200 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-sm sm:text-base hover:bg-blue-500/30 transition-all duration-200">
                      💾 Download
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setSelectedWallpaper(null)}
                    className="w-full backdrop-blur-lg bg-white/10 border border-white/20 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-sm sm:text-base hover:bg-white/20 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
