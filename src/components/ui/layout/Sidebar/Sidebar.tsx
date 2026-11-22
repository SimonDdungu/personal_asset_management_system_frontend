"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from './navLinks'
import RedButton from '../../buttons/RedButton';
import { useAuth } from '@/src/context/auth/AuthContext';
import FullScreenLoadingSpinner from '../../loading_state/FullScreenLoadingSpinner';

const Sidebar = () => {
  const { logout, isLoggingOut } = useAuth();

  const pathname = usePathname();

  return (
    <aside className="w-50 h-full bg-white border-r border-gray-200 py-5 px-2 flex flex-col overflow-y-auto scrollbar-hide">
      {isLoggingOut && <FullScreenLoadingSpinner bg_color='bg-black/50'/>}
       <h1 className="text-lg font-medium text-gray-900 mb-5">
        Accretion AMS
      </h1>


      <nav className="space-y-2 mb-5">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition ${active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className='mt-auto'>
        <RedButton label='Logout' width="w-full" justify="justify-center" padding="py-2" onClick={logout} disabled={isLoggingOut}/>
      </div>
    </aside>
  )
}

export default Sidebar