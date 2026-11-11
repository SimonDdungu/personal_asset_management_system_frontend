"use client"
import AssetCoverImages from '@/src/components/ui/AssetCoverImages';
import AssetDocuments from '@/src/components/ui/AssetDocuments';
import BlueButton from '@/src/components/ui/BlueButton';
import WhiteButton from '@/src/components/ui/WhiteButton';
import { useGetElectronicAsset } from '@/src/hooks/electronics/useElectronics';
import { formatDateTime } from '@/src/util/formatDateTime';
import { ImageOff, PencilIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface ElectronicDetailViewProps {
    id: string
}

const ElectronicDetailView = ({id}: ElectronicDetailViewProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const { data, isLoading, isError, error } = useGetElectronicAsset(id);

    const images = data?.images?.[0]?.images
    const imageCaption = data?.images?.[0]?.caption

    const documents = data?.documents?.[0]?.documents
    const documentCaption = data?.documents?.[0]?.caption

  return (
    <section className='px-10 py-5'>
        <div className='mb-5'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl'>Electronic Asset</h1>
                <div className='flex flex-row items-center gap-x-3'>
                    {editMode && <WhiteButton label='Cancel' onClick={() => setEditMode(!editMode)}/>}
                    {editMode ?  <BlueButton label='Save' onClick={() => setEditMode(!editMode)}/> :  <BlueButton label='Edit' onClick={() => setEditMode(!editMode)} icon={PencilIcon}/>}
                   
                </div>
            </div>
        </div>

        <div>
            <div>
                <AssetCoverImages assetImages={images ?? []} assetName={data?.assetName} caption={imageCaption}/>

                <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                    <div className='pb-5 border-b'>
                        <h1 className='text-2xl font-medium'>{data?.assetName ?? ""}</h1>
                    </div>

                    <div className='py-5 border-b'>
                        <span className='text-xs text-gray-700'>Current value</span>
                        <p className='text-xl font-medium'>{data?.currency} {data?.currentValue.toLocaleString("en-US", {maximumFractionDigits: 2})}</p>
                    </div>

                    <div className='py-5 border-b'>
                        <h5 className='mb-4'>Asset Information</h5>

                        <div className='grid grid-cols-2 gap-x-5 gap-y-3 border-b pb-5 mb-3'>
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Name </span> <span>{data?.assetName ?? ""}</span>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Brand </span> <span>{data?.brand ?? ""}</span>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Model </span> <span>{data?.model ?? ""}</span>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Color </span> <span>{data?.color ?? ""}</span>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Serial number </span> <span>{data?.serialNumber ?? ""}</span>
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Year </span> <span>{data?.year ?? ""}</span>
                            </div>
                        </div> 

                        <div className=''>
                            <h1 className='mb-2'>Description</h1>
                            <p className='text-gray-700'>
                                {data?.description ?? "No description available"}
                            </p>
                        </div>
                    </div>

                     <div className='pt-5 space-y-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Created at</span> <span>{data?.createdAt ? formatDateTime(data.createdAt) : "No data"}</span>
                        </div>

                         <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Updated at</span> <span>{data?.updatedAt ? formatDateTime(data.updatedAt) : "No data"}</span>
                        </div>
                    </div>
                </div>

                
            </div>

             <AssetDocuments assetDocuments={documents ?? []} caption={documentCaption} />
        </div>
        
    </section>
  )
}

export default ElectronicDetailView