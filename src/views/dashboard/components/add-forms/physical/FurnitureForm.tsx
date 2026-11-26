"use client"
import { TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import { CreateFurnitureFormData, createFurnitureSchema } from '@/src/validation/asset_properties/physical/furniture_Validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const FurnitureForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  
  const { register, handleSubmit, control, formState: {errors} } = useForm<CreateFurnitureFormData>({
    resolver: zodResolver(createFurnitureSchema), 
  });

  function NextStep(data: CreateFurnitureFormData){
    onNext()
    setData?.((prev: any) => ({ ...prev, ...data }));
  }

  return (
    <div>
        <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Furniture Properties</h1>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput label='Brand (optional)' name={"brand"} placeholder='Enter brand of furniture' register={register} error={errors}/>

                <TextInput label='Material (optional)' name={"material"} placeholder='Enter material of furniture' register={register} error={errors}/>
            </div>

            <div className='flex items-center justify-between gap-x-3 mt-5'>
              <BlueButton button onClick={onBack} label='Back'/>
              <BlueButton label='Next'/>
            </div>
        </form>
    </div>
  )
}

export default FurnitureForm