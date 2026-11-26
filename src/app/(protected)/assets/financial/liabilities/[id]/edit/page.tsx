"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import LiabilitiesEditView from '@/src/views/asset_properties/financial_assets/Liabilities/LiabilitiesEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const LiabilityEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <LiabilitiesEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <LiabilityEditDetails/>
  </Suspense>
)

export default page
