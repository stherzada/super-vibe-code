import ProjectCard from './ProjectCard';

async function getProjects() {
    // try {
    //     const projects = await db.project.findMany({
    //         where: { published: true },
    //         orderBy: { order: 'asc' },
    //     });
    //     return projects;
    // } catch (error) {
    //     console.error('Failed to fetch projects:', error);
    //     return [];
    // }
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <section id="work" className="min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 sm:mb-16 md:mb-20 text-white tracking-tighter">
                    SELECTED<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                        WORKS
                    </span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
                    <>
                        <ProjectCard
                            project={{
                                id: 'dummy',
                                title: 'Coming Soon',
                                category: 'Development',
                                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
                                link: '#',
                            }}
                            index={0}
                        />
                        <ProjectCard
                            project={{
                                id: 'dummy',
                                title: 'Coming Soon',
                                category: 'Development',
                                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
                                link: '#',
                            }}
                            index={1}
                        />
                        <ProjectCard
                            project={{
                                id: 'dummy',
                                title: 'Coming Soon',
                                category: 'Development',
                                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
                                link: '#',
                            }}
                            index={2}
                        />
                    </>
                </div>
            </div>
        </section >
    );
}
