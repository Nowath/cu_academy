"use client"
import React from 'react'
import { Card, Button, Form, TextField, Input, Label, Autocomplete, ListBox, FieldError } from "@heroui/react";
import { PrefixENUM } from '@/services/listMember/getMember';
import { GradeENUM } from '@/services/listMember/getMember';

function RegisForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        console.log(data);
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
                        <Input variant='secondary' />
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
                        <Input variant='secondary' />
                        <FieldError>โปรดกรอกชื่อโรงเรียน</FieldError>
                    </TextField>
                </Card.Content>
                <Card.Footer className='flex justify-end'>
                    <Button type='submit' className=" bg-palette3 text-white px-6">ยืนยัน</Button>
                </Card.Footer>
            </Card>
        </Form>
    )
}

export default RegisForm
