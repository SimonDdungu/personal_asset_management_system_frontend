"use client"
import React, { useState } from 'react'
import WelcomeUser from './components/WelcomeUser'
import KPICards from './components/KPICards'
import TopAssetCategories from './components/TopAssetCategories'
import LargestAssets from './components/LargestAssets '
import CategoriesCount from './components/CategoriesCount'

const Dashboard = () => {
  const [totalNetworth, setTotalNetworth] = useState<number>(0)
  console.log("total: ", totalNetworth)
  return (
    <div className='px-20 pt-10 pb-20 bg-gray-100'>
        <div className='flex flex-col gap-y-5'>
            <WelcomeUser />
            <KPICards setTotalNetworth={setTotalNetworth}/>

            <div className='flex flex-row gap-x-3 h-100 text-sm'>
              <div className='w-100 flex-1 bg-white rounded-lg shadow flex items-center justify-center p-2'>Yearly line chart of total networth</div>
              <div className='w-80 bg-white rounded-lg shadow flex items-center justify-center p-2'>Pie chart of physical and financial percentage</div>
            </div>
            <div className='grid grid-cols-3 gap-x-5'>
              <TopAssetCategories totalNetworth={totalNetworth}/>
              <LargestAssets />
              <CategoriesCount />
            </div>
        </div>
    </div>
  )
}

export default Dashboard