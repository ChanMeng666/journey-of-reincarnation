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
        >
            <Button
                size="lg"
                className="w-48 h-12 text-lg"
                onClick={onClick}
                disabled={isGenerating}
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('generating')}
                    </>
                ) : (
                    t(hasResult ? 'reincarnate' : 'start')
                )}
            </Button>
        </motion.div>
    );
}
