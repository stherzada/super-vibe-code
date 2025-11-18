'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sliderRef.current, {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                xPercent: -20,
                ease: 'none',
            });
        });
        return () => ctx.revert();
    }, []);

    const skills = [
        'React',
        'Three.js',
        'WebGL',
        'Next.js',
        'TypeScript',
        'GSAP',
        'Node.js',
        'AWS',
    ];

    return (
        <section
            id="about"
            ref={triggerRef}
            className="py-20 sm:py-24 md:py-32 overflow-hidden relative z-10 bg-black/50 backdrop-blur-sm"
        >
            <div className="mb-12 sm:mb-14 md:mb-16 px-4 sm:px-6 md:px-8 lg:px-12 text-center">
                <p className="text-indigo-400 uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4">
                    My Stack
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-4xl mx-auto px-4">
                    Bridging the gap between{' '}
                    <span className="text-white font-bold">design</span> and{' '}
                    <span className="text-white font-bold">engineering</span> with
                    pixel-perfect precision.
                </h2>
            </div>

            {/* Infinite Text Marquee */}
            <div
                ref={sliderRef}
                className="flex whitespace-nowrap text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-none opacity-20 select-none"
            >
                {skills.map((skill, i) => (
                    <span key={i} className="mx-4 sm:mx-6 md:mx-8 font-['Syne'] stroke-text">
                        {skill} •{' '}
                    </span>
                ))}
                {skills.map((skill, i) => (
                    <span key={`dup-${i}`} className="mx-4 sm:mx-6 md:mx-8 font-['Syne'] stroke-text">
                        {skill} •{' '}
                    </span>
                ))}
            </div>
        </section>
    );
}
