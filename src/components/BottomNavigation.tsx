
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
      <div className="backdrop-blur-xl bg-black/50 border-t border-white/10">
        <div className="flex items-center justify-around py-1.5 sm:py-2 px-2 sm:px-4">
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
              className={`flex flex-col items-center py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                currentScreen === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-purple-200 opacity-60 hover:text-white hover:opacity-100'
              }`}
            >
              <span className="text-lg sm:text-xl mb-0.5 sm:mb-1">{item.icon}</span>
              <span className="text-xs font-medium truncate">{item.label}</span>
              
              {/* Active indicator */}
              {currentScreen === item.id && (
                <div className="absolute -bottom-0.5 w-1 h-1 bg-purple-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
