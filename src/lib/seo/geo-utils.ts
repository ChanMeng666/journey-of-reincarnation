import { ReincarnationResult } from '@/types';

// GEO分析和优化工具函数

/**
 * 生成AI友好的内容摘要
 */
export function generateAIContentSummary(
  result: ReincarnationResult,
  language: 'en' | 'zh' = 'en'
): string {
  const templates = {
    en: `Life as a ${result.gender} in ${result.country} during the ${result.era} era. 
Social class: ${result.socialClass}. 
Talents: ${result.talents.join(', ')}. 
Lifespan: ${result.lifespan} years. 
Rarity: ${result.rarity}.
${result.specialEvents?.length ? `Special events: ${result.specialEvents.join(', ')}.` : ''}
Perfect for exploring ${result.country === 'China' ? 'Chinese culture and traditions' : 
  result.country === 'Japan' ? 'Japanese heritage and philosophy' :
  result.country === 'India' ? 'Indian spirituality and diversity' :
  `${result.country} culture and lifestyle`}.`,
    zh: `在${result.era}时代的${result.country}${result.gender === 'male' ? '男性' : '女性'}生活。
社会阶层：${result.socialClass === 'high' ? '高收入' : result.socialClass === 'middle' ? '中等收入' : '低收入'}。
天赋：${result.talents.join('，')}。
寿命：${result.lifespan}年。
稀有度：${result.rarity === 'legendary' ? '传奇' : result.rarity === 'epic' ? '史诗' : result.rarity === 'rare' ? '稀有' : result.rarity === 'uncommon' ? '不凡' : '普通'}。
${result.specialEvents?.length ? `特殊事件：${result.specialEvents.join('，')}。` : ''}
非常适合探索${result.country === 'China' ? '中国文化和传统' : 
  result.country === 'Japan' ? '日本传统和哲学' :
  result.country === 'India' ? '印度精神性和多样性' :
  `${result.country}文化和生活方式`}。`
  };
  
  return templates[language];
}

/**
 * 分析轮回结果的教育价值关键词
 */
export function extractEducationalKeywords(
  result: ReincarnationResult,
  language: 'en' | 'zh' = 'en'
): string[] {
  const keywordMaps = {
    en: {
      countries: {
        'China': ['Chinese culture', 'East Asian philosophy', 'Confucianism', 'Buddhism'],
        'India': ['Indian spirituality', 'Hinduism', 'Buddhism', 'cultural diversity'],
        'Japan': ['Japanese traditions', 'Shinto', 'Zen Buddhism', 'cultural refinement'],
        'United States': ['American dream', 'cultural melting pot', 'democracy', 'innovation'],
        'Brazil': ['Latin American culture', 'diversity', 'carnival culture', 'tropical lifestyle'],
        'Germany': ['European heritage', 'engineering excellence', 'historical depth', 'precision'],
        'France': ['French culture', 'art and philosophy', 'culinary excellence', 'romanticism'],
        'United Kingdom': ['British heritage', 'parliamentary democracy', 'literary tradition', 'global influence'],
        'Russia': ['Slavic culture', 'Orthodox Christianity', 'vast geography', 'literary giants'],
        'Mexico': ['Mexican culture', 'ancient civilizations', 'vibrant traditions', 'family values'],
        'Nigeria': ['African culture', 'tribal diversity', 'oral traditions', 'communal values'],
        'Pakistan': ['Islamic culture', 'South Asian heritage', 'hospitality', 'resilience'],
        'Indonesia': ['Southeast Asian culture', 'island diversity', 'Islamic traditions', 'natural beauty'],
        'Bangladesh': ['Bengali culture', 'river life', 'textile traditions', 'monsoon seasons']
      },
      eras: {
        'ancient': ['ancient history', 'early civilizations', 'traditional wisdom', 'simple living'],
        'medieval': ['medieval period', 'feudalism', 'religious influence', 'craftsmanship'],
        'modern': ['contemporary life', 'technological advancement', 'global connectivity', 'urban living'],
        'future': ['futuristic scenarios', 'technological integration', 'space age', 'advanced society']
      },
      rarity: {
        'legendary': ['exceptional circumstances', 'rare opportunities', 'extraordinary potential'],
        'epic': ['remarkable life', 'significant impact', 'notable achievements'],
        'rare': ['uncommon circumstances', 'special talents', 'unique opportunities'],
        'uncommon': ['distinctive traits', 'moderate advantages', 'interesting life'],
        'common': ['everyday life', 'ordinary circumstances', 'typical experiences']
      }
    },
    zh: {
      countries: {
        'China': ['中国文化', '东亚哲学', '儒家思想', '佛教'],
        'India': ['印度精神性', '印度教', '佛教', '文化多样性'],
        'Japan': ['日本传统', '神道教', '禅宗', '文化精致'],
        'United States': ['美国梦', '文化大熔炉', '民主制度', '创新精神'],
        'Brazil': ['拉美文化', '多样性', '嘉年华文化', '热带生活'],
        'Germany': ['欧洲传统', '工程卓越', '历史深度', '精密制造'],
        'France': ['法国文化', '艺术哲学', '美食卓越', '浪漫主义'],
        'United Kingdom': ['英国传统', '议会民主', '文学传统', '全球影响'],
        'Russia': ['斯拉夫文化', '东正教', '广阔地域', '文学巨匠'],
        'Mexico': ['墨西哥文化', '古代文明', '活力传统', '家庭价值'],
        'Nigeria': ['非洲文化', '部落多样性', '口述传统', '社区价值'],
        'Pakistan': ['伊斯兰文化', '南亚传统', '好客精神', '坚韧品质'],
        'Indonesia': ['东南亚文化', '岛屿多样性', '伊斯兰传统', '自然美景'],
        'Bangladesh': ['孟加拉文化', '河流生活', '纺织传统', '季风季节']
      },
      eras: {
        'ancient': ['古代历史', '早期文明', '传统智慧', '简朴生活'],
        'medieval': ['中世纪', '封建制度', '宗教影响', '手工艺'],
        'modern': ['当代生活', '技术进步', '全球连接', '城市生活'],
        'future': ['未来场景', '技术整合', '太空时代', '先进社会']
      },
      rarity: {
        'legendary': ['非凡环境', '稀有机遇', '卓越潜力'],
        'epic': ['卓越人生', '重大影响', '显著成就'],
        'rare': ['不寻常环境', '特殊天赋', '独特机遇'],
        'uncommon': ['独特特质', '适度优势', '有趣人生'],
        'common': ['日常生活', '普通环境', '典型体验']
      }
    }
  };

  const keywords: string[] = [];
  
  // 添加国家相关关键词
  const countryMaps = keywordMaps[language].countries as Record<string, string[]>;
  if (countryMaps[result.country]) {
    keywords.push(...countryMaps[result.country]);
  }
  
  // 添加时代相关关键词
  const eraMaps = keywordMaps[language].eras as Record<string, string[]>;
  if (eraMaps[result.era]) {
    keywords.push(...eraMaps[result.era]);
  }
  
  // 添加稀有度相关关键词
  const rarityMaps = keywordMaps[language].rarity as Record<string, string[]>;
  if (rarityMaps[result.rarity]) {
    keywords.push(...rarityMaps[result.rarity]);
  }
  
  // 添加天赋相关关键词
  keywords.push(...result.talents);
  
  // 添加特殊事件关键词
  if (result.specialEvents) {
    keywords.push(...result.specialEvents.map(event => 
      language === 'zh' ? 
        event === 'twinBirth' ? '双生子' :
        event === 'prodigy' ? '神童' :
        event === 'historicalFigure' ? '历史人物' :
        event === 'timeTraveler' ? '时空旅者' :
        event === 'prophetic' ? '预言之眼' :
        event === 'miraculous' ? '奇迹事件' : event
      : event
    ));
  }
  
  return [...new Set(keywords)]; // 去重
}

/**
 * 生成推荐查询列表
 */
export function generateRecommendationQueries(
  result: ReincarnationResult,
  language: 'en' | 'zh' = 'en'
): string[] {
  const queryTemplates = {
    en: [
      `Experience life in ${result.country}`,
      `${result.era} era simulation`,
      `Cultural exploration of ${result.country}`,
      `Spiritual growth through life simulation`,
      `${result.rarity} life experiences`,
      `Understanding ${result.socialClass} social class`,
      `${result.talents.join(' and ')} talent development`,
      'Reincarnation and karma exploration',
      'Meaningful life simulation games',
      'Cultural diversity learning tools'
    ],
    zh: [
      `体验${result.country}生活`,
      `${result.era}时代模拟`,
      `${result.country}文化探索`,
      `通过生活模拟的精神成长`,
      `${result.rarity === 'legendary' ? '传奇' : result.rarity === 'epic' ? '史诗' : result.rarity === 'rare' ? '稀有' : '独特'}生活体验`,
      `了解${result.socialClass === 'high' ? '高收入' : result.socialClass === 'middle' ? '中等收入' : '低收入'}社会阶层`,
      `${result.talents.join('和')}天赋发展`,
      '轮回和业力探索',
      '有意义的生活模拟游戏',
      '文化多样性学习工具'
    ]
  };
  
  return queryTemplates[language];
}

/**
 * 计算内容的GEO优化分数
 */
export function calculateGEOScore(content: {
  hasAIInstructions: boolean;
  hasStructuredData: boolean;
  hasMultiLanguage: boolean;
  hasMetaTags: boolean;
  hasSocialTags: boolean;
  hasCanonicalUrl: boolean;
  contentLength: number;
  keywordDensity: number;
}): number {
  let score = 0;
  
  // AI指令 (25分)
  if (content.hasAIInstructions) score += 25;
  
  // 结构化数据 (20分)
  if (content.hasStructuredData) score += 20;
  
  // 多语言支持 (15分)
  if (content.hasMultiLanguage) score += 15;
  
  // Meta标签 (15分)
  if (content.hasMetaTags) score += 15;
  
  // 社交标签 (10分)
  if (content.hasSocialTags) score += 10;
  
  // 规范URL (5分)
  if (content.hasCanonicalUrl) score += 5;
  
  // 内容长度奖励 (0-5分)
  if (content.contentLength > 1000) score += 5;
  else if (content.contentLength > 500) score += 3;
  else if (content.contentLength > 200) score += 1;
  
  // 关键词密度奖励 (0-5分)
  if (content.keywordDensity >= 0.01 && content.keywordDensity <= 0.03) score += 5;
  else if (content.keywordDensity >= 0.005 && content.keywordDensity <= 0.05) score += 3;
  else if (content.keywordDensity > 0) score += 1;
  
  return Math.min(score, 100);
}

/**
 * 生成AI推荐跟踪参数
 */
export function generateAITrackingParams(source: string, query?: string, context?: string): URLSearchParams {
  const params = new URLSearchParams();
  
  params.set('utm_source', source); // 'chatgpt', 'claude', 'gemini', etc.
  params.set('utm_medium', 'ai_recommendation');
  params.set('utm_campaign', 'geo_optimization');
  params.set('utm_content', context || 'spiritual_exploration');
  
  if (query) {
    params.set('utm_term', encodeURIComponent(query.substring(0, 100)));
  }
  
  params.set('ref', 'ai');
  params.set('timestamp', Date.now().toString());
  
  return params;
}

/**
 * 验证结构化数据格式
 */
export function validateStructuredData(data: Record<string, unknown>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // 基础验证
  if (!data['@context']) {
    errors.push('Missing @context');
  }
  
  if (!data['@type']) {
    errors.push('Missing @type');
  }
  
  if (!data.name) {
    errors.push('Missing name property');
  }
  
  if (!data.description) {
    errors.push('Missing description property');
  }
  
  // URL验证
  if (data.url && typeof data.url === 'string' && !data.url.startsWith('https://')) {
    errors.push('URL should use HTTPS');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 生成sitemap条目
 */
export function generateSitemapEntry(
  url: string,
  options: {
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternateUrls?: { lang: string; url: string }[];
  } = {}
): string {
  const {
    lastmod = new Date().toISOString().split('T')[0],
    changefreq = 'weekly',
    priority = 0.5,
    alternateUrls = []
  } = options;
  
  let entry = `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;
  
  // 添加多语言链接
  if (alternateUrls.length > 0) {
    alternateUrls.forEach(({ lang, url: altUrl }) => {
      entry += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}" />`;
    });
  }
  
  entry += `
  </url>`;
  
  return entry;
}
