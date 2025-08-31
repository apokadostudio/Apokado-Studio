
import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) return;

        const moveCursor = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            outline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 100, fill: "forwards" });
        };

        const handleInteraction = (e: MouseEvent, add: boolean) => {
            const target = e.target as HTMLElement;
            if (target.closest('.cursor-pointer-large')) {
                 outline.classList.toggle('hovered', add);
            }
        };
        
        const handleMouseEnter = (e: MouseEvent) => handleInteraction(e, true);
        const handleMouseLeave = (e: MouseEvent) => handleInteraction(e, false);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);


        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div id="cursor-dot" ref={dotRef}></div>
            <div id="cursor-outline" ref={outlineRef}></div>
        </>
    );
};