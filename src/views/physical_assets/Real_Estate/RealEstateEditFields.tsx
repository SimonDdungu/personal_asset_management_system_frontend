import { NumberInput, SelectInput, TextInput } from '@/src/components/ui'
import { currencyOptions } from '@/src/constants/currency/currency';
import { propertySizeUnitOptions } from '@/src/constants/symbols/propertySizeUnitLabels';
import { UpdateAssetFormData } from '@/src/validation/asset_properties/asset_Validation';
import { UpdateRealEstateFormData } from '@/src/validation/asset_properties/physical/realEstate_Validation';
import React from 'react'
import { useFormContext } from 'react-hook-form';

const RealEstateEditFields = () => {
    const { register, control } = useFormContext<UpdateRealEstateFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <TextInput label='Address' name={"address"} placeholder='Enter address of property' register={register}/>

                        <div className='flex gap-x-5 items-center'>
                            <NumberInput label='Number of bedrooms' name={"numberBedrooms"} placeholder='Enter number of bedrooms' register={register}/>

                            <NumberInput label='Number of bathrooms' name={"numberBathrooms"} placeholder='Enter number of bathrooms' register={register}/>

                            <NumberInput label='Number of units' name={"numberUnits"} placeholder='Enter number of units' register={register}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <NumberInput label='Property size' name={"propertySize"} placeholder='Enter number of units' register={register}/>
                            <SelectInput label='Property units' name='propertySizeUnit' placeholder='Select property units' options={propertySizeUnitOptions} control={control} register={register}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <SelectInput label='Currency' name='constructionCostCurrency' placeholder='Select construction currency' options={currencyOptions} control={control} register={register}/>
                            <NumberInput label='Construction cost' name={"constructionCost"} placeholder='Enter construction cost' register={register}/>
                        </div>

                        <TextInput label='Construction completion date' name={"constructionCompletionDate"} placeholder='Enter construction completion date' register={register}/>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <SelectInput label='Currency' name='rentalIncomeCurrency' placeholder='Select rent currency' options={currencyOptions} control={control} register={register}/>
                            <NumberInput label='Rental Income' name={"rentalIncome"} placeholder='Enter rental income' register={register}/>
                        </div>

                </div> 

            </div>
  )
}

export default RealEstateEditFields