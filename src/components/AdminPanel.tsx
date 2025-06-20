import React, { useState } from 'react';
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
  X
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ name: '', emoji: '', description: '' });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'wallpapers', label: 'Wallpapers', icon: Image },
    { id: 'categories', label: 'Categories', icon: Settings },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'settings', label: 'App Settings', icon: Shield },
  ];

  const stats = [
    { label: 'Total Wallpapers', value: '1,247', icon: Image, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Users', value: '8,923', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'Total Downloads', value: '156K', icon: Download, color: 'from-purple-500 to-purple-600' },
    { label: 'Total Views', value: '892K', icon: Eye, color: 'from-pink-500 to-pink-600' },
  ];

  const [categories, setCategories] = useState([
    { id: 1, name: 'Action', emoji: '⚔️', description: 'High-energy anime wallpapers', wallpaperCount: 156, coverImage: null },
    { id: 2, name: 'Romance', emoji: '💖', description: 'Romantic anime scenes', wallpaperCount: 89, coverImage: null },
    { id: 3, name: 'Fantasy', emoji: '🔮', description: 'Magical and mystical anime', wallpaperCount: 234, coverImage: null },
    { id: 4, name: 'Mecha', emoji: '🤖', description: 'Giant robots and mechs', wallpaperCount: 78, coverImage: null },
  ]);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.emoji) {
      setCategories([...categories, {
        id: Date.now(),
        ...newCategory,
        wallpaperCount: 0,
        coverImage: null
      }]);
      setNewCategory({ name: '', emoji: '', description: '' });
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

  const handleCoverImageUpload = (categoryId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (editingCategory && editingCategory.id === categoryId) {
          setEditingCategory({ ...editingCategory, coverImage: imageUrl });
        } else {
          setCategories(categories.map(cat =>
            cat.id === categoryId ? { ...cat, coverImage: imageUrl } : cat
          ));
        }
      };
      reader.readAsDataURL(file);
    }
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

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Category Management</h2>
      </div>

      {/* Add New Category */}
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
          <input
            type="text"
            placeholder="Emoji"
            value={newCategory.emoji}
            onChange={(e) => setNewCategory({ ...newCategory, emoji: e.target.value })}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-200/60"
          />
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

      {/* Categories List */}
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
                    <input
                      type="text"
                      value={editingCategory.emoji}
                      onChange={(e) => setEditingCategory({ ...editingCategory, emoji: e.target.value })}
                      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
                    />
                    <input
                      type="text"
                      value={editingCategory.description}
                      onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCoverImageUpload(category.id, e)}
                      className="hidden"
                      id={`cover-${category.id}`}
                    />
                    <label
                      htmlFor={`cover-${category.id}`}
                      className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 cursor-pointer transition-colors"
                    >
                      Upload Cover
                    </label>
                    {editingCategory.coverImage && (
                      <img src={editingCategory.coverImage} alt="Cover" className="w-16 h-16 object-cover rounded-lg" />
                    )}
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
                    {category.coverImage ? (
                      <img src={category.coverImage} alt={category.name} className="w-16 h-16 object-cover rounded-lg" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl">
                        {category.emoji}
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'wallpapers':
        return renderWallpapers();
      case 'categories':
        return renderCategories();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen backdrop-blur-xl bg-black/50 border-r border-white/10">
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

function renderDashboard() {
  const stats = [
    { label: 'Total Wallpapers', value: '1,247', icon: Image, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Users', value: '8,923', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'Total Downloads', value: '156K', icon: Download, color: 'from-purple-500 to-purple-600' },
    { label: 'Total Views', value: '892K', icon: Eye, color: 'from-pink-500 to-pink-600' },
  ];

  return (
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
}

function renderWallpapers() {
  return (
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
}
