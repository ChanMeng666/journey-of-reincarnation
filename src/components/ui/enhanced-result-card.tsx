"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Sparkles, Crown, Trophy, Heart } from "lucide-react";
import type { ReincarnationResult, GameMode, ModeSpecificResult } from "@/types";

interface EnhancedResultCardProps {
    result: ReincarnationResult;
    modeResult?: ModeSpecificResult;
    mode: GameMode;
}

export const EnhancedResultCard: React.FC<EnhancedResultCardProps> = ({
    result,
    modeResult,
    mode
}) => {
    const getRarityIcon = (rarity: string) => {
        const icons = {
            common: Star,
            uncommon: Star,
            rare: Sparkles,
            epic: Crown,
            legendary: Trophy
        };
        return icons[rarity as keyof typeof icons] || Star;
    };

    const getRarityColor = (rarity: string) => {
        const colors = {
            common: 'text-gray-600 bg-gray-100 border-gray-200',
            uncommon: 'text-green-600 bg-green-100 border-green-200',
            rare: 'text-blue-600 bg-blue-100 border-blue-200',
            epic: 'text-purple-600 bg-purple-100 border-purple-200',
            legendary: 'text-yellow-600 bg-yellow-100 border-yellow-200'
        };
        return colors[rarity as keyof typeof colors] || 'text-gray-600 bg-gray-100 border-gray-200';
    };

    const RarityIcon = getRarityIcon(result.rarity);

    return (
        <div className="space-y-6">
            {/* 基础结果卡片 */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            Your New Life
                            <Badge className={`${getRarityColor(result.rarity)} font-bold border`}>
                                <RarityIcon className="w-3 h-3 mr-1" />
                                {result.rarity.toUpperCase()}
                            </Badge>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 基本信息网格 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Country</span>
                            <p className="font-semibold">{result.country}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Gender</span>
                            <p className="font-semibold">{result.gender}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Social Class</span>
                            <p className="font-semibold">{result.socialClass}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Birthplace</span>
                            <p className="font-semibold">{result.birthplace}</p>
                        </div>
                    </div>

                    {/* 属性条 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium flex items-center gap-1">
                                    <Heart className="w-4 h-4 text-red-500" />
                                    Health
                                </span>
                                <span className="text-sm">{result.health}/100</span>
                            </div>
                            <Progress value={result.health} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium flex items-center gap-1">
                                    <Sparkles className="w-4 h-4 text-yellow-500" />
                                    Luck
                                </span>
                                <span className="text-sm">{result.luck}/100</span>
                            </div>
                            <Progress value={result.luck} />
                        </div>
                    </div>

                    {/* 天赋 */}
                    {result.talents && result.talents.length > 0 && (
                        <div>
                            <h3 className="font-medium text-sm mb-2">Talents</h3>
                            <div className="flex flex-wrap gap-1">
                                {result.talents.map((talent, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {talent}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 寿命 */}
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-lg font-bold">{result.lifespan}</span>
                        <span className="text-sm text-muted-foreground ml-1">years lifespan</span>
                    </div>

                    {/* 模式特定内容简化显示 */}
                    {mode !== 'classic' && modeResult && (
                        <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                            <div className="text-sm font-medium text-primary">
                                {mode === 'historical' && '🏛️ Historical Mode Active'}
                                {mode === 'fantasy' && '🧙‍♂️ Fantasy Mode Active'}
                                {mode === 'scifi' && '🚀 Sci-Fi Mode Active'}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                Enhanced life experience with special features
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}; 