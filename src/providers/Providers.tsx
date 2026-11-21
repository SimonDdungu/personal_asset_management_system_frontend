import React, { ReactNode } from 'react'
import QueryProvider from './QueryProvider'
import { AuthProvider } from '../context/auth/AuthContext'


const Providers = ({ children }: { children: ReactNode }) => {
  return (
     <QueryProvider>
        <AuthProvider>
            {children}
        </AuthProvider>
     </QueryProvider>
  )
}

export default Providers