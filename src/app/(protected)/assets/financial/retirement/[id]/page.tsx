"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import RetirementFundDetailView from '@/src/views/asset_properties/financial_assets/Retirement_Fund/RetirementFundDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const RetirementFundDetails = () => {
  const {id} = useParams<{id: string}>()
  return <RetirementFundDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <RetirementFundDetails/>
  </Suspense>
)

export default page
