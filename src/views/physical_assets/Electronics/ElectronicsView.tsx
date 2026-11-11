"use client"
import { useGetElectronicAssets } from '@/src/hooks/electronics/useElectronics';
import React from 'react'
import ElectronicCard from './components/ElectronicCard';

const ElectronicsView = () => {
    const { data, isLoading, isError, error, refetch } = useGetElectronicAssets();

    console.log(data);
  return (
    <div className='px-10 py-10'>
        <h1>All Electronics</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5'>
              {data?.content?.map((asset: any) => (
                <ElectronicCard key={asset.id} id={asset.id} assetId={asset.id} assetName={asset.assetName} image={asset.image?.imageUrl} currency={asset.currency} currentValue={asset.currentValue}/>
            ))}
        </div>
    </div>
  )
}

export default ElectronicsView