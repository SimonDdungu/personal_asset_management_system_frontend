"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetSavingsAssets } from '@/src/hooks/asset-properties/financial-assets/savings/useSavings'
import { SavingsSearchResponse } from '@/src/interfaces/asset_properties/financial/savingsTypes'
import { SavingsAssetFilters } from '@/src/interfaces/search_filters/financial/savings_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<SavingsSearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  { accessorKey: 'institution', header: 'Institution' },
  {
    accessorKey: 'interestRate',
    header: 'Interest Rate',
    cell: ({row}) => typeof row.original.interestRate === 'number'
      ? `${formatFinancialNumber(row.original.interestRate)}%`
      : '-',
  },
  { accessorKey: 'maturityDate', header: 'Maturity Date' },
  { accessorKey: 'currency', header: 'Currency' },
  {
    accessorKey: 'currentValue',
    header: 'Current Value',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.currentValue)}`,
  },
]

const SavingsView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<SavingsAssetFilters>()
  const { data, isLoading, isFetching } = useGetSavingsAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'text', name: 'institution', label: 'Institution', placeholder: 'Enter institution', value: searchFilters.institution ?? '', onChange: (value) => handleFilterChange('institution', value)},
    {kind: 'text', name: 'accountNumber', label: 'Account Number', placeholder: 'Enter account number', value: searchFilters.accountNumber ?? '', onChange: (value) => handleFilterChange('accountNumber', value)},
    {kind: 'number', name: 'minInterestRate', label: 'Minimum Interest Rate', placeholder: 'Minimum rate', value: searchFilters.minInterestRate ?? '', onChange: (value) => handleFilterChange('minInterestRate', value)},
    {kind: 'number', name: 'maxInterestRate', label: 'Maximum Interest Rate', placeholder: 'Maximum rate', value: searchFilters.maxInterestRate ?? '', onChange: (value) => handleFilterChange('maxInterestRate', value)},
    {kind: 'text', name: 'minMaturityDate', label: 'Maturity Date From', placeholder: 'YYYY-MM-DD', value: searchFilters.minMaturityDate ?? '', onChange: (value) => handleFilterChange('minMaturityDate', value)},
    {kind: 'text', name: 'maxMaturityDate', label: 'Maturity Date To', placeholder: 'YYYY-MM-DD', value: searchFilters.maxMaturityDate ?? '', onChange: (value) => handleFilterChange('maxMaturityDate', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Value', placeholder: 'Minimum value', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Value', placeholder: 'Maximum value', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
  ]

  return (
    <FinancialAssetListView
      title='Savings'
      basePath='/assets/financial/savings'
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

export default SavingsView
