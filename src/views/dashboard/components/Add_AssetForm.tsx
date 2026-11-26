"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/buttons/BlueButton'
import MultiTextInput from '@/src/components/ui/input/MultiTextInput'
import NumberInput from '@/src/components/ui/input/NumberInput'
import ReadOnlyInput from '@/src/components/ui/input/ReadOnlyInput'
import SelectInput from '@/src/components/ui/input/SelectInput'
import { PHYSICAL_ASSETS } from '@/src/constants/asset-types/physical-assets'
import { acquisitionTypes } from '@/src/constants/assets_options/acquistion'
import { assetCategories } from '@/src/constants/assets_options/assetCategories'
import { assetTypes } from '@/src/constants/assets_options/assetTypes'
import { currencyOptions } from '@/src/constants/currency/currency'
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces'
import { CreateAssetFormData, createAssetSchema } from '@/src/validation/asset_properties/asset_Validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MOCK_ASSETS } from '../data/mock-assets'

const Add_AssetForm = ({onNext, onBack, setData, toStep}: GotoNextStepper) => { 
  const { register, handleSubmit, control, watch, setValue, formState: {errors} } = useForm<CreateAssetFormData>({ 
    resolver: zodResolver(createAssetSchema), defaultValues: {...MOCK_ASSETS}, mode: "onSubmit", reValidateMode: "onChange",
  });


  const selectedCategory = watch("assetCategory");

  useEffect(() => {
    if (!selectedCategory) {
        setValue("assetType", "");
        return;
    }

    const type = PHYSICAL_ASSETS.includes(selectedCategory) ? "Physical Assets" : "Financial Assets"

    setValue("assetType", type, { shouldValidate: true });
}, [selectedCategory, setValue]);



 

  function NextStep(data: CreateAssetFormData){
    setData?.(data)
    toStep?.(data.assetCategory)
    console.log("asset data: ", data)
    onNext();
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Add Asset</h1>
       <form onSubmit={handleSubmit(NextStep)}>
          <div>
              <div className='flex gap-x-2 '>
                <SelectInput label='Asset category' name='assetCategory' placeholder='Select asset category' options={assetCategories} control={control} register={register} error={errors}/>
                <TextInput label='Asset name' name='name' placeholder='e.g. Rental Property in Entebbe, SBGS Unit Trust Account' error={errors}  register={register}/>
              </div>

              <div className='flex gap-x-2 '>
                <SelectInput label='Acquisition' name='acquisition' placeholder='Select acquisition' options={acquisitionTypes} control={control} register={register} error={errors}/>
                <ReadOnlyInput label='Asset type' name='assetType' placeholder='Select asset type' register={register} error={errors}/>
              </div>
              
              <div className='flex gap-x-2 '>
                <SelectInput label='Currency' name='currency' placeholder='Select currency' options={currencyOptions} control={control} register={register} error={errors}/>
                <NumberInput label='Current value' name='currentValue' placeholder='e.g. 1,000,000' register={register} error={errors}/>
              </div>

              <div>
                <MultiTextInput label='Description ' name='description' placeholder='Describe the asset' register={register} error={errors}/>
              </div>
          </div>
          <div className='w-max ml-auto mt-5'>
            <BlueButton label='Next'/>
          </div>
       </form>
    </div>
  )
}

export default Add_AssetForm


//  const dummy_data = {
//     "name": "Mansion in Ebbs",
//     "description": "My mansion in Ebss, somewhere in Uganda",
//     "assetType": "Physical Assets",
//     "assetCategory": "Real estate",
//     "acquisition": "Purchased",
//     "currency": "UGX",
//     "currentValue": 1325500000
//   }