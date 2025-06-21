
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
    <div className={`w-full h-16 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg ${className}`}>
      <div className="text-center">
        <p className="text-white/60 text-sm">Advertisement</p>
        <p className="text-white/40 text-xs">320x50 Banner Ad Placeholder</p>
      </div>
    </div>
  );
};
