"use client"
import { ASSET_QUERY_KEYS } from '@/src/constants/react_query/category_keys';
import { useDeleteAsset } from '@/src/hooks/assets/useAssets';
import { formatDateTime } from '@/src/util/date_time/formatDateTime';
import { ChevronLeft, PencilIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { AssetDocuments, BlueButton, WhiteButton } from '..';
import { DeleteAssetDialog } from '../dialogs/DeleteAssetDialog';

interface FinancialViewLayoutProps {
    itemId: string
    assetId: string,
    assetCategory?: string,
    assetName: string,
    description?: string,
    assetLabel?: string,
    assetUploadDocId?: string,
    assetDocuments?: any,
    documentCaption?: string,
    imageCaption?: string,
    currentCurrency: string,
    currentValue?: number,
    createdAt: string,
    updatedAt: string,
    children: ReactNode,
    currentValueUpdatedAt: string,
    isLoading?: boolean,
    isFetching?: boolean,
    basePath?: string,
}
const FinancialViewLayout = ({assetCategory, itemId, assetName, assetLabel, children, currentCurrency, currentValue, updatedAt, createdAt, description, assetDocuments, assetUploadDocId,
    currentValueUpdatedAt, assetId, isLoading, isFetching, basePath}: FinancialViewLayoutProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { mutateAsync: deleteAsset, isPending: isDeleting } = useDeleteAsset();
        
        const handleDelete = async (id: string) => {
          try {
            await deleteAsset({ id });
          } catch (error) {
            console.error("Failed to delete asset:", error);
          }
        };
    
  return (
    <section>
        <div className='box-border px-10 pt-10 pb-20'>
            <div className='mb-5'>
                <div className='flex items-center justify-between'>
                    <Link href={basePath ?? "/dashboard"} className='text-xs flex items-center hover:underline'>
                        <ChevronLeft size={25}/> 
                        <span className='text-xl'>{assetCategory ?? "Asset"}</span>
                    </Link>
                    <div className='flex flex-row items-center gap-x-3'>
                       <BlueButton disabled={isLoading || isFetching} link={`${basePath}/${itemId}/edit`} label='Edit' icon={PencilIcon}/>
                       <WhiteButton disabled={isLoading || isFetching || isDeleting} textColor='text-red-600' label='Delete' onClick={() => setDeleteDialogOpen(true)} icon={Trash2}/>
                    </div>
                </div>
            </div>

            <DeleteAssetDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={() => handleDelete(assetId)}
                isDeleting={isDeleting}
                assetName={assetName}      
            />

                <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                    <div className='pb-5 border-b'>
                        <span className='text-xs text-gray-700'>{assetLabel}</span>
                        <h1 className='text-2xl font-medium'>{assetName ?? ""}</h1>
                    </div>

                    <div className='py-5 border-b'>
                        <span className='text-xs text-gray-700'>Current value</span>
                        <p className='text-xl font-medium'>{currentCurrency} {currentValue?.toLocaleString("en-US", {maximumFractionDigits: 2})}</p>
                        <span className='text-xs text-gray-700'>last updated on {formatDateTime(currentValueUpdatedAt)}</span>
                    </div>

                    <div className='py-5 border-b'>
                        <h5 className='mb-4'>Financial Asset Information</h5>
                    
                        {children}

                        <div className=''>
                            <h1 className='mb-2'>Description</h1>
                            <p className='text-gray-700'>
                                {description ?? "No description available"}
                            </p>
                        </div>
                    </div>

                    <div className='pt-5 space-y-4 text-xs'>
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Created on</span> <span>{createdAt ? formatDateTime(createdAt) : "No data"}</span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Updated on</span> <span>{updatedAt ? formatDateTime(updatedAt) : "No data"}</span>
                        </div>
                    </div>
                </div>

                <AssetDocuments itemId={itemId} asset_category_query_key={ assetCategory ? ASSET_QUERY_KEYS[assetCategory] : undefined} assetDocuments={assetDocuments ?? []} isLoading={isLoading || isFetching} uploadId={assetUploadDocId ?? ""}/>

        </div>

    </section>
  )
}

export default FinancialViewLayout