import { ArrowRight } from 'lucide-react';

export default function Contact() {
    return (
        <section
            id="contact"
            className="min-h-[80vh] flex flex-col justify-center items-center px-4 text-center relative z-10"
        >
            <h2 className="text-[10vw] font-bold leading-none mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-900">
                LET&apos;S TALK
            </h2>
            <a href="mailto:hello@example.com" className="group relative inline-block">
                <div className="text-2xl md:text-4xl border border-white/20 rounded-full px-8 py-4 bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500 flex items-center gap-4">
                    hello@dev.os
                    <ArrowRight className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 rounded-full bg-indigo-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
            </a>

            <div className="absolute bottom-8 w-full flex justify-between px-8 text-xs text-gray-500 uppercase tracking-widest">
                <div>© 2024 Dev OS</div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white">
                        Twitter
                    </a>
                    <a href="#" className="hover:text-white">
                        LinkedIn
                    </a>
                    <a href="#" className="hover:text-white">
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
