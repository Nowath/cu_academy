import React from 'react'
import { Button, ScrollShadow } from "@heroui/react"
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

dayjs.extend(buddhistEra);

interface MiddleCardType{
    title: string;
    desc: string;
    endDate: string;
}

function MiddleCard({ title, desc, endDate }: MiddleCardType) {
    const thaiDate = dayjs(endDate).locale('th').format('D MMMM BBBB');
    return (
        <div className='px-2 md:px-10 flex flex-col items-center'>
            <div className=' bg-white shadow-xl shadow-black/10 md:w-2/3 min-h-80 rounded-4xl mt-10 lg:mt-0 -translate-y-20 md:-translate-y-12 p-6 flex flex-col items-center gap-10'>
                <h1 className='text-center text-2xl text-palette2'>{title}</h1>
                <ScrollShadow className="max-h-60 p-4 w-full">
                    <div className="space-y-2 text-sm mb-10">
                        <p className="indent-7">
                        โครงการ CU Bio Academy 2026 เพื่อเพิ่มพูนประสบการณ์ด้านทักษะทางชีววิทยา
                        ภายในงานมี 4 ปฏิบัติการ ใช้เวลาอบรม 2 วัน ระหว่างวันเสาร์ที่ 21 และ วันอาทิตย์ที่ 22
                        </p>
                        <div className="space-y-1">
                        <p className="font-medium">กิจกรรมวันเสาร์ที่ 21 มีนาคม พ.ศ. 2569 เวลา 9.00 - 16.00 น.</p>
                        <ul className="space-y-1 pl-4 list-disc list-inside">
                            <li>ปฏิบัติการ 1: สรีรวิทยาของสัตว์ (Animal Physiology Lab) – ศึกษาการทำงานของระบบหัวใจของสัตว์</li>
                            <li>ปฏิบัติการ 2: อณูชีววิทยา (Molecular Biology Lab) – ศึกษาการสกัดดีเอ็นเอจากเซลล์ของสัตว์</li>
                        </ul>
                        <p className="text-muted-foreground">(ค่าสมัครกิจกรรมวันที่ 21 มีนาคม พ.ศ. 2569 ค่าสมัคร 4,000 บาท)</p>
                        </div>
                        <div className="space-y-1">
                        <p className="font-medium">กิจกรรมวันอาทิตย์ที่ 22 มีนาคม พ.ศ. 2569 เวลา 9.00 - 16.00 น.</p>
                        <ul className="space-y-1 pl-4 list-disc list-inside">
                            <li>ปฏิบัติการ 3: กายวิภาคของสัตว์ (Animal Anatomy Lab) – ศึกษาโครงสร้างอวัยวะภายใน</li>
                            <li>ปฏิบัติการ 4: การย้อมสีเซลล์ (Cell staining Lab) – ศึกษาการย้อมสีเซลล์เม็ดเลือดและวิเคราะห์ชนิดของเซลล์เม็ดเลือดขาวด้วยกล้องจุลทรรศน์</li>
                        </ul>
                        <p className="text-muted-foreground">(ค่าสมัครกิจกรรมวันที่ 22 มีนาคม พ.ศ. 2569 ค่าสมัคร 3,500 บาท)</p>
                        </div>
                        <p className="font-medium">สถานที่อบรม : ห้อง 409 ชั้น 4 ตึกมหามกุฎ คณะวิทยาศาสตร์ กทม.</p>
                    </div>
                    </ScrollShadow>
                <div className=' flex items-center justify-center'>
                    <Button size='lg' variant='danger-soft'>วันสุดท้ายลงทะเบียน: {thaiDate}</Button>
                </div>
            </div>
        </div>
    )
}

export default MiddleCard
