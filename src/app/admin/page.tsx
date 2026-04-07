import { redirect } from 'next/navigation'
import { checkLogin } from "@/services/auth"
import LogoutButton from '@/components/admin/LogoutButton'
import AuthProvider from '@/containers/admin/authProvider'

export default async function Page() {
    return (
        <AuthProvider>
            <LogoutButton />
        </AuthProvider>
    )
}
