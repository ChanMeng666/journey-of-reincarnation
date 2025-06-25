'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Achievement } from "@/types";
import { ACHIEVEMENTS, getAchievementProgress } from "@/lib/achievements";
import { getUnlockedAchievements } from "@/lib/storage";

interface AchievementsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const getRarityColor = (rarity: Achievement['rarity']) => {
    const colors = {
        common: 'bg-gray-500',
        uncommon: 'bg-green-500',
        rare: 'bg-blue-500',
        epic: 'bg-purple-500',
        legendary: 'bg-yellow-500'
    };
    return colors[rarity];
};

export function AchievementsDialog({ isOpen, onClose }: AchievementsDialogProps) {
    const { t } = useTranslation();
    const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadAchievements = async () => {
            try {
                const unlocked = await getUnlockedAchievements();
                setUnlockedAchievements(unlocked);
                setProgress(getAchievementProgress(unlocked.map(a => a.id)));
            } catch (error) {
                console.error('Failed to load achievements:', error);
            }
        };

        if (isOpen) {
            loadAchievements();
        }
    }, [isOpen]);

    const unlockedIds = unlockedAchievements.map(a => a.id);

    const groupedAchievements = ACHIEVEMENTS.reduce((groups, achievement) => {
        const { rarity } = achievement;
        if (!groups[rarity]) {
            groups[rarity] = [];
        }
        groups[rarity].push(achievement);
        return groups;
    }, {} as Record<Achievement['rarity'], Achievement[]>);

    const rarityOrder: Achievement['rarity'][] = ['legendary', 'epic', 'rare', 'uncommon', 'common'];

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
            <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        🏆 {t('achievements.title')}
                        <Badge variant="secondary">
                            {unlockedAchievements.length}/{ACHIEVEMENTS.length}
                        </Badge>
                    </DialogTitle>
                    <DialogDescription>
                        {t('achievements.description')} - {progress.toFixed(1)}% {t('achievements.complete')}
                    </DialogDescription>
                </DialogHeader>

                {/* 进度条 */}
                <div className="mb-6">
                    <div className="w-full bg-muted rounded-full h-3">
                        <motion.div
                            className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* 成就列表 */}
                <div className="space-y-6">
                    {rarityOrder.map(rarity => (
                        groupedAchievements[rarity] && (
                            <motion.div
                                key={rarity}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-3"
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`inline-block w-3 h-3 rounded-full ${getRarityColor(rarity)}`} />
                                    <h3 className="text-lg font-semibold capitalize">
                                        {t(`rarity.${rarity}`)} ({groupedAchievements[rarity].filter(a => unlockedIds.includes(a.id)).length}/{groupedAchievements[rarity].length})
                                    </h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {groupedAchievements[rarity].map((achievement, index) => {
                                        const isUnlocked = unlockedIds.includes(achievement.id);
                                        const unlockedData = unlockedAchievements.find(a => a.id === achievement.id);
                                        
                                        return (
                                            <motion.div
                                                key={achievement.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={`
                                                    p-4 rounded-lg border transition-all duration-200
                                                    ${isUnlocked 
                                                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-800' 
                                                        : 'bg-muted/50 border-muted opacity-60'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className={`text-2xl ${isUnlocked ? '' : 'grayscale'}`}>
                                                        {achievement.icon}
                                                    </span>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className={`font-medium ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                                {achievement.name}
                                                            </h4>
                                                            {isUnlocked && (
                                                                <span className="text-xs text-green-600 font-medium">
                                                                    ✓ {t('achievements.unlocked')}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className={`text-sm ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                                                            {achievement.description}
                                                        </p>
                                                        {isUnlocked && unlockedData?.unlockedAt && (
                                                            <p className="text-xs text-muted-foreground">
                                                                {t('achievements.unlockedOn')}: {new Date(unlockedData.unlockedAt).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <Button onClick={onClose}>
                        {t('close')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 