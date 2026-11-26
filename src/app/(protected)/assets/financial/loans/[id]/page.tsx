"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import LoansDetailView from '@/src/views/asset_properties/financial_assets/Loans/LoansDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const LoanDetails = () => {
  const {id} = useParams<{id: string}>()
  return <LoansDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <LoanDetails/>
  </Suspense>
)

export default page
