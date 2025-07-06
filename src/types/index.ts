// 业力系统相关类型
export interface KarmaRecord {
    id: string;
    lifeId: string;
    timestamp: number;
    actionType: KarmaActionType;
    value: number; // -100 to 100
    description: string; // Translation key for the event description
    category: KarmaCategory;
    country: string; // Country where the event occurred
}

export type KarmaActionType = 
    | 'moral_choice' 
    | 'helping_others' 
    | 'causing_harm' 
    | 'charity' 
    | 'greed' 
    | 'wisdom_sharing' 
    | 'environmental_action' 
    | 'leadership' 
    | 'betrayal' 
    | 'sacrifice' 
    | 'innovation' 
    | 'destruction';

export type KarmaCategory = 'moral' | 'social' | 'environmental' | 'intellectual' | 'spiritual';

export interface KarmaProfile {
    totalKarma: number;
    moralKarma: number;
    socialKarma: number;
    environmentalKarma: number;
    intellectualKarma: number;
    spiritualKarma: number;
    lifeCount: number;
    lastUpdated: number;
}

export interface SoulLevel {
    level: number;
    experience: number;
    experienceToNext: number;
    unlockedAbilities: string[];
    titleKey: string;
}

export interface ReincarnationResult {
    country: string;
    gender: 'male' | 'female';
    socialClass: 'low' | 'middle' | 'high';
    birthplace: 'urban' | 'suburban' | 'rural';
    familyStructure: 'onlyChild' | 'siblings';
    era: 'ancient' | 'medieval' | 'modern' | 'future';
    talents: string[];
    health: number;
    luck: number;
    lifespan: number;
    challenges: string[];
    opportunities: string[];
    personality: string[];
    birthSeason: 'spring' | 'summer' | 'autumn' | 'winter';
    zodiac: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    id: string;
    timestamp: number;
    karmaInfluence?: {
        healthBonus: number;
        luckBonus: number;
        talentBonus: number;
        socialClassBonus: number;
        lifespanBonus: number;
        specialAbilities: string[];
    };
    karmaEvents?: KarmaRecord[];
    specialEvents?: SpecialEventType[];
}

export type SpecialEventType = 'twinBirth' | 'prodigy' | 'historicalFigure' | 'timeTraveler' | 'prophetic' | 'miraculous';

export interface Achievement {
    id: string;
    nameKey: string;
    descriptionKey: string;
    icon: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    condition: (results: ReincarnationResult[]) => boolean;
    unlockedAt?: number;
}

export interface UserStatistics {
    totalReincarnations: number;
    favoriteCountry: string;
    averageLifespan: number;
    totalSpecialEvents: number;
    unlockedAchievements: string[];
    rarityDistribution: Record<string, number>;
    genderDistribution: Record<string, number>;
    classDistribution: Record<string, number>;
}

export interface GameConfig {
    enableSound: boolean;
    enableMusic: boolean;
    language: 'en' | 'zh';
    theme: 'light' | 'dark' | 'system';
    animationsEnabled: boolean;
}

// 人生阶段系统
export type LifeStage = 'childhood' | 'adolescence' | 'youth' | 'adulthood' | 'middleAge' | 'elderlyAge';

// 决策选项
export interface DecisionOption {
    id: string;
    text: string;
    consequences: {
        health?: number;
        wealth?: number;
        happiness?: number;
        relationships?: number;
        education?: number;
        career?: number;
    };
    requirements?: {
        minAge?: number;
        maxAge?: number;
        talents?: string[];
        socialClass?: ReincarnationResult['socialClass'][];
    };
}

// 人生决策
export interface LifeDecision {
    id: string;
    stage: LifeStage;
    age: number;
    situation: string;
    description: string;
    options: DecisionOption[];
    timeLimit?: number; // 决策时间限制（秒）
}

// 人生事件结果
export interface LifeEventResult {
    decisionId: string;
    chosenOptionId: string;
    consequences: DecisionOption['consequences'];
    timestamp: number;
}

// 扩展轮回结果，添加人生历程
export interface EnhancedReincarnationResult extends ReincarnationResult {
    lifeJourney?: {
        currentStage: LifeStage;
        currentAge: number;
        attributes: {
            health: number;
            wealth: number;
            happiness: number;
            relationships: number;
            education: number;
            career: number;
        };
        decisions: LifeEventResult[];
        milestones: string[];
        isCompleted: boolean;
    };
}

// 社交分享数据
export interface ShareData {
    type: 'reincarnation' | 'achievement' | 'journey';
    title: string;
    description: string;
    imageUrl?: string;
    stats?: {
        rarity: string;
        country: string;
        lifespan: number;
        achievements: number;
    };
}

// 游戏模式系统
export type GameMode = 'classic' | 'historical' | 'fantasy' | 'scifi';

export interface GameModeConfig {
    id: GameMode;
    name: string;
    description: string;
    icon: string;
    isUnlocked: boolean;
    unlockRequirement?: {
        reincarnations?: number;
        achievements?: string[];
        rarity?: ReincarnationResult['rarity'][];
    };
}

// 历史时期定义
export interface HistoricalPeriod {
    id: string;
    name: string;
    timeRange: string;
    description: string;
    countries: string[];
    socialClasses: string[];
    specialEvents: string[];
    lifeExpectancy: { min: number; max: number };
    technologies: string[];
    diseases: string[];
    opportunities: string[];
}

// 幻想种族定义
export interface FantasyRace {
    id: string;
    name: string;
    description: string;
    lifespan: { min: number; max: number };
    abilities: string[];
    weaknesses: string[];
    habitats: string[];
    socialStructure: string[];
    magicAffinity: number; // 0-100
    physicalStrength: number; // 0-100
    intelligence: number; // 0-100
}

// 科幻设定
export interface SciFiSetting {
    id: string;
    name: string;
    year: number;
    description: string;
    planets: string[];
    technologies: string[];
    factions: string[];
    augmentations: string[];
    threats: string[];
    lifeExpectancy: { min: number; max: number };
}

// 扩展轮回结果，支持不同模式
export interface ModeSpecificResult {
    mode: GameMode;
    historical?: {
        period: HistoricalPeriod;
        historicalFigure?: string;
        majorEvents: string[];
        discoveries?: string[];
        plagues?: string[];
    };
    fantasy?: {
        race: FantasyRace;
        magicLevel: number;
        questsCompleted: string[];
        artifacts: string[];
        companions: string[];
        enemiesDefeated: string[];
    };
    scifi?: {
        setting: SciFiSetting;
        planet: string;
        faction: string;
        augmentations: string[];
        spaceTravel: boolean;
        alienContacts: string[];
        techLevel: number;
    };
}

// 排行榜系统
export interface LeaderboardEntry {
    id: string;
    playerName: string;
    score: number;
    rank: number;
    reincarnations: number;
    achievements: number;
    rareLifeCount: number;
    favoriteCountry: string;
    totalLifespan: number;
    createdAt: number;
}

export interface LeaderboardConfig {
    type: 'score' | 'reincarnations' | 'achievements' | 'lifespan';
    timeFrame: 'daily' | 'weekly' | 'monthly' | 'allTime';
    mode?: GameMode;
}
