"use client"
import React, { useState } from 'react'
import WelcomeUser from './components/WelcomeUser'
import KPICards from './components/KPICards'
import TopAssetCategories from './components/TopAssetCategories'
import LargestAssets from './components/LargestAssets '
import CategoriesCount from './components/CategoriesCount'
import DonutChart from '@/src/components/ui/charts/DonutChart'
import NetworthBreakdownChart from './components/NetworthBreakDownChart'
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store'
import { useGetTotalFinancialAssetValue, useGetTotalNetworth, useGetTotalPhysicalAssetValue } from '@/src/hooks/dashboard/useDashboard'
import { useGetAssetsAverage, useGetTotalAssetCount } from '@/src/hooks/assets/useAssets'
import { Total_Networth_Type } from '@/src/shared/types/total-networth-type'
import { Total_Average_Type } from '@/src/shared/types/total-average-type'

const Dashboard = () => {
  const seletedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
  
      const { data: totalNetworthData, isLoading: totalNetworthLoading, isError: isTotalNetworthError} = useGetTotalNetworth();
      const { data: totalPhysicalValue, isLoading: totalPhysicalLoading, isError: isTotalPhysicalError} = useGetTotalPhysicalAssetValue();
      const { data: totalFinancialValue, isLoading: totalFinancialLoading, isError: isTotalFinancialError} = useGetTotalFinancialAssetValue();
      const { data: totalAssetCount, isLoading: totalAsssetCountLoading, isError: isTotalAssetCountError} = useGetTotalAssetCount();
      const { data: totalAssetAverage, isLoading: totalAssetAverageLoading, isError: isTotalAssetAverageError} = useGetAssetsAverage();

  
      const selectedNetworth: Total_Networth_Type = totalNetworthData?.find((item: Total_Networth_Type) => item.currency === seletedBaseCurrency)
      const selectedPhysicalValue: Total_Networth_Type = totalPhysicalValue?.find((item: Total_Networth_Type) => item.currency === seletedBaseCurrency)
      const selectedFinancialValue: Total_Networth_Type = totalFinancialValue?.find((item: Total_Networth_Type) => item.currency === seletedBaseCurrency)
      const selectedAverageValue: Total_Average_Type = totalAssetAverage?.find((item: Total_Average_Type) => item.currency === seletedBaseCurrency)
  
      const networth = selectedNetworth?.total ?? 0
      const baseCurrency = selectedNetworth?.currency
      const physicalValue = selectedPhysicalValue?.total ?? 0
      const financialValue = selectedFinancialValue?.total ?? 0
      const averageValue = selectedAverageValue?.average ?? 0

  const networthBreakdownData =[
    {type: "Physical Assets", value: physicalValue},
    {type: "Financial Assets", value: financialValue}
  ]

  return (
    <div className='px-20 pt-10 pb-20 bg-gray-100'>
        <div className='flex flex-col gap-y-5'>
            <WelcomeUser />
            <KPICards networth={networth} physicalValue={physicalValue} financialValue={financialValue} averageValue={averageValue}  isAverageLoading={ totalAssetAverageLoading} isNetworthLoading={totalNetworthLoading} isFinancialLoading={totalFinancialLoading} isPhysicalLoading={totalPhysicalLoading}/>

            <div className='flex flex-row gap-x-3 min-h-100 text-sm'>
              <div className='w-100 flex-1 bg-white rounded-lg shadow flex items-center justify-center p-2'>Yearly line chart of total networth</div>
              <NetworthBreakdownChart data={networthBreakdownData} isLoading={totalPhysicalLoading || totalFinancialLoading} assetCount={totalAssetCount ?? 0}/>
            </div>
            <div className='grid grid-cols-3 gap-x-5'>
              <TopAssetCategories />
              <LargestAssets />
              <CategoriesCount />
            </div>
        </div>
    </div>
  )
}

export default Dashboard