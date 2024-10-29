import type { ReincarnationResult } from "@/types";

const STORAGE_KEY = 'reincarnation-results';

export const saveResults = (results: ReincarnationResult[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    }
};

export const loadResults = (): ReincarnationResult[] => {
    if (typeof window === 'undefined') return [];

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch {
        return [];
    }
};
