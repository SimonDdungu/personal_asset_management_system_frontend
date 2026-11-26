import { NumberInput, TextInput } from '@/src/components/ui'
import { UpdateSavingsFormData } from '@/src/validation/asset_properties/financial/savings_Validation'
import { useFormContext } from 'react-hook-form'

const SavingsEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateSavingsFormData>()

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex gap-x-5 items-center'>
        <TextInput label='Institution' name='institution' placeholder='Enter institution' register={register} error={errors}/>
        <TextInput label='Account number' name='accountNumber' placeholder='Enter account number' register={register} error={errors}/>
      </div>
      <div className='flex gap-x-5 items-center'>
        <NumberInput label='Interest rate (optional)' name='interestRate' placeholder='e.g. 2.5' register={register} error={errors}/>
        <TextInput label='Maturity date (optional)' name='maturityDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
      </div>
    </div>
  )
}

export default SavingsEditFields
