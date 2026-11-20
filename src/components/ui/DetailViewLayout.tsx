"use client"
import React, { ReactNode, useState } from 'react'
import { AssetCoverImages, AssetDocuments, BlueButton, WhiteButton } from '.';
import Footer from './layout/Footer';
import { PencilIcon, Trash2 } from 'lucide-react';
import { formatDateTime } from '@/src/util/formatDateTime';
import { useDeleteAsset } from '@/src/hooks/assets/useAssets';

interface DetailViewLayoutProps {
    assetId: string,
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
    editLink: string,
}
const DetailViewLayout = ({assetCategory, assetName, assetImages, assetLabel, children, currentCurrency, currentValue, updatedAt, createdAt, description, assetDocuments, 
    currentValueUpdatedAt, assetId, editLink}: DetailViewLayoutProps) => {
    const { mutateAsync: deleteAsset, isPending: isDeleting } = useDeleteAsset();
        
        const handleDelete = async (id: string) => {
          try {
            await deleteAsset({ id });
          } catch (error) {
            console.error("Failed to delete asset:", error);
          }
        };
    
  return (
    <section>
        <div className='box-border px-10 pt-10 pb-20'>
            <div className='mb-5'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl'>{assetCategory ?? "Asset"}</h1>
                    <div className='flex flex-row items-center gap-x-3'>
                       <BlueButton link={`/${editLink}/${assetId}/edit`} label='Edit' icon={PencilIcon}/>
                       <WhiteButton disabled={isDeleting} textColor='text-red-600' label='Delete' onClick={() => handleDelete(assetId)} icon={Trash2}/>
                    </div>
                </div>
            </div>

            <AssetCoverImages assetImages={assetImages ?? []} assetName={assetName} />

                <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                    <div className='pb-5 border-b'>
                        <span className='text-xs text-gray-700'>{assetLabel}</span>
                        <h1 className='text-2xl font-medium'>{assetName ?? ""}</h1>
                    </div>

                    <div className='py-5 border-b'>
                        <span className='text-xs text-gray-700'>Current value</span>
                        <p className='text-xl font-medium'>{currentCurrency} {currentValue?.toLocaleString("en-US", {maximumFractionDigits: 2})}</p>
                        <span className='text-xs text-gray-700'>last updated on {formatDateTime(currentValueUpdatedAt)}</span>
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

                <AssetDocuments assetDocuments={assetDocuments ?? []} />

        </div>

    </section>
  )
}

export default DetailViewLayout