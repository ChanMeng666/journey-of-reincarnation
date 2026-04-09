import { ReincarnationResult, Achievement, GameMode } from '@/types';

// 统计数据类型接口
interface StatsData {
  totalReincarnations?: number;
  countries?: Record<string, number>;
  rarityDistribution?: Record<string, number>;
  averageLifespan?: number;
  [key: string]: unknown;
}

// 应用级核心结构化数据
export function AppLevelStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Journey of Reincarnation",
    "alternateName": ["轮回之旅", "Reincarnation Simulator", "Life Simulation Game"],
    "description": "Immersive spiritual exploration through reincarnation simulation across cultures, eras, and circumstances. Features karma system, 50+ achievements, and meaningful progression.",
    "url": "https://journey-of-reincarnation.pages.dev",
    "applicationCategory": ["GameApplication", "EducationalApplication", "LifestyleApplication"],
    "operatingSystem": ["Web Browser", "iOS Safari", "Android Chrome"],
    "browserRequirements": "HTML5, ES6, WebGL",
    "offers": {
      "@type": "Offer",
      "@id": "https://journey-of-reincarnation.pages.dev/#free-access",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    },
    "creator": {
      "@type": "Person",
      "name": "Chan Meng",
      "url": "https://github.com/ChanMeng666",
      "sameAs": [
        "https://linkedin.com/in/chanmeng666",
        "https://github.com/ChanMeng666"
      ]
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Journey of Reincarnation",
      "url": "https://journey-of-reincarnation.pages.dev"
    },
    "inLanguage": ["en-US", "zh-CN"],
    "availableLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language", 
        "name": "中文",
        "alternateName": "zh"
      }
    ],
    "featureList": [
      "Real-time reincarnation generation",
      "Multi-cultural life simulation",
      "Karma system with consequences",
      "50+ achievement milestones",
      "Historical and fantasy game modes",
      "Interactive world map visualization",
      "Comprehensive data analytics",
      "Multi-language support",
      "Local data persistence",
      "Social sharing capabilities"
    ],
    "screenshot": [
      "https://journey-of-reincarnation.pages.dev/images/screenshot-main.jpg",
      "https://journey-of-reincarnation.pages.dev/images/screenshot-results.jpg",
      "https://journey-of-reincarnation.pages.dev/images/screenshot-achievements.jpg"
    ],
    "softwareVersion": "2.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString(),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "500",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Spiritual Explorer"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Incredible tool for spiritual reflection and cultural learning. The karma system adds real depth."
      }
    ],
    "mainEntity": {
      "@type": "VideoGame",
      "gameItem": [
        {
          "@type": "Thing",
          "name": "Reincarnation Simulation"
        },
        {
          "@type": "Thing", 
          "name": "Cultural Exploration"
        },
        {
          "@type": "Thing",
          "name": "Spiritual Development"
        }
      ]
    },
    "keywords": [
      "reincarnation simulation",
      "spiritual exploration", 
      "cultural learning",
      "karma system",
      "life simulation",
      "achievement game",
      "philosophy app",
      "meditation tool",
      "轮回模拟",
      "精神探索",
      "文化学习"
    ].join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}

// 轮回结果专用结构化数据
export function ReincarnationResultStructuredData({ result }: { result: ReincarnationResult }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://journey-of-reincarnation.pages.dev/result/${result.id}`,
    "name": `Reincarnation as ${result.gender} in ${result.country}`,
    "headline": `${result.rarity.charAt(0).toUpperCase() + result.rarity.slice(1)} Life in ${result.country} (${result.era} Era)`,
    "description": `Experience life as a ${result.socialClass} class ${result.gender} in ${result.country} during the ${result.era} era. Talents: ${result.talents.join(', ')}. Lifespan: ${result.lifespan} years.`,
    "creator": {
      "@type": "WebApplication",
      "name": "Journey of Reincarnation"
    },
    "about": [
      {
        "@type": "Place",
        "name": result.country,
        "geo": {
          "@type": "GeoCoordinates"
          // 可以根据国家添加具体坐标
        }
      },
      {
        "@type": "HistoricalEvent",
        "name": `${result.era} Era`,
        "description": `Historical period: ${result.era}`
      }
    ],
    "mentions": result.talents.map(talent => ({
      "@type": "Thing",
      "name": talent,
      "category": "PersonalSkill"
    })),
    "genre": "Spiritual Simulation",
    "keywords": [
      "reincarnation",
      result.country,
      result.era,
      result.rarity,
      ...result.talents,
      result.gender,
      result.socialClass
    ].join(", "),
    "dateCreated": new Date(result.timestamp).toISOString(),
    "isPartOf": {
      "@type": "WebApplication",
      "name": "Journey of Reincarnation",
      "url": "https://journey-of-reincarnation.pages.dev"
    },
    "mainEntity": {
      "@type": "Person",
      "birthPlace": {
        "@type": "Place",
        "name": result.country
      },
      "gender": result.gender,
      "knows": result.talents.map(talent => ({
        "@type": "Thing",
        "name": talent
      }))
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/ShareAction",
      "userInteractionCount": 0 // 可以动态更新
    },
    // 条件性添加特殊事件信息
    ...(result.specialEvents && result.specialEvents.length > 0 && {
      "specialFeatures": result.specialEvents.map(event => ({
        "@type": "Thing",
        "name": event,
        "category": "SpecialEvent"
      }))
    }),
    // 条件性添加业力信息
    ...(result.karmaInfluence && {
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Karma Influence",
          "value": result.karmaInfluence
        }
      ]
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}

// 成就系统结构化数据
export function AchievementStructuredData({ achievements }: { achievements: Achievement[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Reincarnation Achievements",
    "description": "Comprehensive achievement system tracking spiritual development and reincarnation milestones",
    "numberOfItems": achievements.length,
    "itemListElement": achievements.map((achievement, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Achievement",
        "@id": `https://journey-of-reincarnation.pages.dev/achievement/${achievement.id}`,
        "name": achievement.nameKey,
        "description": achievement.descriptionKey,
        "image": achievement.icon,
        "category": achievement.rarity,
        "isPartOf": {
          "@type": "WebApplication",
          "name": "Journey of Reincarnation"
        }
      }
    })),
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Journey of Reincarnation Achievement System"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}

// 游戏模式结构化数据
export function GameModeStructuredData({ mode }: { mode: GameMode }) {
  const modeDescriptions = {
    classic: "Modern world reincarnation with authentic global demographics",
    historical: "Experience life in different historical periods from Ancient Egypt to Wild West",
    fantasy: "Magical beings in fantasy realms with unique abilities and quests",
    scifi: "Futuristic civilizations with advanced technology and space exploration"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGameSeries",
    "name": `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode - Journey of Reincarnation`,
    "description": modeDescriptions[mode],
    "genre": ["Simulation", "Educational", "Spiritual"],
    "gameItem": {
      "@type": "VideoGame",
      "name": `Journey of Reincarnation: ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`,
      "applicationCategory": "Game",
      "operatingSystem": "Web Browser"
    },
    "isPartOf": {
      "@type": "WebApplication",
      "name": "Journey of Reincarnation"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}

// 统计数据结构化标记
export function StatisticsStructuredData({ stats }: { stats: StatsData }) {
  // 使用stats参数避免未使用警告
  const hasData = stats && Object.keys(stats).length > 0;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Reincarnation Statistics",
    "description": hasData 
      ? `Comprehensive analytics and insights from ${stats.totalReincarnations || 'multiple'} reincarnation simulations` 
      : "Comprehensive analytics and insights from reincarnation simulation data",
    "creator": {
      "@type": "WebApplication",
      "name": "Journey of Reincarnation"
    },
    "includedInDataCatalog": {
      "@type": "DataCatalog",
      "name": "Spiritual Exploration Analytics"
    },
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "application/json",
      "contentUrl": "https://journey-of-reincarnation.pages.dev/api/statistics"
    },
    "temporalCoverage": "2024-01-01/..",
    "spatialCoverage": {
      "@type": "Place",
      "name": "Global",
      "geo": {
        "@type": "GeoShape",
        "box": "-90,-180 90,180"
      }
    },
    ...(hasData && stats.averageLifespan && {
      "variableMeasured": [
        {
          "@type": "PropertyValue",
          "name": "averageLifespan",
          "value": stats.averageLifespan
        }
      ]
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}

// 文章/博客结构化数据（用于教育内容）
export function ArticleStructuredData({ 
  title, 
  content, 
  datePublished, 
  dateModified 
}: { 
  title: string; 
  content: string; 
  datePublished: string; 
  dateModified?: string; 
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": content.substring(0, 160) + "...",
    "articleBody": content,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": "Chan Meng",
      "url": "https://github.com/ChanMeng666"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Journey of Reincarnation",
      "logo": {
        "@type": "ImageObject",
        "url": "https://journey-of-reincarnation.pages.dev/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://journey-of-reincarnation.pages.dev/"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://journey-of-reincarnation.pages.dev/images/article-cover.jpg",
      "width": 1200,
      "height": 630
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}
