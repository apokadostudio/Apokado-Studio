import React from 'react';
import { SearchIcon, SunIcon, MoonIcon, MenuIcon, BookmarkIcon, FireIcon, UserIcon } from './icons';
import type { Page } from '../types';

interface HeaderProps {
  onSearch: (term: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onToggleSidebar: () => void;
  onToggleCollections: () => void;
  wishlistCount: number;
  onNavigate: (page: Page) => void;
  currentPage: Page;
  isLoggedIn: boolean;
  onLogout: () => void;
  creativeStreak: number;
  onNavigateProjects: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  theme, 
  toggleTheme, 
  onLoginClick, 
  onSignUpClick,
  onToggleSidebar,
  onToggleCollections,
  wishlistCount,
  onNavigate,
  currentPage,
  isLoggedIn,
  onLogout,
  creativeStreak,
  onNavigateProjects,
}) => {
    
  const navLinkClasses = (page: Page) => 
      `px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer-large ${
          currentPage === page 
          ? 'text-viking' 
          : 'text-gray-600 dark:text-gray-300 hover:text-viking dark:hover:text-viking'
      }`;

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 sticky top-0 z-40 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <button onClick={onToggleSidebar} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer-large">
                <MenuIcon className="w-6 h-6" />
            </button>
            <button onClick={() => onNavigate('home')} className="text-2xl font-bold cursor-pointer-large">
              Apokado <span className="text-viking">Studio</span>
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
             <button onClick={() => onNavigate('showcase')} className={navLinkClasses('showcase')}>
                Showcase
            </button>
            <button onClick={() => onNavigate('ai-remix')} className={navLinkClasses('ai-remix')}>
                AI Remix
            </button>
            <button onClick={() => onNavigate('academy')} className={navLinkClasses('academy')}>
                Academy
            </button>
            <button onClick={() => onNavigate('ai-brief')} className={navLinkClasses('ai-brief')}>
                AI Brief
            </button>
            <button onClick={onNavigateProjects} className={navLinkClasses('projects')}>
                Proyek Saya
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden lg:block w-full max-w-xs">
                <div className="relative">
                <input
                    type="search"
                    placeholder="Cari template..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-viking transition-all duration-300 cursor-pointer-large"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                </div>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer-large">
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
             <button onClick={onToggleCollections} className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer-large">
              <BookmarkIcon className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-viking text-gray-900 text-xs font-bold ring-2 ring-white dark:ring-gray-900">{wishlistCount}</span>
              )}
            </button>
            
            {isLoggedIn ? (
                 <div className="flex items-center space-x-3 pl-2 group relative">
                    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                        <FireIcon className="w-5 h-5 text-orange-500" />
                        <span className="font-bold text-sm text-gray-700 dark:text-gray-200">{creativeStreak}</span>
                    </div>
                    <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer-large">
                        <UserIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible cursor-pointer-large">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profil</a>
                        <button onClick={onLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Logout
                        </button>
                    </div>
                 </div>
            ) : (
                <>
                    <button onClick={onLoginClick} className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-viking dark:hover:text-viking px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer-large">
                      Login
                    </button>
                    <button onClick={onSignUpClick} className="hidden sm:block bg-viking text-gray-900 hover:bg-viking-dark px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer-large">
                      Sign Up
                    </button>
                </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};