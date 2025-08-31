import React, { useEffect } from 'react';
import type { JournalPost } from '../types';
import { CloseIcon } from './icons';

interface JournalDetailModalProps {
    post: JournalPost;
    onClose: () => void;
}

export const JournalDetailModal: React.FC<JournalDetailModalProps> = ({ post, onClose }) => {
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

    return (
        <div
            className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col relative animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
                
                <div className="overflow-y-auto">
                    {post.type === 'video' ? (
                        <div className="aspect-video">
                            <iframe 
                                className="w-full h-full"
                                src={post.videoUrl} 
                                title={post.title}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </div>
                    ) : (
                        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
                    )}

                    <div className="p-8">
                        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full mr-3" />
                            <span>Oleh {post.author.name} • {post.publishDate} • {post.readTime}</span>
                        </div>
                        
                        {post.type === 'article' && post.content && (
                            <div className="prose dark:prose-invert max-w-none">
                                {post.content.split('\n\n').map((paragraph, index) => {
                                    if (paragraph.startsWith('##')) {
                                        return <h2 key={index} className="text-2xl font-bold mt-6 mb-2">{paragraph.replace('## ', '')}</h2>
                                    }
                                    return <p key={index}>{paragraph}</p>
                                })}
                            </div>
                        )}
                         {post.type === 'video' && (
                            <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                         )}
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