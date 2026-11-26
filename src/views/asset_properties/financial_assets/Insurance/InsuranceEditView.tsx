"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetInsuranceAsset, useUpdateInsuranceAsset } from '@/src/hooks/asset-properties/financial-assets/insurance/useInsurance'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateInsuranceFormData, updateInsuranceSchema } from '@/src/validation/asset_properties/financial/insurance_Validation'
import InsuranceEditFields from './components/InsuranceEditFields'

const InsuranceEditView = ({id}: {id: string}) => {
  const {data} = useGetInsuranceAsset(id)
  const updateInsurance = useUpdateInsuranceAsset()
  const viewPath = `/assets/financial/insurance/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateInsuranceFormData) => {
    try {
      const insuranceData = updateInsuranceSchema.parse(values)
      await updateInsurance.mutateAsync({id, data: insuranceData})
    } catch (error) {
      console.error('Failed to update insurance policy:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Insurance Policies'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <InsuranceEditFields/>
    </EditViewLayout>
  )
}

export default InsuranceEditView
