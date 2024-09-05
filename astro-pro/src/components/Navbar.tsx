'use client';
import React, { useEffect, useState } from "react";
import { useSession, signOut } from 'next-auth/react';

import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const[loggedIn,setLoggedIn]=useState(true);
  const { data: session, status } = useSession();
  
  useEffect(() => {

    if (!session) {
        setLoggedIn(false);
    } else {
        setLoggedIn(true);
    }
}, [session, status]);


  return (
    <div
      className={cn("fixed top-8 inset-x-0 w-[350px] md:w-[500px] m-auto z-50 dark ", className)}>
       



<Menu setActive={setActive}>
<div className="navitems flex items-center justify-center gap-4 md:gap-8">
        <Link href={'/'} className="flex gap-4 md:gap-8 text-[15px] ">
        <MenuItem setActive={setActive} active={active} item="Home">
          
        </MenuItem>
        </Link>

        <div  className="flex gap-4 md:gap-8 text-[15px] ">
        <MenuItem setActive={setActive} active={active} item="Astrology">
          <div className="flex flex-col space-y-2 text-sm">
            <HoveredLink href="/numerology">Numerology</HoveredLink>
            <HoveredLink href="/palmistry">Palmistry</HoveredLink>
            <HoveredLink href="/vastu">Vastu</HoveredLink>
            <HoveredLink href="/horoscope">Horoscope</HoveredLink>
            <HoveredLink href="/kundali">Kundali</HoveredLink>
          </div>
        </MenuItem>
        </div>
        

        <Link href={'/blogs'} className="flex gap-4 md:gap-8 text-[15px] ">
        <MenuItem setActive={setActive} active={active} item="Blogs">
          
        </MenuItem>
        </Link>

        <Link href={'/pricing'} className="flex gap-4 md:gap-8 text-[15px] ">
        <MenuItem setActive={setActive} active={active} item="Pricing">
          
        </MenuItem>
        </Link>

        <Link href={'/sign-in'} className={`${loggedIn?"hidden":"block"} flex gap-4 md:gap-8 text-[15px] `}>
          <MenuItem setActive={setActive} active={active} item="Login" >
          
          </MenuItem>
          </Link>
        <Link href={'/profile'} className={`${loggedIn?"block":"hidden"} flex gap-4 md:gap-8 text-[15px] `}>
          <MenuItem setActive={setActive} active={active} item="Profile" >
          
          </MenuItem>
          </Link>
        
          </div>
        
      </Menu>
    </div>
  )
}

export default Navbar
