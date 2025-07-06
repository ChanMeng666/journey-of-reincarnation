'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Crown, Zap, Diamond, Sparkles } from "lucide-react";
import { ACHIEVEMENTS, getAchievementProgress } from "@/lib/achievements";
import type { Achievement } from "@/types";

interface AchievementsDialogProps {
    unlockedAchievements: string[];
    trigger?: React.ReactNode;
}

export const AchievementsDialog: React.FC<AchievementsDialogProps> = ({
    unlockedAchievements,
    trigger
}) => {
    const { t } = useTranslation();
    const [selectedRarity, setSelectedRarity] = useState<Achievement['rarity'] | 'all'>('all');
    
    const achievementsByRarity = ACHIEVEMENTS.reduce((acc, achievement) => {
        if (!acc[achievement.rarity]) {
            acc[achievement.rarity] = [];
        }
        acc[achievement.rarity].push(achievement);
        return acc;
    }, {} as Record<Achievement['rarity'], Achievement[]>);

    const getAchievementsByRarity = (rarity: Achievement['rarity']) => {
        return achievementsByRarity[rarity] || [];
    };

    const isUnlocked = (achievementId: string) => {
        return unlockedAchievements.includes(achievementId);
    };

    const getRarityIcon = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common': return <Star className="w-4 h-4 text-gray-500" />;
            case 'uncommon': return <Diamond className="w-4 h-4 text-green-500" />;
            case 'rare': return <Sparkles className="w-4 h-4 text-blue-500" />;
            case 'epic': return <Zap className="w-4 h-4 text-purple-500" />;
            case 'legendary': return <Crown className="w-4 h-4 text-yellow-500" />;
        }
    };

    const getRarityColor = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common': return 'bg-gray-100 text-gray-800';
            case 'uncommon': return 'bg-green-100 text-green-800';
            case 'rare': return 'bg-blue-100 text-blue-800';
            case 'epic': return 'bg-purple-100 text-purple-800';
            case 'legendary': return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getRarityDisplayName = (rarity: Achievement['rarity']) => {
        return t(`achievements.rarity.${rarity}`);
    };

    const filteredAchievements = selectedRarity === 'all' 
        ? ACHIEVEMENTS 
        : getAchievementsByRarity(selectedRarity);

    const progressPercentage = getAchievementProgress(unlockedAchievements);
    const unlockedCount = unlockedAchievements.length;
    const totalCount = ACHIEVEMENTS.length;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        {t('achievements.title')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        {t('achievements.title')}
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                    {/* Progress Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                {unlockedCount}/{totalCount}
                            </CardTitle>
                            <CardDescription>
                                {t('achievements.progress')} - {progressPercentage.toFixed(1)}% {t('achievements.completed')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={progressPercentage} className="w-full" />
                        </CardContent>
                    </Card>

                    {/* Rarity Filter */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedRarity === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedRarity('all')}
                        >
                            {t('achievements.all')}
                        </Button>
                        {(['legendary', 'epic', 'rare', 'uncommon', 'common'] as const).map((rarity) => {
                            const rarityAchievements = getAchievementsByRarity(rarity);
                            const rarityUnlocked = rarityAchievements.filter(a => isUnlocked(a.id)).length;
                            
                            return (
                                <Button
                                    key={rarity}
                                    variant={selectedRarity === rarity ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedRarity(rarity)}
                                    className="flex items-center gap-2"
                                >
                                    {getRarityIcon(rarity)}
                                    {getRarityDisplayName(rarity)} ({rarityUnlocked}/{rarityAchievements.length})
                                </Button>
                            );
                        })}
                    </div>

                    {/* Achievements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAchievements.map((achievement) => {
                            const unlocked = isUnlocked(achievement.id);
                            
                            return (
                                <Card 
                                    key={achievement.id} 
                                    className={`transition-all duration-200 hover:shadow-lg ${
                                        unlocked ? 'ring-2 ring-blue-500 bg-blue-50' : 'opacity-75'
                                    }`}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{achievement.icon}</span>
                                                <Badge className={getRarityColor(achievement.rarity)}>
                                                    {getRarityDisplayName(achievement.rarity)}
                                                </Badge>
                                            </div>
                                            {unlocked && (
                                                <Trophy className="w-5 h-5 text-yellow-500" />
                                            )}
                                        </div>
                                        <CardTitle className="text-base">
                                            {t(achievement.nameKey, { defaultValue: achievement.nameKey })}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            {t(achievement.descriptionKey, { defaultValue: achievement.descriptionKey })}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {filteredAchievements.length === 0 && (
                        <div className="text-center py-8">
                            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">{t('achievements.noAchievements')}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}; 