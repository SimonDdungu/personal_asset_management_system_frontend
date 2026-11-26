"use client"
import { DetailViewLayout } from '@/src/components/ui';
import { useGetCollectiblesValuablesAsset } from '@/src/hooks/asset-properties/physical-assets/collectibles_valuables/useCollectiblesValuables';

const CollectiblesDetailView = ({ id }: { id: string }) => {

    const { data, isLoading, isFetching, isError, error } = useGetCollectiblesValuablesAsset(id);
    const basePath = "/assets/physical/collectibles";

    const images = data?.images?.[0]?.images
    const imageUploadId = data?.images?.[0]?.id

    const documents = data?.documents?.[0]?.documents
    const documentUploadId = data?.documents?.[0]?.id

  return (
    <DetailViewLayout itemId={data?.id ?? ""} assetId={data?.assetId ?? ""} assetCategory={data?.assetCategory} assetName={data?.assetName ?? ""}
    assetUploadImageId={imageUploadId} assetImages={images} assetDocuments={documents} currentCurrency={data?.currency ?? ""} 
    currentValue={data?.currentValue} description={data?.description} createdAt={data?.createdAt ?? ""} updatedAt={data?.updatedAt ?? ""} currentValueUpdatedAt={data?.currentValueUpdatedAt ?? ""} 
    isLoading={isLoading} isFetching={isFetching} assetUploadDocId={documentUploadId} basePath={basePath}>
    
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-[max-content_max-content_max-content] xl:grid-cols-[max-content_max-content_max-content_max-content_max-content] gap-x-5 sm:gap-x-10 gap-y-3 border-b pb-5 mb-3'>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Creator </span> <span>{data?.creator ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Material </span> <span>{data?.material ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Serial number </span> <span>{data?.serialNumber ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Year </span> <span>{data?.year ?? "N/A"}</span>
                </div>
            </div>     
        </div>
        
    </DetailViewLayout>
  )
}

export default CollectiblesDetailView