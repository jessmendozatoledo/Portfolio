import { resumeData } from "../data/resume";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-zinc-950 pt-20 px-4"
        >
            {/* Background glow orbs */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                {/* Left — text */}
                <div className="space-y-4 text-center md:text-left order-2 md:order-1">
                    <p className="text-primary font-medium tracking-wide text-sm md:text-base">
                        Hello, welcome
                    </p>
                    <h1 className="text-3xl md:text-5xl text-white font-light">
                        I'm <span className="text-primary font-[family-name:var(--font-oswald)] font-bold uppercase tracking-wide">
                            JESS M. TOLEDO
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-300 font-light">
                        {resumeData.role}
                    </p>
                    <p className="text-zinc-500 max-w-lg leading-relaxed text-justify mx-auto md:mx-0">
                        {resumeData.summary}
                    </p>

                    {/* CTAs — clear primary / secondary hierarchy */}

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                        {/* GitHub */}
                        <a
                            href={resumeData.contact.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-zinc-800/80 transition-all duration-300 hover:-translate-y-1"
                            aria-label="GitHub"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </a>
                        {/* LinkedIn */}
                        <a
                            href={resumeData.contact.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-primary hover:border-primary/50 hover:bg-zinc-800/80 transition-all duration-300 hover:-translate-y-1"
                            aria-label="LinkedIn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>

                    </div>
                </div>

                {/* Right — photo blob & animation */}
                <div className="relative flex justify-center items-center order-1 md:order-2">
                    {/* Orbital System — fully responsive */}
                    <div className="relative w-[min(85vw,360px)] h-[min(85vw,360px)] flex items-center justify-center">
                        {/* Background Gradient Blob */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] opacity-40 animate-pulse"
                            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                        />

                        {/* Orbits */}
                        <div className="absolute w-[88%] h-[88%] border border-primary/20 rounded-[45%] animate-spin-slow">
                            <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_12px_rgba(149,213,178,0.8)]" />
                        </div>

                        <div className="absolute w-[70%] h-[70%] border border-primary/20 rounded-[35%] animate-reverse-spin">
                            <div className="absolute bottom-4 left-1/4 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_12px_rgba(149,213,178,0.8)]" />
                        </div>

                        {/* Profile Picture Container */}
                        <div
                            className="relative w-[52%] h-[52%] bg-zinc-900 border-2 border-primary/30 flex items-center justify-center z-20 overflow-hidden shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-500 ease-out"
                            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                        >
                            <div className="absolute inset-0 bg-primary/10" />
                            <Image
                                src={resumeData.avatarUrl}
                                alt={`${resumeData.name} profile photo`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-zinc-400 text-xs tracking-widest uppercase">Scroll</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
            </div>
        </section>
    );
}

