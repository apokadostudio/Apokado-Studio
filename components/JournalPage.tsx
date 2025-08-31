import React, { useState, useMemo } from 'react';
// FIX: Import JournalPost from types.ts, not data/journal.ts
import { journalPosts } from '../data/journal';
import type { JournalPost } from '../types';
import { PlayIcon } from './icons';

interface JournalCardProps {
    post: JournalPost;
    onClick: () => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ post, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-md hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-viking/20"
    >
        <div className="relative overflow-hidden">
            <img 
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            {post.type === 'video' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-viking/80 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <PlayIcon className="w-8 h-8 text-white" />
                    </div>
                </div>
            )}
        </div>
        <div className="p-6">
            <div className="flex items-center mb-2">
                <span className={`text-xs font-bold uppercase py-1 px-2 rounded-full ${post.type === 'video' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'}`}>
                    {post.type}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">{post.publishDate} • {post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-viking transition-colors">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{post.excerpt}</p>
        </div>
    </div>
);

type FilterType = 'all' | 'article' | 'video';

interface JournalPageProps {
    onPostClick: (post: JournalPost) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onPostClick }) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    
    const filteredPosts = useMemo(() => {
        if (activeFilter === 'all') return journalPosts;
        return journalPosts.filter(post => post.type === activeFilter);
    }, [activeFilter]);

    const FilterButton: React.FC<{ filter: FilterType; label: string }> = ({ filter, label }) => (
        <button
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeFilter === filter
                    ? 'bg-viking text-gray-900'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );

  return (
    <div className="animate-fade-in-up">
        <div className="text-center pt-16 pb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                Apokado <span className="text-viking">Academy</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Tempatnya belajar desain, branding, dan ngonten. Biar makin jago!
            </p>
        </div>

        <div className="flex justify-center space-x-2 mb-12">
            <FilterButton filter="all" label="Semua" />
            <FilterButton filter="article" label="Artikel" />
            <FilterButton filter="video" label="Video" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
                <JournalCard key={post.id} post={post} onClick={() => onPostClick(post)} />
            ))}
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