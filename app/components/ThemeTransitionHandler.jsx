"use client";
import { useEffect } from "react";

export default function ThemeTransitionHandler() {
    useEffect(() => {
        // Remove the no-transitions class after the initial render
        const timer = setTimeout(() => {
            document.documentElement.classList.remove("no-transitions");
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return null;
}
