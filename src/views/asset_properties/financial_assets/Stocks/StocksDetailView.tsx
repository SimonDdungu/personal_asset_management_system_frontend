"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetStocksAsset } from '@/src/hooks/asset-properties/financial-assets/stocks/useStocks'
import FinancialAssetPropertyGrid, { FinancialAssetProperty } from '../components/FinancialAssetPropertyGrid'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const StocksDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetStocksAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  const fields: FinancialAssetProperty[] = [
    {label: 'Ticker symbol', value: data?.tickerSymbol ?? 'N/A'},
    {label: 'Number of shares', value: data ? formatFinancialNumber(data.numberShares) : 'N/A'},
    {label: 'Brokerage', value: data?.brokerage ?? 'N/A'},
  ]

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory='Stocks'
      assetName={data?.assetName ?? ''}
      assetLabel={data?.tickerSymbol ?? 'Stock'}
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
      basePath='/assets/financial/stocks'
    >
      <FinancialAssetPropertyGrid fields={fields}/>
    </FinancialDetailViewLayout>
  )
}

export default StocksDetailView
