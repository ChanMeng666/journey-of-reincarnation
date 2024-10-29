import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'click' | 'generate' | 'complete' | 'special';

const SOUNDS: Record<SoundType, string> = {
    click: '/sounds/click-sound.mp3',
    generate: '/sounds/click-sound.mp3',
    complete: '/sounds/click-sound.mp3',
    special: '/sounds/click-sound.mp3',
};

export function useSoundEffects() {
    const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
        click: null,
        generate: null,
        complete: null,
        special: null,
    });

    useEffect(() => {
        Object.entries(SOUNDS).forEach(([key, src]) => {
            const audio = new Audio(src);
            audio.preload = 'auto';
            audioRefs.current[key as SoundType] = audio;
        });

        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        };
    }, []);

    const playSound = useCallback((type: SoundType) => {
        const audio = audioRefs.current[type];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(console.error);
        }
    }, []);

    return playSound;
}
