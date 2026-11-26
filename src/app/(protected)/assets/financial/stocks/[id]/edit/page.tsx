"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import StocksEditView from '@/src/views/asset_properties/financial_assets/Stocks/StocksEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const StocksEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <StocksEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <StocksEditDetails/>
  </Suspense>
)

export default page
