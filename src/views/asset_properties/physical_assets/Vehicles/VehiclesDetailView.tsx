"use client"
import { DetailViewLayout } from '@/src/components/ui';
import { useGetMachineryAsset } from '@/src/hooks/asset-properties/physical-assets/machinery/useMachinery';
import { useGetVehicleAsset } from '@/src/hooks/asset-properties/physical-assets/vehicle/useVehicle';

const VehiclesDetailView = ({ id }: { id: string }) => {

    const { data, isLoading, isFetching, isError, error } = useGetVehicleAsset(id);
    const basePath = "/assets/physical/vehicles";

    const images = data?.images?.[0]?.images
    const imageUploadId = data?.images?.[0]?.id

    const documents = data?.documents?.[0]?.documents
    const documentUploadId = data?.documents?.[0]?.id

  return (
    <DetailViewLayout itemId={data?.id ?? ""} assetId={data?.assetId ?? ""} assetCategory={data?.assetCategory} assetName={data?.assetName ?? ""} assetLabel={data?.make ?? ""}
    assetUploadImageId={imageUploadId} assetImages={images} assetDocuments={documents} currentCurrency={data?.currency ?? ""} 
    currentValue={data?.currentValue} description={data?.description} createdAt={data?.createdAt ?? ""} updatedAt={data?.updatedAt ?? ""} currentValueUpdatedAt={data?.currentValueUpdatedAt ?? ""} 
    isLoading={isLoading} isFetching={isFetching} assetUploadDocId={documentUploadId} basePath={basePath}>
    
        <div>
            <div className='grid grid-cols-2 sm:grid-cols-[max-content_max-content_max-content] xl:grid-cols-[max-content_max-content_max-content_max-content_max-content] gap-x-5 sm:gap-x-10 gap-y-3 border-b pb-5 mb-3'>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Make </span> <span>{data?.make ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Model </span> <span>{data?.model ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Color </span> <span>{data?.color ?? "N/A"}</span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <span className='text-xs text-gray-700'>Year </span> <span>{data?.year ?? "N/A"}</span>
                </div>
                {data?.mileage &&
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-gray-700'>Mileage </span> <span>{`${data.mileage?.toLocaleString("en-us", {maximumFractionDigits: 2})} km`}</span>
                    </div>
                }
                {data?.registrationNumber &&
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-gray-700'>Registration Number </span> <span>{data.registrationNumber ?? "N/A"}</span>
                    </div>
                }
                {data?.vin &&
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-gray-700'>VIN </span> <span>{data.vin ?? "N/A"}</span>
                    </div>
                }
            </div>     
        </div>
        
    </DetailViewLayout>
  )
}

export default VehiclesDetailView