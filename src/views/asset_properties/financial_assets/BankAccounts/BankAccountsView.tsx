"use client"
import { LegacyColumnDef } from '@tanstack/react-table/legacy'
import { useGetBankAccountAssets } from '@/src/hooks/asset-properties/financial-assets/bank_account/useBankAccount'
import { BankAccountSearchResponse } from '@/src/interfaces/asset_properties/financial/bankAccountTypes'
import { BankAccountAssetFilters } from '@/src/interfaces/search_filters/financial/bankAccount_SearchFilters'
import FinancialAssetListView, { FinancialAssetSearchField } from '../components/FinancialAssetListView'
import { useFinancialAssetFilters } from '../features/useFinancialAssetFilters'
import { formatFinancialNumber, formatOptionalFinancialNumber } from '../utils/formatFinancialNumber'

const columns: LegacyColumnDef<BankAccountSearchResponse>[] = [
  { accessorKey: 'assetName', header: 'Asset Name' },
  { accessorKey: 'bank', header: 'Bank' },
  {
    accessorKey: 'interestRate',
    header: 'Interest Rate',
    cell: ({row}) => typeof row.original.interestRate === 'number'
      ? `${formatOptionalFinancialNumber(row.original.interestRate)}%`
      : '-',
  },
  { accessorKey: 'currency', header: 'Currency' },
  {
    accessorKey: 'currentBalance',
    header: 'Current Balance',
    cell: ({row}) => `${row.original.currency} ${formatFinancialNumber(row.original.currentBalance)}`,
  },
]

const BankAccountsView = () => {
  const {
    searchFilters,
    appliedFilters,
    page,
    setPage,
    handleFilterChange,
    searchRecords,
    clearFilters,
  } = useFinancialAssetFilters<BankAccountAssetFilters>()
  const { data, isLoading, isFetching } = useGetBankAccountAssets({...appliedFilters, page})

  const fields: FinancialAssetSearchField[] = [
    {kind: 'text', name: 'assetName', label: 'Asset Name', placeholder: 'Enter asset name', value: searchFilters.assetName ?? '', onChange: (value) => handleFilterChange('assetName', value)},
    {kind: 'text', name: 'bank', label: 'Bank', placeholder: 'Enter bank', value: searchFilters.bank ?? '', onChange: (value) => handleFilterChange('bank', value)},
    {kind: 'text', name: 'bankAccountNumber', label: 'Account Number', placeholder: 'Enter account number', value: searchFilters.bankAccountNumber ?? '', onChange: (value) => handleFilterChange('bankAccountNumber', value)},
    {kind: 'number', name: 'minInterestRate', label: 'Minimum Interest Rate', placeholder: 'Minimum rate', value: searchFilters.minInterestRate ?? '', onChange: (value) => handleFilterChange('minInterestRate', value)},
    {kind: 'number', name: 'maxInterestRate', label: 'Maximum Interest Rate', placeholder: 'Maximum rate', value: searchFilters.maxInterestRate ?? '', onChange: (value) => handleFilterChange('maxInterestRate', value)},
    {kind: 'text', name: 'currency', label: 'Currency', placeholder: 'e.g. USD', value: searchFilters.currency ?? '', onChange: (value) => handleFilterChange('currency', value)},
    {kind: 'number', name: 'minValue', label: 'Minimum Balance', placeholder: 'Minimum balance', value: searchFilters.minValue ?? '', onChange: (value) => handleFilterChange('minValue', value)},
    {kind: 'number', name: 'maxValue', label: 'Maximum Balance', placeholder: 'Maximum balance', value: searchFilters.maxValue ?? '', onChange: (value) => handleFilterChange('maxValue', value)},
    {kind: 'number', name: 'minPreviousBalance', label: 'Minimum Previous Balance', placeholder: 'Minimum previous balance', value: searchFilters.minPreviousBalance ?? '', onChange: (value) => handleFilterChange('minPreviousBalance', value)},
    {kind: 'number', name: 'maxPreviousBalance', label: 'Maximum Previous Balance', placeholder: 'Maximum previous balance', value: searchFilters.maxPreviousBalance ?? '', onChange: (value) => handleFilterChange('maxPreviousBalance', value)},
  ]

  return (
    <FinancialAssetListView
      title='Bank Accounts'
      basePath='/assets/financial/bank-accounts'
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

export default BankAccountsView
