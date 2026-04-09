import AuthProvider from '@/containers/admin/authProvider'
import AdminContainer from '@/containers/admin/adminContainer'

export default async function Page() {
    return (
        <AuthProvider>
            <AdminContainer />
        </AuthProvider>
    )
}
