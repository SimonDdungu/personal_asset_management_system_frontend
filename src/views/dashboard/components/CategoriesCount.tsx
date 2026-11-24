"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import { useGetAssetCategoryCount } from '@/src/hooks/assets/useAssets';
import { CATEGORIES_COUNT } from '@/src/shared/types/category-count-types';
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store';

const CategoriesCount = () => {
    const seletedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
    
    const { data, isLoading, isError} = useGetAssetCategoryCount();
    const selectedCategories: CATEGORIES_COUNT[] = data?.[seletedBaseCurrency] ?? []

    console.log("Selected category count: ", selectedCategories)
  return (
    <div className='bg-white min-w-80 shadow rounded-lg p-4 cursor-default'>
        <div className='mb-3 pb-2 border-b'>
            <h5 className='text-sm font-medium'>Most Assets</h5>
            <span className='text-xs text-gray-700'>Categories with the most assets</span>
        </div>
        <div className='flex flex-col gap-y-2 text-sm divide-y h-69 relative'>
           {isLoading ? 
                <FullScreenLoadingSpinner />
                :
                (selectedCategories.length > 0 ? selectedCategories.map((item: CATEGORIES_COUNT) => {
                    return (
                        <div key={item.category} className='pb-2'>
                            <div className='flex items-center justify-between gap-x-3'>
                                <p className='capitalize'>{item.category}</p>
                                <p>{item.count.toLocaleString()}</p>
                            </div>
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

export default CategoriesCount