"use client"
import EditViewLayout from '@/src/components/ui/layout/EditViewLayout'
import { useAsset } from '@/src/hooks/assets/useAssets'
import { useGetBankAccountAsset, useUpdateBankAccountAsset } from '@/src/hooks/asset-properties/financial-assets/bank_account/useBankAccount'
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation'
import { UpdateBankAccountFormData, updateBankAccountSchema } from '@/src/validation/asset_properties/financial/bankAccount_Validation'
import BankAccountEditFields from './components/BankAccountEditFields'

const BankAccountsEditView = ({id}: {id: string}) => {
  const {data} = useGetBankAccountAsset(id)
  const {data: asset} = useAsset(data?.assetId ?? '')
  const updateBankAccount = useUpdateBankAccountAsset()
  const viewPath = `/assets/financial/bank-accounts/${id}`

  const onCategorySubmit = async (values: UpdateAssetFormData & UpdateBankAccountFormData) => {
    try {
      const bankAccountData = updateBankAccountSchema.parse({...values, currentBalance: values.currentValue})
      await updateBankAccount.mutateAsync({id, data: bankAccountData})
    } catch (error) {
      console.error('Failed to update bank account:', error)
      throw error
    }
  }

  return (
    <EditViewLayout
      viewPath={viewPath}
      assetid={data?.assetId ?? ''}
      assetName={data?.assetName ?? ''}
      category='Bank Accounts'
      onCategorySubmit={onCategorySubmit}
      initialData={data && asset ? {...data, ...asset, name: asset.name} : undefined}
    >
      <BankAccountEditFields/>
    </EditViewLayout>
  )
}

export default BankAccountsEditView
