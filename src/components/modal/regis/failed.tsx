import React from 'react'
import { Button, Modal, useOverlayState } from "@heroui/react";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";

function FailedModal({ state,error }: {state:ReturnType<typeof useOverlayState>, error:Error | undefined}) {
    const router = useRouter();

    const handleClose = () => {
        state.setOpen(false);
        router.push('/');
    };

    const handleOnlyClose = () => {
        state.setOpen(false);
    };

    return (
        <Modal.Backdrop isOpen={state.isOpen} onOpenChange={handleOnlyClose}>
            <Modal.Container placement='center'>
            <Modal.Dialog className="sm:max-w-90">
                <Modal.Header className='flex items-center'>
                    <MdCancel color='#FF0000' size={80} />
                    <Modal.Heading className='text-xl'>ลงทะเบียนสำเร็จ</Modal.Heading>
                </Modal.Header>

                <Modal.Body>
                    <p className=' text-center'>
                        โปรดลองใหม่หรือสามารถแจ้งปัญหาได้ที่
                        </p>
                        {/*<p>{error?.message}</p>*/}
                    <p className='text-danger text-center mt-4'>รศ.ดร.สิทธิพร โทร 063-978-2954 หรืออีเมล Sittiporn.p@Chula.ac.th</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='ghost' onPress={handleClose}>กลับหน้าแรก</Button>
                    <Button onPress={handleOnlyClose}>ลองใหม่</Button>
                </Modal.Footer>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    )
}

export default FailedModal
