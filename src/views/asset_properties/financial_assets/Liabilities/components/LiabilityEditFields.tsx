import { TextInput } from '@/src/components/ui'
import { UpdateLiabilityFormData } from '@/src/validation/asset_properties/financial/liability_Validation'
import { useFormContext } from 'react-hook-form'

const LiabilityEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateLiabilityFormData>()

  return (
    <div className='flex gap-x-5 items-center'>
      <TextInput label='Creditor' name='creditor' placeholder='Enter creditor' register={register} error={errors}/>
      <TextInput label='Due date' name='dueDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
    </div>
  )
}

export default LiabilityEditFields
