import { File } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { getDocumentIcon } from './getDocIcon';

type AssetDocument = {
  documentUrl: string;
};

interface AssetCoverDocumentsProps {
    assetDocuments?: AssetDocument[];
    caption?: string;
}

const AssetDocuments = ({assetDocuments = [], caption}: AssetCoverDocumentsProps) => {
    
  return (
    <div className='bg-white rounded-lg p-10 text-sm border'>
            <div className='pb-2 border-b'>
            <h5 className='mb-2'>Documents</h5>
            <p className='text-gray-700'>Receipts, ownership records, transaction and supporting files</p>
        </div>

        <div className='mt-5'>
            <div>
                {caption && 
                    <div className='mb-5'>
                        <p className='text-gray-700 mb-1 text-xs'>Caption</p>
                        <p>{caption}</p>
                    </div>
                }

                {assetDocuments.length > 0 ? 
                    <div>
                        {assetDocuments.map((doc: any) => (
                            <Link key={doc?.id} href={doc?.documentUrl} target="_blank" rel="noopener noreferrer" className='w-50 rounded-lg border px-2 py-5 flex flex-col gap-y-2 items-center justify-center'>
                                {getDocumentIcon(doc?.originalFileName ?? "")}
                                <span title={doc?.originalFileName} className='w-full text-gray-700 text-xs truncate'>{doc?.originalFileName}</span>
                            </Link>
                            ))} 
                    </div>
                    :      
                    <p className='text-gray-700'>No documents available</p>
                }
            </div>
        </div>
    </div>
  )
}

export default AssetDocuments