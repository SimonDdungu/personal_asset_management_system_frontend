"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import NumberInput from '@/src/components/ui/input/NumberInput'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateStocksFormData, createStocksSchema } from '@/src/validation/asset_properties/financial/stocks_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const StocksForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {register, handleSubmit, formState: {errors}} = useForm<CreateStocksFormData>({
    resolver: zodResolver(createStocksSchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreateStocksFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Stocks Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <div className='flex items-start gap-x-2'>
          <TextInput required label='Ticker symbol' name='tickerSymbol' placeholder='e.g. AAPL' register={register} error={errors}/>
          <NumberInput required label='Number of shares' name='numberShares' placeholder='Enter number of shares' register={register} error={errors}/>
        </div>

        <TextInput required label='Brokerage' name='brokerage' placeholder='Enter brokerage' register={register} error={errors}/>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default StocksForm
