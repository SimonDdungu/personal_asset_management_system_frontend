"use client"
import { TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/BlueButton';
import NumberInput from '@/src/components/ui/NumberInput';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import React from 'react'
import { useForm } from 'react-hook-form';

const RealEstateForm = ({onNext}: GotoNextStepper) => {
  const { register, handleSubmit } = useForm();

  const dummy_data = {
    "address": "Entebbe, Uganda",
    "description": "A spacious mansion located in Ebbs, Uganda, featuring modern architecture, a large compound, and premium residential finishes.",
    "numberBedrooms": 6,
    "numberBathrooms": 5,
    "propertySize": 850,
    "propertySizeUnit": "SQUARE_METERS",
    "constructionCostCurrency": "UGX",
    "constructionCost": 850000000,
    "constructionCompletionDate": "2024-06-15"
  }

  function NextStep(data: any){
    onNext(dummy_data)
  }

  return (
    <div>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput label='Brand' name='brand' placeholder='e.g. Apple, Samsung, Sony, HP'  register={register}/>
                <TextInput label='Model' name='model' placeholder='e.g. iPhone 18, Samsung S26 Ultra, HP Envy'  register={register}/>
            </div>

            <div className='flex items-start gap-x-2'>
                <TextInput label='Color' name='color' placeholder='e.g. Black, White, Silver, Green, Blue'  register={register}/>
                <TextInput label='Serial number' name='serialNumber' placeholder='e.g. XXX-0000-QQQ'  register={register}/>
            </div>

            <NumberInput label='Release year' name='year' placeholder='e.g. 2026' register={register} max={4}/>

          <BlueButton onClick={NextStep} label='Next'/>
        </form>
    </div>
  )
}

export default RealEstateForm