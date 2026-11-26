"use client"
import { DetailViewLayout } from '@/src/components/ui';
import { useGetCollectiblesValuablesAsset } from '@/src/hooks/asset-properties/physical-assets/collectibles_valuables/useCollectiblesValuables';
import { useGetFurnitureAsset } from '@/src/hooks/asset-properties/physical-assets/furniture/useFurniture';
import { useGetLandAsset } from '@/src/hooks/asset-properties/physical-assets/land/useLand';

const LandDetailView = ({ id }: { id: string }) => {

    const { data, isLoading, isFetching, isError, error } = useGetLandAsset(id);
    const basePath = "/assets/physical/land";

    const images = data?.images?.[0]?.images
    const imageUploadId = data?.images?.[0]?.id

    const documents = data?.documents?.[0]?.documents
    const documentUploadId = data?.documents?.[0]?.id

  return (
    <DetailViewLayout itemId={data?.id ?? ""} assetId={data?.assetId ?? ""} assetCategory={data?.assetCategory} assetName={data?.assetName ?? ""} assetLabel={data?.address ?? ""}
    assetUploadImageId={imageUploadId} assetImages={images} assetDocuments={documents} currentCurrency={data?.currency ?? ""} 
    currentValue={data?.currentValue} description={data?.description} createdAt={data?.createdAt ?? ""} updatedAt={data?.updatedAt ?? ""} currentValueUpdatedAt={data?.currentValueUpdatedAt ?? ""} 
    isLoading={isLoading} isFetching={isFetching} assetUploadDocId={documentUploadId} basePath={basePath}>
    
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-[max-content_max-content_max-content] xl:grid-cols-[max-content_max-content_max-content_max-content_max-content] gap-x-5 sm:gap-x-10 gap-y-3 border-b pb-5 mb-3'>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Address </span> <span>{data?.address ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Plot number </span> <span>{data?.plotNumber ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Land size </span> <span>{data?.landSize ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Land size unit</span> <span>{data?.landSizeUnit ?? "N/A"}</span>
                </div>
            </div>     
        </div>
        
    </DetailViewLayout>
  )
}

export default LandDetailView