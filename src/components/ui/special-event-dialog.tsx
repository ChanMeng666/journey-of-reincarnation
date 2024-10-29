'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { SpecialEventType } from "@/types";

interface SpecialEventDialogProps {
    type: SpecialEventType;
    isOpen: boolean;
    onClose: () => void;
}

const EVENT_CONFIG = {
    twinBirth: {
        icon: '👯',
        color: 'from-blue-500/20 to-transparent',
    },
    prodigy: {
        icon: '🧠',
        color: 'from-purple-500/20 to-transparent',
    },
    historicalFigure: {
        icon: '👑',
        color: 'from-amber-500/20 to-transparent',
    },
};

export function SpecialEventDialog({
                                       type,
                                       isOpen,
                                       onClose,
                                   }: SpecialEventDialogProps) {
    const { t } = useTranslation();

    const config = EVENT_CONFIG[type];

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
            <DialogContent className="sm:max-w-md">
                <div className={`absolute inset-0 bg-gradient-to-t ${config.color} rounded-lg -z-10`} />
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {t(`specialEvent.${type}.title`)}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {t(`specialEvent.${type}.description`)}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            duration: 0.6,
                        }}
                        className="text-6xl"
                    >
                        {config.icon}
                    </motion.div>
                    <Button onClick={onClose}>
                        {t('specialEvent.continue')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
