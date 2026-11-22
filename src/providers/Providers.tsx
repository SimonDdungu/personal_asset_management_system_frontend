import React, { ReactNode, Suspense } from 'react'
import QueryProvider from './QueryProvider'
import { AuthProvider } from '../context/auth/AuthContext'


const Providers = ({ children }: { children: ReactNode }) => {
  return (
     <QueryProvider>
       <Suspense fallback={null}>
         <AuthProvider>
               {children}
         </AuthProvider>
       </Suspense>
     </QueryProvider>
  )
}

export default Providers