"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import RetirementFundEditView from '@/src/views/asset_properties/financial_assets/Retirement_Fund/RetirementFundEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const RetirementFundEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <RetirementFundEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <RetirementFundEditDetails/>
  </Suspense>
)

export default page
