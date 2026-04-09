'use client'
import React from 'react'
import { Card, TextField, Label, Input, Form, Button, FieldError } from '@heroui/react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInWithEmail } from "@/services/auth"

function AdminLoginContainer() {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const pass = formData.get("pass") as string;

        try {
            await signInWithEmail({ email, pass });
            toast.success("Login successful");
            router.push("admin");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className='min-h-dvh flex items-center justify-center px-4'>
            <Form onSubmit={handleSubmit} className='w-full h-full flex items-center justify-center'>
                <Card className='w-full sm:w-80'>
                    <Card.Header className='text-center text-2xl justify-center'>Login Admin</Card.Header>
                    <Card.Content className='pt-6'>
                        <TextField name='email' isRequired>
                            <Label>Email</Label>
                            <Input type='email' variant='secondary' />
                            <FieldError/>
                        </TextField>
                        <TextField name='pass' isRequired>
                            <Label>Password</Label>
                            <Input type='password' variant='secondary' minLength={3} />
                            <FieldError>ขั้นต่ำ 3 ตัว</FieldError>
                        </TextField>
                    </Card.Content>
                    <Card.Footer className='justify-center'>
                        <Button type='submit' className='bg-green-400 px-10' size='lg'>Login</Button>
                    </Card.Footer>
                </Card>
            </Form>
        </div>
    )
}

export default AdminLoginContainer
