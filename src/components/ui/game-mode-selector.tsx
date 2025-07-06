"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
                    <span>{selectedModeConfig ? t(`gameModes.${selectedModeConfig.id}`) : t('selectGameMode')}</span>
                </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5" />
                        {t('gameModes.selector.title')}
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
                                                    {t(`gameModes.${mode.id}`)}
                                                    {isSelected && (
                                                        <Badge variant="default" className="text-xs">
                                                            {t('gameModes.selector.current')}
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>{t(`gameModes.selector.${mode.id}Desc`)}</CardDescription>
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
                                                {t('gameModes.selector.unlocked')}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="text-sm text-muted-foreground">
                                                {t('gameModes.selector.requires')}: {mode.unlockRequirement?.reincarnations} {t('gameModes.selector.reincarnations')}
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
                    <h3 className="font-semibold mb-2">🎮 {t('gameModes.selector.overview')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <strong>🌍 {t('gameModes.classic')}:</strong> {t('gameModes.selector.classicDesc')}
                        </div>
                        <div>
                            <strong>🏛️ {t('gameModes.historical')}:</strong> {t('gameModes.selector.historicalDesc')}
                        </div>
                        <div>
                            <strong>🧙‍♂️ {t('gameModes.fantasy')}:</strong> {t('gameModes.selector.fantasyDesc')}
                        </div>
                        <div>
                            <strong>🚀 {t('gameModes.scifi')}:</strong> {t('gameModes.selector.scifiDesc')}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => setIsOpen(false)} variant="outline">
                        {t('close')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 