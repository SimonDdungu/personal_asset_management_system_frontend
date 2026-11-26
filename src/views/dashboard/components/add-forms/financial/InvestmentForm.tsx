"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import NumberInput from '@/src/components/ui/input/NumberInput'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateInvestmentFormData, createInvestmentSchema } from '@/src/validation/asset_properties/financial/investment_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const InvestmentForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {register, handleSubmit, formState: {errors}} = useForm<CreateInvestmentFormData>({
    resolver: zodResolver(createInvestmentSchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreateInvestmentFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Investment Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <div className='flex items-start gap-x-2'>
          <NumberInput required label='Quantity' name='quantity' placeholder='Enter quantity' register={register} error={errors}/>
          <TextInput label='Institution (optional)' name='institution' placeholder='Enter institution' register={register} error={errors}/>
        </div>

        <div className='flex items-start gap-x-2'>
          <NumberInput label='Interest rate (optional)' name='interestRate' placeholder='e.g. 2.5' register={register} error={errors}/>
          <TextInput label='Reference number (optional)' name='referenceNumber' placeholder='Enter reference number' register={register} error={errors}/>
        </div>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default InvestmentForm
