
import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon, SparklesIcon, PaperAirplaneIcon } from './icons';
import { GoogleGenAI } from "@google/genai";
import type { Chat } from '@google/genai';
import type { Page } from '../types';

interface AiChatModalProps {
    onClose: () => void;
    currentPage: Page;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

const examplePrompts = [
    "Berikan ide konten Instagram untuk brand fashion.",
    "Buat caption TikTok untuk video tutorial makeup.",
    "Bagaimana cara membuat palet warna yang bagus?",
    "Tips desain banner promosi untuk Shopee.",
];

export const AiChatModal: React.FC<AiChatModalProps> = ({ onClose, currentPage }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        const getSystemInstruction = () => {
            const baseInstruction = 'You are Apokado AI, a friendly and expert creative assistant. You specialize in providing ideas, tips, and inspiration for graphic design, social media content, and branding for creators and small businesses in Indonesia. Keep your answers concise, helpful, and encouraging. Use Bahasa Indonesia.';
            switch (currentPage) {
                case 'academy':
                    return `${baseInstruction} You are currently helping a user on the 'Academy' page. You can offer to summarize articles, create quizzes based on the content, or suggest related learning topics.`;
                case 'showcase':
                    return `${baseInstruction} The user is on the 'Showcase' page. You can give them creative ideas for their next project, suggest which template to use, or provide feedback on design concepts.`;
                case 'creator':
                     return `${baseInstruction} The user is on 'The Creator' page. You can answer questions about the creator's journey, their design process, or suggest ways to support the creator.`;
                case 'ai-brief':
                     return `${baseInstruction} The user is on the 'AI Brief Generator' page. You can help them refine their inputs for the brief, explain the importance of a good creative brief, or give examples of effective campaign goals.`;
                case 'projects':
                     return `${baseInstruction} The user is on their personal 'Projects' page. You can help them organize their ideas, suggest how to structure a new project, or provide inspiration for their moodboards.`;
                default:
                    return baseInstruction;
            }
        };

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const chatInstance = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: getSystemInstruction(),
            },
        });
        setChat(chatInstance);
        
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, currentPage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async (prompt?: string) => {
        const messageToSend = prompt || input;
        if (!messageToSend.trim() || isLoading || !chat) return;

        const userMessage: Message = { role: 'user', text: messageToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: messageToSend });
            const modelMessage: Message = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { role: 'model', text: "Maaf, terjadi kesalahan. Coba beberapa saat lagi ya." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend();
    };

    return (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-end justify-center z-50 p-0 sm:p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-800 rounded-t-lg sm:rounded-lg w-full max-w-2xl h-[90%] sm:h-[80%] max-h-[700px] flex flex-col relative animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-6 h-6 text-viking" />
                        <div>
                            <h2 className="text-lg font-bold">Apokado AI</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Asisten kreatif Anda</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer-large">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>

                <main className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.length === 0 && !isLoading && (
                        <div className="text-center p-8">
                             <div className="inline-block p-3 bg-viking/20 rounded-full mb-4">
                                <SparklesIcon className="w-8 h-8 text-viking"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Butuh Bantuan Kreatif?</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Tanya apa saja, mulai dari ide konten sampai tips desain.</p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                {examplePrompts.map((prompt, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleSend(prompt)}
                                        className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer-large"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-viking/90 text-gray-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    
                     {isLoading && (
                        <div className="flex justify-start">
                            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-fast"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-medium"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-slow"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </main>

                <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ketik pesan Anda..."
                            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-transparent rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-viking transition cursor-pointer-large"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-viking text-gray-900 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-viking-dark cursor-pointer-large"
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </div>
             <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
                @media (min-width: 640px) {
                     @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
                .animate-pulse-fast { animation: pulse 1.4s infinite cubic-bezier(0.4, 0, 0.6, 1); animation-delay: 0s; }
                .animate-pulse-medium { animation: pulse 1.4s infinite cubic-bezier(0.4, 0, 0.6, 1); animation-delay: 0.2s; }
                .animate-pulse-slow { animation: pulse 1.4s infinite cubic-bezier(0.4, 0, 0.6, 1); animation-delay: 0.4s; }
            `}</style>
        </div>
    );
};