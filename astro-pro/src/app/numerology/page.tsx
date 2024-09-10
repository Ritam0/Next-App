"use client"; // Ensure this is at the top to indicate client-side rendering
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use this import for Next.js 13+
import NumerologyApi from '@/data/NumerologyData';
import { Spotlight } from '@/components/ui/Spotlight';
import Pricing from '@/components/Pricing';
import Preloader from '@/components/Preloader';
import { Player } from '@lottiefiles/react-lottie-player';
import planets from "@/app/Assets/planets.json";

const Page = () => { // Updated component name to start with an uppercase letter
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [mulank, setMulank] = useState<number>(0);
  const [bhagyank, setBhagyank] = useState<number>(0);
  const [isFalse, setIsFalse] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);
  const [allDisplay, setAllDisplay] = useState(true);
  const router = useRouter(); // Initialize router for redirection

  useEffect(() => {
    // Check if the user is logged in by verifying if email exists in localStorage
    if (!localStorage.getItem("email")) {
      router.push('/login');
    }
  }, [router]); // Added router to dependencies

  const makeSingle = (num: number) => {
    while (num >= 10) {
      let sum = 0;
      
      // Sum the digits of the number
      while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
      }
      
      num = sum; // Set the num to the sum of its digits
    }
    console.log(num);
    return num;
  };

  const numberCalculate = () => {
    const day = Number(date);
    const mo = Number(month);
    const yr = Number(year);
    if (day < 1 || day > 31) {
      setIsFalse(true);
      setFound(false);
      setDate("");
      setMonth("");
      setYear("");
    } else if (mo < 1 || mo > 12) {
      setIsFalse(true);
      setFound(false);
      setDate("");
      setMonth("");
      setYear("");
    } else if (yr < 1 || yr > 3000) {
      setIsFalse(true);
      setFound(false);
      setDate("");
      setMonth("");
      setYear("");
    } else {
      setIsFalse(false);
      const mulankResult = makeSingle(day);
      let temp = makeSingle(day) + makeSingle(mo) + makeSingle(yr);
      let bhagyankResult = makeSingle(temp);
      setMulank(mulankResult);
      setBhagyank(bhagyankResult);
      setFound(true);
    }
  };

  const changeDisplay = () => {
    setAllDisplay(!allDisplay);
  };

  return (
    <div className="min-h-screen bg-black antialiased bg-grid-white/[0.2] text-white flex flex-col items-center justify-center gap-4 pt-36 md:pt-0 pb-6 h-auto  w-full relative overflow-hidden mx-auto">
      <Preloader/>
      <Spotlight
        className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:top-0"
        fill="white"
        />
      <h1 className='mt-6 md:mt-36 font-semibold text-[24px] md:text-4xl pb-4 md:pb-8'>Life is the magic of 3-6-9</h1>
      <div className="upper flex flex-col md:flex-row items-center justify-center gap-8 text-[16px] md:gap-16">
        <div className="image">
        <Player
          autoplay
          loop
          src={planets}
          style={{ height: '300px', width: '300px' }} // Adjust size as needed
        />
        </div>
        <div className="calculator border rounded-[15px] flex flex-col gap-4 lg:gap-16 items-center justify-center w-[100%] h-[80%] md:h-[300px] p-2">
          <div className="l1">
            <h1>Calculate Your Numbers</h1>
          </div>
          <div className="l2 flex flex-col md:flex-row items-center justify-center gap-4 w-full p-2">
            <input
              type="number"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-[10px] bg-transparent  w-20 p-2 gap-4 border-2 border-white"
              placeholder="DD"
              inputMode="numeric"
              pattern="\d*"
            />
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border rounded-[10px] bg-transparent  w-20 p-2 gap-4 border-2 border-white"
              placeholder="MM"
              inputMode="numeric"
              pattern="\d*"
            />
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border rounded-[10px] bg-transparent  w-24 p-2 gap-4 border-2 border-white"
              placeholder="YYYY"
              inputMode="numeric"
              pattern="\d*"
            />
            <div className="btn">
              <button
                onClick={numberCalculate}
                className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                  Calculate
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
            </div>
          </div>
          <div className="l3">
            <p className={`${isFalse ? 'block' : 'hidden'}`}>Enter a Valid Date of Birth</p>
            <p className={`${found ? 'block' : 'hidden'}`}>
              Your Mulank is {mulank} and Bhagyank is {bhagyank}
            </p>
          </div>
        </div>
      </div>
      <div className="lower flex flex-col pt-8 items-center justify-center gap-8">
      <div className="btn">
              <button
                onClick={changeDisplay}
                className={`${allDisplay?"hidden":"block"} relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group`}
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                  See All
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
              <button
                onClick={changeDisplay}
                className={`${allDisplay?"block":"hidden"} relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group`}
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                  Only My Numbers
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button>
            </div>
        <div className="details">
        <div className="numerology-container flex flex-col gap-8 items-center justify-center p-0 md:p-4 ">
      {NumerologyApi.map((number) => (
        <div key={number.id} className={`${(!allDisplay && (number.id!=mulank && number.id!=bhagyank))?'hidden':'block'} numerology-card border p-6 rounded-[20px] w-[80%] flex flex-col md:flex-row items-center justify-center gap-6`}>
          <div className="img h-[80%] w-[80%]">
          <img src={number.image} alt={`Number ${number.id}`} className="numerology-image" />
          </div>
          <div className="details text-[16px] md:text-[20px]">
            <h2>Number {number.id}</h2>
            <br />
            <h3>Ruling Planet: {number.rulingPlanet}</h3>
            <br />
            <p><strong>Character:</strong> {number.character}</p>
            <br />
            <p><strong>Details:</strong> {number.details}</p>
            <br />
            <p><strong>Famous Persons:</strong> {number.persons}</p>
          </div>
          
          
        </div>
      ))}
    </div>
        </div>
      </div>
      <Pricing/>
    </div>
  );
};

export default Page;
