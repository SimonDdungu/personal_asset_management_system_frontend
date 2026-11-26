"use client"
import { useGetTotalNetworth, useGetTotalPhysicalAssetValue } from '@/src/hooks/dashboard/useDashboard'
import { useGetPhysicalAssetsAverage, useGetTotalPhysicalAssetCount } from '@/src/hooks/assets/useAssets'
import { Total_Average_Type } from '@/src/shared/types/total-average-type'
import { Total_Networth_Type } from '@/src/shared/types/total-networth-type'
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store'
import PhysicalDashboardHeading from './components/PhysicalDashboardHeading'
import PhysicalKPICards from './components/PhysicalKPICards'
import TopPhysicalAssetCategories from './components/TopPhysicalAssetCategories'
import LargestPhysicalAssets from './components/LargestPhysicalAssets'
import PhysicalCategoriesCount from './components/PhysicalCategoriesCount'

const PhysicalDashboard = () => {
  const selectedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
  const { data: totalNetworthData, isLoading: isTotalNetworthLoading } = useGetTotalNetworth()
  const { data: totalPhysicalValue, isLoading: isPhysicalValueLoading } = useGetTotalPhysicalAssetValue()
  const { data: totalPhysicalAssetCount, isLoading: isPhysicalAssetCountLoading } = useGetTotalPhysicalAssetCount()
  const { data: physicalAssetsAverage, isLoading: isPhysicalAverageLoading } = useGetPhysicalAssetsAverage()

  const selectedNetworth = totalNetworthData?.find(
    (item: Total_Networth_Type) => item.currency === selectedBaseCurrency
  )
  const selectedPhysicalValue = totalPhysicalValue?.find(
    (item: Total_Networth_Type) => item.currency === selectedBaseCurrency
  )
  const selectedAverageValue = physicalAssetsAverage?.find(
    (item: Total_Average_Type) => item.currency === selectedBaseCurrency
  )

  const physicalValue = selectedPhysicalValue?.total ?? 0
  const totalNetworth = selectedNetworth?.total ?? 0
  const averageValue = selectedAverageValue?.average ?? 0
  const portfolioShare = totalNetworth > 0 ? (physicalValue / totalNetworth) * 100 : 0

  return (
    <div className='px-20 pt-10 pb-20 bg-gray-100'>
      <div className='flex flex-col gap-y-5'>
        <PhysicalDashboardHeading />
        <PhysicalKPICards
          totalValue={physicalValue}
          assetCount={totalPhysicalAssetCount ?? 0}
          averageValue={averageValue}
          portfolioShare={portfolioShare}
          currency={selectedBaseCurrency}
          isTotalValueLoading={isPhysicalValueLoading}
          isAssetCountLoading={isPhysicalAssetCountLoading}
          isAverageLoading={isPhysicalAverageLoading}
          isPortfolioShareLoading={isPhysicalValueLoading || isTotalNetworthLoading}
        />
        <div className='grid grid-cols-3 gap-x-5'>
          <TopPhysicalAssetCategories />
          <LargestPhysicalAssets />
          <PhysicalCategoriesCount />
        </div>
      </div>
    </div>
  )
}

export default PhysicalDashboard
