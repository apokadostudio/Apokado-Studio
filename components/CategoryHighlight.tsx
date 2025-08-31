
import React from 'react';
import { Category } from '../types';
import { InstagramIcon, TikTokIcon, ShopeeIcon, DownloadIcon } from './icons';

interface CategoryHighlightProps {
  onCategorySelect: (category: Category) => void;
}

const categoryData = [
  {
    icon: <InstagramIcon className="w-10 h-10 text-viking mb-4" />,
    title: Category.IG_FEED,
    items: ['Carousel', 'Post Single', 'Cover Reels']
  },
  {
    icon: <TikTokIcon className="w-10 h-10 text-viking mb-4" />,
    title: Category.TIKTOK_VIDEO,
    items: ['Hook Slide', 'Lower-Third', 'Caption']
  },
  {
    icon: <ShopeeIcon className="w-10 h-10 text-viking mb-4" />,
    title: Category.SHOPEE_BANNER,
    items: ['Promo Header', 'Voucher', 'Flash Sale']
  }
];

const CategoryCard: React.FC<{ 
  data: typeof categoryData[0];
  className?: string;
  onCategorySelect: (category: Category) => void;
}> = ({ data, className = '', onCategorySelect }) => (
    <div className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-viking transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-viking/20 ${className}`}>
        <div className="flex flex-col items-center justify-center text-center h-full">
          {data.icon}
          <h3 className="text-2xl font-bold mb-3">{data.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 space-x-2">
            {data.items.join(' • ')}
          </p>
          <button 
            onClick={() => onCategorySelect(data.title)}
            className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-viking hover:text-gray-900 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 group mt-auto">
            Lihat Semua
            <DownloadIcon className="w-5 h-5 ml-2 transform group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
    </div>
);


export const CategoryHighlight: React.FC<CategoryHighlightProps> = ({ onCategorySelect }) => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-8">
        <CategoryCard 
          data={categoryData[0]} 
          onCategorySelect={onCategorySelect}
          className="md:row-span-2"
        />
        <CategoryCard 
          data={categoryData[1]} 
          onCategorySelect={onCategorySelect}
        />
        <CategoryCard 
          data={categoryData[2]} 
          onCategorySelect={onCategorySelect}
        />
      </div>
    </section>
  );
};