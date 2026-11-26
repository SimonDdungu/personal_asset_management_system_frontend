"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import StocksDetailView from '@/src/views/asset_properties/financial_assets/Stocks/StocksDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const StocksDetails = () => {
  const {id} = useParams<{id: string}>()
  return <StocksDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <StocksDetails/>
  </Suspense>
)

export default page
