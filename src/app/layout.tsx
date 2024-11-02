import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MusicProvider } from "@/contexts/music-context";
import { MusicController } from "@/components/ui/music-controller";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { I18nProvider } from './i18n-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Journey of Reincarnation",
    description: "A journey through different lives",
    icons: {
        icon: [
            {
                url: "/images/JourneyofReincarnation_black.svg",
                type: "image/svg+xml",
            }
        ]
    }
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <MusicProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {/*{children}*/}
                {/*<LanguageSwitcher />*/}
                {/*<ThemeToggle />*/}
                {/*<MusicController />*/}
                <I18nProvider>
                    {children}
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <MusicController />
                </I18nProvider>
            </ThemeProvider>
        </MusicProvider>
        </body>
        </html>
    );
}
