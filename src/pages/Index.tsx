
import { useState } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { MainApp } from '@/components/MainApp';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <MainApp />
      )}
    </div>
  );
};

export default Index;
