import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import type { Asset } from '../types';
import { CloseIcon, SparklesIcon, DownloadIcon } from './icons';

interface AiRemixModalProps {
  asset: Asset;
  onClose: () => void;
}

const toBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error('Failed to convert blob to base64'));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

const fetchAndEncodeImage = async (url: string): Promise<{ base64Data: string; mimeType: string }> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const base64Data = await toBase64(blob);
    return { base64Data, mimeType: blob.type };
};

export const AiRemixModal: React.FC<AiRemixModalProps> = ({ asset, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [remixedImage, setRemixedImage] = useState<string | null>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleRemix = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError('');
        setRemixedImage(null);

        try {
            const { base64Data, mimeType } = await fetchAndEncodeImage(asset.imageUrl);
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image-preview',
              contents: {
                parts: [
                  { inlineData: { data: base64Data, mimeType } },
                  { text: prompt },
                ],
              },
              config: {
                  responseModalities: [Modality.IMAGE, Modality.TEXT],
              },
            });
            
            const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
            if (imagePart && imagePart.inlineData) {
                const newMimeType = imagePart.inlineData.mimeType;
                const newBase64 = imagePart.inlineData.data;
                setRemixedImage(`data:${newMimeType};base64,${newBase64}`);
            } else {
                throw new Error("No image was generated in the response.");
            }

        } catch (err) {
            console.error("AI Remix Error:", err);
            setError("Maaf, gagal melakukan remix. Coba dengan prompt yang berbeda atau ulangi beberapa saat lagi.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const displayImage = remixedImage || asset.imageUrl;

    return (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative animate-slide-up" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-20">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <div className="w-full md:w-2/3 flex-shrink-0 bg-gray-100 dark:bg-gray-900 relative">
                    <img src={displayImage} alt={remixedImage ? 'Remixed Template' : asset.title} className="w-full h-full object-contain" />
                    {isLoading && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                             <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                             <p className="mt-4 font-semibold">AI sedang meracik ulang...</p>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/3 p-6 flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold">AI Remix</h2>
                        <p className="text-gray-500 dark:text-gray-400">Ubah template ini dengan perintahmu.</p>
                    </div>
                    <div className="flex-grow flex flex-col">
                        <label htmlFor="remix-prompt" className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Apa yang ingin kamu ubah?</label>
                        <textarea
                            id="remix-prompt"
                            rows={4}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Contoh: ubah warna latar jadi biru navy, atau tambahkan secangkir kopi di atas meja."
                            className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-viking transition mb-4"
                        />
                        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                    </div>
                    <div className="mt-auto space-y-3">
                        <button
                            onClick={handleRemix}
                            disabled={isLoading || !prompt.trim()}
                            className="w-full flex items-center justify-center bg-viking text-gray-900 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            Remix Sekarang
                        </button>
                        {remixedImage && (
                            <a
                                href={remixedImage}
                                download={`remix_${asset.title}.png`}
                                className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                <DownloadIcon className="w-5 h-5 mr-2" />
                                Download Hasil Remix
                            </a>
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