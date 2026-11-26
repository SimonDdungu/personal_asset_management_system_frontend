"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import CashEditView from '@/src/views/asset_properties/financial_assets/Cash/CashEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const CashEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <CashEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <CashEditDetails/>
  </Suspense>
)

export default page
