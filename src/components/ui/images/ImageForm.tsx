import { mediaProps } from "@/src/interfaces/media/mediaPropsTypes"
import TextInput from "../input/TextInput"
import ImagePicker from "./ImagePicker"
import { useForm } from "react-hook-form"

const ImageForm = ({files, setFiles, setFileCaption, assetName}: mediaProps) => {
  const {register} = useForm();
  
  return (
    <div>
        <div className="mb-1 text-sm">Add images of the asset</div>
        <ImagePicker value={files} onChange={setFiles} />
    </div>
  )
}

export default ImageForm