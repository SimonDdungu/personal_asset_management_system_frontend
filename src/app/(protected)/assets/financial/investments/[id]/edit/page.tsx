"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import InvestmentsEditView from '@/src/views/asset_properties/financial_assets/Investments/InvestmentsEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const InvestmentEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <InvestmentsEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <InvestmentEditDetails/>
  </Suspense>
)

export default page
