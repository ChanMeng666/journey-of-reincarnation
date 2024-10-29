'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { ReincarnationResult } from "@/types";

interface ShareDialogProps {
    result: ReincarnationResult;
}

export function ShareDialog({ result }: ShareDialogProps) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const shareText = `
${t('shareText')}:
${t('country')}: ${result.country}
${t('gender')}: ${t(result.gender)}
${t('socialClass')}: ${t(result.socialClass)}
${t('birthplace')}: ${t(result.birthplace)}
${t('familyStructure')}: ${t(result.familyStructure)}

${t('tryYourLuck')}
${typeof window !== 'undefined' ? window.location.origin : ''}
`.trim();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: t('title'),
                    text: shareText,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    {t('shareResult')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('shareResult')}</DialogTitle>
                    <DialogDescription>
                        {t('shareDescription')}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                        {shareText}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            className="gap-2"
                            onClick={handleCopy}
                            variant={copied ? "secondary" : "default"}
                        >
                            {copied ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            {copied ? t('copied') : t('copy')}
                        </Button>
                        {navigator.share && (
                            <Button onClick={handleShare} variant="outline" className="gap-2">
                                <Share2 className="h-4 w-4" />
                                {t('share')}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
