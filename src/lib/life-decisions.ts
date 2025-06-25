import type { LifeDecision, LifeStage, DecisionOption, LifeEventResult, EnhancedReincarnationResult } from "@/types";

// 人生阶段年龄范围
export const LIFE_STAGES: Record<LifeStage, { minAge: number; maxAge: number; name: string }> = {
    childhood: { minAge: 0, maxAge: 12, name: 'Childhood' },
    adolescence: { minAge: 13, maxAge: 17, name: 'Adolescence' },
    youth: { minAge: 18, maxAge: 25, name: 'Youth' },
    adulthood: { minAge: 26, maxAge: 45, name: 'Adulthood' },
    middleAge: { minAge: 46, maxAge: 65, name: 'Middle Age' },
    elderlyAge: { minAge: 66, maxAge: 120, name: 'Elderly Age' }
};

// 预定义的人生决策事件
export const LIFE_DECISIONS: LifeDecision[] = [
    // 童年期决策
    {
        id: 'childhood_hobby',
        stage: 'childhood',
        age: 8,
        situation: 'Choosing a Hobby',
        description: 'Your parents want you to choose an after-school activity. What interests you most?',
        options: [
            {
                id: 'music',
                text: 'Learn to play piano',
                consequences: { happiness: 10, education: 5, career: 5 }
            },
            {
                id: 'sports',
                text: 'Join a sports team',
                consequences: { health: 15, relationships: 10, happiness: 5 }
            },
            {
                id: 'art',
                text: 'Take art classes',
                consequences: { happiness: 12, education: 8, career: 3 }
            },
            {
                id: 'reading',
                text: 'Spend time reading books',
                consequences: { education: 15, happiness: 5, career: 8 }
            }
        ]
    },
    {
        id: 'childhood_friendship',
        stage: 'childhood',
        age: 10,
        situation: 'Making Friends',
        description: 'You meet a new classmate who seems lonely. How do you approach them?',
        options: [
            {
                id: 'befriend',
                text: 'Invite them to play with you',
                consequences: { relationships: 15, happiness: 10 }
            },
            {
                id: 'ignore',
                text: 'Focus on your existing friends',
                consequences: { relationships: -5, happiness: 5 }
            },
            {
                id: 'help',
                text: 'Help them with schoolwork',
                consequences: { relationships: 10, education: 5, happiness: 8 }
            }
        ]
    },

    // 青少年期决策
    {
        id: 'adolescence_education',
        stage: 'adolescence',
        age: 15,
        situation: 'Academic Focus',
        description: 'High school is getting more challenging. Where do you focus your efforts?',
        options: [
            {
                id: 'sciences',
                text: 'Excel in science and math',
                consequences: { education: 20, career: 15, health: -5 }
            },
            {
                id: 'arts',
                text: 'Pursue arts and literature',
                consequences: { education: 15, happiness: 15, career: 10 }
            },
            {
                id: 'social',
                text: 'Balance studies with social life',
                consequences: { education: 10, relationships: 20, happiness: 10 }
            },
            {
                id: 'vocational',
                text: 'Learn practical trade skills',
                consequences: { career: 25, wealth: 10, education: 5 }
            }
        ]
    },
    {
        id: 'adolescence_risk',
        stage: 'adolescence',
        age: 16,
        situation: 'Peer Pressure',
        description: 'Your friends are engaging in risky behavior and want you to join them.',
        options: [
            {
                id: 'refuse',
                text: 'Say no and find new friends',
                consequences: { health: 10, education: 5, relationships: -10, happiness: -5 }
            },
            {
                id: 'join',
                text: 'Go along to fit in',
                consequences: { health: -15, relationships: 10, happiness: 5, education: -10 }
            },
            {
                id: 'alternative',
                text: 'Suggest safer alternative activities',
                consequences: { relationships: 5, happiness: 10, health: 5 }
            }
        ]
    },

    // 青年期决策
    {
        id: 'youth_career',
        stage: 'youth',
        age: 22,
        situation: 'Career Choice',
        description: 'You\'ve graduated and need to choose your career path.',
        options: [
            {
                id: 'corporate',
                text: 'Join a large corporation',
                consequences: { wealth: 20, career: 15, health: -5, happiness: -5 }
            },
            {
                id: 'startup',
                text: 'Work at a startup company',
                consequences: { career: 20, wealth: 5, health: -10, happiness: 15 }
            },
            {
                id: 'freelance',
                text: 'Become a freelancer',
                consequences: { happiness: 20, wealth: -5, career: 10, health: 5 }
            },
            {
                id: 'nonprofit',
                text: 'Work for a nonprofit organization',
                consequences: { happiness: 25, relationships: 15, wealth: -10, career: 5 }
            }
        ]
    },
    {
        id: 'youth_relationship',
        stage: 'youth',
        age: 24,
        situation: 'Love and Relationships',
        description: 'You meet someone special. How do you approach this relationship?',
        options: [
            {
                id: 'commit',
                text: 'Commit fully to the relationship',
                consequences: { relationships: 25, happiness: 20, career: -5 }
            },
            {
                id: 'casual',
                text: 'Keep things casual for now',
                consequences: { relationships: 5, happiness: 10, career: 10 }
            },
            {
                id: 'focus_career',
                text: 'Focus on career instead',
                consequences: { career: 20, wealth: 15, relationships: -10, happiness: -5 }
            }
        ]
    },

    // 成年期决策
    {
        id: 'adulthood_family',
        stage: 'adulthood',
        age: 30,
        situation: 'Starting a Family',
        description: 'You and your partner are considering having children.',
        options: [
            {
                id: 'have_children',
                text: 'Start a family',
                consequences: { relationships: 20, happiness: 15, wealth: -15, career: -10 }
            },
            {
                id: 'wait',
                text: 'Wait a few more years',
                consequences: { career: 10, wealth: 10, relationships: -5 }
            },
            {
                id: 'no_children',
                text: 'Focus on career and travel',
                consequences: { career: 20, wealth: 20, happiness: 10, relationships: -10 }
            }
        ]
    },
    {
        id: 'adulthood_investment',
        stage: 'adulthood',
        age: 35,
        situation: 'Financial Investment',
        description: 'You have some savings. How do you want to invest for the future?',
        options: [
            {
                id: 'real_estate',
                text: 'Buy real estate',
                consequences: { wealth: 25, career: 5 }
            },
            {
                id: 'stocks',
                text: 'Invest in stock market',
                consequences: { wealth: 15, career: 10 }
            },
            {
                id: 'education',
                text: 'Invest in further education',
                consequences: { education: 20, career: 20, wealth: -10 }
            },
            {
                id: 'business',
                text: 'Start your own business',
                consequences: { career: 30, wealth: 10, health: -10, happiness: 15 }
            }
        ]
    },

    // 中年期决策
    {
        id: 'middle_age_crisis',
        stage: 'middleAge',
        age: 50,
        situation: 'Mid-life Reflection',
        description: 'You\'re reflecting on your life achievements. What matters most to you now?',
        options: [
            {
                id: 'family_time',
                text: 'Spend more time with family',
                consequences: { relationships: 25, happiness: 20, career: -10 }
            },
            {
                id: 'career_push',
                text: 'Make a final career push',
                consequences: { career: 25, wealth: 20, health: -10, relationships: -5 }
            },
            {
                id: 'health_focus',
                text: 'Focus on health and wellness',
                consequences: { health: 25, happiness: 15, wealth: -5 }
            },
            {
                id: 'giving_back',
                text: 'Start giving back to community',
                consequences: { happiness: 30, relationships: 15, wealth: -10 }
            }
        ]
    },

    // 老年期决策
    {
        id: 'elderly_legacy',
        stage: 'elderlyAge',
        age: 70,
        situation: 'Creating a Legacy',
        description: 'As you enter your golden years, how do you want to be remembered?',
        options: [
            {
                id: 'mentor',
                text: 'Mentor young people',
                consequences: { relationships: 20, happiness: 25, education: 10 }
            },
            {
                id: 'travel',
                text: 'Travel and enjoy life',
                consequences: { happiness: 30, health: 10, wealth: -15 }
            },
            {
                id: 'charity',
                text: 'Dedicate time to charity',
                consequences: { happiness: 25, relationships: 15, wealth: -20 }
            },
            {
                id: 'write_memoirs',
                text: 'Write your memoirs',
                consequences: { happiness: 15, education: 15, career: 10 }
            }
        ]
    }
];

// 根据年龄获取人生阶段
export const getLifeStageByAge = (age: number): LifeStage => {
    for (const [stage, config] of Object.entries(LIFE_STAGES)) {
        if (age >= config.minAge && age <= config.maxAge) {
            return stage as LifeStage;
        }
    }
    return 'elderlyAge'; // 默认返回老年期
};

// 获取某个阶段的所有决策
export const getDecisionsByStage = (stage: LifeStage): LifeDecision[] => {
    return LIFE_DECISIONS.filter(decision => decision.stage === stage);
};

// 根据年龄和已做决策获取下一个可用决策
export const getNextDecision = (
    age: number, 
    completedDecisions: string[], 
    talents: string[] = [],
    socialClass: string = 'middle'
): LifeDecision | null => {
    const availableDecisions = LIFE_DECISIONS.filter(decision => {
        // 检查年龄范围
        if (age < decision.age) return false;
        
        // 检查是否已完成
        if (completedDecisions.includes(decision.id)) return false;
        
        // 检查要求
        const hasValidOptions = decision.options.some(option => {
            if (!option.requirements) return true;
            
            const meetsAge = !option.requirements.minAge || age >= option.requirements.minAge;
            const notTooOld = !option.requirements.maxAge || age <= option.requirements.maxAge;
            const hasTalents = !option.requirements.talents || 
                option.requirements.talents.some(talent => talents.includes(talent));
            const hasClass = !option.requirements.socialClass || 
                option.requirements.socialClass.includes(socialClass as any);
            
            return meetsAge && notTooOld && hasTalents && hasClass;
        });
        
        return hasValidOptions;
    });
    
    // 返回最接近当前年龄的决策
    return availableDecisions.sort((a, b) => Math.abs(a.age - age) - Math.abs(b.age - age))[0] || null;
};

// 应用决策后果到人生属性
export const applyDecisionConsequences = (
    currentAttributes: EnhancedReincarnationResult['lifeJourney']['attributes'],
    consequences: DecisionOption['consequences']
): EnhancedReincarnationResult['lifeJourney']['attributes'] => {
    const newAttributes = { ...currentAttributes };
    
    Object.entries(consequences).forEach(([key, value]) => {
        if (key in newAttributes && typeof value === 'number') {
            newAttributes[key as keyof typeof newAttributes] = Math.max(0, Math.min(100, 
                newAttributes[key as keyof typeof newAttributes] + value
            ));
        }
    });
    
    return newAttributes;
};

// 生成人生里程碑
export const generateMilestone = (decision: LifeDecision, option: DecisionOption): string => {
    const milestones = {
        childhood_hobby: {
            music: 'Started learning piano at age 8',
            sports: 'Joined first sports team',
            art: 'Discovered artistic talents',
            reading: 'Became an avid reader'
        },
        youth_career: {
            corporate: 'Began corporate career',
            startup: 'Joined an innovative startup',
            freelance: 'Became an independent freelancer',
            nonprofit: 'Started working for social causes'
        },
        adulthood_family: {
            have_children: 'Started a loving family',
            wait: 'Focused on personal growth',
            no_children: 'Chose freedom and adventure'
        }
        // 可以继续添加更多里程碑
    };
    
    return milestones[decision.id as keyof typeof milestones]?.[option.id as any] || 
           `Made important decision at age ${decision.age}`;
};

// 计算人生总分
export const calculateLifeScore = (
    attributes: EnhancedReincarnationResult['lifeJourney']['attributes'],
    decisions: LifeEventResult[]
): number => {
    const attributeScore = Object.values(attributes).reduce((sum, value) => sum + value, 0);
    const decisionBonus = decisions.length * 5; // 每个决策+5分
    return Math.round(attributeScore + decisionBonus);
};

// 初始化人生旅程
export const initializeLifeJourney = (baseResult: any): EnhancedReincarnationResult => {
    return {
        ...baseResult,
        lifeJourney: {
            currentStage: 'childhood',
            currentAge: 0,
            attributes: {
                health: baseResult.health || 50,
                wealth: baseResult.socialClass === 'high' ? 70 : baseResult.socialClass === 'middle' ? 50 : 30,
                happiness: 50,
                relationships: 50,
                education: baseResult.socialClass === 'high' ? 60 : baseResult.socialClass === 'middle' ? 50 : 40,
                career: 30
            },
            decisions: [],
            milestones: [],
            isCompleted: false
        }
    };
}; 