'use client'
import React from 'react'
import { Card, Button } from "@heroui/react";

interface StatusCardType{
    now: number;
    max: number;
}

function StatusCard({now, max}: StatusCardType) {
    return (
        <Card className='w-full md:w-100'>
            <Card.Header className=' text-center text-2xl'>จำนวนผู้ลงทะเบียน</Card.Header>
            <Card.Content className='flex flex-col items-center gap-4'>
                <div className='text-5xl text-palette2'>{now} / {max}</div>
                <Button variant='danger-soft' className={` px-8`}>ว่าง {max-now} ที่นั่ง</Button>
            </Card.Content>
        </Card>
    )
}

export default StatusCard
