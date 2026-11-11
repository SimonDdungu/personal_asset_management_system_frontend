"use client"
import { ImageOff } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

type AssetImage = {
  imageUrl: string;
  isPrimary: boolean;
};

interface AssetCoverImagesProps {
    assetImages?: AssetImage[];
    assetName?: string;
    caption?: string;
}

const AssetCoverImages = ({assetImages = [], assetName, caption}: AssetCoverImagesProps) => {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    
    // primary image appears first
    const images = assetImages.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));

    useEffect(() => {
        if (images?.length) setSelectedImage(images[0]);
    }, [images]);

  return (
        <div className='mb-5 bg-white border pb-5 rounded-xl overflow-hidden '>
            {/* preview */}
            <div className='w-full h-120 flex items-center justify-center overflow-hidden relative bg-black/90 mb-4'>
                {selectedImage ? <Image src={selectedImage.imageUrl} alt={selectedImage.caption ?? assetName} fill className='object-contain' unoptimized />
                :
                <div className='text-white flex flex-col gap-y-2 items-center justify-center'>
                    <ImageOff size={50} />
                    <p className=' text-center'>No image available</p>
                </div>
                }
            </div>

            
            {/* Actual images */}
            <div className='flex items-center gap-x-10 h-50 px-5'>
                {images?.length > 0 ? 
                (images?.map((pic: any) => (
                    <div key={pic.imageUrl} onClick={() => setSelectedImage(pic)} className={`cursor-pointer rounded-lg overflow-hidden w-50 h-full relative ${selectedImage?.imageUrl === pic.imageUrl ? "ring-1 ring-blue-600" : ""}`}>
                        <div className='absolute bg-black/20 top-0 left-0 right-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity z-5'></div>
                        <Image src={pic?.imageUrl} alt={pic?.caption ?? assetName} fill className='object-cover' unoptimized/>
                    </div>
                )))
                :
                    <p className='text-gray-700 mx-auto'>No images available</p>
                }
            </div>

            {caption && 
                <div className='px-5 mt-8'>
                    <p className='text-gray-700 text-xs'>Caption</p>
                    <p>{caption ?? "testing"}</p>
                </div>
            }

        </div>
  )
}

export default AssetCoverImages