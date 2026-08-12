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
            {/* Modal Container with explicit ID for high specificity CSS targeting */}
            <div
                id="video-modal-card"
                className="relative w-full max-w-5xl rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                style={{ backgroundColor: "#09090b" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div
                    className="flex items-center justify-between p-4 md:p-5 border-b border-zinc-800"
                    style={{ backgroundColor: "#09090b" }}
                >
                    <div className="flex items-center gap-3">
                        <span
                            className="p-2 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                        </span>
                        <div>
                            <div
                                id="video-modal-title"
                                className="text-lg md:text-xl font-bold tracking-wide"
                                style={{ color: "#ffffff" }}
                            >
                                Smart Feeder Video Demonstration
                            </div>
                            <div
                                id="video-modal-subtitle"
                                className="text-xs mt-0.5 font-medium"
                                style={{ color: "#e4e4e7" }}
                            >
                            </div>
                        </div>
                    </div>

                    <button
                        id="video-modal-close-btn"
                        onClick={onClose}
                        className="p-2.5 rounded-lg hover:bg-zinc-800 transition-all duration-200 group"
                        style={{ color: "#ffffff" }}
                        aria-label="Close video modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
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
                                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all"
                                style={activeVideo === idx ? { backgroundColor: "#10b981", color: "#09090b", fontWeight: "bold" } : { backgroundColor: "#27272a", color: "#a1a1aa" }}
                            >
                                🎬 {vid.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content Player Area */}
                <div
                    className="flex-1 relative flex items-center justify-center p-3"
                    style={{ backgroundColor: "#09090b" }}
                >
                    {currentVideo?.embedUrl ? (
                        <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
                            <iframe
                                src={currentVideo.embedUrl}
                                className="w-full h-full border-0 bg-zinc-950 rounded-xl"
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
