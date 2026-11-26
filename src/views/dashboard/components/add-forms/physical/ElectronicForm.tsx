"use client"
import { TextInput } from '@/src/components/ui';
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import NumberInput from '@/src/components/ui/input/NumberInput';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import { CreateElectronicsFormData, createElectronicsSchema } from '@/src/validation/asset_properties/physical/electronics_Validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const ElectronicForm = ({onNext, onBack, setData}: GotoNextStepper) => {
    const { register, handleSubmit, control, formState: {errors} } = useForm<CreateElectronicsFormData>({
        resolver: zodResolver(createElectronicsSchema), mode: "onChange", reValidateMode: "onChange",
      });

  function NextStep(data: CreateElectronicsFormData){
    setData?.((prev: any) => ({...prev, ...data}));
    onNext()
  }

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Electronic Properties</h1>
        <form onSubmit={handleSubmit(NextStep)}>
            <div className='flex items-start gap-x-2'>
                <TextInput required={true} label='Brand' name='brand' placeholder='e.g. Apple, Samsung, Sony, HP'  register={register} error={errors}/>
                <TextInput label='Model (optional)' name='model' placeholder='e.g. iPhone 18, Samsung S26 Ultra, HP Envy'  register={register} error={errors}/>
            </div>

            <div className='flex items-start gap-x-2'>
                <TextInput label='Color (optional)' name='color' placeholder='e.g. Black, White, Silver, Green, Blue'  register={register} error={errors}/>
                <TextInput label='Serial number (optional)' name='serialNumber' placeholder='e.g. XXX-0000-QQQ'  register={register} error={errors}/>
            </div>

            <NumberInput label='Release year (optional)' name='year' placeholder='e.g. 2026' register={register} max={4} error={errors}/>

          <div className='flex items-center justify-between gap-x-3 mt-5'>
              <BlueButton button onClick={onBack} label='Back'/>
              <BlueButton label='Next'/>
          </div>
        </form>
    </div>
  )
}

export default ElectronicForm