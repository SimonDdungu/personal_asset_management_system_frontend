"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetInvestmentAssets } from '@/src/hooks/asset-properties/financial-assets/investment/useInvestment'
import { InvestmentSearchResponse } from '@/src/interfaces/asset_properties/financial/investmentTypes'
import { InvestmentAssetFilters } from '@/src/interfaces/search_filters/financial/investment_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber, formatOptionalFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<InvestmentSearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({row}) => formatOptionalFinancialNumber(row.original.quantity),
  },
  { accessorKey: 'institution', header: 'Institution' },
  {
    accessorKey: 'interestRate',
    header: 'Interest Rate',
    cell: ({row}) => typeof row.original.interestRate === 'number'
      ? `${formatFinancialNumber(row.original.interestRate)}%`
      : '-',
  },
  { accessorKey: 'currency', header: 'Currency' },
  {
    accessorKey: 'currentValue',
    header: 'Current Value',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.currentValue)}`,
  },
]

const InvestmentsView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<InvestmentAssetFilters>()
  const { data, isLoading, isFetching } = useGetInvestmentAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'number', name: 'minQuantity', label: 'Minimum Quantity', placeholder: 'Minimum quantity', value: searchFilters.minQuantity ?? '', onChange: (value) => handleFilterChange('minQuantity', value)},
    {kind: 'number', name: 'maxQuantity', label: 'Maximum Quantity', placeholder: 'Maximum quantity', value: searchFilters.maxQuantity ?? '', onChange: (value) => handleFilterChange('maxQuantity', value)},
    {kind: 'text', name: 'institution', label: 'Institution', placeholder: 'Enter institution', value: searchFilters.institution ?? '', onChange: (value) => handleFilterChange('institution', value)},
    {kind: 'number', name: 'minInterestRate', label: 'Minimum Interest Rate', placeholder: 'Minimum rate', value: searchFilters.minInterestRate ?? '', onChange: (value) => handleFilterChange('minInterestRate', value)},
    {kind: 'number', name: 'maxInterestRate', label: 'Maximum Interest Rate', placeholder: 'Maximum rate', value: searchFilters.maxInterestRate ?? '', onChange: (value) => handleFilterChange('maxInterestRate', value)},
    {kind: 'text', name: 'referenceNumber', label: 'Reference Number', placeholder: 'Enter reference number', value: searchFilters.referenceNumber ?? '', onChange: (value) => handleFilterChange('referenceNumber', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Value', placeholder: 'Minimum value', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Value', placeholder: 'Maximum value', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
  ]

  return (
    <FinancialAssetListView
      title='Investments'
      basePath='/assets/financial/investments'
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

export default InvestmentsView
