"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
    Calendar, 
    Play, 
    Pause, 
    RotateCcw, 
    Heart, 
    DollarSign, 
    Smile, 
    Brain, 
    Users, 
    Palette, 
    Shield, 
    Star,
    Briefcase,
    GraduationCap,
    Home,
    AlertTriangle
} from "lucide-react";
import type { ReincarnationResult, KarmaProfile } from "@/types";
import type { 
    EnhancedLifeJourney, 
    LifeEvent, 
    EnhancedDecisionOption,
    EnhancedLifeStage
} from "@/lib/enhanced-life-journey";
import { 
    initializeEnhancedLifeJourney, 
    generateLifeEvents, 
    getLifeStageByAge,
    ENHANCED_LIFE_STAGES 
} from "@/lib/enhanced-life-journey";

interface EnhancedLifeJourneyPanelProps {
    result: ReincarnationResult;
    karmaProfile: KarmaProfile | null;
    onJourneyUpdate?: (journey: EnhancedLifeJourney) => void;
    className?: string;
}

export const EnhancedLifeJourneyPanel: React.FC<EnhancedLifeJourneyPanelProps> = ({
    result,
    karmaProfile,
    onJourneyUpdate,
    className = ""
}) => {
    const { t } = useTranslation();
    const [journey, setJourney] = useState<EnhancedLifeJourney | null>(null);
    const [events, setEvents] = useState<LifeEvent[]>([]);
    const [currentEvent, setCurrentEvent] = useState<LifeEvent | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameSpeed, setGameSpeed] = useState(1); // 1x, 2x, 4x speed
    const [showEventDialog, setShowEventDialog] = useState(false);

    // 初始化生命历程
    useEffect(() => {
        if (result && !journey) {
            const newJourney = initializeEnhancedLifeJourney(result);
            const lifeEvents = karmaProfile ? 
                generateLifeEvents(result, newJourney, karmaProfile) : [];
            
            setJourney(newJourney);
            setEvents(lifeEvents);
        }
    }, [result, karmaProfile, journey]);

    // 自动播放逻辑
    useEffect(() => {
        if (!isPlaying || !journey || journey.isCompleted) return;

        const interval = setInterval(() => {
            advanceTime();
        }, 1000 / gameSpeed);

        return () => clearInterval(interval);
    }, [isPlaying, journey, gameSpeed]);

    const advanceTime = () => {
        if (!journey) return;

        const newAge = journey.currentAge + 1;
        if (newAge > result.lifespan) {
            setIsPlaying(false);
            setJourney(prev => prev ? { ...prev, isCompleted: true } : null);
            return;
        }

        // 检查是否有事件触发
        const eventAtAge = events.find(e => e.age === newAge);
        if (eventAtAge && eventAtAge.options.length > 0) {
            setCurrentEvent(eventAtAge);
            setShowEventDialog(true);
            setIsPlaying(false);
        }

        // 更新年龄和阶段
        const newStage = getLifeStageByAge(newAge);
        setJourney(prev => prev ? {
            ...prev,
            currentAge: newAge,
            currentStage: newStage
        } : null);

        onJourneyUpdate?.(journey);
    };

    const handleDecision = (option: EnhancedDecisionOption) => {
        if (!journey || !currentEvent) return;

        // 应用决策后果
        const updatedJourney = { ...journey };
        
        if (option.consequences.attributes) {
            Object.entries(option.consequences.attributes).forEach(([attr, value]) => {
                if (attr in updatedJourney.attributes) {
                    updatedJourney.attributes[attr as keyof typeof updatedJourney.attributes] += value;
                }
            });
        }

        if (option.consequences.wealth) {
            updatedJourney.attributes.wealth += option.consequences.wealth;
        }

        if (option.consequences.happiness) {
            updatedJourney.attributes.happiness += option.consequences.happiness;
        }

        // 记录事件
        updatedJourney.majorEvents.push(currentEvent);

        setJourney(updatedJourney);
        setCurrentEvent(null);
        setShowEventDialog(false);
        onJourneyUpdate?.(updatedJourney);
    };

    const resetJourney = () => {
        const newJourney = initializeEnhancedLifeJourney(result);
        const lifeEvents = karmaProfile ? 
            generateLifeEvents(result, newJourney, karmaProfile) : [];
        
        setJourney(newJourney);
        setEvents(lifeEvents);
        setIsPlaying(false);
        setCurrentEvent(null);
        setShowEventDialog(false);
    };

    const getAttributeIcon = (attr: string) => {
        const icons: Record<string, React.ComponentType<{ className?: string }>> = {
            health: Heart,
            wealth: DollarSign,
            happiness: Smile,
            intelligence: Brain,
            charisma: Users,
            creativity: Palette,
            resilience: Shield,
            reputation: Star
        };
        return icons[attr] || Star;
    };

    const getStageColor = (stage: EnhancedLifeStage) => {
        const colors: Record<EnhancedLifeStage, string> = {
            infant: 'bg-pink-100 text-pink-800',
            childhood: 'bg-blue-100 text-blue-800',
            adolescence: 'bg-purple-100 text-purple-800',
            youth: 'bg-green-100 text-green-800',
            early_adulthood: 'bg-yellow-100 text-yellow-800',
            middle_adulthood: 'bg-orange-100 text-orange-800',
            late_adulthood: 'bg-red-100 text-red-800',
            elderly: 'bg-gray-100 text-gray-800'
        };
        return colors[stage];
    };

    const formatAge = (age: number) => {
        return `${age}岁`;
    };

    if (!journey) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {t('enhancedLifeJourney.title')}
                    </CardTitle>
                    <CardDescription>
                        {t('enhancedLifeJourney.initializing')}
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            人生历程 - {formatAge(journey.currentAge)}
                        </div>
                        <Badge className={getStageColor(journey.currentStage)}>
                            {ENHANCED_LIFE_STAGES[journey.currentStage].name}
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        {ENHANCED_LIFE_STAGES[journey.currentStage].description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">概览</TabsTrigger>
                            <TabsTrigger value="attributes">属性</TabsTrigger>
                            <TabsTrigger value="career">职业</TabsTrigger>
                            <TabsTrigger value="events">事件</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4">
                            {/* 控制面板 */}
                            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={isPlaying ? "secondary" : "default"}
                                        size="sm"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        disabled={journey.isCompleted}
                                    >
                                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        {isPlaying ? '暂停' : '开始'}
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={resetJourney}>
                                        <RotateCcw className="w-4 h-4" />
                                        重置
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">速度:</span>
                                    {[1, 2, 4].map(speed => (
                                        <Button
                                            key={speed}
                                            variant={gameSpeed === speed ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setGameSpeed(speed)}
                                        >
                                            {speed}x
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* 生命进度 */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">生命进度</span>
                                    <span className="text-sm text-muted-foreground">
                                        {journey.currentAge} / {result.lifespan} 岁
                                    </span>
                                </div>
                                <Progress value={(journey.currentAge / result.lifespan) * 100} />
                            </div>

                            {/* 核心信息 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        <span className="text-sm font-medium">职业</span>
                                    </div>
                                    <p className="text-sm">{journey.career.position}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        <span className="text-sm font-medium">教育</span>
                                    </div>
                                    <p className="text-sm">{journey.education.level}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        <span className="text-sm font-medium">居住地</span>
                                    </div>
                                    <p className="text-sm">{journey.locations[journey.locations.length - 1]}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span className="text-sm font-medium">关系</span>
                                    </div>
                                    <p className="text-sm">{journey.relationships.filter(r => r.isActive).length} 个活跃关系</p>
                                </div>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="attributes" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(journey.attributes).map(([key, value]) => {
                                    const Icon = getAttributeIcon(key);
                                    return (
                                        <div key={key} className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Icon className="w-4 h-4" />
                                                <span className="text-sm font-medium capitalize">
                                                    {key === 'health' ? '健康' :
                                                     key === 'wealth' ? '财富' :
                                                     key === 'happiness' ? '幸福' :
                                                     key === 'intelligence' ? '智力' :
                                                     key === 'charisma' ? '魅力' :
                                                     key === 'creativity' ? '创造力' :
                                                     key === 'resilience' ? '韧性' :
                                                     key === 'reputation' ? '声誉' : key}
                                                </span>
                                            </div>
                                            <Progress value={Math.max(0, Math.min(100, value))} />
                                            <span className="text-sm text-muted-foreground">{Math.round(value)}/100</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="career" className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">当前职位</span>
                                    <span>{journey.career.position}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">职业等级</span>
                                    <span>等级 {journey.career.level}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">薪资</span>
                                    <span>${journey.career.salary.toLocaleString()}</span>
                                </div>
                                <div className="space-y-2">
                                    <span className="font-medium">工作满意度</span>
                                    <Progress value={journey.career.satisfaction} />
                                    <span className="text-sm text-muted-foreground">{journey.career.satisfaction}/100</span>
                                </div>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="events" className="space-y-4">
                            <div className="space-y-3">
                                <h4 className="font-medium">主要人生事件</h4>
                                {journey.majorEvents.length > 0 ? (
                                    journey.majorEvents.map((event, index) => (
                                        <div key={index} className="p-3 border rounded-lg">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium">{event.title}</span>
                                                <Badge variant="outline">{event.age}岁</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{event.description}</p>
                                            <Badge className="mt-2" variant="secondary">
                                                {event.significance === 'life_changing' ? '人生转折' :
                                                 event.significance === 'major' ? '重大事件' :
                                                 event.significance === 'moderate' ? '重要事件' : '一般事件'}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">📅</div>
                                        <p className="text-muted-foreground">
                                            还没有重大事件发生
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* 事件决策对话框 */}
            <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            {currentEvent?.title}
                        </DialogTitle>
                        <DialogDescription>
                            {formatAge(currentEvent?.age || 0)} - {currentEvent?.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                            选择你的回应方式：
                        </div>
                        {currentEvent?.options.map((option) => (
                            <Button
                                key={option.id}
                                variant="outline"
                                className="w-full justify-start h-auto p-4"
                                onClick={() => handleDecision(option)}
                            >
                                <div className="text-left">
                                    <div className="font-medium">{option.text}</div>
                                    <div className="text-sm text-muted-foreground">{option.description}</div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}; 