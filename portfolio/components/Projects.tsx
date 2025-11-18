'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: 'Nebula OS',
            category: 'WebGL Interface',
            image:
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        },
        {
            id: 2,
            title: 'Kinetic Flow',
            category: 'E-Commerce',
            image:
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
        },
        {
            id: 3,
            title: 'Zenith',
            category: 'AI Platform',
            image:
                'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop',
        },
    ];

    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.project-card').forEach((card) => {
                gsap.from(card as HTMLElement, {
                    scrollTrigger: {
                        trigger: card as HTMLElement,
                        start: 'top bottom-=100',
                        toggleActions: 'play none none reverse',
                    },
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="work"
            ref={sectionRef}
            className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10"
        >
            <div className="mb-16 sm:mb-20 md:mb-24 max-w-7xl mx-auto">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold opacity-90">
                    Selected
                    <br />
                    Work
                </h2>
                <div className="h-1 w-16 sm:w-20 md:w-24 bg-indigo-500 mt-4 sm:mt-6"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`project-card group relative cursor-pointer ${index % 2 !== 0 ? 'lg:mt-32' : ''
                            }`}
                    >
                        <div className="overflow-hidden rounded-lg aspect-[4/3] mb-4 sm:mb-6 relative">
                            <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                        </div>
                        <div className="flex justify-between items-end border-b border-white/20 pb-3 sm:pb-4">
                            <div className="flex-1 min-w-0 pr-4">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold group-hover:text-indigo-400 transition-colors truncate">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">{project.category}</p>
                            </div>
                            <span className="text-xl sm:text-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex-shrink-0">
                                ↗
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
