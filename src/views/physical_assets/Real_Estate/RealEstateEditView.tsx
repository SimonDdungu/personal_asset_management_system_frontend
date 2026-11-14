"use client"
import { BlueButton, DetailViewLayout, NumberInput, SelectInput, TextInput, WhiteButton } from '@/src/components/ui';
import EditViewLayout from '@/src/components/ui/EditViewLayout';
import { currencyOptions } from '@/src/constants/currency/currency';
import { propertySizeUnitLabels, propertySizeUnitOptions } from '@/src/constants/symbols/propertySizeUnitLabels';
import { useGetRealEstateAsset } from '@/src/hooks/real_estate/useRealEstate';
import { formatDate } from '@/src/util/formatDateTime';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface RealEstateDetailViewProps {
    id: string
}

const RealEstateEditView = ({id}: RealEstateDetailViewProps) => {
    const { register, handleSubmit, control } = useForm();
    const { data, isLoading, isError, error } = useGetRealEstateAsset(id);

    const images = data?.images?.[0]?.images
    const imageCaption = data?.images?.[0]?.caption

    const documents = data?.documents?.[0]?.documents
    const documentCaption = data?.documents?.[0]?.caption

  return (
    <EditViewLayout assetName={data?.assetName}>

            <div>
                <div className='grid grid-cols-2 sm:grid-cols-[max-content_max-content_max-content] xl:grid-cols-[max-content_max-content_max-content_max-content] gap-x-5 sm:gap-x-10 gap-y-3 border-b pb-5 mb-3'>
            
                        <NumberInput label='Number of bedrooms' name={"numberBedrooms"} placeholder='Enter number of bedrooms'/>

                        <NumberInput label='Number of bathrooms' name={"numberBathrooms"} placeholder='Enter number of bathrooms'/>

                        <NumberInput label='Number of units' name={"numberUnits"} placeholder='Enter number of units'/>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <NumberInput label='Property size' name={"propertySize"} placeholder='Enter number of units'/>
                            <SelectInput label='Property units' name='propertySizeUnit' placeholder='Select property units' options={propertySizeUnitOptions} control={control} register={register}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <SelectInput label='Currency' name='constructionCostCurrency' placeholder='Select construction currency' options={currencyOptions} control={control} register={register}/>
                            <NumberInput label='Construction cost' name={"constructionCost"} placeholder='Enter construction cost'/>
                        </div>

                        <TextInput label='Construction completion date' name={"constructionCompletionDate"} placeholder='Enter construction completion date'/>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <SelectInput label='Currency' name='rentalIncomeCurrency' placeholder='Select rent currency' options={currencyOptions} control={control} register={register}/>
                            <NumberInput label='Rental Income' name={"rentalIncome"} placeholder='Enter construction cost'/>
                        </div>

                </div> 

            </div>

    </EditViewLayout>
  )
}

export default RealEstateEditView