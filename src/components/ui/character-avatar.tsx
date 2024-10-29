'use client';

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CharacterAvatarProps {
    gender: string;
    socialClass: string;
    country: string;
}

const getEmoji = (gender: string, socialClass: string) => {
    const emojiMap = {
        male: {
            high: '👨‍💼',
            middle: '👨‍🏫',
            low: '👨‍🔧'
        },
        female: {
            high: '👩‍💼',
            middle: '👩‍🏫',
            low: '👩‍🔧'
        }
    };
    return emojiMap[gender as keyof typeof emojiMap]?.[socialClass as keyof typeof emojiMap.male] || '🧑';
};

const getCountryEmoji = (country: string) => {
    const countryEmojis: Record<string, string> = {
        'China': '🇨🇳',
        'India': '🇮🇳',
        'United States': '🇺🇸',
        'Indonesia': '🇮🇩',
        'Pakistan': '🇵🇰',
        'Brazil': '🇧🇷',
        'Nigeria': '🇳🇬',
        'Bangladesh': '🇧🇩',
        'Russia': '🇷🇺',
        'Mexico': '🇲🇽',
    };
    return countryEmojis[country] || '🌍';
};

export function CharacterAvatar({ gender, socialClass, country }: CharacterAvatarProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
        >
            <Card className="overflow-hidden">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <span className="text-6xl">{getEmoji(gender, socialClass)}</span>
                            <span className="absolute -right-2 -bottom-2 text-3xl">
                {getCountryEmoji(country)}
              </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                        >
                            <div className="text-lg font-medium">
                                {t(gender === 'male' ? 'male' : 'female')}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {t(socialClass)} · {country}
                            </div>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
