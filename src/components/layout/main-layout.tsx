import React from 'react';
import { cn } from "@/lib/utils";

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
    return (
        <div className={cn(
            "min-h-screen bg-gradient-to-b from-slate-900 to-slate-800",
            "flex flex-col items-center justify-start",
            "p-4 md:p-8",
            className
        )}>
            <main className="container mx-auto">
                {children}
            </main>
        </div>
    );
}
