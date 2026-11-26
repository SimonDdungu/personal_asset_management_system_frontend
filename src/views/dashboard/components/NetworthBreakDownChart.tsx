"use client"
import { useGetTopAssetCategories } from '@/src/hooks/assets/useAssets';
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store';
import React from 'react'
import { TOP_CATEGORIES_TYPES } from '../../../shared/types/top-categories-types';
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import DonutChart from '@/src/components/ui/charts/DonutChart';
import { useGetTotalFinancialAssetValue, useGetTotalPhysicalAssetValue } from '@/src/hooks/dashboard/useDashboard';

interface BreakdownProps {
    data: {type: string, value: number}[];
    isLoading: boolean;
    assetCount: number;
}
const NetworthBreakdownChart = ({data, isLoading, assetCount}: BreakdownProps) => {

  return (
    <div className='bg-white min-w-80 shadow rounded-lg p-4 cursor-default'>
        <div className='mb-3 pb-2 border-b'>
            <h5 className='text-sm font-medium'>Portfolio Breakdown</h5>
            <span className='text-xs text-gray-700'>A breakdown of portfolio distrubution</span>
        </div>
        <div className='flex flex-col gap-y-2 text-sm divide-y min-h-69 relative'>
           {isLoading ? 
                <FullScreenLoadingSpinner />
                :
                (data.length > 0 ? 
                    <DonutChart data={data} labelKey='type' valueKey='value' centerLabel='Total Assets' centerValue={assetCount}/>
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

export default NetworthBreakdownChart