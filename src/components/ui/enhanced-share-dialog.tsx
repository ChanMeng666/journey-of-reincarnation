"use client";

import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Twitter, Facebook, MessageCircle, Send, Download, X } from "lucide-react";
import type { ReincarnationResult } from "@/types";

interface EnhancedShareDialogProps {
    result: ReincarnationResult;
    modeResult?: ReincarnationResult;
    mode?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function EnhancedShareDialog({ result, modeResult, mode, isOpen, onClose }: EnhancedShareDialogProps) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [shareFormat, setShareFormat] = useState<'text' | 'card' | 'minimal'>('card');

    const getRarityIcon = (rarity: string) => {
        switch (rarity) {
            case 'legendary': return '👑';
            case 'epic': return '💎';
            case 'rare': return '✨';
            default: return '🌟';
        }
    };

    const generateShareText = (format: 'text' | 'card' | 'minimal') => {
        const rarityIcon = getRarityIcon(result.rarity);
        const modeText = modeResult && mode ? ` (${mode} mode)` : '';
        
        switch (format) {
            case 'minimal':
                return `Just reincarnated as ${result.gender} in ${result.country}! ${rarityIcon}`;
            case 'text':
                return `🎮 Journey of Reincarnation${modeText}\n\n` +
                       `${rarityIcon} ${result.rarity.toUpperCase()} LIFE!\n` +
                       `🌍 Country: ${result.country}\n` +
                       `👤 Gender: ${result.gender}\n` +
                       `🏛️ Social Class: ${result.socialClass}\n` +
                       `📍 Birth Place: ${result.birthplace}\n` +
                       `👨‍👩‍👧‍👦 Family: ${result.familyStructure}\n` +
                       `⏳ Lifespan: ${result.lifespan} years\n` +
                       `🎯 Life Score: ${result.luck}/100`;
            case 'card':
            default:
                return `🎮 Journey of Reincarnation - ${result.rarity.toUpperCase()} Life! ${rarityIcon}\n\n` +
                       `Born as ${result.gender} in ${result.country}\n` +
                       `Social Class: ${result.socialClass}\n` +
                       `Lifespan: ${result.lifespan} years | Score: ${result.luck}/100\n\n` +
                       `Play your next life!`;
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const shareToSocialMedia = useCallback((targetPlatform: string) => {
        const text = generateShareText(shareFormat);
        const encodedText = encodeURIComponent(text);
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const encodedUrl = encodeURIComponent(url);
        
        const urls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
            whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
        };
        
        if (urls[targetPlatform]) {
            window.open(urls[targetPlatform], '_blank', 'width=600,height=400');
        }
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    }, [shareFormat]);

    const exportData = useCallback(() => {
        const data = {
            timestamp: new Date().toISOString(),
            gameMode: mode,
            result: result,
            modeSpecificResult: modeResult
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reincarnation-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    }, [result, modeResult, mode]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share Your Journey
                    </DialogTitle>
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="sm"
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                
                <div className="space-y-4">
                    {/* Format Selection */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Share Format</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'card', label: 'Card', icon: '🎴' },
                                { id: 'text', label: 'Detailed', icon: '📄' },
                                { id: 'minimal', label: 'Minimal', icon: '✨' }
                            ].map((format) => (
                                <Button
                                    key={format.id}
                                    variant={shareFormat === format.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setShareFormat(format.id as 'text' | 'card' | 'minimal')}
                                    className="flex-1"
                                >
                                    <span className="mr-1">{format.icon}</span>
                                    {format.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Share to Platform</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Button
                                onClick={() => copyToClipboard(generateShareText(shareFormat))}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3"
                            >
                                <Copy className="w-4 h-4" />
                                <span className="text-xs">
                                    {showSuccess ? 'Copied!' : 'Copy Text'}
                                </span>
                            </Button>

                            <Button
                                onClick={() => shareToSocialMedia('twitter')}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3"
                            >
                                <Twitter className="w-4 h-4" />
                                <span className="text-xs">Twitter</span>
                            </Button>

                            <Button
                                onClick={() => shareToSocialMedia('facebook')}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3"
                            >
                                <Facebook className="w-4 h-4" />
                                <span className="text-xs">Facebook</span>
                            </Button>

                            <Button
                                onClick={() => shareToSocialMedia('whatsapp')}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-xs">WhatsApp</span>
                            </Button>

                            <Button
                                onClick={() => shareToSocialMedia('telegram')}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3"
                            >
                                <Send className="w-4 h-4" />
                                <span className="text-xs">Telegram</span>
                            </Button>

                            <Button
                                onClick={exportData}
                                variant="outline"
                                className="flex flex-col gap-1 h-auto py-3"
                            >
                                <Download className="w-4 h-4" />
                                <span className="text-xs">Export</span>
                            </Button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Preview Text</h3>
                        <div className="bg-muted p-3 rounded text-sm font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                            {generateShareText(shareFormat)}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 