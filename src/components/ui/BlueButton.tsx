import React from 'react'
import Link from 'next/link'

interface BlueButton {
    label: string,
    width?: string,
    height?: string,
    link?: string,
    onClick?: (value?: any) => void,
    button?: boolean
}

const BlueButton = ({label, width, height, link, onClick, button}: BlueButton) => {
    const className = `text-xs sm:text-sm px-4 py-1 rounded-lg bg-blue-600 text-white ${width || ""} ${height || ""} hover:bg-blue-700 transition-colors cursor-pointer duration-150`;
  return (
    <>
        {link ?
            <Link href={link} onClick={onClick} className={className}>{label ?? "link"}</Link> 
            :
            <button type={button ? "button" : "submit"} onClick={onClick} className={className}>{label ?? "button"}</button> 
        }
    </>
  )
}

export default BlueButton