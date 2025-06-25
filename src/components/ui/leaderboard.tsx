"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Crown, Star, Target, Award, Calendar } from "lucide-react";

interface LeaderboardEntry {
    id: string;
    playerName: string;
    score: number;
    rank: number;
    reincarnations: number;
    achievements: number;
    rareLifeCount: number;
    favoriteCountry: string;
    totalLifespan: number;
    createdAt: number;
}

interface LeaderboardProps {
    isOpen: boolean;
    onClose: () => void;
    currentPlayerData?: {
        playerName: string;
        reincarnations: number;
        achievements: number;
        totalLifespan: number;
        favoriteCountry: string;
        rareLifeCount: number;
    };
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
    isOpen,
    onClose,
    currentPlayerData
}) => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [selectedType, setSelectedType] = useState<'score' | 'reincarnations' | 'achievements' | 'lifespan'>('score');
    const [loading, setLoading] = useState(true);
    const [currentPlayerRank, setCurrentPlayerRank] = useState<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            loadLeaderboardData();
        }
    }, [isOpen, selectedType]);

    const loadLeaderboardData = async () => {
        setLoading(true);
        try {
            // 生成模拟数据
            const mockData = generateMockLeaderboard();
            setLeaderboardData(mockData);
            
            // 计算当前玩家排名
            if (currentPlayerData) {
                const currentScore = calculatePlayerScore(currentPlayerData);
                const rank = mockData.findIndex(entry => entry.score <= currentScore) + 1;
                setCurrentPlayerRank(rank > 0 ? rank : mockData.length + 1);
            }
        } catch (error) {
            console.error('Failed to load leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateMockLeaderboard = (): LeaderboardEntry[] => {
        const mockEntries: LeaderboardEntry[] = [];
        const countries = ['China', 'USA', 'Japan', 'UK', 'Germany', 'France', 'Brazil', 'India'];
        const names = ['DragonSlayer', 'LifeMaster', 'ReincarnationKing', 'EternalSoul', 'MysticWanderer', 
                      'CosmicTraveler', 'TimeKeeper', 'StarGazer', 'SoulCrafter', 'LifeArtist'];

        for (let i = 0; i < 20; i++) {
            const reincarnations = Math.floor(Math.random() * 100) + 10;
            const achievements = Math.floor(Math.random() * 20) + 1;
            const rareLifeCount = Math.floor(Math.random() * 10);
            const totalLifespan = Math.floor(Math.random() * 5000) + 1000;
            
            mockEntries.push({
                id: `player_${i}`,
                playerName: names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 999),
                score: calculateScore(reincarnations, achievements, rareLifeCount, totalLifespan),
                rank: i + 1,
                reincarnations,
                achievements,
                rareLifeCount,
                favoriteCountry: countries[Math.floor(Math.random() * countries.length)],
                totalLifespan,
                createdAt: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
            });
        }

        return sortLeaderboard(mockEntries);
    };

    const calculateScore = (reincarnations: number, achievements: number, rareLifeCount: number, totalLifespan: number): number => {
        return Math.floor(
            reincarnations * 10 + 
            achievements * 25 + 
            rareLifeCount * 50 + 
            totalLifespan * 0.01
        );
    };

    const calculatePlayerScore = (player: typeof currentPlayerData): number => {
        if (!player) return 0;
        return calculateScore(player.reincarnations, player.achievements, player.rareLifeCount, player.totalLifespan);
    };

    const sortLeaderboard = (entries: LeaderboardEntry[]): LeaderboardEntry[] => {
        let sorted = [...entries];
        
        switch (selectedType) {
            case 'score':
                sorted.sort((a, b) => b.score - a.score);
                break;
            case 'reincarnations':
                sorted.sort((a, b) => b.reincarnations - a.reincarnations);
                break;
            case 'achievements':
                sorted.sort((a, b) => b.achievements - a.achievements);
                break;
            case 'lifespan':
                sorted.sort((a, b) => b.totalLifespan - a.totalLifespan);
                break;
        }

        return sorted.map((entry, index) => ({
            ...entry,
            rank: index + 1
        }));
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
        if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>;
    };

    const getRankBadgeColor = (rank: number) => {
        if (rank === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        if (rank === 2) return 'bg-gray-100 text-gray-800 border-gray-300';
        if (rank === 3) return 'bg-amber-100 text-amber-800 border-amber-300';
        if (rank <= 10) return 'bg-blue-100 text-blue-800 border-blue-300';
        return 'bg-muted text-muted-foreground border-muted';
    };

    const getTypeIcon = (type: typeof selectedType) => {
        const icons = {
            score: Trophy,
            reincarnations: Target,
            achievements: Award,
            lifespan: Calendar
        };
        return icons[type];
    };

    const getTypeValue = (entry: LeaderboardEntry, type: typeof selectedType) => {
        switch (type) {
            case 'score':
                return entry.score.toLocaleString();
            case 'reincarnations':
                return entry.reincarnations.toLocaleString();
            case 'achievements':
                return entry.achievements.toString();
            case 'lifespan':
                return `${entry.totalLifespan.toLocaleString()} years`;
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Community Leaderboard
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* 当前玩家状态 */}
                    {currentPlayerData && currentPlayerRank && (
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-sm">Your Current Ranking</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            {getRankIcon(currentPlayerRank)}
                                            <span className="font-bold text-lg">#{currentPlayerRank}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">{currentPlayerData.playerName}</div>
                                            <div className="text-sm text-muted-foreground">
                                                Score: {calculatePlayerScore(currentPlayerData).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-muted-foreground">
                                            {currentPlayerData.reincarnations} lives • {currentPlayerData.achievements} achievements
                                        </div>
                                        <div className="text-sm">
                                            {currentPlayerData.rareLifeCount} rare lives
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* 排序选择 */}
                    <div className="flex gap-2 flex-wrap">
                        {(['score', 'reincarnations', 'achievements', 'lifespan'] as const).map((type) => {
                            const TypeIcon = getTypeIcon(type);
                            return (
                                <Button
                                    key={type}
                                    variant={selectedType === type ? 'default' : 'outline'}
                                    onClick={() => setSelectedType(type)}
                                    className="flex items-center gap-1"
                                >
                                    <TypeIcon className="w-4 h-4" />
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </Button>
                            );
                        })}
                    </div>

                    {/* 排行榜内容 */}
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p>Loading leaderboard...</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {leaderboardData.slice(0, 10).map((entry) => {
                                const TypeIcon = getTypeIcon(selectedType);
                                return (
                                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Badge className={`${getRankBadgeColor(entry.rank)} border`}>
                                                #{entry.rank}
                                            </Badge>
                                            <div>
                                                <div className="font-semibold">{entry.playerName}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {entry.favoriteCountry} • {entry.achievements} achievements
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 font-semibold">
                                                <TypeIcon className="w-4 h-4" />
                                                {getTypeValue(entry, selectedType)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {entry.rareLifeCount} rare
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* 评分系统说明 */}
                    <Card className="bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-sm">Scoring System</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-1">
                            <div>• Reincarnations: 10 points each</div>
                            <div>• Achievements: 25 points each</div>
                            <div>• Rare Lives: 50 points each</div>
                            <div>• Total Lifespan: 0.01 points per year</div>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 