"use client";
import Section from "./Section";
import { resumeData } from "../data/resume";
import Image from "next/image";
import { useState } from "react";
import CertificationModal from "./CertificationModal";
import VideoModal from "./VideoModal";

export default function Experience() {
    const [selectedCert, setSelectedCert] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

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
                        {[...resumeData.experience].sort((a, b) => {
                            const getYear = (str) => {
                                const match = str.match(/\d{4}/g);
                                return match ? Math.max(...match.map(Number)) : 0;
                            };
                            return getYear(b.year) - getYear(a.year);
                        }).map((exp, index) => {
                            const allLinks = exp.links || (exp.link ? [{ label: "View Link", url: exp.link, type: "external" }] : []);

                            return (
                                <div
                                    key={index}
                                    className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(149,213,178,0.1)]"
                                >
                                    <div className="mb-4">
                                        <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                                            {exp.title}
                                        </h3>

                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            {exp.type && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] md:text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
                                                    {exp.type}
                                                </span>
                                            )}
                                            <span className="text-zinc-500 text-sm font-medium whitespace-nowrap">
                                                {exp.year}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 font-medium text-sm mt-1">{exp.category}</p>
                                        {exp.location && (
                                            <p className="flex items-center gap-1 text-zinc-500 text-xs mt-0.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
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

                                    {allLinks.length > 0 && (
                                        <div className="mt-6 flex flex-wrap items-center justify-end gap-2.5 md:absolute md:bottom-8 md:right-8 md:mt-0 z-10">
                                            {allLinks.map((lnk, lIdx) => {
                                                const isModal = lnk.type === "video_modal";
                                                const Element = isModal ? "button" : "a";
                                                const extraProps = isModal
                                                    ? { onClick: () => setSelectedVideo(lnk.videoData), type: "button" }
                                                    : { href: lnk.url, target: "_blank", rel: "noopener noreferrer" };

                                                return (
                                                    <Element
                                                        key={lIdx}
                                                        {...extraProps}
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl transition-all hover:scale-105 shadow-sm cursor-pointer"
                                                    >
                                                        {lnk.type === 'github' ? (
                                                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                                            </svg>
                                                        ) : lnk.type === 'video' || lnk.type === 'video_modal' ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="23 7 16 12 23 17 23 7" />
                                                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                <polyline points="15 3 21 3 21 9" />
                                                                <line x1="10" y1="14" x2="21" y2="3" />
                                                            </svg>
                                                        )}
                                                        {lnk.label}
                                                    </Element>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
                                {([...resumeData.certifications].sort((a, b) => {
                                    const parseDate = (dateStr) => {
                                        // Handle date ranges by taking the end date
                                        const parts = dateStr.split(/[-–—]/);
                                        const lastPart = parts[parts.length - 1].trim();
                                        // Remove trailing commas if any (e.g., "February 2,")
                                        const cleanDate = lastPart.replace(/,$/, '').trim();
                                        const date = new Date(cleanDate);
                                        return isNaN(date.getTime()) ? 0 : date.getTime();
                                    };
                                    return parseDate(b.date) - parseDate(a.date);
                                })).map((cert, index) => {
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
            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoData={selectedVideo}
            />
        </Section>
    );
}
