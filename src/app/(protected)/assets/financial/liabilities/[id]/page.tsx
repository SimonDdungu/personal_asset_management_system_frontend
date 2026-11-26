"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import LiabilitiesDetailView from '@/src/views/asset_properties/financial_assets/Liabilities/LiabilitiesDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const LiabilityDetails = () => {
  const {id} = useParams<{id: string}>()
  return <LiabilitiesDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <LiabilityDetails/>
  </Suspense>
)

export default page
