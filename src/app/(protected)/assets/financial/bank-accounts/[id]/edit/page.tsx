"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import BankAccountsEditView from '@/src/views/asset_properties/financial_assets/BankAccounts/BankAccountsEditView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const BankAccountEditDetails = () => {
  const {id} = useParams<{id: string}>()
  return <BankAccountsEditView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <BankAccountEditDetails/>
  </Suspense>
)

export default page
