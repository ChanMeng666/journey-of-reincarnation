import type { ReincarnationResult, KarmaProfile } from "@/types";

// 增强的生命阶段定义
export type EnhancedLifeStage = 
    | 'infant' 
    | 'childhood' 
    | 'adolescence' 
    | 'youth' 
    | 'early_adulthood' 
    | 'middle_adulthood' 
    | 'late_adulthood' 
    | 'elderly';

// 职业类别
export type CareerCategory = 
    | 'academic' 
    | 'artistic' 
    | 'business' 
    | 'healthcare' 
    | 'technology' 
    | 'manual' 
    | 'service' 
    | 'government' 
    | 'religious' 
    | 'military';

// 人际关系类型
export type RelationshipType = 
    | 'family' 
    | 'romantic' 
    | 'friendship' 
    | 'professional' 
    | 'mentor' 
    | 'rival';

// 重大事件类型
export type MajorEventType = 
    | 'birth' 
    | 'education' 
    | 'career_change' 
    | 'marriage' 
    | 'divorce' 
    | 'child_birth' 
    | 'death_of_loved_one' 
    | 'illness' 
    | 'accident' 
    | 'achievement' 
    | 'failure' 
    | 'travel' 
    | 'migration' 
    | 'spiritual_awakening' 
    | 'financial_crisis' 
    | 'inheritance';

// 定义具体的属性类型
export interface AttributeChanges {
    health?: number;
    wealth?: number;
    happiness?: number;
    intelligence?: number;
    charisma?: number;
    creativity?: number;
    resilience?: number;
    reputation?: number;
}

// 生命决策选项
export interface EnhancedDecisionOption {
    id: string;
    text: string;
    description: string;
    requirements?: {
        minAge?: number;
        maxAge?: number;
        attributes?: Record<string, number>;
        relationships?: string[];
        career?: string;
        education?: string;
        karma?: number;
    };
    consequences: {
        attributes?: AttributeChanges;
        relationships?: Record<string, number>;
        career?: string;
        karma?: number;
        health?: number;
        wealth?: number;
        happiness?: number;
        reputation?: number;
    };
    probability: number; // 0-100，影响是否出现此选项
}

// 生命事件
export interface LifeEvent {
    id: string;
    type: MajorEventType;
    stage: EnhancedLifeStage;
    age: number;
    title: string;
    description: string;
    options: EnhancedDecisionOption[];
    isAutomatic?: boolean; // 是否自动发生（无选择）
    significance: 'minor' | 'moderate' | 'major' | 'life_changing';
}

// 职业发展路径
export interface CareerPath {
    id: string;
    category: CareerCategory;
    name: string;
    description: string;
    requirements: {
        education: string[];
        attributes: Record<string, number>;
        age?: [number, number];
    };
    progression: {
        levels: string[];
        salaryRange: [number, number];
        satisfactionRange: [number, number];
    };
    skills: string[];
}

// 人际关系
export interface Relationship {
    id: string;
    type: RelationshipType;
    name: string;
    description: string;
    strength: number; // 0-100
    duration: number; // 年数
    impact: Record<string, number>; // 对各属性的影响
    isActive: boolean;
    startAge: number;
    endAge?: number;
}

// 增强的生命历程状态
export interface EnhancedLifeJourney {
    currentStage: EnhancedLifeStage;
    currentAge: number;
    attributes: {
        health: number;
        wealth: number;
        happiness: number;
        intelligence: number;
        charisma: number;
        creativity: number;
        resilience: number;
        reputation: number;
    };
    career: {
        category: CareerCategory | null;
        position: string;
        level: number;
        satisfaction: number;
        salary: number;
        experience: number;
    };
    education: {
        level: string; // 'elementary', 'high_school', 'bachelor', 'master', 'phd'
        field?: string;
        institutions: string[];
    };
    relationships: Relationship[];
    majorEvents: LifeEvent[];
    achievements: string[];
    regrets: string[];
    skills: string[];
    possessions: string[];
    locations: string[]; // 居住过的地方
    isCompleted: boolean;
}

// 生命阶段配置
export const ENHANCED_LIFE_STAGES: Record<EnhancedLifeStage, {
    ageRange: [number, number];
    name: string;
    description: string;
    commonEvents: MajorEventType[];
}> = {
    infant: {
        ageRange: [0, 2],
        name: '婴儿期',
        description: '生命的最初阶段，依赖他人照顾',
        commonEvents: ['birth']
    },
    childhood: {
        ageRange: [3, 12],
        name: '童年期',
        description: '探索世界，形成基础认知',
        commonEvents: ['education', 'illness', 'travel']
    },
    adolescence: {
        ageRange: [13, 17],
        name: '青春期',
        description: '身心快速发展，寻找自我身份',
        commonEvents: ['education', 'achievement', 'failure']
    },
    youth: {
        ageRange: [18, 25],
        name: '青年期',
        description: '选择人生道路，建立独立生活',
        commonEvents: ['education', 'career_change', 'marriage', 'travel']
    },
    early_adulthood: {
        ageRange: [26, 35],
        name: '成年早期',
        description: '事业发展，建立家庭',
        commonEvents: ['career_change', 'marriage', 'child_birth', 'achievement']
    },
    middle_adulthood: {
        ageRange: [36, 55],
        name: '中年期',
        description: '事业稳定，承担家庭责任',
        commonEvents: ['achievement', 'financial_crisis', 'illness', 'career_change']
    },
    late_adulthood: {
        ageRange: [56, 70],
        name: '成年后期',
        description: '经验丰富，准备退休',
        commonEvents: ['achievement', 'illness', 'death_of_loved_one', 'inheritance']
    },
    elderly: {
        ageRange: [71, 120],
        name: '老年期',
        description: '回顾人生，传承智慧',
        commonEvents: ['spiritual_awakening', 'illness', 'death_of_loved_one']
    }
};

// 职业路径配置
export const CAREER_PATHS: CareerPath[] = [
    {
        id: 'software_engineer',
        category: 'technology',
        name: '软件工程师',
        description: '开发软件和应用程序',
        requirements: {
            education: ['bachelor'],
            attributes: { intelligence: 70, creativity: 60 },
            age: [18, 50]
        },
        progression: {
            levels: ['初级工程师', '中级工程师', '高级工程师', '技术主管', '技术总监'],
            salaryRange: [30000, 200000],
            satisfactionRange: [60, 85]
        },
        skills: ['编程', '算法', '系统设计', '团队合作']
    },
    {
        id: 'doctor',
        category: 'healthcare',
        name: '医生',
        description: '诊断和治疗疾病',
        requirements: {
            education: ['phd'],
            attributes: { intelligence: 80, resilience: 70 },
            age: [25, 65]
        },
        progression: {
            levels: ['住院医师', '主治医师', '副主任医师', '主任医师', '科室主任'],
            salaryRange: [50000, 300000],
            satisfactionRange: [70, 90]
        },
        skills: ['医学知识', '诊断能力', '手术技能', '沟通能力']
    },
    {
        id: 'artist',
        category: 'artistic',
        name: '艺术家',
        description: '创作艺术作品',
        requirements: {
            education: ['high_school'],
            attributes: { creativity: 80, charisma: 60 },
            age: [16, 80]
        },
        progression: {
            levels: ['新手艺术家', '业余艺术家', '专业艺术家', '知名艺术家', '大师级艺术家'],
            salaryRange: [10000, 500000],
            satisfactionRange: [50, 95]
        },
        skills: ['绘画', '创意思维', '艺术理论', '表达能力']
    },
    {
        id: 'entrepreneur',
        category: 'business',
        name: '企业家',
        description: '创建和经营企业',
        requirements: {
            education: ['high_school'],
            attributes: { charisma: 70, resilience: 80 },
            age: [18, 70]
        },
        progression: {
            levels: ['初创者', '小企业主', '成功企业家', '连续创业者', '商业大亨'],
            salaryRange: [0, 1000000],
            satisfactionRange: [40, 100]
        },
        skills: ['领导力', '商业策略', '资源整合', '风险管理']
    },
    {
        id: 'teacher',
        category: 'academic',
        name: '教师',
        description: '教育和培养学生',
        requirements: {
            education: ['bachelor'],
            attributes: { intelligence: 65, charisma: 70 },
            age: [22, 65]
        },
        progression: {
            levels: ['实习教师', '正式教师', '骨干教师', '高级教师', '特级教师'],
            salaryRange: [25000, 80000],
            satisfactionRange: [60, 85]
        },
        skills: ['教学能力', '沟通技巧', '学科知识', '耐心']
    }
];

// 根据年龄获取生命阶段
export const getLifeStageByAge = (age: number): EnhancedLifeStage => {
    for (const [stage, config] of Object.entries(ENHANCED_LIFE_STAGES)) {
        if (age >= config.ageRange[0] && age <= config.ageRange[1]) {
            return stage as EnhancedLifeStage;
        }
    }
    return 'elderly';
};

// 生成动态生命事件
export const generateLifeEvents = (
    result: ReincarnationResult,
    journey: EnhancedLifeJourney,
    karmaProfile: KarmaProfile
): LifeEvent[] => {
    const events: LifeEvent[] = [];
    const stages = Object.keys(ENHANCED_LIFE_STAGES) as EnhancedLifeStage[];
    
    stages.forEach(stage => {
        const stageConfig = ENHANCED_LIFE_STAGES[stage];
        const [minAge, maxAge] = stageConfig.ageRange;
        
        if (result.lifespan >= minAge) {
            const eventsForStage = generateEventsForStage(
                stage, 
                Math.min(maxAge, result.lifespan), 
                result, 
                journey, 
                karmaProfile
            );
            events.push(...eventsForStage);
        }
    });
    
    return events.sort((a, b) => a.age - b.age);
};

// 为特定阶段生成事件
const generateEventsForStage = (
    stage: EnhancedLifeStage,
    maxAge: number,
    result: ReincarnationResult,
    journey: EnhancedLifeJourney,
    karmaProfile: KarmaProfile
): LifeEvent[] => {
    const events: LifeEvent[] = [];
    const stageConfig = ENHANCED_LIFE_STAGES[stage];
    const [minAge] = stageConfig.ageRange;
    
    // 每个阶段1-3个事件
    const eventCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < eventCount; i++) {
        const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
        const eventType = stageConfig.commonEvents[
            Math.floor(Math.random() * stageConfig.commonEvents.length)
        ];
        
        const event = createLifeEvent(eventType, stage, age, result, journey, karmaProfile);
        if (event) {
            events.push(event);
        }
    }
    
    return events;
};

// 创建具体的生命事件
const createLifeEvent = (
    type: MajorEventType,
    stage: EnhancedLifeStage,
    age: number,
    result: ReincarnationResult,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    journey: EnhancedLifeJourney,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    karmaProfile: KarmaProfile
): LifeEvent | null => {
    const eventTemplates: Record<MajorEventType, (age: number) => LifeEvent> = {
        birth: (age) => ({
            id: `birth_${age}`,
            type: 'birth',
            stage,
            age,
            title: '诞生',
            description: `你在${result.country}降生，开始了新的人生旅程。`,
            options: [],
            isAutomatic: true,
            significance: 'life_changing'
        }),
        
        education: (age) => ({
            id: `education_${age}`,
            type: 'education',
            stage,
            age,
            title: '教育机会',
            description: `你有机会接受${age < 18 ? '基础' : '高等'}教育。`,
            options: [
                {
                    id: 'study_hard',
                    text: '努力学习',
                    description: '专注于学业，追求知识',
                    consequences: {
                        attributes: { intelligence: 10, happiness: -5 },
                        karma: 5
                    },
                    probability: 100
                },
                {
                    id: 'balanced_approach',
                    text: '平衡发展',
                    description: '学习与生活并重',
                    consequences: {
                        attributes: { intelligence: 5, charisma: 5, happiness: 5 }
                    },
                    probability: 100
                },
                {
                    id: 'skip_education',
                    text: '放弃学习',
                    description: '选择其他人生道路',
                    consequences: {
                        attributes: { intelligence: -5, wealth: 10, happiness: 5 },
                        karma: -3
                    },
                    probability: 50
                }
            ],
            significance: 'major'
        }),
        
        career_change: (age) => ({
            id: `career_${age}`,
            type: 'career_change',
            stage,
            age,
            title: '职业转机',
            description: '你面临职业发展的重要选择。',
            options: [
                {
                    id: 'pursue_passion',
                    text: '追求理想',
                    description: '选择自己真正热爱的工作',
                    consequences: {
                        attributes: { happiness: 15, wealth: -10 },
                        karma: 10
                    },
                    probability: 80
                },
                {
                    id: 'choose_stability',
                    text: '选择稳定',
                    description: '优先考虑经济保障',
                    consequences: {
                        attributes: { wealth: 15, happiness: -5 }
                    },
                    probability: 100
                },
                {
                    id: 'take_risk',
                    text: '冒险创业',
                    description: '开创自己的事业',
                    consequences: {
                        attributes: { wealth: 25, resilience: 10, happiness: 10 },
                        karma: 5
                    },
                    probability: 30
                }
            ],
            significance: 'major'
        }),
        
        marriage: (age) => ({
            id: `marriage_${age}`,
            type: 'marriage',
            stage,
            age,
            title: '爱情与婚姻',
            description: '你遇到了人生中重要的另一半。',
            options: [
                {
                    id: 'marry_for_love',
                    text: '为爱结婚',
                    description: '选择真爱，不顾其他因素',
                    consequences: {
                        attributes: { happiness: 20, wealth: -5 },
                        karma: 15
                    },
                    probability: 80
                },
                {
                    id: 'practical_marriage',
                    text: '理性选择',
                    description: '综合考虑各种因素',
                    consequences: {
                        attributes: { wealth: 10, happiness: 10 }
                    },
                    probability: 100
                },
                {
                    id: 'stay_single',
                    text: '保持单身',
                    description: '专注于个人发展',
                    consequences: {
                        attributes: { creativity: 10, wealth: 5, happiness: -10 }
                    },
                    probability: 60
                }
            ],
            significance: 'life_changing'
        }),
        
        achievement: (age) => ({
            id: `achievement_${age}`,
            type: 'achievement',
            stage,
            age,
            title: '人生成就',
            description: '你在某个领域取得了重要成就。',
            options: [
                {
                    id: 'share_success',
                    text: '分享成功',
                    description: '与他人分享你的成功经验',
                    consequences: {
                        attributes: { reputation: 15, charisma: 10 },
                        karma: 20
                    },
                    probability: 100
                },
                {
                    id: 'humble_approach',
                    text: '保持谦逊',
                    description: '低调处理自己的成就',
                    consequences: {
                        attributes: { happiness: 10, reputation: 5 },
                        karma: 10
                    },
                    probability: 100
                }
            ],
            significance: 'major'
        }),
        
        // 其他事件类型的实现...
        divorce: (age) => ({
            id: `divorce_${age}`,
            type: 'divorce',
            stage,
            age,
            title: '婚姻危机',
            description: '你的婚姻面临危机。',
            options: [],
            significance: 'major'
        }),
        
        child_birth: (age) => ({
            id: `child_birth_${age}`,
            type: 'child_birth',
            stage,
            age,
            title: '新生命',
            description: '你迎来了新的家庭成员。',
            options: [],
            significance: 'life_changing'
        }),
        
        death_of_loved_one: (age) => ({
            id: `death_${age}`,
            type: 'death_of_loved_one',
            stage,
            age,
            title: '离别之痛',
            description: '你失去了重要的人。',
            options: [],
            significance: 'major'
        }),
        
        illness: (age) => ({
            id: `illness_${age}`,
            type: 'illness',
            stage,
            age,
            title: '健康挑战',
            description: '你面临健康问题的挑战。',
            options: [],
            significance: 'moderate'
        }),
        
        accident: (age) => ({
            id: `accident_${age}`,
            type: 'accident',
            stage,
            age,
            title: '意外事件',
            description: '一个意外改变了你的生活轨迹。',
            options: [],
            significance: 'moderate'
        }),
        
        failure: (age) => ({
            id: `failure_${age}`,
            type: 'failure',
            stage,
            age,
            title: '挫折与失败',
            description: '你经历了重大挫折。',
            options: [],
            significance: 'moderate'
        }),
        
        travel: (age) => ({
            id: `travel_${age}`,
            type: 'travel',
            stage,
            age,
            title: '旅行见闻',
            description: '一次旅行开阔了你的视野。',
            options: [],
            significance: 'minor'
        }),
        
        migration: (age) => ({
            id: `migration_${age}`,
            type: 'migration',
            stage,
            age,
            title: '迁移搬家',
            description: '你选择搬到新的地方生活。',
            options: [],
            significance: 'major'
        }),
        
        spiritual_awakening: (age) => ({
            id: `spiritual_${age}`,
            type: 'spiritual_awakening',
            stage,
            age,
            title: '精神觉醒',
            description: '你开始思考生命的深层意义。',
            options: [],
            significance: 'major'
        }),
        
        financial_crisis: (age) => ({
            id: `financial_${age}`,
            type: 'financial_crisis',
            stage,
            age,
            title: '经济危机',
            description: '你面临严重的经济困难。',
            options: [],
            significance: 'major'
        }),
        
        inheritance: (age) => ({
            id: `inheritance_${age}`,
            type: 'inheritance',
            stage,
            age,
            title: '意外之财',
            description: '你继承了一笔财产。',
            options: [],
            significance: 'moderate'
        })
    };
    
    return eventTemplates[type]?.(age) || null;
};

// 初始化增强生命历程
export const initializeEnhancedLifeJourney = (result: ReincarnationResult): EnhancedLifeJourney => {
    return {
        currentStage: 'infant',
        currentAge: 0,
        attributes: {
            health: result.health,
            wealth: result.socialClass === 'high' ? 70 : result.socialClass === 'middle' ? 50 : 30,
            happiness: 60,
            intelligence: 50 + (result.talents.includes('Mathematical Prodigy') ? 20 : 0),
            charisma: 50 + (result.talents.includes('Leadership Charisma') ? 15 : 0),
            creativity: 50 + (result.talents.includes('Artistic Vision') ? 20 : 0),
            resilience: 50,
            reputation: 20
        },
        career: {
            category: null,
            position: 'Unemployed',
            level: 0,
            satisfaction: 0,
            salary: 0,
            experience: 0
        },
        education: {
            level: 'none',
            institutions: []
        },
        relationships: [],
        majorEvents: [],
        achievements: [],
        regrets: [],
        skills: [],
        possessions: ['Basic Clothing'],
        locations: [result.country],
        isCompleted: false
    };
}; 