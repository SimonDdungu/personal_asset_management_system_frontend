"use client"
import AssetPopOver from '@/src/components/ui/pop_over/AssetPopOver'
import { CollectiblesValuablesSearchResponse } from '@/src/interfaces/asset_properties/physical/collectiblesValuablesTypes'
import { CalendarDays, Gem, Hash, ImageOff, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const CollectiblesCard = ({id, assetName, image, currency, currentValue, creator, serialNumber, material, year}: CollectiblesValuablesSearchResponse) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)
    const basePath = "/assets/physical/collectibles";

  return (
    <div key={id} className='w-80 relative rounded-lg overflow-hidden border border-gray-300 bg-white hover:shadow transition-shadow duration-150 cursor-pointer'>
        <AssetPopOver basePath={basePath} id={id} assetName={assetName} />

        <div className={`relative w-full h-80 bg-gray-900/50 ${image && !imageLoaded ? "animate-pulse [animation-duration:1s]" : ""}`}>
            {image ?
              <Image src={image.imageUrl} alt={assetName} fill className={`object-cover ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-200`} unoptimized onLoad={() => setImageLoaded(true)}/>
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
          <Link href={`${basePath}/${id}`} className='mb-2 text-sm hover:underline text-wrap'>{assetName}</Link>

          {(creator || serialNumber || material || typeof year === "number") &&
            <div className='flex flex-row flex-wrap gap-x-5 text-sm mb-1 border-b pb-1'>
              {creator && <div className='flex gap-x-1 items-center'><UserRound size={15}/><span>{creator}</span></div>}
              {serialNumber && <div className='flex gap-x-1 items-center'><Hash size={15}/><span>{serialNumber}</span></div>}
              {material && <div className='flex gap-x-1 items-center'><Gem size={15}/><span>{material}</span></div>}
              {typeof year === "number" && <div className='flex gap-x-1 items-center'><CalendarDays size={15}/><span>{year}</span></div>}
            </div>
          }

          <div className='flex items-center justify-between text-sm pt-1'>
            <span className='text-gray-700'>current value</span>
            <span>{currency} {currentValue.toLocaleString("en-US", {maximumFractionDigits: 2})}</span>
          </div>
        </div>
    </div>
  )
}

export default CollectiblesCard
