import LogoutButton from '@/components/admin/LogoutButton'
import AuthProvider from '@/containers/admin/authProvider'

export default async function Page() {
    return (
        <AuthProvider>
            <LogoutButton />
        </AuthProvider>
    )
}
