"use client"
import { DetailViewLayout } from '@/src/components/ui';
import { propertySizeUnitLabels } from '@/src/constants/symbols/propertySizeUnitLabels';
import { useGetRealEstateAsset } from '@/src/hooks/asset-properties/physical-assets/real_estate/useRealEstate';
import { formatDate } from '@/src/util/date_time/formatDateTime';
import { useState } from 'react';

const RealEstateDetailView = ({ id }: { id: string }) => {
    
    const { data, isLoading, isFetching, isError, error } = useGetRealEstateAsset(id);
    const basePath = "/assets/physical/real-estate";

    const images = data?.images?.[0]?.images
    const imageUploadId = data?.images?.[0]?.id

    const documents = data?.documents?.[0]?.documents
    const documentUploadId = data?.documents?.[0]?.id

  return (
    <DetailViewLayout itemId={data?.id ?? ""} assetId={data?.assetId ?? ""} assetCategory={data?.assetCategory} assetName={data?.assetName ?? ""} assetLabel={data?.address} 
    assetUploadImageId={imageUploadId} assetImages={images} assetDocuments={documents} currentCurrency={data?.currency ?? ""} 
    currentValue={data?.currentValue} description={data?.description} createdAt={data?.createdAt ?? ""} updatedAt={data?.updatedAt ?? ""} currentValueUpdatedAt={data?.currentValueUpdatedAt ?? ""} 
    isLoading={isLoading} isFetching={isFetching} assetUploadDocId={documentUploadId} basePath={basePath}>

            <div>
                <div className='grid grid-cols-2 sm:grid-cols-[max-content_max-content_max-content] xl:grid-cols-[max-content_max-content_max-content_max-content] gap-x-5 sm:gap-x-10 gap-y-3 border-b pb-5 mb-3'>
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-gray-700'>Number of bedrooms</span>
                        <span>{data?.numberBedrooms ?? "N/A"}</span>
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-gray-700'>Number of bathrooms</span>
                        <span>{data?.numberBathrooms ?? "N/A"}</span>
                    </div>

                    {data?.numberUnits && 
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-gray-700'>Number of units</span>
                        <span>{data?.numberUnits ?? ""}</span>
                    </div>
                    }

                    <div className='flex flex-col gap-y-1'>
                        <span className='text-xs text-gray-700'>Property size</span>
                        <span>{data?.propertySize ? `${data.propertySize} ${data?.propertySizeUnit ? propertySizeUnitLabels[data.propertySizeUnit] : ""}` : "N/A"}</span>
                    </div>

                </div> 

                {(data?.constructionCost || data?.constructionCompletionDate) && 
                    <div>
                        <h5 className='mb-4'>Construction Information</h5>
                        <div className='flex flex-col sm:flex-row sm:gap-x-10 gap-y-3 border-b pb-5 mb-3'>
                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Construction cost</span>
                                <span>{data?.constructionCostCurrency ?? ""} {data?.constructionCost?.toLocaleString("en-US", {maximumFractionDigits: 2}) ?? "N/A"}</span>
                            </div>

                            <div className='flex flex-col gap-y-1'>
                                <span className='text-xs text-gray-700'>Construction completion date</span>
                                <span>{data?.constructionCompletionDate ? formatDate(data.constructionCompletionDate) : "N/A"}</span>
                            </div>
                        </div>
                    </div>
                }

                {data?.rentalIncome && 
                    <div>
                        <h5 className='mb-4'>Rental Information</h5>
                        <div className='flex flex-col gap-y-1  border-b pb-5 mb-3'>
                            <span className='text-xs text-gray-700'>Rental income</span>
                            <span>{data?.rentalIncomeCurrency ?? ""} {data.rentalIncome?.toLocaleString("en-US", {maximumFractionDigits: 2}) ?? "N/A"}</span>
                        </div>
                    </div>
                }

            </div>

    </DetailViewLayout>
  )
}

export default RealEstateDetailView