"use client"
import { useGetRealEstateAssets } from '@/src/hooks/asset-properties/physical-assets/real_estate/useRealEstate';
import RealEstateCard from './components/RealEstateCard';
import { useState } from 'react';
import { RealEstateAssetFilters } from '@/src/interfaces/search_filters/physical/realEstate_SearchFilters';
import { BlueButton, TextSearchInput, WhiteButton } from '@/src/components/ui';
import { CircleX, Divide, Search } from 'lucide-react';
import NumberSearchInput from '@/src/components/ui/input/NumberSearchInput';
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner';
import AssetResultsLoadingSpinner from '@/src/components/ui/loading_state/AssetResultsLoadingSpinner';
import Pagination from '@/src/components/ui/pagination/Pagination';

const RealEstateView = () => {
  const [searchFilters, setSearchFilters] = useState<RealEstateAssetFilters>({});
  const [appliedFilters, setAppliedFilters] = useState<RealEstateAssetFilters>({});
  const [page, setPage] = useState(0);

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

    const clearFilters = () => {
      if (Object.keys(searchFilters).length > 0) setSearchFilters({});
      if (Object.keys(appliedFilters).length > 0) setAppliedFilters({});
    };

  
    const { data, isLoading, isError, error, refetch } = useGetRealEstateAssets(appliedFilters);

  return (
    <div className='px-10 pt-10 pb-20 bg-gray-100'>
       <h1 className='mb-2 pb-2 border-b'>Real Estate Assets</h1>
        <div className='mb-5 pt-2 pb-4 border-b'>
          <div className='mb-2 flex flex-row flex-wrap gap-x-5 items-center'>
              <TextSearchInput name="assetName" label="Asset Name" placeholder="Enter asset name" value={searchFilters.assetName ?? ""} onChange={(value) => handleFilterChange("assetName", value)} />
              <TextSearchInput name="address" label="Address" placeholder="Enter address" value={searchFilters.address ?? ""} onChange={(value) => handleFilterChange("address", value)} />

              <NumberSearchInput name="minNumberBedrooms" label="Minimum Bedrooms" placeholder="Minimum bedrooms" value={searchFilters.minNumberBedrooms ?? ""} onChange={(value) => handleFilterChange("minNumberBedrooms", value)} />
              <NumberSearchInput name="maxNumberBedrooms" label="Maximum Bedrooms" placeholder="Maximum bedrooms" value={searchFilters.maxNumberBedrooms ?? ""} onChange={(value) => handleFilterChange("maxNumberBedrooms", value)} />

              <NumberSearchInput name="minNumberBathrooms" label="Minimum Bathrooms" placeholder="Minimum bathrooms" value={searchFilters.minNumberBathrooms ?? ""} onChange={(value) => handleFilterChange("minNumberBathrooms", value)} />
              <NumberSearchInput name="maxNumberBathrooms" label="Maximum Bathrooms" placeholder="Maximum bathrooms" value={searchFilters.maxNumberBathrooms ?? ""} onChange={(value) => handleFilterChange("maxNumberBathrooms", value)} />

              <NumberSearchInput name="minNumberUnits" label="Minimum Units" placeholder="Minimum units" value={searchFilters.minNumberUnits ?? ""} onChange={(value) => handleFilterChange("minNumberUnits", value)} />
              <NumberSearchInput name="maxNumberUnits" label="Maximum Units" placeholder="Maximum units" value={searchFilters.maxNumberUnits ?? ""} onChange={(value) => handleFilterChange("maxNumberUnits", value)} />

              <NumberSearchInput name="minPropertySize" label="Minimum Property Size" placeholder="Minimum size" value={searchFilters.minPropertySize ?? ""} onChange={(value) => handleFilterChange("minPropertySize", value)} />
              <NumberSearchInput name="maxPropertySize" label="Maximum Property Size" placeholder="Maximum size" value={searchFilters.maxPropertySize ?? ""} onChange={(value) => handleFilterChange("maxPropertySize", value)} />

              <TextSearchInput name="propertySizeUnit" label="Property Size Unit" placeholder="e.g. SQUARE_METERS" value={searchFilters.propertySizeUnit ?? ""} onChange={(value) => handleFilterChange("propertySizeUnit", value)} />

              <TextSearchInput name="constructionCostCurrency" label="Construction Cost Currency" placeholder="e.g. USD" value={searchFilters.constructionCostCurrency ?? ""} onChange={(value) => handleFilterChange("constructionCostCurrency", value)} />
              <NumberSearchInput name="minConstructionCost" label="Minimum Construction Cost" placeholder="Minimum construction cost" value={searchFilters.minConstructionCost ?? ""} onChange={(value) => handleFilterChange("minConstructionCost", value)} />
              <NumberSearchInput name="maxConstructionCost" label="Maximum Construction Cost" placeholder="Maximum construction cost" value={searchFilters.maxConstructionCost ?? ""} onChange={(value) => handleFilterChange("maxConstructionCost", value)} />

              <TextSearchInput name="minConstructionCompletionDate" label="Completion Date From" placeholder="YYYY-MM-DD" value={searchFilters.minConstructionCompletionDate ?? ""} onChange={(value) => handleFilterChange("minConstructionCompletionDate", value)} />
              <TextSearchInput name="maxConstructionCompletionDate" label="Completion Date To" placeholder="YYYY-MM-DD" value={searchFilters.maxConstructionCompletionDate ?? ""} onChange={(value) => handleFilterChange("maxConstructionCompletionDate", value)} />

              <TextSearchInput name="rentalIncomeCurrency" label="Rental Income Currency" placeholder="e.g. USD" value={searchFilters.rentalIncomeCurrency ?? ""} onChange={(value) => handleFilterChange("rentalIncomeCurrency", value)} />
              <NumberSearchInput name="minRentalIncome" label="Minimum Rental Income" placeholder="Minimum rental income" value={searchFilters.minRentalIncome ?? ""} onChange={(value) => handleFilterChange("minRentalIncome", value)} />
              <NumberSearchInput name="maxRentalIncome" label="Maximum Rental Income" placeholder="Maximum rental income" value={searchFilters.maxRentalIncome ?? ""} onChange={(value) => handleFilterChange("maxRentalIncome", value)} />

              <TextSearchInput name="currency" label="Property Value Currency" placeholder="e.g. USD" value={searchFilters.currency ?? ""} onChange={(value) => handleFilterChange("currency", value)} />
              <NumberSearchInput name="minValue" label="Minimum Property Value" placeholder="Minimum value" value={searchFilters.minValue ?? ""} onChange={(value) => handleFilterChange("minValue", value)} />
              <NumberSearchInput name="maxValue" label="Maximum Property Value" placeholder="Maximum value" value={searchFilters.maxValue ?? ""} onChange={(value) => handleFilterChange("maxValue", value)} />

          </div>

          <div className='flex items-center justify-between gap-x-5'>
            <span>Results: {data?.totalElements ?? "0"}</span>
            <div className='flex items-center gap-x-3'>
              <BlueButton label='Search' icon={Search} onClick={searchRecords}/>
              <WhiteButton label='Clear' onClick={clearFilters}/>
            </div>
          </div>
        </div>

        <div className='pt-4 relative'>
          {isLoading 
            ? 
            <AssetResultsLoadingSpinner />
            : 
              (data?.content?.length > 0 ? 
                <div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5'>
                        {data?.content?.map((asset: any) => (
                          <RealEstateCard key={asset.id} id={asset.id} assetId={asset.id} assetName={asset.assetName} image={asset.image?.imageUrl} currency={asset.currency} currentValue={asset.currentValue}
                          address={asset.address} noBedrooms={asset?.numberBedrooms} noBathrooms={asset?.numberBathrooms} propertySize={asset?.propertySize} propertySizeUnit={asset.propertySizeUnit}
                          />
                      ))}
                  </div>
                  
                  <div className='mt-20'>
                    <Pagination page={data.number} totalPages={data.totalPages} first={data.first} last={data.last} onPageChange={setPage} />
                  </div>
                </div>
              :
                <div className='flex flex-col gap-y-2 items-center justify-center w-max mx-auto h-100'>
                  <CircleX />
                  <span className='text-sm text-center'>No results available</span>
                </div>
              ) 
          }
         </div>
    </div>
  )
}

export default RealEstateView