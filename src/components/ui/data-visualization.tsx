"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Target, Calendar, Heart, Sparkles, Crown, Activity } from "lucide-react";
import type { ReincarnationResult } from "@/types";
import { loadReincarnations } from "@/lib/storage";

interface DataVisualizationProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ChartData {
    countries: Record<string, number>;
    rarities: Record<string, number>;
    totalLives: number;
    avgLifespan: number;
    avgHealth: number;
    avgLuck: number;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
    isOpen,
    onClose
}) => {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            loadData();
        }
    }, [isOpen]);

    const loadData = async () => {
        setLoading(true);
        try {
            const reincarnations = await loadReincarnations();
            const processedData = processChartData(reincarnations);
            setChartData(processedData);
        } catch (error) {
            console.error('Failed to load visualization data:', error);
        } finally {
            setLoading(false);
        }
    };

    const processChartData = (reincarnations: ReincarnationResult[]): ChartData => {
        const countries: Record<string, number> = {};
        const rarities: Record<string, number> = {};
        
        let totalLifespan = 0;
        let totalHealth = 0;
        let totalLuck = 0;

        reincarnations.forEach(result => {
            countries[result.country] = (countries[result.country] || 0) + 1;
            rarities[result.rarity] = (rarities[result.rarity] || 0) + 1;
            totalLifespan += result.lifespan;
            totalHealth += result.health;
            totalLuck += result.luck;
        });

        const count = reincarnations.length;
        
        return {
            countries,
            rarities,
            totalLives: count,
            avgLifespan: count > 0 ? Math.round(totalLifespan / count) : 0,
            avgHealth: count > 0 ? Math.round(totalHealth / count) : 0,
            avgLuck: count > 0 ? Math.round(totalLuck / count) : 0
        };
    };

    const getRarityColor = (rarity: string) => {
        const colors = {
            common: 'bg-gray-100 text-gray-800',
            uncommon: 'bg-green-100 text-green-800',
            rare: 'bg-blue-100 text-blue-800',
            epic: 'bg-purple-100 text-purple-800',
            legendary: 'bg-yellow-100 text-yellow-800'
        };
        return colors[rarity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-4 bg-background border rounded-lg shadow-lg overflow-hidden">
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            <h2 className="text-lg font-semibold">Data Visualization</h2>
                        </div>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <Activity className="w-8 h-8 mx-auto mb-2 animate-spin" />
                                    <p>Loading data...</p>
                                </div>
                            </div>
                        ) : chartData ? (
                            <div className="space-y-6">
                                {/* 概览统计卡片 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm flex items-center gap-1">
                                                <Target className="w-4 h-4" />
                                                Total Lives
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {chartData.totalLives}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                Avg Lifespan
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {chartData.avgLifespan}
                                                <span className="text-sm font-normal text-muted-foreground ml-1">years</span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                Avg Health
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {chartData.avgHealth}
                                                <span className="text-sm font-normal text-muted-foreground ml-1">/100</span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm flex items-center gap-1">
                                                <Sparkles className="w-4 h-4" />
                                                Avg Luck
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {chartData.avgLuck}
                                                <span className="text-sm font-normal text-muted-foreground ml-1">/100</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* 稀有度分布 */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Crown className="w-5 h-5" />
                                            Rarity Distribution
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {Object.entries(chartData.rarities)
                                                .sort((a, b) => b[1] - a[1])
                                                .map(([rarity, count]) => {
                                                    const total = Object.values(chartData.rarities).reduce((a, b) => a + b, 0);
                                                    const percentage = Math.round((count / total) * 100);
                                                    
                                                    return (
                                                        <div key={rarity} className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Badge className={getRarityColor(rarity)}>
                                                                    {rarity.toUpperCase()}
                                                                </Badge>
                                                                <span className="text-sm">{count} lives</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Progress value={percentage} className="w-20 h-2" />
                                                                <span className="text-sm font-medium w-8">{percentage}%</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* 国家分布 */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Top Countries</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {Object.entries(chartData.countries)
                                                .sort((a, b) => b[1] - a[1])
                                                .slice(0, 5)
                                                .map(([country, count]) => {
                                                    const maxValue = Math.max(...Object.values(chartData.countries));
                                                    const percentage = (count / maxValue) * 100;
                                                    
                                                    return (
                                                        <div key={country} className="space-y-1">
                                                            <div className="flex justify-between text-sm">
                                                                <span>{country}</span>
                                                                <span className="font-medium">{count}</span>
                                                            </div>
                                                            <Progress value={percentage} className="h-2" />
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-8">
                                No data available for visualization
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 