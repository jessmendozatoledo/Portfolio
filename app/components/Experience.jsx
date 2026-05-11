"use client";
import Section from "./Section";
import { resumeData } from "../data/resume";
import Image from "next/image";
import { useState } from "react";
import CertificationModal from "./CertificationModal";

export default function Experience() {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <Section id="experience" className="bg-zinc-950 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-40 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-40 left-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
            {/* Extra glow for Certifications */}
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                {/* Experience Section */}
                <div>
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Experience</h2>
                        <div className="w-20 h-1 bg-primary rounded-full"></div>
                    </div>

                    <div className="grid gap-6">
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(149,213,178,0.1)]">
                                <div className="mb-4">
                                    <h3 className="inline text-lg md:text-xl font-bold text-white leading-tight mr-3">
                                        {exp.title}
                                    </h3>
                                    {exp.type && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] md:text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20 align-middle mr-3 translate-y-[-2px]">
                                            {exp.type}
                                        </span>
                                    )}
                                    <span className="inline-block text-zinc-500 text-sm font-medium whitespace-nowrap align-middle">
                                        {exp.year}
                                    </span>
                                    <p className="text-zinc-400 font-medium text-sm mt-1">{exp.category}</p>
                                    {exp.location && (
                                        <p className="flex items-center gap-1 text-zinc-500 text-xs mt-0.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                            </svg>
                                            {exp.location}
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                                            <span className="text-primary mt-1.5 flex-shrink-0">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                                                    <circle cx="3" cy="3" r="3" />
                                                </svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills & Certifications Section */}
                <div id="skills" className="scroll-mt-20"></div>
                <div id="certifications" className="scroll-mt-20">
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Skills & Certifications</h2>
                        <div className="w-20 h-1 bg-primary rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:gap-10 items-start">
                        {/* Left Side: Technical Skills */}
                        <div className="space-y-6">
                            <h3 className="text-base md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                                </span>
                                <span className="truncate">Technical Skills</span>
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {resumeData.skills.map((skillGroup, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-900/50 border border-zinc-800 p-3 md:p-4 rounded-xl hover:border-primary/30 transition-all duration-300 group"
                                    >
                                        <h4 className="text-[10px] md:text-sm font-semibold text-zinc-400 mb-2 md:mb-3 group-hover:text-primary transition-colors truncate">
                                            {skillGroup.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                                            {skillGroup.items.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-zinc-800/50 text-zinc-300 text-[9px] md:text-[11px] px-1.5 py-0.5 md:px-2 md:py-1 rounded-md border border-zinc-700/30"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Certifications (Scrollable) */}
                        <div className="space-y-6">
                            <h3 className="text-base md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                                </span>
                                <span className="truncate">Certifications</span>
                            </h3>
                            <div className="max-h-[640px] overflow-y-auto pr-2 md:pr-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent space-y-3 md:space-y-4">
                                {resumeData.certifications.map((cert, index) => {
                                    const isPdf = cert.image?.toLowerCase().endsWith('.pdf');
                                    const isImage = cert.image && !isPdf;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedCert(cert)}
                                            className="group relative flex items-center gap-2 md:gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-3 md:p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(149,213,178,0.1)] cursor-pointer overflow-hidden"
                                        >
                                            {/* Hover Preview Overlay */}
                                            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none bg-zinc-950/95 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center">
                                                <div className="relative w-full h-full rounded-lg overflow-hidden">
                                                    {isImage && (
                                                        <Image
                                                            src={cert.image}
                                                            alt={cert.title}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    )}
                                                    {isPdf && (
                                                        <iframe
                                                            src={`${cert.image}#toolbar=0&navpanes=0&scrollbar=0`}
                                                            className="w-full h-full border-none object-contain opacity-50"
                                                            title={cert.title}
                                                            tabIndex="-1"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0 bg-zinc-800 rounded-lg overflow-hidden group-hover:ring-2 ring-primary/20 transition-all p-1">
                                                {isImage ? (
                                                    <Image
                                                        src={cert.image}
                                                        alt={cert.title}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center w-full h-full text-zinc-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{cert.title}</h4>
                                                <p className="text-zinc-400 text-xs truncate">{cert.issuer}</p>
                                                <p className="text-zinc-600 text-[10px] font-mono">{cert.date}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CertificationModal
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
                cert={selectedCert}
            />
        </Section>
    );
}
