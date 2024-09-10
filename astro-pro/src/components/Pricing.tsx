"use client"
import React from 'react'
import { pricingData } from '@/data/Pricing_data'
import { Spotlight } from './ui/Spotlight'
const Pricing = () => {
  return (
    <div className='h-auto  w-full relative overflow-hidden mx-auto'>
      <div className='dark bg-black w-full h-full min-h-screen max-w-screen overflow-hidden p-8 pt-32 text-white flex flex-col items-center justfy-center'>
           
      <h1 className="text-center text-3xl font-bold my-8">Our Premium Plans</h1>
      <div className="flex flex-wrap items-center justify-center  gap-8 w-[90%] ">
        {pricingData.map((plan, index) => (
          <div 
          key={index} 
          className={`pricing-card border p-4 md:p-8 rounded-[20px] shadow-lg transition-transform transform hover:scale-105 
            ${plan.price === "$99" ? 'border-2 hover:border-4 border-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'border-2 hover:shadow-[0_0_10px_rgba(34,197,94,0.4)]'}`}
        >
            <h2 className="text-2xl font-semibold mb-4">{plan.title}</h2>
            <p className="text-lg mb-4">{plan.description}</p>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>
            <ul className="mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2 text-[15px]">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="">
            <div className="button p-4">
        <a target='_blank' href="https://rzp.io/i/qQR9wXd" className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
<span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
<span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
<span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Buy Now</span>
<span className="absolute inset-0 border-2 border-white rounded-full"></span>
</a>
        </div>
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Pricing
