"use client"
import Coming_soon from '@/components/coming_soon'
import Preloader from '@/components/Preloader'
import Pricing from '@/components/Pricing'
import { Spotlight } from '@/components/ui/Spotlight'
import React from 'react'

const Page = () => {
  return (
    <div className='h-auto  w-full relative overflow-hidden mx-auto'>
      <Preloader/>
       <Spotlight
                className="-top-10 left-36 md:left-80 md:-top-40"
                fill="white"
            />
      <Pricing/>
    </div>
  )
}

export default Page
