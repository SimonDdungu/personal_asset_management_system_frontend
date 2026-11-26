"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import InsuranceEditView from '@/src/views/asset_properties/financial_assets/Insurance/InsuranceEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const InsuranceEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <InsuranceEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <InsuranceEditDetails/>
  </Suspense>
)

export default page
