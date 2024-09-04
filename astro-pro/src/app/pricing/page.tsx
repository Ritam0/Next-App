"use client"
import Coming_soon from '@/components/coming_soon'
import Pricing from '@/components/Pricing'
import { Spotlight } from '@/components/ui/Spotlight'
import React from 'react'

const page = () => {
  return (
    <div>
       <Spotlight
                className="-top-10 left-36 md:left-80 md:-top-40"
                fill="white"
            />
      <Pricing/>
    </div>
  )
}

export default page
