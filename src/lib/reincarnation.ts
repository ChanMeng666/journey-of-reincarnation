import type { ReincarnationResult } from "@/types";

const countries = [
    'China', 'India', 'United States', 'Indonesia', 'Pakistan',
    'Brazil', 'Nigeria', 'Bangladesh', 'Russia', 'Mexico'
];

const getRandomItem = <T>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
};

export const generateReincarnation = (): ReincarnationResult => {
    return {
        country: getRandomItem(countries),
        gender: Math.random() < 0.504 ? 'male' : 'female',
        socialClass: getRandomItem(['low', 'middle', 'high']),
        birthplace: getRandomItem(['urban', 'suburban', 'rural']),
        familyStructure: Math.random() < 0.3 ? 'onlyChild' : 'siblings'
    };
};
