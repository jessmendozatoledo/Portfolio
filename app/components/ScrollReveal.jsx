"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 700,
    threshold = 0.12,
    rootMargin = "0px 0px -40px 0px",
    once = true,
    className = "",
    style = {},
    as: Component = "div",
    ...rest
}) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const node = elementRef.current;
        if (!node) return;

        // Respect reduced motion settings
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        // Fallback for environments without IntersectionObserver
        if (!("IntersectionObserver" in window)) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(node);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(node);

        return () => {
            if (node) observer.unobserve(node);
        };
    }, [threshold, rootMargin, once]);

    // Initial transform definitions per animation type
    const getInitialTransform = () => {
        switch (animation) {
            case "fade-up":
                return "translate3d(0, 36px, 0)";
            case "fade-down":
                return "translate3d(0, -36px, 0)";
            case "fade-left":
                return "translate3d(36px, 0, 0)";
            case "fade-right":
                return "translate3d(-36px, 0, 0)";
            case "zoom-in":
                return "translate3d(0, 20px, 0) scale(0.95)";
            case "fade":
            default:
                return "translate3d(0, 0, 0)";
        }
    };

    const transitionStyle = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : getInitialTransform(),
        filter: isVisible ? "blur(0px)" : "blur(4px)",
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform, filter",
        ...style,
    };

    return (
        <Component
            ref={elementRef}
            className={`scroll-reveal-container ${isVisible ? "is-visible" : "is-hidden"} ${className}`}
            style={transitionStyle}
            {...rest}
        >
            {children}
        </Component>
    );
}
