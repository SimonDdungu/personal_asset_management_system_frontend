import { NumberInput, TextInput } from '@/src/components/ui';
import { UpdateMachineryFormData } from '@/src/validation/asset_properties/physical/machinery_Validation';
import { useFormContext } from 'react-hook-form';

const MachineryEditFields = () => {
    const { register, control } = useFormContext<UpdateMachineryFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <div className='flex gap-x-5 items-center'>
                            <TextInput label='Brand' name={"brand"} placeholder='Enter brand of machinery' register={register}/>

                            <TextInput label='Model' name={"model"} placeholder='Enter model of machinery' register={register}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <TextInput label='Material' name={"material"} placeholder='Enter material of machinery' register={register}/>

                            <NumberInput label='Year' name={"year"} placeholder='Enter year of machinery' register={register} max={4}/>
                        </div>

                </div> 

            </div>
  )
}

export default MachineryEditFields