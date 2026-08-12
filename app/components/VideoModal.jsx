"use client";
import { useEffect, useState } from "react";

export default function VideoModal({ isOpen, onClose, videoData }) {
    const [activeVideo, setActiveVideo] = useState(0);

    const folderId = "1mb26BXmaoNjK7ieAh8JMaSzBOwg_A2SW";

    const videos = videoData?.videos || [
        {
            title: "Video Demonstration",
            embedUrl: `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`,
        },
    ];

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const currentVideo = videos[activeVideo];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Forced Dark Modal Container */}
            <div
                className="relative w-full max-w-5xl rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
                style={{ backgroundColor: "#09090b", color: "#ffffff" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header — Forced Dark Background */}
                <div 
                    className="flex items-center justify-between p-4 md:p-5 border-b border-zinc-800"
                    style={{ backgroundColor: "#09090b", color: "#ffffff" }}
                >
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="23 7 16 12 23 17 23 7" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                </svg>
                            </span>
                            Smart Feeder Video Demonstration
                        </h3>
                        <p className="text-zinc-400 text-xs mt-0.5">Watch real-time system operation and hardware dispensing</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-200 group"
                        aria-label="Close video modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Video Selector Tabs if multiple */}
                {videos.length > 1 && (
                    <div 
                        className="flex items-center gap-2 p-3 border-b border-zinc-800 px-4 md:px-5"
                        style={{ backgroundColor: "#18181b" }}
                    >
                        {videos.map((vid, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveVideo(idx)}
                                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                    activeVideo === idx
                                        ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                }`}
                            >
                                🎬 {vid.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content Player Area with Dark Filter on Google Drive iframe */}
                <div 
                    className="flex-1 relative flex items-center justify-center p-3"
                    style={{ backgroundColor: "#09090b" }}
                >
                    {currentVideo?.embedUrl ? (
                        <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-inner">
                            <iframe
                                src={currentVideo.embedUrl}
                                className="w-full h-full border-0 bg-zinc-950"
                                style={{ filter: "invert(0.9) hue-rotate(180deg)", borderRadius: "0.75rem" }}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title={currentVideo.title || "Video Demonstration"}
                            />
                        </div>
                    ) : (
                        <video
                            key={currentVideo?.src}
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            autoPlay
                            className="max-h-[65vh] w-full rounded-xl object-contain select-none bg-black"
                        >
                            <source src={currentVideo?.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
}
