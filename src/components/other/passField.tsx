'use client'
import React, { useState } from 'react'
import { TextField, Input, FieldError, Label, Button, type TextFieldProps } from '@heroui/react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function PasswordField({ label, ...props }: { label: string } & TextFieldProps) {
    const [visible, setVisible] = useState(false)

    return (
        <TextField {...props}>
            <Label>{label}</Label>
            <div className="relative w-full">
                <Input variant='secondary' className={`w-full`} type={visible ? 'text' : 'password'} />
                <Button variant='ghost' onPress={() => setVisible(!visible)} className={` absolute right-0`} isIconOnly>{visible ? <FaEyeSlash/> : <FaEye/> }</Button>
            </div>
            <FieldError />
        </TextField>
    )
}
