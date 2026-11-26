"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetRetirementFundAsset, useUpdateRetirementFundAsset } from '@/src/hooks/asset-properties/financial-assets/retirement_fund/useRetirementFund'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateRetirementFundFormData, updateRetirementFundSchema } from '@/src/validation/asset_properties/financial/retirementFund_Validation'
import RetirementFundEditFields from './components/RetirementFundEditFields'

const RetirementFundEditView = ({id}: {id: string}) => {
  const {data} = useGetRetirementFundAsset(id)
  const updateRetirementFund = useUpdateRetirementFundAsset()
  const viewPath = `/assets/financial/retirement/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateRetirementFundFormData) => {
    try {
      const retirementFundData = updateRetirementFundSchema.parse(values)
      await updateRetirementFund.mutateAsync({id, data: retirementFundData})
    } catch (error) {
      console.error('Failed to update retirement fund:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Retirement Funds'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <RetirementFundEditFields/>
    </EditViewLayout>
  )
}

export default RetirementFundEditView
