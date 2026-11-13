"use client"
import { DetailViewLayout } from '@/src/components/ui';
import { useGetElectronicAsset } from '@/src/hooks/electronics/useElectronics';
import { useState } from 'react';

interface ElectronicDetailViewProps {
    id: string
}

const ElectronicDetailView = ({id}: ElectronicDetailViewProps) => {

    const { data, isLoading, isError, error } = useGetElectronicAsset(id);

    const images = data?.images?.[0]?.images
    const imageCaption = data?.images?.[0]?.caption

    const documents = data?.documents?.[0]?.documents
    const documentCaption = data?.documents?.[0]?.caption

  return (
    <DetailViewLayout assetCategory='Electronic Asset' assetName={data?.assetName} assetImages={images} imageCaption={imageCaption} assetDocuments={documents} documentCaption={documentCaption} currentCurrency={data?.currency} 
    currentValue={data?.currentValue} createdAt={data?.createdAt} updatedAt={data?.updatedAt}>
    
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-[max-content_max-content_max-content] xl:grid-cols-[max-content_max-content_max-content_max-content_max-content] gap-x-5 sm:gap-x-10 gap-y-3 border-b pb-5 mb-3'>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Brand </span> <span>{data?.brand ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Model </span> <span>{data?.model ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Color </span> <span>{data?.color ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Serial number </span> <span>{data?.serialNumber ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Year </span> <span>{data?.year ?? "N/A"}</span>
                </div>
            </div>     
        </div>
        
    </DetailViewLayout>
  )
}

export default ElectronicDetailView