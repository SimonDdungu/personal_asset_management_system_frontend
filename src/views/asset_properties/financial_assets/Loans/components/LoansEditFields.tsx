import { NumberInput, TextInput } from '@/src/components/ui'
import { UpdateLoansFormData } from '@/src/validation/asset_properties/financial/loans_Validation'
import { useFormContext } from 'react-hook-form'

const LoansEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateLoansFormData>()

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex gap-x-5 items-center'>
        <TextInput label='Lender' name='lender' placeholder='Enter lender' register={register} error={errors}/>
        <NumberInput label='Original amount' name='originalAmount' placeholder='Enter original amount' register={register} error={errors}/>
      </div>
      <div className='flex gap-x-5 items-center'>
        <NumberInput label='Interest rate (optional)' name='interestRate' placeholder='e.g. 2.5' register={register} error={errors}/>
        <TextInput label='Start date' name='startDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
      </div>
      <TextInput label='Maturity date (optional)' name='maturityDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
    </div>
  )
}

export default LoansEditFields
