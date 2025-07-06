"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
    color: string;
}

interface ModernParticleBackgroundProps {
    className?: string;
    particleCount?: number;
    theme?: 'light' | 'dark' | 'cosmic';
    interactive?: boolean;
}

export const ModernParticleBackground: React.FC<ModernParticleBackgroundProps> = ({
    className = "",
    particleCount = 50,
    theme = 'cosmic',
    interactive = true
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    const getThemeColors = (theme: string) => {
        const themes = {
            light: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6'],
            dark: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
            cosmic: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
        };
        return themes[theme as keyof typeof themes] || themes.cosmic;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 设置画布大小
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 初始化粒子
        const initParticles = () => {
            const colors = getThemeColors(theme);
            particlesRef.current = [];

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.6 + 0.1,
                    life: Math.random() * 200 + 100,
                    maxLife: Math.random() * 200 + 100,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        initParticles();

        // 鼠标交互
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        if (interactive) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        // 动画循环
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, index) => {
                // 更新粒子位置
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // 鼠标吸引力
                if (interactive) {
                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        particle.vx += dx * force * 0.001;
                        particle.vy += dy * force * 0.001;
                    }
                }

                // 边界反弹
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.vx *= -0.8;
                    particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.vy *= -0.8;
                    particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                }

                // 生命周期
                particle.life--;
                if (particle.life <= 0) {
                    const colors = getThemeColors(theme);
                    Object.assign(particle, {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: Math.random() * 3 + 1,
                        opacity: Math.random() * 0.6 + 0.1,
                        life: particle.maxLife,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    });
                }

                // 绘制粒子
                const alpha = (particle.life / particle.maxLife) * particle.opacity;
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                
                // 添加发光效果
                ctx.shadowBlur = 20;
                ctx.shadowColor = particle.color;
                ctx.fill();
                ctx.restore();

                // 连接线
                if (interactive) {
                    particlesRef.current.forEach((otherParticle, otherIndex) => {
                        if (index !== otherIndex) {
                            const dx = particle.x - otherParticle.x;
                            const dy = particle.y - otherParticle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < 100) {
                                ctx.save();
                                ctx.globalAlpha = (100 - distance) / 100 * 0.3;
                                ctx.strokeStyle = particle.color;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(otherParticle.x, otherParticle.y);
                                ctx.stroke();
                                ctx.restore();
                            }
                        }
                    });
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (interactive) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [particleCount, theme, interactive]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 ${className}`}
            style={{ background: 'transparent' }}
        />
    );
}; 