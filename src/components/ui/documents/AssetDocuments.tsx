import { Check, File } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { getDocumentIcon } from './getDocIcon';
import { DeleteAssetDocDialog } from '../dialogs/DeleteAssetDocDialog';
import { usedDeleteDocs } from '@/src/hooks/files/documents/useDocs';
import FullScreenLoadingSpinner from '../loading_state/FullScreenLoadingSpinner';
import WhiteButton from '../buttons/WhiteButton';

type AssetDocument = {
  documentUrl: string;
};

interface AssetCoverDocumentsProps {
    assetDocuments?: AssetDocument[];
    uploadId: string;
    isLoading?: boolean;
}

const AssetDocuments = ({assetDocuments = [], uploadId, isLoading}: AssetCoverDocumentsProps) => {
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const isDeletingRef = useRef(false);
    const { mutateAsync: deleteDocs } = usedDeleteDocs();
    
    const toggleDocsSelection = (id: string) => {
        setSelectedDocs((prev) => prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]);
    };

    const cancelSelection = () => {
        setSelectedDocs([]);
        setSelectionMode(false);
    };

    const handleDeleteImages = async () => {
        if (!selectedDocs.length || isDeletingRef.current) return;
        isDeletingRef.current = true;

        try {
            await Promise.all(selectedDocs.map((id) => deleteDocs({ id, uploadId: uploadId })));
            cancelSelection();
        } catch (error) {
            console.error("Failed to delete selected images: ", error);
        } finally {
            isDeletingRef.current = false;
            setDeleteDialogOpen(false)
        }
    };
  return (
    <div className='bg-white rounded-lg p-10 text-sm border'>
            <div className='pb-2 border-b'>
            <h5 className='mb-2'>Documents</h5>
            <p className='text-gray-700'>Receipts, ownership records, transaction and supporting files</p>
        </div>

        <div className='mt-5 relative'>
            <div className='mb-2 w-max ml-auto'>
                    {!selectionMode 
                        ? 
                        <WhiteButton disabled={isLoading || !assetDocuments.length} label='Select' onClick={() => {if(assetDocuments.length) {setSelectionMode(true);}}}/>
                        :
                        <div className='flex gap-x-3 items-center'>
                            <WhiteButton label='Cancel' onClick={cancelSelection}/>
                            <WhiteButton disabled={!selectedDocs.length}  textColor='text-red-600' label='Delete' onClick={() => {if(selectedDocs.length) setDeleteDialogOpen(true)}}/>
                        </div>
                    }
                </div>
            <div className='min-h-28'>
            {isLoading ? 
                <div>
                    <FullScreenLoadingSpinner />
                </div>
            :
                (assetDocuments.length > 0 ? 
                    <div>
                        {assetDocuments.map((doc: any) => (
                            <div key={doc?.id} onClick={() => selectionMode && toggleDocsSelection(doc.id)}  className={`relative w-50 cursor-pointer`}>
                                {selectionMode ?
                                    <div className='rounded-lg border px-2 py-5 flex flex-col gap-y-2 items-center justify-center'>
                                        {getDocumentIcon(doc?.originalFileName ?? "")}
                                        <Link href={doc?.documentUrl} target="_blank" rel="noopener noreferrer"  title={doc?.originalFileName} className='w-full text-gray-700 text-xs truncate hover:underline'>{doc?.originalFileName}</Link>
                                    </div>
                                    :
                                    <Link href={doc?.documentUrl} target="_blank" rel="noopener noreferrer"  className='rounded-lg border px-2 py-5 flex flex-col gap-y-2 items-center justify-center'>
                                        {getDocumentIcon(doc?.originalFileName ?? "")}
                                        <span title={doc?.originalFileName} className='w-full text-gray-700 text-xs truncate hover:underline'>{doc?.originalFileName}</span>
                                    </Link>
                                }


                                {selectionMode && (
                                    <div className={`absolute top-2 right-2 z-10 h-6 w-6 rounded-full border flex items-center justify-center ${selectedDocs.includes(doc.id) ? "bg-blue-600 border-blue-600 text-white" : "bg-white/80 border-gray-400"}`}>
                                        {selectedDocs.includes(doc.id) && <Check className="h-4 w-4" />}
                                    </div>
                                )}

                            </div>
                            ))} 
                    </div>
                    :      
                    <p className='text-gray-700'>No documents available</p>
                )
            }
            </div>
        </div>

        <DeleteAssetDocDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={handleDeleteImages}
            isDeleting={isDeletingRef.current}    
        />
    </div>
  )
}

export default AssetDocuments