import React from 'react';
import { SparklesIcon } from './icons';

export const ProjectPage: React.FC = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center pt-16 pb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                    Proyek <span className="text-viking">Saya</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Kelola semua aset, brief, dan hasil remix Anda dalam satu tempat yang terorganisir.
                </p>
            </div>
            
            <div className="text-center py-20 px-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                 <div className="inline-block p-3 bg-viking/20 rounded-full mb-4">
                    <SparklesIcon className="w-8 h-8 text-viking"/>
                </div>
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Ruang Kerja Kreatif Anda</h2>
                 <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Fitur Proyek sedang dalam pengembangan dan akan segera hadir untuk membantu Anda mengelola alur kerja kreatif dengan lebih efisien.</p>
                 <button className="mt-8 bg-viking text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 opacity-50 cursor-not-allowed">
                     Buat Proyek Baru
                 </button>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};