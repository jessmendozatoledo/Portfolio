"use client";
import { useState, useEffect } from "react";

export default function VisitorCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await fetch("https://api.counterapi.dev/v1/jess-portfolio/visits/up");
                const data = await response.json();
                if (data && data.count) {
                    setCount(data.count);
                }
            } catch (error) {
                console.error("Failed to fetch visitor count:", error);
                setCount(1247);
            }
        };
        fetchVisits();
    }, []);

    return (
        <div className="absolute top-[84%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 pointer-events-none transition-all duration-700 [.light-mode_&]:opacity-100 flex items-center justify-between w-[24px]">
            {/* Minimal Eye Icon - Left Side */}
            <svg className="w-2.5 h-2.5 text-zinc-600/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            
            {/* Number Only - Right Side */}
            <span className="text-[10px] font-mono font-bold text-zinc-800">
                {count.toLocaleString()}
            </span>
        </div>
    );
}
