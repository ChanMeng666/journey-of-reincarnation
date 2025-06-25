"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Heart, DollarSign, Users, Brain, Briefcase, Smile, Calendar, Play, RotateCcw } from "lucide-react";
import type { EnhancedReincarnationResult, LifeStage } from "@/types";

interface LifeJourneyPanelProps {
    result: EnhancedReincarnationResult;
    onStartJourney: () => void;
    onContinueJourney: () => void;
    onResetJourney: () => void;
}

export const LifeJourneyPanel: React.FC<LifeJourneyPanelProps> = ({
    result,
    onStartJourney,
    onContinueJourney,
    onResetJourney
}) => {
    const journey = result.lifeJourney;
    
    if (!journey) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Life Journey
                    </CardTitle>
                    <CardDescription>
                        Experience your reincarnated life through key decisions and milestones
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={onStartJourney} className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Life Journey
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const getStageColor = (stage: LifeStage) => {
        const colors = {
            childhood: 'bg-pink-100 text-pink-800 border-pink-200',
            adolescence: 'bg-purple-100 text-purple-800 border-purple-200',
            youth: 'bg-blue-100 text-blue-800 border-blue-200',
            adulthood: 'bg-green-100 text-green-800 border-green-200',
            middleAge: 'bg-orange-100 text-orange-800 border-orange-200',
            elderlyAge: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return colors[stage] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const attributeIcons = {
        health: Heart,
        wealth: DollarSign,
        happiness: Smile,
        relationships: Users,
        education: Brain,
        career: Briefcase
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Life Journey - Age {journey.currentAge}
                </CardTitle>
                <Badge className={getStageColor(journey.currentStage)}>
                    {journey.currentStage.charAt(0).toUpperCase() + journey.currentStage.slice(1)}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(journey.attributes).map(([key, value]) => {
                        const Icon = attributeIcons[key as keyof typeof attributeIcons];
                        return (
                            <div key={key} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium capitalize">{key}</span>
                                </div>
                                <Progress value={value} />
                                <span className="text-sm">{value}/100</span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-2">
                    <Button onClick={onContinueJourney} disabled={journey.isCompleted}>
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                    </Button>
                    <Button variant="outline" onClick={onResetJourney}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}; 