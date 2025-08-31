import React from 'react';
import type { Asset } from '../types';
import { HeartIcon, EyeIcon } from './icons';

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
  onToggleWishlist: (asset: Asset) => void;
  isWishlisted: boolean;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick, onToggleWishlist, isWishlisted }) => {
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the heart
    onToggleWishlist(asset);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-md hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-viking/20"
    >
      <div className="relative overflow-hidden">
        <img
          src={asset.imageUrl}
          alt={asset.title}
          onClick={onClick}
          className="w-full h-auto object-cover aspect-square transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
         {asset.pro && (
            <div className="absolute top-3 left-3 bg-viking text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pro
            </div>
        )}
        <div 
          onClick={onClick} 
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
          <div className="text-center p-4">
            <h4 className="text-white font-bold text-lg">{asset.title}</h4>
            <span className="text-sm text-viking">{asset.category}</span>
          </div>
        </div>
        <button 
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-viking hover:text-gray-900 transition-all duration-300 scale-0 group-hover:scale-100"
          aria-label="Add to wishlist"
        >
            <HeartIcon className="w-5 h-5" filled={isWishlisted} />
        </button>
      </div>
       <div className="p-4 border-t border-gray-100 dark:border-gray-700/50" onClick={onClick}>
            <h3 className="font-bold truncate text-gray-800 dark:text-white">{asset.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <p className="truncate">{asset.category}</p>
                <div className="flex items-center space-x-1 flex-shrink-0">
                    <EyeIcon className="w-4 h-4" />
                    <span>{(asset.downloads / 1000).toFixed(1)}k</span>
                </div>
            </div>
        </div>
    </div>
  );
};