"use client";
import { useState, useEffect } from "react";

export default function LampshadeToggle() {
    const [isLight, setIsLight] = useState(false);
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY);
    };

    useEffect(() => {
        const handleMove = (e) => {
            if (!isDragging) return;
            // Handle both touch and mouse events
            const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
            const diff = Math.max(0, Math.min(30, clientY - startY));
            setDragY(diff);
        };

        const handleUp = () => {
            if (!isDragging) return;
            if (dragY > 15) {
                setIsLight(!isLight);
            }
            setIsDragging(false);
            setDragY(0);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMove);
            window.addEventListener("mouseup", handleUp);
            window.addEventListener("touchmove", handleMove, { passive: false });
            window.addEventListener("touchend", handleUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        };
    }, [isDragging, startY, dragY, isLight]);

    useEffect(() => {
        if (isLight) {
            document.documentElement.classList.add("light-mode");
        } else {
            document.documentElement.classList.remove("light-mode");
        }
    }, [isLight]);

    return (
        <div 
            className="relative group transition-transform" 
            title={isLight ? "Pull to toggle light" : "Pull to toggle dark"}
        >
            <div className="relative w-14 h-16 flex items-center justify-center">
                {/* SVG Lampshade */}
                <svg
                    width="50"
                    height="70"
                    viewBox="0 0 100 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="overflow-visible"
                >
                    {/* ... (light beam, base, stem, shade, face remain the same) */}
                    {isLight && (
                        <path
                            d="M20 65L-10 135H110L80 65H20Z"
                            fill="url(#lightGradient)"
                            className="animate-pulse"
                        />
                    )}

                    <ellipse cx="50" cy="120" rx="25" ry="8" fill={isLight ? "#e4e4e7" : "#3f3f46"} />
                    <ellipse cx="50" cy="116" rx="25" ry="8" fill={isLight ? "#f4f4f5" : "#52525b"} stroke={isLight ? "#d4d4d8" : "#27272a"} strokeWidth="1" />
                    <rect x="47" y="60" width="6" height="58" fill={isLight ? "#f4f4f5" : "#52525b"} />
                    <rect x="47" y="60" width="2" height="58" fill={isLight ? "#ffffff" : "#71717a"} opacity="0.5" />
                    
                    <path
                        d="M20 65C20 65 30 72 50 72C70 72 80 65 80 65"
                        stroke={isLight ? "#fde047" : "#27272a"}
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    <path
                        d="M30 15C30 15 35 10 50 10C65 10 70 15 70 15L80 65C80 65 70 70 50 70C30 70 20 65 20 65L30 15Z"
                        fill={isLight ? "#a3b18a" : "#4b5563"}
                        stroke={isLight ? "#588157" : "#374151"}
                        strokeWidth="2"
                        className="transition-colors duration-300"
                    />
                    
                    {isLight ? (
                        <>
                            <path d="M35 35C35 35 38 30 42 35" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                            <path d="M58 35C58 35 62 30 65 35" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                            <path d="M44 42H56C56 42 56 52 50 52C44 52 44 42 44 42Z" fill="#18181b" />
                            <path d="M51 49C51 49 51.5 53 53.5 53C55.5 53 56 49 56 49H51Z" fill="#fb7185" />
                        </>
                    ) : (
                        <>
                            <path d="M35 38C35 38 38 42 42 38" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
                            <path d="M58 38C58 38 62 42 65 38" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
                            <path d="M45 48H55" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}

                    {/* Pull Rope - True Drag-to-Pull Interaction */}
                    <g 
                        className={`transition-transform duration-75 ease-out select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                        style={{ transform: `translateY(${dragY}px)` }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={(e) => {
                            setIsDragging(true);
                            setStartY(e.touches[0].clientY);
                        }}
                    >
                        {/* Invisible larger hit area for easier clicking/grabbing */}
                        <rect x="30" y="65" width="25" height="55" fill="transparent" />
                        
                        <line x1="42" y1="68" x2="42" y2="95" stroke={isLight ? "#f4f4f5" : "#a1a1aa"} strokeWidth="2" />
                        <rect x="40" y="95" width="4" height="10" rx="1" fill={isLight ? "#f4f4f5" : "#71717a"} className="group-hover:fill-primary transition-colors" />
                    </g>

                    <defs>
                        <linearGradient id="lightGradient" x1="50" y1="65" x2="50" y2="135" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fef08a" stopOpacity="0.5" />
                            <stop offset="1" stopColor="#fef08a" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
