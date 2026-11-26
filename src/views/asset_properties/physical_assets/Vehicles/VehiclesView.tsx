"use client"
import { BlueButton, TextSearchInput, WhiteButton } from '@/src/components/ui';
import NumberSearchInput from '@/src/components/ui/input/NumberSearchInput';
import AssetResultsLoadingSpinner from '@/src/components/ui/loading_state/AssetResultsLoadingSpinner';
import Pagination from '@/src/components/ui/pagination/Pagination';
import { useGetVehicleAssets } from '@/src/hooks/asset-properties/physical-assets/vehicle/useVehicle';
import { VehicleAssetFilters } from '@/src/interfaces/search_filters/physical/vehicle_SearchFilters';
import { CircleX, Search } from 'lucide-react';
import { useState } from 'react';
import VehicleCard from './components/VehicleCard';

const VehiclesView = () => {
    const [searchFilters, setSearchFilters] = useState<VehicleAssetFilters>({});
    const [appliedFilters, setAppliedFilters] = useState<VehicleAssetFilters>({});
    const [page, setPage] = useState(0);
    const { data, isLoading, isFetching, isError, error, refetch } = useGetVehicleAssets({...appliedFilters, page});

    const handleFilterChange = (key: keyof VehicleAssetFilters, value: any) => {
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
        <h1 className='mb-2 pb-2 border-b'>All Vehicles</h1>

        <div className='mb-5 pt-2 pb-4 border-b'>
          <div className='mb-2 flex flex-row flex-wrap gap-x-5 items-center'>
              <TextSearchInput name="assetName" label="Asset Name" placeholder="Enter asset name" value={searchFilters.assetName ?? ""} onChange={(value) => handleFilterChange("assetName", value)} />
              <TextSearchInput name="make" label="Make" placeholder="Enter make" value={searchFilters.make ?? ""} onChange={(value) => handleFilterChange("make", value)} />
              <TextSearchInput name="model" label="Model" placeholder="Enter model" value={searchFilters.model ?? ""} onChange={(value) => handleFilterChange("model", value)} />
              <TextSearchInput name="color" label="Color" placeholder="Enter color" value={searchFilters.color ?? ""} onChange={(value) => handleFilterChange("color", value)} />
              <TextSearchInput name="registrationNumber" label="Registration Number" placeholder="Enter registration number" value={searchFilters.registrationNumber ?? ""} onChange={(value) => handleFilterChange("registrationNumber", value)} />
              <TextSearchInput name="vin" label="VIN" placeholder="Enter VIN" value={searchFilters.vin ?? ""} onChange={(value) => handleFilterChange("vin", value)} />

              <NumberSearchInput name="minYear" label="Minimum Year" placeholder="Enter min year" value={searchFilters.minYear ?? ""} onChange={(value) => handleFilterChange("minYear", value)} />
              <NumberSearchInput name="maxYear" label="Maximum Year" placeholder="Enter max year" value={searchFilters.maxYear ?? ""} onChange={(value) => handleFilterChange("maxYear", value)} />

              <NumberSearchInput name="minMileage" label="Minimum Mileage" placeholder="Minimum mileage" value={searchFilters.minMileage ?? ""} onChange={(value) => handleFilterChange("minMileage", value)} />
              <NumberSearchInput name="maxMileage" label="Maximum Mileage" placeholder="Maximum mileage" value={searchFilters.maxMileage ?? ""} onChange={(value) => handleFilterChange("maxMileage", value)} />

              <TextSearchInput name="currency" label="Currency" placeholder="e.g. USD" value={searchFilters.currency ?? ""} onChange={(value) => handleFilterChange("currency", value)} />
              <NumberSearchInput name="minValue" label="Minimum Vehicle Value" placeholder="Minimum value" value={searchFilters.minValue ?? ""} onChange={(value) => handleFilterChange("minValue", value)} />
              <NumberSearchInput name="maxValue" label="Maximum Vehicle Value" placeholder="Maximum value" value={searchFilters.maxValue ?? ""} onChange={(value) => handleFilterChange("maxValue", value)} />

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
                         <VehicleCard key={asset.id} id={asset.id} assetId={asset.id} assetName={asset.assetName} image={asset.image} 
                          currency={asset.currency} currentValue={asset.currentValue} make={asset.make} model={asset.model} mileage={asset.mileage} 
                          year={asset.year} color={asset.color}/>
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

export default VehiclesView