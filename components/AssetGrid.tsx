import React from 'react';
import type { Asset } from '../types';
import { AssetCard } from './AssetCard';

interface AssetGridProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  isLoading: boolean;
  onToggleWishlist: (asset: Asset) => void;
  isAssetInWishlist: (assetId: number) => boolean;
}

const ShimmerCard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <div className="animate-pulse flex flex-col h-full">
            {/* Image Placeholder */}
            <div className="bg-gray-200 dark:bg-gray-700 w-full aspect-square"></div>
            {/* Text Placeholders */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700/50">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    </div>
);

export const AssetGrid: React.FC<AssetGridProps> = ({ assets, onAssetClick, isLoading, onToggleWishlist, isAssetInWishlist }) => {
  if (isLoading) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => <ShimmerCard key={index} />)}
        </div>
    );
  }
  
  if (assets.length === 0) {
    return <div className="text-center py-16 text-gray-500 dark:text-gray-400">Tidak ada template yang ditemukan. Coba kata kunci lain.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id} 
          asset={asset} 
          onClick={() => onAssetClick(asset)}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={isAssetInWishlist(asset.id)}
        />
      ))}
    </div>
  );
};