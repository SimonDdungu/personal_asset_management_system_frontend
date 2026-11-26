"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetLiabilityAsset, useUpdateLiabilityAsset } from '@/src/hooks/asset-properties/financial-assets/liability/useLiability'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateLiabilityFormData, updateLiabilitySchema } from '@/src/validation/asset_properties/financial/liability_Validation'
import LiabilityEditFields from './components/LiabilityEditFields'

const LiabilitiesEditView = ({id}: {id: string}) => {
  const {data} = useGetLiabilityAsset(id)
  const updateLiability = useUpdateLiabilityAsset()
  const viewPath = `/assets/financial/liabilities/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateLiabilityFormData) => {
    try {
      const liabilityData = updateLiabilitySchema.parse(values)
      await updateLiability.mutateAsync({id, data: liabilityData})
    } catch (error) {
      console.error('Failed to update liability:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Liabilities'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <LiabilityEditFields/>
    </EditViewLayout>
  )
}

export default LiabilitiesEditView
