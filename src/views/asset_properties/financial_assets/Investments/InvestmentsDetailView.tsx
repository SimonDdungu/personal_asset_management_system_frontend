"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetInvestmentAsset } from '@/src/hooks/asset-properties/financial-assets/investment/useInvestment'
import FinancialAssetPropertyGrid, { FinancialAssetProperty } from '../components/FinancialAssetPropertyGrid'
import { formatFinancialNumber, formatOptionalFinancialNumber } from '../utils/formatFinancialNumber'

const InvestmentsDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetInvestmentAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  const fields: FinancialAssetProperty[] = [
    {label: 'Quantity', value: formatOptionalFinancialNumber(data?.quantity)},
    {label: 'Institution', value: data?.institution ?? 'N/A'},
    ...(typeof data?.interestRate === 'number'
      ? [{label: 'Interest rate', value: `${formatFinancialNumber(data.interestRate)}%`}]
      : []),
    {label: 'Reference number', value: data?.referenceNumber ?? 'N/A'},
  ]

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory={data?.assetCategory ?? 'Investments'}
      assetName={data?.assetName ?? ''}
      assetLabel='Investment'
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
      basePath='/assets/financial/investments'
    >
      <FinancialAssetPropertyGrid fields={fields}/>
    </FinancialDetailViewLayout>
  )
}

export default InvestmentsDetailView
