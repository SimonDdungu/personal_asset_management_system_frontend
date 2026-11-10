"use client"
import { useGetElectronicAsset } from '@/src/hooks/electronics/useElectronics';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface ElectronicDetailViewProps {
    id: string
}

const ElectronicDetailView = ({id}: ElectronicDetailViewProps) => {
    const { data, isLoading, isError, error } = useGetElectronicAsset(id);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // primary image appears first
    const images = data?.images?.[0]?.images?.sort((a: any, b: any) => Number(b.isPrimary) - Number(a.isPrimary));

    useEffect(() => {
        if (images?.length) setSelectedImage(images[0]);
    }, [images]);


    console.log("this asset: ", data)
    console.log(data?.images?.images);

  return (
    <section className='px-10 py-5'>
        <div className='mb-5'>
            <h1 className='text-xl'>{data?.assetName ?? ""}</h1>
        </div>

        <div>
            <div>
                <div>
                    {/* preview */}
                    <div className='w-full h-120 rounded-lg overflow-hidden relative bg-black/90 mb-4'>
                        {selectedImage && <Image src={selectedImage.imageUrl} alt={selectedImage.caption ?? data.assetName} fill className='object-scale-down' unoptimized />}
                    </div>
                    {/* Actual images */}
                    <div className='flex gap-x-10 items-center'>
                         {images?.map((pic: any) => (
                            <div key={pic.imageUrl} onClick={() => setSelectedImage(pic)} className='cursor-pointer rounded-lg overflow-hidden w-50 h-50 relative'>
                                <div className='absolute bg-black/20 top-0 left-0 right-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity z-5'></div>
                                <Image src={pic?.imageUrl} alt={pic?.caption ?? data.assetName} fill className='object-cover' unoptimized/>
                            </div>
                          ))}
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                        <span className='text-sm text-gray-700'>Current value</span>
                        <p>{data?.currency} {data?.currentValue}</p>
                </div>

                <div className='bg-white rounded-lg pt-2 pb-4 px-3 text-sm'>
                   <h1 className='border-b pb-1 mb-1 text-base'>Asset Info</h1>
                   <div className='grid grid-cols-2 gap-x-5 gap-y-2'>
                        <div className='flex gap-x-2'>
                            <span>Name: </span> <span>{data?.assetName ?? ""}</span>
                        </div>
                        <div className='flex gap-x-2'>
                            <span>Brand: </span> <span>{data?.brand ?? ""}</span>
                        </div>
                        <div className='flex gap-x-2'>
                            <span>Model: </span> <span>{data?.model ?? ""}</span>
                        </div>
                        <div className='flex gap-x-2'>
                            <span>Color: </span> <span>{data?.color ?? ""}</span>
                        </div>
                        <div className='flex gap-x-2'>
                            <span>Serial number: </span> <span>{data?.serialNumber ?? ""}</span>
                        </div>
                        <div className='flex gap-x-2'>
                            <span>Year: </span> <span>{data?.year ?? ""}</span>
                        </div>
                    </div> 

                    <div>

                    </div>
                </div>

                <div className='bg-white rounded-lg pt-2 pb-4 px-3'>
                    <h1 className='border-b pb-1 mb-1'>Description</h1>
                    <p>
                        {data?.description}
                    </p>
                </div>
            </div>

            <div>
                Grid 2
            </div>
        </div>
        
    </section>
  )
}

export default ElectronicDetailView