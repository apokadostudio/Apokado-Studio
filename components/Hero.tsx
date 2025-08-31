
import React, { useState, useEffect } from 'react';

const GraphicAccent: React.FC<{
    className: string;
    strength: number;
    mousePos: { x: number; y: number };
}> = ({ className, strength, mousePos }) => {
    const style = {
        transform: `translateX(${mousePos.x * strength}px) translateY(${mousePos.y * strength}px)`,
        transition: 'transform 0.3s ease-out'
    };
    return (
        <div className={`absolute -z-10 animate-float ${className}`} style={style}>
            <div className="w-full h-full bg-viking/20 dark:bg-viking/30 rounded-full blur-3xl"></div>
        </div>
    );
};


export const Hero: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth - 0.5) * 2; // range from -1 to 1
            const y = (clientY / window.innerHeight - 0.5) * 2; // range from -1 to 1
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative text-center py-28 sm:py-36 overflow-hidden">
            <GraphicAccent className="w-48 h-48 top-10 left-1/4" strength={-20} mousePos={mousePos} />
            <GraphicAccent className="w-64 h-64 top-1/2 -translate-y-1/2 right-1/4 animate-delay-3000" strength={30} mousePos={mousePos} />
            <GraphicAccent className="w-32 h-32 bottom-0 left-1/3 animate-delay-5000" strength={-15} mousePos={mousePos} />

            <div className="relative z-10">
                <h1 className="text-gray-900 dark:text-white leading-none mb-6 tracking-tighter">
                    <span className="block text-4xl sm:text-5xl md:text-6xl font-extrabold">Bangun Personal</span>
                    <span className="block text-6xl sm:text-8xl md:text-9xl font-black text-viking my-0 sm:-my-2 md:-my-4">Branding</span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold -mt-1 sm:-mt-2">dengan Template Siap Pakai</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10">
                    Download gratis desain Instagram, TikTok, dan Shopee untuk tampil lebih profesional.
                </p>
                <div className="flex justify-center space-x-4">
                    <button className="bg-viking text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-viking/30 cursor-pointer-large">
                        Jelajahi Template
                    </button>
                    <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer-large">
                        Pamerkan Karyamu
                    </button>
                </div>
            </div>
        </section>
    );
};
