
import React, { useState } from 'react';
import { ArrowLeft, Download, Heart, Share } from 'lucide-react';

interface WallpaperGalleryProps {
  categoryId: string | null;
  onBack: () => void;
  onWallpaperView: () => void;
}

const wallpapers = [
  { id: '1', category: 'abstract', url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg', title: 'Abstract Art', creator: 'AbstractArtist' },
  { id: '2', category: 'abstract', url: 'https://images.pexels.com/photos/2305147/pexels-photo-2305147.jpeg', title: 'Colorful Abstract', creator: 'ColorMaster' },
  { id: '3', category: 'nature', url: 'https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg', title: 'Mountain Range', creator: 'NaturePhotog' },
  { id: '4', category: 'nature', url: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg', title: 'Aurora Borealis', creator: 'AuroraHunter' },
  { id: '5', category: 'city', url: 'https://images.pexels.com/photos/1462124/pexels-photo-1462124.jpeg', title: 'City at Night', creator: 'UrbanSnapper' },
  { id: '6', category: 'city', url: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg', title: 'Skyscrapers', creator: 'SkylineLover' },
  { id: '7', category: 'animals', url: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpeg', title: 'Lion', creator: 'WildLifeFan' },
  { id: '8', category: 'animals', url: 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg', title: 'Elephant', creator: 'AnimalKingdom' },
  { id: '9', category: 'space', url: 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg', title: 'Milky Way', creator: 'CosmosExplorer' },
  { id: '10', category: 'space', url: 'https://images.pexels.com/photos/956981/pexels-photo-956981.jpeg', title: 'Galaxy', creator: 'SpaceTraveler' },
];

export const WallpaperGallery: React.FC<WallpaperGalleryProps> = ({ 
  categoryId, 
  onBack, 
  onWallpaperView 
}) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredWallpapers = categoryId
    ? wallpapers.filter(wallpaper => wallpaper.category === categoryId)
    : wallpapers;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWallpaperClick = (wallpaper: any) => {
    setSelectedWallpaper(wallpaper);
    setIsModalOpen(true);
    onWallpaperView();
  };

  return (
    <div className="min-h-screen text-white">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 backdrop-blur-2xl bg-white/10 border border-white/20 text-white p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 z-10 shadow-lg"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 pt-20">
        {filteredWallpapers.map(wallpaper => (
          <div 
            key={wallpaper.id} 
            className="relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            onClick={() => handleWallpaperClick(wallpaper)}
          >
            <img 
              src={wallpaper.url} 
              alt={wallpaper.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-semibold text-white">{wallpaper.title}</h3>
              <p className="text-sm text-white/70">by {wallpaper.creator}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/80">
          <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl max-w-2xl mx-4 w-full overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 backdrop-blur-xl bg-white/20 border border-white/30 text-white p-2 rounded-2xl hover:bg-white/30 transition-all duration-300 z-10"
            >
              <ArrowLeft size={20} className="rotate-45" />
            </button>

            <img 
              src={selectedWallpaper.url} 
              alt={selectedWallpaper.title} 
              className="w-full h-96 object-cover" 
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-white">{selectedWallpaper.title}</h2>
              <p className="text-white/70 mb-6">by {selectedWallpaper.creator}</p>

              {/* Actions */}
              <div className="flex justify-around">
                <button className="flex flex-col items-center justify-center hover:text-purple-400 transition-colors group">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl group-hover:bg-white/20 transition-all duration-300">
                    <Heart size={28} />
                  </div>
                  <span className="text-sm mt-2">Like</span>
                </button>
                <button className="flex flex-col items-center justify-center hover:text-purple-400 transition-colors group">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl group-hover:bg-white/20 transition-all duration-300">
                    <Download size={28} />
                  </div>
                  <span className="text-sm mt-2">Download</span>
                </button>
                <button className="flex flex-col items-center justify-center hover:text-purple-400 transition-colors group">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl group-hover:bg-white/20 transition-all duration-300">
                    <Share size={28} />
                  </div>
                  <span className="text-sm mt-2">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
