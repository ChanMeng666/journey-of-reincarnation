import type { ReincarnationResult, Achievement } from "@/types";

// 成就定义
export const ACHIEVEMENTS: Achievement[] = [
    // 基础成就
    {
        id: 'first_reincarnation',
        name: 'First Journey',
        description: 'Complete your first reincarnation',
        icon: '🌱',
        rarity: 'common',
        condition: (results) => results.length >= 1
    },
    {
        id: 'explorer',
        name: 'World Explorer',
        description: 'Be reincarnated in 5 different countries',
        icon: '🌍',
        rarity: 'common',
        condition: (results) => {
            const countries = new Set(results.map(r => r.country));
            return countries.size >= 5;
        }
    },
    {
        id: 'seasoned_traveler',
        name: 'Seasoned Traveler',
        description: 'Experience 10 reincarnations',
        icon: '✈️',
        rarity: 'common',
        condition: (results) => results.length >= 10
    },

    // 稀有度相关成就
    {
        id: 'rare_life',
        name: 'Rare Life',
        description: 'Experience a rare reincarnation',
        icon: '💎',
        rarity: 'rare',
        condition: (results) => results.some(r => r.rarity === 'rare')
    },
    {
        id: 'epic_destiny',
        name: 'Epic Destiny',
        description: 'Achieve an epic reincarnation',
        icon: '⚡',
        rarity: 'epic',
        condition: (results) => results.some(r => r.rarity === 'epic')
    },
    {
        id: 'legendary_soul',
        name: 'Legendary Soul',
        description: 'Unlock a legendary reincarnation',
        icon: '👑',
        rarity: 'legendary',
        condition: (results) => results.some(r => r.rarity === 'legendary')
    },

    // 属性相关成就
    {
        id: 'perfect_health',
        name: 'Perfect Health',
        description: 'Be born with 100 health points',
        icon: '💪',
        rarity: 'rare',
        condition: (results) => results.some(r => r.health === 100)
    },
    {
        id: 'lucky_charm',
        name: 'Lucky Charm',
        description: 'Achieve maximum luck (100)',
        icon: '🍀',
        rarity: 'rare',
        condition: (results) => results.some(r => r.luck === 100)
    },
    {
        id: 'centenarian',
        name: 'Centenarian',
        description: 'Live to 100 years or more',
        icon: '🎂',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.lifespan >= 100)
    },

    // 天赋相关成就
    {
        id: 'multi_talented',
        name: 'Multi-Talented',
        description: 'Be born with 4 or more talents',
        icon: '🌟',
        rarity: 'epic',
        condition: (results) => results.some(r => r.talents.length >= 4)
    },
    {
        id: 'genius',
        name: 'Genius',
        description: 'Be born as a Mathematical Prodigy',
        icon: '🧠',
        rarity: 'rare',
        condition: (results) => results.some(r => r.talents.includes('Mathematical Prodigy'))
    },
    {
        id: 'artist',
        name: 'Born Artist',
        description: 'Be born with Artistic Vision',
        icon: '🎨',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Artistic Vision'))
    },

    // 地理相关成就
    {
        id: 'china_born',
        name: 'Middle Kingdom',
        description: 'Be born in China',
        icon: '🇨🇳',
        rarity: 'common',
        condition: (results) => results.some(r => r.country === 'China')
    },
    {
        id: 'usa_born',
        name: 'American Dream',
        description: 'Be born in the United States',
        icon: '🇺🇸',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'United States')
    },
    {
        id: 'japan_born',
        name: 'Land of the Rising Sun',
        description: 'Be born in Japan',
        icon: '🇯🇵',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Japan')
    },

    // 时代相关成就
    {
        id: 'time_traveler',
        name: 'Time Traveler',
        description: 'Experience reincarnations in different eras',
        icon: '⏰',
        rarity: 'rare',
        condition: (results) => {
            const eras = new Set(results.map(r => r.era));
            return eras.size >= 3;
        }
    },
    {
        id: 'ancient_soul',
        name: 'Ancient Soul',
        description: 'Be reincarnated in ancient times',
        icon: '🏛️',
        rarity: 'rare',
        condition: (results) => results.some(r => r.era === 'ancient')
    },
    {
        id: 'future_vision',
        name: 'Future Vision',
        description: 'Be born in the future era',
        icon: '🚀',
        rarity: 'epic',
        condition: (results) => results.some(r => r.era === 'future')
    },

    // 社会相关成就
    {
        id: 'high_society',
        name: 'High Society',
        description: 'Be born into high social class',
        icon: '💰',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.socialClass === 'high')
    },
    {
        id: 'humble_beginnings',
        name: 'Humble Beginnings',
        description: 'Be born into low social class',
        icon: '🌾',
        rarity: 'common',
        condition: (results) => results.some(r => r.socialClass === 'low')
    },

    // 收集成就
    {
        id: 'collector',
        name: 'Life Collector',
        description: 'Experience 50 reincarnations',
        icon: '📚',
        rarity: 'epic',
        condition: (results) => results.length >= 50
    },
    {
        id: 'master_collector',
        name: 'Master Collector',
        description: 'Experience 100 reincarnations',
        icon: '🏆',
        rarity: 'legendary',
        condition: (results) => results.length >= 100
    },

    // 特殊组合成就
    {
        id: 'golden_life',
        name: 'Golden Life',
        description: 'Be born with high health, luck, and long lifespan',
        icon: '✨',
        rarity: 'legendary',
        condition: (results) => results.some(r => 
            r.health >= 90 && r.luck >= 90 && r.lifespan >= 90
        )
    },
    {
        id: 'renaissance_soul',
        name: 'Renaissance Soul',
        description: 'Have multiple talents in different fields',
        icon: '🎭',
        rarity: 'epic',
        condition: (results) => results.some(r => {
            const hasArt = r.talents.some(t => t.includes('Art') || t.includes('Music') || t.includes('Creative'));
            const hasScience = r.talents.some(t => t.includes('Math') || t.includes('Scientific') || t.includes('Technical'));
            const hasSocial = r.talents.some(t => t.includes('Leadership') || t.includes('Social') || t.includes('Charisma'));
            return hasArt && hasScience && hasSocial;
        })
    },

    // 季节相关成就
    {
        id: 'spring_child',
        name: 'Spring Child',
        description: 'Be born in spring',
        icon: '🌸',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthSeason === 'spring')
    },
    {
        id: 'winter_warrior',
        name: 'Winter Warrior',
        description: 'Be born in winter',
        icon: '❄️',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthSeason === 'winter')
    },

    // 生肖相关成就
    {
        id: 'dragon_power',
        name: 'Dragon Power',
        description: 'Be born in the year of the Dragon',
        icon: '🐉',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.zodiac === 'Dragon')
    },
    {
        id: 'tiger_spirit',
        name: 'Tiger Spirit',
        description: 'Be born in the year of the Tiger',
        icon: '🐅',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.zodiac === 'Tiger')
    }
];

// 检查所有成就
export const checkAchievements = (results: ReincarnationResult[]): Achievement[] => {
    return ACHIEVEMENTS.filter(achievement => achievement.condition(results));
};

// 检查新解锁的成就
export const checkNewAchievements = (
    results: ReincarnationResult[], 
    unlockedAchievementIds: string[]
): Achievement[] => {
    const eligibleAchievements = checkAchievements(results);
    return eligibleAchievements.filter(achievement => 
        !unlockedAchievementIds.includes(achievement.id)
    );
};

// 根据稀有度获取成就
export const getAchievementsByRarity = (rarity: Achievement['rarity']): Achievement[] => {
    return ACHIEVEMENTS.filter(achievement => achievement.rarity === rarity);
};

// 获取成就完成率
export const getAchievementProgress = (unlockedIds: string[]): number => {
    return (unlockedIds.length / ACHIEVEMENTS.length) * 100;
};

// 获取下一个可能解锁的成就
export const getNextAchievements = (
    results: ReincarnationResult[], 
    unlockedIds: string[]
): Achievement[] => {
    const notUnlocked = ACHIEVEMENTS.filter(a => !unlockedIds.includes(a.id));
    
    // 简单的距离计算，优先显示接近完成的成就
    return notUnlocked.slice(0, 5); // 返回前5个未解锁的成就
}; 