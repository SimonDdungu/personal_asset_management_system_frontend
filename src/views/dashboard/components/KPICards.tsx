"use client"
import { useGetTotalAssetCount } from '@/src/hooks/assets/useAssets';
import { useGetTotalFinancialAssetValue, useGetTotalNetworth, useGetTotalPhysicalAssetValue } from '@/src/hooks/dashboard/useDashboard';
import { useBaseCurrencyStore } from '@/src/zustand/store/base-currency-store';
import { Briefcase, BuildingComplex, ChartColumn, LucideIcon, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { Total_Networth_Type } from '../../../shared/types/total-networth-type';
import { useEffect } from 'react';

interface KPICard_Prop{
    label: string;
    icon: LucideIcon;
    icon_color?: string;
    icon_bgcolor?:string;
    value?: KPIMoneyValue | number;
    percentage?: number
    extraInfo?: string;
    isLoading?: boolean
}

interface KPICardsProps {
  networth: number;
  physicalValue: number;
  financialValue: number;
  averageValue: number;
  isNetworthLoading: boolean;
  isPhysicalLoading: boolean;
  isFinancialLoading: boolean;
  isAverageLoading: boolean;
}

const KPICards = ({networth, physicalValue, financialValue, averageValue, isAverageLoading, isFinancialLoading, isNetworthLoading, isPhysicalLoading}: KPICardsProps) => {
    const seletedBaseCurrency = useBaseCurrencyStore((state) => state.baseCurrency)
  return (
    <div className='grid grid-cols-4 gap-x-5'>
        <KPICard label="Total net worth" icon={Wallet} icon_bgcolor='bg-purple-100' icon_color='text-purple-500' value={{ money: networth, currency: seletedBaseCurrency }} isLoading={isNetworthLoading} />

        <KPICard label="Physical assets" icon={BuildingComplex} icon_bgcolor='bg-blue-100' icon_color='text-blue-500' value={{ money: physicalValue, currency: seletedBaseCurrency }}  isLoading={isPhysicalLoading} />

        <KPICard label="Financial assets" icon={ChartColumn} icon_bgcolor='bg-green-100' icon_color='text-green-500' value={{money: financialValue, currency: seletedBaseCurrency}}  isLoading={isFinancialLoading} />

        <KPICard label="Average asset Value" icon={Briefcase} icon_bgcolor='bg-orange-100' icon_color='text-orange-500' value={{money: averageValue, currency: seletedBaseCurrency}} isLoading={isAverageLoading}/>
    </div>
  )
}

export default KPICards

interface KPIMoneyValue {
    money: number;
    currency: string;
}



function KPICard({label, icon: Icon, icon_bgcolor, icon_color, value, percentage, extraInfo, isLoading}: KPICard_Prop){
    return (
        <div className='bg-white rounded-lg px-5 py-4 w-full cursor-default shadow hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between gap-x-3'>
                <span className='text-xs text-gray-700'>{label}</span>
                <div className={`${icon_bgcolor ?? ""} ${icon_color ?? ""} p-2 rounded-lg`}>
                    <Icon size={15} />
                </div>
            </div>
            
            <div className='my-3 text-xl font-medium'>
                <div>
                     {isLoading ? <div className='h-7 w-61.5 rounded-lg bg-gray-200 animate-pulse'/> : (typeof value === "number" ? value.toLocaleString() : value ? `${value.currency} ${value.money?.toLocaleString()}` : "--")}
                </div>
            </div>

            <div className='flex items-center gap-x-2 text-xs'>
                {percentage && (
                    <p className={`flex gap-x-1 ${percentage >= 0 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} p-1 rounded-lg`}>
                        {percentage >= 0 ? <TrendingUp size={14} className="inline" /> : <TrendingDown size={14} className="inline" />}
                        <span>{percentage > 0 ? "+" : ""}{percentage}%</span>
                    </p>
                )}
                {extraInfo && <span className='text-gray-700'>{extraInfo}</span>}
            </div>
        </div>
    )
}