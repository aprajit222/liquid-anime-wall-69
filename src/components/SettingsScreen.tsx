
import React from 'react';

export const SettingsScreen: React.FC = () => {
  const settingsGroups = [
    {
      title: 'Display',
      items: [
        { label: 'Dark Mode', value: 'Enabled', action: '🌙' },
        { label: 'Grid Columns', value: '3', action: '📱' },
        { label: 'Image Quality', value: 'High', action: '🖼️' },
      ]
    },
    {
      title: 'Downloads',
      items: [
        { label: 'Download Location', value: 'Gallery/HQAniWall', action: '📁' },
        { label: 'Auto-Resize', value: 'On', action: '📏' },
        { label: 'Compression', value: 'None', action: '🗜️' },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { label: 'New Wallpapers', value: 'On', action: '🔔' },
        { label: 'Featured Collections', value: 'On', action: '⭐' },
        { label: 'App Updates', value: 'On', action: '🔄' },
      ]
    },
    {
      title: 'About',
      items: [
        { label: 'Version', value: '2.1.0', action: 'ℹ️' },
        { label: 'Privacy Policy', value: '', action: '📋' },
        { label: 'Terms of Service', value: '', action: '📜' },
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-purple-200 opacity-80">Customize your experience</p>
      </div>

      {/* Settings Groups */}
      <div className="max-w-2xl mx-auto space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">{group.title}</h2>
            </div>
            
            <div className="divide-y divide-white/10">
              {group.items.map((item, item_index) => (
                <div key={item_index} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.action}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                  
                  {item.value && (
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 text-purple-200 text-sm px-3 py-1 rounded-lg">
                      {item.value}
                    </div>
                  )}
                  
                  {!item.value && (
                    <div className="text-purple-200 opacity-60">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* App Stats */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 text-center">Your Statistics</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-400">47</div>
              <div className="text-purple-200 text-sm opacity-70">Downloaded</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-400">23</div>
              <div className="text-purple-200 text-sm opacity-70">Favorites</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-purple-200 text-sm opacity-70">Set as Wallpaper</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
