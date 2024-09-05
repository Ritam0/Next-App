"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Spotlight } from '@/components/ui/Spotlight';
import Preloader from '@/components/Preloader';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const router = useRouter();

    const handleRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/sign-up', {
                username,
                email,
                password,
            });

            const data = response.data;
            if (response.status === 200) {
                setSuccess(data.message);
                setIsRegistered(true);
                
                handleVerificationSubmit;
                router.push('/sign-in');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/verify-code', {
                userName: username,
                code: verificationCode,
            });

            const data = response.data;
            if (response.status === 200) {
                setSuccess(data.message);
                setTimeout(() => {
                    router.push('/profile'); // Redirect to the profile page after successful verification
                }, 2000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  dark bg-black w-full h-full min-h-screen p-4 h-auto  w-full relative overflow-hidden mx-auto">
            <Preloader/>
            <div className=''>
            <Spotlight
                className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:-top-40"
                fill="white"
            />
            <div className="bg-transparent p-8 rounded-[15px] shadow-md w-full max-w-md text-white border">
                
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                        <form onSubmit={handleRegistrationSubmit} encType="multipart/form-data">
                            <input
                                className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                           
                           <button
                className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                  Sign Up
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
                        </form>
                    </div>
                    <p className="mt-4 text-black-500">Already a User? <a href="/sign-in">Sign-in</a></p>
                 
            </div>
        </div>
        </div>
    );
}
