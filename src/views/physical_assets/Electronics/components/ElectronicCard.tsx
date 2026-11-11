"use client"
import { Ellipsis, ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ElectronicCardProps {
    id: string,
    assetId: string,
    assetName: string,
    image: string | null,
    currency: string,
    currentValue: number
}
const ElectronicCard = ({id, assetId, assetName, image, currency, currentValue}: ElectronicCardProps) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    
  return (
    <div key={id} className='w-80 relative rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-150 cursor-pointer'>

        <div className='absolute top-1 right-1 bg-blue-900/70 hover:bg-blue-900/90 transition-colors duration-200 rounded-lg z-50 p-1 cursor-pointer'>
          <Ellipsis className='text-white' />
        </div>

        <div className={`relative w-full h-80 bg-gray-900/50 ${image && !imageLoaded ? "animate-pulse [animation-duration:1s]" : ""}`}>
            {image ?
              <Image src={image} alt={assetName} fill className={`object-cover ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-200`} unoptimized onLoad={() => setImageLoaded(true)}/>
              :
              <div className='w-full h-full flex items-center justify-center text-sm text-gray-700'>
                <div>
                  <ImageOff className='mx-auto' />
                  <span>No image</span>
                </div>
              </div>
            }

        </div>

        <div className='py-4 px-3 border-t'>
          <Link href={`/assets/electronic/${id}`} className='mb-2 text-sm hover:underline text-wrap block'>{assetName}</Link>

          <div className='flex items-center justify-between text-sm'>
            <span className='text-gray-700'>current value</span> 
            <span>{currency} {currentValue.toLocaleString("en-US", {maximumFractionDigits: 2})}</span> 
          </div>
          
        </div>

    </div>
  )
}

export default ElectronicCard