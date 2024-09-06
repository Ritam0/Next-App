"use client"
import Preloader from '@/components/Preloader';
import Pricing from '@/components/Pricing';
import { Spotlight } from '@/components/ui/Spotlight';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (!session) {
        router.push('/sign-in'); // Redirect to login if not authenticated
        return null;
    }

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push('/sign-in'); // Redirect to login page after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen  dark bg-black w-full h-full min-h-screen p-4 h-auto  w-full relative overflow-hidden mx-auto">
        <Preloader/>
        <Spotlight
          className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:-top-40"
          fill="white"
      />
      <div className='m-auto mt-24 pt-16'>
      
      <div className="bg-transparent p-8 rounded-[15px] shadow-md w-full max-w-md text-white border">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <div className="mb-4">
                    <p className="font-semibold">User ID:</p>
                    <p>{session.user?._id}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Username:</p>
                    <p>{session.user?.username}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Email:</p>
                    <p>{session.user?.email}</p>
                </div>
                <button
                onClick={handleSignOut}
                className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                  Sign Out
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
            </div>
            
        </div>
        <Pricing/>
        </div>
    );
}
