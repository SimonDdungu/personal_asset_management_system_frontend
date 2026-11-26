"use client"
import { BlueButton, TextSearchInput, WhiteButton } from '@/src/components/ui';
import NumberSearchInput from '@/src/components/ui/input/NumberSearchInput';
import AssetResultsLoadingSpinner from '@/src/components/ui/loading_state/AssetResultsLoadingSpinner';
import Pagination from '@/src/components/ui/pagination/Pagination';
import { useGetLandAssets } from '@/src/hooks/asset-properties/physical-assets/land/useLand';
import { LandAssetFilters } from '@/src/interfaces/search_filters/physical/land_SearchFilters';
import { CircleX, Search } from 'lucide-react';
import { useState } from 'react';
import LandCard from './components/LandCard';

const LandView = () => {
    const [searchFilters, setSearchFilters] = useState<LandAssetFilters>({});
    const [appliedFilters, setAppliedFilters] = useState<LandAssetFilters>({});
    const [page, setPage] = useState(0);
    const { data, isLoading, isFetching } = useGetLandAssets({...appliedFilters, page});

    const handleFilterChange = (key: keyof LandAssetFilters, value: string | number | undefined) => {
      setSearchFilters((prev) => ({ ...prev, [key]: value }));
    };

    const searchRecords = () => {
      const cleanedFilters = Object.fromEntries(
        Object.entries(searchFilters).filter((entry) => {
          const value = entry[1];
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

  return (
    <div className='px-10 py-10'>
        <h1 className='mb-2 pb-2 border-b'>All Land</h1>

        <div className='mb-5 pt-2 pb-4 border-b'>
          <div className='mb-2 flex flex-row flex-wrap gap-x-5 items-center'>
              <TextSearchInput name="assetName" label="Asset Name" placeholder="Enter asset name" value={searchFilters.assetName ?? ""} onChange={(value) => handleFilterChange("assetName", value)} />
              <TextSearchInput name="address" label="Address" placeholder="Enter address" value={searchFilters.address ?? ""} onChange={(value) => handleFilterChange("address", value)} />
              <TextSearchInput name="description" label="Description" placeholder="Enter description" value={searchFilters.description ?? ""} onChange={(value) => handleFilterChange("description", value)} />
              <TextSearchInput name="plotNumber" label="Plot Number" placeholder="Enter plot number" value={searchFilters.plotNumber ?? ""} onChange={(value) => handleFilterChange("plotNumber", value)} />
              <NumberSearchInput name="minLandSize" label="Minimum Land Size" placeholder="Minimum size" value={searchFilters.minLandSize ?? ""} onChange={(value) => handleFilterChange("minLandSize", value)} />
              <NumberSearchInput name="maxLandSize" label="Maximum Land Size" placeholder="Maximum size" value={searchFilters.maxLandSize ?? ""} onChange={(value) => handleFilterChange("maxLandSize", value)} />
              <TextSearchInput name="landSizeUnit" label="Land Size Unit" placeholder="e.g. ACRES" value={searchFilters.landSizeUnit ?? ""} onChange={(value) => handleFilterChange("landSizeUnit", value)} />
              <TextSearchInput name="currency" label="Currency" placeholder="e.g. USD" value={searchFilters.currency ?? ""} onChange={(value) => handleFilterChange("currency", value)} />
              <NumberSearchInput name="minValue" label="Minimum Land Value" placeholder="Minimum value" value={searchFilters.minValue ?? ""} onChange={(value) => handleFilterChange("minValue", value)} />
              <NumberSearchInput name="maxValue" label="Maximum Land Value" placeholder="Maximum value" value={searchFilters.maxValue ?? ""} onChange={(value) => handleFilterChange("maxValue", value)} />
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
          {isLoading || isFetching
            ?
            <AssetResultsLoadingSpinner />
            :
              ((data?.content?.length ?? 0) > 0 ?
                <div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5'>
                        {data?.content?.map((asset) => (
                          <LandCard key={asset.id} {...asset}/>
                      ))}
                  </div>

                  <div className='mt-20'>
                    <Pagination page={data?.number ?? 0} totalPages={data?.totalPages ?? 0} first={data?.first ?? true} last={data?.last ?? true} onPageChange={setPage} />
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

export default LandView
