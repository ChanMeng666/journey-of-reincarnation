"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Crown, 
    Heart, 
    Users, 
    Leaf, 
    Brain, 
    Sparkles, 
    TrendingUp,
    Activity,
    Calendar,
    Star
} from "lucide-react";
import type { KarmaProfile, KarmaRecord } from "@/types";
import { calculateSoulLevel } from "@/lib/karma-system";

interface KarmaDisplayProps {
    karmaProfile: KarmaProfile | null;
    karmaEvents?: KarmaRecord[];
    className?: string;
}

export const KarmaDisplay: React.FC<KarmaDisplayProps> = ({
    karmaProfile,
    karmaEvents = [],
    className = ""
}) => {
    const { t } = useTranslation();

    if (!karmaProfile) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        {t('karma.title')}
                    </CardTitle>
                    <CardDescription>
                        {t('karma.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <div className="text-4xl mb-4">🌱</div>
                        <p className="text-muted-foreground">
                            {t('karma.newSoul')}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const soulLevel = calculateSoulLevel(karmaProfile);
    
    const karmaCategories = [
        { key: 'moralKarma', label: t('karma.categories.moral'), icon: Heart, color: 'text-red-500' },
        { key: 'socialKarma', label: t('karma.categories.social'), icon: Users, color: 'text-blue-500' },
        { key: 'environmentalKarma', label: t('karma.categories.environmental'), icon: Leaf, color: 'text-green-500' },
        { key: 'intellectualKarma', label: t('karma.categories.intellectual'), icon: Brain, color: 'text-purple-500' },
        { key: 'spiritualKarma', label: t('karma.categories.spiritual'), icon: Sparkles, color: 'text-yellow-500' },
    ];

    const getSoulLevelColor = (level: number) => {
        if (level <= 2) return 'text-gray-600 bg-gray-100';
        if (level <= 4) return 'text-blue-600 bg-blue-100';
        if (level <= 6) return 'text-purple-600 bg-purple-100';
        if (level <= 8) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const getKarmaColor = (value: number) => {
        if (value > 50) return 'text-green-600';
        if (value < -50) return 'text-red-600';
        return 'text-gray-600';
    };

    const recentEvents = karmaEvents
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    {t('karma.title')}
                </CardTitle>
                <CardDescription>
                    {t('karma.description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">{t('karma.overview')}</TabsTrigger>
                        <TabsTrigger value="karma">{t('karma.karmaDetails')}</TabsTrigger>
                        <TabsTrigger value="events">{t('karma.events')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                        {/* 灵魂等级 */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-medium">{t('karma.soulLevel')}</span>
                                </div>
                                <Badge className={`${getSoulLevelColor(soulLevel.level)} font-bold`}>
                                    {t(soulLevel.titleKey)} ({t('karma.level')} {soulLevel.level})
                                </Badge>
                            </div>
                            <Progress 
                                value={soulLevel.experienceToNext > 0 ? 
                                    ((soulLevel.experience % 100) / 100) * 100 : 100
                                } 
                            />
                            <div className="text-sm text-muted-foreground">
                                {soulLevel.experienceToNext > 0 ? 
                                    `${t('karma.experienceToNext')} ${soulLevel.experienceToNext} ${t('karma.experience')}` : 
                                    t('karma.maxLevel')
                                }
                            </div>
                        </div>

                        {/* 总业力 */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    <span className="font-medium">{t('karma.totalKarma')}</span>
                                </div>
                                <span className={`font-bold ${getKarmaColor(karmaProfile.totalKarma)}`}>
                                    {karmaProfile.totalKarma > 0 ? '+' : ''}{karmaProfile.totalKarma}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                    <span>{t('karma.reincarnations')}: {karmaProfile.lifeCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-blue-500" />
                                    <span>{t('karma.lastUpdated')}: {new Date(karmaProfile.lastUpdated).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* 特殊能力 */}
                        {soulLevel.unlockedAbilities.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="font-medium">{t('karma.unlockedAbilities')}</h4>
                                <div className="flex flex-wrap gap-1">
                                    {soulLevel.unlockedAbilities.map((ability, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                            {ability}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="karma" className="space-y-4">
                        <div className="space-y-3">
                            {karmaCategories.map(({ key, label, icon: Icon, color }) => {
                                const value = karmaProfile[key as keyof KarmaProfile] as number;
                                return (
                                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                        <div className="flex items-center gap-2">
                                            <Icon className={`w-4 h-4 ${color}`} />
                                            <span className="font-medium">{label}</span>
                                        </div>
                                        <span className={`font-bold ${getKarmaColor(value)}`}>
                                            {value > 0 ? '+' : ''}{value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="events" className="space-y-4">
                        {recentEvents.length > 0 ? (
                            <div className="space-y-3">
                                <h4 className="font-medium">{t('karma.recentEvents')}</h4>
                                {recentEvents.map((event) => (
                                    <div key={event.id} className="p-3 rounded-lg border">
                                        <div className="flex items-center justify-between mb-1">
                                            <Badge variant="outline" className="text-xs">
                                                {event.category}
                                            </Badge>
                                            <span className={`text-sm font-medium ${getKarmaColor(event.value)}`}>
                                                {event.value > 0 ? '+' : ''}{event.value}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {t(event.description, { country: event.country })}
                                        </p>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {new Date(event.timestamp).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📜</div>
                                <p className="text-muted-foreground">
                                    {t('karma.noEvents')}
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}; 