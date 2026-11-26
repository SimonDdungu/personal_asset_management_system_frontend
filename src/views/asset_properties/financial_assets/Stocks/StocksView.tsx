"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetStocksAssets } from '@/src/hooks/asset-properties/financial-assets/stocks/useStocks'
import { StocksSearchResponse } from '@/src/interfaces/asset_properties/financial/stocksTypes'
import { StocksAssetFilters } from '@/src/interfaces/search_filters/financial/stocks_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<StocksSearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  { accessorKey: 'tickerSymbol', header: 'Ticker Symbol' },
  {
    accessorKey: 'numberShares',
    header: 'Number of Shares',
    cell: ({row}) => formatFinancialNumber(row.original.numberShares),
  },
  { accessorKey: 'brokerage', header: 'Brokerage' },
  { accessorKey: 'description', header: 'Description', cell: ({row}) => row.original.description ?? '-' },
  { accessorKey: 'currency', header: 'Currency' },
  {
    accessorKey: 'currentValue',
    header: 'Current Value',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.currentValue)}`,
  },
]

const StocksView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<StocksAssetFilters>()
  const { data, isLoading, isFetching } = useGetStocksAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'text', name: 'tickerSymbol', label: 'Ticker Symbol', placeholder: 'Enter ticker symbol', value: searchFilters.tickerSymbol ?? '', onChange: (value) => handleFilterChange('tickerSymbol', value)},
    {kind: 'number', name: 'minNumberShares', label: 'Minimum Shares', placeholder: 'Minimum shares', value: searchFilters.minNumberShares ?? '', onChange: (value) => handleFilterChange('minNumberShares', value)},
    {kind: 'number', name: 'maxNumberShares', label: 'Maximum Shares', placeholder: 'Maximum shares', value: searchFilters.maxNumberShares ?? '', onChange: (value) => handleFilterChange('maxNumberShares', value)},
    {kind: 'text', name: 'brokerage', label: 'Brokerage', placeholder: 'Enter brokerage', value: searchFilters.brokerage ?? '', onChange: (value) => handleFilterChange('brokerage', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Value', placeholder: 'Minimum value', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Value', placeholder: 'Maximum value', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
  ]

  return (
    <FinancialAssetListView
      title='Stocks'
      basePath='/assets/financial/stocks'
      fields={fields}
      columns={columns}
      data={data}
      isLoading={isLoading}
      isFetching={isFetching}
      page={page}
      onPageChange={setPage}
      onSearch={searchRecords}
      onClear={clearFilters}
    />
  )
}

export default StocksView
