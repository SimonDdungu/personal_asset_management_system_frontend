"use client"
import BlueButton from '@/src/components/ui/buttons/BlueButton';
import DocumentForm from '@/src/components/ui/documents/DocForm';
import ImageForm from '@/src/components/ui/images/ImageForm';
import { useCreateRealEstateAsset } from '@/src/hooks/asset-properties/physical-assets/real_estate/useRealEstate';
import { GotoNextStepper } from '@/src/interfaces/stepper/stepper_interfaces';
import React, { useState } from 'react';

interface MediaFormProps {
  assetData: any;
}

interface mediaProps extends GotoNextStepper{
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  docs: File[];
  setDocs: React.Dispatch<React.SetStateAction<File[]>>;
  setFileCaption?: (value: string) => void;
  setFileType?: (value: string) => void;
}

const MediaForm = ({images, setImages, docs, setDocs, onNext, onBack, setData}: mediaProps) => {

  const [imageCaption, setImageCaption] = useState<string | null>(null)

  const [documentCaption, setDocumentCaption] = useState<string | null>(null)
  const [documentType, setDocumentType] = useState<string | null>(null)


  function Next(){
    setData?.((prev: any) => ({...prev, assetDocumentTypeName: documentType}))
    onNext();
  }
 

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2 pb-1 border-b'>Media Properties</h1>
        <div className='flex flex-col gap-y-3'>
          <div className='pb-3 border-b'>
            <ImageForm files={images} setFiles={setImages} setFileCaption={setImageCaption}/>
          </div>
         <DocumentForm files={docs} setFiles={setDocs} setFileCaption={setDocumentCaption} setFileType={setDocumentType}/>
        </div>

        <div className='flex items-center justify-between gap-x-3 mt-5'>
          <BlueButton label='Back' onClick={onBack}/>
          <BlueButton button label='Confirm' onClick={Next}/>
        </div>
    </div>
  )
}

export default MediaForm
