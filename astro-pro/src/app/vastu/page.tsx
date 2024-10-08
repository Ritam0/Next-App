"use client"; // Ensure this is at the top for client-side rendering
import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import vastu from "@/app/Assets/vastu_animation.json";
import { Spotlight } from '@/components/ui/Spotlight';
import Vastu_data from '@/data/vastuData';
import Pricing from '@/components/Pricing';
import Preloader from '@/components/Preloader';
import { useRouter } from 'next/navigation';

const Page = () => { // Updated component name to start with an uppercase letter
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter(); // Initialize router for redirection
  
    useEffect(() => {
      // Check if the user is logged in by verifying if email exists in localStorage
      if (!localStorage.getItem("email")) {
        router.push('/login');
      }
    }, [router]); // Added router to dependencies to comply with the rules

    return (
        <div className='dark bg-black w-full h-full min-h-screen p-4 h-auto  w-full relative overflow-hidden mx-auto'>
            <Preloader/>
            <Spotlight
                className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:-top-40"
                fill="white"
            />
            <div className="content flex flex-col items-center justify-center gap-8 pt-32">
                <div className="lottie">
                    <Player
                        autoplay
                        loop
                        src={vastu}
                        style={{ height: '400px', width: '400px' }}
                    />
                </div>
                <div className="text">
                    <h1 className='text-[26px] text-white flex flex-col items-center justify-center text-center'>
                        Harmonize Your Space, Elevate Your Life <br />
                        Discover the Power of Vastu Shastra!
                    </h1>
                </div>
                {/* about vastu */}
                <div className="about w-[90%] flex flex-col items-center gap-6 border border-white border-[3px] rounded-[20px] p-4">
                    <h1 className='text-[24px] text-white flex flex-col items-center justify-center text-center'>
                        About Vastu Shastra
                    </h1>
                    <div className="about_vastu flex flex-col md:flex-row gap-6 items-center justify-center">
                        <img className="w-[80%] md:w-[40%]" src="https://res.cloudinary.com/djyxyaqno/image/upload/v1725361704/WhatsApp_Image_2024-09-03_at_4.36.06_PM_q9vhlx.png" alt="" />
                        <p className="text-white text-[14px] md:text-[18px] text-center w-[90%]">
                            {Vastu_data.about} 
                            <br />
                            <a href="https://en.wikipedia.org/wiki/Vastu_shastra" target='_blank' rel="noopener noreferrer" className='text-gray text-[15px]'>Click here for more....</a>
                        </p>
                    </div>   
                </div>

                {/* vastu tips */}
                <div className="about w-[90%] flex flex-col items-center gap-8 p-4 pt-6">
                    <h1 className='text-[32px] text-white flex flex-col items-center justify-center text-center'>
                        Tips From Vastu Shastra
                    </h1>
                    {Vastu_data.vastu_tips.map((number) => (
                        <div key={number.id} className="text-white text-[14px] md:text-[18px] numerology-card border p-4 border-white border-[3px] hover:scale-105 rounded-[20px] w-[90%] md:w-[80%] flex flex-col items-center justify-center gap-8 transition-transform transform hover:scale-105">
                            <h1 className='font-bold'>Tips {number.id}:</h1>
                            <p className='text-center'>{number.tips}</p>
                        </div>
                    ))}  
                </div>
            </div>
            <Pricing/>
        </div>
    );
}

export default Page; // Updated export to match the component name
