"use client"
import { useGetLargestAssets, useGetTopAssetCategories } from '@/src/hooks/assets/useAssets';
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store';
import React from 'react'
import { TOP_CATEGORIES_TYPES } from '../../../shared/types/top-categories-types';
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import { LARGEST_ASSET_TYPES } from '../../../shared/types/largest-assets-types';


const LargestAssets = () => {
    const seletedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
    
    const { data, isLoading, isError} = useGetLargestAssets();
    const selectedLargest: LARGEST_ASSET_TYPES[] = data?.[seletedBaseCurrency] ?? []

  return (
    <div className='bg-white min-w-80 shadow rounded-lg p-4 cursor-default'>
        <div className='mb-3 pb-2 border-b'>
            <h5 className='text-sm font-medium'>Largest Assets</h5>
            <span className='text-xs text-gray-700'>Assets with the highest value</span>
        </div>
        <div className='flex flex-col gap-y-2 text-sm divide-y h-69 relative'>
           {isLoading ? 
                <FullScreenLoadingSpinner />
                :
                (selectedLargest.length > 0 ? selectedLargest.map((item: LARGEST_ASSET_TYPES) => {
                    return (
                        <div key={item.category} className='pb-2'>
                            <div className='flex items-center justify-between gap-x-3'>
                                <p className='capitalize'>{item.name}</p>
                                <p>{seletedBaseCurrency} {item.currentValue.toLocaleString()}</p>
                            </div>
                            <span className='text-gray-700 text-xs capitalize'>{item.category}</span>
                        </div>
                    )
                }) 
                :
                <div className='flex items-center justify-center h-full'>
                    <p>Nothing to show yet.</p>
                </div>
                )
            }

        </div>
    </div>
  )
}

export default LargestAssets