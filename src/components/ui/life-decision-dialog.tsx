"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Heart, Brain, Users, TrendingUp, Briefcase, DollarSign } from "lucide-react";
import type { LifeDecision } from "@/types";

interface LifeDecisionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    decision: LifeDecision | null;
    currentAttributes: {
        health: number;
        wealth: number;
        happiness: number;
        relationships: number;
        education: number;
        career: number;
    };
    onMakeDecision: (decisionId: string, optionId: string) => void;
}

export const LifeDecisionDialog: React.FC<LifeDecisionDialogProps> = ({
    isOpen,
    onClose,
    decision,
    currentAttributes,
    onMakeDecision
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        if (isOpen && decision) {
            setSelectedOption(null);
            setTimeLeft(decision.timeLimit || 30);
            setIsTimerActive(true);
        }
    }, [isOpen, decision]);

    useEffect(() => {
        if (isTimerActive && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (isTimerActive && timeLeft === 0) {
            // 时间到了，自动选择第一个选项
            if (decision && decision.options.length > 0) {
                handleDecision(decision.options[0].id);
            }
        }
    }, [timeLeft, isTimerActive, decision]);

    const handleDecision = (optionId: string) => {
        if (!decision) return;
        setIsTimerActive(false);
        onMakeDecision(decision.id, optionId);
    };

    const getAttributeIcon = (attribute: string) => {
        const icons = {
            health: Heart,
            wealth: DollarSign,
            happiness: Heart,
            relationships: Users,
            education: Brain,
            career: Briefcase
        };
        return icons[attribute as keyof typeof icons] || TrendingUp;
    };

    const getAttributeColor = (value: number) => {
        if (value > 0) return 'text-green-600';
        if (value < 0) return 'text-red-600';
        return 'text-gray-600';
    };

    const getStageColor = (stage: string) => {
        const colors = {
            childhood: 'bg-pink-100 text-pink-800',
            adolescence: 'bg-purple-100 text-purple-800',
            youth: 'bg-blue-100 text-blue-800',
            adulthood: 'bg-green-100 text-green-800',
            middleAge: 'bg-orange-100 text-orange-800',
            elderlyAge: 'bg-gray-100 text-gray-800'
        };
        return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    if (!decision) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Badge className={getStageColor(decision.stage)}>
                                {decision.stage.charAt(0).toUpperCase() + decision.stage.slice(1)}
                            </Badge>
                            <DialogTitle className="text-xl font-bold">
                                {decision.situation}
                            </DialogTitle>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>Age {decision.age}</span>
                            {isTimerActive && (
                                <Badge variant="outline" className="ml-2">
                                    {timeLeft}s
                                </Badge>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* 情况描述 */}
                    <Card>
                        <CardHeader>
                            <CardDescription className="text-base leading-relaxed">
                                {decision.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* 当前属性 */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Current Life Attributes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(currentAttributes).map(([key, value]) => {
                                    const Icon = getAttributeIcon(key);
                                    return (
                                        <div key={key} className="flex items-center gap-2">
                                            <Icon className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium capitalize">{key}:</span>
                                            <span className="text-sm">{value}</span>
                                            <Progress 
                                                value={value as number} 
                                                className="w-16 h-2" 
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 决策选项 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Choose Your Path</h3>
                        <div className="grid gap-4">
                            {decision.options.map((option) => (
                                <Card 
                                    key={option.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${
                                        selectedOption === option.id 
                                            ? 'ring-2 ring-primary bg-primary/5' 
                                            : 'hover:bg-muted/30'
                                    }`}
                                    onClick={() => setSelectedOption(option.id)}
                                >
                                    <CardHeader>
                                        <CardTitle className="text-base">{option.text}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(option.consequences).map(([attr, value]) => {
                                                const Icon = getAttributeIcon(attr);
                                                return (
                                                    <Badge 
                                                        key={attr}
                                                        variant="outline" 
                                                        className={`${getAttributeColor(value as number)}`}
                                                    >
                                                        <Icon className="w-3 h-3 mr-1" />
                                                        {attr}: {value > 0 ? '+' : ''}{value}
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                            {isTimerActive && timeLeft <= 10 && (
                                <span className="text-red-600 font-medium">
                                    Hurry! Time is running out...
                                </span>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={isTimerActive}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => selectedOption && handleDecision(selectedOption)}
                                disabled={!selectedOption || !isTimerActive}
                                className="min-w-[100px]"
                            >
                                {isTimerActive ? 'Confirm Choice' : 'Time\'s Up!'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 时间进度条 */}
                {isTimerActive && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-64">
                        <Progress 
                            value={(timeLeft / (decision.timeLimit || 30)) * 100} 
                            className="h-2"
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}; 