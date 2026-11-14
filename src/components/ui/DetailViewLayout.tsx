"use client"
import React, { ReactNode, useState } from 'react'
import { AssetCoverImages, AssetDocuments, BlueButton, WhiteButton } from '.';
import Footer from './layout/Footer';
import { PencilIcon } from 'lucide-react';
import { formatDateTime } from '@/src/util/formatDateTime';

interface DetailViewLayoutProps {
    assetCategory?: string,
    assetName: string,
    description?: string,
    assetLabel?: string,
    assetImages?: any,
    assetDocuments?: any,
    documentCaption?: string,
    imageCaption?: string,
    currentCurrency: string,
    currentValue: number,
    createdAt: string,
    updatedAt: string,
    children: ReactNode,
    currentValueUpdatedAt: string,
}
const DetailViewLayout = ({assetCategory, assetName, assetImages, assetLabel, imageCaption, children, currentCurrency, currentValue, updatedAt, createdAt, description, assetDocuments, 
    documentCaption, currentValueUpdatedAt}: DetailViewLayoutProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    
  return (
    <section>
        <div className='box-border px-10 pt-10 pb-20'>
            <div className='mb-5'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl'>{assetCategory ?? "Asset"}</h1>
                    <div className='flex flex-row items-center gap-x-3'>
                        {editMode && <WhiteButton label='Cancel' onClick={() => setEditMode(!editMode)}/>}
                        {editMode ?  <BlueButton label='Save' onClick={() => setEditMode(!editMode)}/> :  <BlueButton label='Edit' onClick={() => setEditMode(!editMode)} icon={PencilIcon}/>}
                    </div>
                </div>
            </div>

            <AssetCoverImages assetImages={assetImages ?? []} assetName={assetName} caption={imageCaption}/>

                <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                    <div className='pb-5 border-b'>
                        <span className='text-xs text-gray-700'>{assetLabel}</span>
                        <h1 className='text-2xl font-medium'>{assetName ?? ""}</h1>
                        <span className='text-xs text-gray-700'>last updated on {formatDateTime(currentValueUpdatedAt)}</span>
                    </div>

                    <div className='py-5 border-b'>
                        <span className='text-xs text-gray-700'>Current value</span>
                        <p className='text-xl font-medium'>{currentCurrency} {currentValue?.toLocaleString("en-US", {maximumFractionDigits: 2})}</p>
                    </div>

                    <div className='py-5 border-b'>
                        <h5 className='mb-4'>Asset Information</h5>
                    
                        {children}

                        <div className=''>
                            <h1 className='mb-2'>Description</h1>
                            <p className='text-gray-700'>
                                {description ?? "No description available"}
                            </p>
                        </div>
                    </div>

                    <div className='pt-5 space-y-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Created on</span> <span>{createdAt ? formatDateTime(createdAt) : "No data"}</span>
                        </div>

                            <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Updated on</span> <span>{updatedAt ? formatDateTime(updatedAt) : "No data"}</span>
                        </div>
                    </div>
                </div>

                <AssetDocuments assetDocuments={assetDocuments ?? []} caption={documentCaption} />

        </div>

    </section>
  )
}

export default DetailViewLayout