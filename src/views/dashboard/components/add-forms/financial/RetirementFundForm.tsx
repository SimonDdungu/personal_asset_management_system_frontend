"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateRetirementFundFormData, createRetirementFundSchema } from '@/src/validation/asset_properties/financial/retirementFund_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const RetirementFundForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {register, handleSubmit, formState: {errors}} = useForm<CreateRetirementFundFormData>({
    resolver: zodResolver(createRetirementFundSchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreateRetirementFundFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Retirement Fund Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <TextInput required label='Provider' name='provider' placeholder='Enter fund provider' register={register} error={errors}/>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default RetirementFundForm
