"use client"
import DonutChart from '@/src/components/ui/charts/DonutChart'
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import { useGetPhysicalTopAssetCategories } from '@/src/hooks/assets/useAssets'
import { TOP_CATEGORIES_TYPES } from '@/src/shared/types/top-categories-types'
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store'

const TopPhysicalAssetCategories = () => {
  const selectedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
  const { data, isLoading } = useGetPhysicalTopAssetCategories()
  const selectedCategories: TOP_CATEGORIES_TYPES[] = data?.[selectedBaseCurrency] ?? []

  return (
    <div className='bg-white min-w-80 shadow rounded-lg p-4 cursor-default'>
      <div className='mb-3 pb-2 border-b'>
        <h5 className='text-sm font-medium'>Top Categories</h5>
        <span className='text-xs text-gray-700'>Physical asset categories with the highest value</span>
      </div>
      <div className='flex flex-col gap-y-2 text-sm divide-y min-h-69 relative'>
        {isLoading
          ? <FullScreenLoadingSpinner />
          : selectedCategories.length > 0
            ? <DonutChart data={selectedCategories} labelKey='category' valueKey='total' centerLabel={`Total (${selectedBaseCurrency})`}/>
            : <div className='flex items-center justify-center h-full'><p>Nothing to show yet.</p></div>
        }
      </div>
    </div>
  )
}

export default TopPhysicalAssetCategories
