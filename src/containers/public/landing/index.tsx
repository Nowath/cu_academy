import React from 'react'
import Banner from '@/components/public/landing/banner';
import MiddleCard from '@/components/public/landing/middleCard';
import { Template } from '@/services/assets';

function LandingContainer({ data }: { data: Template}) {

    return (
        <div className='flex flex-col'>
            <Banner banner={data.banner} title={data.title} desc={data.shortDesc} />
            <MiddleCard title={data.title} desc={data.desc} endDate={data.endDate} />
        </div>
    )
}

export default LandingContainer
