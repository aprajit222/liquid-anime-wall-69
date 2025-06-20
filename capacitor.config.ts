
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.cbc6809a1dd94cc9b49acefd213a3fcc',
  appName: 'liquid-anime-wall',
  webDir: 'dist',
  server: {
    url: 'https://cbc6809a-1dd9-4cc9-b49a-cefd213a3fcc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#1a1a2e',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;
