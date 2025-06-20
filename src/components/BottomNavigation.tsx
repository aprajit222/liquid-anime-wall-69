
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30">
      <div className="backdrop-blur-xl bg-black/50 border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                currentScreen === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-purple-200 opacity-60 hover:text-white hover:opacity-100'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              
              {/* Active indicator */}
              {currentScreen === item.id && (
                <div className="absolute -bottom-1 w-1 h-1 bg-purple-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
