"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetLiabilityAsset } from '@/src/hooks/asset-properties/financial-assets/liability/useLiability'
import FinancialAssetPropertyGrid, { FinancialAssetProperty } from '../components/FinancialAssetPropertyGrid'

const LiabilitiesDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetLiabilityAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  const fields: FinancialAssetProperty[] = [
    {label: 'Creditor', value: data?.creditor ?? 'N/A'},
    {label: 'Due date', value: data?.dueDate ?? 'N/A'},
  ]

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory={data?.assetCategory ?? 'Liabilities'}
      assetName={data?.assetName ?? ''}
      assetLabel={data?.creditor ?? 'Liability'}
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
      basePath='/assets/financial/liabilities'
    >
      <FinancialAssetPropertyGrid fields={fields}/>
    </FinancialDetailViewLayout>
  )
}

export default LiabilitiesDetailView
