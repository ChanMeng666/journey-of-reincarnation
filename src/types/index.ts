export interface ReincarnationResult {
    country: string;
    gender: 'male' | 'female';
    socialClass: 'low' | 'middle' | 'high';
    birthplace: 'urban' | 'suburban' | 'rural';
    familyStructure: 'onlyChild' | 'siblings';
}

export type SpecialEventType = 'twinBirth' | 'prodigy' | 'historicalFigure';
