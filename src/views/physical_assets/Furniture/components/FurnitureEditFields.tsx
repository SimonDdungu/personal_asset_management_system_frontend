import { TextInput } from '@/src/components/ui';
import { UpdateFurnitureFormData } from '@/src/validation/asset_properties/physical/furniture_Validation';
import { useFormContext } from 'react-hook-form';

const FurnitureEditFields = () => {
    const { register, control, formState: { errors } } = useFormContext<UpdateFurnitureFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <div className='flex gap-x-5 items-center'>
                            <TextInput label='Brand' name={"brand"} placeholder='Enter brand of furniture' register={register} error={errors}/>

                            <TextInput label='Material' name={"material"} placeholder='Enter material of furniture' register={register} error={errors}/>
                        </div>

                </div> 

            </div>
  )
}

export default FurnitureEditFields