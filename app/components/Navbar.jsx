"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import LampshadeToggle from "./LampshadeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#hero" },
        { name: "Education", href: "#education" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || menuOpen
                ? "bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-white">
                    JE<span className="text-primary">SS</span>!
                </Link>

                <div className="flex items-center gap-4 md:gap-8">
                    {/* Desktop nav links */}
                    <ul className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-zinc-400 hover:text-primary transition-colors uppercase text-sm tracking-wider font-medium"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <LampshadeToggle />

                    {/* Hamburger button — mobile only */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span
                            className={`block w-6 h-0.5 bg-zinc-400 group-hover:bg-primary transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-zinc-400 group-hover:bg-primary transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-zinc-400 group-hover:bg-primary transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <ul className="flex flex-col items-center gap-1 px-6 py-4 border-t border-white/5">
                    {navLinks.map((link) => (
                        <li key={link.name} className="w-full">
                            <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block w-full text-center py-3 text-zinc-400 hover:text-primary transition-colors uppercase text-sm tracking-wider font-medium hover:bg-zinc-900/50 rounded-lg"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
