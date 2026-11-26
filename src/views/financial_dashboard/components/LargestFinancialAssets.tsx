"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import { useGetFinancialLargestAssets } from '@/src/hooks/assets/useAssets'
import { LARGEST_ASSET_TYPES } from '@/src/shared/types/largest-assets-types'
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store'

const LargestFinancialAssets = () => {
  const selectedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
  const { data, isLoading } = useGetFinancialLargestAssets()
  const selectedLargest: LARGEST_ASSET_TYPES[] = data?.[selectedBaseCurrency] ?? []

  return (
    <div className='bg-white min-w-80 shadow rounded-lg p-4 cursor-default'>
      <div className='mb-3 pb-2 border-b'>
        <h5 className='text-sm font-medium'>Largest Assets</h5>
        <span className='text-xs text-gray-700'>Financial assets with the highest value</span>
      </div>
      <div className='flex flex-col gap-y-2 text-sm divide-y h-69 relative'>
        {isLoading
          ? <FullScreenLoadingSpinner />
          : selectedLargest.length > 0
            ? selectedLargest.map((item) => (
                <div key={`${item.name}-${item.category}`} className='pb-2'>
                  <div className='flex items-center justify-between gap-x-3'>
                    <p className='capitalize'>{item.name}</p>
                    <p>{selectedBaseCurrency} {item.currentValue.toLocaleString()}</p>
                  </div>
                  <span className='text-gray-700 text-xs capitalize'>{item.category}</span>
                </div>
              ))
            : <div className='flex items-center justify-center h-full'><p>Nothing to show yet.</p></div>
        }
      </div>
    </div>
  )
}

export default LargestFinancialAssets
