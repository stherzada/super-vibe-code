'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Key } from 'lucide-react';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('google', {
                callbackUrl: '/admin',
                redirect: false,
            });

            if (result?.error) {
                setError('Access denied. Only authorized users can sign in.');
            } else if (result?.url) {
                router.push(result.url);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Sign in to access your admin dashboard
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-700 text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="mr-2">
                                        <Key
                                            className="w-5 h-5"
                                        />
                                    </span>
                                    Sign in with Google
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
