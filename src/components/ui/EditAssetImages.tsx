import React, { useState } from 'react'
import Image from 'next/image'
import ImagePicker from './ImagePicker'

interface AssetImages {
    id: string,
    imageUrl: string
}
interface EditImageProps {
    images: AssetImages[]
}

const EditAssetImages = ({images}: EditImageProps) => {
    const [files, setFiles] = useState<File[]>([]);

  return (
    <div>
        {images?.length > 0 && 
            <div className='flex flex-row gap-x-5 items-center mb-5'>
                {images?.map((pic: any) => (
                    <div key={pic.id} className={`cursor-pointer rounded-lg overflow-hidden w-50 h-full relative`}>
                        <div className='absolute bg-black/20 top-0 left-0 right-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity z-5'></div>
                        <Image src={pic?.imageUrl} alt={"edit images"} fill className='object-cover' unoptimized/>
                    </div>
                ))}
            </div>
        }
        <div>
            <ImagePicker value={files} onChange={setFiles} />
        </div>
    </div>
  )
}

export default EditAssetImages