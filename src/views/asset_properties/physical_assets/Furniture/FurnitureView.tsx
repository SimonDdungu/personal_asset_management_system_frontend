"use client"
import { BlueButton, TextSearchInput, WhiteButton } from '@/src/components/ui';
import NumberSearchInput from '@/src/components/ui/input/NumberSearchInput';
import AssetResultsLoadingSpinner from '@/src/components/ui/loading_state/AssetResultsLoadingSpinner';
import Pagination from '@/src/components/ui/pagination/Pagination';
import { useGetFurnitureAssets } from '@/src/hooks/asset-properties/physical-assets/furniture/useFurniture';
import { FurnitureAssetFilters } from '@/src/interfaces/search_filters/physical/furniture_SearchFilters';
import { CircleX, Search } from 'lucide-react';
import { useState } from 'react';
import FurnitureCard from './components/FurnitureCard';

const FurnitureView = () => {
    
  const [searchFilters, setSearchFilters] = useState<FurnitureAssetFilters>({});
    const [appliedFilters, setAppliedFilters] = useState<FurnitureAssetFilters>({});
    const [page, setPage] = useState(0);
    const { data, isLoading, isFetching, isError, error, refetch } = useGetFurnitureAssets({...appliedFilters, page});


const handleFilterChange = (key: keyof FurnitureAssetFilters, value: any) => {
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

  return (
    <div className='px-10 py-10'>
        <h1 className='mb-2 pb-2 border-b'>All Furniture</h1>

        <div className='mb-5 pt-2 pb-4 border-b'>
          <div className='mb-2 flex flex-row flex-wrap gap-x-5 items-center'>
              <TextSearchInput name="assetName" label="Asset Name" placeholder="Enter asset name" value={searchFilters.assetName ?? ""} onChange={(value) => handleFilterChange("assetName", value)} />
              <TextSearchInput name="brand" label="Brand" placeholder="Enter brand" value={searchFilters.brand ?? ""} onChange={(value) => handleFilterChange("brand", value)} />
              <TextSearchInput name="material" label="Material" placeholder="Enter material" value={searchFilters.material ?? ""} onChange={(value) => handleFilterChange("material", value)} />
        
              <TextSearchInput name="currency" label="Currency" placeholder="e.g. USD" value={searchFilters.currency ?? ""} onChange={(value) => handleFilterChange("currency", value)} />
              <NumberSearchInput name="minValue" label="Minimum Furniture Value" placeholder="Minimum value" value={searchFilters.minValue ?? ""} onChange={(value) => handleFilterChange("minValue", value)} />
              <NumberSearchInput name="maxValue" label="Maximum Furniture Value" placeholder="Maximum value" value={searchFilters.maxValue ?? ""} onChange={(value) => handleFilterChange("maxValue", value)} />

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
                         <FurnitureCard key={asset.id} id={asset.id} assetId={asset.id} assetName={asset.assetName} image={asset.image} 
                          currency={asset.currency} currentValue={asset.currentValue} brand={asset.brand} material={asset.material} 
                          />
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

export default FurnitureView