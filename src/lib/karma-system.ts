import type { ReincarnationResult } from "@/types";

// 业力类型定义
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

// 业力动作配置
export const KARMA_ACTIONS: Record<KarmaActionType, {
    nameKey: string;
    descriptionKey: string;
    category: KarmaCategory;
    valueRange: [number, number];
}> = {
    moral_choice: {
        nameKey: 'karma.actions.moral_choice.name',
        descriptionKey: 'karma.actions.moral_choice.description',
        category: 'moral',
        valueRange: [5, 25]
    },
    helping_others: {
        nameKey: 'karma.actions.helping_others.name',
        descriptionKey: 'karma.actions.helping_others.description',
        category: 'social',
        valueRange: [3, 15]
    },
    causing_harm: {
        nameKey: 'karma.actions.causing_harm.name',
        descriptionKey: 'karma.actions.causing_harm.description',
        category: 'moral',
        valueRange: [-25, -5]
    },
    charity: {
        nameKey: 'karma.actions.charity.name',
        descriptionKey: 'karma.actions.charity.description',
        category: 'social',
        valueRange: [8, 20]
    },
    greed: {
        nameKey: 'karma.actions.greed.name',
        descriptionKey: 'karma.actions.greed.description',
        category: 'moral',
        valueRange: [-20, -8]
    },
    wisdom_sharing: {
        nameKey: 'karma.actions.wisdom_sharing.name',
        descriptionKey: 'karma.actions.wisdom_sharing.description',
        category: 'intellectual',
        valueRange: [5, 18]
    },
    environmental_action: {
        nameKey: 'karma.actions.environmental_action.name',
        descriptionKey: 'karma.actions.environmental_action.description',
        category: 'environmental',
        valueRange: [10, 30]
    },
    leadership: {
        nameKey: 'karma.actions.leadership.name',
        descriptionKey: 'karma.actions.leadership.description',
        category: 'social',
        valueRange: [15, 35]
    },
    betrayal: {
        nameKey: 'karma.actions.betrayal.name',
        descriptionKey: 'karma.actions.betrayal.description',
        category: 'moral',
        valueRange: [-30, -10]
    },
    sacrifice: {
        nameKey: 'karma.actions.sacrifice.name',
        descriptionKey: 'karma.actions.sacrifice.description',
        category: 'spiritual',
        valueRange: [20, 50]
    },
    innovation: {
        nameKey: 'karma.actions.innovation.name',
        descriptionKey: 'karma.actions.innovation.description',
        category: 'intellectual',
        valueRange: [12, 25]
    },
    destruction: {
        nameKey: 'karma.actions.destruction.name',
        descriptionKey: 'karma.actions.destruction.description',
        category: 'environmental',
        valueRange: [-25, -10]
    }
};

// 灵魂等级配置
export const SOUL_LEVELS = [
    { level: 1, expRequired: 0, titleKey: 'karma.levels.1', abilities: [] },
    { level: 2, expRequired: 100, titleKey: 'karma.levels.2', abilities: ['karma_sight'] },
    { level: 3, expRequired: 250, titleKey: 'karma.levels.3', abilities: ['karma_sight', 'life_preview'] },
    { level: 4, expRequired: 500, titleKey: 'karma.levels.4', abilities: ['karma_sight', 'life_preview', 'talent_boost'] },
    { level: 5, expRequired: 1000, titleKey: 'karma.levels.5', abilities: ['karma_sight', 'life_preview', 'talent_boost', 'fate_influence'] },
    { level: 6, expRequired: 2000, titleKey: 'karma.levels.6', abilities: ['karma_sight', 'life_preview', 'talent_boost', 'fate_influence', 'karma_transfer'] },
    { level: 7, expRequired: 4000, titleKey: 'karma.levels.7', abilities: ['karma_sight', 'life_preview', 'talent_boost', 'fate_influence', 'karma_transfer', 'time_perception'] },
    { level: 8, expRequired: 8000, titleKey: 'karma.levels.8', abilities: ['karma_sight', 'life_preview', 'talent_boost', 'fate_influence', 'karma_transfer', 'time_perception', 'reality_bend'] },
    { level: 9, expRequired: 15000, titleKey: 'karma.levels.9', abilities: ['karma_sight', 'life_preview', 'talent_boost', 'fate_influence', 'karma_transfer', 'time_perception', 'reality_bend', 'omniscience'] },
    { level: 10, expRequired: 30000, titleKey: 'karma.levels.10', abilities: ['karma_sight', 'life_preview', 'talent_boost', 'fate_influence', 'karma_transfer', 'time_perception', 'reality_bend', 'omniscience', 'creation_power'] }
];

// 计算业力影响
export const calculateKarmaInfluence = (karmaProfile: KarmaProfile): {
    healthBonus: number;
    luckBonus: number;
    talentBonus: number;
    socialClassBonus: number;
    lifespanBonus: number;
    specialAbilities: string[];
} => {
    const totalKarma = karmaProfile.totalKarma;
    const soulLevel = calculateSoulLevel(karmaProfile);
    
    // 基础属性加成
    const healthBonus = Math.max(-20, Math.min(30, totalKarma * 0.15));
    const luckBonus = Math.max(-25, Math.min(35, totalKarma * 0.2));
    const lifespanBonus = Math.max(-15, Math.min(25, totalKarma * 0.1));
    
    // 天赋加成（基于不同类型业力）
    let talentBonus = 0;
    if (karmaProfile.intellectualKarma > 50) talentBonus += 1;
    if (karmaProfile.spiritualKarma > 100) talentBonus += 1;
    if (karmaProfile.socialKarma > 75) talentBonus += 1;
    
    // 社会阶层影响
    let socialClassBonus = 0;
    if (totalKarma > 200) socialClassBonus = 2; // 更容易生于高阶层
    else if (totalKarma > 100) socialClassBonus = 1;
    else if (totalKarma < -100) socialClassBonus = -1;
    else if (totalKarma < -200) socialClassBonus = -2;
    
    return {
        healthBonus,
        luckBonus,
        talentBonus,
        socialClassBonus,
        lifespanBonus,
        specialAbilities: soulLevel.unlockedAbilities
    };
};

// 计算灵魂等级
export const calculateSoulLevel = (karmaProfile: KarmaProfile): SoulLevel => {
    const totalExp = Math.max(0, karmaProfile.totalKarma + (karmaProfile.lifeCount * 10));
    
    for (let i = SOUL_LEVELS.length - 1; i >= 0; i--) {
        const level = SOUL_LEVELS[i];
        if (totalExp >= level.expRequired) {
            const nextLevel = SOUL_LEVELS[i + 1];
            return {
                level: level.level,
                experience: totalExp,
                experienceToNext: nextLevel ? nextLevel.expRequired - totalExp : 0,
                unlockedAbilities: level.abilities,
                titleKey: level.titleKey
            };
        }
    }
    
    return {
        level: 1,
        experience: totalExp,
        experienceToNext: SOUL_LEVELS[1].expRequired - totalExp,
        unlockedAbilities: [],
        titleKey: 'karma.levels.1'
    };
};

// 生成生命历程中的业力事件
export const generateKarmaEvents = (
    result: ReincarnationResult,
    karmaProfile: KarmaProfile
): KarmaRecord[] => {
    const events: KarmaRecord[] = [];
    const lifeStages = [
        { stage: 'childhood', ageRange: [5, 12], eventCount: 1 },
        { stage: 'youth', ageRange: [13, 25], eventCount: 2 },
        { stage: 'adulthood', ageRange: [26, 50], eventCount: 3 },
        { stage: 'middle_age', ageRange: [51, 70], eventCount: 2 },
        { stage: 'old_age', ageRange: [71, result.lifespan], eventCount: 1 }
    ];
    
    lifeStages.forEach(stage => {
        if (result.lifespan > stage.ageRange[0]) {
            for (let i = 0; i < stage.eventCount; i++) {
                const event = generateRandomKarmaEvent(result, karmaProfile);
                if (event) {
                    events.push(event);
                }
            }
        }
    });
    
    return events;
};

// 生成随机业力事件
const generateRandomKarmaEvent = (
    result: ReincarnationResult,
    karmaProfile: KarmaProfile
): KarmaRecord | null => {
    const actionTypes = Object.keys(KARMA_ACTIONS) as KarmaActionType[];
    const soulLevel = calculateSoulLevel(karmaProfile);
    
    // 根据灵魂等级和人生背景调整事件概率
    const weightedActions = actionTypes.filter(action => {
        const actionConfig = KARMA_ACTIONS[action];
        
        // 高灵魂等级更倾向于正面行为
        if (soulLevel.level > 5 && actionConfig.valueRange[1] < 0) {
            return Math.random() < 0.3; // 30% 概率出现负面行为
        }
        
        // 低业力更容易出现负面行为
        if (karmaProfile.totalKarma < -50 && actionConfig.valueRange[0] > 0) {
            return Math.random() < 0.7; // 70% 概率出现正面行为
        }
        
        return true;
    });
    
    if (weightedActions.length === 0) return null;
    
    const selectedAction = weightedActions[Math.floor(Math.random() * weightedActions.length)];
    const actionConfig = KARMA_ACTIONS[selectedAction];
    
    const value = Math.floor(
        Math.random() * (actionConfig.valueRange[1] - actionConfig.valueRange[0] + 1) + 
        actionConfig.valueRange[0]
    );
    
    return {
        id: `karma_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        lifeId: result.id,
        timestamp: Date.now(),
        actionType: selectedAction,
        value,
        description: generateKarmaDescriptionKey(selectedAction, value),
        category: actionConfig.category,
        country: result.country
    };
};

// 生成业力描述键
const generateKarmaDescriptionKey = (
    action: KarmaActionType,
    value: number
): string => {
    const descriptionKeys: Record<KarmaActionType, (value: number) => string> = {
        moral_choice: (v) => v > 0 ? 
            'karma.eventDescriptions.moral_choice_positive' : 
            'karma.eventDescriptions.moral_choice_negative',
        helping_others: () => 'karma.eventDescriptions.helping_others',
        causing_harm: () => 'karma.eventDescriptions.causing_harm',
        charity: () => 'karma.eventDescriptions.charity',
        greed: () => 'karma.eventDescriptions.greed',
        wisdom_sharing: () => 'karma.eventDescriptions.wisdom_sharing',
        environmental_action: () => 'karma.eventDescriptions.environmental_action',
        leadership: () => 'karma.eventDescriptions.leadership',
        betrayal: () => 'karma.eventDescriptions.betrayal',
        sacrifice: () => 'karma.eventDescriptions.sacrifice',
        innovation: () => 'karma.eventDescriptions.innovation',
        destruction: () => 'karma.eventDescriptions.destruction'
    };
    
    return descriptionKeys[action](value);
};

// 更新业力档案
export const updateKarmaProfile = (
    currentProfile: KarmaProfile,
    karmaEvents: KarmaRecord[]
): KarmaProfile => {
    const newProfile = { ...currentProfile };
    
    karmaEvents.forEach(event => {
        newProfile.totalKarma += event.value;
        
        switch (event.category) {
            case 'moral':
                newProfile.moralKarma += event.value;
                break;
            case 'social':
                newProfile.socialKarma += event.value;
                break;
            case 'environmental':
                newProfile.environmentalKarma += event.value;
                break;
            case 'intellectual':
                newProfile.intellectualKarma += event.value;
                break;
            case 'spiritual':
                newProfile.spiritualKarma += event.value;
                break;
        }
    });
    
    newProfile.lifeCount += 1;
    newProfile.lastUpdated = Date.now();
    
    return newProfile;
};

// 创建初始业力档案
export const createInitialKarmaProfile = (): KarmaProfile => {
    return {
        totalKarma: 0,
        moralKarma: 0,
        socialKarma: 0,
        environmentalKarma: 0,
        intellectualKarma: 0,
        spiritualKarma: 0,
        lifeCount: 0,
        lastUpdated: Date.now()
    };
}; 