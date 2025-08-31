import React, { useEffect } from 'react';
import type { Collection, Asset } from '../types';
import { CloseIcon } from './icons';
import { mockAssets } from '../data/assets';

interface CollectionDetailModalProps {
    collection: Collection;
    onClose: () => void;
    onAssetClick: (assetId: number) => void;
}

const SmallAssetCard: React.FC<{ asset: Asset; onClick: () => void }> = ({ asset, onClick }) => (
    <div 
        onClick={onClick}
        className="group cursor-pointer"
    >
        <img src={asset.imageUrl} alt={asset.title} className="w-full aspect-square object-cover rounded-lg group-hover:ring-2 ring-viking transition-all" />
        <h4 className="text-sm font-semibold mt-2 truncate">{asset.title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{asset.category}</p>
    </div>
)

export const CollectionDetailModal: React.FC<CollectionDetailModalProps> = ({ collection, onClose, onAssetClick }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const collectionAssets = mockAssets.filter(asset => collection.assetIds.includes(asset.id));

    return (
        <div
            className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
                <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold">{collection.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{collection.description}</p>
                </div>
                <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {collectionAssets.map(asset => (
                            <SmallAssetCard 
                                key={asset.id} 
                                asset={asset} 
                                onClick={() => onAssetClick(asset.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};