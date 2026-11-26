"use client"
import FullScreenLoadingSpinner from '@/src/components/ui/loading_state/FullScreenLoadingSpinner'
import BankAccountsDetailView from '@/src/views/asset_properties/financial_assets/BankAccounts/BankAccountsDetailView'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const BankAccountDetails = () => {
  const {id} = useParams<{id: string}>()
  return <BankAccountsDetailView id={id}/>
}

const page = () => (
  <Suspense fallback={<div className='relative min-h-screen w-full'><FullScreenLoadingSpinner/></div>}>
    <BankAccountDetails/>
  </Suspense>
)

export default page
