import React, { useRef, useEffect } from 'react';

interface InteractiveBackgroundProps {
    theme: 'light' | 'dark';
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ theme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        
        const handleResize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (theme === 'dark') initStars();
            else initBlobs();
        };
        
        // --- Dark Mode: Starfield ---
        let stars: { x: number; y: number; z: number; size: number }[] = [];
        const initStars = () => {
            if (!canvas) return;
            stars = [];
            for (let i = 0; i < 400; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * canvas.width,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const animateStars = () => {
            if (!ctx || !canvas) return;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(85, 216, 187, 0.8)";

            stars.forEach(star => {
                const offsetX = (mouse.x - centerX) * (star.z / 5000);
                const offsetY = (mouse.y - centerY) * (star.z / 5000);
                
                let x = star.x + offsetX;
                let y = star.y + offsetY;
                
                const dx = mouse.x - x;
                const dy = mouse.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                let opacity = 1 - (distance / 200);
                if (opacity < 0.1) opacity = 0.1;
                
                ctx.globalAlpha = opacity;
                ctx.fillRect(x, y, star.size, star.size);
            });
            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(animateStars);
        };
        
        // --- Light Mode: Lava Lamp ---
        class Blob {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;
            color: string;
        
            constructor(width: number, height: number, color: string) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 50 + 80;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.color = color;
            }
        
            update(width: number, height: number) {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < this.radius || this.x > width - this.radius) this.vx *= -1;
                if (this.y < this.radius || this.y > height - this.radius) this.vy *= -1;
            }
        
            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        let blobs: Blob[] = [];
        const blobColors = ['rgba(85, 216, 187, 0.6)', 'rgba(127, 230, 203, 0.6)', 'rgba(40, 180, 150, 0.6)'];
        const initBlobs = () => {
            if (!canvas) return;
            blobs = [];
            const numBlobs = Math.floor(canvas.width / 500) + 1;
            for (let i = 0; i < numBlobs; i++) {
                blobs.push(new Blob(canvas.width, canvas.height, blobColors[i % blobColors.length]));
            }
        };

        const animateLavaLamp = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            blobs.forEach(blob => {
                blob.update(canvas.width, canvas.height);
                blob.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animateLavaLamp);
        };

        // --- Initializer ---
        if (theme === 'dark') {
            canvas.style.filter = 'none';
            initStars();
            animateStars();
        } else {
            canvas.style.filter = 'url(#goo)';
            initBlobs();
            animateLavaLamp();
        }

        window.addEventListener('resize', handleResize);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (canvas) {
                canvas.style.filter = 'none';
            }
        };
    }, [theme]);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed top-0 left-0 w-full h-full -z-10"
        ></canvas>
    );
};