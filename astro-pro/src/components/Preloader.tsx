"use client"
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import animationData from '@/app/Assets/preLoad.json'; // Replace with your Lottie file path

const Lottie = dynamic(() => import('react-lottie-player'), {
    ssr: false,
});

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Timeout for simulating loading duration
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Adjust the duration as needed

        // Timeout to allow the fade-out transition to complete before hiding the preloader
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Slightly longer than the loading duration to allow for fade-out

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ${
                        isLoading ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Lottie
                        loop
                        animationData={animationData}
                        play
                        style={{ width: 150, height: 150 }} // Adjust size as needed
                    />
                </div>
            )}
        </>
    );
}
