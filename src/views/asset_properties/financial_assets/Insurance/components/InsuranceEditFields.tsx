import { NumberInput, TextInput } from '@/src/components/ui'
import { UpdateInsuranceFormData } from '@/src/validation/asset_properties/financial/insurance_Validation'
import { useFormContext } from 'react-hook-form'

const InsuranceEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateInsuranceFormData>()

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex gap-x-5 items-center'>
        <TextInput label='Provider' name='provider' placeholder='Enter insurance provider' register={register} error={errors}/>
        <NumberInput label='Premium amount' name='premiumAmount' placeholder='Enter premium amount' register={register} error={errors}/>
      </div>
      <div className='flex gap-x-5 items-center'>
        <TextInput label='Premium frequency' name='premiumFrequency' placeholder='e.g. Monthly' register={register} error={errors}/>
        <TextInput label='Start date' name='startDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
      </div>
      <TextInput label='End date' name='endDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
    </div>
  )
}

export default InsuranceEditFields
