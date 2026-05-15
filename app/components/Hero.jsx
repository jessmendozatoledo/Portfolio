"use client";
import { resumeData } from "../data/resume";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
    const [isLight, setIsLight] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hoverEnabled, setHoverEnabled] = useState(false); // Only unlocks after first dark→light toggle

    const puttingRef = useRef(null);
    const removingRef = useRef(null);
    const prevLight = useRef(true);

    // Sync theme state with document class
    useEffect(() => {
        const checkTheme = () => {
            const light = document.documentElement.classList.contains("light-mode");
            setIsLight(light);
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    // Trigger videos on theme change
    useEffect(() => {
        if (prevLight.current !== isLight) {
            setIsTransitioning(true);
            if (isLight) {
                // Transitioning to Light: Play removing video
                if (removingRef.current) {
                    removingRef.current.currentTime = 0;
                    removingRef.current.play().catch(() => { });
                }
            } else {
                // Transitioning to Dark: Play putting video
                if (puttingRef.current) {
                    puttingRef.current.currentTime = 0;
                    puttingRef.current.play().catch(() => { });
                }
            }
            prevLight.current = isLight;
        }
    }, [isLight]);

    const handleVideoEnd = () => {
        setIsTransitioning(false);
        // Unlock the hover shock effect only after the dark→light transition animation finishes
        if (isLight) {
            setHoverEnabled(true);
        }
    };

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4 transition-all duration-700 ease-in-out bg-zinc-950 light-mode:bg-[#fdfdfd]"
        >
            {/* Background glow orbs */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] transition-all duration-700" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] transition-all duration-700" />

            <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                {/* Left — text */}
                <div className="space-y-4 text-center md:text-left order-2 md:order-1">
                    <p className="text-primary font-medium tracking-wide text-sm md:text-base transition-colors duration-500">
                        Hello, welcome
                    </p>
                    <h1 className="text-3xl md:text-5xl font-light transition-colors duration-700 text-white light-mode:text-zinc-900">
                        I'm <span className="text-primary font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wide">
                            JESS M. TOLEDO
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl font-light transition-colors duration-700 text-zinc-300 light-mode:text-zinc-600">
                        {resumeData.role}
                    </p>
                    <p className="max-w-lg leading-relaxed text-justify mx-auto md:mx-0 transition-colors duration-700 text-zinc-500 light-mode:text-zinc-500">
                        {resumeData.summary}
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                        {/* GitHub */}
                        <a
                            href={resumeData.contact.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl transition-all duration-500 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-zinc-800/80 hover:-translate-y-1 border light-mode:bg-zinc-100 light-mode:border-zinc-200 light-mode:text-zinc-500 light-mode:hover:bg-zinc-200/50"
                            aria-label="GitHub"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </a>
                        {/* LinkedIn */}
                        <a
                            href={resumeData.contact.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl transition-all duration-500 bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-zinc-800/80 hover:-translate-y-1 border light-mode:bg-zinc-100 light-mode:border-zinc-200 light-mode:text-zinc-500 light-mode:hover:bg-zinc-200/50"
                            aria-label="LinkedIn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                    </div>
                </div>

                {/* Right — photo blob & animation */}
                <div className="relative flex justify-center items-center order-1 md:order-2">
                    <div className="relative w-[min(85vw,360px)] h-[min(85vw,360px)] flex items-center justify-center">
                        {/* Background Gradient Blob */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] opacity-40 animate-pulse transition-all duration-700"
                            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                        />

                        {/* Orbits */}
                        <div className="absolute w-[88%] h-[88%] border border-primary/20 rounded-[45%] animate-spin-slow transition-colors duration-700">
                            <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_12px_rgba(149,213,178,0.8)]" />
                        </div>

                        <div className="absolute w-[70%] h-[70%] border border-primary/20 rounded-[35%] animate-reverse-spin transition-colors duration-700">
                            <div className="absolute bottom-4 left-1/4 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_12px_rgba(149,213,178,0.8)]" />
                        </div>

                        {/* Profile Picture Container */}
                        <div
                            className="group relative w-[52%] h-[52%] bg-zinc-900 border-2 border-primary/30 flex items-center justify-center z-20 overflow-hidden shadow-2xl shadow-primary/20 hover:scale-105 transition-all duration-500 ease-out light-mode:bg-zinc-200 select-none"
                            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            {/* Layer 1: Base Image (No Eyeglasses) */}
                            <Image
                                src={resumeData.avatarUrl}
                                alt={resumeData.name}
                                fill
                                className="object-cover pointer-events-none"
                                priority
                                draggable={false}
                            />

                            {/* Layer 2: Putting Eyeglasses Video (Dark State) */}
                            <video
                                ref={puttingRef}
                                src="/putting.mp4"
                                muted
                                playsInline
                                onEnded={handleVideoEnd}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${!isLight ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
                                onContextMenu={(e) => e.preventDefault()}
                                controlsList="nodownload"
                            />

                            {/* Layer 3: Removing Eyeglasses Video (Transition only) */}
                            <video
                                ref={removingRef}
                                src="/removing.mp4"
                                muted
                                playsInline
                                onEnded={handleVideoEnd}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${(isLight && isTransitioning) ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
                                onContextMenu={(e) => e.preventDefault()}
                                controlsList="nodownload"
                            />

                            {/* Layer 4: Shock Image (Hover - only after first dark→light toggle, stays in light mode) */}
                            {hoverEnabled && isLight && !isTransitioning && (
                                <Image
                                    src="/shock.png"
                                    alt="Surprised"
                                    fill
                                    className="object-cover opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 z-30 pointer-events-none"
                                    draggable={false}
                                />
                            )}

                            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce transition-colors duration-700">
                <span className="text-zinc-400 light-mode:text-zinc-500 text-xs tracking-widest uppercase">Scroll</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
            </div>
        </section>
    );
}

