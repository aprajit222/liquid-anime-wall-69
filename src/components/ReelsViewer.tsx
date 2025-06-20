
import React, { useState } from 'react';

export const ReelsViewer: React.FC = () => {
  const [currentReel, setCurrentReel] = useState(0);

  const reels = [
    { 
      id: 1, 
      title: 'Sunset Anime Girl', 
      creator: 'ArtistName1',
      likes: 1234,
      gradient: 'from-orange-400 via-red-400 to-pink-500'
    },
    { 
      id: 2, 
      title: 'Moonlight Warrior', 
      creator: 'ArtistName2',
      likes: 987,
      gradient: 'from-blue-400 via-purple-400 to-indigo-500'
    },
    { 
      id: 3, 
      title: 'Cherry Blossom Dream', 
      creator: 'ArtistName3',
      likes: 2345,
      gradient: 'from-pink-400 via-rose-400 to-red-400'
    },
  ];

  const nextReel = () => {
    setCurrentReel((prev) => (prev + 1) % reels.length);
  };

  const prevReel = () => {
    setCurrentReel((prev) => (prev - 1 + reels.length) % reels.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Current Reel */}
      <div className={`absolute inset-0 bg-gradient-to-br ${reels[currentReel].gradient} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Reel Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">{reels[currentReel].title}</h2>
          <p className="text-lg sm:text-xl opacity-80">by {reels[currentReel].creator}</p>
        </div>

        {/* Responsive Side Actions */}
        <div className="absolute right-2 sm:right-4 bottom-24 sm:bottom-32 flex flex-col gap-3 sm:gap-6 z-20">
          <button className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-3 sm:p-4 hover:bg-white/30 transition-all duration-200">
            <span className="text-xl sm:text-2xl">❤️</span>
            <div className="text-white text-xs mt-1">{reels[currentReel].likes > 1000 ? `${(reels[currentReel].likes/1000).toFixed(1)}k` : reels[currentReel].likes}</div>
          </button>
          
          <button className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-3 sm:p-4 hover:bg-white/30 transition-all duration-200">
            <span className="text-xl sm:text-2xl">💾</span>
          </button>
          
          <button className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-3 sm:p-4 hover:bg-white/30 transition-all duration-200">
            <span className="text-xl sm:text-2xl">📤</span>
          </button>
          
          <button className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-3 sm:p-4 hover:bg-white/30 transition-all duration-200">
            <span className="text-xl sm:text-2xl">📱</span>
          </button>
        </div>

        {/* Responsive Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-32 sm:bottom-40 flex gap-2 sm:gap-4 z-20">
          <button
            onClick={prevReel}
            className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full px-4 sm:px-6 py-2 text-white text-sm sm:text-base hover:bg-white/30 transition-all duration-200"
          >
            ↑ Previous
          </button>
          <button
            onClick={nextReel}
            className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full px-4 sm:px-6 py-2 text-white text-sm sm:text-base hover:bg-white/30 transition-all duration-200"
          >
            ↓ Next
          </button>
        </div>

        {/* Responsive Creator Info */}
        <div className="absolute bottom-16 sm:bottom-20 left-2 sm:left-4 z-20">
          <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">A</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm sm:text-base">{reels[currentReel].creator}</div>
                <div className="text-purple-200 text-xs sm:text-sm opacity-80">Artist</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-3 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-20">
          <div className="flex gap-1">
            {reels.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 sm:h-1 rounded-full flex-1 ${
                  index === currentReel ? 'bg-white' : 'bg-white/30'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
