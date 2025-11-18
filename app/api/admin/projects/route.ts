import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const projects = await db.project.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const project = await db.project.create({
            data: {
                title: data.title,
                category: data.category,
                description: data.description,
                image: data.image,
                link: data.link,
                order: data.order || 0,
                published: data.published ?? true,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
