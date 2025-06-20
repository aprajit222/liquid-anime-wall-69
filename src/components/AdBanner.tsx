
import React, { useEffect, useState } from 'react';

interface AdBannerProps {
  page: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ page, className = '' }) => {
  const [adSettings, setAdSettings] = useState({
    bannerEnabled: true,
    bannerPages: ['home', 'gallery', 'reels', 'search']
  });

  // Check if ads should be shown on this page
  if (!adSettings.bannerEnabled || !adSettings.bannerPages.includes(page)) {
    return null;
  }

  return (
    <div className={`w-full h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/10 rounded-xl flex items-center justify-center ${className}`}>
      <div className="text-center">
        <p className="text-purple-200/60 text-sm">Advertisement</p>
        <p className="text-white/40 text-xs">320x50 Banner Ad Placeholder</p>
      </div>
    </div>
  );
};
