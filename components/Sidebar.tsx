import React from 'react';
import { Category } from '../types';
import { CloseIcon, InstagramIcon, TikTokIcon, ShopeeIcon } from './icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: Category | 'all';
  onCategorySelect: (category: Category | 'all') => void;
}

const categories = [
    { name: Category.IG_FEED, icon: <InstagramIcon className="w-5 h-5 mr-3" /> },
    { name: Category.TIKTOK_VIDEO, icon: <TikTokIcon className="w-5 h-5 mr-3" /> },
    { name: Category.SHOPEE_BANNER, icon: <ShopeeIcon className="w-5 h-5 mr-3" /> },
];

const subFilters = {
    [Category.IG_FEED]: ['Carousel', 'Post Single', 'Cover Reels', 'Story'],
    [Category.TIKTOK_VIDEO]: ['Hook Slide', 'Lower-Third', 'Caption', 'Transition'],
    [Category.SHOPEE_BANNER]: ['Promo Header', 'Voucher', 'Flash Sale', 'Banner'],
};

const softwareFilters = ['Canva', 'Figma', 'Photoshop', 'CapCut'];


export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeCategory, onCategorySelect }) => {
    
    const renderSubFilters = () => {
        if (activeCategory === 'all' || !subFilters[activeCategory]) return null;
        
        return (
             <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Format</h4>
                <div className="space-y-2">
                    {subFilters[activeCategory].map(format => (
                        <label key={format} className="flex items-center text-gray-700 dark:text-gray-300">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-viking focus:ring-viking" />
                            <span className="ml-3">{format}</span>
                        </label>
                    ))}
                </div>
            </div>
        )
    };

  return (
    <>
        <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-20">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Kategori</h4>
                    <nav className="space-y-1">
                        {categories.map(cat => (
                            <button 
                                key={cat.name}
                                onClick={() => onCategorySelect(cat.name)}
                                className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${activeCategory === cat.name ? 'bg-viking/20 text-viking' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                {cat.icon}
                                {cat.name}
                            </button>
                        ))}
                    </nav>
                </div>
                {renderSubFilters()}
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Software</h4>
                    <div className="space-y-2">
                        {softwareFilters.map(software => (
                            <label key={software} className="flex items-center text-gray-700 dark:text-gray-300">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-viking focus:ring-viking" />
                                <span className="ml-3">{software}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
        {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>}
    </>
  );
};