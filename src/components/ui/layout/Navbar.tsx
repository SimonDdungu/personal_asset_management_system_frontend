"use client"
import { useAuth } from '@/src/context/auth/AuthContext';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const {user, isLoading} = useAuth();
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
                <span className='font-medium'>{time ?? <div className='h-5 w-14.5 rounded-md bg-gray-200 animate-pulse'></div>}</span>
                <span className='mx-1'>{" | "}</span>
                <span>{today ?? <div className='h-5 w-29.5 rounded-md bg-gray-200 animate-pulse'></div>}</span>
            </div>

            <div className='flex gap-x-1 items-center text-xs text-gray-600 rounded-2xl bg-gray-100 pr-3 cursor-pointer'>
                <div className={`size-8 rounded-full bg-gray-200 text-blue-600 overflow-hidden uppercase flex items-center justify-center ${isLoading ? "animate-pulse" : ""}`}><div className='max-w'>{user?.firstName?.[0]}{user?.lastName?.[0]}</div></div>
                <div className='min-w-24'>
                    {isLoading 
                        ? 
                        <div className='w-full h-4 rounded-lg bg-gray-200 animate-pulse' /> 
                        :
                        <span className='capitalize'>{user?.firstName} {user?.lastName}</span>
                    }
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar