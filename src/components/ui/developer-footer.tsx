'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Github, 
    Star, 
    Heart,
    ArrowUpRight
} from 'lucide-react';

export function DeveloperFooter() {
    const { t } = useTranslation();

    const handleEmailClick = () => {
        window.open('mailto:chanmeng.dev@gmail.com', '_blank');
    };

    const handleGithubClick = () => {
        window.open('https://github.com/ChanMeng666', '_blank');
    };

    const handleProjectClick = () => {
        window.open('https://github.com/ChanMeng666/journey-of-reincarnation', '_blank');
    };

    return (
        <footer className="w-full bg-gradient-to-t from-slate-900 to-slate-900/50 border-t border-slate-700/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Project Logo */}
                <div className="flex justify-center mb-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Image
                            src="/images/JourneyofReincarnation_white.svg"
                            alt="Journey of Reincarnation Logo"
                            width={80}
                            height={80}
                            className="opacity-60 hover:opacity-80 transition-opacity"
                        />
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Developer Attribution */}
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                                    <Image
                                        src="/images/chan_logo.svg"
                                        alt="Chan Meng Logo"
                                        width={20}
                                        height={20}
                                        className="filter brightness-0 invert"
                                    />
                                </div>
                            </div>
                        </motion.div>
                        <div className="text-center sm:text-left">
                            <p className="text-slate-400 text-xs flex items-center gap-1">
                                <span>{t('developer.attribution')}</span>
                                <motion.span 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-purple-400 font-medium cursor-pointer hover:text-purple-300 transition-colors"
                                    onClick={handleGithubClick}
                                >
                                    Chan Meng
                                </motion.span>
                                <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                            </p>
                            <p className="text-slate-500 text-xs">
                                chanmeng.dev@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEmailClick}
                            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-purple-400 transition-colors border border-slate-700/50"
                            title={t('developer.email')}
                        >
                            <Mail className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGithubClick}
                            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 transition-colors border border-slate-700/50"
                            title={t('developer.github')}
                        >
                            <Github className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleProjectClick}
                            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-yellow-400 transition-colors border border-slate-700/50"
                            title={t('developer.project')}
                        >
                            <Star className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>

                {/* Contact CTA - Simplified and less intrusive */}
                <div className="hidden md:block mt-4 pt-4 border-t border-slate-700/30">
                    <div className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleEmailClick}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600/60 to-blue-600/60 hover:from-purple-600/80 hover:to-blue-600/80 text-white text-xs rounded-full transition-all duration-300 border border-purple-500/20"
                        >
                            <Mail className="w-3 h-3" />
                            <span>Custom development available</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default DeveloperFooter;
