"use client"
import { TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import NumberInput from '@/src/components/ui/input/NumberInput';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import { CreateVehicleFormData, createVehicleSchema } from '@/src/validation/asset_properties/physical/vehicle_Validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const VehicleForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  
  const { register, handleSubmit, control, formState: {errors} } = useForm<CreateVehicleFormData>({
    resolver: zodResolver(createVehicleSchema), 
  });

  function NextStep(data: CreateVehicleFormData){
    onNext()
    setData?.((prev: any) => ({ ...prev, ...data }));
  }

  return (
    <div>
        <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Vehicle Properties</h1>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput required={true} label='Make' name={"make"} placeholder='Enter make of vehicle' register={register} error={errors}/>
    
                <TextInput required={true} label='Model' name={"model"} placeholder='Enter model of vehicle' register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
               <TextInput required={true} label='Color' name={"color"} placeholder='Enter color of vehicle' register={register} error={errors}/>
                <NumberInput label='Mileage (optional)' name={"mileage"} placeholder='Enter mileage of vehicle' register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
                <TextInput label='Registration number (optional)' name={"registrationNumber"} placeholder='Enter registration number of vehicle' register={register} error={errors}/>

                <TextInput label='VIN (optional)' name={"vin"} placeholder='Enter vin of vehicle' register={register} error={errors}/>
            </div>

            <NumberInput required={true} label='Year' name={"year"} placeholder='Enter year of vehicle' register={register} max={4} error={errors}/>
              
            <div className='flex items-center justify-between gap-x-3 mt-5'>
              <BlueButton button onClick={onBack} label='Back'/>
              <BlueButton label='Next'/>
            </div>
        </form>
    </div>
  )
}

export default VehicleForm