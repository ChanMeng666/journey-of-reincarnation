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
        return Math.min(score, 5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Card>
                <CardHeader>
                    {/*<CardTitle>Previous Lives</CardTitle>*/}
                    {/*<CardDescription>Compare your different incarnations</CardDescription>*/}
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
                                <th className="px-4 py-2">{t('gender')}</th>
                                <th className="px-4 py-2">{t('socialClass')}</th>
                                <th className="px-4 py-2">{t('birthplace')}</th>
                                <th className="px-4 py-2">{t('difficultyLevel')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results.map((result, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{result.country}</td>
                                    <td className="px-4 py-2">{t(result.gender)}</td>
                                    <td className="px-4 py-2">{t(result.socialClass)}</td>
                                    <td className="px-4 py-2">{t(result.birthplace)}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{
                                                        width: `${(calculateDifficulty(result) / 5) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs">
                          {calculateDifficulty(result)}/5
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
