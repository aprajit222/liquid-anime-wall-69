
import React, { useState } from 'react';

export const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    gridColumns: '3',
    imageQuality: 'High',
    downloadLocation: 'Gallery/HQAniWall',
    autoResize: true,
    compression: 'None',
    newWallpapers: true,
    featuredCollections: true,
    appUpdates: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingsGroups = [
    {
      title: 'Display',
      items: [
        { 
          key: 'darkMode',
          label: 'Dark Mode', 
          type: 'toggle',
          action: '🌙' 
        },
        { 
          key: 'gridColumns',
          label: 'Grid Columns', 
          type: 'select',
          options: ['2', '3', '4', '5'],
          action: '📱' 
        },
        { 
          key: 'imageQuality',
          label: 'Image Quality', 
          type: 'select',
          options: ['Low', 'Medium', 'High', 'Ultra'],
          action: '🖼️' 
        },
      ]
    },
    {
      title: 'Downloads',
      items: [
        { 
          key: 'downloadLocation',
          label: 'Download Location', 
          type: 'text',
          action: '📁' 
        },
        { 
          key: 'autoResize',
          label: 'Auto-Resize', 
          type: 'toggle',
          action: '📏' 
        },
        { 
          key: 'compression',
          label: 'Compression', 
          type: 'select',
          options: ['None', 'Low', 'Medium', 'High'],
          action: '🗜️' 
        },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { 
          key: 'newWallpapers',
          label: 'New Wallpapers', 
          type: 'toggle',
          action: '🔔' 
        },
        { 
          key: 'featuredCollections',
          label: 'Featured Collections', 
          type: 'toggle',
          action: '⭐' 
        },
        { 
          key: 'appUpdates',
          label: 'App Updates', 
          type: 'toggle',
          action: '🔄' 
        },
      ]
    },
    {
      title: 'About',
      items: [
        { 
          key: 'version',
          label: 'Version', 
          type: 'display',
          value: '2.1.0',
          action: 'ℹ️' 
        },
        { 
          key: 'privacy',
          label: 'Privacy Policy', 
          type: 'link',
          action: '📋' 
        },
        { 
          key: 'terms',
          label: 'Terms of Service', 
          type: 'link',
          action: '📜' 
        },
      ]
    }
  ];

  const renderSettingControl = (item: any) => {
    switch (item.type) {
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings[item.key as keyof typeof settings] as boolean}
              onChange={(e) => updateSetting(item.key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
          </label>
        );

      case 'select':
        return (
          <select
            value={settings[item.key as keyof typeof settings] as string}
            onChange={(e) => updateSetting(item.key, e.target.value)}
            className="backdrop-blur-lg bg-white/10 border border-white/20 text-purple-200 text-sm px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {item.options?.map((option: string) => (
              <option key={option} value={option} className="bg-gray-800">
                {option}
              </option>
            ))}
          </select>
        );

      case 'text':
        return (
          <input
            type="text"
            value={settings[item.key as keyof typeof settings] as string}
            onChange={(e) => updateSetting(item.key, e.target.value)}
            className="backdrop-blur-lg bg-white/10 border border-white/20 text-purple-200 text-sm px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 max-w-48"
          />
        );

      case 'display':
        return (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 text-purple-200 text-sm px-3 py-1 rounded-lg">
            {item.value}
          </div>
        );

      case 'link':
        return (
          <button
            onClick={() => {
              if (item.key === 'privacy') {
                window.open('/privacy-policy', '_blank');
              } else if (item.key === 'terms') {
                window.open('/terms-of-service', '_blank');
              }
            }}
            className="text-purple-200 opacity-60 hover:opacity-100 transition-opacity"
          >
            →
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-purple-200 opacity-80 text-sm sm:text-base">Customize your experience</p>
      </div>

      {/* Settings Groups */}
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
              <h2 className="text-base sm:text-lg font-semibold text-white">{group.title}</h2>
            </div>
            
            <div className="divide-y divide-white/10">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-lg sm:text-xl">{item.action}</span>
                    <span className="text-white font-medium text-sm sm:text-base">{item.label}</span>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {renderSettingControl(item)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* App Stats */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-4 text-center">Your Statistics</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">47</div>
              <div className="text-purple-200 text-xs sm:text-sm opacity-70">Downloaded</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-pink-400">23</div>
              <div className="text-purple-200 text-xs sm:text-sm opacity-70">Favorites</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">12</div>
              <div className="text-purple-200 text-xs sm:text-sm opacity-70">Set as Wallpaper</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
