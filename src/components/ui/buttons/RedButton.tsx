import React from 'react'
import Link from 'next/link'
import { ButtonProps } from '@/src/interfaces/ui/button_interfaces';


const RedButton = ({label, width, height, link, onClick, button, icon: Icon, iconSize = 15, disabled, justify, padding}: ButtonProps) => {
    const className = `text-xs sm:text-sm px-4 ${padding ?? "py-1"} rounded-lg bg-red-600 ${disabled ? "opacity-50" : "opacity-100 hover:bg-red-700 "} text-white ${width || ""} ${height || ""}  
    transition-colors ${disabled ? "cursor-not-allowed"  : "cursor-pointer"} duration-150 flex gap-x-1 items-center ${justify ?? ""}`;
  return (
    <>
        {link ?
            <Link href={link} onClick={onClick} className={className}>
              {Icon && <Icon size={iconSize} />}
              {label ?? "link"}
            </Link> 
            :
            <button disabled={disabled} type={button ? "button" : "submit"} onClick={onClick} className={className}>
              {Icon && <Icon size={iconSize} />}
              {label ?? "button"}
            </button> 
        }
    </>
  )
}

export default RedButton