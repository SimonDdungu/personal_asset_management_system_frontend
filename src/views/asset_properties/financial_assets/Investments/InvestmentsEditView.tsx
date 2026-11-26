"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetInvestmentAsset, useUpdateInvestmentAsset } from '@/src/hooks/asset-properties/financial-assets/investment/useInvestment'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateInvestmentFormData, updateInvestmentSchema } from '@/src/validation/asset_properties/financial/investment_Validation'
import InvestmentEditFields from './components/InvestmentEditFields'

const InvestmentsEditView = ({id}: {id: string}) => {
  const {data} = useGetInvestmentAsset(id)
  const updateInvestment = useUpdateInvestmentAsset()
  const viewPath = `/assets/financial/investments/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateInvestmentFormData) => {
    try {
      const investmentData = updateInvestmentSchema.parse(values)
      await updateInvestment.mutateAsync({id, data: investmentData})
    } catch (error) {
      console.error('Failed to update investment:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Investments'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <InvestmentEditFields/>
    </EditViewLayout>
  )
}

export default InvestmentsEditView
