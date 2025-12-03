'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    link?: string | null;
}
interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;

        if (card && image) {
            gsap.fromTo(
                card,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=100',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.to(image, {
                y: '20%',
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, []);

    return (
        <div
            ref={cardRef}
            className={`group relative ${index % 2 === 1 ? 'lg:mt-32' : ''}`}
        >
            <a
                href={project.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900 mb-6 sm:mb-8">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                    <img
                        ref={imageRef}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[120%] object-cover -translate-y-[10%] scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 truncate">
                            {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 font-mono uppercase tracking-wider">
                            {project.category}
                        </p>
                    </div>
                    <div className="h-[1px] flex-1 bg-gray-800 mb-2 hidden sm:block" />
                    <span className="text-sm sm:text-base text-gray-500 font-mono">
                        0{index + 1}
                    </span>
                </div>
            </a>
        </div>
    );
}
