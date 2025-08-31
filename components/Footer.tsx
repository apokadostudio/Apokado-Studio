import React from 'react';
import { TwitterIcon, DribbbleIcon } from './icons';
import type { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
                    <div>
                        <button onClick={() => onNavigate('home')} className="text-2xl font-bold mb-2">
                            Apokado <span className="text-viking">Studio</span>
                        </button>
                        <p className="text-gray-500 dark:text-gray-400">Template gratis buat para kreator kece.</p>
                    </div>
                     <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-500 dark:text-gray-400 font-medium">
                        <button onClick={() => onNavigate('home')} className="hover:text-viking transition-colors">Home</button>
                        <button onClick={() => onNavigate('showcase')} className="hover:text-viking transition-colors">Showcase</button>
                        <button onClick={() => onNavigate('creator')} className="hover:text-viking transition-colors">The Creator</button>
                        <button onClick={() => onNavigate('academy')} className="hover:text-viking transition-colors">Academy</button>
                         <button onClick={() => onNavigate('creator')} className="hover:text-viking transition-colors font-semibold">Dukung Saya</button>
                    </div>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-viking transition-colors"><TwitterIcon className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-viking transition-colors"><DribbbleIcon className="w-6 h-6" /></a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Apokado Studio. Dibuat pake ❤️ buat para kreator.</p>
                </div>
            </div>
        </footer>
    );
};