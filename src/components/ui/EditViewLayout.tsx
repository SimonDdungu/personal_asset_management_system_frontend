"use client"
import { acquisitionTypes } from '@/src/constants/assets_options/acquistion';
import { currencyOptions } from '@/src/constants/currency/currency';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { BlueButton, NumberInput, SelectInput, TextInput, WhiteButton } from '.';

interface DetailViewLayoutProps {
    assetName: string,
    children: ReactNode,
}
const EditViewLayout = ({assetName, children }: DetailViewLayoutProps) => {
    const { register, handleSubmit, control } = useForm();
    
  return (
    <section>
        <div className='box-border px-10 pt-10 pb-20'>
            <div className='mb-5'>
                <h1 className='text-xl'>Edit {assetName ?? "Asset"}</h1>
                <span className='text-gray-700 text-sm'>Update this asset's information, value, images, and documents.</span>
            </div>

            <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                <h5 className='mb-4'>Asset Information</h5>
                <span className='text-gray-700'>Information used to identify this asset.</span>
                <div>
                    <div className='flex flex-row gap-x-5 items-center'>
                        <SelectInput label='Acquisition' name='acquisition' placeholder='Select acquisition' options={acquisitionTypes} control={control} register={register}/>
                        <TextInput name={"assetName"} placeholder='Enter name of asset'/>
                    </div>
                    <div className='flex flex-row gap-x-5 items-center'>
                        <SelectInput label='Currency' name='currency' placeholder='Select currency' options={currencyOptions} control={control} register={register}/>
                        <NumberInput name={"currentValue"} placeholder='Enter current value of asset'/>
                    </div>
                </div>
            </div>

            <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                {children}
            </div>

            <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                <h5>Description</h5>
                <span className='text-gray-700 text-sm mb-2'>Provide context and useful information about this property.</span>
                <TextInput name={"description"} placeholder=''/>
            </div>

            <div className='pt-5 border-t w-max ml-auto flex flex-row gap-x-2'>
                <WhiteButton label='Cancel'/>
                <BlueButton label='Save'/>
            </div>

        </div>

    </section>
  )
}

export default EditViewLayout