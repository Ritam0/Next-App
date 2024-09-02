'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = ({ className }: { className?: string }) => {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-8 inset-x-0 w-[350px] md:w-[500px] m-auto z-50 dark", className)}>

<Menu setActive={setActive}>
        {/* <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem> */}
        <Link href={'/'} className="flex gap-4 md:gap-8 text-[15px] ">
        <MenuItem setActive={setActive} active={active} item="Home">
          
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Astrology">
          <div className="flex flex-col space-y-2 text-sm">
            <HoveredLink href="/numerology">Numerology</HoveredLink>
            <HoveredLink href="/palmistry">Palmistry</HoveredLink>
            <HoveredLink href="/vastu">Vastu</HoveredLink>
            <HoveredLink href="/rashi-fal">Horoscope</HoveredLink>
            <HoveredLink href="/kundali">Kundali</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Blogs">
          
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Pricing">
          
        </MenuItem>
          
          <MenuItem setActive={setActive} active={active} item="Profile" >
          
          </MenuItem>
          
        

        </Link>
      </Menu>
    </div>
  )
}

export default Navbar
