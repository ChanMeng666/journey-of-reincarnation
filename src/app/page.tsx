'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { StartButton } from "@/components/ui/start-button";
import { CharacterAvatar } from "@/components/ui/character-avatar";
import { GeneratingAnimation } from "@/components/ui/generating-animation";
import { StatsCard } from "@/components/ui/stats-card";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { ShareDialog } from "@/components/ui/share-dialog";

// GEO组件导入
import { GEOHead, AppLevelStructuredData, ReincarnationResultStructuredData } from "@/components/seo";

import { AchievementUnlockDialog } from "@/components/ui/achievement-unlock-dialog";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ReincarnationResult, SpecialEventType, GameMode, ModeSpecificResult, KarmaProfile, Achievement } from "@/types";
import { generateReincarnation } from "@/lib/reincarnation";
import { motion, AnimatePresence } from "framer-motion";
import '../i18n/config';
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { WorldMap } from "@/components/ui/world-map";
import { TitleWithLogo } from "@/components/ui/title-with-logo";
import { 
    saveReincarnation, 
    loadReincarnations, 
    initializeStorage,
    getUnlockedAchievementIds,
    saveAchievement,
    loadKarmaProfile,
    saveKarmaProfile,
    saveKarmaRecord
} from "@/lib/storage";
import { createInitialKarmaProfile } from "@/lib/karma-system";
import { checkNewAchievements } from "@/lib/achievements";
import { GameModeSelector } from "@/components/ui/game-mode-selector";
import { EnhancedResultCard } from "@/components/ui/enhanced-result-card";
import { DataVisualization } from "@/components/ui/data-visualization";
import { Leaderboard } from "@/components/ui/leaderboard";
import { KarmaDisplay } from "@/components/ui/karma-display";
import { ModernParticleBackground } from "@/components/ui/modern-particle-background";
import { AnimatedContainer, GradientText, Card3D, GlowButton } from "@/components/ui/enhanced-animations";

export default function Home() {
    const { t } = useTranslation();
    const [results, setResults] = useState<ReincarnationResult[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
    const [showAchievementDialog, setShowAchievementDialog] = useState(false);
    
    // 游戏模式状态
    const [selectedMode, setSelectedMode] = useState<GameMode>('classic');
    const [modeSpecificResult, setModeSpecificResult] = useState<ModeSpecificResult | undefined>();
    
    // 业力系统状态
    const [karmaProfile, setKarmaProfile] = useState<KarmaProfile | null>(null);
    
    // UI状态
    const [showDataVisualization, setShowDataVisualization] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const playSound = useSoundEffects();

    // 初始化数据
    useEffect(() => {
        const initializeData = async () => {
            try {
                await initializeStorage();
                const savedResults = await loadReincarnations();
                setResults(savedResults);
                
                // 加载业力档案
                let profile = await loadKarmaProfile();
                if (!profile) {
                    profile = createInitialKarmaProfile();
                    await saveKarmaProfile(profile);
                }
                setKarmaProfile(profile);
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
                const { result: newResult, modeResult, updatedKarmaProfile } = generateReincarnation(selectedMode, karmaProfile || undefined);
                setModeSpecificResult(modeResult);
                
                // 特殊事件触发 - 基于稀有度调整概率（在保存和成就检查之前进行）
                const eventProbability = newResult.rarity === 'legendary' ? 0.8 : 
                                       newResult.rarity === 'epic' ? 0.5 : 
                                       newResult.rarity === 'rare' ? 0.3 : 0.1;
                
                let triggeredEvent: SpecialEventType | null = null;
                if (Math.random() < eventProbability) {
                    const events: SpecialEventType[] = ['twinBirth', 'prodigy', 'historicalFigure', 'timeTraveler', 'prophetic', 'miraculous'];
                    triggeredEvent = events[Math.floor(Math.random() * events.length)];
                    
                    // 将特殊事件记录到轮回结果中（在保存之前）
                    newResult.specialEvents = [triggeredEvent];
                }
                
                // 保存到数据库（现在包含了特殊事件信息）
                await saveReincarnation(newResult);
                
                // 保存业力事件
                if (newResult.karmaEvents) {
                    for (const event of newResult.karmaEvents) {
                        await saveKarmaRecord(event);
                    }
                }
                
                // 更新业力档案
                if (updatedKarmaProfile) {
                    await saveKarmaProfile(updatedKarmaProfile);
                    setKarmaProfile(updatedKarmaProfile);
                }
                
                // 更新本地状态
                setResults(prev => [...prev, newResult]);
                setIsGenerating(false);
                playSound('complete');

                // 检查新成就（从数据库读取最新的轮回结果数据）
                const allReincarnations = await loadReincarnations();
                const unlockedIds = await getUnlockedAchievementIds();
                
                const newUnlockedAchievements = checkNewAchievements(allReincarnations, unlockedIds);
                
                // 保存新成就
                for (const achievement of newUnlockedAchievements) {
                    await saveAchievement(achievement);
                }

                if (newUnlockedAchievements.length > 0) {
                    // 确保成就数组没有 undefined 元素
                    const validAchievements = newUnlockedAchievements.filter(a => a && a.id && a.rarity);
                    
                    if (validAchievements.length > 0) {
                        setNewAchievements(validAchievements);
                        setShowAchievementDialog(true);
                    }
                }

                // 特殊事件会通过成就系统自动处理，不需要单独的弹窗
                if (triggeredEvent) {
                    playSound('special');
                }
            } catch (error) {
                console.error('Failed to save reincarnation:', error);
                setIsGenerating(false);
            }
        }, 2000);
    };

    const currentResult = results[results.length - 1];

    return (
        <>
            {/* GEO优化组件 */}
            <GEOHead 
                pageType={currentResult ? "result" : "home"} 
                resultData={currentResult}
                language="en" // 可以根据用户设置动态获取
            />
            <AppLevelStructuredData />
            
            {/* 如果有轮回结果，添加结果特定的结构化数据 */}
            {currentResult && (
                <ReincarnationResultStructuredData result={currentResult} />
            )}

            <MainLayout>
                <ModernParticleBackground theme="cosmic" particleCount={30} />
                <div className="flex flex-col items-center gap-8 max-w-7xl mx-auto relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center mt-8"
                >
                    <GradientText gradient="from-purple-400 via-pink-500 to-blue-500">
                        <TitleWithLogo />
                    </GradientText>
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
                        <div className="flex gap-4">
                            <GlowButton
                                variant="primary"
                                onClick={() => setShowDataVisualization(true)}
                            >
                                📊 {t('dataVisualization.title')}
                            </GlowButton>
                            <GlowButton
                                variant="secondary"
                                onClick={() => setShowLeaderboard(true)}
                            >
                                🏆 {t('leaderboard.title')}
                            </GlowButton>
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
                        <AnimatedContainer
                            key="results"
                            variant="fadeInScale"
                            className="w-full space-y-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Card3D className="space-y-6">
                                    <CharacterAvatar
                                        gender={currentResult.gender}
                                        socialClass={currentResult.socialClass}
                                        country={currentResult.country}
                                    />
                                    <div className="flex justify-center">
                                        <ShareDialog result={currentResult} />
                                    </div>
                                </Card3D>
                                <Card3D>
                                    <EnhancedResultCard 
                                        result={currentResult} 
                                        modeResult={modeSpecificResult}
                                        mode={selectedMode}
                                    />
                                </Card3D>
                                <Card3D>
                                    <KarmaDisplay 
                                        karmaProfile={karmaProfile}
                                        karmaEvents={currentResult.karmaEvents}
                                    />
                                </Card3D>
                            </div>

                            <WorldMap country={currentResult.country} />

                            <StatsCard />

                            {results.length > 1 && (
                                <ComparisonTable results={results} />
                            )}
                        </AnimatedContainer>
                    ) : null}
                </AnimatePresence>
            </div>



            {/* 成就解锁弹窗 */}
            <AchievementUnlockDialog
                achievements={newAchievements}
                isOpen={showAchievementDialog}
                onClose={() => {
                    setShowAchievementDialog(false);
                    setNewAchievements([]);
                }}
            />

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
                    playerName: t('player'),
                    reincarnations: results.length,
                    achievements: 0,
                    totalLifespan: results.reduce((sum, r) => sum + r.lifespan, 0),
                    favoriteCountry: results[results.length - 1]?.country || 'Unknown',
                    rareLifeCount: results.filter(r => ['rare', 'epic', 'legendary'].includes(r.rarity)).length
                }}
            />
            </MainLayout>
        </>
    );
}
