'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { ReincarnationResult } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ResultCardProps {
    result: ReincarnationResult;
}

const getRarityColor = (rarity: ReincarnationResult['rarity']) => {
    const colors = {
        common: 'bg-gray-500',
        uncommon: 'bg-green-500',
        rare: 'bg-blue-500',
        epic: 'bg-purple-500',
        legendary: 'bg-yellow-500'
    };
    return colors[rarity];
};

const getRarityIcon = (rarity: ReincarnationResult['rarity']) => {
    const icons = {
        common: '●',
        uncommon: '◆',
        rare: '★',
        epic: '♦',
        legendary: '👑'
    };
    return icons[rarity];
};

export function ResultCard({ result }: ResultCardProps) {
    const { t } = useTranslation();

    const basicInfo = [
        { label: 'country', value: result.country },
        { label: 'gender', value: t(result.gender) },
        { label: 'era', value: t(result.era) },
        { label: 'socialClass', value: t(result.socialClass) },
        { label: 'birthplace', value: t(result.birthplace) },
        { label: 'familyStructure', value: t(result.familyStructure === 'onlyChild' ? 'onlyChild' : 'siblings') },
    ];

    const attributes = [
        { label: 'health', value: result.health, max: 100, color: 'bg-red-500' },
        { label: 'luck', value: result.luck, max: 100, color: 'bg-green-500' },
        { label: 'lifespan', value: result.lifespan, unit: 'years' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* 主要信息卡片 */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{t('newLife')}</CardTitle>
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${getRarityColor(result.rarity)}`}>
                                {getRarityIcon(result.rarity)} {t(`rarity.${result.rarity}`)}
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {basicInfo.map((item) => (
                            <div
                                key={item.label}
                                className="flex justify-between items-center border-b border-border pb-2 last:border-0"
                            >
                                <span className="text-muted-foreground">{t(item.label)}:</span>
                                <span className="font-medium">{item.value}</span>
                            </div>
                        ))}
                        
                        {/* 季节和生肖 */}
                        <div className="flex justify-between items-center border-b border-border pb-2">
                            <span className="text-muted-foreground">{t('birthSeason')}:</span>
                            <span className="font-medium">{t(result.birthSeason)} 🐲 {result.zodiac}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 属性卡片 */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('attributes')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {attributes.map((attr) => (
                            <div key={attr.label} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>{t(attr.label)}</span>
                                    <span>{attr.value}{attr.unit || ''}</span>
                                </div>
                                {attr.max && (
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${attr.color}`}
                                            style={{ width: `${(attr.value / attr.max) * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 天赋卡片 */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('talents')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {result.talents.map((talent, index) => (
                            <motion.div
                                key={talent}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Badge variant="secondary" className="text-xs">
                                    ✨ {talent}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 性格特征 */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('personality')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {result.personality.map((trait, index) => (
                            <motion.div
                                key={trait}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Badge variant="outline" className="text-xs">
                                    💫 {trait}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 挑战与机遇 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-600 dark:text-red-400">{t('challenges')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {result.challenges.map((challenge, index) => (
                                <motion.div
                                    key={challenge}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <span className="text-red-500">⚠️</span>
                                    <span>{challenge}</span>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-green-600 dark:text-green-400">{t('opportunities')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {result.opportunities.map((opportunity, index) => (
                                <motion.div
                                    key={opportunity}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <span className="text-green-500">🍀</span>
                                    <span>{opportunity}</span>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
