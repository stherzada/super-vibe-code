'use client';

import { useState, useEffect } from 'react';
import { Trash2, Mail, CheckCircle, Circle } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/admin/messages');
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await fetch(`/api/admin/messages?id=${id}`, {
                method: 'DELETE',
            });
            setMessages(messages.filter((msg) => msg.id !== id));
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    const toggleRead = async (id: string, currentStatus: boolean) => {
        try {
            await fetch('/api/admin/messages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, read: !currentStatus }),
            });

            setMessages(messages.map(msg =>
                msg.id === id ? { ...msg, read: !currentStatus } : msg
            ));
        } catch (error) {
            console.error('Failed to update message:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Messages</h1>
                <p className="text-gray-400 mt-1">View and manage contact form submissions</p>
            </div>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center text-gray-500">
                        No messages found.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-gray-800 rounded-xl border transition-all ${msg.read ? 'border-gray-700 opacity-75' : 'border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                                }`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${msg.read ? 'bg-gray-700 text-gray-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{msg.name}</h3>
                                            <a href={`mailto:${msg.email}`} className="text-sm text-indigo-400 hover:underline">
                                                {msg.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 mr-2">
                                            {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <button
                                            onClick={() => toggleRead(msg.id, msg.read)}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                            title={msg.read ? "Mark as unread" : "Mark as read"}
                                        >
                                            {msg.read ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                            title="Delete message"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                    {msg.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
