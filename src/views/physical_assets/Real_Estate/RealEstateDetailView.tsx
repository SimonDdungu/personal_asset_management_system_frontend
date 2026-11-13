"use client"
import { DetailViewLayout } from '@/src/components/ui';
import AssetCoverImages from '@/src/components/ui/AssetCoverImages';
import AssetDocuments from '@/src/components/ui/AssetDocuments';
import BlueButton from '@/src/components/ui/BlueButton';
import WhiteButton from '@/src/components/ui/WhiteButton';
import { propertySizeUnitLabels } from '@/src/constants/symbols/propertySizeUnitLabels';
import { useGetRealEstateAsset } from '@/src/hooks/real_estate/useRealEstate';
import { formatDateTime } from '@/src/util/formatDateTime';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';

interface RealEstateDetailViewProps {
    id: string
}

const RealEstateDetailView = ({id}: RealEstateDetailViewProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const { data, isLoading, isError, error } = useGetRealEstateAsset(id);

    const images = data?.images?.[0]?.images
    const imageCaption = data?.images?.[0]?.caption

    const documents = data?.documents?.[0]?.documents
    const documentCaption = data?.documents?.[0]?.caption

  return (
    <DetailViewLayout assetCategory='Real Estate Asset'>
        <div>
            <div>
                <AssetCoverImages assetImages={images ?? []} assetName={data?.assetName} caption={imageCaption}/>

                <div className='mb-5 bg-white rounded-lg p-10 text-sm border'>
                    <div className='pb-5 border-b'>
                        <span className='text-xs text-gray-700'>{data?.address}</span>
                        <h1 className='text-2xl font-medium'>{data?.assetName ?? ""}</h1>
                    </div>

                    <div className='py-5 border-b'>
                        <span className='text-xs text-gray-700'>Current value</span>
                        <p className='text-xl font-medium'>{data?.currency} {data?.currentValue.toLocaleString("en-US", {maximumFractionDigits: 2})}</p>
                    </div>

                    <div className='py-5 border-b'>
                        <h5 className='mb-4'>Asset Information</h5>

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

                        <div className=''>
                            <h1 className='mb-2'>Description</h1>
                            <p className='text-gray-700'>
                                {data?.description ?? "No description available"}
                            </p>
                        </div>
                    </div>

                     <div className='pt-5 space-y-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Created at</span> <span>{data?.createdAt ? formatDateTime(data.createdAt) : "No data"}</span>
                        </div>

                         <div className='flex items-center justify-between'>
                            <span className='text-gray-500'>Updated at</span> <span>{data?.updatedAt ? formatDateTime(data.updatedAt) : "No data"}</span>
                        </div>
                    </div>
                </div>

                
            </div>

             <AssetDocuments assetDocuments={documents ?? []} caption={documentCaption} />
        </div>
        
    </DetailViewLayout>
  )
}

export default RealEstateDetailView