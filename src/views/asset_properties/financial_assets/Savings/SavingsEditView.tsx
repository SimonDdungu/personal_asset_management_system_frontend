"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetSavingsAsset, useUpdateSavingsAsset } from '@/src/hooks/asset-properties/financial-assets/savings/useSavings'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateSavingsFormData, updateSavingsSchema } from '@/src/validation/asset_properties/financial/savings_Validation'
import SavingsEditFields from './components/SavingsEditFields'

const SavingsEditView = ({id}: {id: string}) => {
  const {data} = useGetSavingsAsset(id)
  const updateSavings = useUpdateSavingsAsset()
  const viewPath = `/assets/financial/savings/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateSavingsFormData) => {
    try {
      const savingsData = updateSavingsSchema.parse(values)
      await updateSavings.mutateAsync({id, data: savingsData})
    } catch (error) {
      console.error('Failed to update savings asset:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Savings'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <SavingsEditFields/>
    </EditViewLayout>
  )
}

export default SavingsEditView
