'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6"
        >
            {/* Name Field */}
            <div className="relative">
                <input
                    {...register('name')}
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-sm sm:text-base"
                />
                {errors.name && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Email Field */}
            <div className="relative">
                <input
                    {...register('email')}
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-sm sm:text-base"
                />
                {errors.email && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Message Field */}
            <div className="relative">
                <textarea
                    {...register('message')}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none text-sm sm:text-base"
                />
                {errors.message && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.message.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden text-sm sm:text-base"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2 sm:gap-3">
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                        </>
                    ) : submitStatus === 'success' ? (
                        <>
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            Message Sent!
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </span>
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
                <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Thanks for reaching out! I&apos;ll get back to you soon.</span>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Oops! Something went wrong. Please try again.</span>
                </div>
            )}
        </form>
    );
}
