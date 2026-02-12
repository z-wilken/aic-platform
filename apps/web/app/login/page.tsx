'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginRedirect() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the platform dashboard login
        // In production, this would be process.env.NEXT_PUBLIC_PLATFORM_URL
        const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3001';
        window.location.href = `${platformUrl}/login`;
    }, []);

    return (
        <div className="min-h-screen bg-aic-paper flex items-center justify-center">
            <div className="text-center">
                <div className="h-8 w-8 border-4 border-aic-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-serif italic text-gray-500">Redirecting to institutional portal...</p>
            </div>
        </div>
    );
}
