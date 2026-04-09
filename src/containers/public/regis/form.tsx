"use client"
import React from 'react'
import { Card, Button, Form, TextField, Input, Label, Autocomplete, ListBox, FieldError, Checkbox, CheckboxGroup, Description, useOverlayState } from "@heroui/react";
import { PrefixENUM, GradeENUM, IMemberNoAuto } from '@/type/member';
import FileInput from '@/components/public/regis/fileInput';
import { insertMember, getPublicURL, removeImage } from '@/services/listMember/insertMember';
import { v4 } from 'uuid'
import { toast } from 'sonner';
import SuccessModal from '@/components/modal/regis/success';
import FailedModal from '@/components/modal/regis/failed';

const DAY_COSTS: Record<string, { label: string; cost: number }> = {
    day1: { label: "วันเสาร์ที่ 21 มีนาคม พ.ศ. 2569", cost: 4000 },
    day2: { label: "วันอาทิตย์ที่ 22 มีนาคม พ.ศ. 2569", cost: 3500 },
};

function RegisForm() {
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
    const [errorr, setError] = React.useState<Error>();
    const totalCost = selectedDays.reduce((sum, day) => sum + (DAY_COSTS[day]?.cost ?? 0), 0);
    const [slipFile, setSlipFile] = React.useState<File | null>(null);
    const successModal = useOverlayState();
    const failedModal = useOverlayState();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const filename = v4();
        try {
            const imageResult = slipFile ? await getPublicURL({ file: slipFile, fileName: filename }) : null;
            const imageURL = imageResult ? imageResult.data?.publicUrl ?? '' : '';
            const dataFilter: IMemberNoAuto = {
                prefix: formData.get('prefix') as IMemberNoAuto['prefix'],
                name: formData.get('name') as string,
                grade: formData.get('grade') as IMemberNoAuto['grade'],
                school_name: formData.get('school_name') as string,
                day1: formData.getAll('day').includes("day1"),
                day2: formData.getAll('day').includes("day2"),
                image: imageURL,
                tel: formData.get('tel') as string,
                parent_name: formData.get('parent_name') as string,
                parent_email: formData.get('parent_email') as string,
                second_email: formData.get('second_email') as string,
                food_allergy: (formData.get('food_allergy') as string) ?? '',
                pass: false,
            };
            await insertMember(dataFilter);
            successModal.open();
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
                failedModal.open();
            }
            await removeImage({ fileName:filename });
        }
    };

    return (
        <Form className='w-full h-full max-w-180' onSubmit={handleSubmit}>
            <Card className='w-full'>
                <Card.Content className=' flex flex-col gap-4'>
                    <Autocomplete name='prefix' isRequired variant='secondary' placeholder='คำนำหน้า'>
                        <Label>คำนำหน้า</Label>
                        <Autocomplete.Trigger>
                            <Autocomplete.Value />
                            <Autocomplete.Indicator />
                        </Autocomplete.Trigger>
                        <Autocomplete.Popover className={`w-60`} placement='bottom right'>
                            <ListBox>
                                {Object.values(PrefixENUM).map((prefix) => (
                                    <ListBox.Item key={prefix} id={prefix} textValue={prefix}>
                                        {prefix}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Autocomplete.Popover>
                        <FieldError>โปรดเลือกคำนำหน้า</FieldError>
                    </Autocomplete>
                    <TextField name='name' isRequired>
                        <Label>ชื่อ-นามสกุล</Label>
                        <Input placeholder='ชื่อ-นามสกุล' variant='secondary' />
                        <FieldError>โปรดกรอกชื่อ-นามสกุล</FieldError>
                    </TextField>
                    <Autocomplete name='grade' isRequired variant='secondary' placeholder='ชั้น'>
                        <Label>ชั้น</Label>
                        <Autocomplete.Trigger>
                            <Autocomplete.Value />
                            <Autocomplete.Indicator />
                        </Autocomplete.Trigger>
                        <Autocomplete.Popover className={`w-60`} placement='bottom right'>
                            <ListBox>
                                {Object.values(GradeENUM).map((grade) => (
                                    <ListBox.Item key={grade} id={grade} textValue={grade}>
                                        {grade}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Autocomplete.Popover>
                        <FieldError>โปรดเลือกชั้น</FieldError>
                    </Autocomplete>
                    <TextField name='school_name' isRequired>
                        <Label>โรงเรียน</Label>
                        <Input placeholder='ชื่อโรงเรียน' variant='secondary' />
                        <FieldError>โปรดกรอกชื่อโรงเรียน</FieldError>
                    </TextField>
                    <CheckboxGroup isRequired name='day' onChange={setSelectedDays}>
                        <Label>สนใจเข้าร่วมกิจกรรม CU Bio Academy ในวันใด</Label>
                        <Description>เลือกได้ทั้ง 2 วัน</Description>
                        <Checkbox variant='secondary' className={`md:ml-6`} value="day1">
                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Content>
                                <Label>วันเสาร์ที่ 21 มีนาคม พ.ศ. 2569 เวลา 9.00 - 16.00 น. (4000 บาท)</Label>
                                <Description>
                                    <p>ปฏิบัติการ 1: สรีรวิทยาของสัตว์ (Animal Physiology Lab) – ศึกษาการทำงานของระบบหัวใจของสัตว์</p>
                                    <p>ปฏิบัติการ 2: อณูชีววิทยา (Molecular Biology Lab) – ศึกษาการสกัดดีเอ็นเอจากเซลล์ของสัตว์</p>
                                </Description>
                            </Checkbox.Content>
                        </Checkbox>
                        <Checkbox variant='secondary' className={`md:ml-6`} value="day2">
                            <Checkbox.Control >
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Content>
                                <Label>วันอาทิตย์ที่ 22 มีนาคม พ.ศ. 2569 เวลา 9.00 - 16.00 น. (3500 บาท)</Label>
                                <Description>
                                    <p>ปฏิบัติการ 3: กายวิภาคของสัตว์ (Animal Anatomy Lab) – ศึกษาโครงสร้างอวัยวะภายใน</p>
                                    ปฏิบัติการ 4: การย้อมสีเซลล์ (Cell staining Lab) – ศึกษาการย้อมสีเซลล์เม็ดเลือดและวิเคราะห์ชนิดของเซลล์เม็ดเลือดขาวด้วยกล้องจุลทรรศน์<br/>
                                </Description>
                            </Checkbox.Content>
                        </Checkbox>
                        <FieldError>โปรดเลือกวันใดวันหนึ่ง</FieldError>
                    </CheckboxGroup>
                    {selectedDays.length > 0 && (
                        <Card className='w-full bg-palette1/30 border border-palette3'>
                            <Card.Content className='flex flex-col gap-2 py-3'>
                                <p className='font-medium text-sm'>สรุปค่าใช้จ่าย</p>
                                {selectedDays.map((day) => (
                                    <div key={day} className='flex justify-between text-sm'>
                                        <span>{DAY_COSTS[day].label}</span>
                                        <span>{DAY_COSTS[day].cost.toLocaleString()} บาท</span>
                                    </div>
                                ))}
                                <hr className='border-palette3/40' />
                                <div className='flex justify-between font-medium'>
                                    <span>รวมทั้งหมด</span>
                                    <span>{totalCost.toLocaleString()} บาท</span>
                                </div>
                            </Card.Content>
                        </Card>
                    )}
                    <FileInput setSlipFile={setSlipFile} slipFile={slipFile}/>
                    <TextField name='parent_name' isRequired>
                        <Label>ชื่อผู้ปกครอง (โปรดสะกดชื่อให้ถุูกต้อง)</Label>
                        <Input placeholder='ชื่อ-นามสกุล' variant='secondary' />
                        <FieldError>โปรดกรอกชื่อผู้ปกครอง</FieldError>
                    </TextField>
                    <TextField name='tel' isRequired>
                        <Label>เบอร์โทรติดต่อ</Label>
                        <Input maxLength={10} inputMode='numeric' type='tel' placeholder='เบอร์โทร' variant='secondary' />
                        <FieldError>โปรดกรอกชื่อผู้ปกครอง</FieldError>
                    </TextField>
                    <TextField name='parent_email' isRequired>
                        <Label>อีเมลของผู้ปกครอง</Label>
                        <Input inputMode='email' type='email' placeholder='อีเมล' variant='secondary' />
                        <FieldError>โปรดกรอกอีเมลของผู้ปกครอง</FieldError>
                    </TextField>
                    <TextField name='second_email' isRequired>
                        <Label>อีเมลสำรองของผู้ปกครอง (ถ้ามี) หรืออีเมลนักเรียน</Label>
                        <Input inputMode='email' type='email' placeholder='อีเมล' variant='secondary' />
                        <FieldError>โปรดกรอกอีเมล</FieldError>
                    </TextField>
                    <TextField name='food_allergy'>
                        <Label>เเพ้อาหารใด ๆ หรือ มีข้อจำกัดด้านอาหาร หรือ โรคประจำตัวใด ๆ</Label>
                        <Input placeholder='ข้อจำกัด' variant='secondary' />
                    </TextField>
                    <div className='flex flex-col gap-2 mt-4'>
                        <p className='text-xs text-center text-red-400'>หลังจากที่ท่านได้ชำระเงิน และแนบหลักฐานการสมัครเเล้ว ทางอาจารย์ผู้ประสานงานจะส่งอีเมลยืนยัน</p>
                        <p className='text-xs text-center text-red-400'>ในกรณีท่านมีความประสงค์ต้องการข้อมูลใด ๆ เพิ่มเติมโปรดติดต่อ รศ.ดร.สิทธิพร โทร 063-978-2954 หรืออีเมล Sittiporn.p@Chula.ac.th</p>
                    </div>
                </Card.Content>
                <Card.Footer className='flex justify-end'>
                    <Button type='submit' className=" bg-palette3 text-white px-6">ยืนยัน</Button>
                </Card.Footer>
            </Card>
            <SuccessModal state={successModal} />
            <FailedModal state={failedModal} error={errorr}/>
        </Form>
    )
}

export default RegisForm
