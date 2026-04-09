'use client'
import React from 'react'
import { Template } from '@/services/assets'
import StatusCard from '@/components/public/regis/statusCard'
import RegisForm from '@/containers/public/regis/form'
import { IMemberFilter } from '@/type/member'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/react'

function RegisContainer({ template, member }: { template: Template, member: IMemberFilter[] }) {
    const router = useRouter();
    return (
        <div className='min-h-screen w-full flex flex-col py-10 px-4 md:px-10 gap-6 items-center'>
            <h1 className='text-center text-3xl md:text-4xl px-2'>
                ลงทะเบียน <span className='text-palette3'>{template.title}</span>
            </h1>
            <StatusCard now={member.length} max={template.maxRegis} />
            <RegisForm />
            <div className='w-full max-w-180 flex justify-end'>
                <Button variant='ghost' onPress={() => router.push("/")}>ย้อนกลับ</Button>
            </div>
            {/*<div className='md:w-2/3 flex flex-col gap-8 w-full'>
                <SortBar serachValue={searchValue} setSearchValue={setSearchValue} dropdownValue={perPage} setDropdownValue={setPerPage} />
                <MemberTable memberData={memberData} searchValue={searchValue} perPage={perPage} />
                <div className='w0full justify-end flex'>
                    <Link className={`text-gray-400`} href='/'>ย้อนกลับ</Link>
                </div>
            </div>*/}
        </div>
    )
}

export default RegisContainer
