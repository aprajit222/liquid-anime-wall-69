import React, { useState } from 'react';
import { CategoryGrid } from './CategoryGrid';
import { WallpaperGallery } from './WallpaperGallery';
import { ReelsViewer } from './ReelsViewer';
import { SearchScreen } from './SearchScreen';
import { SettingsScreen } from './SettingsScreen';
import { BottomNavigation } from './BottomNavigation';
import { AdminPanel } from './AdminPanel';

export type Screen = 'home' | 'gallery' | 'reels' | 'search' | 'settings';

export const MainApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('gallery');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCategory(null);
  };

  // Admin access (in real app, this would check authentication)
  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  const renderScreen = () => {
    if (isAdminMode) {
      return <AdminPanel />;
    }

    switch (currentScreen) {
      case 'home':
        return <CategoryGrid onCategorySelect={handleCategorySelect} />;
      case 'gallery':
        return <WallpaperGallery categoryId={selectedCategory} onBack={handleBackToHome} />;
      case 'reels':
        return <ReelsViewer />;
      case 'search':
        return <SearchScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <CategoryGrid onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Admin Toggle (hidden in production) */}
      <button
        onClick={toggleAdminMode}
        className="fixed top-4 right-4 z-50 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold opacity-50 hover:opacity-100 transition-opacity"
      >
        A
      </button>

      <div className="pb-20">
        {renderScreen()}
      </div>
      
      {!isAdminMode && (
        <BottomNavigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
      )}
    </div>
  );
};
