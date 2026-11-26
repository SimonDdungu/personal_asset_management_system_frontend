import { TextInput } from '@/src/components/ui'
import { UpdateRetirementFundFormData } from '@/src/validation/asset_properties/financial/retirementFund_Validation'
import { useFormContext } from 'react-hook-form'

const RetirementFundEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateRetirementFundFormData>()

  return (
    <TextInput label='Provider' name='provider' placeholder='Enter fund provider' register={register} error={errors}/>
  )
}

export default RetirementFundEditFields
