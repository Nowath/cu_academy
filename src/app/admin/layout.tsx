import AuthProvider from '@/containers/admin/authProvider'
import type { ReactNode } from 'react'

export default async function Layout({ children }: {children: ReactNode}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
