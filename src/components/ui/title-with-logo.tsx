import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export function TitleWithLogo() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-4">
                <Image
                    src="/images/JourneyofReincarnation_white.svg"
                    alt="Journey of Reincarnation Logo"
                    width={100}
                    height={100}
                />
                <h1 className="text-4xl font-bold">
                    {t('title')}
                </h1>
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <span>Code & Crafted with</span>
                <span className="text-yellow-500 animate-pulse">💛</span>
                <span>by</span>
                <a
                    href="https://github.com/ChanMeng666/journey-of-reincarnation2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 hover:underline transition-colors"
                >
                    Chan Meng
                </a>
            </div>
        </div>
    );
}

export default TitleWithLogo;
