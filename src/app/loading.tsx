import React from 'react'
import FullScreenLoadingSpinner from '../components/ui/loading_state/FullScreenLoadingSpinner'

const loading = () => {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center relative z-100'>
        <FullScreenLoadingSpinner />
    </div>
  )
}

export default loading