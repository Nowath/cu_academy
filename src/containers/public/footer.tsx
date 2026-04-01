import React from 'react';
import { getTemplate } from '@/services/assets';
import Image from 'next/image';
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

async function Footer() {
    const data = await getTemplate();

    const contactItems = [
        {
            icon: <FaMapMarkerAlt />,
            text: "254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330"
        },
        {
            icon: <BsFillTelephoneFill />,
            text: "0 2218 2000"
        },
        {
            icon: <FaEnvelope />,
            text: "pr@chula.ac.th"
        }
    ];

    return (
        <footer className='bg-palette5 text-white px-10 py-10 flex flex-col gap-6'>
            <div className="flex justify-center md:justify-start">
                <div className='w-40 '>
                    {data?.logo && (
                        <Image
                            src={data.logo}
                            alt='logo'
                            width={200}
                            height={60}
                            className='object-contain w-full h-full'
                        />
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full md:w-2/3'>
                <h3 className='text-2xl font-bold'>Contact</h3>
                <p className='font-medium'>Department of Biology, Faculty of Science, Chulalongkorn University</p>

                <div className='flex flex-col gap-3'>
                    {contactItems.map((item, index) => (
                        <div key={index} className='flex items-center gap-3'>
                            <span className='mt-1 text-xl'>{item.icon}</span>
                            <span className='text-sm md:text-base'>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
