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
                    description: 'You were born as a twin! This is a rare occurrence.'
                },
                prodigy: {
                    title: 'Child Prodigy!',
                    description: 'You were born with exceptional talents!'
                },
                historicalFigure: {
                    title: 'Historical Figure!',
                    description: 'You are destined to make history!'
                },
                continue: 'Continue'
            },
            compareTitle: 'Compare Lives',
            comparisons: 'Life Comparisons',
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
            achievements: {
                title: 'Achievements',
                description: 'Track your reincarnation accomplishments',
                complete: 'complete',
                unlocked: 'Unlocked',
                unlockedOn: 'Unlocked on'
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
                scifi: 'Sci-Fi Mode'
            },
            leaderboard: {
                title: 'Community Leaderboard',
                score: 'Score',
                reincarnations: 'Lives',
                achievements: 'Achievements',
                lifespan: 'Lifespan',
                currentRank: 'Your Current Ranking',
                scoringSystem: 'Scoring System',
                yourRank: 'Your Rank'
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
                avgLuck: 'Avg Luck'
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
                continue: '继续'
            },
            compareTitle: '人生对比',
            comparisons: '生命历程对比',
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
            modern: '现代',
            future: '未来',
            attributes: '属性',
            health: '健康',
            luck: '运气',
            lifespan: '寿命',
            years: '年',
            talents: '天赋',
            personality: '性格',
            challenges: '人生挑战',
            opportunities: '人生机遇',
            birthSeason: '出生季节',
            spring: '春季',
            summer: '夏季',
            autumn: '秋季',
            winter: '冬季',
            rarity: {
                common: '普通',
                uncommon: '不凡',
                rare: '稀有',
                epic: '史诗',
                legendary: '传奇'
            },
            achievements: {
                title: '成就',
                description: '追踪你的轮回成就',
                complete: '完成',
                unlocked: '已解锁',
                unlockedOn: '解锁于'
            },
            statistics: {
                title: '统计数据',
                globalDistribution: '人生环境全球分布',
                socialClassTitle: '社会阶层分布',
                birthplaceTitle: '出生地分布',
                rarityTitle: '稀有度分布',
                percentage: '百分比',
                population: '人口',
                count: '数量',
                urban: '城市',
                suburban: '郊区',
                rural: '农村',
                high: '高收入',
                middle: '中等收入',
                low: '低收入',
                total: '总生命数',
                totalLives: '总生命数',
                avgLifespan: '平均寿命',
                achievements: '成就',
                favCountry: '最爱国家',
                loading: '加载中',
                noData: '暂无数据'
            },
            close: '关闭',

            // Life Journey System
            lifeJourney: {
                title: '人生旅程',
                description: '通过关键决策和里程碑体验你的轮回人生',
                start: '开始人生旅程',
                continue: '继续旅程',
                reset: '重置旅程',
                age: '年龄',
                stage: {
                    childhood: '童年期',
                    adolescence: '青少年期', 
                    youth: '青年期',
                    adulthood: '成年期',
                    middleAge: '中年期',
                    elderlyAge: '老年期'
                },
                attributes: {
                    health: '健康',
                    wealth: '财富',
                    happiness: '幸福',
                    relationships: '人际关系',
                    education: '教育',
                    career: '事业'
                },
                currentAttributes: '当前人生属性',
                choosePath: '选择你的道路',
                timeRemaining: '剩余时间',
                hurryUp: '快点！时间快用完了...',
                confirmChoice: '确认选择',
                timesUp: '时间到！',
                cancel: '取消'
            },
            gameModes: {
                classic: '经典模式',
                historical: '历史模式', 
                fantasy: '奇幻模式',
                scifi: '科幻模式'
            },
            leaderboard: {
                title: '社区排行榜',
                score: '总分',
                reincarnations: '轮回次数',
                achievements: '成就数',
                lifespan: '总寿命',
                currentRank: '你的当前排名',
                scoringSystem: '评分系统',
                yourRank: '你的排名'
            },
            dataVisualization: {
                title: '数据可视化',
                overview: '概览',
                demographics: '人口统计',
                performance: '表现',
                trends: '趋势',
                totalLives: '总生命数',
                avgLifespan: '平均寿命',
                avgHealth: '平均健康',
                avgLuck: '平均运气'
            },
            modeSpecific: {
                historical: {
                    title: '历史人生',
                    events: '重大事件',
                    discoveries: '发现',
                    plagues: '幸存瘟疫',
                    figure: '历史人物'
                },
                fantasy: {
                    title: '奇幻人生',
                    magic: '魔法',
                    strength: '力量',
                    intelligence: '智力',
                    quests: '完成任务',
                    artifacts: '神器',
                    abilities: '能力',
                    weaknesses: '弱点'
                },
                scifi: {
                    title: '科幻人生',
                    location: '位置',
                    faction: '派系',
                    techLevel: '科技水平',
                    augmentations: '增强改造',
                    spaceTravel: '太空旅行',
                    alienContacts: '外星接触'
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
