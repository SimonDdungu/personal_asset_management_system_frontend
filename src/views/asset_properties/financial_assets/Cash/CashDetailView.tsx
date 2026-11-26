"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetPhysicalCashAsset } from '@/src/hooks/asset-properties/financial-assets/physical_cash/usePhysicalCash'

const CashDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetPhysicalCashAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory={data?.assetCategory ?? 'Cash'}
      assetName={data?.assetName ?? ''}
      assetLabel='Cash'
      assetDocuments={documents}
      assetUploadDocId={documentUploadId}
      currentCurrency={data?.currency ?? ''}
      currentValue={data?.currentValue}
      description={data?.description}
      createdAt={data?.createdAt ?? ''}
      updatedAt={data?.updatedAt ?? ''}
      currentValueUpdatedAt={data?.currentValueUpdatedAt ?? ''}
      isLoading={isLoading}
      isFetching={isFetching}
      basePath='/assets/financial/cash'
    >
      {null}
    </FinancialDetailViewLayout>
  )
}

export default CashDetailView
