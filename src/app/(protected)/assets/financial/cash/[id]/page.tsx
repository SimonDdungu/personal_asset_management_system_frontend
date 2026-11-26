"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import CashDetailView from '@/src/views/asset_properties/financial_assets/Cash/CashDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const CashDetails = () => {
  const {id} = useParams<{id: string}>()
  return <CashDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <CashDetails/>
  </Suspense>
)

export default page
