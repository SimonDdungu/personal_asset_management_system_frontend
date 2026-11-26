"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetLoansAsset, useUpdateLoansAsset } from '@/src/hooks/asset-properties/financial-assets/loans/useLoans'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateLoansFormData, updateLoansSchema } from '@/src/validation/asset_properties/financial/loans_Validation'
import LoansEditFields from './components/LoansEditFields'

const LoansEditView = ({id}: {id: string}) => {
  const {data} = useGetLoansAsset(id)
  const updateLoans = useUpdateLoansAsset()
  const viewPath = `/assets/financial/loans/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateLoansFormData) => {
    try {
      const loansData = updateLoansSchema.parse(values)
      await updateLoans.mutateAsync({id, data: loansData})
    } catch (error) {
      console.error('Failed to update loan:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Loans'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <LoansEditFields/>
    </EditViewLayout>
  )
}

export default LoansEditView
