'use client'
import { signOut } from '@/services/auth'
import { Button } from '@heroui/react'

export default function LogoutButton() {
    return (
        <Button variant='danger-soft' onPress={() => signOut()}>
            ออกจากระบบ
        </Button>
    )
}
