"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { signInSchema } from '@/Schemas/signInSchema'; // Import your validation schema
import { Spotlight } from '@/components/ui/Spotlight';
import Preloader from '@/components/Preloader';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate the form data using zod
        try {
            signInSchema.parse({ identifier: username, password }); // Ensure to use the correct field names

            // Handle the sign-in request
            const result = await signIn('credentials', {
                redirect: false,
                identifier: username,
                password,
            });
            

            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    toast({
                        title: 'Login Failed',
                        description: 'Incorrect username or password',
                        variant: 'destructive',
                    });
                } else {
                    toast({
                        title: 'Error',
                        description: result.error,
                        variant: 'destructive',
                    });
                }
            } else if (result?.url) {
                toast({
                    title: 'Login Successful',
                    description: 'Redirecting to dashboard',
                });
                router.replace('/profile');
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(error.errors.map(e => e.message).join(', '));
            } else {
                setError('An unexpected error occurred');
            }
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
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full p-2 mb-4 border border-gray-300 rounded bg-transparent"
                        type="text"
                        placeholder="Email Id"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                  Sign In
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
                </form>

                <p className="mt-4 text-black-500">New User? <a href="/sign-up">Sign-up</a></p>
            </div>
        </div>
        </div>
    );
}
