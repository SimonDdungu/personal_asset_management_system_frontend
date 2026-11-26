"use client"
import { SelectInput, TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import NumberInput from '@/src/components/ui/input/NumberInput';
import { currencyOptions } from '@/src/constants/currency/currency';
import { propertySizeUnitOptions } from '@/src/constants/symbols/propertySizeUnitLabels';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import { CreateRealEstateFormData, createRealEstateSchema } from '@/src/validation/asset_properties/physical/realEstate_Validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const RealEstateForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  
  const { register, handleSubmit, control, formState: {errors} } = useForm<CreateRealEstateFormData>({
    resolver: zodResolver(createRealEstateSchema), mode: "onChange",  reValidateMode: "onChange",
  });

  function NextStep(data: CreateRealEstateFormData){
    onNext()
    setData?.((prev: any) => ({ ...prev, ...data }));
  }

  return (
    <div>
        <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Real Estate Properties</h1>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput required={true} label='Address' name='address' placeholder='e.g. Entebbe Rd, Kampala'  register={register} error={errors}/>
                <NumberInput required={true} label='Number of bedrooms' name='numberBedrooms' placeholder='Enter number of bedrooms'  register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
                <NumberInput required={true} label='Number of bathrooms' name='numberBathrooms' placeholder='Enter number of bedrooms'  register={register} error={errors}/>
                <NumberInput label='Number of units (optional)' name='numberUnits' placeholder='Enter number of units property has'  register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
                <NumberInput label='Property size (optional)' name='propertySize' placeholder='e.g 1,000'  register={register}/>
                <SelectInput label='Property size unit (optional)' name='propertySizeUnit' placeholder='Select property size unit' options={propertySizeUnitOptions} control={control} register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
                <SelectInput label='Construction cost currency (optional)' name='constructionCostCurrency' placeholder='Select currency' options={currencyOptions} control={control} register={register} error={errors}/>
                <NumberInput label='construction cost (optional)' name='constructionCost' placeholder='Enter cost of construction'  register={register} error={errors}/>
            </div>

            <div>
              <TextInput label='Construction completion date (optional)' name='constructionCompletionDate' placeholder='e.g. 2026' register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
                <SelectInput label='Rental income currency (optional)' name='rentalIncomeCurrency' placeholder='Select currency' options={currencyOptions} control={control} register={register} error={errors}/>
                <NumberInput label='Rental income (optional)' name='rentalIncome' placeholder='Enter rental income'  register={register} error={errors}/>
            </div>
              
            

            <div className='flex items-center justify-between gap-x-3 mt-5'>
              <BlueButton button onClick={onBack} label='Back'/>
              <BlueButton label='Next'/>
            </div>
        </form>
    </div>
  )
}

export default RealEstateForm