"use client"
import { useGetRealEstateAssets } from '@/src/hooks/real_estate/useRealEstate';
import RealEstateCard from './components/RealEstateCard';

const RealEstateView = () => {
    const { data, isLoading, isError, error, refetch } = useGetRealEstateAssets();

    console.log(data)

  return (
    <div className='px-10 py-10'>
        <h1>All Real Estate</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5'>
              {data?.content?.map((asset: any) => (
                <RealEstateCard key={asset.id} id={asset.id} assetId={asset.id} assetName={asset.assetName} image={asset.image?.imageUrl} currency={asset.currency} currentValue={asset.currentValue}
                address={asset.address} noBedrooms={asset?.numberBedrooms} noBathrooms={asset?.numberBathrooms} propertySize={asset?.propertySize} propertySizeUnit={"Sq ft"}
                />
            ))}
        </div>
    </div>
  )
}

export default RealEstateView