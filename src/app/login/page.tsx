import React from 'react'
import AdminLoginContainer from '@/containers/admin/adminLogin/adminLoginContainer'
import { checkLogin } from '@/services/auth'
import { redirect } from 'next/navigation'

async function Page() {
    const user = await checkLogin()
    if (user) {
        redirect('/admin')
    }
    return <AdminLoginContainer />
}

export default Page
