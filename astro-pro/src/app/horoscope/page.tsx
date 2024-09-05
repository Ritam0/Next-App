"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import Rashi from "@/app/Assets/Rashi-fal.json";
import LoaderAnimation from "@/app/Assets/loader.json";  // Your loader animation JSON file
import { Spotlight } from '@/components/ui/Spotlight';
import Pricing from '@/components/Pricing';
import Preloader from '@/components/Preloader';

const Page = () => {
    const [zodiac, setZodiac] = useState("");
    const [activeZodiac, setActiveZodiac] = useState("");
    const [horoscope, setHoroscope] = useState(false); 
    const [month, setMonth] = useState("");
    const [challange, setChallange] = useState("");
    const [standout, setStandout] = useState("");
    const [details, setDetails] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);  // Add loading state

    const zodiacSigns = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", 
        "Virgo", "Libra", "Scorpio", "Sagittarius", 
        "Capricorn", "Aquarius", "Pisces"
    ];

    const findHoroscope = async () => {
        setLoading(true);  // Start loading
        const options = {
            method: 'GET',
            url: 'https://horoscope19.p.rapidapi.com/get-horoscope/monthly',
            params: { sign: zodiac },
            headers: {
                'x-rapidapi-key': '7d06037b96msh28b2f1a4601c134p1d7646jsn7074100409a7',
                'x-rapidapi-host': 'horoscope19.p.rapidapi.com'
            }
        };
        
        try {
            setActiveZodiac(zodiac);
            const response = await axios.request(options);
            console.log(response.data.data);
            setMonth(response.data.data.month);
            setChallange(response.data.data.challenging_days);
            setStandout(response.data.data.standout_days);
            setDetails(response.data.data.horoscope_data);
            setHoroscope(true);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => setLoading(false), 2000);  // Stop loading after 2 seconds
        }
    };

    return (
        <div className='dark bg-black w-full h-full min-h-screen p-4 h-auto  w-full relative overflow-hidden mx-auto'>
            <Preloader/>
            <Spotlight
                className="top-10 h-[1800px] w-[1800px] left-36 md:left-80 md:-top-40"
                fill="white"
            />
            <div className="content flex flex-col items-center justify center gap-8 pt-32">
                <div className="lottie">
                    <Player
                        autoplay
                        loop
                        src={Rashi}
                        style={{ height: '400px', width: '400px' }}
                    />
                </div>
                <div className="text">
                    <h1 className='text-[24px] text-white'>Find Your Monthly Horoscope!</h1>
                </div>
                <div className="form flex flex-col md:flex-row items-center justify-center gap-6 text-[15px]">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-[10px] text-white bg-black w-40 p-2 gap-4 border-2 border-white mb-4"
                        placeholder="Your Name"
                    />
                    <select
                        value={zodiac}
                        onChange={(e) => setZodiac(e.target.value)}
                        className="border rounded-[10px] text-white bg-black w-42 p-2 gap-4 border-2 border-white mb-4"
                    >
                        <option value="" disabled>Select Zodiac Sign</option>
                        {zodiacSigns.map((sign) => (
                            <option key={sign} value={sign}>
                                {sign}
                            </option>
                        ))}
                    </select>
                    <div className="btn mb-4">
                        <button
                            onClick={findHoroscope}
                            className="relative inline-flex items-center justify-center inline-block px-5 py-3 overflow-hidden font-bold rounded-full group w-32"
                        >
                            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                            <span className="relative w-full text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                                Find
                            </span>
                            <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                        </button>
                    </div>
                </div>
                <div className="zodiac-details w-[90%] flex items-center justify-center">
                    {loading ? (  // Display loader when loading is true
                        <Player
                            autoplay
                            loop
                            src={LoaderAnimation}  // Your loader animation JSON file
                            style={{ height: '200px', width: '200px' }}
                        />
                    ) : (
                        horoscope && (
                            <div className="text-white mt-4 border border-[5px] rounded-[25px] p-4 w-[100%] md:w-[90%]">
                                <div className="up flex flex-col md:flex-row items-center justify-center gap-8">
                                    <div className="right md:hidden">
                                        <img src="https://res.cloudinary.com/djyxyaqno/image/upload/v1725353988/WhatsApp_Image_2024-09-03_at_2.28.18_PM_dttxpz.jpg" 
                                            className='w-[300px] h-[300px]'
                                            alt="" />
                                    </div>
                                    <div className="left">
                                        <h1 className='text-[24px] text-white'>Hi {name}, Here is Your Monthly Horoscope!</h1>
                                        <br />
                                        <h2 className="text-2xl font-bold mb-2">{activeZodiac} - {month}</h2>
                                        <br />
                                        <p><strong>Challenging Days:</strong> {challange}</p>
                                        <br />
                                        <p><strong>Standout Days:</strong> {standout}</p>
                                        <br />
                                    </div>
                                    <div className="right m-auto mr-6 hidden md:block">
                                        <img src="https://res.cloudinary.com/djyxyaqno/image/upload/v1725353988/WhatsApp_Image_2024-09-03_at_2.28.18_PM_dttxpz.jpg" 
                                            className='w-[300px] h-[300px]'
                                            alt="" />
                                    </div>
                                </div>
                                <p><strong>Other Details:</strong></p>
                                <p className="whitespace-pre-line">{details}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Pricing/>
        </div>
    );
};

export default Page;
