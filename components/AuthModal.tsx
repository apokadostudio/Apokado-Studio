
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode, onLoginSuccess }) => {
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

  const isLogin = mode === 'login';

  const title = isLogin ? 'Selamat Datang Kembali!' : 'Buat Akun Baru';
  const subtitle = isLogin ? 'Login untuk mengakses riwayat download.' : 'Daftar untuk mulai mengoleksi template favoritmu.';
  const buttonText = isLogin ? 'Login' : 'Sign Up';
  const switchText = isLogin ? "Belum punya akun?" : "Sudah punya akun?";
  const switchLinkText = isLogin ? "Sign Up" : "Login";

  const handleSwitch = () => {
    onSwitchMode(isLogin ? 'signup' : 'login');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-auto relative animate-slide-up p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                        <input type="text" placeholder="John Doe" className="w-full mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-viking transition" />
                    </div>
                )}
                 <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" placeholder="you@example.com" className="w-full mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-viking transition" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input type="password" placeholder="••••••••" className="w-full mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-viking transition" />
                </div>
            </div>

            <button type="submit" className="w-full mt-6 bg-viking text-gray-900 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-viking-dark">
                {buttonText}
            </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {switchText}{' '}
            <button onClick={handleSwitch} className="font-semibold text-viking hover:underline">
                {switchLinkText}
            </button>
        </p>

      </div>
      <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slide-up {
                from { transform: translateY(20px) scale(0.98); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};
