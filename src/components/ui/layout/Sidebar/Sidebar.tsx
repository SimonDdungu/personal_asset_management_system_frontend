"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from './navLinks'
import RedButton from '../../buttons/RedButton';
import { useAuth } from '@/src/context/auth/AuthContext';
import FullScreenLoadingSpinner from '../../loading_state/FullScreenLoadingSpinner';
import { ChevronDown } from 'lucide-react';

const Sidebar = () => {
  const { logout, isLoggingOut } = useAuth();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const pathname = usePathname();

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => prev.includes(name) ? prev.filter((menu) => menu !== name) : [...prev, name]);
  };

  return (
    <aside className="w-55 h-full bg-white border-r border-gray-200 py-5 px-2 flex flex-col overflow-y-auto scrollbar-hide">
      {isLoggingOut && <FullScreenLoadingSpinner bg_color='bg-black/50'/>}
       <h1 className="text-lg font-medium text-gray-900 mb-5">
        Accretion AMS
      </h1>


     <nav className="space-y-2 mb-5">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const hasChildren = !!item.children;
        const isOpen = openMenus.includes(item.name);

        const active = hasChildren ? item.children.some((child) => pathname === child.href) : pathname === item.href;

        // Dropdown items
        if (hasChildren) {
          return (
            <div key={item.name}>
              <button type="button" onClick={() => toggleMenu(item.name)}
                className={`flex cursor-pointer w-full items-center justify-between gap-3 px-4 py-2 rounded-lg text-xs font-medium transition ${active ? "text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={20} />
                  {item.name}
                </span>

                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="ml-8 mt-2 space-y-1 border-l pl-3">
                  {item.children.map((child) => (
                    <Link key={child.name} href={child.href} className={`block px-3 py-2 rounded-lg text-xs transition ${pathname === child.href ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-500 hover:bg-gray-100"}`}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Normal links
        return (
          <Link key={item.name} href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium transition ${active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
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