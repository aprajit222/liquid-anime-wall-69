
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
            <div className="flex items-center justify-between p-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                HQ Anime Wall
              </h1>
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
            <div className="flex items-center justify-between p-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                HQ Anime Wall
              </h1>
            </div>
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 pb-32">
        {renderScreen()}
      </div>
      
      {currentScreen !== 'admin' && (
        <>
          <div className="fixed bottom-20 left-0 right-0 z-20">
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
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl">
            <div className="mb-6">
              <h3 className="text-white text-xl font-semibold mb-4">Advertisement</h3>
              <div className="w-full h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center border border-white/10">
                <p className="text-white/60 text-sm">320x180 Interstitial Ad</p>
              </div>
            </div>
            <button
              onClick={() => setShowInterstitial(false)}
              className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-xl text-white px-8 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-300 border border-white/10"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
