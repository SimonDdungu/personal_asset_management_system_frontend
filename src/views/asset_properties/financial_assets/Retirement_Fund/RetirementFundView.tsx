"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetRetirementFundAssets } from '@/src/hooks/asset-properties/financial-assets/retirement_fund/useRetirementFund'
import { RetirementFundSearchResponse } from '@/src/interfaces/asset_properties/financial/retirementFundTypes'
import { RetirementFundAssetFilters } from '@/src/interfaces/search_filters/financial/retirementFund_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<RetirementFundSearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  { accessorKey: 'provider', header: 'Provider' },
  { accessorKey: 'currency', header: 'Currency' },
  {
    accessorKey: 'currentValue',
    header: 'Current Value',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.currentValue)}`,
  },
]

const RetirementFundView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<RetirementFundAssetFilters>()
  const { data, isLoading, isFetching } = useGetRetirementFundAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'text', name: 'provider', label: 'Provider', placeholder: 'Enter provider', value: searchFilters.provider ?? '', onChange: (value) => handleFilterChange('provider', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Value', placeholder: 'Minimum value', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Value', placeholder: 'Maximum value', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
  ]

  return (
    <FinancialAssetListView
      title='Retirement Funds'
      basePath='/assets/financial/retirement'
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

export default RetirementFundView
