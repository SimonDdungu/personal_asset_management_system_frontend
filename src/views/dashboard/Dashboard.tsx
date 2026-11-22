import React from 'react'
import WelcomeUser from './components/WelcomeUser'
import KPICards from './components/KPICards'

const Dashboard = () => {
  return (
    <div className='px-20 pt-10 pb-20 bg-gray-100'>
        <div className='flex flex-col gap-y-5'>
            <WelcomeUser />
            <KPICards />
        </div>
    </div>
  )
}

export default Dashboard