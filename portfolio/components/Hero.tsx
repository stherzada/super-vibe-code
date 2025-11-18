'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (titleRef.current?.children) {
                gsap.from(titleRef.current.children, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: 'power4.out',
                    delay: 0.5,
                });
            }

            gsap.from(subtitleRef.current, {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 1.5,
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative px-4">
            <div ref={titleRef} className="text-center z-10 mix-blend-exclusion">
                <h1 className="text-[12vw] leading-[0.8] font-extrabold text-transparent bg-clip-text bg-white stroke-white tracking-tighter hover:tracking-normal transition-all duration-700">
                    CREATIVE
                </h1>
                <h1 className="text-[12vw] leading-[0.8] font-extrabold text-white tracking-tighter">
                    DEVELOPER
                </h1>
            </div>
            <div
                ref={subtitleRef}
                className="mt-8 flex flex-col items-center gap-4 z-10"
            >
                <p className="text-gray-400 text-sm md:text-base uppercase tracking-[0.2em]">
                    Crafting Digital Experiences
                </p>
                <div className="animate-bounce mt-8">
                    <ArrowDown className="w-6 h-6 text-white opacity-50" />
                </div>
            </div>
        </section>
    );
}
