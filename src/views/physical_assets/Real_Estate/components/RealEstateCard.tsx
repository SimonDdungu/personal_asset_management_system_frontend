"use client"
import { BathIcon, Bed, Ellipsis, ImageOff, SquareDimensions } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface RealEstateCardProps {
    id: string,
    assetId: string,
    assetName: string,
    image: string | null,
    currency: string,
    currentValue: number,
    noBedrooms?: number,
    noBathrooms?: number,
    propertySize?: number,
    propertySizeUnit?: string
    address: string
}
const RealEstateCard = ({id, assetId, assetName, image, currency, currentValue, address, noBathrooms, noBedrooms, propertySize, propertySizeUnit}: RealEstateCardProps) => {
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
          <p className='text-xs text-gray-700'>{address}</p>
          <Link href={`/assets/realestate/${id}`} className='mb-2 text-sm hover:underline text-wrap block'>{assetName}</Link>

          <div className='flex flex-row flex-wrap gap-x-5 text-sm mb-1 border-b pb-1'>
            {noBedrooms && 
            <div className='flex gap-x-1 items-center'>
              <Bed size={15}/>
              <span>{noBedrooms}</span>
            </div>}

           {noBathrooms && 
           <div className='flex gap-x-1 items-center'>
              <BathIcon size={15}/>
              <span>{noBathrooms}</span>
            </div>}

            {propertySize && 
            <div className='flex flex-nowrap gap-x-1 items-center'>
              <SquareDimensions size={15}/>
              <span>{propertySize} {propertySizeUnit ?? ""}</span>
            </div>}
            
          </div>

          <div className='flex items-center justify-between text-sm pt-1'>
            <span className='text-gray-700'>current value</span> 
            <span>{currency} {currentValue.toLocaleString("en-US", {maximumFractionDigits: 2})}</span> 
          </div>
          
        </div>

    </div>
  )
}

export default RealEstateCard