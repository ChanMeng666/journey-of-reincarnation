'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import type { ReincarnationResult } from "@/types";
import { useTranslation } from "react-i18next";

interface ComparisonTableProps {
    results: ReincarnationResult[];
}

export function ComparisonTable({ results }: ComparisonTableProps) {
    const { t } = useTranslation();

    const calculateDifficulty = (result: ReincarnationResult) => {
        let score = 0;
        if (result.socialClass === 'low') score += 3;
        if (result.socialClass === 'middle') score += 2;
        if (result.birthplace === 'rural') score += 2;
        if (result.birthplace === 'suburban') score += 1;
        if (result.health < 50) score += 2;
        if (result.luck < 30) score += 1;
        if (result.era === 'ancient') score += 2;
        if (result.challenges.length > 2) score += 1;
        return Math.min(score, 10);
    };

    const getRarityColor = (rarity: ReincarnationResult['rarity']) => {
        const colors = {
            common: 'text-gray-500',
            uncommon: 'text-green-500',
            rare: 'text-blue-500',
            epic: 'text-purple-500',
            legendary: 'text-yellow-500'
        };
        return colors[rarity];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>{t('compareTitle')}</CardTitle>
                    <CardDescription>{t('comparisons')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">{t('country')}</th>
                                <th className="px-4 py-2">{t('era')}</th>
                                <th className="px-4 py-2">{t('rarityLabel')}</th>
                                <th className="px-4 py-2">{t('health')}</th>
                                <th className="px-4 py-2">{t('difficultyLevel')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results.map((result, index) => (
                                <motion.tr
                                    key={result.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{result.country}</td>
                                    <td className="px-4 py-2">{t(result.era)}</td>
                                    <td className="px-4 py-2">
                                        <span className={`font-medium ${getRarityColor(result.rarity)}`}>
                                            {t(`rarity.${result.rarity}`)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{result.health}/100</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{
                                                        width: `${(calculateDifficulty(result) / 10) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs">
                                                {calculateDifficulty(result)}/10
                                            </span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
