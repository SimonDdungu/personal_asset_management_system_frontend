"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetLoansAsset } from '@/src/hooks/asset-properties/financial-assets/loans/useLoans'
import FinancialAssetPropertyGrid, { FinancialAssetProperty } from '../components/FinancialAssetPropertyGrid'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const LoansDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetLoansAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  const fields: FinancialAssetProperty[] = [
    {label: 'Lender', value: data?.lender ?? 'N/A'},
    {label: 'Original amount', value: data ? `${data.currency} ${formatFinancialNumber(data.originalAmount)}` : 'N/A'},
    ...(typeof data?.interestRate === 'number'
      ? [{label: 'Interest rate', value: `${formatFinancialNumber(data.interestRate)}%`}]
      : []),
    {label: 'Start date', value: data?.startDate ?? 'N/A'},
    {label: 'Maturity date', value: data?.maturityDate ?? 'N/A'},
  ]

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory={data?.assetCategory ?? 'Loans'}
      assetName={data?.assetName ?? ''}
      assetLabel={data?.lender ?? 'Loan'}
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
      basePath='/assets/financial/loans'
    >
      <FinancialAssetPropertyGrid fields={fields}/>
    </FinancialDetailViewLayout>
  )
}

export default LoansDetailView
