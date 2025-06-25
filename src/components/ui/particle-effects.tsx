"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
    life: number;
    maxLife: number;
}

interface ParticleEffectsProps {
    isActive: boolean;
    type: 'reincarnation' | 'achievement' | 'special' | 'floating';
    intensity?: number;
    color?: string;
}

export const ParticleEffects: React.FC<ParticleEffectsProps> = ({
    isActive,
    type,
    intensity = 1,
    color = '#ffd700'
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);

    const createParticle = (x?: number, y?: number): Particle => {
        const canvas = canvasRef.current;
        if (!canvas) return {} as Particle;

        return {
            id: Math.random(),
            x: x ?? Math.random() * canvas.width,
            y: y ?? Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 4 + 1,
            color: color,
            opacity: 1,
            life: 0,
            maxLife: Math.random() * 100 + 50
        };
    };

    const updateParticles = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 根据类型添加新粒子
        if (isActive && type === 'reincarnation' && Math.random() < 0.1 * intensity) {
            particlesRef.current.push(createParticle());
        } else if (isActive && type === 'floating' && Math.random() < 0.05 * intensity) {
            particlesRef.current.push(createParticle());
        }

        // 更新和绘制粒子
        particlesRef.current = particlesRef.current.filter(particle => {
            particle.life++;
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 根据类型调整行为
            switch (type) {
                case 'reincarnation':
                    particle.vy -= 0.02; // 向上漂浮
                    particle.opacity = 1 - (particle.life / particle.maxLife);
                    break;
                case 'achievement':
                    particle.vy -= 0.05;
                    particle.size += 0.02;
                    particle.opacity = Math.sin(particle.life * 0.1);
                    break;
                case 'special':
                    particle.vx += Math.sin(particle.life * 0.1) * 0.1;
                    particle.vy -= 0.03;
                    particle.opacity = 1 - (particle.life / particle.maxLife);
                    break;
                case 'floating':
                    particle.vx += Math.sin(particle.life * 0.05) * 0.05;
                    particle.vy += Math.cos(particle.life * 0.05) * 0.05;
                    particle.opacity = 0.6 * (1 - particle.life / particle.maxLife);
                    break;
            }

            // 绘制粒子
            ctx.save();
            ctx.globalAlpha = Math.max(0, particle.opacity);
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            
            if (type === 'achievement') {
                // 星形粒子
                const spikes = 5;
                const outerRadius = particle.size;
                const innerRadius = particle.size * 0.5;
                let rot = Math.PI / 2 * 3;
                const step = Math.PI / spikes;

                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y - outerRadius);
                for (let i = 0; i < spikes; i++) {
                    ctx.lineTo(particle.x + Math.cos(rot) * outerRadius, particle.y + Math.sin(rot) * outerRadius);
                    rot += step;
                    ctx.lineTo(particle.x + Math.cos(rot) * innerRadius, particle.y + Math.sin(rot) * innerRadius);
                    rot += step;
                }
                ctx.lineTo(particle.x, particle.y - outerRadius);
                ctx.closePath();
                ctx.fill();
            } else {
                // 圆形粒子
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();

            // 移除生命周期结束的粒子
            return particle.life < particle.maxLife && 
                   particle.x > -10 && particle.x < canvas.width + 10 &&
                   particle.y > -10 && particle.y < canvas.height + 10;
        });
    };

    const animate = () => {
        updateParticles();
        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        if (isActive) {
            // 根据类型创建初始粒子
            if (type === 'achievement') {
                // 成就爆炸效果
                for (let i = 0; i < 30 * intensity; i++) {
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const angle = (i / 30) * Math.PI * 2;
                    const distance = Math.random() * 100;
                    particlesRef.current.push({
                        ...createParticle(),
                        x: centerX + Math.cos(angle) * distance,
                        y: centerY + Math.sin(angle) * distance,
                        vx: Math.cos(angle) * 3,
                        vy: Math.sin(angle) * 3,
                        color: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 4)]
                    });
                }
            } else if (type === 'special') {
                // 特殊事件魔法效果
                for (let i = 0; i < 50 * intensity; i++) {
                    particlesRef.current.push({
                        ...createParticle(),
                        color: ['#9c27b0', '#e91e63', '#3f51b5', '#00bcd4'][Math.floor(Math.random() * 4)]
                    });
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isActive, type, intensity]);

    useEffect(() => {
        if (!isActive) {
            particlesRef.current = [];
        }
    }, [isActive]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-30"
            style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
        />
    );
};

// 浮动装饰元素组件
export const FloatingDecorations: React.FC = () => {
    const decorations = [
        { emoji: '✨', delay: 0 },
        { emoji: '🌟', delay: 1 },
        { emoji: '💫', delay: 2 },
        { emoji: '⭐', delay: 3 },
        { emoji: '🔮', delay: 4 },
        { emoji: '🌙', delay: 5 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
            {decorations.map((decoration, index) => (
                <motion.div
                    key={index}
                    className="absolute text-2xl opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: decoration.delay,
                        ease: "easeInOut"
                    }}
                >
                    {decoration.emoji}
                </motion.div>
            ))}
        </div>
    );
};

// 光芒效果组件
export const GlowEffect: React.FC<{ isActive: boolean; color?: string }> = ({ 
    isActive, 
    color = '#ffd700' 
}) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="fixed inset-0 pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
                            animation: 'pulse 2s ease-in-out infinite'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// 涟漪效果组件
export const RippleEffect: React.FC<{ 
    x: number; 
    y: number; 
    isActive: boolean; 
    color?: string 
}> = ({ x, y, isActive, color = '#4ade80' }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="fixed pointer-events-none z-40"
                    style={{
                        left: x - 50,
                        top: y - 50,
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    exit={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div 
                        className="w-24 h-24 rounded-full border-2"
                        style={{
                            borderColor: color,
                            boxShadow: `0 0 20px ${color}50`
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}; 