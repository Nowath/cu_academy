'use client'
import React from 'react'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'

function AdminContainer() {
    const router = useRouter();

    return (
        <div className='min-h-screen py-20 flex flex-col items-center'>
            <h1 className='text-center text-4xl'>Admin Control</h1>
            <div className='flex flex-col gap-4 w-full sm:w-100 px-4 py-10'>
                <Button size='lg' variant='primary' onPress={() => router.push("/admin/checkmember")} className={` w-full rounded-md`}>เช็ครายชื่อ</Button>
                <Button size='lg' variant='primary' onPress={() => router.push("/admin/setting")} className={` w-full rounded-md`}>Setting Page</Button>
                <Button size='lg' variant='secondary' onPress={() => router.push("/")} className={` w-full rounded-md`}>กลับเข้าหน้าหลัก</Button>
            </div>
        </div>
    )
}

export default AdminContainer
