"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, Star, Gamepad2 } from "lucide-react";
import { GAME_MODES } from "@/lib/game-modes";
import type { GameMode, GameModeConfig, ReincarnationResult } from "@/types";

interface GameModeSelectorProps {
    selectedMode: GameMode;
    onModeSelect: (mode: GameMode) => void;
    playerStats: {
        reincarnations: number;
        achievements: string[];
        rareLifes: ReincarnationResult[];
    };
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({
    selectedMode,
    onModeSelect,
    playerStats
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [unlockedModes, setUnlockedModes] = useState<Set<GameMode>>(new Set(['classic']));

    const checkModeUnlock = (mode: GameModeConfig): boolean => {
        if (mode.isUnlocked) return true;
        if (!mode.unlockRequirement) return false;

        const req = mode.unlockRequirement;

        if (req.reincarnations && playerStats.reincarnations < req.reincarnations) {
            return false;
        }

        if (req.achievements && !req.achievements.every(ach => playerStats.achievements.includes(ach))) {
            return false;
        }

        if (req.rarity) {
            const hasRequiredRarity = playerStats.rareLifes.some(life => 
                req.rarity?.includes(life.rarity)
            );
            if (!hasRequiredRarity) return false;
        }

        return true;
    };

    useEffect(() => {
        const unlocked = new Set<GameMode>();
        GAME_MODES.forEach(mode => {
            if (mode.isUnlocked || checkModeUnlock(mode)) {
                unlocked.add(mode.id);
            }
        });
        setUnlockedModes(unlocked);
    }, [playerStats]);

    const getUnlockProgress = (mode: GameModeConfig) => {
        if (!mode.unlockRequirement) return 100;
        
        const req = mode.unlockRequirement;
        let progress = 0;
        let total = 0;

        if (req.reincarnations) {
            progress += Math.min(playerStats.reincarnations, req.reincarnations);
            total += req.reincarnations;
        }

        return total > 0 ? (progress / total) * 100 : 0;
    };



    const selectedModeConfig = GAME_MODES.find(mode => mode.id === selectedMode);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    <span className="text-lg mr-2">{selectedModeConfig?.icon}</span>
                    <span>{selectedModeConfig?.name}</span>
                </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5" />
                        Select Game Mode
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GAME_MODES.map((mode) => {
                        const isUnlocked = unlockedModes.has(mode.id);
                        const isSelected = selectedMode === mode.id;
                        const progress = getUnlockProgress(mode);

                        return (
                            <Card 
                                key={mode.id}
                                className={`cursor-pointer transition-all hover:shadow-md ${
                                    isSelected 
                                        ? 'ring-2 ring-primary bg-primary/5' 
                                        : isUnlocked
                                            ? 'hover:bg-muted/30'
                                            : 'opacity-60'
                                }`}
                                onClick={() => {
                                    if (isUnlocked) {
                                        onModeSelect(mode.id);
                                        setIsOpen(false);
                                    }
                                }}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{mode.icon}</span>
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    {mode.name}
                                                    {isSelected && (
                                                        <Badge variant="default" className="text-xs">
                                                            Current
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>{mode.description}</CardDescription>
                                            </div>
                                        </div>
                                        
                                        {!isUnlocked && (
                                            <Lock className="w-4 h-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    {isUnlocked ? (
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-600">
                                                Unlocked
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="text-sm text-muted-foreground">
                                                Requires: {mode.unlockRequirement?.reincarnations} reincarnations
                                            </div>
                                            <Progress value={progress} />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* 模式说明 */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-2">🎮 Game Modes Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <strong>🌍 Classic Mode:</strong> Traditional modern world reincarnation
                        </div>
                        <div>
                            <strong>🏛️ Historical Mode:</strong> Live through different historical eras
                        </div>
                        <div>
                            <strong>🧙‍♂️ Fantasy Mode:</strong> Magical beings in fantasy realms
                        </div>
                        <div>
                            <strong>🚀 Sci-Fi Mode:</strong> Futuristic civilizations and technology
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => setIsOpen(false)} variant="outline">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 