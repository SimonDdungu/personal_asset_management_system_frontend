"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from './navLinks'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-50 min-h-screen bg-white border-r border-gray-200 py-5 px-2">
       <h1 className="text-lg font-medium text-gray-900 mb-5">
        Accretion AMS
      </h1>

      <nav className="space-y-2">
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
    </aside>
  )
}

export default Sidebar