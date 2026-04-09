import React from 'react'
import { Button, Modal, useOverlayState } from "@heroui/react";
import { IMember } from '@/type/member';

function InfoModal({ state, member }: {state:ReturnType<typeof useOverlayState>, member:IMember}) {
    return (
        <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
            <Modal.Container placement='center'>
                <Modal.Dialog className="sm:max-w-100">
                    <Modal.CloseTrigger/>
                    <Modal.Header className=''>
                        <Modal.Heading className='text-lg'>ข้อมูลเพิ่มเติมของ { member.name }</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className='w-full flex text-black py-6 flex-col gap-4'>
                        <p>ชื่อผู้ปกครอง : { member.parent_name }</p>
                        <p>email ผู้ปกครอง : { member.parent_email }</p>
                        <p>email สำรอง : { member.second_email }</p>
                        <p>เบอร์ผู้ปกครอง : { member.tel }</p>
                    </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
    )
}

export default InfoModal
