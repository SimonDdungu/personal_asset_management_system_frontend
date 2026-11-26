import { NumberInput, TextInput } from '@/src/components/ui'
import { UpdateStocksFormData } from '@/src/validation/asset_properties/financial/stocks_Validation'
import { useFormContext } from 'react-hook-form'

const StocksEditFields = () => {
  const {register, formState: {errors}} = useFormContext<UpdateStocksFormData>()

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex gap-x-5 items-center'>
        <TextInput label='Ticker symbol' name='tickerSymbol' placeholder='e.g. AAPL' register={register} error={errors}/>
        <NumberInput label='Number of shares' name='numberShares' placeholder='Enter number of shares' register={register} error={errors}/>
      </div>
      <TextInput label='Brokerage' name='brokerage' placeholder='Enter brokerage' register={register} error={errors}/>
    </div>
  )
}

export default StocksEditFields
