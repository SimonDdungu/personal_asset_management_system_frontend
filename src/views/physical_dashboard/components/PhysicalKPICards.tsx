"use client"
import { Briefcase, BuildingComplex, Percent, Wallet } from 'lucide-react'
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store'

interface PhysicalKPICardsProps {
  totalValue: number
  assetCount: number
  averageValue: number
  portfolioShare: number
  currency: string
  isTotalValueLoading: boolean
  isAssetCountLoading: boolean
  isAverageLoading: boolean
  isPortfolioShareLoading: boolean
}

const PhysicalKPICards = ({
  totalValue,
  assetCount,
  averageValue,
  portfolioShare,
  currency,
  isTotalValueLoading,
  isAssetCountLoading,
  isAverageLoading,
  isPortfolioShareLoading,
}: PhysicalKPICardsProps) => {
  const selectedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)

  return (
    <div className='grid grid-cols-4 gap-x-5'>
      <KPICard
        label='Physical net worth'
        icon={Wallet}
        iconColor='text-purple-500'
        iconBackground='bg-purple-100'
        value={`${currency} ${totalValue.toLocaleString()}`}
        isLoading={isTotalValueLoading}
      />
      <KPICard
        label='Total physical assets'
        icon={BuildingComplex}
        iconColor='text-blue-500'
        iconBackground='bg-blue-100'
        value={assetCount.toLocaleString()}
        isLoading={isAssetCountLoading}
      />
      <KPICard
        label='Average asset value'
        icon={Briefcase}
        iconColor='text-orange-500'
        iconBackground='bg-orange-100'
        value={`${selectedBaseCurrency} ${averageValue.toLocaleString()}`}
        isLoading={isAverageLoading}
      />
      <KPICard
        label='Share of total portfolio'
        icon={Percent}
        iconColor='text-green-500'
        iconBackground='bg-green-100'
        value={`${portfolioShare.toLocaleString("en-US", {maximumFractionDigits: 2})}%`}
        isLoading={isPortfolioShareLoading}
      />
    </div>
  )
}

export default PhysicalKPICards

interface KPICardProps {
  label: string
  icon: typeof Wallet
  iconColor: string
  iconBackground: string
  value: string
  isLoading: boolean
}

const KPICard = ({label, icon: Icon, iconColor, iconBackground, value, isLoading}: KPICardProps) => (
  <div className='bg-white rounded-lg px-5 py-4 w-full cursor-default shadow hover:shadow-md transition-shadow'>
    <div className='flex items-center justify-between gap-x-3'>
      <span className='text-xs text-gray-700'>{label}</span>
      <div className={`${iconBackground} ${iconColor} p-2 rounded-lg`}>
        <Icon size={15} />
      </div>
    </div>
    <div className='my-3 text-xl font-medium'>
      {isLoading
        ? <div className='h-7 w-61.5 rounded-lg bg-gray-200 animate-pulse'/>
        : value}
    </div>
  </div>
)
