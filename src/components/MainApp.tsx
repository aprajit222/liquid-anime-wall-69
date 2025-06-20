
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

export type Screen = 'home' | 'gallery' | 'reels' | 'search' | 'settings';

export const MainApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
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
      setTimeout(() => setShowInterstitial(false), 3000); // Auto-close after 3 seconds
    }
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  const renderScreen = () => {
    if (isAdminMode) {
      return <AdminPanel />;
    }

    switch (currentScreen) {
      case 'home':
        return (
          <>
            <AdBanner page="home" className="mx-4 mb-4" />
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </>
        );
      case 'gallery':
        return (
          <>
            <AdBanner page="gallery" className="mx-4 mb-4" />
            <WallpaperGallery 
              categoryId={selectedCategory} 
              onBack={handleBackToHome}
              onWallpaperView={handleWallpaperView}
            />
          </>
        );
      case 'reels':
        return (
          <>
            <AdBanner page="reels" className="mx-4 mb-4" />
            <ReelsViewer />
          </>
        );
      case 'search':
        return (
          <>
            <AdBanner page="search" className="mx-4 mb-4" />
            <SearchScreen />
          </>
        );
      case 'settings':
        return <SettingsScreen />;
      default:
        return (
          <>
            <AdBanner page="home" className="mx-4 mb-4" />
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Admin Toggle */}
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
