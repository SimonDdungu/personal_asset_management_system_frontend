import { NumberInput, TextInput } from '@/src/components/ui';
import { UpdateElectronicsFormData } from '@/src/validation/asset_properties/physical/electronics_Validation';
import { useFormContext } from 'react-hook-form';

const ElectronicsEditFields = () => {
    const { register, control } = useFormContext<UpdateElectronicsFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <div className='flex gap-x-5 items-center'>
                            <TextInput label='Brand' name={"brand"} placeholder='Enter brand of electronic' register={register}/>

                            <TextInput label='Model' name={"model"} placeholder='Enter model of electronic' register={register}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <TextInput label='Color' name={"color"} placeholder='Enter color of electronic' register={register}/>

                            <TextInput label='Serial number' name={"serialNumber"} placeholder='Enter serial number of electronic' register={register}/>
                        </div>

                        <NumberInput label='Year' name={"year"} placeholder='Enter year of electronic' register={register} max={4}/>

                </div> 

            </div>
  )
}

export default ElectronicsEditFields