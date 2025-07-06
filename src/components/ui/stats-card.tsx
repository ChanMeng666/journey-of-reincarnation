'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { calculateStatistics, getUnlockedAchievementIds } from "@/lib/storage";
import { AchievementsDialog } from "./achievements-dialog";
import type { UserStatistics } from "@/types";
import { ACHIEVEMENTS } from "@/lib/achievements";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

export function StatsCard() {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [stats, setStats] = useState<UserStatistics | null>(null);
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const latestStats = await calculateStatistics();
                setStats(latestStats);
                
                // 加载已解锁的成就
                const achievementIds = await getUnlockedAchievementIds();
                setUnlockedAchievements(achievementIds);
            } catch (error) {
                console.error('Failed to load statistics:', error);
                // 使用默认值
                setStats({
                    totalReincarnations: 0,
                    favoriteCountry: '',
                    averageLifespan: 0,
                    totalSpecialEvents: 0,
                    unlockedAchievements: [],
                    rarityDistribution: {},
                    genderDistribution: {},
                    classDistribution: {}
                });
            }
        };

        loadStats();
    }, []);

    const getChartColors = () => {
        return theme === 'dark'
            ? ['#3b82f6', '#60a5fa', '#93c5fd', '#8b5cf6', '#f59e0b']
            : ['#1d4ed8', '#3b82f6', '#60a5fa', '#7c3aed', '#d97706'];
    };

    const colors = getChartColors();
    const textColor = theme === 'dark' ? '#e5e7eb' : '#374151';

    // 如果还没有数据，显示空状态
    if (!stats) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>{t('statistics.title')}</CardTitle>
                        <CardDescription>
                            {t('statistics.loading')}...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                            {t('statistics.noData')}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    // 准备图表数据
    const classData = Object.entries(stats.classDistribution);
    const rarityData = Object.entries(stats.rarityDistribution);

    const socialClassData = {
        labels: classData.map(([key]) => t(`statistics.${key}`)),
        datasets: [
            {
                label: t('statistics.count'),
                data: classData.map(([, value]) => value),
                backgroundColor: colors.slice(0, classData.length),
                borderColor: colors.slice(0, classData.length),
                borderWidth: 1,
            },
        ],
    };

    const rarityChartData = {
        labels: rarityData.map(([key]) => t(`rarity.${key}`)),
        datasets: [
            {
                label: t('statistics.count'),
                data: rarityData.map(([, value]) => value),
                backgroundColor: colors.slice(0, rarityData.length),
                borderColor: colors.slice(0, rarityData.length),
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                    color: textColor,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: textColor,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: textColor,
                },
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{t('statistics.title')}</CardTitle>
                            <CardDescription>
                                {stats.totalReincarnations} {t('statistics.totalLives')}
                            </CardDescription>
                        </div>
                        <div className="space-x-2">
                            <AchievementsDialog
                                unlockedAchievements={unlockedAchievements}
                                trigger={
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                    >
                                        🏆 {t('achievements.title')}
                                        <Badge variant="secondary" className="ml-2">
                                            {unlockedAchievements.length}/{ACHIEVEMENTS.length}
                                        </Badge>
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* 关键统计 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{stats.totalReincarnations}</div>
                            <div className="text-sm text-muted-foreground">{t('statistics.total')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{Math.round(stats.averageLifespan)}</div>
                            <div className="text-sm text-muted-foreground">{t('statistics.avgLifespan')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{stats.unlockedAchievements.length}</div>
                            <div className="text-sm text-muted-foreground">{t('statistics.achievements')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{stats.favoriteCountry || '-'}</div>
                            <div className="text-sm text-muted-foreground">{t('statistics.favCountry')}</div>
                        </div>
                    </div>

                    {/* 图表 */}
                    {stats.totalReincarnations > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {classData.length > 0 && (
                                <div>
                                    <h4 className="mb-4 text-sm font-medium">{t('statistics.socialClassTitle')}</h4>
                                    <div className="h-[200px] flex justify-center">
                                        <Pie data={socialClassData} options={chartOptions}/>
                                    </div>
                                </div>
                            )}
                            {rarityData.length > 0 && (
                                <div>
                                    <h4 className="mb-4 text-sm font-medium">{t('statistics.rarityTitle')}</h4>
                                    <div className="h-[200px] flex justify-center">
                                        <Bar data={rarityChartData} options={chartOptions}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
