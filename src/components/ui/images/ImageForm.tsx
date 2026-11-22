import { mediaProps } from "@/src/interfaces/media/mediaPropsTypes"
import TextInput from "../input/TextInput"
import ImagePicker from "./ImagePicker"

const ImageForm = ({files, setFiles, setFileCaption, assetName}: mediaProps) => {
  
  return (
    <div>
        <div className="mb-1">Add images of the asset</div>
        <ImagePicker value={files} onChange={setFiles} />
        {setFileCaption && <TextInput label='Image caption' name='caption' onChange={setFileCaption}/>}
    </div>
  )
}

export default ImageForm