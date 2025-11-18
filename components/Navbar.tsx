export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full flex justify-between items-center p-4 sm:p-6 md:p-8 z-50 mix-blend-difference text-white">
            <div className="text-xl sm:text-2xl font-bold tracking-tighter font-['Syne']">
                DEV.OS
            </div>
            <div className="hidden md:flex gap-6 lg:gap-8 text-xs sm:text-sm uppercase tracking-widest font-medium">
                <a
                    href="#work"
                    className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                    Work
                </a>
                <a
                    href="#about"
                    className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                    About
                </a>
                <a
                    href="#contact"
                    className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                    Contact
                </a>
            </div>
            <div className="md:hidden flex flex-col gap-1">
                <div className="w-5 sm:w-6 h-0.5 bg-white"></div>
                <div className="w-5 sm:w-6 h-0.5 bg-white"></div>
            </div>
        </nav>
    );
}
