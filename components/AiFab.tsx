
import React from 'react';
import { SparklesIcon } from './icons';

interface AiFabProps {
    onClick: () => void;
}

export const AiFab: React.FC<AiFabProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-viking rounded-full text-gray-900 flex items-center justify-center shadow-lg hover:bg-viking-dark transition-all duration-300 transform hover:scale-110 cursor-pointer-large"
            aria-label="Open Apokado AI"
        >
            <SparklesIcon className="w-8 h-8" />
        </button>
    );
};
