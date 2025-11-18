import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProjectForm from '../_components/ProjectForm';

interface PageProps {
    params: {
        id: string;
    };
}

export default async function EditProjectPage({ params }: PageProps) {
    const project = await db.project.findUnique({
        where: { id: params.id },
    });

    if (!project) {
        notFound();
    }

    // Convert null values to undefined/empty string for form compatibility
    const formattedProject = {
        ...project,
        description: project.description || '',
        link: project.link || '',
    };

    return <ProjectForm initialData={formattedProject} />;
}
