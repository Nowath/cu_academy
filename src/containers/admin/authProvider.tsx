'use client'
import React, { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) {
                router.push('/login')
            } else {
                setAuthorized(true)
            }
        })
    }, [router])

    if (!authorized) return null

    return <div>{children}</div>
}

export default AuthProvider
