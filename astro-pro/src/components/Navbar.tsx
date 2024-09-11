'use client';
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter(); // Initialize router for redirection

  useEffect(() => {
    // Check if the user is logged in by verifying if email exists in localStorage
    if (localStorage.getItem("email")) {
      setLoggedIn(true);  // User is logged in
    } else {
      setLoggedIn(false); // User is not logged in
    }
  }, []);

  const handleLogout = () => {
    // Clear the user's login data from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("photo");
    localStorage.removeItem("Name");
    localStorage.removeItem("userId");

    // Update the loggedIn state
    setLoggedIn(false);

    // Redirect to the login page after logout
    router.push('/login');
  };

  return (
    <div className={cn("fixed top-8 inset-x-0 w-[350px] md:w-[500px] m-auto z-50 dark", className)}>
      <Menu setActive={setActive}>
        <div className="navitems flex items-center justify-center gap-4 md:gap-8">
          <Link href={'/'} className="flex gap-4 md:gap-8 text-[15px]">
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>

          <div className="flex gap-4 md:gap-8 text-[15px]">
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

          <Link href={'/blogs'} className="flex gap-4 md:gap-8 text-[15px]">
            <MenuItem setActive={setActive} active={active} item="Blogs" />
          </Link>

          <Link href={'/pricing'} className="flex gap-4 md:gap-8 text-[15px]">
            <MenuItem setActive={setActive} active={active} item="Pricing" />
          </Link>

          {/* Conditionally render Login or Dashboard link based on login status */}
          {!loggedIn ? (
            <Link href={'/login'} className="flex gap-4 md:gap-8 text-[15px]">
              <MenuItem setActive={setActive} active={active} item="Login" />
            </Link>
          ) : (
            <>
              <Link href={'/dashboard'} className="flex gap-4 md:gap-8 text-[15px]">
                <MenuItem setActive={setActive} active={active} item="Profile" />
              </Link>
            </>
          )}
        </div>
      </Menu>
    </div>
  );
};

export default Navbar;
