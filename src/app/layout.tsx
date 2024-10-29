// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
//
// const inter = Inter({ subsets: ["latin"] });
//
// export const metadata: Metadata = {
//     title: "Journey of Reincarnation",
//     description: "A journey through different lives",
// };
//
// export default function RootLayout({
//                                        children,
//                                    }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//         <body className={inter.className}>
//         <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//         >
//             {children}
//         </ThemeProvider>
//         </body>
//         </html>
//     );
// }



// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeToggle } from "@/components/ui/theme-toggle";
//
// const inter = Inter({ subsets: ["latin"] });
//
// export const metadata: Metadata = {
//     title: "Journey of Reincarnation",
//     description: "A journey through different lives",
// };
//
// export default function RootLayout({
//                                        children,
//                                    }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//         <body className={inter.className}>
//         <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//         >
//             {children}
//             <ThemeToggle />
//         </ThemeProvider>
//         </body>
//         </html>
//     );
// }





// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeToggle } from "@/components/ui/theme-toggle";
// import { MusicProvider } from "@/contexts/music-context";
// import { MusicController } from "@/components/ui/music-controller";
//
// const inter = Inter({ subsets: ["latin"] });
//
// export const metadata: Metadata = {
//     title: "Journey of Reincarnation",
//     description: "A journey through different lives",
// };
//
// export default function RootLayout({
//                                        children,
//                                    }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//         <body className={inter.className}>
//         <MusicProvider>
//             <ThemeProvider
//                 attribute="class"
//                 defaultTheme="dark"
//                 enableSystem
//                 disableTransitionOnChange
//             >
//                 {children}
//                 <ThemeToggle />
//                 <MusicController />
//             </ThemeProvider>
//         </MusicProvider>
//         </body>
//         </html>
//     );
// }




import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MusicProvider } from "@/contexts/music-context";
import { MusicController } from "@/components/ui/music-controller";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Journey of Reincarnation",
    description: "A journey through different lives",
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
                {children}
                <LanguageSwitcher />
                <ThemeToggle />
                <MusicController />
            </ThemeProvider>
        </MusicProvider>
        </body>
        </html>
    );
}
