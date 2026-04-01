"use client"
import React, { useState, useEffect } from 'react'
import MemberTable from '@/components/public/listMember/memberTable';
import SortBar from '@/components/public/listMember/sortBar';
import { Template } from "@/services/assets"
import { Link } from '@heroui/react';
import { IMemberFilter } from '@/services/listMember/getMember';

function ListMemberContainer({ data, memberData }: { data: Template, memberData: IMemberFilter[] }) {
    const [perPage, setPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className='h-screen w-full flex flex-col py-10 px-4 md:px-10 gap-10 items-center'>
            <h1 className='text-center text-2xl'>
                รายชื่อผู้ลงสมัคร <span className='text-palette3'>{data.title}</span>
            </h1>
            <div className='md:w-2/3 flex flex-col gap-8 w-full'>
                <SortBar serachValue={searchValue} setSearchValue={setSearchValue} dropdownValue={perPage} setDropdownValue={setPerPage} />
                <MemberTable memberData={memberData} searchValue={searchValue} perPage={perPage} />
                <div className='w0full justify-end flex'>
                    <Link className={`text-gray-400`} href='/'>ย้อนกลับ</Link>
                </div>
            </div>
        </div>
    )
}

export default ListMemberContainer
