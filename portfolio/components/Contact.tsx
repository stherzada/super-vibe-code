import ContactForm from './ContactForm';

export default function Contact() {
    return (
        <section
            id="contact"
            className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16 sm:py-20"
        >
            <h2 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-none mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-900 px-4">
                LET&apos;S TALK
            </h2>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-2xl px-4">
                Have a project in mind? Let&apos;s create something amazing together.
            </p>

            <ContactForm />

            <div className="absolute bottom-4 sm:bottom-8 w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4 sm:px-8 text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">
                <div className="order-2 sm:order-1">© 2024 Dev OS</div>
                <div className="flex gap-3 sm:gap-4 order-1 sm:order-2">
                    <a href="#" className="hover:text-white transition-colors">
                        Twitter
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        LinkedIn
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
