'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

export function StatsCard() {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const getChartColors = () => {
        return theme === 'dark'
            ? ['#3b82f6', '#60a5fa', '#93c5fd']
            : ['#1d4ed8', '#3b82f6', '#60a5fa'];
    };

    const colors = getChartColors();
    const textColor = theme === 'dark' ? '#e5e7eb' : '#374151';

    const socialClassData = {
        labels: [t('statistics.high'), t('statistics.middle'), t('statistics.low')],
        datasets: [
            {
                label: t('statistics.percentage'),
                data: [40, 50, 10],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };


    const birthplaceData = {
        labels: [t('statistics.urban'), t('statistics.suburban'), t('statistics.rural')],
        datasets: [
            {
                label: t('statistics.percentage'),
                data: [45, 30, 25],
                backgroundColor: colors[0],
                borderColor: colors[0],
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
                    <CardTitle>{t('statistics.title')}</CardTitle>
                    <CardDescription>
                        {t('statistics.globalDistribution')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="mb-4 text-sm font-medium">{t('statistics.socialClassTitle')}</h4>
                        <div className="h-[200px] flex justify-center">
                            <Pie data={socialClassData} options={chartOptions}/>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-medium">{t('statistics.birthplaceTitle')}</h4>
                        <div className="h-[200px] flex justify-center">
                            <Bar data={birthplaceData} options={chartOptions}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
