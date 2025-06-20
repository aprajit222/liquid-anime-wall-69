
import React, { useState, useRef, useEffect } from 'react';
import { Heart, Download, Share, Chrome as Home, MoveHorizontal as MoreHorizontal } from 'lucide-react';

// Mock data for reels
const reelsData = [
  { 
    id: '1', 
    image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
    title: 'Sunset Mountain Vista',
    creator: 'ArtistName',
    likes: 1234,
    downloads: 567,
    isLiked: false
  },
  { 
    id: '2', 
    image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    title: 'Ocean Wave Serenity',
    creator: 'WaveArtist',
    likes: 2341,
    downloads: 892,
    isLiked: true
  },
  { 
    id: '3', 
    image: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg',
    title: 'Forest Moonlight',
    creator: 'NaturePro',
    likes: 987,
    downloads: 456,
    isLiked: false
  },
  { 
    id: '4', 
    image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg',
    title: 'City Neon Dreams',
    creator: 'UrbanArt',
    likes: 3456,
    downloads: 1234,
    isLiked: false
  },
];

export const ReelsViewer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reels, setReels] = useState(reelsData);
  const [showUI, setShowUI] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLike = (index: number) => {
    const newReels = [...reels];
    newReels[index].isLiked = !newReels[index].isLiked;
    if (newReels[index].isLiked) {
      newReels[index].likes += 1;
    } else {
      newReels[index].likes -= 1;
    }
    setReels(newReels);
  };

  const toggleUI = () => {
    setShowUI(!showUI);
  };

  const nextReel = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  };

  const prevReel = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevReel();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleUI();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const currentReel = reels[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      onClick={toggleUI}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentReel.image})` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />

      {/* UI Container */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          showUI ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top UI */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="backdrop-blur-md bg-black/30 border border-white/20 rounded-full px-6 py-3">
            <h1 className="text-white text-lg font-semibold">Reels</h1>
          </div>
        </div>

        {/* Side Actions */}
        <div className="absolute right-5 top-1/3 flex flex-col gap-5 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(currentIndex);
            }}
            className="flex flex-col items-center"
          >
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full w-14 h-14 flex items-center justify-center hover:bg-white/30 transition-all duration-200">
              <Heart
                size={28}
                color={currentReel.isLiked ? '#ff6b6b' : '#ffffff'}
                fill={currentReel.isLiked ? '#ff6b6b' : 'transparent'}
              />
            </div>
            <span className="text-white text-xs mt-2 font-medium">
              {currentReel.likes > 1000 ? `${(currentReel.likes/1000).toFixed(1)}k` : currentReel.likes}
            </span>
          </button>

          <button className="flex flex-col items-center">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full w-14 h-14 flex items-center justify-center hover:bg-white/30 transition-all duration-200">
              <Download size={28} color="#ffffff" />
            </div>
            <span className="text-white text-xs mt-2 font-medium">
              {currentReel.downloads > 1000 ? `${(currentReel.downloads/1000).toFixed(1)}k` : currentReel.downloads}
            </span>
          </button>

          <button className="flex flex-col items-center">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full w-14 h-14 flex items-center justify-center hover:bg-white/30 transition-all duration-200">
              <Share size={28} color="#ffffff" />
            </div>
          </button>

          <button className="flex flex-col items-center">
            <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full w-14 h-14 flex items-center justify-center hover:bg-white/30 transition-all duration-200">
              <MoreHorizontal size={28} color="#ffffff" />
            </div>
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-24 left-5 right-24">
          <div className="backdrop-blur-lg bg-black/40 border border-white/20 rounded-2xl p-5">
            <h2 className="text-white text-xl font-bold mb-1">{currentReel.title}</h2>
            <p className="text-white/70 text-sm mb-5">by {currentReel.creator}</p>
            
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-red-500 to-red-400 text-white py-3 px-6 rounded-full font-semibold hover:scale-105 transition-transform duration-200">
                Set Wallpaper
              </button>
              
              <button className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full w-12 h-12 flex items-center justify-center hover:bg-white/30 transition-all duration-200">
                <Home size={20} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-40 flex gap-4 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevReel();
            }}
            className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full px-6 py-2 text-white text-sm hover:bg-white/30 transition-all duration-200"
          >
            ↑ Previous
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextReel();
            }}
            className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full px-6 py-2 text-white text-sm hover:bg-white/30 transition-all duration-200"
          >
            ↓ Next
          </button>
        </div>

        {/* Swipe Indicator - only show on first reel */}
        {currentIndex === 0 && (
          <div className="absolute bottom-52 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white/80 text-sm font-medium mb-1">Swipe up for more</p>
            <p className="text-white/80 text-2xl">↑</p>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex gap-1">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full flex-1 ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
