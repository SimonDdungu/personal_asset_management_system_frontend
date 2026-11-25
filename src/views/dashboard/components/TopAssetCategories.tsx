"use client"
import { useGetTopAssetCategories } from '@/src/hooks/assets/useAssets';
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store';
import React from 'react'
import { TOP_CATEGORIES_TYPES } from '../../../shared/types/top-categories-types';
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import DonutChart from '@/src/components/ui/charts/DonutChart';

const TopAssetCategories = () => {
    const seletedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
    
    const { data, isLoading, isError} = useGetTopAssetCategories();
    const selectedCategories: TOP_CATEGORIES_TYPES[] = data?.[seletedBaseCurrency] ?? []

  return (
    <div className='bg-white min-w-80 shadow rounded-lg p-4 cursor-default'>
        <div className='mb-3 pb-2 border-b'>
            <h5 className='text-sm font-medium'>Top Categories</h5>
            <span className='text-xs text-gray-700'>Asset categories with the highest value</span>
        </div>
        <div className='flex flex-col gap-y-2 text-sm divide-y min-h-69 relative'>
           {isLoading ? 
                <FullScreenLoadingSpinner />
                :
                (selectedCategories.length > 0 ? 
                    <DonutChart data={selectedCategories} labelKey='category' valueKey='total' centerLabel={seletedBaseCurrency ? `Total (${seletedBaseCurrency})` : undefined}/>
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

export default TopAssetCategories


// selectedCategories.map((item: TOP_CATEGORIES_TYPES) => {
//                     const percentage = totalNetworth ? (item.total / totalNetworth) * 100 : 0
//                     return (
//                         <div key={item.category} className='pb-2'>
//                             <div className='flex items-center justify-between gap-x-3'>
//                                 <p className='capitalize'>{item.category}</p>
//                                 <p>{seletedBaseCurrency} {item.total.toLocaleString()}</p>
//                             </div>
//                             <span className='text-gray-700 text-xs'>{percentage.toLocaleString("en-us", {maximumFractionDigits: 2})}% of total net worth</span>
//                         </div>
//                     )
//                 }) 