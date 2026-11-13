"use client"
import { useGetRealEstateAssets } from '@/src/hooks/real_estate/useRealEstate';
import RealEstateCard from './components/RealEstateCard';
import { useState } from 'react';
import { RealEstateAssetFilters } from '@/src/interfaces/search_filters/realEstate_SearchFilters';
import { BlueButton, TextSearchInput } from '@/src/components/ui';
import { CircleX, Search } from 'lucide-react';
import NumberSearchInput from '@/src/components/ui/NumberSearchInput';

const RealEstateView = () => {
  const [searchFilters, setSearchFilters] = useState<RealEstateAssetFilters>({});
  const [appliedFilters, setAppliedFilters] = useState<RealEstateAssetFilters>({});

    const handleFilterChange = (key: keyof RealEstateAssetFilters, value: any) => {
      setSearchFilters((prev) => ({ ...prev, [key]: value }));
    };

    const searchRecords = () => {
      const cleanedFilters = Object.fromEntries(
        Object.entries(searchFilters).filter(([_, value]) => {
          if (value === undefined || value === null) return false;

          if (typeof value === "string" && !value.trim()) return false;

          return true;
        })
      );

      setAppliedFilters(cleanedFilters);
    };


    const { data, isLoading, isError, error, refetch } = useGetRealEstateAssets(appliedFilters);

    console.log(searchFilters)

  return (
    <div className='px-10 pt-10 pb-40 bg-white'>
       <h1 className='mb-2 pb-2 border-b'>Real Estate Assets</h1>
        <div className='mb-5 pt-2 pb-4 border-b'>
          <div className='mb-2 flex flex-row flex-wrap gap-x-5 items-center'>
              <TextSearchInput name="assetName" label="Asset Name" placeholder="Enter asset name" onChange={(value) => handleFilterChange("assetName", value)} />
              <TextSearchInput name="address" label="Address" placeholder="Enter address" onChange={(value) => handleFilterChange("address", value)} />

              <NumberSearchInput name="minNumberBedrooms" label="Minimum Bedrooms" placeholder="Minimum bedrooms" onChange={(value) => handleFilterChange("minNumberBedrooms", value)} />
              <NumberSearchInput name="maxNumberBedrooms" label="Maximum Bedrooms" placeholder="Maximum bedrooms" onChange={(value) => handleFilterChange("maxNumberBedrooms", value)} />

              <NumberSearchInput name="minNumberBathrooms" label="Minimum Bathrooms" placeholder="Minimum bathrooms" onChange={(value) => handleFilterChange("minNumberBathrooms", value)} />
              <NumberSearchInput name="maxNumberBathrooms" label="Maximum Bathrooms" placeholder="Maximum bathrooms" onChange={(value) => handleFilterChange("maxNumberBathrooms", value)} />

              <TextSearchInput name="searchFiltersminNumberUnits" label="Minimum Units" placeholder="Minimum units" onChange={(value) => handleFilterChange("minNumberUnits", value)} />
              <TextSearchInput name="maxNumberUnits" label="Maximum Units" placeholder="Maximum units" onChange={(value) => handleFilterChange("maxNumberUnits", value)} />

              <NumberSearchInput name="minPropertySize" label="Minimum Property Size" placeholder="Minimum size" onChange={(value) => handleFilterChange("minPropertySize", value)} />
              <NumberSearchInput name="maxPropertySize" label="Maximum Property Size" placeholder="Maximum size" onChange={(value) => handleFilterChange("maxPropertySize", value)} />

              <TextSearchInput name="propertySizeUnit" label="Property Size Unit" placeholder="e.g. SQUARE_METERS" onChange={(value) => handleFilterChange("propertySizeUnit", value)} />

              <TextSearchInput name="constructionCostCurrency" label="Construction Cost Currency" placeholder="e.g. USD" onChange={(value) => handleFilterChange("constructionCostCurrency", value)} />
              <NumberSearchInput name="minConstructionCost" label="Minimum Construction Cost" placeholder="Minimum construction cost" onChange={(value) => handleFilterChange("minConstructionCost", value)} />
              <NumberSearchInput name="maxConstructionCost" label="Maximum Construction Cost" placeholder="Maximum construction cost" onChange={(value) => handleFilterChange("maxConstructionCost", value)} />

              <TextSearchInput name="minConstructionCompletionDate" label="Completion Date From" placeholder="YYYY-MM-DD" onChange={(value) => handleFilterChange("minConstructionCompletionDate", value)} />
              <TextSearchInput name="maxConstructionCompletionDate" label="Completion Date To" placeholder="YYYY-MM-DD" onChange={(value) => handleFilterChange("maxConstructionCompletionDate", value)} />

              <TextSearchInput name="rentalIncomeCurrency" label="Rental Income Currency" placeholder="e.g. USD" onChange={(value) => handleFilterChange("rentalIncomeCurrency", value)} />
              <NumberSearchInput name="minRentalIncome" label="Minimum Rental Income" placeholder="Minimum rental income" onChange={(value) => handleFilterChange("minRentalIncome", value)} />
              <NumberSearchInput name="maxRentalIncome" label="Maximum Rental Income" placeholder="Maximum rental income" onChange={(value) => handleFilterChange("maxRentalIncome", value)} />

              <TextSearchInput name="currency" label="Property Value Currency" placeholder="e.g. USD" onChange={(value) => handleFilterChange("currency", value)} />
              <TextSearchInput name="minValue" label="Minimum Property Value" placeholder="Minimum value" onChange={(value) => handleFilterChange("minValue", value)} />
              <TextSearchInput name="maxValue" label="Maximum Property Value" placeholder="Maximum value" onChange={(value) => handleFilterChange("maxValue", value)} />

          </div>

          <div className='flex items-center justify-between gap-x-5'>
            <span>Results: {data?.totalElements ?? "0"}</span>
            <BlueButton label='Search' icon={Search} onClick={searchRecords}/>
          </div>
        </div>

        <div className='pt-4'>
          {data?.content?.length > 0 ? 
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5'>
                {data?.content?.map((asset: any) => (
                  <RealEstateCard key={asset.id} id={asset.id} assetId={asset.id} assetName={asset.assetName} image={asset.image?.imageUrl} currency={asset.currency} currentValue={asset.currentValue}
                  address={asset.address} noBedrooms={asset?.numberBedrooms} noBathrooms={asset?.numberBathrooms} propertySize={asset?.propertySize} propertySizeUnit={asset.propertySizeUnit}
                  />
              ))}
          </div>
            :
            <div className='flex flex-col gap-y-2 items-center justify-center w-max mx-auto h-100'>
              <CircleX />
              <span className='text-sm text-center'>No results available</span>
            </div>
          }
         </div>
    </div>
  )
}

export default RealEstateView