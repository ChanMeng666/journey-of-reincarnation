"use client";

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// 预定义动画变体
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
};

export const fadeInScale: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
};

export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

export const slideInRight: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
};

export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const pulseGlow: Variants = {
    animate: {
        boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.5)",
            "0 0 40px rgba(59, 130, 246, 0.8)",
            "0 0 20px rgba(59, 130, 246, 0.5)"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const floatAnimation: Variants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const rotateLoop: Variants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

// 增强的动画容器组件
interface AnimatedContainerProps {
    children: React.ReactNode;
    variant?: 'fadeInUp' | 'fadeInScale' | 'slideInLeft' | 'slideInRight' | 'stagger';
    delay?: number;
    duration?: number;
    className?: string;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
    children,
    variant = 'fadeInUp',
    delay = 0,
    duration = 0.6,
    className = ""
}) => {
    const variants = {
        fadeInUp,
        fadeInScale,
        slideInLeft,
        slideInRight,
        stagger: staggerContainer
    };

    return (
        <motion.div
            variants={variants[variant]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 渐变文字组件
interface GradientTextProps {
    children: React.ReactNode;
    gradient?: string;
    className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
    children,
    gradient = "from-blue-400 via-purple-500 to-pink-500",
    className = ""
}) => {
    return (
        <motion.span
            className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
            style={{
                backgroundSize: "200% 200%"
            }}
        >
            {children}
        </motion.span>
    );
};

// 发光按钮组件
interface GlowButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = ""
}) => {
    const variantClasses = {
        primary: 'from-blue-500 to-purple-600 shadow-blue-500/25',
        secondary: 'from-gray-500 to-gray-600 shadow-gray-500/25',
        success: 'from-green-500 to-emerald-600 shadow-green-500/25',
        warning: 'from-yellow-500 to-orange-600 shadow-yellow-500/25',
        danger: 'from-red-500 to-pink-600 shadow-red-500/25'
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative bg-gradient-to-r ${variantClasses[variant]} 
                ${sizeClasses[size]} 
                text-white font-medium rounded-lg 
                transition-all duration-300 
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg active:scale-95'}
                ${className}
            `}
            whileHover={disabled ? {} : {
                scale: 1.05,
                boxShadow: `0 0 30px ${variant === 'primary' ? 'rgba(59, 130, 246, 0.6)' : 
                                     variant === 'success' ? 'rgba(34, 197, 94, 0.6)' :
                                     variant === 'warning' ? 'rgba(245, 158, 11, 0.6)' :
                                     variant === 'danger' ? 'rgba(239, 68, 68, 0.6)' :
                                     'rgba(107, 114, 128, 0.6)'}`
            }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.button>
    );
};

// 数字计数动画组件
interface CountUpProps {
    end: number;
    start?: number;
    duration?: number;
    delay?: number;
    className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
    end,
    start = 0,
    duration = 2,
    delay = 0,
    className = ""
}) => {
    const [current, setCurrent] = React.useState(start);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            const increment = (end - start) / (duration * 60); // 60fps
            const interval = setInterval(() => {
                setCurrent(prev => {
                    const next = prev + increment;
                    if ((increment > 0 && next >= end) || (increment < 0 && next <= end)) {
                        clearInterval(interval);
                        return end;
                    }
                    return next;
                });
            }, 1000 / 60);
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [end, start, duration, delay]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
        >
            {Math.round(current)}
        </motion.span>
    );
};

// 3D 卡片组件
interface Card3DProps {
    children: React.ReactNode;
    intensity?: number;
    className?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
    children,
    intensity = 10,
    className = ""
}) => {
    return (
        <motion.div
            className={`relative transform-gpu ${className}`}
            whileHover={{
                rotateY: intensity,
                rotateX: -intensity / 2,
                z: 50,
                transition: { duration: 0.3 }
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
            {children}
        </motion.div>
    );
};

// 波纹效果组件
interface RippleEffectProps {
    children: React.ReactNode;
    color?: string;
    className?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
    children,
    color = "rgba(255, 255, 255, 0.3)",
    className = ""
}) => {
    const [ripples, setRipples] = React.useState<Array<{
        x: number;
        y: number;
        id: number;
    }>>([]);

    const addRipple = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newRipple = {
            x,
            y,
            id: Date.now()
        };

        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
    };

    return (
        <motion.div
            className={`relative overflow-hidden ${className}`}
            onMouseDown={addRipple}
        >
            {children}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            backgroundColor: color
                        }}
                        initial={{
                            width: 0,
                            height: 0,
                            x: 0,
                            y: 0,
                            opacity: 1
                        }}
                        animate={{
                            width: 400,
                            height: 400,
                            x: -200,
                            y: -200,
                            opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

// 打字机效果组件
interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    showCursor?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 50,
    delay = 0,
    className = "",
    showCursor = true
}) => {
    const [displayedText, setDisplayedText] = React.useState("");
    const [showCur, setShowCur] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, index + 1));
                index++;
                if (index >= text.length) {
                    clearInterval(interval);
                    if (showCursor) {
                        const cursorInterval = setInterval(() => {
                            setShowCur(prev => !prev);
                        }, 500);
                        setTimeout(() => clearInterval(cursorInterval), 3000);
                    }
                }
            }, speed);
        }, delay);

        return () => clearTimeout(timer);
    }, [text, speed, delay, showCursor]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && showCur && <span className="animate-pulse">|</span>}
        </span>
    );
}; 