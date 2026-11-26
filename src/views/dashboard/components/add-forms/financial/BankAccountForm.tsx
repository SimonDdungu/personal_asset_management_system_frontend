"use client"
import { SelectInput, TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import NumberInput from '@/src/components/ui/input/NumberInput'
import { currencyOptions } from '@/src/constants/currency/currency'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateBankAccountFormData, createBankAccountSchema } from '@/src/validation/asset_properties/financial/bankAccount_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const BankAccountForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  const {register, handleSubmit, control, formState: {errors}} = useForm<CreateBankAccountFormData>({
    resolver: zodResolver(createBankAccountSchema), mode: "onChange", reValidateMode: "onChange",
  })

  function NextStep(data: CreateBankAccountFormData) {
    onNext()
    setData?.((previous: object) => ({...previous, ...data}))
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Bank Account Properties</h1>
      <form onSubmit={handleSubmit(NextStep)}>
        <div className='flex items-start gap-x-2'>
          <TextInput required label='Bank' name='bank' placeholder='Enter bank name' register={register} error={errors}/>
          <TextInput required label='Bank account number' name='bankAccountNumber' placeholder='Enter account number' register={register} error={errors}/>
        </div>

        <div className='flex items-start gap-x-2'>
          <NumberInput label='Interest rate (optional)' name='interestRate' placeholder='e.g. 2.5' register={register} error={errors}/>
          <SelectInput required label='Currency' name='currency' placeholder='Select currency' options={currencyOptions} control={control} register={register} error={errors}/>
        </div>

        <NumberInput required label='Current balance' name='currentBalance' placeholder='Enter current balance' register={register} error={errors}/>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton button onClick={onBack} label='Back'/>
          <BlueButton label='Next'/>
        </div>
      </form>
    </div>
  )
}

export default BankAccountForm
