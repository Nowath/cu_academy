"use client"
import React, { useState } from 'react'
import MemberTable from '@/components/public/listMember/memberTable';
import SortBar from '@/components/public/listMember/sortBar';
import { Template } from "@/services/assets"
import { IMemberFilter } from '@/type/member';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { Basic } from '@/components/public/listMember/testTable';

function ListMemberContainer({ data, memberData }: { data: Template, memberData: IMemberFilter[] }) {
    const router = useRouter();
    const [perPage, setPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className='min-h-screen w-full flex flex-col py-10 px-4 md:px-10 gap-10 items-center'>
            <h1 className='text-center text-2xl'>
                รายชื่อผู้ลงสมัคร <span className='text-palette3'>{data.title}</span>
            </h1>
            <div className='md:w-2/3 flex flex-col gap-8 w-full'>
                <SortBar serachValue={searchValue} setSearchValue={setSearchValue} dropdownValue={perPage} setDropdownValue={setPerPage} />
                <MemberTable memberData={memberData} searchValue={searchValue} perPage={perPage} />
                <div className='w-full flex justify-end'>
                    <Button variant='ghost' onPress={() => router.push("/")}>ย้อนกลับ</Button>
                </div>
            </div>
        </div>
    )
}

export default ListMemberContainer
