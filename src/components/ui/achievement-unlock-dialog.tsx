'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles } from "lucide-react";
import type { Achievement } from "@/types";

interface AchievementUnlockDialogProps {
    achievements: Achievement[];
    isOpen: boolean;
    onClose: () => void;
}

export const AchievementUnlockDialog: React.FC<AchievementUnlockDialogProps> = ({
    achievements,
    isOpen,
    onClose
}) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isOpen && achievements.length > 0) {
            setCurrentIndex(0);
            
            // 如果有多个成就，每2秒切换到下一个
            if (achievements.length > 1) {
                const interval = setInterval(() => {
                    setCurrentIndex(prev => {
                        const next = prev + 1;
                        if (next >= achievements.length) {
                            return 0; // 循环回到第一个
                        }
                        return next;
                    });
                }, 2000);

                return () => clearInterval(interval);
            }
        } else {
            // 如果没有成就或弹窗关闭，重置索引
            setCurrentIndex(0);
        }
    }, [isOpen, achievements.length]);

    const getRarityColor = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common': return 'from-gray-400 to-gray-600';
            case 'uncommon': return 'from-green-400 to-green-600';
            case 'rare': return 'from-blue-400 to-blue-600';
            case 'epic': return 'from-purple-400 to-purple-600';
            case 'legendary': return 'from-yellow-400 to-yellow-600';
        }
    };

    const getRarityGlow = (rarity: Achievement['rarity']) => {
        switch (rarity) {
            case 'common': return 'shadow-gray-500/50';
            case 'uncommon': return 'shadow-green-500/50';
            case 'rare': return 'shadow-blue-500/50';
            case 'epic': return 'shadow-purple-500/50';
            case 'legendary': return 'shadow-yellow-500/50';
        }
    };

    if (!isOpen || achievements.length === 0) return null;

    // 确保 currentIndex 在有效范围内
    const safeCurrentIndex = Math.max(0, Math.min(currentIndex, achievements.length - 1));
    const currentAchievement = achievements[safeCurrentIndex];
    
    // 安全检查：确保当前成就存在
    if (!currentAchievement) {
        console.error('当前成就是 undefined:', { currentIndex, safeCurrentIndex, achievementsLength: achievements.length, achievements });
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center"
                >
                    {/* 标题 */}
                    <DialogHeader className="text-center mb-6">
                        <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                            {t('achievements.achievementUnlocked')}
                        </DialogTitle>
                    </DialogHeader>

                    {/* 成就内容 */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* 成就图标 */}
                            <div className="relative">
                                <motion.div
                                    animate={{ 
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br ${getRarityColor(currentAchievement.rarity)} flex items-center justify-center text-4xl shadow-2xl ${getRarityGlow(currentAchievement.rarity)}`}
                                >
                                    {currentAchievement.icon}
                                </motion.div>
                                
                                {/* 光效 */}
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ 
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${getRarityColor(currentAchievement.rarity)} blur-xl -z-10`}
                                />
                            </div>

                            {/* 成就信息 */}
                            <div className="space-y-3">
                                <Badge 
                                    className={`text-sm px-3 py-1 ${
                                        currentAchievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                                        currentAchievement.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
                                        currentAchievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                                        currentAchievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}
                                >
                                    {t(`achievements.rarity.${currentAchievement.rarity}`)}
                                </Badge>
                                
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {t(currentAchievement.nameKey)}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t(currentAchievement.descriptionKey)}
                                </p>
                            </div>

                            {/* 多个成就时的进度指示器 */}
                            {achievements.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {achievements.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                                index === currentIndex 
                                                    ? 'bg-blue-500' 
                                                    : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* 提示文字 */}
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                                {achievements.length > 1 
                                    ? `${currentIndex + 1} / ${achievements.length} new achievements`
                                    : 'Click anywhere to close'
                                }
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* 装饰性星星 */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    rotate: 360
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                                className="absolute"
                                style={{
                                    left: `${20 + (i * 10)}%`,
                                    top: `${10 + (i * 8)}%`,
                                }}
                            >
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}; 