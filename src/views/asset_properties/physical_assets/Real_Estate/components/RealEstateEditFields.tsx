import { NumberInput, SelectInput, TextInput } from '@/src/components/ui'
import { currencyOptions } from '@/src/constants/currency/currency';
import { propertySizeUnitOptions } from '@/src/constants/symbols/propertySizeUnitLabels';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateRealEstateFormData } from '@/src/validation/asset_properties/physical/realEstate_Validation';
import React from 'react'
import { useFormContext } from 'react-hook-form';

const RealEstateEditFields = () => {
    const { register, control, formState: { errors } } = useFormContext<UpdateRealEstateFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <TextInput label='Address' name={"address"} placeholder='Enter address of property' register={register} error={errors}/>

                        <div className='flex gap-x-5 items-center'>
                            <NumberInput label='Number of bedrooms' name={"numberBedrooms"} placeholder='Enter number of bedrooms' register={register} error={errors}/>

                            <NumberInput label='Number of bathrooms' name={"numberBathrooms"} placeholder='Enter number of bathrooms' register={register} error={errors}/>

                            <NumberInput label='Number of units' name={"numberUnits"} placeholder='Enter number of units' register={register} error={errors}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <NumberInput label='Property size' name={"propertySize"} placeholder='Enter number of units' register={register} error={errors}/>
                            <SelectInput label='Property units' name='propertySizeUnit' placeholder='Select property units' options={propertySizeUnitOptions} control={control} register={register} error={errors}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <SelectInput label='Currency' name='constructionCostCurrency' placeholder='Select construction currency' options={currencyOptions} control={control} register={register} error={errors}/>
                            <NumberInput label='Construction cost' name={"constructionCost"} placeholder='Enter construction cost' register={register} error={errors}/>
                        </div>

                        <TextInput label='Construction completion date' name={"constructionCompletionDate"} placeholder='Enter construction completion date' register={register} error={errors}/>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <SelectInput label='Currency' name='rentalIncomeCurrency' placeholder='Select rent currency' options={currencyOptions} control={control} register={register} error={errors}/>
                            <NumberInput label='Rental Income' name={"rentalIncome"} placeholder='Enter rental income' register={register} error={errors}/>
                        </div>

                </div> 

            </div>
  )
}

export default RealEstateEditFields