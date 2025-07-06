'use client';

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface StartButtonProps {
    isGenerating: boolean;
    hasResult: boolean;
    onClick: () => void;
}

export function StartButton({ isGenerating, hasResult, onClick }: StartButtonProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Button
                size="lg"
                className="w-60 h-16 text-xl font-bold relative overflow-hidden
                    bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
                    hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600
                    shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50
                    border-2 border-purple-400/50 hover:border-purple-300/70
                    transition-all duration-300 ease-out
                    text-white
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-white/10 before:via-white/5 before:to-transparent
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity
                    active:transform active:scale-95"
                onClick={onClick}
                disabled={isGenerating}
            >
                <div className="relative z-10 flex items-center justify-center gap-2">
                    {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            <span className="animate-pulse">{t('generating')}</span>
                        </>
                    ) : (
                        <>
                            <span className="drop-shadow-lg">
                                {t(hasResult ? 'reincarnate' : 'start')}
                            </span>
                            {hasResult && (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="text-yellow-300"
                                >
                                    ✨
                                </motion.span>
                            )}
                        </>
                    )}
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-50 blur-md -z-10" />
            </Button>
        </motion.div>
    );
}
