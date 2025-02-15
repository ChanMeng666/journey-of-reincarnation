'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { ReincarnationResult } from "@/types";

interface ResultCardProps {
    result: ReincarnationResult;
}

export function ResultCard({ result }: ResultCardProps) {
    const { t } = useTranslation();

    const infoItems = [
        { label: 'country', value: result.country },
        { label: 'gender', value: t(result.gender) },
        { label: 'socialClass', value: t(result.socialClass) },
        { label: 'birthplace', value: t(result.birthplace) },
        { label: 'familyStructure', value: t(result.familyStructure === 'onlyChild' ? 'onlyChild' : 'siblings') }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>{t('newLife')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {infoItems.map((item) => (
                            <div
                                key={item.label}
                                className="flex justify-between items-center border-b border-border pb-2 last:border-0"
                            >
                                <span className="text-muted-foreground">{t(item.label)}:</span>
                                <span className="font-medium">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
