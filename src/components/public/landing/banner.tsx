"use client"

import React from 'react'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { RiFileList3Line } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { FaDownload } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

interface BannerType{
    banner: string;
    title: string;
    desc: string;
}

function Banner({ banner, title, desc }: BannerType) {
    const router = useRouter()
    return (
        <div className=' w-full h-auto min-h-60 md:min-h-0 lg:aspect-3.5/1 relative flex items-center justify-center px-6 py-20 lg:py-10'>
            <Image loading="eager" alt="banner" src={banner} width={1240} height={400} className='w-full h-full object-cover absolute top-0 left-0' />
            <div className='z-20 flex flex-col gap-8 items-center justify-center'>
                <h1 className=' text-center text-3xl text-white'>{title}</h1>
                <div className='text-center bg-white/10 backdrop-blur-md rounded-md p-8 text-white w-full sm:w-2/3'>
                    {desc}
                </div>
                <div className='flex gap-4 flex-wrap justify-center'>
                    <Button size='lg' variant='secondary' onPress={() => router.push("/regis")} className={`text-palette2 px-8`}><GiArchiveRegister /> ลงทะเบียน</Button>
                    <Button size='lg' variant='secondary' onPress={() => router.push("/listmember")} className={`text-palette2 px-8`}><RiFileList3Line /> ตรวจรายชื่อ</Button>
                    <Button size='lg' variant='secondary' onPress={() => router.push("")} className={`text-palette2 px-8`}><FaDownload/> โหลด poster</Button>
                    <Button size='lg' variant='secondary' onPress={() => router.push("")} className={`text-palette2 px-8`}><FaDownload/> โหลดโครงการอบรม-PR</Button>
                </div>
            </div>
        </div>
    )
}

export default Banner
