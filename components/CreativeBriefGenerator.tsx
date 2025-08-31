import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SparklesIcon } from './icons';

export const CreativeBriefGenerator: React.FC = () => {
    const [brandName, setBrandName] = useState('');
    const [industry, setIndustry] = useState('');
    const [goal, setGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [brief, setBrief] = useState('');
    const [error, setError] = useState('');

    const canSubmit = brandName && industry && goal;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        
        setIsLoading(true);
        setBrief('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `
                Generate a professional creative brief for a new social media campaign. Use the following details:
                - Brand Name: ${brandName}
                - Industry: ${industry}
                - Primary Campaign Goal: ${goal}

                Structure the brief with these clear sections in Bahasa Indonesia. Use markdown for formatting like bold headers:
                1.  **Judul Kampanye:** (A catchy and creative title)
                2.  **Latar Belakang:** (Briefly explain the brand and the context of this campaign)
                3.  **Tujuan Utama:** (Elaborate on the primary goal, e.g., increase brand awareness by 20%, generate 500 leads)
                4.  **Target Audiens:** (Describe the ideal customer profile in detail: demographics, interests, pain points)
                5.  **Pesan Kunci (Key Message):** (The single most important message to convey to the audience)
                6.  **Tone of Voice:** (e.g., professional & trustworthy, fun & witty, inspiring & elegant)
                7.  **Konsep Visual & Ide Konten:** (Suggest visual styles, color palettes, and 3 specific, creative content ideas for Instagram or TikTok)
                8.  **Call to Action (CTA):** (What specific action should the audience take after seeing the content?)
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setBrief(response.text);

        } catch (err) {
            setError('Gagal membuat brief. Coba lagi nanti atau periksa koneksi Anda.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
            <div className="text-center pt-16 pb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                    AI <span className="text-viking">Creative Brief</span> Generator
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Bingung mau mulai dari mana? Isi detail di bawah dan biarkan AI membuatkan brief kampanye profesional untuk Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="brandName" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Nama Brand</label>
                            <input
                                id="brandName"
                                type="text"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                placeholder="Contoh: Apokado Studio"
                                className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-viking transition"
                            />
                        </div>
                         <div>
                            <label htmlFor="industry" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Industri</label>
                            <input
                                id="industry"
                                type="text"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                placeholder="Contoh: Fashion, Kuliner, Teknologi"
                                className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-viking transition"
                            />
                        </div>
                         <div>
                            <label htmlFor="goal" className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Tujuan Utama Kampanye</label>
                            <textarea
                                id="goal"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                placeholder="Contoh: Meningkatkan brand awareness produk baru di kalangan Gen Z."
                                rows={4}
                                className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-viking transition"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!canSubmit || isLoading}
                            className="w-full flex items-center justify-center bg-viking text-gray-900 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="w-6 h-6 mr-2"/>
                                    Buatkan Brief
                                </>
                            )}
                        </button>
                    </form>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 min-h-[400px]">
                    <h2 className="text-2xl font-bold mb-4">Hasil Brief:</h2>
                    {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <SparklesIcon className="w-12 h-12 text-viking animate-pulse mx-auto" />
                                <p className="mt-4 text-gray-500">AI sedang meracik ide-ide terbaik...</p>
                            </div>
                        </div>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    {brief && (
                        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                            {brief.split('**').map((part, index) => 
                                index % 2 !== 0 ? <strong key={index}>{part}</strong> : <span key={index}>{part}</span>
                            )}
                        </div>
                    )}
                     {!isLoading && !brief && !error && (
                        <div className="text-center text-gray-500 dark:text-gray-400 pt-16">
                            <p>Brief kreatif Anda akan muncul di sini.</p>
                        </div>
                    )}
                </div>
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
