import React from 'react';
import { collections } from '../data/collections';
import { mockAssets } from '../data/assets';
import type { Collection } from '../types';

interface CuratedCollectionsProps {
    onCollectionClick: (collection: Collection) => void;
}

export const CuratedCollections: React.FC<CuratedCollectionsProps> = ({ onCollectionClick }) => {
    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Paket Komplit Buat Kamu</h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Nggak usah pusing, mulai dari sini aja. Paket template siap pakai buat macem-macem kebutuhan.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {collections.map(collection => {
                    const collectionAssets = mockAssets.filter(asset => collection.assetIds.includes(asset.id));
                    return (
                        <div 
                            key={collection.id} 
                            onClick={() => onCollectionClick(collection)}
                            className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-viking transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-viking/20"
                        >
                            <div className="grid grid-cols-3 h-48">
                                <img src={collectionAssets[0]?.imageUrl} className="w-full h-full object-cover col-span-2" alt={collectionAssets[0]?.title} />
                                <div className="grid grid-rows-2 col-span-1">
                                    <img src={collectionAssets[1]?.imageUrl} className="w-full h-full object-cover" alt={collectionAssets[1]?.title} />
                                    <img src={collectionAssets[2]?.imageUrl} className="w-full h-full object-cover" alt={collectionAssets[2]?.title} />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">{collection.description}</p>
                                <span className="font-semibold text-viking group-hover:underline">Intip Isinya →</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};