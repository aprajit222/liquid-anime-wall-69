import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Image, 
  Settings, 
  Upload, 
  Eye,
  Heart,
  Download,
  Plus,
  Edit,
  Trash2,
  Shield,
  Save,
  X,
  Ban,
  Monitor,
  Smartphone,
  MapPin,
  Calendar,
  Gift,
  PlayCircle,
  Star,
  ArrowLeft
} from 'lucide-react';

interface AdminPanelProps {
  onBack?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ name: '', image: '', description: '' });
  const [adSettings, setAdSettings] = useState({
    bannerEnabled: true,
    interstitialEnabled: true,
    rewardedEnabled: true,
    nativeEnabled: true,
    openAppEnabled: true,
    interstitialInterval: 6,
    bannerPages: ['home', 'gallery', 'reels', 'search'],
    interstitialPages: ['gallery'],
    rewardedTrigger: 'download',
    nativeFrequency: 5
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'wallpapers', label: 'Wallpapers', icon: Image },
    { id: 'categories', label: 'Categories', icon: Settings },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'ads', label: 'Ad Settings', icon: Monitor },
    { id: 'settings', label: 'App Settings', icon: Shield },
  ];

  const stats = [
    { label: 'Total Wallpapers', value: '1,247', icon: Image, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Users', value: '8,923', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'Total Downloads', value: '156K', icon: Download, color: 'from-purple-500 to-purple-600' },
    { label: 'Total Views', value: '892K', icon: Eye, color: 'from-pink-500 to-pink-600' },
  ];

  const [categories, setCategories] = useState([
    { id: 1, name: 'Action', image: '/lovable-uploads/02d15504-154a-4bad-a42e-f086c4244a0f.png', description: 'High-energy anime wallpapers', wallpaperCount: 156 },
    { id: 2, name: 'Romance', image: null, description: 'Romantic anime scenes', wallpaperCount: 89 },
    { id: 3, name: 'Fantasy', image: null, description: 'Magical and mystical anime', wallpaperCount: 234 },
    { id: 4, name: 'Mecha', image: null, description: 'Giant robots and mechs', wallpaperCount: 78 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', deviceId: 'DEV123456789', ipAddress: '192.168.1.100', joinDate: '2024-01-15', status: 'active', downloads: 245 },
    { id: 2, name: 'Jane Smith', deviceId: 'DEV987654321', ipAddress: '192.168.1.101', joinDate: '2024-02-20', status: 'active', downloads: 189 },
    { id: 3, name: 'Mike Johnson', deviceId: 'DEV456789123', ipAddress: '192.168.1.102', joinDate: '2024-03-10', status: 'banned', downloads: 67 },
  ]);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.image) {
      setCategories([...categories, {
        id: Date.now(),
        ...newCategory,
        wallpaperCount: 0
      }]);
      setNewCategory({ name: '', image: '', description: '' });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isNew = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (isNew) {
          setNewCategory({ ...newCategory, image: imageUrl });
        } else if (editingCategory) {
          setEditingCategory({ ...editingCategory, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory({ ...category });
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      ));
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleBanUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
        : user
    ));
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200/70 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4 p-3 backdrop-blur-lg bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">New wallpaper uploaded</p>
                  <p className="text-purple-200/60 text-sm">Fantasy category • 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Upload Wallpaper', icon: Upload, color: 'from-blue-500 to-blue-600' },
              { label: 'Add Category', icon: Plus, color: 'from-green-500 to-green-600' },
              { label: 'Manage Users', icon: Users, color: 'from-purple-500 to-purple-600' },
              { label: 'App Settings', icon: Settings, color: 'from-pink-500 to-pink-600' },
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 bg-gradient-to-br ${action.color} rounded-xl text-white font-medium hover:scale-105 transition-transform duration-200 shadow-lg`}
              >
                <action.icon className="w-6 h-6 mx-auto mb-2" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-purple-200 font-medium">User</th>
                <th className="text-left p-4 text-purple-200 font-medium">Device ID</th>
                <th className="text-left p-4 text-purple-200 font-medium">IP Address</th>
                <th className="text-left p-4 text-purple-200 font-medium">Join Date</th>
                <th className="text-left p-4 text-purple-200 font-medium">Downloads</th>
                <th className="text-left p-4 text-purple-200 font-medium">Status</th>
                <th className="text-left p-4 text-purple-200 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-purple-200 font-mono text-sm">{user.deviceId}</td>
                  <td className="p-4 text-purple-200">{user.ipAddress}</td>
                  <td className="p-4 text-purple-200">{user.joinDate}</td>
                  <td className="p-4 text-purple-200">{user.downloads}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        user.status === 'banned'
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      }`}
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Upload Wallpapers</h2>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Upload Wallpapers</h3>
            <p className="text-purple-200/70 mb-4">Drag and drop your images here or click to browse</p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="wallpaper-upload"
            />
            <label
              htmlFor="wallpaper-upload"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform duration-200 cursor-pointer inline-block"
            >
              Choose Files
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-200 font-medium mb-2">Category</label>
              <select className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white">
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2">Tags</label>
              <input
                type="text"
                placeholder="anime, action, fantasy"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-200/60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-2xl font-bold text-white">Ad Configuration</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-white mb-4">AdMob Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">App ID</label>
              <input
                type="text"
                placeholder="ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
              />
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">Banner Ad Unit ID</label>
              <input
                type="text"
                placeholder="ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
              />
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">Interstitial Ad Unit ID</label>
              <input
                type="text"
                placeholder="ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
              />
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">Rewarded Ad Unit ID</label>
              <input
                type="text"
                placeholder="ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
              />
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">Native Ad Unit ID</label>
              <input
                type="text"
                placeholder="ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
              />
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">Open App Ad Unit ID</label>
              <input
                type="text"
                placeholder="ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ad Controls</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 text-sm">Banner Ads</span>
              </div>
              <input
                type="checkbox"
                checked={adSettings.bannerEnabled}
                onChange={(e) => setAdSettings({...adSettings, bannerEnabled: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 text-sm">Interstitial Ads</span>
              </div>
              <input
                type="checkbox"
                checked={adSettings.interstitialEnabled}
                onChange={(e) => setAdSettings({...adSettings, interstitialEnabled: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 text-sm">Rewarded Ads</span>
              </div>
              <input
                type="checkbox"
                checked={adSettings.rewardedEnabled}
                onChange={(e) => setAdSettings({...adSettings, rewardedEnabled: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 text-sm">Native Ads</span>
              </div>
              <input
                type="checkbox"
                checked={adSettings.nativeEnabled}
                onChange={(e) => setAdSettings({...adSettings, nativeEnabled: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 text-sm">Open App Ads</span>
              </div>
              <input
                type="checkbox"
                checked={adSettings.openAppEnabled}
                onChange={(e) => setAdSettings({...adSettings, openAppEnabled: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">
                Interstitial Interval (wallpapers)
              </label>
              <input
                type="number"
                value={adSettings.interstitialInterval}
                onChange={(e) => setAdSettings({...adSettings, interstitialInterval: parseInt(e.target.value)})}
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>
            
            <div>
              <label className="block text-purple-200 font-medium mb-2 text-sm">Native Ad Frequency</label>
              <input
                type="number"
                value={adSettings.nativeFrequency}
                onChange={(e) => setAdSettings({...adSettings, nativeFrequency: parseInt(e.target.value)})}
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 lg:p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Firebase Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-200 font-medium mb-2 text-sm">API Key</label>
            <input
              type="text"
              placeholder="AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
            />
          </div>
          <div>
            <label className="block text-purple-200 font-medium mb-2 text-sm">Project ID</label>
            <input
              type="text"
              placeholder="your-project-id"
              className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3 text-white placeholder-purple-200/60 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-xl font-medium hover:scale-105 transition-transform duration-200 text-sm">
          Save Ad Settings
        </button>
      </div>
    </div>
  );

  const renderAppSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">App Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-purple-200 font-medium mb-2">App Name</label>
              <input
                type="text"
                defaultValue="Anime Wallpapers"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2">App Version</label>
              <input
                type="text"
                defaultValue="1.0.0"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-purple-200 font-medium mb-2">Max Downloads Per Day</label>
              <input
                type="number"
                defaultValue="50"
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Collect User Analytics</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Allow Anonymous Usage</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-200">Require User Registration</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Category Management</h2>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-200/60"
          />
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, true)}
              className="hidden"
              id="new-category-image"
            />
            <label
              htmlFor="new-category-image"
              className="block w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-purple-200/60 cursor-pointer hover:bg-white/15 transition-colors"
            >
              {newCategory.image ? 'Image Selected' : 'Choose Image'}
            </label>
          </div>
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-200/60"
          />
          <button
            onClick={handleAddCategory}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
        <div className="grid gap-4 p-6">
          {categories.map((category) => (
            <div key={category.id} className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4">
              {editingCategory?.id === category.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="hidden"
                        id={`edit-image-${category.id}`}
                      />
                      <label
                        htmlFor={`edit-image-${category.id}`}
                        className="block w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-purple-200/60 cursor-pointer hover:bg-white/15 transition-colors"
                      >
                        Change Image
                      </label>
                    </div>
                    <input
                      type="text"
                      value={editingCategory.description}
                      onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveCategory}
                      className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="bg-gray-500/20 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded-lg" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-sm">
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                      <p className="text-purple-200/70 text-sm">{category.description}</p>
                      <p className="text-purple-200/50 text-xs">{category.wallpaperCount} wallpapers</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWallpapers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Wallpaper Management</h2>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform duration-200 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Wallpaper
        </button>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-purple-200 font-medium">Wallpaper</th>
                <th className="text-left p-4 text-purple-200 font-medium">Category</th>
                <th className="text-left p-4 text-purple-200 font-medium">Downloads</th>
                <th className="text-left p-4 text-purple-200 font-medium">Likes</th>
                <th className="text-left p-4 text-purple-200 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg"></div>
                      <div>
                        <p className="text-white font-medium">Anime Wallpaper {item}</p>
                        <p className="text-purple-200/60 text-sm">1920x1080</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-purple-200">Action</td>
                  <td className="p-4 text-purple-200">1,234</td>
                  <td className="p-4 text-purple-200">89</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMobileMenu = () => (
    <div className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
      <div className="fixed left-0 top-0 bottom-0 w-64 backdrop-blur-xl bg-black/80 border-r border-white/10 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Admin</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                  : 'text-purple-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'wallpapers':
        return renderWallpapers();
      case 'categories':
        return renderCategories();
      case 'users':
        return renderUsers();
      case 'upload':
        return renderUpload();
      case 'ads':
        return renderAdSettings();
      case 'settings':
        return renderAppSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen backdrop-blur-xl bg-black/50 border-r border-white/10">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                      : 'text-purple-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {renderMobileMenu()}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white p-2 backdrop-blur-lg bg-white/10 rounded-xl"
            >
              <Settings className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
            <button
              onClick={onBack}
              className="text-white p-2 backdrop-blur-lg bg-white/10 rounded-xl"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};
