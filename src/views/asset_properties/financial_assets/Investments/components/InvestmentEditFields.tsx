import { NumberInput, TextInput } from '@/src/components/ui'
import { UpdateInvestmentFormData } from '@/src/validation/asset_properties/financial/investment_Validation'
import { useFormContext } from 'react-hook-form'

const InvestmentEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateInvestmentFormData>()

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex gap-x-5 items-center'>
        <NumberInput label='Quantity' name='quantity' placeholder='Enter quantity' register={register} error={errors}/>
        <TextInput label='Institution (optional)' name='institution' placeholder='Enter institution' register={register} error={errors}/>
      </div>
      <div className='flex gap-x-5 items-center'>
        <NumberInput label='Interest rate (optional)' name='interestRate' placeholder='e.g. 2.5' register={register} error={errors}/>
        <TextInput label='Reference number (optional)' name='referenceNumber' placeholder='Enter reference number' register={register} error={errors}/>
      </div>
    </div>
  )
}

export default InvestmentEditFields
