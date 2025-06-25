'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { StartButton } from "@/components/ui/start-button";

import { CharacterAvatar } from "@/components/ui/character-avatar";
import { GeneratingAnimation } from "@/components/ui/generating-animation";
import { StatsCard } from "@/components/ui/stats-card";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { ShareDialog } from "@/components/ui/share-dialog";
import { SpecialEventDialog } from "@/components/ui/special-event-dialog";
import { useEffect, useState } from 'react';
import type { ReincarnationResult, SpecialEventType, GameMode, ModeSpecificResult } from "@/types";
import { generateReincarnation } from "@/lib/reincarnation";
import { motion, AnimatePresence } from "framer-motion";
import '../i18n/config';
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { WorldMap } from "@/components/ui/world-map";
import { useMusic } from "@/contexts/music-context";
import '../i18n/config';
import { TitleWithLogo } from "@/components/ui/title-with-logo";
import { 
    saveReincarnation, 
    loadReincarnations, 
    initializeStorage,
    getUnlockedAchievementIds,
    saveAchievement 
} from "@/lib/storage";
import { checkNewAchievements } from "@/lib/achievements";
import { 
    initializeLifeJourney, 
    getNextDecision, 
    applyDecisionConsequences, 
    getLifeStageByAge 
} from '@/lib/life-decisions';
import { LifeJourneyPanel } from "@/components/ui/life-journey-panel";
import { LifeDecisionDialog } from "@/components/ui/life-decision-dialog";
import { GameModeSelector } from "@/components/ui/game-mode-selector";
import { EnhancedResultCard } from "@/components/ui/enhanced-result-card";
import { DataVisualization } from "@/components/ui/data-visualization";
import { Leaderboard } from "@/components/ui/leaderboard";

export default function Home() {
    const [results, setResults] = useState<ReincarnationResult[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [specialEvent, setSpecialEvent] = useState<SpecialEventType | null>(null);
    const [newAchievements, setNewAchievements] = useState<string[]>([]);
    
    // 游戏模式状态
    const [selectedMode, setSelectedMode] = useState<GameMode>('classic');
    const [modeSpecificResult, setModeSpecificResult] = useState<ModeSpecificResult | undefined>();
    
    // UI状态
    const [showDataVisualization, setShowDataVisualization] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    
    // 人生决策系统状态
    const [currentJourney, setCurrentJourney] = useState<any>(null);
    const [currentDecision, setCurrentDecision] = useState<any>(null);
    const [isJourneyMode, setIsJourneyMode] = useState(false);

    const playSound = useSoundEffects();
    const { isPlaying, toggleMusic } = useMusic();

    // 初始化数据
    useEffect(() => {
        const initializeData = async () => {
            try {
                await initializeStorage();
                const savedResults = await loadReincarnations();
                setResults(savedResults);
            } catch (error) {
                console.error('Failed to initialize data:', error);
            }
        };

        initializeData();
    }, []);

    const handleStartReincarnation = async () => {
        setIsGenerating(true);
        playSound('generate');

        setTimeout(async () => {
            try {
                const { result: newResult, modeResult } = generateReincarnation(selectedMode);
                setModeSpecificResult(modeResult);
                
                // 保存到数据库
                await saveReincarnation(newResult);
                
                // 更新本地状态
                setResults(prev => [...prev, newResult]);
                setIsGenerating(false);
                playSound('complete');

                // 检查新成就
                const updatedResults = [...results, newResult];
                const unlockedIds = await getUnlockedAchievementIds();
                const newUnlockedAchievements = checkNewAchievements(updatedResults, unlockedIds);
                
                // 保存新成就
                for (const achievement of newUnlockedAchievements) {
                    await saveAchievement(achievement);
                }

                if (newUnlockedAchievements.length > 0) {
                    setNewAchievements(newUnlockedAchievements.map(a => a.name));
                    setTimeout(() => setNewAchievements([]), 5000); // 5秒后清除通知
                }

                // 特殊事件触发 - 基于稀有度调整概率
                const eventProbability = newResult.rarity === 'legendary' ? 0.8 : 
                                       newResult.rarity === 'epic' ? 0.5 : 
                                       newResult.rarity === 'rare' ? 0.3 : 0.1;
                
                if (Math.random() < eventProbability) {
                    const events: SpecialEventType[] = ['twinBirth', 'prodigy', 'historicalFigure', 'timeTraveler', 'prophetic', 'miraculous'];
                    setSpecialEvent(events[Math.floor(Math.random() * events.length)]);
                    playSound('special');
                }
            } catch (error) {
                console.error('Failed to save reincarnation:', error);
                setIsGenerating(false);
            }
        }, 2000);
    };

    useEffect(() => {
        if (!isPlaying) {
            toggleMusic();
        }
    }, [isPlaying, toggleMusic]);

    const currentResult = results[results.length - 1];

    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-8 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center text-white mt-8"
                >
                    <TitleWithLogo />
                </motion.h1>

                <div className="flex flex-col items-center gap-4">
                    <GameModeSelector
                        selectedMode={selectedMode}
                        onModeSelect={setSelectedMode}
                        playerStats={{
                            reincarnations: results.length,
                            achievements: [],
                            rareLifes: results
                        }}
                    />
                    
                    <StartButton
                        isGenerating={isGenerating}
                        hasResult={results.length > 0}
                        onClick={handleStartReincarnation}
                    />
                    
                    {results.length > 0 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setShowDataVisualization(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                📊 Data Analytics
                            </button>
                            <button 
                                onClick={() => setShowLeaderboard(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                🏆 Leaderboard
                            </button>
                        </div>
                    )}
                </div>

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
                                <EnhancedResultCard 
                                    result={currentResult} 
                                    modeResult={modeSpecificResult}
                                    mode={selectedMode}
                                />
                            </div>

                            <WorldMap country={currentResult.country} />

                            <StatsCard />

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

            {/* 成就通知 */}
            <AnimatePresence>
                {newAchievements.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-4 right-4 z-50 space-y-2"
                    >
                        {newAchievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🏆</span>
                                    <div>
                                        <div className="font-bold text-sm">Achievement Unlocked!</div>
                                        <div className="text-xs">{achievement}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 数据可视化对话框 */}
            <DataVisualization
                isOpen={showDataVisualization}
                onClose={() => setShowDataVisualization(false)}
            />

            {/* 排行榜对话框 */}
            <Leaderboard
                isOpen={showLeaderboard}
                onClose={() => setShowLeaderboard(false)}
                currentPlayerData={{
                    playerName: 'Player',
                    reincarnations: results.length,
                    achievements: 0,
                    totalLifespan: results.reduce((sum, r) => sum + r.lifespan, 0),
                    favoriteCountry: results[results.length - 1]?.country || 'Unknown',
                    rareLifeCount: results.filter(r => ['rare', 'epic', 'legendary'].includes(r.rarity)).length
                }}
            />
        </MainLayout>
    );
}
