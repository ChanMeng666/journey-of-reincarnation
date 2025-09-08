import React from 'react';
import { cn } from "@/lib/utils";
import { DeveloperFooter } from "@/components/ui/developer-footer";

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
    return (
        <div className={cn(
            "min-h-screen bg-gradient-to-b from-slate-900 to-slate-800",
            "flex flex-col",
            className
        )}>
            <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8">
                <div className="container mx-auto">
                    {children}
                </div>
            </main>
            <DeveloperFooter />
        </div>
    );
}
