"use client"
import { acquisitionTypes } from '@/src/constants/assets_options/acquistion';
import { currencyOptions } from '@/src/constants/currency/currency';
import { useUpdateAsset } from '@/src/hooks/assets/useAssets';
import { UpdateAssetFormData, updateAssetSchema } from '@/src/validation/asset_properties/asset_Validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useRef, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { BlueButton, NumberInput, SelectInput, TextInput, WhiteButton } from '..';
import MultiTextInput from '../input/MultiTextInput';
import FullScreenLoadingSpinner from '../loading_state/FullScreenLoadingSpinner';
import { useRouter } from 'next/navigation';

interface DetailViewLayoutProps <T extends FieldValues>{
    assetid: string,
    assetName: string,
    category: string,
    children: ReactNode,
    onCategorySubmit: (values: UpdateAssetFormData & T) => Promise<void>;
    initialData?: UpdateAssetFormData & T;
    viewPath: string;
}

const EditViewLayout =  <T extends FieldValues,>({assetid, assetName, children, category, onCategorySubmit, initialData, viewPath}: DetailViewLayoutProps<T>) => {
    const router = useRouter();
    
    const [loading, setLoading] = useState<boolean>(false)

    const methods =useForm<UpdateAssetFormData & T>({values: initialData,});

    const { register, control, handleSubmit, getValues, formState: {errors} } = methods;

    const updateAsset = useUpdateAsset();
    const requestInProgress = useRef(false);

    const handleSave = async(data: UpdateAssetFormData & T) => {
         if (requestInProgress.current) return;

        requestInProgress.current = true;

        setLoading(true)
        try {
            const AssetData = updateAssetSchema.parse(data);

            await updateAsset.mutateAsync({id: assetid, data: AssetData});

            await onCategorySubmit(getValues());

            router.push(viewPath);
        } catch (error) {
            console.error("Failed to update asset:", error);
        } finally {
            requestInProgress.current = false;
            setLoading(false)
        }
    };
 

  return (
    <section>
         <FormProvider {...methods}>
            
        
         <form  onSubmit={handleSubmit(handleSave)}>
        <div className='box-border px-40 pt-10 pb-20'>
            <div className='mb-5 flex justify-between items-center'>
                <div>
                    <h1 className='text-xl'>Edit Asset</h1>
                    <span className='text-gray-700 text-xs'>Update this asset's information, value, images, and documents.</span>
                </div>
                <div className='flex items-center gap-x-3'>
                    <WhiteButton link={viewPath} disabled={!initialData || loading} label='Cancel' button={true}/>
                    <BlueButton disabled={!initialData || loading} label='Save'/>
                </div>
            </div>

            

            <div className='relative overflow-hidden rouded-lg pb-10 px-5 pt-5'>
                {!initialData ? 
                <div className='h-120 w-full'>
                    <FullScreenLoadingSpinner />
                </div>
                : 
                <>  
                        {loading && <FullScreenLoadingSpinner bg_color='bg-black/80' label='updating...'/>}
                        <div className='mb-5 bg-white rounded-lg px-5 py-8 text-sm border'>
                            <div className='pb-3 mb-3 border-b'>
                                <h5 className=''>Asset Information</h5>
                                <span className='text-gray-700 text-xs'>Information used to identify this asset.</span>
                            </div>
                            <div>
                                <div className='flex flex-row gap-x-5 items-center'>
                                    <SelectInput label='Acquisition' name='acquisition' placeholder='Select acquisition' options={acquisitionTypes} control={control} register={register} error={errors}/>
                                    <TextInput label='Asset Name' name={"name"} placeholder='Enter name of asset' register={register} error={errors}/>
                                </div>
                                <div className='flex flex-row gap-x-5 items-center'>
                                    <SelectInput label='Currency' name='currency' placeholder='Select currency' options={currencyOptions} control={control} register={register} error={errors}/>
                                    <NumberInput label='Current Value' name={"currentValue"} placeholder='Enter current value of asset' register={register} error={errors}/>
                                </div>
                            </div>
                        </div>

                        <div className='mb-5 bg-white rounded-lg px-5 py-8 text-sm border'>
                            <div className='pb-3 mb-3 border-b'>
                                <h5><span className="capitalize">{category}</span> Information</h5>
                            </div>
                            {children}
                        </div>

                        <div className='mb-10 bg-white rounded-lg px-5 py-8 text-sm border'>
                            <div className='mb-3'>
                                <h5>Description</h5>
                                <span className='text-gray-700 text-xs'>Provide context and useful information about this property.</span>
                            </div>
                            <MultiTextInput name={"description"} placeholder='Enter description of the asset' register={register} error={errors}/>
                        </div>
                    </>
                    }

            </div>


        </div>
        </form>
         </FormProvider>
    </section>
  )
}

export default EditViewLayout