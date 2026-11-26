"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetInsuranceAssets } from '@/src/hooks/asset-properties/financial-assets/insurance/useInsurance'
import { InsuranceSearchResponse } from '@/src/interfaces/asset_properties/financial/insuranceTypes'
import { InsuranceAssetFilters } from '@/src/interfaces/search_filters/financial/insurance_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<InsuranceSearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  { accessorKey: 'provider', header: 'Provider' },
  {
    accessorKey: 'premiumAmount',
    header: 'Premium',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.premiumAmount)}`,
  },
  { accessorKey: 'premiumFrequency', header: 'Frequency' },
  { accessorKey: 'endDate', header: 'End Date' },
  { accessorKey: 'currency', header: 'Currency' },
  {
    accessorKey: 'currentValue',
    header: 'Current Value',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.currentValue)}`,
  },
]

const InsuranceView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<InsuranceAssetFilters>()
  const { data, isLoading, isFetching } = useGetInsuranceAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'text', name: 'provider', label: 'Provider', placeholder: 'Enter provider', value: searchFilters.provider ?? '', onChange: (value) => handleFilterChange('provider', value)},
    {kind: 'number', name: 'minPremiumAmount', label: 'Minimum Premium', placeholder: 'Minimum premium', value: searchFilters.minPremiumAmount ?? '', onChange: (value) => handleFilterChange('minPremiumAmount', value)},
    {kind: 'number', name: 'maxPremiumAmount', label: 'Maximum Premium', placeholder: 'Maximum premium', value: searchFilters.maxPremiumAmount ?? '', onChange: (value) => handleFilterChange('maxPremiumAmount', value)},
    {kind: 'text', name: 'premiumFrequency', label: 'Premium Frequency', placeholder: 'e.g. MONTHLY', value: searchFilters.premiumFrequency ?? '', onChange: (value) => handleFilterChange('premiumFrequency', value)},
    {kind: 'text', name: 'minStartDate', label: 'Start Date From', placeholder: 'YYYY-MM-DD', value: searchFilters.minStartDate ?? '', onChange: (value) => handleFilterChange('minStartDate', value)},
    {kind: 'text', name: 'maxStartDate', label: 'Start Date To', placeholder: 'YYYY-MM-DD', value: searchFilters.maxStartDate ?? '', onChange: (value) => handleFilterChange('maxStartDate', value)},
    {kind: 'text', name: 'minEndDate', label: 'End Date From', placeholder: 'YYYY-MM-DD', value: searchFilters.minEndDate ?? '', onChange: (value) => handleFilterChange('minEndDate', value)},
    {kind: 'text', name: 'maxEndDate', label: 'End Date To', placeholder: 'YYYY-MM-DD', value: searchFilters.maxEndDate ?? '', onChange: (value) => handleFilterChange('maxEndDate', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Value', placeholder: 'Minimum value', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Value', placeholder: 'Maximum value', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
  ]

  return (
    <FinancialAssetListView
      title='Insurance Policies'
      basePath='/assets/financial/insurance'
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

export default InsuranceView
