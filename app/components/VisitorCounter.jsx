"use client";
import { useState, useEffect } from "react";

export default function VisitorCounter() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await fetch("/api/visitor");
                const data = await response.json();
                if (data && (data.count !== undefined || data.value !== undefined)) {
                    setCount(data.count ?? data.value);
                } else {
                    setCount(1248);
                }
            } catch (error) {
                console.error("Failed to fetch visitor count:", error);
                setCount(1248);
            }
        };
        fetchVisits();
    }, []);

    return (
        <div className="absolute top-[82%] left-1/2 -translate-x-1/2 z-10 transition-all duration-300 flex items-center justify-center gap-1 px-1.5 py-0.5 rounded bg-zinc-900/90 border border-zinc-700/60 shadow-md light-mode:bg-white/90 light-mode:border-zinc-300">
            {/* Eye Icon */}
            <svg className="w-2.5 h-2.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            
            {/* Visitor Number */}
            <span className="text-[10px] font-mono font-bold text-zinc-100 light-mode:text-zinc-900 whitespace-nowrap">
                {count !== null ? count.toLocaleString() : "..."}
            </span>
        </div>
    );
}
