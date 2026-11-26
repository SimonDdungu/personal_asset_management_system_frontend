"use client"
import { SelectInput, TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import NumberInput from '@/src/components/ui/input/NumberInput';
import { propertySizeUnitOptions } from '@/src/constants/symbols/propertySizeUnitLabels';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import { CreateLandFormData, createLandSchema } from '@/src/validation/asset_properties/physical/land_Validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const LandForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  
  const { register, handleSubmit, control, formState: {errors} } = useForm<CreateLandFormData>({
    resolver: zodResolver(createLandSchema), 
  });

  function NextStep(data: CreateLandFormData){
    onNext()
    setData?.((prev: any) => ({ ...prev, ...data }));
  }

  return (
    <div>
        <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Land Properties</h1>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput required={true} label='Address' name={"address"} placeholder='Enter address of land' register={register} error={errors}/>
                
                <TextInput required={true} label='Plot number' name={"plotNumber"} placeholder='Enter plot number of land' register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
               <NumberInput required={true} label='Land size' name={"landSize"} placeholder='Enter land size' register={register} error={errors}/>

                <SelectInput required={true} label='Land size unit' name='landSizeUnit' placeholder='Select land size units' options={propertySizeUnitOptions} control={control} register={register} error={errors}/>
            </div>
              
            <div className='flex items-center justify-between gap-x-3 mt-5'>
              <BlueButton button onClick={onBack} label='Back'/>
              <BlueButton label='Next'/>
            </div>
        </form>
    </div>
  )
}

export default LandForm