'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface MusicContextType {
    isPlaying: boolean;
    toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audioElement = new Audio('/sounds/background-music.mp3');
        audioElement.loop = true;
        audioElement.volume = 0.3; // 设置适当的音量
        setAudio(audioElement);

        return () => {
            audioElement.pause();
            audioElement.src = '';
        };
    }, []);

    const toggleMusic = useCallback(() => {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(console.error);
        }

        setIsPlaying(!isPlaying);
    }, [audio, isPlaying]);

    return (
        <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}
