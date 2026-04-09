import React from 'react'
import { Button, Modal, useOverlayState } from "@heroui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IMember } from '@/type/member';
import Image from 'next/image';

function SlipModal({ state, member }: {state:ReturnType<typeof useOverlayState>, member:IMember}) {
    const router = useRouter();

    return (
        <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
            <Modal.Container placement='center'>
                <Modal.Dialog className="sm:max-w-100">
                    <Modal.CloseTrigger/>
                    <Modal.Header className=''>
                        <Modal.Heading className='text-xl'>slip ของ { member.name }</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className='w-full flex items-center justify-center p-6'>
                        <Image width={200} height={200} src={member.image} className='w-80' alt='slip_image'/>
                    </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
    )
}

export default SlipModal
