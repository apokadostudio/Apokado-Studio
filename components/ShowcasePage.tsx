import React from 'react';
import { showcaseItems } from '../data/showcase';
import { mockAssets } from '../data/assets';

const ShowcaseCard: React.FC<{ item: typeof showcaseItems[0] }> = ({ item }) => {
    const usedTemplate = mockAssets.find(asset => asset.id === item.usedTemplateId);

    return (
        <div className="group relative break-inside-avoid mb-6">
            <img 
                src={item.imageUrl}
                alt={`Kreasi oleh ${item.author}`}
                className="w-full h-auto object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
                <p className="text-white font-semibold">
                    Dibuat oleh{' '}
                    <a href={item.authorUrl} target="_blank" rel="noopener noreferrer" className="text-viking hover:underline">
                        {item.author}
                    </a>
                </p>
                {usedTemplate && (
                    <p className="text-sm text-gray-300 mt-1">
                        Menggunakan: <span className="font-medium">{usedTemplate.title}</span>
                    </p>
                )}
            </div>
        </div>
    );
};


export const ShowcasePage: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-viking/30 mb-12 text-center mt-12">
             <h2 className="text-2xl font-bold text-viking mb-2">Tantangan Desain Minggu Ini!</h2>
             <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Remix "Modern Vibe" untuk Brand Fashion</h3>
             <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                 Gunakan template 'IG Carousel "Modern Vibe"' dan fitur AI Remix untuk membuat promosi brand fashion impianmu. Karya terbaik akan di-feature di sini!
             </p>
             <button className="bg-viking text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-viking/30">
                 Ikut Tantangan!
             </button>
        </div>

        <div className="text-center pt-4 pb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                Karya Keren Kalian
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Intip gimana para kreator kece pakai template dari sini. Karyamu juga bisa nampang di sini, lho!
            </p>
             <button className="mt-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-300 dark:hover:bg-gray-600">
                Pamerin Karyamu!
            </button>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
            {showcaseItems.map(item => (
                <ShowcaseCard key={item.id} item={item} />
            ))}
        </div>
        <style>{`
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
            .break-inside-avoid {
                break-inside: avoid;
            }
        `}</style>
    </div>
  );
};