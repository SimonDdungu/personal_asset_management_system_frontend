"use client"
import { useGetTotalNetworth, useGetTotalFinancialAssetValue } from '@/src/hooks/dashboard/useDashboard'
import { useGetFinancialAssetsAverage, useGetTotalFinancialAssetCount } from '@/src/hooks/assets/useAssets'
import { Total_Average_Type } from '@/src/shared/types/total-average-type'
import { Total_Networth_Type } from '@/src/shared/types/total-networth-type'
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store'
import FinancialDashboardHeading from './components/FinancialDashboardHeading'
import FinancialKPICards from './components/FinancialKPICards'
import TopFinancialAssetCategories from './components/TopFinancialAssetCategories'
import LargestFinancialAssets from './components/LargestFinancialAssets'
import FinancialCategoriesCount from './components/FinancialCategoriesCount'

const FinancialDashboard = () => {
  const selectedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
  const { data: totalNetworthData, isLoading: isTotalNetworthLoading } = useGetTotalNetworth()
  const { data: totalFinancialValue, isLoading: isFinancialValueLoading } = useGetTotalFinancialAssetValue()
  const { data: totalFinancialAssetCount, isLoading: isFinancialAssetCountLoading } = useGetTotalFinancialAssetCount()
  const { data: financialAssetsAverage, isLoading: isFinancialAverageLoading } = useGetFinancialAssetsAverage()

  const selectedNetworth = totalNetworthData?.find(
    (item: Total_Networth_Type) => item.currency === selectedBaseCurrency
  )
  const selectedFinancialValue = totalFinancialValue?.find(
    (item: Total_Networth_Type) => item.currency === selectedBaseCurrency
  )
  const selectedAverageValue = financialAssetsAverage?.find(
    (item: Total_Average_Type) => item.currency === selectedBaseCurrency
  )

  const financialValue = selectedFinancialValue?.total ?? 0
  const totalNetworth = selectedNetworth?.total ?? 0
  const averageValue = selectedAverageValue?.average ?? 0
  const portfolioShare = totalNetworth > 0 ? (financialValue / totalNetworth) * 100 : 0

  return (
    <div className='px-20 pt-10 pb-20 bg-gray-100'>
      <div className='flex flex-col gap-y-5'>
        <FinancialDashboardHeading />
        <FinancialKPICards
          totalValue={financialValue}
          assetCount={totalFinancialAssetCount ?? 0}
          averageValue={averageValue}
          portfolioShare={portfolioShare}
          currency={selectedBaseCurrency}
          isTotalValueLoading={isFinancialValueLoading}
          isAssetCountLoading={isFinancialAssetCountLoading}
          isAverageLoading={isFinancialAverageLoading}
          isPortfolioShareLoading={isFinancialValueLoading || isTotalNetworthLoading}
        />
        <div className='grid grid-cols-3 gap-x-5'>
          <TopFinancialAssetCategories />
          <LargestFinancialAssets />
          <FinancialCategoriesCount />
        </div>
      </div>
    </div>
  )
}

export default FinancialDashboard
