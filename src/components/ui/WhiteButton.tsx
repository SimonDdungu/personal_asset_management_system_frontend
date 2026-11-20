import React from 'react'
import Link from 'next/link'
import { ButtonProps } from '@/src/interfaces/ui/button_interfaces';


const WhiteButton = ({label, width, height, link, onClick, button, icon: Icon, iconSize = 15, disabled, textColor}: ButtonProps) => {
    const className = `text-xs sm:text-sm px-4 py-1 outline outline-gray-200 rounded-lg bg-white ${disabled ? "opacity-50" : " opacity-100 hover:bg-gray-100"} ${textColor ?? "text-gray-800"} ${width || ""} ${height || ""} transition-colors ${disabled ? "cursor-not-allowed"  : "cursor-pointer"} duration-150 flex gap-x-1 items-center`;
  return (
    <>
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
    </>
  )
}

export default WhiteButton