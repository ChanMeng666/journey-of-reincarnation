// 'use client';
//
// import { MainLayout } from "@/components/layout/main-layout";
// import { StartButton } from "@/components/ui/start-button";
// import { ResultCard } from "@/components/ui/result-card";
// import { CharacterAvatar } from "@/components/ui/character-avatar";
// import { GeneratingAnimation } from "@/components/ui/generating-animation";
// import { StatsCard } from "@/components/ui/stats-card";
// import { ComparisonTable } from "@/components/ui/comparison-table";
// import { useTranslation } from 'react-i18next';
// import { useState } from 'react';
// import type { ReincarnationResult } from "@/types";
// import { generateReincarnation } from "@/lib/reincarnation";
// import { motion, AnimatePresence } from "framer-motion";
// import '../i18n/config';
//
// export default function Home() {
//     const { t } = useTranslation();
//     const [results, setResults] = useState<ReincarnationResult[]>([]);
//     const [isGenerating, setIsGenerating] = useState(false);
//
//     const handleStartReincarnation = () => {
//         setIsGenerating(true);
//         setTimeout(() => {
//             const newResult = generateReincarnation();
//             setResults(prev => [...prev, newResult]);
//             setIsGenerating(false);
//         }, 2000);
//     };
//
//     const currentResult = results[results.length - 1];
//
//     return (
//         <MainLayout>
//             <div className="flex flex-col items-center gap-8 max-w-7xl mx-auto">
//                 <motion.h1
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-4xl font-bold text-center text-white mt-8"
//                 >
//                     {t('title')}
//                 </motion.h1>
//
//                 <StartButton
//                     isGenerating={isGenerating}
//                     hasResult={results.length > 0}
//                     onClick={handleStartReincarnation}
//                 />
//
//                 <AnimatePresence mode="wait">
//                     {isGenerating ? (
//                         <motion.div
//                             key="generating"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             className="w-full"
//                         >
//                             <GeneratingAnimation />
//                         </motion.div>
//                     ) : currentResult ? (
//                         <motion.div
//                             key="results"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="w-full space-y-8"
//                         >
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div className="space-y-6">
//                                     <CharacterAvatar
//                                         gender={currentResult.gender}
//                                         socialClass={currentResult.socialClass}
//                                         country={currentResult.country}
//                                     />
//                                 </div>
//                                 <ResultCard {...currentResult} />
//                             </div>
//
//                             <StatsCard
//                                 socialClass={currentResult.socialClass}
//                                 birthplace={currentResult.birthplace}
//                             />
//
//                             {results.length > 1 && (
//                                 <ComparisonTable results={results} />
//                             )}
//                         </motion.div>
//                     ) : null}
//                 </AnimatePresence>
//             </div>
//         </MainLayout>
//     );
// }



'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { StartButton } from "@/components/ui/start-button";
import { ResultCard } from "@/components/ui/result-card";
import { CharacterAvatar } from "@/components/ui/character-avatar";
import { GeneratingAnimation } from "@/components/ui/generating-animation";
import { StatsCard } from "@/components/ui/stats-card";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { ShareDialog } from "@/components/ui/share-dialog";
import { SpecialEventDialog } from "@/components/ui/special-event-dialog";
import { useTranslation } from 'react-i18next';
import {useEffect, useState} from 'react';
import type { ReincarnationResult, SpecialEventType } from "@/types";
import { generateReincarnation } from "@/lib/reincarnation";
import { motion, AnimatePresence } from "framer-motion";
import '../i18n/config';
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { WorldMap } from "@/components/ui/world-map";
import { useMusic } from "@/contexts/music-context";

export default function Home() {
    const { t } = useTranslation();
    const [results, setResults] = useState<ReincarnationResult[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [specialEvent, setSpecialEvent] = useState<SpecialEventType | null>(null);

    const playSound = useSoundEffects();
    const { isPlaying, toggleMusic } = useMusic();

    const handleStartReincarnation = () => {
        setIsGenerating(true);

        playSound('generate');

        setTimeout(() => {
            const newResult = generateReincarnation();
            setResults(prev => [...prev, newResult]);
            setIsGenerating(false);
            playSound('complete');

            // 随机触发特殊事件
            if (Math.random() < 0.2) { // 20% 的概率触发特殊事件
                const events: SpecialEventType[] = ['twinBirth', 'prodigy', 'historicalFigure'];
                setSpecialEvent(events[Math.floor(Math.random() * events.length)]);
                playSound('special');
            }
        }, 2000);
    };

    const currentResult = results[results.length - 1];

    useEffect(() => {
        if (!isPlaying) {
            toggleMusic();
        }
    }, []);

    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-8 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center text-white mt-8"
                >
                    {t('title')}
                </motion.h1>

                <StartButton
                    isGenerating={isGenerating}
                    hasResult={results.length > 0}
                    onClick={handleStartReincarnation}
                />

                <AnimatePresence mode="wait">
                    {isGenerating ? (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <GeneratingAnimation />
                        </motion.div>
                    ) : currentResult ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <CharacterAvatar
                                        gender={currentResult.gender}
                                        socialClass={currentResult.socialClass}
                                        country={currentResult.country}
                                    />
                                    <div className="flex justify-center">
                                        <ShareDialog result={currentResult} />
                                    </div>
                                </div>
                                <ResultCard {...currentResult} />
                            </div>

                            <WorldMap country={currentResult.country} />

                            <StatsCard
                                socialClass={currentResult.socialClass}
                                birthplace={currentResult.birthplace}
                            />

                            {results.length > 1 && (
                                <ComparisonTable results={results} />
                            )}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {specialEvent && (
                <SpecialEventDialog
                    type={specialEvent}
                    isOpen={true}
                    onClose={() => setSpecialEvent(null)}
                />
            )}
        </MainLayout>
    );
}
