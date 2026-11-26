"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetLoansAssets } from '@/src/hooks/asset-properties/financial-assets/loans/useLoans'
import { LoansSearchResponse } from '@/src/interfaces/asset_properties/financial/loansTypes'
import { LoansAssetFilters } from '@/src/interfaces/search_filters/financial/loans_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<LoansSearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  { accessorKey: 'lender', header: 'Lender' },
  {
    accessorKey: 'originalAmount',
    header: 'Original Amount',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.originalAmount)}`,
  },
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

const LoansView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<LoansAssetFilters>()
  const { data, isLoading, isFetching } = useGetLoansAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'text', name: 'lender', label: 'Lender', placeholder: 'Enter lender', value: searchFilters.lender ?? '', onChange: (value) => handleFilterChange('lender', value)},
    {kind: 'number', name: 'minOriginalAmount', label: 'Minimum Original Amount', placeholder: 'Minimum amount', value: searchFilters.minOriginalAmount ?? '', onChange: (value) => handleFilterChange('minOriginalAmount', value)},
    {kind: 'number', name: 'maxOriginalAmount', label: 'Maximum Original Amount', placeholder: 'Maximum amount', value: searchFilters.maxOriginalAmount ?? '', onChange: (value) => handleFilterChange('maxOriginalAmount', value)},
    {kind: 'number', name: 'minInterestRate', label: 'Minimum Interest Rate', placeholder: 'Minimum rate', value: searchFilters.minInterestRate ?? '', onChange: (value) => handleFilterChange('minInterestRate', value)},
    {kind: 'number', name: 'maxInterestRate', label: 'Maximum Interest Rate', placeholder: 'Maximum rate', value: searchFilters.maxInterestRate ?? '', onChange: (value) => handleFilterChange('maxInterestRate', value)},
    {kind: 'text', name: 'minStartDate', label: 'Start Date From', placeholder: 'YYYY-MM-DD', value: searchFilters.minStartDate ?? '', onChange: (value) => handleFilterChange('minStartDate', value)},
    {kind: 'text', name: 'maxStartDate', label: 'Start Date To', placeholder: 'YYYY-MM-DD', value: searchFilters.maxStartDate ?? '', onChange: (value) => handleFilterChange('maxStartDate', value)},
    {kind: 'text', name: 'minMaturityDate', label: 'Maturity Date From', placeholder: 'YYYY-MM-DD', value: searchFilters.minMaturityDate ?? '', onChange: (value) => handleFilterChange('minMaturityDate', value)},
    {kind: 'text', name: 'maxMaturityDate', label: 'Maturity Date To', placeholder: 'YYYY-MM-DD', value: searchFilters.maxMaturityDate ?? '', onChange: (value) => handleFilterChange('maxMaturityDate', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Value', placeholder: 'Minimum value', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Value', placeholder: 'Maximum value', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
  ]

  return (
    <FinancialAssetListView
      title='Loans'
      basePath='/assets/financial/loans'
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

export default LoansView
