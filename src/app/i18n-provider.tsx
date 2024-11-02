'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface I18nProviderProps {
    children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
    const { i18n } = useTranslation();

    useEffect(() => {
        // 确保应用启动时使用英语
        if (i18n.language !== 'en') {
            i18n.changeLanguage('en');
        }
    }, [i18n]);

    return <>{children}</>;
}
