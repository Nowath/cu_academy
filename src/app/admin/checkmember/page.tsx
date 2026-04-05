import { redirect } from 'next/navigation'
import { checkLogin } from "@/services/auth"
import LogoutButton from '@/components/admin/LogoutButton'

export default async function Page() {
    const user = await checkLogin()

    if (!user) {
        redirect('/login')
    }

    return (
        <div>
            <h1>ยินดีต้อนรับคุณ {user.email}</h1>
            <LogoutButton />
        </div>
    )
}
