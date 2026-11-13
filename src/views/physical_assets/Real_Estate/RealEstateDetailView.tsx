"use client"
import { DetailViewLayout } from '@/src/components/ui';
import { propertySizeUnitLabels } from '@/src/constants/symbols/propertySizeUnitLabels';
import { useGetRealEstateAsset } from '@/src/hooks/real_estate/useRealEstate';
import { useState } from 'react';

interface RealEstateDetailViewProps {
    id: string
}

const RealEstateDetailView = ({id}: RealEstateDetailViewProps) => {
    
    const { data, isLoading, isError, error } = useGetRealEstateAsset(id);

    const images = data?.images?.[0]?.images
    const imageCaption = data?.images?.[0]?.caption

    const documents = data?.documents?.[0]?.documents
    const documentCaption = data?.documents?.[0]?.caption

  return (
    <DetailViewLayout assetCategory='Real Estate Asset' assetName={data?.assetName} assetLabel={data?.address} assetImages={images} imageCaption={imageCaption} assetDocuments={documents} documentCaption={documentCaption} currentCurrency={data?.currency} 
    currentValue={data?.currentValue} createdAt={data?.createdAt} updatedAt={data?.updatedAt}>

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
                        <span>{data?.propertySize ? `${data.propertySize} ${propertySizeUnitLabels[data.propertySizeUnit] ?? ""}` : "N/A"}</span>
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
                                <span>{data?.constructionCompletionDate ?? "N/A"}</span>
                            </div>
                        </div>
                    </div>
                }

                {data?.rentalIncome && 
                    <div>
                        <h5 className='mb-4'>Rental Information</h5>
                        <div className='flex flex-col gap-y-1  border-b pb-5 mb-3'>
                            <span className='text-xs text-gray-700'>Rental income</span>
                            <span>{data?.rentalIncomeCurrency ?? ""} {data.rentalIncome.toLocaleString("en-US", {maximumFractionDigits: 2})}</span>
                        </div>
                    </div>
                }

            </div>

    </DetailViewLayout>
  )
}

export default RealEstateDetailView