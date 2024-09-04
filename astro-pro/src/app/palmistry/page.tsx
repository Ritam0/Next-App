"use client"
import { Spotlight } from '@/components/ui/Spotlight'
import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import palm from "@/app/Assets/palm.json";
import Palmistry_data from '@/data/Palmistry';
import Pricing from '@/components/Pricing';
const page = () => {
  return (
    <div className='dark bg-black w-full h-full min-h-screen max-w-screen overflow-hidden p-4 h-auto  w-full relative overflow-hidden mx-auto'>
            <Spotlight
                className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:-top-40"
                fill="white"
            />
            <div className="content flex flex-col items-center justify center gap-8">
                <div className="lottie flex flex-col items-center justify center">
                     <Player
                        autoplay
                        loop
                        src={palm}
                        style={{ height: '350px', width: '350px' }}
                    />
                    {/* <img className='w-[400px] h-[400px] p-4' src="https://res.cloudinary.com/djyxyaqno/image/upload/v1725363883/WhatsApp_Image_2024-09-03_at_3.30.37_PM_rve98r.jpg" alt="" /> */}
                    <h1 className='text-[18px] md:text-[26px] text-center text-white'>Unveil Your Destiny – Discover the Secrets Written in Your Hands.</h1>
                    
                   
                </div>

                    {/* palmistry about */}

                <div className="about w-[90%] flex flex-col items-center gap-6 border border-white border-[3px] rounded-[20px] p-4">
                <h1 className='text-[24px] text-white flex flex-col items-center justify-center text-center'>About Palmistry</h1>
                <div className="about_vastu flex flex-col md:flex-row gap-6 items-center justify-center ">
                <img className="w-[80%] md:w-[40%]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Les_lignes_de_la_main_Artlibre.png/130px-Les_lignes_de_la_main_Artlibre.png" alt="" />
                <p className="text-white text-[14px] md:text-[18px] text-center w-[90%]">{Palmistry_data.about} 
                    <br />
                    <a href="https://en.wikipedia.org/wiki/Palmistry" target='_blank' className='text-gray text-[15px]'>Click here for more....</a>
                </p>
                </div>   
                </div>



            </div>
            <Pricing/>
    </div>
  )
}

export default page
