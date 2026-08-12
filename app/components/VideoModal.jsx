"use client";
import { useEffect, useState } from "react";

export default function VideoModal({ isOpen, onClose, videoData }) {
    const [activeVideo, setActiveVideo] = useState(0);

    const folderId = "1mb26BXmaoNjK7ieAh8JMaSzBOwg_A2SW";

    const videos = videoData?.videos || [
        {
            title: "Google Drive Video Demos",
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-zinc-800 bg-zinc-900">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
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
                        className="p-2 rounded-lg hover:bg-primary/10 text-zinc-400 hover:text-primary transition-all duration-200 group"
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
                    <div className="flex items-center gap-2 p-3 bg-zinc-950/60 border-b border-zinc-800/80 px-4 md:px-5">
                        {videos.map((vid, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveVideo(idx)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                    activeVideo === idx
                                        ? "bg-primary text-zinc-950 font-bold shadow-md shadow-primary/20"
                                        : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                }`}
                            >
                                🎬 {vid.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content Player Area */}
                <div className="flex-1 bg-black relative flex items-center justify-center min-h-[350px] md:min-h-[480px] p-2">
                    {currentVideo?.embedUrl ? (
                        <iframe
                            src={currentVideo.embedUrl}
                            className="w-full h-[60vh] rounded-lg border-0 bg-zinc-950"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={currentVideo.title || "Video Demonstration"}
                        />
                    ) : (
                        <video
                            key={currentVideo?.src}
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            autoPlay
                            className="max-h-[65vh] w-full rounded-lg object-contain select-none"
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
