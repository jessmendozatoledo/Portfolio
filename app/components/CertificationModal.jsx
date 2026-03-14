"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function CertificationModal({ isOpen, onClose, cert }) {
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

    if (!isOpen || !cert) return null;

    const isPdf = cert.image?.toLowerCase().endsWith(".pdf");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl h-[85vh] bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900 z-10">
                    <div>
                        <h3 className="text-xl font-bold text-white leading-tight">{cert.title}</h3>
                        <p className="text-zinc-400 text-sm">{cert.issuer} • {cert.date}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 relative bg-zinc-950/50 w-full h-full overflow-hidden">
                    {isPdf ? (
                        <iframe
                            src={cert.image}
                            className="w-full h-full border-none"
                            title={cert.title}
                        />
                    ) : (
                        <div className="relative w-full h-full p-4">
                            <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
