"use client";
import Section from "./Section";
import { resumeData } from "../data/resume";
import Image from "next/image";
import { useState } from "react";

function SchoolModal({ isOpen, onClose, edu }) {
    if (!isOpen || !edu) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900 z-10">
                    <div>
                        <h3 className="text-xl font-bold text-white leading-tight">{edu.school}</h3>
                        <p className="text-zinc-400 text-sm mt-0.5">{edu.degree}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {/* Logo */}
                <div className="relative w-full h-56 bg-zinc-950/60 flex items-center justify-center p-8">
                    {edu.logo && (
                        <div className="relative w-full h-full">
                            <Image
                                src={edu.logo}
                                alt={edu.school}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="p-5 space-y-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="font-mono text-primary">{edu.year}</span>
                    </div>
                    {edu.honors && (
                        <div className="mt-2 inline-block bg-primary/20 text-primary text-xs px-3 py-1 rounded-full font-medium">
                            {edu.honors}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Education() {
    const [selectedEdu, setSelectedEdu] = useState(null);

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

            <div className="space-y-8 max-w-3xl mx-auto">
                {resumeData.education.map((edu, index) => (
                    <div
                        key={index}
                        className="group relative pl-8 md:pl-0 border-l-2 border-zinc-700 md:border-none"
                    >
                        {/* Timeline for Desktop */}
                        <div className="hidden md:block absolute left-1/2 -ml-[1px] w-0.5 h-full bg-zinc-700"></div>

                        <div
                            className={`md:flex items-center justify-between gap-10 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>

                            <div
                                className="absolute left-[-9px] md:left-1/2 md:-ml-3 w-4 h-4 rounded-full bg-zinc-900 border-4 border-primary z-10"
                            ></div>

                            {/* Card — original design + hover overlay + click modal */}
                            <div
                                onClick={() => setSelectedEdu(edu)}
                                className="group/card relative w-full md:w-[calc(50%-2.5rem)] bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-primary/50 transition-colors shadow-lg cursor-pointer overflow-hidden"
                            >
                                {/* Hover Preview Overlay — school logo */}
                                {edu.logo && (
                                    <div className="absolute inset-0 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none bg-white rounded-xl flex items-center justify-center p-6">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={edu.logo}
                                                alt={edu.school}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
                                            <p className="text-white text-xs font-semibold text-center truncate">{edu.school}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Original card content — unchanged */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
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
                    </div>
                ))}
            </div>

            <SchoolModal
                isOpen={!!selectedEdu}
                onClose={() => setSelectedEdu(null)}
                edu={selectedEdu}
            />
        </Section>
    );
}
