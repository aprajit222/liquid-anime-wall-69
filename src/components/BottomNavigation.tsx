
import React from 'react';
import type { Screen } from './MainApp';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: '🏠' },
    { id: 'gallery' as Screen, label: 'Gallery', icon: '🖼️' },
    { id: 'reels' as Screen, label: 'Reels', icon: '📱' },
    { id: 'search' as Screen, label: 'Search', icon: '🔍' },
    { id: 'settings' as Screen, label: 'Settings', icon: '⚙️' },
  ];

  // Add admin option with long press detection
  const handleLongPress = (screenId: Screen) => {
    if (screenId === 'settings') {
      // Long press on settings to access admin
      onScreenChange('admin');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 safe-area-bottom">
      <div className="backdrop-blur-2xl bg-black/20 border-t border-white/10">
        <div className="flex items-center justify-around py-3 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleLongPress(item.id);
              }}
              onTouchStart={(e) => {
                const timer = setTimeout(() => handleLongPress(item.id), 800);
                const handleTouchEnd = () => {
                  clearTimeout(timer);
                  document.removeEventListener('touchend', handleTouchEnd);
                };
                document.addEventListener('touchend', handleTouchEnd);
              }}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1 relative group ${
                currentScreen === item.id
                  ? 'bg-white/10 text-white border border-white/20 shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {/* Glassmorphism background for active state */}
              {currentScreen === item.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl"></div>
              )}
              
              <span className="text-xl mb-1 relative z-10 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
              <span className="text-xs font-medium truncate relative z-10">{item.label}</span>
              
              {/* Active indicator */}
              {currentScreen === item.id && (
                <div className="absolute -bottom-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
