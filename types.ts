export enum Category {
  IG_FEED = 'Template IG Feed',
  TIKTOK_VIDEO = 'Template TikTok Video',
  SHOPEE_BANNER = 'Template Shopee Banner',
}

export interface Asset {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  tags: string[];
  description: string;
  license: string;
  fileUrl: string; // Mock download URL
  popularity: number;
  downloads: number;
  pro: boolean;
  relatedJournalId?: number;
  remixCount: number;
}

export interface Collection {
  id: number;
  title: string;
  description: string;
  assetIds: number[];
}

export interface ShowcaseItem {
  id: number;
  author: string;
  authorUrl?: string;
  imageUrl: string;
  usedTemplateId: number;
}

export interface JournalPost {
    id: number;
    type: 'article' | 'video';
    title: string;
    excerpt: string;
    imageUrl: string;
    publishDate: string;
    readTime: string;
    videoUrl?: string;
    author: {
        name: string;
        avatarUrl: string;
    };
    content?: string;
}

export interface Project {
  id: number;
  name: string;
  assetIds: number[];
  briefs: any[];
  remixes: any[];
  lastUpdated: string;
}

// Centralized Page type to be used across components.
export type Page = 'home' | 'creator' | 'academy' | 'showcase' | 'ai-brief' | 'projects' | 'ai-remix';

export interface DesignChallenge {
  id: number;
  title: string;
  description: string;
  templateId: number;
  endDate: string;
}