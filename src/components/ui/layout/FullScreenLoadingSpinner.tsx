import React from 'react'
import { ClipLoader } from "react-spinners";

interface LoadingProps {
  bg_color?: string,
  label?: string,
  label_color?: string
}
const FullScreenLoadingSpinner = ({bg_color, label, label_color}: LoadingProps) => {
  return (
    <div className={`flex flex-col gap-y-1 items-center justify-center absolute rounded-lg z-1000 top-0 bottom-0 left-0 right-0 w-full h-full ${bg_color ?? ""} pointer-events-none`}>
        <ClipLoader size={40} color="#2563eb"/>
        {label && <p className={`text-sm ${label_color ?? "text-white"} animate-pulse`}>{label}</p>}
    </div>
  )
}

export default FullScreenLoadingSpinner