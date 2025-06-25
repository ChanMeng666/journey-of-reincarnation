"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Target, Clock, Crown, X } from "lucide-react";

interface PlayerData {
    playerName: string;
    reincarnations: number;
    achievements: number;
    totalLifespan: number;
    favoriteCountry: string;
    rareLifeCount: number;
}

interface LeaderboardProps {
    isOpen: boolean;
    onClose: () => void;
    currentPlayerData: PlayerData;
}

export function Leaderboard({ isOpen, onClose, currentPlayerData }: LeaderboardProps) {
    const [leaderboardData, setLeaderboardData] = useState<PlayerData[]>([]);
    const [category, setCategory] = useState<'reincarnations' | 'achievements' | 'lifespan' | 'rareLifes'>('reincarnations');

    const loadLeaderboardData = () => {
        const mockData: PlayerData[] = [
            { playerName: 'SoulMaster', reincarnations: 156, achievements: 89, totalLifespan: 12450, favoriteCountry: 'Japan', rareLifeCount: 34 },
            { playerName: 'LifeExplorer', reincarnations: 134, achievements: 76, totalLifespan: 11234, favoriteCountry: 'Norway', rareLifeCount: 28 },
            { playerName: 'ReincarnationPro', reincarnations: 129, achievements: 92, totalLifespan: 10987, favoriteCountry: 'Switzerland', rareLifeCount: 31 },
            { playerName: 'CosmicWanderer', reincarnations: 98, achievements: 65, totalLifespan: 8765, favoriteCountry: 'Canada', rareLifeCount: 22 },
            { playerName: 'EternalSeeker', reincarnations: 87, achievements: 58, totalLifespan: 7432, favoriteCountry: 'Denmark', rareLifeCount: 19 },
            currentPlayerData
        ];
        setLeaderboardData(mockData);
    };

    useEffect(() => {
        if (isOpen) {
            loadLeaderboardData();
        }
    }, [isOpen]);

    const getSortedData = () => {
        const sorted = [...leaderboardData].sort((a, b) => {
            switch (category) {
                case 'reincarnations':
                    return b.reincarnations - a.reincarnations;
                case 'achievements':
                    return b.achievements - a.achievements;
                case 'lifespan':
                    return b.totalLifespan - a.totalLifespan;
                case 'rareLifes':
                    return b.rareLifeCount - a.rareLifeCount;
                default:
                    return 0;
            }
        });
        return sorted;
    };

    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case 'reincarnations': return <Target className="w-4 h-4" />;
            case 'achievements': return <Award className="w-4 h-4" />;
            case 'lifespan': return <Clock className="w-4 h-4" />;
            case 'rareLifes': return <Crown className="w-4 h-4" />;
            default: return <Trophy className="w-4 h-4" />;
        }
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
            case 2: return <Medal className="w-5 h-5 text-gray-400" />;
            case 3: return <Award className="w-5 h-5 text-amber-600" />;
            default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
        }
    };

    const getScoreDisplay = (player: PlayerData, cat: string) => {
        switch (cat) {
            case 'reincarnations': return player.reincarnations.toLocaleString();
            case 'achievements': return player.achievements.toLocaleString();
            case 'lifespan': return `${player.totalLifespan.toLocaleString()} years`;
            case 'rareLifes': return player.rareLifeCount.toLocaleString();
            default: return '0';
        }
    };

    const sortedData = getSortedData();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Community Leaderboard
                    </DialogTitle>
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="sm"
                        className="absolute right-4 top-4"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                
                <div className="space-y-4">
                    {/* Category Selection */}
                    <div className="flex gap-2 flex-wrap">
                        {(['reincarnations', 'achievements', 'lifespan', 'rareLifes'] as const).map((cat) => (
                            <Button
                                key={cat}
                                variant={category === cat ? 'default' : 'outline'}
                                onClick={() => setCategory(cat)}
                                className="flex items-center gap-1"
                                size="sm"
                            >
                                {getCategoryIcon(cat)}
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Button>
                        ))}
                    </div>

                    {/* Leaderboard List */}
                    <div className="space-y-2">
                        {sortedData.slice(0, 10).map((player, index) => {
                            const rank = index + 1;
                            const isCurrentPlayer = player.playerName === currentPlayerData.playerName;
                            
                            return (
                                <div 
                                    key={player.playerName} 
                                    className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                                        isCurrentPlayer ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8">
                                            {getRankIcon(rank)}
                                        </div>
                                        <div>
                                            <div className={`font-semibold ${isCurrentPlayer ? 'text-blue-700' : ''}`}>
                                                {player.playerName}
                                                {isCurrentPlayer && (
                                                    <Badge variant="secondary" className="ml-2">You</Badge>
                                                )}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {player.favoriteCountry} • {player.achievements} achievements
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 font-semibold">
                                            {getCategoryIcon(category)}
                                            {getScoreDisplay(player, category)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {player.rareLifeCount} rare lives
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Statistics */}
                    <div className="pt-4 border-t">
                        <h3 className="font-semibold mb-2">Your Stats</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div className="text-center p-2 bg-muted rounded">
                                <div className="font-semibold">{currentPlayerData.reincarnations}</div>
                                <div className="text-muted-foreground">Lives</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                                <div className="font-semibold">{currentPlayerData.achievements}</div>
                                <div className="text-muted-foreground">Achievements</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                                <div className="font-semibold">{currentPlayerData.totalLifespan.toLocaleString()}</div>
                                <div className="text-muted-foreground">Total Years</div>
                            </div>
                            <div className="text-center p-2 bg-muted rounded">
                                <div className="font-semibold">{currentPlayerData.rareLifeCount}</div>
                                <div className="text-muted-foreground">Rare Lives</div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 