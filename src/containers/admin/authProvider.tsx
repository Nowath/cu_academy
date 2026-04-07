import { redirect } from 'next/navigation'
import { checkLogin } from "@/services/auth"
import type { ReactNode } from 'react'

export default async function AuthProvider({ children }: {children:ReactNode }) {
    const user = await checkLogin()

    if (!user) {
        redirect('/login')
    }

    return (
        <>
            {children}
        </>
    )
}
