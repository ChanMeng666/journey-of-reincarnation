import type { ReincarnationResult, GameMode, ModeSpecificResult, KarmaProfile } from "@/types";
import { generateModeSpecificResult, getModeLifespanModifier } from "./game-modes";
import { 
    calculateKarmaInfluence, 
    generateKarmaEvents, 
    updateKarmaProfile, 
    createInitialKarmaProfile 
} from "./karma-system";

// 国家数据配置（基于真实人口数据的加权）
const COUNTRIES_CONFIG = {
    'China': { weight: 18.5, lifeExpectancy: 77, developmentIndex: 0.76 },
    'India': { weight: 17.8, lifeExpectancy: 70, developmentIndex: 0.65 },
    'United States': { weight: 4.2, lifeExpectancy: 79, developmentIndex: 0.93 },
    'Indonesia': { weight: 3.4, lifeExpectancy: 72, developmentIndex: 0.72 },
    'Pakistan': { weight: 2.8, lifeExpectancy: 68, developmentIndex: 0.56 },
    'Brazil': { weight: 2.7, lifeExpectancy: 76, developmentIndex: 0.76 },
    'Nigeria': { weight: 2.6, lifeExpectancy: 55, developmentIndex: 0.54 },
    'Bangladesh': { weight: 2.1, lifeExpectancy: 73, developmentIndex: 0.66 },
    'Russia': { weight: 1.9, lifeExpectancy: 73, developmentIndex: 0.82 },
    'Mexico': { weight: 1.6, lifeExpectancy: 75, developmentIndex: 0.78 },
    'Japan': { weight: 1.6, lifeExpectancy: 85, developmentIndex: 0.92 },
    'Germany': { weight: 1.1, lifeExpectancy: 81, developmentIndex: 0.95 },
    'United Kingdom': { weight: 0.9, lifeExpectancy: 81, developmentIndex: 0.93 },
    'France': { weight: 0.9, lifeExpectancy: 83, developmentIndex: 0.90 },
};

// 天赋配置
const TALENTS = [
    'Musical Genius', 'Mathematical Prodigy', 'Artistic Vision', 'Athletic Excellence',
    'Linguistic Mastery', 'Scientific Innovation', 'Leadership Charisma', 'Entrepreneurial Spirit',
    'Healing Touch', 'Photographic Memory', 'Empathic Understanding', 'Strategic Mind',
    'Creative Writing', 'Technical Innovation', 'Social Networking', 'Problem Solving'
];

// 性格特征
const PERSONALITIES = [
    'Ambitious', 'Compassionate', 'Analytical', 'Creative', 'Brave', 'Wise',
    'Optimistic', 'Determined', 'Charming', 'Independent', 'Loyal', 'Curious',
    'Patient', 'Adventurous', 'Humble', 'Inspiring'
];

// 人生挑战
const CHALLENGES = [
    'Financial Hardship', 'Health Issues', 'Family Conflicts', 'Educational Barriers',
    'Cultural Discrimination', 'Natural Disasters', 'Political Instability', 'Social Isolation',
    'Career Obstacles', 'Relationship Difficulties', 'Mental Health Struggles', 'Language Barriers'
];

// 人生机遇
const OPPORTUNITIES = [
    'Educational Scholarship', 'Career Breakthrough', 'Mentor Guidance', 'Lucky Investment',
    'Talent Discovery', 'Helpful Connections', 'Innovation Opportunity', 'Travel Experiences',
    'Cultural Exchange', 'Unexpected Inheritance', 'Perfect Timing', 'Life-changing Meeting'
];

// 生肖配置
const ZODIAC_SIGNS = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

// 工具函数
const getRandomItem = <T>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
};

const getRandomItems = <T>(items: T[], count: number): T[] => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const getWeightedRandomCountry = (): string => {
    const countries = Object.keys(COUNTRIES_CONFIG);
    const weights = Object.values(COUNTRIES_CONFIG).map(config => config.weight);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    let random = Math.random() * totalWeight;
    for (let i = 0; i < countries.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return countries[i];
        }
    }
    return countries[0];
};

const calculateRarity = (result: Partial<ReincarnationResult>): ReincarnationResult['rarity'] => {
    let rarityScore = 0;
    
    // 基于各种因素计算稀有度
    if (result.socialClass === 'high') rarityScore += 2;
    if (result.health && result.health > 90) rarityScore += 2;
    if (result.luck && result.luck > 90) rarityScore += 3;
    if (result.talents && result.talents.length > 3) rarityScore += 2;
    if (result.era === 'future') rarityScore += 4;
    if (result.lifespan && result.lifespan > 100) rarityScore += 3;
    
    // 特殊国家加成
    const countryConfig = COUNTRIES_CONFIG[result.country as keyof typeof COUNTRIES_CONFIG];
    if (countryConfig && countryConfig.developmentIndex > 0.9) rarityScore += 1;
    
    if (rarityScore >= 12) return 'legendary';
    if (rarityScore >= 8) return 'epic';
    if (rarityScore >= 5) return 'rare';
    if (rarityScore >= 2) return 'uncommon';
    return 'common';
};

const generateLifespan = (country: string, socialClass: string, health: number): number => {
    const countryConfig = COUNTRIES_CONFIG[country as keyof typeof COUNTRIES_CONFIG];
    let baseLifespan = countryConfig ? countryConfig.lifeExpectancy : 72;
    
    // 社会阶层影响
    if (socialClass === 'high') baseLifespan += 8;
    else if (socialClass === 'middle') baseLifespan += 3;
    else baseLifespan -= 2;
    
    // 健康影响
    const healthModifier = (health - 50) * 0.5;
    baseLifespan += healthModifier;
    
    // 添加随机变化
    const randomVariation = (Math.random() - 0.5) * 20;
    
    return Math.max(30, Math.round(baseLifespan + randomVariation));
};

export const generateReincarnation = (
    mode: GameMode = 'classic',
    karmaProfile?: KarmaProfile
): { 
    result: ReincarnationResult, 
    modeResult?: ModeSpecificResult,
    updatedKarmaProfile?: KarmaProfile 
} => {
    const id = `reincarnation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = Date.now();
    
    // 如果没有提供业力档案，创建初始档案
    const currentKarmaProfile = karmaProfile || createInitialKarmaProfile();
    
    // 计算业力影响
    const karmaInfluence = calculateKarmaInfluence(currentKarmaProfile);
    
    // 基础属性生成
    const country = getWeightedRandomCountry();
    const gender = Math.random() < 0.504 ? 'male' : 'female';
    
    // 社会阶层权重（现实世界分布 + 业力影响）
    const socialClassRand = Math.random();
    let socialClass: 'low' | 'middle' | 'high';
    const socialClassThreshold = 0.6 + (karmaInfluence.socialClassBonus * 0.1);
    const highClassThreshold = 0.9 + (karmaInfluence.socialClassBonus * 0.05);
    
    if (socialClassRand < socialClassThreshold) socialClass = 'low';
    else if (socialClassRand < highClassThreshold) socialClass = 'middle';
    else socialClass = 'high';
    
    const birthplace = getRandomItem(['urban', 'suburban', 'rural'] as const);
    const familyStructure = Math.random() < 0.3 ? 'onlyChild' : 'siblings';
    
    // 时代生成（大部分现代）
    const eraRand = Math.random();
    let era: 'ancient' | 'medieval' | 'modern' | 'future';
    if (eraRand < 0.02) era = 'ancient';
    else if (eraRand < 0.05) era = 'medieval';
    else if (eraRand < 0.01) era = 'future';
    else era = 'modern';
    
    // 属性生成（加入业力影响）
    const baseHealth = Math.round(Math.random() * 50 + 40 + (socialClass === 'high' ? 10 : socialClass === 'middle' ? 5 : 0));
    const health = Math.max(10, Math.min(100, baseHealth + karmaInfluence.healthBonus));
    
    const baseLuck = Math.round(Math.random() * 100);
    const luck = Math.max(0, Math.min(100, baseLuck + karmaInfluence.luckBonus));
    
    // 天赋生成（稀有度影响数量 + 业力加成）
    const baseTalentCount = Math.random() < 0.1 ? 4 : Math.random() < 0.3 ? 3 : Math.random() < 0.6 ? 2 : 1;
    const talentCount = Math.min(6, baseTalentCount + karmaInfluence.talentBonus);
    const talents = getRandomItems(TALENTS, talentCount);
    
    // 性格特征
    const personalityCount = Math.random() < 0.2 ? 4 : Math.random() < 0.5 ? 3 : 2;
    const personality = getRandomItems(PERSONALITIES, personalityCount);
    
    // 挑战和机遇
    const challengeCount = Math.random() < 0.3 ? 3 : Math.random() < 0.7 ? 2 : 1;
    const challenges = getRandomItems(CHALLENGES, challengeCount);
    
    const opportunityCount = Math.random() < 0.2 ? 4 : Math.random() < 0.5 ? 3 : 2;
    const opportunities = getRandomItems(OPPORTUNITIES, opportunityCount);
    
    // 其他属性
    const birthSeason = getRandomItem(['spring', 'summer', 'autumn', 'winter'] as const);
    const zodiac = getRandomItem(ZODIAC_SIGNS);
    
    // 寿命计算（加入业力影响）
    const baseLifespan = generateLifespan(country, socialClass, health);
    const lifespan = Math.max(20, Math.round(baseLifespan + karmaInfluence.lifespanBonus));
    
    // 构建结果对象
    const result: Omit<ReincarnationResult, 'rarity'> = {
        id,
        timestamp,
        country,
        gender,
        socialClass,
        birthplace,
        familyStructure,
        era,
        talents,
        health,
        luck,
        lifespan,
        challenges,
        opportunities,
        personality,
        birthSeason,
        zodiac,
        karmaInfluence,
    };
    
    // 计算稀有度
    const rarity = calculateRarity(result);
    
    const finalResult: ReincarnationResult = {
        ...result,
        rarity,
    };
    
    // 生成模式特定内容
    let modeResult: ModeSpecificResult | undefined;
    if (mode !== 'classic') {
        modeResult = generateModeSpecificResult(mode, finalResult);
        
        // 根据模式调整寿命
        if (modeResult) {
            const modeLifespanModifier = getModeLifespanModifier(modeResult);
            finalResult.lifespan = Math.round(modeLifespanModifier * 0.3 + finalResult.lifespan * 0.7);
        }
    }
    
    // 生成业力事件
    const karmaEvents = generateKarmaEvents(finalResult, currentKarmaProfile);
    finalResult.karmaEvents = karmaEvents;
    
    // 更新业力档案
    const updatedKarmaProfile = updateKarmaProfile(currentKarmaProfile, karmaEvents);
    
    return {
        result: finalResult,
        modeResult,
        updatedKarmaProfile
    };
};
