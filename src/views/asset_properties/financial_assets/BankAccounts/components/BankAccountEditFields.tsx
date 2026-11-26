import { NumberInput, TextInput } from '@/src/components/ui'
import { UpdateBankAccountFormData } from '@/src/validation/asset_properties/financial/bankAccount_Validation'
import { useFormContext } from 'react-hook-form'

const BankAccountEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateBankAccountFormData>()

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex gap-x-5 items-center'>
        <TextInput label='Bank' name='bank' placeholder='Enter bank name' register={register} error={errors}/>
        <TextInput label='Bank account number' name='bankAccountNumber' placeholder='Enter account number' register={register} error={errors}/>
      </div>
      <NumberInput label='Interest rate (optional)' name='interestRate' placeholder='e.g. 2.5' register={register} error={errors}/>
    </div>
  )
}

export default BankAccountEditFields
