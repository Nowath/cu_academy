"use client"
import React, { useState } from 'react'
import AdminTable from '@/components/admin/checkMember/adminTable';
import SortBar from '@/components/admin/checkMember/sortbar';
import { Template } from "@/services/assets"
import { IMember } from '@/type/member';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

function CheckMemberContainer({ data, memberData }: { data: Template, memberData: IMember[] }) {
    const router = useRouter();
    const [perPage, setPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [filterPass, setFilterPass] = useState("all");

    return (
        <div className='min-h-screen w-full flex flex-col py-10 px-4 md:px-10 gap-10 items-center'>
            <h1 className='text-center text-2xl'>
                <span> Admin Control </span>
               <p> รายชื่อผู้ลงสมัคร <span className='text-palette3'>{data.title}</span> </p>
            </h1>
            <div className='md:w-2/3 flex flex-col gap-8 w-full'>
                <SortBar serachValue={searchValue} setSearchValue={setSearchValue} dropdownValue={perPage} setDropdownValue={setPerPage} filterPass={filterPass} setFilterPass={setFilterPass} />
                <AdminTable memberData={memberData} searchValue={searchValue} filterPass={filterPass} perPage={perPage} />
                <div className='w-full flex justify-end'>
                    <Button variant='ghost' onPress={() => router.back()}>ย้อนกลับ</Button>
                </div>
            </div>
        </div>
    )
}

export default CheckMemberContainer
