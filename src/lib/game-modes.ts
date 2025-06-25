import type { 
    GameMode, 
    GameModeConfig, 
    HistoricalPeriod, 
    FantasyRace, 
    SciFiSetting,
    ModeSpecificResult,
    ReincarnationResult 
} from "@/types";

// 游戏模式配置
export const GAME_MODES: GameModeConfig[] = [
    {
        id: 'classic',
        name: 'Classic Mode',
        description: 'Traditional reincarnation in modern world',
        icon: '🌍',
        isUnlocked: true
    },
    {
        id: 'historical',
        name: 'Historical Mode',
        description: 'Experience life in different historical periods',
        icon: '🏛️',
        isUnlocked: false,
        unlockRequirement: {
            reincarnations: 5
        }
    },
    {
        id: 'fantasy',
        name: 'Fantasy Mode', 
        description: 'Live as magical beings in fantasy realms',
        icon: '🧙‍♂️',
        isUnlocked: false,
        unlockRequirement: {
            reincarnations: 10,
            rarity: ['rare', 'epic', 'legendary']
        }
    },
    {
        id: 'scifi',
        name: 'Sci-Fi Mode',
        description: 'Explore futuristic worlds and space civilizations',
        icon: '🚀',
        isUnlocked: false,
        unlockRequirement: {
            reincarnations: 15,
            achievements: ['time_traveler', 'future_vision']
        }
    }
];

// 历史时期数据
export const HISTORICAL_PERIODS: HistoricalPeriod[] = [
    {
        id: 'ancient_egypt',
        name: 'Ancient Egypt',
        timeRange: '3100 - 30 BCE',
        description: 'The land of pharaohs, pyramids, and the mighty Nile',
        countries: ['Egypt'],
        socialClasses: ['Pharaoh', 'Noble', 'Priest', 'Scribe', 'Merchant', 'Farmer', 'Slave'],
        specialEvents: ['Pyramid Construction', 'Nile Flooding', 'Mummification Ceremony', 'Royal Burial'],
        lifeExpectancy: { min: 25, max: 40 },
        technologies: ['Hieroglyphics', 'Papyrus', 'Bronze Tools', 'Irrigation'],
        diseases: ['River Blindness', 'Malaria', 'Schistosomiasis'],
        opportunities: ['Trade with Nubia', 'Pyramid Building', 'Religious Ceremonies']
    },
    {
        id: 'ancient_rome',
        name: 'Roman Empire',
        timeRange: '27 BCE - 476 CE',
        description: 'The mighty empire that dominated the Mediterranean',
        countries: ['Italy', 'Gaul', 'Britannia', 'Hispania', 'Germania'],
        socialClasses: ['Emperor', 'Senator', 'Patrician', 'Plebeian', 'Freedman', 'Slave'],
        specialEvents: ['Gladiator Games', 'Triumph Parade', 'Senate Meeting', 'Military Campaign'],
        lifeExpectancy: { min: 30, max: 50 },
        technologies: ['Concrete', 'Aqueducts', 'Roads', 'Military Engineering'],
        diseases: ['Plague', 'Smallpox', 'Typhoid'],
        opportunities: ['Military Service', 'Trade Networks', 'Public Works', 'Philosophy Schools']
    },
    {
        id: 'medieval',
        name: 'Medieval Europe',
        timeRange: '500 - 1500 CE',
        description: 'An age of knights, castles, and feudalism',
        countries: ['England', 'France', 'Holy Roman Empire', 'Byzantine Empire'],
        socialClasses: ['King', 'Noble', 'Knight', 'Clergy', 'Merchant', 'Peasant', 'Serf'],
        specialEvents: ['Crusades', 'Black Death', 'Castle Siege', 'Royal Tournament'],
        lifeExpectancy: { min: 25, max: 35 },
        technologies: ['Windmills', 'Heavy Plow', 'Crossbow', 'Gothic Architecture'],
        diseases: ['Black Death', 'Leprosy', 'Dysentery'],
        opportunities: ['Crusade Pilgrimage', 'Guild Membership', 'Monastery Life', 'Knight Training']
    },
    {
        id: 'renaissance',
        name: 'Renaissance',
        timeRange: '1300 - 1600 CE',
        description: 'A rebirth of art, science, and human potential',
        countries: ['Italian States', 'France', 'England', 'Spain', 'Netherlands'],
        socialClasses: ['Prince', 'Merchant Prince', 'Artist', 'Scholar', 'Banker', 'Artisan', 'Laborer'],
        specialEvents: ['Art Commission', 'Scientific Discovery', 'Exploration Voyage', 'Patron Meeting'],
        lifeExpectancy: { min: 35, max: 50 },
        technologies: ['Printing Press', 'Perspective Painting', 'Double-entry Bookkeeping', 'Navigation'],
        diseases: ['Syphilis', 'Typhus', 'Plague Outbreaks'],
        opportunities: ['Artistic Patronage', 'New World Exploration', 'Banking', 'Scientific Study']
    },
    {
        id: 'industrial',
        name: 'Industrial Revolution',
        timeRange: '1760 - 1840 CE',
        description: 'The transformation from manual labor to machine production',
        countries: ['England', 'France', 'Prussia', 'United States'],
        socialClasses: ['Factory Owner', 'Middle Class', 'Skilled Worker', 'Factory Worker', 'Farmer'],
        specialEvents: ['Factory Opening', 'Railroad Construction', 'Workers Strike', 'Invention Patent'],
        lifeExpectancy: { min: 40, max: 55 },
        technologies: ['Steam Engine', 'Textile Machinery', 'Iron Production', 'Railways'],
        diseases: ['Cholera', 'Tuberculosis', 'Industrial Accidents'],
        opportunities: ['Factory Investment', 'Railroad Building', 'Invention', 'Urban Migration']
    },
    {
        id: 'wild_west',
        name: 'Wild West America',
        timeRange: '1860 - 1890 CE',
        description: 'The frontier era of cowboys, gold rush, and expansion',
        countries: ['United States'],
        socialClasses: ['Rancher', 'Sheriff', 'Cowboy', 'Miner', 'Saloon Owner', 'Outlaw', 'Settler'],
        specialEvents: ['Gold Rush', 'Cattle Drive', 'Train Robbery', 'Gunfight', 'Town Founding'],
        lifeExpectancy: { min: 35, max: 45 },
        technologies: ['Revolver', 'Telegraph', 'Dynamite', 'Barbed Wire'],
        diseases: ['Cholera', 'Dysentery', 'Indian Wars'],
        opportunities: ['Gold Mining', 'Railroad Work', 'Cattle Ranching', 'Law Enforcement']
    }
];

// 幻想种族数据
export const FANTASY_RACES: FantasyRace[] = [
    {
        id: 'human',
        name: 'Human',
        description: 'Adaptable and ambitious mortal beings',
        lifespan: { min: 60, max: 100 },
        abilities: ['Versatility', 'Quick Learning', 'Leadership', 'Innovation'],
        weaknesses: ['Short Lifespan', 'No Magic Resistance'],
        habitats: ['Cities', 'Villages', 'Farmlands', 'Ports'],
        socialStructure: ['Monarchy', 'Republic', 'Guild System', 'Merchant Class'],
        magicAffinity: 50,
        physicalStrength: 50,
        intelligence: 60
    },
    {
        id: 'elf',
        name: 'Elf',
        description: 'Graceful immortal beings connected to nature and magic',
        lifespan: { min: 500, max: 1000 },
        abilities: ['Immortality', 'Nature Magic', 'Enhanced Senses', 'Archery Mastery'],
        weaknesses: ['Iron Vulnerability', 'Slow Reproduction', 'Isolation Tendency'],
        habitats: ['Enchanted Forests', 'Crystal Cities', 'Ancient Groves', 'Magical Realms'],
        socialStructure: ['Elder Council', 'Court System', 'Clan Hierarchy', 'Magic Orders'],
        magicAffinity: 90,
        physicalStrength: 40,
        intelligence: 80
    },
    {
        id: 'dwarf',
        name: 'Dwarf',
        description: 'Stout underground dwellers master of crafts and warfare',
        lifespan: { min: 200, max: 400 },
        abilities: ['Master Crafting', 'Magic Resistance', 'Underground Navigation', 'Battle Rage'],
        weaknesses: ['Fear of Water', 'Stubborness', 'Surface Discomfort'],
        habitats: ['Mountain Halls', 'Underground Cities', 'Mine Complexes', 'Forge Cities'],
        socialStructure: ['Clan System', 'Guild Masters', 'King Under Mountain', 'Honor Code'],
        magicAffinity: 20,
        physicalStrength: 80,
        intelligence: 70
    },
    {
        id: 'dragon',
        name: 'Dragon',
        description: 'Ancient magical beings of immense power and wisdom',
        lifespan: { min: 1000, max: 5000 },
        abilities: ['Flight', 'Breath Weapon', 'Magic Mastery', 'Ancient Knowledge', 'Treasure Sense'],
        weaknesses: ['Pride', 'Greed', 'Isolation', 'Dragon Hunters'],
        habitats: ['Mountain Peaks', 'Ancient Lairs', 'Volcanic Caves', 'Hidden Realms'],
        socialStructure: ['Solitary', 'Dragon Courts', 'Ancient Hierarchy', 'Territory Based'],
        magicAffinity: 95,
        physicalStrength: 95,
        intelligence: 90
    },
    {
        id: 'fairy',
        name: 'Fairy',
        description: 'Tiny magical beings of pure wonder and mischief',
        lifespan: { min: 100, max: 300 },
        abilities: ['Flight', 'Invisibility', 'Nature Magic', 'Size Changing', 'Illusions'],
        weaknesses: ['Physical Fragility', 'Iron Allergy', 'Childlike Nature'],
        habitats: ['Flower Gardens', 'Mushroom Circles', 'Magic Springs', 'Rainbow Bridges'],
        socialStructure: ['Court System', 'Seasonal Monarchy', 'Troupe Life', 'Nature Circles'],
        magicAffinity: 85,
        physicalStrength: 10,
        intelligence: 60
    },
    {
        id: 'orc',
        name: 'Orc',
        description: 'Fierce warriors driven by strength and honor',
        lifespan: { min: 40, max: 80 },
        abilities: ['Battle Fury', 'Pack Hunting', 'Intimidation', 'Survival Instinct'],
        weaknesses: ['Sunlight Sensitivity', 'Hot Temper', 'Tribal Conflicts'],
        habitats: ['War Camps', 'Mountain Strongholds', 'Raiding Settlements', 'Tribal Lands'],
        socialStructure: ['Tribal Chiefs', 'War Bands', 'Strength Hierarchy', 'Honor Code'],
        magicAffinity: 30,
        physicalStrength: 85,
        intelligence: 40
    }
];

// 科幻设定数据
export const SCIFI_SETTINGS: SciFiSetting[] = [
    {
        id: 'cyberpunk',
        name: 'Cyberpunk 2177',
        year: 2177,
        description: 'High-tech, low-life in neon-soaked megacities',
        planets: ['Earth', 'Luna Colony', 'Mars Stations'],
        technologies: ['Neural Implants', 'Holographic Displays', 'Genetic Modification', 'AI Companions'],
        factions: ['Mega Corporations', 'Hackers', 'Street Gangs', 'Government Agents'],
        augmentations: ['Cybernetic Eyes', 'Neural Interface', 'Synthetic Limbs', 'Memory Chips'],
        threats: ['Corporate Wars', 'AI Uprising', 'Cyber Viruses', 'Reality Hackers'],
        lifeExpectancy: { min: 80, max: 150 }
    },
    {
        id: 'space_empire',
        name: 'Galactic Empire',
        year: 3025,
        description: 'Vast interstellar civilization spanning the galaxy',
        planets: ['Terra Prime', 'New Tokyo', 'Alpha Centauri', 'Kepler Station', 'Outer Rim Worlds'],
        technologies: ['Faster-than-Light Travel', 'Energy Shields', 'Plasma Weapons', 'Terraforming'],
        factions: ['Imperial Navy', 'Merchant Guild', 'Rebel Alliance', 'Alien Species'],
        augmentations: ['Life Extension', 'Enhanced Genetics', 'Nano-medicine', 'Consciousness Transfer'],
        threats: ['Alien Invasions', 'Political Upheaval', 'Space Pirates', 'System Wars'],
        lifeExpectancy: { min: 120, max: 300 }
    },
    {
        id: 'post_apocalyptic',
        name: 'Post-Nuclear Earth',
        year: 2157,
        description: 'Survivors rebuilding civilization after the Great War',
        planets: ['Earth (Wasteland)'],
        technologies: ['Radiation Detectors', 'Water Purifiers', 'Scrap Technology', 'Solar Power'],
        factions: ['Vault Dwellers', 'Wasteland Raiders', 'Tech Brotherhood', 'Mutant Clans'],
        augmentations: ['Radiation Immunity', 'Synthetic Organs', 'Combat Implants', 'Survival Mods'],
        threats: ['Radiation Storms', 'Mutant Creatures', 'Resource Wars', 'Tech Malfunction'],
        lifeExpectancy: { min: 30, max: 60 }
    },
    {
        id: 'alien_world',
        name: 'Xenon Prime',
        year: 2245,
        description: 'Human colony on an alien world with strange physics',
        planets: ['Xenon Prime', 'Binary Moons', 'Orbital Stations'],
        technologies: ['Gravity Manipulation', 'Exotic Matter', 'Quantum Computing', 'Alien Tech'],
        factions: ['Colonists', 'Native Aliens', 'Research Corps', 'Mining Consortium'],
        augmentations: ['Atmosphere Adaptation', 'Gravity Resistance', 'Enhanced Vision', 'Telepathy'],
        threats: ['Hostile Wildlife', 'Environmental Hazards', 'First Contact Wars', 'Isolation'],
        lifeExpectancy: { min: 70, max: 120 }
    }
];

// 检查模式解锁状态
export const checkModeUnlock = (mode: GameModeConfig, playerStats: {
    reincarnations: number;
    achievements: string[];
    rareLifes: ReincarnationResult[];
}): boolean => {
    if (mode.isUnlocked) return true;
    if (!mode.unlockRequirement) return false;

    const req = mode.unlockRequirement;

    // 检查轮回次数
    if (req.reincarnations && playerStats.reincarnations < req.reincarnations) {
        return false;
    }

    // 检查成就
    if (req.achievements && !req.achievements.every(ach => playerStats.achievements.includes(ach))) {
        return false;
    }

    // 检查稀有度
    if (req.rarity) {
        const hasRequiredRarity = playerStats.rareLifes.some(life => 
            req.rarity?.includes(life.rarity)
        );
        if (!hasRequiredRarity) return false;
    }

    return true;
};

// 生成模式特定结果
export const generateModeSpecificResult = (
    mode: GameMode,
    baseResult: ReincarnationResult
): ModeSpecificResult => {
    const result: ModeSpecificResult = { mode };

    switch (mode) {
        case 'historical':
            const period = HISTORICAL_PERIODS[Math.floor(Math.random() * HISTORICAL_PERIODS.length)];
            const events = period.specialEvents
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.floor(Math.random() * 3) + 1);
            
            result.historical = {
                period,
                majorEvents: events,
                discoveries: period.technologies
                    .sort(() => Math.random() - 0.5)
                    .slice(0, Math.floor(Math.random() * 2) + 1),
                plagues: Math.random() < 0.3 ? [period.diseases[Math.floor(Math.random() * period.diseases.length)]] : []
            };
            
            // 添加历史人物可能性
            if (baseResult.rarity === 'legendary' && Math.random() < 0.5) {
                const figures = ['Julius Caesar', 'Leonardo da Vinci', 'Joan of Arc', 'Alexander the Great'];
                result.historical.historicalFigure = figures[Math.floor(Math.random() * figures.length)];
            }
            break;

        case 'fantasy':
            const race = FANTASY_RACES[Math.floor(Math.random() * FANTASY_RACES.length)];
            const quests = ['Dragon Slaying', 'Ancient Artifact', 'Royal Rescue', 'Demon Banishment', 'Lost City']
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.floor(Math.random() * 3) + 1);
            
            result.fantasy = {
                race,
                magicLevel: Math.floor(Math.random() * race.magicAffinity) + 10,
                questsCompleted: quests,
                artifacts: ['Enchanted Sword', 'Magic Ring', 'Ancient Tome']
                    .sort(() => Math.random() - 0.5)
                    .slice(0, Math.floor(Math.random() * 2) + 1),
                companions: ['Wise Mentor', 'Loyal Friend', 'Magical Beast']
                    .sort(() => Math.random() - 0.5)
                    .slice(0, Math.floor(Math.random() * 2) + 1),
                enemiesDefeated: ['Dark Sorcerer', 'Ancient Dragon', 'Demon Lord']
                    .sort(() => Math.random() - 0.5)
                    .slice(0, Math.floor(Math.random() * 2) + 1)
            };
            break;

        case 'scifi':
            const setting = SCIFI_SETTINGS[Math.floor(Math.random() * SCIFI_SETTINGS.length)];
            const planet = setting.planets[Math.floor(Math.random() * setting.planets.length)];
            const faction = setting.factions[Math.floor(Math.random() * setting.factions.length)];
            
            result.scifi = {
                setting,
                planet,
                faction,
                augmentations: setting.augmentations
                    .sort(() => Math.random() - 0.5)
                    .slice(0, Math.floor(Math.random() * 3) + 1),
                spaceTravel: Math.random() < 0.7,
                alienContacts: ['Peaceful Traders', 'Hostile Warriors', 'Ancient Beings']
                    .sort(() => Math.random() - 0.5)
                    .slice(0, Math.floor(Math.random() * 2)),
                techLevel: Math.floor(Math.random() * 100) + 1
            };
            break;

        default:
            // Classic mode - no additional data
            break;
    }

    return result;
};

// 获取模式特定的生命周期修饰符
export const getModeLifespanModifier = (modeResult: ModeSpecificResult): number => {
    switch (modeResult.mode) {
        case 'historical':
            const period = modeResult.historical?.period;
            if (period) {
                return (period.lifeExpectancy.min + period.lifeExpectancy.max) / 2;
            }
            return 45; // 默认历史平均寿命

        case 'fantasy':
            const race = modeResult.fantasy?.race;
            if (race) {
                return (race.lifespan.min + race.lifespan.max) / 2;
            }
            return 200; // 默认幻想平均寿命

        case 'scifi':
            const setting = modeResult.scifi?.setting;
            if (setting) {
                return (setting.lifeExpectancy.min + setting.lifeExpectancy.max) / 2;
            }
            return 120; // 默认科幻平均寿命

        default:
            return 75; // 经典模式不修改
    }
}; 