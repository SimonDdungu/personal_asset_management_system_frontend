"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import NumberInput from '@/src/components/ui/input/NumberInput'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateInsuranceFormData, createInsuranceSchema } from '@/src/validation/asset_properties/financial/insurance_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const InsuranceForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {register, handleSubmit, formState: {errors}} = useForm<CreateInsuranceFormData>({
    resolver: zodResolver(createInsuranceSchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreateInsuranceFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Insurance Policy Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <div className='flex items-start gap-x-2'>
          <TextInput required label='Provider' name='provider' placeholder='Enter insurance provider' register={register} error={errors}/>
          <NumberInput required label='Premium amount' name='premiumAmount' placeholder='Enter premium amount' register={register} error={errors}/>
        </div>

        <div className='flex items-start gap-x-2'>
          <TextInput required label='Premium frequency' name='premiumFrequency' placeholder='e.g. Monthly' register={register} error={errors}/>
          <TextInput required label='Start date' name='startDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
        </div>

        <TextInput required label='End date' name='endDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default InsuranceForm
