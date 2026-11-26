"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetSavingsAsset } from '@/src/hooks/asset-properties/financial-assets/savings/useSavings'
import FinancialAssetPropertyGrid, { FinancialAssetProperty } from '../components/FinancialAssetPropertyGrid'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const SavingsDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetSavingsAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  const fields: FinancialAssetProperty[] = [
    {label: 'Institution', value: data?.institution ?? 'N/A'},
    {label: 'Account number', value: data?.accountNumber ?? 'N/A'},
    ...(typeof data?.interestRate === 'number'
      ? [{label: 'Interest rate', value: `${formatFinancialNumber(data.interestRate)}%`}]
      : []),
    {label: 'Maturity date', value: data?.maturityDate ?? 'N/A'},
  ]

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory={data?.assetCategory ?? 'Savings'}
      assetName={data?.assetName ?? ''}
      assetLabel={data?.institution ?? 'Savings'}
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
      basePath='/assets/financial/savings'
    >
      <FinancialAssetPropertyGrid fields={fields}/>
    </FinancialDetailViewLayout>
  )
}

export default SavingsDetailView
