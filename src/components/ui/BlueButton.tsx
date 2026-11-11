import React from 'react'
import Link from 'next/link'
import { ButtonProps } from '@/src/interfaces/ui/button_interfaces';


const BlueButton = ({label, width, height, link, onClick, button, icon: Icon, iconSize = 15}: ButtonProps) => {
    const className = `text-xs sm:text-sm px-4 py-1 rounded-lg bg-blue-600 text-white ${width || ""} ${height || ""} hover:bg-blue-700 transition-colors cursor-pointer duration-150 flex gap-x-1 items-center`;
  return (
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
  )
}

export default BlueButton