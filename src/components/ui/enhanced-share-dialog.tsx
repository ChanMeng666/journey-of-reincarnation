"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
    Share2, 
    Copy, 
    Download, 
    Twitter, 
    Facebook, 
    MessageCircle,
    Instagram,
    QrCode,
    Star,
    Crown,
    Sparkles,
    Trophy
} from "lucide-react";
import type { ReincarnationResult } from "@/types";
import { useTranslation } from 'react-i18next';

interface EnhancedShareDialogProps {
    result: ReincarnationResult;
    isOpen: boolean;
    onClose: () => void;
}

export const EnhancedShareDialog: React.FC<EnhancedShareDialogProps> = ({
    result,
    isOpen,
    onClose
}) => {
    const { t } = useTranslation();
    const [copySuccess, setCopySuccess] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState<'text' | 'card' | 'minimal'>('card');

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
            common: 'text-gray-500 bg-gray-100',
            uncommon: 'text-green-600 bg-green-100',
            rare: 'text-blue-600 bg-blue-100',
            epic: 'text-purple-600 bg-purple-100',
            legendary: 'text-yellow-600 bg-yellow-100'
        };
        return colors[rarity as keyof typeof colors] || 'text-gray-500 bg-gray-100';
    };

    const generateShareText = (format: 'text' | 'card' | 'minimal') => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        
        switch (format) {
            case 'minimal':
                return `🔄 Just reincarnated as a ${result.gender} in ${result.country}! ✨ My new life is ${result.rarity}! Try your luck: ${baseUrl}`;
            
            case 'text':
                return `🔄 Journey of Reincarnation Results 🔄\n\n` +
                       `📍 Country: ${result.country}\n` +
                       `👤 Gender: ${result.gender}\n` +
                       `💰 Social Class: ${result.socialClass}\n` +
                       `🏠 Birthplace: ${result.birthplace}\n` +
                       `⭐ Rarity: ${result.rarity}\n` +
                       `💪 Health: ${result.health}/100\n` +
                       `🍀 Luck: ${result.luck}/100\n` +
                       `⏳ Lifespan: ${result.lifespan} years\n\n` +
                       `🎯 Talents: ${result.talents.join(', ')}\n\n` +
                       `Try your reincarnation: ${baseUrl}`;
            
            case 'card':
            default:
                return `🌟 My Reincarnation Card 🌟\n\n` +
                       `🔮 New Life Summary:\n` +
                       `• Born in ${result.country} as ${result.gender}\n` +
                       `• ${result.socialClass} class in ${result.birthplace} area\n` +
                       `• ${result.rarity.toUpperCase()} life with ${result.lifespan} years\n` +
                       `• Health: ${result.health}/100 | Luck: ${result.luck}/100\n` +
                       `• Special talents: ${result.talents.slice(0, 3).join(', ')}\n\n` +
                       `✨ Discover your next life: ${baseUrl}`;
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const shareToSocial = (platform: string) => {
        const text = generateShareText(selectedFormat);
        const encodedText = encodeURIComponent(text);
        const url = typeof window !== 'undefined' ? window.location.href : '';
        
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodedText}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedText}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodedText}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    const downloadAsImage = () => {
        // 这里可以实现将结果卡片转换为图片的功能
        // 使用 html2canvas 或类似库
        console.log('Download as image functionality would be implemented here');
    };

    const generateQRCode = () => {
        // 生成二维码的功能
        console.log('QR Code generation would be implemented here');
    };

    const RarityIcon = getRarityIcon(result.rarity);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share Your Reincarnation
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* 预览卡片 */}
                    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-2xl">🔄</span>
                                    Journey of Reincarnation
                                </CardTitle>
                                <Badge className={`${getRarityColor(result.rarity)} font-bold`}>
                                    <RarityIcon className="w-3 h-3 mr-1" />
                                    {result.rarity.toUpperCase()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">📍 Country:</span>
                                        <span className="text-sm">{result.country}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">👤 Gender:</span>
                                        <span className="text-sm">{result.gender}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">💰 Class:</span>
                                        <span className="text-sm">{result.socialClass}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">🏠 Area:</span>
                                        <span className="text-sm">{result.birthplace}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">⏳ Lifespan:</span>
                                        <span className="text-sm">{result.lifespan} years</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">🎯 Talents:</span>
                                        <span className="text-sm">{result.talents.length}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">💪 Health</span>
                                    <span className="text-sm">{result.health}/100</span>
                                </div>
                                <Progress value={result.health} />
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">🍀 Luck</span>
                                    <span className="text-sm">{result.luck}/100</span>
                                </div>
                                <Progress value={result.luck} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 分享格式选择 */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Share Format</h3>
                        <div className="flex gap-2">
                            {[
                                { id: 'card', name: 'Card Format', icon: '🃏' },
                                { id: 'text', name: 'Detailed Text', icon: '📄' },
                                { id: 'minimal', name: 'Quick Share', icon: '⚡' }
                            ].map((format) => (
                                <Button
                                    key={format.id}
                                    variant={selectedFormat === format.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedFormat(format.id as any)}
                                    className="flex-1"
                                >
                                    <span className="mr-1">{format.icon}</span>
                                    {format.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* 分享选项 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button
                            onClick={() => copyToClipboard(generateShareText(selectedFormat))}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <Copy className="w-4 h-4" />
                            <span className="text-xs">
                                {copySuccess ? 'Copied!' : 'Copy Text'}
                            </span>
                        </Button>

                        <Button
                            onClick={() => shareToSocial('twitter')}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <Twitter className="w-4 h-4" />
                            <span className="text-xs">Twitter</span>
                        </Button>

                        <Button
                            onClick={() => shareToSocial('facebook')}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <Facebook className="w-4 h-4" />
                            <span className="text-xs">Facebook</span>
                        </Button>

                        <Button
                            onClick={() => shareToSocial('whatsapp')}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">WhatsApp</span>
                        </Button>

                        <Button
                            onClick={downloadAsImage}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <Download className="w-4 h-4" />
                            <span className="text-xs">Download</span>
                        </Button>

                        <Button
                            onClick={() => shareToSocial('telegram')}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">Telegram</span>
                        </Button>

                        <Button
                            onClick={generateQRCode}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <QrCode className="w-4 h-4" />
                            <span className="text-xs">QR Code</span>
                        </Button>

                        <Button
                            onClick={() => shareToSocial('instagram')}
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3"
                        >
                            <Instagram className="w-4 h-4" />
                            <span className="text-xs">Instagram</span>
                        </Button>
                    </div>

                    {/* 预览文本 */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Preview Text</h3>
                        <div className="bg-muted p-3 rounded text-sm font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                            {generateShareText(selectedFormat)}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 