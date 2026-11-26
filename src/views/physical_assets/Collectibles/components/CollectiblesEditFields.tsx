import { NumberInput, TextInput } from '@/src/components/ui';
import { UpdateCollectiblesValuablesFormData } from '@/src/validation/asset_properties/physical/collectiblesValuables_Validation';
import { useFormContext } from 'react-hook-form';

const CollectiblesEditFields = () => {
    const { register, control, formState: { errors } } = useFormContext<UpdateCollectiblesValuablesFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <div className='flex gap-x-5 items-center'>
                            <TextInput label='Creator' name={"creator"} placeholder='Enter creator of collectible' register={register} error={errors}/>

                            <TextInput label='Material' name={"material"} placeholder='Enter material of collectible' register={register} error={errors}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <TextInput label='Serial number' name={"serialNumber"} placeholder='Enter serial number of collectible' register={register} error={errors}/>
                            
                            <NumberInput label='Year' name={"year"} placeholder='Enter year of collectible' register={register} error={errors}/>
                        </div>

                </div> 

            </div>
  )
}

export default CollectiblesEditFields