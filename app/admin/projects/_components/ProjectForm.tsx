'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const projectSchema = z.object({
    title: z.string().min(2, 'Title is required'),
    category: z.string().min(2, 'Category is required'),
    description: z.string().optional(),
    image: z.string().url('Must be a valid URL'),
    link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    order: z.number().int(),
    published: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: ProjectFormData & { id: string };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            title: '',
            category: '',
            description: '',
            image: '',
            link: '',
            order: 0,
            published: true,
        },
    });

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);
        setError('');

        try {
            const url = initialData
                ? `/api/admin/projects/${initialData.id}`
                : '/api/admin/projects';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to save project');

            router.push('/admin/projects');
            router.refresh();
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/projects"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-white">
                    {initialData ? 'Edit Project' : 'New Project'}
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Title
                        </label>
                        <input
                            {...register('title')}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="Project Title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Category
                        </label>
                        <input
                            {...register('category')}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="e.g. Web Development"
                        />
                        {errors.category && (
                            <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Image URL
                        </label>
                        <input
                            {...register('image')}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="https://..."
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-400">{errors.image.message}</p>
                        )}
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Project Link (Optional)
                        </label>
                        <input
                            {...register('link')}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="https://..."
                        />
                        {errors.link && (
                            <p className="mt-1 text-sm text-red-400">{errors.link.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="Project description..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Order
                            </label>
                            <input
                                type="number"
                                {...register('order', { valueAsNumber: true })}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Published */}
                        <div className="flex items-center h-full pt-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('published')}
                                    className="w-5 h-5 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 bg-gray-900"
                                />
                                <span className="text-sm font-medium text-white">Published</span>
                            </label>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Project
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
