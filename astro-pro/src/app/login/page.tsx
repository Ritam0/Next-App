"use client";
import React, { useState, useEffect } from "react";
import { auth, provider } from "@/services/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  AuthError,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Preloader from '@/components/Preloader';
import { Spotlight } from '@/components/ui/Spotlight';
import { Player } from "@lottiefiles/react-lottie-player";
import login_lottie from "@/app/Assets/coming.json";

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredentials);
      window.alert("Sign in successful");
      setEmail("");
      setPassword("");
    } catch (error) {
      const authError = error as AuthError;
      setError("Invalid Credentials: " + authError.message);
    }
  };

  const handleSigninWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      console.log(data);
      window.alert("Sign in with Google successful");
      localStorage.setItem("email", data.user.email || "");
      localStorage.setItem("photo", data.user.photoURL || "");
      localStorage.setItem("Name", data.user.displayName || "");
      localStorage.setItem("userId", data.user.uid);
      setValue("1");
      window.location.href = '/dashboard';
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark bg-black w-full h-full p-4 relative overflow-hidden mx-auto">
      <Preloader />
      <Spotlight
        className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:-top-40"
        fill="white"
      />
      {!value ? (
        <div className="bg-transparent p-8 rounded-[15px] shadow-md w-full max-w-md text-white border">
          <div className="heading text-center mb-6">
            <h3 className="text-2xl font-bold">Sign In</h3>
          </div>
          <div className="lottie">
                    <Player
                        autoplay
                        loop
                        src={login_lottie}
                        style={{ height: '400px', width: '400px' }}
                    />
                </div>
          <div className="flex justify-center items-center">
            <button
              className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group w-[150px]"
              type="button"
              onClick={handleSigninWithGoogle}
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 488 512"
                    className="mr-3"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                  Sign in
                </div>
              </span>
              <span className="absolute inset-0 border-2 border-white rounded-full"></span>
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      ) : (
        <button className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group w-full mt-4">
          <a href="/" className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
            You are Signed in. Click here!!
          </a>
        </button>
      )}
    </div>
  );
};

export default LoginCard;
