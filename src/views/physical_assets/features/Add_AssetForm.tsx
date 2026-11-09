"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/BlueButton'
import NumberInput from '@/src/components/ui/NumberInput'
import SelectInput from '@/src/components/ui/SelectInput'
import { assetCategories } from '@/src/constants/assets_options/assetCategories'
import { assetTypes } from '@/src/constants/assets_options/assetTypes'
import { currencyOptions } from '@/src/constants/currency/currency'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { useForm } from 'react-hook-form'

const Add_AssetForm = ({onNext}: GotoNextStepper) => {
  const { register, handleSubmit, control } = useForm();

  const dummy_data = {
    "name": "Iphone 18 Pro",
    "description": "Birthday Gift 2026",
    "assetCategoryId": "dd6768b8-1ae9-4b47-b364-6f0e0c4db2fe",
    "acquisitionId": "a8ca2828-ddd5-4d7d-ac12-aad1088d564a",
    "currency": "USD",
    "currentValue": 1199.00
  }

  function NextStep(data: any){
    onNext({asset: dummy_data})
  }

  return (
    <div>
       <form onSubmit={handleSubmit(NextStep)}>
          <div>
              <TextInput label='Asset name' name='assetName' placeholder='e.g. Rental Property in Entebbe, SBGS Unit Trust Account'  register={register}/>
              <div className='flex gap-x-2 '>
                <SelectInput label='Asset type' name='assetType' placeholder='Select asset type' options={assetTypes} control={control} register={register}/>
                <SelectInput label='Asset category' name='assetCategory' placeholder='Select asset category' options={assetCategories} control={control} register={register}/>
              </div>
              <div className='flex gap-x-2 '>
                <SelectInput label='Currency' name='currency' placeholder='Select currency' options={currencyOptions} control={control} register={register}/>
                <NumberInput label='Current value' name='currentValue' placeholder='e.g. 1,000,000' register={register}/>
              </div>
          </div>
          <BlueButton onClick={NextStep} label='Next'/>
       </form>
    </div>
  )
}

export default Add_AssetForm