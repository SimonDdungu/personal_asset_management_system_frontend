"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import InvestmentsDetailView from '@/src/views/asset_properties/financial_assets/Investments/InvestmentsDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const InvestmentDetails = () => {
  const {id} = useParams<{id: string}>()
  return <InvestmentsDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <InvestmentDetails/>
  </Suspense>
)

export default page
