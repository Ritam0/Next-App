"use client"
import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import ExampleButton from './FortuneButton';
import horoscope from "@/app/Assets/horoscope.json";
import planets from "@/app/Assets/planets.json";
import { Spotlight } from './ui/Spotlight';
const Herosection = () => {
  return (
    <div className='flex flex-col gap-6 items-center justify-center h-auto  w-full relative overflow-hidden mx-auto '>
         <Spotlight
                className="-top-10 left-36 md:left-80 md:-top-40"
                fill="white"
            />
        <div className="cote text-white font-semibold text-[26px] md:text-[56px] m-auto mt-32 ">Fortune Favours The Brave</div>
       
      <div className="animation-container">
        <Player
          autoplay
          loop
          src={horoscope}
          style={{ height: '400px', width: '400px' }} // Adjust size as needed
        />
      </div>
        <div className="button p-4">
        <a href="/numerology" className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
<span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
<span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
<span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Get Started</span>
<span className="absolute inset-0 border-2 border-white rounded-full"></span>
</a>
        </div>
    </div>
  )
}

export default Herosection
