"use client"
import { TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/BlueButton';
import NumberInput from '@/src/components/ui/NumberInput';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import React from 'react'
import { useForm } from 'react-hook-form';

const ElectronicForm = ({onNext}: GotoNextStepper) => {
    const { register, handleSubmit } = useForm();

    const dummy_data = {
    "brand": "Apple",
    "model": "iPhone 18 Pro",
    "color": "F2LM40XYZ93N",
    "serialNumber": "Cosmic Silver",
    "year": 2026,
    "currency": "USD",
    "currentValue": 1199.00
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

export default ElectronicForm