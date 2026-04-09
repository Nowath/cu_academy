import React from 'react'
import { Button, Modal, useOverlayState } from "@heroui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

function SuccessModal({ state }: {state:ReturnType<typeof useOverlayState>}) {
    const router = useRouter();

    const handleClose = () => {
        state.setOpen(false);
        router.push('/');
    };

    return (
        <Modal.Backdrop isOpen={state.isOpen} onOpenChange={handleClose}>
            <Modal.Container placement='center'>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.Header className='flex items-center'>
                <FaCircleCheck color='#00FF00' size={80} />
                <Modal.Heading className='text-xl'>ลงทะเบียนสำเร็จ</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p className=' indent-6'>
                  ลงทะเบียนสำเร็จสามารถเช็ครายชื่อที่ <a className='text-blue-500 underline' href='/listmember'>หน้านี้</a> หากยังไม่พบรายชื่อให้รอประมาณ 2-3 วันทำการและหากมีปัญหาใดๆสามารถแจ้งได้ที่
                </p>
                <p className='text-danger text-center mt-4'>รศ.ดร.สิทธิพร โทร 063-978-2954 หรืออีเมล Sittiporn.p@Chula.ac.th</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={handleClose}>รับทราบ</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
    )
}

export default SuccessModal
