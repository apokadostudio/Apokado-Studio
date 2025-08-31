
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryHighlight } from './components/CategoryHighlight';
import { AssetGrid } from './components/AssetGrid';
import { AssetModal } from './components/AssetModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { CollectionsPanel } from './components/CollectionsPanel';
import { CreatorPage } from './components/CreatorPage';
import { JournalPage } from './components/JournalPage';
import { ShowcasePage } from './components/ShowcasePage';
import { CuratedCollections } from './components/CuratedCollections';
import { CollectionDetailModal } from './components/CollectionDetailModal';
import { JournalDetailModal } from './components/JournalDetailModal';
import { InteractiveBackground } from './components/InteractiveBackground';
import { CustomCursor } from './components/CustomCursor';
import { AiFab } from './components/AiFab';
import { AiChatModal } from './components/AiChatModal';
import { CreativeBriefGenerator } from './components/CreativeBriefGenerator';
import { AiRemixPage } from './components/AiRemixPage';
import { ProjectPage } from './components/ProjectPage';
import { mockAssets } from './data/assets';
import { journalPosts } from './data/journal';
import { collections } from './data/collections';
import type { Asset, Category, Collection, JournalPost, Page } from './types';


type Theme = 'light' | 'dark';
type AuthMode = 'login' | 'signup';
type SortOrder = 'latest' | 'popular';

const App: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
    
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>('login');

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCollectionsPanelOpen, setCollectionsPanelOpen] = useState(false);
    const [wishlist, setWishlist] = useState<Asset[]>([]);
    
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [selectedJournalPost, setSelectedJournalPost] = useState<JournalPost | null>(null);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [creativeStreak, setCreativeStreak] = useState(5); // Example streak
    
    const [isAiChatModalOpen, setAiChatModalOpen] = useState(false);
    const [assetForRemix, setAssetForRemix] = useState<Asset | null>(null);


    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        setTimeout(() => {
            setAssets(mockAssets);
            setFilteredAssets(mockAssets);
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let result = assets;

        if (activeCategory !== 'all') {
            result = result.filter(asset => asset.category === activeCategory);
        }

        if (searchTerm) {
            result = result.filter(asset =>
                asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (sortOrder === 'popular') {
            result = [...result].sort((a, b) => b.popularity - a.popularity);
        } else {
            result = [...result].sort((a, b) => b.id - a.id);
        }

        setFilteredAssets(result);
    }, [searchTerm, activeCategory, assets, sortOrder]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage('home');
    };

    const handleCategorySelect = (category: Category | 'all') => {
        setActiveCategory(category);
        setCurrentPage('home');
        if (category !== 'all') {
            setSidebarOpen(true);
        }
        setTimeout(() => {
            document.getElementById('asset-grid-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };
    
    const handleAuthOpen = (mode: AuthMode) => {
        setAuthMode(mode);
        setAuthModalOpen(true);
    };
    
    const handleLogin = () => {
        setIsLoggedIn(true);
        setCreativeStreak(Math.floor(Math.random() * 10) + 1); 
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage('home');
    };

    const toggleWishlist = (asset: Asset) => {
        setWishlist(prev => 
            prev.find(item => item.id === asset.id)
                ? prev.filter(item => item.id !== asset.id)
                : [...prev, asset]
        );
    };
    
    const isAssetInWishlist = (assetId: number) => {
        return wishlist.some(item => item.id === assetId);
    };

    const handleAssetClickFromCollection = (assetId: number) => {
        const asset = mockAssets.find(a => a.id === assetId);
        if (asset) {
            setSelectedCollection(null);
            setTimeout(() => setSelectedAsset(asset), 150);
        }
    }

    const handleTagClick = (tag: string) => {
        setSelectedAsset(null);
        setSearchTerm(tag);
        setActiveCategory('all');
        setCurrentPage('home');
        setTimeout(() => {
            document.getElementById('asset-grid-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleNavigateToRemix = (asset: Asset) => {
        setSelectedAsset(null);
        setAssetForRemix(asset);
        setCurrentPage('ai-remix');
    };

    const handleProjectsNavigation = () => {
        if (isLoggedIn) {
            setCurrentPage('projects');
        } else {
            handleAuthOpen('login');
        }
    };
    
    const renderPage = () => {
        const gridTitle = sortOrder === 'popular' ? 'Koleksi Terpopuler' : 'Koleksi Terbaru';
        switch (currentPage) {
            case 'creator':
                return <CreatorPage />;
            case 'academy':
                return <JournalPage onPostClick={setSelectedJournalPost} />;
            case 'showcase':
                return <ShowcasePage />;
            case 'ai-brief':
                return <CreativeBriefGenerator />;
            case 'ai-remix':
                return <AiRemixPage 
                            selectedAsset={assetForRemix} 
                            assets={assets} 
                            onSelectAsset={setAssetForRemix} 
                            onToggleWishlist={toggleWishlist}
                            isAssetInWishlist={isAssetInWishlist}
                        />;
            case 'projects':
                return <ProjectPage />;
            case 'home':
            default:
                return (
                    <>
                        <Hero />
                        <CategoryHighlight onCategorySelect={handleCategorySelect} />
                        <CuratedCollections onCollectionClick={setSelectedCollection} />
                        <section id="asset-grid-section" className="mt-16">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                                <h2 className="text-3xl font-bold text-left">{gridTitle}</h2>
                                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                                    <button 
                                        onClick={() => setSortOrder('latest')}
                                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${sortOrder === 'latest' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        Terbaru
                                    </button>
                                    <button 
                                        onClick={() => setSortOrder('popular')}
                                        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${sortOrder === 'popular' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        Terpopuler
                                    </button>
                                </div>
                            </div>
                            <AssetGrid 
                                assets={filteredAssets} 
                                onAssetClick={setSelectedAsset}
                                isLoading={isLoading} 
                                onToggleWishlist={toggleWishlist}
                                isAssetInWishlist={isAssetInWishlist}
                            />
                        </section>
                    </>
                );
        }
    }

    return (
        <>
            <CustomCursor />
            <InteractiveBackground theme={theme} />
            <div className={`min-h-screen bg-[#f8f9fa] dark:bg-[#0d1117] text-gray-800 dark:text-gray-100 transition-colors duration-300 relative z-10`}>
                <div className="flex">
                    <Sidebar 
                        isOpen={isSidebarOpen} 
                        onClose={() => setSidebarOpen(false)} 
                        activeCategory={activeCategory}
                        onCategorySelect={setActiveCategory}
                    />
                    <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
                        <Header 
                            onSearch={handleSearch} 
                            theme={theme}
                            toggleTheme={toggleTheme}
                            onLoginClick={() => handleAuthOpen('login')}
                            onSignUpClick={() => handleAuthOpen('signup')}
                            onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                            onToggleCollections={() => setCollectionsPanelOpen(!isCollectionsPanelOpen)}
                            wishlistCount={wishlist.length}
                            onNavigate={setCurrentPage}
                            currentPage={currentPage}
                            isLoggedIn={isLoggedIn}
                            onLogout={handleLogout}
                            creativeStreak={creativeStreak}
                            onNavigateProjects={handleProjectsNavigation}
                        />
                        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                           {renderPage()}
                        </main>
                        <Footer onNavigate={setCurrentPage} />
                    </div>
                </div>
                
                <CollectionsPanel 
                    isOpen={isCollectionsPanelOpen}
                    onClose={() => setCollectionsPanelOpen(false)}
                    wishlist={wishlist}
                    onRemoveFromWishlist={toggleWishlist}
                />

                {selectedAsset && <AssetModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} journalPosts={journalPosts} onTagClick={handleTagClick} onNavigateToRemix={handleNavigateToRemix} />}
                {isAuthModalOpen && <AuthModal mode={authMode} onClose={() => setAuthModalOpen(false)} onSwitchMode={setAuthMode} onLoginSuccess={handleLogin} />}
                {selectedCollection && (
                    <CollectionDetailModal 
                        collection={selectedCollection}
                        onClose={() => setSelectedCollection(null)}
                        onAssetClick={handleAssetClickFromCollection}
                    />
                )}
                 {selectedJournalPost && (
                    <JournalDetailModal 
                        post={selectedJournalPost}
                        onClose={() => setSelectedJournalPost(null)}
                    />
                )}

                <AiFab onClick={() => setAiChatModalOpen(true)} />
                {isAiChatModalOpen && <AiChatModal onClose={() => setAiChatModalOpen(false)} currentPage={currentPage} />}
            </div>
        </>
    );
};

export default App;