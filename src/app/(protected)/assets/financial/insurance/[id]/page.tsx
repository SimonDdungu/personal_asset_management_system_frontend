"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import InsuranceDetailView from '@/src/views/asset_properties/financial_assets/Insurance/InsuranceDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const InsuranceDetails = () => {
  const {id} = useParams<{id: string}>()
  return <InsuranceDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <InsuranceDetails/>
  </Suspense>
)

export default page
