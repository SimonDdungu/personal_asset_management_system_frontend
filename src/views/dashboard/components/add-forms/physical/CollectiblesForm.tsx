"use client"
import { NumberInput, TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import { CreateCollectiblesValuablesFormData, createCollectiblesValuablesSchema } from '@/src/validation/asset_properties/physical/collectiblesValuables_Validation';
import { CreateMachineryFormData, createMachinerySchema } from '@/src/validation/asset_properties/physical/machinery_Validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CollectiblesForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  
  const { register, handleSubmit, control, formState: {errors} } = useForm<CreateCollectiblesValuablesFormData>({
    resolver: zodResolver(createCollectiblesValuablesSchema), 
  });

  function NextStep(data: CreateCollectiblesValuablesFormData){
    onNext()
    setData?.((prev: any) => ({ ...prev, ...data }));
  }

  return (
    <div>
        <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Collectible and Valuable Properties</h1>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput label='Creator (optional)' name={"creator"} placeholder='Enter creator of collectible' register={register} error={errors}/>

                <TextInput label='Material (optional)' name={"material"} placeholder='Enter material of collectible' register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
              <TextInput label='Serial number (optional)' name={"serialNumber"} placeholder='Enter serial number of collectible' register={register} error={errors}/>
                            
              <NumberInput label='Year (optional)' name={"year"} placeholder='Enter year of collectible' register={register} error={errors}/>
            </div>

            <div className='flex items-center justify-between gap-x-3 mt-5'>
              <BlueButton button onClick={onBack} label='Back'/>
              <BlueButton label='Next'/>
            </div>
        </form>
    </div>
  )
}

export default CollectiblesForm