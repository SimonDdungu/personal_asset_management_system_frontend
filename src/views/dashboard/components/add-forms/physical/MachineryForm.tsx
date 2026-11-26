"use client"
import { NumberInput, TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import { CreateMachineryFormData, createMachinerySchema } from '@/src/validation/asset_properties/physical/machinery_Validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const MachineryForm = ({onNext, onBack, setData}: GotoNextStepper) => {
  
  const { register, handleSubmit, control, formState: {errors} } = useForm<CreateMachineryFormData>({
    resolver: zodResolver(createMachinerySchema), mode: "onChange", reValidateMode: "onChange",
  });

  function NextStep(data: CreateMachineryFormData){
    onNext()
    setData?.((prev: any) => ({ ...prev, ...data }));
  }

  return (
    <div>
        <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Machinery & Equipment Properties</h1>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput label='Brand (optional)' name={"brand"} placeholder='Enter brand of machinery' register={register} error={errors}/>

                <TextInput label='Model (optional)' name={"model"} placeholder='Enter model of machinery' register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
              <TextInput label='Material (optional)' name={"material"} placeholder='Enter material of machinery' register={register} error={errors}/>

              <NumberInput label='Manufactured Year (optional)' name={"year"} placeholder='Enter year of machinery' register={register} max={4} error={errors}/>
            </div>

            <div className='flex items-center justify-between gap-x-3 mt-5'>
              <BlueButton button onClick={onBack} label='Back'/>
              <BlueButton label='Next'/>
            </div>
        </form>
    </div>
  )
}

export default MachineryForm