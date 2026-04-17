"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import LampshadeToggle from "./LampshadeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

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
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-white">
                    JE<span className="text-primary">SS</span>!
                </Link>

                <div className="flex items-center gap-8">
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
                </div>
            </div>
        </nav>
    );
}
