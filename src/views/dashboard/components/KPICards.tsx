import { Briefcase, BuildingComplex, ChartColumn, LucideIcon, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import React from 'react'

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


const KPICards = () => {
  return (
    <div className='grid grid-cols-4 gap-x-5'>
        <KPICard label="Total net worth" icon={Wallet} icon_bgcolor='bg-purple-100' icon_color='text-purple-500' value={{ money: 67500000, currency: "UGX" }} percentage={6} />

        <KPICard label="Physical assets" icon={BuildingComplex} icon_bgcolor='bg-blue-100' icon_color='text-blue-500' value={{ money: 22000000, currency: "UGX" }} percentage={2.5} extraInfo="Compared to last year"/>

        <KPICard label="Financial assets" icon={ChartColumn} icon_bgcolor='bg-green-100' icon_color='text-green-500' value={{money: 35500000, currency: "UGX"}} percentage={-4} extraInfo="Compared to last year" />

        <KPICard label="Total assets" icon={Briefcase} icon_bgcolor='bg-orange-100' icon_color='text-orange-500' value={24} />
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
            
            <div className='my-3 text-xl font-semibold'>
                <div>
                     {typeof value === "number" ? value.toLocaleString() : value ? `${value.currency} ${value.money.toLocaleString()}` : "--"}
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