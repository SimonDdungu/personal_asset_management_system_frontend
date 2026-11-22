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
        <h4>{assetName ?? "Asset"} Documents</h4>
        <span>Add documents </span>
        <DocumentPicker value={files} onChange={setFiles}/>

        {setFileCaption && 
            <div className='mb-1'>
            <SelectInput name='assetDocumentTypeName'label='Document Type' options={documentTypes} register={register} control={control} onChange={setFileType}/>
            </div>
        }

        {setFileCaption && <TextInput label='Image caption' name='caption' onChange={setFileCaption}/>}
    </div>
  )
}

export default DocumentForm