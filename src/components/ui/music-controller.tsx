'use client';

import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

export function MusicController() {
    const { t } = useTranslation();

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 在 MusicController 组件中添加音量渐变效果
    const fadeInMusic = () => {
        if (!audioRef.current) return;

        audioRef.current.volume = 0;
        const fade = setInterval(() => {
            if (!audioRef.current) return clearInterval(fade);

            if (audioRef.current.volume < 0.3) {
                audioRef.current.volume += 0.02;
            } else {
                clearInterval(fade);
            }
        }, 100);
    };

    const fadeOutMusic = () => {
        if (!audioRef.current) return;

        const fade = setInterval(() => {
            if (!audioRef.current) return clearInterval(fade);

            if (audioRef.current.volume > 0.02) {
                audioRef.current.volume -= 0.02;
            } else {
                audioRef.current.pause();
                audioRef.current.volume = 0.3;
                clearInterval(fade);
            }
        }, 100);
    };

    useEffect(() => {
        audioRef.current = new Audio('/sounds/background-music.mp3');
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // const toggleMusic = () => {
    //     if (!audioRef.current) return;
    //
    //     if (isPlaying) {
    //         audioRef.current.pause();
    //     } else {
    //         audioRef.current.play().catch(error => {
    //             console.error('Error playing audio:', error);
    //         });
    //     }
    //     setIsPlaying(!isPlaying);
    // };

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            fadeOutMusic();
        } else {
            audioRef.current.play().then(() => {
                fadeInMusic();
            }).catch(error => {
                console.error('Error playing audio:', error);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleMusic}
            className="fixed bottom-4 right-4 bg-background/50 backdrop-blur-sm"
            title={isPlaying ? t('musicControl.pause') : t('musicControl.play')}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isPlaying ? (
                    <motion.div
                        key="playing"
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Volume2 className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="muted"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <VolumeX className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
}
