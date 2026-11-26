"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useGetPhysicalCashAsset, useUpdatePhysicalCashAsset } from '@/src/hooks/asset-properties/financial-assets/physical_cash/usePhysicalCash'
import CashEditFields from './components/CashEditFields'

const CashEditView = ({id}: {id: string}) => {
  const {data} = useGetPhysicalCashAsset(id)
  const updateCash = useUpdatePhysicalCashAsset()
  const viewPath = `/assets/financial/cash/${id}`

  const onCategorySubmit = async () => {
    try {
      await updateCash.mutateAsync({id, data: {}})
    } catch (error) {
      console.error('Failed to update cash asset:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category={data?.assetCategory ?? 'Cash'}
      onCategorySubmit={onCategorySubmit}
      initialData={data ? {...data, name: data.assetName} : undefined}
    >
      <CashEditFields/>
    </EditViewLayout>
  )
}

export default CashEditView
