"use client"
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
    setDate(new Date());
    }, []);


    const time = date?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    });

    const today = date?.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    });

  return (
    <nav className='bg-white py-3 px-5 border-b border-gray-300'>
        <div className='flex justify-center items-center'>

            <div className='text-sm flex justify-center items-center text-gray-600 mx-auto'>
                <span className='font-medium'>{time ?? ""}</span>
                <span className='mx-1'>{" | "}</span>
                <span>{today ?? ""}</span>
            </div>

            <div className='flex gap-x-1 items-center text-xs text-gray-600 rounded-2xl bg-gray-100 pr-3 cursor-pointer'>
                <div className='p-2 rounded-full bg-gray-300 text-blue-600 overflow-hidden'>SC</div>
                <span>Simon Chainbers</span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar