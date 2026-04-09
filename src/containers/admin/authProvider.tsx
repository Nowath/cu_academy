import { redirect } from 'next/navigation'
import { checkLogin } from "@/services/auth"
import type { ReactNode } from 'react'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AuthProvider({ children }: {children:ReactNode }) {
    const user = await checkLogin()

    if (!user) {
        redirect('/login')
    }

    return (
        <>
            {children}
            <div className=" fixed top-4 right-4"><LogoutButton/></div>
        </>
    )
}

export const userData = async () => {
    const user = await checkLogin();
    return user;
}
