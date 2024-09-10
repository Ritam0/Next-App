"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Preloader from '@/components/Preloader';
import Pricing from '@/components/Pricing';
import { Spotlight } from '@/components/ui/Spotlight';

const Profile: React.FC = () => {
  const [userName, setUserName] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>("");
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [image, setPhoto] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const photo = localStorage.getItem("photo");

    setUserName(name);
    setUserEmail(email);
    setUserId(userId);
    setPhoto(photo || "path/to/default/image.jpg");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("photo");
    localStorage.removeItem("Name");
    localStorage.removeItem("userId");
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark bg-black w-full h-full min-h-screen p-4 h-auto relative overflow-hidden mx-auto">
      <Preloader />
      <Spotlight
        className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:-top-40"
        fill="white"
      />
      <div className="m-auto mt-24 pt-16">
        <div className="bg-transparent p-8 rounded-[15px] shadow-md w-full max-w-md text-white border">
          <div className="profileImageContainer mb-6">
            <img
              className="profileImage w-32 h-32 rounded-full mx-auto"
              src={image || "path/to/default/image.jpg"}
              alt="Profile"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
          <div className="mb-4">
            <p className="font-semibold">User Name: {userName}</p>
            
          </div>
          <div className="mb-4">
            <p className="font-semibold">Email ID: {userEmail}</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
              Logout
            </span>
            <span className="absolute inset-0 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>
      <Pricing />
    </div>
  );
};

export default Profile;
