
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.32c1705828674255a55670866e7828d7',
  appName: 'liquid-anime-wall-69',
  webDir: 'dist',
  server: {
    url: 'https://32c17058-2867-4255-a556-70866e7828d7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: true,
      spinnerColor: '#3b82f6'
    }
  }
};

export default config;
