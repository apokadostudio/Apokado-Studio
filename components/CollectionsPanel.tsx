import React from 'react';
import type { Asset } from '../types';
import { CloseIcon, DownloadIcon } from './icons';

interface CollectionsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Asset[];
  onRemoveFromWishlist: (asset: Asset) => void;
}

export const CollectionsPanel: React.FC<CollectionsPanelProps> = ({ isOpen, onClose, wishlist, onRemoveFromWishlist }) => {
  return (
    <>
        <div className={`fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-20">
                <h3 className="text-lg font-bold">Koleksi Saya ({wishlist.length})</h3>
                <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100vh-144px)]">
                {wishlist.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                        <p className="mb-2">Koleksi Anda masih kosong.</p>
                        <p className="text-sm">Klik ikon hati ❤️ pada template untuk menambahkannya.</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {wishlist.map(asset => (
                            <li key={asset.id} className="flex items-center space-x-4 group">
                                <img src={asset.imageUrl} alt={asset.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0"/>
                                <div className="flex-grow overflow-hidden">
                                    <h4 className="font-semibold truncate">{asset.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{asset.category}</p>
                                </div>
                                <button 
                                    onClick={() => onRemoveFromWishlist(asset)} 
                                    className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <CloseIcon className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {wishlist.length > 0 && (
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <button className="w-full flex items-center justify-center bg-viking text-gray-900 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                        <DownloadIcon className="w-5 h-5 mr-2" />
                        Download Semua ({wishlist.length})
                    </button>
                </div>
            )}
        </div>
        {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40"></div>}
    </>
  );
};
