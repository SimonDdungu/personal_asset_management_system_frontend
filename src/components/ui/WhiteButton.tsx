import React from 'react'
import Link from 'next/link'
import { ButtonProps } from '@/src/interfaces/ui/button_interfaces';


const WhiteButton = ({label, width, height, link, onClick, button, icon: Icon, iconSize = 15}: ButtonProps) => {
    const className = `text-xs sm:text-sm px-4 py-1 outline rounded-lg bg-white text-gray-800 ${width || ""} ${height || ""} hover:bg-gray-100 transition-colors cursor-pointer duration-150 flex gap-x-1 items-center`;
  return (
    <>
         <>
        {link ?
            <Link href={link} onClick={onClick} className={className}>
              {Icon && <Icon size={iconSize} />}
              {label ?? "link"}
            </Link> 
            :
            <button type={button ? "button" : "submit"} onClick={onClick} className={className}>
              {Icon && <Icon size={iconSize} />}
              {label ?? "button"}
            </button> 
        }
    </>
    </>
  )
}

export default WhiteButton