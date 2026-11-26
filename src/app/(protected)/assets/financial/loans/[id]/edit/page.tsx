"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import LoansEditView from '@/src/views/asset_properties/financial_assets/Loans/LoansEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const LoanEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <LoansEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <LoanEditDetails/>
  </Suspense>
)

export default page
