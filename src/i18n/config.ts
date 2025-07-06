import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            title: 'Journey of Reincarnation',
            start: 'Start Journey',
            reincarnate: 'Reincarnate',
            generating: 'Generating...',
            newLife: 'Your New Life',
            country: 'Country',
            gender: 'Gender',
            male: 'Male',
            female: 'Female',
            socialClass: 'Social Class',
            birthplace: 'Birthplace',
            yearsLifespan: 'years lifespan',
            modeActive: {
                historical: 'Historical Mode Active',
                fantasy: 'Fantasy Mode Active',
                scifi: 'Sci-Fi Mode Active'
            },
            enhancedExperience: 'Enhanced life experience with special features',
            familyStructure: 'Family Structure',
            onlyChild: 'Only Child',
            siblings: 'With Siblings',
            urban: 'Urban',
            suburban: 'Suburban',
            rural: 'Rural',
            low: 'Low Income',
            middle: 'Middle Income',
            high: 'High Income',
            // statistics: 'Statistics',
            globalDistribution: 'Global Distribution',
            socialClassDistribution: 'Social Class Distribution',
            birthplaceDistribution: 'Birthplace Distribution',
            previousLives: 'Previous Lives',
            difficultyLevel: 'Difficulty Level',
            shareResult: 'Share Result',
            shareDescription: 'Share your new life with others',
            shareText: 'I got reincarnated in Journey of Reincarnation!',
            copy: 'Copy',
            copied: 'Copied!',
            share: 'Share',
            tryYourLuck: 'Try your luck in reincarnation!',
            generatingText: 'Finding your next life...',
            birthLocation: 'Birth Location',
            specialEvent: {
                twinBirth: {
                    title: 'Twin Birth!',
                    description: 'You were born as one of twins! This is very rare.'
                },
                prodigy: {
                    title: 'Child Prodigy!',
                    description: 'You were born with extraordinary talents!'
                },
                historicalFigure: {
                    title: 'Historical Figure!',
                    description: 'You are destined to make history!'
                },
                prophetic: {
                    title: 'Prophetic Vision!',
                    description: 'You have been blessed with the gift of foresight.'
                },
                timeTraveler: {
                    title: 'Time Anomaly!',
                    description: 'You have experienced a temporal disturbance.'
                },
                miraculous: {
                    title: 'Miraculous Event!',
                    description: 'Something extraordinary has occurred in your life.'
                },
                continue: 'Continue'
            },
            compareTitle: 'Compare Lives',
            comparisons: 'Life Comparisons',
            rarityLabel: 'Rarity',
            worldMap: 'World Map',
            birthCountry: 'Birth Country',
            characteristics: 'Characteristics',
            playerCount: 'Player Count',
            totalLives: 'Total Lives',
            distribution: 'Distribution',
            gameStats: 'Game Statistics',
            loadingTitle: 'Loading',
            sharePlatform: {
                twitter: 'Share on Twitter',
                facebook: 'Share on Facebook',
                whatsapp: 'Share on WhatsApp'
            },
            musicControl: {
                play: 'Play Music',
                pause: 'Pause Music'
            },

            // 新增翻译
            era: 'Era',
            ancient: 'Ancient',
            medieval: 'Medieval',
            modern: 'Modern',
            future: 'Future',
            attributes: 'Attributes',
            health: 'Health',
            luck: 'Luck',
            lifespan: 'Lifespan',
            years: 'years',
            talents: 'Talents',
            personality: 'Personality',
            challenges: 'Life Challenges',
            opportunities: 'Life Opportunities',
            birthSeason: 'Birth Season',
            spring: 'Spring',
            summer: 'Summer',
            autumn: 'Autumn',
            winter: 'Winter',
            rarity: {
                common: 'Common',
                uncommon: 'Uncommon',
                rare: 'Rare',
                epic: 'Epic',
                legendary: 'Legendary'
            },

            statistics: {
                title: 'Statistics',
                globalDistribution: 'Global distribution of life circumstances',
                socialClassTitle: 'Social Class Distribution',
                birthplaceTitle: 'Birthplace Distribution',
                rarityTitle: 'Rarity Distribution',
                percentage: 'Percentage',
                population: 'Population',
                count: 'Count',
                urban: 'Urban',
                suburban: 'Suburban',
                rural: 'Rural',
                high: 'High Income',
                middle: 'Middle Income',
                low: 'Low Income',
                total: 'Total Lives',
                totalLives: 'Total Lives',
                avgLifespan: 'Avg Lifespan',
                achievements: 'Achievements',
                favCountry: 'Favorite Country',
                loading: 'Loading',
                noData: 'No data available'
            },
            close: 'Close',
            player: 'Player',

            // Life Journey System
            lifeJourney: {
                title: 'Life Journey',
                description: 'Experience your reincarnated life through key decisions and milestones',
                start: 'Start Life Journey',
                continue: 'Continue Journey',
                reset: 'Reset Journey',
                age: 'Age',
                stage: {
                    childhood: 'Childhood',
                    adolescence: 'Adolescence', 
                    youth: 'Youth',
                    adulthood: 'Adulthood',
                    middleAge: 'Middle Age',
                    elderlyAge: 'Elderly Age'
                },
                attributes: {
                    health: 'Health',
                    wealth: 'Wealth',
                    happiness: 'Happiness',
                    relationships: 'Relationships',
                    education: 'Education',
                    career: 'Career'
                },
                currentAttributes: 'Current Life Attributes',
                choosePath: 'Choose Your Path',
                timeRemaining: 'Time Remaining',
                hurryUp: 'Hurry! Time is running out...',
                confirmChoice: 'Confirm Choice',
                timesUp: 'Time\'s Up!',
                cancel: 'Cancel'
            },
            gameModes: {
                classic: 'Classic Mode',
                historical: 'Historical Mode', 
                fantasy: 'Fantasy Mode',
                scifi: 'Sci-Fi Mode',
                selector: {
                    title: 'Select Game Mode',
                    current: 'Current',
                    unlocked: 'Unlocked',
                    requires: 'Requires',
                    reincarnations: 'reincarnations',
                    overview: 'Game Modes Overview',
                    classicDesc: 'Traditional modern world reincarnation',
                    historicalDesc: 'Live through different historical eras',
                    fantasyDesc: 'Magical beings in fantasy realms',
                    scifiDesc: 'Futuristic civilizations and technology'
                }
            },
            leaderboard: {
                title: 'Community Leaderboard',
                score: 'Score',
                reincarnations: 'Lives',
                achievements: 'Achievements',
                lifespan: 'Lifespan',
                currentRank: 'Your Current Ranking',
                scoringSystem: 'Scoring System',
                yourRank: 'Your Rank',
                close: 'Close',
                rareLifes: 'Rare Lives',
                player: 'Player',
                rank: 'Rank',
                you: '(You)',
                years: 'years',
                achievementsLower: 'achievements',
                rareLifesLower: 'rare lives'
            },
            dataVisualization: {
                title: 'Data Visualization',
                overview: 'Overview',
                demographics: 'Demographics',
                performance: 'Performance',
                trends: 'Trends',
                totalLives: 'Total Lives',
                avgLifespan: 'Avg Lifespan',
                avgHealth: 'Avg Health',
                avgLuck: 'Avg Luck',
                rarityDistribution: 'Rarity Distribution',
                topCountries: 'Top Countries',
                loading: 'Loading data...',
                noData: 'No data available for visualization',
                close: 'Close',
                years: 'years',
                lives: 'lives'
            },
            modeSpecific: {
                historical: {
                    title: 'Historical Life',
                    events: 'Major Events',
                    discoveries: 'Discoveries',
                    plagues: 'Survived Plagues',
                    figure: 'Historical Figure'
                },
                fantasy: {
                    title: 'Fantasy Life',
                    magic: 'Magic',
                    strength: 'Strength',
                    intelligence: 'Intelligence',
                    quests: 'Quests Completed',
                    artifacts: 'Artifacts',
                    abilities: 'Abilities',
                    weaknesses: 'Weaknesses'
                },
                scifi: {
                    title: 'Sci-Fi Life',
                    location: 'Location',
                    faction: 'Faction',
                    techLevel: 'Technology Level',
                    augmentations: 'Augmentations',
                    spaceTravel: 'Space Travel',
                    alienContacts: 'Alien Contacts'
                }
            },

            // Karma System
            karma: {
                title: 'Soul Profile',
                description: 'Your reincarnation journey and karma accumulation',
                overview: 'Overview',
                karmaDetails: 'Karma Details',
                events: 'Karma Events',
                soulLevel: 'Soul Level',
                totalKarma: 'Total Karma',
                reincarnations: 'Reincarnations',
                lastUpdated: 'Last Updated',
                unlockedAbilities: 'Unlocked Abilities',
                recentEvents: 'Recent Karma Events',
                noEvents: 'No karma events recorded yet',
                newSoul: 'Your soul has just begun its journey...',
                categories: {
                    moral: 'Moral Karma',
                    social: 'Social Karma',
                    environmental: 'Environmental Karma',
                    intellectual: 'Intellectual Karma',
                    spiritual: 'Spiritual Karma'
                },
                levels: {
                    1: 'Newborn Soul',
                    2: 'Awakened Soul',
                    3: 'Growing Soul',
                    4: 'Wise Soul',
                    5: 'Enlightened Soul',
                    6: 'Saint Soul',
                    7: 'Transcendent Soul',
                    8: 'Divine Soul',
                    9: 'Supreme Soul',
                    10: 'Eternal Soul'
                },
                experienceToNext: 'Experience needed for next level',
                maxLevel: 'Maximum level reached',
                level: 'Level',
                experience: 'experience',
                actions: {
                    moral_choice: {
                        name: 'Moral Choice',
                        description: 'Make the right choice in moral dilemmas'
                    },
                    helping_others: {
                        name: 'Helping Others',
                        description: 'Help others solve their problems'
                    },
                    causing_harm: {
                        name: 'Causing Harm',
                        description: 'Intentionally harm others physically or mentally'
                    },
                    charity: {
                        name: 'Charitable Acts',
                        description: 'Make charitable donations or volunteer service'
                    },
                    greed: {
                        name: 'Greedy Behavior',
                        description: 'Harm others for personal gain'
                    },
                    wisdom_sharing: {
                        name: 'Sharing Wisdom',
                        description: 'Share knowledge and wisdom'
                    },
                    environmental_action: {
                        name: 'Environmental Action',
                        description: 'Protect the environment and nature'
                    },
                    leadership: {
                        name: 'Righteous Leadership',
                        description: 'Lead others in a righteous way'
                    },
                    betrayal: {
                        name: 'Betrayal',
                        description: 'Betray trust and promises'
                    },
                    sacrifice: {
                        name: 'Selfless Dedication',
                        description: 'Make sacrifices for others or causes'
                    },
                    innovation: {
                        name: 'Innovation Contribution',
                        description: 'Create new things beneficial to society'
                    },
                    destruction: {
                        name: 'Destructive Behavior',
                        description: 'Destroy public property or harmony'
                    }
                },
                eventDescriptions: {
                    moral_choice_positive: 'During difficult times in {{country}}, you chose moral righteousness and helped innocent people.',
                    moral_choice_negative: 'Faced with moral dilemmas, you chose a selfish path and harmed others.',
                    helping_others: 'You actively helped those in need in {{country}}, spreading kindness.',
                    causing_harm: 'Your actions brought pain and distress to others in {{country}}.',
                    charity: 'You conducted charitable activities in {{country}}, helping many poor families.',
                    greed: 'You made greedy decisions in {{country}} for personal gain.',
                    wisdom_sharing: 'You shared knowledge and wisdom in {{country}}, inspiring many people.',
                    environmental_action: 'You actively protected the environment in {{country}}, leaving a beautiful world for future generations.',
                    leadership: 'You led others in a righteous way in {{country}}, bringing positive change.',
                    betrayal: 'You betrayed those who trusted you in {{country}}, causing lasting harm.',
                    sacrifice: 'You made great sacrifices for the greater good in {{country}}.',
                    innovation: 'You created new technologies or ideas beneficial to society in {{country}}.',
                    destruction: 'You destroyed public property and social harmony in {{country}}.'
                }
            },

            // Enhanced Life Journey
            enhancedLifeJourney: {
                title: 'Life Journey',
                description: 'Experience your reincarnated life through interactive decisions',
                initializing: 'Initializing life journey...',
                age: 'Age',
                year: 'years old',
                lifeProgress: 'Life Progress',
                start: 'Start',
                pause: 'Pause',
                reset: 'Reset',
                speed: 'Speed',
                overview: 'Overview',
                attributesTab: 'Attributes',
                career: 'Career',
                events: 'Events',
                currentJob: 'Current Position',
                careerLevel: 'Career Level',
                salary: 'Salary',
                jobSatisfaction: 'Job Satisfaction',
                education: 'Education',
                residence: 'Residence',
                relationships: 'Relationships',
                activeRelationships: 'active relationships',
                majorLifeEvents: 'Major Life Events',
                noEventsYet: 'No major events have occurred yet',
                level: 'Level',
                eventDialog: {
                    title: 'Life Decision',
                    choose: 'Choose your response:'
                },
                attributeTypes: {
                    health: 'Health',
                    wealth: 'Wealth',
                    happiness: 'Happiness',
                    intelligence: 'Intelligence',
                    charisma: 'Charisma',
                    creativity: 'Creativity',
                    resilience: 'Resilience',
                    reputation: 'Reputation'
                },
                stages: {
                    infant: 'Infancy',
                    childhood: 'Childhood',
                    adolescence: 'Adolescence',
                    youth: 'Youth',
                    early_adulthood: 'Early Adulthood',
                    middle_adulthood: 'Middle Adulthood',
                    late_adulthood: 'Late Adulthood',
                    elderly: 'Elderly'
                },
                significance: {
                    minor: 'Minor Event',
                    moderate: 'Important Event',
                    major: 'Major Event',
                    life_changing: 'Life-Changing Event'
                }
            },

            // Additional UI Elements
            selectGameMode: 'Select Game Mode',
            yourNewLife: 'Your New Life',
            achievementUnlocked: 'Achievement Unlocked!',
            clickToViewAchievements: 'Click to view achievements',
            reincarnateButton: 'Reincarnate',
            generateNewLife: 'Generate New Life',

            // Achievements
            achievements: {
                title: 'Achievements',
                progress: 'Track your reincarnation achievements',
                completed: 'completed',
                all: 'All',
                noAchievements: 'No achievements found',
                achievementUnlocked: 'Achievement Unlocked!',
                rarity: {
                    common: 'Common',
                    uncommon: 'Uncommon',
                    rare: 'Rare',
                    epic: 'Epic',
                    legendary: 'Legendary'
                },
                first_reincarnation: {
                    name: 'First Journey',
                    description: 'Complete your first reincarnation'
                },
                explorer: {
                    name: 'World Explorer',
                    description: 'Be reincarnated in 5 different countries'
                },
                seasoned_traveler: {
                    name: 'Seasoned Traveler',
                    description: 'Experience 10 reincarnations'
                },
                rare_life: {
                    name: 'Rare Life',
                    description: 'Experience a rare reincarnation'
                },
                epic_destiny: {
                    name: 'Epic Destiny',
                    description: 'Achieve an epic reincarnation'
                },
                legendary_soul: {
                    name: 'Legendary Soul',
                    description: 'Unlock a legendary reincarnation'
                },
                perfect_health: {
                    name: 'Perfect Health',
                    description: 'Be born with 100 health points'
                },
                lucky_charm: {
                    name: 'Lucky Charm',
                    description: 'Achieve maximum luck (100)'
                },
                centenarian: {
                    name: 'Centenarian',
                    description: 'Live to 100 years or more'
                },
                multi_talented: {
                    name: 'Multi-Talented',
                    description: 'Be born with 4 or more talents'
                },
                genius: {
                    name: 'Genius',
                    description: 'Be born as a Mathematical Prodigy'
                },
                artist: {
                    name: 'Born Artist',
                    description: 'Be born with Artistic Vision'
                },
                china_born: {
                    name: 'Middle Kingdom',
                    description: 'Be born in China'
                },
                usa_born: {
                    name: 'American Dream',
                    description: 'Be born in the United States'
                },
                japan_born: {
                    name: 'Land of the Rising Sun',
                    description: 'Be born in Japan'
                },
                time_traveler: {
                    name: 'Time Traveler',
                    description: 'Experience reincarnations in different eras'
                },
                ancient_soul: {
                    name: 'Ancient Soul',
                    description: 'Be reincarnated in ancient times'
                },
                future_vision: {
                    name: 'Future Vision',
                    description: 'Be born in the future era'
                },
                high_society: {
                    name: 'High Society',
                    description: 'Be born into high social class'
                },
                humble_beginnings: {
                    name: 'Humble Beginnings',
                    description: 'Be born into low social class'
                },
                collector: {
                    name: 'Life Collector',
                    description: 'Experience 50 reincarnations'
                },
                master_collector: {
                    name: 'Master Collector',
                    description: 'Experience 100 reincarnations'
                },
                golden_life: {
                    name: 'Golden Life',
                    description: 'Be born with high health, luck, and long lifespan'
                },
                renaissance_soul: {
                    name: 'Renaissance Soul',
                    description: 'Have multiple talents in different fields'
                },
                dragon_power: {
                    name: 'Dragon Power',
                    description: 'Be born in the year of the Dragon'
                },
                tiger_spirit: {
                    name: 'Tiger Spirit',
                    description: 'Be born in the year of the Tiger'
                },
                spring_child: {
                    name: 'Spring Child',
                    description: 'Be born in spring'
                },
                winter_warrior: {
                    name: 'Winter Warrior',
                    description: 'Be born in winter'
                }
            }
        }
    },
    zh: {
        translation: {
            title: '轮回之旅',
            start: '开始旅程',
            reincarnate: '重新投胎',
            generating: '生成中...',
            newLife: '你的新人生',
            country: '国家',
            gender: '性别',
            male: '男',
            female: '女',
            socialClass: '社会阶层',
            birthplace: '出生地',
            yearsLifespan: '年寿命',
            modeActive: {
                historical: '历史模式激活',
                fantasy: '奇幻模式激活',
                scifi: '科幻模式激活'
            },
            enhancedExperience: '增强的生命体验和特殊功能',
            familyStructure: '家庭结构',
            onlyChild: '独生子女',
            siblings: '有兄弟姐妹',
            urban: '城市',
            suburban: '郊区',
            rural: '农村',
            low: '低收入',
            middle: '中等收入',
            high: '高收入',
            // statistics: '统计数据',
            globalDistribution: '全球分布',
            socialClassDistribution: '社会阶层分布',
            birthplaceDistribution: '出生地分布',
            previousLives: '前世记录',
            difficultyLevel: '人生难度',
            shareResult: '分享结果',
            shareDescription: '与他人分享你的新人生',
            shareText: '我在轮回之旅中重生了！',
            copy: '复制',
            copied: '已复制！',
            share: '分享',
            tryYourLuck: '来试试你的轮回运气吧！',
            generatingText: '寻找你的来世中...',
            birthLocation: '出生地点',
            specialEvent: {
                twinBirth: {
                    title: '双生子！',
                    description: '你出生为双胞胎之一！这是很罕见的。'
                },
                prodigy: {
                    title: '天才儿童！',
                    description: '你天生就拥有非凡的才能！'
                },
                historicalFigure: {
                    title: '历史人物！',
                    description: '你注定要创造历史！'
                },
                prophetic: {
                    title: '预言异象！',
                    description: '你获得了预知未来的天赋。'
                },
                timeTraveler: {
                    title: '时空异常！',
                    description: '你经历了时间上的扭曲。'
                },
                miraculous: {
                    title: '奇迹事件！',
                    description: '你的人生中发生了不可思议的事情。'
                },
                continue: '继续'
            },
            compareTitle: '人生对比',
            comparisons: '生命历程对比',
            rarityLabel: '稀有度',
            worldMap: '世界地图',
            birthCountry: '出生国家',
            characteristics: '个人特征',
            playerCount: '玩家数量',
            totalLives: '总转世次数',
            distribution: '分布情况',
            gameStats: '游戏统计',
            loadingTitle: '加载中',
            sharePlatform: {
                twitter: '分享到推特',
                facebook: '分享到脸书',
                whatsapp: '分享到WhatsApp'
            },
            musicControl: {
                play: '播放音乐',
                pause: '暂停音乐'
            },

            // 新增翻译
            era: '时代',
            ancient: '古代',
            medieval: '中世纪',
            renaissance: '文艺复兴',
            industrial: '工业革命',
            modern: '现代',
            contemporary: '当代',
            future: '未来',
            health: '健康',
            luck: '运气',
            talents: '天赋',
            lifespan: '寿命',
            rarity: '稀有度',
            
            // Game Mode Selector
            gameModeSelector: {
                title: '选择游戏模式',
                classic: '经典模式',
                historical: '历史模式',
                fantasy: '奇幻模式',
                scifi: '科幻模式',
                status: {
                    normal: '正常',
                    locked: '锁定',
                    special: '特殊',
                    active: '激活'
                },
                requirements: {
                    play: '需要进行',
                    times: '次转世',
                    lives: '次人生',
                    reincarnations: '次轮回'
                },
                close: '关闭'
            },
            
            // Data Visualization
            dataVisualization: {
                title: '数据可视化',
                loading: '加载统计数据...',
                statistics: '统计数据',
                rarityDistribution: '稀有度分布',
                topCountries: '出生地排行',
                close: '关闭',
                units: {
                    years: '年',
                    lives: '次人生'
                }
            },
            
            // Community Leaderboard
            leaderboard: {
                title: '社区排行榜',
                categories: {
                    totalLives: '总转世数',
                    averageLifespan: '平均寿命',
                    highestHealth: '最高健康',
                    luckiestPlayer: '最幸运玩家',
                    mostTalented: '最有天赋',
                    achievements: '成就数量'
                },
                playerStats: {
                    player: '玩家',
                    rank: '排名',
                    score: '分数',
                    achievements: '成就'
                },
                timeUnits: {
                    years: '年',
                    lives: '次人生',
                    points: '分',
                    unlocked: '已解锁'
                },
                close: '关闭'
            },

            // Additional UI Elements
            selectGameMode: '选择游戏模式',
            yourNewLife: '你的新人生',
            achievementUnlocked: '成就解锁！',
            clickToViewAchievements: '点击查看成就',
            reincarnateButton: '重新投胎',
            generateNewLife: '生成新人生',

            // Game Modes
            gameModes: {
                classic: '经典模式',
                historical: '历史模式',
                fantasy: '奇幻模式',
                scifi: '科幻模式',
                selector: {
                    title: '选择游戏模式',
                    current: '当前',
                    unlocked: '已解锁',
                    requires: '需要',
                    reincarnations: '次轮回',
                    overview: '游戏模式概览',
                    classicDesc: '传统现代世界轮回',
                    historicalDesc: '体验不同的历史时代',
                    fantasyDesc: '奇幻世界中的魔法生物',
                    scifiDesc: '未来文明和先进科技'
                }
            },

            // 业力系统
            karma: {
                title: '灵魂档案',
                description: '你的轮回历程和业力积累',
                overview: '概览',
                karmaDetails: '业力详情',
                events: '业力事件',
                soulLevel: '灵魂等级',
                totalKarma: '总业力',
                reincarnations: '轮回次数',
                lastUpdated: '上次更新',
                unlockedAbilities: '已解锁能力',
                recentEvents: '最近业力事件',
                noEvents: '还没有业力事件记录',
                newSoul: '你的灵魂刚刚开始它的旅程...',
                categories: {
                    moral: '道德业力',
                    social: '社会业力',
                    environmental: '环境业力',
                    intellectual: '智慧业力',
                    spiritual: '精神业力'
                },
                levels: {
                    1: '初生灵魂',
                    2: '觉醒灵魂',
                    3: '成长灵魂',
                    4: '智慧灵魂',
                    5: '开悟灵魂',
                    6: '圣者灵魂',
                    7: '超脱灵魂',
                    8: '神圣灵魂',
                    9: '至尊灵魂',
                    10: '永恒灵魂'
                },
                experienceToNext: '距离下一级还需',
                maxLevel: '已达到最高等级',
                level: '等级',
                experience: '点经验',
                actions: {
                    moral_choice: {
                        name: '道德选择',
                        description: '在道德困境中做出正确选择'
                    },
                    helping_others: {
                        name: '助人为乐',
                        description: '帮助他人解决困难'
                    },
                    causing_harm: {
                        name: '伤害他人',
                        description: '故意伤害他人身心'
                    },
                    charity: {
                        name: '慈善行为',
                        description: '进行慈善捐赠或志愿服务'
                    },
                    greed: {
                        name: '贪婪行为',
                        description: '为了个人利益损害他人'
                    },
                    wisdom_sharing: {
                        name: '智慧分享',
                        description: '分享知识和智慧'
                    },
                    environmental_action: {
                        name: '环保行为',
                        description: '保护环境和自然'
                    },
                    leadership: {
                        name: '正义领导',
                        description: '以正义方式领导他人'
                    },
                    betrayal: {
                        name: '背叛行为',
                        description: '背叛信任和承诺'
                    },
                    sacrifice: {
                        name: '无私奉献',
                        description: '为他人或事业做出牺牲'
                    },
                    innovation: {
                        name: '创新贡献',
                        description: '创造对社会有益的新事物'
                    },
                    destruction: {
                        name: '破坏行为',
                        description: '破坏公共财产或和谐'
                    }
                },
                eventDescriptions: {
                    moral_choice_positive: '在{{country}}的困难时期，你选择了道德正义，帮助了无辜的人们。',
                    moral_choice_negative: '面对道德困境，你选择了自私的道路，伤害了他人。',
                    helping_others: '你在{{country}}积极帮助需要帮助的人，传播了善意。',
                    causing_harm: '你的行为给{{country}}的其他人带来了痛苦和困扰。',
                    charity: '你在{{country}}进行了慈善活动，帮助了许多贫困家庭。',
                    greed: '你为了个人利益，在{{country}}做出了贪婪的行为。',
                    wisdom_sharing: '你在{{country}}分享知识和智慧，启发了很多人。',
                    environmental_action: '你在{{country}}积极保护环境，为后代留下了美好的世界。',
                    leadership: '你在{{country}}以正义的方式领导他人，带来了积极的改变。',
                    betrayal: '你背叛了在{{country}}信任你的人，造成了深远的伤害。',
                    sacrifice: '你在{{country}}为了更大的利益做出了巨大的牺牲。',
                    innovation: '你在{{country}}创造了对社会有益的新技术或理念。',
                    destruction: '你在{{country}}破坏了公共财产和社会和谐。'
                }
            },

            // 增强生命历程
            enhancedLifeJourney: {
                title: '人生历程',
                description: '通过交互式决策体验你的轮回人生',
                initializing: '初始化生命历程...',
                age: '年龄',
                year: '岁',
                lifeProgress: '生命进度',
                start: '开始',
                pause: '暂停',
                reset: '重置',
                speed: '速度',
                overview: '概览',
                attributesTab: '属性',
                career: '职业',
                events: '事件',
                currentJob: '当前职位',
                careerLevel: '职业等级',
                salary: '薪资',
                jobSatisfaction: '工作满意度',
                education: '教育',
                residence: '居住地',
                relationships: '关系',
                activeRelationships: '个活跃关系',
                majorLifeEvents: '主要人生事件',
                noEventsYet: '还没有重大事件发生',
                level: '等级',
                eventDialog: {
                    title: '人生决策',
                    choose: '选择你的回应方式：'
                },
                attributeTypes: {
                    health: '健康',
                    wealth: '财富',
                    happiness: '幸福',
                    intelligence: '智力',
                    charisma: '魅力',
                    creativity: '创造力',
                    resilience: '韧性',
                    reputation: '声誉'
                },
                stages: {
                    infant: '婴儿期',
                    childhood: '童年期',
                    adolescence: '青春期',
                    youth: '青年期',
                    early_adulthood: '成年早期',
                    middle_adulthood: '中年期',
                    late_adulthood: '成年后期',
                    elderly: '老年期'
                },
                significance: {
                    minor: '一般事件',
                    moderate: '重要事件',
                    major: '重大事件',
                    life_changing: '人生转折'
                }
            },

            // 成就系统
            achievements: {
                title: '成就',
                progress: '追踪你的轮回成就',
                completed: '完成',
                all: '全部',
                noAchievements: '没有找到成就',
                achievementUnlocked: '成就解锁！',
                rarity: {
                    common: '普通',
                    uncommon: '不凡',
                    rare: '稀有',
                    epic: '史诗',
                    legendary: '传奇'
                },
                first_reincarnation: {
                    name: '初次旅程',
                    description: '完成你的第一次轮回'
                },
                explorer: {
                    name: '世界探索者',
                    description: '在5个不同国家轮回转世'
                },
                seasoned_traveler: {
                    name: '经验丰富的旅者',
                    description: '体验10次轮回'
                },
                rare_life: {
                    name: '稀有人生',
                    description: '体验一次稀有轮回'
                },
                epic_destiny: {
                    name: '史诗命运',
                    description: '获得史诗级轮回'
                },
                legendary_soul: {
                    name: '传奇灵魂',
                    description: '解锁传奇级轮回'
                },
                perfect_health: {
                    name: '完美健康',
                    description: '出生时拥有100点健康值'
                },
                lucky_charm: {
                    name: '幸运符',
                    description: '达到最大幸运值(100)'
                },
                centenarian: {
                    name: '百岁老人',
                    description: '活到100岁或以上'
                },
                multi_talented: {
                    name: '多才多艺',
                    description: '出生时拥有4个或更多天赋'
                },
                genius: {
                    name: '天才',
                    description: '出生为数学天才'
                },
                artist: {
                    name: '天生艺术家',
                    description: '出生时拥有艺术视野'
                },
                china_born: {
                    name: '中央之国',
                    description: '出生在中国'
                },
                usa_born: {
                    name: '美国梦',
                    description: '出生在美国'
                },
                japan_born: {
                    name: '日出之国',
                    description: '出生在日本'
                },
                time_traveler: {
                    name: '时间旅者',
                    description: '在不同时代体验轮回'
                },
                ancient_soul: {
                    name: '古老灵魂',
                    description: '在古代时期轮回转世'
                },
                future_vision: {
                    name: '未来视野',
                    description: '出生在未来时代'
                },
                high_society: {
                    name: '上流社会',
                    description: '出生在高社会阶层'
                },
                humble_beginnings: {
                    name: '低微出身',
                    description: '出生在低社会阶层'
                },
                collector: {
                    name: '人生收集者',
                    description: '体验50次轮回'
                },
                master_collector: {
                    name: '大师收集者',
                    description: '体验100次轮回'
                },
                golden_life: {
                    name: '黄金人生',
                    description: '出生时拥有高健康、高运气和长寿命'
                },
                renaissance_soul: {
                    name: '文艺复兴之魂',
                    description: '在不同领域拥有多重天赋'
                },
                dragon_power: {
                    name: '龙之力量',
                    description: '出生在龙年'
                },
                tiger_spirit: {
                    name: '虎之精神',
                    description: '出生在虎年'
                },
                spring_child: {
                    name: '春之子',
                    description: '出生在春天'
                },
                winter_warrior: {
                    name: '冬之战士',
                    description: '出生在冬天'
                }
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // 默认语言
        fallbackLng: 'en', // 备用语言
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;
