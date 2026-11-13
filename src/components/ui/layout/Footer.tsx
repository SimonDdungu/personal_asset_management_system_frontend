import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-auto bg-black py-5 px-5 xl:px-10 flex items-center justify-end'>
        <Link href="mailto:dev.simonddungu@gmail.com" className='flex items-center gap-x-2 group'>
            <Mail className='text-white'/>
            <span className='text-gray-200 text-sm group-hover:underline'>dev.simonddungu@gmail.com</span>
        </Link>
    </div>
  )
}

export default Footer