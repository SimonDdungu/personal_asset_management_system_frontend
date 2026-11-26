"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateLiabilityFormData, createLiabilitySchema } from '@/src/validation/asset_properties/financial/liability_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const LiabilityForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {register, handleSubmit, formState: {errors}} = useForm<CreateLiabilityFormData>({
    resolver: zodResolver(createLiabilitySchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreateLiabilityFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Liability Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <div className='flex items-start gap-x-2'>
          <TextInput required label='Creditor' name='creditor' placeholder='Enter creditor' register={register} error={errors}/>
          <TextInput required label='Due date' name='dueDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
        </div>

        <TextInput label='Description (optional)' name='description' placeholder='Describe the liability' register={register} error={errors}/>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default LiabilityForm
