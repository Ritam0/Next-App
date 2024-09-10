"use client"
import Coming_soon from '@/components/coming_soon'
import Preloader from '@/components/Preloader'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter(); // Initialize router for redirection
  
    useEffect(() => {
      // Check if the user is logged in by verifying if email exists in localStorage
      if (!localStorage.getItem("email")) {
        router.push('/login')
      } 
    }, []);
  return (
    <div>
      <Preloader/>
      <Coming_soon/>
    </div>
  )
}

export default page
