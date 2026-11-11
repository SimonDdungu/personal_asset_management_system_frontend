"use client"
import { TextInput } from '@/src/components/ui'
import BlueButton from '@/src/components/ui/BlueButton'
import DocumentPicker from '@/src/components/ui/DocumentPicker';
import ImagePicker from '@/src/components/ui/ImagePicker';
import SelectInput from '@/src/components/ui/SelectInput';
import { documentTypes } from '@/src/constants/document_options/documentTypes';
import { useCreateElectronicAsset } from '@/src/hooks/electronics/useElectronics';
import { useCreateRealEstateAsset } from '@/src/hooks/real_estate/useRealEstate';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface MediaFormProps {
  assetData: any;
}

interface mediaProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setFileCaption?: (value: string) => void;
  setFileType?: (value: string) => void;
}

const MediaForm = ({assetData}: MediaFormProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [imageCaption, setImageCaption] = useState<string | null>(null)

  const [documents, setDocuments] = useState<File[]>([]);
  const [documentCaption, setDocumentCaption] = useState<string | null>(null)
  const [documentType, setDocumentType] = useState<string | null>(null)

 const { mutate, isPending } = useCreateRealEstateAsset();

  function createAsset() {
   const formData = new FormData();

    formData.append("asset.name", assetData.asset.name);
    formData.append("asset.description", assetData.asset.description);
    formData.append("asset.assetCategory", assetData.asset.assetCategory);
    formData.append("asset.assetType", assetData.asset.assetType);
    formData.append("asset.acquisition", assetData.asset.acquisition);
    formData.append("asset.currency", assetData.asset.currency);
    formData.append("asset.currentValue", assetData.asset.currentValue);

    // Preserve your existing asset object
    Object.entries(assetData).forEach(([key, value]) => {
       if (key !== "asset") {
        formData.append(key, String(value));
      }
    });

    // Add images
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images.images", image);
      });

      if (imageCaption?.trim()) {
        formData.append("images.caption", imageCaption);
      }

      formData.append("images.primaryImageIndex", String(0));
    }

    // add documents
    if (documents.length > 0) {
      documents.forEach((document) => {
        formData.append("documents.documents", document);
      });

      if (documentCaption?.trim()) {
        formData.append("documents.caption", documentCaption);
      }

      if (documentType?.trim()) {
        formData.append("documents.assetDocumentTypeName", documentType);
      }
    }

    mutate(formData);
    console.log("Submitting data: ", formData)
  }

  return (
    <div>
        <div className='flex flex-col gap-y-3'>
         <ImageForm files={images} setFiles={setImages} setFileCaption={setImageCaption}/>
         <DocumentForm files={documents} setFiles={setDocuments} setFileCaption={setDocumentCaption} setFileType={setDocumentType}/>
        </div>

        <div>
          <BlueButton label={isPending ? "Submitting..." : "Submit"} onClick={createAsset}/>
        </div>
    </div>
  )
}

export default MediaForm




const ImageForm = ({files, setFiles, setFileCaption}: mediaProps) => {
  
  return (
    <div>
        <h4>Asset Image</h4>
        <span>Add images of the asset</span>
        <ImagePicker value={files} onChange={setFiles} />
        <TextInput label='Image caption' name='caption' onChange={setFileCaption}/>
    </div>
  )
}

const DocumentForm = ({files, setFiles, setFileCaption, setFileType}: mediaProps) => {
  const { register, handleSubmit, control } = useForm();
  return (
    <div>
        <h4>Asset Documents</h4>
        <span>Add documents </span>
        <DocumentPicker value={files} onChange={setFiles}/>

        <div className='mb-1'>
          <SelectInput name='assetDocumentTypeName'label='Document Type' options={documentTypes} register={register} control={control} onChange={setFileType}/>
        </div>

        <TextInput label='Image caption' name='caption' onChange={setFileCaption}/>
    </div>
  )
}