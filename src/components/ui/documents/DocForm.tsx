import { mediaProps } from "@/src/interfaces/media/mediaPropsTypes";
import SelectInput from "../input/SelectInput";
import TextInput from "../input/TextInput";
import DocumentPicker from "./DocumentPicker";
import { useForm } from "react-hook-form";
import { documentTypes } from "@/src/constants/document_options/documentTypes";

const DocumentForm = ({files, setFiles, setFileCaption, setFileType, assetName}: mediaProps) => {
  const { register, handleSubmit, control } = useForm();
  return (
    <div>
        <div className="mb-1 text-sm">Add documents associated with the asset</div>
        <DocumentPicker value={files} onChange={setFiles}/>

        {setFileType && 
            <div className='mt-3'>
            <SelectInput name='assetDocumentTypeName'label='Document Type' options={documentTypes} register={register} control={control} onChange={setFileType}/>
            </div>
        }
    </div>
  )
}

export default DocumentForm