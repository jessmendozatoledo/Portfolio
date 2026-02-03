import Section from "./Section";
import { resumeData } from "../data/resume";
import Image from "next/image";

export default function Experience() {
    return (
        <Section id="experience" className="bg-zinc-950 relative overflow-hidden">
            {/* Background glow */}
            {/* Background glow */}
            <div className="absolute top-40 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-40 left-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
            {/* Extra glow for Certifications */}
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

            <div className="max-w-3xl mx-auto space-y-20 relative z-10">
                {/* Experience Section */}
                <div>
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Experience</h2>
                        <div className="w-20 h-1 bg-primary rounded-full"></div>
                    </div>

                    <div className="grid gap-6">
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(149,213,178,0.1)]">
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
                                    <p className="text-zinc-400 font-medium text-sm mt-1">{exp.issuer || "Academic Project"}</p>
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

                {/* Certifications Section */}
                <div>
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Certifications</h2>
                        <div className="w-20 h-1 bg-primary rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {resumeData.certifications.map((cert, index) => (
                            <div key={index} className="group flex items-center gap-5 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(149,213,178,0.1)]">
                                <div className="relative w-20 h-20 flex-shrink-0 bg-zinc-800 rounded-lg overflow-hidden group-hover:ring-2 ring-primary/20 transition-all p-1">
                                    {cert.image ? (
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-zinc-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors leading-tight">{cert.title}</h3>
                                    <p className="text-zinc-400 text-sm mb-1">{cert.issuer}</p>
                                    <p className="text-zinc-600 text-xs font-mono">{cert.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
