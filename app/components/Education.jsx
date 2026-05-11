"use client";
import Section from "./Section";
import { resumeData } from "../data/resume";

export default function Education() {
    return (
        <Section id="education" className="bg-zinc-950 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

            <div className="flex flex-col items-center mb-8 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Education
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full"></div>
            </div>

            {/* Mobile: simple stacked cards; Desktop: alternating timeline */}
            <div className="relative max-w-7xl mx-auto">
                {/* Desktop center timeline line */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-zinc-700/60" />

                <div className="space-y-6 md:space-y-0">
                    {resumeData.education.map((edu, index) => (
                        <div
                            key={index}
                            className={`relative md:flex md:items-center md:justify-between md:gap-10 md:mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Spacer for opposite side on desktop */}
                            <div className="hidden md:block w-[calc(50%-2rem)]" />

                            {/* Desktop timeline dot */}
                            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-900 border-4 border-primary z-10 flex-shrink-0" />

                            {/* Card */}
                            <div className="relative w-full md:w-[calc(50%-2rem)] bg-zinc-900 p-5 md:p-6 rounded-xl border border-zinc-800 hover:border-primary/50 transition-colors shadow-lg overflow-hidden">
                                {/* Mobile accent line */}
                                <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-primary/50 rounded-l-xl" />
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                                        </svg>
                                    </div>
                                    <span className="text-xs md:text-sm font-mono text-primary">{edu.year}</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white">{edu.school}</h3>
                                <p className="text-zinc-300 text-sm font-medium mb-1">{edu.degree}</p>
                                <p className="text-zinc-500 text-sm">{edu.location}</p>
                                {edu.honors && (
                                    <div className="mt-3 inline-block bg-primary/20 text-primary text-xs px-3 py-1 rounded-full font-medium">
                                        {edu.honors}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
