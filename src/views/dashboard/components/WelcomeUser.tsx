"use client"
import { BlueButton } from '@/src/components/ui';
import { useAuth } from '@/src/context/auth/AuthContext';
import { getGreeting } from '@/src/util/date_time/getGreetings';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const WelcomeUser = () => {
    const [now, setNow] = useState<Date>();
    const {user, isLoading} = useAuth();
    
    useEffect(() => {
        setNow(new Date())
    }, []);

    const greeting = now && getGreeting(now);

  return (
    <div>
        <div className='flex items-center justify-between gap-x-5'>
            <div>
                <div className='text-2xl font-bold tracking-tight md:text-3xl flex gap-x-2 mb-2'>
                    Good {greeting ? `${greeting},` : <div className='h-9.5 w-50 rounded-md bg-gray-200 animate-pulse'></div>} {!isLoading ? <span className='capitalize'>{user ? `${user.firstName}.` : ""}</span> : <div className='h-9.5 w-38 rounded-md bg-gray-200 animate-pulse'></div>}
                </div>
                <p className='text-gray-700 text-sm'>Here's how your portfolio is performing.</p>
            </div>

            <div>
                <BlueButton link='/assets/add' label='Add asset' icon={Plus} padding='py-2'/>
            </div>
        </div>

    </div>
  )
}

export default WelcomeUser