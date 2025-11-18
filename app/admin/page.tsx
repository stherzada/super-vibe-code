import { db } from '@/lib/db';
import { FolderKanban, MessageSquare, Eye } from 'lucide-react';
import Link from 'next/link';

async function getStats() {
    const [projectsCount, messagesCount, unreadMessagesCount] = await Promise.all([
        db.project.count(),
        db.contactMessage.count(),
        db.contactMessage.count({ where: { read: false } }),
    ]);

    return {
        projectsCount,
        messagesCount,
        unreadMessagesCount,
    };
}

async function getRecentMessages() {
    return db.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    });
}

export default async function AdminDashboard() {
    const stats = await getStats();
    const recentMessages = await getRecentMessages();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 mt-2">Overview of your portfolio activity</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-lg">
                            <FolderKanban className="w-6 h-6 text-indigo-400" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                            Total
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stats.projectsCount}</h3>
                    <p className="text-sm text-gray-400 mt-1">Active Projects</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                            <MessageSquare className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                            Total
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stats.messagesCount}</h3>
                    <p className="text-sm text-gray-400 mt-1">Contact Messages</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <Eye className="w-6 h-6 text-green-400" />
                        </div>
                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                            New
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stats.unreadMessagesCount}</h3>
                    <p className="text-sm text-gray-400 mt-1">Unread Messages</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Messages */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                        <h3 className="font-semibold text-white">Recent Messages</h3>
                        <Link
                            href="/admin/messages"
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-700">
                        {recentMessages.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                No messages yet
                            </div>
                        ) : (
                            recentMessages.map((msg) => (
                                <div key={msg.id} className="p-4 hover:bg-gray-700/50 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-white">{msg.name}</span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">{msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                        <h3 className="font-semibold text-white">Quick Actions</h3>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <Link
                            href="/admin/projects/new"
                            className="flex flex-col items-center justify-center p-6 bg-gray-700/30 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all group"
                        >
                            <div className="p-3 bg-indigo-500/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                <FolderKanban className="w-6 h-6 text-indigo-400" />
                            </div>
                            <span className="text-sm font-medium text-white">Add Project</span>
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="flex flex-col items-center justify-center p-6 bg-gray-700/30 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all group"
                        >
                            <div className="p-3 bg-purple-500/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-white">Check Messages</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
