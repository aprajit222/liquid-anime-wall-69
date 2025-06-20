
import React, { useState } from 'react';
import { CategoryGrid } from './CategoryGrid';
import { WallpaperGallery } from './WallpaperGallery';
import { ReelsViewer } from './ReelsViewer';
import { SearchScreen } from './SearchScreen';
import { SettingsScreen } from './SettingsScreen';
import { BottomNavigation } from './BottomNavigation';

export type Screen = 'home' | 'gallery' | 'reels' | 'search' | 'settings';

export const MainApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('gallery');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCategory(null);
  };

  const renderScreen = () => {
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
      <div className="pb-20">
        {renderScreen()}
      </div>
      <BottomNavigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
    </div>
  );
};
