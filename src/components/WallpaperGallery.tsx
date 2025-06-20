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
    onWallpaperView(); // Call the prop function
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 bg-gray-800 bg-opacity-50 backdrop-blur-md text-white p-2 rounded-full hover:bg-gray-700 transition-colors z-10"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredWallpapers.map(wallpaper => (
          <div 
            key={wallpaper.id} 
            className="relative rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleWallpaperClick(wallpaper)}
          >
            <img 
              src={wallpaper.url} 
              alt={wallpaper.title} 
              className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-200" 
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent p-4">
              <h3 className="text-lg font-semibold">{wallpaper.title}</h3>
              <p className="text-sm text-gray-300">by {wallpaper.creator}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
          <div className="relative bg-gray-800 rounded-xl shadow-lg max-w-2xl mx-4 w-full">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-700 bg-opacity-50 backdrop-blur-md text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <img 
              src={selectedWallpaper.url} 
              alt={selectedWallpaper.title} 
              className="w-full h-96 object-cover rounded-t-xl" 
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedWallpaper.title}</h2>
              <p className="text-gray-300 mb-4">by {selectedWallpaper.creator}</p>

              {/* Actions */}
              <div className="flex justify-around">
                <button className="flex flex-col items-center justify-center hover:text-purple-400 transition-colors">
                  <Heart size={28} />
                  <span className="text-sm mt-1">Like</span>
                </button>
                <button className="flex flex-col items-center justify-center hover:text-purple-400 transition-colors">
                  <Download size={28} />
                  <span className="text-sm mt-1">Download</span>
                </button>
                <button className="flex flex-col items-center justify-center hover:text-purple-400 transition-colors">
                  <Share size={28} />
                  <span className="text-sm mt-1">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
