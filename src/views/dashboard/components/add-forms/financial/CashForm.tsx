"use client"
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreatePhysicalCashFormData, createPhysicalCashSchema } from '@/src/validation/asset_properties/financial/physicalCash_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const CashForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {handleSubmit} = useForm<CreatePhysicalCashFormData>({
    resolver: zodResolver(createPhysicalCashSchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreatePhysicalCashFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Cash Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default CashForm
