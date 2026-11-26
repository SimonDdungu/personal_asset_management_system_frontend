"use client"
import FinancialDetailViewLayout from '@/src/components/ui/layout/FinancialDetailViewLayout'
import { useGetBankAccountAsset } from '@/src/hooks/asset-properties/financial-assets/bank_account/useBankAccount'
import FinancialAssetPropertyGrid, { FinancialAssetProperty } from '../components/FinancialAssetPropertyGrid'
import { formatFinancialNumber } from '../utils/formatFinancialNumber'

const BankAccountsDetailView = ({id}: {id: string}) => {
  const {data, isLoading, isFetching} = useGetBankAccountAsset(id)
  const documents = data?.documents?.[0]?.documents
  const documentUploadId = data?.documents?.[0]?.id

  const fields: FinancialAssetProperty[] = [
    {label: 'Bank', value: data?.bank ?? 'N/A'},
    {label: 'Account number', value: data?.bankAccountNumber ?? 'N/A'},
    {label: 'Current balance', value: data ? `${data.currency} ${formatFinancialNumber(data.currentBalance)}` : 'N/A'},
    {label: 'Previous balance', value: data ? `${data.currency} ${formatFinancialNumber(data.previousBalance)}` : 'N/A'},
    ...(typeof data?.interestRate === 'number'
      ? [{label: 'Interest rate', value: `${formatFinancialNumber(data.interestRate)}%`}]
      : []),
  ]

  return (
    <FinancialDetailViewLayout
      itemId={data?.id ?? ''}
      assetId={data?.assetId ?? ''}
      assetCategory='Bank Accounts'
      assetName={data?.assetName ?? ''}
      assetLabel={data?.bank ?? 'Bank Account'}
      assetDocuments={documents}
      assetUploadDocId={documentUploadId}
      currentCurrency={data?.currency ?? ''}
      currentValue={data?.currentBalance}
      description={data?.description}
      createdAt={data?.createdAt ?? ''}
      updatedAt={data?.updatedAt ?? ''}
      currentValueUpdatedAt={data?.currentBalanceUpdatedAt ?? ''}
      isLoading={isLoading}
      isFetching={isFetching}
      basePath='/assets/financial/bank-accounts'
    >
      <FinancialAssetPropertyGrid fields={fields}/>
    </FinancialDetailViewLayout>
  )
}

export default BankAccountsDetailView
