"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetStocksAsset, useUpdateStocksAsset } from '@/src/hooks/asset-properties/financial-assets/stocks/useStocks'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateStocksFormData, updateStocksSchema } from '@/src/validation/asset_properties/financial/stocks_Validation'
import StocksEditFields from './components/StocksEditFields'

const StocksEditView = ({id}: {id: string}) => {
  const {data} = useGetStocksAsset(id)
  const updateStocks = useUpdateStocksAsset()
  const viewPath = `/assets/financial/stocks/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateStocksFormData) => {
    try {
      const stocksData = updateStocksSchema.parse(values)
      await updateStocks.mutateAsync({id, data: stocksData})
    } catch (error) {
      console.error('Failed to update stocks:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Stocks'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <StocksEditFields/>
    </EditViewLayout>
  )
}

export default StocksEditView
