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

                            {/* Card — static design */}
                            <div
                                className="relative w-full md:w-[calc(50%-2.5rem)] bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-primary/50 transition-colors shadow-lg overflow-hidden"
                            >
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
        </Section>
    );
}
