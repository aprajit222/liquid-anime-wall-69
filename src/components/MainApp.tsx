
import React, { useState, useEffect } from 'react';
import { CategoryGrid } from './CategoryGrid';
import { WallpaperGallery } from './WallpaperGallery';
import { ReelsViewer } from './ReelsViewer';
import { SearchScreen } from './SearchScreen';
import { SettingsScreen } from './SettingsScreen';
import { BottomNavigation } from './BottomNavigation';
import { AdminPanel } from './AdminPanel';
import { UserNameModal } from './UserNameModal';
import { AdBanner } from './AdBanner';
import { UserManager } from '../utils/userManager';

export type Screen = 'home' | 'gallery' | 'reels' | 'search' | 'settings' | 'admin';

export const MainApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [wallpaperViewCount, setWallpaperViewCount] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState(false);

  useEffect(() => {
    // Check if it's a first-time user
    if (UserManager.isFirstTimeUser()) {
      setShowUserModal(true);
    }

    // Check if user is banned
    if (UserManager.isUserBanned()) {
      alert('Your account has been suspended. Please contact support.');
    }
  }, []);

  const handleUserNameSave = async (name: string) => {
    await UserManager.saveUser(name);
    setShowUserModal(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('gallery');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCategory(null);
  };

  const handleWallpaperView = () => {
    const newCount = wallpaperViewCount + 1;
    setWallpaperViewCount(newCount);
    
    // Show interstitial ad every 6 wallpaper views
    if (newCount % 6 === 0) {
      setShowInterstitial(true);
      setTimeout(() => setShowInterstitial(false), 3000);
    }
  };

  const renderScreen = () => {
    if (currentScreen === 'admin') {
      return <AdminPanel />;
    }

    switch (currentScreen) {
      case 'home':
        return (
          <>
            <div className="flex items-center justify-between p-4 pb-0">
              <h1 className="text-2xl font-bold text-white">HQ Anime Wall</h1>
            </div>
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </>
        );
      case 'gallery':
        return (
          <WallpaperGallery 
            categoryId={selectedCategory} 
            onBack={handleBackToHome}
            onWallpaperView={handleWallpaperView}
          />
        );
      case 'reels':
        return <ReelsViewer />;
      case 'search':
        return <SearchScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return (
          <>
            <div className="flex items-center justify-between p-4 pb-0">
              <h1 className="text-2xl font-bold text-white">HQ Anime Wall</h1>
            </div>
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="pb-32">
        {renderScreen()}
      </div>
      
      {currentScreen !== 'admin' && (
        <>
          <div className="fixed bottom-16 left-0 right-0 z-20">
            <AdBanner page={currentScreen} className="mx-4 mb-2" />
          </div>
          <BottomNavigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
        </>
      )}

      {/* User Name Modal */}
      <UserNameModal 
        isOpen={showUserModal} 
        onSave={handleUserNameSave} 
      />

      {/* Interstitial Ad Modal */}
      {showInterstitial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 mx-4 max-w-sm w-full text-center">
            <div className="mb-4">
              <h3 className="text-white text-lg font-semibold mb-2">Advertisement</h3>
              <div className="w-full h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                <p className="text-white/60">320x180 Interstitial Ad</p>
              </div>
            </div>
            <button
              onClick={() => setShowInterstitial(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-medium hover:scale-105 transition-transform duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
