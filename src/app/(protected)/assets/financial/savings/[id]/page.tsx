"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import SavingsDetailView from '@/src/views/asset_properties/financial_assets/Savings/SavingsDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const SavingsDetails = () => {
  const {id} = useParams<{id: string}>()
  return <SavingsDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <SavingsDetails/>
  </Suspense>
)

export default page
