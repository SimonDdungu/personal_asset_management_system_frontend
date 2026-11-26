import { NumberInput, SelectInput, TextInput } from '@/src/components/ui';
import { propertySizeUnitOptions } from '@/src/constants/symbols/propertySizeUnitLabels';
import { UpdateLandFormData } from '@/src/validation/asset_properties/physical/land_Validation';
import { useFormContext } from 'react-hook-form';

const LandEditFields = () => {
    const { register, control, formState: { errors } } = useFormContext<UpdateLandFormData>();
  return (
        <div>
                <div className='flex flex-col gap-y-3'>

                        <div className='flex gap-x-5 items-center'>
                            <TextInput label='Address' name={"address"} placeholder='Enter address of land' register={register} error={errors}/>

                            <TextInput label='Plot number' name={"plotNumber"} placeholder='Enter plot number of land' register={register} error={errors}/>
                        </div>

                        <div className='flex flex-row gap-x-5 items-center'>
                            <NumberInput label='Land size' name={"landSize"} placeholder='Enter land size' register={register} error={errors}/>

                            <SelectInput label='Land size unit' name='landSizeUnit' placeholder='Select land size units' options={propertySizeUnitOptions} control={control} register={register} error={errors}/>
                        </div>

                </div> 

            </div>
  )
}

export default LandEditFields