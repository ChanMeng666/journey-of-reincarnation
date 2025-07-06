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
    },

    // 特殊事件成就
    {
        id: 'time_anomaly',
        nameKey: 'achievements.time_anomaly.name',
        descriptionKey: 'achievements.time_anomaly.description',
        icon: '⏰',
        rarity: 'rare',
        condition: (results) => results.some(r => 
            r.specialEvents?.includes('timeTraveler')
        )
    },
    {
        id: 'twin_soul',
        nameKey: 'achievements.twin_soul.name',
        descriptionKey: 'achievements.twin_soul.description',
        icon: '👯',
        rarity: 'uncommon',
        condition: (results) => results.some(r => 
            r.specialEvents?.includes('twinBirth')
        )
    },
    {
        id: 'child_prodigy',
        nameKey: 'achievements.child_prodigy.name',
        descriptionKey: 'achievements.child_prodigy.description',
        icon: '🧠',
        rarity: 'rare',
        condition: (results) => results.some(r => 
            r.specialEvents?.includes('prodigy')
        )
    },
    {
        id: 'historical_figure',
        nameKey: 'achievements.historical_figure.name',
        descriptionKey: 'achievements.historical_figure.description',
        icon: '👑',
        rarity: 'epic',
        condition: (results) => results.some(r => 
            r.specialEvents?.includes('historicalFigure')
        )
    },
    {
        id: 'prophetic_vision',
        nameKey: 'achievements.prophetic_vision.name',
        descriptionKey: 'achievements.prophetic_vision.description',
        icon: '🔮',
        rarity: 'rare',
        condition: (results) => results.some(r => 
            r.specialEvents?.includes('prophetic')
        )
    },
    {
        id: 'miraculous_event',
        nameKey: 'achievements.miraculous_event.name',
        descriptionKey: 'achievements.miraculous_event.description',
        icon: '✨',
        rarity: 'epic',
        condition: (results) => results.some(r => 
            r.specialEvents?.includes('miraculous')
        )
    },
    {
        id: 'special_event_collector',
        nameKey: 'achievements.special_event_collector.name',
        descriptionKey: 'achievements.special_event_collector.description',
        icon: '🎭',
        rarity: 'legendary',
        condition: (results) => {
            const allSpecialEvents = results.flatMap(r => r.specialEvents || []);
            const uniqueEvents = new Set(allSpecialEvents);
            return uniqueEvents.size >= 6; // 收集所有6种特殊事件
        }
    },

    // 更多天赋成就
    {
        id: 'musical_genius',
        nameKey: 'achievements.musical_genius.name',
        descriptionKey: 'achievements.musical_genius.description',
        icon: '🎵',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Musical Genius'))
    },
    {
        id: 'athletic_champion',
        nameKey: 'achievements.athletic_champion.name',
        descriptionKey: 'achievements.athletic_champion.description',
        icon: '🏆',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Athletic Excellence'))
    },
    {
        id: 'polyglot',
        nameKey: 'achievements.polyglot.name',
        descriptionKey: 'achievements.polyglot.description',
        icon: '🌐',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Linguistic Mastery'))
    },
    {
        id: 'scientific_innovator',
        nameKey: 'achievements.scientific_innovator.name',
        descriptionKey: 'achievements.scientific_innovator.description',
        icon: '🔬',
        rarity: 'rare',
        condition: (results) => results.some(r => r.talents.includes('Scientific Innovation'))
    },
    {
        id: 'natural_leader',
        nameKey: 'achievements.natural_leader.name',
        descriptionKey: 'achievements.natural_leader.description',
        icon: '👑',
        rarity: 'rare',
        condition: (results) => results.some(r => r.talents.includes('Leadership Charisma'))
    },
    {
        id: 'entrepreneur',
        nameKey: 'achievements.entrepreneur.name',
        descriptionKey: 'achievements.entrepreneur.description',
        icon: '💼',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Entrepreneurial Spirit'))
    },
    {
        id: 'healer',
        nameKey: 'achievements.healer.name',
        descriptionKey: 'achievements.healer.description',
        icon: '🩺',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Healing Touch'))
    },
    {
        id: 'memory_master',
        nameKey: 'achievements.memory_master.name',
        descriptionKey: 'achievements.memory_master.description',
        icon: '🧠',
        rarity: 'rare',
        condition: (results) => results.some(r => r.talents.includes('Photographic Memory'))
    },
    {
        id: 'empath',
        nameKey: 'achievements.empath.name',
        descriptionKey: 'achievements.empath.description',
        icon: '❤️',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Empathic Understanding'))
    },
    {
        id: 'strategist',
        nameKey: 'achievements.strategist.name',
        descriptionKey: 'achievements.strategist.description',
        icon: '♟️',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Strategic Mind'))
    },
    {
        id: 'creative_writer',
        nameKey: 'achievements.creative_writer.name',
        descriptionKey: 'achievements.creative_writer.description',
        icon: '📝',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Creative Writing'))
    },
    {
        id: 'tech_innovator',
        nameKey: 'achievements.tech_innovator.name',
        descriptionKey: 'achievements.tech_innovator.description',
        icon: '💻',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.talents.includes('Technical Innovation'))
    },
    {
        id: 'social_butterfly',
        nameKey: 'achievements.social_butterfly.name',
        descriptionKey: 'achievements.social_butterfly.description',
        icon: '🦋',
        rarity: 'common',
        condition: (results) => results.some(r => r.talents.includes('Social Networking'))
    },
    {
        id: 'problem_solver',
        nameKey: 'achievements.problem_solver.name',
        descriptionKey: 'achievements.problem_solver.description',
        icon: '🧩',
        rarity: 'common',
        condition: (results) => results.some(r => r.talents.includes('Problem Solving'))
    },

    // 更多地理成就
    {
        id: 'brazil_born',
        nameKey: 'achievements.brazil_born.name',
        descriptionKey: 'achievements.brazil_born.description',
        icon: '🇧🇷',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Brazil')
    },
    {
        id: 'india_born',
        nameKey: 'achievements.india_born.name',
        descriptionKey: 'achievements.india_born.description',
        icon: '🇮🇳',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'India')
    },
    {
        id: 'russia_born',
        nameKey: 'achievements.russia_born.name',
        descriptionKey: 'achievements.russia_born.description',
        icon: '🇷🇺',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Russia')
    },
    {
        id: 'germany_born',
        nameKey: 'achievements.germany_born.name',
        descriptionKey: 'achievements.germany_born.description',
        icon: '🇩🇪',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Germany')
    },
    {
        id: 'france_born',
        nameKey: 'achievements.france_born.name',
        descriptionKey: 'achievements.france_born.description',
        icon: '🇫🇷',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'France')
    },
    {
        id: 'uk_born',
        nameKey: 'achievements.uk_born.name',
        descriptionKey: 'achievements.uk_born.description',
        icon: '🇬🇧',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'United Kingdom')
    },
    {
        id: 'canada_born',
        nameKey: 'achievements.canada_born.name',
        descriptionKey: 'achievements.canada_born.description',
        icon: '🇨🇦',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Canada')
    },
    {
        id: 'australia_born',
        nameKey: 'achievements.australia_born.name',
        descriptionKey: 'achievements.australia_born.description',
        icon: '🇦🇺',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Australia')
    },
    {
        id: 'mexico_born',
        nameKey: 'achievements.mexico_born.name',
        descriptionKey: 'achievements.mexico_born.description',
        icon: '🇲🇽',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'Mexico')
    },
    {
        id: 'south_korea_born',
        nameKey: 'achievements.south_korea_born.name',
        descriptionKey: 'achievements.south_korea_born.description',
        icon: '🇰🇷',
        rarity: 'uncommon',
        condition: (results) => results.some(r => r.country === 'South Korea')
    },

    // 季节成就
    {
        id: 'spring_born',
        nameKey: 'achievements.spring_born.name',
        descriptionKey: 'achievements.spring_born.description',
        icon: '🌸',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthSeason === 'spring')
    },
    {
        id: 'summer_born',
        nameKey: 'achievements.summer_born.name',
        descriptionKey: 'achievements.summer_born.description',
        icon: '☀️',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthSeason === 'summer')
    },
    {
        id: 'autumn_born',
        nameKey: 'achievements.autumn_born.name',
        descriptionKey: 'achievements.autumn_born.description',
        icon: '🍂',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthSeason === 'autumn')
    },
    {
        id: 'winter_born',
        nameKey: 'achievements.winter_born.name',
        descriptionKey: 'achievements.winter_born.description',
        icon: '❄️',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthSeason === 'winter')
    },

    // 性别成就
    {
        id: 'male_experience',
        nameKey: 'achievements.male_experience.name',
        descriptionKey: 'achievements.male_experience.description',
        icon: '♂️',
        rarity: 'common',
        condition: (results) => results.some(r => r.gender === 'male')
    },
    {
        id: 'female_experience',
        nameKey: 'achievements.female_experience.name',
        descriptionKey: 'achievements.female_experience.description',
        icon: '♀️',
        rarity: 'common',
        condition: (results) => results.some(r => r.gender === 'female')
    },
    {
        id: 'gender_balance',
        nameKey: 'achievements.gender_balance.name',
        descriptionKey: 'achievements.gender_balance.description',
        icon: '⚖️',
        rarity: 'uncommon',
        condition: (results) => {
            const maleCount = results.filter(r => r.gender === 'male').length;
            const femaleCount = results.filter(r => r.gender === 'female').length;
            return maleCount >= 5 && femaleCount >= 5;
        }
    },

    // 家庭结构成就
    {
        id: 'only_child',
        nameKey: 'achievements.only_child.name',
        descriptionKey: 'achievements.only_child.description',
        icon: '👶',
        rarity: 'common',
        condition: (results) => results.some(r => r.familyStructure === 'onlyChild')
    },
    {
        id: 'sibling_bond',
        nameKey: 'achievements.sibling_bond.name',
        descriptionKey: 'achievements.sibling_bond.description',
        icon: '👫',
        rarity: 'common',
        condition: (results) => results.some(r => r.familyStructure === 'siblings')
    },

    // 出生地成就
    {
        id: 'city_dweller',
        nameKey: 'achievements.city_dweller.name',
        descriptionKey: 'achievements.city_dweller.description',
        icon: '🏙️',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthplace === 'urban')
    },
    {
        id: 'suburban_life',
        nameKey: 'achievements.suburban_life.name',
        descriptionKey: 'achievements.suburban_life.description',
        icon: '🏘️',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthplace === 'suburban')
    },
    {
        id: 'rural_roots',
        nameKey: 'achievements.rural_roots.name',
        descriptionKey: 'achievements.rural_roots.description',
        icon: '🌾',
        rarity: 'common',
        condition: (results) => results.some(r => r.birthplace === 'rural')
    },

    // 复合成就
    {
        id: 'perfect_storm',
        nameKey: 'achievements.perfect_storm.name',
        descriptionKey: 'achievements.perfect_storm.description',
        icon: '🌪️',
        rarity: 'legendary',
        condition: (results) => results.some(r => 
            r.health === 100 && r.luck === 100 && r.talents.length >= 5
        )
    },
    {
        id: 'world_citizen',
        nameKey: 'achievements.world_citizen.name',
        descriptionKey: 'achievements.world_citizen.description',
        icon: '🌍',
        rarity: 'epic',
        condition: (results) => {
            const countries = new Set(results.map(r => r.country));
            return countries.size >= 10;
        }
    },
    {
        id: 'era_master',
        nameKey: 'achievements.era_master.name',
        descriptionKey: 'achievements.era_master.description',
        icon: '⏳',
        rarity: 'epic',
        condition: (results) => {
            const eras = new Set(results.map(r => r.era));
            return eras.size >= 4;
        }
    },
    {
        id: 'class_consciousness',
        nameKey: 'achievements.class_consciousness.name',
        descriptionKey: 'achievements.class_consciousness.description',
        icon: '🎭',
        rarity: 'rare',
        condition: (results) => {
            const classes = new Set(results.map(r => r.socialClass));
            return classes.size >= 3;
        }
    },
    {
        id: 'seasonal_cycle',
        nameKey: 'achievements.seasonal_cycle.name',
        descriptionKey: 'achievements.seasonal_cycle.description',
        icon: '🌈',
        rarity: 'uncommon',
        condition: (results) => {
            const seasons = new Set(results.map(r => r.birthSeason));
            return seasons.size >= 4;
        }
    },
    {
        id: 'talent_master',
        nameKey: 'achievements.talent_master.name',
        descriptionKey: 'achievements.talent_master.description',
        icon: '🌟',
        rarity: 'legendary',
        condition: (results) => {
            const allTalents = results.flatMap(r => r.talents);
            const uniqueTalents = new Set(allTalents);
            return uniqueTalents.size >= 12; // 收集12种不同天赋
        }
    },
    {
        id: 'immortal_soul',
        nameKey: 'achievements.immortal_soul.name',
        descriptionKey: 'achievements.immortal_soul.description',
        icon: '👼',
        rarity: 'legendary',
        condition: (results) => results.some(r => r.lifespan >= 150)
    },
    {
        id: 'brief_candle',
        nameKey: 'achievements.brief_candle.name',
        descriptionKey: 'achievements.brief_candle.description',
        icon: '🕯️',
        rarity: 'rare',
        condition: (results) => results.some(r => r.lifespan <= 20)
    },
    {
        id: 'karma_saint',
        nameKey: 'achievements.karma_saint.name',
        descriptionKey: 'achievements.karma_saint.description',
        icon: '😇',
        rarity: 'epic',
        condition: (results) => results.some(r => 
            r.karmaInfluence && r.karmaInfluence.healthBonus >= 20
        )
    },
    {
        id: 'karma_sinner',
        nameKey: 'achievements.karma_sinner.name',
        descriptionKey: 'achievements.karma_sinner.description',
        icon: '😈',
        rarity: 'epic',
        condition: (results) => results.some(r => 
            r.karmaInfluence && r.karmaInfluence.healthBonus <= -20
        )
    },
    {
        id: 'middle_class_hero',
        nameKey: 'achievements.middle_class_hero.name',
        descriptionKey: 'achievements.middle_class_hero.description',
        icon: '🏠',
        rarity: 'common',
        condition: (results) => results.some(r => r.socialClass === 'middle')
    },
    {
        id: 'medieval_knight',
        nameKey: 'achievements.medieval_knight.name',
        descriptionKey: 'achievements.medieval_knight.description',
        icon: '⚔️',
        rarity: 'rare',
        condition: (results) => results.some(r => r.era === 'medieval')
    },
    {
        id: 'modern_citizen',
        nameKey: 'achievements.modern_citizen.name',
        descriptionKey: 'achievements.modern_citizen.description',
        icon: '🏢',
        rarity: 'common',
        condition: (results) => results.some(r => r.era === 'modern')
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