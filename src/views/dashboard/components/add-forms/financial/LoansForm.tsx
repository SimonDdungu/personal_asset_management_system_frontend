"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import NumberInput from '@/src/components/ui/input/NumberInput'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateLoansFormData, createLoansSchema } from '@/src/validation/asset_properties/financial/loans_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const LoansForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {register, handleSubmit, formState: {errors}} = useForm<CreateLoansFormData>({
    resolver: zodResolver(createLoansSchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreateLoansFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Loan Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <div className='flex items-start gap-x-2'>
          <TextInput required label='Lender' name='lender' placeholder='Enter lender' register={register} error={errors}/>
          <NumberInput required label='Original amount' name='originalAmount' placeholder='Enter original amount' register={register} error={errors}/>
        </div>

        <div className='flex items-start gap-x-2'>
          <NumberInput label='Interest rate (optional)' name='interestRate' placeholder='e.g. 2.5' register={register} error={errors}/>
          <TextInput required label='Start date' name='startDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>
        </div>

        <TextInput label='Maturity date (optional)' name='maturityDate' placeholder='YYYY-MM-DD' register={register} error={errors}/>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default LoansForm
