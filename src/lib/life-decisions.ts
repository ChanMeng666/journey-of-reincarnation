// 简化的人生决策系统

export type LifeStage = 'childhood' | 'youth' | 'adulthood' | 'middleAge' | 'elderlyAge';

export interface LifeDecision {
    id: string;
    stage: LifeStage;
    age: number;
    situation: string;
    description: string;
    options: DecisionOption[];
}

export interface DecisionOption {
    id: string;
    text: string;
    consequences: Record<string, number>;
}

export interface LifeEventResult {
    decisionId: string;
    option: DecisionOption;
    age: number;
    timestamp: number;
}

// 人生阶段配置
export const LIFE_STAGES: Record<LifeStage, { minAge: number; maxAge: number; name: string }> = {
    childhood: { minAge: 0, maxAge: 12, name: '童年期' },
    youth: { minAge: 13, maxAge: 25, name: '青年期' },
    adulthood: { minAge: 26, maxAge: 40, name: '成年期' },
    middleAge: { minAge: 41, maxAge: 60, name: '中年期' },
    elderlyAge: { minAge: 61, maxAge: 100, name: '老年期' }
};

// 简化的决策数据
export const LIFE_DECISIONS: LifeDecision[] = [
    {
        id: 'childhood_hobby',
        stage: 'childhood',
        age: 8,
        situation: 'Childhood Interest',
        description: 'What activity do you want to focus on during childhood?',
        options: [
            {
                id: 'music',
                text: 'Learn music',
                consequences: { creativity: 15, discipline: 10 }
            },
            {
                id: 'sports',
                text: 'Play sports',
                consequences: { health: 15, teamwork: 10 }
            }
        ]
    },
    {
        id: 'youth_education',
        stage: 'youth',
        age: 18,
        situation: 'Education Choice',
        description: 'What path do you choose for your education?',
        options: [
            {
                id: 'university',
                text: 'Go to university',
                consequences: { education: 20, career: 15 }
            },
            {
                id: 'work',
                text: 'Start working',
                consequences: { experience: 20, wealth: 10 }
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
    return 'elderlyAge';
};

// 获取某个阶段的所有决策
export const getDecisionsByStage = (stage: LifeStage): LifeDecision[] => {
    return LIFE_DECISIONS.filter(decision => decision.stage === stage);
};

// 根据年龄获取下一个决策
export const getNextDecision = (
    age: number, 
    completedDecisions: string[]
): LifeDecision | null => {
    const availableDecisions = LIFE_DECISIONS.filter(decision => {
        if (age < decision.age) return false;
        if (completedDecisions.includes(decision.id)) return false;
        return true;
    });
    
    return availableDecisions.sort((a, b) => Math.abs(a.age - age) - Math.abs(b.age - age))[0] || null;
};

// 应用决策后果
export const applyDecisionConsequences = (
    currentAttributes: Record<string, number>,
    consequences: Record<string, number>
): Record<string, number> => {
    const newAttributes = { ...currentAttributes };
    
    Object.entries(consequences).forEach(([key, value]) => {
        if (key in newAttributes) {
            newAttributes[key] = Math.max(0, Math.min(100, newAttributes[key] + value));
        }
    });
    
    return newAttributes;
};

// 初始化人生旅程
export const initializeLifeJourney = (baseResult: Record<string, unknown>) => {
    return {
        ...baseResult,
        lifeJourney: {
            currentStage: 'childhood' as LifeStage,
            currentAge: 0,
            attributes: {
                health: 50,
                wealth: 50,
                happiness: 50,
                relationships: 50,
                education: 50,
                career: 30
            },
            decisions: [] as LifeEventResult[],
            milestones: [] as string[],
            isCompleted: false
        }
    };
}; 