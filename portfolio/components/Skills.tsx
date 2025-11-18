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
            className="py-32 overflow-hidden relative z-10 bg-black/50 backdrop-blur-sm"
        >
            <div className="mb-16 px-4 md:px-12 text-center">
                <p className="text-indigo-400 uppercase tracking-widest text-sm mb-4">
                    My Stack
                </p>
                <h2 className="text-4xl md:text-5xl font-light leading-tight max-w-4xl mx-auto">
                    Bridging the gap between{' '}
                    <span className="text-white font-bold">design</span> and{' '}
                    <span className="text-white font-bold">engineering</span> with
                    pixel-perfect precision.
                </h2>
            </div>

            {/* Infinite Text Marquee */}
            <div
                ref={sliderRef}
                className="flex whitespace-nowrap text-[10vw] md:text-[8vw] font-bold leading-none opacity-20 select-none"
            >
                {skills.map((skill, i) => (
                    <span key={i} className="mx-8 font-['Syne'] stroke-text">
                        {skill} •{' '}
                    </span>
                ))}
                {skills.map((skill, i) => (
                    <span key={`dup-${i}`} className="mx-8 font-['Syne'] stroke-text">
                        {skill} •{' '}
                    </span>
                ))}
            </div>
        </section>
    );
}
