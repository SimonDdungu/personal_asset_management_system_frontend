"use client"
import { Check, ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import WhiteButton from '../buttons/WhiteButton';
import { DeleteAssetImageDialog } from '../dialogs/DeleteAssetImageDialog';
import { usedDeleteImages } from '@/src/hooks/images/useImages';
import FullScreenLoadingSpinner from '../loading_state/FullScreenLoadingSpinner';

type AssetImage = {
  imageUrl: string;
  isPrimary: boolean;
};

interface AssetCoverImagesProps {
    uploadId: string;
    assetImages?: AssetImage[];
    assetName?: string;
    isLoading?: boolean;
}

const AssetCoverImages = ({assetImages = [], assetName, uploadId, isLoading}: AssetCoverImagesProps) => {
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedCoverImage, setSelectedCoverImage] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { mutateAsync: deleteImage } = usedDeleteImages();
    const isDeletingRef = useRef(false);
    
    // primary image appears first
    const images = assetImages.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));

    useEffect(() => {
        if (images?.length) setSelectedCoverImage(images[0]);
    }, [images]);

    const toggleImageSelection = (id: string) => {
        setSelectedImages((prev) => prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]);
    };

    const cancelSelection = () => {
        setSelectedImages([]);
        setSelectionMode(false);
    };

    const handleDeleteImages = async () => {
        if (!selectedImages.length || isDeletingRef.current) return;
        isDeletingRef.current = true;

        try {
            await Promise.all(selectedImages.map((id) => deleteImage({ id, uploadId: uploadId })));
            cancelSelection();
        } catch (error) {
            console.error("Failed to delete selected images: ", error);
        } finally {
            isDeletingRef.current = false;
            setDeleteDialogOpen(false)
        }
    };


  return (
        <div className='mb-5 bg-white border pb-5 rounded-xl overflow-hidden '>
            {/* preview */}
            <div className='w-full h-120 flex items-center justify-center overflow-hidden relative bg-black/95'>
            {isLoading ? 
                <div>
                    <FullScreenLoadingSpinner />
                </div>
            :
                (selectedCoverImage ? <Image src={selectedCoverImage.imageUrl} alt={selectedCoverImage.caption ?? assetName} fill className='object-contain' unoptimized />
                :
                <div className='text-white flex flex-col gap-y-2 items-center justify-center'>
                    <ImageOff size={50} />
                    <p className=' text-center'>No image available</p>
                </div>
                )
            }
            </div>

            
            {/* Actual images */}
            <div className='px-5 pt-5'>
                <div className='mb-2 w-max ml-auto'>
                    {!selectionMode 
                        ? 
                        <WhiteButton disabled={isLoading || !images.length} label='Select' onClick={() => {if(images.length > 0) {setSelectionMode(true);}}}/>
                        :
                        <div className='flex gap-x-3 items-center'>
                            <WhiteButton label='Cancel' onClick={cancelSelection}/>
                            <WhiteButton disabled={!selectedImages.length}  textColor='text-red-600' label='Delete' onClick={() => {if(selectedImages.length) setDeleteDialogOpen(true)}}/>
                        </div>
                    }
                </div>

                <div className='flex items-center gap-x-10 h-50 px-5 pt-5'>
                {isLoading ? 
                <div></div>
                :
                   (images?.length > 0 ? 
                        (images?.map((pic: any) => (
                            <div key={pic.id} onClick={() => selectionMode ? toggleImageSelection(pic.id) : setSelectedCoverImage(pic)} className={`cursor-pointer rounded-lg overflow-hidden w-50 h-full relative ${selectedCoverImage?.imageUrl === pic.imageUrl ? "ring-1 ring-blue-600" : ""}`}>
                                <div className='absolute bg-black/20 top-0 left-0 right-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity z-5'></div>
                                <Image src={pic?.imageUrl} alt={pic?.caption ?? assetName} fill className='object-cover' unoptimized/>
        
                                {selectionMode && (
                                    <div className={`absolute top-2 right-2 z-10 h-6 w-6 rounded-full border flex items-center justify-center ${selectedImages.includes(pic.id) ? "bg-blue-600 border-blue-600 text-white" : "bg-white/80 border-gray-400"}`}>
                                        {selectedImages.includes(pic.id) && <Check className="h-4 w-4" />}
                                    </div>
                                )}
                            </div>
                        )))
                        :
                            <p className='text-gray-700 mx-auto'>No images available</p>
                    )
                }
            </div>
            </div>

            <DeleteAssetImageDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteImages}
                isDeleting={isDeletingRef.current}    
            />

        </div>
  )
}

export default AssetCoverImages