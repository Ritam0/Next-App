"use client"
import { Spotlight } from '@/components/ui/Spotlight'
import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import coming from "@/app/Assets/coming.json";
const Coming_soon = () => {
  return (
    <div className='h-auto  w-full relative overflow-hidden mx-auto'>
      <Spotlight
                className="-top-10 left-36 md:left-80 md:-top-40"
                fill="white"
            />
      <div className='dark bg-black w-full h-full min-h-screen max-w-screen overflow-hidden p-16 pt-32'>
            
            <div className="content flex flex-col items-center justify center gap-8">
                <div className="lottie flex flex-col items-center justify center">
                     <Player
                        autoplay
                        loop
                        src={coming}
                        style={{ height: '350px', width: '350px' }}
                    />
                    {/* <img className='w-[400px] h-[400px] p-4' src="https://res.cloudinary.com/djyxyaqno/image/upload/v1725363883/WhatsApp_Image_2024-09-03_at_3.30.37_PM_rve98r.jpg" alt="" /> */}
                    <h1 className='text-[26px]  text-center text-white'>Coming Soon.....</h1>
                    
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Coming_soon
