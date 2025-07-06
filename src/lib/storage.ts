import type { ReincarnationResult, UserStatistics, GameConfig, Achievement, KarmaProfile, KarmaRecord } from "@/types";

// IndexedDB 配置
const DB_NAME = 'ReincarnationGameDB';
const DB_VERSION = 2;
const STORES = {
    REINCARNATIONS: 'reincarnations',
    ACHIEVEMENTS: 'achievements',
    STATISTICS: 'statistics',
    SETTINGS: 'settings',
    KARMA_PROFILES: 'karma_profiles',
    KARMA_RECORDS: 'karma_records'
} as const;

// LocalStorage 键
const STORAGE_KEYS = {
    GAME_CONFIG: 'reincarnation-config',
    QUICK_STATS: 'reincarnation-quick-stats',
    LAST_SYNC: 'reincarnation-last-sync'
} as const;

// IndexedDB 工具类
class IndexedDBManager {
    private db: IDBDatabase | null = null;

    async initDB(): Promise<IDBDatabase> {
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // 轮回记录表
                if (!db.objectStoreNames.contains(STORES.REINCARNATIONS)) {
                    const reincarnationStore = db.createObjectStore(STORES.REINCARNATIONS, {
                        keyPath: 'id'
                    });
                    reincarnationStore.createIndex('timestamp', 'timestamp');
                    reincarnationStore.createIndex('country', 'country');
                    reincarnationStore.createIndex('rarity', 'rarity');
                }

                // 成就表
                if (!db.objectStoreNames.contains(STORES.ACHIEVEMENTS)) {
                    const achievementStore = db.createObjectStore(STORES.ACHIEVEMENTS, {
                        keyPath: 'id'
                    });
                    achievementStore.createIndex('unlockedAt', 'unlockedAt');
                    achievementStore.createIndex('rarity', 'rarity');
                }

                // 统计表
                if (!db.objectStoreNames.contains(STORES.STATISTICS)) {
                    db.createObjectStore(STORES.STATISTICS, { keyPath: 'id' });
                }

                // 设置表
                if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
                    db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
                }

                // 业力档案表
                if (!db.objectStoreNames.contains(STORES.KARMA_PROFILES)) {
                    db.createObjectStore(STORES.KARMA_PROFILES, { keyPath: 'id' });
                }

                // 业力记录表
                if (!db.objectStoreNames.contains(STORES.KARMA_RECORDS)) {
                    const karmaStore = db.createObjectStore(STORES.KARMA_RECORDS, { keyPath: 'id' });
                    karmaStore.createIndex('lifeId', 'lifeId');
                    karmaStore.createIndex('timestamp', 'timestamp');
                    karmaStore.createIndex('category', 'category');
                    karmaStore.createIndex('actionType', 'actionType');
                }
            };
        });
    }

    async add<T>(storeName: string, data: T): Promise<void> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async put<T>(storeName: string, data: T): Promise<void> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async get<T>(storeName: string, key: string): Promise<T | undefined> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAll<T>(storeName: string): Promise<T[]> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName: string, key: string): Promise<void> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async clear(storeName: string): Promise<void> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async count(storeName: string): Promise<number> {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.count();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

// 创建全局实例
const dbManager = new IndexedDBManager();

// LocalStorage 工具函数
const setLocalStorage = <T>(key: string, data: T): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }
};

const getLocalStorage = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Failed to read from localStorage:', error);
        return defaultValue;
    }
};

// 轮回记录管理
export const saveReincarnation = async (result: ReincarnationResult): Promise<void> => {
    try {
        await dbManager.add(STORES.REINCARNATIONS, result);
        
        // 更新快速统计
        await updateQuickStats();
    } catch (error) {
        console.error('Failed to save reincarnation:', error);
    }
};

export const loadReincarnations = async (): Promise<ReincarnationResult[]> => {
    try {
        const results = await dbManager.getAll<ReincarnationResult>(STORES.REINCARNATIONS);
        return results.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
        console.error('Failed to load reincarnations:', error);
        return [];
    }
};

export const getReincarnationById = async (id: string): Promise<ReincarnationResult | undefined> => {
    try {
        return await dbManager.get<ReincarnationResult>(STORES.REINCARNATIONS, id);
    } catch (error) {
        console.error('Failed to get reincarnation:', error);
        return undefined;
    }
};

export const deleteReincarnation = async (id: string): Promise<void> => {
    try {
        await dbManager.delete(STORES.REINCARNATIONS, id);
        await updateQuickStats();
    } catch (error) {
        console.error('Failed to delete reincarnation:', error);
    }
};

// 统计数据管理
export const calculateStatistics = async (): Promise<UserStatistics> => {
    try {
        const reincarnations = await loadReincarnations();
        
        if (reincarnations.length === 0) {
            return {
                totalReincarnations: 0,
                favoriteCountry: '',
                averageLifespan: 0,
                totalSpecialEvents: 0,
                unlockedAchievements: [],
                rarityDistribution: {},
                genderDistribution: {},
                classDistribution: {}
            };
        }

        // 计算各种统计数据
        const countryCount: Record<string, number> = {};
        const rarityCount: Record<string, number> = {};
        const genderCount: Record<string, number> = {};
        const classCount: Record<string, number> = {};
        let totalLifespan = 0;

        reincarnations.forEach(result => {
            // 国家统计
            countryCount[result.country] = (countryCount[result.country] || 0) + 1;
            
            // 稀有度统计
            rarityCount[result.rarity] = (rarityCount[result.rarity] || 0) + 1;
            
            // 性别统计
            genderCount[result.gender] = (genderCount[result.gender] || 0) + 1;
            
            // 社会阶层统计
            classCount[result.socialClass] = (classCount[result.socialClass] || 0) + 1;
            
            // 寿命统计
            totalLifespan += result.lifespan;
        });

        const favoriteCountry = Object.entries(countryCount)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

        const unlockedAchievements = await getUnlockedAchievementIds();

        return {
            totalReincarnations: reincarnations.length,
            favoriteCountry,
            averageLifespan: totalLifespan / reincarnations.length,
            totalSpecialEvents: 0, // TODO: 从特殊事件记录计算
            unlockedAchievements,
            rarityDistribution: rarityCount,
            genderDistribution: genderCount,
            classDistribution: classCount
        };
    } catch (error) {
        console.error('Failed to calculate statistics:', error);
        throw error;
    }
};

const updateQuickStats = async (): Promise<void> => {
    try {
        const stats = await calculateStatistics();
        setLocalStorage(STORAGE_KEYS.QUICK_STATS, stats);
        setLocalStorage(STORAGE_KEYS.LAST_SYNC, Date.now());
    } catch (error) {
        console.error('Failed to update quick stats:', error);
    }
};

export const getQuickStats = (): UserStatistics => {
    return getLocalStorage(STORAGE_KEYS.QUICK_STATS, {
        totalReincarnations: 0,
        favoriteCountry: '',
        averageLifespan: 0,
        totalSpecialEvents: 0,
        unlockedAchievements: [],
        rarityDistribution: {},
        genderDistribution: {},
        classDistribution: {}
    });
};

// 成就系统
export const saveAchievement = async (achievement: Achievement): Promise<void> => {
    try {
        await dbManager.put(STORES.ACHIEVEMENTS, {
            ...achievement,
            unlockedAt: Date.now()
        });
    } catch (error) {
        console.error('Failed to save achievement:', error);
    }
};

export const getUnlockedAchievements = async (): Promise<Achievement[]> => {
    try {
        return await dbManager.getAll<Achievement>(STORES.ACHIEVEMENTS);
    } catch (error) {
        console.error('Failed to load achievements:', error);
        return [];
    }
};

export const getUnlockedAchievementIds = async (): Promise<string[]> => {
    try {
        const achievements = await getUnlockedAchievements();
        return achievements.map(a => a.id);
    } catch {
        return [];
    }
};

export const isAchievementUnlocked = async (achievementId: string): Promise<boolean> => {
    try {
        const achievement = await dbManager.get<Achievement>(STORES.ACHIEVEMENTS, achievementId);
        return !!achievement;
    } catch {
        return false;
    }
};

// 游戏配置管理
export const saveGameConfig = (config: GameConfig): void => {
    setLocalStorage(STORAGE_KEYS.GAME_CONFIG, config);
};

export const loadGameConfig = (): GameConfig => {
    return getLocalStorage(STORAGE_KEYS.GAME_CONFIG, {
        enableSound: true,
        enableMusic: true,
        language: 'en',
        theme: 'system',
        animationsEnabled: true
    });
};

// 数据导出/导入
export const exportGameData = async (): Promise<string> => {
    try {
        const reincarnations = await loadReincarnations();
        const achievements = await getUnlockedAchievements();
        const config = loadGameConfig();
        const stats = await calculateStatistics();

        const exportData = {
            version: 1,
            timestamp: Date.now(),
            data: {
                reincarnations,
                achievements,
                config,
                statistics: stats
            }
        };

        return JSON.stringify(exportData, null, 2);
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
};

export const importGameData = async (jsonData: string): Promise<void> => {
    try {
        const importData = JSON.parse(jsonData);
        
        if (!importData.version || !importData.data) {
            throw new Error('Invalid data format');
        }

        const { reincarnations, achievements, config } = importData.data;

        // 清除现有数据
        await dbManager.clear(STORES.REINCARNATIONS);
        await dbManager.clear(STORES.ACHIEVEMENTS);

        // 导入轮回记录
        if (reincarnations && Array.isArray(reincarnations)) {
            for (const result of reincarnations) {
                await dbManager.add(STORES.REINCARNATIONS, result);
            }
        }

        // 导入成就
        if (achievements && Array.isArray(achievements)) {
            for (const achievement of achievements) {
                await dbManager.add(STORES.ACHIEVEMENTS, achievement);
            }
        }

        // 导入配置
        if (config) {
            saveGameConfig(config);
        }

        // 更新统计
        await updateQuickStats();
    } catch (error) {
        console.error('Failed to import data:', error);
        throw error;
    }
};

// 数据清理
export const clearAllData = async (): Promise<void> => {
    try {
        await dbManager.clear(STORES.REINCARNATIONS);
        await dbManager.clear(STORES.ACHIEVEMENTS);
        await dbManager.clear(STORES.STATISTICS);
        
        localStorage.removeItem(STORAGE_KEYS.GAME_CONFIG);
        localStorage.removeItem(STORAGE_KEYS.QUICK_STATS);
        localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
    } catch (error) {
        console.error('Failed to clear data:', error);
        throw error;
    }
};

// 初始化存储系统
export const initializeStorage = async (): Promise<void> => {
    try {
        await dbManager.initDB();
        await updateQuickStats();
    } catch (error) {
        console.error('Failed to initialize storage:', error);
    }
};

// 兼容性：保持原有接口
export const saveResults = async (results: ReincarnationResult[]): Promise<void> => {
    try {
        await dbManager.clear(STORES.REINCARNATIONS);
        for (const result of results) {
            await dbManager.add(STORES.REINCARNATIONS, result);
        }
        await updateQuickStats();
    } catch (error) {
        console.error('Failed to save results:', error);
    }
};

export const loadResults = async (): Promise<ReincarnationResult[]> => {
    return await loadReincarnations();
};

// 业力档案管理
export const saveKarmaProfile = async (profile: KarmaProfile): Promise<void> => {
    try {
        await dbManager.put(STORES.KARMA_PROFILES, { ...profile, id: 'main' });
    } catch (error) {
        console.error('Failed to save karma profile:', error);
    }
};

export const loadKarmaProfile = async (): Promise<KarmaProfile | null> => {
    try {
        const profile = await dbManager.get<KarmaProfile & { id: string }>(STORES.KARMA_PROFILES, 'main');
        return profile || null;
    } catch (error) {
        console.error('Failed to load karma profile:', error);
        return null;
    }
};

export const saveKarmaRecord = async (record: KarmaRecord): Promise<void> => {
    try {
        await dbManager.add(STORES.KARMA_RECORDS, record);
    } catch (error) {
        console.error('Failed to save karma record:', error);
    }
};

export const loadKarmaRecords = async (lifeId?: string): Promise<KarmaRecord[]> => {
    try {
        const records = await dbManager.getAll<KarmaRecord>(STORES.KARMA_RECORDS);
        return lifeId ? records.filter(r => r.lifeId === lifeId) : records;
    } catch (error) {
        console.error('Failed to load karma records:', error);
        return [];
    }
};

export const getKarmaStatistics = async (): Promise<{
    totalPositiveKarma: number;
    totalNegativeKarma: number;
    mostCommonAction: string;
    karmaByCategory: Record<string, number>;
}> => {
    try {
        const records = await loadKarmaRecords();
        const totalPositiveKarma = records.filter(r => r.value > 0).reduce((sum, r) => sum + r.value, 0);
        const totalNegativeKarma = records.filter(r => r.value < 0).reduce((sum, r) => sum + r.value, 0);
        
        const actionCounts: Record<string, number> = {};
        const karmaByCategory: Record<string, number> = {};
        
        records.forEach(record => {
            actionCounts[record.actionType] = (actionCounts[record.actionType] || 0) + 1;
            karmaByCategory[record.category] = (karmaByCategory[record.category] || 0) + record.value;
        });
        
        const mostCommonAction = Object.keys(actionCounts).reduce((a, b) => 
            actionCounts[a] > actionCounts[b] ? a : b, Object.keys(actionCounts)[0] || 'none'
        );
        
        return {
            totalPositiveKarma,
            totalNegativeKarma,
            mostCommonAction,
            karmaByCategory
        };
    } catch (error) {
        console.error('Failed to get karma statistics:', error);
        return {
            totalPositiveKarma: 0,
            totalNegativeKarma: 0,
            mostCommonAction: 'none',
            karmaByCategory: {}
        };
    }
};
