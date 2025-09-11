// SEO组件导出文件
export { default as GEOHead } from './geo-head';
export { 
  AppLevelStructuredData,
  ReincarnationResultStructuredData,
  AchievementStructuredData,
  GameModeStructuredData,
  StatisticsStructuredData,
  ArticleStructuredData
} from './structured-data';

// 类型定义
export interface SEOConfig {
  pageType: 'home' | 'result' | 'achievements' | 'data-viz' | 'game-mode' | 'karma' | 'leaderboard';
  language?: 'en' | 'zh';
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

// 便捷的SEO配置预设
export const SEO_PRESETS = {
  home: {
    en: {
      title: 'Journey of Reincarnation - Spiritual Exploration & Cultural Immersion',
      description: 'Explore spiritual reincarnation simulation across 14 countries and historical eras. Experience karma systems, 50+ achievements, and meaningful cultural learning.',
      keywords: ['reincarnation simulation', 'spiritual exploration', 'cultural learning', 'karma system', 'life simulation']
    },
    zh: {
      title: '轮回之旅 - 精神探索与文化沉浸模拟',
      description: '探索跨越14个国家和历史时代的精神轮回模拟。体验业力系统、50+成就和有意义的文化学习。',
      keywords: ['轮回模拟', '精神探索', '文化学习', '业力系统', '生活模拟']
    }
  },
  achievements: {
    en: {
      title: 'Achievement System - Journey of Reincarnation',
      description: 'Unlock 50+ reincarnation achievements: geographic, talent-based, rarity, and special event milestones. Track your spiritual development progress.',
      keywords: ['achievements', 'milestones', 'spiritual progress', 'reincarnation goals']
    },
    zh: {
      title: '成就系统 - 轮回之旅',
      description: '解锁50+轮回成就：地理、天赋、稀有度和特殊事件里程碑。追踪您的精神发展进程。',
      keywords: ['成就', '里程碑', '精神进步', '轮回目标']
    }
  },
  dataVisualization: {
    en: {
      title: 'Data Visualization - Journey of Reincarnation',
      description: 'Comprehensive analytics of your reincarnation patterns, karma development, and spiritual growth across multiple lives.',
      keywords: ['data visualization', 'analytics', 'spiritual growth tracking', 'reincarnation patterns']
    },
    zh: {
      title: '数据可视化 - 轮回之旅',
      description: '全面分析您的轮回模式、业力发展和跨多个生命的精神成长。',
      keywords: ['数据可视化', '分析', '精神成长追踪', '轮回模式']
    }
  }
} as const;
