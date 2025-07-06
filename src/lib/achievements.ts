import type { ReincarnationResult, Achievement } from "@/types";

// 成就定义
export const ACHIEVEMENTS: Achievement[] = [
    // 基础成就
    {
        id: 'first_reincarnation',
        nameKey: 'achievements.first_reincarnation.name',
        descriptionKey: 'achievements.first_reincarnation.description',
        icon: '🌱',
        rarity: 'common',
        condition: (results) => results.length >= 1
    },
    {
        id: 'explorer',
        nameKey: 'achievements.explorer.name',
        descriptionKey: 'achievements.explorer.description',
        icon: '🌍',
        rarity: 'common',
        condition: (results) => {
            const countries = new Set(results.map(r => r.country));
            return countries.size >= 5;
        }
    },
    {
        id: 'seasoned_traveler',
        nameKey: 'achievements.seasoned_traveler.name',
        descriptionKey: 'achievements.seasoned_traveler.description',
        icon: '✈️',
        rarity: 'common',
        condition: (results) => results.length >= 10
    },

    // 稀有度相关成就
    {
        id: 'rare_life',
        nameKey: 'achievements.rare_life.name',
        descriptionKey: 'achievements.rare_life.description',
        icon: '💎',
        rarity: 'rare',
        condition: (results) => results.some(r => r.rarity === 'rare')
    },
    {
        id: 'epic_destiny',
        nameKey: 'achievements.epic_destiny.name',
        descriptionKey: 'achievements.epic_destiny.description',
        icon: '⚡',
        rarity: 'epic',
        condition: (results) => results.some(r => r.rarity === 'epic')
    },
    {
        id: 'legendary_soul',
        nameKey: 'achievements.legendary_soul.name',
        descriptionKey: 'achievements.legendary_soul.description',
        icon: '👑',
        rarity: 'legendary',
        condition: (results) => results.some(r => r.rarity === 'legendary')
    },

    // 属性相关成就
    {
        id: 'perfect_health',
        nameKey: 'achievements.perfect_health.name',
        descriptionKey: 'achievements.perfect_health.description',
        icon: '💪',
        rarity: 'rare',
        condition: (results) => results.some(r => r.health === 100)
    },
    {
        id: 'lucky_charm',
        nameKey: 'achievements.lucky_charm.name',
        descriptionKey: 'achievements.lucky_charm.description',
        icon: '🍀',
        rarity: 'rare',
        condition: (results) => results.some(r => r.luck === 100)
    },
    {
        id: 'centenarian',
        nameKey: 'achievements.centenarian.name',
        descriptionKey: 'achievements.centenarian.description',
        icon: '🎂',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.lifespan >= 100)
    },

    // 天赋相关成就
    {
        id: 'multi_talented',
        nameKey: 'achievements.multi_talented.name',
        descriptionKey: 'achievements.multi_talented.description',
        icon: '🌟',
        rarity: 'epic',
        condition: (results) => results.some(r => r.talents.length >= 4)
    },
    {
        id: 'genius',
        nameKey: 'achievements.genius.name',
        descriptionKey: 'achievements.genius.description',
        icon: '🧠',
        rarity: 'rare',
        condition: (results) => results.some(r => r.talents.includes('Mathematical Prodigy'))
    },
    {
        id: 'artist',
        nameKey: 'achievements.artist.name',
        descriptionKey: 'achievements.artist.description',
        icon: '🎨',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Artistic Vision'))
    },

    // 地理相关成就
    {
        id: 'china_born',
        nameKey: 'achievements.china_born.name',
        descriptionKey: 'achievements.china_born.description',
        icon: '🇨🇳',
        rarity: 'common',
        condition: (results) => results.some(r => r.country === 'China')
    },
    {
        id: 'usa_born',
        nameKey: 'achievements.usa_born.name',
        descriptionKey: 'achievements.usa_born.description',
        icon: '🇺🇸',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'United States')
    },
    {
        id: 'japan_born',
        nameKey: 'achievements.japan_born.name',
        descriptionKey: 'achievements.japan_born.description',
        icon: '🇯🇵',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Japan')
    },

    // 时代相关成就
    {
        id: 'time_traveler',
        nameKey: 'achievements.time_traveler.name',
        descriptionKey: 'achievements.time_traveler.description',
        icon: '⏰',
        rarity: 'rare',
        condition: (results) => {
            const eras = new Set(results.map(r => r.era));
            return eras.size >= 3;
        }
    },
    {
        id: 'ancient_soul',
        nameKey: 'achievements.ancient_soul.name',
        descriptionKey: 'achievements.ancient_soul.description',
        icon: '🏛️',
        rarity: 'rare',
        condition: (results) => results.some(r => r.era === 'ancient')
    },
    {
        id: 'future_vision',
        nameKey: 'achievements.future_vision.name',
        descriptionKey: 'achievements.future_vision.description',
        icon: '🚀',
        rarity: 'epic',
        condition: (results) => results.some(r => r.era === 'future')
    },

    // 社会相关成就
    {
        id: 'high_society',
        nameKey: 'achievements.high_society.name',
        descriptionKey: 'achievements.high_society.description',
        icon: '💰',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.socialClass === 'high')
    },
    {
        id: 'humble_beginnings',
        nameKey: 'achievements.humble_beginnings.name',
        descriptionKey: 'achievements.humble_beginnings.description',
        icon: '🌾',
        rarity: 'common',
        condition: (results) => results.some(r => r.socialClass === 'low')
    },

    // 收集成就
    {
        id: 'collector',
        nameKey: 'achievements.collector.name',
        descriptionKey: 'achievements.collector.description',
        icon: '📚',
        rarity: 'epic',
        condition: (results) => results.length >= 50
    },
    {
        id: 'master_collector',
        nameKey: 'achievements.master_collector.name',
        descriptionKey: 'achievements.master_collector.description',
        icon: '🏆',
        rarity: 'legendary',
        condition: (results) => results.length >= 100
    },

    // 特殊成就
    {
        id: 'golden_life',
        nameKey: 'achievements.golden_life.name',
        descriptionKey: 'achievements.golden_life.description',
        icon: '✨',
        rarity: 'legendary',
        condition: (results) => results.some(r => 
            r.health >= 90 && r.luck >= 90 && r.lifespan >= 90
        )
    },
    {
        id: 'renaissance_soul',
        nameKey: 'achievements.renaissance_soul.name',
        descriptionKey: 'achievements.renaissance_soul.description',
        icon: '🎭',
        rarity: 'epic',
        condition: (results) => results.some(r => 
            r.talents.some(t => t.includes('Art')) && 
            r.talents.some(t => t.includes('Math') || t.includes('Science'))
        )
    },
    {
        id: 'dragon_power',
        nameKey: 'achievements.dragon_power.name',
        descriptionKey: 'achievements.dragon_power.description',
        icon: '🐉',
        rarity: 'uncommon',
        condition: (results) => results.some(r => 
            r.country === 'China' && r.health > 80 // 改为基于国家和高健康值的条件
        )
    },
    {
        id: 'tiger_spirit',
        nameKey: 'achievements.tiger_spirit.name',
        descriptionKey: 'achievements.tiger_spirit.description',
        icon: '🐅',
        rarity: 'uncommon',
        condition: (results) => results.some(r => 
            r.health > 90 && r.luck > 80 // 改为高健康和运气的条件
        )
    },
    {
        id: 'spring_child',
        nameKey: 'achievements.spring_child.name',
        descriptionKey: 'achievements.spring_child.description',
        icon: '🌸',
        rarity: 'common',
        condition: (results) => results.some(r => 
            r.talents.length >= 2 // 改为拥有多个天赋的条件
        )
    },
    {
        id: 'winter_warrior',
        nameKey: 'achievements.winter_warrior.name',
        descriptionKey: 'achievements.winter_warrior.description',
        icon: '❄️',
        rarity: 'common',
        condition: (results) => results.some(r => 
            r.lifespan > 80 // 改为长寿的条件
        )
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