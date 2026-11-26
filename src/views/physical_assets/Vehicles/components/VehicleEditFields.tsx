import { NumberInput, TextInput } from '@/src/components/ui';
import { UpdateVehicleFormData } from '@/src/validation/asset_properties/physical/vehicle_Validation';
import { useFormContext } from 'react-hook-form';

const VehicleEditFields = () => {
    const { register, control } = useFormContext<UpdateVehicleFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <div className='flex gap-x-5 items-center'>

                            <TextInput label='Make' name={"make"} placeholder='Enter make of vehicle' register={register}/>
    
                            <TextInput label='Model' name={"model"} placeholder='Enter model of vehicle' register={register}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <TextInput label='Color' name={"color"} placeholder='Enter color of vehicle' register={register}/>

                            <NumberInput label='Mileage' name={"mileage"} placeholder='Enter mileage of vehicle' register={register}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <TextInput label='Registration number' name={"registrationNumber"} placeholder='Enter registration number of vehicle' register={register}/>

                            <TextInput label='VIN' name={"vin"} placeholder='Enter vin of vehicle' register={register}/>
                        </div>

                        <NumberInput label='Year' name={"year"} placeholder='Enter year of vehicle' register={register} max={4}/>

                </div> 

            </div>
  )
}

export default VehicleEditFields