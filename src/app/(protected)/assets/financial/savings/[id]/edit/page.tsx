"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import SavingsEditView from '@/src/views/asset_properties/financial_assets/Savings/SavingsEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const SavingsEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <SavingsEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <SavingsEditDetails/>
  </Suspense>
)

export default page
