"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetInsuranceAsset } from '@/src/hooks/asset-properties/financial-assets/insurance/useInsurance'
import FinancialAssetPropertyGrid, { FinancialAssetProperty } from '../components/FinancialAssetPropertyGrid'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const InsuranceDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetInsuranceAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  const fields: FinancialAssetProperty[] = [
    {label: 'Provider', value: data?.provider ?? 'N/A'},
    {label: 'Premium amount', value: data ? `${data.currency} ${formatFinancialNumber(data.premiumAmount)}` : 'N/A'},
    {label: 'Premium frequency', value: data?.premiumFrequency ?? 'N/A'},
    {label: 'Start date', value: data?.startDate ?? 'N/A'},
    {label: 'End date', value: data?.endDate ?? 'N/A'},
  ]

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory={data?.assetCategory ?? 'Insurance Policies'}
      assetName={data?.assetName ?? ''}
      assetLabel={data?.provider ?? 'Insurance Policy'}
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
      basePath='/assets/financial/insurance'
    >
      <FinancialAssetPropertyGrid fields={fields}/>
    </FinancialDetailViewLayout>
  )
}

export default InsuranceDetailView
