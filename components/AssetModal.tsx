import React, { useState, useEffect } from 'react';
// FIX: Import JournalPost from types.ts, not data/journal.ts
import type { Asset, JournalPost } from '../types';
import { CloseIcon, DownloadIcon, ShareIcon, CheckIcon, SparklesIcon, ClipboardIcon } from './icons';
import { GoogleGenAI } from "@google/genai";

interface AssetModalProps {
  asset: Asset;
  onClose: () => void;
  journalPosts: JournalPost[];
  onTagClick: (tag: string) => void;
  onNavigateToRemix: (asset: Asset) => void;
}

type DownloadState = 'idle' | 'downloading' | 'downloaded';
type AiState = 'idle' | 'loading' | 'success' | 'error';

export const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose, journalPosts, onTagClick, onNavigateToRemix }) => {
    const [downloadState, setDownloadState] = useState<DownloadState>('idle');
    const [aiState, setAiState] = useState<AiState>('idle');
    const [generatedCaption, setGeneratedCaption] = useState<string>('');
    const [copySuccess, setCopySuccess] = useState(false);

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

    const handleDownload = () => {
        setDownloadState('downloading');
        setTimeout(() => {
            setDownloadState('downloaded');
            setTimeout(() => {
                setDownloadState('idle');
            }, 2000);
        }, 1500);
    };
    
    const handleGenerateCaption = async () => {
        setAiState('loading');
        setGeneratedCaption('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `You are a creative social media expert for Indonesian audience. Generate 3 catchy and engaging social media caption options for a post that uses a design template with these details:\n\n- Title: "${asset.title}"\n- Description: "${asset.description}"\n- For: ${asset.category}\n- Keywords: ${asset.tags.join(', ')}\n\nFormat your response clearly with headings for each option (e.g., **Opsi 1:**) and include relevant Indonesian hashtags. The tone should be inspiring and professional.`;
            
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });

            setGeneratedCaption(response.text);
            setAiState('success');
        } catch (error) {
            console.error("Error generating caption:", error);
            setGeneratedCaption("Maaf, terjadi kesalahan saat mencoba membuat caption. Silakan coba lagi nanti.");
            setAiState('error');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCaption).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const getDownloadButtonContent = () => {
        switch (downloadState) {
            case 'downloading':
                return (
                    <>
                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Processing...</span>
                    </>
                );
            case 'downloaded':
                return (
                    <>
                        <CheckIcon className="w-5 h-5 mr-2" />
                        <span>Downloaded!</span>
                    </>
                );
            default:
                return (
                    <>
                        <DownloadIcon className="w-5 h-5 mr-2" />
                        <span>Download</span>
                    </>
                );
        }
    };
    
     const getAiButtonContent = () => {
        switch (aiState) {
            case 'loading':
                return (
                    <>
                        <div className="w-5 h-5 border-2 border-viking border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Lagi mikir...</span>
                    </>
                );
            default:
                return (
                    <>
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        <span>Buat Caption</span>
                    </>
                );
        }
    };

    const relatedJournalPost = asset.relatedJournalId 
        ? journalPosts.find(post => post.id === asset.relatedJournalId) 
        : null;

  return (
    <div 
        className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
    >
        <div 
            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
            >
                <CloseIcon className="w-6 h-6" />
            </button>
            <div className="w-full md:w-1/2 flex-shrink-0 bg-gray-100 dark:bg-gray-900">
                <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-contain" />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-viking font-semibold mb-2">{asset.category}</span>
                        <h2 className="text-3xl font-bold mb-4">{asset.title}</h2>
                    </div>
                    {asset.pro && (
                        <div className="flex-shrink-0 ml-4 bg-viking text-gray-900 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Pro
                        </div>
                    )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 ">{asset.description}</p>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {asset.tags.map(tag => (
                         <button 
                            key={tag} 
                            onClick={() => onTagClick(tag)}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-viking hover:text-gray-900 dark:hover:bg-viking dark:hover:text-gray-900 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                
                {generatedCaption && (
                     <div className="relative bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg mb-6 flex-grow min-h-[150px]">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-2">Nih, draf caption dari AI</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-mono">{generatedCaption}</div>
                        <button 
                            onClick={handleCopy}
                            className="absolute top-3 right-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            {copySuccess ? <CheckIcon className="w-4 h-4 text-viking"/> : <ClipboardIcon className="w-4 h-4"/>}
                        </button>
                    </div>
                )}
                
                {!generatedCaption && relatedJournalPost && (
                    <div className="bg-viking/10 dark:bg-viking/20 p-4 rounded-lg mb-6 border border-viking/30">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">Pro Tip!</h4>
                        <a href="#" className="text-sm text-viking hover:underline">
                           Baca Juga: {relatedJournalPost.title} →
                        </a>
                    </div>
                )}
                 <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">Lisensi</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{asset.license}</p>
                </div>
                
                <div className="mt-auto space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                     <button
                        onClick={() => onNavigateToRemix(asset)}
                        className="w-full flex items-center justify-center bg-viking text-gray-900 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-viking/30"
                    >
                       <SparklesIcon className="w-5 h-5 mr-2" />
                       AI Remix Template
                    </button>
                    <div className="flex flex-col sm:flex-row gap-3">
                         {asset.pro ? (
                            <button
                                disabled
                                className="w-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold py-3 px-6 rounded-full cursor-not-allowed"
                            >
                                Upgrade ke Pro
                            </button>
                        ) : (
                            <button
                                onClick={handleDownload}
                                disabled={downloadState !== 'idle'}
                                className="flex-grow flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50"
                            >
                                {getDownloadButtonContent()}
                            </button>
                        )}
                        <button
                            onClick={handleGenerateCaption}
                            disabled={aiState === 'loading'}
                            className="flex-grow flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {getAiButtonContent()}
                        </button>
                        <button className="flex-shrink-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold p-3 rounded-full transition-colors">
                            <ShareIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slide-up {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};