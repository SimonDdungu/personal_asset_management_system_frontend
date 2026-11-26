"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetLiabilityAssets } from '@/src/hooks/asset-properties/financial-assets/liability/useLiability'
import { LiabilitySearchResponse } from '@/src/interfaces/asset_properties/financial/liabilityTypes'
import { LiabilityAssetFilters } from '@/src/interfaces/search_filters/financial/liability_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<LiabilitySearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  { accessorKey: 'creditor', header: 'Creditor' },
  { accessorKey: 'dueDate', header: 'Due Date' },
  { accessorKey: 'currency', header: 'Currency' },
  {
    accessorKey: 'currentValue',
    header: 'Current Value',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.currentValue)}`,
  },
]

const LiabilitiesView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<LiabilityAssetFilters>()
  const { data, isLoading, isFetching } = useGetLiabilityAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'text', name: 'creditor', label: 'Creditor', placeholder: 'Enter creditor', value: searchFilters.creditor ?? '', onChange: (value) => handleFilterChange('creditor', value)},
    {kind: 'text', name: 'minDueDate', label: 'Due Date From', placeholder: 'YYYY-MM-DD', value: searchFilters.minDueDate ?? '', onChange: (value) => handleFilterChange('minDueDate', value)},
    {kind: 'text', name: 'maxDueDate', label: 'Due Date To', placeholder: 'YYYY-MM-DD', value: searchFilters.maxDueDate ?? '', onChange: (value) => handleFilterChange('maxDueDate', value)},
    {kind: 'text', name: 'description', label: 'Description', placeholder: 'Enter description', value: searchFilters.description ?? '', onChange: (value) => handleFilterChange('description', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Liability Value', placeholder: 'Minimum value', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Liability Value', placeholder: 'Maximum value', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
  ]

  return (
    <FinancialAssetListView
      title='Liabilities'
      basePath='/assets/financial/liabilities'
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

export default LiabilitiesView
